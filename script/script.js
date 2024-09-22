let minute = 25;
let seconde = 0;
let id;
document.getElementById("affichage").textContent = minute + ":" + seconde;

function decompte() {
    
    if(seconde == 0){
        seconde = 59;
        minute -= 1;
    } else {
        seconde -= 1;
    }
    document.getElementById("affichage").textContent = minute + ":" + seconde;
    
}

let bouton = document.getElementById('monBouton');


function arretDecompte(){
    clearInterval(id);
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
