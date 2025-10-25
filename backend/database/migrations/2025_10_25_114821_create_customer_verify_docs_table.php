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
        Schema::create('customer_verify_docs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('customer_id')->index('customer_verify_docs_customer_id_foreign');
            $table->string('user_id', 15)->nullable();
            $table->string('verify_type', 30);
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->tinyInteger('gender')->comment('1 = male, 0 = female');
            $table->string('document_type', 100);
            $table->string('city', 100);
            $table->string('state', 100)->nullable();
            $table->string('country', 100);
            $table->string('id_number');
            $table->date('expire_date');
            $table->string('document1');
            $table->string('document2');
            $table->string('document3');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_verify_docs');
    }
};
