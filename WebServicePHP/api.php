<?php
   
require_once("Rest.inc.php");
include_once 'class/ProfesionalPDO.php';
include_once 'class/NoticiasPDO.php';
include_once 'class/UsuarioPDO.php';

	class API extends REST {
	
		public function __construct(){
			parent::__construct();				// Init parent contructor
		}
		
		
		/*
		 * Public method for access api.
		 * This method dynmically call the method based on the query string
		 *
		 */

		 public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['rquest'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404);				// If the method not exist with in this class, response would be "Page not found".
		}
		
		private function iniciarSesion(){
            $nombreUsuario = $this->_request['nombreUsuario'];
            $claveUsuario = $this->_request['claveUsuario'];

            $pdoUsuario = new UsuarioPDO(); 
            $usuario = null;
            //en $usuario guardo e resultado de la consulta (array de un elemento)
            $usuario = $pdoUsuario->iniciarSesion($nombreUsuario, $claveUsuario);
            $this->response($this->json($usuario), 200);
        }       


        /*
        ** METODOS PARA PROFESIONALES
        */

		private function profesionales(){	
                    if($this->get_request_method() != "GET"){
                        $this->response('',406);
                    }
                    
                        $pdoProfesionales= new ProfesionalPDO();
                        $profesionales = $pdoProfesionales->getAll();
                        
                        $this->response($this->json($profesionales),200);
                        
		}
		
		private function insertProfesional(){    
            if($this->get_request_method() != "POST"){
                    $this->response('',406);
            }

            $fechaMatriculacion = DateTime::createFromFormat("d/m/Y", $this->_request['fechaMatriculacion']);
            $profesional = new profesional(
                    $this->_request['matricula'],
                    $this->_request['apellido'],
                    $this->_request['nombres'],
                    $this->_request['email'],
                    $fechaMatriculacion,
                    $this->_request['tipoProfesion'],
                    $this->_request['ambito'],
                    $this->_request['estado']
            );

            $pdoProfesionales= new ProfesionalPDO();
            $rowsAfected = 0;
            $rowsAfected = $pdoProfesionales->insert($profesional);
            //retorno resultado operacion
            if ($rowsAfected == 1){
                $result = array('status' => "Success", "msg" => "El Profesional ha sido AGREGADO Correctamente");
                $this->response($this->json($result), 200);
            } else {
                $result = array('status' => "error", "msg" => "Error, no one record afected.");
                $this->response($this->json($result), 200);
            }
        }

        private function deleteProfesional(){
                    if($this->get_request_method() != "DELETE"){
                            $this->response('',406);
                    }
                    $profesional = new Profesional(
                            $this->_request['matricula'], 
                    		null,        
                    		null,        
                    		null,        
                    		null,        
                    		null,        
                    		null,        
                    		null        
                    );
                    //print_r($estudiante);
                    $pdoProfesionales = new ProfesionalPDO();
                    
                    //concreto el borrado
                    $rowsAfected = 0;
                    $rowsAfected = $pdoProfesionales->delete($profesional);
                    //retorno resultado operacion
                    if ($rowsAfected == 1){
                        $result = array('status' => "Success", "msg" => "El Profesional ha sido ELIMINADO Correctamente");
                        $this->response($this->json($result), 200);
                    } else {
                        $result = array('status' => "error", "msg" => "Error, no one record afected.");
                        $this->response($this->json($result), 200);
                    }
		}

		private function updateProfesional(){    
	        if($this->get_request_method() != "POST"){
	                $this->response('',406);
	        }

	        $fechaMatriculacion = DateTime::createFromFormat("d/m/Y", $this->_request['fechaMatriculacion']);
            $profesional = new profesional(
                    $this->_request['matricula'],
                    $this->_request['apellido'],
                    $this->_request['nombres'],
                    $this->_request['email'],
                    $fechaMatriculacion,
                    $this->_request['tipoProfesion'],
                    $this->_request['ambito'],
                    $this->_request['estado']
            );

	        $pdoProfesionales = new ProfesionalPDO();
	        $rowsAfected = 0;
	        $rowsAfected = $pdoProfesionales->update($profesional);
	        
	        //retorno resultado operacion
	        if ($rowsAfected == 1){
	            $result = array('status' => "Success", "msg" => "El Profesional ha sido MODIFICADO Correctamente");
	            $this->response($this->json($result), 200);
	        } else {
	            $result = array('status' => "error", "msg" => "Error, no one record afected.");
	            $this->response($this->json($result), 200);
	        }
	        
	    }

        /*
        ** METODOS PARA NOTICIAS
        */
        private function getNoticias(){
            if($this->get_request_method() != "GET"){
                $this->response('',406);
            }
            
            $pdoNoticias= new NoticiasPDO();
            $noticias = $pdoNoticias->getAll();
            
            $this->response($this->json($noticias),200);
        }

        private function insertNoticia(){    
            if($this->get_request_method() != "POST"){
                    $this->response('',406);
            }

            $fechaPublicacion = DateTime::createFromFormat("d/m/Y", $this->_request['fechaPublicacion']);
            $noticia = new noticia(
                    $this->_request['idnoticia'],
                    $this->_request['encabezado'],
                    $this->_request['contenido'],
                    $fechaPublicacion
            );

            $pdoNoticias= new NoticiasPDO();
            $rowsAfected = 0;
            $rowsAfected = $pdoNoticias->insert($noticia);
            //retorno resultado operacion
            if ($rowsAfected == 1){
                $result = array('status' => "Success", "msg" => "Noticia Agregada Correctamente");
                $this->response($this->json($result), 200);
            } else {
                $result = array('status' => "error", "msg" => "Error, no one record afected.");
                $this->response($this->json($result), 200);
            }
        }

        private function deleteNoticia(){
                    if($this->get_request_method() != "DELETE"){
                            $this->response('',406);
                    }
                    $noticia = new Noticia(
                            $this->_request['idnoticia'], 
                            null,        
                            null,        
                            null       
                    );

                    //print_r($estudiante);
                    $pdoNoticias = new NoticiasPDO();
                    
                    //concreto el borrado
                    $rowsAfected = 0;
                    $rowsAfected = $pdoNoticias->delete($noticia);
                    //retorno resultado operacion
                    if ($rowsAfected == 1){
                        $result = array('status' => "Success", "msg" => "Noticia Eliminada Correctamente");
                        $this->response($this->json($result), 200);
                    } else {
                        $result = array('status' => "error", "msg" => "Error, no one record afected.");
                        $this->response($this->json($result), 200);
                    }
        }

        private function updateNoticia(){    
            if($this->get_request_method() != "POST"){
                    $this->response('',406);
            }
            $fechaPublicacion = DateTime::createFromFormat("d/m/Y", $this->_request['fechaPublicacion']);
            $noticia = new noticia(
                    $this->_request['idnoticia'],
                    $this->_request['encabezado'],
                    $this->_request['contenido'],
                    $fechaPublicacion
            );

            $pdoNoticias = new NoticiasPDO();
            $rowsAfected = 0;
            $rowsAfected = $pdoNoticias->update($noticia);
            
            //retorno resultado operacion
            if ($rowsAfected == 1){
                $result = array('status' => "Success", "msg" => "Noticia Modificada Correctamente");
                $this->response($this->json($result), 200);
            } else {
                $result = array('status' => "error", "msg" => "Error, no one record afected.");
                $this->response($this->json($result), 200);
            }
            
        }











		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}


	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>