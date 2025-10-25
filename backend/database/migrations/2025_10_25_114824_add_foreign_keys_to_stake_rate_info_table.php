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
        Schema::table('stake_rate_info', function (Blueprint $table) {
            $table->foreign(['stake_plan_id'])->references(['id'])->on('stake_plans')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stake_rate_info', function (Blueprint $table) {
            $table->dropForeign('stake_rate_info_stake_plan_id_foreign');
        });
    }
};
