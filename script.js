
//-----------------funkcja losujaca ---------------  B - tablica pomocnicza
function rand(teams) {
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


  console.log(teams);

}

//-
function zespoly() {
	var dane = document.getElementById("teams2").value;
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

  rand(array);

	var teams=[];
	var zmienna = 1;
	var sprawdzenie = false;
	for(var i=0;i<array.length;i++)
	{

		teams[i] = {"name":array[i],"eliminated":"false","match":zmienna};
		console.log(teams[i]);

    var arrayJSON = JSON.stringify(teams[i]);
  	document.getElementById("dane").innerHTML += arrayJSON;

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

}
