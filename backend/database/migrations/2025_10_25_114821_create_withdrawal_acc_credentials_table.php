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
        Schema::create('withdrawal_acc_credentials', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('withdrawal_account_id')->index('withdrawal_acc_credentials_withdrawal_account_id_foreign');
            $table->string('type')->nullable();
            $table->string('name');
            $table->string('credential');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawal_acc_credentials');
    }
};
