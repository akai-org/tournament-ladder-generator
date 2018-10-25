var teams=[];
//-----------------funkcja losujaca ---------------  B - tablica pomocnicza
function draw(teams) {
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
function main() {
	var data = document.getElementById("teams").value;
	data="Lech Poznan,Legia Warszawa, Wisła Kraków, Lechia Gdańsk";

	if(data.value != "")
	{
		var array = data.split(",");
	}

	for(var i=0;i<array.length;i++)
	{
		array[i] = array[i].trim();
	}

	array = draw(array);	//funkcja losująca

	
	var number = 1;
	var check = false;
	for(var i=0;i<array.length;i++)
	{
		teams[i] = {name:array[i],eliminated:"false",match:number};

		if(check==false)
		{
			check=true;
		}
		else
		{
			check=false;
			number++;
		}
	}
	
	draw_div(teams); // wywoalnie funkcji torzenie div-ow

}

function transition(stand,object,match)	//rozdzielanie do roznych funkcji
{
	lose(stand,object,match);
	win(stand,match);
}

function lose(stand,object,match)	// wyszarzanie przegranych
{
	object.disabled = true;
}

function win(stand,match)	//przechodzenie do kolejnego etapu
{

}

function draw_div(array){ 	// funkcja tworzenie div-------------
	let round_amount=Math.ceil(Math.log2(array.length)); // ilosc rund
	let container=document.getElementById("ladder");
	console.log(round_amount);
	let squad=0;
	for(let i=0;i<round_amount;i++){ // petla tworzaca diva mecz

//----------------div top--------------------------
		let newTop=document.createElement("div")
		newTop.setAttribute(`class` , `top`);

/* --------------------div bottom--------------------- */
		let newBottom=document.createElement("div")
		newBottom.setAttribute(`class` , `bottom`);

		let newMatch=document.createElement("div"); //toworzenie diva
		newMatch.setAttribute(`id` , `${"match_"}${i}`); // nadanie id meczu
		newMatch.setAttribute(`class` , `match`);
		container.appendChild(newMatch); //dodanie do glownego diva

		newMatch.appendChild(newTop);
		newMatch.appendChild(newBottom);


		let newTeam=document.createElement("div")
		newTeam.textContent=array[squad].name;
		newTeam.setAttribute(`id` , `${"team_"}${squad}` );
		newTeam.setAttribute(`class` , `team`);
		newTop.appendChild(newTeam);
		
		let identyfier = array[squad].name.split(' ').join('_');
		let game = array[squad].match;

		let btn = document.createElement("button");
		btn.setAttribute(`onclick`,`transition(${identyfier},this,${game})`);
		btn.setAttribute(`id`,identyfier);
		btn.textContent=array[i].name;
		newTop.appendChild(btn);
		
		
		squad++;

		let newTeam2=document.createElement("div");
		newTeam2.textContent=array[squad].name;
		newTeam2.setAttribute(`class` , `team`);
		newTeam2.setAttribute(`id` , `${"team_"}${squad}` );
		newBottom.appendChild(newTeam2);
		
		let identyfier2 = array[squad].name.split(' ').join('_');
		let game2 = array[squad].match;

		let btn2 = document.createElement("button");
		btn2.setAttribute(`id`,identyfier2);
		btn2.setAttribute(`onclick`,`transition(${identyfier2},this,${game2})`);
		btn2.textContent=array[squad].name;
		newBottom.appendChild(btn2);
		
		squad++;

		}
}
