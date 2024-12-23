// Declaramos la variable 'pagina' que representa la página actual de las películas.
let pagina = 1;

// Obtenemos los botones de navegación 'Anterior' y 'Siguiente' del DOM mediante su ID.
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnInicio = document.getElementById("btnInicio");

// Añadimos un evento de clic al botón 'Siguiente'.
btnSiguiente.addEventListener("click", () => {
  // Si la página actual es menor que 1000, incrementamos en 1.
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas(); // Llamamos a la función para cargar las películas de la nueva página.
  }
});

// Añadimos un evento de clic al botón 'Anterior'.
btnAnterior.addEventListener("click", () => {
  // Si la página actual es mayor que 1, disminuimos en 1.
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas(); // Llamamos a la función para cargar las películas de la nueva página.
  }
});
// Añadimos un evento de clic al botón 'Inicio'.
btnInicio.addEventListener("click", () => {
  // Establecemos la página a 1 y cargamos las películas correspondientes.
  pagina = 1;
  cargarPeliculas();
});

// Función asíncrona que carga las películas desde la API.
const cargarPeliculas = async () => {
  try {
    // Hacemos una solicitud a la API con fetch, usando la variable 'pagina' en la URL.
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`
    );

    console.log(respuesta); // Mostramos la respuesta en la consola para depuración.

    // Si la respuesta tiene un código de estado 200, significa que fue exitosa.
    if (respuesta.status === 200) {
      const datos = await respuesta.json(); // Convertimos la respuesta a JSON.

      // Inicializamos una variable para almacenar el HTML de las películas.
      let peliculas = "";
      // Recorremos el arreglo de resultados y generamos el HTML para cada película.
      datos.results.forEach((pelicula) => {
        peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
      });

      // Insertamos el HTML generado dentro del contenedor con el ID 'contenedor'.
      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      // Si el código de estado es 401, significa que la clave de API es incorrecta.
      console.log("Pusiste la llave mal");
    } else if (respuesta.status === 404) {
      // Si el código de estado es 404, significa que no se encontraron los datos solicitados.
      console.log("La pelicula que buscas no existe");
    } else {
      // Para otros códigos de error no específicos, mostramos un mensaje genérico.
      console.log("Hubo un error y no sabemos que paso");
    }
  } catch (error) {
    // Capturamos cualquier error que ocurra durante la ejecución de la solicitud.
    console.log(error);
  }
};

// Llamamos a la función al inicio para cargar las películas de la página 1.
cargarPeliculas();
