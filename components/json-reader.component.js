angular.module('parkscenter')
.component('jsonReader', {
	templateUrl: 'templates/json-reader.template.html',
	controller: function($scope, $rootScope, $location, $filter){
		var ctrl = this;
		
		ctrl.submit = function(){
			$rootScope.showData = JSON.parse($scope.json);
			$location.url("hud");
		}
		
		ctrl.$onInit = function(){
			var item = {
    				shortName: "Title",
    				longName: "Details",
    				thumbnail: "URL",
    				duration: 240
    			};
			//$scope.json = $filter('json')([item, item, item, item, item, item, item]);
			$scope.json = $filter('json')([{"shortName":"Hello world!","longName":"Welcome, foolish viewer...","thumbnail":"URL","duration":120},{"shortName":"One and done's","longName":"What round 1 fights are already over?","thumbnail":"URL","duration":240},{"shortName":"who did they pay?!","longName":"Want a better seed? That'll be $1200","thumbnail":"URL","duration":240},{"shortName":"attraction 4 life","longName":"What's your Final Four look like?","thumbnail":"URL","duration":240},{"shortName":"pause for editing","longName":"Which match will cause the most talk?","thumbnail":"URL","duration":240},{"shortName":"Room for one more?","longName":"Haunted Mansion on track to win again?","thumbnail":"URL","duration":240},{"shortName":"2 early 2 call","longName":"Who's going to take the whole thing?","thumbnail":"URL","duration":240}]);
		}
	}
})