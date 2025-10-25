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
        Schema::create('b2x_loan_repays', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('b2x_loan_id')->index('b2x_loan_repays_b2x_loan_id_foreign');
            $table->unsignedBigInteger('accept_currency_id')->index('b2x_loan_repays_accept_currency_id_foreign');
            $table->decimal('fees', 16, 6)->nullable();
            $table->string('method')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable()->index('b2x_loan_repays_customer_id_foreign');
            $table->decimal('amount', 16, 6);
            $table->enum('status', ['0', '1'])->default('0')->comment('0 = Pending, 1 = Success');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('b2x_loan_repays');
    }
};
