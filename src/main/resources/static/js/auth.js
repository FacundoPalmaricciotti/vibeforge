const auth = {

    idActual: localStorage.getItem('vibe_id') || null,
    rolActual: localStorage.getItem('vibe_rol') || null,
    nombre: localStorage.getItem('nombre'),

    estaAutenticado() {
        return this.idActual !== null;
    },

    async login(correo, contrasena) {
        try {
            const respuesta = await api.post('/usuarios/login', { correo, contraseña: contrasena });
            
            if (respuesta && respuesta.exito) {
                const idExtraccion = respuesta.idUsuario;
                const nombreReal = respuesta.nombre;
                const rolAsignado = respuesta.rol; 

                localStorage.setItem('vibe_id', idExtraccion);
                localStorage.setItem('vibe_rol', rolAsignado);
                localStorage.setItem('nombre', nombreReal);
                localStorage.setItem('user_avatar', respuesta.imagenUrl);
                localStorage.setItem('ob_done', respuesta.onboardingCompletado ? 'true' : 'false');

                this.idActual = idExtraccion;
                this.rolActual = rolAsignado;
                this.nombre = nombreReal;

                return { exito: true, rol: rolAsignado };
            } else {
                return { exito: false, mensaje: respuesta.mensaje || "Credenciales incorrectas" };
            }
        } catch (error) {
            try {
                const backendError = JSON.parse(error.message);
                if (backendError && backendError.mensaje) {
                    return { exito: false, mensaje: backendError.mensaje };
                }
            } catch(e) {}
            
            return { exito: false, mensaje: "Error de comunicación con el servidor." };
        }
    },

    async registro(nombre, correo, contrasena, confirmarContrasena) {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            return { exito: false, mensaje: "El formato del correo no es válido." };
        }

        if (contrasena !== confirmarContrasena) {
            return { exito: false, mensaje: "Las contraseñas no coinciden. Intentá de nuevo." };
        }

        if (contrasena.length < 6) {
            return { exito: false, mensaje: "La contraseña es demasiado corta. Debe tener al menos 6 caracteres." };
        }

        if (!/[A-Z]/.test(contrasena)) {
            return { exito: false, mensaje: "La contraseña debe incluir al menos una letra mayúscula." };
        }

        if (!/[0-9]/.test(contrasena)) {
            return { exito: false, mensaje: "La contraseña debe incluir al menos un número." };
        }

        try {
            const respuesta = await api.post('/usuarios/registro', { nombre, correo, contraseña: contrasena });
            
            if (respuesta && respuesta.idUsuario) {
                return { exito: true };
            }

            if (respuesta && respuesta.mensaje) {
                if (respuesta.mensaje.includes("ya está registrado")) {
                    return { exito: false, mensaje: "Ese correo ya existe. Por favor, iniciá sesión." };
                }
                return { exito: false, mensaje: respuesta.mensaje };
            }
            return { exito: false, mensaje: "Error al crear la cuenta" };

        } catch (error) {
            try {
                const backendError = JSON.parse(error.message);
                if (backendError.mensaje) {
                    if (backendError.mensaje.includes("ya está registrado")) {
                        return { exito: false, mensaje: "Ese correo ya existe. Por favor, iniciá sesión." };
                    }
                    return { exito: false, mensaje: backendError.mensaje };
                }
            } catch(e) {}
            return { exito: false, mensaje: "Error de conexión con el servidor." };
        }
    },

    logout: function() {
        localStorage.clear();

        this.idActual = null;
        this.rolActual = null;
        this.nombre = null;
        this.usuario = null;

        window.location.href = '/index.html';
    }
};