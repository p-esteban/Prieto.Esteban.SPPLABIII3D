import { Anuncio_Auto } from "./entidades.js";

export function getInput() {
  //OBETENGO LOS DATOS DEL FORM
  let cmbTransaccion = document.getElementById("cmbTransaccion");
  if (
    validar("txtTitulo") &&
    validar("txtDescripcion") &&
    validar("txtPrecio") &&
    validar("txtCantPuertas") &&
    validar("txtPotencia") &&
    validar("txtCantKms") &&
    cmbTransaccion.options[cmbTransaccion.selectedIndex].innerHTML !=
      "----  Elegir Transaccion ----"
  ) {
    const var1 = document.querySelector("#txtTitulo").value;
    const var2 = document.querySelector("#txtDescripcion").value;
    const var3 = document.querySelector("#txtPrecio").value;
    const var4 = document.querySelector("#txtCantPuertas").value;
    const var5 = document.querySelector("#txtCantKms").value;
    const var6 = document.querySelector("#txtPotencia").value;


    
    //Obtengo combo box
    let transaccion;

    if (cmbTransaccion.options[cmbTransaccion.selectedIndex].innerHTML != "-") {
      transaccion = cmbTransaccion.options[cmbTransaccion.selectedIndex].innerHTML;
      
    }

    

    const values = [];
    values.push(var1,transaccion, var2, var3,var4,var5,var6 );
    return values;
  } else {
    alert("Debes completar todos los campos");
  }
}
function validar(property) {
  var elemento = document.getElementById(property).value;
  if (elemento == "") {
    //alert("Debes completar todos los campos ");
    return false;
  } else {
    return true;
  }
}
export function refresh(obj) { ///aca hay que arregal

  console.log(obj);
  document.querySelector("#txtTitulo").value = obj.titulo;
  document.querySelector("#txtDescripcion").value = obj.descripcion;
  document.querySelector("#txtPrecio").value = parseFloat( obj.precio);
  document.querySelector("#txtCantPuertas").value = obj.num_puertas;
  document.querySelector("#txtCantKms").value = obj.num_kms;
  document.querySelector("#txtPotencia").value = obj.potencia;

document.querySelector("#cmbTransaccion").value = obj.transaccion.toLowerCase();
 
  
}

export function clean() {

  document.querySelector("#txtTitulo").value = "";
  document.querySelector("#txtDescripcion").value = "";
  document.querySelector("#txtPrecio").value = "";
  document.querySelector("#txtCantPuertas").value = "";
  document.querySelector("#txtCantKms").value = "";
  document.querySelector("#txtPotencia").value = "";



 
  document.querySelector("#cmbTransaccion").value = "-";
}
