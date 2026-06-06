<?php

require_once __DIR__ . '/../Models/UserModel.php';

class AuthController
{
    private UserModel $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function login(array $data): array
    {
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if ($email === '' || $password === '') {
            return ['success' => false, 'message' => 'Compila email e password.', 'status' => 400];
        }

        $user = $this->userModel->findByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            return ['success' => false, 'message' => 'Utente non trovato, devi registrarti!', 'status' => 401];
        }

        session_start();
        $_SESSION['user_id'] = (int) $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];

        return [
            'success' => true,
            'message' => 'Login completato.',
            'status' => 200,
            'user' => [
                'id' => (int) $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
            ],
        ];
    }

    public function register(array $data): array
    {
        $username = trim($data['username'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = $data['password'] ?? '';

        if ($username === '' || $email === '' || $password === '') {
            return ['success' => false, 'message' => 'Compila tutti i campi richiesti.', 'status' => 400];
        }

        if (strlen($username) < 3) {
            return ['success' => false, 'message' => 'Il nome utente deve avere almeno 3 caratteri.', 'status' => 400];
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Inserisci un indirizzo email valido.', 'status' => 400];
        }

        if (strlen($password) < 6) {
            return ['success' => false, 'message' => 'La password deve avere almeno 6 caratteri.', 'status' => 400];
        }

        if ($this->userModel->findByEmailOrUsername($email, $username)) {
            return ['success' => false, 'message' => 'Email o username già registrati.', 'status' => 409];
        }

        $this->userModel->createUser($username, $email, password_hash($password, PASSWORD_BCRYPT));

        return ['success' => true, 'message' => 'Registrazione completata con successo.', 'status' => 201];
    }
}
