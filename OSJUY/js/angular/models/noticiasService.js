app.service('noticiasService', function ($http, $q) {
    
    this.getNoticias = function () {
        var datosRecu = null;
        var deferred = $q.defer();
        $http.get("http://localhost/WebServicePHP/getNoticias").success(function(datos){
            datosRecu = datos;
            deferred.resolve(datosRecu);
        });
        return deferred.promise;
    };
    
    this.insert = function (noticia){
        var request = $http({
            method: 'post',
            url: 'http://localhost/WebServicePHP/insertNoticia',
            data: angular.toJson(noticia),
            headers: { 'Content-Type': 'application/json' }
        });
        return request;          
    };
    
    this.update = function (noticia){
        var request = $http({
            method: 'post',
            url: 'http://localhost/WebServicePHP/updateNoticia',
            data: angular.toJson(noticia),
            headers: { 'Content-Type': 'application/json' }
        });
        return request;
    };
    
    this.delete = function (noticia){
        var request = $http({
            method: 'delete',
            url: 'http://localhost/WebServicePHP/deleteNoticia',
            params: {idnoticia: noticia.idnoticia}
        });
        return request; 
    };
});