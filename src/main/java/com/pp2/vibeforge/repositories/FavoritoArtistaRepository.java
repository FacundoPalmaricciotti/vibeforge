package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.FavoritoArtista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface FavoritoArtistaRepository extends JpaRepository<FavoritoArtista, Integer> {
    
    boolean existsByIdUsuarioAndIdArtista(Integer idUsuario, Integer idArtista);
    
    @Transactional
    void deleteByIdUsuarioAndIdArtista(Integer idUsuario, Integer idArtista);

    @Query("SELECT f.idArtista FROM FavoritoArtista f WHERE f.idUsuario = :idUsuario")
    List<Integer> findIdsArtistasByIdUsuario(@Param("idUsuario") Integer idUsuario);

    @Transactional
    void deleteAllByIdUsuario(Integer idUsuario);
}