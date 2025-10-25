<?php

namespace App\Http\Controllers\Auth\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\View\View;

class ForgotPasswordController extends Controller
{

    /**
     * Display the login view.
     */
    public function showLinkRequestForm(): View
    {
        cs_set('theme', [
            'title'       => localize('Customer Forgot Password'),
            'description' => localize('Customer Forgot Password'),
        ]);

        return view('customer.auth.forgot-password-form');
    }

    /**
     * Send a reset link to the given user.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $response = Password::broker('customer')->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
        ? back()->with('status', __($response))
        : back()->withErrors(['email' => __($response)]);
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

}
