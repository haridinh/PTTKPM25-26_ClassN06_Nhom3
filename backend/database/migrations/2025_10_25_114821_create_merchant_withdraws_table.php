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
        Schema::create('merchant_withdraws', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('merchant_account_id')->index('merchant_withdraws_merchant_account_id_foreign');
            $table->string('user_id')->nullable();
            $table->unsignedBigInteger('accept_currency_id')->index('merchant_withdraws_accept_currency_id_foreign');
            $table->string('wallet_id');
            $table->string('method');
            $table->decimal('amount', 16, 6);
            $table->decimal('fees', 16, 6)->default(0);
            $table->dateTime('request_date');
            $table->dateTime('success_date')->nullable();
            $table->dateTime('cancel_date')->nullable();
            $table->string('request_ip')->nullable();
            $table->string('comments')->nullable();
            $table->integer('updated_by')->nullable();
            $table->enum('status', ['1', '2', '3'])->default('1')->comment('1=request, 2=success, 3=cancel');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_withdraws');
    }
};
