window.paginaActualMuro = 0;
window.tieneMasMuro = true;
window.cargandoMuro = false;
window.perfilVistoActualmente = null;
window.infoDueñoMuroActual = null;
window.loSigueActualmente = false;

var SVG_CHAT_PROFILE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
var SVG_LOCK_PROFILE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
var SVG_GLOBE_PROFILE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
var SVG_BANGER = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
var SVG_CHILL = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>`;
var SVG_MELANCOLICO = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`;
var SVG_HYPED = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
var SVG_WAVE_COMMENT = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M0 11.5a.5.5 0 0 1 .5-.5h1.396a.25.25 0 0 0 .207-.11l.743-1.114a1.25 1.25 0 0 1 2.067-.043l.533.711a.25.25 0 0 0 .4 0l1.733-2.31a1.25 1.25 0 0 1 1.964-.043l.533.64a.25.25 0 0 0 .386.004l1.53-1.836a1.25 1.25 0 0 1 1.927-.044L15.65 10.1a.25.25 0 0 0 .194.1h.156a.5.5 0 0 1 0 1h-.156a1.25 1.25 0 0 1-.97-.498l-1.444-1.805a.25.25 0 0 0-.385.009l-1.53 1.836a1.25 1.25 0 0 1-1.927.022l-.533-.64a.25.25 0 0 0-.372-.016L6.4 12.418a1.25 1.25 0 0 1-2 0l-.533-.71a.25.25 0 0 0-.414.008L2.71 12.83A1.25 1.25 0 0 1 1.67 13.5H.5a.5.5 0 0 1-.5-.5v-1z"/></svg>`;
var SVG_REPLY_COMMENT = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 5px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
const svgEdit = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
const svgDelete = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e91e63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;

const svgs = {
    banger: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-4 5-4 10a4 4 0 1 0 8 0c0-5-4-10-4-10z"></path></svg>`,
    chill: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>`,
    melancolico: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`,
    hyped: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
};

const moodConfig = {
    banger:      { emoji: SVG_BANGER,      label: 'OnFire',      avatarClass: 'avatar-banger',      cardClass: 'mood-banger',      badgeClass: 'badge-banger'      },
    chill:       { emoji: SVG_CHILL,       label: 'Chill',       avatarClass: 'avatar-chill',       cardClass: 'mood-chill',       badgeClass: 'badge-chill'       },
    melancolico: { emoji: SVG_MELANCOLICO, label: 'Melancólico', avatarClass: 'avatar-melancolico', cardClass: 'mood-melancolico', badgeClass: 'badge-melancolico' },
    hyped:       { emoji: SVG_HYPED,       label: 'Hyped',       avatarClass: 'avatar-hyped',       cardClass: 'mood-hyped',       badgeClass: 'badge-hyped'       },
};
const moodParticles = { banger: '🔥', chill: '💧', melancolico: '❄️', hyped: '⚡' };

window.formatStat = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' mill.';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' mil';
    return num.toString();
};

window.cacheUsuariosPerfiles = window.cacheUsuariosPerfiles || {};

async function obtenerDatosUsuarioDinamico(idUsuario, forzarRecarga = false) {
    const avatarPorDefecto = 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc';

    if (!forzarRecarga && window.cacheUsuariosPerfiles[idUsuario] && window.cacheUsuariosPerfiles[idUsuario].rol) {
        if (auth && parseInt(idUsuario) === parseInt(auth.idActual)) {
            window.cacheUsuariosPerfiles[idUsuario].imagenUrl = localStorage.getItem('user_avatar') || avatarPorDefecto;
        }
        return window.cacheUsuariosPerfiles[idUsuario];
    }
    
    try {
        const usuario = await api.get('/usuarios/' + idUsuario);
        window.cacheUsuariosPerfiles[idUsuario] = {
            nombre: usuario.nombre || usuario.username || 'Usuario',
            handle: usuario.handle || null, 
            imagenUrl: usuario.imagenUrl || avatarPorDefecto,
            estadoAnimo: usuario.estadoAnimo || null,
            rol: (usuario.rol || 'USER').toUpperCase(),
            bio: usuario.bio || null,
            privPerfil: usuario.privPerfil || 'TODOS',
            privComentarios: usuario.privComentarios || 'TODOS'
        };

        if (auth && parseInt(idUsuario) === parseInt(auth.idActual)) {
            localStorage.setItem('user_avatar', window.cacheUsuariosPerfiles[idUsuario].imagenUrl);
        }

        return window.cacheUsuariosPerfiles[idUsuario];
    } catch(e) {
        if (window.cacheUsuariosPerfiles[idUsuario]) return window.cacheUsuariosPerfiles[idUsuario];
        return { nombre: 'Usuario Desconocido', handle: null, imagenUrl: avatarPorDefecto, rol: 'USER', privPerfil: 'TODOS', privComentarios: 'TODOS' };
    }
}

async function renderProfile() {
    if (!auth.estaAutenticado()) {
        navigate('/login');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idPerfilABuscar = urlParams.get('id') || auth.idActual;
    const esMiPropioPerfil = parseInt(idPerfilABuscar) === parseInt(auth.idActual);
    let skPostsHTML = '';
    for(let i=0; i<3; i++) {
        skPostsHTML += `
            <div style="background: #181818; padding: 15px; border-radius: 12px; border: 1px solid #282828; margin-bottom: 15px;">
                <div style="display: flex; gap: 12px; margin-bottom: 15px; align-items: center;">
                    <div class="skeleton-shimmer sk-avatar" style="width: 40px; height: 40px;"></div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        <div class="skeleton-shimmer sk-rect" style="width: 120px; height: 12px;"></div>
                        <div class="skeleton-shimmer sk-rect" style="width: 80px; height: 10px;"></div>
                    </div>
                </div>
                <div class="skeleton-shimmer sk-rect" style="width: 100%; height: 14px; margin-bottom: 8px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 14px; margin-bottom: 20px;"></div>
                <div style="display: flex; gap: 20px; border-top: 1px solid #282828; padding-top: 15px;">
                    <div class="skeleton-shimmer sk-pill" style="width: 60px; height: 20px;"></div>
                    <div class="skeleton-shimmer sk-pill" style="width: 60px; height: 20px;"></div>
                </div>
            </div>
        `;
    }

    let skeletonLayout = ui.renderLayout(`
        <div style="display: block !important; max-width: 800px; margin: 0 auto; padding: 20px 15px; box-sizing: border-box; overflow-x: hidden; width: 100%; text-align: left !important;">
            <div style="display: flex; align-items: center; gap: 30px; margin-bottom: 30px; background: #181818; padding: 30px; border-radius: 12px; border: 1px solid #282828;">
                <div class="skeleton-shimmer sk-avatar" style="width: 150px; height: 150px; flex-shrink: 0;"></div>
                <div style="flex: 1; width: 100%;">
                    <div class="skeleton-shimmer sk-rect" style="width: 60%; height: 32px; margin-bottom: 15px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 40%; height: 16px; margin-bottom: 25px;"></div>
                    <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                        <div class="skeleton-shimmer sk-rect" style="width: 80px; height: 14px;"></div>
                        <div class="skeleton-shimmer sk-rect" style="width: 80px; height: 14px;"></div>
                    </div>
                    <div class="skeleton-shimmer sk-pill" style="width: 120px; height: 35px;"></div>
                </div>
            </div>
            <div style="display: flex; gap: 20px; border-bottom: 1px solid #333; margin-bottom: 25px;">
                <div style="width: 100px; height: 20px;" class="skeleton-shimmer sk-rect"></div>
                <div style="width: 120px; height: 20px;" class="skeleton-shimmer sk-rect"></div>
            </div>
            <div>${skPostsHTML}</div>
        </div>
    `);

    document.getElementById('app').innerHTML = skeletonLayout;
    let dueñoMuro = await obtenerDatosUsuarioDinamico(idPerfilABuscar, true);
    let stats = { seguidores: 0, siguiendo: 0, loSigue: false, estaBloqueado: false };
    try {
        stats = await api.get(`/social/estadisticas/${idPerfilABuscar}/visitante/${auth.idActual}`);
    } catch(e) { 
        console.warn("No se pudieron cargar las estadísticas sociales"); 
    }

    let accesoDenegado = false;
    let mensajePrivacidad = "";

    if (!esMiPropioPerfil && auth.rolActual !== 'ADMIN') {
        const nivelPrivacidad = dueñoMuro.privPerfil || 'TODOS';
        
        if (nivelPrivacidad === 'NADIE') {
            accesoDenegado = true;
            mensajePrivacidad = "Este perfil es totalmente privado. 🕵️‍♂️";
        } else if (nivelPrivacidad === 'SEGUIDORES' && !stats.loSigue) {
            accesoDenegado = true;
            mensajePrivacidad = "Este perfil es privado. Seguí a esta cuenta para ver sus publicaciones y playlists. 🔒";
        }
    }

  let botonesInteraccion = '';

    if (!esMiPropioPerfil && dueñoMuro.rol !== 'ADMIN') {
        if (auth.rolActual === 'ADMIN') {
            const estaSuspendido = dueñoMuro.suspendido === true;
            const txtBan = estaSuspendido ? 'Habilitar Cuenta' : 'Suspender Cuenta';
            const colorBan = estaSuspendido ? '#1ed760' : '#e91e63';
            
            botonesInteraccion = `
                <button onclick="toggleSuspensionDesdePerfil(${idPerfilABuscar}, this)" style="width: 100%; border: 1px solid ${colorBan}; color: ${colorBan}; background: transparent; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s;">
                    ${txtBan}
                </button>
            `;
        } else {
            const btnSeguirTxt = stats.loSigue ? 'Siguiendo' : 'Seguir';
            const btnSeguirStyle = stats.loSigue ? 'background: #282828; color: white; border: 1px solid #444;' : 'background: #1ed760; color: black; border: none;';

            if (stats.estaBloqueado) {
                botonesInteraccion = `
                    <button onclick="toggleBloquear(${idPerfilABuscar}, true)" style="width: 100%; background: #282828; border: 1px solid transparent; color: white; font-weight: bold; cursor: pointer; padding: 10px; border-radius: 8px; transition: 0.2s;" onmouseover="this.style.borderColor='#1ed760'; this.style.color='#1ed760'" onmouseout="this.style.borderColor='transparent'; this.style.color='white'">
                        Desbloquear
                    </button>
                `;
            } else {
                botonesInteraccion = `
                    <div style="display: flex; width: 100%; gap: 10px;">
                        <button id="btn-seguir-perfil" onclick="toggleSeguir(${idPerfilABuscar}, ${stats.loSigue})" style="flex: 1; font-weight: bold; padding: 10px; border-radius: 8px; cursor: pointer; transition: 0.2s; ${btnSeguirStyle}">${btnSeguirTxt}</button>
                        <button onclick="toggleBloquear(${idPerfilABuscar}, false)" style="flex: 1; background: #282828; border: 1px solid transparent; color: white; font-weight: bold; cursor: pointer; padding: 10px; border-radius: 8px; transition: 0.2s;" onmouseover="this.style.borderColor='#e91e63'; this.style.color='#e91e63'" onmouseout="this.style.borderColor='transparent'; this.style.color='white'">
                            Bloquear
                        </button>
                    </div>
                `;
            }
        }
    }

    const controlesAccionHTML = esMiPropioPerfil ? `
        <select id="select-animo" onchange="actualizarAnimo(this.value)" style="width: 100%; box-sizing: border-box; background: #282828; color: white; border: 1px solid #444; padding: 10px 15px; border-radius: 8px; outline: none; appearance: none; -webkit-appearance: none; font-size: 14px; font-weight: bold; cursor: pointer; background-image: url('data:image/svg+xml;utf8,<svg fill=%22white%22 height=%2224%22 viewBox=%220 0 24 24%22 width=%2224%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M7 10l5 5 5-5z%22/><path d=%22M0 0h24v24H0z%22 fill=%22none%22/></svg>'); background-repeat: no-repeat; background-position-x: 96%; background-position-y: 50%;">
            <option value="">☁️ ¿Cómo te sentís hoy?</option>
            <option value="☀️ Feliz">☀️ Feliz</option>
            <option value="🌧️ Melancólico">🌧️ Melancólico</option>
            <option value="🦇 Dark">🦇 Dark</option>
            <option value="🔥 Motivado">🔥 Motivado</option>
            <option value="🎧 Vibing">🎧 Vibing</option>
            <option value="🧘 Zen">🧘 Zen</option>
        </select>
    ` : botonesInteraccion;

    const visibilidadEstadisticas = dueñoMuro.rol === 'ADMIN' ? 'display: none;' : 'display: flex;';

    const badgeAnimoAjeno = (!esMiPropioPerfil && dueñoMuro.estadoAnimo) 
        ? `<span style="font-size: 12px; background: rgba(255,255,255,0.1); padding: 3px 10px; border-radius: 100px; color: #ccc; border: 1px solid #333; font-weight: normal;">${dueñoMuro.estadoAnimo}</span>` 
        : '';

    let bioHTML = '';
    if (dueñoMuro.bio) {
        bioHTML = `<div class="ig-bio-text"><span ${esMiPropioPerfil ? `onclick="navigate('/user/settings')" style="cursor: pointer;" title="Editar biografía"` : ''}>${dueñoMuro.bio.trim().replace(/\n/g, '<br>')}</span>${esMiPropioPerfil ? `<span class="edit-bio-icon" onclick="navigate('/user/settings')" title="Editar Bio">${svgEdit}</span>` : ''}</div>`;
    } else if (esMiPropioPerfil) {
        bioHTML = `<div class="ig-bio-text" onclick="navigate('/user/settings')" style="color: var(--primary); cursor: pointer; font-weight: bold;">+ Añadir una biografía</div>`;
    }

    const composerMuroHTML = esMiPropioPerfil ? `
        <div style="background: #181818; padding: 15px; border-radius: 12px; border: 1px solid #282828; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <div style="display: flex; gap: 12px; align-items: flex-start;">
                <img src="${dueñoMuro.imagenUrl}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 1px solid #333;">
                <div style="flex-grow: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px;">
                    <textarea id="texto-pensamiento-muro" rows="1" placeholder="¿Qué estás pensando, ${dueñoMuro.nombre.split(' ')[0]}?" style="width: 100%; background: transparent; border: none; color: white; outline: none; font-size: 15px; resize: none; font-family: inherit; line-height: 1.4; padding: 5px 0;" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px'"></textarea>
                    <div style="display: flex; justify-content: flex-end; border-top: 1px solid #2a2a2a; padding-top: 8px;">
                        <button onclick="publicarDesdeMuro()" style="padding: 6px 16px; border-radius: 500px; background: var(--primary); color: black; font-weight: bold; font-size: 13px; border: none; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Publicar</button>
                    </div>
                </div>
            </div>
        </div>
    ` : '';

    const SVG_LOCK_LARGE = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:15px; color:var(--text-muted);"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    const SVG_BLOCK_LARGE = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:15px; color:var(--text-muted);"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;

    const handleAMostrar = dueñoMuro.handle ? dueñoMuro.handle : dueñoMuro.nombre.split(' ')[0];

    document.getElementById('app').innerHTML = ui.renderLayout(`
        <style>
            .ig-profile-wrapper { max-width: 800px; margin: 0 auto; padding: 20px 15px; box-sizing: border-box; overflow-x: hidden; width: 100%; }
            .ig-top-handle { font-size: 24px; font-weight: 800; color: white; margin: 0 0 20px 0; line-height: 1; display: flex; align-items: center; gap: 8px; justify-content: flex-start !important; text-align: left !important; width: 100%; }
            .ig-header-main { display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; width: 100%; gap: 15px; }
            .ig-avatar { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 2px solid #333; flex-shrink: 0; cursor: zoom-in; }
            .ig-stats-container { display: flex; flex: 1; justify-content: space-around; align-items: center; }
            .ig-stat-block { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
            .ig-stat-num { color: white; font-weight: 800; font-size: 18px; line-height: 1.2; }
            .ig-stat-label { color: white; font-size: 14px; line-height: 1.2; }
            .ig-real-name-container { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; justify-content: flex-start !important; text-align: left !important; width: 100%; flex-wrap: wrap; }
            .ig-real-name { font-size: 16px; font-weight: 700; color: white; line-height: 1.2; }
            .ig-bio-text { position: relative; color: white; font-size: 15px; line-height: 1.4; white-space: pre-wrap; word-wrap: break-word; text-align: left !important; width: 100%; display: block !important; padding-right: 25px; margin-bottom: 20px; }
            .edit-bio-icon { position: absolute; bottom: 0; right: 0; color: var(--text-muted); cursor: pointer; }
            .ig-actions { display: flex; width: 100%; margin-bottom: 30px; }
            
            @media (max-width: 768px) {
                .ig-profile-wrapper { padding: 15px 12px; }
                .ig-top-handle { margin-bottom: 15px; }               
                .ig-header-main { gap: 10px; margin-bottom: 12px; }
                .ig-avatar { width: 80px; height: 80px; }
                .ig-stat-num { font-size: 16px; }
                .ig-stat-label { font-size: 12px; }                
                .ig-real-name { font-size: 15px; }
                .ig-bio-text { font-size: 14px; margin-bottom: 15px; }
                .edit-bio-icon { bottom: -2px; }
            }
        </style>
        
        <div class="ig-profile-wrapper">
            
            <div style="margin-bottom: 25px; text-align: left !important; width: 100%; display: block !important;">
                <h1 style="font-size: 24px; font-weight: 800; color: white; margin: 0; line-height: 1; display: inline-block; vertical-align: middle;">${handleAMostrar}</h1>
                ${dueñoMuro.rol === 'ADMIN' ? '<span style="font-size:18px; margin-left:8px; vertical-align: middle;" title="Administrador">👑</span>' : ''}
            </div>

            <div class="ig-header-main">
                <img onclick="abrirVisorImagen('${dueñoMuro.imagenUrl}')" src="${dueñoMuro.imagenUrl}" class="ig-avatar">
                
                <div class="ig-stats-container" style="${visibilidadEstadisticas}">
                    <div class="ig-stat-block">
                        <span id="count-posts" class="ig-stat-num">-</span>
                        <span class="ig-stat-label">Publicaciones</span>
                    </div>
                    <div class="ig-stat-block" onclick="abrirModalRedSocial('seguidores', ${idPerfilABuscar})">
                        <span id="count-seguidores" class="ig-stat-num">${window.formatStat(stats.seguidores)}</span>
                        <span class="ig-stat-label">Seguidores</span>
                    </div>
                    <div class="ig-stat-block" onclick="abrirModalRedSocial('siguiendo', ${idPerfilABuscar})">
                        <span id="count-siguiendo" class="ig-stat-num">${window.formatStat(stats.siguiendo)}</span>
                        <span class="ig-stat-label">Seguidos</span>
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; align-items: flex-start !important; justify-content: flex-start !important; width: 100%; text-align: left !important;">
                <div class="ig-real-name-container">
                    <span class="ig-real-name">${dueñoMuro.nombre}</span>
                    ${badgeAnimoAjeno}
                </div>
                ${bioHTML}
            </div>

            <div class="ig-actions">
                ${controlesAccionHTML}
            </div>

            ${accesoDenegado ? `
                <div style="text-align: center; color: var(--text-muted); padding: 60px 20px; background: #181818; border-radius: 12px; border: 1px dashed #333;">
                    ${SVG_LOCK_LARGE}
                    <div style="font-size: 16px; font-weight: bold; color: white; margin-bottom: 8px;">Cuenta Privada</div>
                    <div>${mensajePrivacidad}</div>
                </div>
            ` : `
                <div style="display: flex; gap: 20px; border-bottom: 1px solid #333; margin-bottom: 25px; flex-wrap: wrap;">
                    <div id="tab-pensamientos" onclick="cambiarPestaña('pensamientos')" style="color: white; font-weight: bold; padding-bottom: 10px; border-bottom: 3px solid #1ed760; cursor: pointer; transition: 0.2s;">Pensamientos</div>
                    <div id="tab-playlists" onclick="cambiarPestaña('playlists')" style="color: var(--text-muted); font-weight: bold; padding-bottom: 10px; border-bottom: 3px solid transparent; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='white'" onmouseout="if(this.style.borderBottomColor==='transparent') this.style.color='var(--text-muted)'">Playlists Públicas</div>
                </div>

                <div id="muro-pensamientos" style="display: flex; flex-direction: column; gap: 0;">
                    ${composerMuroHTML}
                    <div id="contenedor-publicaciones" style="display: flex; flex-direction: column; gap: 20px;">
                        ${stats.estaBloqueado ? `
                            <div style="text-align: center; color: var(--text-muted); padding: 40px; background: #181818; border-radius: 12px; border: 1px dashed #333;">
                                ${SVG_BLOCK_LARGE}
                                <div>Muro bloqueado.</div>
                            </div>
                        ` : '<div style="text-align: center; color: var(--text-muted); padding: 40px;">Cargando muro...</div>'}
                    </div>
                </div>

                <div id="muro-playlists" style="display: none; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px;"></div>
            `}
        </div>
    `);

    if (esMiPropioPerfil) {
        try {
            const usuario = await api.get('/usuarios/' + auth.idActual);
            if (usuario.estadoAnimo) {
                document.getElementById('select-animo').value = usuario.estadoAnimo;
            }
        } catch (e) {}
    }

    window.estaBloqueadoActualmente = stats.estaBloqueado;
    window.perfilVistoActualmente = idPerfilABuscar;

    if (!stats.estaBloqueado && !accesoDenegado) {
        cargarPensamientos(idPerfilABuscar, dueñoMuro, stats.loSigue);
    }
}

window.cambiarPestaña = function(pestaña) {
    const tabP = document.getElementById('tab-pensamientos');
    const tabPl = document.getElementById('tab-playlists');
    const muroP = document.getElementById('muro-pensamientos');
    const muroPl = document.getElementById('muro-playlists');

    if (pestaña === 'pensamientos') {
        tabP.style.cssText = 'color: white; font-weight: bold; padding-bottom: 10px; border-bottom: 3px solid #1ed760; cursor: pointer; transition: 0.2s;';
        tabPl.style.cssText = 'color: var(--text-muted); font-weight: bold; padding-bottom: 10px; border-bottom: 3px solid transparent; cursor: pointer; transition: 0.2s;';
        muroP.style.display = 'flex';
        muroPl.style.display = 'none';
    } else {
        tabP.style.cssText = 'color: var(--text-muted); font-weight: bold; padding-bottom: 10px; border-bottom: 3px solid transparent; cursor: pointer; transition: 0.2s;';
        tabPl.style.cssText = 'color: white; font-weight: bold; padding-bottom: 10px; border-bottom: 3px solid #1ed760; cursor: pointer; transition: 0.2s;';
        muroP.style.display = 'none';
        muroPl.style.display = 'grid';
        
        cargarPlaylistsPerfil(window.perfilVistoActualmente);
    }
};

const SVG_BLOCK_LARGE = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:15px; color:var(--text-muted);"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;
window.cargarPlaylistsPerfil = async function(idPerfil) {
    const contenedor = document.getElementById('muro-playlists');
    if (window.estaBloqueadoActualmente) {
        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 40px; background: #181818; border-radius: 12px; border: 1px dashed #333;">
                ${SVG_BLOCK_LARGE}
                <div>Playlists bloqueadas.</div>
            </div>`;
        return; 
    }

    let skPlaylistsHTML = '';
    for(let i=0; i<4; i++) {
        skPlaylistsHTML += `
            <div class="card" style="background: #181818; padding: 15px; border-radius: 8px; cursor: default; pointer-events: none; display: flex; flex-direction: column;">
                <div class="skeleton-shimmer sk-rect" style="width: 100%; aspect-ratio: 1; border-radius: 6px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 16px; margin-bottom: 8px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 50%; height: 13px; margin-bottom: 15px;"></div>
                <div class="skeleton-shimmer sk-pill" style="width: 100%; height: 28px; margin-top: auto;"></div>
            </div>
        `;
    }
    contenedor.innerHTML = skPlaylistsHTML;
    
    try {
        const esMiPropioPerfil = parseInt(idPerfil) === parseInt(auth.idActual);
        const url = esMiPropioPerfil ? `/playlists/usuario/${idPerfil}` : `/playlists/usuario/${idPerfil}/publicas`;        
        const playlists = await api.get(url);

        if (!playlists || playlists.length === 0) {
            contenedor.innerHTML = '<div style="color: var(--text-muted); grid-column: 1 / -1; text-align: center; padding: 40px; background: #181818; border-radius: 12px; border: 1px dashed #333;">No hay playlists públicas para mostrar.</div>';
            return;
        }

        let html = '';
        
        for (let pl of playlists) {
            const esPublica = pl.esPublica !== false; 
            const iconoCandado = (!esPublica && esMiPropioPerfil) ? `<span style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.8); width: 28px; height: 28px; border-radius:50%; display: flex; align-items: center; justify-content: center;" title="Privada">${SVG_LOCK_PROFILE}</span>` : '';            
            const btnPrivacidad = esMiPropioPerfil ? `
                <button onclick="event.stopPropagation(); alternarPrivacidadPlaylist(${pl.idPlaylist}, this)" style="display: flex; justify-content: center; align-items: center; gap: 6px; width: 100%; margin-top: 10px; padding: 6px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; transition: 0.2s;" onmouseover="this.style.background='#444'" onmouseout="this.style.background='#333'">
                    ${esPublica ? `<span>Hacer Privada</span> <span style="display:flex; align-items:center;">${SVG_LOCK_PROFILE}</span>` : `<span>Hacer Pública</span> <span style="display:flex; align-items:center;">${SVG_GLOBE_PROFILE}</span>`}
                </button>
            ` : '';

            const tituloCorrecto = pl.titulo || pl.nombre || "Playlist Sin Título";
            let coverCorrecto = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
            
            if (pl.imagenUrl) {
                coverCorrecto = pl.imagenUrl;
            } else if (pl.canciones && pl.canciones.length > 0) {
                try {
                    const albumInfo = await api.get('/albumes/' + pl.canciones[0].idAlbum);
                    if (albumInfo && albumInfo.imagenUrl) {
                        coverCorrecto = albumInfo.imagenUrl;
                    }
                } catch(e) {}
            }

            html += `
                <div class="card animate__animated animate__fadeIn" onclick="navigate('/user/playlist?id=${pl.idPlaylist}')" style="background: #181818; padding: 15px; border-radius: 8px; cursor: pointer; position: relative; display: flex; flex-direction: column;">
                    <div style="position: relative;">
                        <img src="${coverCorrecto}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 6px; margin-bottom: 15px; box-shadow: 0 8px 24px rgba(0,0,0,0.5);">
                        ${iconoCandado}
                    </div>
                    <div style="font-weight: bold; color: white; font-size: 16px; margin-bottom: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${tituloCorrecto}</div>
                    <div style="color: var(--text-muted); font-size: 13px; margin-bottom: 10px;">${pl.canciones ? pl.canciones.length + ' tracks' : 'Playlist'}</div>
                    <div style="margin-top: auto;">
                        ${btnPrivacidad}
                    </div>
                </div>
            `;
        }
        
        contenedor.innerHTML = html;
    } catch (e) {
        contenedor.innerHTML = '<div style="color: #e91e63; grid-column: 1 / -1; text-align: center;">Error al cargar las playlists.</div>';
    }
};

window.alternarPrivacidadPlaylist = async function(idPlaylist, botonElement) {
    try {
        await api.patch(`/playlists/${idPlaylist}/privacidad`);
        if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Privacidad actualizada", "success");        
        const esAhoraPublica = botonElement.innerText.includes('Pública');
        botonElement.innerHTML = esAhoraPublica ? `<span>Hacer Privada</span> <span style="display:flex; align-items:center;">${SVG_LOCK_PROFILE}</span>` : `<span>Hacer Pública</span> <span style="display:flex; align-items:center;">${SVG_GLOBE_PROFILE}</span>`;
        const card = botonElement.closest('.card');
        const imgContainer = card.querySelector('div[style*="position: relative"]'); 
        
        if (esAhoraPublica) {
            const candado = imgContainer.querySelector('span');
            if(candado) candado.remove();
        } else {
            imgContainer.innerHTML += `<span style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.8); padding:5px; border-radius:50%; display: flex; align-items: center;" title="Privada">${SVG_LOCK_PROFILE}</span>`;
        }
    } catch(e) {
        ui.alerta("Error al actualizar la privacidad.");
    }
};

window.cargarPensamientos = async function(idDueñoMuro, infoDueñoMuro, loSigueActual, esNuevaCarga = true) {
    const contenedorPublicaciones = document.getElementById('contenedor-publicaciones');
    const avatarGuardado = localStorage.getItem('user_avatar') || 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc';
    
    if (esNuevaCarga) {
        window.paginaActualMuro = 0;
        window.tieneMasMuro = true;
        window.cargandoMuro = true;
        window.perfilVistoActualmente = idDueñoMuro;
        window.infoDueñoMuroActual = infoDueñoMuro;
        window.loSigueActualmente = loSigueActual;
        
        contenedorPublicaciones.innerHTML = `
            <div id="muro-posts-lista" style="display: flex; flex-direction: column; gap: 0;"></div>
            <div id="muro-centinela" style="height: 60px; display: flex; justify-content: center; align-items: center; margin-top: 15px;">
                <div class="noti-spinner" style="border-color: #333; border-top-color: #1ed760;"></div>
            </div>
        `;

        if (window._muroObserver) window._muroObserver.disconnect();
        window._muroObserver = new IntersectionObserver((entradas) => {
            const centinelaVisible = entradas[0].isIntersecting;
            if (centinelaVisible && window.tieneMasMuro && !window.cargandoMuro) {
                window.cargarPensamientos(window.perfilVistoActualmente, window.infoDueñoMuroActual, window.loSigueActualmente, false);
            }
        }, { 
            rootMargin: '0px 0px 400px 0px'
        });
        
        window._muroObserver.observe(document.getElementById('muro-centinela'));
    }

    window.cargandoMuro = true;
    const centinela = document.getElementById('muro-centinela');
    if (centinela && !esNuevaCarga) {
        centinela.innerHTML = `<div class="noti-spinner" style="border-color: #333; border-top-color: #1ed760;"></div>`;
    }

    const svgEdit = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>`;
    const svgDelete = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>`;
    const svgWave = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M0 11.5a.5.5 0 0 1 .5-.5h1.396a.25.25 0 0 0 .207-.11l.743-1.114a1.25 1.25 0 0 1 2.067-.043l.533.711a.25.25 0 0 0 .4 0l1.733-2.31a1.25 1.25 0 0 1 1.964-.043l.533.64a.25.25 0 0 0 .386.004l1.53-1.836a1.25 1.25 0 0 1 1.927-.044L15.65 10.1a.25.25 0 0 0 .194.1h.156a.5.5 0 0 1 0 1h-.156a1.25 1.25 0 0 1-.97-.498l-1.444-1.805a.25.25 0 0 0-.385.009l-1.53 1.836a1.25 1.25 0 0 1-1.927.022l-.533-.64a.25.25 0 0 0-.372-.016L6.4 12.418a1.25 1.25 0 0 1-2 0l-.533-.71a.25.25 0 0 0-.414.008L2.71 12.83A1.25 1.25 0 0 1 1.67 13.5H.5a.5.5 0 0 1-.5-.5v-1z"/></svg>`;

    try {
        const [respuestaPaginada, misLikesBD, misWavesComentariosBD] = await Promise.all([
            api.get(`/pensamientos/usuario/${idDueñoMuro}?page=${window.paginaActualMuro}&size=10`),
            esNuevaCarga ? api.get('/pensamientos/likes/usuario/' + auth.idActual) : Promise.resolve(Array.from(window.likesReales || [])),
            esNuevaCarga ? api.get('/comentarios/waves/usuario/' + auth.idActual) : Promise.resolve(Array.from(window.wavesComentariosReales || []))
        ]);
        
        if (esNuevaCarga) {
            window.likesReales = new Set(misLikesBD);
            window.wavesComentariosReales = new Set(misWavesComentariosBD);
        }

        const pensamientos = respuestaPaginada.content;
        
        try {
            const countPostsEl = document.getElementById('count-posts');
            if (countPostsEl) {
                let total = 0;
                if (respuestaPaginada.totalElements !== undefined) {
                    total = respuestaPaginada.totalElements;
                } else if (respuestaPaginada.content) {
                    total = respuestaPaginada.content.length;
                } else if (Array.isArray(respuestaPaginada)) {
                    total = respuestaPaginada.length;
                }
                countPostsEl.innerText = window.formatStat(total);
            }
        } catch(errorConteo) {
            console.warn("No se pudo calcular el número exacto de posts", errorConteo);
        }

        if (pensamientos.length === 0 && esNuevaCarga) {
            document.getElementById('muro-posts-lista').innerHTML = '<div class="animate__animated animate__fadeIn" style="text-align: center; color: var(--text-muted); padding: 40px; background: #181818; border-radius: 12px; border: 1px dashed #333;">Aún no hay publicaciones en esta sesión.</div>';
            if (centinela) centinela.innerHTML = '';
            window.cargandoMuro = false;
            window.tieneMasMuro = false;
            return;
        }

        const esPropietarioMuro = parseInt(idDueñoMuro) === parseInt(auth.idActual);
        const esAdminGlobal = auth.rolActual === 'ADMIN';
        let puedeComentar = true;
        
        if (!esPropietarioMuro && !esAdminGlobal) {
            if (infoDueñoMuro.privComentarios === 'SEGUIDORES' && !loSigueActual) puedeComentar = false; 
        }

        let htmlNuevo = '';
        pensamientos.forEach((p, index) => {
            const delay = esNuevaCarga ? index * 60 : index * 40;
            const fechaObj = new Date(p.fechaPublicacion);
            const fechaStr = fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
            const tieneLike = window.likesReales.has(p.idPensamiento);
            const colorCorazon = tieneLike ? '#00bcd4' : 'var(--text-muted)';
            const waveAnimClass = tieneLike ? 'waved' : '';
            const contenidoSeguro = p.contenido.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
            const esPropietarioPost = parseInt(p.idUsuario) === parseInt(auth.idActual);
            
            let botonesAdmin = '';
            if (esPropietarioPost) {
                botonesAdmin = `
                    <div style="position: absolute; right: 0; top: 0; display: flex; gap: 12px;">
                        <button onclick="abrirModalEditarPensamiento(${p.idPensamiento}, '${contenidoSeguro}')" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s; padding: 5px;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--text-muted)'" title="Editar">${svgEdit}</button>
                        <button onclick="abrirModalEliminarPensamiento(${p.idPensamiento})" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s; padding: 5px;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='var(--text-muted)'" title="Eliminar">${svgDelete}</button>
                    </div>
                `;
            } else if (esAdminGlobal) {
                botonesAdmin = `
                    <div style="position: absolute; right: 0; top: 0; display: flex; gap: 12px;">
                        <button onclick="abrirModalEliminarPensamiento(${p.idPensamiento})" style="background: transparent; border: none; color: #e91e63; cursor: pointer; transition: 0.2s; padding: 5px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="Moderación: Eliminar Post">${svgDelete}</button>
                    </div>
                `;
            }

            let cajaComentariosHTML = puedeComentar ? `
                <div style="position: sticky; bottom: 0; background: #181818; padding: 10px 0; margin-top: 15px; border-top: 1px solid #282828; z-index: 10;">
                    <div id="reply-banner-${p.idPensamiento}" style="display: none; justify-content: space-between; align-items: center; padding: 0 5px 8px 5px; margin-bottom: 8px; border-bottom: 1px solid #222;">
                        <span style="font-size: 12px; color: var(--text-muted);">Respondiendo a <b id="reply-name-${p.idPensamiento}" style="color: white;"></b></span>
                        <button onclick="cancelarRespuesta(${p.idPensamiento})" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px; padding: 0 5px;">✕</button>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="${avatarGuardado}" class="avatar avatar-banger" id="composerAvatar-${p.idPensamiento}" style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;">
                        <div style="flex-grow: 1; background: #222; border: 1px solid #333; border-radius: 500px; display: flex; align-items: center; padding: 4px 6px 4px 15px; min-width: 0;">
                            <input type="hidden" id="currentMood-${p.idPensamiento}" value="BANGER">
                            <input type="hidden" id="replyPadre-${p.idPensamiento}" value="">
                            <input type="hidden" id="replyMention-${p.idPensamiento}" value="">
                            <input class="composer-input" id="input-comm-new-${p.idPensamiento}" placeholder="Suma tu barra..." style="background: transparent; color: white; border: none; font-size: 14px; outline: none; flex-grow: 1; min-width: 0; padding: 8px 0;" onkeydown="if(event.key === 'Enter') enviarComentarioMaster(${p.idPensamiento}, ${p.idUsuario})">
                            <button class="send-btn" onclick="enviarComentarioMaster(${p.idPensamiento}, ${p.idUsuario})" style="background: #00bcd4; border: none; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: 8px; transition: 0.2s; padding: 0;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: -2px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>
                </div>
            ` : `
                <div style="position: sticky; bottom: 0; background: #181818; padding: 15px 0; margin-top: 15px; border-top: 1px solid #282828; z-index: 10; display:flex; align-items:center; justify-content:center; gap:8px; color: var(--text-muted); font-size: 13px; font-weight: 500;">
                    ${SVG_LOCK_PROFILE} Solo los seguidores pueden comentar acá.
                </div>
            `;

            htmlNuevo += `
                <div id="pensamiento-${p.idPensamiento}" class="animate__animated animate__fadeInUp" style="animation-delay:${delay}ms; --animate-duration:0.35s; background: #181818; padding: 15px 15px 10px 15px; border-radius: 12px; border: 1px solid #282828; margin-bottom: 15px;">
                    <div style="display: flex; gap: 12px; margin-bottom: 10px; align-items: center; position: relative;">
                        <img onclick="navigate('/user/profile?id=${p.idUsuario}')" src="${infoDueñoMuro.imagenUrl}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; cursor: pointer;">
                        <div onclick="navigate('/user/profile?id=${p.idUsuario}')" style="cursor: pointer; display: flex; flex-direction: column;">
                            <div style="font-weight: bold; color: white; font-size: 15px;">${infoDueñoMuro.handle ? `@${infoDueñoMuro.handle}` : infoDueñoMuro.nombre}</div>
                            <div style="font-size: 11px; color: var(--text-muted);">${fechaStr}</div>
                        </div>
                        ${botonesAdmin}
                    </div>
                    
                    <div style="color: #eee; font-size: 14px; line-height: 1.4; margin-bottom: 15px; word-wrap: break-word; padding-left: 2px;">${contenidoSeguro}</div>
                    
                    <div style="display: flex; gap: 20px; padding: 10px 5px 5px 5px; border-top: 1px solid #282828;">
                        <button class="action-btn ${waveAnimClass}" onclick="toggleLikePost(this, ${p.idPensamiento}, ${p.idUsuario})" style="color: ${colorCorazon}; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight:bold; transition: 0.2s; padding:0;">
                            ${svgWave} <span class="contador-likes wave-count">${p.cantidadLikes || 0}</span>
                        </button>
                        <button class="action-btn" onclick="toggleContenedorComentarios(${p.idPensamiento})" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; gap: 6px; font-size: 13px; transition: 0.2s; padding:0;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--text-muted)'">
                            ${SVG_CHAT_PROFILE} <span class="contador-pases">${p.cantidadComentarios || 0}</span>
                        </button>
                    </div>

                    <div id="box-comentarios-${p.idPensamiento}" style="display: none; border-top: 1px solid #222; padding-top: 15px; margin-top: 10px;">
                        <div class="mood-picker" id="moodPicker-${p.idPensamiento}" style="margin-bottom: 12px; display: flex; gap: 8px; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 5px; scrollbar-width: none;">
                            <style>#moodPicker-${p.idPensamiento}::-webkit-scrollbar { display: none; }</style>
                            <button class="mood-pill pill-banger selected" onclick="selectMoodLocal(${p.idPensamiento}, 'banger', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_BANGER} OnFire</button>
                            <button class="mood-pill pill-chill" onclick="selectMoodLocal(${p.idPensamiento}, 'chill', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_CHILL} Chill</button>
                            <button class="mood-pill pill-melancolico" onclick="selectMoodLocal(${p.idPensamiento}, 'melancolico', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_MELANCOLICO} Melancólico</button>
                            <button class="mood-pill pill-hyped" onclick="selectMoodLocal(${p.idPensamiento}, 'hyped', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_HYPED} Hyped</button>
                        </div>
                        
                        <div id="lista-comentarios-${p.idPensamiento}"></div>
                        
                        ${cajaComentariosHTML}
                    </div>
                </div>
            `;
        });
        
        document.getElementById('muro-posts-lista').insertAdjacentHTML('beforeend', htmlNuevo);
        window.paginaActualMuro++;
        
        if (respuestaPaginada.last) {
            window.tieneMasMuro = false;
            if (window._muroObserver) window._muroObserver.disconnect();
            if (centinela) centinela.innerHTML = '<span style="color:#555; font-size:13px;">Has llegado al inicio de la sesión.</span>';
        } else {
            if (centinela) centinela.innerHTML = '';
        }

        const scrollToId = new URLSearchParams(window.location.search).get('scrollto');
        if (scrollToId && esNuevaCarga) {
            setTimeout(() => {
                const tarjetaContenedora = document.getElementById(`pensamiento-${scrollToId}`);
                if (tarjetaContenedora) {
                    tarjetaContenedora.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    tarjetaContenedora.style.boxShadow = '0 0 25px rgba(30, 215, 96, 0.45)';
                    tarjetaContenedora.style.borderColor = '#1ed760';
                    tarjetaContenedora.style.borderLeft = '4px solid #1ed760';
                    toggleContenedorComentarios(scrollToId);
                    setTimeout(() => {
                        tarjetaContenedora.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                        tarjetaContenedora.style.borderColor = '#282828';
                        tarjetaContenedora.style.borderLeft = '4px solid transparent';
                    }, 3000);
                }
            }, 400); 
        }

    } catch (e) {
        if (esNuevaCarga) contenedorPublicaciones.innerHTML = '<div style="color: #e91e63; text-align: center;">Error al cargar el muro.</div>';
    } finally {
        window.cargandoMuro = false;
    }
};

window.selectMoodLocal = function(idPensamiento, mood, el) {
    document.querySelectorAll(`#moodPicker-${idPensamiento} .mood-pill`).forEach(p => p.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById(`currentMood-${idPensamiento}`).value = mood.toUpperCase();
    document.getElementById(`composerAvatar-${idPensamiento}`).className = `avatar ` + moodConfig[mood].avatarClass;
};

window.toggleContenedorComentarios = function(idPensamiento) {
    const contenedor = document.getElementById(`box-comentarios-${idPensamiento}`);
    const fab = document.querySelector('.fab-social');
    
    if (contenedor.style.display === 'none') {
        contenedor.style.display = 'block';
        if (fab) fab.style.display = 'none';
        renderizarComentarios(idPensamiento);
    } else {
        contenedor.style.display = 'none';
        const algunAbierto = Array.from(document.querySelectorAll('[id^="box-comentarios-"]')).some(el => el.style.display === 'block');
        if (fab && !algunAbierto) fab.style.display = 'flex';
    }
};

async function renderizarComentarios(idPensamiento, silencioso = false) {
    const cajaLista = document.getElementById(`lista-comentarios-${idPensamiento}`);
    
    if (!silencioso) {
        cajaLista.innerHTML = '<div style="color:#666; font-size:13px; text-align:center; padding:20px;"><div class="noti-spinner"></div></div>';
    }

    try {
        const todos = await api.get(`/comentarios/pensamiento/${idPensamiento}`);
        const raices = todos.filter(c => c.idPadre === null).reverse(); 
        const respuestas = todos.filter(c => c.idPadre !== null);

        if (raices.length === 0) {
            cajaLista.innerHTML = '<div style="color:#666; font-size:13px; text-align:center; padding:15px;">La sesión está en silencio. Dejá tu comentario.</div>';
            return;
        }

        let html = '';
        for (let rc of raices) {
            const autorR = await obtenerDatosUsuarioDinamico(rc.idUsuario);
            const subHilos = respuestas.filter(sub => sub.idPadre === rc.idComentario);

            let respuestasHTML = '';
            for (let sh of subHilos) {
                const autorS = await obtenerDatosUsuarioDinamico(sh.idUsuario);
                respuestasHTML += deconstruirTarjetaComentario(sh, true, idPensamiento, autorS);
            }
            html += deconstruirTarjetaComentario(rc, false, idPensamiento, autorR, respuestasHTML);
        }
        
        cajaLista.innerHTML = html;
        
    } catch (e) {
        if (!silencioso) cajaLista.innerHTML = '<div style="color:#e91e63; font-size:13px; text-align:center;">Error al sintonizar la sesión.</div>';
    }
}

window.prepararRespuesta = function(idPensamiento, idPadre, nombreAutor, idUsuarioMencionado) {
    const input = document.getElementById(`input-comm-new-${idPensamiento}`);
    const hiddenPadre = document.getElementById(`replyPadre-${idPensamiento}`);
    const hiddenMention = document.getElementById(`replyMention-${idPensamiento}`);
    const replyBanner = document.getElementById(`reply-banner-${idPensamiento}`);
    const replyName = document.getElementById(`reply-name-${idPensamiento}`);
    const composer = document.getElementById(`composer-container-${idPensamiento}`);
    const btnJam = document.getElementById(`btn-jam-${idPensamiento}`);
    if (composer && composer.style.display === 'none') {
        composer.style.display = 'block';
        if (btnJam) btnJam.style.color = '#00bcd4';
    }
    
    if (!input) {
        ui.alerta("Modo lectura", "No tenés permiso para comentar en este post.", "info");
        return;
    }

    if (nombreAutor) {
        const nombreLimpio = nombreAutor.replace('@', '').split(' ')[0].replace(/\s+/g, '');
        if(hiddenPadre) hiddenPadre.value = idPadre;
        if(hiddenMention) hiddenMention.value = idUsuarioMencionado || '';
        if(replyName) replyName.innerText = `@${nombreLimpio}`;
        if(replyBanner) replyBanner.style.display = 'flex';        
        if(input) {
            input.value = `@${nombreLimpio} `; 
            input.placeholder = "Escribe tu respuesta...";
        }
    } else {
        window.cancelarRespuesta(idPensamiento);
    }
    
    if(input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        input.focus();
    }
};

window.cancelarRespuesta = function(idPensamiento, forzarCierreTeclado = false) {
    const hiddenPadre = document.getElementById(`replyPadre-${idPensamiento}`);
    const hiddenMention = document.getElementById(`replyMention-${idPensamiento}`);
    const replyBanner = document.getElementById(`reply-banner-${idPensamiento}`);
    const input = document.getElementById(`input-comm-new-${idPensamiento}`);   
    
    if(hiddenPadre) hiddenPadre.value = '';
    if(hiddenMention) hiddenMention.value = '';
    if(replyBanner) replyBanner.style.display = 'none';
    
    if(input) {
        input.placeholder = "Suma tu barra...";
        input.value = ''; 
        if (forzarCierreTeclado) {
            input.blur();
        } else {
            input.focus();
        }
    }
};


function deconstruirTarjetaComentario(c, esRespuesta, idPensamiento, infoAutor, respuestasHTML = '') {
    const moodKey = (c.mood || 'CHILL').toLowerCase();
    const cfg = moodConfig[moodKey] || moodConfig['chill'];
    const esPropietario = parseInt(c.idUsuario) === parseInt(auth.idActual);
    const esAdminGlobal = auth.rolActual === 'ADMIN';   
    const esAdminComentando = infoAutor.rol === 'ADMIN';
    const clickAccion = esAdminComentando ? '' : `onclick="navigate('/user/profile?id=${c.idUsuario}')"`;
    const cursorEstilo = esAdminComentando ? 'cursor: default;' : 'cursor: pointer;';
    const glowStyle = esAdminComentando ? 'background: rgba(30, 215, 96, 0.05); border-left: 2px solid #1ed760; padding-left: 8px;' : '';
    const badgeAdmin = esAdminComentando ? `<span style="background: rgba(30, 215, 96, 0.15); color: #1ed760; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 800; margin-left: 6px; border: 1px solid rgba(30, 215, 96, 0.3);">ADMIN</span>` : '';
    const tieneWave = window.wavesComentariosReales.has(c.idComentario);
    const colorWave = tieneWave ? '#00bcd4' : '#aaa';
    const timestamp = new Date(c.fechaPublicacion).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});   
    const identidadPrincipal = infoAutor.handle ? `@${infoAutor.handle}` : infoAutor.nombre;
    const nombreParaRespuesta = (infoAutor.handle || infoAutor.nombre).replace(/'/g, "\\'").replace(/"/g, "&quot;");

    let opcionesAccion = '';
    if (esPropietario) {
        opcionesAccion = `
            <span onclick="abrirModalEditarComentario(${c.idComentario}, ${idPensamiento}, '${c.contenido.replace(/'/g, "\\'").replace(/"/g, "&quot;")}')" 
                  style="cursor:pointer; display:flex; align-items:center; gap:4px; color:var(--text-muted); font-size:12px; flex-shrink: 0;" title="Editar">${svgEdit}</span>
            <span onclick="abrirModalEliminarComentario(${c.idComentario}, ${idPensamiento})" 
                  style="cursor:pointer; display:flex; align-items:center; gap:4px; color:#e91e63; font-size:12px; flex-shrink: 0;" title="Borrar">${svgDelete}</span>
        `;
    } else if (esAdminGlobal) {
        opcionesAccion = `<span onclick="abrirModalEliminarComentario(${c.idComentario}, ${idPensamiento})" style="cursor:pointer; display:flex; align-items:center; gap:4px; color:#e91e63; font-size:12px; flex-shrink: 0;" title="Borrar (Mod)">${svgDelete}</span>`;
    }

    if (esRespuesta) {
        return `
            <div class="reply-card animate-in" id="card-comment-${c.idComentario}" style="display: flex; gap: 10px; margin-top: 12px; margin-bottom: 12px; ${glowStyle}">
                <img src="${infoAutor.imagenUrl}" class="avatar ${cfg.avatarClass}" style="width:24px; height:24px; border-radius: 50%; flex-shrink: 0; ${cursorEstilo}" ${clickAccion}>
                <div style="flex-grow: 1; min-width: 0; text-align: left;">
                    <div style="display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap;">
                        <span style="font-size: 13px; font-weight: bold; color: white; ${cursorEstilo}" ${clickAccion}>${identidadPrincipal} ${badgeAdmin}</span>
                        <span style="font-size: 11px; color: var(--text-muted);">${timestamp}</span>
                    </div>
                    <div style="font-size: 13px; color: #ddd; margin-top: 2px; word-wrap: break-word; line-height: 1.3;">${c.contenido}</div>                    
                    <div style="display: flex; align-items: center; gap: 12px; margin-top: 6px; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;">
                        <span style="font-size: 11px; color: var(--text-muted); font-weight: bold; cursor: pointer; flex-shrink: 0;" onclick="prepararRespuesta(${idPensamiento}, ${c.idPadre}, '${nombreParaRespuesta}', ${c.idUsuario})">Responder</span>
                        ${opcionesAccion}
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <div class="comment-card animate-in" id="card-comment-${c.idComentario}" style="display: flex; gap: 10px; margin-bottom: 15px; ${glowStyle}">
            <img src="${infoAutor.imagenUrl}" class="avatar ${cfg.avatarClass}" style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; cursor: pointer;" onclick="navigate('/user/profile?id=${c.idUsuario}')">
            <div style="flex-grow: 1; min-width: 0; text-align: left;">
                <div style="display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap;">
                    <span style="font-size: 14px; font-weight: bold; color: white; cursor: pointer;" onclick="navigate('/user/profile?id=${c.idUsuario}')">${identidadPrincipal} ${badgeAdmin}</span>
                    <span style="font-size: 11px; color: var(--text-muted);">${timestamp}</span>
                    <span class="mood-badge ${cfg.badgeClass}" style="font-size: 9px; padding: 2px 6px; margin-left: auto;">${cfg.emoji} ${cfg.label}</span>
                </div>                
                <div style="font-size: 14px; color: #eee; margin-top: 4px; word-wrap: break-word; line-height: 1.4;">${c.contenido}</div>                
                <div style="display: flex; align-items: center; gap: 15px; margin-top: 8px; flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;">
                    <div style="display: flex; align-items: center; gap: 4px; color: ${colorWave}; cursor: pointer; font-size: 12px; font-weight: bold; flex-shrink: 0;" onclick="doWaveDB(this, ${c.idComentario}, '${moodKey}', ${c.idUsuario})">
                        ${SVG_WAVE_COMMENT} <span class="wave-count">${c.cantidadWaves || 0}</span>
                    </div>
                    <span style="font-size: 12px; color: var(--text-muted); font-weight: bold; cursor: pointer; flex-shrink: 0;" onclick="prepararRespuesta(${idPensamiento}, ${c.idComentario}, '${nombreParaRespuesta}', ${c.idUsuario})">Responder</span>
                    ${opcionesAccion}
                </div>
                <div class="replies-thread" style="display: ${respuestasHTML ? 'block' : 'none'}; margin-top: 10px; border-left: 1px solid #333; padding-left: 10px;">
                    ${respuestasHTML}
                </div>
            </div>
        </div>
    `;
}

window.toggleReplyVisible = function(btn) {
    const thread = btn.closest('.comment-card').querySelector('.replies-thread');
    const visible = thread.style.display !== 'none';
    thread.style.display = visible ? 'none' : 'block';
    if (!visible) thread.querySelector('input')?.focus();
};

window.enviarComentarioMaster = async function(idPensamiento, idDueñoDestino) {
    const inputElement = document.getElementById(`input-comm-new-${idPensamiento}`);
    const hiddenPadre = document.getElementById(`replyPadre-${idPensamiento}`);
    const hiddenMention = document.getElementById(`replyMention-${idPensamiento}`);
    
    if (!inputElement) return;
    
    const contenido = inputElement.value.trim();
    if (!contenido) return;

    const idPadre = hiddenPadre && hiddenPadre.value ? parseInt(hiddenPadre.value) : null;
    const idMencionado = hiddenMention && hiddenMention.value ? parseInt(hiddenMention.value) : null;
    const isReply = idPadre !== null;
    
    const selectMood = document.getElementById(`currentMood-${idPensamiento}`);
    const mood = isReply ? 'CHILL' : (selectMood ? selectMood.value : 'CHILL');

    inputElement.blur();

    try {
        const respuestaJava = await api.post('/comentarios', { idPensamiento, idUsuario: auth.idActual, idPadre, contenido, mood });
        
        inputElement.value = '';
        window.cancelarRespuesta(idPensamiento, true);
        
        await renderizarComentarios(idPensamiento, true);
        
        if(!isReply) spawnParticlesLocal(moodParticles[mood.toLowerCase()], document.getElementById(`box-comentarios-${idPensamiento}`));
        procesarPalabrasClaveReactivas(contenido);
        
        const spanPases = document.querySelector(`#pensamiento-${idPensamiento} .contador-pases`);
        if (spanPases) spanPases.innerText = parseInt(spanPases.innerText) + 1;

        const nuevoId = respuestaJava.idComentario || respuestaJava.id; 
        if (nuevoId) {
            setTimeout(() => {
                const nuevoEl = document.getElementById(`card-comment-${nuevoId}`);
                if (nuevoEl) {
                    nuevoEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    nuevoEl.style.transition = 'all 0.5s ease';
                    nuevoEl.style.backgroundColor = 'rgba(30, 215, 96, 0.1)';
                    nuevoEl.style.boxShadow = '0 0 15px rgba(30, 215, 96, 0.4)';
                    nuevoEl.style.borderColor = '#1ed760';
                    setTimeout(() => {
                        nuevoEl.style.backgroundColor = '';
                        nuevoEl.style.boxShadow = '';
                        nuevoEl.style.borderColor = '';
                    }, 2000);
                }
            }, 300);
        }
        
        if (isReply) {
            if (idMencionado && idMencionado !== auth.idActual) {
                enviarNotificacionOculta(idMencionado, 'MENTION', nuevoId);
            } else if (idDueñoDestino && idDueñoDestino !== auth.idActual) {
                enviarNotificacionOculta(idDueñoDestino, 'REPLY_COMMENT', nuevoId);
            }
        } else {
            if (idDueñoDestino && idDueñoDestino !== auth.idActual) {
                enviarNotificacionOculta(idDueñoDestino, 'COMMENT', nuevoId);
            }
        }

    } catch (e) {
        ui.alerta("Error", "No se pudo enviar el comentario", "error");
    }
};

window.doWaveDB = async function(btn, idComentario, moodKey, idDueñoComentario) {
    const countEl = btn.querySelector('.wave-count');
    let waves = parseInt(countEl.textContent);

    if (window.wavesComentariosReales.has(idComentario)) {
        try {
            await api.borrar(`/comentarios/${idComentario}/wave/usuario/${auth.idActual}`);
            countEl.textContent = waves - 1;
            btn.classList.remove('waved');
            window.wavesComentariosReales.delete(idComentario);
            
            borrarNotificacionOculta(idDueñoComentario, 'WAVE_COMMENT', idComentario);
        } catch(e) {}
    } else {
        try {
            await api.post(`/comentarios/${idComentario}/wave/usuario/${auth.idActual}`);
            countEl.textContent = waves + 1;
            btn.classList.add('waved');
            window.wavesComentariosReales.add(idComentario);

            const waveIcon = btn.querySelector('span');
            waveIcon.classList.remove('wave-animate');
            void waveIcon.offsetWidth; 
            waveIcon.classList.add('wave-animate');
            waveIcon.addEventListener('animationend', () => waveIcon.classList.remove('wave-animate'), { once: true });

            spawnParticlesLocal('🌊', btn.closest('.comment-card'));
            enviarNotificacionOculta(idDueñoComentario, 'WAVE_COMMENT', idComentario);
        } catch(e) {}
    }
};

window.toggleLikePost = async function(btnElement, id, idDueñoMuro) {
    const span = btnElement.querySelector('.contador-likes');
    let likesActuales = parseInt(span.innerText);

    if (window.likesReales.has(id)) {
        try {
            await api.borrar(`/pensamientos/${id}/like/usuario/${auth.idActual}`);
            span.innerText = likesActuales - 1;
            btnElement.style.color = 'var(--text-muted)';
            btnElement.classList.remove('waved');
            window.likesReales.delete(id);
            borrarNotificacionOculta(idDueñoMuro, 'WAVE_POST', id);
        } catch(e) {}
    } else {
        try {
            await api.post(`/pensamientos/${id}/like/usuario/${auth.idActual}`);
            span.innerText = likesActuales + 1;
            btnElement.style.color = '#00bcd4'; 
            btnElement.classList.add('waved');
            
            const waveIcon = btnElement.querySelector('span');
            waveIcon.classList.remove('wave-animate');
            void waveIcon.offsetWidth; 
            waveIcon.classList.add('wave-animate');
            waveIcon.addEventListener('animationend', () => waveIcon.classList.remove('wave-animate'), { once: true });
            
            window.likesReales.add(id);
            enviarNotificacionOculta(idDueñoMuro, 'WAVE_POST', id);
        } catch(e) {}
    }
}

function spawnParticlesLocal(emoji, anchor) {
    if(!anchor) return;
    const rect = anchor.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
        const p = document.createElement('div');
        p.className = 'float-particle';
        p.textContent = emoji;
        p.style.left = (rect.left + Math.random() * rect.width) + 'px';
        p.style.top = (rect.top + window.scrollY + Math.random() * 20) + 'px';
        p.style.position = 'absolute';
        p.style.animationDelay = (Math.random() * 0.2) + 's';
        document.body.appendChild(p);
        p.addEventListener('animationend', () => p.remove());
    }
}

function procesarPalabrasClaveReactivas(texto) {
    const t = texto.toLowerCase();
    if(t.includes('fuego') || t.includes('🔥')) {
        if(typeof confetti === 'function') confetti({ particleCount: 80, spread: 60, colors: ['#ff5722', '#ff9800', '#ffc107'] });
    }
    else if(t.includes('love') || t.includes('❤️')) {
        if(typeof confetti === 'function') confetti({ particleCount: 50, spread: 100, colors: ['#e91e63', '#ff4081'] });
    }
    else if(t.includes('increíble') || t.includes('banger') || t.includes('increible')) {
        if(typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
}

window.abrirModalEliminarComentario = function(idComentario, idPensamiento) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center;';
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration:0.3s; background:#181818; border-radius:12px; padding:30px; width:90vw; max-width:400px; border:1px solid #333; text-align:center;">
            <h3 style="color:white; margin:0 0 15px 0;">¿Borrar de la sesión?</h3>
            <p style="color:#888; font-size:14px; margin-bottom:25px;">Esta acción eliminará permanentemente tu barra del historial.</p>
            <div style="display:flex; gap:15px;">
                <button onclick="this.closest('div').parentElement.parentElement.remove()" style="flex:1; padding:12px; border-radius:500px; background:#333; color:white; border:none; cursor:pointer; font-weight:bold;">Cancelar</button>
                <button id="btn-confirm-del-comm" style="flex:1; padding:12px; border-radius:500px; background:#e91e63; color:white; border:none; cursor:pointer; font-weight:bold;">Eliminar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('btn-confirm-del-comm').onclick = async () => {
        try {
            await api.borrar(`/comentarios/${idComentario}`);
            modal.remove();
            
            if(typeof ui.alerta === 'function') {
                ui.alerta("Comentario eliminado", "Tu barra fue borrada de la sesión", "success");
            }
            await renderizarComentarios(idPensamiento, true);            
            const spanPases = document.querySelector(`#pensamiento-${idPensamiento} .contador-pases`);
            if (spanPases) spanPases.innerText = Math.max(0, parseInt(spanPases.innerText) - 1);
            
        } catch(e) {
            ui.alerta("Error", "No se pudo eliminar el comentario", "error");
        }
    };
};

window.abrirModalEditarComentario = function(idComentario, idPensamiento, contenidoActual) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center;';
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration:0.3s; background:#181818; border-radius:12px; padding:30px; width:90vw; max-width:500px; border:1px solid #333;">
            <h3 style="color:white; margin:0 0 20px 0;">Reescribir barra</h3>
            <textarea id="txt-edit-comm" rows="3" style="width:100%; background:#282828; color:white; border:1px solid #333; padding:12px; border-radius:6px; resize:none; outline:none; font-size:15px; box-sizing:border-box; margin-bottom:20px;"></textarea>
            <button id="btn-confirm-edit-comm" style="width:100%; padding:12px; border-radius:500px; background:#1ed760; color:black; font-weight:bold; border:none; cursor:pointer;">Guardar Cambios</button>
        </div>
    `;
    document.body.appendChild(modal);
    const ta = document.getElementById('txt-edit-comm');
    ta.value = contenidoActual;
    setTimeout(() => ta.focus(), 100);

    document.getElementById('btn-confirm-edit-comm').onclick = async () => {
        const text = ta.value.trim();
        if(!text) return;
        try {
            await api.put(`/comentarios/${idComentario}`, { contenido: text });
            modal.remove();
            if(typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Comentario editado", "success");
            renderizarComentarios(idPensamiento);
        } catch(e) {}
    };
};

window.actualizarAnimo = async function(nuevoAnimo) {
    try {
        await api.patch('/usuarios/' + auth.idActual + '/perfil', { estadoAnimo: nuevoAnimo });
        if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Estado de ánimo actualizado", "success");
    } catch(e) {}
}

window.abrirModalEliminarPensamiento = function(id) {
    const modal = document.createElement('div');
    modal.id = 'modal-eliminar';
    modal.style.cssText = 'position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center;';
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration:0.3s; background:#181818; border-radius:12px; padding:30px; width:90vw; max-width:400px; border:1px solid #333; text-align:center;">
            <h2 style="margin:0 0 15px 0; color:white; font-size:1.5rem;">Eliminar Pensamiento</h2>
            <p style="color:var(--text-muted); margin-bottom:25px;">¿Borrar esta publicación? Esta acción no se puede deshacer y borrará toda la Jam Session asociada.</p>
            <div style="display:flex; gap:15px;">
                <button onclick="document.getElementById('modal-eliminar').remove()" style="flex:1; padding:12px; border-radius:500px; background:#333; color:white; font-weight:bold; border:none; cursor:pointer;">Cancelar</button>
                <button onclick="ejecutarEliminacion(${id})" style="flex:1; padding:12px; border-radius:500px; background:#e91e63; color:white; font-weight:bold; border:none; cursor:pointer;">Eliminar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.ejecutarEliminacion = async function(id) {
    try {
        await api.borrar('/pensamientos/' + id);
        document.getElementById('modal-eliminar').remove();
        if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Publicación eliminada", "success");        
        const postEliminado = document.getElementById(`pensamiento-${id}`);
        if (postEliminado) {
            postEliminado.style.transition = 'all 0.3s ease';
            postEliminado.style.transform = 'scale(0.9)';
            postEliminado.style.opacity = '0';
            setTimeout(() => postEliminado.remove(), 300);
        }
    } catch(e) {}
};

window.abrirModalEditarPensamiento = function(id, contenidoActual) {
    const modal = document.createElement('div');
    modal.id = 'modal-editar';
    modal.style.cssText = 'position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center;';
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration:0.3s; background:#181818; border-radius:12px; padding:30px; width:90vw; max-width:500px; border:1px solid #333;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <h2 style="margin:0; color:white; font-size:1.5rem;">Editar Pensamiento</h2>
                <button onclick="document.getElementById('modal-editar').remove()" style="background:transparent; border:none; color:var(--text-muted); font-size:24px; cursor:pointer;">✖</button>
            </div>
            <textarea id="texto-editar" rows="4" style="width:100%; padding:15px; border-radius:8px; border:1px solid #333; background:#282828; color:white; outline:none; font-size:16px; resize:none; margin-bottom:20px; box-sizing:border-box;"></textarea>
            <button onclick="ejecutarEdicion(${id})" style="width:100%; padding:12px; border-radius:500px; background:#1ed760; color:black; font-weight:bold; font-size:16px; border:none; cursor:pointer;">Guardar Cambios</button>
        </div>
    `;
    document.body.appendChild(modal);
    const textarea = document.getElementById('texto-editar');
    textarea.value = contenidoActual;
    setTimeout(() => textarea.focus(), 100);
};

window.ejecutarEdicion = async function(id) {
    const nuevoContenido = document.getElementById('texto-editar').value;
    if (!nuevoContenido.trim()) return;
    try {
        await api.put('/pensamientos/' + id, { contenido: nuevoContenido.trim() });
        document.getElementById('modal-editar').remove();
        if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Cambios guardados", "success");        
        const postEditado = document.getElementById(`pensamiento-${id}`);
        if (postEditado) {
            const divContenido = postEditado.querySelector('div[style*="word-wrap: break-word"]');
            if (divContenido) {
                divContenido.innerText = nuevoContenido.trim();
                postEditado.style.transition = 'box-shadow 0.3s';
                postEditado.style.boxShadow = '0 0 15px rgba(30,215,96,0.5)';
                setTimeout(() => postEditado.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)', 1000);
            }
        }
    } catch(e) {}
};


window.toggleSeguir = async function(idPerfil, loSigueActualmente) {
    try {
        if (loSigueActualmente) {
            await api.borrar(`/social/dejardeseguir/${auth.idActual}/${idPerfil}`);
            borrarNotificacionOculta(idPerfil, 'FOLLOW', auth.idActual);
        } else {
            await api.post('/social/seguir', { idSeguidor: auth.idActual, idSeguido: idPerfil });
            enviarNotificacionOculta(idPerfil, 'FOLLOW', auth.idActual);
            if (typeof confetti === 'function') confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 }, colors: ['#1ed760'] });
        }
        delete window.cacheUsuariosPerfiles[idPerfil];
        setTimeout(() => renderProfile(), 150);

    } catch (e) { 
        ui.alerta("Error al realizar la acción."); 
    }
};

window.toggleBloquear = async function(idPerfil, estaBloqueado) {
    const msj = estaBloqueado 
        ? '¿Estás seguro de que querés desbloquear a este usuario?' 
        : '¿Bloquear a este usuario? Dejarán de verse mutuamente sus publicaciones y se eliminará el seguimiento si existe.';

    const confirmado = await ui.confirmar(estaBloqueado ? "Desbloquear Usuario" : "Bloquear Usuario", msj);
    if (!confirmado) return;

    try {
        if (estaBloqueado) {
            await api.borrar(`/social/desbloquear/${auth.idActual}/${idPerfil}`);
            if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Usuario desbloqueado", "success");
        } else {
            await api.post('/social/bloquear', { idUsuarioBloqueador: auth.idActual, idUsuarioBloqueado: idPerfil });
            if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Usuario bloqueado", "success");
        }
        renderProfile();
    } catch (e) { 
        ui.alerta("Error al aplicar el bloqueo."); 
    }
};

window.enviarNotificacionOculta = async function(idDueño, tipoAccion, idReferencia) {
    if (parseInt(idDueño) === parseInt(auth.idActual)) return;
    
    try {
        const dueño = await api.get('/usuarios/' + idDueño);

        if ((tipoAccion === 'WAVE_POST' || tipoAccion === 'WAVE_COMMENT') && dueño.notiWaves === false) return;
        if (tipoAccion === 'COMMENT' && dueño.notiComentarios === false) return;
        if (tipoAccion === 'REPLY_COMMENT' && dueño.notiPases === false) return;
        if (tipoAccion === 'MENTION' && dueño.notiMenciones === false) return;
        if (tipoAccion === 'FOLLOW' && dueño.notiSeguidores === false) return;

        await api.post('/notificaciones', {
            idUsuario: parseInt(idDueño),
            idEmisor: parseInt(auth.idActual),
            tipoAccion: tipoAccion,
            idReferencia: parseInt(idReferencia)
        });
    } catch(e) {}
};


window.borrarNotificacionOculta = async function(idDueño, tipoAccion, idReferencia) {
    if (parseInt(idDueño) === parseInt(auth.idActual)) return;
    try {
        await api.borrar(`/notificaciones/deshacer?idUsuario=${idDueño}&idEmisor=${auth.idActual}&tipoAccion=${tipoAccion}&idReferencia=${idReferencia}`);
    } catch(e) {}
};

window.publicarDesdeMuro = async function() {
    const input = document.getElementById('texto-pensamiento-muro');
    const contenido = input.value.trim();
    if (!contenido) return;

    try {
        const nuevoPost = await api.post('/pensamientos', {
            idUsuario: auth.idActual,
            contenido: contenido
        });
        
        input.value = '';
        ui.alerta("¡Publicado con éxito!", "Tu pensamiento ya está en el muro.", "success");
        
        const idPerfil = new URLSearchParams(window.location.search).get('id') || auth.idActual;
        const info = await obtenerDatosUsuarioDinamico(idPerfil);
        cargarPensamientos(idPerfil, info);
        
    } catch(e) {
        ui.alerta("Error", "No se pudo publicar. Intentá nuevamente.", "error");
    }
};

window.abrirModalRedSocial = async function(tipo, idPerfil) {
    const modalExistente = document.getElementById('modal-red-social');
    if (modalExistente) modalExistente.remove();

    const titulo = tipo === 'seguidores' ? 'Seguidores' : 'Siguiendo';
    
    const modal = document.createElement('div');
    modal.id = 'modal-red-social';
    modal.style.cssText = 'position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center;';
    
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration:0.3s; background:#181818; border-radius:12px; padding:30px; width:90vw; max-width:450px; border:1px solid #333; max-height: 80vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.8);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom: 1px solid #282828; padding-bottom: 15px;">
                <h3 style="color:white; margin:0; font-size:1.5rem;">${titulo}</h3>
                <button onclick="document.getElementById('modal-red-social').remove(); renderProfile();" style="background:transparent; border:none; color:var(--text-muted); font-size:24px; cursor:pointer; transition:0.2s;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='var(--text-muted)'">✖</button>
            </div>
            
            <div id="lista-red-social" style="overflow-y: auto; flex-grow: 1; padding-right: 5px; display: flex; flex-direction: column; gap: 12px;">
                <div style="text-align: center; color: var(--text-muted); padding: 40px;">
                    <div class="noti-spinner"></div>
                    <div style="margin-top: 15px; font-size: 13px;">Buscando usuarios...</div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            renderProfile();
        }
    });

    try {
        const endpoint = tipo === 'seguidores' ? `/social/seguidores/${idPerfil}` : `/social/siguiendo/${idPerfil}`;
        const usuariosDeLaLista = await api.get(endpoint);
        let misSiguiendo = [];
        if (auth.idActual) {
            const misSigs = await api.get(`/social/siguiendo/${auth.idActual}`);
            misSiguiendo = misSigs.map(u => u.idUsuario || u.id); 
        }

        const listaContainer = document.getElementById('lista-red-social');
        
        if (!usuariosDeLaLista || usuariosDeLaLista.length === 0) {
            listaContainer.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:40px 10px; font-size:14px; background: #222; border-radius: 8px;">No hay usuarios para mostrar.</div>`;
            return;
        }

        let html = '';
        for (let u of usuariosDeLaLista) {
            const idU = u.idUsuario || u.id;
            const nombreSeguro = (u.nombre || u.username || 'Usuario').replace(/"/g, '&quot;');
            const imgSegura = u.imagenUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${idU}&backgroundColor=cccccc`;
            
            const esMiPropioPerfilEnLista = idU === parseInt(auth.idActual);
            const loSigo = misSiguiendo.includes(idU);
            
            const btnText = loSigo ? 'Dejar de seguir' : 'Seguir';
            const btnStyle = loSigo 
                ? 'background:transparent; border:1px solid #555; color:white;' 
                : 'background:white; color:black; border:none;';

            const btnHtml = esMiPropioPerfilEnLista 
                ? `<span style="font-size:12px; color:var(--text-muted); background:#282828; padding:6px 12px; border-radius:500px; border: 1px solid #333;">Tú</span>`
                : `<button onclick="toggleSeguirModal(this, ${idU}, ${loSigo})" style="font-weight:bold; padding:8px 18px; border-radius:500px; font-size:13px; cursor:pointer; transition:0.2s; ${btnStyle}">${btnText}</button>`;

            html += `
                <div style="display:flex; align-items:center; justify-content:space-between; background:#1c1c1c; padding:12px 15px; border-radius:10px; border:1px solid #2a2a2a; transition:0.2s;" onmouseover="this.style.borderColor='#444'; this.style.background='#222'" onmouseout="this.style.borderColor='#2a2a2a'; this.style.background='#1c1c1c'">
                    
                    <div style="display:flex; align-items:center; gap:12px; cursor:pointer; overflow:hidden; flex-grow: 1;" onclick="document.getElementById('modal-red-social').remove(); navigate('/user/profile?id=${idU}');">
                        <img src="${imgSegura}" style="width:45px; height:45px; border-radius:50%; object-fit:cover; flex-shrink:0; border: 1px solid #333;">
                        <div style="display:flex; flex-direction:column; overflow:hidden;">
                            <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:15px; font-weight:bold; color:white;">${u.handle ? `@${u.handle}` : nombreSeguro}</div>
                            ${u.handle ? `<div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:12px; color:var(--text-muted);">${nombreSeguro}</div>` : ''}
                        </div>
                    </div>
                    
                    <div style="flex-shrink:0; margin-left:15px;">
                        ${btnHtml}
                    </div>
                </div>
            `;
        }
        listaContainer.innerHTML = html;

    } catch(e) {
        document.getElementById('lista-red-social').innerHTML = `<div style="color:#e91e63; text-align:center; padding:30px;">Error al cargar la información.</div>`;
    }
};

window.toggleSeguirModal = async function(btn, idPerfilTarget, loSigueActualmente) {
    try {
        if (loSigueActualmente) {
            await api.borrar(`/social/dejardeseguir/${auth.idActual}/${idPerfilTarget}`);
            btn.innerText = 'Seguir';
            btn.style.cssText = 'background:white; color:black; border:none; font-weight:bold; padding:8px 18px; border-radius:8px; font-size:13px; cursor:pointer; transition:0.2s; width: 100%;';
            btn.setAttribute('onclick', `toggleSeguirModal(this, ${idPerfilTarget}, false)`);
            borrarNotificacionOculta(idPerfilTarget, 'FOLLOW', auth.idActual);
        } else {
            await api.post('/social/seguir', { idSeguidor: auth.idActual, idSeguido: idPerfilTarget });
            btn.innerText = 'Siguiendo';
            btn.style.cssText = 'background:#282828; border:1px solid #444; color:white; font-weight:bold; padding:8px 18px; border-radius:8px; font-size:13px; cursor:pointer; transition:0.2s; width: 100%;';
            btn.setAttribute('onclick', `toggleSeguirModal(this, ${idPerfilTarget}, true)`);
            
            if (typeof confetti === 'function') confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors: ['#1ed760'] });
            enviarNotificacionOculta(idPerfilTarget, 'FOLLOW', auth.idActual);
        }
    } catch(e) {
        ui.alerta("Error al actualizar la base de datos.");
    }
};

window.toggleSuspensionDesdePerfil = async function(idUsuarioDestino, btnElement) {
    const confirmado = await ui.confirmar("¿Modificar estado?", "Vas a cambiar el acceso de este usuario a la plataforma. ¿Continuar?");
    if (!confirmado) return;

    try {
        const respuesta = await api.patch(`/usuarios/${idUsuarioDestino}/estado-suspension`);
        const msj = respuesta.suspendido ? "Cuenta suspendida." : "Cuenta rehabilitada.";
        ui.alerta("Operación exitosa", msj, respuesta.suspendido ? "error" : "success");
        
        if (btnElement) {
            const txtBan = respuesta.suspendido ? 'Habilitar Cuenta' : 'Suspender Cuenta';
            const colorBan = respuesta.suspendido ? '#1ed760' : '#e91e63';
            btnElement.innerText = txtBan;
            btnElement.style.color = colorBan;
            btnElement.style.borderColor = colorBan;
        }
    } catch (e) {
        ui.alerta("Error", "No se pudo modificar el estado del usuario.", "error");
    }
};

window.abrirVisorImagen = function(url) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; inset:0; z-index:100000; background:rgba(0,0,0,0.9); display:flex; align-items:center; justify-content:center; cursor:zoom-out; backdrop-filter: blur(5px);';
    modal.innerHTML = `
        <img class="animate__animated animate__zoomIn" style="--animate-duration: 0.3s; max-width: 90vw; max-height: 90vh; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.8);" src="${url}">
    `;
    document.body.appendChild(modal);
    modal.onclick = () => modal.remove();
};