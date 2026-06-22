package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Comentario;
import com.pp2.vibeforge.models.ComentarioLike;
import com.pp2.vibeforge.repositories.ComentarioRepository;
import com.pp2.vibeforge.repositories.PensamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "*")
public class ComentarioController {

    @Autowired
    private com.pp2.vibeforge.repositories.ComentarioLikeRepository comentarioLikeRepository;

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Autowired
    private PensamientoRepository pensamientoRepository;

@PostMapping
    public ResponseEntity<?> publicarComentario(@RequestBody Comentario nuevoComentario) {
        try {
            Comentario guardado = comentarioRepository.save(nuevoComentario);
            
            com.pp2.vibeforge.models.Pensamiento p = pensamientoRepository.findById(nuevoComentario.getIdPensamiento()).orElseThrow();
            p.setCantidadComentarios((p.getCantidadComentarios() == null ? 0 : p.getCantidadComentarios()) + 1);
            pensamientoRepository.save(p);
            
            return ResponseEntity.ok(guardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("exito", false, "error", "Error al publicar el comentario."));
        }
    }

    @GetMapping("/pensamiento/{idPensamiento}")
    public List<Comentario> obtenerComentariosDePensamiento(@PathVariable Integer idPensamiento) {
        return comentarioRepository.findByIdPensamientoOrderByFechaPublicacionAsc(idPensamiento);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> editarComentario(@PathVariable Integer id, @RequestBody Comentario datosEditados) {
        try {
            Comentario c = comentarioRepository.findById(id).orElseThrow();
            c.setContenido(datosEditados.getContenido());
            
            if(datosEditados.getMood() != null) {
                c.setMood(datosEditados.getMood());
            }
            
            comentarioRepository.save(c);
            return ResponseEntity.ok(c);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("exito", false, "error", "Error al editar."));
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarComentario(@PathVariable Integer id) {
        try {
            Comentario c = comentarioRepository.findById(id).orElseThrow();
            Integer idPensamiento = c.getIdPensamiento();
            
            comentarioRepository.deleteById(id);
            
            com.pp2.vibeforge.models.Pensamiento p = pensamientoRepository.findById(idPensamiento).orElseThrow();
            p.setCantidadComentarios(Math.max(0, (p.getCantidadComentarios() == null ? 0 : p.getCantidadComentarios()) - 1));
            pensamientoRepository.save(p);
            
            return ResponseEntity.ok(java.util.Map.of("exito", true, "mensaje", "Comentario eliminado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("exito", false, "error", "Error al eliminar."));
        }
    }

    @GetMapping("/waves/usuario/{idUsuario}")
    public ResponseEntity<List<Integer>> obtenerWavesUsuario(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(comentarioLikeRepository.findIdsComentariosByIdUsuario(idUsuario));
    }

    @PostMapping("/{idComentario}/wave/usuario/{idUsuario}")
    public ResponseEntity<?> darWave(@PathVariable Integer idComentario, @PathVariable Integer idUsuario) {
        if (!comentarioLikeRepository.existsByIdComentarioAndIdUsuario(idComentario, idUsuario)) {
            ComentarioLike like = new ComentarioLike();
            like.setIdComentario(idComentario);
            like.setIdUsuario(idUsuario);
            comentarioLikeRepository.save(like);

            Comentario comentario = comentarioRepository.findById(idComentario).orElseThrow();
            comentario.setCantidadWaves((comentario.getCantidadWaves() == null ? 0 : comentario.getCantidadWaves()) + 1);
            comentarioRepository.save(comentario);
        }
        return ResponseEntity.ok(java.util.Map.of("exito", true));
    }

    @DeleteMapping("/{idComentario}/wave/usuario/{idUsuario}")
    public ResponseEntity<?> quitarWave(@PathVariable Integer idComentario, @PathVariable Integer idUsuario) {
        if (comentarioLikeRepository.existsByIdComentarioAndIdUsuario(idComentario, idUsuario)) {
            comentarioLikeRepository.deleteByIdComentarioAndIdUsuario(idComentario, idUsuario);

            Comentario comentario = comentarioRepository.findById(idComentario).orElseThrow();
            comentario.setCantidadWaves(Math.max(0, (comentario.getCantidadWaves() == null ? 0 : comentario.getCantidadWaves()) - 1));
            comentarioRepository.save(comentario);
        }
        return ResponseEntity.ok(java.util.Map.of("exito", true));
    }

            @GetMapping("/{id}")
        public ResponseEntity<Comentario> obtenerComentario(@PathVariable Integer id) {
            return comentarioRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
}
}