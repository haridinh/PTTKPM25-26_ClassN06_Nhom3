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
        Schema::create('merchant_balances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('accept_currency_id')->index('merchant_balances_accept_currency_id_foreign');
            $table->string('symbol')->nullable();
            $table->unsignedBigInteger('merchant_account_id')->index('merchant_balances_merchant_account_id_foreign');
            $table->string('user_id')->nullable();
            $table->decimal('amount', 16, 6);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_balances');
    }
};
