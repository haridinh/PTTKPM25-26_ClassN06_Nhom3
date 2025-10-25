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
        Schema::create('setup_commissions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('level_name');
            $table->double('personal_invest', 8, 2);
            $table->double('total_invest', 8, 2);
            $table->double('team_bonus', 8, 2);
            $table->double('referral_bonus', 8, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setup_commissions');
    }
};
