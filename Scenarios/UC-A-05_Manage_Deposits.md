# KỊCH BẢN USE CASE: QUẢN LÝ NẠP TIỀN

## Thông tin Use Case
- **Use Case ID**: UC-A-05
- **Tên Use Case**: Quản lý Nạp tiền (Manage Deposits)
- **Actor**: Admin (Quản trị viên)
- **Mức độ ưu tiên**: Critical - Handles customer financial requests

---

## 1. MÔ TẢ NGẮN GỌN

Admin có thể xem danh sách các giao dịch nạp tiền, phê duyệt hoặc từ chối các giao dịch đang chờ, xem chi tiết từng giao dịch, và thêm tín dụng thủ công cho khách hàng khi cần thiết.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Admin đã đăng nhập với quyền quản lý tài chính
- Có ít nhất một giao dịch nạp tiền trong hệ thống
- Hệ thống đang hoạt động bình thường
- Payment Gateway (nếu có) đang hoạt động

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Admin truy cập trang quản lý nạp tiền
- Admin vào menu "Quản lý nạp tiền" hoặc "Manage Deposits"
- URL: /admin/deposits hoặc /backend/deposits

### Bước 2: Hệ thống hiển thị dashboard nạp tiền
- Hiển thị statistics:
  - Tổng số giao dịch hôm nay
  - Tổng tiền nạp hôm nay
  - Tổng giao dịch pending
  - Tổng tiền pending
  - Chart biểu đồ nạp tiền theo thời gian

### Bước 3: Hệ thống hiển thị danh sách giao dịch
- Hiển thị bảng với các cột:
  - ID
  - Tên khách hàng (User)
  - Email
  - Số tiền
  - Phương thức thanh toán
  - Trạng thái (pending, completed, failed, rejected)
  - Ngày tạo
  - Actions (Xem, Duyệt, Từ chối)
- Có thể filter:
  - Theo trạng thái
  - Theo ngày tháng
  - Theo khách hàng
  - Theo phương thức

### Bước 4: Admin xem giao dịch pending
- Admin chọn filter "Chờ xử lý" hoặc "Pending"
- Hệ thống hiển thị các giao dịch cần duyệt
- Sắp xếp theo ngày tạo (cũ nhất trước) hoặc theo số tiền

### Bước 5: Admin chọn một giao dịch để xem chi tiết
- Click vào một giao dịch
- Hệ thống hiển thị modal hoặc page mới với chi tiết:
  - Transaction ID
  - Thông tin khách hàng (tên, email, phone)
  - Số tiền nạp
  - Phương thức thanh toán
  - Thông tin thanh toán (nếu có)
  - Reference number từ Payment Gateway
  - Screenshot proof (nếu manual deposit)
  - Thời gian tạo
  - Người xử lý (nếu đã xử lý)

### Bước 6: Admin xem xét giao dịch
- Admin verify:
  - Thông tin khách hàng
  - Số tiền có khớp với proof không
  - Payment gateway có confirm không
  - Không có dấu hiệu bất thường

### Bước 7: Admin quyết định duyệt
- Admin đánh giá giao dịch hợp lệ
- Admin có thể thêm ghi chú nội bộ (notes)
- Admin click "Duyệt" hoặc "Approve"

### Bước 8: Hệ thống xác nhận hành động
- Hiển thị popup confirm:
  - Số tiền sẽ cộng vào tài khoản
  - Khách hàng và email
  - "Bạn có chắc chắn muốn duyệt giao dịch này?"
- Admin confirm
- Hệ thống check quyền của admin

### Bước 9: Hệ thống cập nhật giao dịch
- **Begin Transaction**
- Update deposit record:
  - status = "completed"
  - processed_at = current timestamp
  - processed_by = admin_id
  - notes = admin notes (nếu có)
- Cộng tiền vào ví của khách hàng
- Tạo transaction record trong wallet_history
- **Commit Transaction**

### Bước 10: Hệ thống gửi thông báo
- Gửi email cho khách hàng:
  - "Giao dịch nạp tiền đã được duyệt"
  - Số tiền đã nạp
  - Số dư mới
- Hiển thị in-app notification

### Bước 11: Hiển thị kết quả
- "Giao dịch đã được duyệt thành công!"
- Tự động refresh danh sách
- Giao dịch chuyển sang "completed"

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Admin từ chối giao dịch
- **Tại Bước 7**: Không hợp lệ
- Click "Từ chối" hoặc "Reject"
- Nhập lý do từ chối:
  - Dropdown: Trùng lặp, không đúng số tiền, nghi ngờ lừa đảo, v.v.
  - Textarea: Ghi chú chi tiết (required)
- Submit
- Update status = "rejected"
- Gửi email cho customer với lý do
- Không cộng tiền

### 4B: Admin thêm tín dụng thủ công
- Tạo giao dịch nạp tiền manual từ Admin panel
- Form nhập:
  - Chọn khách hàng (search và select)
  - Số tiền
  - Phương thức: "Manual Credit"
  - Lý do (ví dụ: Hoàn tiền, bồi thường, bonus)
  - Ghi chú nội bộ
- Submit
- Tạo deposit record với status = "completed"
- Cộng tiền ngay
- Gửi email notification

### 4C: Admin xem lịch sử giao dịch
- Filter theo "Completed"
- Xem các giao dịch đã duyệt
- Có thể xem lại chi tiết

### 4D: Export báo cáo
- Admin click "Export PDF" hoặc "Export Excel"
- Hệ thống tạo file báo cáo với các giao dịch đã filter
- Download file

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Giao dịch trùng lặp
- **Tại Bước 6**: Kiểm tra reference number đã tồn tại
- Cảnh báo: "Giao dịch này đã được xử lý trước đó"
- Hiển thị giao dịch duplicate
- Không cho phép approve nữa
- Admin có thể mark duplicate

### 5B: Số tiền không khớp
- **Tại Bước 6**: Số tiền trong hệ thống khác với proof
- Hiển thị cảnh báo
- Admin có thể override hoặc reject

### 5C: Customer tài khoản đã bị suspend
- **Tại Bước 9**: Kiểm tra account status
- Nếu suspended: Cảnh báo nhưng vẫn cho approve
- Hoặc reject với lý do "Tài khoản bị khóa"

### 5D: Database lỗi khi update
- **Tại Bước 9**: Transaction fail
- Rollback toàn bộ
- Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại"
- Log error

### 5E: Payment gateway callback sau khi admin đã approve
- Tránh double credit:
  - Hệ thống check transaction đã được xử lý chưa
  - Nếu rồi: Bỏ qua callback
  - Ghi log duplicate callback

### 5F: Email không gửi được
- **Tại Bước 10**: Email lỗi
- Vẫn cập nhật giao dịch
- Log lỗi
- Retry sau hoặc admin gửi manual

### 5G: Admin không có quyền
- **Tại Bước 8**: Permission denied
- "Bạn không có quyền duyệt giao dịch"
- Redirect về trang chính

### 5H: Giao dịch đã được xử lý bởi admin khác
- **Tại Bước 8**: Concurrent access
- "Giao dịch này đã được xử lý bởi admin [tên]"
- Refresh và không cho phép edit

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Duyệt thành công
- Giao dịch status = "completed"
- Số dư ví khách hàng đã được cộng
- Email đã được gửi
- Log audit trail đã được ghi

### 6B: Từ chối thành công
- Giao dịch status = "rejected"
- Email với lý do đã được gửi
- Số dư không thay đổi
- Khách hàng có thể liên hệ hỗ trợ

### 6C: Thêm tín dụng manual thành công
- Giao dịch mới đã được tạo
- Số dư ví đã được cộng
- Email notification đã được gửi

### 6D: Thất bại
- Không có thay đổi nào
- Hiển thị lỗi
- Admin có thể thử lại

---

## 7. YÊU CẦU ĐẶC BIỆT

- Tất cả actions phải audit logged
- Phải đảm bảo atomicity (tránh race condition)
- Cần có role-based access control
- Cần có reconciliation với Payment Gateway
- Cần có batch processing cho giao dịch lớn
- Email notification bắt buộc
- Cần có manual review process cho giao dịch lớn
- Rate limiting để tránh spam

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể tích hợp auto-approval cho giao dịch nhỏ
- Có thể có risk scoring tự động
- Có thể tích hợp fraud detection
- Có thể có bulk approve cho nhiều giao dịch hợp lệ
- Có thể tích hợp reconciliation tự động

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: 
  - UC-C-07: Nạp tiền (Customer request deposit)
  - UC-S-01: Xử lý thanh toán tự động (Callback từ PG)
- **Precedes**: 
  - UC-C-13: Mua gói đầu tư (Customer dùng tiền đã nạp)
  - UC-C-08: Rút tiền (Sau khi có tiền)
- **Related to**:
  - UC-A-06: Quản lý Rút tiền

---

## 10. THỐNG KÊ VÀ BÁO CÁO

### Daily Statistics
- Tổng số deposits hôm nay
- Tổng tiền nạp
- Số pending
- Số completed
- Số rejected

### Charts
- Line chart: Tổng tiền nạp theo thời gian
- Bar chart: Số giao dịch theo phương thức
- Pie chart: Phân bố theo trạng thái

### Filters
- Theo ngày (Today, Yesterday, Last 7 days, Last 30 days, Custom range)
- Theo trạng thái
- Theo phương thức thanh toán
- Theo khách hàng
- Theo người xử lý

### Export Options
- Export to PDF
- Export to Excel
- Print view

---

## 11. AUTO-APPROVAL RULES (Nếu có)

### Điều kiện auto-approve
- Giao dịch <= $X amount
- Khách hàng đã verified KYC
- Khách hàng có lịch sử tốt
- Payment Gateway đã confirm
- Không có dấu hiệu bất thường

### Threshold Configuration
- Admin có thể config:
  - Số tiền maximum cho auto-approve
  - Yêu cầu KYC level
  - Minimum account age

---

## 12. RECONCILIATION

### Daily Reconciliation
- Cronjob chạy mỗi đêm
- So sánh deposits trong DB vs Payment Gateway
- Tìm mismatch
- Alert admin nếu có discrepancy
- Generate reconciliation report

### Manual Reconciliation
- Admin có thể trigger thủ công
- Chọn date range
- So sánh và báo cáo

---

## 13. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-ADMIN-001
- **Business Rule**: BR-DEPOSIT-003
- **Related Module**: Finance Module, Payment Gateway Module
- **Database Tables**: 
  - deposits
  - transactions
  - wallets
  - transaction_history
  - audit_logs

---

## 14. GHI CHÚ

- Đây là use case quan trọng về mặt tài chính
- Cần có SLA về thời gian xử lý (ví dụ: trong 24h)
- Cần có monitoring và alerting
- Cần có fraud detection
- Phải có logging đầy đủ để audit
- Cần có backup plan nếu hệ thống lỗi
- Nên có dashboard monitoring theo thời gian thực

