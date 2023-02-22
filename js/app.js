let egresos = JSON.parse(localStorage.getItem("egresosStorage")) || [];
let ingresos = JSON.parse(localStorage.getItem("ingresosStorage")) || [];
let valorIngreso= ingresos.reduce((contador, array) => contador + array.valor, 0);
let valorEgreso = egresos.reduce((contador, array) => contador + array.valor, 0);
let totalBalance = valorIngreso - valorEgreso;
let idEgresoStorage = JSON.parse(localStorage.getItem("idEgreso") || 1);
let idIngresoStorage = JSON.parse(localStorage.getItem("idIngreso") || 1);

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

function Ingreso(id ,descripcion, valor){
    this.id = id;
    this.descripcion = descripcion;
    this.valor = valor;
}

function Egreso(id, descripcion, valor){
    this.id = id;
    this.descripcion = descripcion;
    this.valor = valor;
}

function realizarConteo(){
    event.preventDefault();
    var tipo = document.getElementById("tipoTransaccion").value;
    if(tipo === "Ingreso"){
        calcularIngresos();
        let idIngr = localStorage.getItem("idIngreso");
        idIngr ++;
        ingreso = new Ingreso(idIngr, obtenerDescripcion(), obtenerValorIngresado());
        let idIngresoStorage = localStorage.setItem("idIngreso", idIngr);
        agregarIngreso();        
    }else{
        calcularEgresos();
        let idEgr = localStorage.getItem("idEgreso");
        idEgr ++;
        egreso = new Egreso(idEgr, obtenerDescripcion(), obtenerValorIngresado());
        let idEgresoStorage = localStorage.setItem("idEgreso", idEgr);
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

if(ingresos != null){
    tablaIngresos = document.getElementById("descripcionIngresos");
    ingresos.forEach((item) => {
        let Columna = document.createElement("p");
        Columna.innerHTML = '<p value="' + item.id + '">' + item.descripcion + "</p><p>" + item.valor + "</p>" 
        tablaIngresos.appendChild(Columna);
        
    });
}

if(egresos != null){
    tablaEgresos = document.getElementById("descripcionEgresos");
    egresos.forEach((item) => {
        let Columna = document.createElement("p");
        Columna.innerHTML = "<p>" + item.descripcion + "</p><p>" + item.valor + "</p>" 
        tablaEgresos.appendChild(Columna);
        
    });
}







    






    
