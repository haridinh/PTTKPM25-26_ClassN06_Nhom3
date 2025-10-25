<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CustomerResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email'    => ['email:rfc,dns', 'required', 'string'],
            'password' => [
                'required',
                'string',
                'min:8',
                'max:16',
                'confirmed',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/',
            ],
            'token'    => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'password.regex' => 'The :attribute must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
        ];
    }
}
