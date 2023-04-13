<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->integer('amount')->nullable();
            $table->string('depositor')->nullable();
            $table->integer('status')->nullable();
            $table->string('bank')->nullable();
            $table->string('date')->nullable();
            $table->integer('subscription_id')->nullable();
            $table->integer('vendor_id')->nullable();
            $table->string('description')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
