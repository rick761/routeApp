<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoutesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {       
        $landen = [
            'België',
            'Duitsland',
            'Estland',
            'Finland',
            'Frankrijk',
            'Griekenland',
            'Ierland',
            'Italië',
            'Spanje',
            'Luxemburg',
            'Malta',
            'Nederland',
            'Oostenrijk'           
        ];
        $vervoer = [
            'Wandelen',
            'Skien',
            'Auto',
            'Fietsen',
            'Hiken',
            'Zwemmen',
            'Hardlopen'
        ] ;

         for($x = 1; $x <= rand(20, 40); $x++) {
            DB::table('routes')->insert([
                'user_id'=> rand(0,1),
                'informatie' => 'Extra informatie betreft dit onderdeel is er niet.',
                'land' => Arr::random($landen),
                'naam' => 'Test route '.$x,
                'vervoer'=> Arr::random($vervoer),
                'patroon' =>
                '[
                    {"naam": "'.Str::random(10).'", "commentaar": "'.Str::random(40).'", "coordinaten": ['.(rand(5100, 5300)*0.01).', '.(rand(360, 650)*0.01).']},
                    {"naam": "'.Str::random(10).'", "commentaar": "'.Str::random(40).'", "coordinaten": ['.(rand(5100, 5300)*0.01).', '.(rand(360, 650)*0.01).']},
                    {"naam": "'.Str::random(10).'", "commentaar": "'.Str::random(40).'", "coordinaten": ['.(rand(5100, 5300)*0.01).', '.(rand(360, 650)*0.01).']}
                ]'  
            ]);  

        }




           

         
     
    }
}
