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
        Schema::create('accept_currency_gateways', function (Blueprint $table) {
            $table->unsignedBigInteger('accept_currency_id')->index('accept_currency_gateways_accept_currency_id_foreign');
            $table->unsignedBigInteger('payment_gateway_id')->index('accept_currency_gateways_payment_gateway_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accept_currency_gateways');
    }
};
