angular.module('parkscenter', ['ngRoute', 'ngMaterial'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
        .when('/', {
            template: '<hud-editor></hud-editor>'
        })
    	.when('/hud', {
    		template: '<hud-main></hud-main>'
    	})
    	.otherwise({
    		template: '<hud-editor></hud-editor>'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
});
