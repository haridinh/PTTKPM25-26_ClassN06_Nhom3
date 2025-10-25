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
        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title', 50);
            $table->text('description')->nullable();
            $table->string('email', 50)->nullable();
            $table->string('phone', 18)->nullable();
            $table->string('logo', 150)->nullable();
            $table->string('logo_web', 150)->nullable();
            $table->string('favicon', 150)->nullable();
            $table->string('login_bg_img')->nullable();
            $table->unsignedBigInteger('language_id')->index('settings_language_id_foreign');
            $table->string('site_align', 20)->nullable();
            $table->string('footer_text')->nullable();
            $table->string('latitude_longitude', 100)->nullable();
            $table->string('time_zone', 100)->nullable();
            $table->string('office_time', 200)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
