package com.pp2.vibeforge.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "seguidores")
public class Seguidor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_seguimiento")
    private Integer idSeguimiento;

    @Column(name = "id_seguidor")
    private Integer idSeguidor;

    @Column(name = "id_seguido")
    private Integer idSeguido;

    @Column(name = "fecha_seguimiento", insertable = false, updatable = false)
    private LocalDateTime fechaSeguimiento;

    public Integer getIdSeguimiento() { return idSeguimiento; }
    public void setIdSeguimiento(Integer idSeguimiento) { this.idSeguimiento = idSeguimiento; }

    public Integer getIdSeguidor() { return idSeguidor; }
    public void setIdSeguidor(Integer idSeguidor) { this.idSeguidor = idSeguidor; }

    public Integer getIdSeguido() { return idSeguido; }
    public void setIdSeguido(Integer idSeguido) { this.idSeguido = idSeguido; }

    public LocalDateTime getFechaSeguimiento() { return fechaSeguimiento; }
    public void setFechaSeguimiento(LocalDateTime fechaSeguimiento) { this.fechaSeguimiento = fechaSeguimiento; }
}