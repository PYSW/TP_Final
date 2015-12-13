app.controller('gestionProfesionalesController', 
['$rootScope', '$scope','profesionalesService','ngTableParams',
function ($rootScope, $scope, profesionalesService, ngTableParams){
    $scope.matriculaRepetida = false;
    $scope.isModificacion = false;
    
    $scope.profesional = {
        "matricula": "",
        "apellido": "",
        "nombres": "",
        "email": "",
        "fechaMatriculacion": "",
        "tipoProfesion": "Clinico",
        "ambito": "n",
        "estado": "0"
    };
    
    
    $scope.addProfesional = function () {
        //si estaddo seleccionado es falso lo dejo vacio para q la bd lo agregue correctamente
        if($scope.profesional.estado == "0"){
            $scope.profesional.estado = ""
        }
        //creo un profesional con datos del form para agregarlo a la bd
        var $nuevoProfesional={
            "matricula": $scope.profesional.matricula,
            "apellido": $scope.profesional.apellido,
            "nombres": $scope.profesional.nombres,
            "email": $scope.profesional.email,
            "fechaMatriculacion": $scope.profesional.fechaMatriculacion,
            "tipoProfesion": $scope.profesional.tipoProfesion,
            "ambito": $scope.profesional.ambito,
            "estado": $scope.profesional.estado,
        };

        //valido Matricula reptida
        if (profesionalesService.validarMatricula($nuevoProfesional)) {
            $promesa = profesionalesService.insert($nuevoProfesional);
            $promesa.then(function(status){
                alert(status.data.msg);
                //actualizo los estudiantes de la tabla
                profesionalesService.getProfesionales().then(function(datos){
                    $scope.profesionalesEncontrados = datos;
                    $scope.tableParams.reload();
                });
            });    
            $scope.limpiarForm();
        }else{
            alert("el profesional con la matricula: "+$nuevoProfesional.matricula+" ya existe");
            $scope.matriculaRepetida = true;
        }
    };
    
    $scope.updateProfesional = function (){
        if($scope.profesional.estado != "1"){
            $scope.profesional.estado = ""
        }
        $promesa = profesionalesService.update($scope.profesional);
            $promesa.then(function(status){
                alert(status.data.msg);
                //actualizo los estudiantes de la tabla
                profesionalesService.getProfesionales().then(function(datos){
                    $scope.profesionalesEncontrados = datos;
                    $scope.tableParams.reload();
            });        
        });
        $scope.limpiarForm();
    };
    
    $scope.deleteProfesional = function(profesional){
        $promesa = profesionalesService.delete(profesional);
        $promesa.then(function(status){
            alert(status.data.msg);
            //actualizo los estudiantes de la tabla
            profesionalesService.getProfesionales().then(function(datos){
                $scope.profesionalesEncontrados = datos;
                $scope.tableParams.reload();
            });
        });
        $scope.limpiarForm();
    };
    
    $scope.seleccionarProfesional = function (profesionalSeleccionado){
        $scope.isModificacion = true;
//        $scope.profesional.apellido = profesionalSeleccionado.apellido;
//        $scope.profesional.nombres = profesionalSeleccionado.nombres;
//        $scope.profesional.matricula = profesionalSeleccionado.matricula;
//        $scope.profesional.email = profesionalSeleccionado.email;
//        $scope.profesional.fechaMatriculacion = profesionalSeleccionado.fechaMatriculacion;
//        $scope.profesional.especialidad = profesionalSeleccionado.especialidad;
//        $scope.profesional.ambito = profesionalSeleccionado.ambito;
//        $scope.profesional.estado = profesionalSeleccionado.estado;
        $fechaMatriculacion = new Date(profesionalSeleccionado.fechaMatriculacion);
        //alert($fechaMatriculacion);
        $fechaFormateada = $fechaMatriculacion.toLocaleDateString();
        $scope.profesional = {
            "matricula": profesionalSeleccionado.matricula,
            "apellido": profesionalSeleccionado.apellido,
            "nombres": profesionalSeleccionado.nombres,
            "email": profesionalSeleccionado.email,
            "fechaMatriculacion": $fechaFormateada,
            "tipoProfesion": profesionalSeleccionado.tipoProfesion,
            "ambito": profesionalSeleccionado.ambito,
            "estado": profesionalSeleccionado.estado
        };
    }
    $scope.limpiarForm = function (){
        $scope.isModificacion = false;
        $scope.profesional = {
            "matricula": "",
            "apellido": "",
            "nombres": "",
            "email": "",
            "fechaMatriculacion" : "",
            "tipoProfesion": "Clinico",
            "ambito": "n",
            "estado": "0"
        };
    };
    
    //CARGO TABLA CON TODOS LOS PROFESIONALES
    profesionalesService.getProfesionales().then(function (datos) {
        $rootScope.profesionalesAll = datos;
        $scope.profesionalesEncontrados = $rootScope.profesionalesAll;

        var data = $scope.profesionalesEncontrados;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 5           // count per page        
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
}]);