const selectorAvatar = document.getElementById('selectorAvatar');
const vistaPreviaContenedor = document.getElementById('vista-previa-avatar');
const imagenAvatar = document.getElementById('imagen-avatar');
const formulario = document.getElementById('formulario-registro');

selectorAvatar.addEventListener('change', (evento) => {
    const rutaDeLaImagen = evento.target.value;
    
    if (rutaDeLaImagen) {
        imagenAvatar.src = rutaDeLaImagen;
        vistaPreviaContenedor.classList.remove('vista-previa-oculta');
    }
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    const nombre = document.getElementById('nombreCompleto').value;
    const rutaDeLaImagen = selectorAvatar.value;

    if (rutaDeLaImagen) {
        // Guardamos el nombre y la foto en la memoria del navegador
        localStorage.setItem('dracoNombre', nombre);
        localStorage.setItem('dracoAvatar', rutaDeLaImagen);

        // Hacemos el salto a la nueva dimensión
        window.location.href = "inicio.html"; 
    } else {
        alert("¡No olvides seleccionar tu foto de perfil!");
    }
});