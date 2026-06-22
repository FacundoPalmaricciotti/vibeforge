package com.pp2.vibeforge.models;

import jakarta.persistence.*;

@Entity
@Table(name = "comentario_likes")
public class ComentarioLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_like")
    private Integer idLike;

    @Column(name = "id_comentario")
    private Integer idComentario;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    public Integer getIdLike() { return idLike; }
    public void setIdLike(Integer idLike) { this.idLike = idLike; }

    public Integer getIdComentario() { return idComentario; }
    public void setIdComentario(Integer idComentario) { this.idComentario = idComentario; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }
}