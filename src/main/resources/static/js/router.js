const appContainer = document.getElementById('app');

let historialInterno = [];

function navigate(path, esHistorial = false) {
    if (window.location.protocol !== 'file:') {
        if (!esHistorial) {
            window.history.pushState({}, path, window.location.origin + path);
        }
    }
    
    historialInterno.push(path);
    handleRoute(path);
}

function handleRoute(forzarRuta = null) {
    let rawPath = forzarRuta || window.location.pathname;
    let path = rawPath.split('?')[0];

    const modalesAsesinar = [
        'modal-grafico', 
        'modal-grafico-widget', 
        'modal-detalle-analitica', 
        'modal-playlist', 
        'modal-red-social',
        'modal-editar',
        'modal-eliminar',
        'modal-crear-post'
    ];
    modalesAsesinar.forEach(id => {
        const modal = document.getElementById(id);
        if (modal) modal.remove();
    });

    document.body.style.overflow = '';
    
    if (path.endsWith('index.html') || path === '/' || path === '') {
        path = '/login';
    }

    const routes = {
        '/login':           typeof renderLogin !== 'undefined'          ? renderLogin          : null,
        '/user/home':       typeof renderUserHome !== 'undefined'       ? renderUserHome       : null,
        '/user/artist':     typeof renderArtist !== 'undefined'         ? renderArtist         : null,
        '/user/album':      typeof renderAlbum !== 'undefined'          ? renderAlbum          : null,
        '/user/playlist':   typeof renderPlaylist !== 'undefined'       ? renderPlaylist       : null,
        '/user/playlists':  typeof renderUserPlaylists !== 'undefined'  ? renderUserPlaylists  : null,
        '/user/settings':   typeof renderSettings !== 'undefined'       ? renderSettings       : null,
        '/user/profile':    typeof renderProfile !== 'undefined'        ? renderProfile        : null,
        '/user/favoritos':  typeof renderFavoritos !== 'undefined'      ? renderFavoritos      : null,
        '/user/post': typeof renderPost !== 'undefined' ? renderPost : null,

        '/admin/home':      typeof renderAdminHome !== 'undefined'      ? renderAdminHome      : null,
        '/admin/artistas':  typeof renderAdminArtistas !== 'undefined'  ? renderAdminArtistas  : null,
        '/admin/metricas':  typeof renderAdminMetrics !== 'undefined'   ? renderAdminMetrics   : null,
        '/admin/usuarios': typeof renderAdminUsuarios !== 'undefined' ? renderAdminUsuarios : null,
    };

    const renderFunction = routes[path];

    if (renderFunction) {
        appContainer.innerHTML = '';
        renderFunction();
    } else {
        console.error("Ruta no encontrada:", path);

        const homeSegunRol = auth.rolActual === 'ADMIN' ? '/admin/home' : '/user/home';
        appContainer.innerHTML = `
            <div style="padding: 50px; text-align: center; color: white;">
                <h1>Error de Navegación</h1>
                <p>La ruta <b>${path}</b> no existe.</p>
                <button onclick="navigate('${homeSegunRol}')">Volver al Inicio</button>
            </div>
        `;
    }

    const btnBack = document.getElementById('btn-back');
    if (btnBack) {
        const esRaiz = path === '/user/home' || path === '/admin/home' || path === '/login';
        btnBack.disabled = esRaiz;
        btnBack.style.opacity = esRaiz ? '0.3' : '1';
        btnBack.style.cursor = esRaiz ? 'not-allowed' : 'pointer';
    }
}

window.volverAtras = function() {
    const path = window.location.pathname;
    const esRaiz = path === '/user/home' || path === '/admin/home' || path === '/login';
    if (!esRaiz) {
        window.history.back();
    }
};

window.addEventListener('popstate', () => handleRoute());

handleRoute();