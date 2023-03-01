const form = document.getElementById('form');
const input = document.getElementById('input');
const contnedorFotos = document.getElementById('image-container');
const contenedorBotones = document.getElementById('button-container');
const apiKey = 'PslKWFfBicZtSeqy8OFjm67xGQPBl0ykRKmvA3Ksz9LiXNdyobOGz7ZQ';
let paginaAct = 1;
let totalPags = 1;
////////////////
const saberCual=(cual)=>{
    console.log(cual)
}


const init=()=>{
    const url=location.search

    let params = new URLSearchParams(url);

    if(params.has('id')){
        console.log(params)
        const id=params.get('id')
        console.log(id)
        saberCual('filtradosypagina')
    }else{
        saberCual('index')
    }
    


}


init()

///////////////////////////////////////////////
const limpiarPagina = () => {
  contnedorFotos.innerHTML = '';
};

const pintarFotos = (data) => {
  limpiarPagina();
  data.photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = photo.src.tiny;
    img.alt = photo.photographer;
    contnedorFotos.appendChild(img);
  });
};

const pintarBotones = () => {
  contenedorBotones.innerHTML = '';

  const pageNumber = document.createElement('span');
  pageNumber.textContent = `Página ${paginaAct} de ${totalPags}`;
  contenedorBotones.appendChild(pageNumber);

  if (totalPags > 1) {
    const botonAntes = document.createElement('button');
    botonAntes.textContent = 'Anterior';
    botonAntes.addEventListener('click', () => {
      if (paginaAct > 1) {
        paginaAct--;
        obtenerFotos();
      }
    });
    contenedorBotones.appendChild(botonAntes);
  }

  if (paginaAct < totalPags) {
    const botonDespues = document.createElement('button');
    botonDespues.textContent = 'Siguiente';
    botonDespues.addEventListener('click', () => {
      if (paginaAct < totalPags) {
        paginaAct++;
        obtenerFotos();
      }
    });
    contenedorBotones.appendChild(botonDespues);
  }
};

const obtenerFotos = async () => {
  const query = input.value;
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${paginaAct}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.total_results) {
      totalPags = Math.ceil(data.total_results / 15);
    }

    pintarFotos(data);
    pintarBotones();
  } catch (error) {
    console.error('Ha ocurrido un error al obtener las fotos:', error);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  //location.href = 'http://127.0.0.1:5500/pruebasfotosGrandes.html'
  paginaAct = 1;
  obtenerFotos();
});

