<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Route;
use App\View;
use App;
use Illuminate\Support\Facades\DB;

const ITEMS_PER_PAGE = 10;

class RouteController extends Controller
{
    public function one(Request $request){
        $route = App\Route::where('id',$request->id)
                            ->with('user:id,name');
                            
        $count = $route->count();

        if ($count == 1){

            //viewed page
            
            
            if(Auth::check()) {            
                $view = App\View::firstOrCreate([
                    'user_id'=> Auth::user()->id,       
                    'route_id' => $route->first()->id
                ])->save();
            }   


                      
            return $route->first();
        } 

        return 0;    
    }
    
    //
    public function index(Request $request){
        
        $page = 1;

        if($request->page != null){
            $page = $request->page;
        }

        $routes = App\Route::withCount('views')
        ->orderBy('views_count', 'desc')
        ->paginate(ITEMS_PER_PAGE);      
                   
        //get the user
        foreach($routes as $route){
            $route->user;
        }

        return $routes;
    }

    public function mijn(){
        $routes = App\Route::where('user_id', Auth::User()->id) 
                     
            ->get();
        return $routes;
    }

    public function getPages(){
        $pages = App\Route::all()->count();
        return ceil($pages/ITEMS_PER_PAGE);
    }
}
