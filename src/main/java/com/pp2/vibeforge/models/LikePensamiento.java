package com.pp2.vibeforge.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "likes_pensamientos")
public class LikePensamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_like")
    private Integer idLike;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "id_pensamiento")
    private Integer idPensamiento;

    @Column(name = "fecha_like", insertable = false, updatable = false)
    private LocalDateTime fechaLike;

    public Integer getIdLike() { return idLike; }
    public void setIdLike(Integer idLike) { this.idLike = idLike; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public Integer getIdPensamiento() { return idPensamiento; }
    public void setIdPensamiento(Integer idPensamiento) { this.idPensamiento = idPensamiento; }

    public LocalDateTime getFechaLike() { return fechaLike; }
    public void setFechaLike(LocalDateTime fechaLike) { this.fechaLike = fechaLike; }
}