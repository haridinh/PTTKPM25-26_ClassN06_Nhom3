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
        Schema::create('customer_stakes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('stake_plan_id')->index('customer_stakes_stake_plan_id_foreign');
            $table->unsignedBigInteger('accept_currency_id')->index('customer_stakes_accept_currency_id_foreign');
            $table->string('user_id', 15);
            $table->decimal('locked_amount', 16, 6);
            $table->integer('duration');
            $table->decimal('interest_rate', 16, 6)->comment('percent (%)');
            $table->decimal('annual_rate', 16, 6)->comment('percent (%)');
            $table->enum('status', ['0', '1', '2'])->default('1')->comment('0 = Redemption, 1 = running, 2 = Redemption Enable');
            $table->dateTime('redemption_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_stakes');
    }
};
