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
        Schema::create('stake_plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('accept_currency_id')->index('stake_plans_accept_currency_id_foreign');
            $table->string('stake_name', 50);
            $table->enum('status', ['0', '1'])->default('1')->comment('0 = Inactive, 1 = Active');
            $table->string('image')->nullable();
            $table->unsignedInteger('created_by')->nullable();
            $table->unsignedInteger('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stake_plans');
    }
};
