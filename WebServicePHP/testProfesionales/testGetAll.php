<?php 
date_default_timezone_set('UTC');
	include '../class/ProfesionalPDO.php';
	//include 'class/Profesional.php';

	$pdo = new ProfesionalPDO();
	$lista = $pdo->getAll();
	echo "<h3>====== TEST getAll() Profesionales =====</h3>";
		foreach ($lista as $value) {
			print_r('matricula= '.$value['matricula'].' ');
			print_r('apellido= '.$value['apellido'].' ');
			print_r('nombres= '.$value['nombres'].' ');
			print_r('ambito= '.$value['ambito'].' ');
			print_r('estado= '.$value['estado'].' ');
			print_r('email= '.$value['email'].' ');
			echo "<br>";
		}
	
 ?>
