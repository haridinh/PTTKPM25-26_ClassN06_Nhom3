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
        Schema::create('capital_returns', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('investment_id')->unique();
            $table->string('user_id', 15);
            $table->decimal('return_amount', 16, 4);
            $table->enum('status', ['1', '2'])->default('2')->comment('2 = Pending, 1 = Done');
            $table->dateTime('return_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capital_returns');
    }
};
