<x-customer-guest-layout id="login-bg" class="register-bg">
    <div class="form-container my-4">
        <div class="panel">
            <div class="register-logo text-center mb-4">
                <img class="mb-2"
                    src="{{ $_setting->logo ?? null ? storage_asset($_setting->logo) : assets('img/logo.png') }}"
                    alt="" />
            </div>
            <div class="panel-header mb-4">
                <h3 class="fs-30 text-black">{{ localize('Sign Up') }}</h3>
                @if (session()->has('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
                @if (session()->has('warning'))
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        {{ session('warning') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                @endif
            </div>
            <form method="POST" action="{{ route('home.registration') }}" class="register-form">
                @csrf
                <input type="text" name="honeypot" style="display:none;">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium">
                                {{ localize('First Name') }} <span class="text-danger">*</span>
                            </label>
                            <input type="text" name="first_name" id="first_name"
                                class="custom-form-control border-0 @error('first_name') is-invalid @enderror"
                                placeholder="{{ localize('First Name') }}" value="{{ old('first_name') }}" required />
                            @error('first_name')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-4">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium" for="last_name">
                                {{ localize('Last Name') }}
                            </label>
                            <div class="position-relative">
                                <input type="text" name="last_name" id="first_name"
                                    class="custom-form-control border-0  @error('last_name') is-invalid @enderror"
                                    placeholder="{{ localize('last_name') }}" value="{{ old('last_name') }}" />
                            </div>
                            @error('last_name')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium" for="email">
                                {{ localize('email') }} <span class="text-danger">*</span>
                            </label>
                            <input type="email" name="email" id="email"
                                class="custom-form-control border-0 @error('email') is-invalid @enderror"
                                placeholder="example@exaple.com" value="{{ old('email') }}" required />
                            @error('email')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-4">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium" for="phone">
                                {{ localize('phone') }} <span class="text-danger">*</span>
                            </label>
                            <div class="position-relative">
                                <input type="text" name="phone" id="phone"
                                    class="custom-form-control border-0  @error('phone') is-invalid @enderror"
                                    placeholder="{{ localize('phone') }}" value="{{ old('phone') }}" required />
                            </div>
                            @error('phone')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-4">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium" for="username">
                                {{ localize('User Name') }} <span class="text-danger">*</span>
                            </label>
                            <div class="position-relative">
                                <input type="text" name="username" id="username"
                                    class="custom-form-control border-0  @error('username') is-invalid @enderror"
                                    placeholder="{{ localize('user name') }}" value="{{ old('username') }}"
                                    required />
                            </div>
                            @error('username')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-4">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium" for="referral">
                                {{ localize('Sponsor ID') }}
                            </label>
                            <div class="position-relative">
                                <input type="text" name="referral" id="referral"
                                    class="custom-form-control border-0  @error('referral') is-invalid @enderror"
                                    value="{{ request('referral') }}" readonly />
                            </div>
                            @error('referral')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-4">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium" for="country">
                                {{ localize('country') }} <span class="text-danger">*</span>
                            </label>
                            <div class="position-relative">
                                <select name="country" id="country" class="custom-form-control placeholder-single"
                                    required>
                                    <option value="">{{ localize('Select Country') }}</option>
                                    @foreach ($countries as $key => $country)
                                        <option value="{{ $country['name'] }}">{{ $country['name'] }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @error('country')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-4">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium" for="password">
                                {{ localize('password') }} <span class="text-danger">*</span>
                            </label>
                            <div class="position-relative">
                                <input type="password" name="password" id="password"
                                    class="custom-form-control border-0  @error('password') is-invalid @enderror"
                                    placeholder="{{ localize('password') }}" required />
                                <div class="password-toggle-icon">
                                    <i class="fas fa-eye-slash text-black-50"></i>
                                </div>
                            </div>
                            @error('password')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-4">
                            <label class="col-form-label text-start text-color-1 fs-16 fw-medium"
                                for="password_confirmation">
                                {{ localize('confirm_password') }} <span class="text-danger">*</span>
                            </label>
                            <div class="position-relative">
                                <input type="password" name="password_confirmation" id="password_confirmation"
                                    class="custom-form-control border-0  @error('password_confirmation') is-invalid @enderror"
                                    placeholder="{{ localize('confirm_password') }}" />
                                <div class="password-toggle-icon" data-target="password_confirmation">
                                    <i class="fas fa-eye-slash text-black-50"></i>
                                </div>
                            </div>
                            @error('password_confirmation')
                                <span class="invalid-feedback d-block text-start" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-save py-3 lh-1 w-100 mb-3">
                    {{ localize('Sign Up') }}
                </button>
                <div class="text-center">
                    <p>{{ localize('Already have an account? Please') }} <a class="fw-bold ms-1"
                            href="{{ route('customer.login') }}">{{ localize('Login') }}</a></p>
                </div>

            </form>
        </div>
    </div>

    @push('css')
        <link rel="stylesheet" href="{{ assets('css/login.min.css') }}">
    @endpush
    @push('js')
        <script src="{{ assets('js/login.min.js') }}"></script>
    @endpush

</x-customer-guest-layout>
