const numberOfParticles = 150; // Número de estrellas
const numberOfDustParticles = 300; // Número de partículas de polvo
const botonCopiar = document.querySelector(".copiar");

// Crear estrellas de tamaños de 3 a 4 px y colores variados.
for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1; 
    const color = `hsl(${Math.random() * 360}, 100%, ${Math.random() * 50 + 50}%)`; 

    particle.classList.add('particle');
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.backgroundColor = color;

    // Diferentes velocidades para simular profundidad
    const duration = Math.random() * 20 + 10;
    particle.style.setProperty('--duration', `${duration}s`);

    document.querySelector('.stars').appendChild(particle);
}

// Crear polvo cósmico
for (let i = 0; i < numberOfDustParticles; i++) {
    const dust = document.createElement('div');
    const size = Math.random() * 1.5 + 0.5;

    dust.classList.add('dust');
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    dust.style.top = `${Math.random() * 100}%`;
    dust.style.left = `${Math.random() * 100}%`;
    dust.style.opacity = Math.random() * 0.3 + 0.1; 

    document.querySelector('.dust').appendChild(dust);
}

// Crear estrellas fugaces y lugar de aparición de las estrellas fugases.
function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');

    const startY = Math.random() * window.innerHeight;
    const startX = -150; 
    star.style.top = `${startY}px`;
    star.style.left = `${startX}px`;

    // Variación en la velocidad en las estrellas
    const duration = Math.random() * 1.5 + 1.5;
    star.style.setProperty('--duration', `${duration}s`);

    // Variación de color y brillo
    const colorHue = Math.random() * 360;
    star.style.background = `radial-gradient(circle, hsl(${colorHue}, 100%, 90%) 0%, rgba(255, 255, 255, 0) 80%)`;
    star.style.boxShadow = `0 0 10px hsl(${colorHue}, 100%, 90%)`;

    document.body.appendChild(star);

    star.addEventListener('animationend', () => {
        const rect = star.getBoundingClientRect();
        const finalX = rect.right;
        const finalY = rect.bottom;

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.classList.add('shooting-star-particle');
            particle.style.backgroundColor = `hsl(${colorHue}, 100%, 90%)`;
            particle.style.top = `${finalY}px`;
            particle.style.left = `${finalX}px`;

            document.body.appendChild(particle);

            const scatterDuration = 500;
            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)`, opacity: 0 }
            ], {
                duration: scatterDuration,
                easing: 'ease-out'
            });

            setTimeout(() => {
                particle.remove();
            }, scatterDuration);
        }

        star.remove();
    });
}

setInterval(() => {
    if (Math.random() > 0.9) {
        createShootingStar();
    }
}, Math.random() * 10000 + 5000);

// Efecto Parallax
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.querySelector('.stars').style.transform = `translate(-${x * 30}px, -${y * 30}px)`;
    document.querySelector('.dust').style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

botonCopiar.style.display = "none";

// Funciones para el remplazo de las vocales. 
function reemplazarVocales(texto) {
    return texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
}

function desencriptarTexto(texto) {
    return texto
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
}

// Función para mostrar las alertas y el estilo que van a tener respecto a la ocación. 
function showModal(message, isSuccess = false) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalTitle = document.getElementById('modal-title');
    const successIcon = document.querySelector('.success-icon');
    const errorIcon = document.querySelector('.error-icon');

    if (isSuccess) {
        modalTitle.textContent = "Copiado";
        modalTitle.style.color = 'rgb(107, 255, 107)';
        successIcon.style.display = 'inline';
        errorIcon.style.display = 'none'; 
        modalMessage.textContent = message;
        modalMessage.style.color = 'white'; 
    } else {
        modalTitle.textContent = "Oops!";
        modalTitle.style.color = 'red';
        successIcon.style.display = 'none';
        errorIcon.style.display = 'inline'; 
        modalMessage.textContent = message;
        modalMessage.style.color = 'white';
    }

    modal.style.display = 'block';

    setTimeout(() => {
        modal.style.display = 'none';
    }, 10000);
}

// Función para cerrar las alertas
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Event listener para el botón de cerrar las alertas.
document.querySelector('.close').addEventListener('click', closeModal);

// Funciones para encriptar y desencriptar
function encriptar() {
    const textoIngresado = document.querySelector(".area_texto").value;
    const areaSalida = document.querySelector(".area_salida");
    const botonCopiar = document.querySelector(".copiar");

    if (textoIngresado.trim().length === 0) {
        showModal("No ha ingresado texto, por favor añada su mensaje");
        areaSalida.value = "";
        botonCopiar.style.display = "none";
        cambioTexto = document.querySelector(".texto_encriptado").textContent = "Ningun mensaje fue encontrado";
    } else {
        const textoReemplazado = reemplazarVocales(textoIngresado);
        areaSalida.value = textoReemplazado;
        botonCopiar.style.display = "block";
        document.querySelector(".texto_encriptado").textContent = "Texto encriptado correctamente";
    }
}

function desencriptar() {
    const textoIngresado = document.querySelector(".area_texto").value;
    const areaSalida = document.querySelector(".area_salida");
    const botonCopiar = document.querySelector(".copiar");

    if (textoIngresado.trim().length === 0) {
        showModal("No ha ingresado texto, por favor añada su mensaje");
        areaSalida.value = "";
        botonCopiar.style.display = "none"; 
    } else {
        const textoReemplazado = desencriptarTexto(textoIngresado);
        areaSalida.value = textoReemplazado;
        botonCopiar.style.display = "block"; 
        document.querySelector(".texto_encriptado").textContent = "Texto desencriptado correctamente";
    }
}

function copiarTexto() {
    const textareaSalida = document.querySelector('.area_salida');
    const texto = textareaSalida.value;
    if (texto) {
        navigator.clipboard.writeText(texto).then(() => {
            showModal("Texto copiado con éxito!", true);
        }).catch(err => {
            console.error('Error al copiar el texto:', err);
        });
    } else {
        showModal("No hay texto para copiar");
    }
}

// Convertir texto a minúsculas en el textarea
const textarea = document.querySelector('.area_texto');
textarea.addEventListener('input', () => {
    textarea.value = textarea.value.toLowerCase();
});
