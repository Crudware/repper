<?php
ini_set("display_errors", 1);
error_reporting(E_ALL & ~E_NOTICE);

require_once('inc/settings.inc.php');
require_once('inc/functions.inc.php');
require_once('inc/classes.inc.php');

DB::connect();

// $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

session_start();
?>