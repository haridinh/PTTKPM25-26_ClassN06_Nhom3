<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('b2x_loans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('customer_id')->index('b2x_loans_customer_id_foreign');
            $table->unsignedBigInteger('b2x_loan_package_id')->index('b2x_loans_b2x_loan_package_id_foreign');
            $table->string('currency')->nullable();
            $table->unsignedBigInteger('payment_gateway_id')->nullable()->index('b2x_loans_payment_gateway_id_foreign');
            $table->decimal('interest_percent', 16, 6);
            $table->decimal('loan_amount', 16);
            $table->decimal('hold_btc_amount', 16, 6);
            $table->decimal('installment_amount', 16, 6);
            $table->integer('number_of_installment');
            $table->integer('paid_installment')->default(0);
            $table->integer('remaining_installment')->default(0);
            $table->enum('status', ['0', '1', '2', '3'])->default('2')->comment('0 = Rejected, 1 = Approved, 2 = Pending, 3 = Loan Closed');
            $table->enum('withdraw_status', ['0', '1', '2', '3'])->nullable()->default('3')->comment('0 = Rejected/Cancel, 1 = Success, 2 = Pending, 3=not submit');
            $table->string('withdraw_note')->nullable();
            $table->string('checker_note')->nullable();
            $table->integer('checked_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('b2x_loans');
    }
};
