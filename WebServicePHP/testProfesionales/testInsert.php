<?php 
date_default_timezone_set('UTC');
	include '../class/ProfesionalPDO.php';
	//include 'class/Profesional.php';

	$pdo = new ProfesionalPDO();

	echo "<h3>====== TEST insert() Profesional =====</h3>";
		$unProfesional = new Profesional("aa-0001", "addd", "adad", "adadadd@asd.com",
										DateTime::createFromFormat("Y-m-d", "1987-10-23"), 
										"Clinico", "n", 1);

	echo "<br>";
	print_r($unProfesional);
	$pdo->insert($unProfesional);

?>