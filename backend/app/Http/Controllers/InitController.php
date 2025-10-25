<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;

class InitController extends Controller
{
    public function run()
    {
        Artisan::call('storage:link');

        return redirect()->route('login');
    }

    public function verifyInstall()
    {
        $file = 'storage/framework/installed.php';

        if (file_exists(base_dir($file))) {

            echo file_get_contents(base_dir($file));

        } else {

            $err['msg'] = "error";
            echo json_encode($err);
        }

    }

}