window.graficosGlobalesAdmin = [];

async function renderAdminMetrics() {
    if (auth.rolActual !== 'ADMIN') {
        navigate('/login');
        return;
    }

    let skMetricsHTML = '';
    const titulosMetricas = ['Usuarios Registrados', 'Artistas en la Forja', 'Álbumes Almacenados', 'Tracks Operativos'];
    for(let i=0; i<4; i++) {
        skMetricsHTML += `
            <div class="metric-card" style="pointer-events: none;">
                <div class="metric-title">${titulosMetricas[i]}</div>
                <div class="skeleton-shimmer sk-rect" style="width: 60px; height: 40px; margin-top: 10px;"></div>
            </div>
        `;
    }

    let skChartsHTML = '';
    for(let i=0; i<4; i++) {
        skChartsHTML += `
            <div class="chart-box" style="display: flex; align-items: center; justify-content: center; border: 1px solid #333;">
                <div class="skeleton-shimmer sk-rect" style="width: 100%; height: 100%; border-radius: 4px; opacity: 0.5;"></div>
            </div>
        `;
    }

    const contenidoHTML = `
        <style>
            .admin-container-metrics { padding: 30px; box-sizing: border-box; width: 100%; max-width: 1200px; margin: 0 auto; overflow-x: hidden; }
            .admin-header h1 { font-size: 2.5rem; font-weight: 800; color: white; margin: 0; line-height: 1.2; }
            
            .metrics-top-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 40px; }
            .metric-card { background: #181818; border: 1px solid #282828; padding: 25px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: center; }
            .metric-title { color: var(--text-muted); font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; }
            .metric-value { font-size: 2.2rem; font-weight: 800; margin-top: 10px; }
            
            .metrics-charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 30px; box-sizing: border-box; width: 100%; }
            .chart-box { background: #282828; padding: 25px; border-radius: 8px; border: 1px solid #333; height: 320px; position: relative; width: 100%; box-sizing: border-box; }

            @media (max-width: 768px) {
                .admin-container-metrics { padding: 15px; }
                .admin-header h1 { font-size: 1.8rem !important; }

                .metrics-top-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; margin-bottom: 25px !important; }
                .metric-card { padding: 15px 10px !important; text-align: center; }
                .metric-title { font-size: 9px !important; letter-spacing: 0 !important; }
                .metric-value { font-size: 1.6rem !important; margin-top: 5px !important; }

                .metrics-charts-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
                .chart-box { padding: 15px !important; height: 280px !important; }
            }
        </style>

        <div class="animate-fade-in admin-container-metrics">
            <header style="margin-bottom: 30px;" class="admin-header">
                <p style="color: var(--primary); text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 2px; margin-bottom: 5px;">Consola de Inteligencia</p>
                <h1>Métricas del Servidor</h1>
            </header>

            <div id="sk-metrics-layer">
                <div class="metrics-top-grid">
                    ${skMetricsHTML}
                </div>
                <div class="metrics-charts-grid">
                    ${skChartsHTML}
                </div>
            </div>

            <div id="real-metrics-layer" style="display: none;">
                <div class="metrics-top-grid">
                    <div class="metric-card">
                        <div class="metric-title">Usuarios Registrados</div>
                        <div id="metric-usuarios" class="metric-value" style="color: white;">0</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Artistas en la Forja</div>
                        <div id="metric-artistas" class="metric-value" style="color: var(--primary);">0</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Álbumes Almacenados</div>
                        <div id="metric-albumes" class="metric-value" style="color: white;">0</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-title">Tracks Operativos</div>
                        <div id="metric-canciones" class="metric-value" style="color: white;">0</div>
                    </div>
                </div>

                <div class="metrics-charts-grid">
                    <div class="chart-box">
                        <canvas id="chart-global-volumen"></canvas>
                    </div>
                    <div class="chart-box">
                        <canvas id="chart-global-visibilidad"></canvas>
                    </div>
                    <div class="chart-box">
                        <canvas id="chart-global-popularidad"></canvas>
                    </div>
                    <div class="chart-box">
                        <canvas id="chart-comunidad-estado"></canvas>
                    </div>
                </div>
            </div>

        </div>
    `;

    document.getElementById('app').innerHTML = ui.renderLayout(contenidoHTML);
    await procesarYRenderizarEstadisticas();
}

async function procesarYRenderizarEstadisticas() {
    window.graficosGlobalesAdmin.forEach(g => g.destroy());
    window.graficosGlobalesAdmin = [];

    try {
        const stats = await api.get('/admin/metricas/global');
        setTimeout(async () => {
            
            const skLayer = document.getElementById('sk-metrics-layer');
            const realLayer = document.getElementById('real-metrics-layer');
            if(skLayer) skLayer.style.display = 'none';
            if(realLayer) {
                realLayer.style.display = 'block';
                realLayer.classList.add('animate__animated', 'animate__fadeIn');
            }

            document.getElementById('metric-usuarios').innerText = stats.totalUsuarios.toLocaleString();
            document.getElementById('metric-artistas').innerText = stats.totalArtistas.toLocaleString();
            document.getElementById('metric-albumes').innerText = stats.totalAlbumes.toLocaleString();
            document.getElementById('metric-canciones').innerText = stats.totalCanciones.toLocaleString();

            const isMobile = window.innerWidth <= 768;
            const generarOpciones = (titulo) => ({
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { 
                        display: true, 
                        text: titulo, 
                        color: 'white', 
                        font: { size: isMobile ? 13 : 16, weight: 'bold' },
                        padding: { bottom: 15 }
                    },
                    legend: { 
                        position: 'bottom', 
                        labels: { color: '#ccc', font: { size: isMobile ? 10 : 12 }, boxWidth: 12 } 
                    }
                }
            });

            const config1 = {
                type: 'bar',
                data: {
                    labels: ['Artistas', 'Álbumes', 'Canciones'],
                    datasets: [{
                        label: 'Cantidad de registros',
                        data: [stats.totalArtistas, stats.totalAlbumes, stats.totalCanciones],
                        backgroundColor: ['#1ed760', '#2196F3', '#9C27B0'],
                        borderRadius: 4
                    }]
                },
                options: {
                    ...generarOpciones('Volumen Total de Almacenamiento'),
                    scales: {
                        y: { ticks: { color: '#888', font: { size: 10 } }, grid: { color: '#333' } },
                        x: { ticks: { color: '#888', font: { size: 10 } }, grid: { display: false } }
                    }
                }
            };

            const config2 = {
                type: 'doughnut',
                data: {
                    labels: ['Públicos / Activos', 'Ocultos / Desactivados'],
                    datasets: [{
                        data: [stats.artistasActivos, stats.artistasOcultos],
                        backgroundColor: ['#4caf50', '#ff9800'],
                        borderWidth: 0
                    }]
                },
                options: generarOpciones('Disponibilidad del Catálogo')
            };

            const config3 = {
                type: 'pie',
                data: {
                    labels: ['Éxitos Globales', 'Intermedios', 'Emergentes'],
                    datasets: [{
                        data: [stats.popAlta, stats.popMedia, stats.popBaja],
                        backgroundColor: ['#e91e63', '#FFC107', '#00BCD4'],
                        borderWidth: 0
                    }]
                },
                options: generarOpciones('Segmentación Analítica de Popularidad')
            };

            const usuariosDB = await api.get('/usuarios');
            const usuariosMortales = usuariosDB.filter(u => u.rol !== 'ADMIN');
            const cantSuspendidos = usuariosMortales.filter(u => u.suspendido === true).length;
            const cantActivos = usuariosMortales.length - cantSuspendidos;

            const config4 = {
                type: 'bar',
                data: {
                    labels: ['Activos', 'Suspendidos'],
                    datasets: [{
                        label: 'Usuarios',
                        data: [cantActivos, cantSuspendidos],
                        backgroundColor: ['rgba(30, 215, 96, 0.8)', 'rgba(233, 30, 99, 0.8)'],
                        borderRadius: 4
                    }]
                },
                options: {
                    ...generarOpciones('Estado de la Comunidad'),
                    plugins: {
                        ...generarOpciones('Estado de la Comunidad').plugins,
                        legend: { display: false }
                    },
                    scales: {
                        y: { ticks: { color: '#888', stepSize: 1, font: { size: 10 } }, grid: { color: '#333' } },
                        x: { ticks: { color: '#888', font: { weight: 'bold', size: 10 } }, grid: { display: false } }
                    }
                }
            };

            const renderizarYClic = (id, config, tituloModal) => {
                const canvas = document.getElementById(id);
                if (!canvas) return;
                
                canvas.style.cursor = 'pointer';
                window.graficosGlobalesAdmin.push(new Chart(canvas.getContext('2d'), config));
                canvas.onclick = () => ui.abrirModalGrafico(config, tituloModal);
            };

            renderizarYClic('chart-global-volumen', config1, 'Análisis de Volumen de Almacenamiento');
            renderizarYClic('chart-global-visibilidad', config2, 'Ratio de Disponibilidad del Catálogo');
            renderizarYClic('chart-global-popularidad', config3, 'Segmentación de Popularidad Global');
            renderizarYClic('chart-comunidad-estado', config4, 'Análisis de Suspensión y Cuentas Activas');

        }, 350);

    } catch (e) {
        console.error("Error al procesar el Tablero de Comando Administrativo:", e);
        const skLayer = document.getElementById('sk-metrics-layer');
        if(skLayer) skLayer.innerHTML = '<div style="color: var(--error); padding: 20px;">Error crítico al cargar las métricas.</div>';
    }
}