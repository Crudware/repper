<header class="navbar bg-dark text-white mb-4">
	<a class="navbar-brand" href="#" title="repper">REPPER</a>
	<ul class="navbar-nav flex-row">
		<?php
		$navArray = array(
						array(
							'page' => 'dashboard',
							'name' => 'Dashboard',
							'icon' => ''
						),
						array(
							'page' => 'workout',
							'name' => 'Workout',
							'icon' => ''
						),
						array(
							'page' => 'routines',
							'name' => 'Routines',
							'icon' => ''
						),
						array(
							'page' => 'statistics',
							'name' => 'Statistics',
							'icon' => ''
						),
					);

		foreach ($navArray as $navItem) {
			?>
			<li class="nav-item <?php echo ($_GET['page'] == $navItem['page']) ?? 'active' ?>">
				<a class="nav-link" href="<?php echo '?page=' . $navItem['page'] ?>">
					<?php
					if ($navItem['icon'] != '') {
						echo '<i class="' . $navItem['icon'] .'"></i>';
					}
					echo $navItem['name'];
					?>
				</a>
			</li>
			<?php
		}
		?>
	</ul>
	<a class="ml-auto" href="?page=settings" title="Settings">
		<span class="settings-icon">
			<i class="fas fa-cog fa-lg"></i>
		</span>
	</a>
</header>