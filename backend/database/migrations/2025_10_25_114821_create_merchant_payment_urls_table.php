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
        Schema::create('merchant_payment_urls', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('merchant_account_id')->index('merchant_payment_urls_merchant_account_id_foreign');
            $table->string('uu_id');
            $table->string('title');
            $table->string('description');
            $table->enum('payment_type', ['0', '1'])->default('0')->comment('0 = Single, 1 = Multiple');
            $table->decimal('amount', 9, 3);
            $table->unsignedBigInteger('fiat_currency_id')->nullable()->index('merchant_payment_urls_fiat_currency_id_foreign');
            $table->string('calback_url')->nullable();
            $table->string('message')->nullable();
            $table->timestamp('duration')->nullable();
            $table->enum('status', ['0', '1'])->default('0')->comment('0 = Expired, 1 = Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_payment_urls');
    }
};
