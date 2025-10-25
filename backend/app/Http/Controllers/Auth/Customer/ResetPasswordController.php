<?php

namespace App\Http\Controllers\Auth\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerResetPasswordRequest;
use App\Services\Customer\CustomerService;
use App\Services\Customer\UserLogService;
use App\Traits\ResetsPasswords;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    /**
     * ForgotPasswordController of __construct
     *
     * @param CustomerService $customerService
     */
    public function __construct(
        private CustomerService $customerService,
        private UserLogService $userLogService,
    ) {
    }

    public function showResetForm(Request $request, $token = null)
    {
        return view('customer.auth.reset')->with(
            ['token' => $token, 'email' => $request->email]
        );
    }

    /**
     * Reset the given user's password.
     *
     * @param CustomerResetPasswordRequest $request
     * @return RedirectResponse|JsonResponse
     */
    public function reset(CustomerResetPasswordRequest $request)
    {
        $request->validated();

        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        return $response == Password::PASSWORD_RESET
        ? $this->sendResetResponse($request, $response)
        : $this->sendResetFailedResponse($request, $response);
    }

    /**
     * Get the broker to be used during password reset.
     *
     * @return PasswordBroker
     */
    public function broker()
    {
        return Password::broker('customer');
    }

    /**
     * Get the password reset credentials from the request.
     *
     * @param Request $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only(
            'email',
            'password',
            'password_confirmation',
            'token'
        );
    }

    /**
     * Reset the given user's password.
     *
     * @param CanResetPassword $user
     * @param string $password
     * @return void
     */
    protected function resetPassword($user, $password)
    {
        $user->password = Hash::make($password);

        $user->setRememberToken(Str::random(60));

        $user->save();

        event(new PasswordReset($user));

        $this->guard()->login($user);
    }

    /**
     * Get the guard to be used during password reset.
     *
     * @return StatefulGuard
     */
    protected function guard()
    {
        return auth()->guard();
    }

    /**
     * Get the response for a successful password reset.
     *
     * @param Request $request
     * @param string $response
     * @return RedirectResponse|JsonResponse
     */
    protected function sendResetResponse(Request $request, $response)
    {
        return redirect()->route('customer.login')->with('status', trans($response));
    }

    /**
     * Get the response for a failed password reset.
     *
     * @param Request $request
     * @param string $response
     * @return RedirectResponse|JsonResponse
     */
    protected function sendResetFailedResponse(Request $request, $response)
    {
        return redirect()->back()
            ->withInput($request->only('email'))
            ->withErrors(['email' => trans($response)]);
    }

    /**
     * Get the password reset validation rules.
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'email'    => 'required|email',
            'password' => 'required|confirmed|min:8',
            'token'    => 'required',
        ];
    }

}
