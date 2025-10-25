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
        Schema::create('merchant_accepted_coins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('accept_currency_id')->index('merchant_accepted_coins_accept_currency_id_foreign');
            $table->unsignedBigInteger('merchant_payment_url_id')->index('merchant_accepted_coins_merchant_payment_url_id_foreign');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_accepted_coins');
    }
};
