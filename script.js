const teams = [];
const sr = [];
let round_amount;

function main() {
  //podmiana tytulu
  const name = document.getElementById("name");
  let title = document.getElementById("title");
  if (name.value != "") {
    title.textContent = name.value;
  } else {
    title.textContent = "tournament ladder generator";
  }

  // główna funkcja
  let data = document.getElementById("teams").value; //dla ułatwienia wprowadzania danych na razie const zmienione na let
  //data =
  //  "Lech Poznan,Legia Warszawa, Wisła Kraków, Lechia Gdańsk, Pogoń Szczecin, Arka Gdynia, Zaglebie Lublin, Gornik Zabrze";
  data = "1,2,3,4,5,6,7,8,9,10,11";

  document.getElementById("start").style.display = "none";

  let array = data.split(",").map((e, i, a) => {
    return e.trim();
  });

  array = draw(array); //wywala blad gdy array jest const
  round_amount = Math.ceil(Math.log2(array.length));

  fix_teams(array);
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

function transition(object, game) {
  //rozdzielanie do roznych funkcji
  const win_id = object.id;
  const win_text = object.getAttribute("data-name");
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
  const lose_id = lose_text.split(" ").join("_");

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

  let parent = lose.parentElement;
  const nazwa = parent.className;

  parent = parent.parentElement.children;

  let i;
  if (nazwa == "top") i = 0;
  else i = 1;

  parent[i].classList.add("team-grayed-out");
}

function win(id, txt, game, index) {
  //przechodzenie do kolejnego etapu
  const win = document.getElementById(id);
  const sum = eliminated_check();
  const r = teams[index].round;

  win.innerHTML = "&#x2714";
  win.removeAttribute("id");
  win.setAttribute("disabled", "disabled");

  if (sum != 1) {
    if (r == 0) {
      game -= 10 * round_amount;
      teams[index].round = 1;
    }

    const p1 = next_round_number(game, r); // numer potrzebny do identyfikacji meczu
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

function next_round_number(game, round) {
  //określenie numeru kolejnego meczu
  let res;

  if (round == 0) {
    res = sr[game] - 10 * round_amount;
  } else {
    res = teams_in_round(round) / 2 + game - temp_array(game - 1); //wzor: ilsc druzyn + index meczu - watrosc tablicy[index meczu]
  }

  return res;
}

function teams_in_round(round) {
  //funkcja sprawdzajaca ile druzyn jest w danej rundzie
  const tir = document.getElementById(`round_${round}`).children.length;

  return tir * 2;
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
}

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
  let mnr = 10 * round_amount + 1; //numer meczu
  const length = teams.length;
  const c = special_round(length);
  let p = 1;

  if (c == 0) round_amount += 1;

  for (let i = 0; i < round_amount; i++) {
    const newRound = document.createElement("div");
    newRound.classList.add("round");
    newRound.setAttribute(`id`, `round_${i}`);
    container.appendChild(newRound);
    const l = teams.length - c;

    if (i == 0) {
      if (c != 0) teams_amount = l;
      else teams_amount = 0;
    } else if (i == 1) {
      if (p == 1) {
        mnr = 1;
        p--;
      }

      if (c != 0) teams_amount = (teams.length - l) / 2;
      else teams_amount = teams.length / 2;
    }

    for (let i = 0; i < teams_amount; i++) {
      const newTop = document.createElement("div"); //tworzenie	diva top
      newTop.setAttribute(`class`, `top`);
      newTop.setAttribute(`id`, `top_${mnr}`);

      const newBottom = document.createElement("div"); //tworzenie diva bottom
      newBottom.setAttribute(`class`, `bottom`);
      newBottom.setAttribute(`id`, `bottom_${mnr}`);

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
}

function insert() {
  //funkcja wstawiajaca druzyny w odpowiednie miejsca
  for (let i = 0; i < teams.length; i++) {
    const game = teams[i].match; //numer meczu
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

function fix_teams(a) {
  let number = 10 * round_amount + 1;
  let check = false;
  const length = a.length;
  const j = special_round(length);
  let m = (length - j) * 2;
  let n = length - j;
  let c = 0;
  let x = 1;

  for (let i = 0; i < a.length; i++) {
    let r = 1;
    if (j != 0) {
      if (m > 0) {
        r = 0;
        m--;
      }
      if (m < 0 && n > 0) {
        check = true;
        n--;
      }
    } else {
      if (c == 0) {
        number = 1;
        c--;
      }
    }

    teams[i] = { name: a[i], eliminated: "false", round: r, match: number };

    if (check == false) {
      check = true;
    } else {
      check = false;
      sr[x] = number;
      x++;
      number++;
    }

    if (m == 0) {
      number = 1;
      m--;
    }
  }
}

function special_round(a) {
  const t = [4, 8, 16, 32, 64];
  let x = 0;

  for (let i = 0; i < t.length; i++) {
    if (a > t[i] && a < t[i + 1]) {
      x = t[i];
      break;
    }
  }

  return x;
}
