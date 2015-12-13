app.controller('busquedaProfesionalController', ['$scope', '$rootScope', 'profesionalesService', 'ngTableParams', function ($scope, $rootScope, profesionalesService, ngTableParams) {
        $scope.filtros = {
            "apellido": "",
            "nombres": "",
            "matricula": "",
            "email": "",
            "tipoProfesion": "",
            "ambito":"",
            "busquedaAvanzada":false
        };
        //CARGO TABLA CON TODOS LOS PROFESIONALES
        profesionalesService.getProfesionales().then(function (datos) {
            $rootScope.profesionalesAll=datos;
            $scope.profesionalesEncontrados = $rootScope.profesionalesAll;

            var data = $scope.profesionalesEncontrados;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10           // count per page        
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    //cuando hago $scope.tableParams.reload, esta funcion getData
                    //se ejecuta nuevamente y recargo otra vez la fuente de datos data
                    //con el array actualizado
                    data = $scope.profesionalesEncontrados;
                    //actualizo parametros seteados en la primera carga
                    params.total(data.length);
                    //actualizo el params.page a uno si se da la situacion de borrar el
                    //UNICO elemento de la ULTIMA pagina del table
                    if (params.total() <= ((params.page() - 1) * params.count())) {
                        params.page(1);
                    }
                    //obtengo los elementos de la pagina actual a mostrar
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
           });
        });
        
        var camposVacios = function(){
            isEmpty = true;
            if ($scope.filtros.matricula !="") {
                isEmpty = false;
            }

            if ($scope.filtros.nombres !="") {
                isEmpty = false;
            }

            if ($scope.filtros.apellido !="") {
                isEmpty = false;
            }

            if ($scope.filtros.email !="") {
                isEmpty = false;
            }

            if ($scope.filtros.tipoProfesion !="") {
                isEmpty = false;
            }

            if ($scope.filtros.ambito !="") {
                isEmpty = false;
            }
            return isEmpty;
        };

        $scope.buscar = function(){
            if($scope.formBusq.txtMatricula.$error.pattern){
                $scope.filtros.matricula="";
            }
            if (camposVacios()) {
                $scope.profesionalesEncontrados = $rootScope.profesionalesAll;
                $scope.tableParams.reload();    
            }else{
                $scope.profesionalesEncontrados = profesionalesService.buscar($scope.filtros);
                $scope.tableParams.reload();
            }
        };
        
        $scope.limpiarForm =function (){
            $scope.filtros = {
                "apellido": "",
                "nombres": "",
                "matricula": "",
                "email": "",
                "tipoProfesion": "",
                "ambito":"",
                "busquedaAvanzada":false
            };
        }
}]);