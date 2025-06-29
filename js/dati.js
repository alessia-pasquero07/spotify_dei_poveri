const allAlbums = [
        // --- POP --- (3 Album, min 5 canzoni ciascuno)
        {
            id: 1,
            title: 'ANTI', // Esempio di album di Rihanna
            artist: 'Rihanna',
            genre: 'Pop',
            year: 2016,
            albumArt: 'img/anti.jfif', // Placeholder aggiornato
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
            albumArt: 'img/when.jfif', // Placeholder aggiornato
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
            albumArt: 'img/FutureNostalgia.jfif', // Placeholder aggiornato
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
            albumArt: 'img/RebelYellArchives.jfif', // Placeholder aggiornato
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
            albumArt: 'img/mutter.jfif', // Placeholder aggiornato
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
            albumArt: 'img/Hellbilly Deluxe.jfif', // Placeholder aggiornato
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
            albumArt: 'img/Rockstar.jfif', // Placeholder aggiornato
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
            albumArt: 'img/Icon.jfif', // Placeholder aggiornato
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
            albumArt: 'img/20.jfif', // Placeholder aggiornato
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
        },
        // --- POP --- (aggiunta Ariana Grande)
        {
            id: 19,
            title: 'thank u, next',
            artist: 'Ariana Grande',
            genre: 'Pop',
            year: 2019,
            albumArt: 'img/thank u, next.jfif', // Placeholder aggiornato
            songs: [
                { id: 291, title: '7 rings', duration: '2:58', audioSrc: '' },
                { id: 292, title: 'thank u, next', duration: '3:27', audioSrc: '' },
                { id: 293, title: 'break up with your girlfriend, i’m bored', duration: '3:10', audioSrc: '' },
                { id: 294, title: 'imagine', duration: '3:32', audioSrc: '' },
                { id: 295, title: 'NASA', duration: '3:02', audioSrc: '' }
            ]
        },
        // --- POP --- (aggiunta Elodie)
        {
            id: 20,
            title: 'Ok. Respira',
            artist: 'Elodie',
            genre: 'Pop',
            year: 2023,
            albumArt: 'img/OkRespira.jfif', // Placeholder aggiornato
            songs: [
                { id: 296, title: 'Due', duration: '2:55', audioSrc: '' },
                { id: 297, title: 'Ok. Respira', duration: '2:45', audioSrc: '' },
                { id: 298, title: 'Bagno a mezzanotte', duration: '2:58', audioSrc: '' },
                { id: 299, title: 'Tribale', duration: '2:48', audioSrc: '' },
                { id: 300, title: 'Guaranà', duration: '2:48', audioSrc: '' }
            ]
        },
        // --- HIP-HOP --- (aggiunta Guè Pequeno)
        {
            id: 21,
            title: 'Gvesvs',
            artist: 'Guè Pequeno',
            genre: 'Hip-Hop',
            year: 2021,
            albumArt: '',
            songs: [
                { id: 301, title: 'Veleno', duration: '2:50', audioSrc: '' },
                { id: 302, title: 'Piango sulla Lambo', duration: '2:58', audioSrc: '' },
                { id: 303, title: 'Blitz!', duration: '2:36', audioSrc: '' },
                { id: 304, title: 'Cookies N’ Cream', duration: '2:44', audioSrc: '' },
                { id: 305, title: 'Lontano dai guai', duration: '2:54', audioSrc: '' }
            ]
        }
    ];

// --- SETTINGS DATA: struttura delle impostazioni per la sezione Impostazioni ---
const SETTINGS_DATA = [
  {
    categoryName: "Account",
    icon: "bi-person-circle",
    description: "Gestisci il tuo profilo, abbonamento e dati personali.",
    settings: [
      {
        id: "accountInfo",
        type: "link",
        label: "Informazioni sull'account",
        value: "Vai alla pagina web",
        action: "openExternalLink",
        url: "https://www.spotify.com/account/overview/"
      },
      {
        id: "subscription",
        type: "link",
        label: "Piano di abbonamento",
        value: "Premium Individual",
        action: "openExternalLink",
        url: "https://www.spotify.com/premium/"
      },
      {
        id: "changePassword",
        type: "button",
        label: "Cambia password",
        action: "showPasswordChangeForm"
      }
    ]
  },
  {
    categoryName: "Qualità audio",
    icon: "bi-music-note-beamed",
    description: "Controlla la qualità dello streaming e del download.",
    settings: [
      {
        id: "streamingQualityWifi",
        type: "dropdown",
        label: "Qualità dello streaming (Wi-Fi)",
        currentValue: "Molto alta",
        options: ["Bassa", "Normale", "Alta", "Molto alta", "Automatica"],
        action: "setAudioQuality"
      },
      {
        id: "streamingQualityMobile",
        type: "dropdown",
        label: "Qualità dello streaming (Dati mobili)",
        currentValue: "Normale",
        options: ["Bassa", "Normale", "Alta", "Molto alta", "Automatica"],
        action: "setAudioQuality"
      },
      {
        id: "normalizeVolume",
        type: "toggle",
        label: "Normalizza volume",
        description: "Imposta lo stesso livello di volume per tutti i brani.",
        currentValue: true,
        action: "toggleSetting"
      }
    ]
  },
  {
    categoryName: "Riproduzione",
    icon: "bi-play-circle",
    description: "Controlla come viene riprodotta la musica.",
    settings: [
      {
        id: "crossfade",
        type: "slider",
        label: "Crossfade",
        description: "Fondi i brani tra loro per eliminare le pause.",
        currentValue: 0,
        min: 0,
        max: 12,
        step: 1,
        action: "setCrossfade"
      },
      {
        id: "gaplessPlayback",
        type: "toggle",
        label: "Riproduzione senza interruzioni",
        currentValue: true,
        action: "toggleSetting"
      },
      {
        id: "autoplay",
        type: "toggle",
        label: "Autoplay",
        description: "Continua a riprodurre musica simile quando finisce la playlist.",
        currentValue: true,
        action: "toggleSetting"
      },
      {
        id: "explicitContent",
        type: "toggle",
        label: "Contenuti espliciti",
        description: "Filtra i brani con testi espliciti.",
        currentValue: false,
        action: "toggleSetting"
      }
    ]
  },
  {
    categoryName: "Dispositivi",
    icon: "bi-speaker",
    description: "Gestisci i dispositivi Spotify Connect.",
    settings: [
      {
        id: "connectToDevice",
        type: "button",
        label: "Connettiti a un dispositivo",
        action: "showDeviceList"
      }
    ]
  },
  {
    categoryName: "Social",
    icon: "bi-share",
    description: "Controlla la visibilità della tua attività.",
    settings: [
      {
        id: "privateSession",
        type: "toggle",
        label: "Sessione privata",
        description: "Non condividere ciò che ascolti su Spotify.",
        currentValue: false,
        action: "toggleSetting"
      },
      {
        id: "showOnProfile",
        type: "toggle",
        label: "Mostra cosa ascolto sul mio profilo",
        currentValue: true,
        action: "toggleSetting"
      }
    ]
  },
  {
    categoryName: "Archiviazione",
    icon: "bi-hdd-fill",
    description: "Gestisci lo spazio di archiviazione per i brani scaricati.",
    settings: [
      {
        id: "cacheSize",
        type: "display",
        label: "Dimensione della cache",
        value: "250 MB",
        action: null
      },
      {
        id: "clearCache",
        type: "button",
        label: "Svuota cache",
        action: "confirmClearCache"
      }
    ]
  },
  {
    categoryName: "Informazioni",
    icon: "bi-info-circle",
    description: "Informazioni sull'app e sulla licenza.",
    settings: [
      {
        id: "appVersion",
        type: "display",
        label: "Versione dell'app",
        value: "1.2.3.456",
        action: null
      },
      {
        id: "licenses",
        type: "link",
        label: "Licenze open source",
        action: "openExternalLink",
        url: "https://www.spotify.com/legal/open-source-licenses/"
      }
    ]
  }
];

// --- PROFILE DATA: struttura del profilo utente per la sezione Profilo ---
const PROFILE_DATA = {
  profilePage: {
    sections: [
      {
        id: "header",
        type: "profileHeader",
        data: {
          userAvatarUrl: "https://via.placeholder.com/150/1DB954/FFFFFF?text=USER",
          userName: "Nome Utente Esempio",
          userHandle: "@usernameesempio",
          followersCount: 1234,
          followingCount: 567,
          isPremium: true,
          actionButtons: [
            {
              label: "Modifica profilo",
              icon: "bi-pencil-fill",
              action: "openEditProfileModal"
            },
            {
              label: "Condividi",
              icon: "bi-share-fill",
              action: "shareProfileLink"
            }
          ]
        }
      },
      {
        id: "topArtists",
        type: "carouselSection",
        title: "Artisti preferiti",
        description: "Gli artisti che hai ascoltato di più ultimamente.",
        displayLimit: 6,
        data: [
          {
            id: "artist1",
            name: "Rihanna",
            imageUrl: "https://via.placeholder.com/100/FFD700?text=RIHANNA",
            type: "artist",
            action: "navigateToArtistPage"
          },
          {
            id: "artist2",
            name: "Billie Eilish",
            imageUrl: "https://via.placeholder.com/100/FFD700?text=BILLIE",
            type: "artist",
            action: "navigateToArtistPage"
          },
          {
            id: "artist3",
            name: "Queen",
            imageUrl: "https://via.placeholder.com/100/B22222?text=QUEEN",
            type: "artist",
            action: "navigateToArtistPage"
          },
          {
            id: "artist4",
            name: "Sfera Ebbasta",
            imageUrl: "https://via.placeholder.com/100/8B008B?text=SFERA",
            type: "artist",
            action: "navigateToArtistPage"
          }
        ],
        viewAllAction: "showAllTopArtists"
      },
      {
        id: "topSongs",
        type: "listSection",
        title: "Brani più ascoltati",
        description: "Le tue tracce più riprodotte.",
        displayLimit: 5,
        data: [
          {
            id: "song1",
            title: "Work",
            artist: "Rihanna",
            albumArt: "https://via.placeholder.com/50/FFD700?text=S1",
            duration: "3:39",
            action: "playSong"
          },
          {
            id: "song2",
            title: "Bad Guy",
            artist: "Billie Eilish",
            albumArt: "https://via.placeholder.com/50/FFD700?text=S2",
            duration: "3:14",
            action: "playSong"
          },
          {
            id: "song3",
            title: "Bohemian Rhapsody",
            artist: "Queen",
            albumArt: "https://via.placeholder.com/50/B22222?text=S3",
            duration: "5:55",
            action: "playSong"
          }
        ]
      },
      {
        id: "publicPlaylists",
        type: "gridSection",
        title: "Playlist pubbliche",
        description: "Le playlist che hai creato e reso pubbliche.",
        data: [
          {
            id: "playlist1",
            title: "I Miei Preferiti",
            coverUrl: "https://via.placeholder.com/150/1DB954?text=P1",
            description: "Una raccolta dei miei brani preferiti.",
            type: "playlist",
            action: "navigateToPlaylist"
          },
          {
            id: "playlist2",
            title: "Workout Vibes",
            coverUrl: "https://via.placeholder.com/150/4682B4?text=P2",
            description: "Musica energica per l'allenamento.",
            type: "playlist",
            action: "navigateToPlaylist"
          }
        ],
        createPlaylistAction: "openCreatePlaylistModal"
      },
      {
        id: "following",
        type: "gridSection",
        title: "Persone che segui",
        description: "Profili degli amici e artisti che segui.",
        data: [
          {
            id: "user1",
            name: "Amico Uno",
            imageUrl: "https://via.placeholder.com/100/333333/FFFFFF?text=A1",
            type: "user",
            action: "navigateToUserProfile"
          },
          {
            id: "user2",
            name: "Artista XY",
            imageUrl: "https://via.placeholder.com/100/555555/FFFFFF?text=AX",
            type: "artist",
            action: "navigateToArtistPage"
          }
        ],
        viewAllAction: "showAllFollowing"
      }
    ]
  }
};
// Rendi SETTINGS_DATA e PROFILE_DATA globali per l'uso in altri file
window.SETTINGS_DATA = SETTINGS_DATA;
window.PROFILE_DATA = PROFILE_DATA;