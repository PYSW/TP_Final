<?php 
	include_once 'DataBase.php';
	include_once 'modelo/Profesional.php';

	class UsuarioPDO{

		public function iniciarSesion($usuarioNombre, $usuarioClave){
            $database = new DataBase();
            $mdb = $database->connect();
            $usuario = null;
            
            $mdb->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //preparo la sentencia
            $sentencia = $mdb->prepare("SELECT usuario, clave, fechaActualizacion FROM usuarios
                                        WHERE usuario = :usuario AND clave = :clave");
            //conformo un array con los parametros pasados a la sentencia preparada
            $arrayParametro = array(':usuario' => $usuarioNombre,
                                    ':clave' => $usuarioClave);
            //ejecuto la sentencia
            $sentencia->execute($arrayParametro);
            $arrayConstructor = array("usuario", "clave", "fechaActualizacion");
            $sentencia->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, 'Usuario', $arrayConstructor);
            $usuario = $sentencia->fetchAll();
            return $usuario;
        }
    }

 ?>