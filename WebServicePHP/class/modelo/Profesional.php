<?php
    
    class Profesional{
        public $matricula;
        public $apellido;
        public $nombres;
        public $email;
        public $fechaMatriculacion;
        public $tipoProfesion;
        public $ambito;
        public $estado;
        
        public function __construct($matricula, $apellido, $nombres, $email, $fechaMatriculacion, $tipoProfesion, $ambito, $estado){
            $this->matricula = $matricula;
            $this->apellido = $apellido;
            $this->nombres = $nombres;
            $this->email = $email;
            $this->fechaMatriculacion = $fechaMatriculacion;
            $this->tipoProfesion = $tipoProfesion;
            $this->ambito = $ambito;
            $this->estado = $estado;
        }
    }