// js/artista.js

// Nota: allAlbums è accessibile qui perché dati.js è caricato prima in index.html

// Array per le playlist dell'utente (vuoto all'inizio)
let userPlaylists = [];

// Variabili globali per lo stato del player
let currentAudioPlayer = new Audio();
let currentSongIndex = -1; // Indice della canzone corrente nella playlist attiva
let currentPlaylist = []; // La playlist attualmente in riproduzione (array di oggetti canzone)
let isPlaying = false; // <<< QUESTA È LA VARIABILE FONDAMENTALE CHE MANCAVA!

// --- Selezioni degli elementi HTML ---
const sections = document.querySelectorAll('.page-content-wrapper section');
const sidebarTogglers = document.querySelectorAll('.sidebar-toggler');
const mainSidebar = document.getElementById('main-sidebar');

// Elementi del player musicale (verificati con i tuoi ID)
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null; // SELEZIONE DELL'ICONA ALL'INTERNO DEL PULSANTE
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const songTitleDisplay = document.getElementById('song-title'); // Il tuo ID
const artistNameDisplay = document.getElementById('artist-name'); // Il tuo ID
const albumArtDisplay = document.getElementById('album-art-player'); // Il tuo ID
const progressBar = document.getElementById('progress-bar'); // Il tuo ID per la barra di riempimento
const timeElapsedDisplay = document.getElementById('time-elapsed'); // Il tuo ID
const timeDurationDisplay = document.getElementById('time-duration'); // Il tuo ID
const progressBarWrapper = document.getElementById('progress-bar-wrapper'); // Il tuo ID per il contenitore della progress bar

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
 * Funzione per formattare il tempo (es. 0:00)
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Carica e riproduce una canzone.
 * Questa funzione è definita globalmente in window.loadAndPlaySong per essere accessibile da altri script.
 * @param {object} song - L'oggetto canzone da riprodurre.
 * @param {array} playlist - L'array di canzoni che costituisce la playlist corrente.
 * @param {number} index - L'indice della canzone nella playlist.
 */
window.loadAndPlaySong = function(song, playlist, index) {
    console.log("Tentativo di caricare e riprodurre la canzone:", song);

    // Gestione di canzoni non valide
    if (!song || !song.audioSrc) {
        console.error("Tentativo di riprodurre una canzone non valida o senza audioSrc:", song);
        currentAudioPlayer.pause();
        isPlaying = false;
        if (playPauseIcon) {
            playPauseIcon.classList.remove('bi-pause-fill');
            playPauseIcon.classList.add('bi-play-fill');
        }
        if (songTitleDisplay) songTitleDisplay.textContent = "Nessuna canzone";
        if (artistNameDisplay) artistNameDisplay.textContent = "";
        if (albumArtDisplay) albumArtDisplay.src = "https://via.placeholder.com/60/777777?text=NO+ART";
        if (progressBar) progressBar.style.width = '0%';
        if (timeElapsedDisplay) timeElapsedDisplay.textContent = '0:00';
        if (timeDurationDisplay) timeDurationDisplay.textContent = '0:00';
        return;
    }

    currentPlaylist = playlist;
    currentSongIndex = index;

    currentAudioPlayer.src = song.audioSrc;

    // Aggiorna le info del player nella UI (controllando che gli elementi esistano)
    if (songTitleDisplay) songTitleDisplay.textContent = song.title || "Titolo Sconosciuto";
    if (artistNameDisplay) artistNameDisplay.textContent = song.artist || "Artista Sconosciuto";
    // Assicurati che albumArt sia un URL valido, altrimenti usa un placeholder
    if (albumArtDisplay) albumArtDisplay.src = (song.albumArt && song.albumArt.startsWith('http')) ? song.albumArt : "https://via.placeholder.com/60/777777?text=NO+ART";

    // Avvia la riproduzione e aggiorna l'icona
    isPlaying = true; // Imposta lo stato a true quando carichi una nuova canzone per riprodurla
    currentAudioPlayer.play()
        .then(() => {
            if (playPauseIcon) {
                playPauseIcon.classList.remove('bi-play-fill');
                playPauseIcon.classList.add('bi-pause-fill');
            }
        })
        .catch(error => {
            console.error("Errore durante la riproduzione automatica:", error);
            // Questo può accadere se il browser blocca la riproduzione automatica.
            // Lascia l'icona come "play" e l'utente dovrà cliccare.
            isPlaying = false;
            if (playPauseIcon) {
                playPauseIcon.classList.remove('bi-pause-fill');
                playPauseIcon.classList.add('bi-play-fill');
            }
        });
}

/**
 * Toglie/mette in pausa la riproduzione e aggiorna l'icona del pulsante.
 */
function togglePlayPause() {
    // Se non c'è una canzone caricata e in riproduzione, o una playlist, non fare nulla
    if (!currentAudioPlayer.src && currentPlaylist.length === 0) {
        console.warn("Nessuna canzone caricata e nessuna playlist attiva. Impossibile avviare/mettere in pausa.");
        return;
    }

    // Se c'è una playlist ma nessuna canzone caricata, prova a caricare la prima
    if (!currentAudioPlayer.src && currentPlaylist.length > 0) {
        window.loadAndPlaySong(currentPlaylist[0], currentPlaylist, 0);
        return; // loadAndPlaySong gestirà lo stato isPlaying e l'icona
    }

    isPlaying = !isPlaying; // Inverti lo stato
    if (playPauseIcon) { // Controlla se l'elemento icona esiste
        if (isPlaying) {
            playPauseIcon.classList.remove('bi-play-fill');
            playPauseIcon.classList.add('bi-pause-fill');
            currentAudioPlayer.play();
            console.log(`Riproduzione: ${songTitleDisplay ? songTitleDisplay.textContent : 'Sconosciuto'}`);
        } else {
            playPauseIcon.classList.remove('bi-pause-fill');
            playPauseIcon.classList.add('bi-play-fill');
            currentAudioPlayer.pause();
            console.log(`Pausa: ${songTitleDisplay ? songTitleDisplay.textContent : 'Sconosciuto'}`);
        }
    }
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
        // Resetta lo stato e l'interfaccia del player se la playlist è vuota
        currentAudioPlayer.pause();
        isPlaying = false;
        if (playPauseIcon) {
            playPauseIcon.classList.remove('bi-pause-fill');
            playPauseIcon.classList.add('bi-play-fill');
        }
        if (songTitleDisplay) songTitleDisplay.textContent = "Nessuna canzone";
        if (artistNameDisplay) artistNameDisplay.textContent = "";
        if (albumArtDisplay) albumArtDisplay.src = "https://via.placeholder.com/60/777777?text=NO+ART";
        if (progressBar) progressBar.style.width = '0%';
        if (timeElapsedDisplay) timeElapsedDisplay.textContent = '0:00';
        if (timeDurationDisplay) timeDurationDisplay.textContent = '0:00';
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
        // Resetta lo stato e l'interfaccia del player se la playlist è vuota
        currentAudioPlayer.pause();
        isPlaying = false;
        if (playPauseIcon) {
            playPauseIcon.classList.remove('bi-pause-fill');
            playPauseIcon.classList.add('bi-play-fill');
        }
        if (songTitleDisplay) songTitleDisplay.textContent = "Nessuna canzone";
        if (artistNameDisplay) artistNameDisplay.textContent = "";
        if (albumArtDisplay) albumArtDisplay.src = "https://via.placeholder.com/60/777777?text=NO+ART";
        if (progressBar) progressBar.style.width = '0%';
        if (timeElapsedDisplay) timeElapsedDisplay.textContent = '0:00';
        if (timeDurationDisplay) timeDurationDisplay.textContent = '0:00';
    }
}

/**
 * Popola la lista delle canzoni disponibili nella sezione "Crea Playlist".
 */
function populateSongsForPlaylist() {
    if (!songsListForPlaylist) return;
    songsListForPlaylist.innerHTML = ''; // Pulisci la lista

    // allAlbums deve essere definito in dati.js e caricato prima!
    if (typeof allAlbums === 'undefined' || allAlbums.length === 0) {
        songsListForPlaylist.innerHTML = '<p class="text-muted ms-3">Nessun album disponibile per creare playlist (controlla dati.js).</p>';
        return;
    }

    allAlbums.forEach(album => {
        album.songs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'bg-dark', 'text-white', 'd-flex', 'align-items-center');
            listItem.innerHTML = `
                <input type="checkbox" class="form-check-input me-3"
                    data-album-art="${album.albumArt || ''}"
                    data-album-title="${album.title || ''}"
                    data-artist="${album.artist || ''}"
                    data-song-title="${song.title || ''}"
                    data-song-audio-src="${song.audioSrc || ''}">
                <img src="${album.albumArt || 'https://via.placeholder.com/40/777777?text=NO+ART'}" class="rounded me-2" alt="Album Art" style="width: 40px; height: 40px; object-fit: cover;">
                <span>${song.title || 'Titolo Sconosciuto'} - ${album.artist || 'Artista Sconosciuto'} (${album.title || 'Album Sconosciuto'})</span>
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
        // Assicurati che coverArt sia un URL valido, altrimenti usa un placeholder
        const coverArt = (playlist.songs.length > 0 && playlist.songs[0].albumArt && playlist.songs[0].albumArt.startsWith('http'))
                         ? playlist.songs[0].albumArt
                         : 'https://via.placeholder.com/150/0000FF/FFFFFF?text=PLAYLIST';

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
            // Se il click è sul pulsante di eliminazione, non riprodurre
            if (event.target.closest('.delete-playlist-btn')) {
                return;
            }
            const playlistIndex = parseInt(this.dataset.playlistIndex);
            if (!isNaN(playlistIndex) && playlistIndex >= 0 && playlistIndex < userPlaylists.length) {
                const playlistToPlay = userPlaylists[playlistIndex].songs;
                if (playlistToPlay.length > 0) {
                    // Mappa le canzoni per assicurarti che abbiano tutti i campi necessari per il player
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
                    // Reset UI player se la playlist è vuota
                    currentAudioPlayer.pause();
                    isPlaying = false;
                    if (playPauseIcon) {
                        playPauseIcon.classList.remove('bi-pause-fill');
                        playPauseIcon.classList.add('bi-play-fill');
                    }
                    if (songTitleDisplay) songTitleDisplay.textContent = "Nessuna canzone";
                    if (artistNameDisplay) artistNameDisplay.textContent = "";
                    if (albumArtDisplay) albumArtDisplay.src = "https://via.placeholder.com/60/777777?text=NO+ART";
                    if (progressBar) progressBar.style.width = '0%';
                    if (timeElapsedDisplay) timeElapsedDisplay.textContent = '0:00';
                    if (timeDurationDisplay) timeDurationDisplay.textContent = '0:00';
                }
            }
        });
    });

    document.querySelectorAll('.delete-playlist-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita che il click si propaghi alla card sottostante
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
    // Se "createPlaylistBtn" è il pulsante della sidebar per navigare alla sezione di creazione playlist:
    if (createPlaylistBtn) { // Controlla se questo ID esiste nel tuo HTML
        createPlaylistBtn.addEventListener('click', () => {
            window.showSection('create-playlist-section');
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            // Attiva il link "Crea playlist" nella sidebar se ne hai uno con l'ID o data-target-section
            const createPlaylistNavLink = document.querySelector('.sidebar-nav .nav-link[data-target-section="create-playlist-section"]');
            if (createPlaylistNavLink) {
                createPlaylistNavLink.classList.add('active');
            }
            populateSongsForPlaylist();
        });
    }

    // Listener per il salvataggio della playlist
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
                alert("Per favorere, seleziona almeno una canzone per la playlist.");
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
            window.showSection('library-section'); // Torna alla libreria dopo aver salvato
            renderUserPlaylists(); // Aggiorna la visualizzazione delle playlist
            alert(`Playlist "${playlistName}" salvata con successo!`);

            // Aggiorna lo stato "active" della sidebar dopo aver salvato la playlist
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
        playPauseBtn.addEventListener('click', togglePlayPause); // Ora chiama la funzione unificata
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', playPreviousSong);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', playNextSong);
    }

    // Aggiornamento della progress bar e dei tempi
    if (currentAudioPlayer && progressBar && timeElapsedDisplay && timeDurationDisplay) {
        currentAudioPlayer.addEventListener('timeupdate', () => {
            if (!isNaN(currentAudioPlayer.duration) && currentAudioPlayer.duration > 0) { // Controlla anche che la durata non sia 0 o NaN
                const progress = (currentAudioPlayer.currentTime / currentAudioPlayer.duration) * 100;
                progressBar.style.width = `${progress}%`;

                timeElapsedDisplay.textContent = formatTime(currentAudioPlayer.currentTime);
            }
        });

        currentAudioPlayer.addEventListener('loadedmetadata', () => {
            if (!isNaN(currentAudioPlayer.duration)) {
                timeDurationDisplay.textContent = formatTime(currentAudioPlayer.duration);
            }
        });

        currentAudioPlayer.addEventListener('ended', playNextSong); // Riproduce la prossima canzone quando la corrente finisce

        // Click sulla progress bar per cercare nel brano
        if (progressBarWrapper) { // Assicurati che il contenitore della barra esista
            progressBarWrapper.addEventListener('click', (e) => {
                // Controlla se una canzone è caricata e la sua durata è disponibile
                if (!currentAudioPlayer.src || isNaN(currentAudioPlayer.duration) || currentAudioPlayer.duration === 0) {
                    console.warn("Impossibile cercare: nessuna canzone caricata o durata non disponibile.");
                    return;
                }
                const clickX = e.offsetX; // Posizione X del click all'interno del contenitore della barra
                const containerWidth = progressBarWrapper.offsetWidth; // Larghezza totale del contenitore
                const seekTime = (clickX / containerWidth) * currentAudioPlayer.duration; // Calcola il tempo in secondi

                currentAudioPlayer.currentTime = seekTime; // Imposta il tempo della canzone
            });
        }
    }
});