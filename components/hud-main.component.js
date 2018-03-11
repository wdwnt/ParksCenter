angular.module('parkscenter')
.component('hudMain', {
	templateUrl: 'templates/hud-main.template.html',
	controller: function($scope, $rootScope, $location, $timeout){
		var ctrl = this;
		ctrl.showData = [];
		
		var inc = function(){
			ctrl.curIndex++;
			if(ctrl.curIndex>ctrl.showData.length){
				ctrl.curIndex = ctrl.showData.length;
			}
			ctrl.restartTimeout();
		};
		var dec = function(){
			ctrl.curIndex--;
			if(ctrl.curIndex<-1){
				ctrl.curIndex=-1;
			}
			ctrl.restartTimeout();
		};
		ctrl.arrowControl={
				left: dec,
				right: inc,
				up: dec,
				down: inc
		};
		
		ctrl.$onInit = function(){
			if(!$rootScope.showData){
				$location.url("/");
			}else{
				ctrl.showData = $rootScope.showData;
			}
			
			ctrl.curIndex=-1;
			ctrl.clock=-1;
			
			ctrl.imageList = ['images/wdwntLogo.png'];
			angular.forEach(ctrl.showData, function(item){
				ctrl.imageList.push(item.thumbnail);
			});
		};
		
		ctrl.tick = function(){
			if(ctrl.clock>0){
				ctrl.clock--;
				ctrl.timeoutCallback = $timeout(function(){ctrl.tick();}, 1000);
				ctrl.clockDate = new Date(1970, 0, 1).setSeconds(ctrl.clock);
			}else if(ctrl.clock<0){
				ctrl.clockDate = null;
			}
			$scope.$apply();
		};
		
		ctrl.restartTimeout = function(){
			$timeout.cancel(ctrl.timeoutCallback);
			ctrl.clock = ctrl.getCurItem().duration;
			ctrl.tick();
		};
		
		ctrl.getCurItem = function(){
			if(ctrl.curIndex>=0 && ctrl.curIndex<ctrl.showData.length){
				return ctrl.showData[ctrl.curIndex];
			}else{
				if(ctrl.curIndex===-1){
    				return {
                	    "shortName": "",
                	    "longName": "Welcome to ParksCenter!",
                	    "thumbnail": "images/wdwntLogo.png",
                	    "duration": -1
                	};
				}else{
					return {
                	    "shortName": "",
                	    "longName": "Thanks for watching ParksCenter!",
                	    "thumbnail": "images/wdwntLogo.png",
                	    "duration": -1
                	};
				}
			}
		};
		
		ctrl.getItemState = function(index){
			if(index<ctrl.curIndex){
				return "past";
			}else if(index>ctrl.curIndex){
				return "future";
			}else{
				return "present";
			}
		};
	}
})
.directive("arrowControl", function(){
	return {
		restrict: "A",
		link: function($scope, $element, $attrs){
			var callback = function(event){
    			var keyCode = event.which || event.keyCode;
    			if(keyCode === 37){
    				$scope.$eval($attrs.arrowControl, {$dir: 'left'});
    				$scope.$apply();
    			}else if(keyCode === 38){
    				$scope.$eval($attrs.arrowControl, {$dir: 'up'});
    				$scope.$apply();
    			}else if(keyCode === 39){
    				$scope.$eval($attrs.arrowControl, {$dir: 'right'});
    				$scope.$apply();
    			}else if(keyCode === 40){
    				$scope.$eval($attrs.arrowControl, {$dir: 'down'});
    				$scope.$apply();
    			}
			};
			document.addEventListener("keydown", callback, false);
			$scope.$on('$destroy', function(){
				document.removeEventListener("keydown", callback, false);
			});
		}
	}
});
