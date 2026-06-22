window.usuariosMemoriaAdmin = [];

var SVG_SEARCH_ADMIN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
var SVG_CROWN_ADMIN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1ed760" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><path d="M2 4l3 11h14l3-11-5 6-5-6-5 6-5-6z"></path><rect x="2" y="18" width="20" height="2" rx="1"></rect></svg>`;

async function renderAdminUsuarios() {
    if (auth.rolActual !== 'ADMIN') {
        navigate('/login');
        return;
    }

    let skRowsHTML = '';
    for(let i=0; i<6; i++) {
        skRowsHTML += `
            <tr>
                <td class="td-user">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="skeleton-shimmer sk-avatar" style="width: 38px; height: 38px; flex-shrink: 0;"></div>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                            <div class="skeleton-shimmer sk-rect" style="width: 120px; height: 12px;"></div>
                            <div class="skeleton-shimmer sk-rect solo-movil" style="width: 80px; height: 10px;"></div>
                        </div>
                    </div>
                </td>
                <td class="td-email"><div class="skeleton-shimmer sk-rect" style="width: 150px; height: 12px;"></div></td>
                <td class="td-role"><div class="skeleton-shimmer sk-rect" style="width: 60px; height: 12px;"></div></td>
                <td class="td-status"><div class="skeleton-shimmer sk-pill" style="width: 80px; height: 22px;"></div></td>
                <td class="td-action"><div class="skeleton-shimmer sk-pill" style="width: 80px; height: 28px; margin-left: auto;"></div></td>
            </tr>
        `;
    }

    document.getElementById('app').innerHTML = ui.renderLayout(`
        <style>
            .admin-container { padding: 30px; max-width: 1100px; margin: 0 auto; }
            .tabla-admin { width: 100%; border-collapse: collapse; text-align: left; color: white; }
            .tabla-admin th { padding: 15px 20px; color: var(--text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #333; background: #222; }
            .tabla-admin td { padding: 15px 20px; border-bottom: 1px solid #2a2a2a; }
            .solo-movil { display: none; }

            @media (max-width: 768px) {
                .admin-container { padding: 15px; }
                .admin-header h1 { font-size: 1.8rem !important; }
                .search-box { max-width: 100% !important; }
                
                .tabla-wrapper { overflow-x: hidden; } /* Adiós al scroll horizontal */
                .tabla-admin thead { display: none; } /* Ocultamos los encabezados en móvil */
                
                .tabla-admin tbody tr { 
                    display: grid; 
                    grid-template-columns: 1fr auto; 
                    gap: 12px; 
                    padding: 15px 10px !important; 
                    border-bottom: 1px solid #333 !important;
                }
                
                .tabla-admin td { padding: 0 !important; border: none !important; display: flex; align-items: center; }
                
                .td-user { grid-column: 1 / -1; } /* Usuario ocupa toda la parte superior */
                .td-email { display: none !important; } /* Ocultamos la columna vieja de correo */
                .td-role { display: none !important; } /* Ocultamos la columna de rol */
                .td-status { grid-column: 1; justify-content: flex-start; } /* Estado abajo a la izq */
                .td-action { grid-column: 2; justify-content: flex-end; } /* Botón abajo a la der */
                
                .solo-movil { display: flex; gap: 8px; align-items: center; margin-top: 4px; font-size: 11px; color: #888; }
            }
        </style>

        <div class="animate-fade-in admin-container">
            <header style="margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center;" class="admin-header">
                <div>
                    <p style="color: var(--primary); text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 2px; margin-bottom: 5px;">Moderación</p>
                    <h1 style="font-weight: 800; color: white; margin: 0;">Gestión de Comunidad</h1>
                </div>
            </header>

            <div style="background: #181818; border-radius: 12px; border: 1px solid #333; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                
                <div style="padding: 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
                    <div class="search-box" style="position: relative; width: 100%; max-width: 350px;">
                        <span style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: #666;">${SVG_SEARCH_ADMIN}</span>
                        <input type="text" id="filtro-usuarios-admin" placeholder="Buscar por nombre o correo..." oninput="filtrarTablaUsuarios(this.value)" style="padding: 12px 15px 12px 40px; border-radius: 500px; border: 1px solid #333; background: #222; color: white; width: 100%; outline: none; transition: 0.2s; box-sizing: border-box;" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'">
                    </div>
                </div>

                <div class="tabla-wrapper">
                    <table class="tabla-admin">
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th style="text-align: center;">Acción</th>
                            </tr>
                        </thead>
                        <tbody id="tabla-usuarios-body">
                            ${skRowsHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `);

    cargarTablaUsuarios();
}

async function cargarTablaUsuarios() {
    try {
        const usuarios = await api.get('/usuarios');
        window.usuariosMemoriaAdmin = usuarios;
        dibujarFilasUsuarios(usuarios);
    } catch (e) {
        document.getElementById('tabla-usuarios-body').innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: #e91e63;">Error al cargar los usuarios.</td></tr>`;
    }
}

function dibujarFilasUsuarios(usuariosArray) {
    const tbody = document.getElementById('tabla-usuarios-body');
    
    if (usuariosArray.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">No se encontraron resultados.</td></tr>`;
        return;
    }

    const icoBan = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 5px;"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`;
    const icoOk = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 5px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

    let html = '';
    usuariosArray.forEach(u => {
        const imgUrl = u.imagenUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${u.idUsuario}&backgroundColor=cccccc`;
        const esAdmin = u.rol === 'ADMIN';
        const estaSuspendido = u.suspendido === true;
        const badgeEstado = estaSuspendido 
            ? `<span style="background: rgba(233,30,99,0.1); color: #e91e63; padding: 4px 10px; border-radius: 500px; font-size: 11px; font-weight: bold; border: 1px solid rgba(233,30,99,0.3);">${icoBan} Suspendido</span>`
            : `<span style="background: rgba(30,215,96,0.1); color: #1ed760; padding: 4px 10px; border-radius: 500px; font-size: 11px; font-weight: bold; border: 1px solid rgba(30,215,96,0.3);">${icoOk} Activo</span>`;

        const badgeRolMovil = esAdmin ? `<span style="color:#1ed760;">${SVG_CROWN_ADMIN} ADMIN</span>` : `<span>USER</span>`;
        let botonAccion = '';
        if (!esAdmin) {
            if (estaSuspendido) {
                botonAccion = `<button onclick="alternarSuspensionUsuario(${u.idUsuario})" style="background: transparent; border: 1px solid #1ed760; color: #1ed760; padding: 6px 15px; border-radius: 500px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='rgba(30,215,96,0.1)'" onmouseout="this.style.background='transparent'">Habilitar</button>`;
            } else {
                botonAccion = `<button onclick="alternarSuspensionUsuario(${u.idUsuario})" style="background: transparent; border: 1px solid #e91e63; color: #e91e63; padding: 6px 15px; border-radius: 500px; font-size: 12px; font-weight: bold; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='rgba(233,30,99,0.1)'" onmouseout="this.style.background='transparent'">Suspender</button>`;
            }
        }

        html += `
            <tr style="transition: 0.2s;" onmouseover="this.style.backgroundColor='#222'" onmouseout="this.style.backgroundColor='transparent'">
                <td class="td-user">
                    <div onclick="navigate('/user/profile?id=${u.idUsuario}')" style="display: flex; align-items: center; gap: 12px; cursor: pointer; transition: 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'" title="Ver perfil del usuario">
                        <img src="${imgUrl}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1px solid #444;">
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-weight: bold; color: white; font-size: 14px;">${u.nombre || u.username}</span>
                            <span class="solo-movil">${u.correo} | ${badgeRolMovil}</span>
                        </div>
                    </div>
                </td>
                <td class="td-email" style="color: #bbb;">${u.correo}</td>
                <td class="td-role" style="color: #bbb; font-size: 12px;">${esAdmin ? `${SVG_CROWN_ADMIN} ADMIN` : 'USER'}</td>
                <td class="td-status">${badgeEstado}</td>
                <td class="td-action">${botonAccion}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

window.filtrarTablaUsuarios = function(texto) {
    const t = texto.toLowerCase().trim();
    if (!t) {
        dibujarFilasUsuarios(window.usuariosMemoriaAdmin);
        return;
    }
    
    const filtrados = window.usuariosMemoriaAdmin.filter(u => 
        (u.nombre && u.nombre.toLowerCase().includes(t)) || 
        (u.correo && u.correo.toLowerCase().includes(t))
    );
    dibujarFilasUsuarios(filtrados);
};

window.alternarSuspensionUsuario = async function(idUsuario) {
    const confirmado = await ui.confirmar("¿Modificar estado?", "Vas a cambiar el acceso de este usuario a la plataforma. ¿Continuar?");
    if (!confirmado) return;

    try {
        const respuesta = await api.patch(`/usuarios/${idUsuario}/estado-suspension`);
        const userIndex = window.usuariosMemoriaAdmin.findIndex(u => u.idUsuario === idUsuario);
        if (userIndex !== -1) {
            window.usuariosMemoriaAdmin[userIndex].suspendido = respuesta.suspendido;
        }
        
        filtrarTablaUsuarios(document.getElementById('filtro-usuarios-admin').value);
        
        const msj = respuesta.suspendido ? "Cuenta suspendida." : "Cuenta rehabilitada.";
        ui.alerta("Operación exitosa", msj, respuesta.suspendido ? "error" : "success");
        
    } catch (e) {
        ui.alerta("Error", "No se pudo modificar el estado del usuario.", "error");
    }
};