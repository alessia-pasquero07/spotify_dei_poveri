<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Evita problemi di permessi del browser

try {
    $pdo = new PDO('mysql:host=localhost;dbname=spotify_clone;charset=utf8', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query('SELECT id, titolo, artista, url_youtube, durata FROM canzoni');
    $canzoni = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'canzoni' => $canzoni]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>