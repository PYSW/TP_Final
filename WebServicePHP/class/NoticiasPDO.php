<?php 
	include_once 'DataBase.php';
	include_once 'modelo/Noticia.php';

	class NoticiasPDO{

		public function getAll(){
			try {
				$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('select * from noticias order by fechaPublicacion desc');
	            $query->execute();
	            return $query->fetchAll();
	        }catch (PDOException $e) {
	            $e->getMessage();
	        }
		}
		public function insert($noticia){
			 try {
			 	$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('insert into noticias values(?,?,?,?)');
	            $lastId=$mdb->lastInsertId();
	            $query->bindParam(1, $lastId);
	            $query->bindParam(2, $noticia->encabezado);
	            $query->bindParam(3, $noticia->contenido);
	            $fecha = $noticia->fechaPublicacion->format('Y-m-d');
	            $query->bindParam(4, $fecha);
	            return $query->execute();
	        } catch (PDOException $e) {
	            $e->getMessage();
	        }
		}

		public function update($noticia){
			try {
			 	$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('update noticias SET encabezado = ?, contenido = ?, fechaPublicacion = ? WHERE idnoticia = ?');
	            $query->bindParam(1, $noticia->encabezado);
	            $query->bindParam(2, $noticia->contenido);
	            $fecha = $noticia->fechaPublicacion->format('Y-m-d');
	            $query->bindParam(3, $fecha);
	            $query->bindParam(4, $noticia->idNoticia);
	            return $query->execute();
	        } catch (PDOException $e) {
	            $e->getMessage();
	        }		
		}

		public function delete($noticia){
			try {
			 	$database = new DataBase();
       			$mdb = $database->connect();
	            $query = $mdb->prepare('DELETE FROM noticias WHERE idnoticia = ?');
	            $query->bindParam(1, $noticia->idNoticia);
	            return $query->execute();
	        } catch (PDOException $e) {
	            $e->getMessage();
	        }
		}
	}
 ?>