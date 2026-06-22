package com.pp2.vibeforge.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comentarios")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comentario")
    private Integer idComentario;

    @Column(name = "id_pensamiento")
    private Integer idPensamiento;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "id_padre")
    private Integer idPadre;

    @Column(name = "contenido", length = 500)
    private String contenido;

    @Column(name = "mood")
    private String mood = "CHILL";

    @Column(name = "fecha_publicacion")
    private LocalDateTime fechaPublicacion;

    @Column(name = "cantidad_waves")
    private Integer cantidadWaves = 0;

    @PrePersist
    public void preGuarda() {
        this.fechaPublicacion = LocalDateTime.now();
    }

    public Integer getIdComentario() { return idComentario; }
    public void setIdComentario(Integer idComentario) { this.idComentario = idComentario; }

    public Integer getIdPensamiento() { return idPensamiento; }
    public void setIdPensamiento(Integer idPensamiento) { this.idPensamiento = idPensamiento; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public Integer getIdPadre() { return idPadre; }
    public void setIdPadre(Integer idPadre) { this.idPadre = idPadre; }

    public String getContenido() { return contenido; }
    public void setContenido(String contenido) { this.contenido = contenido; }

    public String getMood() { return mood; }
    public void setMood(String mood) { this.mood = mood; }

    public LocalDateTime getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(LocalDateTime fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }

    public Integer getCantidadWaves() { return cantidadWaves; }
    public void setCantidadWaves(Integer cantidadWaves) { this.cantidadWaves = cantidadWaves; }
}