# 📋 Tổng Hợp File API Coin/Cryptocurrency

## 🎯 Overview
Dự án này là Hệ thống Tài chính Đa năng với tính năng quản lý cryptocurrency và tiền tệ. Tài liệu này liệt kê tất cả các file liên quan đến API coin.

---

## 📁 Các File Service Chính

### 1. **CoinMarketCapService.php**
**Đường dẫn:** `backend/app/Services/CoinMarketCapService.php`

**Chức năng:**
- Kết nối với CoinMarketCap API để lấy dữ liệu cryptocurrency
- Validate coin symbol có tồn tại hay không
- Cập nhật tỷ giá cho tất cả các currency được hỗ trợ
- API Key: `ab302835-9c0d-4b77-b8ed-f7ca7f285c53` (default)
- URL: `https://pro-api.coinmarketcap.com/v1`

**Methods:**
- `coinExists($symbol)` - Kiểm tra coin symbol có hợp lệ
- `currencyRateUpdate()` - Cập nhật tỷ giá tất cả currency

---

### 2. **CoinPaymentService.php**
**Đường dẫn:** `backend/app/Services/CoinPaymentService.php`

**Chức năng:**
- Xử lý payment qua CoinPayments.net
- Tạo transaction deposit cho cryptocurrency
- Verify IPN (Instant Payment Notification)
- HMAC signature verification để bảo mật

**Endpoints:**
- URL: `https://www.coinpayments.net/api.php`

**Methods:**
- `createDepositTxn($attributes)` - Tạo transaction deposit
- `paymentVerify($attributes, $request)` - Verify payment từ CoinPayment

---

### 3. **CurrencyConvertService.php**
**Đường dẫn:** `backend/app/Services/CurrencyConvertService.php`

**Chức năng:**
- Kết nối với CoinGecko API để lấy tỷ giá cryptocurrency
- Convert coin rates về USD
- URL: `https://api.coingecko.com/api/v3/`

**Methods:**
- `coinRate($coinName)` - Lấy tỷ giá theo tên coin

---

### 4. **AcceptCurrencyService.php**
**Đường dẫn:** `backend/app/Services/AcceptCurrencyService.php`

**Chức năng:**
- Quản lý các loại currency được chấp nhận
- CRUD operations cho currency
- Kết nối với payment gateway
- Tìm currency theo symbol

**Methods:**
- `create($attributes)` - Tạo currency mới
- `update($attributes, $id)` - Cập nhật currency
- `destroy($attributes)` - Xóa currency
- `find($id)` - Tìm currency theo ID
- `findCurrencyBySymbol($symbol)` - Tìm theo symbol
- `activeAll($attributes)` - Lấy tất cả currency active
- `allWithBalance($attributes)` - Lấy currency có balance

---

### 5. **FiatCurrencyService.php**
**Đường dẫn:** `backend/app/Services/FiatCurrencyService.php`

**Chức năng:**
- Quản lý fiat currency (tiền pháp định: USD, EUR, VND, v.v.)
- CRUD operations

---

## 🎮 Controllers

### 1. **AcceptCurrencyController.php**
**Đường dẫn:** `backend/app/Http/Controllers/Currency/AcceptCurrencyController.php`

**Chức năng:**
- Controller cho Accept Currency management
- Validate coin name và symbol khi create/update
- Tích hợp với CoinMarketCap và CurrencyConvert services

**Endpoints:**
```
- Index: GET /admin/currency/setting/accept
- Store: POST /admin/currency/setting/accept
- Edit: GET /admin/currency/setting/accept/{id}
- Update: PUT/PATCH /admin/currency/setting/accept/{id}
- Destroy: DELETE /admin/currency/setting/accept/{id}
```

**Validation:**
- Coin name được validate qua CurrencyConvertService
- Coin symbol được validate qua CoinMarketCapService
- Trừ USD và LTCT (LiteCoin Test)

---

### 2. **FiatCurrencyController.php**
**Đường dẫn:** `backend/app/Http/Controllers/Currency/FiatCurrencyController.php`

**Chức năng:**
- Controller cho Fiat Currency management

**Endpoints:**
```
- Index: GET /admin/currency/setting/fiat
- Store: POST /admin/currency/setting/fiat
- Edit: GET /admin/currency/setting/fiat/{id}
- Update: PUT/PATCH /admin/currency/setting/fiat/{id}
- Destroy: DELETE /admin/currency/setting/fiat/{id}
```

---

### 3. **PaymentGatewayController.php**
**Đường dẫn:** `backend/app/Http/Controllers/Currency/PaymentGatewayController.php`

**Chức năng:**
- Quản lý payment gateway (Stripe, CoinPayment, v.v.)

---

## 🌐 API Routes

### Admin Routes (`backend/routes/backend.php`)
```php
// Currency routes
Route::resource('currency/setting/accept', AcceptCurrencyController::class);
Route::resource('currency/setting/fiat', FiatCurrencyController::class);
Route::resource('payment/setting/gateway', PaymentGatewayController::class);

// Dashboard currency chart
Route::get('/dashboard/currency/chart', [DashboardController::class, 'acceptCurrencyChart']);
```

### Customer Routes (`backend/routes/customer.php`)
```php
// AJAX currency request
Route::post('/ajax/request/currency', [AjaxRequestController::class, 'loadCurrency']);

// CoinPayment IPN callback
Route::post('deposit/coinpayment/ipn', [DepositPaymentCallBackController::class, 'coinPaymentConfirm']);
```

---

## 📊 Models & Repositories

### Models
- `AcceptCurrency` - Model cho cryptocurrency
- `FiatCurrency` - Model cho fiat currency
- `PaymentGateway` - Model cho payment gateway

### Repositories
- `AcceptCurrencyRepository` - Repository cho cryptocurrency operations
- `FiatCurrencyRepository` - Repository cho fiat currency operations
- `ExternalApiSetupRepository` - Repository cho external API config

---

## 🔄 Jobs & Automation

### CurrencyPriceUpdateJob.php
**Đường dẫn:** `backend/app/Jobs/CurrencyPriceUpdateJob.php`

**Chức năng:**
- Job tự động cập nhật giá cryptocurrency
- Scheduled job để update rate định kỳ
- Sử dụng CoinMarketCap API

---

## 🛠️ Configuration Files

### 1. External API Configuration
**File:** Database - `external_api_setup` table

**Support:**
- CoinMarketCap
- CoinGecko
- Stripe
- Twilio

### 2. Payment Gateway Configuration
- Stripe - Payment gateway
- CoinPayment - Cryptocurrency payment

---

## 📝 Migration Files

### Currency Related Migrations
- `create_accept_currencies_table`
- `create_fiat_currencies_table`
- `create_payment_gateways_table`
- `create_currency_gateways_table` (pivot table)

---

## 🔐 Security Features

1. **HMAC Verification**
   - CoinPayment IPN verification
   - SHA512 hash signature

2. **API Key Management**
   - Stored in database
   - Secure retrieval

3. **Transaction Validation**
   - Amount validation
   - Merchant ID verification

---

## 📦 Packages Used

1. **GuzzleHTTP** - HTTP client cho API calls
2. **Laravel HTTP Client** - Laravel HTTP facade
3. **Carbon** - Date handling
4. **Eloquent ORM** - Database operations

---

## 🚀 Usage Examples

### 1. Validate Coin Name
```php
use App\Services\CurrencyConvertService;

$service = new CurrencyConvertService();
$result = $service->coinRate('bitcoin');
// Returns: {status: 'success', rate: 45000}
```

### 2. Check Coin Symbol Exists
```php
use App\Services\CoinMarketCapService;

$service = app(CoinMarketCapService::class);
$exists = $service->coinExists('BTC');
// Returns: true/false
```

### 3. Create CoinPayment Transaction
```php
use App\Services\CoinPaymentService;

$service = app(CoinPaymentService::class);
$result = $service->createDepositTxn([
    'amount' => 100.00,
    'currency1' => 'USD',
    'currency2' => 'BTC',
    'buyer_email' => 'user@example.com',
    'ipn_url' => 'https://domain.com/deposit/coinpayment/ipn',
    'public_key' => config('coinpayment.public_key'),
    'private_key' => config('coinpayment.private_key'),
]);
```

---

## 📞 Support APIs

### 1. CoinMarketCap API
- **URL:** `https://pro-api.coinmarketcap.com/v1`
- **Endpoints:**
  - `/cryptocurrency/map` - Get coin list
  - `/cryptocurrency/listings/latest` - Get latest prices

### 2. CoinGecko API
- **URL:** `https://api.coingecko.com/api/v3`
- **Endpoints:**
  - `/simple/price` - Get simple prices

### 3. CoinPayment API
- **URL:** `https://www.coinpayments.net/api.php`
- **Commands:**
  - `create_transaction` - Create new transaction

---

## 📈 Features

### ✅ Supported Cryptocurrencies
- Bitcoin (BTC)
- Ethereum (ETH)
- Litecoin (LTC)
- And many more...

### ✅ Payment Methods
- Cryptocurrency deposits
- Fiat currency deposits (via Stripe)
- Bank transfers

### ✅ Real-time Updates
- Automatic price updates via CoinMarketCap
- Scheduled jobs for rate updates
- Webhook support for payments

---

## 🎯 Summary

Dự án này có **đầy đủ các file API coin/cryptocurrency**:
- ✅ 4 Services chính (CoinMarketCap, CoinPayment, CurrencyConvert, AcceptCurrency)
- ✅ 3 Controllers (AcceptCurrency, FiatCurrency, PaymentGateway)
- ✅ Multiple repositories for data access
- ✅ Automated jobs for price updates
- ✅ Support webhooks và IPN
- ✅ Integration với CoinMarketCap, CoinGecko, CoinPayment
- ✅ Security với HMAC verification

---

**Tạo bởi:** Assistant
**Ngày:** {{date}}
**Dự án:** Hệ thống Tài chính Đa năng

