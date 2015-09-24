process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var quine_mccluskey = require("./quine_mccluskey");

process.stdin.on('data', function (input) {
  console.log('Type exit at any time to end this program.')
  console.log('Which boolean funtion would you like to minimize? ',
              util.inspect(input));

  if (input === 'exit\n') {
    done();
  }

  var minterms = quine_mccluskey.translateFormula(input);
  console.log(minterms)
  var groupOfOnes = quine_mccluskey.groupOfOnes(minterms);
  console.log(groupOfOnes)
  var primeImplicantsChart = quine_mccluskey.getPrimeImplicantsChart(groupOfOnes);
  console.log(primeImplicantsChart)
});

function done() {
  process.exit();
}
