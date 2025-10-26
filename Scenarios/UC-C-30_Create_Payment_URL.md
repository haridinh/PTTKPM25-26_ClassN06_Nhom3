# KỊCH BẢN USE CASE: TẠO URL THANH TOÁN

## Thông tin Use Case
- **Use Case ID**: UC-C-30
- **Tên Use Case**: Tạo URL Thanh toán (Create Payment URL)
- **Actor**: Merchant (Thương nhân)
- **Mức độ ưu tiên**: Critical - Core Merchant functionality

---

## 1. MÔ TẢ NGẮN GỌN

Merchant có thể tạo payment URL với các thông tin như số tiền, mô tả, người nhận. Sau khi tạo, Merchant có thể chia sẻ link này cho khách hàng của mình. Khi khách hàng thanh toán, Merchant sẽ nhận được tiền.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Merchant đã đăng nhập vào hệ thống
- Merchant đã được phê duyệt tài khoản merchant
- Tài khoản merchant đang active
- Hệ thống đang hoạt động bình thường

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Merchant truy cập trang tạo Payment URL
- Merchant vào Merchant Dashboard
- Click menu "Payment URL" hoặc "Tạo Link Thanh toán"
- URL: /merchant/payment-url hoặc /merchant/payment/create

### Bước 2: Hệ thống hiển thị form tạo Payment URL
- Form các trường:
  - **Thông tin thanh toán:**
    - Số tiền (Amount) - Required
    - Tiền tệ (Currency) - Required
    - Mô tả thanh toán (Description) - Optional
    - Ghi chú (Notes) - Optional
  - **Thông tin người nhận:**
    - Email khách hàng (Customer Email) - Optional
    - Tên khách hàng (Customer Name) - Optional
  - **Tùy chọn:**
    - Ngày hết hạn (Expiration Date) - Optional
    - Tự động redirect sau khi thanh toán (Redirect URL) - Optional
    - Email thông báo cho merchant khi có thanh toán - Optional

### Bước 3: Merchant điền thông tin
- Merchant nhập số tiền (ví dụ: 100)
- Merchant chọn tiền tệ (ví dụ: USD)
- Merchant điền mô tả (ví dụ: "Thanh toán hóa đơn #12345")
- Merchant có thể điền email khách hàng
- Merchant có thể set expiration date
- Merchant có thể điền redirect URL

### Bước 4: Merchant click tạo
- Merchant review thông tin
- Merchant click "Tạo Payment URL" hoặc "Generate Link"
- Hệ thống validate dữ liệu

### Bước 5: Hệ thống validate
- Kiểm tra số tiền > 0
- Kiểm tra tiền tệ hợp lệ
- Kiểm tra expiration date chưa quá khứ (nếu có)
- Kiểm tra redirect URL hợp lệ (nếu có)
- Kiểm tra email format (nếu có)

### Bước 6: Hệ thống tạo Payment URL
- **Begin Transaction**
- Tạo payment URL record:
  - payment_url_id (unique)
  - merchant_id
  - amount
  - currency
  - description
  - customer_email
  - customer_name
  - expiration_date
  - redirect_url
  - status = "active"
  - created_at
  - payment_link (unique URL)
- Generate unique payment link:
  - Format: https://domain.com/pay/{hash}
  - Hash: unique identifier secure
- **Commit Transaction**

### Bước 7: Hệ thống hiển thị kết quả
- Hiển thị payment URL đã tạo:
  - Full URL: https://domain.com/pay/abc123xyz
  - Shorten URL (nếu có): https://short.ly/xyz
- Hiển thị QR code để scan
- Các actions:
  - "Copy URL"
  - "Download QR Code"
  - "Gửi Email"
  - "Chia sẻ qua Social Media"
  - "Test Payment" (sandbox)

### Bước 8: Merchant chia sẻ URL
- Merchant có thể:
  - Copy URL và gửi cho khách hàng
  - In QR code
  - Gửi email với template
  - Share qua WhatsApp, Facebook, v.v.

### Bước 9: Khách hàng thanh toán (tiếp theo ở flow khác)
- Customer truy cập payment URL
- Customer điền thông tin thanh toán
- Customer submit payment
- Payment được xử lý
- Merchant nhận được thông báo

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Merchant tạo payment URL với template
- Hệ thống có các template sẵn:
  - Invoice
  - Subscription
  - Donation
  - Product payment
- Merchant chọn template
- Form tự động fill một số fields
- Merchant chỉ cần điều chỉnh

### 4B: Merchant tạo recurring payment URL
- Option: "Recurring Payment"
- Thêm fields:
  - Frequency (Daily, Weekly, Monthly)
  - Number of repetitions
- Hệ thống tạo payment URL với schedule

### 4C: Merchant tạo payment URL cho nhiều sản phẩm
- Option: "Multiple Items"
- Table để thêm products:
  - Name, Quantity, Price
  - Tính tổng tự động
- Tạo URL với order details

### 4D: Merchant preview payment URL
- Trước khi tạo, có nút "Preview"
- Hiển thị layout khi customer truy cập
- Merchant có thể adjust và tạo lại

### 4E: Merchant copy payment URL cũ
- Trong danh sách payment URLs
- Có nút "Clone"
- Tạo URL mới với thông tin tương tự
- Merchant chỉ cần đổi số tiền

### 4F: Merchant set payment URL as default
- Khi tạo, có option "Set as default"
- URL này sẽ được dùng cho recurring
- Khi khách hàng lặp lại, có thể dùng link cũ

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Số tiền không hợp lệ
- **Tại Bước 5**: Amount <= 0 hoặc không phải số
- Hiển thị: "Vui lòng nhập số tiền hợp lệ (> 0)"
- Không tạo URL

### 5B: Tiền tệ không được hỗ trợ
- **Tại Bước 5**: Currency không có trong danh sách
- Hiển thị: "Tiền tệ này không được hỗ trợ"
- Cho phép chọn lại

### 5C: Expiration date đã qua
- **Tại Bước 5**: Expiration date < current date
- Hiển thị: "Ngày hết hạn phải trong tương lai"
- Merchant sửa lại

### 5D: Redirect URL không hợp lệ
- **Tại Bước 5**: URL không có format http/https
- Hiển thị: "URL không hợp lệ"
- Merchant sửa lại hoặc để trống

### 5E: Database lỗi
- **Tại Bước 6**: Transaction fail
- Rollback
- Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại"
- Merchant thử lại

### 5F: Merchant account bị suspend
- **Tại Bước 2**: Merchant status != active
- Hiển thị: "Tài khoản merchant của bạn đã bị tạm khóa"
- Không cho phép tạo payment URL
- Hướng dẫn liên hệ hỗ trợ

### 5G: Vượt quá số lượng payment URL cho phép
- **Tại Bước 6**: Check merchant limit
- Nếu vượt quá: Hiển thị "Bạn đã đạt giới hạn. Vui lòng upgrade plan"
- Link để upgrade

### 5H: QR code generate fail
- **Tại Bước 7**: Không tạo được QR
- URL vẫn được tạo
- QR code hiển thị error
- Merchant vẫn có thể copy URL

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Thành công
- Payment URL đã được tạo
- Status = "active"
- URL đã được lưu trong database
- Merchant có thể chia sẻ và track

### 6B: Thất bại
- Không có payment URL được tạo
- Hiển thị lỗi
- Merchant có thể thử lại

---

## 7. YÊU CẦU ĐẶC BIỆT

- Payment URL phải unique và không thể guess
- Hash phải được generate an toàn
- Cần có rate limiting (tránh spam)
- Expiration date phải được enforce
- URL sau khi tạo phải accessible ngay
- Cần log mọi payment URL được tạo
- Cần có tracking cho payment URL

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể có payment URL templates
- Có thể có custom domain cho merchant
- Có thể tích hợp email automation
- Có thể có payment URL analytics
- Có thể có A/B testing cho payment URL
- Có thể có payment URL scheduling

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: 
  - UC-A-14: Quản lý Đơn Merchant (phải được approve trước)
- **Precedes**: 
  - Customer thanh toán qua payment URL (không phải use case riêng nhưng là part của flow)
  - UC-C-31: Xem Giao dịch Merchant (xem payment qua URL này)
  - UC-C-32: Rút tiền Merchant (rút tiền từ payments này)
- **Related to**:
  - UC-A-16: Quản lý Giao dịch Merchant (Admin xem payments)
  - UC-S-01: Xử lý thanh toán tự động (Customer thanh toán qua URL)

---

## 10. PAYMENT URL STRUCTURE

### URL Format
```
https://yourdomain.com/pay/{unique_hash}

Example:
https://yourdomain.com/pay/a3f8x9m2k1pq7w4r6t
```

### QR Code
- Generate QR code cho URL
- Include amount và merchant info trong QR (optional)
- Merchant có thể in QR hoặc gửi qua chat

### Short URL (Optional)
```
https://short.ly/{code}

Example:
https://short.ly/pay123
```

---

## 11. PAYMENT URL STATUS

### Active
- URL đang có thể sử dụng
- Payment được chấp nhận

### Expired
- Quá expiration date
- Không thể thanh toán
- Merchant có thể extend

### Completed
- Payment đã được thực hiện
- Không thể dùng lại (nếu one-time)

### Cancelled
- Merchant cancel URL
- Không thể sử dụng

---

## 12. PAYMENT URL TRACKING

### Metrics
- Số lần URL được truy cập (views)
- Số lần thanh toán thành công (conversions)
- Conversion rate
- Total amount collected
- Location của visitors

### Analytics Dashboard
- Merchant có thể xem:
  - Số views
  - Số payments
  - Total collected
  - Timeline chart

---

## 13. CUSTOMER PAYMENT FLOW (Bonus)

### Customer Side:
1. Click vào payment URL
2. Hiển thị payment page:
   - Merchant info
   - Amount to pay
   - Description
3. Choose payment method
4. Enter payment details
5. Confirm payment
6. Payment processed
7. Redirect to success page (hoặc merchant's URL)

### After Payment:
- Payment URL status = "completed"
- Money credited to merchant account
- Merchant gets notification
- Customer gets receipt email (optional)

---

## 14. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-MERCHANT-002
- **Business Rule**: BR-PAYMENT-URL-001
- **Related Module**: Merchant Module, Payment Module
- **Database Tables**: 
  - payment_urls
  - payment_url_stats
  - merchant_payments

---

## 15. GHI CHÚ

- Đây là core feature của Merchant module
- URL phải short và memorable nếu có thể
- Cần có tracking và analytics
- Cần có rate limiting
- Cần test kỹ expiration logic
- Cần có fraud detection
- Phải có proper error handling

