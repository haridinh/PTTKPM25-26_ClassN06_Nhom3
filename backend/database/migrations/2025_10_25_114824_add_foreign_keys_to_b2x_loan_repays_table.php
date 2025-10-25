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
        Schema::table('b2x_loan_repays', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['b2x_loan_id'])->references(['id'])->on('b2x_loans')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['customer_id'])->references(['id'])->on('customers')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('b2x_loan_repays', function (Blueprint $table) {
            $table->dropForeign('b2x_loan_repays_accept_currency_id_foreign');
            $table->dropForeign('b2x_loan_repays_b2x_loan_id_foreign');
            $table->dropForeign('b2x_loan_repays_customer_id_foreign');
        });
    }
};
