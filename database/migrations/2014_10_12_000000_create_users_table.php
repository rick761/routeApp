<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            
            
            $table->bigIncrements('id');
            $table->rememberToken();
            $table->timestamps();

            $table->string('name');
            $table->string('email')->unique();
            $table->boolean('email_verified')->nullable();
            $table->string('avatar')->nullable();
            $table->string('google_id')->unique()->nullable();
            $table->string('google_token')->nullable();;
            $table->string('google_refreshToken')->nullable();;
            $table->integer('google_expiresIn')->nullable();;


            //$table->string('password');
            
            /*
            $table->string('google_name');
            $table->string('google_nickname');
            $table->string('google_email');
            $table->string('google_user_sub');
            $table->string('google_user_name');
            $table->string('google_user_given_name');
            $table->string('google_user_family_name');
            $table->string('google_user_picture');
            $table->string('google_user_email');
            $table->string('google_user_email_verified');
            $table->string('google_user_locale');
            $table->string('google_user_id');
            $table->string('google_user_verified_email');
            $table->string('google_user_link');
            $table->string('google_avatar_original');
            */

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
