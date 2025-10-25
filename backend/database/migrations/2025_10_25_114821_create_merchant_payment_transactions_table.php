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
        Schema::create('merchant_payment_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('payment_gateway_id')->index('merchant_payment_transactions_payment_gateway_id_foreign');
            $table->string('transaction_hash')->nullable();
            $table->decimal('amount', 9, 3);
            $table->json('data');
            $table->enum('status', ['0', '1', '2'])->default('0')->comment('1 = complete, 2 = pending, 0 = cancelled');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_payment_transactions');
    }
};
