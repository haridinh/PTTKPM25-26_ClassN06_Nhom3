# KỊCH BẢN USE CASE: ĐĂNG KÝ TÀI KHOẢN

## Thông tin Use Case
- **Use Case ID**: UC-C-01
- **Tên Use Case**: Đăng ký tài khoản (Registration)
- **Actor**: Customer (Khách hàng)
- **Mức độ ưu tiên**: Critical - Essential for onboarding

---

## 1. MÔ TẢ NGẮN GỌN

Khách hàng mới có thể đăng ký tài khoản trong hệ thống bằng cách cung cấp thông tin cá nhân, email, username, mật khẩu và mã giới thiệu (nếu có). Sau khi đăng ký, hệ thống gửi email xác minh và khách hàng cần kích hoạt tài khoản.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Khách hàng chưa có tài khoản trong hệ thống
- Hệ thống đang hoạt động bình thường
- Email server đang hoạt động (để gửi email xác minh)
- Khách hàng có kết nối internet

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Khách hàng truy cập trang đăng ký
- Khách hàng vào trang chủ của hệ thống
- Khách hàng click vào nút "Đăng ký" hoặc "Register"

### Bước 2: Hệ thống hiển thị form đăng ký
- Hệ thống hiển thị form đăng ký với các trường:
  - Họ và tên (First Name, Last Name)
  - Email
  - Username
  - Số điện thoại
  - Mật khẩu
  - Xác nhận mật khẩu
  - Mã giới thiệu (referral code) - Tùy chọn
  - Checkbox chấp nhận điều khoản

### Bước 3: Khách hàng điền thông tin
- Khách hàng điền đầy đủ thông tin theo yêu cầu
- Khách hàng chọn checkbox chấp nhận điều khoản sử dụng
- Khách hàng có thể nhập mã giới thiệu nếu có

### Bước 4: Khách hàng submit form
- Khách hàng click nút "Đăng ký" hoặc "Submit"
- Hệ thống validate dữ liệu đầu vào

### Bước 5: Hệ thống kiểm tra dữ liệu hợp lệ
- Kiểm tra email chưa tồn tại trong hệ thống
- Kiểm tra username chưa tồn tại
- Kiểm tra mật khẩu đủ mạnh (tối thiểu 8 ký tự, có chữ hoa, số, ký tự đặc biệt)
- Kiểm tra số điện thoại hợp lệ
- Kiểm tra email hợp lệ theo định dạng
- Nếu có mã giới thiệu, kiểm tra mã hợp lệ và tồn tại trong hệ thống

### Bước 6: Hệ thống tạo tài khoản
- Hệ thống tạo user mới trong database
- Mã hóa mật khẩu bằng bcrypt/hash
- Ghi nhận mã giới thiệu nếu có
- Trạng thái ban đầu: chưa xác minh email, chưa kích hoạt

### Bước 7: Hệ thống gửi email xác minh
- Hệ thống tạo mã xác minh duy nhất
- Gửi email xác minh đến địa chỉ email của khách hàng
- Email chứa link kích hoạt tài khoản

### Bước 8: Hệ thống thông báo thành công
- Hiển thị thông báo: "Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản"
- Hướng dẫn khách hàng mở email và click vào link xác minh

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Khách hàng có mã giới thiệu
- **Tại Bước 3**: Khách hàng nhập mã giới thiệu
- **Tại Bước 5**: Hệ thống kiểm tra mã giới thiệu có tồn tại
- Nếu mã hợp lệ:
  - Liên kết khách hàng mới với người giới thiệu (sponsor)
  - Ghi nhận trong bảng referral/commission
  - Tiếp tục các bước sau như luồng chính

### 4B: Khách hàng click vào link xác minh trong email
- Khách hàng mở email xác minh
- Click vào link kích hoạt
- Hệ thống kiểm tra token/verification code
- Nếu hợp lệ:
  - Cập nhật trạng thái tài khoản là "đã kích hoạt"
  - Hiển thị thông báo thành công
  - Chuyển hướng đến trang đăng nhập hoặc tự động đăng nhập

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Email đã tồn tại
- **Tại Bước 5**: Email đã được sử dụng
- Hệ thống hiển thị thông báo lỗi: "Email này đã được sử dụng"
- Khách hàng có thể đăng nhập hoặc sử dụng email khác

### 5B: Username đã tồn tại
- **Tại Bước 5**: Username đã được sử dụng
- Hệ thống hiển thị thông báo lỗi: "Tên đăng nhập đã tồn tại"
- Khách hàng chọn username khác

### 5C: Mật khẩu không đủ mạnh
- **Tại Bước 5**: Mật khẩu không đáp ứng yêu cầu
- Hệ thống hiển thị yêu cầu: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt"
- Khách hàng đổi mật khẩu

### 5D: Thông tin không hợp lệ
- **Tại Bước 5**: Các trường khác không hợp lệ (số điện thoại, định dạng email)
- Hệ thống hiển thị thông báo lỗi tương ứng cho từng trường
- Khách hàng sửa lại thông tin

### 5E: Mã giới thiệu không hợp lệ
- **Tại Bước 5**: Mã giới thiệu không tồn tại hoặc đã hết hạn
- Hệ thống hiển thị thông báo: "Mã giới thiệu không hợp lệ"
- Khách hàng có thể để trống hoặc nhập mã khác

### 5F: Không gửi được email
- **Tại Bước 7**: Email server lỗi hoặc không gửi được
- Hệ thống lưu trạng thái tài khoản "chưa xác minh email"
- Hiển thị thông báo: "Đăng ký thành công nhưng không thể gửi email. Vui lòng liên hệ hỗ trợ"
- Lưu log lỗi để admin xử lý

### 5G: Không chấp nhận điều khoản
- **Tại Bước 3**: Khách hàng không check vào checkbox
- Hệ thống hiển thị thông báo: "Vui lòng chấp nhận điều khoản sử dụng"
- Không cho submit form

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Thành công
- Tài khoản đã được tạo trong hệ thống
- Email xác minh đã được gửi
- Khách hàng có thể đăng nhập sau khi kích hoạt email
- Nếu có mã giới thiệu hợp lệ, relationship được tạo với người giới thiệu

### 6B: Thất bại
- Không có tài khoản mới nào được tạo
- Thông tin lỗi được hiển thị cho khách hàng
- Khách hàng có thể thử lại hoặc liên hệ hỗ trợ

---

## 7. YÊU CẦU ĐẶC BIỆT

- Mật khẩu phải được mã hóa an toàn trước khi lưu vào database
- Email xác minh phải chứa token/mã an toàn, có thời hạn sử dụng
- Cần có cơ chế resend email xác minh nếu khách hàng không nhận được
- Link xác minh trong email có hạn sử dụng (ví dụ: 24 giờ)
- Cần validate XSS và SQL Injection cho tất cả input
- Username và Email phải unique trong hệ thống

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể tích hợp OAuth (Google, Facebook) để đăng ký nhanh
- Có thể tích hợp SMS verification thay vì email
- Có thể thêm xác minh phone number qua OTP
- Có thể tích hợp CAPTCHA để chống bot/ spam
- Có thể gửi welcome bonus nếu đăng ký với mã giới thiệu

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: (không có)
- **Precedes**: 
  - UC-C-02: Đăng nhập (Login)
  - UC-C-04: Xác minh tài khoản (KYC Verification)

---

## 10. LUỒNG XÁC MINH EMAIL (BONUS)

### Khi khách hàng click vào link trong email:
1. Hệ thống nhận request với token/verification code
2. Kiểm tra token có hợp lệ, chưa hết hạn, chưa được sử dụng
3. Nếu hợp lệ:
   - Cập nhật trạng thái tài khoản: email_verified = true, status = active
   - Đánh dấu token đã được sử dụng
   - Hiển thị thông báo: "Kích hoạt tài khoản thành công! Bây giờ bạn có thể đăng nhập"
   - Redirect đến trang đăng nhập
4. Nếu không hợp lệ:
   - Hiển thị thông báo: "Link xác minh không hợp lệ hoặc đã hết hạn"
   - Cung cấp link để gửi lại email xác minh

### Resend verification email:
1. Khách hàng có thể yêu cầu gửi lại email xác minh
2. Hệ thống tạo token mới và gửi email mới
3. Token cũ sẽ bị vô hiệu hóa

---

## 11. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-USER-001
- **Business Rule**: BR-REG-001
- **Related Module**: Customer Module, Auth Module
- **Database Tables**: 
  - users
  - user_referrals (nếu có mã giới thiệu)
  - email_verifications

---

## 12. GHI CHÚ

- Use case này là điểm vào quan trọng nhất của hệ thống
- Cần đảm bảo UX tốt và validation đầy đủ
- Cần có cơ chế chống spam đăng ký
- Nên có logging đầy đủ cho việc audit
- Cần có backup và recovery cho email server

