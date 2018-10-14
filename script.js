<<<<<<< HEAD
let numberOfTeams = document.getElementById("NumberOfTeams");
let namesOfTeams;
let div=document.getElementById('form');
let teams = [];
// ---- Sprawdzanie czy istnieje pRzycisk zatwierdzajacy druzyny ----


//fukcja zatwierdzajaca liczbe druzyn
let pobierz = function(){
numberOfTeams = document.getElementById("NumberOfTeams").value; // pobranie ilosci druzyn
let=form=document.getElementById("form");
let t_div=document.getElementById("teams");

          // ------ petla tworzaca inputy do wypelnienia ----------
    for(let i=0 ; i<numberOfTeams ; i++){
        let newInput = document.createElement("input"); //tworzenie inputa
        t_div.appendChild(newInput);  //dodawanie inputa do body
        newInput.setAttribute("type" , "text");
        newInput.setAttribute("placeholder" , "nazwa drużyny");
        newInput.setAttribute(`id` , `${"team"}${i}`);

        t_div.appendChild(document.createElement("br"));
      }
    form.style.visibility="hidden";   // zamknac w divie
    //--------dodawanie przycisku-------------
    let button=t_div.appendChild(document.createElement("button"));
    button.setAttribute("id","sendJson");
    button.textContent="zatwierdź";
    button.addEventListener("click",json);
}

//--------------- funkcja ładowania do JSONA--------------

let json=function(){
  let i =0

  while (i<numberOfTeams) {
    teams[i]=document.getElementById(`${"team"}${i}`).value;
        JSON.stringifly(teams[i]);
    i++;
  }

}


let ok=document.getElementById("ok");
ok.addEventListener("click", pobierz);
=======
function zespoly() {
	var dane = document.getElementById("teams").value;
	if(dane.value != "")
	{
		var array = dane.split(",");
		document.getElementById("dane").innerHTML += "Drużyny:<br>";
		for(var i=0;i<array.length;i++)
		{
			document.getElementById("dane").innerHTML += (i+1)+". "+array[i]+"<br/>";
		}
	}
	document.getElementById("dane").innerHTML += "<br/><br/><br/>";
	
	var arrayJSON = JSON.stringify(array);
	document.getElementById("dane").innerHTML += arrayJSON;
	
	var teams=[];
	var zmienna = 1;
	var sprawdzenie = false;
	for(var i=0;i<array.length;i++)
	{
		
		teams[i] = {"name":array[i],"eliminated":"false","match":zmienna};
		console.log(teams[i]);
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

	//document.getElementById("dane").innerHTML += "<br/><br/><br/>";
	//document.getElementById("dane").innerHTML += teams[0].name;
}
>>>>>>> 773da666602c9e0bfaa215008d757aeb7a72a6b5
