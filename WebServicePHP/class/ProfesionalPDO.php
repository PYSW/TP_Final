<?php 
	include_once 'DataBase.php';
	include_once 'modelo/Profesional.php';

	class ProfesionalPDO{

		public function getAll(){
			try {
				$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('select * from profesionales');
	            $query->execute();
	            return $query->fetchAll();
	        }catch (PDOException $e) {
	            $e->getMessage();
	        }
		}

		public function insert($profesional){
			 try {
			 	$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('insert into profesionales values(?,?,?,?,?,?,?,?)');
	            $query->bindParam(1, $profesional->matricula);
	            $query->bindParam(2, $profesional->apellido);
	            $query->bindParam(3, $profesional->nombres);
	            $query->bindParam(4, $profesional->email);
	            $fecha = $profesional->fechaMatriculacion->format('Y-m-d');
	            $query->bindParam(5, $fecha);
	            $query->bindParam(6, $profesional->tipoProfesion);
	            $query->bindParam(7, $profesional->ambito);
	            $query->bindParam(8, $profesional->estado);
	            return $query->execute();
	        } catch (PDOException $e) {
	            $e->getMessage();
	        }
		}

		public function update($profesional){
			try {
			 	$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('update profesionales SET apellido = ?, nombres = ?, email = ?, fechaMatriculacion = ?, 
	            						tipoProfesion = ?, ambito = ?, estado = ? WHERE matricula = ?');
	            $query->bindParam(1, $profesional->apellido);
	            $query->bindParam(2, $profesional->nombres);
	            $query->bindParam(3, $profesional->email);
	            $fecha = $profesional->fechaMatriculacion->format('Y-m-d');
	            $query->bindParam(4, $fecha);
	            $query->bindParam(5, $profesional->tipoProfesion);
	            $query->bindParam(6, $profesional->ambito);
	            $query->bindParam(7, $profesional->estado);
	            $query->bindParam(8, $profesional->matricula);
	            return $query->execute();
	        } catch (PDOException $e) {
	            $e->getMessage();
	        }		
		}

		public function delete($profesional){
			try {
			 	$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('DELETE FROM profesionales WHERE matricula = ?');
	            $query->bindParam(1, $profesional->matricula);
	            return $query->execute();
	        } catch (PDOException $e) {
	            $e->getMessage();
	        }
		}
	}
 ?>