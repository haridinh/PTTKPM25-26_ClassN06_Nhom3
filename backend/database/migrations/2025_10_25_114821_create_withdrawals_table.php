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
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('customer_id')->index('withdrawals_customer_id_foreign');
            $table->unsignedBigInteger('payment_gateway_id')->index('withdrawals_payment_gateway_id_foreign');
            $table->unsignedBigInteger('accept_currency_id')->index('withdrawals_accept_currency_id_foreign');
            $table->unsignedBigInteger('withdrawal_account_id')->index('withdrawals_withdrawal_account_id_foreign');
            $table->decimal('amount', 16, 6)->default(0);
            $table->decimal('fees', 16, 6);
            $table->string('request_ip')->nullable();
            $table->string('comments')->nullable();
            $table->integer('audited_by')->nullable();
            $table->enum('status', ['2', '1', '0'])->default('2')->comment('1=Success, 2=Pending, 0=cancel');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawals');
    }
};
