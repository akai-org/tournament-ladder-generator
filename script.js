var teams=[];

function main() {	// główna funkcja
	var data = document.getElementById("teams").value;
	data="Lech Poznan,Legia Warszawa, Wisła Kraków, Lechia Gdańsk, Pogoń Szczecin, Arka Gdynia, Zaglebie Lublin, Gornik Zabrze";

	if(data.value != "")
	{
		var array = data.split(",");
	}

	for(var i=0;i<array.length;i++)
	{
		array[i] = array[i].trim();
	}

	array = draw(array);

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
	draw_div(); 
}

function draw(teams) {	//funkcja losujaca
	let B=[];
	B=teams;
	teams=[];
	let position ;
	while (B.length!=0) {
		let position = Math.floor(Math.random()*B.length);
		let team=B[position];
		teams.push(team);
		B.splice(position, 1)
	}
	return teams;
}

function transition(object,game)	//rozdzielanie do roznych funkcji
{
	let win_id = object.id;
	let win_text = object.getAttribute("data-name");
	console.log("game: "+game);
	
	let lose_text;
	let lose_i,win_i;
	for(let i=0;i<teams.length;i++)
	{
		if(teams[i].match == game)
		{
			if(teams[i].name != win_text)
			{
				lose_text = teams[i].name;
				lose_i=i;
			}
			else
			{
				win_i=i;
			}
		}
	}
	console.log("Druzyna ktora przegrala: "+lose_text);
	let lose_id = lose_text.split(' ').join('_');
	//console.log("Index druzyny ktora przegrala: "+lose_i);
	//console.log("Index druzyny ktora wygrala: "+win_i);
	console.log(object);
	
	lose(lose_id,lose_i);
	win(win_id,win_text,game,win_i);
}

function lose(id,index)	// wyszarzanie przegranych
{
	let lose = document.getElementById(id);
	lose.setAttribute("disabled","disabled");
	lose.innerHTML = "&#x2613";
	teams[index].eliminated=true;
	lose.classList.add("team-grayed-out");
}

function win(id,txt,game,index)	//przechodzenie do kolejnego etapu
{
	let win = document.getElementById(id);
	win.innerHTML="&#x2714";
	win.removeAttribute("id");
	let sum=eliminated_check();
	
	if(sum!=1)
	{
		let p1 = next_round_number(game); // numer potrzebny do identyfikacji meczu
		let p2 = next_round_tb(game);// sprawdza czy ma byc top czy bottom
		let p = `${p2}_${p1}`;
		console.log("p1: "+p1);
		let div = document.getElementById(p).children;
		
		div[0].innerHTML = txt; //div
		div[1].id = id; //przycisk
		div[1].setAttribute(`onclick`,`transition(this,${p1+1})`);
		div[1].setAttribute(`data-name`,`${txt}`)
		
		teams[index].match=p1+1;
	}
	else
	{
		alert("Turniej wygrała "+txt);
	}
}

function next_round_number(game)
{
	//console.log(teams.length/2+game-1-temp_array(game-1));
	return teams.length/2+game-1-temp_array(game-1); //wzor: ilsc druzyn + index meczu - watrosc tablicy[index meczu]
}

function temp_array(value) 	//określenie ile miejsc ma sie przesuwać dana "druzyna"
{
	let a=[];
	a[0]=0;
	let num=1;
	let check=false;
	for(let i=1;i<value+1;i++)
	{
		a[i]=num;
		if(check==false)
		{
			check=true;
		}
		else
		{
			check=false;
			num++;
		}
	}
	
	return a[value];
}

function next_round_tb(game) 	//okreslanie czy dana druznyna ma przejsc do top czy bottom
{
	if(game%2!=0)
		return 'top';
	else
		return 'bottom';
}

function eliminated_check()		//funkcja sprawdzajaca ile druzyn zostalo
{
	let sum=0;
	for(let i=0;i<teams.length;i++)
	{
		if(teams[i].eliminated == 'false')
			sum++;
	}
	return sum;
}

function draw_div(){	// funkcja torzenia div-ow
	let round_amount = Math.ceil(Math.log2(teams.length));
	let container=document.getElementById("ladder"); 	//główny div
	let squad=0;
	let teams_amount = teams.length/2;	//liczba meczy w danej rundzie
	let mnr=0; 	//numer meczu
	for(let i=0;i<round_amount;i++)
	{
		let newRound=document.createElement("div");
		newRound.classList.add("round");
		newRound.setAttribute(`id`,`round_${i}`)
		container.appendChild(newRound);
		
		for(let i=0;i<teams_amount;i++)
		{
			let newTop=document.createElement("div");	//tworzenie	diva top
			newTop.setAttribute(`class` , `top`);
			newTop.setAttribute(`id`,`top_${mnr}`);
			
			let newBottom=document.createElement("div")		//tworzenie diva bottom
			newBottom.setAttribute(`class` , `bottom`);
			newBottom.setAttribute(`id`,`bottom_${mnr}`);

			let newMatch=document.createElement("div"); 	//tworzenie diva meczu
			newMatch.setAttribute(`id` , `${"match_"}${mnr}`); 	
			newMatch.setAttribute(`class` , `match`);
			container.appendChild(newMatch); 	//dodanie do glownego diva

			newMatch.appendChild(newTop);
			newMatch.appendChild(newBottom);
			newRound.appendChild(newMatch);
			
			for(let j=0;j<2;j++)
			{
				let newTeam=document.createElement("div");		//tworzenie diva druzyny
				newTeam.setAttribute(`class` , `team`);
				
				let btn = document.createElement("button");		//tworzenie przycisku druzyny
				btn.textContent="-";
				
				if(squad<teams.length)
				{
					newTeam.textContent=teams[squad].name;
					//newTeam.setAttribute(`id` , `${"team_"}${squad}` );
					
					let identyfier = teams[squad].name.split(' ').join('_');
					let game = teams[squad].match;
					
					btn.setAttribute(`onclick`,`transition(this,${game})`);
					btn.setAttribute(`id`,identyfier);
					btn.setAttribute(`data-name`,`${teams[squad].name}`);
				}

				if(j==0)	//przypisywanie do top albo bottom
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
			mnr++;
		}
		teams_amount=teams_amount/2;
	}
}