package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.Cancion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CancionRepository extends JpaRepository<Cancion, Integer> {
    List<Cancion> findByIdAlbum(Integer idAlbum);
    @org.springframework.data.jpa.repository.Modifying
    @org.springframework.transaction.annotation.Transactional
    @org.springframework.data.jpa.repository.Query(value = "DELETE FROM playlist_cancion WHERE idcancion = :idCancion", nativeQuery = true)
    void eliminarDeTodasLasPlaylists(@org.springframework.data.repository.query.Param("idCancion") Integer idCancion);
}