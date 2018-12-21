<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/repper/inc/settings.inc.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/repper/inc/functions.inc.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/repper/inc/classes.inc.php');

DB::connect();

ini_set("display_errors", 0);
error_reporting(E_ALL & ~E_NOTICE);

// testing
// $_POST['action'] = 'addRoutine';

/*
$_POST['action'] = 'getRoutine';
$_POST['id'] = 1;
*/

header('Content-type: application/json');

switch ($_POST['action']) {
	case 'addRoutine':
		$routine = new Routine();
		$routine->save();
		$routine->name = 'Routine ' . $routine->id();
		$routine->save();

		$response = array(
						'error' => '',
						'routineId' => $routine->id(),
						'routineName' => $routine->name
					);
		echo json_encode($response);
		break;
	case 'getRoutine':

		break;
	case 'deleteRoutine':
		$error = '';
		$routine = Routine::byId(intval($_POST['id']));
		if (is_object($routine)) {
			if (!$routine->delete()) {
				$error = 'Failed to delete routine.';
			}
		}

		$response = array(
						'error' => $error
					);
		echo json_encode($response);
		break;
	case 'addSet':
		$set = new Set();
		$set->save();

		$response = array(
						'error' => '',
						'setId' => $set->id()
					);
		echo json_encode($response);
		break;
	case 'deleteSet':
		$error = '';
		$set = Set::byId(intval($_POST['id']));
		if (is_object($set)) {
			if (!$set->delete()) {
				$error = 'Failed to delete set.';
			}
		}

		$response = array(
						'error' => $error
					);
		echo json_encode($response);
		break;
	case 'editRoutineTitle':
		$error = '';
		$routine = Routine::byId(intval($_POST['id']));
		if (is_object($routine)) {
			$routine->name = $_POST['title'];
			if (!$routine->save()) {
				$error = 'Failed to update routine title.';
			}
			$routineName = $routine->name;
		} else {
			$error = 'Routine not found.';
		}

		$response = array(
					'error' => $error,
					'routineName' => $routineName
				);
		echo json_encode($response);
	break;
	default:
		// none
}
?>