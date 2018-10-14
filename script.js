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