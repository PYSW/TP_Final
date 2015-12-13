<?php 
	class Usuario{
		public usuario;
		public clave;
		public fechaModificacion;

		public function __construct($usuario, $clave, $fechaModificacion){
			$this->usuario = $usuario;
			$this->clave = $clave;
			$this->fechaModificacion = $fechaModificacion;
		}
	}
 ?>