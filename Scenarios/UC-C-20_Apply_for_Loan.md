# KỊCH BẢN USE CASE: ĐĂNG KÝ VAY

## Thông tin Use Case
- **Use Case ID**: UC-C-20
- **Tên Use Case**: Đăng ký vay (Apply for Loan)
- **Actor**: Customer (Khách hàng)
- **Mức độ ưu tiên**: Critical - Key for B2X Loan module

---

## 1. MÔ TẢ NGẮN GỌN

Khách hàng có thể xem các gói vay có sẵn, sử dụng công cụ tính toán khoản vay để xem số tiền phải trả, điền đơn đăng ký vay với thông tin cá nhân và tài chính, rồi gửi đơn. Admin sau đó sẽ xem xét và phê duyệt hoặc từ chối đơn vay.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Khách hàng đã đăng nhập vào hệ thống
- Tài khoản đã được kích hoạt và verify email
- Khách hàng đã xác minh KYC (bắt buộc cho việc vay)
- Có ít nhất một gói vay đang active trong hệ thống
- Khách hàng chưa có khoản vay đang pending hoặc chưa thanh toán
- Hệ thống đang hoạt động bình thường

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Khách hàng truy cập trang vay
- Khách hàng vào menu "Vay tiêu dùng" hoặc "Loan"
- URL: /loan hoặc /customer/loan

### Bước 2: Hệ thống hiển thị trang loan
- Hiển thị banner/quảng cáo về dịch vụ vay
- Hiển thị danh sách gói vay có sẵn với thông tin:
  - Tên gói vay
  - Số tiền tối thiểu/tối đa
  - Lãi suất (%/tháng)
  - Thời hạn vay (ví dụ: 3-12 tháng)
  - Điều kiện vay
- Hiển thị loan calculator cho khách hàng tính thử

### Bước 3: Khách hàng xem chi tiết gói vay
- Khách hàng click vào một gói để xem chi tiết
- Hiển thị:
  - Mô tả đầy đủ về gói
  - Lãi suất cụ thể
  - Phí phát sinh (nếu có)
  - Yêu cầu tài liệu để vay
  - Quy trình vay

### Bước 4: Khách hàng sử dụng Loan Calculator
- Khách hàng nhập:
  - Số tiền muốn vay (ví dụ: $5000)
  - Kỳ hạn vay (ví dụ: 6 tháng)
- Hệ thống tính toán và hiển thị:
  - Số tiền vay
  - Lãi suất (%)
  - Phí xử lý (nếu có)
  - Tổng số tiền phải trả
  - Số tiền trả mỗi tháng (EMI)
  - Bảng amortization (bảng trả nợ)

### Bước 5: Khách hàng quyết định đăng ký
- Khách hàng chọn gói vay và click "Đăng ký vay" hoặc "Apply Now"
- Hệ thống redirect đến form đăng ký

### Bước 6: Hệ thống hiển thị form đăng ký vay
- Form bao gồm các mục:
  - **Thông tin cá nhân** (đã có một phần từ KYC):
    - Họ và tên
    - Email
    - Số điện thoại
    - Địa chỉ
    - Ngày sinh
  - **Thông tin vay**:
    - Gói vay đã chọn
    - Số tiền muốn vay
    - Kỳ hạn vay
    - Mục đích vay
  - **Thông tin tài chính**:
    - Nghề nghiệp
    - Thu nhập hàng tháng
    - Chi phí hàng tháng
    - Có khoản vay nào khác không
  - **Tài liệu**:
    - Upload CMND/CCCD (bắt buộc)
    - Upload bảng lương (nếu có)
    - Upload sao kê ngân hàng (nếu có)
    - Upload các tài liệu khác (nếu có)

### Bước 7: Khách hàng điền form
- Khách hàng điền đầy đủ thông tin
- Upload các file tài liệu yêu cầu
- Review lại thông tin
- Khách hàng click "Gửi đơn" hoặc "Submit Application"

### Bước 8: Hệ thống validate dữ liệu
- Kiểm tra các trường bắt buộc không được để trống
- Kiểm tra format của email, số điện thoại
- Validate file uploaded:
  - File size không vượt quá limit
  - File type hợp lệ (JPG, PDF, PNG)
  - File không có virus
- Kiểm tra số tiền vay nằm trong range cho phép của gói
- Kiểm tra khách hàng không có khoản vay pending

### Bước 9: Hệ thống tạo đơn vay
- Tạo loan application record với status = "pending"
- Lưu thông tin vào database:
  - Loan ID (unique)
  - User ID
  - Loan Package ID
  - Amount requested
  - Loan term (thời hạn)
  - Personal info
  - Financial info
  - Documents uploaded
  - Created date
  - Status = "pending"
- Gửi email xác nhận đến khách hàng

### Bước 10: Thông báo cho Admin
- Hệ thống gửi notification cho Admin
- Admin có thể xem đơn vay mới trong dashboard
- Thông báo: "Có đơn vay mới cần xử lý"

### Bước 11: Hiển thị thông báo cho khách hàng
- Hiển thị: "Đăng ký vay thành công! Vui lòng đợi admin xem xét"
- Thông báo thời gian xử lý dự kiến (ví dụ: 1-3 ngày làm việc)
- Redirect đến trang "My Loans" để xem trạng thái

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Khách hàng đã có khoản vay đang pending
- **Tại Bước 5**: Kiểm tra existing loans
- Nếu có pending: Hiển thị "Bạn đang có khoản vay đang chờ xét duyệt"
- Không cho phép đăng ký mới
- Hướng dẫn đợi kết quả khoản vay hiện tại

### 4B: Khách hàng có khoản vay đang active nhưng muốn vay thêm
- Cần check business rule:
  - Nếu cho phép multiple loans: Cho phép đăng ký
  - Nếu không: Hiển thị "Vui lòng hoàn tất khoản vay hiện tại trước"

### 4C: Khách hàng upload file sau khi submit
- Cho phép edit application (nếu status = "pending")
- Có thể upload thêm tài liệu
- Gửi notification cho admin

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Chưa xác minh KYC
- **Tại Bước 5**: KYC status chưa verified
- Hiển thị: "Vui lòng xác minh KYC trước khi đăng ký vay"
- Redirect đến trang KYC verification
- Link để quay lại sau khi xong

### 5B: Số tiền vượt quá limit của gói
- **Tại Bước 8**: Amount > max loan amount của gói
- Hiển thị: "Số tiền tối đa cho gói này là $X"
- Cho phép chọn gói khác hoặc giảm số tiền

### 5C: Số tiền nhỏ hơn minimum
- **Tại Bước 8**: Amount < min loan amount
- Hiển thị: "Số tiền tối thiểu là $X"
- Khách hàng tăng số tiền hoặc chọn gói khác

### 5D: File upload lỗi hoặc không hợp lệ
- File quá lớn: "File tối đa 5MB"
- File type không hợp lệ: "Chỉ chấp nhận JPG, PDF, PNG"
- File corrupted: "File bị lỗi, vui lòng upload lại"
- Có thể upload lại

### 5E: Trường bắt buộc để trống
- **Tại Bước 8**: Missing required fields
- Highlight các trường còn thiếu
- Hiển thị: "Vui lòng điền đầy đủ thông tin bắt buộc"

### 5F: Email đã tồn tại trong đơn khác
- Kiểm tra email đã được dùng trong application khác
- Nếu có conflict: Cảnh báo nhưng vẫn cho phép (có thể là người khác)
- Admin sẽ xem xét

### 5G: Submit thất bại do lỗi hệ thống
- Database connection lỗi
- Storage lỗi khi save file
- Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại sau"
- Log error để admin xử lý
- Khách hàng có thể thử lại hoặc liên hệ hỗ trợ

### 5H: Network timeout
- Mất kết nối khi upload file
- Hiển thị: "Kết nối bị gián đoạn. Vui lòng thử lại"
- Có thể resume upload

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Thành công
- Loan application đã được tạo với status "pending"
- Tất cả tài liệu đã được lưu
- Email xác nhận đã được gửi
- Admin được thông báo về đơn mới
- Khách hàng có thể xem trạng thái trong "My Loans"

### 6B: Thất bại (validation error)
- Không có application nào được tạo
- Hiển thị lỗi cụ thể
- Khách hàng sửa và submit lại

### 6C: Thất bại (system error)
- Application có thể đã được tạo một phần
- Cần admin review và cleanup
- Khách hàng có thể submit lại sau khi hệ thống ổn định

---

## 7. YÊU CẦU ĐẶC BIỆT

- KYC verification là bắt buộc
- Phải validate tất cả file upload để bảo mật
- Cần encrypt sensitive financial information
- Cần có cơ chế spam protection (rate limiting)
- Phải log đầy đủ mọi thay đổi
- Email notification bắt buộc
- Documents phải được lưu an toàn với proper access control
- Cần có backup cho tài liệu

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể tích hợp Credit Bureau để check credit score
- Có thể có auto-approval cho khách hàng đủ điều kiện
- Có thể có tính năng "Pre-approval" dựa trên lịch sử
- Có thể tích hợp e-KYC để tự động verify
- Có thể có AI để đánh giá khả năng trả nợ

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: 
  - UC-C-19: Tính toán khoản vay (Loan Calculator)
  - UC-C-04: Xác minh tài khoản (KYC Verification)
- **Precedes**: 
  - UC-A-11: Quản lý Khoản Vay (Admin xét duyệt)
  - UC-C-21: Quản lý khoản vay
  - UC-C-22: Rút tiền từ khoản vay (sau khi được approve)
- **Depends on**: 
  - UC-C-02: Đăng nhập
  - UC-A-10: Quản lý Gói Vay (Admin phải tạo gói)

---

## 10. LOAN CALCULATOR FORMULA

### 10A: Tính EMI (Equated Monthly Installment)
```
EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)

P = Principal (số tiền vay)
r = Monthly interest rate (lãi suất/tháng)
n = Number of months (số tháng)
```

### 10B: Ví dụ
- Principal: $5000
- Interest rate: 2% per month
- Tenure: 6 months
- r = 0.02
- n = 6

```
EMI = 5000 × 0.02 × (1.02)^6 / ((1.02)^6 - 1)
EMI = 100 × 1.126 / 0.126
EMI = 126 / 0.126
EMI = $1000 per month

Total amount: $6000
Total interest: $1000
```

### 10C: Amortization Schedule
Month 1:
- Principal: $900
- Interest: $100
- Balance: $4100

Month 2:
- Principal: $918
- Interest: $82
- Balance: $3182
...

---

## 11. TÀI LIỆU CẦN THIẾT

### Bắt buộc:
- CMND/CCCD
- Thông tin cá nhân đầy đủ

### Tùy chọn (nhưng khuyến khích):
- Bảng lương
- Sao kê ngân hàng
- Giấy tờ chứng minh tài sản
- Bảo đảm (collateral documents)

---

## 12. LƯU TRỮ VÀ BẢO MẬT TÀI LIỆU

- Files phải được encrypt khi lưu
- Chỉ Admin và user sở hữu có thể xem
- Files có thể được lưu trên cloud storage (S3) với proper ACL
- Cần có process xóa files sau khi đóng file (GDPR compliance)
- Cần có virus scanning trước khi lưu

---

## 13. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-LOAN-001
- **Business Rule**: BR-LOAN-001, BR-LOAN-002
- **Related Module**: B2X Loan Module
- **Database Tables**: 
  - loan_applications
  - loan_packages
  - loan_documents
  - loan_history
  - users (KYC info)

---

## 14. GHI CHÚ

- Đây là use case quan trọng cho bộ phận Risk Management
- Cần có process để handle missed validation
- Cần có SLA về thời gian xử lý
- Cần có communication tốt với customer về status
- Cần có dashboard cho customer track status
- Phải có compliance với các quy định tài chính

