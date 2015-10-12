/*
 * PrimeImplicant.js
 *
 * @author Ronald Rey Lovera
 * @contact reyronald@gmail.com
 * @date October, 2015
 */

module.exports = PrimeImplicant;

function PrimeImplicant(options) 
{
	this.value 		= options.value;
	this.dontCares 	= options.dontCares;
	this.marked 	= options.marked;
	this.finalized 	= options.finalized;
	this.minterms 	= options.minterms;
}

PrimeImplicant.prototype.toString = function() {
	return this.value + "&" + this.dontCares;
};

PrimeImplicant.reduce = function(implicants) {
	var array = [];
	var reduced = [];
	for (var i in implicants) {
		if ( array.indexOf( implicants[i].toString() ) === -1) {
			array.push( implicants[i].toString() );
			reduced.push( implicants[i] );
		}
	}
	return reduced;
};

