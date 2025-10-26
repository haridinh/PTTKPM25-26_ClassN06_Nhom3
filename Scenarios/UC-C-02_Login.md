# KỊCH BẢN USE CASE: ĐĂNG NHẬP

## Thông tin Use Case

- **Use Case ID**: UC-C-02
- **Tên Use Case**: Đăng nhập (Login)
- **Actor**: Customer (Khách hàng)
- **Mức độ ưu tiên**: Critical - Required for system access

---

## 1. MÔ TẢ NGẮN GỌN

Khách hàng có thể đăng nhập vào hệ thống bằng email/username và mật khẩu. Nếu đã bật 2FA hoặc OTP, hệ thống sẽ yêu cầu xác thực bước 2. Sau khi đăng nhập thành công, khách hàng được chuyển đến dashboard.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Khách hàng đã có tài khoản trong hệ thống
- Tài khoản đã được kích hoạt (email verified)
- Khách hàng có kết nối internet
- Hệ thống đang hoạt động bình thường

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Khách hàng truy cập trang đăng nhập

- Khách hàng vào trang chủ hoặc trang đăng nhập
- URL: /login hoặc /customer/login

### Bước 2: Hệ thống hiển thị form đăng nhập

- Hệ thống hiển thị form đăng nhập với các trường:
  - Email hoặc Username
  - Mật khẩu
  - Checkbox "Ghi nhớ đăng nhập" (Remember me)
  - Link "Quên mật khẩu"
  - Link "Đăng ký"
  - Có thể có option "Đăng nhập bằng Google/Facebook"

### Bước 3: Khách hàng nhập thông tin

- Khách hàng nhập email/username và mật khẩu
- Khách hàng có thể chọn "Ghi nhớ đăng nhập"
- Khách hàng click nút "Đăng nhập"

### Bước 4: Hệ thống validate dữ liệu

- Kiểm tra email/username và mật khẩu không được để trống
- Kiểm tra email/username có tồn tại trong hệ thống không

### Bước 5: Hệ thống xác thực thông tin

- Tìm user trong database theo email hoặc username
- Kiểm tra trạng thái tài khoản (active, suspended, banned)
- Verify mật khẩu bằng bcrypt/hash

### Bước 6: Kiểm tra xác thực 2FA/OTP

- Kiểm tra user có bật 2FA không
- Nếu có bật 2FA:
  - Chuyển đến bước xác thực 2FA/OTP (Alternative Flow 4A)
- Nếu không bật 2FA:
  - Tiếp tục bước 7

### Bước 7: Đăng nhập thành công

- Hệ thống tạo session/authentication token
- Lưu thông tin user vào session
- Ghi nhận lịch sử đăng nhập (login history)
- Nếu chọn "Ghi nhớ đăng nhập", tạo remember token (có thể là cookie 7-30 ngày)

### Bước 8: Chuyển hướng

- Redirect đến dashboard của khách hàng
- Hiển thị thông báo: "Đăng nhập thành công"

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Xác thực 2FA/OTP

- **Tại Bước 6**: Nếu user đã bật 2FA hoặc OTP
- Hệ thống hiển thị form nhập mã 2FA/OTP
- Khách hàng nhập mã xác thực từ Google Authenticator hoặc nhận OTP qua SMS
- Hệ thống verify mã
- Nếu đúng: Tiếp tục bước 7 của Main Flow
- Nếu sai: Hiển thị lỗi "Mã xác thực không đúng" (Exception 5G)

### 4B: Đăng nhập bằng OAuth (Google/Facebook)

- **Tại Bước 2**: User click "Đăng nhập bằng Google/Facebook"
- Hệ thống redirect đến trang OAuth của bên thứ 3
- User cho phép truy cập
- OAuth provider trả về thông tin user
- Hệ thống kiểm tra user đã tồn tại chưa:
  - Nếu đã tồn tại: Đăng nhập thành công
  - Nếu chưa tồn tại: Tạo tài khoản mới rồi đăng nhập

### 4C: Đăng nhập bằng remember token

- User đã từng chọn "Ghi nhớ đăng nhập"
- Khi truy cập lại trang web:
  - Hệ thống check remember token trong cookie
  - Nếu token hợp lệ và chưa hết hạn:
    - Tự động đăng nhập
    - Không cần nhập lại mật khẩu
    - Ghi nhận login history

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Email/Username không tồn tại

- **Tại Bước 5**: Không tìm thấy user
- Hệ thống hiển thị: "Email/Username hoặc mật khẩu không đúng"
- (Không tiết lộ chính xác là email hay mật khẩu sai để bảo mật)
- Khách hàng thử lại

### 5B: Mật khẩu sai

- **Tại Bước 5**: Mật khẩu không khớp
- Hệ thống hiển thị: "Email/Username hoặc mật khẩu không đúng"
- Tăng số lần thử sai
- Nếu đăng nhập sai quá nhiều lần (ví dụ: 5 lần): Khóa tài khoản tạm thời (Exception 5E)

### 5C: Tài khoản chưa kích hoạt

- **Tại Bước 5**: Email chưa được verify
- Hệ thống hiển thị: "Vui lòng kích hoạt tài khoản qua email"
- Cung cấp link để gửi lại email kích hoạt
- Điều hướng đến trang resend verification email

### 5D: Tài khoản bị khóa/suspended

- **Tại Bước 5**: Account status = suspended/banned
- Hiển thị: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ"
- Không cho phép đăng nhập
- Ghi nhận login attempt vào log

### 5E: Đăng nhập sai quá nhiều lần

- **Tại Bước 5**: Đã đăng nhập sai quá 5 lần trong 15 phút
- Hệ thống khóa tài khoản tạm thời 30 phút
- Hiển thị: "Tài khoản tạm thời bị khóa do đăng nhập sai nhiều lần. Vui lòng thử lại sau"
- Gửi email thông báo về việc khóa tài khoản
- Gửi link để unlock tài khoản

### 5F: Thông tin để trống

- **Tại Bước 4**: Email/Username hoặc mật khẩu để trống
- Hệ thống hiển thị validation error: "Vui lòng nhập đầy đủ thông tin"

### 5G: Mã 2FA/OTP sai

- **Tại Alternative Flow 4A**: Mã xác thực không đúng
- Hiển thị: "Mã xác thực không đúng"
- Tăng số lần thử sai
- Nếu sai quá 3 lần: Yêu cầu đăng nhập lại từ đầu

### 5H: Token hết hạn

- **Tại Alternative Flow 4C**: Remember token hết hạn
- Không tự động đăng nhập
- Yêu cầu đăng nhập lại bằng mật khẩu

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Thành công

- User đã đăng nhập vào hệ thống
- Session được tạo và lưu
- Login history được ghi lại
- User được redirect đến dashboard
- Có thể truy cập các chức năng khác của hệ thống

### 6B: Thất bại

- Không tạo session
- Hiển thị thông báo lỗi
- User vẫn ở trang đăng nhập và có thể thử lại

---

## 7. YÊU CẦU ĐẶC BIỆT

- Mật khẩu phải được hash và không lưu plain text
- Session token phải an toàn, có hạn sử dụng
- Cần có cơ chế CSRF protection
- Cần rate limiting để chống brute force
- Login history phải được log đầy đủ (IP, device, time)
- Cần có cơ chế "Ghi nhớ đăng nhập" an toàn
- Token cho OAuth/2FA phải có thời hạn

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể thêm xác thực sinh trắc học (biometric)
- Có thể tích hợp SMS login
- Có thể có IP whitelist cho tài khoản VIP
- Có thể có tính năng đăng nhập từ nhiều thiết bị
- Có thể thêm device fingerprinting

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**:
  - UC-C-05: Xác thực hai yếu tố (Two Factor Authentication) - nếu user có bật 2FA
- **Precedes**: Tất cả các use case khác của Customer (sau khi đăng nhập)
- **Reference**:
  - UC-C-01: Đăng ký tài khoản (nếu chưa có tài khoản)
  - UC-C-35: Quản lý Ví - có thể truy cập sau khi đăng nhập

---

## 10. LUỒNG QUÊN MẬT KHẨU (BONUS)

### 10A: Khách hàng quên mật khẩu

1. Khách hàng click "Quên mật khẩu" tại trang đăng nhập
2. Hệ thống hiển thị form nhập email
3. Khách hàng nhập email
4. Hệ thống kiểm tra email tồn tại
5. Nếu tồn tại:
   - Tạo reset token duy nhất
   - Gửi email chứa link đặt lại mật khẩu
   - Link có hạn sử dụng (ví dụ: 1 giờ)
   - Hiển thị: "Vui lòng kiểm tra email để đặt lại mật khẩu"
6. Nếu không tồn tại:
   - Hiển thị: "Email không tồn tại" (không nên nói rõ là email không tồn tại để bảo mật)

### 10B: Khách hàng click link reset password

1. Click vào link trong email
2. Hệ thống verify reset token
3. Nếu hợp lệ:
   - Hiển thị form nhập mật khẩu mới
   - Khách hàng nhập mật khẩu mới và xác nhận
   - Hệ thống cập nhật mật khẩu mới
   - Token bị vô hiệu hóa
   - Hiển thị: "Đặt lại mật khẩu thành công. Vui lòng đăng nhập"
   - Redirect đến trang đăng nhập
4. Nếu không hợp lệ hoặc hết hạn:
   - Hiển thị: "Link không hợp lệ hoặc đã hết hạn"
   - Cung cấp link để yêu cầu lại

---

## 11. BẢO MẬT

### Rate Limiting

- Giới hạn số lần đăng nhập mỗi IP: 10 lần/phút
- Nếu vượt quá: hiển thị "Bạn đã thử quá nhiều lần, vui lòng thử lại sau"

### Brute Force Protection

- Sau 5 lần đăng nhập sai: khóa tài khoản 30 phút
- Cảnh báo email cho user về đăng nhập không thành công
- Log tất cả các attempt để theo dõi

### Session Security

- Session token ngẫu nhiên, an toàn
- Session timeout: 30 phút không hoạt động
- HTTPS bắt buộc
- HttpOnly flag cho cookies để chống XSS

### 2FA/OTP Security

- 2FA token có thời hạn: 60 giây
- OTP có thời hạn: 5 phút
- Giới hạn số lần verify: 3 lần
- Sau khi verify sai 3 lần: yêu cầu request mã mới

---

## 12. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-USER-002
- **Business Rule**: BR-LOGIN-001
- **Related Module**: Auth Module, Customer Module
- **Database Tables**:
  - users
  - sessions
  - login_history
  - remember_tokens
  - two_factor_auth

---

## 13. GHI CHÚ

- Đây là use case quan trọng nhất cho bảo mật
- Cần log đầy đủ để audit và theo dõi bảo mật
- Cần implement rate limiting và brute force protection
- Nên có monitoring để phát hiện tấn công
- Test đầy đủ các trường hợp lỗi và edge cases
