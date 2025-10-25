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
        Schema::table('withdrawal_accounts', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['customer_id'])->references(['id'])->on('customers')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['payment_gateway_id'])->references(['id'])->on('payment_gateways')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('withdrawal_accounts', function (Blueprint $table) {
            $table->dropForeign('withdrawal_accounts_accept_currency_id_foreign');
            $table->dropForeign('withdrawal_accounts_customer_id_foreign');
            $table->dropForeign('withdrawal_accounts_payment_gateway_id_foreign');
        });
    }
};
