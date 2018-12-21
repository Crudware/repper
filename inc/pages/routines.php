<div class="container">
	<div class="top-row row">
		<div class="col-12">
			<h1>Routines</h1>
		</div>
	</div>
	<div class="content-row routine-overview row">
		<div class="col-md-8 col-sm-12 title-col"></div>
		<div class="col-md-8 col-sm-12">
			<div class="routine-overview-container bg-white rounded shadow">
				<a id="add-new-routine" class="add-new-routine" href="javascript:void(0);">
					<span class="add-new-set-icon align-middle">
						<i class="fas fa-plus fa-lg"></i>
					</span>
				</a>
				<?php
				$routines = Routine::all();
				$routineCount = max(array(count(array_filter($routines)), 1));
				for ($i = 0; $i < $routineCount; $i++) {
					$routine = ($i > 0) ? $routines[$i] : '';
					// pre($routine);
					$routineId = '';
					$routineName = '';
					$lastDate = '-';
					if (is_object($routine)) {
						$routineId = $routine->id();
						$routineName = $routine->name;
						if (1 == 2) {
							$lastDate = 'getLastWorkoutDateForThisRoutine';
						}
					}
					?>
					<div class="routine" <?php echo (!is_object($routine)) ? 'style="display: none!important;"' : '' ?> >
						<a class="edit-routine" data-routine-id="<?php echo $routineId ?>" href="javascript:void(0);">
							<div class="routine-section routine-name">
								<span class="routine-name-value"><?php echo $routineName ?></span>
							</div>
							<div class="routine-section routine-last-workout">
								<span class="date-label">Last:&nbsp;</span><span class="date-value"><?php echo $lastDate ?></span>
							</div>
						</a>
						<a class="delete-routine" data-routine-id="<?php echo $routineId ?>" href="javascript:void(0);">
							<div class="routine-section routine-action routine-delete ml-auto">
								<i class="fas fa-trash-alt"></i>
							</div>
						</a>
					</div>
					<?php
				}
				?>
			</div>
			<div class="routine-container bg-white rounded shadow">
				<div class="">

				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-12"></div>
	</div>
	<div class="content-row routine-detail row" data-routine-id="">
		<div class="col-md-8 col-sm-12 title-col d-flex">
			<a id="back-to-routine-overview" href="javascript:void(0);">
				<i class="fas fa-arrow-left"></i>&nbsp;<span>Routines</span>
			</a>
			<h2 id="edit-routine-title" class="routine-title ml-auto d-inline-block"><span class="routine-title-value">null</span></h2>
		</div>
		<div class="col-md-8 col-sm-12">
			<div class="routine-container bg-white rounded shadow">
				<div class="">
					make ajax call to load sets of this routine
				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-12">
			<div class="set-container">
				<?php
				$sets = Set::all();
				$setCount = max(array(count(array_filter($sets)), 1));
				for ($i = 0; $i < $setCount; $i++) {
					$set = ($i > 0) ? $sets[$i] : '';
					$setId = '';
					$setAmountTarget = '';
					$excercise = '';
					$excerciseName = '';
					$unit = '';
					$unitName = '';
					if (is_object($set)) {
						$setId = $set->id();
						$setAmountTarget = $set->amount_target;
						$excercise = $set->excercise();
						$excerciseName = (is_object($excercise)) ? $excercise->name : '';
						$unit = $set->unit();
						$unitName = (is_object($unit)) ? $unit->short_name : '';
					}
					?>
					<div class="set mb-2 d-flex flex-row align-items-center rounded bg-white shadow" data-set-id="<?php echo $setId ?>" <?php echo (!is_object($set)) ? 'style="display: none!important;"' : '' ?> >
						<div class="set-section set-grip rounded-left">
							<a class="grab-set" href="javascript:void(0);">
								<i class="fas fa-grip-vertical"></i>
							</a>
						</div>
						<div class="set-section set-excercise">
							<a class="edit-set-excercise" href="javascript:void(0);">
								<span class="set-excercise-value"><?php echo $excerciseName ?></span>
							</a>
						</div>
						<div class="set-section set-amount">
							<a class="edit-set-amount" href="javascript:void(0);">
								<span class="set-amount-value"><?php echo $setAmountTarget ?></span>
							</a>
						</div>
						<div class="set-section set-unit">
							<a class="edit-set-unit" href="javascript:void(0);">
								<span class="set-unit-value"><?php echo $unitName ?></span>
							</a>
						</div>
						<div class="set-section set-action set-add-to-routine">
							<a class="add-set-to-routine" href="javascript:void(0);">
								<i class="fas fa-plus fa-lg"></i>
							</a>
						</div>
						<div class="set-section set-action set-settings">
							<a class="edit-set" href="javascript:void(0);">
								<i class="fas fa-wrench"></i>
							</a>
						</div>
						<div class="set-section set-action set-delete rounded-right">
							<a class="delete-set" href="javascript:void(0);">
								<!-- <i class="far fa-trash-alt"></i> -->
								<i class="fas fa-trash-alt"></i>
							</a>
						</div>
					</div>
					<?php
				}
				?>
				<a id="add-new-set" class="set add-new-set text-center rounded" href="javascript:void(0);">
					<span class="add-new-set-icon align-middle">
						<i class="fas fa-plus fa-lg"></i>
					</span>
				</a>
			</div>
		</div>
	</div>
</div>