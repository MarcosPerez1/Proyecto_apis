//////////////// CONSTANTES ///////////////
document.addEventListener('DOMContentLoaded', () => {


  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const DivFiltradas = document.getElementById('image-container');
  const contenedorBotones = document.getElementById('button-container');
  const apiKey = 'PslKWFfBicZtSeqy8OFjm67xGQPBl0ykRKmvA3Ksz9LiXNdyobOGz7ZQ';
  const filtradas = document.getElementById("filtradas");
  const contenedorIndex = document.getElementById("contenedorIndex");
  const fotoAmpliada = document.getElementById("fotoAmpliada");
  
  let id;
  let paginaAct = 1;
  let totalPags = 1;
  
  
  const fotosIndex = [
      ["https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","Montañas"],
      ["https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","Animales"],
      ["https://images.pexels.com/photos/161913/germany-history-architecture-medieval-161913.jpeg", "Castillos"],
  ];
  
  
  
  
  
  /////////////////// EVENTOS //////////////////
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      obtenerFotos();
    });
  
  //   DivFiltradas.addEventListener("click",(e) => {
  //     if (e.target.classList.contains("agrandar"))
  //     pintarFotoAmpliada(data)
   
  // })
  
  /////////////////////////////////////////////
  
  const pintarFotosFiltradas =  (data) => {
      DivFiltradas.innerHTML = '';
  
      data.photos.forEach(photos => {
      const contenedorFotos = document.createElement("div");
      contenedorFotos.classList.add("agrandar");
      const img = document.createElement('img');
      img.src = photos.src.tiny;
      const caption = document.createElement('caption');
      caption.alt = photos.alt;
      const photographer = document.createElement("P")
      photographer.photographer = photos.photographer;
      contenedorFotos.append(img);
      contenedorFotos.append(caption.alt);
      contenedorFotos.append(photographer.photographer);
      DivFiltradas.append(contenedorFotos);
      contenedorFotos.addEventListener('click', () => {
          pintarFotoAmpliada(photos);
        });
   
    });
  };
  
  const pintarCardIndex = () => {
      contenedorIndex.innerHTML = '';
  
      fotosIndex.forEach((item) => {
         const cardImg = document.createElement("IMG");
         cardImg.src = `${item[0]}`
         cardImg.alt = `${item[1]}`
         const textoh3 = document.createElement("H3");
         textoh3.textContent = item[1];
         contenedorIndex.append(cardImg, textoh3);    
      })
     }
  
  
     const pintarFotoAmpliada = (data) => {
      fotoAmpliada.innerHTML="";
        
      let contenedorFotoA = document.createElement("div");
      let imageA = document.createElement("img");
      imageA.src = data.src.large2x;
      const caption = document.createElement('caption');
      caption.alt = data.alt;
      const photographer = document.createElement("P");
      photographer.photographer = data.photographer;
      contenedorFotoA.append(imageA);
      contenedorFotoA.append(caption.alt);
      contenedorFotoA.append(photographer.photographer);
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
  
      pintarFotosFiltradas(data);
      // pintarFotoAmpliada(data);
      pintarBotones();
    } catch (error) {
      console.error('Ha ocurrido un error al obtener las fotos:', error);
    }
  };
  
  
  pintarCardIndex();
  obtenerFotos()
  
  
  
  });
  
  
  
  
  /////////
  
  
  
  