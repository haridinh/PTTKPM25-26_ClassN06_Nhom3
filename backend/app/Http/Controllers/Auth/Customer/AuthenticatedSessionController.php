<?php

namespace App\Http\Controllers\Auth\Customer;

use App\Enums\AuthGuardEnum;
use App\Enums\UserLogTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CustomerAuthVerifyRequest;
use App\Http\Requests\Auth\CustomerLoginRequest;
use App\Services\Customer\CustomerService;
use App\Services\Customer\UserLogService;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Jenssegers\Agent\Agent;
use PragmaRX\Google2FA\Google2FA;

class AuthenticatedSessionController extends Controller
{
    /**
     * AuthenticatedSessionController of __construct
     *
     * @param CustomerService $customerService
     */
    public function __construct(
        private CustomerService $customerService,
        private UserLogService $userLogService,
    ) {
    }

    /**
     * Display the login view.
     */
    public function index(): View
    {
        cs_set('theme', [
            'title'       => localize('Customer Login'),
            'description' => localize('Customer Login'),
        ]);

        return view('customer.auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(CustomerLoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $customer = auth(AuthGuardEnum::CUSTOMER->value)->user();

        if ($customer->google2fa_enable) {
            session()->put("user_2fa_authentication", $customer->google2fa_enable);

            return redirect()->intended(route('customer.auth-verify'));
        }

        $this->customerService->lastLogin($request->ip());

        $agent = new Agent();

        $data = [
            'user_id'     => $customer->user_id,
            'type'        => UserLogTypeEnum::LOGIN->value,
            'access_time' => Carbon::now(),
            'user_agent'  => $agent->browser(),
            'user_ip'     => $request->ip(),
        ];
        $this->userLogService->create($data);

        success_message(localize('Welcome Back') . ' - ' . $customer->first_name . ' ' . $customer->last_name);

        $intendedUrl = session()->get('url.intended', '');

        if (Str::contains($intendedUrl, '/admin') || !$this->isValidRoute($intendedUrl)) {
            $request->session()->forget('url.intended');
        }

        return redirect()->intended(AuthGuardEnum::CUSTOMER_HOME->value);
    }

    private function isValidRoute($url): bool
    {
        try {
            $route = app('router')->getRoutes()->match(app('request')->create($url));
            return $route->getName() !== null;
        } catch (\Exception $e) {
            return false;
        }

    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $this->customerService->lastLogout();

        $agent = new Agent();

        $data = [
            'user_id'     => auth(AuthGuardEnum::CUSTOMER->value)->user()->user_id,
            'type'        => UserLogTypeEnum::LOGOUT->value,
            'access_time' => Carbon::now(),
            'user_agent'  => $agent->browser(),
            'user_ip'     => $request->ip(),
        ];

        $this->userLogService->create($data);

        Auth::guard(AuthGuardEnum::CUSTOMER->value)->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/' . AuthGuardEnum::CUSTOMER->value);
    }

    /**
     * Display the login view.
     */
    public function auth_verify(): View | RedirectResponse
    {
        cs_set('theme', [
            'title'       => localize('Customer Auth Verify'),
            'description' => localize('Customer Auth Verify'),
        ]);

        if (!session()->has('user_2fa_authentication')) {
            return redirect()->route('customer.dashboard');
        }

        return view('customer.auth.auth-verify');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function auth_verify_confirm(CustomerAuthVerifyRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $verificationCode = $data['verification_code'];

        if (!session()->has('user_2fa_authentication')) {
            return redirect()->back()->with('exception', localize('Something went wrong!!'))->withInput();
        }

        $google2fa    = new Google2FA();
        $verifyStatus = $google2fa->verifyKey(
            auth(AuthGuardEnum::CUSTOMER->value)->user()->google2fa_secret,
            $verificationCode
        );

        if (!$verifyStatus) {
            return redirect()->back()->with('exception', localize('Invalid verification code!'))->withInput();
        }

        $this->customerService->lastLogin($request->ip());

        session()->forget("user_2fa_authentication");
        session()->regenerate();

        success_message(localize('Login successfully'));

        $message = 'Welcome Back - ';

        return redirect()->intended(AuthGuardEnum::CUSTOMER_HOME->value)->with('success', $message);
    }

}
