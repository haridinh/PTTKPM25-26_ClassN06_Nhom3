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
        Schema::create('wallet_transaction_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_id', 15)->index();
            $table->unsignedBigInteger('accept_currency_id')->index('wallet_transaction_logs_accept_currency_id_foreign');
            $table->string('transaction', 30);
            $table->enum('transaction_type', ['debit', 'credit']);
            $table->decimal('amount', 16, 6)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallet_transaction_logs');
    }
};
