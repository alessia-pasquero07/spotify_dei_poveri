// Dati degli album disponibili (puoi espanderli ulteriormente)
const allAlbums = [
    {
        title: "Trap King",
        artist: "Sfera Ebbasta",
        genre: "Trap",
        year: 2018,
        albumArt: "img/sfera.jfif",
        songs: [
            { title: "Siamo Ricchi o No", audio: "audio/sfera-ebbasta-siamo-ricchi-o-no-feat-bili.mp3" },
            { title: "XDVR", audio: "audio/mix-trap.mp3" },
            { title: "Ciny", audio: "audio/sfera-ebbasta-siamo-ricchi-o-no-feat-bili.mp3" }
        ]
    },
    {
        title: "20",
        artist: "Capo Plaza",
        genre: "Trap",
        year: 2019,
        albumArt: "img/capo-plaza.jfif",
        songs: [
            { title: "Tesla", audio: "audio/mix-trap.mp3" },
            { title: "Non cambierò mai", audio: "audio/sfera-ebbasta-siamo-ricchi-o-no-feat-bili.mp3" }
        ]
    },
    {
        title: "÷ (Divide)",
        artist: "Ed Sheeran",
        genre: "Pop",
        year: 2017,
        albumArt: "img/pop.jfif",
        songs: [
            { title: "Shape of You", audio: "audio/pop.mp3" },
            { title: "Perfect", audio: "audio/rock.mp3" }
        ]
    },
    {
        title: "A Night at the Opera",
        artist: "Queen",
        genre: "Rock",
        year: 1975,
        albumArt: "img/rock.jfif",
        songs: [
            { title: "Bohemian Rhapsody", audio: "audio/rock.mp3" },
            { title: "We Will Rock You (Live)", audio: "audio/pop.mp3" }
        ]
    },
    {
        title: "Random Access Memories",
        artist: "Daft Punk",
        genre: "Elettronica",
        year: 2013,
        albumArt: "img/elettronica.jfif",
        songs: [
            { title: "Get Lucky", audio: "audio/elettronica.mp3" }
        ]
    },
    {
        title: "Kind of Blue",
        artist: "Miles Davis",
        genre: "Jazz",
        year: 1959,
        albumArt: "img/jazz.jfif",
        songs: [
            { title: "So What", audio: "audio/jazz.mp3" }
        ]
    },
    {
        title: "Symphony No. 5",
        artist: "Ludwig van Beethoven",
        genre: "Classica",
        year: 1808,
        albumArt: "img/classica.jfif",
        songs: [
            { title: "Allegro con brio", audio: "audio/classica.mp3" }
        ]
    },
    {
        title: "Rockstar",
        artist: "Post Malone",
        genre: "Trap",
        year: 2017,
        albumArt: "img/post-malone.jfif",
        songs: [
            { title: "Rockstar (feat. 21 Savage)", audio: "audio/mix-trap.mp3" },
            { title: "Circles", audio: "audio/pop.mp3" }
        ]
    }
];


// Array per le playlist dell'utente (vuoto all'inizio)
let userPlaylists = [];

// Variabili globali per lo stato del player
let currentAudioPlayer = new Audio();
let currentSongIndex = -1; // Indice della canzone corrente nella playlist attiva
let currentPlaylist = []; // La playlist attualmente in riproduzione (array di oggetti canzone)
let lastVisitedGenre = ''; // Per tornare alla pagina degli artisti dopo aver visto le canzoni

// --- Selezioni degli elementi HTML ---
const sections = document.querySelectorAll('.page-content-wrapper section');
const sidebarTogglers = document.querySelectorAll('.sidebar-toggler');
const mainSidebar = document.getElementById('main-sidebar');

// Elementi del player musicale
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitleDisplay = document.getElementById('song-title');
const artistNameDisplay = document.getElementById('artist-name');
const albumArtDisplay = document.getElementById('album-art-player');
const progressBar = document.getElementById('progress-bar');
const timeElapsedDisplay = document.getElementById('time-elapsed');
const timeDurationDisplay = document.getElementById('time-duration');
const progressBarWrapper = document.getElementById('progress-bar-wrapper');

// Elementi della sezione Crea Playlist
const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playlistNameInput = document.getElementById('playlist-name-input');
const songsListForPlaylist = document.getElementById('songs-list-for-playlist');
const savePlaylistBtn = document.getElementById('save-playlist-btn');
const userPlaylistsContainer = document.getElementById('user-playlists-container');

// Elementi per la visualizzazione degli artisti per genere
const genreArtistsSection = document.getElementById('genre-artists-section');
const currentGenreTitle = document.getElementById('current-genre-title');
const artistsListContainer = document.getElementById('artists-list-container');
const backToHomeBtn = document.getElementById('backToHomeBtn');

// Elementi per la visualizzazione delle canzoni dell'artista
const artistSongsSection = document.getElementById('artist-songs-section');
const currentArtistTitle = document.getElementById('current-artist-title');
const artistSongsList = document.getElementById('artist-songs-list');
const backToArtistsBtn = document.getElementById('backToArtistsBtn');


// --- Funzioni di Utility ---

/**
 * Mostra una sezione specifica nascondendo tutte le altre.
 * @param {string} sectionId - L'ID della sezione da mostrare.
 */
window.showSection = function(sectionId) {
    sections.forEach(section => {
        section.classList.add('d-none');
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('d-none');
    } else {
        console.error(`Sezione con ID '${sectionId}' non trovata.`);
    }

    // Chiudi la sidebar se è aperta su schermi piccoli (offcanvas di Bootstrap)
    if (mainSidebar && mainSidebar.classList.contains('show')) {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(mainSidebar);
        if (bsOffcanvas) {
            bsOffcanvas.hide();
        }
    }
};

/**
 * Carica e riproduce una canzone.
 * @param {object} song - L'oggetto canzone da riprodurre.
 * @param {array} playlist - L'array di canzoni che costituisce la playlist corrente.
 * @param {number} index - L'indice della canzone nella playlist.
 */
function loadAndPlaySong(song, playlist, index) {
    if (!song || !song.audio) {
        console.error("Tentativo di riprodurre una canzone non valida:", song);
        return;
    }
    currentPlaylist = playlist;
    currentSongIndex = index;

    currentAudioPlayer.src = song.audio;
    songTitleDisplay.textContent = song.title || "Titolo Sconosciuto";
    artistNameDisplay.textContent = song.artist || "Artista Sconosciuto";
    albumArtDisplay.src = song.albumArt || "https://via.placeholder.com/60/777777?text=NO+ART"; // Placeholder per album art
    currentAudioPlayer.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
}

/**
 * Riproduce la canzone successiva nella playlist corrente.
 */
function playNextSong() {
    if (currentPlaylist.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
        loadAndPlaySong(currentPlaylist[currentSongIndex], currentPlaylist, currentSongIndex);
    } else {
        console.warn("Nessuna playlist attiva per riprodurre il prossimo brano.");
    }
}

/**
 * Riproduce la canzone precedente nella playlist corrente.
 */
function playPreviousSong() {
    if (currentPlaylist.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        loadAndPlaySong(currentPlaylist[currentSongIndex], currentPlaylist, currentSongIndex);
    } else {
        console.warn("Nessuna playlist attiva per riprodurre il brano precedente.");
    }
}

/**
 * Popola la lista delle canzoni disponibili nella sezione "Crea Playlist".
 */
function populateSongsForPlaylist() {
    if (!songsListForPlaylist) return;
    songsListForPlaylist.innerHTML = ''; // Pulisci la lista

    if (allAlbums.length === 0) {
        songsListForPlaylist.innerHTML = '<p class="text-muted ms-3">Nessun album disponibile per creare playlist.</p>';
        return;
    }

    allAlbums.forEach(album => {
        album.songs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'bg-dark', 'text-white', 'd-flex', 'align-items-center');
            listItem.innerHTML = `
                <input type="checkbox" class="form-check-input me-3"
                    data-album-art="${album.albumArt}"
                    data-album-title="${album.title}"
                    data-artist="${album.artist}"
                    data-song-title="${song.title}"
                    data-song-audio="${song.audio}">
                <img src="${album.albumArt}" class="rounded me-2" style="width: 40px; height: 40px; object-fit: cover;">
                <span>${song.title} - ${album.artist} (${album.title})</span>
            `;
            songsListForPlaylist.appendChild(listItem);
        });
    });
}

/**
 * Renderizza le playlist create dall'utente nella sezione Libreria.
 */
function renderUserPlaylists() {
    if (!userPlaylistsContainer) return;
    userPlaylistsContainer.innerHTML = ''; // Pulisci il container

    if (userPlaylists.length === 0) {
        userPlaylistsContainer.innerHTML = '<p class="text-muted ms-3">Nessuna playlist creata. Clicca "Crea playlist" per iniziare!</p>';
        return;
    }

    userPlaylists.forEach((playlist, index) => {
        const playlistCard = document.createElement('div');
        playlistCard.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-3');
        // Usa la copertina del primo brano della playlist o un placeholder
        const coverArt = playlist.songs.length > 0 ? playlist.songs[0].albumArt : 'https://via.placeholder.com/150/0000FF/FFFFFF?text=PLAYLIST';
        playlistCard.innerHTML = `
            <div class="card bg-dark text-white h-100 playlist-card" data-playlist-index="${index}">
                <div class="card-body d-flex align-items-center">
                    <img src="${coverArt}" class="rounded me-3" alt="Playlist Cover" style="width: 80px; height: 80px; object-fit: cover;">
                    <div>
                        <h5 class="card-title mb-0">${playlist.name}</h5>
                        <small class="text-muted">${playlist.songs.length} brani</small>
                    </div>
                    <button class="btn btn-sm btn-outline-light ms-auto delete-playlist-btn" data-playlist-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
        userPlaylistsContainer.appendChild(playlistCard);
    });

    // Aggiungi listener per la riproduzione delle playlist
    document.querySelectorAll('.playlist-card').forEach(card => {
        card.addEventListener('click', function(event) {
            // Se il click è sul bottone "delete", non riprodurre la playlist
            if (event.target.closest('.delete-playlist-btn')) {
                return;
            }
            const playlistIndex = parseInt(this.dataset.playlistIndex);
            if (!isNaN(playlistIndex) && playlistIndex >= 0 && playlistIndex < userPlaylists.length) {
                const playlistToPlay = userPlaylists[playlistIndex].songs;
                if (playlistToPlay.length > 0) {
                    // Costruisci gli oggetti canzone con tutte le proprietà necessarie per il player
                    const playablePlaylist = playlistToPlay.map(song => ({
                        title: song.title,
                        audio: song.audio,
                        artist: song.artist,
                        album: song.album,
                        albumArt: song.albumArt
                    }));
                    loadAndPlaySong(playablePlaylist[0], playablePlaylist, 0);
                } else {
                    console.log("Playlist vuota, impossibile riprodurre.");
                }
            }
        });
    });

    // Aggiungi listener per eliminare le playlist
    document.querySelectorAll('.delete-playlist-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita che il click sul bottone elimini riproduca la playlist
            const playlistIndex = parseInt(this.dataset.playlistIndex);
            if (confirm("Sei sicuro di voler eliminare questa playlist?")) {
                userPlaylists.splice(playlistIndex, 1);
                renderUserPlaylists(); // Ricarica le playlist
            }
        });
    });
}

/**
 * Mostra gli artisti appartenenti a un genere specifico.
 * @param {string} genre - Il genere selezionato (es. 'Pop', 'Rock').
 */
function showArtistsByGenre(genre) {
    window.showSection('genre-artists-section'); // Mostra la sezione corretta
    lastVisitedGenre = genre; // Salva il genere per il ritorno

    if (currentGenreTitle) {
        currentGenreTitle.textContent = genre;
    }

    const artistsInGenre = new Set();
    const albumsInGenre = allAlbums.filter(album => album.genre === genre);

    albumsInGenre.forEach(album => {
        artistsInGenre.add(album.artist);
    });

    if (artistsListContainer) {
        artistsListContainer.innerHTML = ''; // Pulisci il container esistente

        if (artistsInGenre.size === 0) {
            artistsListContainer.innerHTML = '<p class="text-muted ms-3">Nessun artista trovato per questo genere.</p>';
            return;
        }

        artistsInGenre.forEach(artistName => {
            const artistAlbum = albumsInGenre.find(album => album.artist === artistName);
            const albumArt = artistAlbum ? artistAlbum.albumArt : 'https://via.placeholder.com/150/555555?text=ARTIST';

            const colDiv = document.createElement('div');
            colDiv.classList.add('col');
            colDiv.innerHTML = `
                <div class="card bg-dark text-white p-3 shadow-sm artist-card" data-artist="${artistName}">
                    <div class="d-flex flex-column align-items-center text-center">
                        <img src="${albumArt}" class="rounded-circle mb-3" alt="${artistName}"
                            style="width: 100px; height: 100px; object-fit: cover;">
                        <h5 class="card-title mb-0">${artistName}</h5>
                    </div>
                </div>
            `;
            artistsListContainer.appendChild(colDiv);
        });

        // Aggiungi event listener a queste nuove card degli artisti
        document.querySelectorAll('.artist-card').forEach(card => {
            card.addEventListener('click', function() {
                const artistName = this.dataset.artist;
                showSongsByArtist(artistName);
            });
        });
    }
}

/**
 * Mostra tutte le canzoni di un artista specifico.
 * @param {string} artistName - Il nome dell'artista selezionato.
 */
function showSongsByArtist(artistName) {
    window.showSection('artist-songs-section'); // Mostra la sezione corretta

    if (currentArtistTitle) {
        currentArtistTitle.textContent = artistName;
    }

    const songsOfArtist = [];
    allAlbums.forEach(album => {
        if (album.artist === artistName) {
            album.songs.forEach(song => {
                songsOfArtist.push({
                    title: song.title,
                    audio: song.audio,
                    albumArt: album.albumArt,
                    artist: artistName,
                    album: album.title
                });
            });
        }
    });

    if (artistSongsList) {
        artistSongsList.innerHTML = ''; // Pulisci il container esistente

        if (songsOfArtist.length === 0) {
            artistSongsList.innerHTML = '<p class="text-muted ms-3">Nessuna canzone trovata per questo artista.</p>';
            return;
        }

        songsOfArtist.forEach((song, index) => { // Aggiungi index per riproduzione playlist
            const songItem = document.createElement('div');
            songItem.classList.add('list-group-item', 'list-group-item-action', 'bg-dark', 'text-white', 'd-flex', 'align-items-center', 'py-3');
            songItem.innerHTML = `
                <img src="${song.albumArt}" class="rounded me-3" alt="Album Art"
                    style="width: 50px; height: 50px; object-fit: cover;">
                <div class="flex-grow-1">
                    <h6 class="mb-0">${song.title}</h6>
                    <small class="text-muted">${song.artist} - ${song.album}</small>
                </div>
                <button class="btn btn-sm btn-outline-light ms-auto play-song-btn" data-song-index="${index}">
                    <i class="bi bi-play-fill"></i>
                </button>
            `;
            artistSongsList.appendChild(songItem);
        });

        // Aggiungi event listener ai pulsanti play delle canzoni
        document.querySelectorAll('.play-song-btn').forEach(btn => {
            btn.addEventListener('click', function(event) {
                event.stopPropagation();
                const songIndex = parseInt(this.dataset.songIndex);
                if (!isNaN(songIndex) && songIndex >= 0 && songIndex < songsOfArtist.length) {
                    loadAndPlaySong(songsOfArtist[songIndex], songsOfArtist, songIndex);
                }
            });
        });
    }
}


// --- Inizializzazione e Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // Inizialmente mostra la sezione Home
    window.showSection('home-section');

    // Listener per i toggler della sidebar (sezione HOME, SEARCH, LIBRARY)
    sidebarTogglers.forEach(toggler => {
        toggler.addEventListener('click', function() {
            const targetSection = this.dataset.targetSection;
            if (targetSection) {
                // Rimuovi la classe 'active' da tutti i nav-link
                document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                // Aggiungi la classe 'active' solo al link cliccato
                this.classList.add('active');

                window.showSection(targetSection);

                // Se la sezione è 'library-section', renderizza le playlist
                if (targetSection === 'library-section') {
                    renderUserPlaylists();
                }
            }
        });
    });

    // Listener per la creazione di playlist
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', () => {
            window.showSection('create-playlist-section');
            // Rimuovi la classe 'active' da tutti i nav-link della sidebar
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            populateSongsForPlaylist(); // Popola la lista canzoni quando si apre la sezione
        });
    }

    if (savePlaylistBtn) {
        savePlaylistBtn.addEventListener('click', () => {
            const playlistName = playlistNameInput.value.trim();
            if (playlistName === "") {
                alert("Per favore, inserisci un nome per la playlist.");
                return;
            }

            const selectedSongs = [];
            document.querySelectorAll('#songs-list-for-playlist input[type="checkbox"]:checked').forEach(checkbox => {
                selectedSongs.push({
                    title: checkbox.dataset.songTitle,
                    audio: checkbox.dataset.songAudio,
                    artist: checkbox.dataset.artist,
                    album: checkbox.dataset.albumTitle,
                    albumArt: checkbox.dataset.albumArt
                });
            });

            if (selectedSongs.length === 0) {
                alert("Per favore, seleziona almeno una canzone per la playlist.");
                return;
            }

            userPlaylists.push({
                name: playlistName,
                songs: selectedSongs
            });

            // Resetta il form e torna alla libreria
            playlistNameInput.value = '';
            document.querySelectorAll('#songs-list-for-playlist input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            window.showSection('library-section');
            renderUserPlaylists(); // Aggiorna la visualizzazione delle playlist
            alert(`Playlist "${playlistName}" salvata con successo!`);

            // Imposta il link della libreria come attivo dopo aver salvato la playlist
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                if (link.dataset.targetSection === 'library-section') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }

    // Listener per i controlli del player
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (currentAudioPlayer.paused) {
                currentAudioPlayer.play();
                playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
            } else {
                currentAudioPlayer.pause();
                playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', playPreviousSong);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNextSong);
    }

    // Aggiornamento della progress bar
    if (currentAudioPlayer && progressBar) {
        currentAudioPlayer.addEventListener('timeupdate', () => {
            const progress = (currentAudioPlayer.currentTime / currentAudioPlayer.duration) * 100;
            progressBar.style.width = `${progress}%`;

            const formatTime = (seconds) => {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
            };

            if (timeElapsedDisplay) timeElapsedDisplay.textContent = formatTime(currentAudioPlayer.currentTime);
            if (timeDurationDisplay && !isNaN(currentAudioPlayer.duration)) {
                timeDurationDisplay.textContent = formatTime(currentAudioPlayer.duration);
            }
        });

        currentAudioPlayer.addEventListener('ended', playNextSong); // Riproduci il prossimo brano al termine

        // Gestione click sulla barra di progresso
        if (progressBarWrapper) {
            progressBarWrapper.addEventListener('click', (e) => {
                const clickX = e.offsetX;
                const width = progressBarWrapper.clientWidth;
                const duration = currentAudioPlayer.duration;
                if (!isNaN(duration)) {
                    currentAudioPlayer.currentTime = (clickX / width) * duration;
                }
            });
        }
    }


    // Listener per le card dei Mix per Genere nella Home
    document.querySelectorAll('.genre-mix-card').forEach(card => {
        card.addEventListener('click', function () {
            const genre = this.dataset.genre;
            showArtistsByGenre(genre);
        });
    });

    // Listener per il pulsante "Torna alla Home" (dalla lista artisti)
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', function() {
            window.showSection('home-section');
            // Riattiva il link Home nella sidebar
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                if (link.dataset.targetSection === 'home-section') {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }

    // Listener per il pulsante "Torna agli Artisti" (dalla lista canzoni)
    if (backToArtistsBtn) {
        backToArtistsBtn.addEventListener('click', function() {
            if (lastVisitedGenre) {
                showArtistsByGenre(lastVisitedGenre);
            } else {
                // Se per qualche motivo lastVisitedGenre non è impostato, torna alla Home
                window.showSection('home-section');
                document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                    if (link.dataset.targetSection === 'home-section') {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }
});