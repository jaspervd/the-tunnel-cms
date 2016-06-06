<?php
ini_set('display_errors', true);
error_reporting(E_ALL);

define('DS', DIRECTORY_SEPARATOR);
define('WWW_ROOT', __DIR__ . DS);

$basename = substr($_SERVER['REQUEST_URI'], 0, -1); // trim last dash
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<title>CMS // The Tunnel - Change my view</title>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div class="container"></div>
	<script>
	window.app = window.app || {};
	window.app.basename = '<?php echo $basename; ?>';
	</script>
	<script src="js/script.js"></script>
</body>
</html>