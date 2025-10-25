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
        Schema::table('withdrawal_acc_credentials', function (Blueprint $table) {
            $table->foreign(['withdrawal_account_id'])->references(['id'])->on('withdrawal_accounts')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('withdrawal_acc_credentials', function (Blueprint $table) {
            $table->dropForeign('withdrawal_acc_credentials_withdrawal_account_id_foreign');
        });
    }
};
