package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Bloqueo;
import com.pp2.vibeforge.models.Seguidor;
import com.pp2.vibeforge.repositories.BloqueoRepository;
import com.pp2.vibeforge.repositories.SeguidorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/social")
@CrossOrigin(origins = "*")
public class SocialController {

    @Autowired
    private SeguidorRepository seguidorRepository;

    @Autowired
    private BloqueoRepository bloqueoRepository;

    @PostMapping("/seguir")
    public ResponseEntity<?> seguirUsuario(@RequestBody Seguidor nuevoSeguidor) {
        if(nuevoSeguidor.getIdSeguidor().equals(nuevoSeguidor.getIdSeguido())) {
            return ResponseEntity.badRequest().body("No puedes seguirte a ti mismo.");
        }
        if(!seguidorRepository.existsByIdSeguidorAndIdSeguido(nuevoSeguidor.getIdSeguidor(), nuevoSeguidor.getIdSeguido())) {
            seguidorRepository.save(nuevoSeguidor);
        }
        return ResponseEntity.ok(Map.of("exito", true));
    }

    @DeleteMapping("/dejardeseguir/{idSeguidor}/{idSeguido}")
    public ResponseEntity<?> dejarDeSeguir(@PathVariable Integer idSeguidor, @PathVariable Integer idSeguido) {
        seguidorRepository.deleteByIdSeguidorAndIdSeguido(idSeguidor, idSeguido);
        return ResponseEntity.ok(Map.of("exito", true));
    }

    @PostMapping("/bloquear")
    public ResponseEntity<?> bloquearUsuario(@RequestBody Bloqueo nuevoBloqueo) {
        if(nuevoBloqueo.getIdUsuarioBloqueador().equals(nuevoBloqueo.getIdUsuarioBloqueado())) {
            return ResponseEntity.badRequest().body("No puedes bloquearte a ti mismo.");
        }
        if(!bloqueoRepository.existsByIdUsuarioBloqueadorAndIdUsuarioBloqueado(nuevoBloqueo.getIdUsuarioBloqueador(), nuevoBloqueo.getIdUsuarioBloqueado())) {
            bloqueoRepository.save(nuevoBloqueo);
            seguidorRepository.deleteByIdSeguidorAndIdSeguido(nuevoBloqueo.getIdUsuarioBloqueador(), nuevoBloqueo.getIdUsuarioBloqueado());
            seguidorRepository.deleteByIdSeguidorAndIdSeguido(nuevoBloqueo.getIdUsuarioBloqueado(), nuevoBloqueo.getIdUsuarioBloqueador());
        }
        return ResponseEntity.ok(Map.of("exito", true));
    }

    @DeleteMapping("/desbloquear/{idBloqueador}/{idBloqueado}")
    public ResponseEntity<?> desbloquearUsuario(@PathVariable Integer idBloqueador, @PathVariable Integer idBloqueado) {
        bloqueoRepository.deleteByIdUsuarioBloqueadorAndIdUsuarioBloqueado(idBloqueador, idBloqueado);
        return ResponseEntity.ok(Map.of("exito", true));
    }


    @GetMapping("/estadisticas/{idPerfilVisitado}/visitante/{idVisitante}")
    public ResponseEntity<?> obtenerEstadisticas(@PathVariable Integer idPerfilVisitado, @PathVariable Integer idVisitante) {
        
        Integer cantidadSeguidores = seguidorRepository.countByIdSeguido(idPerfilVisitado);
        Integer cantidadSiguiendo = seguidorRepository.countByIdSeguidor(idPerfilVisitado);
        boolean loSigue = seguidorRepository.existsByIdSeguidorAndIdSeguido(idVisitante, idPerfilVisitado);
        boolean estaBloqueado = bloqueoRepository.existsByIdUsuarioBloqueadorAndIdUsuarioBloqueado(idVisitante, idPerfilVisitado);

        Map<String, Object> stats = new HashMap<>();
        stats.put("seguidores", cantidadSeguidores);
        stats.put("siguiendo", cantidadSiguiendo);
        stats.put("loSigue", loSigue);
        stats.put("estaBloqueado", estaBloqueado);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/seguidores/{idUsuario}")
    public ResponseEntity<List<com.pp2.vibeforge.models.Usuario>> obtenerListaSeguidores(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(seguidorRepository.findSeguidoresByUsuario(idUsuario));
    }

    @GetMapping("/siguiendo/{idUsuario}")
    public ResponseEntity<List<com.pp2.vibeforge.models.Usuario>> obtenerListaSiguiendo(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(seguidorRepository.findSiguiendoByUsuario(idUsuario));
    }
}