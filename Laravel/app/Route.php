<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\View;

class Route extends Model
{
    //
    protected $fillable = [
        'informatie', 'land', 'naam','vervoer','patroon'
     ];
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function views(){
        return $this->hasMany('App\View');
    }
}
