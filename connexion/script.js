/***** Variables globales *****/
// Objets html
const refForm = document.getElementById('loginForm') || document.getElementById('registerForm');
const refInputCourriel = document.getElementById('email');
const refInputMotDePasse = document.getElementById('password');
const refRetroErreurCourriel = document.getElementById('email-error');
const refRetroErreurMotdePasse = document.getElementById('password-error');
const refBtnTogglePassword = document.getElementById('togglePassword');
const refInputConfirmation = document.getElementById('password-confirmation');
const refRetroErreurConfirmation = document.getElementById('password-confirmation-error');

/***** FONCTIONS *****/

function validerFormulaire(e) {
    const courrielEstValide = validerCourriel();
    const motDePasseEstValide = validerMotDePasse();
    const confirmationEstValide = !refInputConfirmation || validerConfirmationMotDePasse();

    if (!courrielEstValide || !motDePasseEstValide || !confirmationEstValide) {
        e.preventDefault(); // Bloque l'envoi du formulaire

        // Met le focus sur le premier champ en erreur pour l'accessibilité
        if (!courrielEstValide) {
            refInputCourriel.focus();
        } else if (!motDePasseEstValide) {
            refInputMotDePasse.focus();
        } else {
            refInputConfirmation.focus();
        }
    }
}

/**
 * Validation du courriel
 * @returns {boolean} blnEstValide
 */
function validerCourriel() {
    let blnEstValide;
    if (refInputCourriel.validity.valueMissing) {
        refRetroErreurCourriel.textContent = "L'adresse courriel est obligatoire.";
        refInputCourriel.classList.add('input-error');
        refInputCourriel.setAttribute('aria-invalid', 'true');
        blnEstValide = false;
    } else if (refInputCourriel.validity.typeMismatch) {
        refRetroErreurCourriel.textContent = "Veuillez entrer une adresse courriel valide.";
        refInputCourriel.classList.add('input-error');
        refInputCourriel.setAttribute('aria-invalid', 'true');
        blnEstValide = false;
    } else {
        refRetroErreurCourriel.textContent = '';
        refInputCourriel.classList.remove('input-error');
        refInputCourriel.setAttribute('aria-invalid', 'false');
        blnEstValide = true;
    }
    return blnEstValide;
}

/**
 * Validation du mot de passe
 * @returns {boolean} blnEstValide
 */
function validerMotDePasse() {
    let blnEstValide;
    if (refInputMotDePasse.validity.valueMissing) {
        refRetroErreurMotdePasse.textContent = 'Le mot de passe est obligatoire.';
        refInputMotDePasse.classList.add('input-error');
        refInputMotDePasse.setAttribute('aria-invalid', 'true');
        blnEstValide = false;
    } else if (refInputMotDePasse.value.length < 6) {
        refRetroErreurMotdePasse.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        refInputMotDePasse.classList.add('input-error');
        refInputMotDePasse.setAttribute('aria-invalid', 'true');
        blnEstValide = false;
    } else {
        refRetroErreurMotdePasse.textContent = '';
        refInputMotDePasse.classList.remove('input-error');
        refInputMotDePasse.setAttribute('aria-invalid', 'false');
        blnEstValide = true;
    }
    return blnEstValide;
}

function validerConfirmationMotDePasse() {
    const estValide = refInputConfirmation.value === refInputMotDePasse.value;

    refRetroErreurConfirmation.textContent = estValide
        ? ''
        : 'Les mots de passe ne correspondent pas.';
    refInputConfirmation.classList.toggle('input-error', !estValide);
    refInputConfirmation.setAttribute('aria-invalid', estValide ? 'false' : 'true');

    return estValide;
}

/**
 * Basculer la visibilité du mot de passe de manière accessible
 */
function basculerVisibiliteMotDePasse() {
    const estMasque = refInputMotDePasse.getAttribute('type') === 'password';

    if (estMasque) {
        refInputMotDePasse.setAttribute('type', 'text');
        refBtnTogglePassword.textContent = 'Masquer';
        refBtnTogglePassword.setAttribute('aria-label', 'Masquer le mot de passe');
        refBtnTogglePassword.setAttribute('aria-pressed', 'true');
    } else {
        refInputMotDePasse.setAttribute('type', 'password');
        refBtnTogglePassword.textContent = 'Afficher';
        refBtnTogglePassword.setAttribute('aria-label', 'Afficher le mot de passe');
        refBtnTogglePassword.setAttribute('aria-pressed', 'false');
    }
}

/***** Écouteurs d'événement *****/

// Validation en temps réel au départ du focus (blur)
refInputCourriel.addEventListener('blur', validerCourriel);
refInputMotDePasse.addEventListener('blur', validerMotDePasse);

// Effacer les erreurs dès que l'utilisateur tape
refInputCourriel.addEventListener('input', function () {
    // seulement si le champ est déjà en erreur
    if (refInputCourriel.classList.contains('input-error')) {
        // à chaque touche on valide
        validerCourriel();
    }
});

refInputMotDePasse.addEventListener('input', function () {
    if (refInputMotDePasse.classList.contains('input-error')) {
        validerMotDePasse();
    }
    if (refInputConfirmation && refInputConfirmation.classList.contains('input-error')) {
        validerConfirmationMotDePasse();
    }
});

// Bouton afficher/masquer le mot de passe
refBtnTogglePassword.addEventListener('click', basculerVisibiliteMotDePasse);

if (refInputConfirmation) {
    refInputConfirmation.addEventListener('blur', validerConfirmationMotDePasse);
    refInputConfirmation.addEventListener('input', function () {
        if (refInputConfirmation.classList.contains('input-error')) {
            validerConfirmationMotDePasse();
        }
    });
}

// Soumission du formulaire
refForm.addEventListener('submit', validerFormulaire);
