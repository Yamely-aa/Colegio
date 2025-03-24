document.addEventListener("DOMContentLoaded", function() {
    let alumno = JSON.parse(localStorage.getItem("alumnoEditar"));

    if (alumno) {
        document.getElementById("index").value = alumno.index;
        document.getElementById("name").value = alumno.nombre;
        document.getElementById("email").value = alumno.email;
        document.getElementById("phone").value = alumno.telefono;
        document.getElementById("language").value = alumno.idioma;
    }
});

function guardarEdicion(event) {
    event.preventDefault();
    let index = document.getElementById("index").value;
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    alumnos[index] = {
        nombre: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("phone").value,
        idioma: document.getElementById("language").value
    };

    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    localStorage.removeItem("alumnoEditar");
    window.location.href = "alumnos.html";
}
