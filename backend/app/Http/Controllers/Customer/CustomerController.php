<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRegistrationRequest;
use App\Http\Requests\CustomerRequest;
use App\Services\CountryService;
use App\Services\CustomerService;
use App\Services\InvestmentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\View\View;
use Modules\Finance\App\Services\DepositService;
use Modules\Finance\App\Services\TransferService;
use Modules\Finance\App\Services\WithdrawService;

class CustomerController extends Controller
{
    /**
     * Summary of __construct
     * @param CustomerService $customerService
     */
    public function __construct(
        protected CustomerService $customerService,
        protected DepositService $depositService,
        protected WithdrawService $withdrawService,
        protected TransferService $transferService,
        protected InvestmentService $investmentService,
        protected CountryService $countryService,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): view
    {
        $customerId = Auth::id();
        $customer   = $this->customerService->findOrFail($customerId);

        return view('customer::frontend.account', compact('customer'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        cs_set('theme', [
            'title'       => localize('Registration'),
            'description' => localize('Registration'),
        ]);

        $countries = $this->countryService->all();

        return view('customer.auth.registration', compact('countries'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CustomerRegistrationRequest $request): RedirectResponse
    {

        try {
            if (isset($request['referral']) && $request['referral']) {
                $param['referral_user'] = $request['referral'];
                $customer               = $this->customerService->findByAttributes($param);
    
                if (!$customer) {
                    return redirect()->back()->with(
                        'warning',
                        localize('Your Sponsor user are not found, please try again')
                    );
                }
    
            }
    
            // Unique rate limiting key per user based on IP or email
            $key = 'registration|' . $request->ip();
    
            if (RateLimiter::tooManyAttempts($key, 3)) {
                return redirect()->back()->with('warning', 'Too many attempts, please try again later.');
            }
    
            // Hit the rate limiter and set a lockout period of 5 minutes (300 seconds)
            RateLimiter::hit($key, 300);
    
            if (!empty($request->honeypot)) {
                return redirect()->back()->with('warning', 'Bot detected!');
            }
    
            $validateData = $request->validated();
    
            $user = $this->customerService->create($validateData);
    
            if ($user) {
                $message = localize(
                    'Your account has been successfully created. An activation link has been sent to your email. Please click this link to activate your account.'
                );
    
                return redirect()->back()->with('success', $message);
            }
    
            return redirect()->back()->with('warning', localize('Registration failed, please try again'));
        } catch (\Throwable $th) {
            return redirect()->back()->with('warning', "Email configuration error. Please contact the administrator.");
        }
    }

    /**
     * Show the specified resource.
     */
    public function show(int $id)
    {
        $customer = $this->customerService->findOrFail($id);

        $attributes['customer_id'] = $id;
        $attributes['user_id']     = $customer['user_id'];

        $deposits    = $this->depositService->getAll($attributes);
        $withdraws   = $this->withdrawService->getAll($attributes);
        $transfers   = $this->transferService->getAllReceived($attributes);
        $received    = $this->transferService->getAllTransfer($attributes);
        $investments = $this->investmentService->getAllInvestments($attributes);

        return view(
            'customer::customer.details',
            compact('deposits', 'withdraws', 'transfers', 'received', 'investments', 'customer')
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): View
    {
        $user = $this->customerService->findOrFail($id);

        return view('customer::customer.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     * @param CustomerRequest $request
     * @param $id
     * @return RedirectResponse
     */
    public function update(CustomerRequest $request, $id): JsonResponse
    {
        $data                = $request->validated();
        $data['customer_id'] = $id;
        $user                = $this->customerService->update($data);

        return response()->json([
            'success' => true,
            'message' => localize("Customer update successfully"),
            'title'   => localize("Customer"),
            'data'    => $user,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @param Request $request
     * @var int $id
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->customerService->destroy(['cust_id' => $id]);

        return response()->json([
            'success' => true,
            'message' => localize("Customer delete successfully"),
            'title'   => localize("Customer"),
        ]);
    }

}
