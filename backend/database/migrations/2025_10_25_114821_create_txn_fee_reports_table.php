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
        Schema::create('txn_fee_reports', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('customer_id')->index('txn_fee_reports_customer_id_foreign');
            $table->unsignedBigInteger('accept_currency_id')->index('txn_fee_reports_accept_currency_id_foreign');
            $table->enum('txn_type', ['1', '2', '3'])->comment('1 = Deposit, 2 = Withdraw, 3 = Transfer');
            $table->double('fee_amount', 20, 8)->default(0);
            $table->double('usd_value', 20, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('txn_fee_reports');
    }
};
