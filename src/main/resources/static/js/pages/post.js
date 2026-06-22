var SVG_CROWN_ADMIN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ed760" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M2 4l3 11h14l3-11-5 6-5-6-5 6-5-6z"></path><rect x="2" y="18" width="20" height="2" rx="1"></rect></svg>`;
var SVG_CHAT_POST = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`;
var SVG_ERROR_POST = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#e91e63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
var SVG_EDIT_COMM = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
var SVG_DELETE_COMM = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e91e63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;
var SVG_BANGER = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`;
var SVG_CHILL = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M2 12h4l3-9 5 18 3-9h5"></path></svg>`;
var SVG_MELANCOLICO = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`;
var SVG_HYPED = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 5px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;

async function renderPost() {
    if (!auth.estaAutenticado()) {
        navigate('/login');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idPensamiento = urlParams.get('id');
    const scrollToComment = urlParams.get('scrollto');

    if (!idPensamiento) {
        navigate('/user/home');
        return;
    }

    document.getElementById('app').innerHTML = ui.renderLayout(`
        <style>
            .post-wrapper { max-width: 700px; margin: 0 auto; padding: 40px 20px; width: 100%; box-sizing: border-box; overflow-x: hidden; }
            .post-box { background: #181818; padding: 30px; border-radius: 12px; border: 1px solid #333; box-shadow: 0 15px 40px rgba(0,0,0,0.5); position: relative; text-align: left; width: 100%; box-sizing: border-box; }
            .post-text-content { color: #eaeaea; font-size: 1.3rem; line-height: 1.7; margin-bottom: 30px; word-wrap: break-word; font-weight: 400; }
            
            @media (max-width: 768px) {
                .post-wrapper { padding: 15px 8px !important; }
                .post-box { padding: 20px 12px !important; border-radius: 8px !important; }
                .post-text-content { font-size: 16px !important; line-height: 1.5 !important; margin-bottom: 20px !important; }
                .replies-thread { padding-left: 10px !important; margin-left: 2px !important; border-left: 2px solid #333 !important; }
                .comment-card { gap: 8px !important; }
                .reply-card { gap: 8px !important; margin-top: 8px !important; margin-bottom: 8px !important; }
                .avatar { width: 28px !important; height: 28px !important; }
                [id^="composer-container-"] { padding: 10px 0 !important; }
                .composer-input { font-size: 13px !important; padding: 8px 0 !important; }
                .send-btn { width: 30px !important; height: 30px !important; margin-left: 4px !important; }
                .send-btn svg { width: 16px !important; height: 16px !important; }
            }
        </style>
        
        <div class="post-wrapper">
            <button onclick="volverAtras()" style="background:transparent; border:none; color:var(--primary); font-weight:bold; cursor:pointer; margin-bottom:20px; display:flex; align-items:center; gap:8px; font-size: 15px; transition: 0.2s; padding: 0;">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
                Volver
            </button>
            <div id="post-aislado-container" style="display: flex; flex-direction: column; gap: 20px; width: 100%;">
                <div class="post-box">
                    <div style="display: flex; gap: 15px; margin-bottom: 25px; align-items: center;">
                        <div class="skeleton-shimmer sk-avatar" style="width: 50px; height: 50px; flex-shrink: 0;"></div>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <div class="skeleton-shimmer sk-rect" style="width: 140px; height: 16px;"></div>
                            <div class="skeleton-shimmer sk-rect" style="width: 90px; height: 12px;"></div>
                        </div>
                    </div>
                    <div class="skeleton-shimmer sk-rect" style="width: 100%; height: 16px; margin-bottom: 8px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 85%; height: 16px; margin-bottom: 8px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 60%; height: 16px; margin-bottom: 30px;"></div>
                    
                    <div style="display: flex; gap: 20px; border-top: 1px solid #2a2a2a; padding-top: 20px;">
                        <div class="skeleton-shimmer sk-pill" style="width: 80px; height: 24px;"></div>
                        <div class="skeleton-shimmer sk-pill" style="width: 110px; height: 24px;"></div>
                    </div>
                </div>
            </div>
        </div>
    `);

    try {
        const post = await api.get('/pensamientos/' + idPensamiento);
        const dueño = await obtenerDatosUsuarioDinamico(post.idUsuario, true);
        
        let stats = { loSigue: false };
        try { stats = await api.get(`/social/estadisticas/${post.idUsuario}/visitante/${auth.idActual}`); } catch(e) {}

        const esPropietarioPost = parseInt(post.idUsuario) === parseInt(auth.idActual);
        const esAdminGlobal = auth.rolActual === 'ADMIN';
        if (!esPropietarioPost && !esAdminGlobal) {
            const nivelPrivacidad = dueño.privPerfil || 'TODOS';
            if (nivelPrivacidad === 'NADIE' || (nivelPrivacidad === 'SEGUIDORES' && !stats.loSigue)) {
                navigate(`/user/profile?id=${post.idUsuario}`);
                return;
            }
        }

        let puedeComentar = true;
        if (!esPropietarioPost && !esAdminGlobal) {
            if (dueño.privComentarios === 'SEGUIDORES' && !stats.loSigue) {
                puedeComentar = false;
            }
        }

        const [misLikesBD, misWavesComentariosBD] = await Promise.all([
            api.get('/pensamientos/likes/usuario/' + auth.idActual),
            api.get('/comentarios/waves/usuario/' + auth.idActual)
        ]);
        
        window.likesReales = new Set(misLikesBD);
        window.wavesComentariosReales = new Set(misWavesComentariosBD);

        const fechaObj = new Date(post.fechaPublicacion);
        const fechaStr = fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        
        const tieneLike = window.likesReales.has(post.idPensamiento);
        const colorCorazon = tieneLike ? '#00bcd4' : 'var(--text-muted)';
        const waveAnimClass = tieneLike ? 'waved' : '';
        const contenidoSeguro = post.contenido.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        const avatarGuardado = localStorage.getItem('user_avatar') || 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc';

        const svgEditPost = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>`;
        const svgDeletePost = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>`;       
        const svgWavePost = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M0 11.5a.5.5 0 0 1 .5-.5h1.396a.25.25 0 0 0 .207-.11l.743-1.114a1.25 1.25 0 0 1 2.067-.043l.533.711a.25.25 0 0 0 .4 0l1.733-2.31a1.25 1.25 0 0 1 1.964-.043l.533.64a.25.25 0 0 0 .386.004l1.53-1.836a1.25 1.25 0 0 1 1.927-.044L15.65 10.1a.25.25 0 0 0 .194.1h.156a.5.5 0 0 1 0 1h-.156a1.25 1.25 0 0 1-.97-.498l-1.444-1.805a.25.25 0 0 0-.385.009l-1.53 1.836a1.25 1.25 0 0 1-1.927.022l-.533-.64a.25.25 0 0 0-.372-.016L6.4 12.418a1.25 1.25 0 0 1-2 0l-.533-.71a.25.25 0 0 0-.414.008L2.71 12.83A1.25 1.25 0 0 1 1.67 13.5H.5a.5.5 0 0 1-.5-.5v-1z"/></svg>`;

        let botonesAdmin = '';
        if (esPropietarioPost) {
            botonesAdmin = `
                <div style="position: absolute; right: 0; top: 0; display: flex; gap: 12px;">
                    <button onclick="abrirModalEditarPensamiento(${post.idPensamiento}, '${contenidoSeguro}')" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s; padding: 5px;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--text-muted)'" title="Editar">${svgEditPost}</button>
                    <button onclick="abrirModalEliminarPensamiento(${post.idPensamiento})" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s; padding: 5px;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='var(--text-muted)'" title="Eliminar">${svgDeletePost}</button>
                </div>
            `;
        } else if (esAdminGlobal) {
            botonesAdmin = `
                <div style="position: absolute; right: 0; top: 0; display: flex; gap: 12px;">
                    <button onclick="abrirModalEliminarPensamiento(${post.idPensamiento})" style="background: transparent; border: none; color: #e91e63; cursor: pointer; transition: 0.2s; padding: 5px;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" title="Moderación: Eliminar Post">${svgDeletePost}</button>
                </div>
            `;
        }

        const esAdminDueño = dueño.rol === 'ADMIN';
        const clickAccionPost = esAdminDueño ? '' : `onclick="navigate('/user/profile?id=${post.idUsuario}')"`;
        const cursorEstiloPost = esAdminDueño ? 'cursor: default;' : 'cursor: pointer;';
        let cajaComentariosHTML = puedeComentar ? `
            <div id="composer-container-${post.idPensamiento}" style="position: sticky; bottom: 0; background: #181818; padding: 10px 0; margin-top: 15px; border-top: 1px solid #282828; z-index: 10; display: block;">
                <div id="reply-banner-${post.idPensamiento}" style="display: none; justify-content: space-between; align-items: center; padding: 0 5px 8px 5px; margin-bottom: 8px; border-bottom: 1px solid #222;">
                    <span style="font-size: 12px; color: var(--text-muted);">Respondiendo a <b id="reply-name-${post.idPensamiento}" style="color: white;"></b></span>
                    <button onclick="cancelarRespuesta(${post.idPensamiento})" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 14px; padding: 0 5px;">✕</button>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="${avatarGuardado}" class="avatar avatar-banger" id="composerAvatar-${post.idPensamiento}" style="width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;">
                    <div style="flex-grow: 1; background: #222; border: 1px solid #333; border-radius: 500px; display: flex; align-items: center; padding: 4px 6px 4px 15px; min-width: 0;">
                        <input type="hidden" id="currentMood-${post.idPensamiento}" value="BANGER">
                        <input type="hidden" id="replyPadre-${post.idPensamiento}" value="">
                        <input type="hidden" id="replyMention-${post.idPensamiento}" value="">
                        <input class="composer-input" id="input-comm-new-${post.idPensamiento}" placeholder="Suma tu barra..." style="background: transparent; color: white; border: none; font-size: 14px; outline: none; flex-grow: 1; min-width: 0; padding: 8px 0;" onkeydown="if(event.key === 'Enter') enviarComentarioMaster(${post.idPensamiento}, ${post.idUsuario})">
                        <button class="send-btn" onclick="enviarComentarioMaster(${post.idPensamiento}, ${post.idUsuario})" style="background: #00bcd4; border: none; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: 8px; transition: 0.2s; padding: 0;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: -2px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>
            </div>
        ` : `
            <div style="position: sticky; bottom: 0; background: #181818; padding: 15px 0; margin-top: 15px; border-top: 1px solid #282828; z-index: 10; display:flex; align-items:center; justify-content:center; gap:8px; color: var(--text-muted); font-size: 13px; font-weight: 500;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> 
                Solo los seguidores pueden comentar acá.
            </div>
        `;
        
        document.getElementById('post-aislado-container').innerHTML = `
            <div class="animate__animated animate__fadeIn post-box">
                
                <div style="display: flex; gap: 15px; margin-bottom: 20px; align-items: center; position: relative;">
                    <div ${clickAccionPost} style="display: flex; align-items: center; gap: 12px; ${cursorEstiloPost}">
                        <img src="${dueño.imagenUrl}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #333; transition: 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='#333'">
                        <div>
                            <div style="font-weight: bold; color: white; font-size: 1.1rem; margin-bottom: 3px;">
                                ${dueño.nombre} ${esAdminDueño ? `<span style="color:#1ed760;" title="Administrador">${SVG_CROWN_ADMIN}</span>` : ''}
                            </div>
                            <div style="font-size: 12px; color: var(--text-muted);">${fechaStr}</div>
                        </div>
                    </div>
                    ${botonesAdmin}
                </div>
                
                <div class="post-text-content">
                    ${post.contenido}
                </div>
                
                <div style="display: flex; justify-content: flex-start !important; align-items: center; width: 100%; gap: 20px; border-top: 1px solid #2a2a2a; padding-top: 15px; margin-bottom: 15px;">
                    <button class="action-btn ${waveAnimClass}" onclick="toggleLikePost(this, ${post.idPensamiento}, ${post.idUsuario})" style="color: ${colorCorazon}; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight:bold; transition: 0.2s; padding: 0; margin: 0;">
                        ${svgWavePost} <span class="contador-likes wave-count" style="font-size: 15px;">${post.cantidadLikes}</span> Waves
                    </button>
                    
                    ${puedeComentar ? `
                    <button id="btn-jam-${post.idPensamiento}" onclick="toggleComposerPost(${post.idPensamiento})" style="color: #00bcd4; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: bold; transition: 0.3s; padding: 0; margin: 0;" onmouseover="this.style.filter='brightness(1.2)'" onmouseout="this.style.filter='brightness(1)'">
                        ${SVG_CHAT_POST} Jam Session
                    </button>
                    ` : ''}
                </div>

                <div id="box-comentarios-${post.idPensamiento}" style="display: block; border-top: 1px solid #2a2a2a; padding-top: 20px;">
                    
                    ${puedeComentar ? `
                    <div class="mood-picker" id="moodPicker-${post.idPensamiento}" style="margin-bottom: 12px; display: flex; gap: 8px; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 5px; scrollbar-width: none;">
                        <style>#moodPicker-${post.idPensamiento}::-webkit-scrollbar { display: none; }</style>
                        <button class="mood-pill pill-banger selected" onclick="selectMoodLocal(${post.idPensamiento}, 'banger', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_BANGER} OnFire</button>
                        <button class="mood-pill pill-chill" onclick="selectMoodLocal(${post.idPensamiento}, 'chill', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_CHILL} Chill</button>
                        <button class="mood-pill pill-melancolico" onclick="selectMoodLocal(${post.idPensamiento}, 'melancolico', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_MELANCOLICO} Melancólico</button>
                        <button class="mood-pill pill-hyped" onclick="selectMoodLocal(${post.idPensamiento}, 'hyped', this)" style="white-space: nowrap; flex-shrink: 0; font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; justify-content: center;">${SVG_HYPED} Hyped</button>
                    </div>
                    ` : ''}

                    <div id="lista-comentarios-${post.idPensamiento}"></div>
                    
                    ${cajaComentariosHTML}

                </div>
            </div>
        `;

        await renderizarComentariosPostAislado(post.idPensamiento, scrollToComment);
        
        const fab = document.querySelector('.fab-social');
        if (fab) fab.style.display = 'none';

    } catch (e) {
        document.getElementById('post-aislado-container').innerHTML = `
            <div style="text-align: center; color: var(--error); padding: 60px 20px; background:#181818; border-radius:12px; border: 1px solid #333;">
                ${SVG_ERROR_POST}
                <h2 style="margin: 0 0 10px 0; color: white;">No se pudo cargar la publicación</h2>
                <p style="color: var(--text-muted); margin-bottom: 25px;">Es posible que haya sido eliminada o que no tengas permiso para verla.</p>
                <button onclick="volverAtras()" style="padding:10px 25px; background: var(--primary); color: black; font-weight: bold; border: none; border-radius: 500px; cursor: pointer;">Volver al inicio</button>
            </div>
        `;
    }
}

async function renderizarComentariosPostAislado(idPensamiento, scrollToComment) {
    const cajaLista = document.getElementById(`lista-comentarios-${idPensamiento}`);

    let skCommentsHTML = '';
    for(let i=0; i<3; i++) {
        skCommentsHTML += `
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <div class="skeleton-shimmer sk-avatar" style="width: 32px; height: 32px; flex-shrink: 0;"></div>
                <div style="flex-grow: 1;">
                    <div class="skeleton-shimmer sk-rect" style="width: 120px; height: 12px; margin-bottom: 8px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 12px; margin-bottom: 4px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 60%; height: 12px;"></div>
                </div>
            </div>
        `;
    }
    cajaLista.innerHTML = skCommentsHTML;
    
    try {
        const todos = await api.get(`/comentarios/pensamiento/${idPensamiento}`);
        const raices = todos.filter(c => c.idPadre === null);
        const respuestas = todos.filter(c => c.idPadre !== null);

        if (raices.length === 0) {
            cajaLista.innerHTML = '<div style="color:#666; font-size:14px; text-align:center; padding:30px;">Aún no hay comentarios en este post. ¡Sé el primero en sumarte a la sesión!</div>';
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

        if (scrollToComment) {
            setTimeout(() => {
                const targetComment = document.getElementById(`card-comment-${scrollToComment}`);
                if (targetComment) {
                    targetComment.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetComment.style.transition = 'all 0.5s ease';
                    targetComment.style.backgroundColor = 'rgba(30, 215, 96, 0.1)';
                    targetComment.style.border = '1px solid #1ed760';
                    targetComment.style.boxShadow = '0 0 15px rgba(30,215,96,0.3)';
                    setTimeout(() => {
                        targetComment.style.backgroundColor = '';
                        targetComment.style.border = '';
                        targetComment.style.boxShadow = '';
                    }, 3000);
                }
            }, 300);
        }

    } catch (e) {
        cajaLista.innerHTML = '<div style="color:#e91e63; font-size:14px; padding: 20px; text-align: center;">Error al sintonizar la sesión.</div>';
    }
}

window.toggleComposerPost = function(idPensamiento) {
    const composer = document.getElementById(`composer-container-${idPensamiento}`);
    const btnJam = document.getElementById(`btn-jam-${idPensamiento}`);
    
    if (composer.style.display === 'none') {
        composer.style.display = 'block';
        btnJam.style.color = '#00bcd4';
    } else {
        composer.style.display = 'none';
        btnJam.style.color = 'var(--text-muted)';
    }
};