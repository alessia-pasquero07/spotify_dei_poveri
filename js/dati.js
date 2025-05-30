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