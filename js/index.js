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

    // Funzione per mostrare solo una sezione principale alla volta
    function showSection(sectionId) {
        const sectionIds = [
            'home-section',
            'search-section',
            'library-section',
            'genre-artists-section',
            'liked-songs-section',
            'artist-detail-section'
        ];
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('d-none');
        });
        const active = document.getElementById(sectionId);
        if (active) active.classList.remove('d-none');
    }

    // Collega i link della sidebar alle sezioni (senza ridefinire le variabili già esistenti)
    if (homeLink) homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('home-section');
    });
    if (searchLink) searchLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('search-section');
    });
    if (libraryLink) libraryLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('library-section');
    });
    // Sidebar: Brani che ti piacciono
    const likedSongsSidebar = document.querySelector('#sidebar-wrapper .bi-heart-fill')?.closest('a');
    if (likedSongsSidebar) likedSongsSidebar.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('liked-songs-section');
    });
    // Esempio: mostra la playlist dettagliata quando serve (da integrare dove serve nel tuo codice)
    // showSection('genre-artists-section');


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

    // --- PLAYLIST MIX DETTAGLIO ---
    const playlistSection = document.getElementById('genre-artists-section');
    const playlistCover = document.getElementById('playlist-cover');
    const playlistTitle = document.getElementById('playlist-title');
    const playlistDesc = document.getElementById('playlist-desc');
    const playlistMeta = document.getElementById('playlist-meta');
    const playlistTracks = document.getElementById('playlist-tracks');
    const playlistPlayBtn = document.getElementById('playlist-play-btn');

    function getTotalDuration(songs) {
        let totalSec = songs.reduce((acc, s) => {
            if (typeof s.duration === 'string' && s.duration.includes(':')) {
                const [min, sec] = s.duration.split(':').map(Number);
                return acc + min * 60 + sec;
            } else if (typeof s.duration === 'number') {
                return acc + s.duration;
            }
            return acc;
        }, 0);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }

    function showMixPlaylist(genre, coverSrc, title) {
        const songs = allAvailableSongs.filter(song => song.genre && song.genre.toLowerCase() === genre.toLowerCase());
        if (!songs.length) return;
        playlistCover.src = coverSrc;
        playlistTitle.textContent = title;
        playlistDesc.textContent = `I migliori brani ${genre} selezionati per te.`;
        playlistMeta.textContent = `Spotify • ${songs.length} brani • ${getTotalDuration(songs)}`;
        playlistTracks.innerHTML = '';
        songs.forEach((song, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td class="d-flex align-items-center">
                    <img src="${song.albumArt}" alt="" class="rounded me-2" style="width:40px;height:40px;object-fit:cover;">
                    <span>${song.title}</span>
                </td>
                <td>${song.artist}</td>
                <td>${song.albumTitle || ''}</td>
                <td>${song.duration || ''}</td>
                <td>
                    <button class="btn btn-link p-0 btn-heart"><i class="bi bi-heart"></i></button>
                    <button class="btn btn-link text-white p-0"><i class="bi bi-three-dots"></i></button>
                </td>
            `;
            playlistTracks.appendChild(tr);
        });
        // Eventi cuore: toggle verde e aggiungi ai preferiti
        playlistTracks.querySelectorAll('.btn-heart').forEach((btn, i) => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const tr = this.closest('tr');
                icon.classList.toggle('bi-heart-fill');
                icon.classList.toggle('bi-heart');
                icon.classList.toggle('text-success');
                // Se ora è pieno, aggiungi ai preferiti
                if (icon.classList.contains('bi-heart-fill')) {
                    const song = songs[i];
                    if (!likedSongs.some(s => s.id === song.id)) {
                        likedSongs.push(song);
                        saveLikedSongs();
                        renderLikedSongs();
                    }
                } else {
                    // Se viene tolto il cuore, rimuovi dai preferiti
                    const song = songs[i];
                    likedSongs = likedSongs.filter(s => s.id !== song.id);
                    saveLikedSongs();
                    renderLikedSongs();
                }
            });
        });
        showSection('genre-artists-section');
    }

    // Eventi sulle card mix
    setTimeout(() => {
        document.querySelectorAll('.genre-mix-card').forEach(card => {
            card.addEventListener('click', function (e) {
                e.preventDefault();
                const genre = this.getAttribute('data-genre');
                const img = this.querySelector('img');
                const title = this.querySelector('.card-title').textContent;
                showMixPlaylist(genre, img.src, title);
            });
        });
    }, 500);

    // --- BRANI PREFERITI ---
    let likedSongs = JSON.parse(localStorage.getItem('likedSongs') || '[]');
    const likedSongsSection = document.getElementById('liked-songs-section');
    const likedSongsList = document.getElementById('liked-songs-list');
    // Mostra la sezione dei brani preferiti
    const likedSongsSidebarLink = document.querySelector('#sidebar-wrapper .bi-heart-fill')?.closest('a');
    if (likedSongsSidebarLink) {
        likedSongsSidebarLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('liked-songs-section');
            renderLikedSongs();
        });
    }
    function saveLikedSongs() {
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    }
    function renderLikedSongs() {
        if (!likedSongsList) return;
        if (likedSongs.length === 0) {
            likedSongsList.innerHTML = '<div class="alert alert-info text-dark">Non hai ancora aggiunto nessun brano ai preferiti.</div>';
            return;
        }
        let html = `<table class='table table-dark table-hover playlist-table'><thead><tr><th>#</th><th>Titolo</th><th>Artista</th><th>Album</th><th>Durata</th><th></th></tr></thead><tbody>`;
        likedSongs.forEach((song, idx) => {
            html += `<tr><td>${idx+1}</td><td class='d-flex align-items-center'><img src='${song.albumArt}' alt='' class='rounded me-2' style='width:40px;height:40px;object-fit:cover;'><span>${song.title}</span></td><td>${song.artist}</td><td>${song.albumTitle||''}</td><td>${song.duration||''}</td><td><button class='btn btn-link text-success p-0 btn-dislike' data-song-id='${song.id}' title='Rimuovi dai preferiti'><i class='bi bi-heart-fill'></i></button></td></tr>`;
        });
        html += '</tbody></table>';
        likedSongsList.innerHTML = html;
        // Listener per rimuovere dai preferiti
        likedSongsList.querySelectorAll('.btn-dislike').forEach(btn => {
            btn.addEventListener('click', function() {
                const songId = parseInt(this.dataset.songId);
                likedSongs = likedSongs.filter(s => s.id !== songId);
                saveLikedSongs();
                renderLikedSongs();
                // Aggiorna anche i cuori nella playlist dettagliata se visibile
                document.querySelectorAll('#playlist-tracks .btn-heart').forEach(btnHeart => {
                    const icon = btnHeart.querySelector('i');
                    const tr = btnHeart.closest('tr');
                    if (tr && tr.querySelector('span') && tr.querySelector('span').textContent === this.closest('tr').querySelector('span').textContent) {
                        icon.classList.remove('bi-heart-fill', 'text-success');
                        icon.classList.add('bi-heart');
                    }
                });
            });
        });
    }
    // All'avvio, renderizza i preferiti se presenti
    renderLikedSongs();

    // Abilita il click sui div degli artisti nel carousel
    setTimeout(() => {
      document.querySelectorAll('.carousel .card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
          // Debug: logga il click e il nome artista
          let artistName = this.querySelector('.card-title')?.textContent?.trim();
          console.log('CLICK ARTISTA CAROUSEL:', artistName);
          if (!artistName) return;
          // Mostra la sezione dettaglio artista (riusa la stessa logica dei click sulle immagini circolari)
          if (typeof window.showSection === 'function') {
            // Trova album/canzoni dell'artista
            let artistAlbums = (window.allAlbums || window.allAvailableSongs ? (window.allAlbums || []).filter(a => a.artist && a.artist.toLowerCase() === artistName.toLowerCase()) : []);
            if (artistAlbums.length === 0 && window.allAvailableSongs) {
              let artistSongs = window.allAvailableSongs.filter(s => s.artist && s.artist.toLowerCase() === artistName.toLowerCase());
              if (artistSongs.length === 0) return;
              artistAlbums = [{
                albumArt: artistSongs[0].albumArt,
                title: artistSongs[0].albumTitle || '',
                year: '',
                songs: artistSongs,
                artist: artistName
              }];
            }
            if (artistAlbums.length === 0) return;
            let mainAlbum = artistAlbums[0];
            const playlistCover = document.getElementById('playlist-cover');
            const playlistTitle = document.getElementById('playlist-title');
            const playlistDesc = document.getElementById('playlist-desc');
            const playlistMeta = document.getElementById('playlist-meta');
            const playlistTracks = document.getElementById('playlist-tracks');
            const playlistPlayBtn = document.getElementById('playlist-play-btn');
            playlistCover.src = mainAlbum.albumArt;
            playlistTitle.textContent = artistName;
            playlistDesc.textContent = (mainAlbum.title ? mainAlbum.title : '') + (mainAlbum.year ? ' • ' + mainAlbum.year : '');
            let allSongs = artistAlbums.flatMap(a => (a.songs||[]).map(s => ({...s, albumTitle: a.title, albumArt: a.albumArt, artist: a.artist})));
            let totalMin = allSongs.reduce((acc, s) => {
              let [min, sec] = (s.duration||'0:00').split(':');
              return acc + parseInt(min)*60 + parseInt(sec);
            }, 0);
            playlistMeta.textContent = `${artistAlbums.length > 1 ? artistAlbums.length + ' album • ' : ''}${allSongs.length} brani • ${Math.floor(totalMin/60)} min`;
            playlistTracks.innerHTML = '';
            allSongs.forEach((song, i) => {
              let tr = document.createElement('tr');
              tr.innerHTML = `
                <td>${i+1}</td>
                <td class='d-flex align-items-center'><img src='${song.albumArt}' alt='' class='rounded me-2' style='width:40px;height:40px;object-fit:cover;'><span>${song.title}</span></td>
                <td>${song.artist}</td>
                <td>${song.albumTitle||''}</td>
                <td>${song.duration||''}</td>
                <td><button class='btn btn-link p-0 btn-heart'><i class='bi bi-heart${window.likedSongs?.some(s => s.id === song.id) ? "-fill text-success" : ""}'></i></button></td>
              `;
              playlistTracks.appendChild(tr);
            });
            playlistTracks.querySelectorAll('.btn-heart').forEach((btn, i) => {
              btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                icon.classList.toggle('bi-heart-fill');
                icon.classList.toggle('bi-heart');
                icon.classList.toggle('text-success');
                if (icon.classList.contains('bi-heart-fill')) {
                  const song = allSongs[i];
                  if (!window.likedSongs.some(s => s.id === song.id)) {
                    window.likedSongs.push(song);
                    window.localStorage.setItem('likedSongs', JSON.stringify(window.likedSongs));
                    if (window.renderLikedSongs) window.renderLikedSongs();
                  }
                } else {
                  const song = allSongs[i];
                  window.likedSongs = window.likedSongs.filter(s => s.id !== song.id);
                  window.localStorage.setItem('likedSongs', JSON.stringify(window.likedSongs));
                  if (window.renderLikedSongs) window.renderLikedSongs();
                }
              });
            });
            if (playlistPlayBtn) {
              playlistPlayBtn.onclick = function() {
                if (window.loadAndPlaySong && allSongs.length > 0) {
                  window.loadAndPlaySong(allSongs[0], allSongs, 0);
                }
              };
            }
            window.showSection('genre-artists-section');
          }
        });
      });
    }, 500);

    // --- ARTISTI CAROUSEL INTERATTIVO ---
    // Funzione per mostrare solo una sezione principale
    function showSection(sectionId) {
        const sectionIds = [
            'home-section',
            'search-section',
            'library-section',
            'genre-artists-section',
            'liked-songs-section',
            'artist-detail-section'
        ];
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('d-none');
        });
        const active = document.getElementById(sectionId);
        if (active) active.classList.remove('d-none');
    }

    // Funzione per abilitare il click su tutte le immagini artista del carousel
    function enableCarouselArtistClicks() {
        // Porta le frecce sopra le immagini solo al passaggio del mouse
        const carousel = document.getElementById('myCarousel');
        if (carousel) {
            const prevBtn = carousel.querySelector('.carousel-control-prev');
            const nextBtn = carousel.querySelector('.carousel-control-next');
            // Porta le frecce sopra solo quando il mouse è sopra la freccia
            [prevBtn, nextBtn].forEach(btn => {
                if (btn) {
                    btn.style.zIndex = 2;
                    btn.addEventListener('mouseenter', () => btn.style.zIndex = 10);
                    btn.addEventListener('mouseleave', () => btn.style.zIndex = 2);
                }
            });
        }
        // Rendi cliccabili tutte le immagini artista, anche quelle parzialmente coperte
        document.querySelectorAll('.carousel .card img.rounded-circle').forEach(img => {
            img.style.cursor = 'pointer';
            img.style.pointerEvents = 'auto'; // Forza il click anche se parzialmente coperto
            img.addEventListener('click', function (e) {
                e.stopPropagation(); // Previene che il click venga bloccato da altri overlay
                // Ricava il nome artista dalla card
                const card = img.closest('.card');
                let artistName = '';
                if (card) {
                    const title = card.querySelector('.card-title');
                    if (title) artistName = title.textContent.trim();
                }
                if (artistName) {
                    renderArtistDetail(artistName);
                }
                showSection('artist-detail-section');
            });
        });
    }

    // Funzione per popolare la sezione dettaglio artista
    function renderArtistDetail(artistName) {
        const artistDetailSection = document.getElementById('artist-detail-section');
        const artistDetailContent = document.getElementById('artist-detail-content');
        if (!artistDetailSection || !artistDetailContent) return;

        // Trova tutti gli album dell'artista
        const artistAlbums = (window.allAlbums || window.allAvailableSongs ? (window.allAlbums || []).filter(album => album.artist && album.artist.toLowerCase() === artistName.toLowerCase()) : []);
        // Trova tutte le canzoni dell'artista
        const artistSongs = (window.allAvailableSongs || []).filter(song => song.artist && song.artist.toLowerCase() === artistName.toLowerCase());

        // Se non ci sono dati, mostra messaggio
        if (artistAlbums.length === 0 && artistSongs.length === 0) {
            artistDetailContent.innerHTML = `<div class='alert alert-warning text-dark'>Nessun dato disponibile per l'artista selezionato.</div>`;
            return;
        }

        // Header artista
        let artistImg = '';
        if (artistAlbums.length > 0 && artistAlbums[0].albumArt) {
            artistImg = `<img src='${artistAlbums[0].albumArt}' alt='${artistName}' class='rounded-circle mb-3' style='width:140px;height:140px;object-fit:cover;'>`;
        } else if (artistSongs.length > 0 && artistSongs[0].albumArt) {
            artistImg = `<img src='${artistSongs[0].albumArt}' alt='${artistName}' class='rounded-circle mb-3' style='width:140px;height:140px;object-fit:cover;'>`;
        }
        let html = `
            <div class='text-center mb-4'>
                ${artistImg}
                <h2 class='fw-bold mb-1'>${artistName}</h2>
                <div class='text-muted mb-2'>Artista</div>
            </div>
        `;

        // Album
        if (artistAlbums.length > 0) {
            html += `<h4 class='mt-4 mb-3'>Album</h4><div class='row g-3 mb-4'>`;
            artistAlbums.forEach(album => {
                html += `
                    <div class='col-12 col-md-6 col-lg-4'>
                        <div class='card bg-dark text-white h-100'>
                            <img src='${album.albumArt}' class='card-img-top' alt='${album.title}' style='height:180px;object-fit:cover;'>
                            <div class='card-body'>
                                <h5 class='card-title mb-1'>${album.title}</h5>
                                <div class='text-muted small mb-1'>${album.year || ''} • ${album.genre || ''}</div>
                                <div class='text-muted small'>${album.songs.length} brani</div>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        }

        // Brani
        if (artistSongs.length > 0) {
            html += `<h4 class='mt-4 mb-3'>Brani</h4><div class='table-responsive'><table class='table table-dark table-borderless align-middle'><thead><tr><th>#</th><th>Titolo</th><th>Album</th><th>Durata</th></tr></thead><tbody>`;
            artistSongs.forEach((song, i) => {
                html += `<tr><td>${i+1}</td><td>${song.title}</td><td>${song.albumTitle || ''}</td><td>${song.duration || ''}</td></tr>`;
            });
            html += `</tbody></table></div>`;
        }

        artistDetailContent.innerHTML = html;
    }

    // Rendi disponibili i dati globalmente se non già fatto
    if (!window.allAlbums) window.allAlbums = allAlbums;
    if (!window.allAvailableSongs) window.allAvailableSongs = allAvailableSongs;

    setTimeout(enableCarouselArtistClicks, 500);

    // --- IMPOSTAZIONI: struttura dati e rendering dinamico ---
    // Stato persistente delle impostazioni (simulato con localStorage)
    function loadSettingsState() {
      const saved = localStorage.getItem('settingsState');
      if (saved) return JSON.parse(saved);
      // Stato iniziale: copia i currentValue dalle impostazioni
      const state = {};
      window.SETTINGS_DATA.forEach(cat => {
        cat.settings.forEach(s => {
          if ('currentValue' in s) state[s.id] = s.currentValue;
        });
      });
      return state;
    }
    function saveSettingsState(state) {
      localStorage.setItem('settingsState', JSON.stringify(state));
    }
    let settingsState = loadSettingsState();

    // Rendering dinamico della UI impostazioni
    function renderSettingsUI() {
      const container = document.getElementById('settings-categories-container');
      if (!container) return;
      container.innerHTML = '';
      window.SETTINGS_DATA.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'mb-5';
        catDiv.innerHTML = `
          <h3 class='mb-2'><i class='bi ${cat.icon} me-2'></i>${cat.categoryName}</h3>
          <div class='text-muted mb-3'>${cat.description}</div>
        `;
        cat.settings.forEach(setting => {
          const row = document.createElement('div');
          row.className = 'mb-3';
          let control = '';
          // --- UI per tipo ---
          if (setting.type === 'link') {
            control = `<a href='#' class='settings-link' data-id='${setting.id}' data-url='${setting.url||''}'>${setting.label}: <span class='text-success'>${setting.value||''}</span></a>`;
          } else if (setting.type === 'dropdown') {
            control = `<label class='form-label mb-1'>${setting.label}</label><select class='form-select settings-dropdown' data-id='${setting.id}'>${setting.options.map(opt => `<option value='${opt}' ${settingsState[setting.id]===opt?'selected':''}>${opt}</option>`).join('')}</select>`;
          } else if (setting.type === 'toggle') {
            control = `<label class='form-label mb-1 d-flex align-items-center'><span>${setting.label}</span><div class='form-check form-switch ms-3'><input class='form-check-input settings-toggle' type='checkbox' data-id='${setting.id}' ${settingsState[setting.id]?'checked':''}></div></label>`;
          } else if (setting.type === 'slider') {
            control = `<label class='form-label mb-1'>${setting.label}</label><input type='range' class='form-range settings-slider' data-id='${setting.id}' min='${setting.min}' max='${setting.max}' step='${setting.step}' value='${settingsState[setting.id]||setting.min}'><span class='ms-2'>${settingsState[setting.id]||setting.min}s</span>`;
          } else if (setting.type === 'button') {
            control = `<button class='btn btn-outline-primary settings-btn' data-id='${setting.id}'>${setting.label}</button>`;
          } else if (setting.type === 'display') {
            control = `<div class='text-muted'><span class='fw-bold'>${setting.label}:</span> ${setting.value}</div>`;
          }
          if (setting.description && setting.type !== 'display') {
            control += `<div class='text-muted small mt-1'>${setting.description}</div>`;
          }
          row.innerHTML = control;
          catDiv.appendChild(row);
        });
        container.appendChild(catDiv);
      });
    }

    // Gestione eventi UI impostazioni
    function handleSettingsEvents() {
      const container = document.getElementById('settings-categories-container');
      if (!container) return;
      // Link
      container.querySelectorAll('.settings-link').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const url = this.dataset.url;
          if (url) window.open(url, '_blank');
        });
      });
      // Dropdown
      container.querySelectorAll('.settings-dropdown').forEach(sel => {
        sel.addEventListener('change', function() {
          const id = this.dataset.id;
          settingsState[id] = this.value;
          saveSettingsState(settingsState);
          renderSettingsUI();
          handleSettingsEvents();
        });
      });
      // Toggle
      container.querySelectorAll('.settings-toggle').forEach(tog => {
        tog.addEventListener('change', function() {
          const id = this.dataset.id;
          settingsState[id] = this.checked;
          saveSettingsState(settingsState);
          renderSettingsUI();
          handleSettingsEvents();
        });
      });
      // Slider
      container.querySelectorAll('.settings-slider').forEach(slider => {
        slider.addEventListener('input', function() {
          const id = this.dataset.id;
          settingsState[id] = parseInt(this.value);
          saveSettingsState(settingsState);
          renderSettingsUI();
          handleSettingsEvents();
        });
      });
      // Button
      container.querySelectorAll('.settings-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.dataset.id;
          if (id === 'changePassword') {
            alert('Funzione cambio password simulata!');
          } else if (id === 'connectToDevice') {
            alert('Simulazione: mostra lista dispositivi Spotify Connect.');
          } else if (id === 'clearCache') {
            if (confirm('Vuoi davvero svuotare la cache?')) {
              alert('Cache svuotata!');
              // Simula azione
            }
          }
        });
      });
    }

    // Mostra la sezione impostazioni e renderizza la UI
    function showSettingsSection() {
      showSection('settings-section');
      renderSettingsUI();
      handleSettingsEvents();
    }

    // Collega la voce "Impostazioni" del menu al click
    document.querySelectorAll('a.dropdown-item').forEach(item => {
      if (item.textContent.trim().toLowerCase() === 'impostazioni') {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          showSettingsSection();
        });
      }
    });

    // --- PROFILO: rendering dinamico e collegamento menu ---
    function renderProfileUI() {
      const container = document.getElementById('profile-content-container');
      if (!container || !window.PROFILE_DATA) return;
      const data = window.PROFILE_DATA.profilePage.sections;
      container.innerHTML = '';
      data.forEach(section => {
        if (section.type === 'profileHeader') {
          const d = section.data;
          container.innerHTML += `
            <div class='d-flex align-items-center mb-4'>
              <img src='${d.userAvatarUrl}' class='rounded-circle shadow' style='width:110px;height:110px;object-fit:cover;'>
              <div class='ms-4'>
                <h2 class='fw-bold mb-1'>${d.userName}</h2>
                <div class='text-muted mb-1'>${d.userHandle || ''}</div>
                <div class='d-flex align-items-center mb-2'>
                  <span class='me-3'><b>${d.followersCount}</b> follower</span>
                  <span class='me-3'><b>${d.followingCount}</b> seguiti</span>
                  ${d.isPremium ? `<span class='badge bg-success'>Premium</span>` : ''}
                </div>
                <div class='d-flex gap-2'>
                  ${d.actionButtons.map(btn => `<button class='btn btn-outline-light btn-sm profile-action-btn' data-action='${btn.action}'><i class='bi ${btn.icon} me-1'></i>${btn.label}</button>`).join('')}
                </div>
              </div>
            </div>
          `;
        } else if (section.type === 'carouselSection') {
          container.innerHTML += `
            <h4 class='mt-4 mb-2'>${section.title}</h4>
            <div class='text-muted mb-2'>${section.description}</div>
            <div class='d-flex overflow-auto mb-3 gap-3' style='scrollbar-width:thin;'>
              ${section.data.map(art => `
                <div class='text-center'>
                  <img src='${art.imageUrl}' class='rounded-circle mb-2 shadow' style='width:80px;height:80px;object-fit:cover;'>
                  <div class='small fw-bold'>${art.name}</div>
                </div>
              `).join('')}
            </div>
            <button class='btn btn-link text-success p-0 mb-3 profile-viewall-btn' data-action='${section.viewAllAction}'>Mostra tutti</button>
          `;
        } else if (section.type === 'listSection') {
          container.innerHTML += `
            <h4 class='mt-4 mb-2'>${section.title}</h4>
            <div class='text-muted mb-2'>${section.description}</div>
            <ul class='list-group list-group-flush mb-3'>
              ${section.data.map(song => `
                <li class='list-group-item bg-dark text-white d-flex align-items-center justify-content-between'>
                  <div class='d-flex align-items-center'>
                    <img src='${song.albumArt}' class='rounded me-2' style='width:40px;height:40px;object-fit:cover;'>
                    <div>
                      <div class='fw-bold'>${song.title}</div>
                      <div class='text-muted small'>${song.artist}</div>
                    </div>
                  </div>
                  <span class='text-muted small'>${song.duration}</span>
                </li>
              `).join('')}
            </ul>
          `;
        } else if (section.type === 'gridSection') {
          // Griglia playlist pubbliche o following
          container.innerHTML += `
            <h4 class='mt-4 mb-2'>${section.title}</h4>
            <div class='text-muted mb-2'>${section.description}</div>
            <div class='row row-cols-2 row-cols-md-3 g-3 mb-3'>
              ${section.data.map(item => `
                <div class='col'>
                  <div class='card bg-dark text-white h-100 text-center p-2 shadow-sm'>
                    <img src='${item.coverUrl || item.imageUrl}' class='${item.type==='user'?'rounded-circle':'rounded'} mx-auto mb-2' style='width:70px;height:70px;object-fit:cover;'>
                    <div class='fw-bold'>${item.title || item.name}</div>
                    <div class='text-muted small'>${item.description || ''}</div>
                  </div>
                </div>
              `).join('')}
            </div>
            ${section.createPlaylistAction ? `<button id='profile-create-playlist-btn' class='btn btn-success btn-sm profile-create-btn' data-action='${section.createPlaylistAction}'>Crea Playlist</button>` : ''}
            ${section.viewAllAction ? `<button class='btn btn-link text-success p-0 mb-3 profile-viewall-btn' data-action='${section.viewAllAction}'>Mostra tutti</button>` : ''}
          `;
        }
      });
      // Collega il bottone "Crea Playlist" del profilo alla funzione già esistente
      const createBtn = document.getElementById('profile-create-playlist-btn');
      if (createBtn && typeof showCreatePlaylistSection === 'function') {
        createBtn.addEventListener('click', function(e) {
          e.preventDefault();
          showCreatePlaylistSection();
        });
      }
    }

    // Mostra la sezione profilo e renderizza la UI
    function showProfileSection() {
      showSection('profile-section');
      renderProfileUI();
    }

    // Collega la voce "Profilo" del menu al click
    document.querySelectorAll('a.dropdown-item').forEach(item => {
      if (item.textContent.trim().toLowerCase() === 'profilo') {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          showProfileSection();
        });
      }
    });
});