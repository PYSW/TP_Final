<?php 
	class DataBase{
    public $dbHost;
    public $user;
    public $password;
    public $db_name;
    
    function __construct() {
        $this->dbHost = "localhost";
        $this->user = "root";
        $this->password = "";
        $this->dbName = "obrasocial";
    }
    
    public function connect(){
        $mdb = null;
        try{
            $mdb = new PDO( "mysql:host=".$this->dbHost.";"."dbname=".$this->dbName, $this->user);
        } catch (Exception $ex) {
            print $ex->getMessage();
        }
        return $mdb;        
    }   

	}
?>