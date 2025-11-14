document.addEventListener('DOMContentLoaded', () => {
    console.log("Preloader script cargado (v2.1).");

    const preloader = document.getElementById('preloader');
    const video = document.querySelector('#portada video');
    const mainContent = document.querySelector('.max-w-screen-xl');
    const welcomeModal = document.getElementById('welcomeModal');
    let pageShown = false; // Bandera para evitar que se llame varias veces

    // 1. Función para mostrar la página
    function showPage() {
        if (pageShown) return; // Si ya se mostró, no hacer nada
        pageShown = true;
        
        console.log("Mostrando página...");
        if (preloader) {
            preloader.style.display = 'none';
        }
        if (mainContent) {
            mainContent.style.opacity = '1';
        }
        if (welcomeModal) {
            welcomeModal.style.display = 'flex';
        }
    }

    // 2. Ocultar contenido al inicio
    if (mainContent) mainContent.style.opacity = '0';
    if (welcomeModal) welcomeModal.style.display = 'none';

    // 3. Los disparadores
    if (video) {
        // Disparador A: El video está listo
        video.addEventListener('canplaythrough', () => {
            console.log("Video listo.");
            showPage();
        });

        // Disparador B: El video dio un error (404, etc.)
        video.addEventListener('error', () => {
            console.log("Error al cargar el video. Mostrando página.");
            showPage();
        });

        // Disparador C: El video se atascó
        video.addEventListener('stalled', () => {
            console.log("Video atascado. Mostrando página.");
            showPage();
        });

        // Disparador D: El Plan B (Timeout)
        setTimeout(() => {
            console.log("Timeout de 5s.");
            showPage();
        }, 5000);

    } else {
        // Si no hay etiqueta de video
        console.log("No se encontró video, usando window.onload.");
        window.onload = showPage;
    }
});