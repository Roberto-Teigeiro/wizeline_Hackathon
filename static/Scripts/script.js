

function makeRequest(method, url, headers = undefined, body = undefined) {
    const Url = "http://localhost:5000";
    
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open(method, Url + url);
		if (headers != undefined) {
			headers.forEach((item) => {
				xhr.setRequestHeader(item.name, item.value);
			});
		}
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr.response);
			} else {
				reject({
					status: this.status,
					response: xhr.response,
				});
			}
		};
		xhr.onerror = function () {
			reject({
				status: this.status,
				response: xhr.response,
			});
		};
		if (body == undefined) xhr.send();
		else {
			xhr.send(JSON.stringify(body));
		}
	});
}

async function sendForm(){

    let deberes= document.getElementById("deberes").value;
    let numHabitaciones= document.getElementById("numHabitaciones").value;
    let numBaños= document.getElementById("numBaños").value;
    let numPersonas=document.getElementById("numPersonas").value;
    let arr=[];


    for (let i=0; i<numPersonas; i++){
        let nombre=document.getElementById("nombre"+i).lastElementChild.value;
        let desayuno=document.getElementById("desayuno"+i).lastElementChild.value;
        let comida=document.getElementById("comida"+i).lastElementChild.value;
        let cena=document.getElementById("cena"+i).lastElementChild.value;
        let preferencias=document.getElementById("preferencias"+i).lastElementChild.value;
        if((nombre=="" || desayuno=="" || comida=="" || cena=="" || preferencias=="") || (nombre==null || desayuno==null || comida==null || cena==null || preferencias==null) || (nombre==NaN || desayuno==NaN || comida==NaN || cena==NaN || preferencias==NaN) || (nombre==undefined || desayuno==undefined || comida==undefined || cena==undefined || preferencias==undefined)) {
            alert("Por favor llena todos los campos");
            return;
        }
        arr.push({
            "nombre":nombre,
            "desayuno":desayuno,
            "comida":comida,
            "cena":cena,
            "preferencias":preferencias
        });
    }

    let body={
        "deberes":deberes,
        "numHabitaciones":numHabitaciones,
        "numBaños":numBaños,
        "numPersonas":numPersonas,
        "personas":arr
    }

    console.log(body);
    let headers=[{name:"Content-Type",value:"application/json"}];
    try{
        let response=await makeRequest("POST", "/form",headers,body);
        debugger
        console.log(response);
        
        let div=document.getElementById("divResultado");
        div.innerHTML=response;
        div.style.display="block";
        document.getElementById("divForm").style.display="none";

        

    }catch(e){
        console.log(e);
        alert(e.status + ": " + e.response);
    }
}


function setRespose(response){
    const padre=document.getElementById("historialMensajes");
    const div=document.createElement("div");
    div.classList.add("message");
    div.classList.add("one");
    div.innerHTML=response;
    padre.appendChild(div);
}

function nombres(){
    if(document.getElementById("numPersonas").value=="" || document.getElementById("numPersonas").value==0 || document.getElementById("numPersonas").value==null || document.getElementById("numPersonas").value==NaN || document.getElementById("numPersonas").value==undefined) return;
    let numPersonas= Number(document.getElementById("numPersonas").value);
    let padreNombre=document.getElementById("padreNombre");
    
    while(padreNombre.lastElementChild) {
        if(padreNombre.lastElementChild.id=="nombre") break;


        padreNombre.removeChild(padreNombre.lastElementChild);
        }

    for (let i=0; i<numPersonas; i++){
        let div=document.getElementById("nombre").cloneNode(true);
        div.id="nombre"+i;
        div.firstElementChild.firstElementChild.innerHTML="Nombre "+(i+1)+":";
        div.lastElementChild.onchange=()=>{setNombres(div)};
        div.setAttribute("posiscion",i);
        div.style.display="block";
        padreNombre.appendChild(div);
    }

    let padreDesayuno=document.getElementById("padreDesayuno");

    while(padreDesayuno.lastElementChild) {
        if(padreDesayuno.lastElementChild.id=="desayuno") break;


        padreDesayuno.removeChild(padreDesayuno.lastElementChild);
        }

    for (let i=0; i<numPersonas; i++){
        let div=document.getElementById("desayuno").cloneNode(true);
        div.id="desayuno"+i;
        div.setAttribute("posiscion",i);
        div.style.display="block";
        padreDesayuno.appendChild(div);
    }

    let padreComida=document.getElementById("padreComida");

    while(padreComida.lastElementChild) {
        if(padreComida.lastElementChild.id=="comida") break;


        padreComida.removeChild(padreComida.lastElementChild);
        }

    for (let i=0; i<numPersonas; i++){
        let div=document.getElementById("comida").cloneNode(true);
        div.id="comida"+i;
        div.setAttribute("posiscion",i);
        div.style.display="block";
        padreComida.appendChild(div);
    }

    let padreCena=document.getElementById("padreCena");

    while(padreCena.lastElementChild) {
        if(padreCena.lastElementChild.id=="cena") break;


        padreCena.removeChild(padreCena.lastElementChild);
        }

    for (let i=0; i<numPersonas; i++){
        let div=document.getElementById("cena").cloneNode(true);
        div.id="cena"+i;
        div.setAttribute("posiscion",i);
        div.style.display="block";
        padreCena.appendChild(div);
    }

    let padrePreferencias=document.getElementById("padrePreferencias");

    while(padrePreferencias.lastElementChild) {
        if(padrePreferencias.lastElementChild.id=="preferencias") break;


        padrePreferencias.removeChild(padrePreferencias.lastElementChild);
        }

    for (let i=0; i<numPersonas; i++){
        let div=document.getElementById("preferencias").cloneNode(true);
        div.id="preferencias"+i;
        div.setAttribute("posiscion",i);
        div.style.display="block";
        padrePreferencias.appendChild(div);
    }

    document.getElementById("submit").disabled = false;;
}

function setNombres(div){
    let posiscion=div.getAttribute("posiscion");
    let divDesayuno=document.getElementById("desayuno"+posiscion);
    let divComida=document.getElementById("comida"+posiscion);
    let divCena=document.getElementById("cena"+posiscion);
    let divPreferencias=document.getElementById("preferencias"+posiscion);

    divDesayuno.firstElementChild.firstElementChild.innerHTML="Desayuno de "+(div.lastElementChild.value)+":";
    divComida.firstElementChild.firstElementChild.innerHTML="Comida de "+(div.lastElementChild.value)+":";
    divCena.firstElementChild.firstElementChild.innerHTML="Cena de "+(div.lastElementChild.value)+":";
    divPreferencias.firstElementChild.firstElementChild.innerHTML="Preferencias de "+(div.lastElementChild.value)+":";
}

function goFrom() {
    window.location.href = URL +"/form";
}
