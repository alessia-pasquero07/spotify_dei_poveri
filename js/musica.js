document.addEventListener('DOMContentLoaded', function() {
    // --- Gestione Navigazione Sidebar ---
    const homeLink = document.getElementById('home-link');
    const searchLink = document.getElementById('search-link');
    const homeSection = document.getElementById('home-section');
    const searchSection = document.getElementById('search-section');

    if (homeLink && searchLink && homeSection && searchSection) {
        homeLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del link
            homeSection.classList.remove('d-none');
            searchSection.classList.add('d-none');
            homeLink.classList.add('active');
            searchLink.classList.remove('active');
        });

        searchLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impedisce il comportamento predefinito del link
            searchSection.classList.remove('d-none');
            homeSection.classList.add('d-none');
            searchLink.classList.add('active');
            homeLink.classList.remove('active');
        });
    }
    // Fine della gestione sidebar. Non c'è più codice del player qui.
});