<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Views extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('views', function (Blueprint $table) {            
            
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');   
            $table->unsignedBigInteger('route_id');
            $table->foreign('route_id')->references('id')->on('routes');      
        

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('views');
    }
}
