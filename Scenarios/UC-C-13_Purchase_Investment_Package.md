# KỊCH BẢN USE CASE: MUA GÓI ĐẦU TƯ

## Thông tin Use Case

- **Use Case ID**: UC-C-13
- **Tên Use Case**: Mua gói đầu tư (Purchase Investment Package)
- **Actor**: Customer (Khách hàng)
- **Mức độ ưu tiên**: Critical - Key for investment module

---

## 1. MÔ TẢ NGẮN GỌN

Khách hàng có thể xem danh sách gói đầu tư có sẵn, chọn gói phù hợp, nhập số tiền đầu tư và mua gói. Hệ thống sẽ trừ tiền từ ví, tạo investment record và bắt đầu tính lãi theo lịch trình.

---

## 2. ĐIỀU KIỆN TRƯỚC (PRECONDITIONS)

- Khách hàng đã đăng nhập vào hệ thống
- Tài khoản đã được kích hoạt
- Khách hàng đã có tiền trong ví (số dư > 0)
- Có ít nhất một gói đầu tư đang active trong hệ thống
- Hệ thống đang hoạt động bình thường

---

## 3. LUỒNG CHÍNH (MAIN FLOW)

### Bước 1: Khách hàng truy cập trang đầu tư

- Khách hàng vào menu "Đầu tư" hoặc "Investment"
- URL: /investment hoặc /customer/investment

### Bước 2: Hệ thống hiển thị danh sách gói đầu tư

- Hệ thống lấy danh sách gói đầu tư đang active từ database
- Hiển thị card/tile cho mỗi gói với thông tin:
  - Tên gói
  - Lãi suất (%)
  - Thời gian đầu tư (ví dụ: 30 ngày, 90 ngày)
  - Số tiền tối thiểu
  - Số tiền tối đa (nếu có)
  - Mô tả về gói
  - Ưu đãi đặc biệt (nếu có)

### Bước 3: Khách hàng xem chi tiết gói

- Khách hàng click vào một gói để xem chi tiết
- Hệ thống hiển thị thông tin đầy đủ:
  - Toàn bộ thông tin gói
  - Tính năng và lợi ích
  - Lịch trả lãi (ví dụ: hàng ngày, hàng tuần)
  - FAQ về gói đầu tư

### Bước 4: Khách hàng chọn gói đầu tư

- Khách hàng quyết định mua gói và click "Đầu tư ngay" hoặc "Buy Package"
- Hệ thống chuyển đến trang confirm

### Bước 5: Hệ thống hiển thị form mua gói

- Hiển thị thông tin gói đã chọn
- Trường nhập số tiền đầu tư
- Hiển thị số dư ví hiện tại
- Hiển thị:
  - Số tiền đầu tư
  - Lãi suất (%)
  - Lãi dự kiến sau khi đáo hạn
  - Thời gian đáo hạn
  - Lịch nhận lãi
  - Tổng lãi nhận được

### Bước 6: Khách hàng nhập số tiền đầu tư

- Khách hàng nhập số tiền muốn đầu tư
- Hệ thống validate real-time:
  - Số tiền >= minimum của gói
  - Số tiền <= maximum của gói (nếu có)
  - Số tiền <= số dư ví hiện có
  - Số tiền phải là số hợp lệ > 0

### Bước 7: Khách hàng xem preview

- Hệ thống tính toán và hiển thị:
  - Principal (tiền gốc)
  - Interest rate
  - Duration
  - Total interest nhận được
  - Return amount (gốc + lãi)
  - Lịch nhận lãi (sẽ nhận vào các ngày nào)

### Bước 8: Khách hàng confirm giao dịch

- Khách hàng review thông tin
- Khách hàng click "Xác nhận" hoặc "Confirm Investment"
- Hiển thị popup xác nhận cuối cùng

### Bước 9: Hệ thống validate giao dịch

- Kiểm tra số dư ví đủ để đầu tư
- Kiểm tra số tiền hợp lệ (>= min, <= max)
- Kiểm tra gói đầu tư vẫn còn active
- Kiểm tra tài khoản không bị suspend

### Bước 10: Hệ thống thực hiện đầu tư

- **Transaction Start**: Begin database transaction
- Trừ tiền từ ví khách hàng
- Tạo investment record với status = "active"
- Ghi nhận:
  - User ID
  - Package ID
  - Amount invested
  - Interest rate
  - Start date
  - End date (maturity date)
  - Status = "active"
  - Transaction ID
- **Transaction Commit**

### Bước 11: Hệ thống tính toán lịch trả lãi

- Tính toán các ngày sẽ nhận lãi dựa trên:
  - Frequency (daily, weekly, monthly)
  - Start date
  - End date
- Tạo records trong bảng `investment_interest_schedule`

### Bước 12: Gửi thông báo và email

- Gửi email xác nhận đầu tư
- Email chứa:
  - Thông tin gói đầu tư
  - Số tiền đầu tư
  - Lịch trả lãi
  - Ngày đáo hạn
- Hiển thị thông báo trong app/website

### Bước 13: Redirect đến trang quản lý đầu tư

- Chuyển đến trang "My Investments"
- Hiển thị gói đầu tư mới mua
- Hiển thị thông báo: "Đầu tư thành công!"

---

## 4. LUỒNG PHỤ (ALTERNATIVE FLOWS)

### 4A: Đầu tư lại (Re-invest)

- Khách hàng đã có gói đầu tư đã hoàn thành (matured)
- Khách hàng chọn đầu tư lại từ số tiền nhận được
- Luồng giống Main Flow nhưng:
  - Có option "Đầu tư lại"
  - Số tiền gợi ý = return amount của gói trước

### 4B: Đầu tư từ nhiều nguồn ví

- Khách hàng có nhiều ví (ví dụ: ví USD, ví BTC)
- Khách hàng có thể chọn ví nào để đầu tư
- Hệ thống trừ tiền từ ví được chọn

### 4C: Đầu tư với mã giảm giá/voucher

- Khách hàng có coupon/voucher
- Nhập mã voucher khi mua gói
- Hệ thống apply discount (nếu có)
- Cập nhật số tiền đầu tư và lãi

---

## 5. LUỒNG NGOẠI LỆ (EXCEPTION FLOWS)

### 5A: Số tiền nhỏ hơn minimum

- **Tại Bước 6**: Số tiền < minimum của gói
- Hiển thị: "Số tiền tối thiểu là $X"
- Khách hàng nhập lại

### 5B: Số tiền lớn hơn maximum

- **Tại Bước 6**: Số tiền > maximum của gói
- Hiển thị: "Số tiền tối đa là $X"
- Khách hàng nhập lại

### 5C: Số dư không đủ

- **Tại Bước 6**: Số tiền > số dư ví
- Hiển thị: "Số dư không đủ. Bạn hiện có $X. Vui lòng nạp thêm tiền"
- Cung cấp link "Nạp tiền ngay" (đến trang deposit)

### 5D: Gói đầu tư không còn active

- **Tại Bước 9**: Admin đã deactivate gói sau khi khách hàng xem
- Hiển thị: "Gói đầu tư này hiện không khả dụng. Vui lòng chọn gói khác"
- Redirect về trang danh sách gói

### 5E: Database transaction conflict

- **Tại Bước 10**: Có conflict khi update ví (concurrent)
- Rollback transaction
- Hiển thị: "Có lỗi xảy ra. Vui lòng thử lại sau"
- Log error để admin xử lý

### 5F: Khách hàng cancel giao dịch

- **Tại Bước 8**: Khách hàng click "Cancel"
- Không tạo investment record
- Redirect về trang danh sách gói

### 5G: Email không gửi được

- **Tại Bước 12**: Email server lỗi
- Vẫn tạo investment thành công
- Ghi log lỗi email
- Admin xử lý sau

### 5H: Tài khoản bị suspend trong lúc đầu tư

- **Tại Bước 9**: Account status đột nhiên = suspended
- Không cho phép đầu tư
- Hiển thị: "Tài khoản của bạn đã bị tạm khóa"
- Redirect đến trang liên hệ hỗ trợ

### 5I: Invalid input - số tiền không hợp lệ

- **Tại Bước 6**: Nhập số âm, chữ, hoặc ký tự đặc biệt
- Validation error: "Vui lòng nhập số tiền hợp lệ"
- Clear và yêu cầu nhập lại

---

## 6. ĐIỀU KIỆN SAU (POSTCONDITIONS)

### 6A: Thành công

- Tiền đã được trừ khỏi ví
- Investment record đã được tạo với status "active"
- Lịch trả lãi đã được tạo
- Khách hàng có thể xem gói đầu tư trong "My Investments"
- Hệ thống sẽ tự động trả lãi theo lịch

### 6B: Thất bại

- Không có investment record nào được tạo
- Số dư ví không thay đổi
- Hiển thị thông báo lỗi
- Khách hàng có thể thử lại

---

## 7. YÊU CẦU ĐẶC BIỆT

- Phải đảm bảo tính atomicity của transaction (ACID)
- Cần có validation số tiền nghiêm ngặt
- Cần cache danh sách gói đầu tư để tăng performance
- Phải log đầy đủ mọi giao dịch đầu tư
- Cần có rate limiting để tránh spam
- Cần calculate lãi chính xác theo công thức
- Lịch trả lãi phải được tạo tự động
- Cần có reconciliation process

---

## 8. ĐIỂM MỞ RỘNG (EXTENSION POINTS)

- Có thể tích hợp "Đầu tư tự động" (Auto-invest)
- Có thể có tính năng "Liquidate sớm" (rút trước hạn với phí)
- Có thể có chương trình ưu đãi cho khách hàng thân thiết
- Có thể tích hợp referral bonus khi người được giới thiệu đầu tư
- Có thể có AI recommendations về gói phù hợp

---

## 9. QUAN HỆ VỚI USE CASE KHÁC

- **Extends**: (không có)
- **Includes**:
  - UC-S-02: Tính toán Lãi suất (System tự động trả lãi)
  - UC-S-03: Tính toán Hoa hồng (tính hoa hồng cho người giới thiệu)
  - UC-C-03: Quản lý gói đầu tư đã mua
- **Precedes**:
  - UC-C-15: Xem tiền lãi
  - UC-A-08: Quản lý Gói Đầu tư (Admin)
- **Depends on**:
  - UC-C-07: Nạp tiền (cần có tiền)
  - UC-C-02: Đăng nhập (phải đăng nhập)
  - UC-A-08: Admin phải tạo gói (nếu không có gói nào)

---

## 10. CÔNG THỨC TÍNH LÃI

### 10A: Lãi đơn (Simple Interest)

```
Total Interest = Principal × Rate × Time
Return Amount = Principal + Total Interest
```

### 10B: Lãi kép (Compound Interest)

```
A = P × (1 + r/n)^(nt)
A = Final amount
P = Principal
r = Interest rate (annual)
n = Number of times interest is compounded per year
t = Time in years
```

### 10C: Lãi trả hàng ngày/định kỳ

- Calculate total interest
- Divide by số lần trả lãi
- Mỗi lần trả số tiền lãi đó

---

## 11. LỊCH TRẢ LÃI

Ví dụ gói đầu tư:

- Amount: $1000
- Interest Rate: 10% per annum
- Duration: 90 days
- Frequency: Daily

Total Interest = $1000 × 10% × (90/365) = $24.66
Daily Interest = $24.66 / 90 = $0.274

Hệ thống tạo 90 records trong `investment_interest_schedule`:

- Day 1: $0.274
- Day 2: $0.274
- ...
- Day 90: $0.274

Mỗi ngày system auto-trigger (via cronjob) sẽ:

1. Check investments cần trả lãi hôm nay
2. Cộng tiền lãi vào ví
3. Update status của schedule record
4. Gửi notification

---

## 12. BẢO MẬT

- **Concurrency**: Dùng database lock để tránh race condition khi update ví
- **Validation**: Validate tất cả input trên server-side, không tin tưởng client
- **Audit Trail**: Log mọi thay đổi số dư và investment records
- **Rate Limiting**: Giới hạn số lần mua gói trong một khoảng thời gian
- **KYC Check**: Có thể yêu cầu KYC cho đầu tư lớn

---

## 13. TRUY VẾT (TRACEABILITY)

- **Requirement ID**: REQ-INVESTMENT-001
- **Business Rule**: BR-INVEST-001, BR-INVEST-002
- **Related Module**: Package/Investment Module, Finance Module
- **Database Tables**:
  - investment_packages
  - user_investments
  - investment_interest_schedule
  - wallets
  - transaction_history

---

## 14. GHI CHÚ

- Đây là use case core của Investment module
- Cần test kỹ các edge cases (số tiền boundary, concurrent transactions)
- Cần có monitoring để phát hiện bất thường
- Cần có process để xử lý lỗi tính lãi
- Phải có admin override nếu có vấn đề
- Cần support manual creation nếu cần
