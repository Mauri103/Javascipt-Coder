let egresos = [];
let ingresos = [];
let totalBalance = 0;


window.addEventListener("load", function(){
    localStorage.clear();
    Swal.fire({
        title: 'Bienvenido a la aplicación de gastos',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonText: '¡Gracias!'
      })
})

setIngresos();
setEgresos();
balance = document.getElementById("balanceTotal").innerHTML = "$ 0"


let aceptar = document.getElementById("ingresar");
ingresar.addEventListener('click', realizarConteo);

function Ingreso(descripcion, valor){
    this.descripcion = descripcion;
    this.valor = valor;
}

function Egreso(descripcion, valor){
    this.descripcion = descripcion;
    this.valor = valor;
}

function realizarConteo(){
    event.preventDefault();
    var tipo = document.getElementById("tipoTransaccion").value;
    if(tipo === "Ingreso"){
        calcularIngresos();
        ingreso = new Ingreso(obtenerDescripcion(), obtenerValorIngresado());
        agregarIngreso();                 
    }else{
        calcularEgresos();
        egreso = new Egreso(obtenerDescripcion(), obtenerValorIngresado());
        agregarEgreso();
    } 
    
    balance = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;
    mostrarIngresos();
    mostrarEgresos();    
}

function setIngresos(){
    let ingrJSON = localStorage.getItem("ingresosStorage");
    if(ingrJSON == null){
        ingreso = document.getElementById("totalIngresos").innerHTML = "$ 0" ;
    }else{
        let ingr = JSON.parse(ingrJSON);
        let totalIngresos = ingr.reduce((contador, array) => contador + array.valor, 0);
        ingreso = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
    }
}

function setEgresos(){
    let egrJSON = localStorage.getItem("egresosStorage");
    if(egrJSON == null){
        egreso = document.getElementById("totalEgresos").innerHTML = "$ 0" ;
    }else{
        let egr = JSON.parse(egrJSON);
        let totalEgresos = egr.reduce((contador, array) => contador + array.valor, 0);
        ingreso = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
    }   
}

function calcularIngresos(){
    ingreso = obtenerValorIngresado();
    totalBalance = totalBalance + ingreso;
}

function calcularEgresos(){
    egreso = obtenerValorIngresado();
    totalBalance = totalBalance - egreso;
}

function obtenerValorIngresado(){
    valor = parseFloat(document.getElementById("valorIngresado").value);
    return valor;
}

function obtenerDescripcion(){
    descripcion = document.getElementById("descripcionIngreso").value;
    return descripcion;
}

function agregarIngreso(){
    ingresos.push(ingreso);
    ingresosJSON = JSON.stringify(ingresos);
    localStorage.setItem("ingresosStorage", ingresosJSON);
    
}

function agregarEgreso(){
    egresos.push(egreso);
    egresosJSON = JSON.stringify(egresos);
    localStorage.setItem("egresosStorage", egresosJSON);
}

function mostrarIngresos(){
    let ingrJSON = localStorage.getItem("ingresosStorage");
    if(ingrJSON == null){
        ingreso = document.getElementById("totalIngresos").innerHTML = "$ 0";
    }else{
        let ingr = JSON.parse(ingrJSON);
        let totalIngresos = ingr.reduce((contador, array) => contador + array.valor, 0);
        ingreso = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
    }
}

function mostrarEgresos(){
    let egrJSON = localStorage.getItem("egresosStorage");
    if (egrJSON == null){
        egreso = document.getElementById("totalEgresos").innerHTML = "$ 0";
    }else{
        let egr = JSON.parse(egrJSON);
        let totalEgresos = egr.reduce((contador, array) => contador + array.valor, 0);
        egreso = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
    }
}


    






    
