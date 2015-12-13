app.controller('loginController', function($scope, autService, $location, $cookieStore){
    $scope.usuario = {nombreUsuario: '', claveUsuario:''};

    $scope.iniciarSesion = function(){
        $promesa = autService.iniciarSesion($scope.usuario)
        $promesa.success(function(datos){
            if (datos.length == 1){
                $scope.usuarioConectado.nombreUsuario = datos[0].usuario;
                $scope.usuarioConectado.estaConectado = true;
                $location.path('/'); 
                $cookieStore.put('estaConectado', true);
                $cookieStore.put('nombreUsuario', $scope.usuarioConectado.nombreUsuario);
            }
            else
            {
                alert("Datos invalidos...");
            }
        });
    };
});