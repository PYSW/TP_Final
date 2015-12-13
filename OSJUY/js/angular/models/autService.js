app.service('autService', function($http, $q){

    this.iniciarSesion = function (usuarioDatos){
        var request = $http({
            method: 'post',
            url: 'http://localhost/WebServicePHP/iniciarSesion',
            data: angular.toJson(usuarioDatos),
            //params: {nombreUsuario: usuarioDatos.nombreUsuario, claveUsuario: usuarioDatos.claveUsuario}
            headers: { 'Content-Type': 'application/json' }   
            });
        return request;
    };  
});