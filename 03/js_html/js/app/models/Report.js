/**
 * Report class
 * @author Ronald Rey
 */

// If global scope pollution is undesired, this class
// could be defined as an Angular service or factory,
// and be injected into the controllers as necessary
// instead.

var Report = (function() {
	'use strict';

	var HOUR_PRICE = 1000.00;

	return Report

	///////////////////////////

	function Report(id, employees, exchangeRates)
	{
		this.id 			= id;
		this.employees 		= angular.copy(employees);
		this.exchangeRates 	= angular.copy(exchangeRates);

		// Using `.call(this,...)` instead of just adding these functions 
		// to the prototype because we don't need them exposed outside.
		// This way we can uses them as private functions with access
		// to the current instance properties.
		this.total 		 = getTotal.call(this, this.employees, true);
		this.subtotalUSD = getTotalByCurrency.call(this, 'USD');
		this.subtotalEUR = getTotalByCurrency.call(this, 'EUR');
		this.subtotalDOP = getTotalByCurrency.call(this, 'DOP');

		for (var i in this.employees) {
			this.employees[i].hourPrice 	= HOUR_PRICE * this.exchangeRates[ this.employees[i].currency.id ];
			this.employees[i].amount 		= this.employees[i].hourPrice * this.employees[i].workedHours;
			this.employees[i].baseAmount 	= HOUR_PRICE * this.employees[i].workedHours;
		}

		this.date = new Date();
	}

	// `Private` functions

	function getTotal(items, baseCurrency)
	{
		var total = 0;
		for (var i in items)
		{
			var rate = baseCurrency ? HOUR_PRICE : HOUR_PRICE*this.exchangeRates[ items[i].currency.id ];
			total += items[i].workedHours * rate;
		}
		return total;
	}

	function getTotalByCurrency(curr)
	{
		var items = _.filter(this.employees, function(item) {
			return item.currency.id === curr;
		});
		return getTotal.bind(this, items, false)();
	}

})();

