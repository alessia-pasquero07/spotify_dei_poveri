// Attende che il DOM (Document Object Model) sia completamente caricato.
// Questo assicura che tutti gli elementi HTML siano disponibili quando il JavaScript prova ad accedervi.
document.addEventListener('DOMContentLoaded', function() {

    // --- Selezione degli elementi HTML tramite i loro ID ---
    // Questi sono i riferimenti agli elementi che manipoleremo.

    // Elementi della sidebar per la navigazione
    const homeLink = document.getElementById('home-link');
    const searchLink = document.getElementById('search-link');

    // Le sezioni principali della pagina che vogliamo mostrare/nascondere
    const homeSection = document.getElementById('home-section');
    const searchSection = document.getElementById('search-section');

    // Elementi del player musicale
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playerSongTitle = document.getElementById('player-song-title');
    const playerArtistName = document.getElementById('player-artist-name');
    const playerAlbumArt = document.getElementById('player-album-art');

    // Stato del player (simulato)
    let isPlaying = false; // Flag per indicare se la musica è in riproduzione
    let currentSongIndex = 0; // Indice del brano corrente nella playlist simulata

    // Playlist simulata (potresti espandere questo array con più brani)
    const playlist = [
        { title: 'Blinding Lights', artist: 'The Weeknd', albumArt: 'https://via.placeholder.com/60/FF0000' },
        { title: 'Shape of You', artist: 'Ed Sheeran', albumArt: 'https://via.placeholder.com/60/0000FF' },
        { title: 'Bohemian Rhapsody', artist: 'Queen', albumArt: 'https://via.placeholder.com/60/00FF00' }
    ];

    // --- Funzioni di Utilità ---

    /**
     * Rimuove la classe 'active' da tutti i link della sidebar.
     * Usata prima di aggiungere 'active' al link corretto per assicurare che solo uno sia attivo.
     */
    function deactivateAllSidebarLinks() {
        document.querySelectorAll('#sidebar-wrapper .list-group-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    // --- FUNZIONE CENTRALE PER LA VISUALIZZAZIONE DELLE SEZIONI ---
    // Questa funzione è esposta globalmente (window.showSection)
    // per essere chiamata da qualsiasi parte dell'applicazione (es. AvantiIndietro.js)
    // per cambiare la sezione visibile.
    //
    // @param {string} sectionId - L'ID della sezione da mostrare (es. 'home-section', 'search-section').
    // @param {boolean} fromHistory - Indica se la navigazione proviene dai bottoni Indietro/Avanti.
    window.showSection = function(sectionId, fromHistory = false) {
        // Nascondi tutte le sezioni principali presenti nel #page-content-wrapper
        document.querySelectorAll('#page-content-wrapper > .container-fluid').forEach(section => {
            section.classList.add('d-none');
        });

        // Mostra la sezione desiderata rimuovendo la classe 'd-none'
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('d-none');
        }

        // Aggiorna lo stato 'active' nella sidebar per evidenziare il link della sezione corrente
        deactivateAllSidebarLinks(); // Rimuovi 'active' da tutti i link esistenti

        // Aggiungi la classe 'active' al link della sidebar che corrisponde alla sezione mostrata
        if (sectionId === 'home-section' && homeLink) {
            homeLink.classList.add('active');
        } else if (sectionId === 'search-section' && searchLink) {
            searchLink.classList.add('active');
        }
        // Potresti aggiungere altri 'else if' qui per future sezioni (es. 'library-section', ecc.)

        // Notifica il modulo di navigazione Indietro/Avanti del cambio di sezione.
        // Controlliamo se `window.updateNavigationHistory` esiste prima di chiamarla,
        // per evitare errori se AvantiIndietro.js non è ancora caricato o è assente.
        if (window.updateNavigationHistory) {
            window.updateNavigationHistory(sectionId, fromHistory);
        }
    };


    // --- Funzioni per la gestione del Player Musicale ---

    /**
     * Aggiorna le informazioni del brano (titolo, artista, immagine) nel player.
     * @param {object} song - L'oggetto brano con proprietà `title`, `artist`, `albumArt`.
     */
    function updatePlayerInfo(song) {
        if (playerSongTitle) playerSongTitle.textContent = song.title;
        if (playerArtistName) playerArtistName.textContent = song.artist;
        if (playerAlbumArt) playerAlbumArt.src = song.albumArt;
    }

    /**
     * Simula la riproduzione/pausa del brano corrente.
     * Aggiorna l'icona del bottone Play/Pause di conseguenza.
     */
    function togglePlayPause() {
        isPlaying = !isPlaying; // Inverti lo stato di riproduzione

        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i'); // Seleziona l'elemento icona all'interno del bottone
            if (isPlaying) {
                // Se ora sta suonando, mostra l'icona di pausa
                icon.classList.remove('bi-play-fill');
                icon.classList.add('bi-pause-fill');
                console.log(`Riproduzione: ${playlist[currentSongIndex].title}`);
            } else {
                // Se ora è in pausa, mostra l'icona di play
                icon.classList.remove('bi-pause-fill');
                icon.classList.add('bi-play-fill');
                console.log(`Pausa: ${playlist[currentSongIndex].title}`);
            }
        }
    }

    /**
     * Passa al brano precedente nella playlist.
     * Gestisce il wrapping alla fine/inizio della playlist.
     */
    function playPreviousSong() {
        // Calcola l'indice del brano precedente, assicurandosi che non vada sotto zero
        // e che torni all'ultimo brano se si è al primo.
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        updatePlayerInfo(playlist[currentSongIndex]); // Aggiorna le info del player con il nuovo brano

        // Se la musica non stava già suonando, inizia a riprodurla (simulato)
        if (!isPlaying) {
             togglePlayPause(); // Questo cambierà l'icona e lo stato a "play"
        }
        console.log(`Brano precedente: ${playlist[currentSongIndex].title}`);
    }

    /**
     * Passa al brano successivo nella playlist.
     * Gestisce il wrapping alla fine/inizio della playlist.
     */
    function playNextSong() {
        // Calcola l'indice del brano successivo, assicurandosi che non superi la lunghezza della playlist
        // e che torni al primo brano se si è all'ultimo.
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        updatePlayerInfo(playlist[currentSongIndex]); // Aggiorna le info del player con il nuovo brano

        // Se la musica non stava già suonando, inizia a riprodurla (simulato)
        if (!isPlaying) {
            togglePlayPause(); // Questo cambierà l'icona e lo stato a "play"
        }
        console.log(`Brano successivo: ${playlist[currentSongIndex].title}`);
    }


    // --- Aggiunta degli Event Listener ---

    // Listener per i link della sidebar.
    // Ogni click sui link della sidebar ora chiama la funzione centralizzata `window.showSection`.
    if (homeLink) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impedisce il comportamento di default del link (es. ricaricare la pagina)
            window.showSection('home-section'); // Mostra la sezione Home
        });
    }

    if (searchLink) {
        searchLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.showSection('search-section'); // Mostra la sezione Cerca
        });
    }

    // Listener per i controlli del player musicale
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', playPreviousSong);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNextSong);
    }

    // --- Inizializzazione all'avvio dell'applicazione ---

    // 1. Imposta il brano iniziale nel player quando la pagina carica.
    if (playlist.length > 0) {
        updatePlayerInfo(playlist[currentSongIndex]);
    }

    // 2. Inizializza la visualizzazione alla sezione Home quando il DOM è pronto.
    // È fondamentale chiamare `window.showSection` qui perché questo è il punto di ingresso
    // che assicura che la homepage sia visibile e che la sua visita venga registrata
    // correttamente nella cronologia (tramite updateNavigationHistory).
    // `false` indica che questa non è una navigazione tramite i bottoni Indietro/Avanti.
    window.showSection('home-section', false);
const audioPlayer = document.getElementById('audio-player'); 
    audioPlayer.addEventListener('timeupdate', function() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    if (!isNaN(progress)) {
        progressBar.style.width = progress + '%';
    }
});
});