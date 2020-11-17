import { Anuncio_Auto } from "./entidades.js";
import { getInput } from "./form.js";
import { anunciosGuardados } from "./acceso-datos.js";

let lastId;

export function update(id) {
  const list = read();
  const values = getInput();
  let i = 0;
  for (const item of list) {
    if (item.id == id) {
      for (const key in item) {
        if (item.hasOwnProperty(key) && key != "id" && key != "active") {
          item[key] = values[i];
          i++;
        }
      }
    }
  }
  lastId = getId();
  localStorage.clear();
  save("lastId", lastId);
  save("anuncio_autos", list);
}

export function getById(id) {
  const list = anunciosGuardados;
  let i = 0;
  for (const item of list) {
    if (item.id == id) {
      return item;
    }
  }
}
export function deleteItem(id) {
  const list = read();
  for (const item of list) {
    if (item.id == id) {
      item.active = false;
    }
  }
  lastId = getId();
  localStorage.clear();
  save("lastId", lastId);
  save("anuncio_autos", list);
}

export function create(idUpdate = null ) {
  //OBETENGO LOS DATOS DEL FORM
  const id = idUpdate?? getId();
 

  const input = getInput();

  const newEntidad = new Anuncio_Auto(
    id,
    input[0],
    input[1],
    input[2],
    input[3],
    input[4],
    input[5],
    input[6]
  );
  return newEntidad;
}
function save(key, value) {
  ////

  localStorage.setItem(key, JSON.stringify(value));
}
function read() {
  return JSON.parse(localStorage.getItem("anuncio_autos")) || [];
}

function getId() {
  return anunciosGuardados[anunciosGuardados.length - 1]["id"] + 1;
}
