const USUARIO_CORRECTO = "admin";
const PASSWORD_CORRECTO = "1234";

// Función para verificar el login
function verificarLogin(event) {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (usuario === USUARIO_CORRECTO && password === PASSWORD_CORRECTO) {
        window.location.href = "alumnos.html";
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

// Función para registrar un nuevo alumno
function registrarAlumno(event) {
    event.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("phone").value.trim();
    const idioma = document.getElementById("language").value;

    if (!nombre || !email || !telefono || !idioma) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    alumnos.push({ nombre, email, telefono, idioma });

    localStorage.setItem("alumnos", JSON.stringify(alumnos));

    alert("Alumno registrado con éxito.");
    window.location.href = "alumnos.html";
}

// Función para cargar los alumnos en la tabla
function cargarAlumnos() {
    const tabla = document.getElementById("tabla-alumnos");

    if (tabla) {
        let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
        tabla.innerHTML = "";

        alumnos.forEach((alumno, index) => {
            let fila = `
                <tr>
                    <td>${alumno.nombre}</td>
                    <td>${alumno.email}</td>
                    <td>${alumno.telefono}</td>
                    <td>${alumno.idioma}</td>
                    <td>
                        <button onclick="editarAlumno(${index})">Editar</button>
                        <button onclick="eliminarAlumno(${index})" class="btn-eliminar">Eliminar</button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    }
}

// Función para eliminar un alumno con confirmación
function eliminarAlumno(index) {
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

    if (confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
        alumnos.splice(index, 1);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        cargarAlumnos(); // Recargar la tabla después de eliminar
    }
}

// Función para editar los datos del alumno
function editarAlumno(index) {
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    let alumno = alumnos[index];

    localStorage.setItem("alumnoEditar", JSON.stringify({ ...alumno, index }));
    window.location.href = "editar.html";
}

// Función para cargar los datos del alumno en la página de edición
document.addEventListener("DOMContentLoaded", function () {
    let alumno = JSON.parse(localStorage.getItem("alumnoEditar"));

    if (alumno && document.getElementById("edit-name")) {
        document.getElementById("index").value = alumno.index;
        document.getElementById("edit-name").value = alumno.nombre;
        document.getElementById("edit-email").value = alumno.email;
        document.getElementById("edit-phone").value = alumno.telefono;
        document.getElementById("edit-language").value = alumno.idioma;
    }
});

// Función para guardar los cambios de edición
function guardarEdicion(event) {
    event.preventDefault();

    let index = document.getElementById("index").value;
    let nombre = document.getElementById("edit-name").value.trim();
    let email = document.getElementById("edit-email").value.trim();
    let telefono = document.getElementById("edit-phone").value.trim();
    let idioma = document.getElementById("edit-language").value;

    if (!nombre || !email || !telefono || !idioma) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    alumnos[index] = { nombre, email, telefono, idioma };

    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    localStorage.removeItem("alumnoEditar");

    alert("Alumno actualizado correctamente.");
    window.location.href = "alumnos.html";
}

// Cargar los alumnos al cargar la página de alumnos
document.addEventListener("DOMContentLoaded", function() {
    cargarAlumnos();
});
