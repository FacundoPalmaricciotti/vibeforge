package com.pp2.vibeforge.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUsuario")
    private Integer idUsuario;

    @Column(name = "nombre") private String nombre;
    @Column(name = "apellido") private String apellido;
    @Column(name = "correo") private String correo;
    @Column(name = "contraseña") private String contraseña;
    @Column(name = "tipoSuscripcion") private String tipoSuscripcion;
    @Column(name = "rol") private String rol = "USER";
    @Column(name = "imagen_url") private String imagenUrl;
    @Column(name = "estado_animo") private String estadoAnimo;
    @Column(name = "suspendido") private Boolean suspendido = false;
    @Column(name = "handle", unique = true, length = 30) private String handle;
    @Column(name = "fecha_modificacion_handle") private LocalDateTime fechaModificacionHandle;
    @Column(name = "onboarding_completado") private Boolean onboardingCompletado = false;
    @Column(name = "bio") private String bio;
    @Column(name = "noti_waves") private Boolean notiWaves = true;
    @Column(name = "noti_comentarios") private Boolean notiComentarios = true;
    @Column(name = "noti_pases") private Boolean notiPases = true;
    @Column(name = "noti_menciones") private Boolean notiMenciones = true;
    @Column(name = "noti_seguidores") private Boolean notiSeguidores = true;
    @Column(name = "priv_perfil") private String privPerfil = "TODOS";
    @Column(name = "priv_busqueda") private Boolean privBusqueda = true;
    @Column(name = "priv_comentarios") private String privComentarios = "TODOS";

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContraseña() { return contraseña; }
    public void setContraseña(String contraseña) { this.contraseña = contraseña; }

    public String getTipoSuscripcion() { return tipoSuscripcion; }
    public void setTipoSuscripcion(String tipoSuscripcion) { this.tipoSuscripcion = tipoSuscripcion; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public String getEstadoAnimo() { return estadoAnimo; }
    public void setEstadoAnimo(String estadoAnimo) { this.estadoAnimo = estadoAnimo; }

    public Boolean getSuspendido() { return suspendido; }
    public void setSuspendido(Boolean suspendido) { this.suspendido = suspendido; }

    public String getHandle() { return handle; }
    public void setHandle(String handle) { this.handle = handle; }

    public LocalDateTime getFechaModificacionHandle() { return fechaModificacionHandle; }
    public void setFechaModificacionHandle(LocalDateTime fechaModificacionHandle) { this.fechaModificacionHandle = fechaModificacionHandle; }

    public Boolean getOnboardingCompletado() { return onboardingCompletado; }
    public void setOnboardingCompletado(Boolean onboardingCompletado) { this.onboardingCompletado = onboardingCompletado; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public Boolean getNotiWaves() { return notiWaves; }
    public void setNotiWaves(Boolean notiWaves) { this.notiWaves = notiWaves; }

    public Boolean getNotiComentarios() { return notiComentarios; }
    public void setNotiComentarios(Boolean notiComentarios) { this.notiComentarios = notiComentarios; }

    public Boolean getNotiPases() { return notiPases; }
    public void setNotiPases(Boolean notiPases) { this.notiPases = notiPases; }

    public Boolean getNotiMenciones() { return notiMenciones; }
    public void setNotiMenciones(Boolean notiMenciones) { this.notiMenciones = notiMenciones; }

    public Boolean getNotiSeguidores() { return notiSeguidores; }
    public void setNotiSeguidores(Boolean notiSeguidores) { this.notiSeguidores = notiSeguidores; }

    public String getPrivPerfil() { return privPerfil; }
    public void setPrivPerfil(String privPerfil) { this.privPerfil = privPerfil; }

    public Boolean getPrivBusqueda() { return privBusqueda; }
    public void setPrivBusqueda(Boolean privBusqueda) { this.privBusqueda = privBusqueda; }

    public String getPrivComentarios() { return privComentarios; }
    public void setPrivComentarios(String privComentarios) { this.privComentarios = privComentarios; }

}