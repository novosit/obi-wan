/*
 * BooleanExpression.js
 *
 * @author Ronald Rey Lovera
 * @contact reyronald@gmail.com
 * @date October, 2015
 */

var PrimeImplicant = require('./PrimeImplicant.js');

var BooleanExpression = (function() {

	BooleanExpression.solveQuineMcCluskey 	= solveQuineMcCluskey;
	BooleanExpression.areEquivalent 		= areEquivalent;

	BooleanExpression.prototype.toString = function(first_argument) {
		return this.reducedExpression;
	};

	return BooleanExpression;

	//////////////////////////////////

	// `Static public` functions
	function solveQuineMcCluskey(expression)
	{
		return new BooleanExpression(expression).toString();
	}

	function areEquivalent(expr1, expr2)
	{
		var terms1 = expr1.split('+').sort();
		var terms2 = expr2.split('+').sort();

		if ( terms1.length !== terms2.length )
			return false;

		for (var t in terms1) 
			terms1[t] = terms1[t].split('').sort().join('');

		for (var t in terms2) 
			terms2[t] = terms2[t].split('').sort().join('');

		return terms1.join('') === terms2.join('');
	}

	// Constructor

	function BooleanExpression(expression)
	{
		this.expression = expression;
		this.variables 	= getVariables(expression);

		// Finding minterms
		this.minterms = getMinterms(this.variables, this.expression);

		// Finding the prime implicants
		this.primeImplicants = getPrimeImplicants(this.minterms, this.variables);

		// Building the prime implicants chart
		this.chart = getPrimeImplicantsChart(this.primeImplicants);

		// Getting a simplified list of necessasry Prime Implicants from the chart
		this.combinedPrimeImplicants = combinePrimeImplicants(this.chart);

		// Gettin the reduced expression string from the combined implicants
		this.reducedExpression = reduceExpression(this.combinedPrimeImplicants, this.variables);
	}

	// `Private` functions

	function getVariables(expression)
	{
		var matches = expression.match(/[A-z]/g).sort();
		return unique(matches);
	}

	function getMinterms(variables, expression)
	{
		var NEGATIVES_REGEX 		= /[A-z]'/g;
		var NEGATIVES_PLAIN_REGEX 	= /([A-z])(?=['])/g;

		function getNegatives(term)
		{
			return term.match(NEGATIVES_PLAIN_REGEX) ? term.match(NEGATIVES_PLAIN_REGEX) : [];
		}

		function getPositives(term)
		{
			return term.replace(NEGATIVES_REGEX, "");
		}

		function getDontCares(term, vars)
		{
			return vars.join("").replace(new RegExp("['" + term + "]" , "g"), "").split("");
		}

		function getTermNumerical(term, variables) 
		{
			var number = 0;
			for (var i in term) {
				var index = variables.indexOf( term[i] );
				if ( index !== -1 )
					number |= 1 << (variables.length - 1 - index );
			}
			return number;
		}

		var terms = expression.split("+");
		var minterms = [];
		for (var t in terms) {

			var positives 	= getPositives(terms[t]);
			var negatives 	= getNegatives(terms[t]);
			var dontCares 	= getDontCares(terms[t], variables);

			var minterm = getTermNumerical(positives, variables);

			if ( minterms.indexOf( minterm ) === -1 )
				minterms.push( minterm );

			// If the term:string we are evaluating in the current 
			// loop is missing some variables, we have to fill
			// the `don't care` bits with all possibilities.
			// e.g. A+ABC
			// A 	=> [ 100, 101, 110, 111 ] (this is the case we're fixing here)
			// ABC 	=> [ 111 ]
			var dC 	= getTermNumerical(dontCares, variables);
			if ( positives.length + negatives.length !== variables.length)
				for (var i = minterm + 1; i < Math.pow(2, variables.length); i++)
					if ( (((dC ^ i) & ~dC) === minterm) && minterms.indexOf( i ) === -1 ) 
						minterms.push( i );
		}
		return minterms;
	}

	function getPrimeImplicants(minterms, variables)
	{
		function countOnes(minterm)
		{
			for (var count = 0; minterm; count++) 
				minterm &= minterm - 1;
			return count;
		}

		function differ(a, b)
		{
			// If `a` and `b` differ only by one bit, return a binary number
			// with a 1 in that position, return false otherwise.
			// e.g. ( 0b100, 0b110 ) => 0b010
			// e.g. ( 0b100, 0b010 ) => false
			return (a&b) === a || (a&b) === b ? a^b : false;
		}

		var table = {};
		for (var i in minterms) {
			var ones = countOnes( minterms[i] );

			if ( typeof table[ones] === 'undefined' )
				table[ ones ] = [];

			table[ ones ].push(new PrimeImplicant({
				value 		: minterms[i],
				dontCares 	: 0,
				marked 		: false,
				finalized 	: false,
				minterms 	: [minterms[i]],
			}));
		}

		var primeImplicants = [];
		var nextTable = {};
		do {
			var completed = true;
			for (var i = 0; i <= variables.length; i++) {
				if (typeof table[i] === 'undefined') continue;

				for (var j = 0; j < table[i].length; j++) {
					//
					if ( typeof table[i+1] === 'undefined'  ) {
						if ( !table[i][j].marked ) {
							table[i][j].finalized = true;
							primeImplicants.push ( table[i][j] );
						}
						continue;
					}

					// Comparing with next level
					var isFinal = true;
					for (var k = 0; k < table[i+1].length; k++) {
						// Only match those with equal `don't care`'s numbers
						if ( table[i][j].dontCares !== table[i+1][k].dontCares ) continue;

						var d = differ( table[i][j].value, table[i+1][k].value );
						if (d !== false) { 
							// Is not final if we found a `matching` prime implicant
							// in the lower level of the table
							isFinal = completed = false;

							table[i][j].marked = table[i+1][k].marked = true;

							if (typeof nextTable[i] === 'undefined')
								nextTable[i] = [];

							nextTable[i].push(new PrimeImplicant({
								value 		: table[i][j].value,
								dontCares 	: table[i][j].dontCares | d,
								marked 		: false,
								finalized 	: false,
								minterms 	: table[i][j].minterms.concat( table[i+1][k].minterms ),
							}));
						}
					}
					if (isFinal && !table[i][j].marked) 
						primeImplicants.push( table[i][j] );
					

				}
			}

			table = nextTable;
			nextTable = {};
		} while ( !completed );

		return PrimeImplicant.reduce( primeImplicants );		
	}

	function getPrimeImplicantsChart(primeImplicants)
	{
		var chart = {};
		for (var i = 0; i < primeImplicants.length; i++) 
			for (var j in primeImplicants[i].minterms) {
				if ( typeof chart[ primeImplicants[i].minterms[j] ] === 'undefined' ) 
					chart[ primeImplicants[i].minterms[j] ] = [];
				chart[ primeImplicants[i].minterms[j] ].push( primeImplicants[i] );
			}
		return chart;		
	}

	function combinePrimeImplicants(chart)
	{
		// TODO: Implement here Petrick's method
		var primeImplicants = [];
		var takenImplicants = [];
		var nonEssentialTaken = false;
		for (var i in chart) {

			for (var j in chart[i]) {
				if ( takenImplicants.indexOf( chart[i][j].toString() ) !== -1 ) continue;

				// Take it if it's an essential implicant.
				// If it's a non-essential implicant, only take it
				// if we haven't picked one before.
				if (!nonEssentialTaken || chart[i].length === 1) {
					primeImplicants.push( chart[i][j] );
					takenImplicants.push( chart[i][j].toString() );
				}

				if (!nonEssentialTaken && chart[i].length > 1) nonEssentialTaken = true;

			}
		}
		return primeImplicants;
	}

	function reduceExpression(primeImplicants, variables)
	{
		// This function takes an array of Prime Implicants,
		// and converts it to a boolean expression in 
		// string form, 
		// e.g. PrimeImplicant[] => `AB'C+B'C'`
		var terms = [];
		for (var i in primeImplicants) {
			var term = [];
			for (var n = 0; n < variables.length; n++) {
				if ( primeImplicants[i].value & primeImplicants[i].dontCares & 1 || !(primeImplicants[i].dontCares & 1) ) 
					term.push(variables[variables.length - 1 - n] + ((primeImplicants[i].value & 1) ? "" : "'" ));
				primeImplicants[i].value >>= 1; 
				primeImplicants[i].dontCares >>= 1;
			}
			terms.push( term.reverse().join("") );
		}
		return unique(terms).sort().join("+");		
	}

	// Misc.

	function unique(array)
	{
		return array.filter(function(elem, pos) {
			return array.indexOf(elem) === pos;
		});
	}	

})();

module.exports = BooleanExpression;

// References
// https://sites.google.com/site/simpogical/download
// https://docs.google.com/viewer?a=v&pid=sites&srcid=ZGVmYXVsdGRvbWFpbnxzaW1wb2dpY2FsfGd4OjZmMTBkNGI4MmRlNDE5MGI
// http://www.ocoudert.com/papers/pdf/int94.pdf
// http://www.ee.surrey.ac.uk/Projects/Labview/minimisation/tabular.html
// https://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm
// https://en.wikipedia.org/wiki/Petrick%27s_method
// http://www.quinemccluskey.com/
// http://tma.main.jp/logic/logic.php?lang=en&type=eq&eq=~A~B~C%2B~AB~C%2BA~B~C%2B~ABC%2BA~BC%2BABC
// http://arxiv.org/ftp/arxiv/papers/1404/1404.3349.pdf
// https://webdocs.cs.ualberta.ca/~amaral/courses/329/webslides/Topic5-QuineMcCluskey/sld080.htm