package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.FavoritoAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface FavoritoAlbumRepository extends JpaRepository<FavoritoAlbum, Integer> {
    
    boolean existsByIdUsuarioAndIdAlbum(Integer idUsuario, Integer idAlbum);
    
    @Transactional
    void deleteByIdUsuarioAndIdAlbum(Integer idUsuario, Integer idAlbum);

    @Query("SELECT f.idAlbum FROM FavoritoAlbum f WHERE f.idUsuario = :idUsuario")
    List<Integer> findIdsAlbumesByIdUsuario(@Param("idUsuario") Integer idUsuario);

    @Transactional
    void deleteByIdAlbum(Integer idAlbum);
}