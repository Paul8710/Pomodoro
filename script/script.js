let minute = 0;
let seconde = 15;
// la variable id permet de stocker l'id de l'intervalle afin de pouvoir l'arreter
let id;
// permet de savoir si le prochain est un temps de pause ou non
let pause = true;
// lie le bouton HTML au javascript
let bouton = document.getElementById('monBouton');
// lance la fonction lancerDecompte quand le bouton est cliqué
bouton.addEventListener('click', lancerDecompte);

//Affichage Initiale
document.getElementById("intitule").textContent = "Temps de travail =";
document.getElementById("affichage").textContent = minute + ":" + seconde;


//Permet de décompter le temps
//Prend en charge les temps de pause et travail
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

//Permet de rénitialiser le décompte quand on clique sur le bouton
function arretDecompte(){
    clearInterval(id);
    minute = 25;
    seconde = 0;
    document.getElementById("affichage").textContent = minute + ":" + seconde;
    document.getElementById("monBouton").textContent = "▶";
    bouton.removeEventListener('click', arretDecompte);
    bouton.addEventListener('click', lancerDecompte);
}

//Permet de lancer le décompte quand on clique sur le bouton
function lancerDecompte(){
    id = setInterval(decompte,1000);
    document.getElementById("monBouton").textContent = "⏹︎";
    bouton.addEventListener('click', arretDecompte);
    bouton.removeEventListener('click', lancerDecompte);
    
}

function verifForm(){
    let minuteF = parseInt(document.getElementById("nbMin").value);
    let secondeF = parseInt(document.getElementById("nbSec").value);

    if(minuteF>=0 && minuteF<60){
        if(secondeF>=0 && secondeF<60){
            return true;
        }
    }
    throw new Error("Vérifier que les minutes et les secondes soient comprises entre 0 et 59 ");
}


document.getElementById("monFormulaire").addEventListener("submit", function(event) {
    event.preventDefault();

    try {
        if(verifForm()){
            document.getElementById("monFormulaire").submit();
        }
        
    } catch (error) {
        alert(error.message);
        
    }
})


