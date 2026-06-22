package com.pp2.vibeforge.repositories;

import com.pp2.vibeforge.models.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    
    List<Comentario> findByIdPensamientoOrderByFechaPublicacionAsc(Integer idPensamiento);
}