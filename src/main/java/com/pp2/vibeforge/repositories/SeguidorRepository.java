package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.Seguidor;
import com.pp2.vibeforge.models.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface SeguidorRepository extends JpaRepository<Seguidor, Integer> {
    
    Integer countByIdSeguido(Integer idSeguido); 
    Integer countByIdSeguidor(Integer idSeguidor); 
    
    boolean existsByIdSeguidorAndIdSeguido(Integer idSeguidor, Integer idSeguido);
    
    @Transactional
    void deleteByIdSeguidorAndIdSeguido(Integer idSeguidor, Integer idSeguido);

    @Query("SELECT u FROM Usuario u JOIN Seguidor s ON u.idUsuario = s.idSeguidor WHERE s.idSeguido = :idUsuario")
    List<Usuario> findSeguidoresByUsuario(@Param("idUsuario") Integer idUsuario);

    @Query("SELECT u FROM Usuario u JOIN Seguidor s ON u.idUsuario = s.idSeguido WHERE s.idSeguidor = :idUsuario")
    List<Usuario> findSiguiendoByUsuario(@Param("idUsuario") Integer idUsuario);

    void deleteAllByIdSeguidor(Integer idSeguidor);
    void deleteAllByIdSeguido(Integer idSeguido);
}