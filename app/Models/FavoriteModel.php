<?php

require_once __DIR__ . '/../../config/database.php';

class FavoriteModel
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = getPdoConnection();
    }

    public function listByUser(int $userId): array
    {
        $stmt = $this->pdo->prepare('SELECT id_film FROM preferiti WHERE id_utente = ?');
        $stmt->execute([$userId]);

        return array_map('intval', array_column($stmt->fetchAll(), 'id_film'));
    }

    public function exists(int $userId, int $filmId): bool
    {
        $stmt = $this->pdo->prepare('SELECT 1 FROM preferiti WHERE id_utente = ? AND id_film = ?');
        $stmt->execute([$userId, $filmId]);

        return (bool) $stmt->fetch();
    }

    public function add(int $userId, int $filmId): bool
    {
        if ($this->exists($userId, $filmId)) {
            return true;
        }

        $stmt = $this->pdo->prepare('INSERT INTO preferiti (id_utente, id_film) VALUES (?, ?)');
        return $stmt->execute([$userId, $filmId]);
    }

    public function remove(int $userId, int $filmId): bool
    {
        $stmt = $this->pdo->prepare('DELETE FROM preferiti WHERE id_utente = ? AND id_film = ?');
        return $stmt->execute([$userId, $filmId]);
    }
}
