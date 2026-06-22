package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Album;
import com.pp2.vibeforge.models.FavoritoAlbum;
import com.pp2.vibeforge.models.FavoritoArtista;
import com.pp2.vibeforge.repositories.AlbumRepository;
import com.pp2.vibeforge.repositories.FavoritoAlbumRepository;
import com.pp2.vibeforge.repositories.FavoritoArtistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "*")
public class FavoritoController {

    @Autowired
    private FavoritoArtistaRepository favoritoArtistaRepository;

    @Autowired
    private FavoritoAlbumRepository favoritoAlbumRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private com.pp2.vibeforge.repositories.ArtistaRepository artistaRepository;

    @GetMapping("/artistas/usuario/{idUsuario}")
    public ResponseEntity<?> obtenerArtistasFavoritos(@PathVariable Integer idUsuario) {
        List<Integer> ids = favoritoArtistaRepository.findIdsArtistasByIdUsuario(idUsuario);
        List<com.pp2.vibeforge.models.Artista> listaCompleta = new ArrayList<>();
        for (Integer id : ids) {
            artistaRepository.findById(id).ifPresent(listaCompleta::add);
        }
        return ResponseEntity.ok(listaCompleta);
    }

    @PostMapping("/artista/{idArtista}/usuario/{idUsuario}")
    public ResponseEntity<?> agregarArtistaFavorito(@PathVariable Integer idArtista, @PathVariable Integer idUsuario) {
        if (!favoritoArtistaRepository.existsByIdUsuarioAndIdArtista(idUsuario, idArtista)) {
            FavoritoArtista fav = new FavoritoArtista();
            fav.setIdUsuario(idUsuario);
            fav.setIdArtista(idArtista);
            favoritoArtistaRepository.save(fav);
        }
        return ResponseEntity.ok(Map.of("favorito", true));
    }

    @DeleteMapping("/artista/{idArtista}/usuario/{idUsuario}")
    public ResponseEntity<?> eliminarArtistaFavorito(@PathVariable Integer idArtista, @PathVariable Integer idUsuario) {
        favoritoArtistaRepository.deleteByIdUsuarioAndIdArtista(idUsuario, idArtista);
        return ResponseEntity.ok(Map.of("favorito", false));
    }

    @GetMapping("/artista/{idArtista}/verificar/{idUsuario}")
    public ResponseEntity<?> verificarArtistaFavorito(@PathVariable Integer idArtista, @PathVariable Integer idUsuario) {
        boolean existe = favoritoArtistaRepository.existsByIdUsuarioAndIdArtista(idUsuario, idArtista);
        return ResponseEntity.ok(Map.of("esFavorito", existe));
    }

    @GetMapping("/albumes/usuario/{idUsuario}")
    public ResponseEntity<?> obtenerAlbumesFavoritos(@PathVariable Integer idUsuario) {
        List<Integer> ids = favoritoAlbumRepository.findIdsAlbumesByIdUsuario(idUsuario);
        List<Album> listaCompleta = new ArrayList<>();
        for (Integer id : ids) {
            albumRepository.findById(id).ifPresent(listaCompleta::add);
        }
        return ResponseEntity.ok(listaCompleta);
    }

    @PostMapping("/album/{idAlbum}/usuario/{idUsuario}")
    public ResponseEntity<?> agregarAlbumFavorito(@PathVariable Integer idAlbum, @PathVariable Integer idUsuario) {
        if (!favoritoAlbumRepository.existsByIdUsuarioAndIdAlbum(idUsuario, idAlbum)) {
            FavoritoAlbum fav = new FavoritoAlbum();
            fav.setIdUsuario(idUsuario);
            fav.setIdAlbum(idAlbum);
            favoritoAlbumRepository.save(fav);
        }
        return ResponseEntity.ok(Map.of("favorito", true));
    }

    @DeleteMapping("/album/{idAlbum}/usuario/{idUsuario}")
    public ResponseEntity<?> eliminarAlbumFavorito(@PathVariable Integer idAlbum, @PathVariable Integer idUsuario) {
        favoritoAlbumRepository.deleteByIdUsuarioAndIdAlbum(idUsuario, idAlbum);
        return ResponseEntity.ok(Map.of("favorito", false));
    }

    @GetMapping("/album/{idAlbum}/verificar/{idUsuario}")
    public ResponseEntity<?> verificarAlbumFavorito(@PathVariable Integer idAlbum, @PathVariable Integer idUsuario) {
        boolean existe = favoritoAlbumRepository.existsByIdUsuarioAndIdAlbum(idUsuario, idAlbum);
        return ResponseEntity.ok(Map.of("esFavorito", existe));
    }
}