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
        Schema::table('b2x_loans', function (Blueprint $table) {
            $table->foreign(['b2x_loan_package_id'])->references(['id'])->on('b2x_loan_packages')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['customer_id'])->references(['id'])->on('customers')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['payment_gateway_id'])->references(['id'])->on('payment_gateways')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('b2x_loans', function (Blueprint $table) {
            $table->dropForeign('b2x_loans_b2x_loan_package_id_foreign');
            $table->dropForeign('b2x_loans_customer_id_foreign');
            $table->dropForeign('b2x_loans_payment_gateway_id_foreign');
        });
    }
};
