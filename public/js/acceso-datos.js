import { create } from "./crud.js";
import { crearTabla } from "./table.js";

const url = "http://localhost:3000/anuncios";

let checkboxesChecked = {};
let anunciosFiltrados = [];

let checkboxContainer = document.querySelectorAll(".checkboxContainer input");
let divSpinner = document.getElementById("divSpinner");

export let anunciosGuardados;



export async function getData() {
 
  insertSpinner();
  try {
    const res = await fetch(url);
  

    if (!res.ok) {
      let msgError = res.statusText || "Se produjo un error";
      throw { status: res.status, statusText: msgError };
    }

    anunciosGuardados  = await res.json();
    console.log(anunciosGuardados);

   
    getCheckboxesChecked();
    crearTabla(anunciosGuardados);
  } catch (err) {
    console.log(err);
    console.error(`Estado de la petición: ${err.status}`);
    console.error(`Texto del estado: ${err.statusText}`);
  } finally {
   deleteSpinner();
  }
}

export async function addAnuncio ()  {

 insertSpinner();

  try {
    const newAnuncion = create();

      const options = {
          method: 'POST',
          headers: {
              "Content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify( newAnuncion )
      }
      console.log(options);

      const res = await fetch( url, options);
      console.log( res );

      if( !res.ok ) {
          
          let msgError = res.statusText || 'Se produjo un error';
          throw { status: res.status, statusText: msgError };
      }

      const data = await res.json();
      //anunciosGuardados.push(data);
      console.log( data );

      console.log( `Estado de la petición: ${ res.statusText } - Código: ${ res.status }` );
     
      
  } catch ( err ) {
      console.log(err);
      console.error( `Estado de la petición: ${ err.status }` );
      console.error( `Texto del estado: ${ err.statusText }` );

  } finally {

      deleteSpinner();
      getData();
  }

}


export  async function updateAnuncio ( id )  {

 insertSpinner();
 const newAnuncion = create(id);
 
  try {
      

      const options = {
          method: 'PUT',
          headers: {
              "Content-type": "application/json; charset=utf-8"
          },
          body: JSON.stringify( newAnuncion )
      }

      const res = await fetch( url+"/"+id, options );
      // console.log( res );

      if( !res.ok ) {
          
          let msgError = res.statusText || 'Se produjo un error';
          throw { status: res.status, statusText: msgError };
      }

      const data = await res.json();
      console.log( data );
      //anunciosGuardados.push(data);

      console.log( `Estado de la petición: ${ res.statusText } - Código: ${ res.status }` );
      
  } catch ( err ) {
      console.log(err);
      console.error( `Estado de la petición: ${ err.status }` );
      console.error( `Texto del estado: ${ err.statusText }` );

  } finally {

      deleteSpinner();
      getData();

  }

}


export async function deleteAnuncio ( id )  {

 insertSpinner();

  try {

      const options = {
          method: 'DELETE',
          headers: {
              "Content-type": "application/json; charset=utf-8"
          }
      }

      const res = await fetch(url+"/"+id , options );
      // console.log( res );

      if( !res.ok ) {
          
          let msgError = res.statusText || 'Se produjo un error';
          throw { status: res.status, statusText: msgError };
      }

      const data = await res.json();
      console.log( data );

      console.log( `Estado de la petición: ${ res.statusText } - Código: ${ res.status }` );
      
  } catch ( err ) {
      console.log(err);
      console.error( `Estado de la petición: ${ err.status }` );
      console.error( `Texto del estado: ${ err.statusText }` );

  } finally {

     deleteSpinner();
     getData();
  }

}


function getCheckboxesChecked() {
  checkboxContainer.forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => {
      checkboxesChecked["id"] = true;
      checkboxesChecked["num_kms"] = false;
      console.log(checkboxesChecked);

      checkboxContainer.forEach((checkbox) => {
        checkboxesChecked[checkbox.id] = checkbox.checked;
      });
      console.log(checkboxesChecked);

      if (event.target.checked == false) {
        anunciosFiltrados = anunciosGuardados.map((e) => {
          return Object.keys(e).reduce((object, key) => {
           
            if (key !== event.target.id && checkboxesChecked[key]) {
              object[key] = e[key];
            }
            return object;
          }, {});
        });
      } else {
        anunciosFiltrados = anunciosGuardados.map((e) => {
          let payload = {};
          for (const key in e) {
            if (checkboxesChecked[key]) payload[key] = e[key];
          }
          return payload;
        });
      }

      crearTabla(anunciosFiltrados);
    });
  });
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function read(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function insertSpinner() {
  while (divTabla.hasChildNodes()) {
    divTabla.removeChild(divTabla.firstElementChild);
  }
  while (divSpinner.hasChildNodes()) {
    divSpinner.removeChild(divSpinner.firstElementChild);
  }

  divSpinner.appendChild(createSpinner());
}

function createSpinner() {
  const img = document.createElement("img");
  img.setAttribute("src", "./image/loader.gif");
  img.setAttribute("alt", "imagen spinner");
  img.setAttribute("id", "spinner");
  return img;
}





function deleteSpinner(){
  while (divSpinner.hasChildNodes()) {
    divSpinner.removeChild(divSpinner.firstElementChild);
  }
}


// export const getData = async () => {

//   // $spinner.appendChild( crearSpinner() );
//   // $ol.textContent = '';

//   try {

//       const res = await axios.get( 'http://localhost:3000/anuncios' );
//        console.log( res );
//       const request = res.request;
//       // console.log( request );

//       /** NOTA:
//        * #1 - A diferencia de Fetch no hace falta convertir el dato como JSON, sino ya viene parseado
//        * en la propiedad .data
//        */
//       const data = res.data;
//        console.log( data );
//       crearTabla(data)

//  //     console.log( `Estado de la petición: ${ res.statusText } - Código: ${ res.status }` );

//   } catch ( err ) {

//   //    let msgError = err.response.statusText || 'Se produjo un error';
//   //    console.error( `Estado de la petición: ${ err.response.status } - ${ msgError }` );

//   } finally {
//     //  spinner.textContent = '';
//   }

// }


// export function getData() {
//   let xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = () => {
//     console.log("traer datos: " + xhr.readyState);
//     if (xhr.readyState === 4) {
//       while (divSpinner.hasChildNodes()) {
//         divSpinner.removeChild(divSpinner.firstElementChild);
//       }
//       if (xhr.status === 200) {
//         anunciosGuardados = JSON.parse(xhr.responseText);
//         getCheckboxesChecked();

//         crearTabla(anunciosGuardados);
//       } else {
//         console.log("todo mal");
//       }
//     } else {
//       insertSpinner();
//     }
//   };

//   xhr.open("GET", "http://localhost:3000/anuncios");

//   xhr.send();
// }

// export function addAnuncio() {
//   const newAnuncion = create();

//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     console.log(xhr.readyState);
//     if (xhr.readyState === 4) {
//       while (divSpinner.hasChildNodes()) {
//         divSpinner.removeChild(divSpinner.firstElementChild);
//       }

//       if (xhr.status === 201) {
//         getData();
//       } else {
//         console.log(`${xhr.status}: ${xhr.statusText}`);
//       }
//     } else {
//       insertSpinner();
//     }
//   };
//   xhr.open("POST", "http://localhost:3000/anuncios");
//   xhr.setRequestHeader("content-type", "application/json");
//   //console.log(newAnuncion);
//   xhr.send(JSON.stringify(newAnuncion));
// }

// export function updateAnuncio(id) {
//   const newAnuncion = create(id);
//   if (newAnuncion) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           //console.log(JSON.parse(xhr.responseText));
//           getData();
//         } else {
//           console.log(`${xhr.status}: ${xhr.statusText}`);
//         }
//       } else {
//         insertSpinner();
//       }
//     };
//     xhr.open("PUT", "http://localhost:3000/anuncios/" + id);
//     xhr.setRequestHeader("content-type", "application/json");
//     xhr.send(JSON.stringify(newAnuncion));
//   } else {
//     alert("No se pudo crear el anuncio");
//   }
// }

// export function deleteAnuncio(id) {
//   if (id > 0) {
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = () => {
//       console.log(xhr.readyState);
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           console.log(JSON.parse(xhr.responseText));
//           getData();
//         } else {
//           console.log(`${xhr.status}: ${xhr.statusText}`);
//         }
//       } else {
//         insertSpinner();
//       }
//     };
//     xhr.open("DELETE", "http://localhost:3000/anuncios/" + id);

//     xhr.send();
//   } else {
//     alert("Anuncio no seleccionado");
//   }
// }

