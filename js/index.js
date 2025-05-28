// Attende che il DOM (Document Object Model) sia completamente caricato
// Questo assicura che tutti gli elementi HTML siano disponibili quando il JavaScript prova ad accedervi.
document.addEventListener('DOMContentLoaded', function() {

    // --- Selezione degli elementi HTML tramite i loro ID ---
    // Questi sono i riferimenti agli elementi che manipoleremo per mostrare/nascondere le sezioni.

    // I link nella sidebar che attivano le diverse sezioni
    const homeLink = document.getElementById('home-link');
    const searchLink = document.getElementById('search-link');

    // Le sezioni della pagina che vogliamo mostrare o nascondere
    const homeSection = document.getElementById('home-section');
    const searchSection = document.getElementById('search-section');

    // --- Funzioni per la navigazione e l'aggiornamento della sidebar ---

    /**
     * Rimuove la classe 'active' da tutti i link della sidebar.
     * Usata prima di aggiungere 'active' al link corretto.
     */
    function deactivateAllSidebarLinks() {
        document.querySelectorAll('#sidebar-wrapper .list-group-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    /**
     * Mostra la sezione Home e nasconde tutte le altre sezioni.
     * Aggiorna anche lo stato "active" del link "Home" nella sidebar.
     */
    function showHomeSection() {
        // Nasconde la sezione di ricerca (e future sezioni)
        searchSection.classList.add('d-none'); // Bootstrap 'd-none' = display: none;

        // Mostra la sezione Home
        homeSection.classList.remove('d-none'); // Rimuove 'd-none' per mostrare

        // Aggiorna lo stato attivo nella sidebar
        deactivateAllSidebarLinks(); // Rimuovi 'active' da tutti
        homeLink.classList.add('active'); // Aggiungi 'active' al link Home
    }

    /**
     * Mostra la sezione Cerca e nasconde tutte le altre sezioni.
     * Aggiorna anche lo stato "active" del link "Cerca" nella sidebar.
     */
    function showSearchSection() {
        // Nasconde la sezione Home (e future sezioni)
        homeSection.classList.add('d-none');

        // Mostra la sezione Cerca
        searchSection.classList.remove('d-none');

        // Aggiorna lo stato attivo nella sidebar
        deactivateAllSidebarLinks(); // Rimuovi 'active' da tutti
        searchLink.classList.add('active'); // Aggiungi 'active' al link Cerca
    }

    // --- Aggiunta degli Event Listener per i click sulla sidebar ---

    // Aggiungi un listener per il click sul link "Cerca"
    // Ci assicuriamo che il link esista prima di aggiungere il listener per prevenire errori.
    if (searchLink) {
        searchLink.addEventListener('click', function(event) {
            event.preventDefault(); // Previene il comportamento predefinito del link (es. navigare a #)
            showSearchSection();    // Chiama la funzione per mostrare la sezione di ricerca
        });
    }

    // Aggiungi un listener per il click sul link "Home"
    if (homeLink) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Previene il comportamento predefinito del link
            showHomeSection();      // Chiama la funzione per mostrare la sezione Home
        });
    }

    // --- Inizializzazione all'apertura della pagina ---
    // Assicurati che la pagina Home sia quella visibile all'inizio,
    // e che la pagina Cerca sia nascosta.
    // Questo è importante se non hai un controllo iniziale forte sui display delle sezioni.
    // Tuttavia, dato che homeSection parte senza d-none e searchSection con d-none,
    // non è strettamente necessario chiamare showHomeSection() qui, ma non fa male.
    // showHomeSection();
});