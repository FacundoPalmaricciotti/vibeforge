package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Cancion;
import com.pp2.vibeforge.models.Playlist;
import com.pp2.vibeforge.repositories.CancionRepository;
import com.pp2.vibeforge.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
@CrossOrigin(origins = "*")
public class PlaylistController {

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private CancionRepository cancionRepository;

    @GetMapping("/usuario/{idUsuario}")
    public List<Playlist> obtenerPorUsuario(@PathVariable Integer idUsuario) {
        return playlistRepository.findByIdUsuario(idUsuario);
    }

    @PostMapping
    public Playlist crearPlaylist(@RequestBody Playlist playlist) {
        return playlistRepository.save(playlist);
    }

    @PostMapping("/{idPlaylist}/canciones/{idCancion}")
    public Playlist agregarCancion(@PathVariable Integer idPlaylist, @PathVariable Integer idCancion) {
        Playlist playlist = playlistRepository.findById(idPlaylist).orElseThrow();
        Cancion cancion = cancionRepository.findById(idCancion).orElseThrow();

        if (!playlist.getCanciones().contains(cancion)) {
            playlist.getCanciones().add(cancion);
            playlistRepository.save(playlist);
        }
        return playlist;
    }

    @DeleteMapping("/{idPlaylist}/canciones/{idCancion}")
    public Playlist quitarCancion(@PathVariable Integer idPlaylist, @PathVariable Integer idCancion) {
        Playlist playlist = playlistRepository.findById(idPlaylist).orElseThrow();
        Cancion cancion = cancionRepository.findById(idCancion).orElseThrow();

        playlist.getCanciones().remove(cancion);
        return playlistRepository.save(playlist);
    }

    @DeleteMapping("/{id}")
    public void borrarPlaylist(@PathVariable Integer id) {
        playlistRepository.deleteById(id);
    }

    @PatchMapping("/{id}")
    public Playlist actualizarPlaylist(@PathVariable Integer id, @RequestBody Playlist playlistActualizada) {
        Playlist playlist = playlistRepository.findById(id).orElseThrow();
        playlist.setTitulo(playlistActualizada.getTitulo());
        playlist.setDescripcion(playlistActualizada.getDescripcion());
        return playlistRepository.save(playlist);
    }

    @GetMapping("/{id}")
    public Playlist obtenerUna(@PathVariable Integer id) {
        return playlistRepository.findById(id).orElseThrow();
    }

    @PutMapping("/{id}/ordenar")
    public Playlist ordenarCanciones(@PathVariable Integer id, @RequestBody List<Integer> idsCanciones) {
        Playlist playlist = playlistRepository.findById(id).orElseThrow();
        List<Cancion> cancionesOrdenadas = new java.util.ArrayList<>();
        for(Integer idCancion : idsCanciones) {
            cancionesOrdenadas.add(cancionRepository.findById(idCancion).orElseThrow());
        }
        
        playlist.setCanciones(cancionesOrdenadas);
        
        return playlistRepository.save(playlist);
    }

    @GetMapping("/usuario/{idUsuario}/publicas")
    public ResponseEntity<?> obtenerPlaylistsPublicas(@PathVariable Integer idUsuario) {
        try {
            List<Playlist> todas = playlistRepository.findByIdUsuario(idUsuario);
            List<Playlist> publicas = todas.stream().filter(p -> p.getEsPublica() != null && p.getEsPublica()).toList();
            return ResponseEntity.ok(publicas);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cargar playlists públicas.");
        }
    }

    @PatchMapping("/{idPlaylist}/privacidad")
    public ResponseEntity<?> alternarPrivacidad(@PathVariable Integer idPlaylist) {
        try {
            Playlist p = playlistRepository.findById(idPlaylist).orElseThrow();
            p.setEsPublica(p.getEsPublica() == null ? false : !p.getEsPublica());
            playlistRepository.save(p);
            return ResponseEntity.ok(java.util.Map.of("exito", true, "esPublica", p.getEsPublica()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cambiar privacidad.");
        }
    }

    @PostMapping("/{idPlaylist}/clonar/usuario/{idUsuario}")
    public ResponseEntity<?> clonarPlaylist(@PathVariable Integer idPlaylist, @PathVariable Integer idUsuario) {
        try {
            Playlist original = playlistRepository.findById(idPlaylist).orElseThrow();
            
            List<Playlist> misPlaylists = playlistRepository.findByIdUsuario(idUsuario);
            boolean yaExiste = misPlaylists.stream()
                                           .anyMatch(p -> p.getTitulo().equals(original.getTitulo()));
            
            if (yaExiste) {
                return ResponseEntity.badRequest().body(java.util.Map.of("error", "Ya guardaste esta playlist en tu biblioteca."));
            }

            Playlist clon = new Playlist();
            clon.setTitulo(original.getTitulo()); 
            clon.setIdUsuario(idUsuario);         
            clon.setEsPublica(false);             
            
            if (original.getCanciones() != null && !original.getCanciones().isEmpty()) {
                clon.setCanciones(new java.util.ArrayList<>(original.getCanciones()));
            } else {
                clon.setCanciones(new java.util.ArrayList<>());
            }
            
            Playlist guardada = playlistRepository.save(clon);
            return ResponseEntity.ok(guardada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "No se pudo guardar la playlist en tu biblioteca."));
        }
    }

    @PostMapping("/{idPlaylist}/album/{idAlbum}")
    public ResponseEntity<?> agregarAlbumCompleto(@PathVariable Integer idPlaylist, @PathVariable Integer idAlbum) {
        try {
            Playlist playlist = playlistRepository.findById(idPlaylist).orElseThrow();

            List<Cancion> cancionesDelAlbum = cancionRepository.findByIdAlbum(idAlbum);

            List<Integer> idsActuales = playlist.getCanciones().stream()
                                                .map(Cancion::getIdCancion)
                                                .toList();
            
            int agregadas = 0;

            for (Cancion c : cancionesDelAlbum) {
                if (!idsActuales.contains(c.getIdCancion())) {
                    playlist.getCanciones().add(c);
                    agregadas++;
                }
            }
            
            playlistRepository.save(playlist);
            return ResponseEntity.ok(java.util.Map.of("exito", true, "agregadas", agregadas));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Error al agregar el álbum completo."));
        }
    }
    
}

