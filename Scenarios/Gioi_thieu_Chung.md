# GIỚI THIỆU CHUNG

## 1. Mục tiêu của đề tài

### 1.1. Mục tiêu tổng quát

Xây dựng một **hệ thống tài chính đa năng** (Multi-Financial Platform) cung cấp giải pháp toàn diện cho các nhu cầu tài chính hiện đại, bao gồm đầu tư, vay tiêu dùng, thanh toán trực tuyến, và quản lý tài chính cá nhân. Hệ thống hỗ trợ đa người dùng với các vai trò khác nhau: Khách hàng, Quản trị viên, và Thương nhân.

### 1.2. Mục tiêu cụ thể

#### Đối với Khách hàng (Customer):
- **Đầu tư thông minh**: Cung cấp nhiều gói đầu tư với lãi suất cạnh tranh và linh hoạt
- **Vay tiêu dùng**: Dịch vụ vay tiêu dùng B2X với quy trình đơn giản, phê duyệt nhanh
- **Quản lý tài chính**: Nạp tiền, rút tiền, chuyển khoản dễ dàng
- **Staking**: Gửi tiết kiệm và nhận lãi định kỳ
- **Quick Exchange**: Trao đổi tiền tệ nhanh chóng
- **Merchant Services**: Cơ hội trở thành thương nhân và tạo payment link

#### Đối với Thương nhân (Merchant):
- **Payment URL**: Tạo link thanh toán cho khách hàng
- **Quản lý khách hàng**: Theo dõi và quản lý khách hàng của mình
- **Thống kê giao dịch**: Dashboard với analytics chi tiết
- **Rút tiền linh hoạt**: Rút tiền từ tài khoản merchant

#### Đối với Quản trị viên (Admin):
- **Quản lý người dùng**: Quản lý khách hàng, merchant, và users
- **Duyệt giao dịch**: Xử lý nạp tiền, rút tiền, và các giao dịch tài chính
- **Quản lý nội dung**: CMS đầy đủ để quản lý website
- **Báo cáo và thống kê**: Dashboard tổng quan với đầy đủ metrics
- **KYC & Compliance**: Xác minh danh tính khách hàng
- **Cấu hình hệ thống**: Quản lý gói đầu tư, vay, settings, v.v.

### 1.3. Giá trị cốt lõi

- **An toàn**: Bảo mật thông tin và giao dịch tài chính với nhiều lớp bảo vệ
- **Tiện lợi**: Trải nghiệm người dùng mượt mà, dễ sử dụng
- **Đa năng**: Một nền tảng tích hợp nhiều dịch vụ tài chính
- **Minh bạch**: Hệ thống báo cáo và audit trail đầy đủ
- **Scalable**: Kiến trúc mô-đun, dễ mở rộng và bảo trì

---

## 2. Phạm vi của hệ thống

### 2.1. Phạm vi chức năng

Hệ thống bao gồm **113+ Use Cases** được phân bổ vào **10 module chính**:

#### **Core Modules:**
1. **Customer Module** - Quản lý khách hàng
   - 35 use cases bao gồm: Đăng ký, đăng nhập, KYC, nạp/rút tiền, đầu tư, vay, merchant services

2. **Package/Investment Module** - Gói đầu tư
   - Tạo và quản lý gói đầu tư
   - Khách hàng mua gói và nhận lãi định kỳ
   - Tính toán lãi suất tự động

3. **B2X Loan Module** - Cho vay tiêu dùng
   - Tạo gói vay
   - Khách hàng đăng ký vay và trả nợ
   - Admin duyệt và quản lý khoản vay
   - Lịch trả nợ tự động

4. **Finance Module** - Quản lý tài chính
   - Nạp tiền qua Payment Gateway (Stripe, CoinPayment)
   - Rút tiền với approval workflow
   - Chuyển khoản giữa tài khoản
   - Quản lý ví và số dư

5. **Merchant Module** - Hệ thống thương nhân
   - Tạo payment URL
   - Quản lý khách hàng merchant
   - Theo dõi giao dịch merchant
   - Rút tiền merchant

6. **Stake Module** - Staking & Subscription
   - Tạo gói staking
   - Khách hàng subscribe và nhận lãi
   - Quản lý subscription

7. **Quick Exchange Module** - Trao đổi nhanh
   - Trao đổi tiền tệ
   - Quản lý exchange rate

8. **Reports Module** - Báo cáo
   - Báo cáo giao dịch
   - Báo cáo đầu tư
   - Báo cáo phí

9. **Support Module** - Hỗ trợ
   - Ticket system
   - Chat support

10. **CMS Module** - Quản lý nội dung
    - Quản lý nội dung website
    - Blog, FAQ, About Us
    - Multi-language content

#### **System Automation:**
- Xử lý thanh toán tự động từ Payment Gateway
- Tính toán lãi suất theo lịch
- Tính toán hoa hồng
- Gửi thông báo và email
- Sao lưu tự động

### 2.2. Phạm vi người dùng

| Đối tượng | Số lượng Use Cases | Mô tả |
|-----------|-------------------|--------|
| Customer | 35 | Khách hàng sử dụng tất cả các tính năng |
| Admin | 64 | Quản lý toàn bộ hệ thống |
| Merchant | 6 | Thương nhân với tính năng đặc biệt |
| System | 8 | Tự động hóa các quy trình |
| **Tổng** | **113** | **Use cases toàn hệ thống** |

### 2.3. Phạm vi công nghệ

- **Backend**: Laravel 10 framework với modular architecture
- **Frontend**: Next.js 14 với React 18
- **Database**: MySQL
- **Payment Gateway**: Stripe, CoinPayment
- **Authentication**: Laravel Sanctum, 2FA
- **Cache & Queue**: Redis
- **Storage**: Local/Cloud (S3)
- **Email**: SMTP
- **SMS**: Twilio

### 2.4. Phạm vi không bao gồm

- Mobile App (iOS/Android) - Hiện tại chỉ có web app
- Blockchain native integration
- Banking API direct integration (qua Payment Gateway)
- Real-time trading
- Cryptocurrency wallet native support

---

## 3. Giới thiệu sơ lược về phần mềm cần xây dựng

### 3.1. Tổng quan

**Hệ thống Tài chính Đa năng** là một nền tảng web-based cung cấp các dịch vụ tài chính toàn diện, được xây dựng với kiến trúc hiện đại, scalable và bảo mật cao.

### 3.2. Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                     │
│  - User Interface (Customer, Admin, Merchant)          │
│  - React 18 + TypeScript                                │
│  - Responsive Design                                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ API Calls
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   BACKEND (Laravel)                     │
│                                                         │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │Package   │  │ B2X Loan │  │   Merchant        │    │
│  │Module    │  │ Module   │  │   Module          │    │
│  └─────────┘  └──────────┘  └──────────────────┘    │
│                                                         │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Finance │  │  Stake   │  │   Quick           │    │
│  │ Module  │  │  Module  │  │   Exchange        │    │
│  └─────────┘  └──────────┘  └──────────────────┘    │
│                                                         │
│  ┌─────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ Reports │  │ Support  │  │   CMS             │    │
│  │ Module  │  │ Module   │  │   Module          │    │
│  └─────────┘  └──────────┘  └──────────────────┘    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Data
                       │
┌──────────────────────▼──────────────────────────────────┐
│                DATABASE (MySQL)                         │
│  - Users, Wallets, Transactions                        │
│  - Investments, Loans, Merchants                       │
│  - CMS Content                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                          │
│  - Payment Gateway (Stripe, CoinPayment)                 │
│  - Email Service (SMTP)                                 │
│  - SMS Service (Twilio)                                  │
│  - Storage (Local/S3)                                    │
└─────────────────────────────────────────────────────────┘
```

### 3.3. Tính năng nổi bật

#### **Đầu tư thông minh**
- Nhiều gói đầu tư với lãi suất và thời hạn khác nhau
- Tính lãi tự động theo lịch (hàng ngày/tuần/tháng)
- Hoa hồng giới thiệu cho người giới thiệu
- Thưởng nhóm theo cấu trúc MLM

#### **Vay tiêu dùng B2X**
- Gói vay linh hoạt
- Đăng ký online dễ dàng
- Admin duyệt nhanh
- Trả nợ linh hoạt theo kỳ

#### **Merchant Services**
- Tạo payment URL nhanh
- Quản lý khách hàng riêng
- Analytics chi tiết
- Rút tiền nhanh chóng

#### **Quản lý tài chính**
- Nạp tiền qua nhiều phương thức
- Rút tiền an toàn với approval
- Chuyển khoản dễ dàng
- Đa tiền tệ (Fiat + Crypto)

#### **Hệ thống tự động**
- Callback từ Payment Gateway
- Tính lãi và trả lãi tự động
- Gửi thông báo tự động
- Sao lưu dữ liệu tự động

### 3.4. Giao diện và trải nghiệm người dùng

- **Responsive Design**: Hoạt động tốt trên mọi thiết bị (Desktop, Tablet, Mobile)
- **UI/UX hiện đại**: Material Design, Tailwind CSS
- **Dark/Light Mode**: Tùy chọn giao diện
- **Đa ngôn ngữ**: Hỗ trợ nhiều ngôn ngữ (English, Vietnamese, v.v.)
- **Realtime Updates**: Cập nhật thời gian thực với WebSocket
- **PWA Ready**: Progressive Web App capability

---

## 4. Môi trường phát triển

### 4.1. Ngôn ngữ lập trình

#### **Backend:**
- **PHP**: Version 8.1 hoặc cao hơn
  - Features: Attributes, Enums, Readonly Properties
  - JIT Compilation support

#### **Frontend:**
- **JavaScript/TypeScript**: ES2020+
  - TypeScript 5.3+ for type safety
  - Modern JavaScript features (Async/Await, Optional Chaining)

- **React**: Version 18.3+
  - Hooks, Context API
  - Server Components (Next.js)

### 4.2. Framework và Library

#### **Backend Framework:**
```
Laravel 10.x
├── Eloquent ORM
├── Blade Templating
├── Route & Middleware
├── Queue System
├── Event Broadcasting
└── Package: nwidart/laravel-modules
```

#### **Frontend Framework:**
```
Next.js 14.x
├── React 18
├── SSR (Server-Side Rendering)
├── SSG (Static Site Generation)
├── API Routes
└── File-based Routing
```

### 4.3. Database

#### **MySQL**: Version 8.0+
- InnoDB Storage Engine
- Transactions và ACID compliance
- Full-text search
- JSON support

#### **Database Structure:**
```
- users
- wallets
- transactions
- deposits
- withdraws
- transfers
- investment_packages
- user_investments
- loan_packages
- loan_applications
- merchants
- payment_urls
- stake_plans
- subscriptions
- support_tickets
- cms_content
... (174+ migrations)
```

### 4.4. Công cụ và Tool

#### **Development Tools:**
- **IDE**: VS Code, PhpStorm
- **Version Control**: Git, GitHub
- **Package Manager**: Composer (PHP), npm/yarn (Node.js)
- **Build Tool**: Vite (Frontend), Laravel Mix

#### **Testing:**
- **PHPUnit**: Unit testing
- **Laravel Dusk**: Browser testing
- **Jest**: Frontend testing

#### **Code Quality:**
- **PHPCS**: Code Sniffer
- **PHPStan**: Static analysis
- **ESLint**: JavaScript linter
- **Prettier**: Code formatter

### 4.5. Third-party Services

#### **Payment Gateway:**
- **Stripe**: Credit/Debit cards
  - Package: `stripe/stripe-php`
  - Webhooks integration
- **CoinPayment**: Cryptocurrency
  - IPN (Instant Payment Notification)

#### **Email Service:**
- **SMTP**: PHP Mailer
  - Configuration: SMTP settings
  - Queue support

#### **SMS Service:**
- **Twilio**: SMS notifications
  - Package: `twilio/sdk`

#### **File Storage:**
- **Local Storage**: Laravel filesystem
- **Cloud Storage**: AWS S3 (optional)

#### **Authentication:**
- **Laravel Sanctum**: API authentication
- **Google 2FA**: Two-factor authentication
  - Package: `pragmarx/google2fa`

### 4.6. DevOps & Infrastructure

#### **Server Requirements:**
```
- PHP: >= 8.1
- MySQL: >= 8.0
- Node.js: >= 18.0
- Composer: Latest
- Nginx/Apache
- Redis (Optional but recommended)
```

#### **Development Environment:**
- **Local**: XAMPP, Laragon, Valet
- **Virtual**: Docker, Vagrant
- **Cloud**: AWS, DigitalOcean, Vultr

#### **Deployment:**
- **CI/CD**: GitHub Actions, GitLab CI
- **Environment**: Development, Staging, Production
- **Monitoring**: Error tracking, Performance monitoring
- **Backup**: Automated daily backups

### 4.7. Security

#### **Security Features:**
- **CSRF Protection**: Laravel built-in
- **XSS Prevention**: Input sanitization
- **SQL Injection Prevention**: Eloquent ORM
- **Password Hashing**: bcrypt/argon2
- **Rate Limiting**: API throttling
- **2FA**: Two-factor authentication
- **KYC Verification**: Identity verification
- **Encryption**: Data encryption at rest

#### **Compliance:**
- GDPR compliance
- Data privacy protection
- Audit logging
- Access control

---

## 5. Đối tượng sử dụng

### 5.1. Customer (Khách hàng/Người dùng thường)

#### **Mô tả:**
Khách hàng là người dùng chính của hệ thống, đăng ký tài khoản để sử dụng các dịch vụ tài chính.

#### **Đặc điểm:**
- Có thể là bất kỳ ai muốn sử dụng dịch vụ
- Đã đăng ký tài khoản và verify email
- Có thể đã verify KYC (tùy chọn)
- Sử dụng các tính năng: đầu tư, vay, nạp/rút tiền, v.v.

#### **Use cases chính:**
1. **Đăng ký tài khoản** - UC-C-01
2. **Đăng nhập** - UC-C-02
3. **Nạp tiền** - UC-C-07
4. **Mua gói đầu tư** - UC-C-13
5. **Đăng ký vay** - UC-C-20
6. Gửi yêu cầu hỗ trợ
7. Xem dashboard và thống kê

#### **Tổng: 35 use cases**

---

### 5.2. Merchant (Thương nhân/Người bán)

#### **Mô tả:**
Merchant là customer đã được phê duyệt tài khoản merchant, có thể tạo payment URL và quản lý khách hàng của mình.

#### **Đặc điểm:**
- Phải là customer đã verify KYC
- Đã gửi và được phê duyệt merchant application
- Có quyền truy cập merchant dashboard
- Có thể tạo payment URL cho khách hàng

#### **Use cases chính:**
1. **Tạo Payment URL** - UC-C-30
2. Quản lý khách hàng merchant
3. Xem giao dịch merchant
4. Rút tiền merchant

#### **Tổng: 6 use cases** (nằm trong Customer use cases)

---

### 5.3. Admin (Quản trị viên)

#### **Mô tả:**
Admin là người quản lý toàn bộ hệ thống, có quyền cao nhất và kiểm soát mọi hoạt động.

#### **Đặc điểm:**
- Quyền truy cập đầy đủ
- Quản lý users, customers, merchants
- Duyệt giao dịch tài chính
- Cấu hình hệ thống
- Quản lý nội dung CMS
- Xem báo cáo và thống kê

#### **Use cases chính:**
1. **Xác minh KYC** - UC-A-04
2. **Quản lý nạp tiền** - UC-A-05
3. **Quản lý đơn Merchant** - UC-A-14
4. Quản lý khách hàng
5. Quản lý gói đầu tư/vay
6. Cấu hình hệ thống
7. Quản lý CMS
8. Xem báo cáo

#### **Tổng: 64 use cases**

#### **Phân cấp Admin:**
- **Super Admin**: Toàn quyền
- **Admin**: Quản lý người dùng và giao dịch
- **Content Manager**: Chỉ quản lý CMS
- **Support**: Chỉ xử lý support tickets

---

### 5.3. System (Hệ thống tự động)

#### **Mô tả:**
System là các actor tự động, xử lý các quy trình không cần tương tác người dùng.

#### **Chức năng:**
- Xử lý callback từ Payment Gateway
- Tính lãi suất và trả lãi tự động
- Tính hoa hồng tự động
- Gửi email/SMS thông báo
- Sao lưu dữ liệu
- Cập nhật giá tiền tệ
- Chạy cronjobs

#### **Use cases chính:**
1. **Xử lý thanh toán tự động** - UC-S-01
2. Tính toán lãi suất
3. Tính toán hoa hồng
4. Gửi thông báo
5. Sao lưu tự động

#### **Tổng: 8 use cases**

---

### 5.4. Tổng kết đối tượng sử dụng

| Đối tượng | Số Use Cases | Mô tả | Quyền hạn |
|-----------|-------------|-------|-----------|
| **Customer** | 35 | Người dùng thường | Đầu tư, vay, nạp/rút, xem thống kê |
| **Merchant** | 6 | Thương nhân | Tất cả của Customer + Payment URL |
| **Admin** | 64 | Quản trị viên | Quản lý toàn bộ hệ thống |
| **System** | 8 | Hệ thống tự động | Xử lý tự động các quy trình |
| **TỔNG** | **113** | | |

---

### 5.5. Quy trình chung của người dùng

#### **Luồng Customer mới:**

1. **Đăng ký** → Verify email → **Đăng nhập**
2. **Nạp tiền** vào ví
3. **Xem gói đầu tư** → Chọn gói → **Mua gói**
4. Nhận lãi định kỳ tự động
5. Có thể **đăng ký vay** (nếu cần)
6. Xem thống kê và **rút tiền**

#### **Luồng Merchant:**

1. Là Customer thường
2. **Đăng ký merchant** → Admin **duyệt**
3. **Tạo Payment URL** → Share cho khách hàng
4. Khách hàng thanh toán
5. Xem giao dịch và **rút tiền merchant**

#### **Luồng Admin:**

1. **Đăng nhập admin**
2. Xem dashboard tổng quan
3. Xử lý các yêu cầu: KYC, Deposits, Merchants, Loans
4. Cấu hình hệ thống
5. Xem báo cáo và thống kê

---

## 6. Kết luận

Hệ thống Tài chính Đa năng là một giải pháp toàn diện, hiện đại với kiến trúc scalable, bảo mật cao, và có thể mở rộng. Với 113+ use cases được phân bổ vào 10 module chính, hệ thống đáp ứng đầy đủ nhu cầu của 3 đối tượng chính: Customer, Merchant, và Admin.

Sử dụng các công nghệ hàng đầu hiện tại (Laravel 10, Next.js 14, React 18, MySQL 8.0) kết hợp với các dịch vụ bên thứ ba (Stripe, CoinPayment, Twilio), hệ thống đảm bảo hiệu năng cao, bảo mật tốt, và trải nghiệm người dùng tuyệt vời.

---

**Phiên bản**: 1.0  
**Ngày tạo**: 2024  
**Tác giả**: Team ClassN06_Nhom3

