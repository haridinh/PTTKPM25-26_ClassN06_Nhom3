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
        Schema::create('customer_stake_interests', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_id', 15);
            $table->unsignedBigInteger('customer_id')->index('customer_stake_interests_customer_id_foreign');
            $table->unsignedBigInteger('customer_stake_id')->index('customer_stake_interests_customer_stake_id_foreign');
            $table->unsignedBigInteger('accept_currency_id')->index('customer_stake_interests_accept_currency_id_foreign');
            $table->string('currency_symbol', 30);
            $table->decimal('locked_amount', 16, 6);
            $table->decimal('interest_amount', 16, 6);
            $table->enum('status', ['1', '2'])->default('2')->comment('1 = Received, 2 = Running');
            $table->dateTime('redemption_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_stake_interests');
    }
};
