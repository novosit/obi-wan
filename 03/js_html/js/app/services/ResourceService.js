(function() {

	/**
	* Resource Service
	* @author Ronald Rey
	*/

	// This is meant to be the service we use to access our data, however we plan to store it.
	// It is designed so that we can switch between localStorage and real database storage,
	// (using an online API from our back-end, see ApiService for more info)
	// simulating a development / production environment in a polymorphic manner.
	// This application does not intend to use an actual API for data persistence,
	// so the ApiService is not implemented and the StorageService was not written with that in mind.
	// This means that at the current state of our code, the StorageService signature would not
	// mirror that of the ApiService, so it would have to be refactored along with the controllers
	// that consume it if the ApiService implementation time ever comes.

	var API_PRESENT = false;

	angular
		.module('app')
		.factory('ResourceService', ResourceService);

	ResourceService.$inject = [ '$injector' ];

	function ResourceService($injector)
	{
		return API_PRESENT ? 
			$injector.get('ApiService') 
			:
			$injector.get('StorageService');
	}

})();
