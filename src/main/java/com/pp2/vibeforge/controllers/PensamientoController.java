package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Pensamiento;
import com.pp2.vibeforge.repositories.PensamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pensamientos")
@CrossOrigin(origins = "*")
public class PensamientoController {

    @Autowired
    private PensamientoRepository pensamientoRepository;

    @PostMapping
    public ResponseEntity<?> publicar(@RequestBody Pensamiento nuevoPensamiento) {
        try {
            Pensamiento guardado = pensamientoRepository.save(nuevoPensamiento);
            return ResponseEntity.ok(guardado);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al publicar el pensamiento.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Integer id) {
        try {
            Pensamiento p = pensamientoRepository.findById(id).orElseThrow();
            return ResponseEntity.ok(p);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<Pensamiento>> obtenerFeedGlobal(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Pensamiento> pensamientosPaginados = pensamientoRepository.findAllByOrderByFechaPublicacionDesc(pageable);
        return ResponseEntity.ok(pensamientosPaginados);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<Page<Pensamiento>> obtenerMuroUsuario(
            @PathVariable Integer idUsuario,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Pensamiento> pensamientosPaginados = pensamientoRepository.findByIdUsuarioOrderByFechaPublicacionDesc(idUsuario, pageable);
        return ResponseEntity.ok(pensamientosPaginados);
    }

    @Autowired
    private com.pp2.vibeforge.repositories.LikePensamientoRepository likeRepository;

    @GetMapping("/likes/usuario/{idUsuario}")
    public ResponseEntity<List<Integer>> obtenerLikesDelUsuario(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(likeRepository.findIdsByIdUsuario(idUsuario));
    }

    @PostMapping("/{idPensamiento}/like/usuario/{idUsuario}")
    public ResponseEntity<?> darLikeSeguro(@PathVariable Integer idPensamiento, @PathVariable Integer idUsuario) {
        try {
            Pensamiento p = pensamientoRepository.findById(idPensamiento).orElseThrow();
            
            if (!likeRepository.existsByIdUsuarioAndIdPensamiento(idUsuario, idPensamiento)) {
                com.pp2.vibeforge.models.LikePensamiento nuevoLike = new com.pp2.vibeforge.models.LikePensamiento();
                nuevoLike.setIdUsuario(idUsuario);
                nuevoLike.setIdPensamiento(idPensamiento);
                likeRepository.save(nuevoLike);
                
                p.setCantidadLikes(p.getCantidadLikes() + 1);
                pensamientoRepository.save(p);
            }
            return ResponseEntity.ok(p);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Error al dar like"));
        }
    }

    @DeleteMapping("/{idPensamiento}/like/usuario/{idUsuario}")
    public ResponseEntity<?> quitarLikeSeguro(@PathVariable Integer idPensamiento, @PathVariable Integer idUsuario) {
        try {
            Pensamiento p = pensamientoRepository.findById(idPensamiento).orElseThrow();
            
            if (likeRepository.existsByIdUsuarioAndIdPensamiento(idUsuario, idPensamiento)) {
                likeRepository.deleteByIdUsuarioAndIdPensamiento(idUsuario, idPensamiento);
                
                if(p.getCantidadLikes() > 0) {
                    p.setCantidadLikes(p.getCantidadLikes() - 1);
                    pensamientoRepository.save(p);
                }
            }
            return ResponseEntity.ok(p);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", "Error al quitar like"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarPensamiento(@PathVariable Integer id, @RequestBody Pensamiento datosEditados) {
        try {
            Pensamiento p = pensamientoRepository.findById(id).orElseThrow();
            p.setContenido(datosEditados.getContenido());
            pensamientoRepository.save(p);
            return ResponseEntity.ok(p);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al editar.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPensamiento(@PathVariable Integer id) {
        try {
            pensamientoRepository.deleteById(id);
            return ResponseEntity.ok(java.util.Map.of("exito", true, "mensaje", "Eliminado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("exito", false, "error", "Error al eliminar."));
        }
    }
}