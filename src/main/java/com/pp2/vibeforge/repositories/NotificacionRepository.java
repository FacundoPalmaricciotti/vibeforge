package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {
    
    List<Notificacion> findByIdUsuarioOrderByFechaDesc(Integer idUsuario);
    
    Integer countByIdUsuarioAndLeidaFalse(Integer idUsuario);

    @Query("SELECT n FROM Notificacion n WHERE n.idUsuario = :idUsuario AND n.idEmisor = :idEmisor AND n.tipoAccion = :tipoAccion AND n.idReferencia = :idReferencia")
    List<Notificacion> buscarDuplicado(@Param("idUsuario") Integer idUsuario, @Param("idEmisor") Integer idEmisor, @Param("tipoAccion") String tipoAccion, @Param("idReferencia") Integer idReferencia);

    @Modifying
    @Transactional
    @Query("DELETE FROM Notificacion n WHERE n.idUsuario = :idUsuario AND n.idEmisor = :idEmisor AND n.tipoAccion = :tipoAccion AND n.idReferencia = :idReferencia")
    void borrarNotificacionExacta(@Param("idUsuario") Integer idUsuario, @Param("idEmisor") Integer idEmisor, @Param("tipoAccion") String tipoAccion, @Param("idReferencia") Integer idReferencia);

    @org.springframework.transaction.annotation.Transactional
    void deleteAllByIdUsuario(Integer idUsuario);
    
    @org.springframework.transaction.annotation.Transactional
    void deleteAllByIdEmisor(Integer idEmisor);

}