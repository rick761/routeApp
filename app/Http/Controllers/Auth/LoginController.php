<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use App\User;
use Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
     
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**socialite**/
    public function redirectToProvider()
    {
        return Socialite::driver('google')->redirect();
    }
    
    public function handleProviderCallback()
    {        
        $google_user = Socialite::driver('google')->stateless()->user();            

        $user = User::where('google_id', $google_user->getId())->first();
        //dd($google_user->getId());
        if(!$user){
            $user = User::create([
                   'name'                   => $google_user->getName(),
                   'email'                  => $google_user->getEmail(),
                   'avatar'                 => $google_user->avatar,
                   'google_id'              => $google_user->getId(),
                   'google_token'           => $google_user->token,
                   'google_refreshToken'    => $google_user->refreshToken,
                   'google_expiresIn'       => $google_user->expiresIn,
                   'email_verified'         => $google_user->user['email_verified'],
            ]);               
        }

        Auth::login($user,true);  
            
        return redirect('/ApiLoginSuccesfull');

    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
   
}
