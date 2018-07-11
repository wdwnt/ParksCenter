angular.module('parkscenter')
.component('vsHudMain', {
	templateUrl: 'templates/vs/hud-main.template.html',
	controller: function($scope, $rootScope, $location, $timeout, $filter){
		var ctrl = this;

		ctrl.getAudioOutputs = function(){
			ctrl.audioOuts = [];
			navigator.mediaDevices.getUserMedia({audio: true}).then(function(){
				navigator.mediaDevices.enumerateDevices().then(function(d){
					ctrl.audioOuts = $filter('filter')(d, {kind: 'audiooutput'});
					ctrl.audioOuts = $filter('orderBy')(ctrl.audioOuts, "label");
				});
			});
		};
		ctrl.setAllAudioOuts = function(deviceId){
			angular.forEach(document.getElementsByTagName("audio"), function(audio){
				audio.setSinkId(deviceId);
			});
		};
		
		ctrl.$onInit = function(){
			if(!$rootScope.vsShowData){
				$location.url("/vs/edit");
			}else{
				ctrl.clock = -1;
				ctrl.getAudioOutputs();
			}
		};
		
		ctrl.tick = function(){
			if(ctrl.clock>0){
				ctrl.clock--;
				ctrl.timeoutCallback = $timeout(function(){ctrl.tick();}, 1000);
				ctrl.clockDate = new Date(1970, 0, 1).setSeconds(ctrl.clock);
				if(ctrl.clock===0){
					document.getElementById("buzzer").play();
				}
			}else if(ctrl.clock<0){
				ctrl.clockDate = null;
			}
			$timeout(function(){$scope.$apply();}, 0);
		};
		
		ctrl.restartTimeout = function(){
			$timeout.cancel(ctrl.timeoutCallback);
			ctrl.clock = ctrl.getCurItem().duration;
			ctrl.tick();
		};
	}
});
