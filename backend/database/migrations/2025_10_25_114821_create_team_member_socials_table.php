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
        Schema::create('team_member_socials', function (Blueprint $table) {
            $table->unsignedBigInteger('team_member_id')->index('team_member_socials_team_member_id_foreign');
            $table->string('name', 150);
            $table->string('icon', 100)->nullable();
            $table->string('url', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_member_socials');
    }
};
