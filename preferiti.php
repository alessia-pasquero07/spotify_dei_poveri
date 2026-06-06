<?php

header('Content-Type: application/json');

require_once __DIR__ . '/app/Controllers/FavoriteController.php';

try {
    session_start();
    $controller = new FavoriteController();
    $data = json_decode(file_get_contents('php://input'), true) ?? [];

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = $controller->listFavorites($_GET);
        http_response_code($response['status']);
        echo json_encode($response);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_GET['action'] ?? 'aggiungi';
        $response = $action === 'rimuovi'
            ? $controller->removeFavorite($data)
            : $controller->addFavorite($data);
        http_response_code($response['status']);
        echo json_encode($response);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $response = $controller->removeFavorite($data);
        http_response_code($response['status']);
        echo json_encode($response);
        exit;
    }

    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore del database.']);
}
