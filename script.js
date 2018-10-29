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

	console.log(teams);
	draw_div(); // wywoalnie funkcji torzenie div-ow
	//proper_draw_div_full_perfect_clear();
}

function transition(object,game)	//rozdzielanie do roznych funkcji
{
	let win_id = object.id;
	let win_text = object.innerHTML;
	let lose_text;
	let index;

	for(let i=0;i<teams.length;i++)
	{
		if(teams[i].match == game)
		{
			if(teams[i].name != win_text)
			{
				lose_text = teams[i].name;
				index=i;
				break;
			}
		}
	}

	let lose_id = lose_text.split(' ').join('_');

	lose(lose_id,index);
	win(win_id,win_text);
}

function lose(id,index)	// wyszarzanie przegranych
{
	document.getElementById(id).setAttribute("disabled","disabled");
	teams[index].eliminated=true;
	//document.getElementById(id).classList.add("team.grayed-out");
}

function win(id,txt)	//przechodzenie do kolejnego etapu
{
	alert("Dalej przechodzi druzyna "+txt);
}

function draw_div(){ 	// funkcja tworzenie div-------------
	let round_amount=Math.ceil(Math.log2(teams.length)); // ilosc rund
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

//--------------------------------------------------------------------------------------------
		for(let i=0;i<2;i++)
		{
			let newTeam=document.createElement("div")
			newTeam.textContent=teams[squad].name;
			newTeam.setAttribute(`id` , `${"team_"}${squad}` );
			newTeam.setAttribute(`class` , `team`);

			let identyfier = teams[squad].name.split(' ').join('_');
			let game = teams[squad].match;

			let btn = document.createElement("button");
			btn.setAttribute(`id`,identyfier);
			btn.setAttribute(`onclick`,`transition(this,${game})`);
			btn.textContent=teams[squad].name;

			if(i==0)
			{
				newTop.appendChild(newTeam);
				newTop.appendChild(btn);
			}
			else
			{
				newBottom.appendChild(newTeam);
				newBottom.appendChild(btn);
			}
			squad++;
		}
	}
	draw_empty_div()
}


function draw_empty_div (){
	let round_amount=Math.ceil(Math.log2(teams.length)); // ilosc rund
	let container=document.getElementById("ladder");
	let matchId =	round_amount+1;
	round_amount=round_amount/2;
	//let teamId=teams.length;

	for(let i=0;i<round_amount;i++){ // petla tworzaca diva mecz

		let newTop=document.createElement("div");
		newTop.setAttribute(`class` , `top`);

/* --------------------div bottom--------------------- */
		let newBottom=document.createElement("div")
		newBottom.setAttribute(`class` , `bottom`);

		let newMatch=document.createElement("div"); //toworzenie diva
		newMatch.setAttribute(`id` , `${matchId}`); // nadanie id meczu
		newMatch.setAttribute(`class` , `match`);
		container.appendChild(newMatch); //dodanie do glownego diva

		newMatch.appendChild(newTop);
		newMatch.appendChild(newBottom);

		matchId++;
		round_amount/2;

 }
}

function proper_draw_div_full_perfect_clear(){
	let round_amount = Math.ceil(Math.log2(teams.length));
	let container=document.getElementById("ladder"); //główny div
	for(let i=0;i<round_amount;i++)
	{
		let newRound=document.createElement("div");
		newRound.classList.add("round");
		newRound.setAttribute(`id`,`round_${i}`)
		container.appendChild(newRound);


	}

}
