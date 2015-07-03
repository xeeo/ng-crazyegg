angular.module('ng-crazyegg', ['ng'])
	.factory('crazyegg', ['$rootScope', '$window', '$timeout', '$q'
		, function($rootScope, $window, $timeout, $q) {
		    var service = $window.crazyegg = $window.crazyegg || [];

		    service.loadProject = function(key) {

				/** remove previous script **/
				var element = document.getElementById('crazyegg-js');
				element.parentNode.removeChild(element);

				var deferred = $q.defer();

				key = key + '';
				var scriptPath = key.substr(0, 4) + '/' + key.substr(4, 4);

				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.id = 'crazyegg-js';
				script.async = true;
				script.src = 'https://script.crazyegg.com/pages/scripts/' + scriptPath + '.js?' + Math.floor(new Date().getTime()/3600000);
				script.onload = script.onreadystatechange = function () {
					deferred.resolve($window.crazyegg);
				};

				var first = document.getElementsByTagName('script')[0];
				first.parentNode.insertBefore(script, first);

		      return deferred.promise;
		    };

			service.initCrazyEgg = function(accountKey) {

				$rootScope.$on('$viewContentLoaded', function() {
					$timeout(function() {
						$window.crazyegg.loadProject(accountKey);
					});
				});
			}

		    return service;
}]);
