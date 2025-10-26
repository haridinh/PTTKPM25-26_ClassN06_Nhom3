# KỊCH BẢN USE CASE: XÁC MINH KYC KHÁCH HÀNG

## Thông tin Use Case
- **Use Case ID**: UC-A-04
- **Tên Use Case**: Xác minh KYC (Verify Customer KYC)
- **Actor**: Admin (Quản trị viên)
- **Mức độ ưu tiên**: Critical - Critical for compliance and enabling customer actions

---

## 1. MÔ TẢ NGẮN GỌN

Admin xem danh sách các yêu cầu xác minh KYC từ khách hàng, xem xét tài liệu đã tải lên, và quyết định duyệt hoặc từ chối. Khi duyệt, tài khoản khách hàng được cập nhật trạng thái KYC verified, cho phép họ thực hiện các giao dịch lớn.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Admin đã đăng nhập vào hệ thống với quyền quản lý KYC
- Có ít nhất một yêu cầu KYC đang pending từ Customer
- Hệ thống đang hoạt động bình thường
- Admin có quyền truy cập và xem tài liệu của khách hàng

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Admin truy cập trang quản lý KYC
- Admin vào menu "Quản lý KYC" hoặc "KYC Management"
- URL: /admin/kyc hoặc /backend/kyc

### Bước 2: Hệ thống hiển thị danh sách yêu cầu KYC
- Hiển thị dashboard với:
  - Tổng số yêu cầu pending
  - Tổng số đã duyệt
  - Tổng số bị từ chối
  - Chart/statistics về KYC verification
- Hiển thị danh sách các yêu cầu KYC với:
  - User ID, tên
  - Email, số điện thoại
  - Trạng thái (pending, approved, rejected)
  - Ngày submit
  - Priority (nếu có)

### Bước 3: Admin xem danh sách yêu cầu pending
- Admin filter và xem các yêu cầu đang chờ xử lý
- Sắp xếp theo ngày (mới nhất trước) hoặc theo priority
- Click vào một request để xem chi tiết

### Bước 4: Hệ thống hiển thị chi tiết yêu cầu KYC
- Hiển thị thông tin khách hàng:
  - Họ và tên
  - Email
  - Số điện thoại
  - Địa chỉ
  - Ngày sinh
  - Số CMND/CCCD
  - Trạng thái tài khoản
- Hiển thị tài liệu đã upload:
  - CMND/CCCD mặt trước (preview + download)
  - CMND/CCCD mặt sau (preview + download)
  - Ảnh selfie (preview + download)
  - Các tài liệu khác nếu có

### Bước 5: Admin xem xét tài liệu
- Admin click để xem từng tài liệu full size
- Admin verify:
  - Ảnh rõ nét, đủ thông tin
  - Thông tin khớp với thông tin đăng ký
  - Không có dấu hiệu giả mạo
  - Match với thông tin trong database

### Bước 6: Admin kiểm tra thông tin bổ sung
- Xem lịch sử giao dịch của khách hàng
- Xem trạng thái tài khoản hiện tại
- Kiểm tra xem có khoản vay hoặc investment nào không
- Xem risk score (nếu có)

### Bước 7: Admin quyết định duyệt KYC
- Admin đánh giá tài liệu đủ điều kiện
- Admin có thể thêm ghi chú nội bộ
- Admin click nút "Duyệt" hoặc "Approve"

### Bước 8: Hệ thống xác nhận hành động
- Hiển thị popup confirm: "Bạn có chắc chắn muốn duyệt KYC này?"
- Admin confirm
- Hệ thống validate quyền của admin

### Bước 9: Hệ thống cập nhật trạng thái
- Cập nhật user record:
  - kyc_status = "approved"
  - kyc_verified_at = current timestamp
  - kyc_verified_by = admin_id
  - KYC level được update (ví dụ: level 1, level 2)
- Tạo KYC verification record trong log/history

### Bước 10: Hệ thống gửi thông báo
- Gửi email đến khách hàng:
  - Subject: "KYC của bạn đã được duyệt"
  - Nội dung: Thông báo KYC approved, giờ có thể thực hiện các giao dịch lớn hơn
- Hiển thị in-app notification cho customer

### Bước 11: Cập nhật permissions của khách hàng
- Unlock các tính năng yêu cầu KYC:
  - Cho phép nạp tiền lớn hơn
  - Cho phép rút tiền lớn hơn
  - Cho phép đăng ký vay
  - Cho phép đầu tư với số tiền lớn hơn

### Bước 12: Hiển thị thông báo cho Admin
- "KYC đã được duyệt thành công!"
- Redirect về danh sách hoặc request tiếp theo

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Admin từ chối KYC
- **Tại Bước 7**: Admin không đồng ý duyệt
- Click "Từ chối" hoặc "Reject"
- Hệ thống hiển thị form lý do từ chối:
  - Dropdown: Tài liệu không rõ, thông tin không khớp, nghi ngờ giả mạo, v.v.
  - Textarea: Ghi chú chi tiết (optional)
- Submit và update status = "rejected"
- Gửi email cho customer với lý do từ chối
- Customer có thể upload tài liệu mới và submit lại

### 4B: Admin yêu cầu thông tin bổ sung
- **Tại Bước 7**: Cần thêm tài liệu
- Click "Yêu cầu bổ sung" hoặc "Request More Info"
- Form điền thông tin cần thêm
- Email cho customer yêu cầu upload thêm
- Status = "pending_more_info"
- Sau khi customer upload, status trở lại "pending"

### 4C: Admin bulk approve
- Chọn nhiều yêu cầu cùng lúc
- Click "Duyệt tất cả" (có confirm)
- Xử lý hàng loạt (phải cẩn thận)

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Tài liệu không rõ hoặc thiếu
- **Tại Bước 5**: Ảnh mờ, thiếu góc, khó đọc
- Admin click reject và chọn lý do
- Customer được thông báo upload lại

### 5B: Thông tin không khớp
- **Tại Bước 5**: Thông tin trên CMND khác với database
- Admin note và reject với lý do
- Customer phải update thông tin và upload lại

### 5C: Nghi ngờ giả mạo tài liệu
- **Tại Bước 5**: Có dấu hiệu Photoshop, giả mạo
- Admin reject và ghi chú nội bộ
- Có thể block tài khoản
- Gửi email thông báo nghiêm trọng

### 5D: Hệ thống lỗi khi cập nhật
- **Tại Bước 9**: Database lỗi
- Rollback và hiển thị "Có lỗi xảy ra. Vui lòng thử lại"
- Log error để xử lý
- Admin thử lại

### 5E: Email không gửi được
- **Tại Bước 10**: Email server lỗi
- Vẫn cập nhật KYC status trong database
- Log lỗi email
- Retry sau hoặc admin gửi manual

### 5F: Admin không có quyền
- **Tại Bước 8**: Permission denied
- Hiển thị "Bạn không có quyền thực hiện hành động này"
- Redirect về trang chính

### 5G: Request đã được xử lý bởi admin khác
- **Tại Bước 8**: Concurrent access
- Hiển thị "Request này đã được xử lý bởi admin [tên] lúc [time]"
- Refresh danh sách
- Không cho phép duplicate action

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Duyệt thành công
- KYC status của customer = "approved"
- Customer được unlock các tính năng yêu cầu KYC
- Email đã được gửi
- Log đã được ghi
- Request được move ra khỏi pending list

### 6B: Từ chối thành công
- KYC status = "rejected"
- Email với lý do đã được gửi
- Customer có thể upload lại sau
- Log ghi lại lý do từ chối

### 6C: Thất bại
- Không có thay đổi nào
- Hiển thị lỗi
- Admin có thể thử lại

---

## 7. YÊU CẦU ĐẶC BIỆT

- Tất cả actions phải được audit logged
- Cần có role-based access control
- Tài liệu khách hàng phải được bảo vệ (encryption, access control)
- Cần có cơ chế chống spam/abuse
- Cần có SLA về thời gian xử lý (ví dụ: trong 24-48h)
- Phải tuân thủ các quy định về dữ liệu cá nhân (GDPR, etc.)
- Cần có đối chiếu (reconciliation) với hệ thống bên ngoài nếu có

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể tích hợp AI/ML để tự động verify KYC
- Có thể tích hợp e-KYC với các nhà cung cấp bên thứ 3
- Có thể có auto-approval cho khách hàng lặp lại
- Có thể tích hợp biometric verification
- Có thể có risk scoring tự động

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: 
  - UC-C-04: Xác minh tài khoản (Customer submit KYC)
- **Precedes**: 
  - UC-A-05: Quản lý Nạp tiền (Customer có thể nạp tiền lớn sau khi verified)
  - UC-C-20: Đăng ký vay (cần KYC verified)
  - UC-C-13: Mua gói đầu tư lớn (có thể cần KYC)
- **Follows**: 
  - UC-C-02: Đăng nhập (Customer đăng nhập và submit KYC)

---

## 10. KYC LEVELS

### Level 1: Basic KYC
- Email verified
- Phone verified
- Có thể: Nạp tiền nhỏ, đầu tư nhỏ

### Level 2: Standard KYC
- Level 1 +
- CMND/CCCD verified
- Có thể: Nạp/rút lớn hơn, đầu tư lớn hơn

### Level 3: Enhanced KYC
- Level 2 +
- Selfie với CMND
- Proof of address
- Có thể: Mọi giao dịch lớn, vay tiền

### Level 4: Premium KYC
- Level 3 +
- Additional documents
- Background check
- VIP features

---

## 11. COMPLIANCE VÀ BẢO MẬT

### Data Protection
- KYC documents phải được encrypt
- Chỉ authorized admin mới có thể xem
- Files không được expose qua public URL
- Access logs phải được ghi lại

### Audit Trail
- Log mọi action:
  - Ai xem tài liệu
  - Ai approve/reject
  - Khi nào
  - Lý do (nếu có)

### Compliance
- GDPR: Right to be forgotten
- PCI-DSS: Nếu lưu thông tin thanh toán
- Local regulations: Tuân thủ quy định địa phương

---

## 12. BATCH PROCESSING

### Auto-approval cho trường hợp rõ ràng
- Nếu tài liệu 100% match và clear
- Risk score low
- Lịch sử tốt
- Có thể có auto-approve với threshold

### Priority queue
- VIP customers: High priority
- First-time submission: Standard priority
- Resubmission: Normal priority
- Suspicious: High priority (for review)

---

## 13. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-KYC-001
- **Business Rule**: BR-KYC-001, BR-KYC-002
- **Related Module**: Customer Module, Security Module
- **Database Tables**: 
  - users (kyc_status, kyc_level)
  - kyc_verifications
  - kyc_documents
  - kyc_audit_logs

---

## 14. GHI CHÚ

- Đây là use case quan trọng cho compliance
- Cần có quy trình xử lý rõ ràng
- Cần có training cho Admin
- Cần có monitoring và alerting
- Cần có SLA và KPI tracking
- Phải có escalation process nếu có nghi ngờ

