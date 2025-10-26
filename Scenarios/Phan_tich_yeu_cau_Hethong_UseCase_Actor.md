# PHÂN TÍCH YÊU CẦU - XÁC ĐỊNH USE CASE VÀ ACTOR

## 1. TỔNG QUAN HỆ THỐNG

Hệ thống là một nền tảng tài chính đa năng bao gồm:
- Quản lý đầu tư và gói đầu tư (Package)
- Cho vay tiêu dùng (B2x Loan)
- Hệ thống người bán/Merchant
- Staking và Subscription
- Quick Exchange (Trao đổi nhanh)
- Finance (Nạp rút, chuyển khoản)
- Hệ thống báo cáo và hỗ trợ
- CMS (Quản lý nội dung website)

## 2. CÁC ACTOR (ĐỐI TƯỢNG)

### 2.1. Customer (Khách hàng/Người dùng)
- Đăng ký tài khoản và đăng nhập
- Có thể trở thành Merchant
- Có thông tin cá nhân, địa chỉ, hình ảnh
- Có trạng thái xác minh và trạng thái hoạt động

### 2.2. Admin (Quản trị viên)
- Quản lý toàn bộ hệ thống
- Quản lý người dùng, khách hàng
- Quản lý các giao dịch tài chính
- Quản lý nội dung CMS
- Quản lý vai trò và quyền
- Quản lý cài đặt hệ thống

### 2.3. Merchant (Thương nhân/Người bán)
- Là khách hàng có tài khoản merchant đã được phê duyệt
- Tạo URL thanh toán
- Quản lý khách hàng của merchant
- Rút tiền từ hệ thống merchant

### 2.4. Payment Gateway (Cổng thanh toán)
- Hệ thống bên thứ ba xử lý thanh toán

### 2.5. Hệ thống (System)
- Tự động xử lý các giao dịch
- Tính toán lãi suất, hoa hồng
- Gửi thông báo, email
- Sao lưu dữ liệu

## 3. CÁC USE CASE THEO TỪNG ACTOR

### 3.1. CUSTOMER - ACTOR

#### **A. QUẢN LÝ TÀI KHOẢN**
1. **Đăng ký tài khoản** (Registration)
   - Nhập thông tin cá nhân (họ tên, email, username, số điện thoại)
   - Nhập mật khẩu
   - Nhập mã giới thiệu (referral code - tùy chọn)
   - Xác minh email
   - Kích hoạt tài khoản

2. **Đăng nhập** (Login)
   - Đăng nhập bằng email/username và mật khẩu
   - Đăng nhập bằng Google 2FA (nếu bật)
   - Xác thực OTP (nếu bật)

3. **Quản lý hồ sơ cá nhân** (Profile Management)
   - Xem thông tin cá nhân
   - Cập nhật thông tin cá nhân (họ tên, email, số điện thoại, địa chỉ)
   - Cập nhật ảnh đại diện (avatar)
   - Đổi mật khẩu
   - Cài đặt ngôn ngữ và căn chỉnh giao diện (site align)

4. **Xác minh tài khoản** (KYC Verification)
   - Gửi thông tin KYC (Know Your Customer)
   - Tải lên tài liệu xác minh
   - Xem trạng thái xác minh
   - Đợi Admin phê duyệt

5. **Xác thực hai yếu tố** (Two Factor Authentication)
   - Bật/tắt Google 2FA
   - Quét mã QR
   - Nhập mã xác thực

#### **B. DASHBOARD & THỐNG KÊ**
6. **Xem Dashboard** (View Dashboard)
   - Xem tổng số dư ví
   - Xem biểu đồ giao dịch
   - Xem biểu đồ nạp tiền
   - Xem biểu đồ đầu tư
   - Xem doanh thu nhóm (team turnover)
   - Xem doanh thu người giới thiệu (sponsor turnover)
   - Xem biểu đồ thanh toán (payout)

#### **C. TÀI CHÍNH (FINANCE)**
7. **Nạp tiền** (Deposit)
   - Chọn phương thức nạp (Stripe, CoinPayment)
   - Nhập số tiền
   - Xác nhận giao dịch
   - Xử lý thanh toán
   - Nhận thông báo thành công

8. **Rút tiền** (Withdraw)
   - Chọn tài khoản rút tiền
   - Nhập số tiền
   - Gửi yêu cầu rút tiền
   - Đợi Admin xử lý
   - Nhận thông báo trạng thái

9. **Thêm tài khoản rút tiền** (Add Withdrawal Account)
   - Thêm thông tin tài khoản ngân hàng
   - Thêm thông tin ví crypto
   - Xóa tài khoản rút tiền

10. **Chuyển khoản** (Transfer)
    - Chọn người nhận
    - Nhập số tiền
    - Xác nhận chuyển khoản
    - Xem lịch sử chuyển khoản

11. **Xem giao dịch** (View Transactions)
    - Xem lịch sử nạp tiền
    - Xem lịch sử rút tiền
    - Xem lịch sử chuyển khoản

#### **D. ĐẦU TƯ (INVESTMENT/PACKAGE)**
12. **Xem gói đầu tư** (View Investment Packages)
    - Xem danh sách gói đầu tư
    - Xem chi tiết gói (lãi suất, thời gian, số tiền tối thiểu)
    - Xem lịch sử gói (time list)

13. **Mua gói đầu tư** (Purchase Investment Package)
    - Chọn gói đầu tư
    - Nhập số tiền đầu tư
    - Xác nhận đầu tư
    - Xem trạng thái đầu tư

14. **Quản lý gói đầu tư đã mua** (Manage Purchased Packages)
    - Xem gói đầu tư đã mua
    - Xem chi tiết từng gói
    - Xem lịch sử nhận lãi

15. **Xem tiền lãi** (View Earnings/Interest)
    - Xem tiền lãi đầu tư
    - Xem tiền lãi tương lai
    - Xem hoàn vốn

16. **Xem hoa hồng giới thiệu** (View Referral Commission)
    - Xem hoa hồng từ người được giới thiệu
    - Xem lịch sử nhận hoa hồng

17. **Xem thưởng nhóm** (View Team Bonus)
    - Xem doanh thu nhóm
    - Xem thế hệ trong nhóm (my generation)

#### **E. B2X LOAN (CHO VAY)**
18. **Xem gói vay** (View Loan Packages)
    - Xem gói vay có sẵn
    - Xem chi tiết từng gói

19. **Tính toán khoản vay** (Loan Calculator)
    - Nhập số tiền muốn vay
    - Nhập thời gian
    - Xem số tiền phải trả

20. **Đăng ký vay** (Apply for Loan)
    - Chọn gói vay
    - Điền thông tin
    - Gửi đơn vay
    - Đợi Admin phê duyệt

21. **Quản lý khoản vay** (Manage Loans)
    - Xem danh sách khoản vay
    - Xem chi tiết khoản vay
    - Xem lịch trả nợ

22. **Rút tiền từ khoản vay** (Withdraw from Loan)
    - Gửi yêu cầu rút tiền từ khoản vay
    - Đợi Admin phê duyệt

23. **Trả nợ** (Repayment)
    - Xem khoản phải trả
    - Chọn phương thức thanh toán
    - Thực hiện thanh toán
    - Xem lịch sử trả nợ

#### **F. STAKING**
24. **Xem gói Staking** (View Stake Plans)
    - Xem danh sách gói staking
    - Xem chi tiết từng gói

25. **Đăng ký Staking** (Subscribe to Stake)
    - Chọn gói staking
    - Nạp tiền vào staking
    - Xem trạng thái

26. **Quản lý Subscription**
    - Xem danh sách subscription
    - Xem chi tiết subscription

#### **G. MERCHANT (Nếu là Merchant)**
27. **Xem Dashboard Merchant** (View Merchant Dashboard)
    - Xem tổng quan hoạt động merchant

28. **Gửi yêu cầu tài khoản Merchant** (Request Merchant Account)
    - Điền thông tin
    - Gửi yêu cầu
    - Đợi Admin phê duyệt

29. **Quản lý Khách hàng của Merchant** (Manage Merchant Customers)
    - Xem danh sách khách hàng
    - Thêm khách hàng
    - Cập nhật thông tin khách hàng
    - Xóa khách hàng

30. **Tạo URL Thanh toán** (Create Payment URL)
    - Tạo link thanh toán
    - Cài đặt thông tin thanh toán
    - Xem link thanh toán

31. **Xem Giao dịch Merchant** (View Merchant Transactions)
    - Xem danh sách giao dịch
    - Xem chi tiết từng giao dịch

32. **Rút tiền Merchant** (Merchant Withdraw)
    - Tạo yêu cầu rút tiền
    - Đợi Admin phê duyệt

#### **H. QUICK EXCHANGE**
33. **Sử dụng Quick Exchange** (Use Quick Exchange)
    - Chọn đồng xu muốn đổi
    - Nhập số lượng
    - Nhận đồng xu sau khi đổi
    - Xem lịch sử giao dịch

#### **I. HỖ TRỢ**
34. **Liên hệ Hỗ trợ** (Contact Support)
    - Gửi tin nhắn hỗ trợ
    - Xem phản hồi

35. **Quản lý Ví** (Wallet Management)
    - Xem số dư các loại ví
    - Xem lịch sử giao dịch ví

### 3.2. ADMIN - ACTOR

#### **A. DASHBOARD**
1. **Xem Dashboard Admin** (Admin Dashboard)
   - Xem tổng quan hệ thống
   - Xem biểu đồ khách hàng
   - Xem biểu đồ giao dịch
   - Xem biểu đồ phí
   - Xem biểu đồ nạp tiền
   - Xem biểu đồ đầu tư
   - Xem lịch sử giao dịch

#### **B. QUẢN LÝ NGƯỜI DÙNG**
2. **Quản lý Khách hàng** (Manage Customers)
   - Xem danh sách khách hàng
   - Xem chi tiết khách hàng
   - Thêm khách hàng
   - Cập nhật thông tin khách hàng
   - Xóa khách hàng
   - Thay đổi trạng thái khách hàng

3. **Quản lý Users (Người dùng Admin)**
   - Xem danh sách users
   - Thêm user
   - Cập nhật user
   - Xóa user
   - Gán vai trò (roles)

4. **Xác minh KYC** (Verify Customer KYC)
   - Xem danh sách yêu cầu xác minh
   - Xem tài liệu đã tải lên
   - Duyệt hoặc từ chối xác minh
   - Xem khách hàng đã xác minh
   - Xem khách hàng bị hủy xác minh

#### **C. QUẢN LÝ TÀI CHÍNH (FINANCE)**
5. **Quản lý Nạp tiền** (Manage Deposits)
   - Xem danh sách nạp tiền
   - Xem nạp tiền đang chờ xử lý
   - Phê duyệt nạp tiền
   - Từ chối nạp tiền
   - Thêm tín dụng thủ công (add credit)

6. **Quản lý Rút tiền** (Manage Withdraws)
   - Xem danh sách rút tiền
   - Xem rút tiền đang chờ xử lý
   - Phê duyệt rút tiền
   - Từ chối rút tiền
   - Tạo PDF báo cáo

7. **Quản lý Chuyển khoản** (Manage Transfers)
   - Xem danh sách chuyển khoản
   - Xem chi tiết chuyển khoản

#### **D. QUẢN LÝ ĐẦU TƯ (PACKAGE)**
8. **Quản lý Gói Đầu tư** (Manage Investment Packages)
   - Tạo gói đầu tư mới
   - Xem danh sách gói
   - Cập nhật gói
   - Xóa gói

9. **Quản lý Thời gian Gói** (Manage Plan Time)
   - Tạo khoảng thời gian gói
   - Xem danh sách
   - Cập nhật
   - Xóa

#### **E. QUẢN LÝ B2X LOAN**
10. **Quản lý Gói Vay** (Manage B2X Loan Packages)
    - Tạo gói vay mới
    - Xem danh sách gói vay
    - Cập nhật gói
    - Xóa gói

11. **Quản lý Khoản Vay** (Manage Loans)
    - Xem khoản vay đang chờ
    - Phê duyệt hoặc từ chối khoản vay
    - Xem tổng quan khoản vay (loan summary)
    - Xem khoản vay đã đóng (closed loans)

12. **Quản lý Rút tiền từ Vay** (Manage Loan Withdrawals)
    - Xem yêu cầu rút tiền
    - Phê duyệt hoặc từ chối

13. **Quản lý Trả nợ** (Manage Repayments)
    - Xem lịch trả nợ tháng này
    - Xem tất cả lịch trả nợ
    - Tạo lịch trả nợ

#### **F. QUẢN LÝ MERCHANT**
14. **Quản lý Đơn Merchant** (Manage Merchant Applications)
    - Xem danh sách yêu cầu tài khoản merchant
    - Phê duyệt hoặc từ chối
    - Xem merchant đã được xác nhận

15. **Quản lý Tài khoản Merchant** (Manage Merchant Accounts)
    - Xem danh sách tài khoản merchant
    - Xem chi tiết
    - Cập nhật trạng thái

16. **Quản lý Giao dịch Merchant** (Manage Merchant Transactions)
    - Xem danh sách giao dịch
    - Xem chi tiết từng giao dịch
    - Xem số lượng giao dịch theo trạng thái

17. **Quản lý Phí Merchant** (Manage Merchant Fees)
    - Cài đặt phí giao dịch merchant
    - Cập nhật phí

18. **Quản lý Rút tiền Merchant** (Manage Merchant Withdrawals)
    - Xem yêu cầu rút tiền đang chờ
    - Phê duyệt rút tiền
    - Xem lịch sử rút tiền đã xác nhận

#### **G. QUẢN LÝ STAKING**
19. **Quản lý Stake Plans** (Manage Stake Plans)
    - Tạo gói staking mới
    - Xem danh sách
    - Cập nhật
    - Xóa

20. **Quản lý Subscription** (Manage Subscriptions)
    - Xem danh sách subscription
    - Xem chi tiết

#### **H. QUẢN LÝ QUICK EXCHANGE**
21. **Quản lý Quick Exchange** (Manage Quick Exchange)
    - Quản lý đồng xu được hỗ trợ
    - Quản lý đồng xu cơ bản (base currency)
    - Xem yêu cầu giao dịch
    - Cập nhật trạng thái giao dịch
    - Xem lịch sử giao dịch

#### **I. BÁO CÁO (REPORTS)**
22. **Xem Báo cáo Giao dịch** (Transaction Reports)
    - Xem logs giao dịch
    - Lọc và xuất báo cáo

23. **Xem Báo cáo Đầu tư** (Investment Reports)
    - Xem lịch sử đầu tư
    - Thống kê đầu tư

24. **Xem Báo cáo Phí** (Fees Reports)
    - Xem lịch sử phí
    - Thống kê phí

25. **Xem Lịch sử Đăng nhập** (Login History)
    - Xem lịch sử đăng nhập của người dùng
    - Lọc theo user, thời gian

#### **J. QUẢN LÝ HÀNH CHÍNH - VAI TRÒ & QUYỀN**
26. **Quản lý Vai trò** (Manage Roles)
    - Tạo vai trò mới
    - Xem danh sách vai trò
    - Cập nhật vai trò
    - Xóa vai trò

27. **Quản lý Users & Roles**
    - Gán vai trò cho user
    - Xóa vai trò khỏi user
    - Tạo user mới với vai trò

28. **Quản lý Quyền** (Manage Permissions)
    - Xem danh sách quyền
    - Gán quyền cho vai trò
    - Quản lý nhóm quyền

#### **K. QUẢN LÝ THANH TOÁN & TIỀN TỆ**
29. **Quản lý Cổng Thanh toán** (Manage Payment Gateways)
    - Thêm cổng thanh toán mới (Stripe, CoinPayment, etc.)
    - Xem danh sách
    - Cập nhật thông tin
    - Xóa cổng

30. **Quản lý Tiền tệ được Chấp nhận** (Manage Accept Currencies)
    - Thêm đồng tiền mới
    - Xem danh sách
    - Cập nhật
    - Xóa

31. **Quản lý Tiền tệ Fiat** (Manage Fiat Currencies)
    - Xem danh sách tiền fiat
    - Cập nhật tiền tệ
    - Xóa

#### **L. CÀI ĐẶT HỆ THỐNG**
32. **Cài đặt Chung** (General Settings)
    - Cài đặt thông tin ứng dụng
    - Cài đặt logo, favicon
    - Cài đặt timezone
    - Cài đặt số điện thoại, email liên hệ

33. **Cài đặt Phí** (Fee Settings)
    - Tạo cài đặt phí mới
    - Xem danh sách phí
    - Cập nhật phí
    - Xóa cài đặt phí

34. **Cài đặt Hoa hồng** (Commission Settings)
    - Cài đặt hoa hồng giới thiệu
    - Lưu cấu hình

35. **Cài đặt API bên ngoài** (External API Settings)
    - Cài đặt API bên thứ ba
    - Cập nhật API

36. **Cài đặt Email** (Email Settings)
    - Cài đặt SMTP
    - Cập nhật cấu hình email
    - Gửi email test

37. **Cài đặt SMS** (SMS Settings)
    - Cài đặt Twilio hoặc SMS gateway
    - Cập nhật cấu hình
    - Gửi SMS test

38. **Cài đặt Thông báo** (Notification Settings)
    - Bật/tắt thông báo email
    - Bật/tắt thông báo SMS
    - Cập nhật nhóm thông báo

#### **M. QUẢN LÝ NGÔN NGỮ**
39. **Quản lý Ngôn ngữ** (Manage Languages)
    - Thêm ngôn ngữ mới
    - Xem danh sách
    - Cập nhật
    - Xóa

40. **Quản lý Nội dung Ngôn ngữ** (Manage Language Content)
    - Xem danh sách từ khóa ngôn ngữ
    - Thêm từ khóa mới
    - Cập nhật giá trị
    - Xóa
    - Chuyển đổi ngôn ngữ

#### **N. SAO LƯU & KHÔI PHỤC**
41. **Quản lý Sao lưu** (Manage Backups)
    - Xem danh sách backup
    - Tạo backup mới
    - Tải xuống backup
    - Xóa backup
    - Xóa tất cả backup

#### **O. CMS - QUẢN LÝ NỘI DUNG**
42. **Quản lý Menu** (Manage Menus)
    - Xem menu
    - Cập nhật menu
    - Quản lý nội dung đa ngôn ngữ

43. **Quản lý Slider Trang chủ** (Manage Home Slider)
    - Thêm slider mới
    - Xem danh sách slider
    - Cập nhật
    - Xóa

44. **Quản lý Icon Mạng xã hội** (Manage Social Icons)
    - Thêm icon
    - Xem danh sách
    - Cập nhật
    - Xóa

45. **Quản lý Về chúng tôi** (Manage About Us)
    - Cập nhật nội dung
    - Quản lý banner
    - Quản lý đa ngôn ngữ

46. **Quản lý Gói Đầu tư (CMS)**
    - Cập nhật banner
    - Cập nhật header

47. **Quản lý Join Us Today**
    - Cập nhật nội dung
    - Quản lý đa ngôn ngữ

48. **Quản lý Merchant (CMS)**
    - Quản lý nội dung merchant
    - Quản lý title
    - Quản lý top banner
    - Xóa nội dung

49. **Quản lý Quick Exchange (CMS)**
    - Cập nhật nội dung
    - Quản lý đa ngôn ngữ

50. **Quản lý Background Images**
    - Xem danh sách
    - Cập nhật

51. **Quản lý "Tại sao chọn chúng tôi"** (Why Choose Us)
    - Quản lý content
    - Quản lý header

52. **Quản lý Khách hàng Hài lòng** (Satisfied Customers)
    - Quản lý content
    - Quản lý header

53. **Quản lý FAQ** (Frequently Asked Questions)
    - Thêm câu hỏi/thông tin FAQ
    - Xem danh sách
    - Cập nhật
    - Xóa

54. **Quản lý Blog**
    - Thêm blog mới
    - Xem danh sách
    - Cập nhật
    - Xóa
    - Quản lý top banner
    - Quản lý details top banner

55. **Quản lý Liên hệ**
    - Cập nhật top banner
    - Quản lý địa chỉ liên hệ
    - Thêm địa chỉ
    - Cập nhật
    - Xóa

56. **Quản lý Payment We Accept**
    - Cập nhật header
    - Quản lý đa ngôn ngữ

57. **Quản lý Stake (CMS)**
    - Xem nội dung
    - Cập nhật banner

58. **Quản lý B2X (CMS)**
    - Quản lý loan
    - Quản lý loan banner
    - Quản lý calculator header
    - Quản lý loan details header
    - Quản lý loan details content

59. **Quản lý Top Investor (Nhà đầu tư hàng đầu)**
    - Xem nội dung
    - Quản lý banner
    - Quản lý top banner
    - Quản lý header

60. **Quản lý Our Service**
    - Thêm dịch vụ
    - Xem danh sách
    - Cập nhật
    - Xóa
    - Quản lý header
    - Quản lý top banner

61. **Quản lý Our Rate**
    - Thêm nội dung
    - Xem danh sách
    - Cập nhật
    - Xóa
    - Quản lý header

62. **Quản lý Team Member**
    - Thêm thành viên
    - Xem danh sách
    - Cập nhật
    - Xóa
    - Quản lý banner
    - Quản lý header

63. **Quản lý Our Difference**
    - Thêm nội dung
    - Xem danh sách
    - Cập nhật
    - Xóa
    - Quản lý header

#### **P. HỖ TRỢ**
64. **Quản lý Hỗ trợ** (Manage Support)
    - Xem yêu cầu hỗ trợ
    - Trả lời yêu cầu
    - Xem lịch sử
    - Tìm kiếm

### 3.3. MERCHANT - ACTOR (Đã được phê duyệt)

*Lưu ý: Merchant là Customer đã có tài khoản merchant được phê duyệt*

Các use case đã được liệt kê trong phần Customer (Mục G), nhưng khi đã là Merchant, họ có thêm các quyền đặc biệt:
- Quản lý dashboard merchant
- Tạo và quản lý URL thanh toán
- Quản lý khách hàng của merchant
- Xem giao dịch merchant
- Rút tiền từ hệ thống merchant

### 3.4. SYSTEM - ACTOR

1. **Xử lý Thanh toán tự động**
   - Xử lý callback từ Stripe
   - Xử lý callback từ CoinPayment (IPN)
   - Cập nhật số dư ví

2. **Tính toán Lãi suất**
   - Tính lãi cho gói đầu tư theo lịch
   - Tính lãi cho staking
   - Cập nhật số dư tự động

3. **Tính toán Hoa hồng**
   - Tính hoa hồng giới thiệu
   - Tính thưởng nhóm
   - Cập nhật ví

4. **Gửi Thông báo**
   - Gửi email thông báo
   - Gửi SMS thông báo (nếu bật)
   - Gửi thông báo trong hệ thống

5. **Sao lưu tự động**
   - Tạo backup theo lịch trình
   - Lưu trữ backup

6. **Cập nhật Giá tiền tệ**
   - Cập nhật giá tiền tệ crypto tự động
   - Lưu vào database

7. **Kiểm tra Trạng thái Giao dịch**
   - Kiểm tra giao dịch đang chờ
   - Cập nhật trạng thái tự động

8. **Chạy Cronjob**
   - Chạy các tác vụ định kỳ
   - Tạo lịch trình làm việc

## 4. CÁC MỐI QUAN HỆ GIỮA CÁC ACTOR

1. **Customer ↔ Admin**
   - Customer gửi yêu cầu KYC → Admin duyệt
   - Customer nạp/rút tiền → Admin xử lý
   - Customer đăng ký vay → Admin phê duyệt
   - Customer gửi yêu cầu merchant → Admin duyệt

2. **Merchant ↔ Customers của Merchant**
   - Merchant tạo payment URL
   - Customers của merchant thực hiện thanh toán
   - Merchant xem giao dịch

3. **Tất cả ↔ Payment Gateway**
   - Hệ thống gọi API cổng thanh toán
   - Nhận callback từ cổng thanh toán

4. **System ↔ Tất cả**
   - System xử lý tự động cho tất cả các actor
   - System gửi thông báo

## 5. TÓM TẮT SỐ LƯỢNG USE CASE

- **Customer**: ~35 use cases
- **Admin**: ~64 use cases
- **Merchant**: ~6 use cases (nằm trong Customer)
- **System**: ~8 use cases
- **Tổng cộng**: ~113 use cases chính

## 6. CÁC LUỒNG NGHIỆP VỤ CHÍNH

### Luồng 1: Khách hàng mới đăng ký và đầu tư
1. Đăng ký tài khoản
2. Xác minh email
3. Đăng nhập
4. Nạp tiền vào ví
5. Xem các gói đầu tư
6. Chọn và mua gói đầu tư
7. Theo dõi lãi suất nhận được

### Luồng 2: Khách hàng vay tiền
1. Xem gói vay
2. Tính toán khoản vay
3. Đăng ký vay
4. Đợi Admin phê duyệt
5. Rút tiền từ khoản vay
6. Trả nợ theo lịch

### Luồng 3: Khách hàng trở thành Merchant
1. Gửi yêu cầu tài khoản merchant
2. Đợi Admin phê duyệt
3. Tạo URL thanh toán
4. Chia sẻ link cho khách hàng của mình
5. Theo dõi giao dịch
6. Rút tiền merchant

### Luồng 4: Quản lý Admin
1. Đăng nhập admin
2. Xem dashboard
3. Xử lý các yêu cầu của khách hàng
4. Quản lý giao dịch
5. Quản lý CMS
6. Xem báo cáo

## 7. PHỤ LỤC - CÁC MODULE CHÍNH

- **Package Module**: Quản lý gói đầu tư
- **Finance Module**: Quản lý tài chính (nạp, rút, chuyển)
- **B2xloan Module**: Quản lý vay tiêu dùng
- **Merchant Module**: Quản lý thương nhân
- **Stake Module**: Quản lý staking và subscription
- **QuickExchange Module**: Quản lý trao đổi nhanh
- **Reports Module**: Quản lý báo cáo
- **Support Module**: Quản lý hỗ trợ
- **CMS Module**: Quản lý nội dung website

