//obtener enlaces 
//obtener palabras clave

//algoritmo para encontrar las fotos 
//funcion filtrar fotos
//indexOf(palabra por teclado o predeterminada) -> si no es -1 devuelve id
//
//         -> si es -1 mensaje 'foto no encontrada'
//

//IMPRIMIR FOTOS cosas comunes

//boton todas
//boton solo horiontales
//boton solo verticales
// si tiene mas ancho que largo sacar url landscape
//si tiene mas alto que largo sacar url portrait



// import { createClient } from 'https://www.pexels.com/es-es/api/';

// const client = createClient('740B928B8DB5B9F1894277754DF0D79A03F0');
// const query = 'Nature';
// console.log(client)
// console.log(query)

//client.photos.search({ query, per_page: 1 }).then(photos => {...});



// async function CuratedPhotos(page_num){
//     // fetch the data from api
//     const data=await fetch(`https://api.pexels.com/v1/curated?page=${page_num}`, 
//     {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             Authorization: apikey,     //use the apikey you have generated
//         },
//     });
//     const response=await data.json();   //convert the response to json 
//     console.log(response);

//     display_images(response);   // call the display_images method to display the images on page
// }

const apikey="PslKWFfBicZtSeqy8OFjm67xGQPBl0ykRKmvA3Ksz9LiXNdyobOGz7ZQ"; //use the apikey you have generated
const input=document.querySelector("input");
const search_btn=document.querySelector(".search_btn");
const showmore_btn=document.querySelector(".showmore");
const buscador = document.querySelector("#buscador");
const enviar = document.querySelector("#enviar");
const cardInicio = document.querySelector("#cardInicio");
const botonesPagina = document.querySelector("#botonesPagina");
const fotoAmpliada= document.querySelector("#cardFotoAmpliada");
const cardBusqueda = document.querySelector("#cardBusqueda");
const mensajeBusqueda = document.querySelector("#mensajeBusqueda")


let page_num=1;
let search_text="";
let search=false;


const cleargallery = ()=>{
    document.querySelector(".display_images").innerHTML="";
    page_num=1;
}

const CuratedPhotos= async(page_num) =>{
    // fetch the data from api
    const data=await fetch(`https://api.pexels.com/v1/curated?page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,         //use the apikey you have generated
        },
    });
    const response=await data.json();     //convert the response to json 
    console.log(response);

    display_images(response);            // call the display_images method to display the images on page
}

const display_images= async(response) =>{
    //use forEach loop to iterate on each item
    response.photos.forEach((image) => {
        const photo=document.createElement("div");
        photo.innerHTML=`<img src=${image.src.large}>
        <figcaption> Photo By: ${image.photographer}📸</figcaption>`;
        document.querySelector(".display_images").appendChild(photo);
    });
}

const SearchPhotos= async (query, page_num) => { 
    const data=await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: apikey,
        },
    });
    const response=await data.json();
    console.log(response);
    display_images(response);
}
CuratedPhotos(page_num);













// addevents del pavo 

// input.addEventListener("input",(event)=>{
//     event.preventDefault();
//     search_text=event.target.value;
// })

// search_btn.addEventListener("click",()=>{
//     if(input.value==="")
//     {
//         alert("Please enter the some text")
//         return;
//     }
//     cleargallery();
//     search=true;
//     SearchPhotos(search_text,page_num);
// })


// showmore_btn.addEventListener("click", () => {
//     if(!search){  
//         page_num++;
//         CuratedPhotos(page_num);
//     }
//     else{
//         if(search_text.value==="")
//         return;
//         page_num++;
//         SearchPhotos(search_text,page_num);
//     }
// })
