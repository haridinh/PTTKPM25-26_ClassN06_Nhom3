# KỊCH BẢN USE CASE: QUẢN LÝ ĐƠN MERCHANT

## Thông tin Use Case
- **Use Case ID**: UC-A-14
- **Tên Use Case**: Quản lý Đơn Merchant (Manage Merchant Applications)
- **Actor**: Admin (Quản trị viên)
- **Mức độ ưu tiên**: Critical - Enables Merchant onboarding

---

## 1. MÔ TẢ NGẮN GỌN

Admin có thể xem danh sách các yêu cầu tài khoản Merchant từ khách hàng, xem xét thông tin và tài liệu, sau đó phê duyệt hoặc từ chối. Khi được phê duyệt, khách hàng trở thành Merchant và có thể sử dụng các tính năng Merchant.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Admin đã đăng nhập với quyền quản lý Merchant
- Có ít nhất một yêu cầu Merchant đang pending
- Khách hàng đã submit merchant application
- Hệ thống đang hoạt động bình thường

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Admin truy cập trang quản lý Merchant
- Admin vào menu "Quản lý Merchant" hoặc "Merchant Management"
- URL: /admin/merchant/applications

### Bước 2: Hệ thống hiển thị dashboard Merchant
- Hiển thị statistics:
  - Tổng số merchant
  - Merchant đang active
  - Số đơn đang pending
  - Tổng giao dịch merchant
  - Tổng doanh thu merchant (nếu có)

### Bước 3: Hệ thống hiển thị danh sách đơn Merchant
- Hiển thị tabs:
  - Tất cả
  - Đang chờ xử lý (Pending)
  - Đã duyệt (Approved)
  - Đã từ chối (Rejected)
- Mỗi đơn hiển thị:
  - Ứng viên (tên, email)
  - Ngày submit
  - Trạng thái
  - Actions

### Bước 4: Admin xem danh sách pending
- Admin chọn tab "Đang chờ xử lý"
- Hiển thị các đơn cần xử lý
- Sắp xếp theo ngày (cũ nhất trước)

### Bước 5: Admin click vào một đơn để xem chi tiết
- Hiển thị modal hoặc page mới với đầy đủ thông tin:

**Thông tin cá nhân:**
- Họ và tên
- Email
- Số điện thoại
- Địa chỉ
- CMND/CCCD
- Ngày sinh

**Thông tin business:**
- Tên công ty/store
- Loại hình kinh doanh (Business category)
- Website (nếu có)
- Mô tả business
- Địa chỉ kinh doanh

**Tài liệu đính kèm:**
- Giấy phép kinh doanh (nếu có)
- CMND/CCCD
- Các tài liệu khác

**Thông tin thêm:**
- Doanh thu ước tính hàng tháng
- Số lượng khách hàng dự kiến
- Lịch sử tài khoản customer

### Bước 6: Admin review tài liệu
- Admin xem từng tài liệu
- Admin verify thông tin
- Admin có thể click xem lịch sử giao dịch của customer
- Admin đánh giá độ tin cậy

### Bước 7: Admin quyết định phê duyệt
- Admin đánh giá đủ điều kiện
- Admin có thể thêm ghi chú nội bộ
- Admin click "Phê duyệt" hoặc "Approve"

### Bước 8: Hệ thống xác nhận hành động
- Popup confirm: "Bạn có chắc chắn muốn phê duyệt đơn Merchant này?"
- Hiển thị thông tin:
  - Tên công ty
  - Tên người đăng ký
  - Email
- Admin confirm
- Hệ thống validate quyền

### Bước 9: Hệ thống tạo tài khoản Merchant
- **Begin Transaction**
- Create merchant account:
  - merchant_id (unique)
  - user_id (link to customer account)
  - Business info
  - Status = "active"
  - Created date
  - Approved by admin_id
- Update user record:
  - user_type = "merchant" (hoặc add merchant role)
  - merchant_status = "active"
- Tạo merchant settings (default values):
  - Transaction fee rate
  - Withdrawal limit
  - Payment options enabled
- **Commit Transaction**

### Bước 10: Hệ thống gửi thông báo
- Gửi email đến customer:
  - Subject: "Đơn Merchant của bạn đã được phê duyệt!"
  - Nội dung:
    - Chúc mừng bạn đã trở thành Merchant
    - Merchant ID của bạn
    - Hướng dẫn sử dụng các tính năng Merchant
    - Link truy cập Merchant dashboard
    - Documentation/FAQ
- In-app notification cho customer

### Bước 11: Unlock tính năng Merchant
- Khách hàng giờ có thể:
  - Truy cập Merchant dashboard
  - Tạo Payment URL
  - Quản lý khách hàng của merchant
  - Xem báo cáo giao dịch merchant
  - Rút tiền từ merchant account

### Bước 12: Hiển thị kết quả cho Admin
- "Đơn Merchant đã được phê duyệt thành công!"
- Redirect về danh sách
- Đơn này chuyển sang tab "Đã duyệt"

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Admin từ chối đơn
- **Tại Bước 7**: Không đủ điều kiện
- Click "Từ chối" hoặc "Reject"
- Form nhập lý do:
  - Dropdown: Không đủ tài liệu, nghi ngờ lừa đảo, thiếu thông tin, v.v.
  - Textarea: Ghi chú chi tiết
- Submit
- Update status = "rejected"
- Gửi email cho customer với lý do
- Customer có thể submit lại sau

### 4B: Admin yêu cầu thêm thông tin
- **Tại Bước 7**: Cần thêm tài liệu
- Click "Yêu cầu bổ sung"
- Form điền thông tin cần thêm
- Email cho customer
- Status = "pending_more_info"
- Sau khi customer submit, status = "pending"

### 4C: Admin xem danh sách merchant đã duyệt
- Chọn tab "Đã duyệt"
- Xem các merchant đang active
- Có thể xem chi tiết merchant
- Có thể deactivate nếu cần

### 4D: Admin xem merchant đã bị từ chối
- Tab "Đã từ chối"
- Xem lý do từ chối
- Customer có thể reapply

### 4E: Admin edit merchant settings
- Sau khi approve, admin có thể config:
  - Transaction fee
  - Withdrawal settings
  - Payment methods
  - Limits

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Thông tin không đầy đủ
- **Tại Bước 6**: Thiếu thông tin quan trọng
- Admin reject hoặc request more info
- Gửi email cho customer

### 5B: Tài liệu không hợp lệ
- **Tại Bước 6**: Giấy phép giả mạo, không đúng
- Admin reject với lý do
- Có thể báo cáo nghi ngờ lừa đảo

### 5C: Customer đã có merchant account
- **Tại Bước 9**: Đã có merchant_id
- Hiển thị cảnh báo: "Người dùng này đã có tài khoản merchant"
- Kiểm tra có phải là đơn duplicate không
- Nếu đúng: Deactivate hoặc skip

### 5D: Lỗi database khi tạo merchant account
- **Tại Bước 9**: Transaction fail
- Rollback
- Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại"
- Log error

### 5E: Email không gửi được
- **Tại Bước 10**: Email server lỗi
- Vẫn tạo merchant account
- Log lỗi
- Retry sau hoặc admin gửi manual

### 5F: Permission denied
- **Tại Bước 8**: Admin không có quyền
- "Bạn không có quyền phê duyệt merchant"
- Redirect

### 5G: Concurrent modification
- **Tại Bước 8**: Admin khác đã xử lý
- "Đơn này đã được xử lý bởi admin [tên]"
- Refresh page
- Không cho phép duplicate action

### 5H: Customer tài khoản bị suspend
- **Tại Bước 6**: Account status = suspended
- Không nên approve
- Hoặc cảnh báo và lý do

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Phê duyệt thành công
- Merchant account đã được tạo
- Customer giờ có thể truy cập Merchant features
- Email đã được gửi
- Log đã được ghi
- Đơn chuyển sang "approved"

### 6B: Từ chối thành công
- Status = "rejected"
- Email với lý do đã gửi
- Customer có thể reapply
- Không có merchant account

### 6C: Thất bại (system error)
- Không có thay đổi
- Hiển thị lỗi
- Admin thử lại

---

## 7. YÊU CẦU ĐẶC BIỆT

- Phải audit log mọi action
- Merchant account phải unique
- Phải có role-based access control
- Cần có validation trước khi approve
- Email notification bắt buộc
- Cần có SLA về thời gian xử lý
- Phải có process để handle complaints/disputes

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể tích hợp background check tự động
- Có thể có auto-approval cho customer tốt
- Có thể tích hợp payment processor setup
- Có thể có onboarding wizard cho merchant
- Có thể có commission structure config

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**: 
  - UC-C-28: Gửi yêu cầu tài khoản Merchant (Customer submit)
- **Precedes**: 
  - UC-C-30: Tạo URL Thanh toán (Merchant feature)
  - UC-C-29: Quản lý Khách hàng của Merchant
  - UC-C-31: Xem Giao dịch Merchant
  - UC-C-32: Rút tiền Merchant
- **Related to**:
  - UC-A-15: Quản lý Tài khoản Merchant
  - UC-A-16: Quản lý Giao dịch Merchant

---

## 10. MERCHANT TIERS/LEVELS

### Basic Merchant
- Transaction limit: $X per day
- Fee rate: X%
- Features: Basic payment URL

### Standard Merchant
- Transaction limit: $Y per day
- Fee rate: Y% (lower)
- Features: + Customer management

### Premium Merchant
- Transaction limit: $Z per day
- Fee rate: Z% (even lower)
- Features: + Advanced analytics, API access

### Enterprise Merchant
- No limit
- Custom fee
- All features + Support

---

## 11. MERCHANT VERIFICATION STEPS

### Step 1: Document Verification
- Giấy phép kinh doanh
- CMND/CCCD
- Bank account info

### Step 2: Business Verification
- Website (nếu có)
- Social media
- Reviews/testimonials

### Step 3: Identity Verification
- Match giữa business và personal
- Background check (optional)

### Step 4: Compliance Check
- Check blacklist
- Check legal compliance
- Tax info (nếu có)

---

## 12. MERCHANT DASHBOARD ACCESS

Sau khi được approve, merchant có thể:
- Đăng nhập với tài khoản customer hiện tại
- Truy cập Merchant dashboard từ menu
- Xem Merchant-specific features:
  - Create Payment URL
  - Manage Customers
  - View Transactions
  - Withdraw Funds
  - View Analytics
  - Manage Settings

---

## 13. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-MERCHANT-001
- **Business Rule**: BR-MERCHANT-001, BR-MERCHANT-002
- **Related Module**: Merchant Module
- **Database Tables**: 
  - merchant_applications
  - merchants
  - merchant_settings
  - users (merchant role)
  - audit_logs

---

## 14. GHI CHÚ

- Đây là use case quan trọng cho onboarding Merchant
- Cần có process xử lý rõ ràng
- Cần có training cho Admin
- Cần có SLA và monitoring
- Cần có escalation process
- Phải có deactivation process nếu merchant vi phạm

