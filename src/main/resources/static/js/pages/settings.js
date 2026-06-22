async function renderSettings() {
    if (!auth.estaAutenticado()) {
        navigate('/login');
        return;
    }

    var IMG_DEFAULT = 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc';
    const skeletonHTML = `
        <div id="settings-skeleton" style="padding: 20px 0;">
            <div class="skeleton-shimmer sk-rect" style="width: 150px; height: 16px; margin-bottom: 25px;"></div>
            <div class="sg-avatar-row" style="background: transparent; border: 1px solid #333; pointer-events: none;">
                <div class="skeleton-shimmer sk-avatar" style="width: 75px; height: 75px;"></div>
                <div style="flex: 1;">
                    <div class="skeleton-shimmer sk-rect" style="width: 150px; height: 20px; margin-bottom: 10px;"></div>
                    <div class="skeleton-shimmer sk-rect" style="width: 100px; height: 14px;"></div>
                </div>
            </div>
            <div style="margin-bottom: 25px;">
                <div class="skeleton-shimmer sk-rect" style="width: 120px; height: 14px; margin-bottom: 8px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 100%; height: 45px; border-radius: 6px;"></div>
            </div>
            <div style="margin-bottom: 25px;">
                <div class="skeleton-shimmer sk-rect" style="width: 100px; height: 14px; margin-bottom: 8px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 100%; height: 45px; border-radius: 6px;"></div>
            </div>
        </div>
    `;

    let htmlEstructura = `
    <style>
    body { background: #0a0a0a !important; }    
    .sg-top-bar { display: flex; align-items: center; padding: 20px 30px; background: #0f0f0f; border-bottom: 1px solid #282828; position: sticky; top: 0; z-index: 100; }
    .sg-back-btn { background: #222; border: none; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; display: flex; gap: 10px; }
    .sg-back-btn:hover { background: #333; transform: scale(1.05); }
    .sg-root { 
        display: flex; 
        gap: 0; 
        width: 900px; 
        max-width: 95%; 
        /* height: 680px; ← eliminado */
        min-height: 100vh; /* nuevo */
        background: #121212; 
        border: 1px solid #282828; 
        border-radius: 12px; 
        overflow: hidden; 
        box-shadow: 0 10px 40px rgba(0,0,0,0.8); 
        margin: 40px auto; 
    }
    .sg-nav { width: 240px; flex-shrink: 0; border-right: 1px solid #282828; padding: 20px 0; background: #0f0f0f; }
    .sg-nav-item { display: flex; align-items: center; gap: 12px; padding: 14px 24px; font-size: 14px; color: var(--text-muted); cursor: pointer; transition: 0.2s; border-left: 3px solid transparent; font-weight: 500;}
    .sg-nav-item svg { width: 18px; height: 18px; }
    .sg-nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
    .sg-nav-item.active { background: rgba(255,255,255,0.08); color: white; font-weight: bold; border-left-color: var(--primary); }
    .sg-nav-sep { height: 1px; background: #282828; margin: 15px 24px; }
    .sg-body { flex: 1; min-width: 0; padding: 40px 50px; overflow-y: visible; background: #181818; position: relative; }
    .sg-section { display: none; animation: fadeIn 0.3s ease; }
    .sg-section.active { display: block; }
    .sg-eyebrow { font-size: 12px; font-weight: bold; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 10px; }    
    .sg-avatar-row { display: flex; align-items: center; gap: 20px; padding: 20px; background: #222; border-radius: 12px; margin-bottom: 30px; border: 1px solid #333; }
    .sg-avatar { width: 75px; height: 75px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary); flex-shrink: 0; background: #111; }
    .sg-avatar-info { flex: 1; min-width: 0; }
    .sg-avatar-name { font-size: 18px; font-weight: bold; color: white; }
    .sg-avatar-handle { font-size: 14px; color: var(--primary); margin-top: 4px; font-weight: 500; }    
    .sg-field { margin-bottom: 25px; }
    .sg-label { font-size: 13px; font-weight: bold; color: white; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; }
    .sg-badge { font-size: 11px; padding: 3px 8px; border-radius: 4px; background: #333; color: white; border: 1px solid #444; }
    .sg-badge.locked { color: #e91e63; background: rgba(233,30,99,.1); border-color: rgba(233,30,99,.3); }
    .sg-input-wrap { display: flex; align-items: center; border: 1px solid #444; border-radius: 6px; overflow: hidden; transition: 0.2s; background: #222; }
    .sg-input-wrap:focus-within { border-color: var(--primary); }
    .sg-input-pre { padding: 0 12px; font-size: 15px; font-weight: bold; color: var(--primary); background: #2a2a2a; border-right: 1px solid #444; display: flex; align-items: center; align-self: stretch; }
    .sg-input { width: 100%; padding: 12px 15px; border: none; background: transparent; color: white; font-size: 15px; outline: none; font-family: inherit; }
    .sg-input::placeholder { color: #777; }
    .sg-input:disabled { background: #1a1a1a; color: #666; cursor: not-allowed; }
    .sg-hint { font-size: 12px; color: var(--text-muted); margin-top: 6px; line-height: 1.4; }
    .sg-hint.danger { color: #e91e63; font-weight: bold; }
    .sg-save-btn { width: 100%; padding: 14px; border-radius: 50px; background: white; color: black; font-size: 15px; font-weight: bold; border: none; cursor: pointer; transition: 0.2s; margin-top: 10px; }
    .sg-save-btn:hover { transform: scale(1.02); }    
    .sg-danger-zone { border: 1px solid rgba(233,30,99,.3); border-radius: 8px; padding: 20px; margin-top: 20px; background: rgba(233,30,99,.05); }
    .sg-danger-title { font-size: 15px; font-weight: bold; color: #e91e63; margin-bottom: 8px; }
    .sg-danger-desc { font-size: 13px; color: var(--text-muted); margin-bottom: 15px; line-height: 1.5; }
    .sg-danger-btn { font-size: 14px; padding: 10px 20px; border-radius: 50px; background: transparent; border: 1px solid #e91e63; color: #e91e63; cursor: pointer; font-weight: bold; transition: 0.2s; }
    .sg-danger-btn:hover { background: rgba(233,30,99,.15); }
    .sg-noti-row { display: flex; align-items: center; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #282828; }
    .sg-noti-row:last-child { border-bottom: none; }
    .sg-noti-label { font-size: 14px; font-weight: bold; color: white; }
    .sg-noti-desc { font-size: 12px; color: var(--text-muted); margin-top: 4px; line-height: 1.4; }    
    .sg-toggle { position: relative; width: 42px; height: 24px; flex-shrink: 0; cursor: pointer; }
    .sg-toggle input { display: none; }
    .sg-toggle-track { position: absolute; inset: 0; background: #444; border-radius: 15px; transition: 0.2s; }
    .sg-toggle input:checked + .sg-toggle-track { background: var(--primary); }
    .sg-toggle-thumb { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: white; border-radius: 50%; transition: 0.2s; pointer-events: none; }
    .sg-toggle input:checked ~ .sg-toggle-thumb { left: 21px; }
    .sg-select { padding: 8px 12px; border: 1px solid #444; border-radius: 6px; background: #222; color: white; font-size: 13px; outline: none; cursor: pointer; font-family: inherit; font-weight: bold;}
    .sg-select:focus { border-color: var(--primary); }
    
    @media (max-width: 768px) {
        .sg-top-bar { padding: 15px 20px; }
        .sg-root { flex-direction: column; margin: 0; width: 100%; border-radius: 0; min-height: auto !important; height: auto !important; border: none; overflow: visible !important; }
        .sg-nav { width: 100%; display: flex; overflow-x: auto; border-right: none; border-bottom: 1px solid #282828; padding: 10px; }
        .sg-nav-item { border-left: none; border-bottom: 3px solid transparent; white-space: nowrap; padding: 10px 15px;}
        .sg-nav-item.active { border-left-color: transparent; border-bottom-color: var(--primary); }
        .sg-nav-sep { display: none; }
        .sg-body {
            padding: 25px 20px 180px 20px !important;
            min-height: auto !important;
            overflow-y: visible !important;
        }
    }
    </style>

    <div style="display: flex; flex-direction: column;">
        <header class="sg-top-bar animate__animated animate__fadeInDown">
            <button class="sg-back-btn" onclick="navigate('/user/home')" title="Volver al inicio">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </button>
            <div style="color: white; font-weight: bold; font-size: 1.2rem; margin-left: 20px;">Configuración de Vibeforge</div>
        </header>

        <div class="sg-root animate__animated animate__fadeIn">
            <nav class="sg-nav" aria-label="Secciones de configuración">
                <div class="sg-nav-item active" onclick="sgShowSection('perfil',this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> 
                    Perfil
                </div>
                <div class="sg-nav-item" onclick="sgShowSection('cuenta',this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> 
                    Seguridad
                </div>
                <div class="sg-nav-item" onclick="sgShowSection('notificaciones',this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> 
                    Notificaciones
                </div>
                <div class="sg-nav-item" onclick="sgShowSection('privacidad',this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> 
                    Privacidad
                </div>
                
                <div class="sg-nav-sep"></div>
                <div class="sg-nav-item" onclick="sgShowSection('peligro',this)" style="color:#e91e63;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> 
                    Zona peligrosa
                </div>
            </nav>

            <div class="sg-body">
                
                ${skeletonHTML}

                <div id="real-settings-content" style="display: none;">
                    
                    <section class="sg-section active" id="sec-perfil">
                        <p class="sg-eyebrow">Tu identidad pública</p>
                        
                        <div class="sg-avatar-row">
                            <img class="sg-avatar" id="prev-avatar" src="${IMG_DEFAULT}" alt="Avatar">
                            <div class="sg-avatar-info">
                                <div class="sg-avatar-name" id="prev-nombre">Cargando...</div>
                                <div class="sg-avatar-handle" id="prev-handle">@...</div>
                            </div>
                        </div>

                        <div class="sg-field">
                            <div class="sg-label">Nombre para mostrar</div>
                            <div class="sg-input-wrap">
                                <input class="sg-input" id="inp-nombre" placeholder="¿Cómo querés que te llamen?" oninput="document.getElementById('prev-nombre').textContent=this.value||'Usuario'">
                            </div>
                        </div>

                        <div id="contenedor-arroba-settings"></div>

                        <div class="sg-field">
                            <div class="sg-label">Enlace de Foto de Perfil</div>
                            <div class="sg-input-wrap">
                                <input class="sg-input" id="inp-avatar" placeholder="https://..." oninput="sgActualizarAvatar(this.value)">
                            </div>
                            <p class="sg-hint">Pegá una URL directa a tu imagen (terminada en .jpg, .png).</p>
                        </div>

                        <div class="sg-field">
                            <div class="sg-label">Biografía</div>
                            <div class="sg-input-wrap" style="align-items:flex-start;">
                                <textarea class="sg-input" id="inp-bio" maxlength="150" placeholder="Contá algo sobre vos..." style="height:90px; padding-top:12px; resize:none; line-height:1.5;"></textarea>
                            </div>
                        </div>

                        <button class="sg-save-btn" onclick="guardarPerfilSettings()">Guardar perfil</button>
                    </section>

                    <section class="sg-section" id="sec-cuenta">
                        <p class="sg-eyebrow">Cambiar Contraseña</p>
                        <div class="sg-field">
                            <div class="sg-label">Contraseña actual</div>
                            <div class="sg-input-wrap">
                                <input class="sg-input" id="inp-pass-actual" type="password" placeholder="Requerida para autorizar el cambio">
                            </div>
                        </div>
                        <div class="sg-field">
                            <div class="sg-label">Nueva contraseña</div>
                            <div class="sg-input-wrap">
                                <input class="sg-input" id="inp-pass-nueva" type="password" placeholder="Mínimo 6 caracteres">
                            </div>
                        </div>
                        <button class="sg-save-btn" onclick="guardarPasswordSettings()">Actualizar contraseña</button>
                    </section>

                    <section class="sg-section" id="sec-notificaciones">
                        <p class="sg-eyebrow">Cuándo te avisamos</p>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Waves en tus publicaciones</div><div class="sg-noti-desc">Cuando alguien le da una wave a tu post.</div></div>
                            <label class="sg-toggle"><input type="checkbox" id="noti-waves"><div class="sg-toggle-track"></div><div class="sg-toggle-thumb"></div></label>
                        </div>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Comentarios en tus posts</div><div class="sg-noti-desc">Cuando alguien deja una barra en tu jam session.</div></div>
                            <label class="sg-toggle"><input type="checkbox" id="noti-comentarios"><div class="sg-toggle-track"></div><div class="sg-toggle-thumb"></div></label>
                        </div>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Pases (respuestas)</div><div class="sg-noti-desc">Cuando te responden un comentario.</div></div>
                            <label class="sg-toggle"><input type="checkbox" id="noti-pases"><div class="sg-toggle-track"></div><div class="sg-toggle-thumb"></div></label>
                        </div>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Menciones</div><div class="sg-noti-desc">Cuando alguien te etiqueta con @.</div></div>
                            <label class="sg-toggle"><input type="checkbox" id="noti-menciones"><div class="sg-toggle-track"></div><div class="sg-toggle-thumb"></div></label>
                        </div>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Nuevos seguidores</div><div class="sg-noti-desc">Cuando alguien empieza a seguirte.</div></div>
                            <label class="sg-toggle"><input type="checkbox" id="noti-seguidores"><div class="sg-toggle-track"></div><div class="sg-toggle-thumb"></div></label>
                        </div>
                        <button class="sg-save-btn" style="margin-top:20px;" onclick="guardarNotificacionesSettings()">Guardar preferencias</button>
                    </section>

                    <section class="sg-section" id="sec-privacidad">
                        <p class="sg-eyebrow">Quién ve qué</p>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Perfil visible para</div><div class="sg-noti-desc">Quién puede ver tu perfil y publicaciones.</div></div>
                            <select class="sg-select" id="priv-perfil">
                                <option value="TODOS">Todos</option>
                                <option value="SEGUIDORES">Solo seguidores</option>
                                <option value="NADIE">Nadie (Oculto)</option>
                            </select>
                        </div>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Mostrar en búsquedas</div><div class="sg-noti-desc">Aparecés cuando buscan usuarios.</div></div>
                            <label class="sg-toggle"><input type="checkbox" id="priv-busqueda"><div class="sg-toggle-track"></div><div class="sg-toggle-thumb"></div></label>
                        </div>
                        <div class="sg-noti-row">
                            <div><div class="sg-noti-label">Quién puede comentar</div><div class="sg-noti-desc">En tus publicaciones en el muro.</div></div>
                            <select class="sg-select" id="priv-comentarios">
                                <option value="TODOS">Todos</option>
                                <option value="SEGUIDORES">Solo seguidores</option>
                            </select>
                        </div>
                        <button class="sg-save-btn" style="margin-top:20px;" onclick="guardarPrivacidadSettings()">Guardar configuración</button>
                    </section>

                    <section class="sg-section" id="sec-peligro">
                        <p class="sg-eyebrow">Acciones irreversibles</p>
                        <div class="sg-danger-zone">
                            <div class="sg-danger-title">Cerrar sesión en todos lados</div>
                            <div class="sg-danger-desc">Se cerrará tu sesión actual por seguridad. Tendrás que volver a ingresar tu correo y contraseña.</div>
                            <button class="sg-danger-btn" onclick="auth.logout()">Cerrar sesión</button>
                        </div>
                        <div class="sg-danger-zone" style="margin-top:20px;">
                            <div class="sg-danger-title">Eliminar cuenta permanentemente</div>
                            <div class="sg-danger-desc">Se borrarán tu perfil, publicaciones, playlists y comentarios para siempre. Esta acción no se puede deshacer.</div>
                            <button class="sg-danger-btn" onclick="abrirModalEliminarCuenta()">Eliminar mi cuenta</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('app').innerHTML = htmlEstructura;

    window.sgShowSection = function(id, el) {
        document.querySelectorAll('.sg-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.sg-nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById('sec-' + id).classList.add('active');
        el.classList.add('active');
    };

    window.sgActualizarAvatar = function(url) {
        const av = document.getElementById('prev-avatar');
        av.src = url || IMG_DEFAULT;
    };

    try {
        const usuario = await api.get('/usuarios/' + auth.idActual);
        const sk = document.getElementById('settings-skeleton');
        const real = document.getElementById('real-settings-content');
        if(sk) sk.style.display = 'none';
        if(real) {
            real.style.display = 'block';
            real.classList.add('animate__animated', 'animate__fadeIn');
        }

        document.getElementById('inp-nombre').value = usuario.nombre || usuario.username || '';
        document.getElementById('prev-nombre').textContent = usuario.nombre || usuario.username || 'Usuario';
        document.getElementById('inp-bio').value = usuario.bio || ''; 
        
        if (usuario.imagenUrl) {
            document.getElementById('inp-avatar').value = usuario.imagenUrl;
            document.getElementById('prev-avatar').src = usuario.imagenUrl;
        }

        document.getElementById('noti-waves').checked = usuario.notiWaves !== false;
        document.getElementById('noti-comentarios').checked = usuario.notiComentarios !== false;
        document.getElementById('noti-pases').checked = usuario.notiPases !== false;
        document.getElementById('noti-menciones').checked = usuario.notiMenciones !== false;
        document.getElementById('noti-seguidores').checked = usuario.notiSeguidores !== false;

        document.getElementById('priv-perfil').value = usuario.privPerfil || 'TODOS';
        document.getElementById('priv-busqueda').checked = usuario.privBusqueda !== false;
        document.getElementById('priv-comentarios').value = usuario.privComentarios || 'TODOS';

        let bloqueado = false;
        let diasRestantes = 0;

        if (usuario.fechaModificacionHandle) {
            let dateString = usuario.fechaModificacionHandle.endsWith('Z') ? usuario.fechaModificacionHandle : usuario.fechaModificacionHandle + 'Z';
            const fechaMod = new Date(dateString);
            const diffDias = Math.floor((Date.now() - fechaMod.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDias < 30) {
                bloqueado = true;
                diasRestantes = 30 - diffDias;
            }
        }

        document.getElementById('prev-handle').textContent = usuario.handle ? `@${usuario.handle}` : '@usuario';
        const contenedorArroba = document.getElementById('contenedor-arroba-settings');
        
        if (bloqueado) {
            contenedorArroba.innerHTML = `
                <div class="sg-field">
                    <div class="sg-label">Arroba único <span class="sg-badge locked">Bloqueado temporalmente</span></div>
                    <div class="sg-input-wrap">
                        <div class="sg-input-pre" style="color:#666;">@</div>
                        <input class="sg-input" id="inp-handle" value="${usuario.handle || ''}" disabled>
                    </div>
                    <p class="sg-hint danger">Faltan ${diasRestantes} días para que puedas volver a cambiar tu arroba.</p>
                </div>
            `;
        } else {
            contenedorArroba.innerHTML = `
                <div class="sg-field">
                    <div class="sg-label">Arroba único <span class="sg-badge">Disponible para cambiar</span></div>
                    <div class="sg-input-wrap">
                        <div class="sg-input-pre">@</div>
                        <input class="sg-input" id="inp-handle" value="${usuario.handle || ''}" placeholder="tu_arroba" oninput="document.getElementById('prev-handle').textContent='@'+(this.value||'usuario')">
                    </div>
                    <p class="sg-hint">Podés cambiarlo una vez cada 30 días. Sin espacios.</p>
                </div>
            `;
        }

    } catch(e) {
        mostrarMensajeAjustes("Error al cargar tus datos.", "error");
    }
}

window.guardarPerfilSettings = async function() {
    const handleInput = document.getElementById('inp-handle');
    const handle = handleInput ? handleInput.value : '';
    const nombre = document.getElementById('inp-nombre').value;
    const avatarUrl = document.getElementById('inp-avatar').value;
    const bio = document.getElementById('inp-bio').value;
    const datosAEnviar = {};
    if (handleInput && !handleInput.disabled && handle.trim() !== '') datosAEnviar.handle = handle;
    if (nombre.trim() !== '') datosAEnviar.nombre = nombre;
    datosAEnviar.imagenUrl = avatarUrl; 
    datosAEnviar.bio = bio;

    try {
        await api.patch('/usuarios/' + auth.idActual + '/perfil', datosAEnviar);
        mostrarMensajeAjustes("Perfil actualizado con éxito 🎉", "success");
        
        if (datosAEnviar.nombre) {
            auth.nombre = datosAEnviar.nombre;
            localStorage.setItem('nombre', datosAEnviar.nombre);
        }
        
        const avatarFinal = datosAEnviar.imagenUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc';
        localStorage.setItem('user_avatar', avatarFinal);

        if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#1ed760'] });
        if (datosAEnviar.handle) setTimeout(renderSettings, 1500);

    } catch(e) {
        let msgError = "Verificá tus datos.";
        if (e.mensaje) msgError = e.mensaje; 
        else if (e.response && e.response.data && e.response.data.mensaje) msgError = e.response.data.mensaje; 
        mostrarMensajeAjustes(msgError, "error");
    }
};

window.guardarNotificacionesSettings = async function() {
    const datosAEnviar = {
        notiWaves: document.getElementById('noti-waves').checked,
        notiComentarios: document.getElementById('noti-comentarios').checked,
        notiPases: document.getElementById('noti-pases').checked,
        notiMenciones: document.getElementById('noti-menciones').checked,
        notiSeguidores: document.getElementById('noti-seguidores').checked
    };

    try {
        await api.patch('/usuarios/' + auth.idActual + '/perfil', datosAEnviar);
        mostrarMensajeAjustes("Preferencias de notificaciones guardadas 🔔", "success");
    } catch(e) {
        mostrarMensajeAjustes("Error al guardar las notificaciones.", "error");
    }
};

window.guardarPrivacidadSettings = async function() {
    const datosAEnviar = {
        privPerfil: document.getElementById('priv-perfil').value,
        privBusqueda: document.getElementById('priv-busqueda').checked,
        privComentarios: document.getElementById('priv-comentarios').value
    };

    try {
        await api.patch('/usuarios/' + auth.idActual + '/perfil', datosAEnviar);
        mostrarMensajeAjustes("Configuración de privacidad guardada 🕵️", "success");
        if (typeof cargarCacheBuscador === 'function') {
            window.cacheBuscador.cargado = false;
            cargarCacheBuscador();
        }
    } catch(e) {
        mostrarMensajeAjustes("Error al guardar la privacidad.", "error");
    }
};

window.guardarPasswordSettings = async function() {
    const passActual = document.getElementById('inp-pass-actual').value;
    const passNueva = document.getElementById('inp-pass-nueva').value;

    if (!passActual || !passNueva) {
        mostrarMensajeAjustes("Completá ambas contraseñas para continuar.", "error");
        return;
    }

    try {
        await api.patch('/usuarios/' + auth.idActual + '/perfil', {
            passwordActual: passActual,
            passwordNueva: passNueva
        });
        
        mostrarMensajeAjustes("Contraseña actualizada con éxito 🔒", "success");
        document.getElementById('inp-pass-actual').value = '';
        document.getElementById('inp-pass-nueva').value = '';
    } catch(e) {
        mostrarMensajeAjustes("La contraseña actual es incorrecta.", "error");
    }
};

window.abrirModalEliminarCuenta = function() {
    const modal = document.createElement('div');
    modal.id = 'modal-eliminar-cuenta';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 999999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px);';
    
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration: 0.3s; background: #181818; padding: 40px; border-radius: 16px; border: 1px solid #e91e63; width: 90vw; max-width: 450px; text-align: center; box-shadow: 0 20px 50px rgba(233, 30, 99, 0.4);">
            
            <div style="color: #e91e63; margin-bottom: 20px; background: rgba(233,30,99,0.1); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            
            <h2 style="color: white; font-size: 1.8rem; margin-bottom: 15px; font-weight: 900;">¿Borrar tu cuenta?</h2>
            
            <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 25px; line-height: 1.5;">
                Esta acción es <b>irreversible</b>. Se eliminarán permanentemente tu perfil, tus playlists y tus publicaciones.
            </p>
            
            <div style="text-align: left; margin-bottom: 30px;">
                <label style="display: block; color: #e91e63; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">Ingresá tu contraseña para confirmar</label>
                <div style="position: relative; display: flex; align-items: center; background: #222; border: 1px solid #e91e63; border-radius: 6px; overflow: hidden;">
                    <input type="password" id="pass-eliminar-cuenta" placeholder="••••••••" style="width: 100%; padding: 14px 15px; border: none; background: transparent; color: white; outline: none; font-size: 16px;">
                </div>
            </div>

            <div style="display: flex; gap: 15px;">
                <button onclick="document.getElementById('modal-eliminar-cuenta').remove()" style="flex: 1; padding: 14px; border-radius: 500px; background: transparent; border: 1px solid #555; color: white; font-weight: bold; cursor: pointer; transition: 0.2s;">Cancelar</button>
                <button onclick="confirmarEliminarCuenta()" id="btn-conf-eliminar" style="flex: 1; padding: 14px; border-radius: 500px; background: #e91e63; color: white; font-weight: bold; border: none; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 15px rgba(233, 30, 99, 0.4);">Eliminar Todo</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => document.getElementById('pass-eliminar-cuenta').focus(), 100);
};

window.confirmarEliminarCuenta = async function() {
    const password = document.getElementById('pass-eliminar-cuenta').value;
    if (!password) {
        mostrarMensajeAjustes("Escribí tu contraseña para continuar.", "error");
        return;
    }

    const btn = document.getElementById('btn-conf-eliminar');
    btn.innerText = "Borrando...";
    btn.style.pointerEvents = "none";

    try {
        await api.post(`/usuarios/${auth.idActual}/eliminar`, { password: password });
        
        document.getElementById('modal-eliminar-cuenta').remove();
        mostrarMensajeAjustes("Cuenta eliminada exitosamente. Adiós 💔", "success");
        
        setTimeout(() => auth.logout(), 2500);
        
    } catch (e) {
        btn.innerText = "Eliminar Todo";
        btn.style.pointerEvents = "auto";
        mostrarMensajeAjustes("Contraseña incorrecta.", "error");
    }
};

function mostrarMensajeAjustes(texto, tipo) {
    let toastAntiguo = document.getElementById('vibeforge-toast');
    if (toastAntiguo) toastAntiguo.remove();

    const toast = document.createElement('div');
    toast.id = 'vibeforge-toast';
    toast.innerText = texto;
    
    toast.style.cssText = `
        position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%) translateY(20px);
        background: ${tipo === 'error' ? '#e91e63' : '#1ed760'}; color: ${tipo === 'error' ? 'white' : 'black'};
        padding: 12px 24px; border-radius: 500px; font-weight: bold; font-size: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 999999; opacity: 0; transition: opacity 0.3s ease, transform 0.3s ease; pointer-events: none;
    `;

    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; }, 10);
    setTimeout(() => {
        toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500); 
}