(function() {

	/**
	* Report controller
	* @author Ronald Rey
	*/

	angular
		.module('app')
		.controller('ReportController', ReportController);

	ReportController.$inject = [ 'StorageService' ];

	function ReportController(StorageService)
	{
		var vm = this;

		vm.items 	= StorageService.getReports();
		vm.selected = null;

		vm.view		= view;
		vm.remove 	= remove;

		////////////////////////
		
		function view(item)
		{	
			vm.selected = item;
		}

		function remove(item)
		{
			delete vm.items[ item.id ];
			StorageService.removeReport(item.id);
		}
	}

})();
