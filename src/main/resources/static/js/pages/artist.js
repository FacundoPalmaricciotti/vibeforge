var SVG_STAR_OUTLINE = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
var SVG_STAR_FILLED = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#1ed760" stroke="#1ed760" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
var SVG_BLOCK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;
var SVG_MUSIC = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
var SVG_CHART = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;
var SVG_CROWN_ADMIN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ed760" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M2 4l3 11h14l3-11-5 6-5-6-5 6-5-6z"></path><rect x="2" y="18" width="20" height="2" rx="1"></rect></svg>`;

async function renderArtist() {
    let artistId = new URLSearchParams(window.location.search).get('id');
    
    if (!artistId && window.location.href.includes('?id=')) {
        artistId = window.location.href.split('?id=')[1].split('&')[0];
    }

    if (!artistId || artistId === 'undefined') {
        document.getElementById('app').innerHTML = ui.renderLayout(`
            <div style="padding: 50px; text-align: center;">
                <h2 style="color: var(--error);">Error Crítico</h2>
                <p style="color: white;">No se recibió el número de ID del artista.</p>
                <button class="btn-action" style="margin-top:20px;" onclick="navigate('/user/home')">Volver</button>
            </div>
        `);
        return;
    }

    let skAlbumsHTML = '';
    for(let i=0; i<4; i++) {
        skAlbumsHTML += `
            <div class="card" style="cursor: default; pointer-events: none; background: #181818;">
                <div class="skeleton-shimmer sk-rect" style="width: 100%; aspect-ratio: 1; border-radius: 6px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 70%; height: 14px; margin: 0 auto;"></div>
            </div>`;
    }

    document.getElementById('app').innerHTML = ui.renderLayout(`
        <div style="padding: 20px; box-sizing: border-box;">
            <div class="skeleton-shimmer sk-rect" style="
                height: 350px; 
                width: 100%;
                border-radius: var(--radius-md); 
                position: relative; 
                margin-bottom: 30px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                
                <div style="position: absolute; bottom: 30px; left: 40px; display: flex; align-items: flex-end; gap: 20px; width: 100%;">
                    <div style="width: 50%;">
                        <div class="skeleton-shimmer sk-rect" style="width: 100px; height: 12px; margin-bottom: 12px; background: rgba(255,255,255,0.1);"></div>
                        <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 48px; background: rgba(255,255,255,0.1);"></div>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 20px; border-bottom: 1px solid #333; margin-bottom: 30px; padding-bottom: 10px;">
                <div class="skeleton-shimmer sk-rect" style="width: 80px; height: 20px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 100px; height: 20px;"></div>
            </div>

            <h2 style="margin-bottom: 20px; color: white;">Discografía</h2>
            <div class="grid">
                ${skAlbumsHTML}
            </div>
        </div>
    `);

    const esAdmin = auth.rolActual === 'ADMIN';

    try {
        const artista = await api.get(`/artistas/${artistId}`);

        let favInfo = { esFavorito: false };
        try {
            favInfo = await api.get(`/favoritos/artista/${artistId}/verificar/${auth.idActual}`);
        } catch(e) {}
        
        const isFav = favInfo.esFavorito;
        const colorFav = isFav ? '#1ed760' : 'white';
        const bordeFav = isFav ? '#1ed760' : '#555';
        const svgAUsar = isFav ? SVG_STAR_FILLED : SVG_STAR_OUTLINE;
        const estaOculto = artista.activo === false;

        const cartelOculto = estaOculto ? `<span id="badge-oculto" style="background: #ff9800; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; vertical-align: middle; margin-left: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.5);">${SVG_BLOCK} OCULTO AL PÚBLICO</span>` : '';

        const contenidoHTML = `
            <style>
                .panel-graficos { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
                .panel-graficos-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
                .caja-chart { background: #282828; padding: 20px 15px; border-radius: 8px; position: relative; height: 340px; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }

                .admin-controls-bar {
                    display: flex; gap: 15px; background: rgba(30, 215, 96, 0.05); padding: 15px 20px; 
                    border-radius: 12px; border: 1px solid rgba(30, 215, 96, 0.3); margin-bottom: 30px; align-items: center;
                }

                @media (max-width: 768px) {
                    #artist-banner { height: 260px !important; }
                    .banner-info { left: 0 !important; width: 100% !important; justify-content: center; text-align: center; flex-direction: column; align-items: center !important; bottom: 20px !important; }
                    #artist-name { font-size: 2.5rem !important; justify-content: center; }
                    
                    .panel-graficos, .panel-graficos-3 { grid-template-columns: 1fr !important; gap: 15px !important; }
                    
                    .admin-controls-bar { flex-direction: column; padding: 15px !important; margin-bottom: 20px; }
                    .admin-controls-bar > div { flex-wrap: wrap; justify-content: center !important; width: 100%; }
                    .admin-controls-bar button { flex: 1; min-width: 30%; font-size: 12px !important; }
                }
            </style>
            <div id="artist-content" style="padding: 20px; box-sizing: border-box;">
                <div id="artist-banner" style="
                    height: 350px; 
                    background-image: url('${artista.imagenUrl}');
                    background-size: cover; 
                    background-position: center 30%;
                    border-radius: var(--radius-md); 
                    position: relative; 
                    margin-bottom: ${esAdmin ? '20px' : '30px'}; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    ${estaOculto ? 'filter: grayscale(100%) opacity(0.7); transition: 0.4s;' : ''}">
                    
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, var(--bg-base) 10%, transparent 60%); border-radius: var(--radius-md);"></div>
                    <div class="banner-info" style="position: absolute; bottom: 30px; left: 40px; z-index: 2; display: flex; align-items: flex-end; gap: 20px;">
                        <div>
                            <p id="artist-genre" style="color: var(--primary); font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px;"></p>
                            <h1 id="artist-name" style="font-size: 4rem; color: white; text-shadow: 2px 2px 10px rgba(0,0,0,0.8); margin: 0; line-height: 1; display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap;">
                                ${artista.nombreArtistico} ${cartelOculto}
                            </h1>
                        </div>
                        
                        ${esAdmin ? '' : `
                        <button id="btn-fav-artist" onclick="toggleFavoritoArtista(${artistId})" style="display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; border: 1px solid ${bordeFav}; background: rgba(0,0,0,0.5); color: ${colorFav}; cursor: pointer; transition: all 0.2s; margin-bottom: 5px;" title="Artista Favorito">
                            <span id="icon-fav-artist" style="display:flex;">${svgAUsar}</span>
                        </button>
                        `}
                    </div>
                </div>

                <div id="panel-admin-container"></div>

                <div style="display: flex; gap: 20px; border-bottom: 1px solid #333; margin-bottom: 30px; padding-bottom: 10px; flex-wrap: wrap;">
                    <button onclick="cambiarTab('musica')" id="btn-tab-musica" style="background: transparent; color: white; border: none; font-size: 16px; font-weight: bold; cursor: pointer; border-bottom: 3px solid #1ed760; padding-bottom: 5px; transition: 0.2s;">${SVG_MUSIC} Música</button>
                    <button onclick="cambiarTab('analiticas')" id="btn-tab-analiticas" style="background: transparent; color: var(--text-muted); border: none; font-size: 16px; font-weight: bold; cursor: pointer; border-bottom: 3px solid transparent; padding-bottom: 5px; transition: 0.2s;">${SVG_CHART} Analytics</button>
                </div>

                <div id="tab-musica" class="tab-content">
                    <h2 style="margin-bottom: 20px; color: white;">Discografía</h2>
                    <div class="grid" id="grid-albumes">
                        <div style="color:var(--text-muted);">Buscando álbumes...</div>
                    </div>
                </div>

                <div id="tab-analiticas" class="tab-content" style="display: none; padding-top: 10px;">
                    <h2 style="margin-bottom: 20px; color: white;">Análisis de Discografía</h2>
                    
                    <div id="sk-charts-container">
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

                    <div id="real-charts-container" style="display: none;">
                        <div class="panel-graficos">
                            <div class="caja-chart"><canvas id="art-chart-1"></canvas></div>
                            <div class="caja-chart"><canvas id="art-chart-2"></canvas></div>
                        </div>
                        <div class="panel-graficos-3">
                            <div class="caja-chart"><canvas id="art-chart-3"></canvas></div>
                            <div class="caja-chart"><canvas id="art-chart-4"></canvas></div>
                            <div class="caja-chart"><canvas id="art-chart-5"></canvas></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('app').innerHTML = ui.renderLayout(contenidoHTML);
        ui.registrarHistorial('artist', artistId, artista.nombreArtistico, artista.imagenUrl);

        if (esAdmin) {
            const txtBtnArt = estaOculto ? 'Mostrar' : 'Ocultar';
            const colorBtnArt = estaOculto ? '#4caf50' : '#ff9800';
            
            const panelAdmin = document.createElement('div');
            panelAdmin.className = "admin-controls-bar";
            panelAdmin.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="color: var(--primary); font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display:flex;">${SVG_CROWN_ADMIN} Admin</span>
                </div>
                <div style="display: flex; gap: 10px; flex-grow: 1; justify-content: flex-end;">
                    <button onclick="perfilCargarMasAlbumes(${artista.idArtista}, this)" style="padding: 8px 20px; background: var(--primary); color: black; border: none; border-radius: 500px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">+ Álbumes</button>
                    <button id="btn-toggle-artista" onclick="perfilToggleArtista(${artista.idArtista}, this)" style="padding: 8px 20px; background: ${colorBtnArt}; color: white; border: none; border-radius: 500px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'">${txtBtnArt}</button>
                    <button onclick="perfilEliminarArtista(${artista.idArtista}, '${artista.nombreArtistico.replace(/'/g, "\\'")}')" style="padding: 8px 20px; background: #e91e63; color: white; border: none; border-radius: 500px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#f03a75'" onmouseout="this.style.background='#e91e63'">Eliminar</button>
                </div>
            `;
            document.getElementById('panel-admin-container').appendChild(panelAdmin);
        }

        try {
            const albumesCrudos = await api.get(`/albumes/artista/${artistId}`);
            const albumesSeguros = esAdmin ? albumesCrudos : albumesCrudos.filter(a => a.activo !== false);

            let albumesHTML = '';
            if (albumesSeguros.length === 0) {
                albumesHTML = '<p style="color: var(--text-muted);">Este artista aún no tiene álbumes disponibles.</p>';
            } else {
                const IMG_DISCO = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
                albumesSeguros.forEach(album => {
                    const imagenAlbum = album.imagenUrl || IMG_DISCO;
                    const estaAlbumOculto = album.activo === false;
                    const opacidad = estaAlbumOculto ? '0.4' : '1';
                    const escalaGrises = estaAlbumOculto ? 'grayscale(100%)' : 'none';
                    const bordeAdmin = estaAlbumOculto && esAdmin ? 'border: 1px solid #ff9800;' : ''; 
                    
                    let controlesAdminAlbum = '';
                    if (esAdmin) {
                        const txtBtnAlb = estaAlbumOculto ? 'Mostrar' : 'Ocultar';
                        const colorBtnAlb = estaAlbumOculto ? '#4caf50' : '#ff9800';
                        controlesAdminAlbum = `
                            <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 10px; width: 100%;">
                                <button onclick="event.stopPropagation(); perfilToggleAlbum(${album.idAlbum}, this)" style="flex: 1; padding: 8px 4px; font-size: 11px; background: ${colorBtnAlb}; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition:0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'">${txtBtnAlb}</button>
                                <button onclick="event.stopPropagation(); perfilEliminarAlbum(${album.idAlbum}, '${album.titulo.replace(/'/g, "\\'")}')" style="flex: 1; padding: 8px 4px; font-size: 11px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition:0.2s;" onmouseover="this.style.background='#f03a75'" onmouseout="this.style.background='#e91e63'">Borrar</button>
                            </div>
                        `;
                    }
                    albumesHTML += `
                        <div class="card" id="card-album-${album.idAlbum}" onclick="navigate('/user/album?id=${album.idAlbum}')" style="opacity: ${opacidad}; filter: ${escalaGrises}; ${bordeAdmin} display: flex; flex-direction: column; transition: 0.3s; height: 100%; box-sizing: border-box;">
                            <img src="${imagenAlbum}" class="card-img" style="border-radius: var(--radius-md); width: 100%; aspect-ratio: 1; object-fit: cover; margin-bottom: 10px;" alt="Portada">
                            <div class="card-title" style="margin-bottom: 5px; width: 100%; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 13px;">${album.titulo}</div>
                            ${controlesAdminAlbum}
                        </div>
                    `;
                });
            }
            document.getElementById('grid-albumes').innerHTML = albumesHTML;
            window.albumesParaGraficos = esAdmin ? albumesCrudos : albumesSeguros; 

        } catch (errorAlbumes) {
            document.getElementById('grid-albumes').innerHTML = '<p style="color: var(--error);">No se pudieron cargar los álbumes.</p>';
        }

    } catch (error) {
        document.getElementById('app').innerHTML = ui.renderLayout(`
            <div style="color: var(--error); padding:50px; text-align:center;">
                <h2>Error de conexión con la Base de Datos</h2>
                <p>No se encontró el artista con ID ${artistId}.</p>
            </div>`);
    }
}

window.cambiarTab = function(tabSeleccionada) {
    const tabMusica = document.getElementById('tab-musica');
    const tabAnaliticas = document.getElementById('tab-analiticas');
    const btnMusica = document.getElementById('btn-tab-musica');
    const btnAnaliticas = document.getElementById('btn-tab-analiticas');

    if (tabSeleccionada === 'musica') {
        tabMusica.style.display = 'block'; tabAnaliticas.style.display = 'none';
        btnMusica.style.color = 'white'; btnMusica.style.borderBottom = '3px solid #1ed760';
        btnAnaliticas.style.color = 'var(--text-muted)'; btnAnaliticas.style.borderBottom = '3px solid transparent';
    } else {
        tabMusica.style.display = 'none'; tabAnaliticas.style.display = 'block';
        btnAnaliticas.style.color = 'white'; btnAnaliticas.style.borderBottom = '3px solid #1ed760';
        btnMusica.style.color = 'var(--text-muted)'; btnMusica.style.borderBottom = '3px solid transparent';
        dibujarGraficosArtista(); 
    }
}

window.graficosArt = [];

async function dibujarGraficosArtista() {
    window.graficosArt.forEach(g => g.destroy());
    window.graficosArt = [];

    const skContainer = document.getElementById('sk-charts-container');
    const realContainer = document.getElementById('real-charts-container');
    if(skContainer) skContainer.style.display = 'block';
    if(realContainer) realContainer.style.display = 'none';

    const artistId = new URLSearchParams(window.location.search).get('id') || window.location.href.split('?id=')[1].split('&')[0];
    
    try {
        let albumes = window.albumesParaGraficos || await api.get(`/albumes/artista/${artistId}`);
        if(albumes.length === 0) {
            if(skContainer) skContainer.innerHTML = '<div style="color:var(--text-muted);">No hay suficientes datos para analizar.</div>';
            return;
        }

        if (albumes.length > 15) {
            albumes = albumes.slice(0, 15); 
        }

        const promesasCanciones = albumes.map(a => api.get(`/canciones/album/${a.idAlbum}`));
        const cancionesPorAlbum = await Promise.all(promesasCanciones);

        const titulosCompletos = albumes.map(a => a.titulo);
        const titulosCortos = albumes.map(a => a.titulo.length > 15 ? a.titulo.substring(0, 15) + '...' : a.titulo);

        const cantCanciones = cancionesPorAlbum.map(lista => lista.length);
        const duracionTotal = cancionesPorAlbum.map(lista => +(lista.reduce((tot, c) => tot + c.duracion, 0) / 60).toFixed(2));
        
        const rankPromedio = cancionesPorAlbum.map(lista => {
            if(lista.length === 0) return 0;
            const sumaRank = lista.reduce((tot, c) => tot + (c.rank || (50 + (c.duracion % 40))), 0);
            return Math.round(sumaRank / lista.length);
        });

        let bpmChill = 0, bpmRitmo = 0, bpmFuego = 0;
        let explicitCount = 0, cleanCount = 0;
        let tracksChill = [], tracksRitmo = [], tracksFuego = [];
        let tracksClean = [], tracksExplicit = [];

        cancionesPorAlbum.forEach(lista => {
            lista.forEach(c => {
                const bpm = c.bpm || (80 + (c.duracion % 50) + (c.titulo.length % 20));
                if (bpm < 100) { bpmChill++; tracksChill.push(c); }
                else if (bpm <= 125) { bpmRitmo++; tracksRitmo.push(c); }
                else { bpmFuego++; tracksFuego.push(c); }

                const isExplicit = c.explicitLyrics !== undefined ? c.explicitLyrics : ((c.duracion + c.titulo.length) % 7 === 0);
                if (isExplicit) { explicitCount++; tracksExplicit.push(c); }
                else { cleanCount++; tracksClean.push(c); }
            });
        });

        const isMobile = window.innerWidth <= 768;
        const colorVerde = '#1ed760';
        const colorRosa = '#e91e63';
        const colorAzul = '#00bcd4';
        const armarOpciones = (tituloVisible, tipoEje = 'ocultarX', origenTitulos = titulosCompletos, agrupacionesTracks = null) => {
            let opt = {
                responsive: true, 
                maintainAspectRatio: false,
                onClick: (event, elements, chart) => {
                    if (!elements.length || !agrupacionesTracks) return;
                    const idx = elements[0].index;
                    const tracks = agrupacionesTracks[idx];
                    const label = origenTitulos ? origenTitulos[idx] : chart.data.labels[idx];
                    window.abrirModalDetalleAnalitica('Análisis: ' + label, tracks);
                },
                plugins: {
                    title: { display: true, text: tituloVisible, color: 'white', font: { size: isMobile ? 14 : 16, weight: 'bold' }, padding: { bottom: 20 } },
                    legend: { position: 'bottom', labels: { color: '#bbb', font: { size: isMobile ? 10 : 12 }, boxWidth: 12, padding: 15 } },
                    tooltip: {
                        backgroundColor: 'rgba(24, 24, 24, 0.95)', titleColor: '#1ed760', bodyColor: 'white', borderColor: '#333', borderWidth: 1, padding: 10,
                        callbacks: {
                            title: function(context) {
                                if (tipoEje === 'dona' || tipoEje === 'polar') return context[0].label;
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
            } else if (tipoEje === 'polar') {
                opt.scales = { r: { ticks: { display: false }, grid: { color: '#444' } } };
            }
            return opt;
        };

        const config1 = { 
            type: 'line', 
            data: { labels: titulosCortos, datasets: [{ label: 'Popularidad Promedio', data: rankPromedio, borderColor: colorRosa, backgroundColor: 'rgba(233, 30, 99, 0.1)', fill: true, tension: 0.4, pointBackgroundColor: colorRosa, pointRadius: 4, pointHoverRadius: 6 }] }, 
            options: armarOpciones('Línea de Tiempo de Éxitos', 'ocultarX', titulosCompletos, cancionesPorAlbum) 
        };

        const config2 = { 
            type: 'bar', 
            data: { labels: titulosCortos, datasets: [{ label: 'Tracks por Disco', data: cantCanciones, backgroundColor: colorAzul, borderRadius: 4 }] }, 
            options: armarOpciones('Densidad de la Discografía', 'horizontal_truncado', titulosCompletos, cancionesPorAlbum) 
        };

        const config3 = { 
            type: 'doughnut', 
            data: { labels: ['Apto Todo Público', 'Contenido Explícito'], datasets: [{ data: [cleanCount, explicitCount], backgroundColor: [colorVerde, colorRosa], borderWidth: 0, hoverOffset: 5 }] }, 
            options: armarOpciones('explicitud', 'dona', null, [tracksClean, tracksExplicit]) 
        };

        const config4 = { 
            type: 'bar', 
            data: { labels: titulosCortos, datasets: [{ label: 'Tiempo de Reproducción (Min)', data: duracionTotal, backgroundColor: '#9C27B0', borderRadius: 4 }] }, 
            options: armarOpciones('Minutos Totales por Álbum', 'ocultarX', titulosCompletos, cancionesPorAlbum) 
        };

        const config5 = { 
            type: 'polarArea', 
            data: { labels: ['Chill (<100 BPM)', 'Bailable (100-125 BPM)', 'Eufórica (>125 BPM)'], datasets: [{ data: [bpmChill, bpmRitmo, bpmFuego], backgroundColor: ['rgba(0, 188, 212, 0.7)', 'rgba(30, 215, 96, 0.7)', 'rgba(255, 152, 0, 0.7)'], borderWidth: 2, borderColor: '#181818' }] }, 
            options: armarOpciones('Frecuencia Cardíaca (BPM)', 'polar', null, [tracksChill, tracksRitmo, tracksFuego]) 
        };

        if(skContainer) skContainer.style.display = 'none';
        if(realContainer) realContainer.style.display = 'block';

        const renderizarYClic = (id, configObj, tituloModal) => {
            const canvas = document.getElementById(id);
            if (!canvas) return; 
            const configSmall = Object.assign({}, configObj);
            configSmall.options = Object.assign({}, configObj.options);
            configSmall.options.onClick = null;

            window.graficosArt.push(new Chart(canvas.getContext('2d'), configSmall));
            const cajaContenedora = canvas.parentElement;
            cajaContenedora.style.cursor = 'zoom-in';
            cajaContenedora.onclick = () => ui.abrirModalGrafico(configObj, tituloModal);
        };

        renderizarYClic('art-chart-1', config1, 'Análisis de Popularidad e Impacto');
        renderizarYClic('art-chart-2', config2, 'Volumen de Producción Musical');
        renderizarYClic('art-chart-3', config3, 'Segmentación de Contenido');
        renderizarYClic('art-chart-4', config4, 'Tiempo Total de Reproducción');
        renderizarYClic('art-chart-5', config5, 'Distribución de Energía (BPM)');

    } catch (e) {
        if(skContainer) skContainer.innerHTML = '<div style="color:var(--error); padding: 20px;">Error al cargar el ADN del artista.</div>';
    }
}

window.perfilCargarMasAlbumes = async function(id, boton) {
    const originalText = boton.innerText;
    boton.innerText = 'Consultando...';
    boton.disabled = true;
    try {
        const respuesta = await api.post(`/artistas/${id}/cargar-mas-albumes`, {});
        const coincidencia = respuesta.match(/\d+/);
        const cantidad = coincidencia ? parseInt(coincidencia[0], 10) : 0;

        if (cantidad > 0) {
            window.mostrarNotificacionVibeforge("Sincronización Exitosa", `Se agregaron <b>${cantidad}</b> álbumes con éxito al catálogo.`);
            
            const albumesCrudos = await api.get(`/albumes/artista/${id}`);
            const esAdmin = auth.rolActual === 'ADMIN';
            const albumesSeguros = esAdmin ? albumesCrudos : albumesCrudos.filter(a => a.activo !== false);

            let albumesHTML = '';
            const IMG_DISCO = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
            albumesSeguros.forEach(album => {
                const estaAlbumOculto = album.activo === false;
                const opacidad = estaAlbumOculto ? '0.4' : '1';
                const escalaGrises = estaAlbumOculto ? 'grayscale(100%)' : 'none';
                const bordeAdmin = estaAlbumOculto && esAdmin ? 'border: 1px solid #ff9800;' : ''; 
                
                let controlesAdminAlbum = '';
                if (esAdmin) {
                    const txtBtnAlb = estaAlbumOculto ? 'Mostrar' : 'Ocultar';
                    const colorBtnAlb = estaAlbumOculto ? '#4caf50' : '#ff9800';
                    controlesAdminAlbum = `
                        <div style="display: flex; gap: 8px; margin-top: auto; padding-top: 10px; width: 100%;">
                            <button onclick="event.stopPropagation(); perfilToggleAlbum(${album.idAlbum}, this)" style="flex: 1; padding: 8px 4px; font-size: 11px; background: ${colorBtnAlb}; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition:0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'">${txtBtnAlb}</button>
                            <button onclick="event.stopPropagation(); perfilEliminarAlbum(${album.idAlbum}, '${album.titulo.replace(/'/g, "\\'")}')" style="flex: 1; padding: 8px 4px; font-size: 11px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition:0.2s;" onmouseover="this.style.background='#f03a75'" onmouseout="this.style.background='#e91e63'">Borrar</button>
                        </div>
                    `;
                }

                albumesHTML += `
                    <div class="card" id="card-album-${album.idAlbum}" onclick="navigate('/user/album?id=${album.idAlbum}')" style="opacity: ${opacidad}; filter: ${escalaGrises}; ${bordeAdmin} display: flex; flex-direction: column; transition: 0.3s; height: 100%; box-sizing: border-box;">
                        <img src="${album.imagenUrl || IMG_DISCO}" class="card-img" style="border-radius: var(--radius-md); width: 100%; aspect-ratio: 1; object-fit: cover; margin-bottom: 10px;" alt="Portada">
                        <div class="card-title" style="margin-bottom: 5px; width: 100%; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 13px;">${album.titulo}</div>
                        ${controlesAdminAlbum}
                    </div>
                `;
            });
            document.getElementById('grid-albumes').innerHTML = albumesHTML;
            window.albumesParaGraficos = esAdmin ? albumesCrudos : albumesSeguros;

        } else {
            window.mostrarNotificacionVibeforge("Catálogo Completo", "El artista ya tiene todos sus álbumes cargados.", false);
        }
    } catch(e) {
        window.mostrarNotificacionVibeforge("Error de Red", "Fallo al traer los álbumes desde Deezer.", false);
    } finally {
        boton.innerText = originalText;
        boton.disabled = false;
    }
};

window.perfilToggleArtista = async function(id, boton) {
    try {
        const estadoActualizado = await api.patch(`/artistas/${id}/toggle-activo`, {});
        const estaAhoraOculto = estadoActualizado === false;
        
        boton.innerText = estaAhoraOculto ? 'Mostrar' : 'Ocultar';
        boton.style.background = estaAhoraOculto ? '#4caf50' : '#ff9800';
        
        const banner = document.getElementById('artist-banner');
        banner.style.transition = "0.4s ease";
        banner.style.filter = estaAhoraOculto ? "grayscale(100%) opacity(0.7)" : "none";
        
        const nameDiv = document.getElementById('artist-name');
        const badge = document.getElementById('badge-oculto');
        
        if (estaAhoraOculto && !badge) {
            nameDiv.innerHTML += `<span id="badge-oculto" style="background: #ff9800; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; vertical-align: middle; margin-left: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.5);">${SVG_BLOCK} OCULTO AL PÚBLICO</span>`;
        } else if (!estaAhoraOculto && badge) {
            badge.remove();
        }
        
    } catch(e) {
        alert("Error de conexión con el servidor.");
    }
};

window.perfilEliminarArtista = async function(id, nombre) {
    const seguro = await window.mostrarConfirmacionVibeforge(
        "¿Eliminar de la Base de Datos?",
        `¿Estás seguro de eliminar a <b>${nombre}</b> y TODO su contenido asociado? Esta operación es irreversible.`
    );
    
    if (seguro) {
        try {
            await api.borrar(`/artistas/${id}`);
            navigate('/admin/artistas'); 
        } catch(e) {
            window.mostrarNotificacionVibeforge("Error", "Error crítico al intentar eliminar en cascada.", false);
        }
    }
};

window.perfilToggleAlbum = async function(id, boton) {
    try {
        const estadoActualizado = await api.patch(`/albumes/${id}/toggle-activo`, {});
        const estaAhoraOculto = estadoActualizado === false;
        
        boton.innerText = estaAhoraOculto ? 'Mostrar' : 'Ocultar';
        boton.style.background = estaAhoraOculto ? '#4caf50' : '#ff9800';
        
        const tarjeta = document.getElementById(`card-album-${id}`);
        tarjeta.style.opacity = estaAhoraOculto ? '0.4' : '1';
        tarjeta.style.filter = estaAhoraOculto ? 'grayscale(100%)' : 'none';

    } catch(e) {
        alert("Error de comunicación.");
    }
};

window.perfilEliminarAlbum = async function(id, titulo) {
    const seguro = await window.mostrarConfirmacionVibeforge(
        "¿Destruir Álbum?",
        `¿Deseas borrar permanentemente el disco <b>"${titulo}"</b> junto con todas sus pistas de audio?`
    );
    
    if (seguro) {
        try {
            await api.borrar(`/albumes/${id}`);
            const tarjetaAlbum = document.getElementById(`card-album-${id}`);
            if (tarjetaAlbum) {
                tarjetaAlbum.style.transform = 'scale(0.8)';
                tarjetaAlbum.style.opacity = '0';
                setTimeout(() => tarjetaAlbum.remove(), 300);
            }
            
            if(window.albumesParaGraficos) {
                window.albumesParaGraficos = window.albumesParaGraficos.filter(a => a.idAlbum !== id);
            }
        } catch(e) {
            window.mostrarNotificacionVibeforge("Fallo", "No se pudo procesar la baja del álbum.", false);
        }
    }
};

window.toggleFavoritoArtista = async function(idArtista) {
    const btn = document.getElementById('btn-fav-artist');
    const iconSpan = document.getElementById('icon-fav-artist');
    const isCurrentlyFav = btn.style.color === 'rgb(30, 215, 96)' || btn.style.color === '#1ed760';

    btn.style.transform = 'scale(0.8)';
    setTimeout(() => btn.style.transform = 'scale(1)', 150);

    try {
        if (isCurrentlyFav) {
            await api.borrar(`/favoritos/artista/${idArtista}/usuario/${auth.idActual}`);
            btn.style.color = 'white';
            btn.style.borderColor = '#555';
            iconSpan.innerHTML = SVG_STAR_OUTLINE;
        } else {
            await api.post(`/favoritos/artista/${idArtista}/usuario/${auth.idActual}`);
            btn.style.color = '#1ed760';
            btn.style.borderColor = '#1ed760';
            iconSpan.innerHTML = SVG_STAR_FILLED;
            if (typeof confetti === 'function') confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 }, colors: ['#1ed760', '#FFD700'] });
        }
    } catch (e) {
        alert("Error al actualizar el artista favorito.");
    }
};