function ucitajPrveTri(){
    Pozivi.pocetnoUcitavanje();
}
function prethodne1() {
    Pozivi.vratiProsleSlike();
    document.getElementById("dugme4").disabled=false;
}
function sljedece1(){
    document.getElementById("dugme3").disabled=false;
    Pozivi.ucitajSlike();
}