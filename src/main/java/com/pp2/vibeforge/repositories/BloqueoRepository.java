package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.Bloqueo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface BloqueoRepository extends JpaRepository<Bloqueo, Integer> {
    
    boolean existsByIdUsuarioBloqueadorAndIdUsuarioBloqueado(Integer idBloqueador, Integer idBloqueado);
    
    @Transactional
    void deleteByIdUsuarioBloqueadorAndIdUsuarioBloqueado(Integer idBloqueador, Integer idBloqueado);
}