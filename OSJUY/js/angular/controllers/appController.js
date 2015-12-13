app.controller('appController',function($scope, $location, $cookieStore){
    
    $scope.usuarioConectado = {nombreUsuario:'', estaConectado:''};
	
	var checkCookies = function(){
		if($cookieStore.get('estaConectado')==true){
			$scope.usuarioConectado.nombreUsuario = $cookieStore.get('nombreUsuario');
		    $scope.usuarioConectado.estaConectado = $cookieStore.get('estaConectado');
    	}
	};
	checkCookies();
	
    $scope.cerrarSesion = function(){
                $scope.usuarioConectado.nombreUsuario = "";
                $scope.usuarioConectado.estaConectado = false;
                $location.path('/login');
                $cookieStore.remove('estaConectado');
                $cookieStore.remove('nombreUsuario');

    }

});