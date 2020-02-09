<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $users =  [
            [
                'name' => 'TestUser1',
                'email' => 'TestUser1@gmail.com',
                'email_verified' => true,
                'avatar'=> Str::random(10).'.jpg',
                'google_id'=> Str::random(10),
                'google_token'=> Str::random(10),
                'google_refreshToken'=> Str::random(10),
                'google_expiresIn'=> 999
            ],
            [
                'name' => 'TestUser2',
                'email' => 'TestUser2@gmail.com',
                'email_verified' => true,
                'avatar'=> Str::random(10).'.jpg',
                'google_id'=> Str::random(10),
                'google_token'=> Str::random(10),
                'google_refreshToken'=> Str::random(10),
                'google_expiresIn'=> 999
            ]
        ];
        DB::table('users')->insert($users);       
    }
}
