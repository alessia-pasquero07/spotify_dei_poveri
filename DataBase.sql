-- 1. Crea automaticamente il database se non esiste ancora
CREATE DATABASE IF NOT EXISTS spotify_clone;
USE spotify_clone;

-- 2. Crea la tabella degli utenti
CREATE TABLE IF NOT EXISTS utenti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crea la tabella delle canzoni
CREATE TABLE IF NOT EXISTS canzoni (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titolo VARCHAR(200) NOT NULL,
    artista VARCHAR(100) NOT NULL,
    url_youtube VARCHAR(500),
    durata INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crea la tabella dei film preferiti (relazione utenti <-> film)
CREATE TABLE IF NOT EXISTS preferiti (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_utente INT NOT NULL,
    id_film INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_utente) REFERENCES utenti(id) ON DELETE CASCADE,
    UNIQUE(id_utente, id_film)
);