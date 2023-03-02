
//                CONSTANTES y VARIABLES        //




document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const DivFiltradas = document.getElementById('image-container');
  const contenedorBotones = document.getElementById('button-container');
  const contenedorIndex = document.getElementById("contenedorIndex");
  const fotoAmpliada = document.getElementById("fotoAmpliada");



   // OCULTAR
  const apiKey = 'PslKWFfBicZtSeqy8OFjm67xGQPBl0ykRKmvA3Ksz9LiXNdyobOGz7ZQ';

  
  let id;
  let paginaAct = 1;
  let totalPags = 1;


  const formato = document.querySelector("#formato");
  const arrayFormato = ["-------", "verticales", "apaisado"];


  const fotosIndex = [
      ["https://images.pexels.com/photos/2724664/pexels-photo-2724664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","Montañas"],
      ["https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","Animales"],
      ["https://images.pexels.com/photos/161913/germany-history-architecture-medieval-161913.jpeg", "Castillos"],
  ];


  //      EVENTOS  //

   ////  CAPTURAMOS EL BUSCADOR SEARCH ////////


  form.addEventListener('submit', (event) => {
      event.preventDefault();
      obtenerFotos();
    });


    ///////CAPTURAMOS LA INFORMACION DEL SELECT


  formato.addEventListener("change", (event) => {
    obtenerFotos();
  });




    /// FUNCIONES /////


    // PINTAMOS EL SELECT ////


    const pintarFormato = () => {
      arrayFormato.forEach((item) => {
        let opcion = document.createElement("option");
        opcion.innerHTML += item;
        formato.append(opcion);
      });
    };


/// PINTAMOS LAS FOTOS SEGUN EL FORMATO SELECCIONADO /////


  const pintarFotosFormato = (data, formatoSeleccionado) => {
    DivFiltradas.innerHTML = "";
    data.photos.forEach((photos) => {
      const contenedorFotos = document.createElement("div");
      contenedorFotos.classList.add("img-box");
      const img = document.createElement("img");
      img.src = formatoSeleccionado === "apaisado" ? photos.src.landscape : photos.src.portrait;
      img.addEventListener("click", () => pintarFotoAmpliada(photos));
      const caption = document.createElement("P");
      caption.alt = photos.alt;
      const photographer = document.createElement("P");
      photographer.photographer = photos.photographer;
      contenedorFotos.append(img);
      contenedorFotos.append(caption.alt);
      contenedorFotos.append(photographer.photographer);
      DivFiltradas.append(contenedorFotos);
      id = photos.id;
    });
  };

//// PINTAMOS LAS FOTOS QUE SE BUSCASN EN EL SEARCH ///////

  const pintarFotosFiltradas = (data) => {
      DivFiltradas.innerHTML = "";
      data.photos.forEach((photos) => {
        const contenedorFotos = document.createElement("div");
        contenedorFotos.classList.add("img-box");
        const img = document.createElement("img");
        img.src = photos.src.large;
        img.addEventListener("click", () => pintarFotoAmpliada(photos));
        const caption = document.createElement("P");
        caption.alt = photos.alt;
        const photographer = document.createElement("P");
        photographer.photographer = photos.photographer;
        contenedorFotos.append(img);
        contenedorFotos.append(caption.alt);
        contenedorFotos.append(photographer.photographer);
        DivFiltradas.append(contenedorFotos);
        id = photos.id;
      });
    };

///// PINTAMOS EL CARD INICIAL ////////////


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
     };


////// PINTAMOS LA FOTO AMPLIADA //////////

     const pintarFotoAmpliada = (photos) => {
      fotoAmpliada.innerHTML = "";
      const contenedorFotoA = document.createElement("div");
      const imageA = document.createElement("img");
      imageA.src = photos.src.large2x;
      imageA.alt = photos.alt;
      const caption = document.createElement("caption");
      caption.textContent = photos.photographer;
      contenedorFotoA.append(imageA);
      contenedorFotoA.append(caption);
      fotoAmpliada.append(contenedorFotoA);
    };

///// PINTAMOS LOS BOTONES DE PAGINACION ////////////////

  const pintarBotones = () => {
    contenedorBotones.innerHTML = '';
    const pageNumber = document.createElement('span');
    pageNumber.textContent = `Página ${paginaAct} de ${totalPags}`;
    contenedorBotones.append(pageNumber);
    if (totalPags > 1) {
      const botonAntes = document.createElement('button');
      botonAntes.classList.add("button");
      botonAntes.textContent = 'Anterior';
      botonAntes.addEventListener('click', () => {
        if (paginaAct > 1) {
          paginaAct--;
          obtenerFotos();
        }
      });
      contenedorBotones.append(botonAntes);
    }
    if (paginaAct < totalPags) {
      const botonDespues = document.createElement('button');
      botonDespues.classList.add("button");
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


////// CONECTAMOS CON LA API PARA SACAR LA INFORMACION QUE NECESITAMOS //////////

  const obtenerFotos = async () => {
    const query = input.value;
    const formatoSeleccionado = formato.value;
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=${paginaAct}`;


    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (formatoSeleccionado === "-------") {
        pintarFotosFiltradas(data);
      } else {
        pintarFotosFormato(data, formatoSeleccionado);
      }
      if (data.total_results) {
        totalPags = Math.ceil(data.total_results / 15);
      }
      pintarBotones();


    } catch (error) {
      console.error('Ha ocurrido un error al obtener las fotos:', error);
    }
  };
  pintarFormato();
  pintarCardIndex();
  obtenerFotos();
  });
