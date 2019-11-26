<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Route;
use App;


class RouteEditorController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function createRoute(Request $request){
       
        $existingCount = Route::where('user_id', Auth::User()->id)
                        ->where('naam',$request->naam)
                        ->count();
        if($existingCount != 0){ return 'error';} 

        $route = New Route;
        $route->informatie = $request->informatie;
        $route->land = $request->land;
        $route->naam = $request->naam;
        $route->patroon = json_encode($request->patroon);
        $route->vervoer = $request->vervoer;
        $route->user_id = Auth::User()->id;

        $route->save();  

        return 'succes';  
              
    }

    public function editRouteLoad(Request $request){
        $object = Route::where('user_id', Auth::User()->id)        
                        ->where('naam',$request->naam);

        $existingCount = $object->count();

        if($existingCount == 1){
            return $object->first();
        }       

        return 'error';

    }
    public function editRouteSave(Request $request){

        $object = Route::where('user_id', Auth::User()->id)        
                        ->where('naam',$request->toEdit);

        $existingCount = $object->count();
        $toSend = $request->toSend;
        
        //route is not found
        if($existingCount==0){return 'error';};

        $object = $object->get()->first();
        $object->naam = $toSend['naam'];
        $object->informatie = $toSend['informatie'];
        $object->land = $toSend['land'];
        $object->vervoer = $toSend['vervoer'];
        $object->patroon = $toSend['patroon'];
        $saved = $object->save();
                
        return 'succes';
    }

    public function deleteRoute(Request $request){

        $object = Route::where('user_id', Auth::User()->id)        
                        ->where('naam',$request->naam);

        $existingCount = $object->count();        
        if($existingCount != 0){
            return $object->delete();
        } 
        return 0;
        
        
    }

    
}
