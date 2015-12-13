<?php 
	class Noticia{
		public $idNoticia;
		public $encabezado;
		public $contenido;
		public $fechaPublicacion;

		public function __construct($idNoticia, $encabezado, $contenido, $fechaPublicacion) {
			$this->idNoticia = $idNoticia;
			$this->encabezado = $encabezado;
			$this->contenido = $contenido;
			$this->fechaPublicacion = $fechaPublicacion;
		}
	}
 ?>