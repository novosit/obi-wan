(function() {

	/**
	* Yahoo Service
	*
	* Access Yahoo's Finance API to get the exchange
	* rates data of our currencies.
	*
	* @author Ronald Rey
	*/

	angular
		.module('app')
		.factory('YahooService', YahooService);

	YahooService.$inject = [ '$resource'];

	function YahooService($resource)
	{
		return {
			getExchangeRates : getExchangeRates
		};

		function getExchangeRates(successCallback, errorCallback)
		{
			var data = $resource('http://query.yahooapis.com/v1/public/yql', {
					q : 'select * from yahoo.finance.xchange where pair in ("DOPEUR", "DOPUSD")',
					env : 'store://datatables.org/alltableswithkeys',
					format: 'json'
				},
     			{'query': { method: 'GET' } }
     		).get(
	     		function(response) {
	     			var eur = response.query.results.rate[0].Bid;
	     			var usd = response.query.results.rate[1].Bid;

	     			successCallback(eur, usd);
	     		},
	     		function(error) {
	     			alert(
	     				"An error has occurred trying to access our exchange rates online database.\r\n"+
	     				"Default fallback values for the rates will be used instead.\r\n"+
	     				"Please check your Internet connection and try again."
	     				);
	     			successCallback(0.0197, 0.0221);
	     		}
     		);
		}
	}

})();
