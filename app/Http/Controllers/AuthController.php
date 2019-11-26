<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    //
    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function getAuth(){
        if (Auth::check()) {
           return Auth::User(); 
        } else {
            return 'No auth';
        }        
    }
    public function logoutAuth(){
        Auth::logout();
        if (Auth::check()) {
            return 'error';
        }
        return 'succes';
    }

}
