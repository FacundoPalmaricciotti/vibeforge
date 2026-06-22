const SVG_LOGO_LOGIN = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 10px;"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`;
const SVG_EYE_OPEN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const SVG_EYE_CLOSED = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

function renderLogin() {
    if (auth.estaAutenticado()) {
        navigate(auth.rolActual === 'ADMIN' ? '/admin/home' : '/user/home');
        return;
    }

    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div style="display: flex; height: 100vh; justify-content: center; align-items: center; background: var(--bg-base);">
            <div style="background: var(--bg-surface); padding: 40px; border-radius: 12px; width: 100%; max-width: 400px; box-shadow: 0 15px 50px rgba(0,0,0,0.8); border: 1px solid #282828;">
                
                <h1 style="color: white; text-align: center; margin-bottom: 30px; font-size: 2rem; display: flex; justify-content: center; align-items: center;">
                    ${SVG_LOGO_LOGIN} Vibeforge
                </h1>
                
                <div id="auth-container" style="transition: 0.3s; opacity: 1;">
                    ${htmlFormularioLogin()}
                </div>

            </div>
        </div>
    `;
}

window.togglePasswordVisibility = function(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = SVG_EYE_OPEN;
        btn.style.color = 'var(--primary)';
    } else {
        input.type = 'password';
        btn.innerHTML = SVG_EYE_CLOSED;
        btn.style.color = 'var(--text-muted)';
    }
};

function htmlFormularioLogin() {
    return `
        <div class="animate-fade-in">
            <h2 style="margin-bottom: 20px; color: white;">Iniciar Sesión</h2>
            <div id="login-error" style="color: #e91e63; margin-bottom: 15px; font-size: 13px; font-weight: bold; background: rgba(233,30,99,0.1); padding: 10px; border-radius: 4px; border: 1px solid rgba(233,30,99,0.3); display: none;"></div>
            
            <input type="email" id="log-correo" placeholder="Correo electrónico" 
                   style="width: 100%; padding: 14px; margin-bottom: 15px; background: #181818; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box; outline: none; transition: 0.2s;" 
                   onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'"
                   onkeydown="manejarEnter(event, 'log-pass', null)">
                   
            <div style="position: relative; margin-bottom: 25px;">
                <input type="password" id="log-pass" placeholder="Contraseña" 
                       style="width: 100%; padding: 14px; padding-right: 45px; background: #181818; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box; outline: none; transition: 0.2s;" 
                       onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'"
                       onkeydown="manejarEnter(event, null, 'login')">
                <button type="button" tabindex="-1" onclick="togglePasswordVisibility('log-pass', this)" style="position: absolute; right: 12px; top: 12px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='white'" onmouseout="if(document.getElementById('log-pass').type === 'password') this.style.color='var(--text-muted)'">
                    ${SVG_EYE_CLOSED}
                </button>
            </div>
            
            <button onclick="ejecutarLogin()" 
                    style="width: 100%; padding: 14px; background: var(--primary); color: #000; border: none; font-weight: bold; border-radius: 500px; cursor: pointer; margin-bottom: 20px; font-size: 15px; transition: 0.2s;"
                    onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                Entrar
            </button>
            
            <p style="text-align: center; color: var(--text-muted); font-size: 14px; margin: 0;">
                ¿No tienes cuenta? <span style="color: var(--primary); font-weight: bold; cursor: pointer;" onclick="cambiarARegistro()">Regístrate</span>
            </p>
        </div>
    `;
}

function htmlFormularioRegistro() {
    return `
        <div class="animate-fade-in">
            <h2 style="margin-bottom: 20px; color: white;">Crear Cuenta</h2>
            <div id="reg-error" style="color: #e91e63; margin-bottom: 15px; font-size: 13px; font-weight: bold; background: rgba(233,30,99,0.1); padding: 10px; border-radius: 4px; border: 1px solid rgba(233,30,99,0.3); display: none;"></div>
            
            <input type="text" id="reg-nombre" placeholder="Nombre completo" 
                   style="width: 100%; padding: 14px; margin-bottom: 15px; background: #181818; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box; outline: none; transition: 0.2s;"
                   onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'"
                   onkeydown="manejarEnter(event, 'reg-correo', null)">
                   
            <input type="email" id="reg-correo" placeholder="Correo electrónico" 
                   style="width: 100%; padding: 14px; margin-bottom: 15px; background: #181818; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box; outline: none; transition: 0.2s;"
                   onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'"
                   onkeydown="manejarEnter(event, 'reg-pass', null)">
                   
            <div style="position: relative; margin-bottom: 15px;">
                <input type="password" id="reg-pass" placeholder="Contraseña (1 Mayús y 1 Nro)" 
                       style="width: 100%; padding: 14px; padding-right: 45px; background: #181818; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box; outline: none; transition: 0.2s;"
                       onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'"
                       onkeydown="manejarEnter(event, 'reg-pass-confirm', null)">
                <button type="button" tabindex="-1" onclick="togglePasswordVisibility('reg-pass', this)" style="position: absolute; right: 12px; top: 12px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='white'" onmouseout="if(document.getElementById('reg-pass').type === 'password') this.style.color='var(--text-muted)'">
                    ${SVG_EYE_CLOSED}
                </button>
            </div>

            <div style="position: relative; margin-bottom: 25px;">
                <input type="password" id="reg-pass-confirm" placeholder="Confirmar Contraseña" 
                       style="width: 100%; padding: 14px; padding-right: 45px; background: #181818; border: 1px solid #333; color: white; border-radius: 6px; box-sizing: border-box; outline: none; transition: 0.2s;"
                       onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='#333'"
                       onkeydown="manejarEnter(event, null, 'registro')">
                <button type="button" tabindex="-1" onclick="togglePasswordVisibility('reg-pass-confirm', this)" style="position: absolute; right: 12px; top: 12px; background: transparent; border: none; color: var(--text-muted); cursor: pointer; transition: 0.2s;" onmouseover="this.style.color='white'" onmouseout="if(document.getElementById('reg-pass-confirm').type === 'password') this.style.color='var(--text-muted)'">
                    ${SVG_EYE_CLOSED}
                </button>
            </div>
            
            <button onclick="ejecutarRegistro()" 
                    style="width: 100%; padding: 14px; background: var(--secondary); color: white; border: none; font-weight: bold; border-radius: 500px; cursor: pointer; margin-bottom: 20px; font-size: 15px; transition: 0.2s;"
                    onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                Registrarse
            </button>
            
            <p style="text-align: center; color: var(--text-muted); font-size: 14px; margin: 0;">
                ¿Ya tienes cuenta? <span style="color: var(--primary); font-weight: bold; cursor: pointer;" onclick="cambiarALogin()">Inicia Sesión</span>
            </p>
        </div>
    `;
}

window.manejarEnter = function(event, nextElementId, action) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (action === 'login') {
            ejecutarLogin();
        } else if (action === 'registro') {
            ejecutarRegistro();
        } else if (nextElementId) {
            document.getElementById(nextElementId).focus();
        }
    }
};

function cambiarARegistro() {
    const cont = document.getElementById('auth-container');
    cont.style.opacity = 0;
    setTimeout(() => {
        cont.innerHTML = htmlFormularioRegistro();
        cont.style.opacity = 1;
        document.getElementById('reg-nombre').focus();
    }, 150);
}

function cambiarALogin() {
    const cont = document.getElementById('auth-container');
    cont.style.opacity = 0;
    setTimeout(() => {
        cont.innerHTML = htmlFormularioLogin();
        cont.style.opacity = 1;
        document.getElementById('log-correo').focus();
    }, 150);
}

const regexCorreo = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const regexPass = /^(?=.*[A-Z])(?=.*\d).+$/;

async function ejecutarLogin() {
    const correo = document.getElementById('log-correo').value.trim();
    const pass = document.getElementById('log-pass').value.trim();
    const errorDiv = document.getElementById('login-error');
    
    if(!correo || !pass) {
        errorDiv.innerText = "Por favor completa todos los campos.";
        errorDiv.style.display = "block";
        return;
    }

    if (!regexCorreo.test(correo)) {
        errorDiv.innerText = "Ingresá un correo electrónico válido.";
        errorDiv.style.display = "block";
        return;
    }

    errorDiv.style.display = "none";

    const resultado = await auth.login(correo, pass);
    
    if (resultado.exito) {
        navigate(resultado.rol === 'ADMIN' ? '/admin/home' : '/user/home');
    } else {
        errorDiv.innerText = resultado.mensaje;
        errorDiv.style.display = "block";
    }
}

async function ejecutarRegistro() {
    const nombre = document.getElementById('reg-nombre').value.trim();
    const correo = document.getElementById('reg-correo').value.trim();
    const pass = document.getElementById('reg-pass').value.trim();
    const passConfirm = document.getElementById('reg-pass-confirm').value.trim();
    const errorDiv = document.getElementById('reg-error');

    if(!nombre || !correo || !pass || !passConfirm) {
        errorDiv.innerText = "Por favor completa todos los campos.";
        errorDiv.style.display = "block";
        return;
    }

    if (!regexCorreo.test(correo)) {
        errorDiv.innerText = "Ingresá un correo con formato válido (ej: usuario@dominio.com).";
        errorDiv.style.display = "block";
        return;
    }

    if (!regexPass.test(pass) || pass.length < 6) {
        errorDiv.innerText = "La contraseña debe tener mínimo 6 caracteres, al menos 1 mayúscula y 1 número.";
        errorDiv.style.display = "block";
        return;
    }

    if (pass !== passConfirm) {
        errorDiv.innerText = "Las contraseñas no coinciden. Verificalas.";
        errorDiv.style.display = "block";
        return;
    }

    errorDiv.style.display = "none";

    const resultado = await auth.registro(nombre, correo, pass, passConfirm);

    if (resultado.exito) {
        if (typeof ui !== 'undefined' && typeof ui.alerta === 'function') {
            ui.alerta("¡Bienvenido a la Forja!", "Cuenta creada con éxito. Ya podés iniciar sesión.", "success");
        } else {
            alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        }
        cambiarALogin();
    } else {
        errorDiv.innerText = resultado.mensaje;
        errorDiv.style.display = "block";
    }
}