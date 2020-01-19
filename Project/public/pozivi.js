let Pozivi= (function(){

    var nizSlikaGlavni=[];
    var kliknuoDugme;
    var ucitaoSve=false;
    //zadatak1
    function ucitajJsonImpl(){
        
    var ajax= new XMLHttpRequest();
        ajax.onreadystatechange= function(){
            if(ajax.readyState==4 && ajax.status==200){
                var podaci=JSON.parse(ajax.responseText);
                //console.log(podaci); 
                var periodicno1=podaci.periodicno;
                var vanredno1=podaci.vanredno;
                Kalendar.ucitajPodatke(periodicno1, vanredno1);
            }
            if(ajax.readyState==4 && ajax.status==404){
                console.log("Greska: Nepoznat URL!");
    
            }
        }
        ajax.open("GET", "/zauzeca.json", true);
        ajax.send();
    }

    //zadatak2
    function rezervacijaImpl(dan){
            
        var ajax= new XMLHttpRequest();
        var mjesec=Kalendar.vratiMjesec()+1;
        var podaci;
        var klik=event.target;

        var trenutnaSala= document.getElementsByName("sale")[0].value;
        var pocetakTrenutni=document.getElementsByName("pocetak")[0].value;
        var krajTrenutni= document.getElementsByName("kraj")[0].value;
        if (confirm("Da li zelite da rezervisete ovaj termin?")) {
            
        //ako je periodicno
        if(document.getElementsByName("box1")[0].checked){
            // napraviti ako je mjesec onaj koji nije u semestru nijednom
            var semestar;
            if(mjesec>8) semestar="zimski";
            else semestar="ljetni";
            var praznaMjesta;
            //odredjivanje koji je to dan
            var datum= new Date(2019,mjesec-1,dan);
            var prviDan= datum.toDateString().substring(0,3);
            if(prviDan=="Mon") praznaMjesta="0";
            else if(prviDan=="Tue") praznaMjesta="1";
            else if(prviDan=="Wed") praznaMjesta="2";
            else if(prviDan=="Thu") praznaMjesta="3";
            else if(prviDan=="Fri") praznaMjesta="4";
            else if(prviDan=="Sat") praznaMjesta="5";
            else praznaMjesta="6";
            podaci=JSON.stringify({"dan": praznaMjesta, "semestar":semestar, "pocetak": pocetakTrenutni, "kraj": krajTrenutni, "naziv": trenutnaSala, "predavac": "Sanida"}); 
            //console.log(podaci);
            //poziv za periodicna
            ajax.onreadystatechange= function(){
                if(ajax.readyState==4 && ajax.status==200){ 
                    
                    var sve=JSON.parse(ajax.responseText);
                    if(sve.length==4) {
                        alert("Nije moguće rezervisati salu "+ trenutnaSala+" za navedeni datum "+dan+"/"+mjesec+"/2019 i termin od "+pocetakTrenutni+" do "+krajTrenutni);
                    }
                    else {
                        var niz11=sve.periodicno;
                        var niz12=sve.vanredno;
                        Kalendar.ucitajPodatke(niz11,niz12);
                        Kalendar.obojiZauzeca(document.getElementById("kalendar"), mjesec-1, trenutnaSala, pocetakTrenutni, krajTrenutni);
                    }
                }
                if(ajax.readyState==4 && ajax.status==404){
                    console.log( "Greska: Nepoznat URL!");
        
                }
            }
            ajax.open("POST", "http://localhost:8080/zauzecaPeriodicna", true);
            ajax.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            ajax.send(podaci);
        }
        //ako je vanredno
        else {
            //formirat datum
            var datum;
            if(dan<10) datum="0"+dan+"."
            else datum = dan+".";
            if(mjesec<10) datum=datum+"0"+mjesec+"."+"2019"+".";
            else datum=datum+mjesec+"."+"2019"+".";
            podaci=JSON.stringify({"datum": datum, "pocetak": pocetakTrenutni, "kraj": krajTrenutni, "naziv": trenutnaSala, "predavac": "Sanida"}); 
            //console.log(podaci);   
            ajax.onreadystatechange= function(){
                if(ajax.readyState==4 && ajax.status==200){ 
                    var sve=JSON.parse(ajax.responseText);
                    if(sve.length==4) {
                        alert("Nije moguće rezervisati salu "+ trenutnaSala+" za navedeni datum "+dan+"/"+mjesec+"/2019 i termin od "+pocetakTrenutni+" do "+krajTrenutni);
                    }
                    else {
                        var niz11=sve.periodicno;
                        var niz12=sve.vanredno;
                        Kalendar.ucitajPodatke(niz11,niz12);
                        console.log(niz12);
                        Kalendar.obojiZauzeca(document.getElementById("kalendar"), mjesec-1, trenutnaSala, pocetakTrenutni, krajTrenutni);
                        klik.style.borderBottom="10px solid red";
                    }
                }
                if(ajax.readyState==4 && ajax.status==404){
                    console.log( "Greska: Nepoznat URL!");
        
                }
            }
            ajax.open("POST", "http://localhost:8080/zauzecaVanredna", true);
            ajax.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            ajax.send(podaci);
        }
    } 
}
    //zadatak3
     //prvo ucitavanje
     function pocetnoUcitavanjeImpl(){
        var ajax= new XMLHttpRequest();
        ajax.onreadystatechange= function(){
            if(ajax.readyState==4 && ajax.status==200){ 
            
                var nizSlika=JSON.parse(ajax.responseText);
                nizSlikaGlavni=nizSlika;
                //slika1
                var pic1=document.getElementById("slika1");
                pic1.src=nizSlika[0];
                //slika2
                var pic2=document.getElementById("slika2");
                pic2.src=nizSlika[1];
                //slika3
                var pic3=document.getElementById("slika3");
                pic3.src=nizSlika[2];
            }
            if(ajax.readyState==4 && ajax.status==404){
                console.log( "Greska: Nepoznat URL!");
    
            }
        }
        ajax.open("GET", "http://localhost:8080/slike", true);
        ajax.send();
    }
    //ucitaj slike nove
    function ucitajSlikeImpl() {

        var ajax= new XMLHttpRequest();
        var trenutnoStanje=0;
        var dugme=false;
        for(let i=0;i<nizSlikaGlavni.length;i++){
            if(document.getElementById("slika1").src==nizSlikaGlavni[i]) {
                trenutnoStanje=i;
            }
        }
        trenutnoStanje+=3;
        if(trenutnoStanje==nizSlikaGlavni.length){
            ajax.onreadystatechange= function(){
                if(ajax.readyState==4 && ajax.status==200){  
                    var nizSlika=JSON.parse(ajax.responseText);
                    //ako nemaju 3 slike
                    console.log(nizSlika);
                    var pomoc=nizSlika.niz1;
                    if(nizSlika.zadnjeSlike) document.getElementById("dugme4").disabled=true;
                    if(pomoc.length==1){
                        //slika nova prva
                        var pic1=document.getElementById("slika1");
                        pic1.src=nizSlika.niz1[0];
                        nizSlikaGlavni.push(nizSlika.niz1[0]);
                        //slika nova druga
                        document.getElementById("slika2").style.visibility="hidden";
                        //slika nova treca
                        document.getElementById("slika3").style.visibility="hidden";
                    
                        
                    }
                    else if(nizSlika.niz1.length==2){
                        var pic1=document.getElementById("slika1");
                        pic1.src=nizSlika.niz1[0];
                        nizSlikaGlavni.push(nizSlika.niz1[0]);
                        //slika nova druga
                        var pic2=document.getElementById("slika2");
                        pic2.src=nizSlika.niz1[1];
                        nizSlikaGlavni.push(nizSlika.niz1[1]);
                        //slika nova treca
                        document.getElementById("slika3").style.visibility="hidden";
                    
                    }
                    else {
                        
                        var pic1=document.getElementById("slika1");
                        pic1.src=nizSlika.niz1[0];
                        nizSlikaGlavni.push(nizSlika.niz1[0]);
                        //slika nova druga
                        var pic2=document.getElementById("slika2");
                        pic2.src=nizSlika.niz1[1];
                        nizSlikaGlavni.push(nizSlika.niz1[1]);
                        //slika nova treca
                        var pic3=document.getElementById("slika3");
                        pic3.src=nizSlika.niz1[2];
                        nizSlikaGlavni.push(nizSlika.niz1[2]);
                        
                    }
                    if(nizSlika.zadnjeSlike){
                        document.getElementById("dugme4").disabled=true;
                        kliknuoDugme=0;
                        ucitaoSve=true;

                    }

                }
                if(ajax.readyState==4 && ajax.status==404){
                    console.log( "Greska: Nepoznat URL!");
                }  
            
            }
            ajax.open("GET", "http://localhost:8080/slikeNove", true);
            ajax.send();
        }
        else{
            if(ucitaoSve) kliknuoDugme++;
            if(kliknuoDugme==0) document.getElementById("dugme4").disabled=true;
            if(trenutnoStanje==nizSlikaGlavni.length-1) {
                var pic1=document.getElementById("slika1");
                pic1.src=nizSlikaGlavni[trenutnoStanje];
                //slika druga
                document.getElementById("slika2").style.visibility="hidden";
                //slika treca
                document.getElementById("slika3").style.visibility="hidden";

            } 
            else if(trenutnoStanje+1==nizSlikaGlavni.length-1){
                var pic1=document.getElementById("slika1");
                pic1.src=nizSlikaGlavni[trenutnoStanje];
                //slika druga
                var pic2=document.getElementById("slika2");
                pic2.src=nizSlikaGlavni[trenutnoStanje+1];
                //slika treca
                document.getElementById("slika3").style.visibility="hidden";

            }
            else {
                var pic1=document.getElementById("slika1");
                pic1.src=nizSlikaGlavni[trenutnoStanje];
                //slika nova druga
                var pic2=document.getElementById("slika2");
                pic2.src=nizSlikaGlavni[trenutnoStanje+1];
                //slika nova treca
                var pic3=document.getElementById("slika3");
                pic3.src=nizSlikaGlavni[trenutnoStanje+2];
            }
        }
       
    }
    function vratiProsleSlikeImpl(){  
        var trenutnoStanje=0;
        if(ucitaoSve) kliknuoDugme--;
        for(let i=0;i<nizSlikaGlavni.length;i++){
            if(document.getElementById("slika1").src==nizSlikaGlavni[i]) {
                trenutnoStanje=i;
            }
        }
        if(trenutnoStanje-3<0) return;
        trenutnoStanje-=3;
        if(trenutnoStanje==0)  document.getElementById("dugme3").disabled=true;
        document.getElementById("slika2").style.visibility="visible";
        document.getElementById("slika3").style.visibility="visible";
        
        var pic1=document.getElementById("slika1");
        pic1.src=nizSlikaGlavni[trenutnoStanje];
        //slika nova druga
        var pic2=document.getElementById("slika2");
        pic2.src=nizSlikaGlavni[trenutnoStanje+1];
        //slika nova treca
        var pic3=document.getElementById("slika3");
        pic3.src=nizSlikaGlavni[trenutnoStanje+2];
    }

   
    return {
        ucitajJson: ucitajJsonImpl,
        rezervacija: rezervacijaImpl,
        ucitajSlike: ucitajSlikeImpl, 
        pocetnoUcitavanje:pocetnoUcitavanjeImpl,
        vratiProsleSlike: vratiProsleSlikeImpl
        }
} ());