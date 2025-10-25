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
        Schema::create('earnings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_id', 16);
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->string('earning_type', 80);
            $table->unsignedBigInteger('package_id')->nullable();
            $table->unsignedBigInteger('investment_id')->nullable();
            $table->date('date');
            $table->double('amount', 11, 2);
            $table->mediumText('comments')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('earnings');
    }
};
