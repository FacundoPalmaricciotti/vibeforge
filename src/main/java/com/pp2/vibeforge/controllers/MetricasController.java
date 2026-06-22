package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.repositories.ArtistaRepository;
import com.pp2.vibeforge.repositories.AlbumRepository;
import com.pp2.vibeforge.repositories.CancionRepository;
import com.pp2.vibeforge.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/metricas")
@CrossOrigin(origins = "*")
public class MetricasController {

    @Autowired
    private ArtistaRepository artistaRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private CancionRepository cancionRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @GetMapping("/global")
    public org.springframework.http.ResponseEntity<?> obtenerMetricasGlobales() {
        System.out.println("--- RECOPILANDO ESTADÍSTICAS GLOBALES DEL SISTEMA ---");
        try {
            Map<String, Object> metricas = new HashMap<>();

            long totalArtistas = artistaRepository.count();
            long totalAlbumes = albumRepository.count();
            long totalCanciones = cancionRepository.count();
            long totalUsuarios = usuarioRepository.count();

            metricas.put("totalArtistas", totalArtistas);
            metricas.put("totalAlbumes", totalAlbumes);
            metricas.put("totalCanciones", totalCanciones);
            metricas.put("totalUsuarios", totalUsuarios);

            long artistasActivos = artistaRepository.findAll().stream()
                    .filter(a -> a.getActivo() != null && a.getActivo())
                    .count();
            long artistasOcultos = totalArtistas - artistasActivos;

            metricas.put("artistasActivos", artistasActivos);
            metricas.put("artistasOcultos", artistasOcultos);

            long popularidadAlta = artistaRepository.findAll().stream().filter(a -> a.getPopularidad() != null && a.getPopularidad() >= 80).count();
            long popularidadMedia = artistaRepository.findAll().stream().filter(a -> a.getPopularidad() != null && a.getPopularidad() >= 40 && a.getPopularidad() < 80).count();
            long popularidadBaja = artistaRepository.findAll().stream().filter(a -> a.getPopularidad() != null && a.getPopularidad() < 40).count();

            metricas.put("popAlta", popularidadAlta);
            metricas.put("popMedia", popularidadMedia);
            metricas.put("popBaja", popularidadBaja);

            return org.springframework.http.ResponseEntity.ok(metricas);

        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.internalServerError()
                    .body("Error crítico al compilar el tablero analítico: " + e.getMessage());
        }
    }
}