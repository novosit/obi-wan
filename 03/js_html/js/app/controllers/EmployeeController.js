(function() {
	'use strict';

	/**
	* Employee controller
	* @author Ronald Rey
	*/

	angular
		.module('app')
		.controller('EmployeeController', EmployeeController);

	EmployeeController.$inject = [ 'ResourceService', 'YahooService' ];

	function EmployeeController(ResourceService, YahooService)
	{
		// vm for ViewModel
		var vm 			= this;

		vm.CURRENCIES	= [
			{ id: 'DOP', name: 'Dominican Peso (DOP)' },
			{ id: 'USD', name: 'US Dollar (USD)' },
			{ id: 'EUR', name: 'Euro (EUR)' },
		];


		
		vm.items 		= ResourceService.get();
		vm.report 		= {};
		vm.isNewEntry 	= false;
		vm.selected 	= null;
		vm.search 		= '';

		vm.selectItem	= selectItem;
		vm.workEntry	= workEntry;
		vm.deleteItem	= deleteItem;
		vm.getReport	= getReport;
		vm.saveReport	= saveReport;

		/////////////////////////////
		// Public functions

		function selectItem(item)
		{
			vm.isNewEntry = false;
			vm.selected = typeof item === 'undefined' ? newEmployee() : angular.copy(item);
		}

		function workEntry()
		{
			$('#btnCloseWorkEntryModal').click();

			vm.items[ vm.selected.id ] = vm.selected;

			ResourceService.insert( vm.selected );
		}

		function deleteItem(item)
		{
			delete vm.items[ item.id ];
			ResourceService.remove( item );
		}

		function getReport()
		{
			YahooService.getExchangeRates(
				function(eur, usd) {

					var exchangeRates = {
						DOP: 1,
						EUR: eur,
						USD: usd,
					};

					vm.report = new Report( ResourceService.getLatestReportId(), vm.items, exchangeRates);
				}
			);

		}

		function saveReport()
		{
			ResourceService.storeReport(vm.report);
		}

		/////////////////////////////
		// Private functions
		
		function newEmployee()
		{
			// Because of the simplicity of the Employee instance,
			// we are defining it as an object literal instead 
			// of a full-fledge class. If the project's specifications
			// change in the future and add complexity to this model, 
			// the class could be created and the code of this function
			// updated easily.
			vm.isNewEntry = true;
			return {
				id 			: null,
				fullName 	: null,
				currency 	: vm.CURRENCIES[0],
				workedHours : null
			};				
		}
	}

	/**
	* Custom filter that recycles the regular
	* 'filter' functionality to use it on an object
	* instead of an array.
	* @author Ronald Rey
	*/

	angular.module('app')
		.filter('filterObject', filterObject);

	filterObject.$inject = [ '$filter' ];

	function filterObject($filter)
	{
		return function(input, search) {
			var array = [];
			angular.forEach(input, function(value, key) {
				array.push(value);	  		
			});
			return $filter('filter')(array, search);
		}
	}

	/**
	* Custom validation directive used when adding a new entry.
	* It will validate if the new Id is available to use
	* (is not already in the data store).
	* @author Ronald Rey
	*/

	angular.module('app')
		.directive('idAvailable', idAvailable);

	function idAvailable()
	{
		return {
			require: 'ngModel',
			link: function(scope, ele, attrs, c) {
      			scope.$watch(attrs.ngModel, function() {
      				var unique = !scope.employee.isNewEntry || scope.employee.selected !== null && !(scope.employee.selected.id in scope.employee.items);
      				c.$setValidity('unique', unique);
      			});
			}
		};
	}

})();


