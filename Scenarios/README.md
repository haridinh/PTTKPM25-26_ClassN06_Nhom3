# SCENARIO SCRIPTS - KỊCH BẢN USE CASE

Thư mục này chứa các file kịch bản chi tiết cho các use case chính của hệ thống.

---

## 📋 DANH SÁCH FILE SCENARIO

### CUSTOMER (Khách hàng/Người dùng)

| File | Use Case ID | Tên Use Case | Mô tả |
|------|------------|-------------|-------|
| `UC-C-01_Register_Account.md` | UC-C-01 | Đăng ký tài khoản | Essential for onboarding - Khách hàng đăng ký và kích hoạt tài khoản |
| `UC-C-02_Login.md` | UC-C-02 | Đăng nhập | Required for system access - Xác thực và đăng nhập vào hệ thống |
| `UC-C-07_Deposit.md` | UC-C-07 | Nạp tiền | Core financial action - Khách hàng nạp tiền qua Payment Gateway |
| `UC-C-13_Purchase_Investment_Package.md` | UC-C-13 | Mua gói đầu tư | Key for investment module - Mua và quản lý gói đầu tư |
| `UC-C-20_Apply_for_Loan.md` | UC-C-20 | Đăng ký vay | Key for B2X Loan module - Đăng ký và xin vay tiền |

### ADMIN (Quản trị viên)

| File | Use Case ID | Tên Use Case | Mô tả |
|------|------------|-------------|-------|
| `UC-A-04_Verify_Customer_KYC.md` | UC-A-04 | Xác minh KYC | Critical for compliance - Admin duyệt xác minh danh tính khách hàng |
| `UC-A-05_Manage_Deposits.md` | UC-A-05 | Quản lý Nạp tiền | Handles customer requests - Admin duyệt và quản lý giao dịch nạp tiền |
| `UC-A-14_Manage_Merchant_Applications.md` | UC-A-14 | Quản lý Đơn Merchant | Enables onboarding - Admin duyệt tài khoản merchant |

### MERCHANT (Thương nhân)

| File | Use Case ID | Tên Use Case | Mô tả |
|------|------------|-------------|-------|
| `UC-C-30_Create_Payment_URL.md` | UC-C-30 | Tạo URL thanh toán | Core functionality - Merchant tạo link thanh toán cho khách hàng |

### SYSTEM (Hệ thống tự động)

| File | Use Case ID | Tên Use Case | Mô tả |
|------|------------|-------------|-------|
| `UC-S-01_Process_Automatic_Payments.md` | UC-S-01 | Xử lý thanh toán tự động | Automates payments - Hệ thống xử lý callback từ Payment Gateway |

---

## 📖 CẤU TRÚC CỦA MỖI FILE SCENARIO

Mỗi file scenario bao gồm các phần sau:

### 1. Thông tin Use Case
- Use Case ID
- Tên Use Case
- Actor
- Mức độ ưu tiên

### 2. Mô tả ngắn gọn
- Tổng quan về use case

### 3. Điều kiện trước (Preconditions)
- Điều kiện cần thiết để thực hiện use case

### 4. Luồng chính (Main Flow)
- Các bước chi tiết từ đầu đến cuối
- Được đánh số từ Bước 1 đến Bước N

### 5. Luồng phụ (Alternative Flows)
- Các luồng thay thế khi có điều kiện khác
- Đánh số: 4A, 4B, 4C...

### 6. Luồng ngoại lệ (Exception Flows)
- Các trường hợp lỗi có thể xảy ra
- Đánh số: 5A, 5B, 5C...

### 7. Điều kiện sau (Postconditions)
- Trạng thái sau khi hoàn thành
- Phân loại: Thành công / Thất bại

### 8. Yêu cầu đặc biệt
- Các yêu cầu bảo mật, performance, v.v.

### 9. Điểm mở rộng (Extension Points)
- Các tính năng có thể thêm trong tương lai

### 10. Quan hệ với Use Case khác
- Extends, Includes, Precedes, Depends on

### 11-14. Các phần bổ sung khác
- Chi tiết kỹ thuật, công thức, truy vết, ghi chú

---

## 🎯 CÁCH SỬ DỤNG

### Để phát triển:
1. Đọc scenario để hiểu business requirements
2. Implement theo các bước trong Main Flow
3. Handle tất cả Exception Flows
4. Test với các Alternative Flows

### Để test:
1. Tạo test case từ Main Flow
2. Tạo test case từ mỗi Alternative Flow
3. Tạo test case từ mỗi Exception Flow
4. Verify Postconditions

### Để document:
1. Use case này có thể được reference trong:
   - Technical Design Document
   - API Documentation
   - User Manual
   - Test Plan

---

## 📊 TỔNG QUAN CÁC USE CASE

### CUSTOMER Use Cases (5 files)
- ✅ **UC-C-01**: Đăng ký - Cửa vào chính của hệ thống
- ✅ **UC-C-02**: Đăng nhập - Xác thực người dùng
- ✅ **UC-C-07**: Nạp tiền - Financial transaction đầu tiên
- ✅ **UC-C-13**: Đầu tư - Core business feature
- ✅ **UC-C-20**: Vay tiền - B2X Loan module

### ADMIN Use Cases (3 files)
- ✅ **UC-A-04**: KYC Verification - Compliance
- ✅ **UC-A-05**: Deposit Management - Financial management
- ✅ **UC-A-14**: Merchant Onboarding - Business enablement

### MERCHANT Use Cases (1 file)
- ✅ **UC-C-30**: Payment URL Creation - Core merchant feature

### SYSTEM Use Cases (1 file)
- ✅ **UC-S-01**: Auto Payment Processing - Automation

**TỔNG CỘNG: 10 files**

---

## 🔗 LIÊN KẾT

- [Use Case Diagram](../Bieu_do_Use_Case_Da_day_du.txt)
- [Requirements Analysis](../Phan_tich_yeu_cau_Hethong_UseCase_Actor.md)

---

## 📝 GHI CHÚ

- Tất cả các scenario được viết bằng tiếng Việt
- Mỗi scenario là độc lập và có thể đọc riêng lẻ
- Scenario bao gồm cả happy path và error cases
- Có thể sử dụng để develop, test, và document

---

**Ngày tạo**: 2024
**Version**: 1.0
**Author**: AI Assistant

