<?php
// registrazione.php

header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=localhost;dbname=spotify_clone', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['username'], $data['email'], $data['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Dati mancanti']);
        exit;
    }

    $username = trim($data['username']);
    $email = trim($data['email']);
    $password = $data['password'];

    if (strlen($username) < 3 || strlen($password) < 6) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Username e password troppo corti']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Email non valida']);
        exit;
    }

    $stmt = $pdo->prepare('SELECT id FROM utenti WHERE email = ? OR username = ?');
    $stmt->execute([$email, $username]);
    
    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'Email o username già registrati']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    
    $stmt = $pdo->prepare('INSERT INTO utenti (username, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$username, $email, $hashedPassword]);

    echo json_encode(['success' => true, 'message' => 'Registrazione completata con successo']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore del database']);
}
?>
