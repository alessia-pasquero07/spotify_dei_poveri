/**
 * Restituisce tutti gli album di un certo genere.
 * @param {string} genre - Il nome del genere (es: 'Pop', 'Rock', ecc.)
 * @returns {Array} Array di album che corrispondono al genere
 */
function cercaAlbumPerGenere(genre) {
    if (!genre) return [];
    // Confronto case-insensitive
    return allAlbums.filter(album => album.genre.toLowerCase() === genre.toLowerCase());
}

/**
 * Restituisce tutti gli artisti unici di un certo genere.
 * @param {string} genre - Il nome del genere
 * @returns {Array} Array di nomi artista (string)
 */
function cercaArtistiPerGenere(genre) {
    if (!genre) return [];
    const artisti = allAlbums
        .filter(album => album.genre.toLowerCase() === genre.toLowerCase())
        .map(album => album.artist);
    // Rimuovi duplicati
    return [...new Set(artisti)];
}

/**
 * Restituisce tutti gli album che contengono il titolo indicato (case-insensitive, match parziale).
 * @param {string} titolo - Il titolo o parte del titolo da cercare
 * @returns {Array} Array di album che contengono il titolo
 */
function cercaAlbumPerTitolo(titolo) {
    if (!titolo) return [];
    const lower = titolo.toLowerCase();
    return allAlbums.filter(album => album.title.toLowerCase().includes(lower));
}

/**
 * Cerca una canzone per titolo (match parziale, case-insensitive) e restituisce tutte le canzoni trovate con info album e artista.
 * @param {string} titolo - Il titolo o parte del titolo della canzone da cercare
 * @returns {Array} Array di oggetti { song, album, artist }
 */
function cercaCanzoniPerTitolo(titolo) {
    if (!titolo) return [];
    const lower = titolo.toLowerCase();
    const risultati = [];
    allAlbums.forEach(album => {
        album.songs.forEach(song => {
            if (song.title.toLowerCase().includes(lower)) {
                risultati.push({
                    song: song,
                    album: album.title,
                    artist: album.artist,
                    genre: album.genre,
                    albumArt: album.albumArt
                });
            }
        });
    });
    return risultati;
}

/**
 * Restituisce tutte le canzoni di un certo genere, con info album e artista.
 * @param {string} genre - Il nome del genere
 * @returns {Array} Array di oggetti { song, album, artist, albumArt }
 */
function cercaCanzoniPerGenere(genre) {
    if (!genre) return [];
    const risultati = [];
    allAlbums.forEach(album => {
        if (album.genre.toLowerCase() === genre.toLowerCase()) {
            album.songs.forEach(song => {
                risultati.push({
                    song: song,
                    album: album.title,
                    artist: album.artist,
                    albumArt: album.albumArt
                });
            });
        }
    });
    return risultati;
}

// Espone le funzioni di ricerca anche su window per compatibilità cross-file
window.cercaAlbumPerGenere = cercaAlbumPerGenere;
window.cercaArtistiPerGenere = cercaArtistiPerGenere;
window.cercaAlbumPerTitolo = cercaAlbumPerTitolo;
window.cercaCanzoniPerTitolo = cercaCanzoniPerTitolo;
window.cercaCanzoniPerGenere = cercaCanzoniPerGenere;

// DEBUG: Test ricerca per genere Rock
console.log('DEBUG cercaAlbumPerGenere Rock:', cercaAlbumPerGenere('Rock'));
console.log('DEBUG cercaArtistiPerGenere Rock:', cercaArtistiPerGenere('Rock'));

// DEBUG: Test ricerca per titolo "rock"
console.log('DEBUG cercaAlbumPerTitolo rock:', cercaAlbumPerTitolo('rock'));

// DEBUG: Test ricerca per titolo canzone "Love On The Brain"
console.log('DEBUG cercaCanzoniPerTitolo Love On The Brain:', cercaCanzoniPerTitolo('Love On The Brain'));
// DEBUG: Mostra solo i titoli trovati per "Love On The Brain"
console.log('DEBUG titoli trovati:', cercaCanzoniPerTitolo('Love On The Brain').map(r => r.song.title));


