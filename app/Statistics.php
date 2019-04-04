<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Statistics extends Model
{
    public function device(){
        return $this->belongsTo('App\Device');
    }
}
