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
        Schema::table('merchant_withdraws', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['merchant_account_id'])->references(['id'])->on('merchant_accounts')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchant_withdraws', function (Blueprint $table) {
            $table->dropForeign('merchant_withdraws_accept_currency_id_foreign');
            $table->dropForeign('merchant_withdraws_merchant_account_id_foreign');
        });
    }
};
