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
        Schema::create('merchant_payment_infos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('merchant_account_id')->index('merchant_payment_infos_merchant_account_id_foreign');
            $table->unsignedBigInteger('merchant_customer_info_id')->index('merchant_payment_infos_merchant_customer_info_id_foreign');
            $table->unsignedBigInteger('merchant_accepted_coin_id')->index('merchant_payment_infos_merchant_accepted_coin_id_foreign');
            $table->unsignedBigInteger('payment_gateway_id')->index('merchant_payment_infos_payment_gateway_id_foreign');
            $table->unsignedBigInteger('merchant_payment_transaction_id')->index('merchant_payment_infos_merchant_payment_transaction_id_foreign');
            $table->decimal('amount', 9, 3);
            $table->decimal('received_amount', 9, 3);
            $table->enum('status', ['3', '1', '2'])->default('3')->comment('1 = complete, 2 = pending, 3 = cancelled');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_payment_infos');
    }
};
