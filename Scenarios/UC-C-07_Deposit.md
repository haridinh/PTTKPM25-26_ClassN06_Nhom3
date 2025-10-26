# KỊCH BẢN USE CASE: NẠP TIỀN

## Thông tin Use Case
- **Use Case ID**: UC-C-07
- **Tên Use Case**: Nạp tiền (Deposit)
- **Actor**: Customer (Khách hàng)
- **Mức độ ưu tiên**: Critical - Core financial action

---

## 1. MÔ TẢ NGẮN GỌN

Khách hàng có thể nạp tiền vào ví của mình bằng cách chọn phương thức thanh toán (Stripe, CoinPayment) và thực hiện giao dịch. Hệ thống sẽ xử lý thanh toán với Payment Gateway và cập nhật số dư ví sau khi thanh toán thành công.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Khách hàng đã đăng nhập vào hệ thống
- Tài khoản đã được kích hoạt và xác minh email
- Customer đã xác minh KYC (có thể bắt buộc tùy cấu hình)
- Hệ thống đang hoạt động bình thường
- Payment Gateway (Stripe/CoinPayment) đang hoạt động
- Khách hàng có tài khoản/ngân hàng để thanh toán

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Khách hàng truy cập trang nạp tiền
- Khách hàng vào menu "Nạp tiền" hoặc "Deposit"
- URL: /deposit hoặc /customer/deposit

### Bước 2: Hệ thống hiển thị trang nạp tiền
- Hệ thống hiển thị form nạp tiền với:
  - Số dư hiện tại trong ví
  - Dropdown chọn phương thức thanh toán (Stripe, CoinPayment, v.v.)
  - Trường nhập số tiền cần nạp
  - Thông tin phí giao dịch (nếu có)
  - Tổng số tiền sẽ nạp (bao gồm phí)
  - Nút "Nạp tiền"

### Bước 3: Khách hàng chọn phương thức thanh toán
- Khách hàng chọn một phương thức từ dropdown
- Hệ thống hiển thị thông tin và yêu cầu của phương thức đó

### Bước 4: Khách hàng nhập số tiền
- Khách hàng nhập số tiền muốn nạp
- Hệ thống hiển thị:
  - Số tiền nạp
  - Phí giao dịch
  - Tổng thanh toán
  - Số tiền sẽ nhận được vào ví

### Bước 5: Khách hàng xác nhận giao dịch
- Khách hàng review thông tin
- Khách hàng click nút "Nạp tiền" hoặc "Confirm"

### Bước 6: Hệ thống validate giao dịch
- Kiểm tra số tiền >= minimum deposit
- Kiểm tra số tiền <= maximum deposit (nếu có giới hạn)
- Kiểm tra payment gateway đang hoạt động
- Kiểm tra tài khoản chưa bị suspend

### Bước 7: Hệ thống tạo giao dịch
- Tạo transaction record trong database với status = "pending"
- Gán transaction ID duy nhất
- Lưu thông tin: amount, payment method, user_id, created_at

### Bước 8: Hệ thống kết nối Payment Gateway
- Gọi API của Payment Gateway (Stripe/CoinPayment)
- Tạo payment link hoặc checkout session
- Redirect khách hàng đến trang thanh toán

### Bước 9: Khách hàng thanh toán
- Khách hàng điền thông tin thanh toán trên trang Payment Gateway
- Khách hàng xác nhận thanh toán
- Payment Gateway xử lý thanh toán

### Bước 10: Payment Gateway callback
- Payment Gateway gửi callback về hệ thống
- Hệ thống nhận thông báo về trạng thái thanh toán
- Hệ thống cập nhật trạng thái giao dịch

### Bước 11: Nạp tiền thành công
- Hệ thống cập nhật status = "completed"
- Cộng tiền vào ví của khách hàng
- Ghi nhận vào transaction history
- Gửi email/thông báo xác nhận đến khách hàng
- Redirect khách hàng về trang dashboard hoặc transaction history

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Thanh toán thành công với Stripe
- **Tại Bước 8**: Nếu chọn Stripe
- Hệ thống tạo Stripe checkout session
- Khách hàng được redirect đến trang Stripe
- Thanh toán bằng thẻ tín dụng/debit card
- Stripe gửi webhook về hệ thống
- Hệ thống verify webhook signature
- Nếu thành công: Tiếp tục Bước 11

### 4B: Thanh toán thành công với CoinPayment
- **Tại Bước 8**: Nếu chọn CoinPayment
- Hệ thống tạo invoice trên CoinPayment
- Khách hàng thanh toán bằng cryptocurrency
- CoinPayment gửi IPN (Instant Payment Notification) về hệ thống
- Hệ thống verify IPN signature
- Nếu thành công: Tiếp tục Bước 11

### 4C: Thanh toán qua ví điện tử (ví dụ: PayPal, ví tiền)
- Tương tự như Stripe
- Phụ thuộc vào Payment Gateway được tích hợp

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Số tiền nhỏ hơn minimum deposit
- **Tại Bước 6**: Số tiền < minimum (ví dụ: 10 USD)
- Hệ thống hiển thị: "Số tiền tối thiểu là $X"
- Khách hàng nhập lại số tiền lớn hơn

### 5B: Số tiền lớn hơn maximum deposit
- **Tại Bước 6**: Số tiền > maximum (nếu có giới hạn)
- Hệ thống hiển thị: "Số tiền tối đa là $X"
- Khách hàng nhập lại số tiền nhỏ hơn

### 5C: Payment Gateway không khả dụng
- **Tại Bước 8**: Payment Gateway đang down hoặc lỗi
- Hệ thống hiển thị: "Phương thức thanh toán tạm thời không khả dụng. Vui lòng thử lại sau"
- Log lỗi để admin theo dõi
- Khách hàng có thể chọn phương thức khác hoặc thử lại

### 5D: Thanh toán bị từ chối
- **Tại Bước 9**: Ngân hàng/thẻ từ chối thanh toán
- Payment Gateway trả về lỗi
- Hệ thống hiển thị: "Thanh toán bị từ chối. Vui lòng kiểm tra thông tin thanh toán"
- Cập nhật trạng thái giao dịch = "failed"
- Khách hàng có thể thử lại với thông tin khác

### 5E: Callback/IPN timeout
- **Tại Bước 10**: Payment Gateway không gửi callback kịp thời
- Hệ thống giữ trạng thái "pending"
- Có cronjob kiểm tra giao dịch pending sau một khoảng thời gian
- Nếu payment gateway xác nhận đã thanh toán: Cập nhật status và cộng tiền
- Nếu không thanh toán: Giữ "pending" hoặc đánh dấu "timeout"

### 5F: Giao dịch bị trùng lặp
- **Tại Bước 7**: Transaction ID đã tồn tại
- Hệ thống kiểm tra duplicate
- Nếu là callback trùng: Bỏ qua và không cập nhật lại
- Nếu là user submit trùng: Tạo giao dịch mới với transaction ID khác

### 5G: Khách hàng chưa xác minh KYC
- **Tại Bước 2**: Chưa verify KYC nhưng yêu cầu deposit lớn
- Kiểm tra KYC status
- Nếu chưa verify: Hiển thị "Vui lòng xác minh KYC để nạp tiền"
- Redirect đến trang KYC verification

### 5H: Tài khoản bị suspend
- **Tại Bước 6**: Account status = suspended
- Hệ thống kiểm tra trạng thái tài khoản
- Hiển thị: "Tài khoản của bạn đã bị tạm khóa. Vui lòng liên hệ hỗ trợ"
- Không cho phép nạp tiền

### 5I: Khách hàng hủy giao dịch
- **Tại Bước 9**: Khách hàng đóng trang thanh toán hoặc click "Cancel"
- Payment Gateway không tạo charge
- Hệ thống cập nhật status = "cancelled"
- Khách hàng có thể thử lại sau

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Thành công
- Số dư ví khách hàng đã được cập nhật
- Transaction đã được ghi lại với status "completed"
- Email xác nhận đã được gửi
- Khách hàng có thể sử dụng số tiền để đầu tư, rút, chuyển, v.v.

### 6B: Thất bại/Hủy bỏ
- Transaction được ghi lại với status "failed" hoặc "cancelled"
- Số dư ví không thay đổi
- Khách hàng có thể thử lại
- Email thông báo giao dịch thất bại (nếu cần)

---

## 7. YÊU CẦU ĐẶC BIỆT

- Tất cả các giao dịch nạp tiền phải được log và audit
- Phải verify signature của callback/webhook để đảm bảo an toàn
- Transaction ID phải unique và không thể giả mạo
- Cần có cơ chế xử lý transaction pending (cronjob)
- Cần có minimum/maximum deposit amount
- Có thể cần KYC verification tùy vào số tiền
- Email notification bắt buộc cho mọi giao dịch
- Phải có rate limiting để tránh spam

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể tích hợp nhiều Payment Gateway khác
- Có thể thêm phương thức thanh toán bằng ví điện tử Việt Nam (Momo, ZaloPay)
- Có thể có chương trình khuyến mãi cho nạp tiền lần đầu
- Có thể tích hợp voucher/coupon cho nạp tiền
- Có thể tích hợp loyalty points khi nạp tiền

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: 
  - UC-S-01: Xử lý Thanh toán tự động (System process callback)
- **Precedes**: 
  - UC-C-13: Mua gói đầu tư (cần có tiền trong ví)
  - UC-C-08: Rút tiền (sau khi có tiền)
  - UC-A-05: Quản lý Nạp tiền (Admin quản lý)
- **Depends on**: 
  - UC-C-02: Đăng nhập (phải đăng nhập trước)
  - UC-C-04: Xác minh tài khoản (có thể bắt buộc)

---

## 10. LUỒNG CALLBACK/WEBHOOK (DETAILED)

### 10A: Stripe Webhook
1. Payment thành công trên Stripe
2. Stripe gửi webhook event về endpoint: `/webhook/stripe`
3. Hệ thống nhận webhook
4. Verify webhook signature với Stripe secret key
5. Parse event data (payment_intent.succeeded)
6. Tìm transaction trong database theo metadata
7. Cập nhật status = "completed"
8. Cộng tiền vào ví
9. Gửi email notification
10. Trả về HTTP 200 cho Stripe

### 10B: CoinPayment IPN
1. Payment thành công trên CoinPayment
2. CoinPayment gửi IPN về endpoint: `/webhook/coinpayment`
3. Hệ thống nhận IPN
4. Verify IPN signature với secret key
5. Kiểm tra IPN chưa được xử lý (tránh duplicate)
6. Update transaction trong database
7. Cộng tiền vào ví
8. Gửi email notification
9. Trả về "OK" cho CoinPayment

---

## 11. BẢO MẬT

### Webhook/IPN Security
- Verify HMAC signature của mọi webhook
- Whitelist IP addresses của Payment Gateway
- Rate limiting cho webhook endpoints
- Idempotency key để tránh xử lý trùng

### Transaction Security
- Tất cả số tiền đều phải validate trên cả client và server
- Không tin tưởng client input
- Database transaction để đảm bảo atomicity
- Log đầy đủ mọi thay đổi

### Financial Security
- Reconciliation: Đối chiếu số tiền với Payment Gateway
- Audit trail đầy đủ
- Alert cho admin nếu có bất thường
- Manual review cho giao dịch lớn

---

## 12. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-FINANCE-001
- **Business Rule**: BR-DEPOSIT-001, BR-DEPOSIT-002
- **Related Module**: Finance Module, Payment Gateway Integration
- **Database Tables**: 
  - transactions (deposits)
  - wallets
  - transaction_history
  - payment_gateways

---

## 13. GHI CHÚ

- Đây là use case quan trọng về mặt tài chính
- Phải có reconciliation process hàng ngày
- Cần có monitoring và alerting
- Cần test đầy đủ các trường hợp lỗi
- Cần có dashboard để theo dõi deposit metrics
- Cần support manual credit nếu có vấn đề

