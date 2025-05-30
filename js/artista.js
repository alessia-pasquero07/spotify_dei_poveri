// js/artista.js

// Nota: allAlbums è accessibile qui perché dati.js è caricato prima in index.html

// Array per le playlist dell'utente (vuoto all'inizio)
let userPlaylists = [];

// Variabili globali per lo stato del player
let currentAudioPlayer = new Audio();
let currentSongIndex = -1; // Indice della canzone corrente nella playlist attiva
let currentPlaylist = []; // La playlist attualmente in riproduzione (array di oggetti canzone)

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


/**
 * Mostra una sezione specifica nascondendo tutte le altre.
 * Questa funzione è definita globalmente in window.showSection per essere accessibile da altri script.
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
 * Questa funzione è definita globalmente in window.loadAndPlaySong per essere accessibile da altri script.
 * @param {object} song - L'oggetto canzone da riprodurre.
 * @param {array} playlist - L'array di canzoni che costituisce la playlist corrente.
 * @param {number} index - L'indice della canzone nella playlist.
 */
window.loadAndPlaySong = function(song, playlist, index) {
    console.log("Tentativo di caricare e riprodurre la canzone:", song);

    if (!song || !song.audioSrc) {
        console.error("Tentativo di riprodurre una canzone non valida o senza audioSrc:", song);
        return;
    }
    currentPlaylist = playlist;
    currentSongIndex = index;

    currentAudioPlayer.src = song.audioSrc;
    songTitleDisplay.textContent = song.title || "Titolo Sconosciuto";
    artistNameDisplay.textContent = song.artist || "Artista Sconosciuto";
    albumArtDisplay.src = song.albumArt || "https://via.placeholder.com/60/777777?text=NO+ART";
    currentAudioPlayer.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
}

/**
 * Riproduce la canzone successiva nella playlist corrente.
 */
function playNextSong() {
    if (currentPlaylist.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
        window.loadAndPlaySong(currentPlaylist[currentSongIndex], currentPlaylist, currentSongIndex);
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
        window.loadAndPlaySong(currentPlaylist[currentSongIndex], currentPlaylist, currentSongIndex);
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
                    data-song-audio-src="${song.audioSrc}">
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
    userPlaylistsContainer.innerHTML = '';

    if (userPlaylists.length === 0) {
        userPlaylistsContainer.innerHTML = '<p class="text-muted ms-3">Nessuna playlist creata. Clicca "Crea playlist" per iniziare!</p>';
        return;
    }

    userPlaylists.forEach((playlist, index) => {
        const playlistCard = document.createElement('div');
        playlistCard.classList.add('col-12', 'col-md-6', 'col-lg-4', 'mb-3');
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

    document.querySelectorAll('.playlist-card').forEach(card => {
        card.addEventListener('click', function(event) {
            if (event.target.closest('.delete-playlist-btn')) {
                return;
            }
            const playlistIndex = parseInt(this.dataset.playlistIndex);
            if (!isNaN(playlistIndex) && playlistIndex >= 0 && playlistIndex < userPlaylists.length) {
                const playlistToPlay = userPlaylists[playlistIndex].songs;
                if (playlistToPlay.length > 0) {
                    const playablePlaylist = playlistToPlay.map(song => ({
                        title: song.title,
                        audioSrc: song.audioSrc,
                        artist: song.artist,
                        album: song.album,
                        albumArt: song.albumArt
                    }));
                    window.loadAndPlaySong(playablePlaylist[0], playablePlaylist, 0);
                } else {
                    console.log("Playlist vuota, impossibile riprodurre.");
                }
            }
        });
    });

    document.querySelectorAll('.delete-playlist-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const playlistIndex = parseInt(this.dataset.playlistIndex);
            if (confirm("Sei sicuro di voler eliminare questa playlist?")) {
                userPlaylists.splice(playlistIndex, 1);
                renderUserPlaylists();
            }
        });
    });
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
                document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                window.showSection(targetSection);

                if (targetSection === 'library-section') {
                    renderUserPlaylists();
                }
                if (targetSection === 'create-playlist-section') {
                    populateSongsForPlaylist();
                }
            }
        });
    });

    // Listener per la creazione di playlist (pulsante "Crea Playlist" nella sidebar)
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', () => {
            window.showSection('create-playlist-section');
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            populateSongsForPlaylist();
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
                    audioSrc: checkbox.dataset.songAudioSrc,
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

            playlistNameInput.value = '';
            document.querySelectorAll('#songs-list-for-playlist input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            window.showSection('library-section');
            renderUserPlaylists();
            alert(`Playlist "${playlistName}" salvata con successo!`);

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

        currentAudioPlayer.addEventListener('ended', playNextSong);

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
});