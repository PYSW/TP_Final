

var app = angular.module('OSJUY', ['ngRoute', 'ngTable','ngCookies']);

app.config(function ($routeProvider) {
    $routeProvider

            .when("/", {
                controller: "noticiasController",
                templateUrl: "views/inicio.html"
            })

            .when("/busquedaProfesionales", {
                controller: "busquedaProfesionalController",
                templateUrl: "views/busquedaProfesionales.html"
            })
            
            .when("/gestionProfesionales", {
                controller: "gestionProfesionalesController",
                templateUrl: "views/gestionProfesionales.html"
            })

            .when("/gestionNoticias", {
                controller: "noticiasController",
                templateUrl: "views/gestionNoticias.html"
            })

            .when("/login", {
                controller: "loginController",
                templateUrl: "views/login.html"
            })


            .otherwise({
                controller: "noticiasController",
                redirecTo: "/",
                templateUrl: "views/inicio.html"
            })
});

app.run(function($rootScope, $location, $cookieStore){
   
   $rootScope.$on('$routeChangeStart', function(event, next, current){
       if($cookieStore.get('estaConectado') == false || $cookieStore.get('estaConectado') == null){
           if(next.templateUrl == 'views/gestionProfesionales.html'){
               $location.path('/login');
           }
           if(next.templateUrl == "views/gestionNoticias.html"){
                $location.path('/login');
           }
       }
   });
    
});