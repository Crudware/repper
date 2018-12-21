<?php include('inc/templates/init.php') ?>

<!doctype html>
<html lang="en">
	<head>
	 	<?php include('inc/templates/html_head.php') ?>
	</head>

	<body class="bg-light">
		<?php include('inc/templates/header.php') ?>

		<main>
			<?php
			switch ($_GET['page']) {
				case 'workout':
					include('inc/pages/workout.php');
				break;
				case 'routines':
					include('inc/pages/routines.php');
				break;
				case 'statistics':
					include('inc/pages/statistics.php');
				break;
				case 'settings':
					include('inc/pages/settings.php');
				break;
			}
			?>
		</main>

		<?php include('inc/templates/footer.php') ?>
		<?php include('inc/templates/scripts.php') ?>
	</body>
</html>