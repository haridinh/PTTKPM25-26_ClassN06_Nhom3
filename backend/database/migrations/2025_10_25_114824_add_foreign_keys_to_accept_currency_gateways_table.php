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
        Schema::table('accept_currency_gateways', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['payment_gateway_id'])->references(['id'])->on('payment_gateways')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('accept_currency_gateways', function (Blueprint $table) {
            $table->dropForeign('accept_currency_gateways_accept_currency_id_foreign');
            $table->dropForeign('accept_currency_gateways_payment_gateway_id_foreign');
        });
    }
};
