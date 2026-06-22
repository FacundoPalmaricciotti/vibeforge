window.userPlaylistsCache = [];
window.mapaGuardadas = {};

var SVG_CLOCK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>`;
var SVG_PLUS = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/></svg>`;
var SVG_CHECK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="#1ed760"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>`;
var SVG_COLLECTION = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/></svg>`;
var SVG_BLOCK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;
var SVG_ALB_STAR_OUTLINE = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
var SVG_ALB_STAR_FILLED = `<svg width="22" height="22" viewBox="0 0 24 24" fill="#1ed760" stroke="#1ed760" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
var SVG_PLUS_CIRCLE = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`;
var SVG_CHECK_CIRCLE = `<svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1ed760"></circle><polyline points="16 10 10 16 8 14" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></polyline></svg>`;

async function renderAlbum() {
    let albumId = new URLSearchParams(window.location.search).get('id');
    let skTracksHTML = '';
    for(let i=0; i<8; i++) {
        skTracksHTML += `
            <div style="display: grid; grid-template-columns: 50px 1fr 50px 80px; align-items: center; padding: 12px 0;">
                <div class="skeleton-shimmer sk-rect" style="width: 15px; height: 12px; margin-left:10px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 40%; height: 14px;"></div>
                <div></div>
                <div class="skeleton-shimmer sk-rect" style="width: 35px; height: 12px; margin-left: auto; margin-right:10px;"></div>
            </div>`;
    }

    let skeletonLayout = ui.renderLayout(`
        <style>
            .fab-social { display: none !important; }
        </style>
        <div id="album-content">
            <div style="display: flex; gap: 30px; align-items: flex-end; margin-bottom: 40px; padding: 30px;">
                <div class="skeleton-shimmer sk-rect" style="width: 230px; height: 230px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); flex-shrink: 0;"></div>
                <div style="flex: 1;">
                    <div class="skeleton-shimmer sk-rect" style="width: 60px; height: 10px; margin-bottom: 12px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 45px; margin-bottom: 25px;"></div>
                    <div style="display: flex; gap: 15px;">
                        <div class="skeleton-shimmer sk-pill" style="width: 210px; height: 38px;"></div>
                        <div class="skeleton-shimmer sk-avatar" style="width: 42px; height: 42px;"></div>
                    </div>
                </div>
            </div>
            <div style="padding: 0 30px;">
                <div style="display: grid; grid-template-columns: 50px 1fr 50px 80px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 20px; color: var(--text-muted); font-size: 14px;">
                    <span>#</span> <span>Título</span> <span></span> <span style="text-align: right;">${SVG_CLOCK}</span> 
                </div>
                <div>${skTracksHTML}</div>
            </div>
        </div>
    `);

    document.getElementById('app').innerHTML = skeletonLayout;

    try {
        const esAdmin = auth.rolActual === 'ADMIN';
        const [album, canciones] = await Promise.all([
            api.get('/albumes/' + albumId),
            api.get('/canciones/album/' + albumId)
        ]);

        let playlistsUsuario = [];
        if (!esAdmin) {
            playlistsUsuario = await api.get('/playlists/usuario/' + auth.idActual);
        }

        let favInfo = { esFavorito: false };
        try {
            favInfo = await api.get(`/favoritos/album/${albumId}/verificar/${auth.idActual}`);
        } catch(e) {}

        const isFav = favInfo.esFavorito;
        const colorFav = isFav ? '#1ed760' : 'white';
        const bordeFav = isFav ? '#1ed760' : '#555';
        const svgAUsar = isFav ? SVG_ALB_STAR_FILLED : SVG_ALB_STAR_OUTLINE;
        const estaOculto = album.activo === false;

        if (estaOculto && !esAdmin) {
            document.getElementById('app').innerHTML = ui.renderLayout(`
                <div style="padding: 50px; text-align: center;">
                    <h2 style="color: var(--error);">Álbum no disponible</h2>
                    <p style="color: white; margin-bottom: 20px;">Este álbum ha sido ocultado de la plataforma o ya no está disponible.</p>
                    <button style="padding: 10px 20px; background: var(--primary); color: black; font-weight: bold; border: none; border-radius: 50px; cursor: pointer;" onclick="navigate('/user/home')">Volver al Inicio</button>
                </div>
            `);
            return;
        }

        window.userPlaylistsCache = playlistsUsuario;
        window.mapaGuardadas = {};
        playlistsUsuario.forEach(pl => {
            if(pl.canciones) {
                pl.canciones.forEach(c => {
                    if(!window.mapaGuardadas[c.idCancion]) window.mapaGuardadas[c.idCancion] = [];
                    window.mapaGuardadas[c.idCancion].push(pl.idPlaylist);
                });
            }
        });

        const coverCorrecto = album.imagenUrl || 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
        const cartelOculto = estaOculto ? `<span style="background: #ff9800; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; vertical-align: middle; margin-left: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.5);">${SVG_BLOCK} OCULTO</span>` : '';

        window.cancionesAlbumActual = canciones;

        let albumGuardadoEnAlgunaPL = false;
        canciones.forEach(c => {
            if (window.mapaGuardadas[c.idCancion] && window.mapaGuardadas[c.idCancion].length > 0) {
                albumGuardadoEnAlgunaPL = true;
            }
        });
        const svgAddAlbum = albumGuardadoEnAlgunaPL ? SVG_CHECK_CIRCLE : SVG_PLUS_CIRCLE;
        const colorAddAlbum = albumGuardadoEnAlgunaPL ? '#1ed760' : '#b3b3b3';

        document.getElementById('app').innerHTML = ui.renderLayout(`
            <style>
                .fab-social { display: none !important; }
                
                .alb-wrapper { max-width: 950px; margin: 0 auto; display: block !important; text-align: left !important; width: 100%; }
                
                .alb-header { display: flex; gap: 30px; align-items: flex-end; margin-bottom: 30px; padding: 30px 15px; justify-content: flex-start !important; }
                .alb-cover { width: 260px; height: 260px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); object-fit: cover; flex-shrink: 0; }
                
                .alb-info { flex: 1; width: 100%; text-align: left !important; display: flex; flex-direction: column; align-items: flex-start !important; }
                .alb-title { font-size: 2.8rem; font-weight: 600; margin: 0 0 15px 0; line-height: 1.1; color: white; letter-spacing: -1px; text-align: left !important; width: 100%; display: block !important; }
                
                .alb-actions { display: flex; align-items: center; gap: 20px; justify-content: flex-start !important; width: 100%; }
                .btn-icon-action { background: transparent; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; transition: 0.2s; color: #b3b3b3; }
                .btn-icon-action:hover { transform: scale(1.05); color: white !important; }
                
                .track-row { display: grid; grid-template-columns: 1fr 40px 50px; align-items: center; padding: 12px 15px; border-radius: 4px; transition: 0.2s; cursor: pointer; }
                .track-row:hover { background: rgba(255,255,255,0.1); }
                .track-title { font-weight: 600; color: white; font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                
                @media (max-width: 768px) {
                .alb-header { 
                    display: block !important; 
                    padding: 20px 15px !important; 
                    text-align: left !important;
                }
                
                .alb-cover { 
                    width: 280px !important; 
                    height: 280px !important; 
                    margin: 0 auto 25px auto !important; 
                    display: block !important; 
                }
                
                .alb-info { 
                    display: block !important; 
                    width: 100% !important; 
                    text-align: left !important; 
                }
                
                .alb-title { 
                    font-size: 28px !important; 
                    text-align: left !important; 
                    margin-bottom: 12px !important; 
                }

                .alb-actions { 
                    display: flex !important; 
                    justify-content: flex-start !important; 
                    gap: 20px !important; 
                    margin-top: 8px !important; 
                    width: 100% !important;
                    padding-left: 5px; /* pequeño margen para que no quede pegado al borde */
                }
                
                .btn-icon-action {
                    padding: 8px !important;
                }
            }
            </style>
            
            <div id="album-content" class="alb-wrapper">
                
                <div class="alb-header">
                    <img id="album-cover" src="${coverCorrecto}" class="alb-cover" style="${estaOculto ? 'filter: grayscale(100%) opacity(0.5);' : ''}">
                    <div class="alb-info">
                        <h1 id="album-title" class="alb-title">${album.titulo} ${cartelOculto}</h1>
                        
                        ${esAdmin ? '' : `
                        <div class="alb-actions">
                            <button id="btn-add-album" onclick="abrirModalPlaylistUniversal('album', ${albumId})" class="btn-icon-action" style="${albumGuardadoEnAlgunaPL ? '' : 'color: #b3b3b3;'}" title="Añadir Álbum a Playlist">
                                ${svgAddAlbum}
                            </button>
                            <button id="btn-fav-album" onclick="toggleFavoritoAlbum(${albumId})" class="btn-icon-action" style="color: ${colorFav};" title="Añadir a Favoritos">
                                <span id="icon-fav-album" style="display:flex;">${svgAUsar}</span>
                            </button>
                        </div>
                        `}
                    </div>
                </div>

                <div style="padding: 0 10px;">
                    <div id="tracks-container" style="display: flex; flex-direction: column; gap: 2px;"></div>
                </div>

                <div id="modal-playlist" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.85); z-index:9999; justify-content:center; align-items:center; backdrop-filter: blur(5px);">
                    <div class="animate__animated animate__zoomIn" style="--animate-duration: 0.3s; background: #181818; padding: 30px; border-radius: 12px; width: 400px; max-width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.8); border: 1px solid #333;">
                        <h3 style="margin-bottom: 20px; color: white;">Guardar en Playlist</h3>
                        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                            <input type="text" id="nueva-pl-input" placeholder="Crear lista nueva..." style="flex-grow: 1; padding: 10px; border-radius: 4px; border: none; background: #282828; color: white; outline: none; border: 1px solid #333;">
                            <button onclick="crearYAgregarPLUniversal()" style="padding: 10px 15px; border-radius: 4px; background: white; color: black; font-weight: bold; border: none; cursor: pointer;">Crear</button>
                        </div>
                        <div id="lista-mis-playlists" style="max-height: 250px; overflow-y: auto; margin-bottom: 20px; padding-right: 10px;"></div>
                        <button onclick="cerrarModal()" style="width: 100%; padding: 12px; background: #333; border: none; color: white; font-weight: bold; border-radius: 500px; cursor: pointer;">Cerrar</button>
                    </div>
                </div>
            </div>
        `);

        ui.registrarHistorial('album', albumId, album.titulo, coverCorrecto);

        let tracksHTML = '';
        canciones.forEach((cancion) => {
            const min = Math.floor(cancion.duracion / 60);
            const seg = (cancion.duracion % 60).toString().padStart(2, '0');
            const estaGuardada = window.mapaGuardadas[cancion.idCancion] && window.mapaGuardadas[cancion.idCancion].length > 0;
            const iconoAUsar = estaGuardada ? SVG_CHECK : SVG_PLUS;
            const colorIcono = estaGuardada ? '#1ed760' : 'var(--text-muted)';

            tracksHTML += `
                <div class="track-row">
                    <div style="display: flex; flex-direction: column; overflow: hidden; padding-right: 15px;">
                        <span class="track-title">${cancion.titulo}</span>
                    </div>
                    
                    ${esAdmin ? '<span></span>' : `
                    <span id="btn-add-${cancion.idCancion}" style="text-align: center; cursor: pointer; color: ${colorIcono}; transition: 0.2s;" 
                          onclick="abrirModalPlaylistUniversal('cancion', ${cancion.idCancion})" title="Añadir a Playlist">
                          ${iconoAUsar}
                    </span>
                    `}
                    
                    <span style="text-align: right; color: var(--text-muted); font-size: 13px;">${min}:${seg}</span>
                </div>
            `;
        });

        document.getElementById('tracks-container').innerHTML = tracksHTML;

    } catch (error) {
        document.getElementById('app').innerHTML = ui.renderLayout('<div style="padding: 50px; text-align: center; color: var(--error);">Error al cargar el álbum.</div>');
    }
}

let modalTipoActual = null;
let modalIdActual = null;

window.abrirModalPlaylistUniversal = function(tipo, id) {
    modalTipoActual = tipo;
    modalIdActual = id;
    document.getElementById('modal-playlist').style.display = 'flex';
    dibujarPlaylistsEnModalUniversal();
};

window.cerrarModal = function() {
    document.getElementById('modal-playlist').style.display = 'none';
    modalTipoActual = null;
    modalIdActual = null;    
    actualizarIconosAlbumSilencioso();
};

window.actualizarIconosAlbumSilencioso = function() {
    if (!window.cancionesAlbumActual) return;
    let albumGuardadoEnAlgunaPL = false;

    window.cancionesAlbumActual.forEach(c => {
        const btnCancion = document.getElementById('btn-add-' + c.idCancion);
        const estaGuardada = window.mapaGuardadas[c.idCancion] && window.mapaGuardadas[c.idCancion].length > 0;
        
        if (estaGuardada) albumGuardadoEnAlgunaPL = true;

        if (btnCancion) {
            btnCancion.innerHTML = estaGuardada ? SVG_CHECK : SVG_PLUS;
            btnCancion.style.color = estaGuardada ? '#1ed760' : 'var(--text-muted)';
        }
    });

    const btnAddAlbum = document.getElementById('btn-add-album');
    if (btnAddAlbum) {
        btnAddAlbum.innerHTML = albumGuardadoEnAlgunaPL ? SVG_CHECK_CIRCLE : SVG_PLUS_CIRCLE;
        btnAddAlbum.style.color = albumGuardadoEnAlgunaPL ? '#1ed760' : '#b3b3b3';
    }
};

window.crearYAgregarAlbumPL = async function(idAlbum) {
    const input = document.getElementById('nueva-pl-album-input');
    const titulo = input.value.trim();
    if (!titulo) return;

    const btn = input.nextElementSibling;
    const textoOriginal = btn.innerText;

    btn.innerText = 'Creando...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';

    try {
        const nuevaPl = await api.post('/playlists', { 
            titulo: titulo, 
            idUsuario: auth.idActual, 
            descripcion: "Álbum completo importado" 
        });

        const respuesta = await api.post(`/playlists/${nuevaPl.idPlaylist}/album/${idAlbum}`);        
        document.getElementById('modal-guardar-album').remove();
        
        if (typeof mostrarMensajeAjustes === 'function') {
            mostrarMensajeAjustes(`¡Playlist creada con ${respuesta.agregadas} tracks!`, "success");
        }
        if (typeof confetti === 'function') {
            confetti({ particleCount: 60, spread: 50, origin: { y: 0.8 }, colors: ['#1ed760'] });
        }

        actualizarIconosAlbumSilencioso();

    } catch (e) {
        alert("No se pudo crear la playlist express.");
    } finally {
        btn.innerText = textoOriginal;
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
    }
};

window.ejecutarGuardadoAlbum = async function(idAlbum, idPlaylist) {
    try {
        const respuesta = await api.post(`/playlists/${idPlaylist}/album/${idAlbum}`);
        document.getElementById('modal-guardar-album').remove();
        
        if (respuesta.agregadas === 0) {
            if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Ese álbum ya estaba completo en la playlist", "error");
        } else {
            if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes(`¡Se agregaron ${respuesta.agregadas} canciones nuevas!`, "success");
            if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60, colors: ['#1ed760'] });
        }
                
        actualizarIconosAlbumSilencioso();

    } catch (e) {
        alert("Error al guardar el álbum en la playlist.");
    }
};

window.dibujarPlaylistsEnModalUniversal = function() {
    let playlistHTML = '';
    window.userPlaylistsCache.forEach(pl => {
        let isFullySaved = false;
        
        if (modalTipoActual === 'cancion') {
            isFullySaved = window.mapaGuardadas[modalIdActual] && window.mapaGuardadas[modalIdActual].includes(pl.idPlaylist);
        } else if (modalTipoActual === 'album') {
            const albumTracks = window.cancionesAlbumActual.map(c => c.idCancion);
            isFullySaved = albumTracks.length > 0 && albumTracks.every(idC => window.mapaGuardadas[idC] && window.mapaGuardadas[idC].includes(pl.idPlaylist));
        }
        
        const bgColor = isFullySaved ? 'rgba(30, 215, 96, 0.1)' : '#282828';
        const textColor = isFullySaved ? '#1ed760' : 'white';
        const borde = isFullySaved ? '1px solid #1ed760' : '1px solid #444';
        
        const textoAccion = isFullySaved 
            ? `<span style="display:flex; align-items:center; gap:5px;">${SVG_CHECK} Agregado</span>` 
            : `<span style="display:flex; align-items:center; gap:5px; color: var(--text-muted);">${SVG_PLUS} Agregar</span>`;

        playlistHTML += `
            <div onclick="toggleGuardadoUniversal(${pl.idPlaylist})" style="padding: 12px 15px; margin-bottom: 10px; border-radius: 6px; cursor: pointer; border: ${borde}; background: ${bgColor}; color: ${textColor}; display: flex; justify-content: space-between; align-items: center; transition: 0.2s;" onmouseover="if(!${isFullySaved}) this.style.borderColor='white'" onmouseout="this.style.borderColor='${isFullySaved ? '#1ed760' : '#444'}'">
                <span style="font-weight: bold;">${pl.titulo || pl.nombre || 'Sin Título'}</span>
                ${textoAccion}
            </div>
        `;
    });
    document.getElementById('lista-mis-playlists').innerHTML = playlistHTML;
};

window.toggleGuardadoUniversal = async function(idPlaylist) {
    try {
        if (modalTipoActual === 'cancion') {
            const laTengo = window.mapaGuardadas[modalIdActual] && window.mapaGuardadas[modalIdActual].includes(idPlaylist);
            if (laTengo) {
                await api.borrar('/playlists/' + idPlaylist + '/canciones/' + modalIdActual);
                window.mapaGuardadas[modalIdActual] = window.mapaGuardadas[modalIdActual].filter(id => id !== idPlaylist);
            } else {
                await api.post('/playlists/' + idPlaylist + '/canciones/' + modalIdActual, {});
                if(!window.mapaGuardadas[modalIdActual]) window.mapaGuardadas[modalIdActual] = [];
                window.mapaGuardadas[modalIdActual].push(idPlaylist);
            }
        } else if (modalTipoActual === 'album') {
            const albumTracks = window.cancionesAlbumActual.map(c => c.idCancion);
            const isFullySaved = albumTracks.length > 0 && albumTracks.every(idC => window.mapaGuardadas[idC] && window.mapaGuardadas[idC].includes(idPlaylist));
            
            if (isFullySaved) {
                for (let idC of albumTracks) {
                    if (window.mapaGuardadas[idC] && window.mapaGuardadas[idC].includes(idPlaylist)) {
                        await api.borrar('/playlists/' + idPlaylist + '/canciones/' + idC);
                        window.mapaGuardadas[idC] = window.mapaGuardadas[idC].filter(id => id !== idPlaylist);
                    }
                }
            } else {
                for (let idC of albumTracks) {
                    if (!window.mapaGuardadas[idC] || !window.mapaGuardadas[idC].includes(idPlaylist)) {
                        await api.post('/playlists/' + idPlaylist + '/canciones/' + idC, {});
                        if(!window.mapaGuardadas[idC]) window.mapaGuardadas[idC] = [];
                        window.mapaGuardadas[idC].push(idPlaylist);
                    }
                }
            }
        }
        dibujarPlaylistsEnModalUniversal();
    } catch(e) {}
};

window.crearYAgregarPLUniversal = async function() {
    const input = document.getElementById('nueva-pl-input');
    const titulo = input.value.trim();
    if(!titulo) return;

    const btn = input.nextElementSibling;
    const textoOriginal = btn.innerText;
    
    btn.innerText = 'Creando...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';

    try {
        const nuevaPl = await api.post('/playlists', { titulo: titulo, idUsuario: auth.idActual, descripcion: "Creada desde el catálogo" });
        window.userPlaylistsCache.push(nuevaPl);
        
        if (modalTipoActual === 'cancion') {
            await api.post('/playlists/' + nuevaPl.idPlaylist + '/canciones/' + modalIdActual, {});
            if(!window.mapaGuardadas[modalIdActual]) window.mapaGuardadas[modalIdActual] = [];
            window.mapaGuardadas[modalIdActual].push(nuevaPl.idPlaylist);
        } else if (modalTipoActual === 'album') {
            for (let c of window.cancionesAlbumActual) {
                await api.post('/playlists/' + nuevaPl.idPlaylist + '/canciones/' + c.idCancion, {});
                if(!window.mapaGuardadas[c.idCancion]) window.mapaGuardadas[c.idCancion] = [];
                window.mapaGuardadas[c.idCancion].push(nuevaPl.idPlaylist);
            }
        }
        
        input.value = '';
        dibujarPlaylistsEnModalUniversal();
    } catch(e) {
        alert("Error al crear la playlist.");
    } finally {
        btn.innerText = textoOriginal;
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
    }
};


window.toggleFavoritoAlbum = async function(idAlbum) {
    const btn = document.getElementById('btn-fav-album');
    const iconSpan = document.getElementById('icon-fav-album');
    const isCurrentlyFav = btn.style.color === 'rgb(30, 215, 96)' || btn.style.color === '#1ed760';

    btn.style.transform = 'scale(0.8)';
    setTimeout(() => btn.style.transform = 'scale(1)', 150);

    try {
        if (isCurrentlyFav) {
            await api.borrar(`/favoritos/album/${idAlbum}/usuario/${auth.idActual}`);
            btn.style.color = '#b3b3b3';
            iconSpan.innerHTML = SVG_ALB_STAR_OUTLINE;
        } else {
            await api.post(`/favoritos/album/${idAlbum}/usuario/${auth.idActual}`);
            btn.style.color = '#1ed760';
            iconSpan.innerHTML = SVG_ALB_STAR_FILLED;
            if (typeof confetti === 'function') confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ['#1ed760', '#FFD700'] });
        }
    } catch (e) {
        alert("Error al actualizar favoritos.");
    }
};