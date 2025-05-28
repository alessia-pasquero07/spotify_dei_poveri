// Attende che il DOM sia completamente caricato.
document.addEventListener('DOMContentLoaded', function() {

    // --- Selezione degli elementi HTML per la navigazione ---
    const backButton = document.getElementById('back-button');
    const forwardButton = document.getElementById('forward-button');

    // Controlli di robustezza: Assicurati che i bottoni esistano
    if (!backButton || !forwardButton) {
        console.error("Bottoni Indietro o Avanti non trovati. Assicurati che abbiano gli ID 'back-button' e 'forward-button' in index.html.");
        return; // Esce dalla funzione se i bottoni non sono presenti
    }

    // --- Gestione della cronologia di navigazione ---
    let navigationHistory = []; // Array per tenere traccia delle sezioni visitate
    let historyIndex = -1;      // Indice della sezione corrente nell'array della cronologia

    // Funzione per aggiornare la cronologia quando l'utente naviga.
    // Questa funzione è esposta globalmente (window.updateNavigationHistory)
    // per essere chiamata da `index.js` quando la sezione cambia.
    window.updateNavigationHistory = function(sectionId, fromHistory = false) { // Aggiunto parametro fromHistory
        // Non tagliare la cronologia se la navigazione proviene dai bottoni Indietro/Avanti
        // e stiamo solo muovendoci all'interno della cronologia esistente.
        if (!fromHistory) {
            // Se non siamo alla fine della cronologia (cioè siamo tornati indietro),
            // qualsiasi nuova navigazione "taglia" la cronologia successiva.
            if (historyIndex < navigationHistory.length - 1) {
                navigationHistory = navigationHistory.slice(0, historyIndex + 1);
            }

            // Aggiungi la nuova sezione alla cronologia SOLO se non è l'ultima già visitata
            // Questo evita duplicati se la funzione viene chiamata più volte per la stessa pagina
            if (navigationHistory[navigationHistory.length - 1] !== sectionId) {
                navigationHistory.push(sectionId);
                historyIndex = navigationHistory.length - 1; // Aggiorna l'indice alla nuova sezione
            }
        }
        // Se fromHistory è true, l'indice è già stato aggiornato da goBack/goForward,
        // e non dobbiamo modificare l'array navigationHistory.

        // Aggiorna lo stato visivo dei bottoni Indietro/Avanti
        updateNavigationButtons();
        console.log("Cronologia:", navigationHistory, "Indice:", historyIndex);
    };

    /**
     * Aggiorna lo stato visivo (abilitato/disabilitato) dei bottoni Indietro/Avanti.
     */
    function updateNavigationButtons() {
        // Il bottone Indietro è abilitato se l'indice non è all'inizio della cronologia (cioè historyIndex > 0)
        if (historyIndex > 0) {
            backButton.classList.remove('disabled'); // Rimuove la classe disabled
        } else {
            backButton.classList.add('disabled');    // Aggiunge la classe disabled
        }

        // Il bottone Avanti è abilitato se l'indice non è alla fine della cronologia
        if (historyIndex < navigationHistory.length - 1) {
            forwardButton.classList.remove('disabled'); // Rimuove la classe disabled
        } else {
            forwardButton.classList.add('disabled');    // Aggiunge la classe disabled
        }
    }

    // --- Funzioni per la navigazione effettiva (chiamano `showSection` da index.js) ---

    /**
     * Naviga alla sezione precedente nella cronologia.
     */
    function goBack() {
        if (historyIndex > 0) {
            historyIndex--; // Decrementa l'indice per andare indietro
            const targetSectionId = navigationHistory[historyIndex];
            // Chiama la funzione centralizzata in index.js per mostrare la sezione,
            // segnalando che la navigazione è "dalla cronologia"
            if (window.showSection) { // Controlla se la funzione è disponibile
                window.showSection(targetSectionId, true); // Passa true per fromHistory
            }
            updateNavigationButtons(); // Aggiorna lo stato dei bottoni
            console.log("Indietro a:", targetSectionId);
        }
    }

    /**
     * Naviga alla sezione successiva nella cronologia.
     */
    function goForward() {
        if (historyIndex < navigationHistory.length - 1) {
            historyIndex++; // Incrementa l'indice per andare avanti
            const targetSectionId = navigationHistory[historyIndex];
            // Chiama la funzione centralizzata in index.js per mostrare la sezione,
            // segnalando che la navigazione è "dalla cronologia"
            if (window.showSection) { // Controlla se la funzione è disponibile
                window.showSection(targetSectionId, true); // Passa true per fromHistory
            }
            updateNavigationButtons(); // Aggiorna lo stato dei bottoni
            console.log("Avanti a:", targetSectionId);
        }
    }

    // --- Aggiunta degli Event Listener per i bottoni Indietro/Avanti ---
    backButton.addEventListener('click', goBack);
    forwardButton.addEventListener('click', goForward);

    // --- Inizializzazione (La cronologia viene inizializzata da index.js ora) ---
});