(function() {
	'use strict';

	angular
		.module('app', ['ui.router', 'ngResource'])
		.config(config);

	config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

	function config($stateProvider, $locationProvider, $urlRouterProvider)
	{
  		$urlRouterProvider.otherwise("/");

  		// This mini-application was designed to work locally without a Web Server,
  		// for the sake of testing and reviewing simplicity.
  		// Because of this, we can't use a dynamic routing engine (like Angular's $stateProvider or $routeProvider),
  		// as those services would try to access the template files through `file://` protocol, 
  		// which would then be blocked by the browser and wouldn't work.

  		// A configuration change could be made in the browser's settings to allow this,
  		// but the goal is to have this application work out-of-the-box, without any hassle.

  		// Keep in mind that this is the reason why there is mark-up code repetition in the 
  		// index.html and reports.html files. This would not be the case had we served
  		// this app on a Web Server and had access to routing.
	}

})();