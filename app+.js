let pagina =1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
btnSiguiente.addEventListener('click', () => {
  if(pagina < 1000){
    pagina += 1;
    cargarPeliculas();
  }
});
btnAnterior.addEventListener('click', () => {
  if(pagina > 1){
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async() => {
  try{
    const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6b5636db576c1417305cb2255a9899a1&Language=es-MX&page=${pagina}`);

    console.log(respuesta);

    // Si la respueta es correcta
    if(respuesta.status === 200 ){
      const datos = await respuesta.json();
      
      let peliculas = "";
      datos.results.forEach(pelicula => {

      peliculas += `
          <div class="pelicula">
          <img class="poster" src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'>
          <h3 class="titulo">${pelicula.title}</h3>
          </div>
          `;
      });

      //!ACCEDEMOS A DOM↓
      document.getElementById('contenedor').innerHTML = peliculas;
      
    } else if(respuesta.status === 401){
      console.log("Fallo 401")

    } else if(respuesta.status === 404){
      console.log("fallo 404")

    } else {
      console.log("Poblemas")
    }

  } catch (error){
    console.log(error)
  }
}
cargarPeliculas();