const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const url = require('url');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// dohvacanje svih stranica
app.use(express.static('public'));
app.use(express.static('slike'));
app.get('/', function(req, res){
    res.sendfile(__dirname+'/public/pocetna.html')
});
var velicinaNiza=0;  
var filePath = path.join(__dirname, 'zauzeca.json');

//zadatak1
app.get('/zauzeca.json', function (req, res) {
    console.log("usao u server");
    res.sendfile( filePath);
});
//zadatak2 za periodicna
app.post('/zauzecaPeriodicna', function(req, res){
    //ucitajjson
    var upisi=true;
    var glavniPodatak=req.body;
    var data1=fs.readFileSync('zauzeca.json');
    var podaci=JSON.parse(data1);
    var periodicno=podaci.periodicno;
    var vanredno=podaci.vanredno;
    //provjera dostupnosti
    for(let i=0;i<periodicno.length;i++){
        //za salu
        if (glavniPodatak.naziv!=periodicno[i].naziv) continue;
        if(glavniPodatak.semestar!=periodicno[i].semestar) continue;
        if(glavniPodatak.dan!=periodicno[i].dan) continue;
            //pretvaram u minute da bih poredila vrijeme 
            var pomoc1=periodicno[i].pocetak.split(":");
            var pomocPocetak=(+pomoc1[0])*60 + (+pomoc1[1]);
            var pomoc2=periodicno[i].kraj.split(":");
            var pomocKraj=(+pomoc2[0])*60 + (+pomoc2[1]);
            //podaci iz forme
            var pomoc3=glavniPodatak.pocetak.split(":");
            var pocetakTrenutni=(+pomoc3[0])*60 + (+pomoc3[1]);
            var pomoc4=glavniPodatak.kraj.split(":");
            var krajTrenutni=(+pomoc4[0])*60 + (+pomoc4[1]);
            if(pomocPocetak>=pocetakTrenutni & pomocKraj<=krajTrenutni) upisi=false;
            if(pomocPocetak>=pocetakTrenutni & krajTrenutni>=pomocKraj & pomocPocetak<=krajTrenutni) upisi=false;
            if(pomocPocetak<=pocetakTrenutni & pomocKraj<=krajTrenutni & pomocKraj>=pocetakTrenutni) upisi=false;
            if(pomocPocetak<=pocetakTrenutni & pomocKraj>=krajTrenutni) upisi=false;
        }
        
    if(upisi){
        periodicno.push(glavniPodatak);
        var odgovor={periodicno, vanredno}
        var glavniOdgovor=JSON.stringify(odgovor);
        fs.writeFile('zauzeca.json', glavniOdgovor, function(err){
            if(err) throw err;
        });
        res.send(glavniOdgovor);
        
    }
    else{ 
        var zauzeto=[glavniPodatak.naziv,"",glavniPodatak.pocetak, glavniPodatak.kraj];     
        res.json(zauzeto);
    }
    
});

//zadatak2 za vanredna
app.post('/zauzecaVanredna', function(req, res){
    //ucitajjson
    var upisi=true;
    var glavniPodatak=req.body;
    var data1=fs.readFileSync('zauzeca.json');
    var podaci=JSON.parse(data1);
    var periodicno=podaci.periodicno;
    var vanredno=podaci.vanredno;
    console.log(glavniPodatak);
    //provjera dostupnosti
    for(let i=0;i<vanredno.length;i++){
        //za salu
        if (glavniPodatak.naziv!=vanredno[i].naziv) continue;
        if(glavniPodatak.datum.substring(0,2)!=vanredno[i].datum.substring(0,2)) continue;
        if(glavniPodatak.datum.substring(3,5)!=vanredno[i].datum.substring(3,5)) continue;
            //pretvaram u minute da bih poredila vrijeme 
            var pomoc1=vanredno[i].pocetak.split(":");
            var pomocPocetak=(+pomoc1[0])*60 + (+pomoc1[1]);
            var pomoc2=vanredno[i].kraj.split(":");
            var pomocKraj=(+pomoc2[0])*60 + (+pomoc2[1]);
            //podaci iz forme
            var pomoc3=glavniPodatak.pocetak.split(":");
            var pocetakTrenutni=(+pomoc3[0])*60 + (+pomoc3[1]);
            var pomoc4=glavniPodatak.kraj.split(":");
            var krajTrenutni=(+pomoc4[0])*60 + (+pomoc4[1]);
            if(pomocPocetak>=pocetakTrenutni & pomocKraj<=krajTrenutni) upisi=false;
            if(pomocPocetak>=pocetakTrenutni & krajTrenutni>=pomocKraj & pomocPocetak<=krajTrenutni) upisi=false;
            if(pomocPocetak<=pocetakTrenutni & pomocKraj<=krajTrenutni & pomocKraj>=pocetakTrenutni) upisi=false;
            if(pomocPocetak<=pocetakTrenutni & pomocKraj>=krajTrenutni) upisi=false;
        }
        
    if(upisi){
        vanredno.push(glavniPodatak);
        var odgovor={periodicno, vanredno}
        var glavniOdgovor=JSON.stringify(odgovor);
        fs.writeFile('zauzeca.json', glavniOdgovor, function(err){
            if(err) throw err;
        });
        res.send(glavniOdgovor);
        
    }
    else{ 
        var zauzeto=[glavniPodatak.naziv,glavniPodatak.datum,glavniPodatak.pocetak, glavniPodatak.kraj];     
        res.json(zauzeto);
    }
   
});

//ucitava na pocetku--zadatak3
app.get('/slike', function(req, res){
    var niz1=[];
    velicinaNiza=3;
    fs.readdir('./slike', function(err, folder1){
        for(let i=0; i<3;i++){
            niz1.push('http://localhost:8080/'+folder1[i]);
        }
        
    res.json(niz1);
    });
});
//ucitava nove--zadatak3
app.get('/slikeNove', function(req, res){
    var niz1=[];
    var velicinaFoldera=velicinaNiza+3;
    var zadnjeSlike= false;
    fs.readdir('./slike', function(err, folder1){
        if(folder1.length<=velicinaFoldera) {
            velicinaFoldera=folder1.length;
            zadnjeSlike=true;
        }
        for(let i=velicinaNiza; i<velicinaFoldera;i++){
            niz1.push('http://localhost:8080/'+folder1[i]);
        }
    let odgovor1={niz1, zadnjeSlike};  
    res.json(odgovor1);
    velicinaNiza+=3;
    });

});


app.listen(8080);