package com.pp2.vibeforge.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pensamientos")
public class Pensamiento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pensamiento")
    private Integer idPensamiento;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "contenido", length = 500)
    private String contenido;

    @Column(name = "fecha_publicacion")
    private LocalDateTime fechaPublicacion;

    @Column(name = "cantidad_likes")
    private Integer cantidadLikes = 0;

    @Column(name = "cantidad_comentarios")
    private Integer cantidadComentarios = 0;

    @PrePersist
    public void preGuarda() {
        fechaPublicacion = LocalDateTime.now();
    }

    public Integer getIdPensamiento() { return idPensamiento; }
    public void setIdPensamiento(Integer idPensamiento) { this.idPensamiento = idPensamiento; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public LocalDateTime getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(LocalDateTime fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }

    public Integer getCantidadLikes() { return cantidadLikes; }
    public void setCantidadLikes(Integer cantidadLikes) { this.cantidadLikes = cantidadLikes; }

    public Integer getCantidadComentarios() { return cantidadComentarios; }
    public void setCantidadComentarios(Integer cantidadComentarios) { this.cantidadComentarios = cantidadComentarios; }
}