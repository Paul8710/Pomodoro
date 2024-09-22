let minute = 0;
let seconde = 15;
let id;
let pause = true;

document.getElementById("intitule").textContent = "Temps de travail =";
document.getElementById("affichage").textContent = minute + ":" + seconde;

function decompte() {
    
    if(seconde == 0 && minute !=0){
        seconde = 59;
        minute -= 1;
    } else {
        seconde -= 1;
    }
    document.getElementById("affichage").textContent = minute + ":" + seconde;
    if(seconde == 0 && minute == 0){
        if(pause){
            minute = 0;
            seconde = 10;
            document.getElementById("intitule").textContent = "En pause =";
            document.getElementById("affichage").textContent = minute + ":" + seconde;
            pause = false;
        }
        else {
            minute = 25;
            seconde = 0;
            document.getElementById("intitule").textContent = "Temps de travail =";
            document.getElementById("affichage").textContent = minute + ":" + seconde;
            pause = true;
        }
    }
    
}



let bouton = document.getElementById('monBouton');


function arretDecompte(){
    clearInterval(id);
    minute = 25;
    seconde = 0;
    document.getElementById("affichage").textContent = minute + ":" + seconde;
    document.getElementById("monBouton").textContent = "▶";
    bouton.removeEventListener('click', arretDecompte);
    bouton.addEventListener('click', lancerDecompte);
}


function lancerDecompte(){
    id = setInterval(decompte,1000);
    document.getElementById("monBouton").textContent = "⏹︎";
    bouton.addEventListener('click', arretDecompte);
    bouton.removeEventListener('click', lancerDecompte);
    
}

bouton.addEventListener('click', lancerDecompte);
