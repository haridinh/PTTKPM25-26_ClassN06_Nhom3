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
        Schema::create('merchant_customer_infos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('uuid', 36)->nullable();
            $table->unsignedBigInteger('merchant_account_id')->index('merchant_customer_infos_merchant_account_id_foreign');
            $table->string('email', 80);
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_customer_infos');
    }
};
