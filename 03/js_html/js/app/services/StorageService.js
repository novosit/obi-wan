(function() {
	'use strict';

	/**
	* Storage Service
	* @author Ronald Rey
	*/

	angular.module('app')
		.factory('StorageService', StorageService);

	StorageService.$inject = [];

	function StorageService()
	{
		// TODO 
		// Evaluate the possibility of having two different objects
		// for dealing with data persistence of the employees and reports model,
		// to separate the concerns even further.
		// They could be exposed under this very same service as properties,
		// to avoid having to inject two dependencies instead of just one in the controllers.
		// e.g. StorageService.Employees.get(), StorageService.Reports.get(), and so on.
		// Current state of this code because of development time constraints.

		var STORAGE_ID = 'OBIWAN03';
		var REPORTS_STORAGE_ID = 'OBIWAN03-REPORTS';
		var REPORTS_ID_STORAGE_ID = 'OBIWAN-03-REPORT_ID';

		var items = get();
		var reportLatestId = getLatestReportId();
		var reports = getReports();

		return {
			// Employees related storage
			get 	: get,
			insert 	: insert,
			remove 	: remove,

			// Reports related storage
			getLatestReportId 	: getLatestReportId,
			getReports 			: getReports,
			storeReport 		: storeReport,
			removeReport 		: removeReport,
		};

		/////////////////////////////

		/**
		* Employees related storage
		*/

		function get()
		{
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
		}

		function insert(item)
		{
			items[ item.id ] = item;
			localStorage.setItem(STORAGE_ID, angular.toJson(items));
		}

		function remove(item)
		{
			delete items[ item.id ];
			localStorage.setItem(STORAGE_ID, angular.toJson(items));
		}

		/**
		* Report related storage
		*/

		function getLatestReportId()
		{
			return Number(localStorage.getItem( REPORTS_ID_STORAGE_ID )) || 1;
		}

		function getReports()
		{
			return JSON.parse( localStorage.getItem(REPORTS_STORAGE_ID) || '{}' );
		}

		function storeReport(report)
		{
			reports[ report.id ] = report;
			localStorage.setItem( REPORTS_ID_STORAGE_ID, Number(report.id) + 1 );

			localStorage.setItem( REPORTS_STORAGE_ID, angular.toJson(reports) );

			return report;
		}

		function removeReport(id)
		{
			delete reports[ id ];
			localStorage.setItem( REPORTS_STORAGE_ID, angular.toJson(reports));
		}
	}

})();
