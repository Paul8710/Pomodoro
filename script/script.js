// Stock le temps du compteur actuel
let minute = 25;
let seconde = 0;
// Stock le temps de travail
let minuteT = 25;
let secondeT = 0;
// Stock le temps de pause
let minuteP = 5;
let secondeP = 0;

let gear = true;

// la variable id permet de stocker l'id de l'intervalle afin de pouvoir l'arrêter
let id;
// permet de savoir si le prochain est un temps de pause ou non
let pause = true;
// lie le bouton HTML au javascript
let bouton = document.getElementById('monBouton');
// lance la fonction lancerDecompte quand le bouton est cliqué
bouton.addEventListener('click', lancerDecompte);

let formulaire = document.getElementById('formulaire'); // Sélection du formulaire
let bdisparu = document.getElementById('gear');
bdisparu.addEventListener('click', disparitus);

// Affichage Initiale
document.getElementById("timeT").style.color = "yellow";
document.getElementById("affichage").textContent = minute + ":" + seconde + "0";

function disparitus() {
    // Affiche ou masque le formulaire lorsque le bouton est cliqué
    if (gear) {
        formulaire.style.display = "block"; // Affiche le formulaire
        gear = false;
    } else {
        formulaire.style.display = "none"; // Masque le formulaire
        gear = true;
    }
}

// Permet de décompter le temps
function decompte() {
    if (seconde == 0 && minute != 0) {
        seconde = 59;
        minute -= 1;
    } else {
        seconde -= 1;
    }
    
    // Affiche le temps
    document.getElementById("affichage").textContent = minute + ":" + (seconde < 10 ? "0" + seconde : seconde);

    if (seconde == 0 && minute == 0) {
        if (pause) {
            minute = minuteP;
            seconde = secondeP;
            document.getElementById("moncercle").style.background = "green";
            document.getElementById("timeP").style.color = "yellow";
            document.getElementById("timeT").style.color = "white";
            document.getElementById("affichage").textContent = minute + ":" + (seconde < 10 ? "0" + seconde : seconde);
            pause = false;
        } else {
            minute = minuteT;
            seconde = secondeT;
            document.getElementById("moncercle").style.background = "#D50000";
            document.getElementById("timeT").style.color = "yellow";
            document.getElementById("timeP").style.color = "white";
            document.getElementById("affichage").textContent = minute + ":" + (seconde < 10 ? "0" + seconde : seconde);
            pause = true;
        }
    }
}

// Permet de réinitialiser le décompte quand on clique sur le bouton
function arretDecompte() {
    clearInterval(id);
    minute = minuteT;
    seconde = secondeT;
    document.getElementById("affichage").textContent = minute + ":" + (seconde < 10 ? "0" + seconde : seconde);
    document.getElementById("monBouton").innerHTML = "<i class='fa-solid fa-play'></i>";
    bouton.removeEventListener('click', arretDecompte);
    bouton.addEventListener('click', lancerDecompte);
}

// Permet de lancer le décompte quand on clique sur le bouton
function lancerDecompte() {
    minute = minuteT;
    seconde = secondeT;
    id = setInterval(decompte, 1000);
    document.getElementById("monBouton").innerHTML = "<i class='fa-solid fa-arrow-rotate-right'></i>";
    bouton.addEventListener('click', arretDecompte);
    bouton.removeEventListener('click', lancerDecompte);
}

// Fonction permettant de vérifier les informations saisies par l'utilisateur dans le formulaire
function verifForm() {
    let verifMinuteT = parseInt(document.getElementById("nbMin").value);
    let verifSecondeT = parseInt(document.getElementById("nbSec").value);
    let verifMinuteP = parseInt(document.getElementById("nbMinP").value);
    let verifSecondeP = parseInt(document.getElementById("nbSecP").value);

    if (verifMinuteT >= 0 && verifMinuteT <= 120 && verifMinuteP >= 0 && verifMinuteP <= 120) {
        if (verifSecondeT >= 0 && verifSecondeT < 60 && verifSecondeP >= 0 && verifSecondeP < 60) {
            if (!((verifSecondeT == 0 && verifMinuteT == 0) || (verifSecondeP == 0 && verifMinuteP == 0))) {
                return true;
            }
        }
    }
    // Envoie un message d'erreur
    throw new Error("Vérifiez que les minutes et les secondes soient comprises entre 0 et 59.");
}

// Permet de lancer la vérification du formulaire quand on clique sur le bouton pour l'envoyer
document.getElementById("monFormulaire").addEventListener("submit", function(event) {
    event.preventDefault(); // Permet d'empêcher le comportement par défaut
    // Vérifier le formulaire sinon renvoie une erreur
    try {
        if (verifForm()) {
            minuteT = parseInt(document.getElementById("nbMin").value);
            secondeT = parseInt(document.getElementById("nbSec").value);
            minuteP = parseInt(document.getElementById("nbMinP").value);
            secondeP = parseInt(document.getElementById("nbSecP").value);
            minute = minuteT;
            seconde = secondeT;
            // Actualise l'affichage
            document.getElementById("affichage").textContent = minute + ":" + (seconde < 10 ? "0" + seconde : seconde);
        }
    } catch (error) {
        alert(error.message);
    }
});
