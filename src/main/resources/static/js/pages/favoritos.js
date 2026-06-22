var SVG_FAV_TITLE = `<svg width="28" height="28" viewBox="0 0 24 24" fill="#1ed760" stroke="#1ed760" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: bottom; margin-left: 8px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
var SVG_FAV_BADGE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="#1ed760" stroke="#1ed760" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: text-bottom; margin-right: 4px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;

async function renderFavoritos() {
    if (!auth.estaAutenticado()) {
        navigate('/login');
        return;
    }

    let skArtistasHTML = '';
    for(let i=0; i<5; i++) {
        skArtistasHTML += `
            <div class="card card-fav-art" style="background: #181818; padding: 20px 10px; border-radius: 12px; border: 1px solid #222; cursor: default; pointer-events: none;">
                <div class="skeleton-shimmer sk-avatar" style="width: 110px; height: 110px; margin: 0 auto 15px auto; box-shadow: 0 8px 20px rgba(0,0,0,0.4);"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 14px; margin: 0 auto 8px auto;"></div>
                <div class="skeleton-shimmer sk-pill" style="width: 60px; height: 12px; margin: 0 auto;"></div>
            </div>`;
    }

    let skAlbumesHTML = '';
    for(let i=0; i<5; i++) {
        skAlbumesHTML += `
            <div class="card card-fav-alb" style="background: #181818; padding: 15px; border-radius: 8px; border: 1px solid #222; cursor: default; pointer-events: none; display: flex; flex-direction: column;">
                <div class="skeleton-shimmer sk-rect" style="width: 100%; aspect-ratio: 1; border-radius: 6px; margin-bottom: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.4);"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 80%; height: 14px; margin-bottom: 8px;"></div>
                <div class="skeleton-shimmer sk-rect" style="width: 40%; height: 12px; margin-top: auto;"></div>
            </div>`;
    }

    document.getElementById('app').innerHTML = ui.renderLayout(`
        <style>
            .fav-container { padding: 30px; padding-bottom: 120px; max-width: 1200px; margin: 0 auto; box-sizing: border-box; }
            .fav-header { font-size: 2.5rem; color: white; font-weight: 800; margin-bottom: 30px; display: flex; align-items: center; }
            .fav-section-title { font-size: 1.5rem; color: #b3b3b3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; border-bottom: 1px solid #222; padding-bottom: 10px; }
            .fav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 20px; }
            
            @media (max-width: 768px) {
                .fav-container { padding: 15px; padding-bottom: 60px; }
                .fav-header { font-size: 1.8rem; margin-bottom: 20px; justify-content: center; }
                .fav-header svg { width: 22px; height: 22px; margin-left: 6px; }
                .fav-section-title { font-size: 1.1rem; text-align: center; }
                .fav-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
                .card-fav-art img, .card-fav-art .sk-avatar { width: 80px !important; height: 80px !important; margin-bottom: 10px !important; }
                .card-fav-art .card-title { font-size: 13px !important; }
                .card-fav-alb { padding: 10px !important; }
                .card-fav-alb img, .card-fav-alb .sk-rect { margin-bottom: 10px !important; }
                .card-fav-alb .card-title { font-size: 13px !important; }
            }
        </style>
        
        <div class="fav-container animate-fade-in">
            <h1 class="fav-header">Tus Favoritos ${SVG_FAV_TITLE}</h1>
            
            <div style="margin-bottom: 50px;">
                <h2 class="fav-section-title">Artistas Favoritos</h2>
                <div id="lista-favoritos-artistas" class="fav-grid">
                    ${skArtistasHTML}
                </div>
            </div>

            <div>
                <h2 class="fav-section-title">Álbumes Favoritos</h2>
                <div id="lista-favoritos-albumes" class="fav-grid">
                    ${skAlbumesHTML}
                </div>
            </div>
        </div>
    `);

    cargarArtistasFavoritosVisual();
    cargarAlbumesFavoritosVisual();
}

async function cargarArtistasFavoritosVisual() {
    const contenedor = document.getElementById('lista-favoritos-artistas');
    try {
        const artistas = await api.get(`/favoritos/artistas/usuario/${auth.idActual}`);
        
        if (!artistas || artistas.length === 0) {
            contenedor.innerHTML = '<div style="color: var(--text-muted); padding: 20px; font-size: 14px; text-align: center; background: #181818; border-radius: 8px; border: 1px dashed #333; grid-column: 1 / -1;">Aún no agregaste artistas a tus favoritos.</div>';
            return;
        }

        contenedor.innerHTML = artistas.map(art => {
            const idSeguro = art.idArtista || art.id;
            const img = art.imagenUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=Artist&backgroundColor=cccccc';
            return `
                <div class="card card-fav-art animate__animated animate__fadeIn" onclick="navigate('/user/artist?id=${idSeguro}')" style="background: #181818; padding: 20px 10px; border-radius: 12px; cursor: pointer; text-align: center; border: 1px solid #222; transition: 0.2s;" onmouseover="this.style.borderColor='#333'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#222'; this.style.transform='translateY(0)'">
                    <img src="${img}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; margin: 0 auto 15px auto; box-shadow: 0 8px 20px rgba(0,0,0,0.4); display: block;">
                    <div class="card-title" style="font-weight: bold; color: white; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${art.nombreArtistico}</div>
                    <div style="color: var(--primary); font-size: 11px; margin-top: 5px; font-weight: bold; display: flex; align-items: center; justify-content: center;">${SVG_FAV_BADGE} Favorito</div>
                </div>
            `;
        }).join('');
    } catch(e) {
        contenedor.innerHTML = '<div style="color: #e91e63; grid-column: 1 / -1; text-align: center;">Error al sintonizar artistas.</div>';
    }
}

async function cargarAlbumesFavoritosVisual() {
    const contenedor = document.getElementById('lista-favoritos-albumes');
    try {
        const albumes = await api.get(`/favoritos/albumes/usuario/${auth.idActual}`);
        
        if (!albumes || albumes.length === 0) {
            contenedor.innerHTML = '<div style="color: var(--text-muted); padding: 20px; font-size: 14px; text-align: center; background: #181818; border-radius: 8px; border: 1px dashed #333; grid-column: 1 / -1;">Aún no agregaste álbumes a tus favoritos.</div>';
            return;
        }

        contenedor.innerHTML = albumes.map(alb => {
            const img = alb.imagenUrl || 'https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021';
            return `
                <div class="card card-fav-alb animate__animated animate__fadeIn" onclick="navigate('/user/album?id=${alb.idAlbum}')" style="background: #181818; padding: 15px; border-radius: 8px; cursor: pointer; border: 1px solid #222; transition: 0.2s; display: flex; flex-direction: column;" onmouseover="this.style.borderColor='#333'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#222'; this.style.transform='translateY(0)'">
                    <img src="${img}" style="width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 6px; margin-bottom: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.4);">
                    <div class="card-title" style="font-weight: bold; color: white; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;">${alb.titulo}</div>
                    <div style="color: var(--text-muted); font-size: 12px; margin-top: auto;">Álbum</div>
                </div>
            `;
        }).join('');
    } catch(e) {
        contenedor.innerHTML = '<div style="color: #e91e63; grid-column: 1 / -1; text-align: center;">Error al sintonizar álbumes.</div>';
    }
}