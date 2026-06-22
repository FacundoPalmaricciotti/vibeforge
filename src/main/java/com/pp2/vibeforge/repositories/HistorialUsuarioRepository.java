package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.HistorialUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface HistorialUsuarioRepository extends JpaRepository<HistorialUsuario, Integer> {
    
    List<HistorialUsuario> findByIdUsuarioOrderByFechaVistaDesc(Integer idUsuario);

    Optional<HistorialUsuario> findByIdUsuarioAndTipoItemAndIdReferencia(Integer idUsuario, String tipoItem, Integer idReferencia);

    @org.springframework.transaction.annotation.Transactional
    void deleteByTipoItemAndIdReferencia(String tipoItem, Integer idReferencia);

    @org.springframework.transaction.annotation.Transactional
    void deleteAllByIdUsuario(Integer idUsuario);
}