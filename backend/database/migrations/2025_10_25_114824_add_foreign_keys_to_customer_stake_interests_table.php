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
        Schema::table('customer_stake_interests', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['customer_id'])->references(['id'])->on('customers')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['customer_stake_id'])->references(['id'])->on('customer_stakes')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customer_stake_interests', function (Blueprint $table) {
            $table->dropForeign('customer_stake_interests_accept_currency_id_foreign');
            $table->dropForeign('customer_stake_interests_customer_id_foreign');
            $table->dropForeign('customer_stake_interests_customer_stake_id_foreign');
        });
    }
};
