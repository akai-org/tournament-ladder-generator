
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

	console.log(teams);
	return teams;
}

//-
function zespoly() {
	var dane = document.getElementById("teams2").value;
	if(dane.value != "")
	{
		var array = dane.split(",");
	}

	array = losowanie(array);

	document.getElementById("dane").innerHTML += "Drużyny:<br>";
	for(var i=0;i<array.length;i++)
	{
		document.getElementById("dane").innerHTML += (i+1)+". "+array[i]+"<br/>";
	}
  	document.getElementById("dane").innerHTML += "<br/><br/><br/>";
	
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
	document.getElementById("dane").innerHTML += arrayJSON+"<br>";

	var par = JSON.parse(arrayJSON);
	document.getElementById("dane").innerHTML += par[0].match;

}


