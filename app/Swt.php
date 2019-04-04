<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Swt extends Model
{
    public function device(){
        return $this->belongsTo('App\Device');
    }
}
