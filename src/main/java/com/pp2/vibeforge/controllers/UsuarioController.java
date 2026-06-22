package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Usuario;
import com.pp2.vibeforge.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostConstruct
    public void parchearUsuariosViejos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario u : usuarios) {
            if (u.getHandle() == null || u.getHandle().isEmpty()) {
                u.setHandle(generarHandleUnico(u.getNombre(), u.getRol()));
                usuarioRepository.save(u);
            }
        }
    }

    private String generarHandleUnico(String nombreBase, String rol) {
        String nuevoHandle;
        
        if ("ADMIN".equalsIgnoreCase(rol)) {
            int contador = 0;
            do {
                String numFormateado = String.format("%02d", contador);
                nuevoHandle = "admin." + numFormateado + ".vibeforge";
                contador++;
            } while (usuarioRepository.existsByHandle(nuevoHandle));
            
        } else {
            String base = (nombreBase != null && !nombreBase.isEmpty()) 
                          ? nombreBase.toLowerCase().replaceAll("\\s+", "") 
                          : "usuario";
            Random random = new Random();
            do {
                nuevoHandle = base + "_" + (1000 + random.nextInt(9000)); 
            } while (usuarioRepository.existsByHandle(nuevoHandle));
        }
        
        return nuevoHandle;
    }

    @GetMapping
    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Usuario obtenerUsuario(@PathVariable Integer id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        usuario.setImagenUrl("https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc");
        usuario.setSuspendido(false); 
        
        if (usuario.getHandle() == null || usuario.getHandle().trim().isEmpty()) {
            usuario.setHandle(generarHandleUnico(usuario.getNombre(), usuario.getRol()));
        }
        
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public org.springframework.http.ResponseEntity<?> login(@RequestBody Usuario loginData) {
        Usuario usuario = usuarioRepository.findByCorreo(loginData.getCorreo()).orElse(null);
        
        if (usuario != null && usuario.getContraseña().equals(loginData.getContraseña())) {
            
            if (usuario.getSuspendido() != null && usuario.getSuspendido()) {
                return org.springframework.http.ResponseEntity.status(403)
                    .body(java.util.Map.of("exito", false, "mensaje", "Tu cuenta ha sido suspendida hasta nuevo aviso."));
            }

            java.util.Map<String, Object> respuesta = new java.util.HashMap<>();
            respuesta.put("exito", true);
            respuesta.put("idUsuario", usuario.getIdUsuario());
            respuesta.put("nombre", usuario.getNombre());
            respuesta.put("handle", usuario.getHandle()); 
            respuesta.put("rol", usuario.getRol());
            respuesta.put("onboardingCompletado", usuario.getOnboardingCompletado());
            respuesta.put("imagenUrl", usuario.getImagenUrl());
            respuesta.put("estadoAnimo", usuario.getEstadoAnimo()); 
            
            return org.springframework.http.ResponseEntity.ok(respuesta);
        }
        
        return org.springframework.http.ResponseEntity.badRequest()
            .body(java.util.Map.of("exito", false, "mensaje", "Credenciales incorrectas"));
    }

    @PatchMapping("/{id}/estado-suspension")
    public org.springframework.http.ResponseEntity<?> alternarSuspension(@PathVariable Integer id) {
        try {
            Usuario u = usuarioRepository.findById(id).orElseThrow();
            u.setSuspendido(u.getSuspendido() == null ? true : !u.getSuspendido());
            usuarioRepository.save(u);
            
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of("exito", true, "suspendido", u.getSuspendido()));
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest().body(java.util.Map.of("exito", false));
        }
    }

    @PatchMapping("/{id}/perfil")
    public org.springframework.http.ResponseEntity<?> actualizarPerfil(@PathVariable Integer id, @RequestBody java.util.Map<String, String> datos) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow();
        
        if (datos.containsKey("nombre") && datos.get("nombre") != null && !datos.get("nombre").trim().isEmpty()) {
            usuario.setNombre(datos.get("nombre")); 
        }

        if (datos.containsKey("handle") && datos.get("handle") != null) {
            String nuevoHandle = datos.get("handle").toLowerCase().replaceAll("\\s+", "");
            
            if (!nuevoHandle.equals(usuario.getHandle())) {
                
                if (usuarioRepository.existsByHandle(nuevoHandle)) {
                    return org.springframework.http.ResponseEntity.badRequest()
                        .body(java.util.Map.of("exito", false, "mensaje", "El arroba @" + nuevoHandle + " ya está en uso."));
                }
                
                if (usuario.getFechaModificacionHandle() != null) {
                    long diasPasados = ChronoUnit.DAYS.between(usuario.getFechaModificacionHandle(), LocalDateTime.now());
                    if (diasPasados < 30) {
                        long diasRestantes = 30 - diasPasados;
                        return org.springframework.http.ResponseEntity.badRequest()
                            .body(java.util.Map.of("exito", false, "mensaje", "Debes esperar " + diasRestantes + " días para volver a cambiar tu arroba."));
                    }
                }
                
                usuario.setHandle(nuevoHandle);
                usuario.setFechaModificacionHandle(LocalDateTime.now());
            }
        }

        if (datos.containsKey("imagenUrl") && datos.get("imagenUrl") != null) {
            String nuevaImagen = datos.get("imagenUrl");
            if (nuevaImagen.trim().isEmpty()) {
                usuario.setImagenUrl("https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=cccccc");
            } else {
                usuario.setImagenUrl(nuevaImagen);
            }
        }
        
        String passActual = datos.get("passwordActual");
        String passNueva = datos.get("passwordNueva");
        
        if (passActual != null && !passActual.isEmpty() && passNueva != null && !passNueva.trim().isEmpty()) {
            if (!usuario.getContraseña().equals(passActual)) { 
                return org.springframework.http.ResponseEntity.badRequest()
                    .body(java.util.Map.of("exito", false, "mensaje", "Contraseña actual incorrecta"));
            }
            usuario.setContraseña(passNueva); 
        }
        
        if (datos.containsKey("estadoAnimo") && datos.get("estadoAnimo") != null) {
            usuario.setEstadoAnimo(datos.get("estadoAnimo"));
        }
        
        if (datos.containsKey("onboardingCompletado") && datos.get("onboardingCompletado") != null) {
            usuario.setOnboardingCompletado(Boolean.parseBoolean(String.valueOf(datos.get("onboardingCompletado"))));
        }

        if (datos.containsKey("bio") && datos.get("bio") != null) usuario.setBio(datos.get("bio"));
        if (datos.containsKey("notiWaves")) usuario.setNotiWaves(Boolean.parseBoolean(String.valueOf(datos.get("notiWaves"))));
        if (datos.containsKey("notiComentarios")) usuario.setNotiComentarios(Boolean.parseBoolean(String.valueOf(datos.get("notiComentarios"))));
        if (datos.containsKey("notiPases")) usuario.setNotiPases(Boolean.parseBoolean(String.valueOf(datos.get("notiPases"))));
        if (datos.containsKey("notiMenciones")) usuario.setNotiMenciones(Boolean.parseBoolean(String.valueOf(datos.get("notiMenciones"))));
        if (datos.containsKey("notiSeguidores")) usuario.setNotiSeguidores(Boolean.parseBoolean(String.valueOf(datos.get("notiSeguidores"))));

        if (datos.containsKey("privPerfil") && datos.get("privPerfil") != null) usuario.setPrivPerfil(datos.get("privPerfil"));
        if (datos.containsKey("privBusqueda")) usuario.setPrivBusqueda(Boolean.parseBoolean(String.valueOf(datos.get("privBusqueda"))));
        if (datos.containsKey("privComentarios") && datos.get("privComentarios") != null) usuario.setPrivComentarios(datos.get("privComentarios"));

        usuarioRepository.save(usuario);
        return org.springframework.http.ResponseEntity.ok(usuario);
    }

    @PostMapping("/{id}/eliminar")
    public org.springframework.http.ResponseEntity<?> eliminarCuentaFisica(@PathVariable Integer id, @RequestBody java.util.Map<String, String> datos) {
        try {
            Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            String passwordConfirmacion = datos.get("password");
            
            if (passwordConfirmacion == null || !usuario.getContraseña().equals(passwordConfirmacion)) {
                return org.springframework.http.ResponseEntity.badRequest().body(java.util.Map.of("exito", false, "mensaje", "Contraseña incorrecta"));
            }
            
            usuarioRepository.delete(usuario);
            
            return org.springframework.http.ResponseEntity.ok(java.util.Map.of("exito", true));
            
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.badRequest().body(java.util.Map.of("exito", false, "mensaje", "No se pudo eliminar la cuenta. Verifica dependencias en base de datos."));
        }
    }
}