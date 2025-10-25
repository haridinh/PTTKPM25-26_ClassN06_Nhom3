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
        Schema::create('wallet_manages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('user_id', 15);
            $table->unsignedBigInteger('accept_currency_id')->index('wallet_manages_accept_currency_id_foreign');
            $table->decimal('deposit', 16, 6)->default(0)->comment('credit');
            $table->decimal('credited', 16, 6)->default(0)->comment('credit');
            $table->decimal('roi_', 16, 6)->default(0)->comment('credit');
            $table->decimal('capital_return', 16, 6)->default(0)->comment('credit');
            $table->decimal('stake_earn', 16, 6)->default(0)->comment('credit');
            $table->decimal('referral', 16, 6)->default(0)->comment('credit');
            $table->decimal('received', 16, 6)->default(0)->comment('credit');
            $table->decimal('deposit_fee', 16, 6)->default(0)->comment('debit');
            $table->decimal('withdraw_fee', 16, 6)->default(0)->comment('debit');
            $table->decimal('transfer_fee', 16, 6)->default(0)->comment('debit');
            $table->decimal('withdraw', 16, 6)->default(0)->comment('debit');
            $table->decimal('investment', 16, 6)->default(0)->comment('debit');
            $table->decimal('transfer', 16, 6)->default(0)->comment('debit');
            $table->decimal('freeze_balance', 16, 6)->default(0)->comment('debit');
            $table->decimal('balance', 16, 6)->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallet_manages');
    }
};
