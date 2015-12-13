app.service('profesionalesService', function ($http, $q, $rootScope) {
    
    this.getProfesionales = function () {
        var datosRecu = null;
        var deferred = $q.defer();
        $http.get("http://localhost/WebServicePHP/profesionales").success(function(datos){
            datosRecu = datos;
            deferred.resolve(datosRecu);
        });
        return deferred.promise;
    };
    
    this.buscar = function (filtros){
        var encontrados = [];
        console.log(filtros);
        console.log($rootScope.profesionalesAll);
        angular.forEach($rootScope.profesionalesAll, function (value, index){
            var bandera = false;
            
            //BUSCO POR MATRICULA
            if(filtros.matricula !== "" && value.matricula.toLowerCase().contains(filtros.matricula.toLowerCase())){
                bandera = true;
            }
            
            //BUSCO POR APELLIDO y NOMBRE
            if((filtros.apellido !== "" && value.apellido.toLowerCase().contains(filtros.apellido.toLowerCase()))
                    || (filtros.nombres !== "" && value.nombres.toLowerCase().contains(filtros.nombres.toLowerCase()))){
               bandera = true;
            }
            
            //BUSCO POR EMAIL
            if(filtros.email !== "" && value.email.toLowerCase().contains(filtros.email.toLowerCase())){
                bandera = true;
            }
            
            //BUSCO POR AMBITO
            if(filtros.ambito !== "" && value.ambito.toLowerCase().contains(filtros.ambito.toLowerCase())){
                bandera = true;    
            }
            
            //BUSCO POR ESPECIALIDAD
            if(filtros.busquedaAvanzada){
                if(value.tipoProfesion == filtros.tipoProfesion){
                    bandera = true;    
                }
            }
            
            if(bandera){
                encontrados.push(value);
            }
        });
        return encontrados;
    };
    
    this.validarMatricula = function (profesional){
        var valido = true;
        angular.forEach($rootScope.profesionalesAll, function (value,index){
            if(value.matricula.toLowerCase() == profesional.matricula.toLowerCase()){
                valido = false;
            }
        });
        return valido;
    };
    
    this.insert = function (profesional){
        var request = $http({
            method: 'post',
            url: 'http://localhost/WebServicePHP/insertProfesional',
            data: angular.toJson(profesional),
            headers: { 'Content-Type': 'application/json' }
        });
        return request;          
    };
    
    this.update = function (profesional){
        var request = $http({
            method: 'post',
            url: 'http://localhost/WebServicePHP/updateProfesional',
            data: angular.toJson(profesional),
            headers: { 'Content-Type': 'application/json' }
        });
        return request;
    };
    
    this.delete = function (profesional){
        var request = $http({
            method: 'delete',
            url: 'http://localhost/WebServicePHP/deleteProfesional',
            params: {matricula: profesional.matricula}
        });
        return request; 
    };
    
});