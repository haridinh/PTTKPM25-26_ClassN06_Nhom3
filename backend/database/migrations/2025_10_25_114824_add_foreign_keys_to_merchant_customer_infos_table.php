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
        Schema::table('merchant_customer_infos', function (Blueprint $table) {
            $table->foreign(['merchant_account_id'])->references(['id'])->on('merchant_accounts')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('merchant_customer_infos', function (Blueprint $table) {
            $table->dropForeign('merchant_customer_infos_merchant_account_id_foreign');
        });
    }
};
