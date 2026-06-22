var SVG_WAVE_HOME = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-left: 8px;"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v0"></path><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"></path><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v6"></path><path d="M16 16v-3a2 2 0 0 0-2-2"></path><path d="M6 14v-.5a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"></path><path d="M2 15a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-3a2 2 0 0 0-2-2v3"></path></svg>`;
var SVG_FIRE_HOME = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e91e63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
var SVG_FIRE_SMALL = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 3px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
var SVG_SPARKLES = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"></path></svg>`;
var SVG_MIC_HOME = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`;
var SVG_DISC_HOME = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`;
var SVG_LIST_HOME = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;

async function renderUserHome() {
    if (!auth.estaAutenticado()) {
        navigate('/login');
        return;
    }

    if (auth.rolActual !== 'ADMIN' && localStorage.getItem('ob_done') !== 'true') {
        lanzarOnboarding();
    }

    const hora = new Date().getHours();
    let saludoHora = "Buenas noches";
    if (hora >= 6 && hora < 12) saludoHora = "Buenos días";
    else if (hora >= 12 && hora < 20) saludoHora = "Buenas tardes";

    let skHistorialHTML = '';
    for(let i=0; i<6; i++) {
        skHistorialHTML += `
            <div class="sk-history-item">
                <div class="skeleton-shimmer" style="width: 56px; height: 56px; flex-shrink: 0;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 50%; height: 12px;"></div>
            </div>`;
    }

    let skGridHTML = '';
    for(let i=0; i<12; i++) {
        skGridHTML += `
            <div class="card" style="cursor: default; pointer-events: none;">
                <div class="skeleton-shimmer sk-avatar" style="width: 100%; aspect-ratio: 1; margin-bottom: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.5);"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 70%; height: 14px; margin: 0 auto 8px auto;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 40%; height: 11px; margin: 0 auto 8px auto;"></div>
                <div class="skeleton-shimmer sk-pill" style="width: 60%; height: 12px; margin: 5px auto 0 auto;"></div>
            </div>`;
    }

    let contenidoHTML = `
        <div class="home-wrapper" style="padding-top: 10px;">
            <h2 id="home-saludo" style="margin-bottom: 20px; font-size: 1.8rem; display: flex; align-items: center;">${saludoHora}</h2>
            
            <div id="home-historial-section" class="grid-historial" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; margin-bottom: 40px;">
                ${skHistorialHTML}
            </div>

            <h2 style="margin-bottom: 20px;" id="home-title-seccion">${SVG_SPARKLES} Sugerencias para ti</h2>
            <div class="grid" id="grid-home-artistas">
                ${skGridHTML}
            </div>
        </div>
    `;
    
    document.getElementById('app').innerHTML = ui.renderLayout(contenidoHTML);

    let historial = [];
    try {
        historial = await api.get('/historial/usuario/' + auth.idActual) || [];
    } catch (e) {
        console.error("Error al traer el historial desde el servidor:", e);
    }

    const esPrimeraVez = historial.length === 0;

    if (!esPrimeraVez) {
        let historialRealHTML = '';
        historial.forEach(item => {
            historialRealHTML += `
                <div onclick="navigate('/user/${item.tipoItem}?id=${item.idReferencia}')"
                     class="history-card"
                     style="display: flex; align-items: center; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; cursor: pointer; transition: 0.2s; height: 56px;"
                     onmouseover="this.style.background='rgba(255,255,255,0.2)'" 
                     onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                    <img src="${item.imagenUrl}" 
                         style="width: 56px; height: 56px; object-fit: cover; flex-shrink: 0;" 
                         loading="lazy"
                         onerror="this.src='https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021'">
                    <div style="padding: 0 12px; overflow: hidden; flex-grow: 1; display: flex; align-items: center;">
                        <div style="font-weight: 700; color: white; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${item.titulo}
                        </div>
                    </div>
                </div>`;
        });
        document.getElementById('home-historial-section').innerHTML = historialRealHTML;
        document.getElementById('home-title-seccion').innerHTML = `${SVG_SPARKLES} Sugerencias para ti`;
    } else {
        document.getElementById('home-historial-section').remove();
        document.getElementById('home-saludo').innerHTML = `${saludoHora}, ${auth.nombre || 'Usuario'} ${SVG_WAVE_HOME}`;
        document.getElementById('home-saludo').style.marginBottom = '8px';
        const pSub = document.createElement('p');
        pSub.style.cssText = "color: var(--text-muted); margin-bottom: 30px;";
        pSub.textContent = "Descubrí los artistas más escuchados del momento.";
        document.getElementById('home-saludo').after(pSub);
    }
    cargarArtistasInicio(esPrimeraVez);
}
 
async function cargarArtistasInicio(esPrimeraVez) {
    try {
        const artistasCrudos = await api.get('/artistas/populares');
        
        const artistasSeguros = auth.rolActual === 'ADMIN' 
            ? artistasCrudos 
            : artistasCrudos.filter(a => a.activo !== false);

        const grid = document.getElementById('grid-home-artistas');
        const IMG_SILUETA = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
        
        const cantidad = 50;
        let tarjetasHTML = '';
        
        artistasSeguros.slice(0, cantidad).forEach(artista => {
            const imagen = artista.imagenUrl || IMG_SILUETA;
            const idSeguro = artista.idArtista || artista.id;
            
            const infoPopularidad = artista.popularidad ? `<div style="font-size:12px; color:var(--primary); margin-top:5px; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${SVG_FIRE_SMALL} ${artista.popularidad} de Popularidad</div>` : '';
            
            const estaOculto = artista.activo === false;
            const opacidad = estaOculto ? '0.4' : '1';
            const bordeAdmin = estaOculto ? 'border: 1px solid #ff9800;' : '';

            tarjetasHTML += `
                <div class="card" onclick="navigate('/user/artist?id=${idSeguro}')" style="opacity: ${opacidad}; ${bordeAdmin}">
                    <img src="${imagen}" class="card-img" 
                         style="margin: 0 auto 10px auto; display: block;" 
                         alt="Foto" loading="lazy"
                         onerror="this.src='${IMG_SILUETA}'">
                    <div class="card-title" style="text-align: center;">${artista.nombreArtistico}</div>
                    <div class="card-subtitle" style="text-align: center;">${artista.generoMusical || 'Artista'}</div>
                    <div style="text-align: center;">${infoPopularidad}</div>
                </div>
            `;
        });
        
        grid.innerHTML = tarjetasHTML;
        
    } catch (error) {
        const grid = document.getElementById('grid-home-artistas');
        if (grid) grid.innerHTML = `<p style="color: var(--error);">Error al cargar el catálogo de artistas.</p>`;
    }
}