// js/Preloader.js (Versión 2.0 - Corregida)

document.addEventListener('DOMContentLoaded', () => {
    console.log("Preloader script cargado.");

    const preloader = document.getElementById('preloader');
    const video = document.querySelector('#portada video');
    const mainContent = document.querySelector('.max-w-screen-xl');
    const welcomeModal = document.getElementById('welcomeModal');

    // 1. Asegurarnos de que el modal de música esté oculto al inicio
    if (welcomeModal) {
        welcomeModal.style.display = 'none'; // Ocultarlo para que no pelee con el preloader
    }

    // 2. Ocultar el contenido principal para que no se vea a medias
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.5s ease-in-out';
    }

    // 3. Función para mostrar la página
    function showPage() {
        if (preloader) {
            preloader.style.display = 'none'; // Ocultar la rueda de carga
        }
        if (mainContent) {
            mainContent.style.opacity = '1'; // Mostrar la página
        }
        if (welcomeModal) {
            // AHORA sí mostramos el modal de música
            welcomeModal.style.display = 'flex'; 
        }
    }

    // 4. El disparador: cuando el video esté listo para reproducirse
    if (video) {
        video.addEventListener('canplaythrough', () => {
            console.log("Video listo. Mostrando página.");
            showPage();
        });

        // 5. (Plan B) Si el video tarda más de 5 segundos, mostramos la página igual
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                console.log("Timeout: Forzando muestra de página.");
                showPage();
            }
        }, 5000); // 5 segundos de espera máxima

    } else {
        // Si no hay video, usar window.onload como alternativa
        window.onload = showPage;
    }
});