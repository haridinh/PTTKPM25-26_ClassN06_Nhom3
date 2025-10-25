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
        Schema::table('txn_reports', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['customer_id'])->references(['id'])->on('customers')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('txn_reports', function (Blueprint $table) {
            $table->dropForeign('txn_reports_accept_currency_id_foreign');
            $table->dropForeign('txn_reports_customer_id_foreign');
        });
    }
};
