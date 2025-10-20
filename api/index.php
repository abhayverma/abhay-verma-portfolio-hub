<?php
use App\Routes\Chat;

$requestUri = $_SERVER['REQUEST_URI'];

if (strpos($requestUri, '/api/chat') !== false) {
    // Example usage if Chat has a static method or needs to be instantiated:
    // $chat = new Chat();
    // $chat->handleRequest();

    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);
