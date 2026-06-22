const ui = {
    SVG_CLOSE: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    SVG_PLUS_FAB: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
    SVG_LOGO: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 6px;"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
    SVG_BELL_EMPTY: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px; color: var(--text-muted);"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    graficoExpandidoActual: null,

renderLayout(contenidoPrincipal) {
        const rol = auth.rolActual;      
        var icoHome = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`;
        var icoPerfil = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
        var icoPlaylists = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 6a1 1 0 0 0-1-1H4a1 1 0 0 0 0 2h16a1 1 0 0 0 1-1zm0 6a1 1 0 0 0-1-1H4a1 1 0 0 0 0 2h16a1 1 0 0 0 1-1zm-9 6a1 1 0 0 0-1-1H4a1 1 0 0 0 0 2h7a1 1 0 0 0 1-1z"/><path d="M16.5 13.5a1.5 1.5 0 0 0-1.5 1.5v3a2 2 0 1 0 2 2v-4.5l3.5 1.5V15l-4-1.5z"/></svg>`;
        var icoFavs = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        var icoModeracion = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
        var icoCatalogo = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
        var icoMetricas = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;

        const menuItems = rol === 'ADMIN' ? `
            <div class="nav-item" onclick="navigate('/admin/home')">${icoHome} <span class="nav-item-text">Panel Admin</span></div>
            <div class="nav-item" onclick="navigate('/admin/usuarios')">${icoModeracion} <span class="nav-item-text">Moderación</span></div>
            <div class="nav-item" onclick="navigate('/admin/artistas')">${icoCatalogo} <span class="nav-item-text">Catálogo</span></div>
            <div class="nav-item" onclick="navigate('/admin/metricas')">${icoMetricas} <span class="nav-item-text">Métricas</span></div>
        ` : `
            <div class="nav-item" onclick="navigate('/user/home')" title="Inicio">${icoHome} <span class="nav-item-text">Inicio</span></div>
            <div class="nav-item" onclick="navigate('/user/profile')" title="Mi Perfil">${icoPerfil} <span class="nav-item-text">Mi Perfil</span></div>
            <div class="nav-item" onclick="navigate('/user/playlists')" title="Mis Playlists">${icoPlaylists} <span class="nav-item-text">Mis Playlists</span></div>
            <div class="nav-item" onclick="navigate('/user/favoritos')" title="Favoritos">${icoFavs} <span class="nav-item-text">Favoritos</span></div>
        `;

        const avatarGuardado = localStorage.getItem('user_avatar') || 'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc';

        const botonFlotanteSocial = rol !== 'ADMIN' ? `
            <button class="fab-social fab-alive" 
                    onclick="window.abrirModalAccionRapida()" 
                    title="¿Qué estás pensando?" style="display: flex; justify-content: center; align-items: center;">
                ${this.SVG_PLUS_FAB}
            </button>
        ` : '';

        return `
            <div class="app-layout">
                <aside class="sidebar">
                    <div class="logo" style="cursor:pointer" onclick="navigate(auth.rolActual === 'ADMIN' ? '/admin/home' : '/user/home')">${this.SVG_LOGO} Vibeforge</div>
                    <nav class="nav-links">
                        ${menuItems}
                    </nav>
                </aside>

                <main class="main-area">
                    <header class="topbar" style="display:flex; justify-content:space-between; align-items:center; flex-shrink: 0;">
                        <div class="topbar-nav-container">
                            <button class="nav-arrow" onclick="volverAtras()" title="Atrás" id="btn-back">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
                            </button>
                            <button class="nav-arrow" onclick="window.history.forward()" title="Adelante" id="btn-forward">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
                            </button>
                        </div>
                        <div class="search-container">
                            <span class="search-icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>
                            </span>
                            <input type="text" id="global-search" class="global-search-input" 
                                   placeholder="Buscar artistas, álbumes o usuarios..." 
                                   autocomplete="off" 
                                   onfocus="cargarCacheBuscador()" 
                                   oninput="ejecutarBusquedaGlobal(this.value)">
                            <div id="search-dropdown" class="search-dropdown"></div>
                        </div>
                        
                        <div class="topbar-user" style="position: relative; margin-left: auto; display: flex; align-items: center; gap: 20px;">                           
                            <div style="position: relative;">
                                <style>
                                    @keyframes vibra-campana {
                                        0% { transform: rotate(0deg); }
                                        20% { transform: rotate(20deg); }
                                        40% { transform: rotate(-15deg); }
                                        60% { transform: rotate(10deg); }
                                        80% { transform: rotate(-5deg); }
                                        100% { transform: rotate(0deg); }
                                    }
                                    .campana-activa { animation: vibra-campana 0.5s ease; }
                                </style>
                                <div id="btn-campanita" onclick="toggleNotificaciones()" style="position: relative; cursor: pointer; color: var(--text-muted); transition: 0.2s; display: flex; align-items: center; padding: 5px;" onmouseover="this.style.color='white'" onmouseout="this.style.color='var(--text-muted)'" title="Notificaciones">
                                    <svg id="icono-campana-svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style="transform-origin: top center;"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg>
                                    <span id="badge-notis" data-count="0" style="display: none; position: absolute; top: -2px; right: -2px; background: #e91e63; color: white; font-size: 10px; font-weight: bold; border-radius: 50%; padding: 2px 5px; box-shadow: 0 0 8px rgba(233,30,99,0.6);">0</span>
                                </div>
                                
                                <div id="noti-dropdown" style="display: none; position: absolute; top: calc(100% + 15px); right: -10px; background: #282828; border-radius: 8px; box-shadow: 0 15px 40px rgba(0,0,0,0.9); width: 340px; max-height: 400px; z-index: 10000; border: 1px solid #3e3e3e; overflow-y: auto; overflow-x: hidden;">
                                    <div style="padding: 15px; border-bottom: 1px solid #3e3e3e; font-weight: bold; color: white; position: sticky; top: 0; background: rgba(40,40,40,0.95); backdrop-filter: blur(5px); z-index: 2; display: flex; justify-content: space-between; align-items: center;">
                                        Notificaciones
                                        <div style="display: flex; gap: 15px; align-items: center;">
                                            <span onclick="marcarNotisLeidas()" title="Marcar como leídas" style="color: #1ed760; cursor: pointer; display: flex; align-items: center; transition: 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                            </span>
                                            <span onclick="eliminarTodasLasNotificaciones()" title="Eliminar todas" style="color: #e91e63; cursor: pointer; display: flex; align-items: center; transition: 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div id="noti-list" style="display: flex; flex-direction: column;">
                                        </div>
                                </div>
                            </div>

                            <div onclick="if(auth.rolActual !== 'ADMIN') navigate('/user/profile')" 
                                 style="cursor: ${rol === 'ADMIN' ? 'default' : 'pointer'}; display: flex; align-items: center; gap: 10px; padding: 5px 10px; border-radius: 500px; transition: 0.2s;" 
                                 onmouseover="if(auth.rolActual !== 'ADMIN') this.style.background='rgba(255,255,255,0.05)'" 
                                 onmouseout="this.style.background='transparent'">
                                
                                <img src="${avatarGuardado}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid #333;">
                                
                                <div style="display: flex; flex-direction: column; justify-content: center;">
                                    <span style="color: var(--text-muted); font-size: 11px; font-weight: 500;">Hola de nuevo,</span>
                                    <span style="color: white; font-weight: bold; font-size: 14px;">${auth.nombre || localStorage.getItem('nombre') || 'Usuario'}</span>
                                </div>
                            </div>

                            <div onclick="document.getElementById('user-menu').style.display = document.getElementById('user-menu').style.display === 'block' ? 'none' : 'block'" 
                                 style="cursor: pointer; padding: 5px; color: var(--text-muted); transition: 0.2s;">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 11L3 6h10l-5 5z"/></svg>
                            </div>
                            <div id="user-menu" style="display: none; position: absolute; top: calc(100% + 15px); right: 0; background: #282828; border-radius: 4px; box-shadow: 0 15px 40px rgba(0,0,0,0.8); width: 200px; z-index: 10000; border: 1px solid #3e3e3e; overflow: hidden;">
                                <div onclick="navigate('/user/settings'); document.getElementById('user-menu').style.display='none'" style="padding: 14px 15px; cursor: pointer; color: var(--text-muted); transition: 0.2s; display: flex; align-items: center; gap: 12px; font-weight: 500;" onmouseover="this.style.background='#3e3e3e'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='var(--text-muted)'">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/><path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.766-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.766-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/></svg>
                                    Configuración de Cuenta
                                </div>
                                <div style="height: 1px; background: #3e3e3e;"></div>
                                <div onclick="auth.logout()" style="padding: 14px 15px; cursor: pointer; color: var(--text-muted); transition: 0.2s; display: flex; align-items: center; gap: 12px; font-weight: 500;" onmouseover="this.style.background='#3e3e3e'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='var(--text-muted)'">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/><path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/></svg>
                                    Cerrar Sesión
                                </div>
                            </div>
                        </div>
                    </header>
                    
                    <div class="content-area animate__animated animate__fadeIn" style="--animate-duration: 0.4s;" onclick="let sd = document.getElementById('search-dropdown'); if(sd) sd.style.display='none'; let um = document.getElementById('user-menu'); if(um) um.style.display='none';">
                    ${contenidoPrincipal}
                    </div>
                </main>
                
                ${botonFlotanteSocial}
            </div>
            
        `;
    },

    alerta(titulo, mensaje, tipo = 'info') {
        const modalExistente = document.getElementById('modal-alerta-global');
        if (modalExistente) modalExistente.remove();

        const colorTema = tipo === 'error' ? '#e91e63' : (tipo === 'success' ? '#1ed760' : '#2196F3');
        const iconError = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e91e63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
        const iconSuccess = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1ed760" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
        const iconInfo = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
        
        const icono = tipo === 'error' ? iconError : (tipo === 'success' ? iconSuccess : iconInfo);

        const modal = document.createElement('div');
        modal.id = 'modal-alerta-global';
        modal.style.cssText = `position: fixed; inset: 0; z-index: 15000; display: flex; align-items: flex-start; justify-content: center; pointer-events: none; padding-top: 50px;`;
        
        modal.innerHTML = `
            <div class="animate__animated animate__fadeInDown" style="pointer-events: auto; background: #181818; border-radius: 12px; padding: 20px 25px; min-width: 300px; max-width: 90vw; box-shadow: 0 15px 40px rgba(0,0,0,0.8); border: 1px solid #333; border-top: 4px solid ${colorTema}; display: flex; align-items: center; gap: 15px;">
                <div style="display: flex; align-items: center;">${icono}</div>
                <div style="flex-grow: 1;">
                    <div style="color: white; font-weight: bold; font-size: 15px; margin-bottom: 3px;">${titulo}</div>
                    <div style="color: var(--text-muted); font-size: 13px; line-height: 1.4;">${mensaje}</div>
                </div>
                <button onclick="this.closest('#modal-alerta-global').remove()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center;">${ui.SVG_CLOSE}</button>
            </div>
        `;
        document.body.appendChild(modal);

        setTimeout(() => {
            if (document.getElementById('modal-alerta-global')) {
                const el = document.getElementById('modal-alerta-global').firstElementChild;
                el.classList.replace('animate__fadeInDown', 'animate__fadeOutUp');
                setTimeout(() => modal.remove(), 400);
            }
        }, 4000);
    },

    confirmar(titulo, mensaje) {
        return new Promise((resolve) => {
            const modalExistente = document.getElementById('modal-confirm-global');
            if (modalExistente) modalExistente.remove();

            const modal = document.createElement('div');
            modal.id = 'modal-confirm-global';
            modal.style.cssText = `position: fixed; inset: 0; z-index: 15000; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);`;
            
            modal.innerHTML = `
                <div class="animate__animated animate__zoomIn" style="--animate-duration: 0.2s; background: #181818; border-radius: 12px; padding: 30px; width: 90vw; max-width: 400px; box-shadow: 0 20px 50px rgba(0,0,0,0.9); border: 1px solid #333; text-align: center;">
                    <h3 style="color: white; margin: 0 0 15px 0; font-size: 1.4rem;">${titulo}</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 25px; line-height: 1.5;">${mensaje}</p>
                    <div style="display: flex; gap: 15px;">
                        <button id="btn-cancel-global" style="flex: 1; padding: 12px; border-radius: 500px; background: transparent; border: 1px solid #555; color: white; cursor: pointer; font-weight: bold; transition: 0.2s;">Cancelar</button>
                        <button id="btn-confirm-global" style="flex: 1; padding: 12px; border-radius: 500px; background: var(--primary); color: black; border: none; cursor: pointer; font-weight: bold; transition: 0.2s;">Aceptar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('btn-cancel-global').onclick = () => {
                modal.remove();
                resolve(false);
            };
            document.getElementById('btn-confirm-global').onclick = () => {
                modal.remove();
                resolve(true);
            };
        });
    },

    abrirModalGrafico(config, titulo) {
        const modalExistente = document.getElementById('modal-grafico');
        if (modalExistente) modalExistente.remove();

        const modal = document.createElement('div');
        modal.id = 'modal-grafico';
        modal.style.cssText = `
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.85);
            display: flex; align-items: center; justify-content: center;
        `;

        modal.innerHTML = `
            <div class="animate__animated animate__zoomIn" style="
                --animate-duration: 0.3s;
                background: #181818; border-radius: 12px;
                padding: 30px; width: 85vw; max-width: 1000px;
                position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.8);
                border: 1px solid #333;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 15px;">
                    <h2 style="margin: 0; color: white; font-size: 1.8rem;">${titulo}</h2>
                    <button onclick="document.getElementById('modal-grafico').remove()" style="background: transparent; border: none; color: var(--text-muted); font-size: 28px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='var(--text-muted)'">✖</button>
                </div>
                
                <div style="position: relative; height: 60vh; max-height: 600px;">
                    <canvas id="canvas-modal"></canvas>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const ctx = document.getElementById('canvas-modal').getContext('2d');
        const configClonada = Object.assign({}, config);
        configClonada.options = Object.assign({}, config.options);
        configClonada.options.maintainAspectRatio = false;
        
        if(config.options.plugins) {
            configClonada.options.plugins = Object.assign({}, config.options.plugins);
            if(configClonada.options.plugins.title) {
                configClonada.options.plugins.title = Object.assign({}, config.options.plugins.title, { display: false });
            }
        }

        if (config.options.onClick) {
            configClonada.options.onClick = (event, elements, chart) => {
                if (elements.length > 0) {
                    modal.style.display = 'none';
                    config.options.onClick(event, elements, chart);
                }
            };
        }
        
        new Chart(ctx, configClonada);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

   async registrarHistorial(tipo, id, titulo, imagenUrl) {
        if (!auth.idActual) return;

        const fallbackImg = 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
        
        const payload = {
            idUsuario: auth.idActual,
            tipoItem: tipo,
            idReferencia: parseInt(id, 10),
            titulo: titulo,
            imagenUrl: imagenUrl || fallbackImg
        };

        try {
            await api.post('/historial', payload);
            console.log(`Historial sincronizado en BD: ${titulo} (${tipo})`);
        } catch (e) {
            console.error("No se pudo guardar el historial en el servidor:", e);
        }
    }

};

window.cacheBuscador = { artistas: [], albumes: [], usuarios: [], cargado: false };
window.timerDebounce = null;

window.cargarCacheBuscador = async function() {
    if (window.cacheBuscador.cargado) return;
    try {
        const [artistas, albumes, usuarios] = await Promise.all([
            api.get('/artistas'),
            api.get('/albumes'),
            api.get('/usuarios')
        ]);

        const esAdmin = auth.rolActual === 'ADMIN';

        window.cacheBuscador.artistas = esAdmin ? artistas : artistas.filter(a => a.activo !== false);
        window.cacheBuscador.albumes = esAdmin ? albumes : albumes.filter(a => a.activo !== false);
        let usuariosFiltrados = usuarios.filter(u => u.rol !== 'ADMIN');
        if (!esAdmin) {
            usuariosFiltrados = usuariosFiltrados.filter(u => u.suspendido !== true);
        }
        
        window.cacheBuscador.usuarios = usuariosFiltrados;
        window.cacheBuscador.cargado = true;
    } catch (e) {
        console.error("Fallo al cargar caché del buscador");
    }
};

window.volverAtras = function() {
    if (window.location.pathname !== '/user/home') {
        window.history.back();
    }
};

window.clicBuscador = function(el, ruta) {
    const tipo = el.getAttribute('data-tipo');
    const id = el.getAttribute('data-id');
    const titulo = el.getAttribute('data-titulo');
    const img = el.getAttribute('data-img');
    
    ui.registrarHistorial(tipo, id, titulo, img).then(() => navigate(ruta));
};

window.ejecutarBusquedaGlobal = function(texto) {
    const dropdown = document.getElementById('search-dropdown');
    texto = texto.toLowerCase().trim();

    if (texto.length === 0) {
        dropdown.style.display = 'none';
        return;
    }

    cargarCacheBuscador();
    clearTimeout(window.timerDebounce);
    
    window.timerDebounce = setTimeout(() => {
        const textoBuscado = texto.replace('@', '');

        const artistasFiltrados = window.cacheBuscador.artistas.filter(a => a.nombreArtistico.toLowerCase().includes(textoBuscado)).slice(0, 3);
        const albumesFiltrados = window.cacheBuscador.albumes.filter(a => a.titulo.toLowerCase().includes(textoBuscado)).slice(0, 3);
        const usuariosFiltrados = window.cacheBuscador.usuarios.filter(u => {

            if (parseInt(u.idUsuario || u.id) === parseInt(auth.idActual)) {
                return false;
            }
            if (u.privBusqueda === false && auth.rolActual !== 'ADMIN' && parseInt(u.idUsuario) !== parseInt(auth.idActual)) {
                return false;
            }
            
            const nombreBusqueda = (u.nombre || '').toLowerCase();
            const usernameBusqueda = (u.username || '').toLowerCase();
            const handleBusqueda = (u.handle || '').toLowerCase();
            
            return nombreBusqueda.includes(textoBuscado) || usernameBusqueda.includes(textoBuscado) || handleBusqueda.includes(textoBuscado);
        }).slice(0, 3);

        if (artistasFiltrados.length === 0 && albumesFiltrados.length === 0 && usuariosFiltrados.length === 0) {
            dropdown.innerHTML = '<div style="padding: 20px; color: var(--text-muted); text-align:center;">No encontramos resultados para "' + texto + '"</div>';
            dropdown.style.display = 'block';
            return;
        }

        let html = '';
        if (artistasFiltrados.length > 0) {
            html += '<div style="padding: 5px 10px; font-weight:bold; color:#b3b3b3; font-size: 11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Artistas</div>';
            artistasFiltrados.forEach(a => {
                const idSeguro = a.idArtista || a.id;
                const tituloSeguro = a.nombreArtistico.replace(/"/g, '&quot;');
                const imgSegura = a.imagenUrl || 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
                
                html += `
                    <div data-tipo="artist" data-id="${idSeguro}" data-titulo="${tituloSeguro}" data-img="${imgSegura}" 
                         onclick="clicBuscador(this, '/user/artist?id=${idSeguro}')" 
                         style="padding: 8px; display:flex; align-items:center; gap: 15px; cursor:pointer; border-radius: 6px; transition:0.2s;" 
                         onmouseover="this.style.background='#3e3e3e'" onmouseout="this.style.background='transparent'">
                        <img src="${imgSegura}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                        <div style="display: flex; flex-direction: column;">
                            <span style="color:white; font-weight:bold; font-size:15px;">${a.nombreArtistico}</span>
                            <span style="color:var(--text-muted); font-size:13px;">Artista</span>
                        </div>
                    </div>`;
            });
            html += '<div style="height: 1px; background: #333; margin: 10px 0;"></div>';
        }

        if (albumesFiltrados.length > 0) {
            html += '<div style="padding: 5px 10px; font-weight:bold; color:#b3b3b3; font-size: 11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Álbumes</div>';
            albumesFiltrados.forEach(a => {
                const tituloSeguro = a.titulo.replace(/"/g, '&quot;');
                const imgSegura = a.imagenUrl || 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';

                html += `
                    <div data-tipo="album" data-id="${a.idAlbum}" data-titulo="${tituloSeguro}" data-img="${imgSegura}" 
                         onclick="clicBuscador(this, '/user/album?id=${a.idAlbum}')" 
                         style="padding: 8px; display:flex; align-items:center; gap: 15px; cursor:pointer; border-radius: 6px; transition:0.2s;" 
                         onmouseover="this.style.background='#3e3e3e'" onmouseout="this.style.background='transparent'">
                        <img src="${imgSegura}" style="width: 48px; height: 48px; border-radius: 4px; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                        <div style="display: flex; flex-direction: column;">
                            <span style="color:white; font-weight:bold; font-size:15px;">${a.titulo}</span>
                            <span style="color:var(--text-muted); font-size:13px;">Álbum</span>
                        </div>
                    </div>`;
            });
            html += '<div style="height: 1px; background: #333; margin: 10px 0;"></div>';
        }

        if (usuariosFiltrados.length > 0) {
            html += '<div style="padding: 5px 10px; font-weight:bold; color:#b3b3b3; font-size: 11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Usuarios</div>';
            usuariosFiltrados.forEach(u => {
                const nombreSeguro = (u.nombre || u.username).replace(/"/g, '&quot;');
                const imgUrl = u.imagenUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${u.idUsuario}&backgroundColor=cccccc`;
                const handleVisual = u.handle ? `<span style="color:#00bcd4;">@${u.handle}</span>` : 'Perfil Público';
                
                html += `
                    <div onclick="navigate('/user/profile?id=${u.idUsuario}')" 
                         style="padding: 8px; display:flex; align-items:center; gap: 15px; cursor:pointer; border-radius: 6px; transition:0.2s;" 
                         onmouseover="this.style.background='#3e3e3e'" onmouseout="this.style.background='transparent'">
                        <img src="${imgUrl}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                        <div style="display: flex; flex-direction: column;">
                            <span style="color:white; font-weight:bold; font-size:15px;">${nombreSeguro}</span>
                            <span style="color:var(--text-muted); font-size:13px;">${handleVisual}</span>
                        </div>
                    </div>`;
            });
        }

        dropdown.innerHTML = html;
        dropdown.style.display = 'block';
    }, 250); 
};

document.addEventListener('click', function(event) {
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = document.getElementById('global-search');
    const userMenu = document.getElementById('user-menu');

    if (searchDropdown && searchDropdown.style.display === 'block') {
        if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
            searchDropdown.style.display = 'none';
        }
    }

    if (userMenu && userMenu.style.display === 'block') {
        if (!userMenu.contains(event.target) && event.target.closest('.topbar-user') === null) {
            userMenu.style.display = 'none';
        }
    }
});


window.abrirModalAccionRapida = function() {
    const modalExistente = document.getElementById('modal-pensamiento');
    if (modalExistente) modalExistente.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-pensamiento';
    modal.style.cssText = `
        position: fixed; inset: 0; z-index: 10000;
        background: rgba(0,0,0,0.85);
        display: flex; align-items: center; justify-content: center;
    `;

    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="
            --animate-duration: 0.3s;
            background: #181818; border-radius: 12px;
            padding: 30px; width: 90vw; max-width: 500px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.8); border: 1px solid #333;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: white; font-size: 1.5rem;">¿Qué estás pensando?</h2>
                <button onclick="document.getElementById('modal-pensamiento').remove()" style="background: transparent; border: none; color: var(--text-muted); font-size: 24px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='#e91e63'" onmouseout="this.style.color='var(--text-muted)'">✖</button>
            </div>
            
            <textarea id="texto-pensamiento" rows="4" placeholder="Escribí lo que sentís o pensás (máx 500 caracteres)..." style="width: 100%; padding: 15px; border-radius: 8px; border: 1px solid #333; background: #282828; color: white; outline: none; font-size: 16px; resize: none; margin-bottom: 20px; box-sizing: border-box; transition: 0.2s;" onfocus="this.style.border='1px solid var(--primary)'" onblur="this.style.border='1px solid #333'"></textarea>
            
            <button onclick="publicarPensamiento()" style="width: 100%; padding: 12px; border-radius: 500px; background: #1ed760; color: black; font-weight: bold; font-size: 16px; border: none; cursor: pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">Publicar en el Muro</button>
        </div>
    `;

    document.body.appendChild(modal);
    
    setTimeout(() => document.getElementById('texto-pensamiento').focus(), 100);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
};

window.publicarPensamiento = async function() {
    const contenido = document.getElementById('texto-pensamiento').value;
    if (!contenido.trim()) return;

    try {
        await api.post('/pensamientos', {
            idUsuario: auth.idActual,
            contenido: contenido.trim()
        });
        
        document.getElementById('modal-pensamiento').remove();
        
        if (typeof mostrarMensajeAjustes === 'function') {
            mostrarMensajeAjustes("¡Publicado con éxito!", "success");
        } else {
            alert("¡Publicado con éxito!");
        }
        
        if (window.location.pathname === '/user/profile') {
            setTimeout(() => navigate('/user/profile'), 500);
        }
        
    } catch(e) {
        alert("Error al publicar. Intentá nuevamente.");
    }
};

window.abrirModalGuardarAlbum = async function(idAlbum) {
    const modalExistente = document.getElementById('modal-guardar-album');
    if (modalExistente) modalExistente.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-guardar-album';
    modal.style.cssText = 'position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.85); display:flex; align-items:center; justify-content:center;';
    const SVG_CHECK_ALBUM = `<svg width="12" height="12" viewBox="0 0 16 16" fill="#1ed760" style="vertical-align:middle; margin-right:4px;"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>`;

    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration:0.3s; background:#181818; border-radius:12px; padding:30px; width:90vw; max-width:400px; border:1px solid #333; text-align:center;">
            <h3 style="color:white; margin:0 0 15px 0;">Guardar Álbum en Playlist</h3>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="nueva-pl-album-input" placeholder="Crear lista nueva para este álbum..." style="flex-grow: 1; padding: 10px; border-radius: 6px; border: none; background: #282828; color: white; outline: none; border: 1px solid #333; font-size: 13px;">
                <button onclick="crearYAgregarAlbumPL(${idAlbum})" style="padding: 10px 15px; border-radius: 6px; background: white; color: black; font-weight: bold; border: none; cursor: pointer; font-size: 13px;">Crear</button>
            </div>

            <div style="border-top: 1px solid #222; padding-top: 15px; margin-bottom: 10px; text-align: left;">
                <p style="color:#666; font-size:11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; margin-bottom: 5px;">O sumarlo a una lista existente:</p>
            </div>

            <div id="lista-mis-playlists-modal" style="display:flex; flex-direction:column; gap:10px; max-height:200px; overflow-y:auto; margin-bottom:20px; padding-right: 5px;">
                <span style="color:var(--primary);">Sintonizando tus listas...</span>
            </div>

            <button onclick="document.getElementById('modal-guardar-album').remove()" style="width:100%; padding:12px; border-radius:500px; background:#333; color:white; border:none; cursor:pointer; font-weight:bold;">Cancelar</button>
        </div>
    `;
    document.body.appendChild(modal);

    try {
        const [cancionesAlbum, misPlaylists] = await Promise.all([
            api.get('/canciones/album/' + idAlbum),
            api.get('/playlists/usuario/' + auth.idActual)
        ]);

        const contenedor = document.getElementById('lista-mis-playlists-modal');
        
        if (misPlaylists.length === 0) {
            contenedor.innerHTML = '<span style="color:#555; font-size:13px; display:block; padding:10px 0;">No tenés playlists creadas todavía.</span>';
            return;
        }

        const idsAlbum = cancionesAlbum.map(c => c.idCancion);

        contenedor.innerHTML = misPlaylists.map(pl => {
            const idsPlaylist = pl.canciones ? pl.canciones.map(c => c.idCancion) : [];
            const tieneTodo = idsAlbum.length > 0 && idsAlbum.every(id => idsPlaylist.includes(id));            
            const bgColor = tieneTodo ? 'rgba(30, 215, 96, 0.08)' : '#282828';
            const textColor = tieneTodo ? '#1ed760' : 'white';
            const borde = tieneTodo ? '1px solid #1ed760' : '1px solid #333';
            const textoAccion = tieneTodo 
                ? `<span style="display:flex; align-items:center; gap:3px; font-size:12px; font-weight:bold;">${SVG_CHECK_ALBUM} Guardado</span>` 
                : `<span style="color:#666; font-size:12px;">+ Agregar</span>`;

            return `
                <div onclick="ejecutarGuardadoAlbum(${idAlbum}, ${pl.idPlaylist})" 
                     style="background:${bgColor}; border:${borde}; padding:12px; border-radius:8px; color:${textColor}; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:0.2s; text-align:left;" 
                     onmouseover="if(!${tieneTodo}) this.style.borderColor='white'" 
                     onmouseout="if(!${tieneTodo}) this.style.borderColor='#333'">
                    <span style="font-weight:bold; font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:70%;">🎵 ${pl.titulo || pl.nombre || 'Sin Título'}</span>
                    ${textoAccion}
                </div>
            `;
        }).join('');

    } catch (e) {
        document.getElementById('lista-mis-playlists-modal').innerHTML = '<span style="color:#e91e63;">Error al escanear tus playlists.</span>';
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

        if (typeof actualizarIconosAlbumSilencioso === 'function') {
            actualizarIconosAlbumSilencioso();
        } else if (typeof renderAlbum === 'function') {
            renderAlbum();
        }

    } catch (e) {
        alert("No se pudo crear la playlist express.");
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
            if (typeof mostrarMensajeAjustes === 'function') {
                mostrarMensajeAjustes("Ese álbum ya estaba completo en la playlist", "error");
            } else {
                alert("Las canciones ya estaban en la playlist.");
            }
        } else {
            if (typeof mostrarMensajeAjustes === 'function') {
                mostrarMensajeAjustes(`¡Se agregaron ${respuesta.agregadas} canciones nuevas!`, "success");
            }
            if (typeof confetti === 'function') {
                confetti({ particleCount: 50, spread: 60, colors: ['#1ed760'] });
            }
        }
        
        if (typeof renderAlbum === 'function') renderAlbum();
    } catch (e) {
        alert("Error al guardar el álbum en la playlist.");
    }
};

window.cacheUsuariosNotis = window.cacheUsuariosNotis || {};

window.getUsuarioNoti = async function(id) {
    if (window.cacheUsuariosNotis[id]) return window.cacheUsuariosNotis[id];
    try {
        const u = await api.get('/usuarios/' + id);
        window.cacheUsuariosNotis[id] = u;
        return u;
    } catch(e) {
        return { nombre: 'Usuario', imagenUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=X' };
    }
};

window.toggleNotificaciones = function() {
    const drop = document.getElementById('noti-dropdown');
    if (drop.style.display === 'none' || drop.style.display === '') {
        drop.style.display = 'block';
        drop.classList.remove('noti-drop-in');
        void drop.offsetWidth;
        drop.classList.add('noti-drop-in');
        if (document.getElementById('user-menu')) document.getElementById('user-menu').style.display = 'none';
        if (document.getElementById('search-dropdown')) document.getElementById('search-dropdown').style.display = 'none';
        cargarNotificaciones();
    } else {
        drop.style.display = 'none';
        marcarNotisLeidas();
    }
};

window.cargarNotificaciones = async function() {
    const list = document.getElementById('noti-list');
    list.innerHTML = `
        <div style="padding: 30px; text-align: center;">
            <div class="noti-spinner"></div>
            <div style="color: var(--text-muted); font-size: 12px; margin-top: 10px;">Sintonizando...</div>
        </div>`;

    try {
        const notis = await api.get('/notificaciones/usuario/' + auth.idActual);

        if (notis.length === 0) {
            list.innerHTML = `<div style="padding: 40px 20px; text-align: center; color: var(--text-muted); font-size: 13px; display: flex; flex-direction: column; align-items: center;">
                ${ui.SVG_BELL_EMPTY}
                Tu bandeja está vacía. ¡Subí una publicación para romper el hielo!
            </div>`;
            return;
        }

        const emisoresUnicos = [...new Set(notis.map(n => n.idEmisor))];
        await Promise.all(emisoresUnicos.map(id => getUsuarioNoti(id)));

        list.innerHTML = '';

        for (let n of notis) {
            const emisor = window.cacheUsuariosNotis[n.idEmisor] || { nombre: 'Usuario', imagenUrl: '' };
            let texto = '', icono = '';
            const svgNotiWave = `<svg width="14" height="14" viewBox="0 0 16 16" fill="#00bcd4"><path d="M0 11.5a.5.5 0 0 1 .5-.5h1.396a.25.25 0 0 0 .207-.11l.743-1.114a1.25 1.25 0 0 1 2.067-.043l.533.711a.25.25 0 0 0 .4 0l1.733-2.31a1.25 1.25 0 0 1 1.964-.043l.533.64a.25.25 0 0 0 .386.004l1.53-1.836a1.25 1.25 0 0 1 1.927-.044L15.65 10.1a.25.25 0 0 0 .194.1h.156a.5.5 0 0 1 0 1h-.156a1.25 1.25 0 0 1-.97-.498l-1.444-1.805a.25.25 0 0 0-.385.009l-1.53 1.836a1.25 1.25 0 0 1-1.927.022l-.533-.64a.25.25 0 0 0-.372-.016L6.4 12.418a1.25 1.25 0 0 1-2 0l-.533-.71a.25.25 0 0 0-.414.008L2.71 12.83A1.25 1.25 0 0 1 1.67 13.5H.5a.5.5 0 0 1-.5-.5v-1z"/></svg>`;
            const svgNotiComment = `<svg width="14" height="14" viewBox="0 0 16 16" fill="#1ed760"><path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10.5a.5.5 0 0 1-.8.4l-2.8-2.1a1 1 0 0 0-1.2 0L5.8 12.9a.5.5 0 0 1-.8-.4V2z"/></svg>`;
            const svgNotiReply = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path></svg>`;
            const svgNotiMention = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e91e63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>`;
            const svgNotiFollow = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9c27b0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`;
            const svgNotiBell = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`;

            switch (n.tipoAccion) {
                case 'WAVE_POST':
                    texto = `<b style="color:white">${emisor.nombre}</b> le dio una Wave a tu publicación.`;
                    icono = svgNotiWave;
                    break;
                case 'WAVE_COMMENT':
                    texto = `<b style="color:white">${emisor.nombre}</b> le dio una Wave a tu barra.`;
                    icono = svgNotiWave;
                    break;
                case 'COMMENT':
                    texto = `<b style="color:white">${emisor.nombre}</b> sumó una barra a tu Jam Session.`;
                    icono = svgNotiComment;
                    break;
                case 'REPLY_COMMENT':
                    texto = `<b style="color:white">${emisor.nombre}</b> respondió a tu pase.`;
                    icono = svgNotiReply;
                    break;
                case 'MENTION':
                    texto = `<b style="color:white">${emisor.nombre}</b> te mencionó en una respuesta.`;
                    icono = svgNotiMention;
                    break;
                case 'FOLLOW':
                    texto = `<b style="color:white">${emisor.nombre}</b> comenzó a seguirte.`;
                    icono = svgNotiFollow;
                    break;
                default:
                    texto = `<b style="color:white">${emisor.nombre}</b> interactuó con vos.`;
                    icono = svgNotiBell;
            }

            const bg = n.leida ? 'transparent' : 'rgba(30, 215, 96, 0.07)';
            const dot = n.leida ? '' : `<div style="min-width:8px; height:8px; background:#1ed760; border-radius:50%; box-shadow: 0 0 6px #1ed760; flex-shrink:0;"></div>`;

            const item = document.createElement('div');
            item.className = 'noti-item';
            item.setAttribute('data-id', n.idNotificacion);
            item.style.background = bg;
            item.innerHTML = `
                <div class="noti-item-inner" onclick="document.getElementById('noti-dropdown').style.display='none'; marcarNotisLeidas(); window.irAReferenciaNoti('${n.tipoAccion}', ${n.idReferencia})">
                    <div style="position: relative; flex-shrink: 0;">
                        <img src="${emisor.imagenUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=X'}" 
                             style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover; border: 1px solid #444;"
                             onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=X'">
                        <span style="position:absolute; bottom:-3px; right:-3px; font-size:12px; background:#282828; border-radius:50%; padding:2px; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">${icono}</span>
                    </div>
                    <div style="font-size: 13px; color: #bbb; line-height: 1.45; flex: 1; min-width: 0;">
                        ${texto}
                        <div class="noti-time" data-fecha="${n.fecha}" style="font-size: 11px; color: #555; margin-top: 3px;">${formatearFechaNoti(n.fecha)}</div>
                    </div>
                    ${dot}
                </div>
                <button class="noti-delete-btn" onclick="eliminarNotificacion(${n.idNotificacion}, this)" title="Eliminar">✕</button>
            `;
            list.appendChild(item);
        }

        if (window._notiTimeInterval) clearInterval(window._notiTimeInterval);
        window._notiTimeInterval = setInterval(() => {
            document.querySelectorAll('.noti-time[data-fecha]').forEach(el => {
                el.textContent = formatearFechaNoti(el.getAttribute('data-fecha'));
    });
}, 30000);

    } catch(e) {
        list.innerHTML = '<div style="padding:20px; text-align:center; color:#e91e63; font-size:13px;">Error de conexión. Intentá de nuevo.</div>';
    }
};

window.irAReferenciaNoti = async function(tipoAccion, idReferencia) {
    try {
        if (tipoAccion === 'WAVE_POST') {
            await api.get('/pensamientos/' + idReferencia);
            navigate('/user/post?id=' + idReferencia);

        } else if (tipoAccion === 'COMMENT' || tipoAccion === 'REPLY_COMMENT' || tipoAccion === 'WAVE_COMMENT' || tipoAccion === 'MENTION') {

            const comentario = await api.get('/comentarios/' + idReferencia);
            await api.get('/pensamientos/' + comentario.idPensamiento); 
            navigate('/user/post?id=' + comentario.idPensamiento + '&scrollto=' + idReferencia);

        } else if (tipoAccion === 'FOLLOW') {
            navigate('/user/profile?id=' + idReferencia);
        } else {
            navigate('/user/profile?id=' + auth.idActual);
        }
    } catch (error) {
        console.warn("Elemento no encontrado en BD:", error);
        ui.alerta("Elemento no encontrado", "Parece que esta publicación o comentario fue eliminado.", "error");
    }
};

window.eliminarNotificacion = async function(idNoti, btn) {
    const item = btn.closest('.noti-item');
    item.style.transition = 'all 0.25s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px)';
    setTimeout(() => item.remove(), 250);
    try {
        await api.borrar('/notificaciones/' + idNoti);
    } catch(e) {}
};

window.eliminarTodasLasNotificaciones = async function() {

    const items = document.querySelectorAll('.noti-item');
    if (items.length === 0) return;
    const confirmado = await ui.confirmar("Vaciar Bandeja", "¿Estás seguro de querer eliminar todo el historial de notificaciones? No se puede deshacer.");
    if (!confirmado) return;
    items.forEach((item, i) => {
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.transform = 'translateY(30px)';
            item.style.opacity = '0';
        }, i * 30);
    });

    setTimeout(() => {
        document.getElementById('noti-list').innerHTML = `
            <div class="animate__animated animate__fadeIn" style="padding: 40px 20px; text-align: center; color: var(--text-muted); font-size: 13px; display: flex; flex-direction: column; align-items: center;">
                ${ui.SVG_BELL_EMPTY}
                Bandeja vaciada con éxito.
            </div>`;
    }, (items.length * 30) + 150);

    try {
        await api.borrar('/notificaciones/usuario/' + auth.idActual + '/todas');
        actualizarCampanita();
    } catch(e) {
        ui.alerta("Error", "No se pudieron borrar de la base de datos", "error");
    }
};

window.formatearFechaNoti = function(fechaStr) {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    const diff = Math.floor((Date.now() - fecha.getTime()) / 1000);

    if (diff < 5) return 'ahora mismo';
    if (diff < 60) return `hace ${diff} seg`;
    if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
    if (diff < 172800) return 'ayer';
    return `hace ${Math.floor(diff / 86400)} días`;
};

window.actualizarCampanita = async function() {
    if (!auth || !auth.idActual) return;
    
    try {
        const noLeidas = await api.get('/notificaciones/usuario/' + auth.idActual + '/noleidas');
        const badge = document.getElementById('badge-notis');
        const campanita = document.getElementById('btn-campanita');
        if (!badge) return;

        const countActual = parseInt(badge.getAttribute('data-count')) || 0;
        const hayAhora = noLeidas > 0;

        if (hayAhora) {
            badge.innerText = noLeidas > 99 ? '99+' : noLeidas;
            badge.style.display = 'flex';

            if (noLeidas > countActual && campanita) {
                campanita.classList.remove('campana-vibrar');
                void campanita.offsetWidth;
                campanita.classList.add('campana-vibrar');
            }

            badge.classList.remove('badge-pop');
            void badge.offsetWidth;
            badge.classList.add('badge-pop');
        } else {
            badge.style.display = 'none';
        }
        badge.setAttribute('data-count', noLeidas);
    } catch(e) {}
};


window.marcarNotisLeidas = async function() {
    const hayNoLeidas = Array.from(document.querySelectorAll('.noti-item')).some(item => item.style.background !== 'transparent');
    if (!hayNoLeidas) return;
    try {
        await api.patch('/notificaciones/usuario/' + auth.idActual + '/leer-todas');
        actualizarCampanita();
        document.querySelectorAll('.noti-item').forEach(item => {
            item.style.transition = 'background 0.5s ease';
            item.style.background = 'transparent';
            const dot = item.querySelector('[style*="border-radius:50%"]');
            if (dot) dot.style.display = 'none';
        });
        if (typeof mostrarMensajeAjustes === 'function') mostrarMensajeAjustes("Marcadas como leídas", "info");
    } catch(e) {}
};

window.conectarWebSocketNotificaciones = function() {
    if (!auth || !auth.idActual) {
        setTimeout(window.conectarWebSocketNotificaciones, 500);
        return;
    }

    if (typeof actualizarCampanita === 'function') {
        actualizarCampanita();
    }

    const esLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const hostBase = esLocal ? 'localhost:8080' : 'vibeforge-backend.onrender.com';
    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    
    const wsUrl = `${wsProtocol}${hostBase}/ws-notificaciones`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        console.log("[WS-OK] Conectado: Recibiendo notificaciones en vivo.");
        socket.send("AUTH:" + auth.idActual);
    };

    socket.onmessage = (evento) => {
        if (evento.data === "NUEVA_NOTIFICACION") {
            console.log("[WS-PING] Notificación entrante en tiempo real.");
            actualizarCampanita();
            const drop = document.getElementById('noti-dropdown');
            if (drop && drop.style.display === 'block') {
                cargarNotificaciones();
            }
        }
    };

    socket.onclose = () => {
        console.log("[WS-CLOSED] Desconectado. Reintentando en 5 segundos...");
        setTimeout(window.conectarWebSocketNotificaciones, 5000);
    };
};

if (!window._wsInstanciado) {
    window._wsInstanciado = true;
    window.conectarWebSocketNotificaciones();
}

window.lanzarOnboarding = function() {
    if (!auth || !auth.idActual) {
        setTimeout(lanzarOnboarding, 300);
        return;
    }
    
    if (localStorage.getItem('ob_done') === 'true') return;
    if (document.getElementById('modal-onboarding')) return;

    const SVG_MUSIC = `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px; filter: drop-shadow(0 4px 10px rgba(30,215,96,0.3));"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
    const SVG_COMMUNITY = `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px; filter: drop-shadow(0 4px 10px rgba(255,193,7,0.3));"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    const SVG_AT = `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px; filter: drop-shadow(0 4px 10px rgba(0,188,212,0.3));"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>`;
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shakeInput { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-6px); } 40%, 80% { transform: translateX(6px); } }
        .error-shake { animation: shakeInput 0.4s ease; border-color: #e91e63 !important; box-shadow: 0 0 15px rgba(233, 30, 99, 0.4) !important; }
        .step-onboarding { display: none; flex-direction: column; align-items: center; text-align: center; animation: fadeIn 0.4s ease; }
        .step-active { display: flex; }
        .ob-dots { display: flex; gap: 8px; justify-content: center; margin-bottom: 25px; }
        .ob-dot { width: 8px; height: 8px; border-radius: 50%; background: #444; transition: 0.3s; }
        .ob-dot.active { background: var(--primary); width: 24px; border-radius: 4px; }
    `;
    document.head.appendChild(style);

    const modal = document.createElement('div');
    modal.id = 'modal-onboarding';
    modal.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 999999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px);';
    
    modal.innerHTML = `
        <div class="animate__animated animate__zoomIn" style="--animate-duration: 0.4s; background: #181818; padding: 40px; border-radius: 16px; border: 1px solid #282828; width: 90vw; max-width: 450px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); position: relative; overflow: hidden;">
            
            <div id="ob-step-1" class="step-onboarding step-active">
                <div class="ob-dots"><div class="ob-dot active"></div><div class="ob-dot"></div><div class="ob-dot"></div></div>
                ${SVG_MUSIC}
                <h2 style="color: white; font-size: 2rem; margin-bottom: 15px; font-weight: 900; line-height: 1.1;">Tu universo musical</h2>
                <p style="color: var(--text-muted); font-size: 15px; line-height: 1.5; margin-bottom: 30px;">
                    En Vibeforge vas a poder curar tus propias playlists, descubrir nuevos artistas y guardar tus álbumes favoritos en un solo lugar.
                </p>
                <button onclick="document.getElementById('ob-step-1').classList.remove('step-active'); document.getElementById('ob-step-2').classList.add('step-active');" 
                        style="width: 100%; padding: 14px; border-radius: 500px; background: white; color: black; font-weight: bold; font-size: 16px; border: none; cursor: pointer; transition: 0.2s;">
                    Siguiente
                </button>
            </div>

            <div id="ob-step-2" class="step-onboarding">
                <div class="ob-dots"><div class="ob-dot"></div><div class="ob-dot active" style="background:#FFC107;"></div><div class="ob-dot"></div></div>
                ${SVG_COMMUNITY}
                <h2 style="color: white; font-size: 2rem; margin-bottom: 15px; font-weight: 900; line-height: 1.1;">Compartí tu vibra</h2>
                <p style="color: var(--text-muted); font-size: 15px; line-height: 1.5; margin-bottom: 30px;">
                    Escribí lo que pensás en el muro, dale una <i>Wave</i> a los posteos de tus amigos y armá sesiones de debate en los comentarios.
                </p>
                <button onclick="document.getElementById('ob-step-2').classList.remove('step-active'); document.getElementById('ob-step-3').classList.add('step-active'); setTimeout(() => document.getElementById('ob-handle-input').focus(), 100);" 
                        style="width: 100%; padding: 14px; border-radius: 500px; background: #FFC107; color: black; font-weight: bold; font-size: 16px; border: none; cursor: pointer; transition: 0.2s;">
                    Siguiente
                </button>
            </div>

            <div id="ob-step-3" class="step-onboarding">
                <div class="ob-dots"><div class="ob-dot"></div><div class="ob-dot"></div><div class="ob-dot active" style="background:#00bcd4;"></div></div>
                ${SVG_AT}
                <h2 style="color: white; font-size: 1.8rem; margin-bottom: 10px; font-weight: 900;">Tu Identidad Única</h2>
                <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 25px;">
                    Elegí un <b>@arroba</b> para que la comunidad pueda mencionarte fácilmente. Sin espacios.
                </p>
                
                <div style="width: 100%; margin-bottom: 30px; text-align: left;">
                    <div id="ob-error-msg" style="color: #e91e63; font-size: 13px; font-weight: bold; margin-bottom: 8px; height: 16px; opacity: 0; transition: 0.2s;">Usuario ya existente</div>
                    <div id="ob-input-container" style="display: flex; align-items: center; background: #222; border: 2px solid #333; border-radius: 8px; overflow: hidden; transition: 0.3s;" onfocusin="this.style.borderColor='#00bcd4'" onfocusout="this.style.borderColor='#333'">
                        <span style="padding: 14px 0 14px 15px; color: #00bcd4; font-weight: bold; font-size: 18px;">@</span>
                        <input type="text" id="ob-handle-input" placeholder="tu_arroba" style="width: 100%; padding: 14px 15px 14px 5px; border: none; background: transparent; color: white; outline: none; font-size: 17px; font-weight: bold;" onkeydown="if(event.key === 'Enter') guardarHandleOnboarding()">
                    </div>
                </div>

                <button onclick="guardarHandleOnboarding()" id="btn-save-ob" style="width: 100%; padding: 16px; border-radius: 500px; background: #00bcd4; color: black; font-weight: bold; font-size: 16px; border: none; cursor: pointer; margin-bottom: 15px; transition: 0.2s; box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);">
                    Crear mi @arroba
                </button>
                <button onclick="finalizarOnboarding()" style="background: transparent; border: none; color: var(--text-muted); font-size: 14px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='white'">
                    Saltar (Usar uno automático)
                </button>
            </div>

        </div>
    `;
    document.body.appendChild(modal);

    const observer = new MutationObserver(() => {
        if (document.getElementById('ob-step-3').classList.contains('step-active')) {
            document.getElementById('ob-handle-input').focus();
        }
    });
    observer.observe(document.getElementById('ob-step-3'), { attributes: true });
};

window.guardarHandleOnboarding = async function() {
    const input = document.getElementById('ob-handle-input');
    const container = document.getElementById('ob-input-container');
    const errorMsg = document.getElementById('ob-error-msg');
    const handleValue = input.value.trim().toLowerCase().replaceAll(/\s+/g, '');

    if (!handleValue) {
        finalizarOnboarding(); 
        return;
    }

    const btn = document.getElementById('btn-save-ob');
    const oldText = btn.innerText;
    btn.innerText = 'Verificando...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    try {
        const respuesta = await api.patch('/usuarios/' + auth.idActual + '/perfil', { 
            handle: handleValue,
            onboardingCompletado: true
        });
        
        if (respuesta && respuesta.exito === false) {
            throw { mensaje: respuesta.mensaje }; 
        }
        
        if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        finalizarOnboardingVisual();
        
    } catch (e) {
        btn.innerText = oldText;
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
        
        let msgError = "Ese @arroba ya está en uso 😔";
        if (e.mensaje) msgError = e.mensaje;
        else if (e.response && e.response.data && e.response.data.mensaje) msgError = e.response.data.mensaje;

        errorMsg.style.opacity = '1';
        errorMsg.innerText = msgError;
        
        container.classList.remove('error-shake');
        void container.offsetWidth; 
        container.classList.add('error-shake');
        
        input.focus();
    }
};

window.finalizarOnboarding = async function() {
    try {
        await api.patch('/usuarios/' + auth.idActual + '/perfil', { onboardingCompletado: true });
    } catch(e) {}
    
    finalizarOnboardingVisual();
};

window.finalizarOnboardingVisual = function() {
    localStorage.setItem('ob_done', 'true');
    const modal = document.getElementById('modal-onboarding');
    if (modal) {
        const card = modal.querySelector('div');
        card.classList.remove('animate__zoomIn');
        card.classList.add('animate__zoomOut');
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 350);
    }
};
