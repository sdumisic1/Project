var mjesec=10;
var kalendar1;

function pokreni() {
	Kalendar.iscrtajKalendar(document.getElementById("kalendar"), mjesec);
}
function pokreni1() {
	if(mjesec>0) {
		mjesec--;
		Kalendar.iscrtajKalendar(document.getElementById("kalendar"), mjesec);
		var trenutnaSala= document.getElementsByName("sale")[0].value;
		var pocetakTrenutni=document.getElementsByName("pocetak")[0].value;
		var krajTrenutni= document.getElementsByName("kraj")[0].value;
		Kalendar.obojiZauzeca(document.getElementById("kalendar"), mjesec, trenutnaSala, pocetakTrenutni, krajTrenutni);
		if(mjesec==0) 
			document.getElementById("dugme1").disabled = true;

		if(mjesec<11)
			document.getElementById("dugme2").disabled = false;
	}
	else {
		document.getElementById("dugme1").disabled = true;
	}
}
function pokreni2(){
	if(mjesec<=11) {
		mjesec++;
		Kalendar.iscrtajKalendar(document.getElementById("kalendar"), mjesec);
		var trenutnaSala= document.getElementsByName("sale")[0].value;
		var pocetakTrenutni=document.getElementsByName("pocetak")[0].value;
		var krajTrenutni= document.getElementsByName("kraj")[0].value;
		Kalendar.obojiZauzeca(document.getElementById("kalendar"), mjesec, trenutnaSala, pocetakTrenutni, krajTrenutni);
		if(mjesec==11) 
			document.getElementById("dugme2").disabled = true;
			
		if(mjesec>0)
			document.getElementById("dugme1").disabled = false;
	}
	else {
		document.getElementById("dugme2").disabled = true;
	}
}
function funkcija1(){
	var trenutnaSala= document.getElementsByName("sale")[0].value;
    var pocetakTrenutni=document.getElementsByName("pocetak")[0].value;
    var krajTrenutni= document.getElementsByName("kraj")[0].value;
    Kalendar.obojiZauzeca(document.getElementById("kalendar"), mjesec, trenutnaSala, pocetakTrenutni, krajTrenutni);
}