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
        Schema::table('merchant_accepted_coins', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['merchant_payment_url_id'])->references(['id'])->on('merchant_payment_urls')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchant_accepted_coins', function (Blueprint $table) {
            $table->dropForeign('merchant_accepted_coins_accept_currency_id_foreign');
            $table->dropForeign('merchant_accepted_coins_merchant_payment_url_id_foreign');
        });
    }
};
