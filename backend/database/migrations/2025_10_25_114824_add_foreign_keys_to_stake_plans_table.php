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
        Schema::table('stake_plans', function (Blueprint $table) {
            $table->foreign(['accept_currency_id'])->references(['id'])->on('accept_currencies')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stake_plans', function (Blueprint $table) {
            $table->dropForeign('stake_plans_accept_currency_id_foreign');
        });
    }
};
