<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pi;
class PiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pis = Pi::all();
        foreach($pis as $index=>$pi){
            $response[$index]['customer_id'] = $pi->user->customer_id;
            $response[$index]['owner_name'] = $pi->user->name;
            $response[$index]['pi_id'] = $pi->pi_id;
            $response[$index]['cus_id'] = $pi->user->id;
            $response[$index]['id'] = $pi->id;
            if($pi->user->id == 1)
                $response[$index]['status'] = 'Unallocated';
            else 
            $response[$index]['status'] = 'Allocated';
        }
        return response()->json([
            'pis' => $response,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
    	$input = $request->all();
    	$pi = Pi::findOrFail($id);
    	$pi->update($input);
        return response()->json([
            'pi' => $pi,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
