# KỊCH BẢN USE CASE: XỬ LÝ THANH TOÁN TỰ ĐỘNG

## Thông tin Use Case
- **Use Case ID**: UC-S-01
- **Tên Use Case**: Xử lý Thanh toán tự động (Process Automatic Payments)
- **Actor**: System (Hệ thống tự động)
- **Mức độ ưu tiên**: Critical - Automates payment processing with Payment Gateway

---

## 1. MÔ TẢ NGẮN GỌN

Hệ thống tự động nhận callback/webhook từ Payment Gateway (Stripe, CoinPayment), xác thực signature, cập nhật trạng thái giao dịch và số dư ví của khách hàng. Quá trình này hoàn toàn tự động, không cần tương tác người dùng.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Payment Gateway đang hoạt động
- Payment đã được khởi tạo từ Customer (UC-C-07)
- Payment Gateway đã xử lý payment thành công
- Webhook endpoint đang hoạt động và accessible
- Database đang hoạt động
- Queue system đang hoạt động (nếu có)

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Payment Gateway gửi webhook
- Customer đã thanh toán thành công trên Payment Gateway
- Payment Gateway (Stripe/CoinPayment) trigger webhook event
- Gửi POST request đến webhook endpoint của hệ thống:
  - Stripe: `/webhook/stripe`
  - CoinPayment: `/webhook/coinpayment`

### Bước 2: Hệ thống nhận webhook request
- Webhook endpoint nhận HTTP request
- Extract event data từ request body
- Read headers (signature, timestamp, etc.)

### Bước 3: Hệ thống verify webhook signature
- Lấy signature từ request headers
- Extract secret key từ config
- Calculate expected signature
- Compare với signature nhận được
- Nếu không match: Reject (Exception 5A)

### Bước 4: Hệ thống parse event data
- Parse JSON body
- Extract:
  - Event type (payment_succeeded, payment_failed, etc.)
  - Transaction ID / Payment Intent ID
  - Amount
  - Currency
  - Customer info
  - Timestamp
  - Status

### Bước 5: Hệ thống tìm giao dịch trong database
- Tìm deposit transaction dựa trên:
  - Transaction ID (match với metadata trong payment)
  - Payment Gateway transaction reference
- Kiểm tra transaction có tồn tại không

### Bước 6: Hệ thống validate giao dịch
- Check transaction status:
  - Nếu đã "completed": Bỏ qua (tránh duplicate)
  - Nếu "pending": Tiếp tục
- Check event type có match với transaction type không
- Check amount có khớp không

### Bước 7: Hệ thống xử lý giao dịch
- **Begin Database Transaction**
- Update deposit record:
  - status = "completed"
  - processed_at = current timestamp
  - payment_reference = payment gateway transaction ID
  - event_id = webhook event ID
- Update customer wallet:
  - Add amount to wallet balance
  - Record transaction in wallet_history
- Create transaction record trong transaction_history
- **Commit Transaction**

### Bước 8: Hệ thống gửi email notification
- Queue email job
- Send email to customer:
  - "Giao dịch nạp tiền đã thành công"
  - Transaction details
  - New balance
- Send email to admin (optional, cho giao dịch lớn)

### Bước 9: Hệ thống log activity
- Log success vào system logs
- Log vào audit trail
- Log metrics (payment processed, amount, time)

### Bước 10: Hệ thống response cho Payment Gateway
- Return HTTP 200 OK với body
- Body có thể chứa acknowledgement message
- Payment Gateway sẽ không retry nếu nhận 200

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Stripe Webhook - Payment Successful
- Event type: `payment_intent.succeeded`
- Extract payment intent ID
- Tìm transaction từ metadata
- Process như Main Flow

### 4B: Stripe Webhook - Payment Failed
- Event type: `payment_intent.payment_failed`
- Update transaction status = "failed"
- Log failure reason
- Gửi email cho customer về failure

### 4C: CoinPayment IPN
- CoinPayment uses IPN (Instant Payment Notification)
- Format khác Stripe nhưng flow tương tự
- Verify hash từ IPN data
- Parse IPN data
- Process payment

### 4D: Payment Gateway retry mechanism
- Payment Gateway có thể retry nếu không nhận 200
- Hệ thống phải handle gracefully
- Idempotency: Same event chỉ process 1 lần

### 4E: Asynchronous processing
- Webhook chỉ acknowledge
- Push event vào queue
- Worker process xử lý sau
- Giảm load cho webhook endpoint

### 4F: Multi-currency support
- Detect currency từ event
- Convert nếu cần
- Update wallet với đúng currency
- Handle exchange rate

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Signature verification failed
- **Tại Bước 3**: Signature không đúng
- Log security warning
- Return HTTP 401 Unauthorized
- Không process webhook
- Alert admin về security issue

### 5B: Transaction không tìm thấy
- **Tại Bước 5**: Không có transaction trong DB
- Log warning
- Return HTTP 404 Not Found
- Hoặc return 200 OK nhưng log failure
- Alert admin

### 5C: Amount mismatch
- **Tại Bước 6**: Amount từ PG khác với DB
- Log error
- Return HTTP 400 Bad Request
- Alert admin
- Không process payment

### 5D: Duplicate webhook
- **Tại Bước 6**: Event đã được xử lý
- Check event_id đã tồn tại
- Return HTTP 200 OK ngay
- Không process lại
- Log: "Duplicate event, ignored"

### 5E: Database transaction fail
- **Tại Bước 7**: Database lỗi hoặc deadlock
- Rollback transaction
- Return HTTP 500 Server Error
- Queue retry job (nếu có)
- Log error và alert

### 5F: Invalid event type
- **Tại Bước 4**: Event type không hỗ trợ
- Log warning
- Return HTTP 400 Bad Request
- Không process

### 5G: Timeout
- Webhook processing timeout
- Return HTTP 200 OK (để PG không retry)
- Queue job để xử lý sau
- Log warning

### 5H: Email service down
- **Tại Bước 8**: Email service không available
- Tiếp tục process payment (không block)
- Queue email job để retry
- Log warning

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Thành công
- Deposit transaction status = "completed"
- Customer wallet balance đã được cộng
- Email notification đã được sent (hoặc queued)
- Payment Gateway nhận được 200 OK
- Logs đã được ghi

### 6B: Signature invalid
- Không có thay đổi trong database
- Security log đã ghi
- Admin đã được alert
- Payment Gateway nhận 401

### 6C: Thất bại (system error)
- Transaction rollback
- Payment Gateway có thể retry
- Error đã được log
- Admin đã được alert

---

## 7. YÊU CẦU ĐẶC BIỆT

- **Idempotency**: Đảm bảo cùng một event chỉ process 1 lần
- **Security**: Must verify webhook signature
- **Atomicity**: Database transactions phải atomic
- **Performance**: Process nhanh để return 200 OK trong 5s
- **Logging**: Log đầy đủ mọi event
- **Monitoring**: Monitor webhook success/failure rate
- **Rate Limiting**: Để tránh abuse

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể thêm payment gateway khác
- Có thể thêm fraud detection
- Có thể thêm auto-reconciliation
- Có thể thêm webhook retry queue
- Có thể thêm payment analytics
- Có thể thêm auto-approval rules

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: 
  - UC-C-07: Nạp tiền (Customer khởi tạo payment)
- **Precedes**: 
  - UC-A-05: Quản lý Nạp tiền (Admin có thể xem completed transactions)
  - Customer có thể dùng tiền sau khi được credit (UC-C-13, UC-C-08, v.v.)
- **Depends on**:
  - Payment Gateway (Stripe, CoinPayment)
  - Database
  - Email service
  - Queue system (nếu có)

---

## 10. WEBHOOK IMPLEMENTATION

### Stripe Webhook Example
```json
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_xxx",
      "amount": 10000,
      "currency": "usd",
      "metadata": {
        "transaction_id": "txn_123"
      }
    }
  }
}
```

### Signature Verification (Stripe)
```python
import hmac
import hashlib

def verify_stripe_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(expected_signature, signature)
```

### CoinPayment IPN Example
```php
$data = $_POST;
$secret = getenv('COINPAYMENT_SECRET');

// Build query string
$query = http_build_query($data);

// Calculate HMAC
$hmac = hash_hmac('sha512', $query, $secret);

// Verify
if ($hmac !== $_POST['hmac']) {
    // Invalid signature
    return http_response_code(401);
}
```

---

## 11. RETRY MECHANISM

### Payment Gateway Retry
- Nếu không nhận 200 OK, Payment Gateway sẽ retry
- Thường retry: 1m, 5m, 15m, 1h, 6h, 24h
- Hệ thống phải handle gracefully
- Idempotency key để tránh duplicate processing

### System Retry (Internal)
- Nếu processing fail, có thể queue job
- Retry với exponential backoff
- Max retries: 3-5 lần
- Alert sau khi max retry

---

## 12. RECONCILIATION

### Automatic Reconciliation
- Cronjob chạy mỗi ngày
- So sánh transactions trong DB vs Payment Gateway
- Tìm mismatch
- Alert admin
- Tự động fix nếu có rules

### Manual Reconciliation
- Admin có thể trigger thủ công
- Choose date range
- Run report
- Manual fix if needed

---

## 13. MONITORING VÀ ALERTING

### Metrics
- Webhook success rate
- Webhook failure rate
- Processing time
- Amount processed
- Error rate

### Alerts
- Webhook failure rate > threshold
- Duplicate signatures detected
- Transaction not found errors
- Database errors
- Email service down

---

## 14. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-SYSTEM-001
- **Business Rule**: BR-PAYMENT-001, BR-WEBHOOK-001
- **Related Module**: Payment Gateway Integration, Finance Module
- **Database Tables**: 
  - transactions (deposits)
  - wallet_history
  - webhook_logs
  - payment_events

---

## 15. GHI CHÚ

- Đây là use case quan trọng về automation và reliability
- Phải đảm bảo webhook endpoint luôn available
- Phải có proper error handling và logging
- Cần có monitoring và alerting
- Cần test kỹ các edge cases
- Phải có backup plan nếu service down
- Cần có idempotency để tránh duplicate

