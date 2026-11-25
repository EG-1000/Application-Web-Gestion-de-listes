<?php
ini_set('display_errors', 1);

// Verifier si l'exécution se fait sur le serveur de développement (local) ou celui de la production:
if (stristr($_SERVER['HTTP_HOST'], 'local') || (substr($_SERVER['HTTP_HOST'], 0, 7) == '192.168')) {
    $blnLocal = TRUE;
} else {
    $blnLocal = FALSE;
}

// Selon l'environnement d'exécution (développement ou production)
if ($blnLocal) {
    $strHost = 'localhost';
    $strBD = 'gestion_app_2026';
    $strUser = 'gestion_app_2026';
    $strPassword = 'gestion=rpni'; //ajuster au bon mot de passe.
    error_reporting(E_ALL);
} else {
    $strHost = 'timunix3.cegep-ste-foy.qc.ca';
    $strBD = ' 26_rpni1_P2_emile';
    $strUser = '26_pwem_emile';
    $strPassword = '2356326*T1m';
    error_reporting(E_ALL & ~E_NOTICE);
}

//Data Source Name pour l'objet PDO
$strDsn = 'mysql:dbname=' . $strBD . ';host=' . $strHost;

//Tentative de connexion
$pdoConnexion = new PDO($strDsn, $strUser, $strPassword);
//Changement d'encodage de l'ensemble des caractères pour UTF-8
$pdoConnexion->exec("SET CHARACTER SET utf8");
//Pour obtenir des rapports d'erreurs et d'exception avec errorInfo()
$pdoConnexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//$pdoConnexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);
