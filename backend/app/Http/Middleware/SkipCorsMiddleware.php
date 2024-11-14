<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SkipCorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Allow all origins, methods, and headers
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');

        return $response;
    }
}

