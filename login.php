<?php
// login.php

header('Content-Type: application/json');
session_start();

try {
    $pdo = new PDO('mysql:host=localhost;dbname=spotify_clone', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Metodo non consentito']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['email'], $data['password'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Dati mancanti']);
        exit;
    }

    $email = trim($data['email']);
    $password = $data['password'];

    $stmt = $pdo->prepare('SELECT id, username, email, password FROM utenti WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Email o password non corrette']);
        exit;
    }

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];

    echo json_encode([
        'success' => true,
        'message' => 'Login completato',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email']
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore del database']);
}
?>
