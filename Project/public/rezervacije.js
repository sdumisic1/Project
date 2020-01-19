var poziv1;
function ucitaj(){
    //console.log("usao u rezervacije js");
    
  poziv1= Pozivi;
   poziv1.ucitajJson();
  Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10);
}

function funkcija2(){
  //console.log("kliknuo je");
  
poziv1= Pozivi;
  var dan=event.target;
  console.log(dan.innerHTML);
  if(dan.style.borderBottomColor== "green")
      poziv1.rezervacija(dan.innerHTML);
  if(dan.style.borderBottomColor== "red"){
    
    var trenutnaSala= document.getElementsByName("sale")[0].value;
    var pocetakTrenutni=document.getElementsByName("pocetak")[0].value;
    var krajTrenutni= document.getElementsByName("kraj")[0].value;
    var mjesec=Kalendar.vratiMjesec()+1;
    
    alert("Nije moguće rezervisati salu "+ trenutnaSala+" za navedeni datum "+dan.innerHTML+"/"+mjesec+"/2019 i termin od "+pocetakTrenutni+" do "+krajTrenutni);
  }
}
