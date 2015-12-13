<?php 
date_default_timezone_set('UTC');
	include '../class/ProfesionalPDO.php';
	//include 'class/Profesional.php';

	$pdo = new ProfesionalPDO();

	echo "<h3>====== TEST update() Profesional =====</h3>";
		$unProfesional = new Profesional("aa-0001", "modif", "modif", "modif@asd.com",
										DateTime::createFromFormat("Y-m-d", "2000-02-02"), 
										"modif", "m", false);

	echo "<br>";
	print_r($unProfesional);
	$pdo->update($unProfesional);

?>