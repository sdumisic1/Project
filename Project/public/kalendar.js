let Kalendar = (function() {
    var obojeniDan;
    var glavniNizP=[];
    var glavniNizV=[];
    var mjesec1;
    //za periodicno zauzece
    function periodicno (dan1,semestar1, pocetak1, kraj1, naziv1, predavac1){
            this.dan=dan1;
            this.semestar=semestar1;
            this.pocetak=pocetak1;
            this.kraj=kraj1;
            this.naziv=naziv1;
            this.predavac=predavac1;
    }
    //za vanredno zauzece
    function vanredno (datum1, pocetak1, kraj1, naziv1, predavac1){
            this.datum=datum1;
            this.pocetak=pocetak1;
            this.kraj=kraj1;
            this.naziv=naziv1;
            this.predavac=predavac1;
    }

    function obojiZauzecaImpl(kalendarRef, mjesec, sala, pocetak, kraj){
        //dohvati tabelu preko kalendarRef 
        var tabela=kalendarRef.getElementsByTagName('table')[0];
        //ako podaci nisu ucitani
        if(glavniNizP.length<1 & glavniNizV.length<1) return;
        //ako je forma prazna
        if(pocetak=== "" || kraj==="" ) return;
        //oboji sve u zeleno
        for(var i=2;i<=7;i++){
            for(var j=0;j<7;j++){
                if(tabela.rows[i].cells[j].innerHTML!="")
                    tabela.rows[i].cells[j].style.borderBottom="10px solid green"; 
            }
        }
        var crtaj=0;
        //pretvaram u minute da mogu porediti (podaci sa forme)
        var abc=pocetak.split(":");
        var pocetakTrenutni=(+abc[0])*60 + (+abc[1]);
        //isto uradimo za kraj(podaci sa forme)
        var abc1=kraj.split(":");
        var krajTrenutni=(+abc1[0])*60 + (+abc1[1]);
        //ZA PERIODICNE
        for(var i=0;i<glavniNizP.length;i++){
            
            if (sala!=glavniNizP[i].naziv) continue;
            //pretvaram u minute podatke koje dobijemo kao parametar funkcije
            var pomoc1=glavniNizP[i].pocetak.split(":");
            var pomocPocetak=(+pomoc1[0])*60 + (+pomoc1[1]);
            var pomoc2=glavniNizP[i].kraj.split(":");
            var pomocKraj=(+pomoc2[0])*60 + (+pomoc2[1]);
            if(parseInt(pomocPocetak)>=parseInt(pocetakTrenutni) & parseInt(pomocKraj)<=parseInt(krajTrenutni)) 
                {crtaj=1; }
            if(parseInt(pomocPocetak)>=parseInt(pocetakTrenutni) & parseInt(krajTrenutni)>=parseInt(pomocKraj) & parseInt(pomocPocetak)<=parseInt(krajTrenutni))
                {crtaj=1;}
            if(parseInt(pomocPocetak)<=parseInt(pocetakTrenutni) & parseInt(pomocKraj)<=parseInt(krajTrenutni) & parseInt(pomocKraj)>=parseInt(pocetakTrenutni))
                {crtaj=1;}
            if(parseInt(pomocPocetak)<=parseInt(pocetakTrenutni) & parseInt(pomocKraj)>=parseInt(krajTrenutni))
               { crtaj=1;}
            if(parseInt(crtaj)){
                if(glavniNizP[i].semestar==="ljetni"){
                    if(parseInt(mjesec)>=1 & parseInt(mjesec)<=5){   
                        obojeniDan=glavniNizP[i].dan;
                        for(var k=2;k<=7;k++){
                            if(tabela.rows[k].cells[obojeniDan].innerHTML==="") continue;
                                tabela.rows[k].cells[obojeniDan].style.borderBottom="10px solid red";
                        }
                        crtaj=0;
                    }
                }
                else if(glavniNizP[i].semestar==="zimski") {
                    if(parseInt(mjesec)>=9 || parseInt(mjesec)==0){
                        obojeniDan=glavniNizP[i].dan;
                        for(var k=2;k<=7;k++){
                            if(tabela.rows[k].cells[obojeniDan].innerHTML==="") continue;
                                tabela.rows[k].cells[obojeniDan].style.borderBottom="10px solid red";
                        }
                        crtaj=0;
                    }
                }
                else continue;
            }
        }
        //ZA VANREDNA
        for(var i=0;i<glavniNizV.length;i++){
            crtaj=0;
            var mjesecPomoc=glavniNizV[i].datum;
            var mjesecPomoc2= mjesecPomoc.substring(3,5);
            if (sala!=glavniNizV[i].naziv) continue;
            //pretvaram u minute podatke koje dobijemo kao parametar funkcije
            var pomoc1=glavniNizV[i].pocetak.split(":");
            var pomocPocetak=(+pomoc1[0])*60 + (+pomoc1[1]);
            var pomoc2=glavniNizV[i].kraj.split(":");
            var pomocKraj=(+pomoc2[0])*60 + (+pomoc2[1]);
            if(parseInt(pomocPocetak)>=parseInt(pocetakTrenutni) & parseInt(pomocKraj)<=parseInt(krajTrenutni)) 
                crtaj=1;
            if(parseInt(pomocPocetak)>=parseInt(pocetakTrenutni) & parseInt(krajTrenutni)>=parseInt(pomocKraj) & parseInt(pomocPocetak)<=parseInt(krajTrenutni))
                crtaj=1;
            if(parseInt(pomocPocetak)<=parseInt(pocetakTrenutni) & parseInt(pomocKraj)<=parseInt(krajTrenutni) & parseInt(pomocKraj)>=parseInt(pocetakTrenutni))
                crtaj=1;
            if(parseInt(pomocPocetak)<=parseInt(pocetakTrenutni) & parseInt(krajTrenutni)<=parseInt(pomocKraj))
                crtaj=1;
            if(parseInt(crtaj)){
                if(parseInt(mjesec)==(parseInt(mjesecPomoc2)-1)){
                    obojeniDan=mjesecPomoc.substring(0,2);
                     for(var k=2;k<=7;k++){
                         for(var j=0;j<7;j++){
                             if(obojeniDan.substring(0,1)==0) obojeniDan=obojeniDan.substring(1,2);
                            if(tabela.rows[k].cells[j].innerHTML===obojeniDan)
                                tabela.rows[k].cells[j].style.borderBottom="10px solid red";
                        }
                    }
                } 
            }  
        }
    }

    //note: sve dok se ne popune svi podaci u formi NECE nista biti obojeno na kalendaru!!!
    function ucitajPodatkeImpl(periodicna, vanredna){
        //ucitavanje podataka
        glavniNizP=periodicna;
        glavniNizV=vanredna;
    }


    function iscrtajKalendarImp(kalendarRef, mjesec){
        var praznaMjesta= 6;
        mjesec1=mjesec;
        //brisanje prethodne tabele ako postoji
        var tbl = document.getElementById('glavna'); 
        if(tbl) tbl.parentNode.removeChild(tbl);
        var brojDana=0;
        //kreiranje tabele
        var tabela = document.createElement("TABLE");
        tabela.setAttribute("id", "glavna");
		 //prvi red
        var prviRed = tabela.insertRow(0);
        //mjesec
        var niz1=["Januar", "Februar", "Mart","April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
        var celija00= prviRed.insertCell(0);
        celija00.innerHTML = niz1[mjesec];
        celija00.colSpan=7;
        prviRed.style.backgroundColor = "lightsteelblue";
        //drugi red
        var drugiRed = tabela.insertRow(1);
        var niz2=["PON", "UTO", "SRI", "CET", "PET", "SUB", "NED"];
        for(var i=0; i<7; i++){
            drugiRed.insertCell(i).innerHTML=niz2[i];
        }
        //koliko dana ima mjesec
        if (mjesec>=7 & mjesec<12) {
            brojDana=31;
            if(mjesec%2==0) brojDana=30;   
        }
        else if( mjesec==0 || mjesec<8) {
            if(mjesec%2==0) brojDana=31;
            else if(mjesec==1) brojDana=28;
            else brojDana=30;
        }
        var datum = new Date(2019, mjesec, 1);
        //gledam koje je dan prvi u mjesecu da mogu prvu sedmicu formirat
        var prviDan= datum.toDateString().substring(0,3);
        if(prviDan=="Mon"){ praznaMjesta=0;}
        else if(prviDan=="Tue"){praznaMjesta=1;}
        else if(prviDan=="Wed"){praznaMjesta=2;}
        else if(prviDan=="Thu"){praznaMjesta=3;}
        else if(prviDan=="Fri"){praznaMjesta=4;}
        else if(prviDan=="Sat"){praznaMjesta=5;}
        else(prviDan=="Sun")
        //formiranje praznih celija
        var treciRed=tabela.insertRow(2);
        for (var i=0; i<praznaMjesta; i++){
            treciRed.insertCell(i).innerHTML="";
        }
        var aa=1;
        var celija000;
        for (var i=praznaMjesta; i<7;i++){
            celija000=treciRed.insertCell(i)
            celija000.innerHTML=aa;
            celija000.setAttribute("class", "daniUMjesecu" );
            aa++;
        }
        //formiranje tabele do kraja
        for(var i=0;i<=4;i++){
            var kk=3+i;
            var red=tabela.insertRow(kk);
            for(var j=0;j<7;j++){
                if(aa<=brojDana){ 
                celija000=red.insertCell(j)
                celija000.innerHTML=aa;
                celija000.setAttribute("class", "daniUMjesecu" );
                aa++;
                }
                else red.insertCell(j).innerHTML="";
            }
        }
        //uredjenje tabele
		tabela.style.background = "whitesmoke";
		tabela.style.border = "1.5px solid darkblue";
		tabela.style.width = "90%";
		tabela.style.height = "60vh";
		tabela.style.textAlign = "center";
        tabela.style.margin = "0 auto";

		//povezivanje
        kalendarRef.appendChild(tabela); 
        //treba dodat event listener
        for(var i=0;i<document.getElementsByClassName("daniUMjesecu").length;i++){
            document.getElementsByClassName("daniUMjesecu")[i].addEventListener('click', function(){
                funkcija2();
            })
        }

    
    }
    function vratiMjesecImpl(){
        return mjesec1;
    }
    return {
        obojiZauzeca: obojiZauzecaImpl,
        ucitajPodatke: ucitajPodatkeImpl,
        iscrtajKalendar: (iscrtajKalendarImp),
        vanredna: vanredno,
        periodicna:periodicno,
        vratiMjesec: vratiMjesecImpl
        }
} ());