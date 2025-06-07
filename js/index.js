document.addEventListener('DOMContentLoaded', function () {

    // --- Selezione degli elementi HTML ---
    const homeLink = document.getElementById('home-link');
    const searchLink = document.getElementById('search-link');
    const libraryLink = document.getElementById('library-link');
    const sidebarCreatePlaylistLink = document.getElementById('sidebarCreatePlaylistLink'); // Nuovo!

    const homeSection = document.getElementById('home-section');
    const searchSection = document.getElementById('search-section');
    const librarySection = document.getElementById('library-section');

    // Elementi per la funzionalità "Crea Playlist" nella Libreria
    const createPlaylistBtn = document.getElementById('createPlaylistBtn'); // Pulsante nella sezione Libreria
    const createPlaylistSection = document.getElementById('create-playlist-section');
    const newPlaylistNameInput = document.getElementById('newPlaylistNameInput');
    const availableSongsList = document.getElementById('availableSongsList');
    const cancelCreatePlaylistBtn = document.getElementById('cancelCreatePlaylistBtn');
    const savePlaylistBtn = document.getElementById('savePlaylistBtn');
    const libraryContent = document.getElementById('library-content'); // Contenuto principale della libreria
    const userPlaylistsContainer = document.getElementById('userPlaylists'); // Container per le playlist create nella sezione Libreria
    const dynamicPlaylistsSidebar = document.getElementById('dynamicPlaylistsSidebar'); // Nuovo: Container per le playlist nella sidebar

    // Elementi del player musicale (esistenti)
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playerSongTitle = document.getElementById('player-song-title');
    const playerArtistName = document.getElementById('player-artist-name');
    const playerAlbumArt = document.getElementById('player-album-art');
    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progressBar');

    // --- Dati Simulati ---
    // Playlist del player (esistente)
    const playlist = [
        { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', albumArt: 'https://via.placeholder.com/60/FF0000', audioSrc: 'audio/blinding_lights.mp3' },
        { id: 2, title: 'Shape of You', artist: 'Ed Sheeran', albumArt: 'https://via.placeholder.com/60/0000FF', audioSrc: 'audio/shape_of_you.mp3' },
        { id: 3, title: 'Bohemian Rhapsody', artist: 'Queen', albumArt: 'https://via.placeholder.com/60/00FF00', audioSrc: 'audio/bohemian_rhapsody.mp3' }
    ];

    // Tutti i brani disponibili da cui l'utente può scegliere per la playlist
    // Tutti i brani disponibili da cui l'utente può scegliere per la playlist
    // Esteso con 10 canzoni per genere (Pop, Rock, Hip-Hop, Elettronica, Jazz, Classica)
    // --- Dati Simulati (Nuova Struttura per Album e Canzoni) ---

    // Definizione degli album, ciascuno contenente le proprie canzoni


    // Ora, per ottenere la lista di tutte le canzoni disponibili (come serviva prima),
    // possiamo creare una funzione o un array derivato:
    let allAvailableSongs = [];
    allAlbums.forEach(album => {
        album.songs.forEach(song => {
            // Aggiungiamo anche l'artista, il genere e l'albumArt della canzone
            // così ogni "canzone" estratta ha tutti i dettagli necessari.
            allAvailableSongs.push({
                ...song, // Copia le proprietà della canzone (id, title, duration, audioSrc)
                artist: album.artist,
                genre: album.genre,
                albumArt: album.albumArt, // Questo sarà l'albumArt dell'album genitore
                albumTitle: album.title // Nuovo: per sapere a quale album appartiene la canzone
            });
        });
    });

    // ... (il resto del tuo codice JS) ...

    // Array per le playlist create dall'utente (inizialmente vuoto o caricato da storage)
    let userPlaylists = [];

    // Brani temporaneamente selezionati per la playlist in creazione
    let songsToAddToNewPlaylist = [];

    // --- Funzioni di Utilità ---

    function deactivateAllSidebarLinks() {
        document.querySelectorAll('#sidebar-wrapper .list-group-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    // FUNZIONE CENTRALE PER LA VISUALIZZAZIONE DELLE SEZIONI
    window.showSection = function (sectionId, fromHistory = false) {
        document.querySelectorAll('#page-content-wrapper > .container-fluid').forEach(section => {
            section.classList.add('d-none');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('d-none');
        }

        deactivateAllSidebarLinks();

        if (sectionId === 'home-section' && homeLink) {
            homeLink.classList.add('active');
        } else if (sectionId === 'search-section' && searchLink) {
            searchLink.classList.add('active');
        } else if (sectionId === 'library-section' && libraryLink) {
            libraryLink.classList.add('active');
            // Quando si mostra la libreria, assicurati che la sezione creazione sia nascosta
            // e il contenuto normale della libreria sia visibile.
            hideCreatePlaylistSection();
            renderUserPlaylists(); // Ricarica le playlist utente nella sezione Libreria
        }

        if (window.updateNavigationHistory) {
            window.updateNavigationHistory(sectionId, fromHistory);
        }
    };

    // --- Funzioni per la gestione del Player Musicale ---
    function updatePlayerInfo(song) {
        if (!song) return; // Fix: non tentare di accedere a proprietà di undefined/null
        if (playerSongTitle) playerSongTitle.textContent = song.title;
        if (playerArtistName) playerArtistName.textContent = song.artist;
        if (playerAlbumArt) playerAlbumArt.src = song.albumArt;
        if (audioPlayer && song.audioSrc) { // Assicurati che ci sia un audioSrc
            audioPlayer.src = song.audioSrc;
            // Se si cambia brano durante la riproduzione, riavvia
            if (isPlaying) {
                audioPlayer.play();
            }
        }
    }

    function togglePlayPause() {
        isPlaying = !isPlaying;
        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i');
            if (isPlaying) {
                icon.classList.remove('bi-play-fill');
                icon.classList.add('bi-pause-fill');
                if (audioPlayer) audioPlayer.play(); // Avvia riproduzione audio
                console.log(`Riproduzione: ${playlist[currentSongIndex].title}`);
            } else {
                icon.classList.remove('bi-pause-fill');
                icon.classList.add('bi-play-fill');
                if (audioPlayer) audioPlayer.pause(); // Metti in pausa riproduzione audio
                console.log(`Pausa: ${playlist[currentSongIndex].title}`);
            }
        }
    }

    function playPreviousSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        updatePlayerInfo(playlist[currentSongIndex]);
        if (!isPlaying) {
            togglePlayPause();
        }
        console.log(`Brano precedente: ${playlist[currentSongIndex].title}`);
    }

    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        updatePlayerInfo(playlist[currentSongIndex]);
        if (!isPlaying) {
            togglePlayPause();
        }
        console.log(`Brano successivo: ${playlist[currentSongIndex].title}`);
    }


    // --- Funzioni per la Gestione della Creazione Playlist ---

    /**
     * Mostra la sezione di creazione playlist e nasconde il contenuto normale della libreria.
     * Questa funzione ora gestisce anche la transizione alla sezione Libreria.
     */
    function showCreatePlaylistSection() {
        // Prima di tutto, assicurati di essere nella sezione Libreria
        window.showSection('library-section'); // Questo attiverà il link Libreria e mostrerà la sezione Libreria

        // Poi, gestisci la visibilità delle sub-sezioni all'interno della Libreria
        if (libraryContent) libraryContent.classList.add('d-none');
        if (createPlaylistSection) createPlaylistSection.classList.remove('d-none');
        newPlaylistNameInput.value = ''; // Resetta il campo nome playlist
        songsToAddToNewPlaylist = []; // Resetta i brani selezionati
        renderAvailableSongs(); // Carica i brani disponibili
    }

    /**
     * Nasconde la sezione di creazione playlist e mostra il contenuto normale della libreria.
     */
    function hideCreatePlaylistSection() {
        if (createPlaylistSection) createPlaylistSection.classList.add('d-none');
        if (libraryContent) libraryContent.classList.remove('d-none');
    }

    /**
     * Renderizza tutti i brani disponibili nella sezione di creazione playlist.
     */
    function renderAvailableSongs() {
        if (!availableSongsList) return;
        availableSongsList.innerHTML = ''; // Pulisci la lista esistente

        allAvailableSongs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.classList.add(
                'list-group-item', 'bg-dark', 'text-white', 'd-flex',
                'justify-content-between', 'align-items-center', 'border-0'
            );
            // Controlla se la canzone è già stata aggiunta alla playlist corrente
            const isSongAdded = songsToAddToNewPlaylist.some(s => s.id === song.id);
            listItem.innerHTML = `
                <span>${song.title} - ${song.artist}</span>
                <button class="btn btn-sm ${isSongAdded ? 'btn-success' : 'btn-outline-success'} add-song-btn" data-song-id="${song.id}" ${isSongAdded ? 'disabled' : ''}>
                    <i class="bi ${isSongAdded ? 'bi-check' : 'bi-plus'}"></i>
                </button>
            `;
            availableSongsList.appendChild(listItem);
        });

        // Aggiungi event listener a tutti i pulsanti '+'
        document.querySelectorAll('.add-song-btn').forEach(button => {
            button.addEventListener('click', function () {
                const songId = parseInt(this.dataset.songId);
                addSongToNewPlaylist(songId, this);
            });
        });
    }

    /**
     * Aggiunge un brano alla playlist in creazione.
     * @param {number} songId - L'ID del brano da aggiungere.
     * @param {HTMLElement} buttonElement - Il pulsante '+' che è stato cliccato.
     */
    function addSongToNewPlaylist(songId, buttonElement) {
        const songToAdd = allAvailableSongs.find(song => song.id === songId);
        if (songToAdd && !songsToAddToNewPlaylist.some(s => s.id === songId)) {
            songsToAddToNewPlaylist.push(songToAdd);
            console.log(`Aggiunto alla playlist: ${songToAdd.title}`);
            // Cambia l'icona e disabilita il pulsante
            buttonElement.innerHTML = '<i class="bi bi-check"></i>';
            buttonElement.classList.remove('btn-outline-success');
            buttonElement.classList.add('btn-success');
            buttonElement.disabled = true;
        }
    }

    /**
     * Salva la nuova playlist e la aggiunge alla lista dell'utente.
     */
    function saveNewPlaylist() {
        const playlistName = newPlaylistNameInput.value.trim();
        if (!playlistName) {
            alert('Per favore, dai un nome alla tua playlist!');
            return;
        }
        if (songsToAddToNewPlaylist.length === 0) {
            alert('Aggiungi almeno una canzone alla tua playlist!');
            return;
        }

        const newPlaylist = {
            id: Date.now(), // ID unico basato sul timestamp
            name: playlistName,
            songs: songsToAddToNewPlaylist,
            albumArt: 'https://via.placeholder.com/80/777777' // Immagine predefinita
        };

        userPlaylists.push(newPlaylist);
        console.log('Nuova playlist salvata:', newPlaylist);

        // Resetta lo stato e torna alla vista normale della libreria
        newPlaylistNameInput.value = '';
        songsToAddToNewPlaylist = [];
        hideCreatePlaylistSection();
        renderUserPlaylists(); // Aggiorna la lista delle playlist mostrate nella sezione Libreria
        renderPlaylistsInSidebar(); // Nuovo: Aggiorna la lista delle playlist mostrate nella Sidebar
    }

    /**
     * Renderizza tutte le playlist dell'utente nel container dedicato nella sezione Libreria.
     */
    function renderUserPlaylists() {
        if (!userPlaylistsContainer) return;
        userPlaylistsContainer.innerHTML = ''; // Pulisci le playlist esistenti

        if (userPlaylists.length === 0) {
            userPlaylistsContainer.innerHTML = '<p class="text-muted ms-3">Nessuna playlist creata. Clicca "+ Crea playlist" per iniziarne una nuova!</p>';
            return;
        }

        userPlaylists.forEach(playlist => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col');
            colDiv.innerHTML = `
                <div class="card bg-dark text-white p-3 shadow-sm">
                    <div class="d-flex align-items-center">
                        <img src="${playlist.albumArt}" class="rounded me-3" alt="Copertina Playlist">
                        <div>
                            <h5 class="card-title mb-0">${playlist.name}</h5>
                            <p class="card-text text-muted mb-0">Playlist • ${playlist.songs.length} canzoni</p>
                        </div>
                    </div>
                </div>
            `;
            userPlaylistsContainer.appendChild(colDiv);
        });
    }

    /**
     * Nuovo: Renderizza le playlist create dall'utente nella sidebar.
     */
    function renderPlaylistsInSidebar() {
        if (!dynamicPlaylistsSidebar) return;
        dynamicPlaylistsSidebar.innerHTML = ''; // Pulisci le playlist esistenti

        userPlaylists.forEach(playlist => {
            const playlistLink = document.createElement('a');
            playlistLink.href = "#"; // Potresti voler reindirizzare a una pagina specifica della playlist
            playlistLink.classList.add(
                'list-group-item', 'list-group-item-action', 'bg-dark', 'text-white',
                'border-0', 'py-2', 'text-decoration-none', 'small-text' // Aggiunto 'small-text' per dimensione
            );
            playlistLink.textContent = playlist.name; // Il nome della playlist
            // Puoi anche aggiungere un data-id per riferimento futuro
            playlistLink.dataset.playlistId = playlist.id;

            dynamicPlaylistsSidebar.appendChild(playlistLink);
        });
    }


    // --- Aggiunta degli Event Listener ---

    // Listener per i link della sidebar
    if (homeLink) {
        homeLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.showSection('home-section');
        });
    }

    if (searchLink) {
        searchLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.showSection('search-section');
        });
    }

    if (libraryLink) {
        libraryLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.showSection('library-section');
        });
    }

    // Nuovo: Listener per il link "Crea playlist" nella sidebar
    if (sidebarCreatePlaylistLink) {
        sidebarCreatePlaylistLink.addEventListener('click', function (event) {
            event.preventDefault();
            showCreatePlaylistSection(); // Chiama la stessa funzione usata dal pulsante nella Libreria
        });
    }

    // Listener per il pulsante "Crea playlist" nella sezione Libreria
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', showCreatePlaylistSection);
    }

    // Listener per il pulsante "Annulla" nella sezione creazione playlist
    if (cancelCreatePlaylistBtn) {
        cancelCreatePlaylistBtn.addEventListener('click', hideCreatePlaylistSection);
    }

    // Listener per il pulsante "Salva playlist"
    if (savePlaylistBtn) {
        savePlaylistBtn.addEventListener('click', saveNewPlaylist);
    }

    // Listener per i controlli del player musicale (esistenti)
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', playPreviousSong);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNextSong);
    }

    if (audioPlayer && progressBar) {
        audioPlayer.addEventListener('timeupdate', function () {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if (!isNaN(progress)) {
                progressBar.style.width = progress + '%';
            }
        });
    }


    // --- Inizializzazione all'avvio dell'applicazione ---
    if (playlist.length > 0) {
        updatePlayerInfo(playlist[currentSongIndex]);
    }
    window.showSection('home-section', false);
    renderUserPlaylists(); // Carica le playlist utente nella sezione Libreria all'avvio
    renderPlaylistsInSidebar(); // Nuovo: Carica le playlist utente nella sidebar all'avvio

    // --- Mostra la sezione artisti per genere quando si clicca su una card di genere ---
    document.addEventListener('click', function (e) {
        let card = e.target.closest('.genre-mix-card');
        if (card) {
            e.preventDefault();
            // Debug: mostra cosa è stato cliccato
            console.log('CLICK SU CARD:', card, card.dataset.genre);
            // Nascondi tutte le sezioni principali
            document.querySelectorAll('#page-content-wrapper > .container-fluid, #page-content-wrapper > section').forEach(section => {
                section.classList.add('d-none');
            });
            // Mostra la sezione artisti per genere
            const genreArtistsSection = document.getElementById('genre-artists-section');
            if (genreArtistsSection) {
                genreArtistsSection.classList.remove('d-none');
                genreArtistsSection.scrollIntoView({behavior: 'smooth'});
            }
            // Mostra il nome del genere selezionato
            const genreTitle = document.getElementById('current-genre-title');
            if (genreTitle && card.dataset.genre) {
                genreTitle.textContent = card.dataset.genre;
            }
        }
    });

    // --- Funzionalità di ricerca nella sezione Cerca ---
    if (searchSection) {
        const searchInput = searchSection.querySelector('input.form-control[placeholder="Cosa vuoi ascoltare?"]');
        // Crea o trova il contenitore risultati
        let resultsContainer = document.getElementById('search-results-container');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results-container';
            resultsContainer.className = 'mb-4';
            searchInput.parentElement.parentElement.insertBefore(resultsContainer, searchInput.parentElement.nextSibling);
        }

        function renderSearchResults(resultsSongs, resultsAlbums, query) {
            resultsContainer.innerHTML = '';
            if (!query || (resultsSongs.length === 0 && resultsAlbums.length === 0)) {
                resultsContainer.innerHTML = `<div class="alert alert-warning text-dark">Nessun risultato trovato per "${query}"</div>`;
                return;
            }
            if (resultsSongs.length > 0) {
                const songList = document.createElement('div');
                songList.innerHTML = `<h4 class='text-white mb-2'>Brani trovati</h4>`;
                resultsSongs.forEach(r => {
                    const el = document.createElement('div');
                    el.className = 'd-flex align-items-center mb-2 bg-dark p-2 rounded';
                    el.innerHTML = `
                        <img src="${r.albumArt}" alt="Album Art" style="width:40px;height:40px;object-fit:cover;" class="rounded me-2">
                        <div>
                            <div class='fw-bold text-white'>${r.song.title}</div>
                            <div class='text-muted small'>${r.artist} • ${r.album}</div>
                        </div>
                    `;
                    songList.appendChild(el);
                });
                resultsContainer.appendChild(songList);
            }
            if (resultsAlbums.length > 0) {
                const albumList = document.createElement('div');
                albumList.innerHTML = `<h4 class='text-white mb-2 mt-4'>Album trovati</h4>`;
                resultsAlbums.forEach(album => {
                    const el = document.createElement('div');
                    el.className = 'd-flex align-items-center mb-2 bg-dark p-2 rounded';
                    el.innerHTML = `
                        <img src="${album.albumArt}" alt="Album Art" style="width:40px;height:40px;object-fit:cover;" class="rounded me-2">
                        <div>
                            <div class='fw-bold text-white'>${album.title}</div>
                            <div class='text-muted small'>${album.artist} • ${album.genre}</div>
                        </div>
                    `;
                    albumList.appendChild(el);
                });
                resultsContainer.appendChild(albumList);
            }
        }

        function doSearch() {
            const query = searchInput.value.trim();
            if (!query) {
                resultsContainer.innerHTML = '';
                return;
            }
            const resultsSongs = window.cercaCanzoniPerTitolo ? window.cercaCanzoniPerTitolo(query) : (typeof cercaCanzoniPerTitolo !== 'undefined' ? cercaCanzoniPerTitolo(query) : []);
            const resultsAlbums = window.cercaAlbumPerTitolo ? window.cercaAlbumPerTitolo(query) : (typeof cercaAlbumPerTitolo !== 'undefined' ? cercaAlbumPerTitolo(query) : []);
            renderSearchResults(resultsSongs, resultsAlbums, query);
        }
        // Ricerca su Enter
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Previene il submit di un eventuale form
                doSearch();
            }
        });
        // Ricerca live (opzionale)
        searchInput.addEventListener('input', function() {
            if (searchInput.value.trim() === '') {
                resultsContainer.innerHTML = '';
                return;
            }
            doSearch();
        });
    }

    // --- Click su card di genere nella sezione Cerca (Sfoglia tutto) ---
    if (searchSection) {
        searchSection.addEventListener('click', function(e) {
            // Cerca la card con data-genre (può essere su .search-category-card o su un genitore)
            let card = e.target.closest('.search-category-card[data-genre]');
            if (!card) {
                // Se la card non ha data-genre, prova a vedere se il genitore .col lo ha
                const col = e.target.closest('.col');
                if (col && col.querySelector('.search-category-card[data-genre]')) {
                    card = col.querySelector('.search-category-card[data-genre]');
                }
            }
            if (card && card.dataset.genre) {
                e.preventDefault();
                // Mostra la sezione artisti per genere
                const genreArtistsSection = document.getElementById('genre-artists-section');
                if (genreArtistsSection) {
                    document.querySelectorAll('#page-content-wrapper > .container-fluid, #page-content-wrapper > section').forEach(section => {
                        section.classList.add('d-none');
                    });
                    genreArtistsSection.classList.remove('d-none');
                    genreArtistsSection.scrollIntoView({behavior: 'smooth'});
                }
                // Aggiorna il titolo del genere
                const genreTitle = document.getElementById('current-genre-title');
                if (genreTitle) {
                    genreTitle.textContent = card.dataset.genre;
                }
                // Popola la lista artisti/album/canzoni per il genere
                const artistsListContainer = document.getElementById('artists-list-container');
                if (
                    artistsListContainer &&
                    typeof window.cercaArtistiPerGenere === 'function' &&
                    typeof window.cercaAlbumPerGenere === 'function' &&
                    typeof window.cercaCanzoniPerGenere === 'function'
                ) {
                    const artisti = window.cercaArtistiPerGenere(card.dataset.genre);
                    const album = window.cercaAlbumPerGenere(card.dataset.genre);
                    // Fix: accedi a cercaCanzoniPerGenere dal window globale
                    const canzoni = window.cercaCanzoniPerGenere(card.dataset.genre);
                    let html = '';
                    if (artisti.length > 0) {
                        html += `<h4 class='text-white mb-3'>Artisti</h4><div class='row'>`;
                        artisti.forEach(nome => {
                            html += `<div class='col mb-3'><div class='card bg-dark text-white text-center p-3 shadow-sm'><div class='card-body p-0'><h5 class='card-title mb-1'>${nome}</h5><p class='card-text text-muted'>Artista</p></div></div></div>`;
                        });
                        html += `</div>`;
                    }
                    if (album.length > 0) {
                        html += `<h4 class='text-white mb-3 mt-4'>Album</h4><div class='row'>`;
                        album.forEach(a => {
                            html += `<div class='col mb-3'><div class='card bg-dark text-white text-center p-3 shadow-sm'><img src='${a.albumArt}' class='card-img-top rounded mb-2' alt='Copertina Album'><div class='card-body p-0'><h5 class='card-title mb-1'>${a.title}</h5><p class='card-text text-muted'>${a.artist}</p></div></div></div>`;
                        });
                        html += `</div>`;
                    }
                    if (canzoni && canzoni.length > 0) {
                        html += `<h4 class='text-white mb-3 mt-4'>Brani</h4>`;
                        canzoni.forEach(r => {
                            if (r && r.song && r.song.title) {
                                html += `<p class='text-white mb-1'>${r.song.title}</p>`;
                            }
                        });
                    }
                    if (html === '') {
                        html = `<div class='alert alert-warning text-dark'>Nessun artista, album o brano trovato per questo genere.</div>`;
                    }
                    artistsListContainer.innerHTML = html;
                } else {
                    // Fallback: mostra solo artisti e album
                    const artisti = window.cercaArtistiPerGenere ? window.cercaArtistiPerGenere(card.dataset.genre) : [];
                    const album = window.cercaAlbumPerGenere ? window.cercaAlbumPerGenere(card.dataset.genre) : [];
                    let html = '';
                    if (artisti.length > 0) {
                        html += `<h4 class='text-white mb-3'>Artisti</h4><div class='row'>`;
                        artisti.forEach(nome => {
                            html += `<div class='col mb-3'><div class='card bg-dark text-white text-center p-3 shadow-sm'><div class='card-body p-0'><h5 class='card-title mb-1'>${nome}</h5><p class='card-text text-muted'>Artista</p></div></div></div>`;
                        });
                        html += `</div>`;
                    }
                    if (album.length > 0) {
                        html += `<h4 class='text-white mb-3 mt-4'>Album</h4><div class='row'>`;
                        album.forEach(a => {
                            html += `<div class='col mb-3'><div class='card bg-dark text-white text-center p-3 shadow-sm'><img src='${a.albumArt}' class='card-img-top rounded mb-2' alt='Copertina Album'><div class='card-body p-0'><h5 class='card-title mb-1'>${a.title}</h5><p class='card-text text-muted'>${a.artist}</p></div></div></div>`;
                        });
                        html += `</div>`;
                    }
                    if (html === '') {
                        html = `<div class='alert alert-warning text-dark'>Nessun artista o album trovato per questo genere.</div>`;
                    }
                    artistsListContainer.innerHTML = html;
                }
            }
        });
    }

    // --- Volume con tastiera: freccia destra/sinistra ---
    document.addEventListener('keydown', function(e) {
        // Se sei in un input, non cambiare il volume
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        if (!audioPlayer) return;
        let changed = false;
        if (e.key === 'ArrowRight') {
            audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.05);
            changed = true;
        } else if (e.key === 'ArrowLeft') {
            audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.05);
            changed = true;
        }
        if (changed) {
            const volumeSlider = document.getElementById('volume-slider');
            if (volumeSlider) volumeSlider.value = audioPlayer.volume;
        }
    });
});