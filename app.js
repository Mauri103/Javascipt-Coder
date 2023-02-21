let egresos = JSON.parse(localStorage.getItem("egresosStorage")) || [];
let ingresos = JSON.parse(localStorage.getItem("ingresosStorage")) || [];
let valorIngreso= ingresos.reduce((contador, array) => contador + array.valor, 0);
let valorEgreso = egresos.reduce((contador, array) => contador + array.valor, 0);
let totalBalance = valorIngreso - valorEgreso;

ingreso = document.getElementById("totalIngresos").innerHTML = "$ " + valorIngreso ;
egreso = document.getElementById("totalEgresos").innerHTML = "$ " + valorEgreso;
balance = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;

if(egresos.length == 0 && ingresos.length == 0){
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
}

let aceptar = document.getElementById("ingresar");
aceptar.addEventListener('click', realizarConteo);

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
    agregarIngresoApi(ingreso);
}

function agregarEgreso(){
    egresos.push(egreso);
    egresosJSON = JSON.stringify(egresos);
    localStorage.setItem("egresosStorage", egresosJSON);
    agregarEgresoApi(egreso);

}

function mostrarIngresos(){
    let ingrJSON = localStorage.getItem("ingresosStorage");
    let ingr = JSON.parse(ingrJSON);
    let totalIngresos = ingr.reduce((contador, array) => contador + array.valor, 0);
    ingreso = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
}


function mostrarEgresos(){
    let egrJSON = localStorage.getItem("egresosStorage");
    let egr = JSON.parse(egrJSON);
    let totalEgresos = egr.reduce((contador, array) => contador + array.valor, 0);
    egreso = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
}

function agregarIngresoApi(ingreso){
    console.log(ingreso);
}

function agregarEgresoApi(egreso){
    console.log(egreso);
}



    






    
