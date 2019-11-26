<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    //
    protected $fillable = ['user_id', 'route_id']; 
    public $timestamps = false;
}
