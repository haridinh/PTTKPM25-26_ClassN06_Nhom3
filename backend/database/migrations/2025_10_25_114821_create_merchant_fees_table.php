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
        Schema::create('merchant_fees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('accept_currency_id')->index('merchant_fees_accept_currency_id_foreign');
            $table->decimal('percent', 9);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_fees');
    }
};
