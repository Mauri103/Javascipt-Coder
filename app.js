totalBalance = 0;


let egresos = [];
let ingresos = [];

restablecerValores();

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
    
    let totalIngresos = ingresos.reduce((contador, array) => contador + array.valor, 0);
    let totalEgresos = egresos.reduce((contador, array) => contador + array.valor, 0);
    
    total = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;
    ingr = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
    egr = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
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

function restablecerValores(){
    total = document.getElementById("balanceTotal").innerHTML = "$ 0"; 
    ingr = document.getElementById("totalIngresos").innerHTML = "$ 0";
    egr = document.getElementById("totalEgresos").innerHTML = "$ 0";
}



    
