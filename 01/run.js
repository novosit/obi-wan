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

  var minimized = quine_mccluskey.minimize(input);
  console.log('Minimized formula:')
  console.log(minimized)
});

function done() {
  process.exit();
}
