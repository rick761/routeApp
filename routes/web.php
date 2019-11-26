<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
  //  return view('welcome');
//});
Route::get('/test','RouteController@one');

//redirect google api 
Route::get('login/google', 'Auth\LoginController@redirectToProvider');
Route::get('login/google/callback', 'Auth\LoginController@handleProviderCallback');
//login and out
Route::get('ApiLoginSuccesfull', 'HomeController@ApiLogin' );
Route::get('/api/getAuth','AuthController@getAuth');
Route::get('/logout', 'AuthController@logoutAuth');

//route
Route::post('/api/route/create', 'RouteEditorController@createRoute');
Route::post('/api/route/edit/load', 'RouteEditorController@editRouteLoad');
Route::post('/api/route/edit/save', 'RouteEditorController@editRouteSave');
Route::get('/api/route/get/mijn', 'RouteController@mijn');
Route::get('/api/route/get', 'RouteController@index');
Route::get('/api/route/getOne', 'RouteController@one');
Route::post('/api/route/del', 'RouteEditorController@deleteRoute');
Route::get('/api/route/get/pages' , 'RouteController@getPages');


Auth::routes();
//Route::redirect('/home', '/app');//bugfix?
//Route::get('/app', 'HomeController@index')->name('app');

Route::get('/{catchall?}', function () {
  return response()->view('home');
})->where('catchall', '(.*)');