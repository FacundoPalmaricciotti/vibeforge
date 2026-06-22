package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.HistorialUsuario;
import com.pp2.vibeforge.repositories.HistorialUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/historial")
@CrossOrigin(origins = "*")
public class HistorialController {

    @Autowired
    private HistorialUsuarioRepository historialRepository;

    @PostMapping
    public ResponseEntity<?> registrarVisita(@RequestBody HistorialUsuario nuevoRegistro) {
        try {

            Optional<HistorialUsuario> existente = historialRepository
                    .findByIdUsuarioAndTipoItemAndIdReferencia(
                            nuevoRegistro.getIdUsuario(),
                            nuevoRegistro.getTipoItem(),
                            nuevoRegistro.getIdReferencia());

            if (existente.isPresent()) {

                HistorialUsuario h = existente.get();
                h.setFechaVista(LocalDateTime.now());
                h.setTitulo(nuevoRegistro.getTitulo());
                h.setImagenUrl(nuevoRegistro.getImagenUrl());
                historialRepository.save(h);
                return ResponseEntity.ok(h);
            } else {
                nuevoRegistro.setFechaVista(LocalDateTime.now());
                historialRepository.save(nuevoRegistro);
                return ResponseEntity.ok(nuevoRegistro);
            }
} catch (Exception e) {
    e.printStackTrace();
    return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
}
    }
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<?> obtenerHistorialTop8(@PathVariable Integer idUsuario) {
        try {
            List<HistorialUsuario> historialCompleto = historialRepository
                    .findByIdUsuarioOrderByFechaVistaDesc(idUsuario);
            List<HistorialUsuario> top8 = historialCompleto.stream().limit(8).collect(Collectors.toList());

            return ResponseEntity.ok(top8);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al obtener el historial.");
        }
    }

    
}