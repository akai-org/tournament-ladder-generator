
//-----------------funkcja losujaca ---------------  B - tablica pomocnicza
function losowanie(teams) {
	let B=[];
	B=teams;
	teams=[];
	console.log("rand");
	let position ;
	while (B.length!=0) {
	let position = Math.floor(Math.random()*B.length);
	let team=B[position];
	teams.push(team);
	B.splice(position, 1)
	}
	return teams;
}

//-
function zespoly() {
	var dane = document.getElementById("teams2").value;
	var pole = document.getElementById("dane");

	if(dane.value != "")
	{
		var array = dane.split(",");
	}

	for(var i=0;i<array.length;i++)
	{
		array[i] = array[i].trim();
	}

	array = losowanie(array);

	pole.innerHTML += "Drużyny:<br>";
	for(var i=0;i<array.length;i++)
	{
		pole.innerHTML += (i+1)+". "+array[i]+"<br/>";
	}
  	pole.innerHTML += "<br/><br/><br/>";

	var teams=[];
	var zmienna = 1;
	var sprawdzenie = false;
	for(var i=0;i<array.length;i++)
	{
		teams[i] = {name:array[i],eliminated:"false",match:zmienna};

		if(sprawdzenie==false)
		{
			sprawdzenie=true;
		}
		else
		{
			sprawdzenie=false;
			zmienna++;
		}
	}

	var arrayJSON = JSON.stringify(teams);
	console.log(arrayJSON);

	//odwoływanie sie do JSON
	pole.innerHTML += arrayJSON+"<br>";

	var par = JSON.parse(arrayJSON);
	pole.innerHTML += par[0].match;



	// testowanie
	pole.innerHTML += "<br>";

	for(var i=0;i<par.length;i++)
	{
		let nazwa = par[i].name.split(' ').join('_');
		let mecz = par[i].match;

		let btn = document.createElement("button");

		let id = document.createAttribute("id");
		id.value = nazwa;
		btn.setAttributeNode(id);

		let click = document.createAttribute("onclick");
		click.value = 'funkcje('+nazwa+',this,'+mecz+')';
		btn.setAttributeNode(click);

		let txt = document.createTextNode(par[i].name);
		btn.appendChild(txt);
		pole.appendChild(btn);

		//pole.innerHTML += '<button id='+nazwa+' onclick=funkcje('+nazwa+',this,'+mecz+')>'+par[i].name+'</button><br/>';




	}
	draw_div(par); // wywoalnie funkcji torzenie dov-ow

}

//rozdzielanie do roznych funkcji
function funkcje(name,object,match)
{
	eliminowanie(name,object);
	przechodzenie(name,match);
}

// wyszarzanie przegranych
function eliminowanie(name,object)
{
	object.disabled = true;
}

function przechodzenie(name,match)
{
	//tworzenie nowego przycisku w nowej "kolumnie"
}

function draw_div(array){ 	// funkcja tworzenie div-------------
				let IloscRund=Math.ceil(Math.log2(array.length)); // ilosc rund
				let kontener=document.getElementById("drabinka");
			console.log(IloscRund);
			let druzyna=0;
			for(let i=0 ; i<IloscRund;i++){ // petla tworzaca diva mecz

//----------------div top--------------------------
				let newTop=document.createElement("div")
				newTop.setAttribute(`class` , `top`);

/* --------------------div bottom--------------------- */
				let newBottom=document.createElement("div")
				newBottom.setAttribute(`class` , `bottom`);

				let newMatch=document.createElement("div"); //toworzenie diva
				newMatch.setAttribute(`id` , `${"match_"}${i}`); // nadanie id meczu
				newMatch.setAttribute(`class` , `match`);
				kontener.appendChild(newMatch); //dodanie do glownego diva

				newMatch.appendChild(newTop);
				newMatch.appendChild(newBottom);


						let newTeam=document.createElement("div")
						newTeam.textContent=array[druzyna].name;
						newTeam.setAttribute(`id` , `${"team_"}${druzyna}` );
						newTeam.setAttribute(`class` , `team`);
						newTop.appendChild(newTeam);

						druzyna++;

						let newTeam2=document.createElement("div");
						newTeam2.textContent=array[druzyna].name;
						newTeam2.setAttribute(`class` , `team`);
						newTeam2.setAttribute(`id` , `${"team_"}${druzyna}` );
						newBottom.appendChild(newTeam2);

						druzyna++;


				}

}
