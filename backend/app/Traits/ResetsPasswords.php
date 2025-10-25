<?php

namespace App\Traits;

use App\Enums\AuthGuardEnum;
use App\Http\Requests\CustomerResetPasswordRequest;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

trait ResetsPasswords
{
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
        $user->password = bcrypt($password);

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
        return auth()->guard(AuthGuardEnum::CUSTOMER->value);
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
        return redirect($this->redirectPath())
            ->with('status', trans($response));
    }

    /**
     * Get the post password reset redirect path.
     *
     * @return string
     */
    public function redirectPath()
    {
        if (method_exists($this, 'redirectTo')) {
            return $this->redirectTo('customer.login');
        }

        return property_exists($this, 'redirectTo') ? $this->redirectTo : '/customer.login';
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
}
