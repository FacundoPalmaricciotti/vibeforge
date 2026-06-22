package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.ComentarioLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface ComentarioLikeRepository extends JpaRepository<ComentarioLike, Integer> {
    boolean existsByIdComentarioAndIdUsuario(Integer idComentario, Integer idUsuario);
    
    @Transactional
    void deleteByIdComentarioAndIdUsuario(Integer idComentario, Integer idUsuario);

    @Query("SELECT c.idComentario FROM ComentarioLike c WHERE c.idUsuario = :idUsuario")
    List<Integer> findIdsComentariosByIdUsuario(@Param("idUsuario") Integer idUsuario);
}