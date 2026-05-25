/**
 * UI Manager for VR Tour
 * Handles loading screen, info panels, and overall UI state
 */

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const scene = document.querySelector('a-scene');

    // Hide loading screen when scene is loaded
    if (scene) {
        scene.addEventListener('loaded', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1000); // Small delay for smoothness
        });
    }


    // Toggle info panel
    window.toggleInfo = (title, content) => {
        const panel = document.getElementById('info-panel');
        const pTitle = panel.querySelector('h3');
        const pContent = panel.querySelector('p');

        if (panel.classList.contains('visible') && pTitle.innerText === title) {
            panel.classList.remove('visible');
        } else {
            pTitle.innerText = title;
            pContent.innerText = content;
            panel.classList.add('visible');
        }
    };

    // Maximize minimap
    window.maximizeMap = (event) => {
        event.stopPropagation();
        const minimap = document.getElementById('minimap-container');
        minimap.classList.add('maximized');
    };

    // Minimize minimap
    window.minimizeMap = (event) => {
        event.stopPropagation();
        const minimap = document.getElementById('minimap-container');
        minimap.classList.remove('maximized');
    };
});

// A-Frame component to handle scene transitions
AFRAME.registerComponent('scene-transition', {
    init: function () {
        this.el.addEventListener('click', (evt) => {
            const target = this.el.getAttribute('clickable').target_url;
            if (target) {
                // Fade out before navigating
                const overlay = document.createElement('div');
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'black';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.5s ease';
                overlay.style.zIndex = '9999';
                document.body.appendChild(overlay);
                
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);

                setTimeout(() => {
                    location.replace(target);
                }, 500);
            }
        });
    }
});
