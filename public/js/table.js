export let itemClicked;

export function crearTabla(vec) {
  //Me traigo el div
  let section = document.getElementById("divTabla");
  
  while (section.hasChildNodes()) {
    section.removeChild(section.firstElementChild);
  }

  //Creo una nueva
  let table = document.createElement("table");
  table.setAttribute("id", "tablaDatos");
  table.setAttribute("class", "table table-responsive table-hover table-striped ");

  //Agrego esa fila con los titulos a la tabla
  table.appendChild(crearCabecera(vec[0]));

  table.appendChild(crearBody(vec));

  section.appendChild(table);
}

function crearCabecera(item) {
  //Creo la fila donde van a ir los titulos
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  thead.setAttribute("class", "thead-dark");

  //Creo los TH recorriendo un item del array
  for (const key in item) {
    if (key != 'active') {
     // console.log(key);
      //Creo el th que contendra el titulo
      let th = document.createElement("th");
      //El "key" es el titulo, lo creo como textNode
      let tituloColumna = document.createTextNode(key);
      //Agrego el titulo a la "th"
      th.appendChild(tituloColumna);
      //Agrego los titulos a la fila
      tr.appendChild(th);
    }
    
    
  }
  thead.appendChild(tr);
  return thead;
}
function crearBody(vec) {
  const tbody = document.createElement("tbody");

  vec.forEach((element) => {
    let tr = document.createElement("tr");
   // console.log("body "+element.active);
   for (const attribute in element) {
    //Creo el td y su dato
    
      let td = document.createElement("td");
    let dato = document.createTextNode(element[attribute]);

    //Agrego dato al td
    td.appendChild(dato);

    //Agrego td al tr
    tr.appendChild(td);
    agregarManejadorTD(td);
    
    
  }
   
   /* if (element.active) {
       for (const attribute in element) {
        //Creo el td y su dato
        if (attribute != 'active') {
          let td = document.createElement("td");
        let dato = document.createTextNode(element[attribute]);

        //Agrego dato al td
        td.appendChild(dato);

        //Agrego td al tr
        tr.appendChild(td);
        agregarManejadorTD(td);
        }
        
      }
    } */
     
    

    if (element.hasOwnProperty("id")) {
      tr.setAttribute("data-id", element["id"]);
    }

    tbody.appendChild(tr);
  });
  return tbody;
}

function agregarManejadorTR(tr) {
  if (tr) {
    tr.addEventListener(
      "click",
      function (e) {
        // alert(e.target.getAttribute("data-id"));
        alert(e.path[1].dataset.id);
        console.log("es el tr");
      },
      true
    );
  }
}
function agregarManejadorTD(td) {
  if (td) {
    td.addEventListener("click", function (e) {
     // alert(e.target.parentNode.dataset.id);
      itemClicked = e.target.parentNode.dataset.id;
    });
  }
}
