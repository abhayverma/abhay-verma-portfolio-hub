<?php
use Config\AIConfig;

function getOpenAIResponse($prompt) {

    $config = new AIConfig();
    $apiKey = $config->openai_api_key;
    $model  = $config->openai_model;

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => 'https://api.openai.com/v1/chat/completions',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $apiKey",
            "Content-Type: application/json"
        ],
        CURLOPT_POSTFIELDS => json_encode([
            'model' => $model,
            'messages' => [
                ['role' => 'system', 'content' => 'You are an assistant.'],
                ['role' => 'user', 'content' => $prompt]
            ],
        ])
    ]);

    $response = curl_exec($curl);
    curl_close($curl);

    if (!$response) {
        return ['error' => 'No response from API'];
    }

    $data = json_decode($response, true);
    return $data['choices'][0]['message']['content'] ?? 'No reply';
}
