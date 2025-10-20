<?php
return [
    'app_env' => 'development',
    'providers' => [
        'openai' => [
            'api_key' => getenv('OPENAI_API_KEY'),
            'model'   => 'gpt-4o-mini',
            'endpoint'=> 'https://api.openai.com/v1/chat/completions',
        ],
        'gemini' => [
            'service_account_json' => getenv('GEMINI_SERVICE_JSON'),
            // Google Gemini generative AI endpoint (requires service account authentication)
            'endpoint' => 'https://gemini.googleapis.com/v1beta2/projects/{project_id}/locations/global/models/{model}:generateMessage',
        ],
        'perplexity' => [
            'api_key' => getenv('PERPLEXITY_API_KEY'),
            // Perplexity API chat endpoint
            'endpoint'=> 'https://api.perplexity.ai/v1/chat',
        ],
        'claude' => [
            'api_key' => getenv('CLAUDE_API_KEY'),
            // Anthropic Claude API completion endpoint
            'endpoint'=> 'https://api.anthropic.com/v1/complete',
        ],
    ]
];
