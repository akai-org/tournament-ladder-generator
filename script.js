const teams = [];
let round_amount;

function main() {
  // główna funkcja
  let data = document.getElementById("teams").value; //dla ułatwienia wprowadzania danych na razie const zmienione na let
  //data =
  //  "Lech Poznan,Legia Warszawa, Wisła Kraków, Lechia Gdańsk, Pogoń Szczecin, Arka Gdynia, Zaglebie Lublin, Gornik Zabrze";
  data =
    "Lech Poznan, Legia Warszawa, Wisła Kraków, Lechia Gdańsk, Pogoń Szczecin";

  document.getElementById("start").style.display = "none";

  let array = data.split(",").map((e, i, a) => {
    return e.trim();
  });

  array = draw(array); //wywala blad gdy array jest const

  /*let number = 1;
  let check = false;

  for (let i = 0; i < array.length; i++) {
    teams[i] = { name: array[i], eliminated: "false", round: 1, match: number };

    if (check == false) {
      check = true;
    } else {
      check = false;
      number++;
    }
  }*/
  fix_teams(array);
  round_amount = Math.ceil(Math.log2(teams.length));

  draw_div();
  insert();
  console.log(teams);
}

function draw(teams) {
  //funkcja losujaca
  const B = teams;
  teams = [];
  while (B.length != 0) {
    const position = Math.floor(Math.random() * B.length);
    const team = B[position];
    teams.push(team);
    B.splice(position, 1);
  }
  return teams;
}

<<<<<<< HEAD
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
=======
function transition(object, game) {
  //rozdzielanie do roznych funkcji
  const win_id = object.id;
  const win_text = object.getAttribute("data-name");
  console.log("game: " + game);
  let lose_text;
  let lose_i, win_i;

  for (let i = 0; i < teams.length; i++) {
    if (teams[i].match == game) {
      if (teams[i].name != win_text) {
        lose_text = teams[i].name;
        lose_i = i;
      } else {
        win_i = i;
      }
    }
  }

  console.log("Druzyna ktora przegrala: " + lose_text);
  const lose_id = lose_text.split(" ").join("_");
  //console.log("Index druzyny ktora przegrala: "+lose_i);
  //console.log("Index druzyny ktora wygrala: "+win_i);
  console.log(object);

  lose(lose_id, lose_i);
  win(win_id, win_text, game, win_i);
}

function lose(id, index) {
  // wyszarzanie przegranych
  const lose = document.getElementById(id);

  lose.setAttribute("disabled", "disabled");
  lose.innerHTML = "&#x2613";
  teams[index].eliminated = true;
  lose.classList.add("team-grayed-out");
}

function win(id, txt, game, index) {
  //przechodzenie do kolejnego etapu
  const win = document.getElementById(id);
  const sum = eliminated_check();

  win.innerHTML = "&#x2714";
  win.removeAttribute("id");

  if (sum != 1) {
    const p1 = next_round_number(game); // numer potrzebny do identyfikacji meczu
    /* const p2 = next_round_tb(game); // sprawdza czy ma byc top czy bottom
    const p = `${p2}_${p1}`;
    const div = document.getElementById(p).children;
    console.log("p1: " + p1);
    console.log("p2: " + p2);
    */
    let p = `top_${p1}`;

    if (check_empty(p) == 1) {
      p = `bottom_${p1}`;
    }

    const div = document.getElementById(p).children;
    div[0].innerHTML = txt; //div
    div[1].id = id; //przycisk
    div[1].setAttribute(`onclick`, `transition(this,${p1})`);
    div[1].setAttribute(`data-name`, `${txt}`);
    teams[index].match = p1;
  } else {
    alert("Turniej wygrała " + txt);
  }
}

function check_empty(place) {
  const d = document.getElementById(place).children;
  if (d[0].innerHTML != "") return 1;
}

function next_round_number(game) {
  return teams_in_round(1) / 2 + game - temp_array(game - 1); //wzor: ilsc druzyn + index meczu - watrosc tablicy[index meczu]
}

function temp_array(value) {
  //określenie ile miejsc ma sie przesuwać dana "druzyna"
  const a = [];
  a[0] = 0;
  let num = 1;
  let check = false;
  for (let i = 1; i < value + 1; i++) {
    a[i] = num;
    if (check == false) {
      check = true;
    } else {
      check = false;
      num++;
    }
  }

  return a[value];
>>>>>>> origin/Daniel
}
/*
function next_round_tb(game) {
  //okreslanie czy dana druznyna ma przejsc do top czy bottom
  if (game % 2 != 0) return "top";
  else return "bottom";
}
*/
function eliminated_check() {
  //funkcja sprawdzajaca ile druzyn zostalo
  let sum = 0;
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].eliminated == "false") sum++;
  }
  return sum;
}

function draw_div() {
  // funkcja torzenia div-ow
  const container = document.getElementById("ladder"); //główny div
  let squad = 0;
  let mnr = 1; //numer meczu
  const c = special_round();

  if (c == 0) round_amount += 1;

  for (let i = 0; i < round_amount; i++) {
    const newRound = document.createElement("div");
    newRound.classList.add("round");
    newRound.setAttribute(`id`, `round_${i}`);
    container.appendChild(newRound);
    const l = teams.length - c;

    if (i == 0) {
      if (c != 0) {
        teams_amount = l;
      } else {
        teams_amount = 0;
      }
    } else if (i == 1) {
      if (c != 0) {
        teams_amount = (teams.length - l) / 2;
      } else {
        teams_amount = teams.length / 2;
      }
    }

    for (let i = 0; i < teams_amount; i++) {
      const newTop = document.createElement("div"); //tworzenie	diva top
      newTop.setAttribute(`class`, `top`);
      newTop.setAttribute(`id`, `top_${mnr}`);

      const newBottom = document.createElement("div"); //tworzenie diva bottom
      newBottom.setAttribute(`class`, `bottom`);
      newBottom.setAttribute(`id`, `bottom_${mnr}`);

<<<<<<< HEAD
function transition(object,game)	//rozdzielanie do roznych funkcji
{
	let win_id = object.id;
	let win_text = object.innerHTML;
	let lose_text;

	for(let i=0;i<teams.length;i++)
	{
		if(teams[i].match == game)
		{
			if(teams[i].name != win_text)
			{
				lose_text = teams[i].name;
			}
		}
	}

	let lose_id = lose_text.split(' ').join('_');


	lose(lose_id);
	win(win_id,win_text);
=======
      const newMatch = document.createElement("div"); //tworzenie diva meczu
      newMatch.setAttribute(`id`, `${"match_"}${mnr}`);
      newMatch.setAttribute(`class`, `match`);
      container.appendChild(newMatch); //dodanie do glownego diva

      newMatch.appendChild(newTop);
      newMatch.appendChild(newBottom);
      newRound.appendChild(newMatch);

      for (let j = 0; j < 2; j++) {
        const newTeam = document.createElement("div"); //tworzenie diva druzyny
        newTeam.setAttribute(`class`, `team`);

        const btn = document.createElement("button"); //tworzenie przycisku druzyny
        btn.textContent = "-";

        if (j == 0) {
          //przypisywanie do top albo bottom
          newTop.appendChild(newTeam);
          newTop.appendChild(btn);
        } else {
          newBottom.appendChild(newTeam);
          newBottom.appendChild(btn);
        }
        squad++;
      }
      mnr++;
    }
    teams_amount = teams_amount / 2;
  }
>>>>>>> origin/Daniel
}

function teams_in_round(round) {
  //funkcja sprawdzajaca ile druzyn jest w danej rundzie
  let sum = 0;
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].round == round) sum++;
  }
  return sum;
}

function insert() {
  //funkcja wstawiajaca druzyny w odpowiednie miejsca
  const ladder = document.getElementById("ladder").children; //pobranie divow round
  let top = 0;
  for (let i = 0; i < teams.length; i++) {
    const round_no = teams[i].round; //numer rundy
    const game = teams[i].match; //numer meczu

    for (let j = 0; j < round_amount; j++) {
      //znalezienie odpowiedniego meczu dla danej druzyny
      if (ladder[j].id == `round_${round_no}`) {
        //console.log("Druzyna " + i + " znalazla div o id: " + ladder[j].id);
        const round_div = document.getElementById(`round_${round_no}`).children;

        for (let k = 0; k < round_div.length; k++) {
          if (round_div[k].id == `match_${game}`) {
            const match_div = document.getElementById(`match_${game}`).children;
            const identyfier = teams[i].name.split(" ").join("_");
            let team_div;
            let team_btn;

            if (check_empty(`top_${game}`) == 1) {
              const bottom_div = match_div[1].children;
              team_div = bottom_div[0];
              team_btn = bottom_div[1];
            } else {
              const top_div = match_div[0].children;
              team_div = top_div[0];
              team_btn = top_div[1];
            }

            team_div.textContent = teams[i].name;
            team_btn.setAttribute(`onclick`, `transition(this,${game})`);
            team_btn.setAttribute(`id`, identyfier);
            team_btn.setAttribute(`data-name`, `${teams[i].name}`);
          }
        }
      }
    }
  }
}

<<<<<<< HEAD
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


				let j=0;
				array.forEach(function (){ // petla tworzaca divy z druzynami
					if((array[j].match===i+1 )&& (array[j].eliminated="false")){
							let newTeam=document.createElement("div");
							newTeam.textContent=array[j].name;
							newTeam.setAttribute(`id` , `${"team_"}${j}` )
							newMatch.appendChild(newTeam);
					}
					j++
				})

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
=======
function fix_teams(a) {
  /*const t = [4, 8, 16, 32];
  let j = 0;

  for (let i = 0; i < t.length; i++) {
    if (teams.length > t[i] && teams.length < t[i + 1]) {
      //console.log("t: " + teams.length + ">" + t[i]);
      j = t[i];
      break;
    }
  }*/

  /*if (j != 0) {
    let game = j - 1;
    //console.log("j=k: " + j);
    //console.log("game: " + game);
    //console.log("long: " + (teams.length - j));

    for (let i = j; i < teams.length; i++) {
      teams[i].round = 2;
      teams[i].match = game;
      game++;
    }
  }*/

  let number = 1;
  let check = false;

  for (let i = 0; i < a.length; i++) {
    //tu np. okreslac przed teams[i] wyzej jaki ma byc numer rundy i jaki meczs
    teams[i] = { name: a[i], eliminated: "false", round: 1, match: number };

    if (check == false) {
      check = true;
    } else {
      check = false;
      number++;
    }
  }

  //sprobowac polaczyc te fory

  const j = special_round();
  console.log("j: " + j);
  const i = teams.length - j;
  console.log("i: " + i);
  if (j != 0) {
    let k = 0;
    let lg = 0;

    for (let a = 0; a < 2; a++) {
      if (a == 0) {
        let b = 0;

        for (b; b < i * 2; b++) {
          teams[b].round = a;
        }
        k = b;
        lg = teams[b].match;
        console.log("k: " + k);
        console.log("lg- " + lg);
      } else {
        let l = lg;

        for (k; k < teams.length; k++) {
          //console.log("k: " + k);
          if (i > 0) {
          }
          teams[k].match = l;
          l++;
        }
      }
    }
  }
}

function special_round() {
  const t = [4, 8, 16, 32];
  let x = 0;

  for (let i = 0; i < t.length; i++) {
    if (teams.length > t[i] && teams.length < t[i + 1]) {
      x = t[i];
      break;
    }
  }

  return x;
>>>>>>> origin/Daniel
}





function draw_empty_div (array){
	let round_amount=Math.ceil(Math.log2(teams.length)); // ilosc rund
	let container=document.getElementById("ladder");
	matchId=	round_amount;
	round_amount=round_amount/2;
	teamId=array.length;

	for(let i=0;i<round_amount;i++){ // petla tworzaca diva mecz

		let newTop=document.createElement("div")
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

 }
}
