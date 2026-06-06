<?php

require_once __DIR__ . '/../../config/database.php';

class UserModel
{
    private PDO $pdo;

    public function __construct()
    {
        $this->pdo = getPdoConnection();
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->pdo->prepare('SELECT id, username, email, password FROM utenti WHERE email = ?');
        $stmt->execute([$email]);

        return $stmt->fetch() ?: null;
    }

    public function findByEmailOrUsername(string $email, string $username): bool
    {
        $stmt = $this->pdo->prepare('SELECT id FROM utenti WHERE email = ? OR username = ?');
        $stmt->execute([$email, $username]);

        return (bool) $stmt->fetch();
    }

    public function createUser(string $username, string $email, string $password): int
    {
        $stmt = $this->pdo->prepare('INSERT INTO utenti (username, email, password) VALUES (?, ?, ?)');
        $stmt->execute([$username, $email, $password]);

        return (int) $this->pdo->lastInsertId();
    }
}
