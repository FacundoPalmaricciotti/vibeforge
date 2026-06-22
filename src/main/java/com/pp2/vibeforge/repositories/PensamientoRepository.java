package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.Pensamiento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PensamientoRepository extends JpaRepository<Pensamiento, Integer> {

        
    Page<Pensamiento> findAllByOrderByFechaPublicacionDesc(Pageable pageable);
    Page<Pensamiento> findByIdUsuarioOrderByFechaPublicacionDesc(Integer idUsuario, Pageable pageable);
    @org.springframework.transaction.annotation.Transactional
    void deleteAllByIdUsuario(Integer idUsuario);
}