// settingsStyles.js
// Questo file applica dinamicamente gli stili della sezione impostazioni tramite JS.
// Utile se vuoi gestire temi runtime o aggiungere/rimuovere stili senza modificare il CSS statico.

(function() {
    const style = document.createElement('style');
    style.innerHTML = `
    /* --- SETTINGS SECTION STYLES (iniettati via JS) --- */
    #settings-section h1 {
        font-size: 2.2rem;
        font-weight: 700;
        letter-spacing: -1px;
        color: #fff;
        margin-bottom: 2.5rem;
    }
    #settings-categories-container {
        background: #181818;
        border-radius: 18px;
        box-shadow: 0 2px 16px 0 #00000033;
        padding: 2.5rem 2rem 2rem 2rem;
    }
    #settings-categories-container h3 {
        font-size: 1.3rem;
        font-weight: 600;
        color: #fff;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
    }
    #settings-categories-container .text-muted {
        color: #b3b3b3 !important;
    }
    #settings-categories-container .form-label {
        color: #fff;
        font-weight: 500;
        margin-bottom: 0.2rem;
    }
    #settings-categories-container .mb-5 {
        border-bottom: 1px solid #282828;
        padding-bottom: 2rem;
        margin-bottom: 2.5rem !important;
    }
    #settings-categories-container .mb-5:last-child {
        border-bottom: none;
    }
    #settings-categories-container .form-check-input:checked {
        background-color: #1db954;
        border-color: #1db954;
    }
    #settings-categories-container .form-check-input {
        width: 2.2em;
        height: 1.2em;
        margin-left: 0.5em;
        background: #535353;
        border-radius: 1em;
        border: none;
        transition: background 0.2s;
    }
    #settings-categories-container .form-check-input:focus {
        box-shadow: none;
    }
    #settings-categories-container .form-switch .form-check-input {
        background-color: #535353;
    }
    #settings-categories-container .form-switch .form-check-input:checked {
        background-color: #1db954;
    }
    #settings-categories-container .form-select {
        background: #222;
        color: #fff;
        border: 1px solid #282828;
        border-radius: 8px;
        font-size: 1rem;
    }
    #settings-categories-container .form-range {
        accent-color: #1db954;
    }
    #settings-categories-container .settings-link {
        color: #1db954;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
    }
    #settings-categories-container .settings-link:hover {
        color: #1ed760;
        text-decoration: underline;
    }
    #settings-categories-container .settings-btn {
        background: #181818;
        color: #fff;
        border: 1px solid #282828;
        border-radius: 8px;
        font-weight: 500;
        transition: background 0.2s, color 0.2s;
    }
    #settings-categories-container .settings-btn:hover {
        background: #1db954;
        color: #fff;
        border-color: #1db954;
    }
    #settings-categories-container .form-range {
        width: 200px;
        margin-right: 1rem;
    }
    @media (max-width: 600px) {
        #settings-categories-container {
            padding: 1.2rem 0.5rem 1rem 0.5rem;
        }
        #settings-section h1 {
            font-size: 1.3rem;
        }
    }
    `;
    document.head.appendChild(style);
})();
