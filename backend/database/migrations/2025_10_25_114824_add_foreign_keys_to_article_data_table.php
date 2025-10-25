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
        Schema::table('article_data', function (Blueprint $table) {
            $table->foreign(['article_id'])->references(['id'])->on('articles')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('article_data', function (Blueprint $table) {
            $table->dropForeign('article_data_article_id_foreign');
        });
    }
};
