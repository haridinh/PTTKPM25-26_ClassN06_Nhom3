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
        Schema::create('messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('messenger_user_id')->index('messages_messenger_user_id_foreign');
            $table->string('user_id', 12)->nullable();
            $table->string('msg_subject')->nullable();
            $table->longText('msg_body');
            $table->dateTime('msg_time');
            $table->enum('replay_status', ['0', '1'])->default('1')->comment('0=customer,1=admin');
            $table->enum('msg_status', ['0', '1'])->default('1')->comment('	1=unread,0=read');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
