# Formulaire de connexion accessible et ergonomique

Ce projet propose un formulaire de connexion développé en **HTML5, CSS3 et JavaScript natif (Vanilla JS)**. Il est conçu selon une approche **Mobile First** et respecte les standards internationaux d'accessibilité numérique (**WCAG 2.1 / 2.2** et **RGAA 4.1**) ainsi que les recommandations modernes de **Chrome for Developers**.

---

## 1. Conformité aux normes d'accessibilité (WCAG & RGAA)

### Structure sémantique et relations explicites
* **Association étiquette / champ** : Chaque balise `<label>` est reliée de façon programmatique à son `<input>` via l'attribut `for` (Critère RGAA 11.1 / WCAG 1.3.1 et 3.3.2).
* **Liens avec les messages d'erreur** : L'attribut `aria-describedby` associe chaque champ à son conteneur d'erreur (`email-error` et `password-error`). Lorsqu'un lecteur d'écran focalise un champ, il lit automatiquement l'intitulé suivi du message d'erreur associé (WCAG 3.3.1).
* **Indications de champs obligatoires** : Les champs requis utilisent à la fois l'attribut natif `required` et `aria-required="true"`. L'astérisque visuel `*` est masqué aux lecteurs d'écran via `aria-hidden="true"` pour éviter une répétition inutile (« étoile, obligatoire »).

### Gestion dynamique des erreurs et retour vocal
* **Désactivation des bulles natives (`novalidate`)** : L'attribut `novalidate` sur la balise `<form>` empêche l'affichage des info-bulles par défaut des navigateurs, souvent peu contrastées, éphémères et difficiles à lire au zoom.
* **Annonces en temps réel (`aria-live="polite"`)** : Les conteneurs d'erreur utilisent `aria-live="polite"` afin que les technologies d'assistance annoncent les erreurs dès leur apparition sans interrompre la lecture en cours (WCAG 4.1.3).
* **État de validité (`aria-invalid`)** : Le JavaScript bascule dynamiquement `aria-invalid` entre `"false"` et `"true"` selon l'état du champ (RGAA 11.10).
* **Validation non intrusive (*Reward early, validate late*)** : La validation s'exécute à la sortie du champ (`blur`) ou à la soumission (`submit`). L'écouteur `input` ne s'active que si le champ est déjà en erreur (`classList.contains('input-error')`), évitant ainsi de signaler une faute dès la première lettre saisie.

### Navigation au clavier et contrôle visuel
* **Gestion intelligente du focus** : En cas d'échec à la soumission, `e.preventDefault()` bloque l'envoi et le focus est automatiquement déplacé sur le premier champ invalide (`.focus()`), évitant à l'utilisateur de chercher l'erreur dans la page (WCAG 2.4.3).
* **Indicateur de focus visible** : La pseudo-classe `:focus-visible` applique un contour très contrasté de `3px` (`outline-offset: 2px`) sur tous les champs et boutons (WCAG 2.4.7 / RGAA 10.7).
* **Bouton « Afficher / Masquer » accessible** : Ce bouton utilise `type="button"` (pour ne pas soumettre le formulaire par erreur), met à jour son `aria-label` et expose son état actif via `aria-pressed` (WCAG 3.3.8 - *Accessible Authentication*).
* **Contrastes et mise en page stable** : Les couleurs respectent un ratio de contraste supérieur à **4.5:1** (WCAG 1.4.3). Une hauteur minimale (`min-height: 1.25rem`) est réservée sous chaque champ pour éviter tout décalage de mise en page (*Layout Shift*) lors de l'affichage d'une erreur.

---

## 2. Respect des recommandations Chrome for Developers

Ce formulaire applique les directives publiées par l'équipe Google Chrome concernant l'authentification et le remplissage automatique (*Autofill*) :

* **Compatibilité avec les gestionnaires de mots de passe** :
  * L'utilisation des attributs standards `autocomplete="email"` (ou `username`) et `autocomplete="current-password"` permet à Chrome et aux gestionnaires tiers de détecter le formulaire et de proposer les identifiants enregistrés sans friction.
  * Le bouton d'affichage du mot de passe modifie l'attribut `type` de `password` à `text` sans détruire ni recréer l'élément `<input>` dans le DOM, préservant ainsi la liaison avec le gestionnaire de mots de passe.
* **Claviers virtuels adaptés sur mobile** : L'utilisation de `type="email"` déclenche automatiquement l'affichage d'un clavier mobile incluant le caractère `@` et le `.`.
* **Prévention du zoom automatique sur iOS / mobile** : La taille de police des champs est fixée à `1rem` (`16px`), ce qui empêche les navigateurs mobiles de zoomer brutalement lors du focus dans un champ.
* **Autorisation du copier-coller** : Aucun blocage n'est appliqué sur les événements `paste`, permettant aux utilisateurs d'utiliser des mots de passe complexes générés par un gestionnaire (critère également exigé par WCAG 2.2 - 3.3.8).

---

## 3. Structure des fichiers

```text
├── index.html   # Redirection vers le traitement PHP
├── style.css    # Design Mobile First, contrastes élevés et états :focus-visible
├── script.js    # Validation progressive, gestion aria-invalid et bascule du mot de passe
└── README.md    # Documentation technique et conformité
```

Les formulaires de connexion et de création de compte sont servis par
`../connexion.php`. Ils utilisent la table `utilisateur` (colonnes `courriel`
et `mot_de_passer`). Les mots de passe des nouveaux comptes sont créés avec
`password_hash()` et vérifiés avec `password_verify()`. Après une inscription
ou une connexion réussie, l’utilisateur est redirigé vers `../index.php`.
L’accueil requiert une session authentifiée. Les pages doivent être ouvertes
via un serveur PHP, pas directement comme des fichiers HTML.

---

## 4. Comment tester l'accessibilité

1. **Navigation 100 % au clavier** : Utilisez uniquement les touches `Tab`, `Maj + Tab`, `Espace` (pour le bouton Afficher) et `Entrée` (pour soumettre). Vérifiez que l'anneau de focus est toujours visible et que le curseur se place dans le premier champ en erreur.
2. **Lecteur d'écran** : Testez le parcours avec **NVDA** (Windows), **VoiceOver** (macOS / iOS) ou **TalkBack** (Android) pour vérifier l'annonce des libellés, de l'état `aria-pressed` et des messages d'erreur `aria-live`.
3. **Audit automatisé** : Ouvrez les outils de développement de Chrome (`F12`), allez dans l'onglet **Lighthouse** et lancez un audit **Accessibilité** et **Bonnes pratiques**.
