<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function ApiLogin(){        
        $uname = Auth::User();
        //return json_encode($uname);
        return 
        "
        <html>
            <head>
                <title>Success</title>
            </head>
            <body>                
                <script>

                window.addEventListener('message', function(e) {
                    event.source.postMessage({ 'url' : window.location.href, account :".json_encode($uname)." },event.origin);
                }, false);                 
                              
                
              </script>
            </body>
        </html>
        
        ";
    }
    
    public function index()
    {
        return view('home');
    }
}
