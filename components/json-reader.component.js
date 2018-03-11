angular.module('parkscenter')
.component('jsonReader', {
	templateUrl: 'templates/json-reader.template.html',
	controller: function($scope, $rootScope, $location, $filter){
		var ctrl = this;
		
		ctrl.submit = function(){
			$rootScope.showData = JSON.parse($scope.json);
			$location.url("hud");
		};
		
		ctrl.$onInit = function(){
			var item = {
    				shortName: "Title",
    				longName: "Details",
    				thumbnail: "URL",
    				duration: 240
    			};
			$scope.json = $filter('json')([item, item, item, item, item, item, item]);
		}
	}
});
