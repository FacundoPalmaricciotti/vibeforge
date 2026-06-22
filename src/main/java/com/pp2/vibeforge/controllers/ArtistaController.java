package com.pp2.vibeforge.controllers;

import com.pp2.vibeforge.models.Artista;
import com.pp2.vibeforge.repositories.ArtistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/artistas")
@CrossOrigin(origins = "*")
public class ArtistaController {

    @Autowired
    private ArtistaRepository artistaRepository;


    @GetMapping
    public List<Artista> obtenerTodos() {
        return artistaRepository.findAll();
    }


    @GetMapping("/{id}")
    public Optional<Artista> obtenerPorId(@PathVariable Integer id) {
        return artistaRepository.findById(id);
    }


    @GetMapping("/populares")
    public List<Artista> obtenerTopPopulares() {
        List<Artista> ordenados = artistaRepository.findAllByOrderByPopularidadDesc();
        if (ordenados.size() > 50) {
            return ordenados.subList(0, 50);
        }
        return ordenados;
    }


    @GetMapping("/{id}/imagen")
    public org.springframework.http.ResponseEntity<String> obtenerImagenDeezer(@PathVariable Integer id) {
        Artista artista = artistaRepository.findById(id).orElseThrow();

        try {
            String nombre = artista.getNombreArtistico();
            String urlDeezer = "https://api.deezer.com/search/artist?q=" + java.net.URLEncoder.encode(nombre, "UTF-8");
            java.net.URL url = java.net.URI.create(urlDeezer).toURL();
            java.net.HttpURLConnection conn = (java.net.HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("User-Agent", "Mozilla/5.0");

            java.io.BufferedReader reader = new java.io.BufferedReader(
                    new java.io.InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String linea;
            while ((linea = reader.readLine()) != null)
                sb.append(linea);
            reader.close();
            String json = sb.toString();
            String buscar = "\"picture_xl\":\"";
            int inicio = json.indexOf(buscar);
            if (inicio != -1) {
                inicio += buscar.length();
                int fin = json.indexOf("\"", inicio);
                String imageUrl = json.substring(inicio, fin).replace("\\/", "/");
                artista.setImagenUrl(imageUrl);
                artistaRepository.save(artista);

                return org.springframework.http.ResponseEntity.ok(imageUrl);
            }

        } catch (Exception e) {
            System.out.println("Error buscando en Deezer: " + e.getMessage());
        }
        String silueta = "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021";
        artista.setImagenUrl(silueta);
        artistaRepository.save(artista);

        return org.springframework.http.ResponseEntity.ok(silueta);
    }

    @GetMapping("/buscar-deezer")
    public org.springframework.http.ResponseEntity<?> buscarEnDeezer(@RequestParam String query) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.deezer.com/search/artist?q=" + java.net.URLEncoder.encode(query, "UTF-8");
            return org.springframework.http.ResponseEntity.ok(restTemplate.getForObject(url, Object.class));
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.internalServerError().body("Error en la búsqueda externa: " + e.getMessage());
        }
    }

    @PostMapping
    public Artista crearArtista(@RequestBody Artista artista) {
        return artistaRepository.save(artista);
    }

    @PostMapping("/importar")
    public org.springframework.http.ResponseEntity<?> importarArtistaCompleto(@RequestParam String nombreArtista) {
        System.out.println("--- INICIANDO IMPORTACIÓN DE: " + nombreArtista + " ---");
        
        List<Artista> existentes = artistaRepository.findAll();
        boolean yaExiste = existentes.stream().anyMatch(a -> a.getNombreArtistico().equalsIgnoreCase(nombreArtista));
        if (yaExiste) {
            System.out.println("Cancelado: El artista ya existe en la BD.");
            return org.springframework.http.ResponseEntity.badRequest().body("El artista ya existe en Vibeforge.");
        }

        RestTemplate restTemplate = new RestTemplate();
        
        try {
            System.out.println("Paso 1: Buscando en Deezer...");
            String urlBusquedaArtista = "https://api.deezer.com/search/artist?q=" + java.net.URLEncoder.encode(nombreArtista, "UTF-8");
            
            @SuppressWarnings("unchecked")
            Map<String, Object> respuestaDeezer = restTemplate.getForObject(urlBusquedaArtista, Map.class);
            
            if (respuestaDeezer == null || !respuestaDeezer.containsKey("data")) {
                throw new RuntimeException("Respuesta vacía de Deezer al buscar el artista.");
            }

            @SuppressWarnings("unchecked")
            List<Map<String, Object>> dataArtista = (List<Map<String, Object>>) respuestaDeezer.get("data");
            if (dataArtista.isEmpty()) {
                throw new RuntimeException("Deezer no encontró ningún artista con ese nombre.");
            }

            Map<String, Object> datosPrimerArtista = dataArtista.get(0);
            String idDeezerArtista = datosPrimerArtista.get("id").toString();
            System.out.println("Paso 2: Artista localizado en Deezer con ID externo: " + idDeezerArtista);
            
            Artista nuevoArtista = new Artista();
            
            String nombreExtraido = datosPrimerArtista.get("name").toString();
            nuevoArtista.setNombreArtistico(nombreExtraido);
            nuevoArtista.setNombre(nombreExtraido);
            nuevoArtista.setContraseña("importado123"); 
            nuevoArtista.setCorreo(nombreExtraido.replaceAll("\\s+","").toLowerCase() + "@deezer.import");

            if (datosPrimerArtista.containsKey("picture_xl") && datosPrimerArtista.get("picture_xl") != null) {
                nuevoArtista.setImagenUrl(datosPrimerArtista.get("picture_xl").toString());
            } else {
                nuevoArtista.setImagenUrl("https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021");
            }
            
            nuevoArtista.setGeneroMusical("Pop/Rock"); 
            
            if (datosPrimerArtista.get("nb_fan") != null) {
                int fans = Integer.parseInt(datosPrimerArtista.get("nb_fan").toString());
                int puntaje = 0;
                
                if (fans > 0) {
                    puntaje = (int) Math.min(100, (Math.log10(fans) / 7.0) * 100);
                }
                nuevoArtista.setPopularidad(Math.max(1, puntaje));
            } else {
                nuevoArtista.setPopularidad(0);
            }
            
            System.out.println("Paso 3: Intentando guardar artista en la BD local...");
            nuevoArtista = artistaRepository.save(nuevoArtista); 
            System.out.println("Artista guardado con éxito. ID Local asignado: " + nuevoArtista.getIdArtista());
            System.out.println("Paso 4: Buscando álbumes en Deezer...");
            String urlAlbumes = "https://api.deezer.com/artist/" + idDeezerArtista + "/albums?limit=3";
            
            @SuppressWarnings("unchecked")
            Map<String, Object> respuestaAlbumes = restTemplate.getForObject(urlAlbumes, Map.class);

            if (respuestaAlbumes != null && respuestaAlbumes.containsKey("data")) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> dataAlbumes = (List<Map<String, Object>>) respuestaAlbumes.get("data");
                
                for (Map<String, Object> albumDeezer : dataAlbumes) {
                    if (albumDeezer.get("record_type") != null && albumDeezer.get("record_type").toString().equals("single")) {
                        continue;
                    }

                    System.out.println("Paso 5: Guardando álbum -> " + albumDeezer.get("title").toString());
                    com.pp2.vibeforge.models.Album nuevoAlbum = new com.pp2.vibeforge.models.Album();
                    nuevoAlbum.setTitulo(albumDeezer.get("title").toString());
                    if (albumDeezer.containsKey("cover_xl") && albumDeezer.get("cover_xl") != null) {
                        nuevoAlbum.setImagenUrl(albumDeezer.get("cover_xl").toString());
                    } else {
                        nuevoAlbum.setImagenUrl("https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021");
                    }
                    
                    nuevoAlbum.setIdArtista(nuevoArtista.getIdArtista());
                    
                    nuevoAlbum = albumRepository.save(nuevoAlbum);
                    String idDeezerAlbum = albumDeezer.get("id").toString();
                    String urlCanciones = "https://api.deezer.com/album/" + idDeezerAlbum + "/tracks";
                    
                    @SuppressWarnings("unchecked")
                    Map<String, Object> respuestaCanciones = restTemplate.getForObject(urlCanciones, Map.class);

                    if (respuestaCanciones != null && respuestaCanciones.containsKey("data")) {
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> dataCanciones = (List<Map<String, Object>>) respuestaCanciones.get("data");
                        
                        System.out.println("Paso 6: Guardando " + dataCanciones.size() + " canciones para el álbum...");
                        for (Map<String, Object> trackDeezer : dataCanciones) {
                            com.pp2.vibeforge.models.Cancion nuevaCancion = new com.pp2.vibeforge.models.Cancion();
                            nuevaCancion.setTitulo(trackDeezer.get("title").toString());
                            nuevaCancion.setDuracion(Integer.parseInt(trackDeezer.get("duration").toString())); 
                            nuevaCancion.setIdAlbum(nuevoAlbum.getIdAlbum()); 
                            nuevaCancion.setIdArtista(nuevoArtista.getIdArtista());
                            nuevaCancion.setDescripcion("Importado API");
                            
                            cancionRepository.save(nuevaCancion);
                        }
                    }
                }
            }

            System.out.println("--- IMPORTACIÓN 100% COMPLETADA ---");
            return org.springframework.http.ResponseEntity.ok("Artista importado con éxito.");

        } catch (Exception e) {
            System.out.println("!!! EXPLOSIÓN EN JAVA !!! Error capturado:");
            e.printStackTrace();
            return org.springframework.http.ResponseEntity.internalServerError().body("Error crítico: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public org.springframework.http.ResponseEntity<?> actualizarArtista(@PathVariable Integer id, @RequestBody Artista detallesArtista) {
        Artista artista = artistaRepository.findById(id).orElse(null);
        if (artista == null) return org.springframework.http.ResponseEntity.notFound().build();
        
        artista.setNombre(detallesArtista.getNombre());
        artista.setNombreArtistico(detallesArtista.getNombreArtistico());
        artista.setGeneroMusical(detallesArtista.getGeneroMusical());
        artista.setImagenUrl(detallesArtista.getImagenUrl());
        
        artistaRepository.save(artista);
        return org.springframework.http.ResponseEntity.ok(artista);
    }
    @PatchMapping("/{id}/toggle-activo")
    public org.springframework.http.ResponseEntity<?> toggleActivo(@PathVariable Integer id) {
        Artista artista = artistaRepository.findById(id).orElse(null);
        if (artista == null) return org.springframework.http.ResponseEntity.notFound().build();
        
        artista.setActivo(!artista.getActivo());
        artistaRepository.save(artista);
        return org.springframework.http.ResponseEntity.ok(artista.getActivo());
    }
    @DeleteMapping("/{id}")
    public org.springframework.http.ResponseEntity<?> borrarArtista(@PathVariable Integer id) {
        Artista artista = artistaRepository.findById(id).orElse(null);
        if (artista == null) return org.springframework.http.ResponseEntity.notFound().build();

        try {
            List<com.pp2.vibeforge.models.Album> albumes = albumRepository.findByIdArtista(id);
            for (com.pp2.vibeforge.models.Album album : albumes) {
                List<com.pp2.vibeforge.models.Cancion> canciones = cancionRepository.findByIdAlbum(album.getIdAlbum());
                cancionRepository.deleteAll(canciones);
            }
            albumRepository.deleteAll(albumes);
            artistaRepository.delete(artista);
            
            return org.springframework.http.ResponseEntity.ok("Artista y toda su discografía eliminados permanentemente.");
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.internalServerError().body("Error al eliminar en cascada: " + e.getMessage());
        }
    }
    @PostMapping("/{id}/cargar-mas-albumes")
    public org.springframework.http.ResponseEntity<?> cargarMasAlbumes(@PathVariable Integer id) {
        Artista artista = artistaRepository.findById(id).orElse(null);
        if (artista == null) return org.springframework.http.ResponseEntity.notFound().build();

        RestTemplate restTemplate = new RestTemplate();
        try {
            String urlBusqueda = "https://api.deezer.com/search/artist?q=" + java.net.URLEncoder.encode(artista.getNombreArtistico(), "UTF-8");
            @SuppressWarnings("unchecked")
            Map<String, Object> resp = restTemplate.getForObject(urlBusqueda, Map.class);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> data = (List<Map<String, Object>>) resp.get("data");
            if (data.isEmpty()) return org.springframework.http.ResponseEntity.badRequest().body("No mapeado en Deezer.");
            
            String idDeezer = data.get(0).get("id").toString();
            String urlAllAlbums = "https://api.deezer.com/artist/" + idDeezer + "/albums?limit=15";
            @SuppressWarnings("unchecked")
            Map<String, Object> respAlbums = restTemplate.getForObject(urlAllAlbums, Map.class);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> albumesDeezer = (List<Map<String, Object>>) respAlbums.get("data");

            List<com.pp2.vibeforge.models.Album> albumesExistentes = albumRepository.findByIdArtista(id);
            int nuevosImportados = 0;

            for (Map<String, Object> alb : albumesDeezer) {
                String tituloAlbum = alb.get("title").toString();
                boolean existe = albumesExistentes.stream().anyMatch(a -> a.getTitulo().equalsIgnoreCase(tituloAlbum));
                if (existe || (alb.get("record_type") != null && alb.get("record_type").toString().equals("single"))) {
                    continue; 
                }

                com.pp2.vibeforge.models.Album nuevoAlbum = new com.pp2.vibeforge.models.Album();
                nuevoAlbum.setTitulo(tituloAlbum);
                nuevoAlbum.setImagenUrl(alb.get("cover_xl") != null ? alb.get("cover_xl").toString() : "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021");
                nuevoAlbum.setIdArtista(id);
                nuevoAlbum = albumRepository.save(nuevoAlbum);
                nuevosImportados++;

                String urlTracks = "https://api.deezer.com/album/" + alb.get("id").toString() + "/tracks";
                @SuppressWarnings("unchecked")
                Map<String, Object> respTracks = restTemplate.getForObject(urlTracks, Map.class);
                if (respTracks != null && respTracks.containsKey("data")) {
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> tracks = (List<Map<String, Object>>) respTracks.get("data");
                    for (Map<String, Object> track : tracks) {
                        com.pp2.vibeforge.models.Cancion nuevaC = new com.pp2.vibeforge.models.Cancion();
                        nuevaC.setTitulo(track.get("title").toString());
                        nuevaC.setDuracion(Integer.parseInt(track.get("duration").toString()));
                        nuevaC.setIdAlbum(nuevoAlbum.getIdAlbum());
                        nuevaC.setIdArtista(id);
                        nuevaC.setDescripcion("Importado API Avanzada");
                        cancionRepository.save(nuevaC);
                    }
                }
            }

            return org.springframework.http.ResponseEntity.ok("Sincronización finalizada. Álbumes nuevos inyectados: " + nuevosImportados);
        } catch (Exception e) {
            return org.springframework.http.ResponseEntity.internalServerError().body("Fallo: " + e.getMessage());
        }
    }
    
    @Autowired
    private com.pp2.vibeforge.repositories.AlbumRepository albumRepository;

    @Autowired 
    private com.pp2.vibeforge.repositories.CancionRepository cancionRepository;

}