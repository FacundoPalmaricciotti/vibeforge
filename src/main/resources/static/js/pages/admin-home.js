async function renderAdminHome() {
    if (auth.rolActual !== 'ADMIN') {
        navigate('/login');
        return;
    }

    var icoUsuarios = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:15px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    var icoCatalogo = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:15px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`;
    var icoMetricas = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:15px;"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`;

    const contenidoHTML = `
    <style>
        .admin-header { font-size: 2.5rem; }
        .admin-grid-top { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .admin-grid-bottom { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        
        @media (max-width: 768px) {
            .admin-header { font-size: 1.8rem !important; }
            
            .admin-grid-top { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; margin-bottom: 25px !important; }
            .admin-grid-top > div { padding: 12px 5px !important; text-align: center; }
            .admin-grid-top p:first-child { font-size: 9px !important; margin-bottom: 4px !important; letter-spacing: 0 !important; }
            .admin-grid-top p:last-child { font-size: 12px !important; line-height: 1.2; }
            .admin-grid-bottom { grid-template-columns: 1fr !important; gap: 15px !important; }
            .admin-grid-bottom > div { padding: 20px !important; }
        }
    </style>
    <div class="animate-fade-in" style="padding: 20px; box-sizing: border-box; max-width: 1200px; margin: 0 auto;">
            <header style="margin-bottom: 30px;">
                <p style="color: var(--primary); text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 2px; margin-bottom: 5px;">Panel de Control</p>
                <h1 class="admin-header" style="font-weight: 800; color: white; margin: 0; line-height: 1.2;">Bienvenido al panel administrativo</h1>
            </header>

            <div class="admin-grid-top">
                <div style="background: #181818; padding: 20px; border-radius: 8px; border: 1px solid #333; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                    <p style="color: var(--text-muted); font-size: 13px; text-transform: uppercase; margin-bottom: 8px; font-weight: bold;">Base de Datos</p>
                    <p style="font-size: 24px; font-weight: bold; color: #1ed760; margin: 0;">Conectada</p>
                </div>
                <div style="background: #181818; padding: 20px; border-radius: 8px; border: 1px solid #333; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                    <p style="color: var(--text-muted); font-size: 13px; text-transform: uppercase; margin-bottom: 8px; font-weight: bold;">Sincronización</p>
                    <p style="font-size: 24px; font-weight: bold; color: white; margin: 0;">Deezer API Activa</p>
                </div>
                <div style="background: #181818; padding: 20px; border-radius: 8px; border: 1px solid #333; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                    <p style="color: var(--text-muted); font-size: 13px; text-transform: uppercase; margin-bottom: 8px; font-weight: bold;">Versión</p>
                    <p style="font-size: 24px; font-weight: bold; color: var(--text-muted); margin: 0;">v2.4.0</p>
                </div>
            </div>

            <h2 style="font-size: 1.5rem; margin-bottom: 20px; color: white;">Accesos Directos de Gestión</h2>
            
            <div class="admin-grid-bottom">
                <div onclick="navigate('/admin/usuarios')" 
                     style="background: #181818; border: 1px solid #333; padding: 30px; border-radius: 8px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"
                     onmouseover="this.style.background='#222'; this.style.borderColor='var(--primary)';" 
                     onmouseout="this.style.background='#181818'; this.style.borderColor='#333';">
                    ${icoUsuarios}
                    <h3 style="color: white; margin-bottom: 10px; font-size: 1.3rem;">Comunidad y Moderación</h3>
                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0;">
                        Visualizá a todos los usuarios registrados. Aplicá o levantá suspensiones (Shadow Bans) a cuentas que incumplan las normas.
                    </p>
                </div>

                <div onclick="navigate('/admin/artistas')" 
                     style="background: #181818; border: 1px solid #333; padding: 30px; border-radius: 8px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"
                     onmouseover="this.style.background='#222'; this.style.borderColor='var(--primary)';" 
                     onmouseout="this.style.background='#181818'; this.style.borderColor='#333';">
                    ${icoCatalogo}
                    <h3 style="color: white; margin-bottom: 10px; font-size: 1.3rem;">Gestión de Catálogo</h3>
                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0;">
                        Importá nuevos artistas directamente desde Deezer. Controlá álbumes, canciones y portadas de forma automatizada en la BD.
                    </p>
                </div>

                <div onclick="navigate('/admin/metricas')" 
                     style="background: #181818; border: 1px solid #333; padding: 30px; border-radius: 8px; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"
                     onmouseover="this.style.background='#222'; this.style.borderColor='var(--primary)';" 
                     onmouseout="this.style.background='#181818'; this.style.borderColor='#333';">
                    ${icoMetricas}
                    <h3 style="color: white; margin-bottom: 10px; font-size: 1.3rem;">Métricas Generales</h3>
                    <p style="color: var(--text-muted); font-size: 14px; line-height: 1.5; margin: 0;">
                        Visualizá estadísticas globales de la plataforma, rendimiento de almacenamiento, volumen de canciones y uso del sistema.
                    </p>
                </div>
            </div>
    </div>
    `;

    document.getElementById('app').innerHTML = ui.renderLayout(contenidoHTML);
}