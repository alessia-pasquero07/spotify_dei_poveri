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
    const allAlbums = [
        // --- POP --- (3 Album, min 5 canzoni ciascuno)
        {
            id: 1,
            title: 'ANTI', // Esempio di album di Rihanna
            artist: 'Rihanna',
            genre: 'Pop',
            year: 2016,
            albumArt: 'https://via.placeholder.com/150/FFD700?text=RIHANNA+ANTI', // Placeholder aggiornato
            songs: [
                { id: 201, title: 'Work', duration: '3:39', audioSrc: '' },
                { id: 202, title: 'Needed Me', duration: '3:11', audioSrc: '' },
                { id: 203, title: 'Kiss It Better', duration: '4:13', audioSrc: '' },
                { id: 204, title: 'Love On The Brain', duration: '3:44', audioSrc: '' },
                { id: 205, title: 'Desperado', duration: '3:06', audioSrc: '' }
            ]
        },
        {
            id: 2,
            title: 'When We All Fall Asleep, Where Do We Go?', // Esempio di album di Billie Eilish
            artist: 'Billie Eilish',
            genre: 'Pop',
            year: 2019,
            albumArt: 'https://via.placeholder.com/150/FFD700?text=BILLIE+WWAFAWDWG', // Placeholder aggiornato
            songs: [
                { id: 206, title: 'Bad Guy', duration: '3:14', audioSrc: '' },
                { id: 207, title: 'Bury a Friend', duration: '3:13', audioSrc: '' },
                { id: 208, title: 'Xanny', duration: '4:04', audioSrc: '' },
                { id: 209, title: 'All the Good Girls Go to Hell', duration: '2:48', audioSrc: '' },
                { id: 210, title: 'When the Party\'s Over', duration: '3:16', audioSrc: '' }
            ]
        },
        {
            id: 3,
            title: 'Future Nostalgia', // Esempio di album di Dua Lipa
            artist: 'Dua Lipa',
            genre: 'Pop',
            year: 2020,
            albumArt: 'https://via.placeholder.com/150/FFD700?text=DUA+FUTURE', // Placeholder aggiornato
            songs: [
                { id: 211, title: 'Don\'t Start Now', duration: '3:03', audioSrc: '' },
                { id: 212, title: 'Physical', duration: '3:13', audioSrc: '' },
                { id: 213, title: 'Break My Heart', duration: '3:41', audioSrc: '' },
                { id: 214, title: 'Levitating', duration: '3:23', audioSrc: '' },
                { id: 215, title: 'Hallucinate', duration: '3:28', audioSrc: '' }
            ]
        },
        // --- ROCK --- (3 Album, min 5 canzoni ciascuno)
        {
            id: 4,
            title: 'Rebel Yell Archives',
            artist: 'The Riff Lords',
            genre: 'Rock',
            year: 2021,
            albumArt: 'https://via.placeholder.com/150/B22222?text=ROCK+A1',
            songs: [
                { id: 216, title: 'Rebel Yell', duration: '4:20', audioSrc: '' },
                { id: 217, title: 'Highway Run', duration: '4:55', audioSrc: '' },
                { id: 218, title: 'Midnight City', duration: '3:45', audioSrc: '' },
                { id: 219, title: 'Iron Heart', duration: '5:10', audioSrc: '' },
                { id: 220, title: 'Road Burners', duration: '4:00', audioSrc: '' }
            ]
        },
        {
            id: 5,
            title: 'Mutter',
            artist: 'Rammstein',
            genre: 'Rock',
            year: 2001,
            albumArt: 'https://via.placeholder.com/150/B22222?text=RAMMS+MUTTER',
            songs: [
                { id: 221, title: 'Mein Herz brennt', duration: '4:39', audioSrc: '' },
                { id: 222, title: 'Links 2 3 4', duration: '3:36', audioSrc: '' },
                { id: 223, title: 'Sonne', duration: '4:32', audioSrc: '' },
                { id: 224, title: 'Ich will', duration: '3:37', audioSrc: '' },
                { id: 225, title: 'Mutter', duration: '4:32', audioSrc: '' }
            ]
        },
        {
            id: 6,
            title: 'Hellbilly Deluxe', // Esempio di album di Rob Zombie
            artist: 'Rob Zombie',
            genre: 'Rock',
            year: 1998, // Anno aggiornato
            albumArt: 'https://via.placeholder.com/150/B22222?text=ROBZ+HD', // Placeholder aggiornato
            songs: [
                { id: 226, title: 'Dragula', duration: '3:42', audioSrc: '' },
                { id: 227, title: 'Living Dead Girl', duration: '3:21', audioSrc: '' },
                { id: 228, title: 'Superbeast', duration: '3:40', audioSrc: '' },
                { id: 229, title: 'Demonoid Phenomenon', duration: '4:11', audioSrc: '' },
                { id: 230, title: 'Meet the Creeper', duration: '3:13', audioSrc: '' }
            ]
        },

   // --- TRAP --- (3 Album, min 5 canzoni ciascuno)
        {
            id: 7,
            title: 'Rockstar', // Esempio di album di Sfera Ebbasta
            artist: 'Sfera Ebbasta',
            genre: 'Trap', // Genere aggiornato a Trap
            year: 2018,
            albumArt: 'https://via.placeholder.com/150/8B008B?text=SFERA+ROCKSTAR', // Placeholder aggiornato
            songs: [
                { id: 231, title: 'Cupido', duration: '3:05', audioSrc: '' },
                { id: 232, title: 'Tran Tran', duration: '3:05', audioSrc: '' },
                { id: 233, title: 'Sciroppo', duration: '3:06', audioSrc: '' },
                { id: 234, title: 'Ricchi X Sempre', duration: '3:20', audioSrc: '' },
                { id: 235, title: 'Leggenda', duration: '3:16', audioSrc: '' }
            ]
        },
        {
            id: 8,
            title: 'Icon', // Esempio di album di Tony Effe
            artist: 'Tony Effe',
            genre: 'Trap', // Genere aggiornato a Trap
            year: 2024,
            albumArt: 'https://via.placeholder.com/150/8B008B?text=TONY+ICON', // Placeholder aggiornato
            songs: [
                { id: 236, title: 'Boss', duration: '2:50', audioSrc: '' },
                { id: 237, title: 'Balenciaga', duration: '2:45', audioSrc: '' },
                { id: 238, title: 'Taxi Sulla Luna', duration: '2:55', audioSrc: '' },
                { id: 239, title: 'Miu Miu', duration: '3:10', audioSrc: '' },
                { id: 240, title: 'Colpevole', duration: '2:30', audioSrc: '' }
            ]
        },
        {
            id: 9,
            title: '20', // Esempio di album di Capo Plaza
            artist: 'Capo Plaza',
            genre: 'Trap', // Genere aggiornato a Trap
            year: 2018,
            albumArt: 'https://via.placeholder.com/150/8B008B?text=PLAZA+20', // Placeholder aggiornato
            songs: [
                { id: 241, title: 'Non Mi Fido', duration: '3:00', audioSrc: '' },
                { id: 242, title: 'Giovane Fuoriclasse', duration: '3:07', audioSrc: '' },
                { id: 243, title: 'Tesla', duration: '3:08', audioSrc: '' },
                { id: 244, title: 'Allenamento #2', duration: '2:45', audioSrc: '' },
                { id: 245, title: 'Forte e Chiaro', duration: '2:55', audioSrc: '' }
            ]
        },

        // --- ELETTRONICA --- (3 Album, min 5 canzoni ciascuno)
        {
            id: 10,
            title: 'Digital Horizons I',
            artist: 'Sound Weaver',
            genre: 'Elettronica',
            year: 2024,
            albumArt: 'https://via.placeholder.com/150/4682B4?text=ELEC+A1',
            songs: [
                { id: 246, title: 'Synthwave Drive', duration: '4:30', audioSrc: '' },
                { id: 247, title: 'Deep House Flow', duration: '5:00', audioSrc: '' },
                { id: 248, title: 'Trance Euphoria', duration: '6:10', audioSrc: '' },
                { id: 249, title: 'Electro Pulse', duration: '3:40', audioSrc: '' },
                { id: 250, title: 'Ambient Echoes', duration: '7:00', audioSrc: '' }
            ]
        },
        {
            id: 11,
            title: 'Rhythm Engine Chronicles',
            artist: 'Rhythm Engine',
            genre: 'Elettronica',
            year: 2023,
            albumArt: 'https://via.placeholder.com/150/4682B4?text=ELEC+A2',
            songs: [
                { id: 251, title: 'Future Bass Drop', duration: '3:40', audioSrc: '' },
                { id: 252, title: 'Techno Pulse', duration: '5:30', audioSrc: '' },
                { id: 253, title: 'Chillwave Sunset', duration: '4:15', audioSrc: '' },
                { id: 254, title: 'Drum & Bass Rush', duration: '4:00', audioSrc: '' },
                { id: 255, title: 'Uplifting Trance', duration: '6:05', audioSrc: '' }
            ]
        },
        {
            id: 12,
            title: 'Cosmic Journeys',
            artist: 'Sonic Explorer',
            genre: 'Elettronica',
            year: 2022,
            albumArt: 'https://via.placeholder.com/150/4682B4?text=ELEC+A3',
            songs: [
                { id: 256, title: 'Electro Pop Blast', duration: '3:20', audioSrc: '' },
                { id: 257, title: 'Synth Spectrum', duration: '4:30', audioSrc: '' },
                { id: 258, title: 'Digital Odyssey', duration: '5:10', audioSrc: '' },
                { id: 259, title: 'Nebula Sounds', duration: '3:50', audioSrc: '' },
                { id: 260, title: 'Galactic Groove', duration: '4:20', audioSrc: '' }
            ]
        },

        // --- JAZZ --- (3 Album, min 5 canzoni ciascuno)
        {
            id: 13,
            title: 'Jazz Club Classics',
            artist: 'Jazz Ensemble',
            genre: 'Jazz',
            year: 2018,
            albumArt: 'https://via.placeholder.com/150/DAA520?text=JAZZ+A1',
            songs: [
                { id: 261, title: 'Smooth Saxophone', duration: '5:10', audioSrc: '' },
                { id: 262, title: 'Bluesy Night', duration: '4:45', audioSrc: '' },
                { id: 263, title: 'Swing Rhapsody', duration: '3:50', audioSrc: '' },
                { id: 264, title: 'Midnight Blues', duration: '4:20', audioSrc: '' },
                { id: 265, title: 'Autumn Leaves', duration: '5:00', audioSrc: '' }
            ]
        },
        {
            id: 14,
            title: 'Midnight Serenade Sessions',
            artist: 'Midnight Trio',
            genre: 'Jazz',
            year: 2020,
            albumArt: 'https://via.placeholder.com/150/DAA520?text=JAZZ+A2',
            songs: [
                { id: 266, title: 'Cool Jazz Walk', duration: '6:00', audioSrc: '' },
                { id: 267, title: 'Bebop Frenzy', duration: '3:30', audioSrc: '' },
                { id: 268, title: 'Latin Jazz Fusion', duration: '4:20', audioSrc: '' },
                { id: 269, title: 'Groovy Nights', duration: '5:15', audioSrc: '' },
                { id: 270, title: 'Take Five', duration: '5:21', audioSrc: '' } // Omaggio a Brubeck
            ]
        },
        {
            id: 15,
            title: 'Timeless Jazz Grooves',
            artist: 'Various Jazz Artists',
            genre: 'Jazz',
            year: 2021,
            albumArt: 'https://via.placeholder.com/150/DAA520?text=JAZZ+A3',
            songs: [
                { id: 271, title: 'Soulful Serenade', duration: '4:05', audioSrc: '' },
                { id: 272, title: 'New Orleans Stomp', duration: '3:10', audioSrc: '' },
                { id: 273, title: 'Fusion Grooves', duration: '5:40', audioSrc: '' },
                { id: 274, title: 'Relaxing Piano Bar', duration: '4:50', audioSrc: '' },
                { id: 275, title: 'Blues Progression', duration: '6:30', audioSrc: '' }
            ]
        },

        // --- CLASSICA --- (3 Album, min 5 canzoni ciascuno)
        {
            id: 16,
            title: 'Beethoven\'s Complete Symphonies',
            artist: 'Ludwig van Beethoven',
            genre: 'Classica',
            year: 1800,
            albumArt: 'https://via.placeholder.com/150/B0C4DE?text=CLASSIC+A1',
            songs: [
                { id: 276, title: 'Moonlight Sonata', duration: '5:30', audioSrc: '' },
                { id: 277, title: 'Symphony No. 5 in C Minor', duration: '7:00', audioSrc: '' },
                { id: 278, title: 'Für Elise', duration: '3:00', audioSrc: '' },
                { id: 279, title: 'Pastorale (Symphony No. 6)', duration: '8:40', audioSrc: '' },
                { id: 280, title: 'Ode to Joy (Symphony No. 9)', duration: '9:30', audioSrc: '' }
            ]
        },
        {
            id: 17,
            title: 'Mozart\'s Greatest Works',
            artist: 'Wolfgang Amadeus Mozart',
            genre: 'Classica',
            year: 1780,
            albumArt: 'https://via.placeholder.com/150/B0C4DE?text=CLASSIC+A2',
            songs: [
                { id: 281, title: 'Eine kleine Nachtmusik', duration: '6:15', audioSrc: '' },
                { id: 282, title: 'Requiem: Lacrimosa', duration: '3:00', audioSrc: '' },
                { id: 283, title: 'Queen of the Night Aria', duration: '3:30', audioSrc: '' },
                { id: 284, title: 'Turkish March', duration: '3:45', audioSrc: '' },
                { id: 285, title: 'Piano Sonata No. 16', duration: '4:00', audioSrc: '' }
            ]
        },
        {
            id: 18,
            title: 'Bach\'s Brandenburg Concertos', // Nuovo titolo album
            artist: 'Johann Sebastian Bach',      // Nuovo artista
            genre: 'Classica',
            year: 1721, // Anno più appropriato
            albumArt: 'https://via.placeholder.com/150/B0C4DE?text=CLASSIC+A3',
            songs: [
                { id: 286, title: 'Brandenburg Concerto No. 3', duration: '6:00', audioSrc: '' }, // Canzoni modificate
                { id: 287, title: 'Cello Suite No. 1: Prelude', duration: '2:30', audioSrc: '' },
                { id: 288, title: 'Toccata and Fugue in D Minor', duration: '8:30', audioSrc: '' },
                { id: 289, title: 'Air on the G String', duration: '4:00', audioSrc: '' },
                { id: 290, title: 'Mass in B Minor: Kyrie', duration: '10:00', audioSrc: '' }
            ]
        }
    ];

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
});