<?php

use App\Enums\AuthGuardEnum;
use App\Http\Controllers\ArtisanHttpController;
use App\Http\Controllers\Auth\ActivationController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\InitController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Nwidart\Modules\Facades\Module;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
 */

Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/backend.php';
require __DIR__ . '/customer.php';

Route::get('module-assets/{module}/{all}', function ($module, $all) {
    $modulePath = Module::find($module)->getPath();
    $assetPath  = $modulePath . '/resources/assets/' . $all;

    if (file_exists($assetPath)) {
        return response()->file($assetPath);
    } else {
        abort(404);
    }

})->where('all', '.*')->name('module.asset');

Route::get('account/active', [ActivationController::class, 'activate']);

Route::get('dev/artisan-http/storage-link', [ArtisanHttpController::class, 'storageLink'])->name('artisan-http.storage-link');

Route::get('/cronjob/start', function () {
    Artisan::call('schedule:run');
})->middleware('check.cron.rate.limit');

Route::middleware('guest:' . AuthGuardEnum::CUSTOMER->value)->group(function () {
    Route::get('registration', [CustomerController::class, 'create']);
    Route::post('registration', [CustomerController::class, 'store'])
        ->middleware('throttle:3,5') //3 attempt every 5 minutes
        ->name('home.registration');
});

Route::middleware('throttle:5,1')->get('/run', [InitController::class, 'run']);
Route::middleware('throttle:2,1')->get('/installer/get_core_data', [InitController::class, 'verifyInstall']);