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
        Schema::table('payment_requests', function (Blueprint $table) {
            $table->foreign(['merchant_payment_url_id'])->references(['id'])->on('merchant_payment_urls')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['payment_gateway_id'])->references(['id'])->on('payment_gateways')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_requests', function (Blueprint $table) {
            $table->dropForeign('payment_requests_merchant_payment_url_id_foreign');
            $table->dropForeign('payment_requests_payment_gateway_id_foreign');
        });
    }
};
