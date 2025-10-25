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
        Schema::table('customer_stakes', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['stake_plan_id'])->references(['id'])->on('stake_plans')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customer_stakes', function (Blueprint $table) {
            $table->dropForeign('customer_stakes_accept_currency_id_foreign');
            $table->dropForeign('customer_stakes_stake_plan_id_foreign');
        });
    }
};
