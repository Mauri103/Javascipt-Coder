totalBalance = 0;
totalIngresos = 0;
totalEgresos = 0;

total = document.getElementById("balanceTotal").innerHTML = "$ 0"; 
ingresos = document.getElementById("totalIngresos").innerHTML = "$ 0";
egresos = document.getElementById("totalEgresos").innerHTML = "$ 0";

function realizarConteo(){
    event.preventDefault();
    var tipo = document.getElementById("tipoTransaccion").value;
    if(tipo === "Ingreso"){
        let ingreso = parseFloat(document.getElementById("valorIngresado").value);
        console.log(ingreso);
        totalIngresos = totalIngresos + ingreso;
        totalBalance = totalBalance + ingreso;
        console.log(totalBalance);
    }else{
        let egreso = parseFloat(document.getElementById("valorIngresado").value);
        console.log(egreso);
        totalEgresos = totalEgresos + egreso;
        totalBalance = totalBalance - egreso;
        console.log(totalBalance);
    } 
    

    total = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;
    ingresos = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
    egresos = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
}


    
