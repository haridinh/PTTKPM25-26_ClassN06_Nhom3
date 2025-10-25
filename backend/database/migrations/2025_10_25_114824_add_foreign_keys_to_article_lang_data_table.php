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
        Schema::table('article_lang_data', function (Blueprint $table) {
            $table->foreign(['article_id'])->references(['id'])->on('articles')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['language_id'])->references(['id'])->on('languages')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('article_lang_data', function (Blueprint $table) {
            $table->dropForeign('article_lang_data_article_id_foreign');
            $table->dropForeign('article_lang_data_language_id_foreign');
        });
    }
};
