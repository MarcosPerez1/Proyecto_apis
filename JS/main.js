document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const DivFiltradas = document.getElementById('image-DivFiltradas');
  const contenedorBotones = document.getElementById('button-DivFiltradas');
  const contenedorIndex = document.getElementById("contenedorIndex");
  const fotoAmpliada = document.getElementById("fotoAmpliada");
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
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
  const busqueda = new URLSearchParams(formData).toString();
  const url = form.action + "?" + busqueda;
  window.location.href = url;
      obtenerFotos();
    });
  formato.addEventListener("change", (event) => {
    const formData = new FormData(form);
  const busqueda = new URLSearchParams(formData).toString();
  const url = form.action + "?" + busqueda;
  window.location.href = url;
    obtenerFotos();
  });
    ///
    const pintarFormato = () => {
      arrayFormato.forEach((item) => {
        let opcion = document.createElement("option");
        opcion.innerHTML += item;
        formato.append(opcion);
      });
    };
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
     const pintarFotoAmpliada = (photos) => {
      location.href = 'ampliacionFoto.html';
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
  const pintarBotones = () => {
    contenedorBotones.innerHTML = '';
    const pageNumber = document.createElement('span');
    pageNumber.textContent = `Página ${paginaAct} de ${totalPags}`;
    contenedorBotones.appendChild(pageNumber);
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
      contenedorBotones.appendChild(botonAntes);
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
  //enchufo trim
  const obtenerFotos = async () => {
    try {
      const query = input.value.trim();
      const formatoSeleccionado = formato.value;
      const url = `https://api.pexels.com/v1/search?query=${query}&per_page=9&page=${paginaAct}&format=${formatoSeleccionado}`;
      const response = await fetch(url, {
        headers: {
          Authorization: apiKey,
        },
      });
      const data = await response.json();
      pintarFotosFiltradas(data, DivFiltradas);
      totalPags = data.total_results / 9;
      pintarBotones();
    } catch (error) {
      console.log(error);
    }
  };
  pintarFotosFormato();
  pintarFormato();
  pintarCardIndex();
  obtenerFotos();
  });