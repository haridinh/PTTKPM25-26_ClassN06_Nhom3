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
        Schema::table('investment_rois', function (Blueprint $table) {
            $table->foreign(['investment_id'])->references(['id'])->on('investments')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('investment_rois', function (Blueprint $table) {
            $table->dropForeign('investment_rois_investment_id_foreign');
        });
    }
};
