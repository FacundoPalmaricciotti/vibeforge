window.playlistActual = null;
let indiceArrastrado = null;

var PL_ICON_SORT_ALPHA = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 4h18v2H2V4zm0 6h18v2H2v-2zm0 6h13v2H2v-2zm15.5-2.5L23 15l-5.5 3.5v-7z"/></svg>`;
var PL_ICON_SORT_TIME = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>`;
var PL_ICON_TRASH = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>`;
var PL_ICON_REMOVE = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>`;
var SVG_MUSIC_PL = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
var SVG_CHART_PL = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
var SVG_CHECK_PL = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
var SVG_HEART_PL = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
var SVG_DRAG_PL = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;

async function renderPlaylist() {

    const playlistId = new URLSearchParams(window.location.search).get('id');
    
    if (!playlistId) {
        navigate('/user/home');
        return;
    }

    let skTracksHTML = '';
    for(let i=0; i<8; i++) {
        skTracksHTML += `
            <div style="display: grid; grid-template-columns: 50px 1fr 100px 50px; align-items: center; padding: 12px 0;">
                <div class="skeleton-shimmer sk-rect" style="width: 15px; height: 12px; margin: 0 auto;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 60%; height: 14px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 35px; height: 12px; margin-left: auto;"></div>
                <div></div>
            </div>`;
    }

    document.getElementById('app').innerHTML = ui.renderLayout(`
        <style>
            .fab-social { display: none !important; }
        </style>
        <div style="padding: 20px; box-sizing: border-box; max-width: 900px; margin: 0 auto;">
            <div style="display: flex; gap: 30px; align-items: flex-end; margin-bottom: 30px; background: linear-gradient(to bottom, rgba(255,255,255,0.05), transparent); padding: 30px; border-radius: var(--radius-md);">
                <div class="skeleton-shimmer sk-rect" style="width: 200px; height: 200px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); flex-shrink: 0;"></div>
                <div style="flex: 1; width: 100%;">
                    <div class="skeleton-shimmer sk-rect" style="width: 60px; height: 10px; margin-bottom: 12px; background: rgba(255,255,255,0.1);"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 70%; height: 45px; margin-bottom: 15px; background: rgba(255,255,255,0.1);"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 40%; height: 12px; background: rgba(255,255,255,0.1);"></div>
                </div>
            </div>

            <div style="display: flex; gap: 20px; border-bottom: 1px solid #333; margin-bottom: 25px; padding-bottom: 10px;">
                <div class="skeleton-shimmer sk-rect" style="width: 80px; height: 24px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 90px; height: 24px;"></div>
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 25px;">
                <div class="skeleton-shimmer sk-pill" style="width: 120px; height: 32px;"></div>
                <div class="skeleton-shimmer sk-pill" style="width: 120px; height: 32px;"></div>
            </div>

            <div>
                <div style="display: grid; grid-template-columns: 50px 1fr 100px 50px; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px;">
                    <div class="skeleton-shimmer sk-rect" style="width: 15px; height: 12px; margin: 0 auto;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 60px; height: 12px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 15px; height: 12px; margin-left: auto;"></div>
                    <div></div>
                </div>
                ${skTracksHTML}
            </div>
        </div>
    `);
    
    try {
        window.playlistActual = await api.get('/playlists/' + playlistId);
        window.playlistOriginalOrder = [...window.playlistActual.canciones];
        window.estadoOrdenTitulo = 0;
        window.estadoOrdenDuracion = 0;
        const esMiPlaylist = parseInt(window.playlistActual.idUsuario) === parseInt(auth.idActual);

        let yaGuardada = false;
        if (!esMiPlaylist) {
            try {
                const misPlaylists = await api.get('/playlists/usuario/' + auth.idActual);
                yaGuardada = misPlaylists.some(pl => pl.titulo === window.playlistActual.titulo);
            } catch (e) {}
        }
        
        let coverCorrecto = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
        if (window.playlistActual.canciones && window.playlistActual.canciones.length > 0) {
            try {
                const albumInfo = await api.get('/albumes/' + window.playlistActual.canciones[0].idAlbum);
                if(albumInfo && albumInfo.imagenUrl) coverCorrecto = albumInfo.imagenUrl;
            } catch(e) {}
        }

        let nombreDueño = "Usuario";
        if (!esMiPlaylist) {
            try {
                const dueño = await api.get('/usuarios/' + window.playlistActual.idUsuario);
                nombreDueño = dueño.nombre || dueño.username || "Usuario";
            } catch(e) {}
        }

        const tituloHTML = esMiPlaylist 
            ? `<input type="text" id="edit-titulo" class="pl-title-input" value="${window.playlistActual.titulo}" onblur="guardarCambios()">`
            : `<h1 class="pl-title-text">${window.playlistActual.titulo}</h1>
               <p style="color: var(--text-muted); font-size: 14px; margin-top: 5px; margin-bottom: 0;">
                   Creada por <span onclick="navigate('/user/profile?id=${window.playlistActual.idUsuario}')" style="color: white; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">@${nombreDueño.split(' ')[0]}</span>
               </p>`;

        let botonesAccionHTML = '';
        if (esMiPlaylist) {
            botonesAccionHTML = `
               <button onclick="ordenarPor('titulo')" class="btn-icon-action" title="Ordenar por Título">${PL_ICON_SORT_ALPHA}</button>
               <button onclick="ordenarPor('duracion')" class="btn-icon-action" title="Ordenar por Duración">${PL_ICON_SORT_TIME}</button>
               <button onclick="abrirModalEliminarPlaylist()" class="btn-icon-action" style="color: #e91e63;" title="Eliminar Playlist">${PL_ICON_TRASH}</button>`;
        } else {
            if (yaGuardada) {
                botonesAccionHTML = `
                    <button onclick="toggleGuardarPlaylist(this, true)" class="btn-icon-action" style="color: #1ed760;" title="Guardada en tu biblioteca">
                        ${SVG_CHECK_PL}
                    </button>`;
            } else {
                botonesAccionHTML = `
                    <button onclick="toggleGuardarPlaylist(this, false)" class="btn-icon-action" style="color: #b3b3b3;" title="Guardar en mi Biblioteca">
                        ${SVG_HEART_PL}
                    </button>`;
            }
        }
        
        document.getElementById('app').innerHTML = ui.renderLayout(`
            <style>
                .fab-social { display: none !important; }
                
                .pl-wrapper { max-width: 950px; margin: 0 auto; display: block !important; text-align: left !important; width: 100%; padding: 20px 15px; box-sizing: border-box; }
                
                .pl-header { display: flex; gap: 30px; align-items: flex-end; margin-bottom: 30px; padding: 30px 15px; justify-content: flex-start !important; }
                .pl-cover { width: 260px; height: 260px; box-shadow: 0 10px 40px rgba(0,0,0,0.8); object-fit: cover; flex-shrink: 0; border-radius: 4px; }
                
                .pl-info { flex: 1; width: 100%; text-align: left !important; display: flex; flex-direction: column; align-items: flex-start !important; }
                .pl-title-input { font-size: 4rem; font-weight: 700; background: transparent; border: none; color: white; width: 100%; outline: none; margin: 0 0 5px 0; padding: 0; letter-spacing: -1px; }
                .pl-title-text { font-size: 4rem; font-weight: 700; margin: 0 0 5px 0; line-height: 1.1; color: white; letter-spacing: -1px; text-align: left !important; width: 100%; display: block !important; }
                
                .pl-actions { display: flex; align-items: center; gap: 25px; justify-content: flex-start !important; width: 100%; margin-top: 15px; }
                .btn-icon-action { background: transparent; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center; transition: 0.2s; color: #b3b3b3; }
                .btn-icon-action:hover { transform: scale(1.15); color: white !important; }
                .btn-icon-action svg { width: 18px; height: 18px; } /* Agranda los íconos automáticamente */
                
                .tabs-container { display: flex; gap: 20px; border-bottom: 1px solid #333; margin-bottom: 25px; padding-bottom: 10px; flex-wrap: wrap; margin-left: 10px; margin-right: 10px;}
                
                .track-row { display: grid; grid-template-columns: 40px 1fr 60px 40px; align-items: center; padding: 12px 10px; border-radius: 4px; transition: 0.2s; cursor: grab; }
                .track-row:hover { background: rgba(255,255,255,0.1); }
                
                .panel-graficos { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
                .panel-graficos-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
                .caja-chart { background: #282828; padding: 20px 15px; border-radius: 8px; position: relative; height: 340px; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }

                @media (max-width: 768px) {
                    .pl-header { 
                        display: block !important; 
                        padding: 20px 15px !important; 
                        text-align: left !important; 
                    }
                    
                    .pl-cover { 
                        width: 280px !important; 
                        height: 280px !important; 
                        margin: 0 auto 25px auto !important; 
                        display: block !important; 
                        max-width: 100%; 
                    }
                    
                    .pl-info { 
                        display: block !important; 
                        width: 100% !important; 
                        text-align: left !important; 
                    }
                    
                    .pl-title-input, .pl-title-text { 
                        font-size: 28px !important; 
                        font-weight: 700 !important; 
                        text-align: left !important; 
                        margin-bottom: 12px !important; 
                        display: block !important; 
                        width: 100% !important; 
                    }
                    
                    #playlist-container .pl-actions { 
                        display: flex !important; 
                        justify-content: flex-start !important; 
                        gap: 20px !important; 
                        margin-top: 8px !important; 
                        width: 100% !important; 
                        padding-left: 5px !important;
                    }
                    
                    .track-row { padding: 12px 5px; grid-template-columns: 30px 1fr 50px 30px !important; }
                    .panel-graficos, .panel-graficos-3 { grid-template-columns: 1fr !important; gap: 15px !important; }
                }
            </style>
            
            <div id="playlist-container" class="pl-wrapper">
                
                <div class="pl-header">
                    <img id="playlist-cover" src="${coverCorrecto}" class="pl-cover">
                    <div class="pl-info">
                        <p style="text-transform: uppercase; font-size: 12px; font-weight: 700; margin: 0 0 5px 0; color: var(--text-muted); letter-spacing: 1px;">Playlist</p>
                        ${tituloHTML}
                        <div class="pl-actions">
                            ${botonesAccionHTML}
                        </div>
                    </div>
                </div>

                <div class="tabs-container">
                    <button onclick="cambiarTabPL('musica')" id="btn-tab-pl-musica" style="background: transparent; color: var(--primary); border: none; font-size: 16px; font-weight: bold; cursor: pointer; border-bottom: 2px solid var(--primary); padding-bottom: 5px; display: flex; align-items: center;">${SVG_MUSIC_PL} Música</button>
                    <button onclick="cambiarTabPL('analiticas')" id="btn-tab-pl-analiticas" style="background: transparent; color: var(--text-muted); border: none; font-size: 16px; font-weight: bold; cursor: pointer; padding-bottom: 5px; display: flex; align-items: center;">${SVG_CHART_PL} Analytics</button>
                </div>

                <div id="tab-pl-musica" class="tab-content" style="padding: 0 10px;">
                    <div id="lista-tracks"></div>
                </div>

                <div id="tab-pl-analiticas" class="tab-content" style="display: none; padding-top: 10px;">
                    <h2 style="margin-bottom: 20px; color: white;">Dashboard de la Playlist</h2>
                    
                    <div id="sk-pl-charts-container">
                        <div class="panel-graficos">
                            <div class="skeleton-shimmer sk-rect" style="height: 280px; width: 100%; border-radius: 8px;"></div>
                            <div class="skeleton-shimmer sk-rect" style="height: 280px; width: 100%; border-radius: 8px;"></div>
                        </div>
                        <div class="panel-graficos-3">
                            <div class="skeleton-shimmer sk-rect" style="height: 280px; width: 100%; border-radius: 8px;"></div>
                            <div class="skeleton-shimmer sk-rect" style="height: 280px; width: 100%; border-radius: 8px;"></div>
                            <div class="skeleton-shimmer sk-rect" style="height: 280px; width: 100%; border-radius: 8px;"></div>
                        </div>
                    </div>

                    <div id="real-pl-charts-container" style="display: none;">
                        <div class="panel-graficos">
                            <div class="caja-chart"><canvas id="pl-chart-1"></canvas></div>
                            <div class="caja-chart"><canvas id="pl-chart-2"></canvas></div>
                        </div>
                        <div class="panel-graficos-3">
                            <div class="caja-chart"><canvas id="pl-chart-3"></canvas></div>
                            <div class="caja-chart"><canvas id="pl-chart-4"></canvas></div>
                            <div class="caja-chart"><canvas id="pl-chart-5"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        ui.registrarHistorial('playlist', playlistId, window.playlistActual.titulo, coverCorrecto);
        
        renderizarTablaCanciones(window.playlistActual.canciones, esMiPlaylist);
    } catch (e) {
        document.getElementById('app').innerHTML = ui.renderLayout('<div style="padding:40px; text-align:center;"><h2 style="color:#e91e63;">Error al cargar la playlist.</h2></div>');
    }
}

function renderizarTablaCanciones(lista, esMiPlaylist) {
    const tbody = document.getElementById('lista-tracks');
    if(!lista || lista.length === 0) {
        tbody.innerHTML = '<p style="color: var(--text-muted); padding: 20px 0;">No hay canciones todavía.</p>';
        return;
    }

    tbody.innerHTML = lista.map((cancion, index) => {
        const min = Math.floor(cancion.duracion / 60);
        const seg = (cancion.duracion % 60).toString().padStart(2, '0');
        
        const handleArrastre = esMiPlaylist 
            ? `<span style="color: var(--text-muted); text-align:center; cursor: grab;" title="Arrastrar para ordenar">${SVG_DRAG_PL}</span>` 
            : `<span></span>`;
            
        const btnQuitar = esMiPlaylist 
            ? `<span class="btn-quitar" style="text-align: center; cursor: pointer; color: #b3b3b3; transition: 0.2s; opacity: 0;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='#b3b3b3'" onclick="removerCancion(${cancion.idCancion})" title="Quitar">${PL_ICON_REMOVE}</span>` 
            : `<span></span>`;

        const eventosArrastre = esMiPlaylist 
            ? `draggable="true" ondragstart="iniciarArrastre(event, ${index})" ondragover="permitirSoltar(event)" ondrop="soltarElemento(event, ${index})"` 
            : ``;

        const hoverEfecto = esMiPlaylist ? "this.querySelector('.btn-quitar').style.opacity='1';" : "";
        const unhoverEfecto = esMiPlaylist ? "this.querySelector('.btn-quitar').style.opacity='0';" : "";

        return `
        <div class="track-row" ${eventosArrastre} onmouseover="this.style.background='var(--bg-elevated)'; ${hoverEfecto}" onmouseout="this.style.background='transparent'; ${unhoverEfecto}">
            ${handleArrastre}
            <span style="font-weight: 600; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px;">${cancion.titulo}</span>
            <span style="text-align: right; color: var(--text-muted); font-size: 13px;">${min}:${seg}</span>
            <span style="text-align: center;">${btnQuitar}</span>
        </div>`;
    }).join('');
}

window.miGraficoActual = null; 

window.cambiarTabPL = function(tab) {
    document.getElementById('tab-pl-musica').style.display = tab === 'musica' ? 'block' : 'none';
    document.getElementById('tab-pl-analiticas').style.display = tab === 'analiticas' ? 'block' : 'none';
    
    document.getElementById('btn-tab-pl-musica').style.color = tab === 'musica' ? 'var(--primary)' : 'var(--text-muted)';
    document.getElementById('btn-tab-pl-musica').style.borderBottom = tab === 'musica' ? '2px solid var(--primary)' : 'none';
    
    document.getElementById('btn-tab-pl-analiticas').style.color = tab === 'analiticas' ? 'var(--primary)' : 'var(--text-muted)';
    document.getElementById('btn-tab-pl-analiticas').style.borderBottom = tab === 'analiticas' ? '2px solid var(--primary)' : 'none';

    if (tab === 'analiticas') {
        dibujarGraficoPlaylist();
    }
};

window.graficosPL = [];

function dibujarGraficoPlaylist() {
    window.graficosPL.forEach(g => g.destroy());
    window.graficosPL = [];

    const skContainer = document.getElementById('sk-pl-charts-container');
    const realContainer = document.getElementById('real-pl-charts-container');
    if(skContainer) skContainer.style.display = 'block';
    if(realContainer) realContainer.style.display = 'none';

    const canciones = window.playlistActual.canciones;
    if (!canciones || canciones.length === 0) {
        if(skContainer) skContainer.innerHTML = '<div style="color:var(--text-muted);">Añadí canciones para ver las analíticas.</div>';
        return;
    }

    setTimeout(async () => {
        const titulosCompletos = canciones.map(c => c.titulo);
        const titulosCortos = titulosCompletos.map(t => t.length > 15 ? t.substring(0, 15) + '...' : t);
        const agrupaciones = { chill: [], ritmo: [], fuego: [], albumes: {} };
        const popularidades = canciones.map((c) => {
            const bpm = c.bpm || (80 + (c.duracion % 50) + (c.titulo.length % 20));
            if (bpm < 100) agrupaciones.chill.push(c);
            else if (bpm <= 125) agrupaciones.ritmo.push(c);
            else agrupaciones.fuego.push(c);

            const idAlb = c.idAlbum || 'Desconocido';
            if (!agrupaciones.albumes[idAlb]) agrupaciones.albumes[idAlb] = { tituloRef: c.titulo, tracks: [] };
            agrupaciones.albumes[idAlb].tracks.push(c);

            return c.rank || (50 + (c.duracion % 40));
        });

        const top5Populares = [...canciones].map((c, i) => ({...c, rankReal: popularidades[i]}))
                                   .sort((a,b) => b.rankReal - a.rankReal)
                                   .slice(0,5);
        const top5PopTitulosCompletos = top5Populares.map(c => c.titulo);
        const top5PopTitulosCortos = top5PopTitulosCompletos.map(t => t.length > 15 ? t.substring(0, 15) + '...' : t);
        const top5PopRanks = top5Populares.map(c => c.rankReal);

        const isMobile = window.innerWidth <= 768;
        const colorVerde = '#1ed760';
        const colorRosa = '#e91e63';
        const colorAzul = '#00bcd4';
        const colorAmarillo = '#FFC107';
        const colorMorado = '#9C27B0';

        const armarOpciones = (tituloVisible, tipoEje = 'ocultarX', origenTitulos = titulosCompletos, agrupacionesTracks = null) => {
            let opt = {
                responsive: true, maintainAspectRatio: false,
                onClick: (event, elements, chart) => {
                    if (!elements.length || !agrupacionesTracks) return;
                    const idx = elements[0].index;
                    const tracks = agrupacionesTracks[idx];
                    const label = origenTitulos ? origenTitulos[idx] : chart.data.labels[idx];
                    window.abrirModalDetalleAnalitica(label, tracks);
                },
                plugins: {
                    title: { display: true, text: tituloVisible, color: 'white', font: { size: isMobile ? 14 : 16, weight: 'bold' }, padding: { bottom: 20 } },
                    legend: { position: 'bottom', labels: { color: '#bbb', font: { size: isMobile ? 10 : 12 }, boxWidth: 12, padding: 15 } },
                    tooltip: {
                        backgroundColor: 'rgba(24, 24, 24, 0.95)', titleColor: '#1ed760', bodyColor: 'white', borderColor: '#333', borderWidth: 1, padding: 10,
                        callbacks: {
                            title: function(context) {
                                if (tipoEje === 'dona') return context[0].label;
                                if (tipoEje === 'pie' && origenTitulos) return origenTitulos[context[0].dataIndex];
                                return origenTitulos[context[0].dataIndex];
                            }
                        }
                    }
                }
            };

            if (tipoEje === 'horizontal_truncado') {
                opt.indexAxis = 'y';
                opt.scales = { x: { ticks: { color: '#888', font: { size: 10 } }, grid: { color: '#333', drawBorder: false } }, y: { ticks: { color: '#ccc', font: { size: 10 } }, grid: { display: false } } };
            } else if (tipoEje === 'ocultarX') {
                opt.scales = { y: { ticks: { color: '#888', font: { size: 10 } }, grid: { color: '#333', drawBorder: false } }, x: { ticks: { display: false }, grid: { display: false } } };
            } else if (tipoEje === 'categorias') {
                opt.scales = { y: { ticks: { color: '#888', font: { size: 10 } }, grid: { color: '#333', drawBorder: false } }, x: { ticks: { color: '#ccc', font: { size: 10 } }, grid: { display: false } } };
            }
            return opt;
        };
        
        const energiaTracks = [agrupaciones.chill, agrupaciones.ritmo, agrupaciones.fuego];
        const config1 = { 
            type: 'doughnut', 
            data: { labels: ['Chill (<100 BPM)', 'Bailable (100-125 BPM)', 'Eufórica (>125 BPM)'], datasets: [{ data: [agrupaciones.chill.length, agrupaciones.ritmo.length, agrupaciones.fuego.length], backgroundColor: [colorAzul, colorVerde, colorAmarillo], borderWidth: 0, hoverOffset: 5 }] }, 
            options: armarOpciones('Zonas de Energía (BPM)', 'dona', null, energiaTracks) 
        };

        const curvaTracks = canciones.map(c => [c]);
        const config2 = { 
            type: 'line', 
            data: { labels: titulosCortos, datasets: [{ label: 'Nivel de Popularidad', data: popularidades, borderColor: colorVerde, backgroundColor: 'rgba(30, 215, 96, 0.15)', fill: true, tension: 0.4, pointBackgroundColor: colorVerde, pointRadius: 4, pointHoverRadius: 6 }] }, 
            options: armarOpciones('Curva de Intensidad', 'ocultarX', titulosCompletos, curvaTracks) 
        };

        const albumesArray = Object.entries(agrupaciones.albumes).map(([id, data]) => ({ id, tracks: data.tracks }));
        albumesArray.sort((a, b) => b.tracks.length - a.tracks.length);

        let pieLabels = [], pieData = [], pieTracks = [], titulosCompletosPie = [];
        
        if (albumesArray.length > 5) {
            const top4 = albumesArray.slice(0, 4);
            const otrosTracks = albumesArray.slice(4).flatMap(a => a.tracks);
            
            const nombresReales = await Promise.all(top4.map(async (a) => {
                if (!a.id || a.id === 'Desconocido') return 'Sencillos / Varios';
                try {
                    const alb = await api.get('/albumes/' + a.id);
                    return alb.titulo || 'Álbum Desconocido';
                } catch(e) { return 'Álbum Desconocido'; }
            }));

            titulosCompletosPie = [...nombresReales, 'Otros Álbumes'];
            pieLabels = titulosCompletosPie.map(t => t.length > 15 ? t.substring(0, 15) + '...' : t);
            
            pieData = top4.map(a => a.tracks.length);
            pieData.push(otrosTracks.length);
            
            pieTracks = top4.map(a => a.tracks);
            pieTracks.push(otrosTracks);
        } else {
            const nombresReales = await Promise.all(albumesArray.map(async (a) => {
                if (!a.id || a.id === 'Desconocido') return 'Sencillos / Varios';
                try {
                    const alb = await api.get('/albumes/' + a.id);
                    return alb.titulo || 'Álbum Desconocido';
                } catch(e) { return 'Álbum Desconocido'; }
            }));

            titulosCompletosPie = [...nombresReales];
            pieLabels = titulosCompletosPie.map(t => t.length > 15 ? t.substring(0, 15) + '...' : t);
            pieData = albumesArray.map(a => a.tracks.length);
            pieTracks = albumesArray.map(a => a.tracks);
        }

        const varColors = [colorVerde, colorRosa, colorAzul, colorAmarillo, '#444'].slice(0, pieLabels.length);
        const config4 = { 
            type: 'pie', 
            data: { labels: pieLabels, datasets: [{ data: pieData, backgroundColor: varColors, borderWidth: 0 }] }, 
            options: armarOpciones('Variedad de Álbumes', 'pie', titulosCompletosPie, pieTracks) 
        };

        const top5PopTracksModal = top5Populares.map(c => [c]);
        const config5 = { 
            type: 'bar', 
            data: { labels: top5PopTitulosCortos, datasets: [{ label: 'Popularidad', data: top5PopRanks, backgroundColor: colorRosa, borderRadius: 4 }] }, 
            options: armarOpciones('Top Populares', 'horizontal_truncado', top5PopTitulosCompletos, top5PopTracksModal) 
        };

        if(skContainer) skContainer.style.display = 'none';
        if(realContainer) realContainer.style.display = 'block';

        const renderizarYClic = (id, configObj, tituloModal) => {
            const canvas = document.getElementById(id);
            if (!canvas) return; 
            
            const configSmall = Object.assign({}, configObj);
            configSmall.options = Object.assign({}, configObj.options);
            configSmall.options.onClick = null;

            window.graficosPL.push(new Chart(canvas.getContext('2d'), configSmall));
            
            const cajaContenedora = canvas.parentElement;
            cajaContenedora.style.cursor = 'zoom-in';
            cajaContenedora.onclick = () => ui.abrirModalGrafico(configObj, tituloModal);
        };

        renderizarYClic('pl-chart-1', config1, 'Perfil Energético de la Lista');
        renderizarYClic('pl-chart-2', config2, 'Intensidad a lo largo de la Reproducción');
        renderizarYClic('pl-chart-4', config4, 'Distribución de Origen');
        renderizarYClic('pl-chart-5', config5, 'Ranking de Popularidad Global');

        const caja3 = document.getElementById('pl-chart-3').parentElement;
        caja3.style.cursor = 'zoom-in';
        
        const top5Extensas = [...canciones].sort((a,b) => b.duracion - a.duracion).slice(0,5);
        const maxDur = top5Extensas.length > 0 ? top5Extensas[0].duracion : 1;
        const coverPlaylist = document.getElementById('playlist-cover').src;
        const portadasReales = await Promise.all(top5Extensas.map(async (c) => {
            if (c.imagenUrl) return c.imagenUrl;
            if (!c.idAlbum) return coverPlaylist;
            try {
                const alb = await api.get('/albumes/' + c.idAlbum);
                return alb.imagenUrl || coverPlaylist;
            } catch(e) {
                return coverPlaylist;
            }
        }));

        caja3.onclick = function() {
            window.abrirModalWidgetGrande('Top 5 Tracks Más Extensos', top5Extensas, portadasReales);
        };

        let htmlExtensas = `
            <div style="display: flex; flex-direction: column; height: 100%; pointer-events: none; select: none;">
                <div style="color: white; font-size: ${isMobile ? '13px' : '15px'}; font-weight: bold; text-align: center; margin-bottom: 20px;">Top 5 Tracks Más Extensos</div>
                <div style="display: flex; flex-direction: column; gap: 12px; flex: 1; justify-content: center;">
        `;
        
        top5Extensas.forEach((c, index) => {
            const min = Math.floor(c.duracion / 60);
            const seg = (c.duracion % 60).toString().padStart(2, '0');
            const ancho = Math.max((c.duracion / maxDur) * 100, 15); 
            const imgSegura = portadasReales[index];
            
            htmlExtensas += `
                <div class="top5-extensa-item" style="display: flex; align-items: center; gap: 12px; padding: 6px; border-radius: 8px;">
                    <img src="${imgSegura}" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover; box-shadow: 0 2px 8px rgba(0,0,0,0.6);">
                    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: white; font-size: 13px; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">${c.titulo.replace(/"/g, "&quot;")}</span>
                            <span style="color: var(--text-muted); font-size: 11px; font-weight: bold;">${min}:${seg}</span>
                        </div>
                        <div style="width: 100%; background: #333; border-radius: 4px; height: 6px; overflow: hidden;">
                            <div style="width: ${ancho}%; background: ${colorMorado}; height: 100%; border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>
            `;
        });
        htmlExtensas += `</div></div>`;
        
        caja3.innerHTML = htmlExtensas;;
        caja3.querySelectorAll('.top5-extensa-item').forEach(item => {
            item.onclick = function(e) {
                e.stopPropagation();
                const idx = this.getAttribute('data-index');
                window.abrirModalDetalleAnalitica('Detalle del Track', [top5Extensas[idx]]);
            };
        });

    }, 350);
}


window.actualizarPortadaDinamica = async function() {
    const coverImg = document.getElementById('playlist-cover');
    if (!coverImg) return;
    
    if (!window.playlistActual.canciones || window.playlistActual.canciones.length === 0) {
        coverImg.src = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
        return;
    }
    
    try {
        const primerCancion = window.playlistActual.canciones[0];
        const albumInfo = await api.get('/albumes/' + primerCancion.idAlbum);
        if (albumInfo && albumInfo.imagenUrl) {
            coverImg.src = albumInfo.imagenUrl;
        }
    } catch(e) {
        coverImg.src = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
    }
};


window.iniciarArrastre = (e, index) => {
    indiceArrastrado = index;
    setTimeout(() => e.target.style.opacity = "0.5", 0);
};
window.permitirSoltar = (e) => e.preventDefault();

window.soltarElemento = async (e, indexDestino) => {
    e.preventDefault();
    e.target.closest('.track-row').style.opacity = "1";
    
    const lista = window.playlistActual.canciones;
    const cancionMovida = lista.splice(indiceArrastrado, 1)[0]; 
    lista.splice(indexDestino, 0, cancionMovida);
    
    renderizarTablaCanciones(lista, parseInt(window.playlistActual.idUsuario) === parseInt(auth.idActual));
    window.playlistOriginalOrder = [...window.playlistActual.canciones];
    window.estadoOrdenTitulo = 0;
    window.estadoOrdenDuracion = 0;

    window.actualizarPortadaDinamica();

    try {
        const idsOrdenados = lista.map(c => c.idCancion);
        await api.put('/playlists/' + window.playlistActual.idPlaylist + '/ordenar', idsOrdenados);
    } catch (err) {}
};

window.ordenarPor = async function(criterio) {
    let lista = window.playlistActual.canciones;
    
    if (criterio === 'titulo') {
        window.estadoOrdenTitulo = (window.estadoOrdenTitulo + 1) % 3;
        window.estadoOrdenDuracion = 0;
        
        if (window.estadoOrdenTitulo === 1) lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
        else if (window.estadoOrdenTitulo === 2) lista.sort((a, b) => b.titulo.localeCompare(a.titulo));
        else lista = [...window.playlistOriginalOrder];
        
    } else if (criterio === 'duracion') {
        window.estadoOrdenDuracion = (window.estadoOrdenDuracion + 1) % 3;
        window.estadoOrdenTitulo = 0; 
        if (window.estadoOrdenDuracion === 1) lista.sort((a, b) => a.duracion - b.duracion);
        else if (window.estadoOrdenDuracion === 2) lista.sort((a, b) => b.duracion - a.duracion);
        else lista = [...window.playlistOriginalOrder];
    }
    
    window.playlistActual.canciones = lista;
    renderizarTablaCanciones(lista, parseInt(window.playlistActual.idUsuario) === parseInt(auth.idActual));
    window.actualizarPortadaDinamica();
    
    try {
        const idsOrdenados = lista.map(c => c.idCancion);
        await api.put('/playlists/' + window.playlistActual.idPlaylist + '/ordenar', idsOrdenados);
    } catch(e){}
};

window.removerCancion = async (idCancion) => {
    try {
        await api.borrar('/playlists/' + window.playlistActual.idPlaylist + '/canciones/' + idCancion);
        window.playlistActual.canciones = window.playlistActual.canciones.filter(c => c.idCancion !== idCancion);
        window.playlistOriginalOrder = [...window.playlistActual.canciones];
        window.estadoOrdenTitulo = 0; 
        window.estadoOrdenDuracion = 0;
        
        renderizarTablaCanciones(window.playlistActual.canciones, true);
        window.actualizarPortadaDinamica();
        
        if (document.getElementById('tab-pl-analiticas').style.display === 'block') {
            dibujarGraficoPlaylist();
        }
    } catch(e) {}
};

window.guardarCambios = async () => {
    await api.patch('/playlists/' + window.playlistActual.idPlaylist, { titulo: document.getElementById('edit-titulo').value });
};


window.abrirModalEliminarPlaylist = function() {
    const modal = document.createElement('div');
    modal.id = 'modal-eliminar-pl';
    modal.style.cssText = 'position:fixed; inset:0; z-index:15000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; backdrop-filter: blur(5px);';
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration:0.3s; background:#181818; border-radius:12px; padding:30px; width:90vw; max-width:400px; border:1px solid #333; text-align:center; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
            <h2 style="margin:0 0 15px 0; color:white; font-size:1.5rem;">Eliminar Playlist</h2>
            <p style="color:var(--text-muted); margin-bottom:25px; font-size: 14px;">¿Borrar "${window.playlistActual.titulo}" para siempre? Esta acción no se puede deshacer.</p>
            <div style="display:flex; gap:15px;">
                <button onclick="document.getElementById('modal-eliminar-pl').remove()" style="flex:1; padding:12px; border-radius:500px; background:#333; color:white; font-weight:bold; border:none; cursor:pointer; transition: 0.2s;" onmouseover="this.style.background='#444'">Cancelar</button>
                <button onclick="eliminarPlaylistReal()" style="flex:1; padding:12px; border-radius:500px; background:#e91e63; color:white; font-weight:bold; border:none; cursor:pointer; transition: 0.2s;" onmouseover="this.style.background='#c2185b'">Eliminar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.eliminarPlaylistReal = async () => {
    try {
        await api.borrar('/playlists/' + window.playlistActual.idPlaylist);
        document.getElementById('modal-eliminar-pl').remove();
        navigate('/user/playlists');
        if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Playlist eliminada", "success");
    } catch(e) {
        ui.alerta("Error", "No se pudo eliminar la playlist.", "error");
    }
};

window.toggleGuardarPlaylist = async function(btn, estaGuardada) {
    const playlistOriginal = window.playlistActual;
    const originalText = btn.innerHTML;
    btn.innerHTML = '...';
    btn.style.pointerEvents = 'none';

    try {
        if (estaGuardada) {
            const misPlaylists = await api.get('/playlists/usuario/' + auth.idActual);
            const plClonada = misPlaylists.find(pl => pl.titulo === playlistOriginal.titulo);
            
            if (plClonada) {
                await api.borrar('/playlists/' + (plClonada.idPlaylist || plClonada.id));
            }
            
            btn.style.cssText = "padding: 8px 15px; border-radius: 500px; border: none; background: #1ed760; color: black; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s;";
            btn.innerHTML = `${SVG_HEART_PL} Guardar en mi Biblioteca`;
            btn.setAttribute('onclick', `toggleGuardarPlaylist(this, false)`);
            btn.onmouseover = function() { this.style.transform='scale(1.05)' };
            btn.onmouseout = function() { this.style.transform='scale(1)' };
            
            if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Eliminada de tu biblioteca", "info");
            
        } else {
            await api.post(`/playlists/${playlistOriginal.idPlaylist}/clonar/usuario/${auth.idActual}`);
            btn.style.cssText = "padding: 8px 15px; border-radius: 500px; border: 1px solid #1ed760; background: transparent; color: #1ed760; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s;";
            btn.innerHTML = `${SVG_CHECK_PL} Guardada en tu biblioteca`;
            btn.setAttribute('onclick', `toggleGuardarPlaylist(this, true)`);
            btn.onmouseover = null;
            btn.onmouseout = null;
            btn.style.transform = 'scale(1)';           
            if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("¡Guardada en tu biblioteca!", "success");
            if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#1ed760'] });
        }
    } catch (e) {
        btn.innerHTML = originalText;
        alert("Error al sincronizar la biblioteca. Revisá tu conexión.");
    } finally {
        btn.style.pointerEvents = 'auto';
    }
};

window.abrirModalDetalleAnalitica = function(titulo, tracks) {
    if (!tracks || tracks.length === 0) return;
    
    const modalExistente = document.getElementById('modal-detalle-analitica');
    if (modalExistente) modalExistente.remove();

    const htmlTracks = tracks.map((c, index) => {
        const min = Math.floor(c.duracion / 60);
        const seg = (c.duracion % 60).toString().padStart(2, '0');
        return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding: 12px 10px; border-bottom: 1px solid #2a2a2a; transition: 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
                <div style="display:flex; align-items:center; gap: 10px; overflow:hidden;">
                    <span style="color:var(--text-muted); font-size:12px; font-weight:bold; width:20px;">${index + 1}</span>
                    <span style="color:white; font-weight:bold; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.titulo}</span>
                </div>
                <span style="color:var(--text-muted); font-size:12px; flex-shrink:0;">${min}:${seg}</span>
            </div>
        `;
    }).join('');
    const modalGrafico = document.getElementById('modal-grafico');
    const modalWidget = document.getElementById('modal-grafico-widget');   
    const vieneDeGrafico = modalGrafico && modalGrafico.style.display === 'none';
    const vieneDeWidget = modalWidget && modalWidget.style.display === 'none';
    const botonVolver = (vieneDeGrafico || vieneDeWidget) 
        ? `<button onclick="cerrarDetalleYVolver()" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:13px; font-weight:bold; display:flex; align-items:center; gap:5px; transition:0.2s;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--text-muted)'">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg> Volver
           </button>`
        : `<div></div>`;

    const modal = document.createElement('div');
    modal.id = 'modal-detalle-analitica';
    modal.style.cssText = 'position:fixed; inset:0; z-index:15000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center; backdrop-filter: blur(5px);';
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration: 0.2s; background:#181818; width:90vw; max-width:450px; border-radius:12px; border:1px solid #333; overflow:hidden; display:flex; flex-direction:column; max-height:80vh; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
            <div style="padding:15px 20px; border-bottom:1px solid #333; display:flex; justify-content:space-between; align-items:center; background: rgba(30, 215, 96, 0.05);">
                ${botonVolver}
                <h3 style="margin:0; color:var(--primary); font-size:15px; display:flex; align-items:center; gap:8px;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    ${titulo}
                </h3>
                <button onclick="cerrarDetalleYVolver(true)" style="background:transparent; border:none; color:var(--text-muted); font-size:24px; cursor:pointer; transition:0.2s;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='var(--text-muted)'">&times;</button>
            </div>
            <div style="padding:10px; overflow-y:auto; flex:1;">
                ${htmlTracks}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.onclick = (e) => { if(e.target === modal) cerrarDetalleYVolver(true); };
};

window.cerrarDetalleYVolver = function(cerrarTodo = false) {
    const modDetalle = document.getElementById('modal-detalle-analitica');
    if (modDetalle) modDetalle.remove();
    const modGrafico = document.getElementById('modal-grafico');
    const modWidget = document.getElementById('modal-grafico-widget');

    if (modGrafico) {
        if (cerrarTodo) modGrafico.remove();
        else modGrafico.style.display = 'flex';
    }
    
    if (modWidget) {
        if (cerrarTodo) modWidget.remove();
        else modWidget.style.display = 'flex';
    }
};

window.abrirModalWidgetGrande = function(titulo, tracks, portadas) {
    const modalExistente = document.getElementById('modal-grafico-widget');
    if (modalExistente) modalExistente.remove();

    let htmlListaGrande = '';
    tracks.forEach((c, index) => {
        const min = Math.floor(c.duracion / 60);
        const seg = (c.duracion % 60).toString().padStart(2, '0');
        const maxDur = tracks[0].duracion;
        const ancho = Math.max((c.duracion / maxDur) * 100, 15);
        const imgSegura = portadas[index];
        htmlListaGrande += `
            <div class="top5-extensa-item-modal" data-index="${index}" style="display: flex; align-items: center; gap: 15px; padding: 15px; border-radius: 8px; background: #222; border: 1px solid #333; box-shadow: 0 4px 15px rgba(0,0,0,0.2); cursor: pointer; transition: 0.2s;" onmouseover="this.style.backgroundColor='#2a2a2a'; this.style.borderColor='#444'" onmouseout="this.style.backgroundColor='#222'; this.style.borderColor='#333'">
                <img src="${imgSegura}" style="width: 55px; height: 50px; border-radius: 6px; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; gap: 10px;">
                        <span style="color: white; font-size: 15px; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.titulo}</span>
                        <span style="color: #1ed760; font-size: 13px; font-weight: bold; flex-shrink: 0;">${min}:${seg}</span>
                    </div>
                    <div style="width: 100%; background: #333; border-radius: 4px; height: 8px; overflow: hidden;">
                        <div style="width: ${ancho}%; background: #9C27B0; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
            </div>
        `;
    });

    const modal = document.createElement('div');
    modal.id = 'modal-grafico-widget';
    modal.style.cssText = 'position: fixed; inset: 0; z-index: 14000; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);';
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration: 0.3s; background: #181818; border-radius: 12px; padding: 30px; width: 85vw; max-width: 550px; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.8); border: 1px solid #333;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 15px;">
                <h2 style="margin: 0; color: white; font-size: 1.6rem; font-weight: bold;">${titulo}</h2>
                <button onclick="document.getElementById('modal-grafico-widget').remove()" style="background: transparent; border: none; color: var(--text-muted); font-size: 28px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='var(--text-muted)'">✖</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 15px; max-height: 55vh; overflow-y: auto; padding-right: 5px;">
                ${htmlListaGrande}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelectorAll('.top5-extensa-item-modal').forEach(item => {
        item.onclick = function(e) {
            e.stopPropagation();
            const idx = this.getAttribute('data-index');
            modal.style.display = 'none';
            window.abrirModalDetalleAnalitica('Detalle del Track', [tracks[idx]]);
        };
    });

    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
};