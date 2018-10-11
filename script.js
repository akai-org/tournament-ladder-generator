function zespoly() {
	var dane = document.getElementById("teams2").value;
	if(dane.value != "")
	{
		var array = dane.split(",");
		for(var i=0;i<array.length;i++)
		{
			document.getElementById("dane2").innerHTML += array[i]+"<br/>";
		}
	}
	document.getElementById("dane2").innerHTML += "<br/><br/><br/>";
	
	var arrayJSON = JSON.stringify(array);
	document.getElementById("dane2").innerHTML += arrayJSON;
}
