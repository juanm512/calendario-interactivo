let titleYearText = document.getElementById('titleYearText');

let titleMonthText = document.getElementById('titleMonthText');
let titleMonthFoward = document.getElementById('titleMonthFoward')
let titleMonthBackward = document.getElementById('titleMonthBackward')

let mesesDelAnio= ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

//Obtengo mes y anio actuales, luego actualizo
let dateObj = new Date();
let actualMonth = dateObj.getMonth();
let actualYear = dateObj.getFullYear();
actualizarMes(actualMonth);
actualizarAnio(actualYear);
crearUlDias(actualMonth,actualYear);
crearLiDias(actualMonth,actualYear);

//cambio el titulo del mes y animation
//a la vez genero los nuevos dias que se necesitan
titleMonthFoward.addEventListener('click', () =>{
	let indiceMonth = mesesDelAnio.findIndex(element => element == (descapitalize(titleMonthText.innerText)));
	let indiceYear = parseInt(titleYearText.innerText);
	actualizarMes( indiceMonth + 1 );
	console.log(indiceMonth+1);
	
	if(document.getElementById(`contenedor-dias-${indiceMonth+1}-${indiceYear}`)){
		document.getElementById(`contenedor-dias-${indiceMonth+1}-${indiceYear}`).classList.add("w3-noshow");
	}
	if(indiceMonth == 11){
		indiceMonth = indiceMonth-12;
		indiceYear += 1;
	}
	//mostrando ul
		if(document.getElementById(`contenedor-dias-${indiceMonth+2}-${indiceYear}`)){
			document.getElementById(`contenedor-dias-${indiceMonth+2}-${indiceYear}`).classList.remove("w3-noshow");
		}else{
			crearUlDias(indiceMonth+1,indiceYear);
			crearLiDias(indiceMonth+1,indiceYear);
		}


});
titleMonthBackward.addEventListener('click', () =>{
	let indiceMonth = mesesDelAnio.findIndex(element => element == (descapitalize(titleMonthText.innerText)));
	let indiceYear = parseInt(titleYearText.innerText);
	actualizarMes( indiceMonth - 1 );
	console.log(indiceMonth-1);

	if(document.getElementById(`contenedor-dias-${indiceMonth+1}-${indiceYear}`)){
		document.getElementById(`contenedor-dias-${indiceMonth+1}-${indiceYear}`).classList.add("w3-noshow");
	}

	if(indiceMonth == 0){
		indiceMonth = indiceMonth+12;
		indiceYear -= 1;
	}
	//mostrando ul
		if(document.getElementById(`contenedor-dias-${indiceMonth}-${indiceYear}`)){
			document.getElementById(`contenedor-dias-${indiceMonth}-${indiceYear}`).classList.remove("w3-noshow");
		}else{
			crearUlDias(indiceMonth-1,indiceYear);
			crearLiDias(indiceMonth-1,indiceYear);
		}
});


//creacion de los dias de un mes
function crearUlDias(mes,anio) {
	document.getElementById("contenedor_dias").innerHTML= document.getElementById("contenedor_dias").innerHTML + `
											<ul id="contenedor-dias-${mes+1}-${anio}" class="w3-ul w3-cell-row">
											</ul>
										`
}
//creo la lista de dias para cada mes
//FALTA HACER QUE TENGA CORRELACION A CADA MES, SI TIENE 31 O 30 O 28/29 DIAS
function crearLiDias(mes,anio) {
	for(let i=0;i<30;i++){
		let li = document.createElement('li');
		li.classList.add("w3-col","s12","m3","l2");
		li.innerHTML = `
						<div id="scene-dias-${i+1}-${mes+1}-${anio}" class="scene scene--card">
							<div id="card-dias-${i+1}-${mes+1}-${anio}" class="card w3-col s12 m12 l12 w3-hover-shadow scale-up-center" onclick="flip('card-dias-${i+1}-${mes+1}-${anio}')">
								<div id="front-face-dias-${i+1}-${mes+1}-${anio}" class="card__face1 card__face--front_nohave">
									<p class="w3-col s12 m12 l12 w3-xxlarge w3-center">${i+1}<a class="w3-col s12 m12 l12 w3-small w3-center">más detalles</a></p>
								</div>
								<div id="back-face-dias-${i+1}-${mes+1}-${anio}" class="card__face2 card__face--back">
									<p id="back-face-text-dias-${i+1}-${mes+1}-${anio}" class="w3-col s12 m12 l12 w3-xxlarge w3-center w3-row"><i class="fas fa-times-circle w3-margin-top"></i><button id="back-face-button-dias-${i+1}-${mes+1}-${anio}" onclick="addDayTurn('card-dias-${i+1}-${mes+1}-${anio}')" class="w3-button w3-col s12 m12 l12 w3-small w3-center w3-black" style='margin-top:32px'>Agregar</button></p>
								</div>
							</div>
						</div>
						`
		li.setAttribute("id",`li-dias-${i+1}-${mes+1}-${anio}`);
		document.getElementById(`contenedor-dias-${mes+1}-${anio}`).appendChild(li);
	}
}


//funcion a la que llaman las tarjetas de los dias
function flip(a){
	document.getElementById(`${a}`).classList.toggle('is-flipped');
}

//funcion a la que llama el boton de atras de las tarjetas de los dias
//sirve para hacer aparecer el cartel para agregar mediante inputs turnos o le que fuere en dicho dia que se presionó
function addDayTurn(idButtonDays){
	let day = idButtonDays.replace('card-dias-','').split('-')[0];
	let monthIndex = parseInt(idButtonDays.replace('card-dias-','').split('-')[1]) - 1;
	let year = idButtonDays.replace('card-dias-','').split('-')[2];

	if(!document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}`) ){
		//creo la ventana en el LI del dia correspondiente
		document.getElementById(`li-dias-${day}-${monthIndex+1}-${year}`).innerHTML = document.getElementById(`li-dias-${day}-${monthIndex+1}-${year}`).innerHTML + `
			<div id="daysAddTurn-${day}-${monthIndex+1}-${year}" class="w3-hide w3-display-middle w3-border w3-border-black w3-row" style="position: fixed;overflow-x: hidden;z-index:1000;width:100%;height:100%;background-color: #0000007d;">
				<ul id="daysAddTurn-${day}-${monthIndex+1}-${year}-Ul" class="w3-ul w3-col s12 m12 l12 w3-row w3-white w3-round-medium w3-margin-top128" style="float: none;display: block;margin: auto;;overflow-y:scroll;width:60%;height:60%;">
					<li id="daysAddTurn-${day}-${monthIndex+1}-${year}-Title" class="w3-col s12 m12 l12 w3-medium w3-center w3-xlarge w3-wide">${day} de ${mesesDelAnio[monthIndex]} del ${year}</li>
					<li class="w3-col s12 m12 l12 w3-medium w3-align-left"><input id="daysAddTurn-${day}-${monthIndex+1}-${year}-Input" class="w3-col s12 m12 l12 w3-bottombar w3-input w3-border-black" type="text" placeholder="Enter your day turn descirption"></li>
					<li id="daysAddTurn-${day}-${monthIndex+1}-${year}-AddButton" class="w3-col s12 m12 l12 w3-medium w3-align-left w3-row"><button class="w3-col s12 m4 l2 w3-button w3-dark-gray w3-round-medium">Agregar</button></li>
				</ul>
				<button id="daysAddTurn-${day}-${monthIndex+1}-${year}-Close" onclick="addDayTurnClose('card-dias-${day}-${monthIndex+1}-${year}')" class="w3-button w3-col s12 m6 l4 w3-round-medium w3-small w3-center w3-bottombar w3-border-white w3-black w3-margin-top" style='float: none;display: block;margin: auto;'>Guardar y cerrar</button>
			</div>
			`
	}
	//muestro la ventana
	document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}`).classList.toggle('w3-hide');

	//funcion del boton agregar del input
	document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}-AddButton`).addEventListener('click', function(){
		let li = document.createElement('li');
		li.classList.add("w3-col","s12","m12","l12");
		li.setAttribute("id",`daysAddTurn-${day}-${monthIndex+1}-${year}-Li`);
		if(document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}-Input`).value!=""){
			li.innerText = document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}-Input`).value;
			document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}-Ul`).appendChild(li);
			document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}-Input`).value='';
			document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}-Input`).placeholder="Enter your day turn descirption"
		}else{
			document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}-Input`).placeholder="Por favor agregá algo"
		}
	});
}


function addDayTurnClose (idButtonDays) {
	let day = idButtonDays.replace('card-dias-','').split('-')[0];
	let monthIndex = parseInt(idButtonDays.replace('card-dias-','').split('-')[1]) - 1;
	let year = idButtonDays.replace('card-dias-','').split('-')[2];

	console.log( document.querySelectorAll(`li[id="daysAddTurn-${day}-${monthIndex+1}-${year}-Li"]`).length!=0 )
	if( document.querySelectorAll(`li[id="daysAddTurn-${day}-${monthIndex+1}-${year}-Li"]`).length!=0 ){
		let arrayLi = document.querySelectorAll(`li[id="daysAddTurn-${day}-${monthIndex+1}-${year}-Li"]`);
		console.log(arrayLi)
		let htmlToAdd = `<ul class="w3-ul w3-row">`;
		let i=0;
		while (i < arrayLi.length  &&  arrayLi.length >0 && i<=3)  {
			htmlToAdd += `<li style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;" class="w3-col s12 m12 l12 w3-medium w3-align-left">${arrayLi[i].innerText}</li>`;
			i++;
		}
		htmlToAdd += `<button id="back-face-button-dias-${day}-${monthIndex+1}-${year}" onclick="addDayTurn('card-dias-${day}-${monthIndex+1}-${year}')" class="w3-button w3-col s12 m12 l12 w3-small w3-center w3-black" style='margin-top:10px'>Agregar</button></ul>`
		document.getElementById(`back-face-dias-${day}-${monthIndex+1}-${year}`).innerHTML = htmlToAdd;
		document.getElementById(`front-face-dias-${day}-${monthIndex+1}-${year}`).classList.remove('card__face--front_nohave');
		document.getElementById(`front-face-dias-${day}-${monthIndex+1}-${year}`).classList.add('card__face--front');
	}
	document.getElementById(`daysAddTurn-${day}-${monthIndex+1}-${year}`).classList.toggle('w3-hide');
}









//Actualizo mes del titulo de la pagina
function actualizarMes(indexMonth) {
	if(indexMonth >= 12){
		indexMonth = indexMonth - 12;
		actualizarAnio( parseInt(titleYearText.innerText) + 1  )
	}else if(indexMonth < 0){
		indexMonth = indexMonth + 12;
		actualizarAnio( parseInt(titleYearText.innerText) - 1  )
	}
	titleMonthText.innerText = capitalize(mesesDelAnio[indexMonth]);
}


//Actualizo anio del titulo de la pagina
function actualizarAnio(Year) {
	
	titleYearText.innerText = Year; 
}



//funcion para haccer mayuscula la primer letra de una palabra
function capitalize(word) {
	return word[0].toUpperCase() + word.slice(1);
  }
  
//funcion para haccer minuscula la primer letra de una palabra
function descapitalize(word) {
	return word[0].toLowerCase() + word.slice(1);
  }
