package com.pp2.vibeforge.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bloqueos")
public class Bloqueo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bloqueo")
    private Integer idBloqueo;

    @Column(name = "id_usuario_bloqueador")
    private Integer idUsuarioBloqueador;

    @Column(name = "id_usuario_bloqueado")
    private Integer idUsuarioBloqueado;

    @Column(name = "fecha_bloqueo", insertable = false, updatable = false)
    private LocalDateTime fechaBloqueo;

    public Integer getIdBloqueo() { return idBloqueo; }
    public void setIdBloqueo(Integer idBloqueo) { this.idBloqueo = idBloqueo; }

    public Integer getIdUsuarioBloqueador() { return idUsuarioBloqueador; }
    public void setIdUsuarioBloqueador(Integer idUsuarioBloqueador) { this.idUsuarioBloqueador = idUsuarioBloqueador; }

    public Integer getIdUsuarioBloqueado() { return idUsuarioBloqueado; }
    public void setIdUsuarioBloqueado(Integer idUsuarioBloqueado) { this.idUsuarioBloqueado = idUsuarioBloqueado; }

    public LocalDateTime getFechaBloqueo() { return fechaBloqueo; }
    public void setFechaBloqueo(LocalDateTime fechaBloqueo) { this.fechaBloqueo = fechaBloqueo; }
}