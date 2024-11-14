<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Options
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Routes where CORS is applied

    'allowed_methods' => ['*'], // Allow all HTTP methods

    'allowed_origins' => ['*'], // Allow requests from all origins

    'allowed_origins_patterns' => [], // Use regex patterns if needed

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => [], // Headers accessible to the client

    'max_age' => 0, // Cache duration for preflight responses

    'supports_credentials' => false, // Set to true if credentials (e.g., cookies) are needed
];
