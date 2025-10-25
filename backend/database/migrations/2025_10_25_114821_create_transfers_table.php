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
        Schema::create('transfers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('sender_user_id');
            $table->string('receiver_user_id');
            $table->string('currency_symbol', 30);
            $table->decimal('amount', 16, 6)->default(0);
            $table->decimal('fees', 16, 6)->default(0);
            $table->date('date');
            $table->string('request_ip')->nullable();
            $table->mediumText('comments')->nullable();
            $table->tinyInteger('status')->default(0)->comment('1=done, 0=pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transfers');
    }
};
