

document.getElementById("boton-amor").addEventListener("click", () => {
  const corazon = document.createElement("div");
  corazon.innerText = "💖";
  corazon.classList.add("corazon-flotante");
  document.body.appendChild(corazon);

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;

  corazon.style.left = `${x}px`;
  corazon.style.top = `${y}px`;

  setTimeout(() => {
    corazon.remove();
  }, 2000);
});

const btn = document.getElementById('boton-entrada');

btn.addEventListener('click', function() {
    const musica = document.getElementById('miMusica');
    const izq = document.getElementById('izquierda');
    const der = document.getElementById('derecha');

    // Reactivar el scroll de la página al entrar
    document.body.style.overflow = 'auto'; // <--- AGREGAR ESTA LÍNEA

    // Reproducir música
    musica.play().catch(e => console.log("Error de audio:", e));

    // Animaciones
    izq.classList.add('abrir-izq');
    der.classList.add('abrir-der');
    btn.classList.add('ocultar');

    // Limpiar el código después de que termine la animación
    setTimeout(() => {
        document.getElementById('cortina-contenedor').remove();
    }, 1500);
});

// --- LÓGICA DEL CARRUSEL ---

let indiceActual = 0;
// Seleccionamos todas las imágenes de la galería
const imagenesGaleria = document.querySelectorAll('.galeria img');
const modal = document.getElementById('modal-galeria');
const imgModal = document.getElementById('img-modal');
const textoModal = document.getElementById('texto-modal');

// Función para abrir el modal
window.abrirModal = function(n) {
    modal.style.display = "flex"; // Mostrar el modal
    indiceActual = n;
    mostrarSlide(indiceActual);
}

// Función para cerrar el modal
window.cerrarModal = function() {
    modal.style.display = "none";
}

// Función para avanzar o retroceder (flechas)
window.cambiarImagen = function(n) {
    indiceActual += n;
    
    // Si llegamos al final, volvemos al inicio
    if (indiceActual >= imagenesGaleria.length) {
        indiceActual = 0;
    }
    // Si retrocedemos desde el primero, vamos al último
    if (indiceActual < 0) {
        indiceActual = imagenesGaleria.length - 1;
    }
    
    mostrarSlide(indiceActual);
}

// Función interna para actualizar la foto y texto
function mostrarSlide(indice) {
    // Obtenemos la info de la imagen actual de la galería
    const imagenSeleccionada = imagenesGaleria[indice];
    
    // Pasamos la ruta (src) y la descripción (data-descripcion) al modal
    imgModal.src = imagenSeleccionada.src;
    textoModal.innerText = imagenSeleccionada.getAttribute('data-descripcion');
}

// Cerrar si hacen click fuera de la imagen (en el fondo negro)
window.onclick = function(event) {
    if (event.target == modal) {
        cerrarModal();
    }
}

// --- LÓGICA DE LA CARTA SORPRESA ---

const btnCarta = document.getElementById('btn-carta-final');
const cajaCarta = document.getElementById('carta-secreta');

btnCarta.addEventListener('click', function() {
    // Alternar la clase 'abierta'
    cajaCarta.classList.toggle('abierta');
    
    // Opcional: Cambiar el texto del botón cuando se abre
    if (cajaCarta.classList.contains('abierta')) {
        btnCarta.textContent = "Cerrar carta 🌹";
    } else {
        btnCarta.textContent = "¡Tengo algo más para decirte! 💌";
    }
});

btn.addEventListener('click', function() {
    const musica = document.getElementById('miMusica');
    const izq = document.getElementById('izquierda');
    const der = document.getElementById('derecha');

    // 1. Reactivar scroll
    document.body.style.overflow = 'auto';

    // 2. Reproducir música
    musica.play().catch(e => console.log("Error de audio:", e));

    // 3. Animaciones de cortina
    izq.classList.add('abrir-izq');
    der.classList.add('abrir-der');
    btn.classList.add('ocultar');

    // --- NUEVO: INICIAR LLUVIA DE FLORES ---
    // Esto creará una flor cada 300 milisegundos (puedes cambiar el número)
    setInterval(crearFlor, 300);

    // Limpiar cortina
    setTimeout(() => {
        document.getElementById('cortina-contenedor').remove();
    }, 1500);
});

// --- FUNCIÓN PARA CREAR CADA FLOR ---
function crearFlor() {
    const flor = document.createElement('div');
    // Puedes cambiar el emoji por 🌹, 🌺, 🌻 o mezclarlos
    const emojis = ['🌸', '🌹', '🌺', '💐'];
    flor.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    flor.classList.add('flor');
    
    // Posición horizontal aleatoria (0 a 100% del ancho)
    flor.style.left = Math.random() * 100 + 'vw';
    
    // Tamaño aleatorio (entre 20px y 40px)
    flor.style.fontSize = (Math.random() * 20 + 20) + 'px';
    
    // Duración de caída aleatoria (entre 3 y 8 segundos para que no caigan igual)
    const duracion = Math.random() * 5 + 3;
    flor.style.animationDuration = duracion + 's';
    
    document.body.appendChild(flor);

    // Borrar la flor del código cuando termine de caer para no saturar la PC
    setTimeout(() => {
        flor.remove();
    }, duracion * 1000); 
}