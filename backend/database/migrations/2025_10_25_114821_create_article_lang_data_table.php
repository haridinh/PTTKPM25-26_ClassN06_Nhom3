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
        Schema::create('article_lang_data', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->unsignedBigInteger('article_id')->index();
            $table->unsignedBigInteger('language_id')->index();
            $table->string('slug')->nullable();
            $table->string('small_content')->nullable();
            $table->text('large_content')->nullable();
            $table->enum('status', ['0', '1'])->default('1');
            $table->unsignedInteger('created_by')->nullable();
            $table->unsignedInteger('updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->primary(['id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_lang_data');
    }
};
