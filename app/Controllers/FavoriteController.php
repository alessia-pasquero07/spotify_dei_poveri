<?php

require_once __DIR__ . '/../Models/FavoriteModel.php';

class FavoriteController
{
    private FavoriteModel $favoriteModel;

    public function __construct()
    {
        $this->favoriteModel = new FavoriteModel();
    }

    public function listFavorites(array $data): array
    {
        $userId = (int) ($data['user_id'] ?? ($_SESSION['user_id'] ?? 0));
        if ($userId <= 0) {
            return ['success' => false, 'message' => 'Utente non autenticato.', 'status' => 401];
        }

        return [
            'success' => true,
            'status' => 200,
            'favorites' => $this->favoriteModel->listByUser($userId),
        ];
    }

    public function addFavorite(array $data): array
    {
        $userId = (int) ($data['user_id'] ?? ($_SESSION['user_id'] ?? 0));
        $filmId = (int) ($data['film_id'] ?? 0);

        if ($userId <= 0 || $filmId <= 0) {
            return ['success' => false, 'message' => 'Dati utente o film mancanti.', 'status' => 400];
        }

        $this->favoriteModel->add($userId, $filmId);

        return [
            'success' => true,
            'status' => 201,
            'message' => 'Film aggiunto ai preferiti.',
            'favorite' => ['user_id' => $userId, 'film_id' => $filmId],
        ];
    }

    public function removeFavorite(array $data): array
    {
        $userId = (int) ($data['user_id'] ?? ($_SESSION['user_id'] ?? 0));
        $filmId = (int) ($data['film_id'] ?? 0);

        if ($userId <= 0 || $filmId <= 0) {
            return ['success' => false, 'message' => 'Dati utente o film mancanti.', 'status' => 400];
        }

        $this->favoriteModel->remove($userId, $filmId);

        return [
            'success' => true,
            'status' => 200,
            'message' => 'Film rimosso dai preferiti.',
        ];
    }
}
