<?php 
	include "../class/ProfesionalPDO.php";

	$pdo = new ProfesionalPDO();
	$unProfesional = new Profesional("aa-0009", "addd", "adad", "adadadd@asd.com",
										DateTime::createFromFormat("Y-m-d", "1987-10-23"), 
										"Clinico", "n", 1);
	
	$pdo->delete($unProfesional);
 ?>