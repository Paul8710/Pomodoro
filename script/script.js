//Stock le temps du compteur actuel
let minute = 25;
let seconde = 0;
//Stock le temps de travail
let minuteT = 25;
let secondeT = 0;
//Stock le temps de pause
let minuteP = 5;
let secondeP = 0;

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
            minute = minuteP;
            seconde = secondeP;
            document.getElementById("intitule").textContent = "En pause =";
            document.getElementById("affichage").textContent = minute + ":" + seconde;
            pause = false;
        }
        else {
            minute = minuteT;
            seconde = secondeT;
            document.getElementById("intitule").textContent = "Temps de travail =";
            document.getElementById("affichage").textContent = minute + ":" + seconde;
            pause = true;
        }
    }
    
}

//Permet de rénitialiser le décompte quand on clique sur le bouton
function arretDecompte(){
    clearInterval(id);
    minute = minuteT;
    seconde = secondeT;
    document.getElementById("affichage").textContent = minute + ":" + seconde;
    document.getElementById("monBouton").textContent = "▶";
    bouton.removeEventListener('click', arretDecompte);
    bouton.addEventListener('click', lancerDecompte);
}

//Permet de lancer le décompte quand on clique sur le bouton
function lancerDecompte(){
    minute = minuteT;
    seconde = secondeT;
    id = setInterval(decompte,1000);
    document.getElementById("monBouton").textContent = "⏹︎";
    bouton.addEventListener('click', arretDecompte);
    bouton.removeEventListener('click', lancerDecompte);
    
}
// Fonction permettant de vérifier les informations saisies par l'utilisateur dans le formulaire
function verifForm(){
    let verifMinuteT = parseInt(document.getElementById("nbMin").value);
    let verifSecondeT = parseInt(document.getElementById("nbSec").value);
    let verifMinuteP = parseInt(document.getElementById("nbMinP").value);
    let verifSecondeP = parseInt(document.getElementById("nbSecP").value);


    if(verifMinuteT>=0 && verifMinuteT<60 || verifMinuteP>=0 && verifMinuteP<60){
        if(verifSecondeT>=0 && verifSecondeT<60 || verifSecondeP>=0 && verifSecondeP<60){
            return true;
        }
    }
    // Envoie un message d'erreur
    throw new Error("Vérifier que les minutes et les secondes soient comprises entre 0 et 59 ");
}

// Permet de lancer la vérification du formulaire quand on clique sur le bouton pour l'envoyer
document.getElementById("monFormulaire").addEventListener("submit", function(event) {
    event.preventDefault(); // Permet d'empêcher le comportement par défaut
    // Vérifier le formulaire sinon renvoie une erreur
    try {
        if(verifForm()){
            minuteT = parseInt(document.getElementById("nbMin").value);
            secondeT = parseInt(document.getElementById("nbSec").value);
            minuteP = parseInt(document.getElementById("nbMinP").value);
            secondeP = parseInt(document.getElementById("nbSecP").value);
            minute = minuteT;
            seconde = secondeT;
            //Actualise l'affichage
            document.getElementById("affichage").textContent = minute + ":" + seconde;
        }
        
    } catch (error) {
        alert(error.message);
        
    }
})


