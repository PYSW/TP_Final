app.controller('noticiasController', 
['$scope','noticiasService','ngTableParams',
function ($scope, noticiasService, ngTableParams){
    $scope.isModificacion = false;
    
    $scope.noticia = {
        "idnoticia": "",
        "fechaPublicacion": "",
        "encabezado": "",
        "contenido": ""
    };
    
    $scope.limpiarForm = function (){
        $scope.isModificacion = false;
        $scope.noticia = {
            "idnoticia": "",
	        "fechaPublicacion": "",
	        "encabezado": "",
	        "contenido": ""
        };
    };
    
    //CARGO TABLA NOTICIAS
    noticiasService.getNoticias().then(function (datos) {
        $scope.noticias = datos;

        var data = $scope.noticias;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 5           // count per page        
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                //cuando hago $scope.tableParams.reload, esta funcion getData
                //se ejecuta nuevamente y recargo otra vez la fuente de datos data
                //con el array actualizado
                data = $scope.noticias;
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

	$scope.addNoticia = function () {
        var $nuevaNoticia={
            "idnoticia": $scope.noticia.idnoticia,
	        "fechaPublicacion": $scope.noticia.fechaPublicacion,
	        "encabezado": $scope.noticia.encabezado,
	        "contenido": $scope.noticia.contenido
        };

        $promesa = noticiasService.insert($nuevaNoticia);
        $promesa.then(function(status){
            alert(status.data.msg);

            //actualizo fuente de datos y recargo la tabla
            noticiasService.getNoticias().then(function(datos){
                $scope.noticias = datos;
                $scope.tableParams.reload();
            });
        });
        $scope.limpiarForm();
    };
    
    $scope.updateNoticia = function (){
        $promesa = noticiasService.update($scope.noticia);
        $promesa.then(function(status){
            alert(status.data.msg);

            //actualizo fuente de datos y recargo la tabla
            noticiasService.getNoticias().then(function(datos){
                $scope.noticias = datos;
                $scope.tableParams.reload();
            });
        });
        $scope.limpiarForm();
    };
    
    $scope.deleteNoticia = function(noticia){
        $promesa = noticiasService.delete(noticia);
        $promesa.then(function(status){
            alert(status.data.msg);

            //actualizo fuente de datos y recargo la tabla
            noticiasService.getNoticias().then(function(datos){
                $scope.noticias = datos;
                $scope.tableParams.reload();
            });
        });
        $scope.limpiarForm();
    };

    $scope.seleccionarNoticia = function (noticia){
        $scope.isModificacion = true;
        $fechaPublicacion = new Date(noticia.fechaPublicacion);
        $fechaFormateada = $fechaPublicacion.toLocaleDateString();
        $scope.noticia = {
            "idnoticia": noticia.idnoticia,
	        "fechaPublicacion": $fechaFormateada,
	        "encabezado": noticia.encabezado,
	        "contenido": noticia.contenido
        };
    }
}]);