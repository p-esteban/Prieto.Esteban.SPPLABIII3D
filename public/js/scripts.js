import { itemClicked, crearTabla } from "./table.js";
import { refresh, clean } from "./form.js";
import { getData,addAnuncio,updateAnuncio,deleteAnuncio, anunciosGuardados} from "./acceso-datos.js";
import {  getById } from "./crud.js";

let form = document.forms[0];

let btnGuardar = document.getElementById("btnGuardar");
let btnEliminar = document.getElementById("btnEliminar");
let btnModificar = document.getElementById("btnModificar");
let btnCancelar = document.getElementById("btnCancelar");
let divTabla = document.getElementById("divTabla");
let transaccionFiltro = document.getElementById("cmbTransaccionFiltro");
let busqueda = document.getElementById("buscarAnuncio");

window.addEventListener("load", getData);
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

divTabla.addEventListener("click", () => {
  refresh(getById(itemClicked));

  btnModificar.style.display = "block";
  btnEliminar.style.display = "block";
  btnCancelar.style.display = "block";
});

btnGuardar.addEventListener("click", () => {
  addAnuncio();
  clean();
});
btnEliminar.addEventListener("click", () => {
  deleteAnuncio(itemClicked);
  clean();
});
btnModificar.addEventListener("click", () => {
  updateAnuncio(itemClicked);
  clean();
});

btnCancelar.addEventListener("click", () => {
  clean();
  btnModificar.style.display = "none";
  btnEliminar.style.display = "none";
  btnCancelar.style.display = "none";
});

transaccionFiltro.addEventListener("change", (e) => {
  // console.log(e.target.value.toLowerCase());
  const stringDeBusqueda = e.target.value.toLowerCase();
  // console.log(stringDeBusqueda);
   console.log(anunciosGuardados);
  const anunciosEncontrados = anunciosGuardados.filter((anuncio) => {
    return( anuncio.transaccion.toLowerCase().includes(stringDeBusqueda));
  });
  if (stringDeBusqueda == 'venta' || stringDeBusqueda == 'alquiler') {
    let promedio = anunciosEncontrados
      .map((anuncio) => parseFloat(anuncio.precio)) 
      .reduce((previo, actual) => previo + actual) / anunciosEncontrados.length;

  //console.log(promedio);
  txtPromedio.value = promedio;
  }else{
    txtPromedio.value = "";
  }
  
  crearTabla(anunciosEncontrados);
});





busqueda.addEventListener("keyup", (e) => {
  // console.log(e.target.value);
  const stringDeBusqueda = e.target.value.toLowerCase();

  // console.log(anunciosGuardados);
  const anunciosEncontrados = anunciosGuardados.filter((anuncio) => {
    return (
      anuncio.id.toString().toLowerCase().includes(stringDeBusqueda) ||
      anuncio.titulo.toLowerCase().includes(stringDeBusqueda) ||
      anuncio.transaccion.toLowerCase().includes(stringDeBusqueda) ||
      anuncio.descripcion.toLowerCase().includes(stringDeBusqueda) ||
      anuncio.precio.toString().includes(stringDeBusqueda) ||
      anuncio.num_puertas.toString().includes(stringDeBusqueda) ||
      anuncio.num_kms.toString().includes(stringDeBusqueda) ||
      anuncio.potencia.toString().includes(stringDeBusqueda)
    );
  });
  // console.log(anunciosEncontrados);
  crearTabla(anunciosEncontrados);
});
