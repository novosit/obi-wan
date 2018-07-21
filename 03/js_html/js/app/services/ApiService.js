(function() {
	'use strict';

	// This is just an empty factory written as a placeholder
	// for a future implementation of the API consumption.
	// This is what we would use if we had a back-end server
	// application interacting with a real database.

	// Obviously, because of the ASYNC nature of Angular's
	// resource service, the rest of the controllers that 
	// would consume this factory would have to be restructured
	// a little.

	angular.module('app')
		.factory('ApiService', ApiService);

	ApiService.$inject = ['$resource'];

	function ApiService($resource)
	{
		return {
			insert 	: insert,
			get 	: get,
			remove 	: remove,
		};

		//////////////////////
		
		function insert(item)
		{
		}

		function get()
		{
			return $resource('http://www.example.com/api/get').query();
		}

		function remove(items)
		{
		}
	}

})();
