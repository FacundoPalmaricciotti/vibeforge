package com.pp2.vibeforge.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_usuario")
public class HistorialUsuario {
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Integer idHistorial;

    @Column(name = "id_usuario")
    private Integer idUsuario;

    @Column(name = "tipo_item")
    private String tipoItem;

    @Column(name = "id_referencia")
    private Integer idReferencia;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "fecha_vista")
    private LocalDateTime fechaVista;

    @PrePersist
    @PreUpdate
    public void preGuarda() {
        fechaVista = LocalDateTime.now();
    }

    public Integer getIdHistorial() { return idHistorial; }
    public void setIdHistorial(Integer idHistorial) { this.idHistorial = idHistorial; }

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getTipoItem() { return tipoItem; }
    public void setTipoItem(String tipoItem) { this.tipoItem = tipoItem; }

    public Integer getIdReferencia() { return idReferencia; }
    public void setIdReferencia(Integer idReferencia) { this.idReferencia = idReferencia; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getImagenUrl() { return imagenUrl; }
    public void setImagenUrl(String imagenUrl) { this.imagenUrl = imagenUrl; }

    public LocalDateTime getFechaVista() { return fechaVista; }
    public void setFechaVista(LocalDateTime fechaVista) { this.fechaVista = fechaVista; }
}