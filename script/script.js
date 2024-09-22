let minute = 25;
let seconde = 0;
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

bouton.addEventListener('click', () => {
    setInterval(decompte,1000);
})