package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.LikePensamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikePensamientoRepository extends JpaRepository<LikePensamiento, Integer> {
    
    boolean existsByIdUsuarioAndIdPensamiento(Integer idUsuario, Integer idPensamiento);
    
    @Transactional
    void deleteByIdUsuarioAndIdPensamiento(Integer idUsuario, Integer idPensamiento);
    
    @Query("SELECT l.idPensamiento FROM LikePensamiento l WHERE l.idUsuario = :idUsuario")
    List<Integer> findIdsByIdUsuario(@Param("idUsuario") Integer idUsuario);

    @Transactional
    void deleteAllByIdUsuario(Integer idUsuario);
}