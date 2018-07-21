// run.js

var BooleanExpression = require('./BooleanExpression.js');
var readline 	= require('readline');

console.log("When finished, send an End of Transmission signal to view the result (Ctrl+D or Ctrl+Z).");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var input = '';
rl.on('line', function(line){
	input += line + "\r\n";
});

rl.on('close', function() {
	input = input.replace(/\r\n /g, "");
	console.log( BooleanExpression.solveQuineMcCluskey(input) );
});

