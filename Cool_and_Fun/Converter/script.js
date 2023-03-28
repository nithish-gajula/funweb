// Created by Qaza Metaj

function binär(){

document.getElementById("x").innerHTML = "";

zahl = document.getElementById("zahl").value;

if (zahl == ""){
    
    alert("Bitte geben Sie eine Zahl ein")
}

else{

var R;
var b = [];
var i = 0;

    do{
    console.log(zahl);
    b[i]= zahl%2;
    R = Math.floor(zahl/2);
    zahl = R;
    
    i = i+1;
    } while(zahl > 0)
    
    for (var u = b.length-1; u != -1; u=u-1){
        
        document.getElementById("x").innerHTML = document.getElementById("x").innerHTML + " " + b[u];
    }
}
}