package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Notificacion;
import com.pp2.vibeforge.repositories.NotificacionRepository;
import com.pp2.vibeforge.config.NotificationWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notificaciones")
@CrossOrigin(origins = "*")
public class NotificacionController {

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private NotificationWebSocketHandler webSocketHandler;

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Notificacion>> obtenerNotificaciones(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(notificacionRepository.findByIdUsuarioOrderByFechaDesc(idUsuario));
    }

    @GetMapping("/usuario/{idUsuario}/noleidas")
    public ResponseEntity<Integer> contarNoLeidas(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(notificacionRepository.countByIdUsuarioAndLeidaFalse(idUsuario));
    }

    @PatchMapping("/usuario/{idUsuario}/leer-todas")
    public ResponseEntity<?> marcarTodasLeidas(@PathVariable Integer idUsuario) {
        List<Notificacion> notis = notificacionRepository.findByIdUsuarioOrderByFechaDesc(idUsuario);
        for (Notificacion n : notis) {
            if (!n.getLeida()) {
                n.setLeida(true);
                notificacionRepository.save(n);
            }
        }
        return ResponseEntity.ok(Map.of("exito", true));
    }
    
    @PostMapping
    public ResponseEntity<?> crearNotificacion(@RequestBody Notificacion notificacion) {
        if (notificacion.getIdUsuario().equals(notificacion.getIdEmisor())) {
            return ResponseEntity.ok(Map.of("ignorado", "auto-interaccion")); 
        }
        
        List<Notificacion> existentes = notificacionRepository.buscarDuplicado(
            notificacion.getIdUsuario(), notificacion.getIdEmisor(), notificacion.getTipoAccion(), notificacion.getIdReferencia()
        );
        
        if (!existentes.isEmpty()) {
            Notificacion existente = existentes.get(0);
            existente.setLeida(false);
            Notificacion guardada = notificacionRepository.save(existente);
            
            webSocketHandler.enviarNotificacionPush(guardada.getIdUsuario());
            return ResponseEntity.ok(guardada);
        }
        
        Notificacion nueva = notificacionRepository.save(notificacion);
        webSocketHandler.enviarNotificacionPush(nueva.getIdUsuario());
        
        return ResponseEntity.ok(nueva);
    }

    @DeleteMapping("/deshacer")
    public ResponseEntity<?> deshacerNotificacion(
            @RequestParam Integer idUsuario,
            @RequestParam Integer idEmisor,
            @RequestParam String tipoAccion,
            @RequestParam Integer idReferencia) {
        try {
            notificacionRepository.borrarNotificacionExacta(idUsuario, idEmisor, tipoAccion, idReferencia);
            return ResponseEntity.ok(Map.of("exito", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{idNotificacion}")
    public ResponseEntity<?> eliminarNotificacionPorId(@PathVariable Integer idNotificacion) {
        try {
            notificacionRepository.deleteById(idNotificacion);
            return ResponseEntity.ok(Map.of("exito", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/usuario/{idUsuario}/todas")
    public ResponseEntity<?> borrarTodasLasNotificaciones(@PathVariable Integer idUsuario) {
        try {
            List<Notificacion> notis = notificacionRepository.findByIdUsuarioOrderByFechaDesc(idUsuario);
            notificacionRepository.deleteAll(notis);
            return ResponseEntity.ok(java.util.Map.of("exito", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al borrar el historial de notificaciones");
        }
    }
}