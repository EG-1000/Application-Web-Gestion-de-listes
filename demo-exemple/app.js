// Script réalisé avec l'assistance de Google Mode IA de base
// Revu et ajusté pour les besoins du cours par Ève Février

// Variables globales
const dialog = document.getElementById('confirmDialog');
const dialogDesc = document.getElementById('dialogDesc');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
const statusMessage = document.getElementById('statusMessage');
const openButtons = document.querySelectorAll('.btn-open-modal');

let triggerButton = null;
let targetElementId = null;


// Écouteurs d'événement
for (let i = 0; i < openButtons.length; i++) {
    openButtons[i].addEventListener('click', ouvrirModale);
}
cancelBtn.addEventListener('click', fermerModale);
dialog.addEventListener('click', clicExterieur);
dialog.addEventListener('close', restituerFocus);


// 1. Ouvrir la modale
function ouvrirModale() {
    triggerButton = this; // "this" contient la référence du bouton Supprimer cliqué
    console.log(triggerButton)
    targetElementId = this.dataset.itemId;
    const itemName = this.dataset.itemName;

    dialogDesc.innerHTML = 'Êtes-vous sûr de vouloir supprimer <strong>« ' + itemName + ' »</strong> ? Cette action est irréversible.';
    dialog.showModal();
    cancelBtn.focus();
}

// 2. Fermer via le bouton Annuler
function fermerModale() {
    dialog.close();
}

// 3. Fermer en cliquant sur l'arrière-plan (backdrop)
function clicExterieur(event) {
    if (event.target === dialog) {
        dialog.close();
    }
}

// 4. Replacer le focus sur le bouton d'origine à la fermeture
function restituerFocus() {
    if (triggerButton && document.body.contains(triggerButton)) {
        triggerButton.focus();
    }
}

// 5. Confirmer la suppression
function confirmerSuppression() {
    const itemToRemove = document.getElementById(targetElementId);
    const itemName = triggerButton.dataset.itemName;

    if (itemToRemove) {
        itemToRemove.remove();
    }

    dialog.close();

    statusMessage.textContent = 'L\'élément « ' + itemName + ' » a été supprimé.';
    statusMessage.style.display = 'block';
}

confirmBtn.addEventListener('click', confirmerSuppression);