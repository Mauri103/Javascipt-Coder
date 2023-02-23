let egresos = JSON.parse(localStorage.getItem("egresosStorage")) || [];
let ingresos = JSON.parse(localStorage.getItem("ingresosStorage")) || [];
let valorIngreso = ingresos.reduce((contador, array) => contador + array.valor, 0);
let valorEgreso = egresos.reduce((contador, array) => contador + array.valor, 0);
let totalBalance = valorIngreso - valorEgreso;
let idEgresoStorage = localStorage.getItem("idEgreso") || localStorage.setItem("idEgreso",2);
let idIngresoStorage = localStorage.getItem("idIngreso") || localStorage.setItem("idIngreso",2);


ingreso = document.getElementById("totalIngresos").innerHTML = "$ " + valorIngreso;
egreso = document.getElementById("totalEgresos").innerHTML = "$ " + valorEgreso;
balance = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;

function cargarHeader(){
    ingreso = document.getElementById("totalIngresos").innerHTML = "$ " + valorIngreso;
    egreso = document.getElementById("totalEgresos").innerHTML = "$ " + valorEgreso;
    balance = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;
}

const traerItems = async () => {
    const respuesta = await fetch("api/app.json")
    const data = await respuesta.json()
    data.ingresos.forEach(ingreso => {
        ingresos.push(new Ingreso(ingreso.id, ingreso.descripcion, ingreso.valor))
    })
    data.egresos.forEach(egreso => {
        egresos.push(new Egreso(egreso.id, egreso.descripcion, egreso.valor))
    })
    localStorage.setItem("ingresosStorage", JSON.stringify(ingresos));
    localStorage.setItem("egresosStorage", JSON.stringify(egresos));
    cargarEgresos();
    cargarIngresos();
    cargarHeader();
}

if (egresos.length == 0 && ingresos.length == 0) {
    Swal.fire({
        title: 'Bienvenido a la aplicación de gastos',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        confirmButtonText: '¡Gracias!'
    });
    traerItems();

}

let aceptar = document.getElementById("ingresar");
aceptar.addEventListener('click', realizarConteo);


function Ingreso(id, descripcion, valor) {
    this.id = id;
    this.descripcion = descripcion;
    this.valor = valor;
}

function Egreso(id, descripcion, valor) {
    this.id = id;
    this.descripcion = descripcion;
    this.valor = valor;
}

function realizarConteo() {
    event.preventDefault();
    var tipo = document.getElementById("tipoTransaccion").value;
    if (tipo === "Ingreso") {
        calcularIngresos();
        let idIngr = localStorage.getItem("idIngreso");
        ingreso = new Ingreso(idIngr, obtenerDescripcion(), obtenerValorIngresado());
        idIngr++;
        let idIngresoStorage = localStorage.setItem("idIngreso", idIngr);
        agregarIngreso();
        window.location.reload();

    } else {
        calcularEgresos();
        let idEgr = localStorage.getItem("idEgreso");
        egreso = new Egreso(idEgr, obtenerDescripcion(), obtenerValorIngresado());
        idEgr++;
        let idEgresoStorage = localStorage.setItem("idEgreso", idEgr);
        agregarEgreso();
        window.location.reload();
    }

    balance = document.getElementById("balanceTotal").innerHTML = "$ " + totalBalance;
    mostrarIngresos();
    mostrarEgresos();
}

function calcularIngresos() {
    ingreso = obtenerValorIngresado();
    totalBalance = totalBalance + ingreso;
}

function calcularEgresos() {
    egreso = obtenerValorIngresado();
    totalBalance = totalBalance - egreso;
}

function obtenerValorIngresado() {
    valor = parseFloat(document.getElementById("valorIngresado").value);
    return valor;
}

function obtenerDescripcion() {
    descripcion = document.getElementById("descripcionIngreso").value;
    return descripcion;
}

function agregarIngreso() {
    ingresos.push(ingreso);
    ingresosJSON = JSON.stringify(ingresos);
    localStorage.setItem("ingresosStorage", ingresosJSON);
}

function agregarEgreso() {
    egresos.push(egreso);
    egresosJSON = JSON.stringify(egresos);
    localStorage.setItem("egresosStorage", egresosJSON);

}


function mostrarIngresos() {
    let ingrJSON = localStorage.getItem("ingresosStorage");
    if (ingrJSON == null) {
        ingreso = document.getElementById("totalIngresos").innerHTML = "$ 0";
    } else {
        let ingr = JSON.parse(ingrJSON);
        let totalIngresos = ingr.reduce((contador, array) => contador + array.valor, 0);
        ingreso = document.getElementById("totalIngresos").innerHTML = "$ " + totalIngresos;
    }
}

function mostrarEgresos() {
    let egrJSON = localStorage.getItem("egresosStorage");
    if (egrJSON == null) {
        egreso = document.getElementById("totalEgresos").innerHTML = "$ 0";
    } else {
        let egr = JSON.parse(egrJSON);
        let totalEgresos = egr.reduce((contador, array) => contador + array.valor, 0);
        egreso = document.getElementById("totalEgresos").innerHTML = "$ " + totalEgresos;
    }
}

if (ingresos != null) {
    cargarIngresos();
};

function cargarIngresos() {
    ingresos.forEach((item) => {
        let table = document.getElementById("itemsIngresos");
        let row = table.insertRow(1);
        let descripcion = row.insertCell(0);
        let valor = row.insertCell(1);
        let acciones = row.insertCell(2);
        descripcion.innerHTML = item.descripcion;
        valor.innerHTML = item.valor;
        acciones.innerHTML = '<img id="deleteItem" onclick="eliminarIngreso(' + item.id + ')" src="insumos/trash.png" alt="">'
    });
}


if (egresos != null) {
    cargarEgresos();
}

function cargarEgresos() {
    egresos.forEach((item) => {
        let table = document.getElementById("itemsEgresos");
        let row = table.insertRow(1);
        let descripcion = row.insertCell(0);
        let valor = row.insertCell(1);
        let acciones = row.insertCell(2);
        descripcion.innerHTML = item.descripcion;
        valor.innerHTML = item.valor;
        acciones.innerHTML = '<img id="deleteItem" onclick="eliminarEgreso(' + item.id + ')" src="insumos/trash.png" alt="">'
    });
}

function eliminarIngreso(id) {
    let idEliminar = ingresos.filter((item) => item.id == id);
    ingresos.splice(idEliminar, 1);
    localStorage.setItem("ingresosStorage", JSON.stringify(ingresos));
    window.location.reload();
}

function eliminarEgreso(id) {
    let idEliminar = egresos.filter((item) => item.id == id);
    egresos.splice(idEliminar, 1);
    localStorage.setItem("egresosStorage", JSON.stringify(egresos));
    window.location.reload();
}

















