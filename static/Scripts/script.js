
function makeRequest(method, url, headers = undefined, body = undefined) {
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
    let email= document.getElementById("email").value;
    let numBaños= document.getElementById("numBaños").value;
    let numHabitaciones= document.getElementById("numHabitaciones").value;
    let alimentos= document.getElementById("alimentos").value;
    let deberes=document.getElementById("deberes").value;
    let preferencias=document.getElementById("preferencias").value;

    let body={
        "email":email,
        "numBaños":numBaños,
        "numHabitaciones":numHabitaciones,
        "alimentos":alimentos,
        "deberes":deberes,
        "preferencias":preferencias
    }

    let headers=[{name:"Content-Type",value:"application/json"}];
    try{
        let response=await makeRequest("POST","/api/submit",headers,body);
        setRespose(JSON.parse(response));
    }catch(e){
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

