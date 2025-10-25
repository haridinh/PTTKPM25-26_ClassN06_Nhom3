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
        Schema::table('merchant_payment_infos', function (Blueprint $table) {
            $table->foreign(['merchant_accepted_coin_id'])->references(['id'])->on('merchant_accepted_coins')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['merchant_account_id'])->references(['id'])->on('merchant_accounts')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['merchant_customer_info_id'])->references(['id'])->on('merchant_customer_infos')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['merchant_payment_transaction_id'])->references(['id'])->on('merchant_payment_transactions')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['payment_gateway_id'])->references(['id'])->on('payment_gateways')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchant_payment_infos', function (Blueprint $table) {
            $table->dropForeign('merchant_payment_infos_merchant_accepted_coin_id_foreign');
            $table->dropForeign('merchant_payment_infos_merchant_account_id_foreign');
            $table->dropForeign('merchant_payment_infos_merchant_customer_info_id_foreign');
            $table->dropForeign('merchant_payment_infos_merchant_payment_transaction_id_foreign');
            $table->dropForeign('merchant_payment_infos_payment_gateway_id_foreign');
        });
    }
};
