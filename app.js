angular.module('parkscenter', ['ngRoute', 'ngMaterial'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
    	.when('/', {
    		template: '<json-reader></json-reader>'
    	})
    	.when('/hud', {
    		template: '<hud-main></hud-main>'
    	})
    	.otherwise({
    		template: '<json-reader></json-reader>'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue')
});