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
        Schema::table('investment_details', function (Blueprint $table) {
            $table->foreign(['customer_id'])->references(['id'])->on('customers')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['investment_id'])->references(['id'])->on('investments')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('investment_details', function (Blueprint $table) {
            $table->dropForeign('investment_details_customer_id_foreign');
            $table->dropForeign('investment_details_investment_id_foreign');
        });
    }
};
