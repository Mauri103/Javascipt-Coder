totalBalance = 0;
totalIngresos = 0;
totalEgresos = 0;

let egresos = [];
const ingresos = [];


total = document.getElementById("balanceTotal").innerHTML = "$ 0"; 
ingr = document.getElementById("totalIngresos").innerHTML = "$ 0";
egr = document.getElementById("totalEgresos").innerHTML = "$ 0";

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
    

    total = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;
    ingr = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
    egr = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
}
function calcularIngresos(){
    ingreso = obtenerValorIngresado();
    totalIngresos = totalIngresos + ingreso;
    totalBalance = totalBalance + ingreso;
}

function calcularEgresos(){
    egreso = obtenerValorIngresado();
    totalEgresos = totalEgresos + egreso;
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
    console.log(ingresos);
}

function agregarEgreso(){
    egresos.push(egreso);
    console.log(egresos);
}



    
