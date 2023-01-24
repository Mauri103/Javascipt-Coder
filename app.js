totalBalance = 0;
totalIngresos = 0;
totalEgresos = 0;

let egresos = [];
const ingresos = [];


total = document.getElementById("balanceTotal").innerHTML = "$ 0"; 
ingresos = document.getElementById("totalIngresos").innerHTML = "$ 0";
egresos = document.getElementById("totalEgresos").innerHTML = "$ 0";

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
        console.log(ingreso);
        
            
    }else{
        calcularEgresos();
        egreso = new Egreso(obtenerDescripcion(), obtenerValorIngresado());
        console.log(egreso);
    } 
    

    total = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;
    ingresos = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
    egresos = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
}

function obtenerDescripcion(){
    descripcion = document.getElementById("descripcionIngreso").value;
    return descripcion;
}

function obtenerValorIngresado(){
    valor = parseFloat(document.getElementById("valorIngresado").value);
    return valor;
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



    
