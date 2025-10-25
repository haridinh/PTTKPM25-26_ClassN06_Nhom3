<x-customer-guest-layout id="login-bg" class="login-bg"
                         data-backgroundimage="{{ $_setting->login_bg_img ?? null ? storage_asset($_setting->login_bg_img) : assets('img/login-bg.png') }}">
    <div class="form-container my-4">
        <div class="panel">
            <div class="register-logo text-center mb-4">
                <img class="mb-2"
                     src="{{ $_setting->logo ?? null ? storage_asset($_setting->logo) : assets('img/logo.png') }}"
                     alt=""/>
            </div>
            <div class="panel-header mb-4">
                <h3 class="fs-30 text-black">{{ localize('Forgot Password') }}</h3>
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
            <form method="POST" action="{{ route('password.update') }}" class="register-form">
                @csrf
                <input type="hidden" name="token" value="{{ $token }}">
                <div class="mb-3">
                    <label class="col-form-label text-start text-color-1 fs-16 fw-medium">
                        {{ localize('Email:') }}
                    </label>
                    <input type="email" name="email" id="email"
                           class="custom-form-control border-0 @error('email') is-invalid @enderror"
                           placeholder="example@exaple.com" value="{{ old('email', $email) }}" />
                    @if ($errors->has('email'))
                        <span class="invalid-feedback text-start" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="mb-3">
                    <label class="col-form-label text-start text-color-1 fs-16 fw-medium">
                        {{ localize('password:') }}
                    </label>
                    <input type="password" name="password" id="password"
                           class="custom-form-control border-0 @error('password') is-invalid @enderror"
                            value="{{ old('password') }}" required/>
                    @if ($errors->has('password'))
                        <span class="invalid-feedback text-start" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="mb-3">
                    <label class="col-form-label text-start text-color-1 fs-16 fw-medium">
                        {{ localize('password_confirmation:') }}
                    </label>
                    <input type="password" name="password_confirmation" id="password_confirmation"
                           class="custom-form-control border-0" required/>
                </div>
                <button type="submit" class="btn btn-save py-3 lh-1 w-100">
                    {{ localize('Reset Password') }}
                </button>
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
