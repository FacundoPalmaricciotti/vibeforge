let catalogoCompleto = [];
let paginaActual = 1;
const ITEMS_POR_PAGINA = 40;
let ordenAlfabetico = 'asc';
let verSoloOcultos = false;

var SVG_CHECK_ADMIN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 5px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
var SVG_PLUS_ADMIN = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 5px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

async function renderAdminArtistas() {
    if (auth.rolActual !== 'ADMIN') {
        navigate('/login');
        return;
    }

    let skArtistasHTML = '';
    for(let i=0; i<12; i++) {
        skArtistasHTML += `
            <div class="card-artista" style="background: #181818; border: 1px solid #282828; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2); pointer-events: none;">
                <div class="skeleton-shimmer sk-avatar" style="width: 100px; height: 100px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.4);"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 15px; margin-bottom: 15px;"></div>
                <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: auto;">
                    <div style="display: flex; gap: 6px; width: 100%;">
                        <div class="skeleton-shimmer sk-rect" style="flex: 1; height: 26px;"></div>
                        <div class="skeleton-shimmer sk-rect" style="flex: 1; height: 26px;"></div>
                    </div>
                    <div style="display: flex; gap: 6px; width: 100%;">
                        <div class="skeleton-shimmer sk-rect" style="flex: 1; height: 26px;"></div>
                        <div class="skeleton-shimmer sk-rect" style="flex: 1; height: 26px;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    const contenidoHTML = `
        <style>
            .admin-container { padding: 30px; box-sizing: border-box; width: 100%; max-width: 1200px; margin: 0 auto; overflow-x: hidden; }
            .grid-crud-artistas { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; width: 100%; box-sizing: border-box; }
            @media (max-width: 768px) {
                .admin-container { padding: 15px; }
                .admin-header h1 { font-size: 1.8rem !important; }

                .search-box-crud { flex-direction: column; gap: 10px !important; }
                .search-box-crud input, .search-box-crud button { width: 100%; padding: 12px !important; }

                .filtros-catalogo { flex-direction: column; align-items: stretch !important; gap: 10px !important; }
                .filtros-catalogo > div { flex-wrap: nowrap; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .filtros-catalogo input[type="text"] { width: 100%; min-width: 100% !important; }

                .grid-crud-artistas { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }

                .card-artista { padding: 12px 8px !important; min-width: 0; }
                .card-artista img, .card-artista .sk-avatar { width: 70px !important; height: 70px !important; margin-bottom: 10px !important; }

                .card-artista-titulo { 
                    font-size: 13px !important; 
                    margin-bottom: 10px !important; 
                    width: 100%; 
                    max-width: 100%; 
                    display: block; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                    white-space: nowrap; 
                }

                .botones-accion { flex-direction: column; gap: 4px !important; }
                .botones-accion div { flex-direction: row; width: 100%; gap: 4px !important; }
                .botones-accion button, .botones-accion .sk-rect { padding: 6px 4px !important; font-size: 10px !important; height: 24px !important; }
            }
        </style>

        <div class="animate-fade-in admin-container">
            <header style="margin-bottom: 30px;" class="admin-header">
                <p style="color: var(--primary); text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 2px; margin-bottom: 5px;">Consola de Entrada</p>
                <h1 style="font-weight: 800; color: white; margin: 0;">Gestión de Catálogo</h1>
            </header>

            <section style="background: #181818; padding: 25px; border-radius: 12px; border: 1px solid #333; margin-bottom: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                <h2 style="color: white; margin-top: 0; margin-bottom: 15px; font-size: 1.2rem;">Buscador Inteligente Deezer</h2>
                <div class="search-box-crud" style="display: flex; gap: 15px;">
                    <input type="text" id="input-buscar-artista" placeholder="Buscar en Deezer para importar..." 
                           style="flex: 1; min-width: 200px; padding: 14px 20px; border-radius: 4px; border: 1px solid #444; background: #222; color: white; font-size: 14px; outline: none; transition: 0.2s; box-sizing: border-box;"
                           onfocus="this.style.borderColor='#00bcd4'" onblur="this.style.borderColor='#444'"
                           onkeypress="if(event.key === 'Enter') buscarArtistaParaGestion()">
                    
                    <button onclick="buscarArtistaParaGestion()" id="btn-buscar"
                            style="padding: 14px 30px; border-radius: 4px; background: #00bcd4; color: black; font-weight: bold; border: none; cursor: pointer; font-size: 14px; transition: 0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'">
                        Buscar
                    </button>
                </div>
                <div id="resultado-busqueda" style="margin-top: 25px; display: none;"></div>
            </section>

            <section>
                <div class="filtros-catalogo" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px;">
                    <h2 style="color: white; font-size: 1.4rem; margin: 0;">Artistas en el Servidor</h2>
                    
                    <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
                        <label style="color: var(--text-muted); font-size: 13px; display: flex; align-items: center; gap: 8px; cursor: pointer; background: #181818; padding: 8px 15px; border-radius: 500px; border: 1px solid #333;">
                            <input type="checkbox" id="chk-solo-ocultos" onchange="alternarFiltroOcultos()" style="accent-color: #ff9800; width: 15px; height: 15px;">
                            Solo Suspendidos
                        </label>

                        <select id="sel-orden" onchange="alternarOrdenAlfa()" style="padding: 10px 15px; border-radius: 500px; border: 1px solid #333; background: #222; color: white; outline: none; cursor: pointer; font-size: 13px;">
                            <option value="asc">A - Z (Ascendente)</option>
                            <option value="desc">Z - A (Descendente)</option>
                        </select>
                        
                        <input type="text" id="filtro-local" placeholder="Filtrar catálogo local..." oninput="filtrarCatalogoLocal()"
                               style="padding: 10px 15px; border-radius: 500px; border: 1px solid #333; background: #222; color: white; min-width: 250px; outline: none; transition: 0.2s;"
                               onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'">
                    </div>
                </div>

                <div class="grid-crud-artistas" id="grid-crud-artistas">
                    ${skArtistasHTML}
                </div>

                <div id="controles-paginacion" style="display: flex; justify-content: center; gap: 15px; margin-top: 30px; align-items: center; flex-wrap: wrap;">
                </div>
            </section>
        </div>
    `;

    document.getElementById('app').innerHTML = ui.renderLayout(contenidoHTML);
    await inicializarCatalogoLocal();
}

async function inicializarCatalogoLocal() {
    try {
        catalogoCompleto = await api.get('/artistas');
        paginaActual = 1;
        renderizarPaginaLocal();
    } catch (err) {
        document.getElementById('grid-crud-artistas').innerHTML = '<p style="color:var(--error);">Error al mapear el catálogo local.</p>';
    }
}

window.alternarFiltroOcultos = function() {
    verSoloOcultos = document.getElementById('chk-solo-ocultos').checked;
    paginaActual = 1;
    renderizarPaginaLocal();
};

window.alternarOrdenAlfa = function() {
    ordenAlfabetico = document.getElementById('sel-orden').value;
    paginaActual = 1;
    renderizarPaginaLocal();
};

window.filtrarCatalogoLocal = function() {
    paginaActual = 1;
    renderizarPaginaLocal();
};

window.renderizarPaginaLocal = function() {
    const textoFiltro = document.getElementById('filtro-local').value.toLowerCase();
    let filtrados = catalogoCompleto.filter(a => {
        const coincideTexto = a.nombreArtistico.toLowerCase().includes(textoFiltro);
        const coincideOculto = verSoloOcultos ? (a.activo === false) : true;
        return coincideTexto && coincideOculto;
    });

    filtrados.sort((a, b) => {
        if (ordenAlfabetico === 'asc') {
            return a.nombreArtistico.localeCompare(b.nombreArtistico);
        } else {
            return b.nombreArtistico.localeCompare(a.nombreArtistico);
        }
    });
    
    const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const indiceFin = indiceInicio + ITEMS_POR_PAGINA;
    const artistasPagina = filtrados.slice(indiceInicio, indiceFin);
    const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA) || 1;
    const grid = document.getElementById('grid-crud-artistas');
    const controles = document.getElementById('controles-paginacion');
    const IMG_SILUETA = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
    
    if (filtrados.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-muted);">No hay coincidencias con esos filtros.</p>';
        controles.innerHTML = '';
        return;
    }

    let html = '';
    artistasPagina.forEach(a => {
        const estaActivo = a.activo !== false; 
        const opacidad = estaActivo ? '1' : '0.5';
        const imgSegura = a.imagenUrl || IMG_SILUETA;
        
        html += `
            <div class="card-artista" style="background: #181818; border: 1px solid #282828; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; text-align: center; opacity: ${opacidad}; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.2); min-width: 0;">
                
                <img onclick="navigate('/user/artist?id=${a.idArtista}')" title="Ir al perfil maestro" src="${imgSegura}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.4); cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onerror="this.src='${IMG_SILUETA}'">
                
                <div class="card-artista-titulo" title="${a.nombreArtistico.replace(/'/g, "&#39;")}" onclick="navigate('/user/artist?id=${a.idArtista}')" style="font-weight: bold; color: white; font-size: 15px; margin-bottom: 15px; width: 100%; max-width: 100%; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='white'">${a.nombreArtistico}</div>
                
                <div class="botones-accion" style="display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: auto;">
                    <div style="display: flex; gap: 6px; width: 100%;">
                        <button onclick="abrirEditorNombre(${a.idArtista}, '${a.nombreArtistico.replace(/'/g, "\\'").replace(/"/g, "&quot;")}')" style="flex: 1; padding: 6px; font-size: 12px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; transition:0.2s;" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#333'">Editar</button>
                        <button onclick="solicitarMasAlbumes(${a.idArtista}, this)" style="flex: 1; padding: 6px; font-size: 12px; background: #1ed760; color: black; border: none; border-radius: 4px; cursor: pointer; transition:0.2s;" onmouseover="this.style.background='#1fef6e'" onmouseout="this.style.background='#1ed760'">+ Álbumes</button>
                    </div>
                    <div style="display: flex; gap: 6px; width: 100%;">
                        <button onclick="cambiarVisibilidadArtista(${a.idArtista}, this)" style="flex: 1; padding: 6px; font-size: 12px; background: ${estaActivo ? '#ff9800' : '#4caf50'}; color: white; border: none; border-radius: 4px; cursor: pointer; transition:0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='brightness(1)'">${estaActivo ? 'Ocultar' : 'Mostrar'}</button>
                        <button onclick="eliminarArtistaDefinitivo(${a.idArtista}, '${a.nombreArtistico.replace(/'/g, "\\'").replace(/"/g, "&quot;")}')" style="flex: 1; padding: 6px; font-size: 12px; background: #e91e63; color: white; border: none; border-radius: 4px; cursor: pointer; transition:0.2s;" onmouseover="this.style.background='#f03a75'" onmouseout="this.style.background='#e91e63'">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;

    controles.innerHTML = `
        <button onclick="cambiarPagina(-1)" ${paginaActual === 1 ? 'disabled' : ''} style="padding: 8px 16px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; opacity: ${paginaActual === 1 ? '0.5' : '1'}; transition:0.2s;">Anterior</button>
        <span style="color: var(--text-muted); font-size: 14px;">Página ${paginaActual} de ${totalPaginas} (Total: ${filtrados.length})</span>
        <button onclick="cambiarPagina(1)" ${paginaActual === totalPaginas ? 'disabled' : ''} style="padding: 8px 16px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; opacity: ${paginaActual === totalPaginas ? '0.5' : '1'}; transition:0.2s;">Siguiente</button>
    `;
};

window.cambiarPagina = function(direccion) {
    paginaActual += direccion;
    renderizarPaginaLocal();
};

async function cargarListaCrudArtistas() {
    await inicializarCatalogoLocal();
}

window.cambiarVisibilidadArtista = async function(id, boton) {
    try {
        const nuevoEstado = await api.patch(`/artistas/${id}/toggle-activo`, {});
        const artista = catalogoCompleto.find(a => a.idArtista === id);
        if (artista) artista.activo = nuevoEstado;
        
        const card = boton.closest('.card-artista');
        if (card) {
            card.style.opacity = nuevoEstado ? '1' : '0.5';
            boton.innerText = nuevoEstado ? 'Ocultar' : 'Mostrar';
            boton.style.background = nuevoEstado ? '#ff9800' : '#4caf50';
        }
    } catch (err) {
        alert("No se pudo cambiar el estado de visibilidad.");
    }
};
window.mostrarNotificacionVibeforge = function(titulo, mensaje, esExito = true) {
    const modalExistente = document.getElementById('modal-vibe-notificacion');
    if (modalExistente) modalExistente.remove();

    const colorBorde = esExito ? 'var(--primary)' : '#ff9800';
    const modalHTML = `
        <div id="modal-vibe-notificacion" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10000; backdrop-filter: blur(4px);">
            <div class="animate-fade-in" style="background: #282828; padding: 30px; border-radius: 12px; border: 1px solid ${colorBorde}; width: 400px; max-width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.8); text-align: center; box-sizing: border-box;">
                <h3 style="color: white; margin-top: 0; margin-bottom: 15px; font-size: 1.4rem;">${titulo}</h3>
                <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6; margin-bottom: 25px;">${mensaje}</p>
                <button onclick="document.getElementById('modal-vibe-notificacion').remove()" 
                        style="padding: 12px 30px; background: ${esExito ? 'var(--primary)' : '#444'}; color: ${esExito ? 'black' : 'white'}; border: none; border-radius: 500px; font-weight: bold; cursor: pointer; transition: 0.2s; width: 100%; font-size: 15px;"
                        onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                    Entendido
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

window.mostrarConfirmacionVibeforge = function(titulo, mensaje) {
    return new Promise((resolve) => {
        const modalExistente = document.getElementById('modal-vibe-confirmacion');
        if (modalExistente) modalExistente.remove();

        const modalHTML = `
            <div id="modal-vibe-confirmacion" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 10000; backdrop-filter: blur(5px);">
                <div class="animate-fade-in" style="background: #282828; padding: 30px; border-radius: 12px; border: 1px solid #e91e63; width: 420px; max-width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.8); box-sizing: border-box;">
                    <h3 style="color: white; margin-top: 0; margin-bottom: 15px; font-size: 1.4rem;">${titulo}</h3>
                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.5; margin-bottom: 25px;">${mensaje}</p>
                    <div style="display: flex; justify-content: flex-end; gap: 12px;">
                        <button id="btn-vibe-cancel" style="padding: 12px 20px; background: transparent; color: white; border: 1px solid #555; border-radius: 500px; cursor: pointer; font-weight: bold; transition: 0.2s;" onmouseover="this.style.background='#333'">Cancelar</button>
                        <button id="btn-vibe-accept" style="padding: 12px 25px; background: #e91e63; color: white; border: none; border-radius: 500px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        document.getElementById('btn-vibe-cancel').onclick = () => {
            document.getElementById('modal-vibe-confirmacion').remove();
            resolve(false);
        };
        document.getElementById('btn-vibe-accept').onclick = () => {
            document.getElementById('modal-vibe-confirmacion').remove();
            resolve(true);
        };
    });
};

window.eliminarArtistaDefinitivo = async function(id, nombre) {
    const seguro = await mostrarConfirmacionVibeforge(
        "¿Desea eliminar al artista?", 
        `¿Estás completamente seguro de eliminar a <b>${nombre}</b>? Esta acción destruirá de forma permanente todos sus álbumes y pistas de audio de la base de datos local.`
    );
    
    if (seguro) {
        try {
            await api.borrar(`/artistas/${id}`);
            catalogoCompleto = catalogoCompleto.filter(a => a.idArtista !== id);
            renderizarPaginaLocal();
        } catch (err) {
            mostrarNotificacionVibeforge("Error de Servidor", "No se pudo eliminar al artista.", false);
        }
    }
};

window.solicitarMasAlbumes = async function(id, boton) {
    const textoOriginal = boton.innerText;
    boton.disabled = true;
    boton.style.background = '#555';
    boton.innerText = '...';

    try {
        const respuesta = await api.post(`/artistas/${id}/cargar-mas-albumes`, {});
        const coincidencia = respuesta.match(/\d+/);
        const cantidad = coincidencia ? parseInt(coincidencia[0], 10) : 0;

        if (cantidad > 0) {
            mostrarNotificacionVibeforge("Sincronización Exitosa", `Se agregaron <b>${cantidad}</b> álbumes con éxito al catálogo local.`);
        } else {
            mostrarNotificacionVibeforge("Catálogo Completo", "El artista ya tiene todos sus álbumes registrados en el servidor.", false);
        }

    } catch (err) {
        mostrarNotificacionVibeforge("Fallo de Comunicación", "Ocurrió un problema consultando la discografía externa.", false);
    } finally {
        boton.disabled = false;
        boton.style.background = '#1ed760';
        boton.innerText = textoOriginal;
    }
};
window.abrirEditorNombre = function(id, nombreActual) {
    const modalExistente = document.getElementById('modal-vibeforge-edicion');
    if (modalExistente) modalExistente.remove();

    const modalHTML = `
        <div id="modal-vibeforge-edicion" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(5px);">
            <div class="animate-fade-in" style="background: #181818; padding: 30px; border-radius: 12px; border: 1px solid var(--primary); width: 400px; max-width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.8); box-sizing: border-box;">
                <h3 style="color: white; margin-top: 0; margin-bottom: 20px; font-size: 1.5rem;">Renombrar Artista</h3>
                
                <label style="color: var(--text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; display: block;">Nombre Artístico</label>
                <input type="text" id="input-nuevo-nombre" value="${nombreActual}" 
                       style="width: 100%; padding: 14px; background: #222; color: white; border: 1px solid #444; border-radius: 500px; margin-bottom: 25px; box-sizing: border-box; outline: none; font-size: 14px; transition: 0.2s;"
                       onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#444'">
                
                <div style="display: flex; justify-content: flex-end; gap: 12px;">
                    <button onclick="document.getElementById('modal-vibeforge-edicion').remove()" 
                            style="padding: 12px 20px; background: transparent; color: white; border: 1px solid #555; border-radius: 500px; cursor: pointer; font-weight: bold; transition: 0.2s;"
                            onmouseover="this.style.background='#333'">Cancelar</button>
                    <button onclick="ejecutarGuardadoModal(${id})" 
                            style="padding: 12px 25px; background: var(--primary); color: black; border: none; border-radius: 500px; font-weight: bold; cursor: pointer; transition: 0.2s;"
                            onmouseover="this.style.transform='scale(1.05)'">Guardar Cambios</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('input-nuevo-nombre').focus();
};

window.ejecutarGuardadoModal = async function(id) {
    const nuevoNombre = document.getElementById('input-nuevo-nombre').value.trim();
    if (!nuevoNombre) return;

    try {
        await api.put(`/artistas/${id}`, {
            nombre: nuevoNombre,
            nombreArtistico: nuevoNombre
        });
        document.getElementById('modal-vibeforge-edicion').remove();
        const artista = catalogoCompleto.find(a => a.idArtista === id);
        if (artista) {
            artista.nombreArtistico = nuevoNombre;
            renderizarPaginaLocal();
        }
    } catch (err) {
        alert("No se pudieron guardar los cambios en el servidor.");
    }
};

window.buscarArtistaParaGestion = async function() {
    const input = document.getElementById('input-buscar-artista');
    const btn = document.getElementById('btn-buscar');
    const resultadoDiv = document.getElementById('resultado-busqueda');
    const nombre = input.value.trim();

    if (!nombre) {
        resultadoDiv.style.display = 'block';
        resultadoDiv.innerHTML = '<span style="color: var(--error);">Escribí un nombre para buscar.</span>';
        return;
    }

    btn.disabled = true;
    btn.innerText = 'Buscando...';
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `
        <div style="background: #222; border: 1px dashed #555; padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
            <div class="skeleton-shimmer sk-avatar" style="width: 60px; height: 60px;"></div>
            <div style="flex-grow: 1;">
                <div class="skeleton-shimmer sk-rect" style="width: 150px; height: 20px; margin-bottom: 8px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 100px; height: 12px;"></div>
            </div>
            <div class="skeleton-shimmer sk-pill" style="width: 110px; height: 38px;"></div>
        </div>
    `;

    try {
        const locales = await api.get('/artistas');
        const encontradoLocal = locales.find(a => a.nombreArtistico.toLowerCase() === nombre.toLowerCase());

        if (encontradoLocal) {
            resultadoDiv.innerHTML = `
                <div class="animate-fade-in" style="background: rgba(0, 188, 212, 0.05); border: 1px solid #00bcd4; padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <img src="${encontradoLocal.imagenUrl}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                    <div style="flex-grow: 1;">
                        <h3 style="color: white; margin: 0 0 5px 0;">${encontradoLocal.nombreArtistico}</h3>
                        <p style="color: #00bcd4; margin: 0; font-size: 13px; font-weight: bold;">
                            ${SVG_CHECK_ADMIN} El artista ya se encuentra en el catálogo local.
                        </p>
                    </div>
                    
                    <button onclick="navigate('/user/artist?id=${encontradoLocal.idArtista}')" 
                            style="padding: 10px 20px; background: transparent; color: #00bcd4; border: 1px solid #00bcd4; border-radius: 500px; font-weight: bold; cursor: pointer; transition: 0.2s;"
                            onmouseover="this.style.background='rgba(0, 188, 212, 0.1)'" onmouseout="this.style.background='transparent'">
                        Ir al Perfil
                    </button>
                </div>
            `;
        } else {
            const dataDeezer = await api.get('/artistas/buscar-deezer?query=' + encodeURIComponent(nombre));
            
            if (dataDeezer && dataDeezer.data && dataDeezer.data.length > 0) {
                const artistaDeezer = dataDeezer.data[0];
                resultadoDiv.innerHTML = `
                    <div class="animate-fade-in" style="background: #222; border: 1px dashed #555; padding: 20px; border-radius: 8px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                        <img src="${artistaDeezer.picture_medium}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                        <div style="flex-grow: 1;">
                            <h3 style="color: white; margin: 0 0 5px 0;">${artistaDeezer.name}</h3>
                            <p style="color: var(--text-muted); margin: 0; font-size: 13px;">No registrado en la plataforma.</p>
                        </div>
                        <button onclick="ejecutarImportacionCatalogo('${artistaDeezer.name.replace(/'/g, "\\'")}')" id="btn-ejecutar-import" 
                                style="display: flex; align-items: center; gap:5px; padding: 10px 20px; background: #00bcd4; color: black; font-weight: bold; border: none; border-radius: 500px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            ${SVG_PLUS_ADMIN} Importar
                        </button>
                    </div>
                `;
            } else {
                resultadoDiv.innerHTML = '<span style="color: var(--error);">No se encontró ningún artista con ese nombre.</span>';
            }
        }
    } catch (error) {
        resultadoDiv.innerHTML = '<span style="color: var(--error);">Error al realizar la búsqueda. Comprobá la conexión.</span>';
    } finally {
        btn.disabled = false;
        btn.innerText = 'Buscar';
    }
};

window.ejecutarImportacionCatalogo = async function(nombreExacto) {
    const btn = document.getElementById('btn-ejecutar-import');
    const resultadoDiv = document.getElementById('resultado-busqueda');
    
    btn.disabled = true;
    btn.style.background = '#555';
    btn.innerText = 'Descargando...';

    try {
        const url = `/artistas/importar?nombreArtista=${encodeURIComponent(nombreExacto)}`;
        await api.post(url, {});

        resultadoDiv.innerHTML = `
            <div class="animate-fade-in" style="background: rgba(0, 188, 212, 0.1); border: 1px solid #00bcd4; padding: 15px; border-radius: 8px; color: #00bcd4; text-align: center; font-weight: bold;">
                ${SVG_CHECK_ADMIN} ¡Éxito! ${nombreExacto} importado a la BD.
            </div>
        `;
        
        cargarListaCrudArtistas(); 

    } catch (err) {
        resultadoDiv.innerHTML = '<span style="color: var(--error);">Error crítico al intentar importar la discografía.</span>';
    }
};