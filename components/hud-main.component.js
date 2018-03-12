angular.module('parkscenter')
.component('hudMain', {
	templateUrl: 'templates/hud-main.template.html',
	controller: function($scope, $rootScope, $location, $timeout){
		var ctrl = this;
		
		var inc = function(){
			ctrl.curIndex++;
			if(ctrl.curIndex>$rootScope.showData.length){
				ctrl.curIndex = $rootScope.showData.length;
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
			}
			
			ctrl.curIndex=-1;
			ctrl.clock=-1;
			
			ctrl.imageList = ['images/wdwntLogo.png'];
			angular.forEach($rootScope.showData, function(item){
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
			if(ctrl.curIndex>=0 && ctrl.curIndex<$rootScope.showData.length){
				return $rootScope.showData[ctrl.curIndex];
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
});
