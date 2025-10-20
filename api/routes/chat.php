<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit(); }

use Config\Config;

$config = Config::get();
$input = json_decode(file_get_contents('php://input'), true);

$prompt = $input['prompt'] ?? '';
$provider = $input['provider'] ?? 'openai'; // default OpenAI

if (!$prompt) { http_response_code(400); echo json_encode(['error'=>'No prompt provided']); exit(); }
if (!isset($config['providers'][$provider])) { http_response_code(400); echo json_encode(['error'=>'Unknown provider']); exit(); }

$providerConfig = $config['providers'][$provider];

// Prepare request per provider
if ($provider === 'openai') {
    $payload = [
        'model' => $providerConfig['model'],
        'messages' => [
            ['role' => 'system', 'content' => 'You are a helpful assistant.'],
            ['role' => 'user', 'content' => $prompt]
        ],
        'temperature' => 0.7
    ];
} elseif ($provider === 'llama') {
    $payload = [
        'model' => $providerConfig['model'],
        'input' => $prompt,
        'temperature' => 0.7
    ];
} elseif ($provider === 'claude') {
    $payload = [
        'model' => $providerConfig['model'],
        'prompt' => $prompt,
        'temperature' => 0.7
    ];
}

// Initialize cURL
$ch = curl_init($providerConfig['endpoint']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $providerConfig['api_key']
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => curl_error($ch)]);
    curl_close($ch);
    exit();
}

curl_close($ch);

$data = json_decode($response, true);

// Extract reply based on provider
define('NO_RESPONSE', 'No response');
$reply = '';
if ($provider === 'openai') {
    $reply = $data['choices'][0]['message']['content'] ?? NO_RESPONSE;
} elseif ($provider === 'llama') {
    $reply = $data['response'] ?? NO_RESPONSE;
} elseif ($provider === 'claude') {
    $reply = $data['completion'] ?? NO_RESPONSE;
}

echo json_encode(['reply' => $reply]);
