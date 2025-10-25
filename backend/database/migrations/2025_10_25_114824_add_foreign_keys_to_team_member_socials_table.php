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
        Schema::table('team_member_socials', function (Blueprint $table) {
            $table->foreign(['team_member_id'])->references(['id'])->on('team_members')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('team_member_socials', function (Blueprint $table) {
            $table->dropForeign('team_member_socials_team_member_id_foreign');
        });
    }
};
