<?php

header('Content-Type: application/json');

require_once __DIR__ . '/app/Controllers/AuthController.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    $controller = new AuthController();
    $response = $controller->register($data ?? []);

    http_response_code($response['status']);
    echo json_encode([
        'success' => $response['success'],
        'message' => $response['message'],
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore del database']);
}

