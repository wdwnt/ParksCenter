angular.module('parkscenter', ['ngRoute', 'ngMaterial'])
.config(function($routeProvider, $mdThemingProvider){
	$routeProvider
        .when('/pc/edit', {
            template: '<hud-editor></hud-editor>'
        })
    	.when('/pc/hud', {
    		template: '<hud-main></hud-main>'
    	})
		.when('/vs/edit', {
			template: '<vs-hud-editor></vs-hud-editor>'
		})
		.when('/vs/hud', {
			template: '<vs-hud-main></vs-hud-main>'
		})
    	.otherwise({
    		templateUrl: 'templates/landing.template.html'
    	});
	
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('light-blue');
}).run(function($rootScope, $location){
	$rootScope.$location = $location;
});
