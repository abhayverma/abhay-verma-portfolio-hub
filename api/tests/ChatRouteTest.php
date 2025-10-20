<?php
use PHPUnit\Framework\TestCase;

final class ChatRouteTest extends TestCase
{
    public function testChatEndpoint(): void
    {
        $url = "http://localhost:8000/api/chat";
        $data = json_encode(['prompt' => 'Say hello']);
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        $json = json_decode($response, true);
        $this->assertArrayHasKey('reply', $json, 'Response should have "reply" key');
        $this->assertNotEmpty($json['reply'], 'Reply should not be empty');
    }
}
