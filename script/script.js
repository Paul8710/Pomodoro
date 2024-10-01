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
let id; // Stock l'ID de l'intervalle pour le décompte
let pause = true; // Pour savoir si on est en pause ou en travail

// Lier le bouton HTML au JavaScript
let bouton = document.getElementById('monBouton');
let formulaire = document.getElementById('formulaire'); // Sélection du formulaire
let bdisparu = document.getElementById('gear');

// Affichage initial
document.getElementById("timeT").style.color = "yellow";
document.getElementById("affichage").textContent = `${minute}:${seconde < 10 ? '0' : ''}${seconde}`;

// Lance la fonction disparitus quand le bouton est cliqué
bdisparu.addEventListener('click', disparitus);

// Fonction pour afficher ou masquer le formulaire
function disparitus() {
    formulaire.style.display = gear ? "block" : "none"; // Affiche ou masque le formulaire
    gear = !gear; // Inverse l'état
}

// Fonction de décompte
function decompte() {
    if (seconde == 0 && minute != 0) {
        seconde = 59;
        minute -= 1;
    } else {
        seconde -= 1;
    }

    // Affiche le temps
    document.getElementById("affichage").textContent = `${minute}:${seconde < 10 ? '0' : ''}${seconde}`;

    if (seconde == 0 && minute == 0) {
        if (pause) {
            minute = minuteP;
            seconde = secondeP;
            document.getElementById("moncercle").style.background = "green";
            document.getElementById("timeP").style.color = "yellow";
            document.getElementById("timeT").style.color = "white";
        } else {
            minute = minuteT;
            seconde = secondeT;
            document.getElementById("moncercle").style.background = "#D50000";
            document.getElementById("timeT").style.color = "yellow";
            document.getElementById("timeP").style.color = "white";
        }
        pause = !pause; // Inverser l'état de pause
    }
}

// Fonction pour lancer ou arrêter le décompte
function toggleDecompte() {
    if (id) {
        arretDecompte();
    } else {
        lancerDecompte();
    }
}

// Permet de lancer le décompte quand on clique sur le bouton
function lancerDecompte() {
    id = setInterval(decompte, 1000);
    // Changer l'icône de play à reset
    bouton.className = "fa-solid fa-arrow-rotate-right fa-3x"; // Met à jour la classe
    bouton.removeEventListener('click', lancerDecompte); // Retire l'ancien événement
    bouton.addEventListener('click', arretDecompte); // Ajoute l'événement pour arrêter
}

// Permet de réinitialiser le décompte quand on clique sur le bouton
function arretDecompte() {
    clearInterval(id);
    id = null; // Réinitialiser id
    minute = minuteT;
    seconde = secondeT;
    document.getElementById("affichage").textContent = `${minute}:${seconde < 10 ? '0' : ''}${seconde}`;
    // Changer l'icône de reset à play
    bouton.className = "fa-solid fa-play fa-3x"; // Met à jour la classe
    bouton.removeEventListener('click', arretDecompte); // Retire l'ancien événement
    bouton.addEventListener('click', toggleDecompte); // Rétablit l'événement pour lancer
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
    throw new Error("Vérifiez que les minutes soient 0 à 120 et les secondes 0 à 59");
}

// Permet de lancer la vérification du formulaire quand on clique sur le bouton pour l'envoyer
document.getElementById("monFormulaire").addEventListener("submit", function (event) {
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
            document.getElementById("affichage").textContent = `${minute}:${seconde < 10 ? '0' : ''}${seconde}`;
        }
    } catch (error) {
        alert(error.message);
    }
});

// Ajout de l'événement pour démarrer le décompte
bouton.addEventListener('click', toggleDecompte);
