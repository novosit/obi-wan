var BooleanExpression = require('./BooleanExpression.js');
var fs                = require("fs");
var assert            = require("assert");

////////////////////////
if ( typeof describe === "undefined" ) {
  console.log("You have to run this test with the command `node mocha/bin/mocha`\r\n");
  process.exit();
}

function compare(input, expected)
{
	var reduced = BooleanExpression.solveQuineMcCluskey(input);
  var areEquivalent = BooleanExpression.areEquivalent(expected, reduced)
  if ( !areEquivalent) {
    console.log('\r\n');
    console.log('Input Expression\t', input);
    console.log('Reduced Expression\t ', reduced);
    console.log('Expected Expression\t ', expected);
  }
	assert.equal( areEquivalent, true );
}

var cases = [
  { input : "A+AB", expected : "A", name : ''}, // passed
  { input : "A+ABC", expected : "A", name : ''}, // passed
  { input : "BC'+BC", expected : "B", name : ''}, // passed
  { input : "AB+BC", expected : "AB+BC", name : ''}, // passed
  { input : "A'B'+AB'", expected : "B'", name : ''}, // passed
  { input : "ABC+AB'C", expected : "AC", name : ''}, // passed
  { input : "A'BC+A'BC'", expected : "A'B", name : ''}, // passed
  { input : "A'BCD+ABCD", expected : "BCD", name : ''}, // passed
  { input : "AA+AC+AB+BC", expected : "A+BC", name : ''}, // passed
  { input : "A'BC+ABCD", expected : "A'BC+BCD", name : ''}, // passed
  { input : "ABC+AB'C+ABC'", expected : "AC+AB", name : ''}, // passed
  { input : "ABC+ABD'+AB+AD", expected : "AD+AB", name : ''},
  { input : "A'BC'+AB'C'+ABC'", expected : "AC'+BC'", name : ''}, // passed
  { input : "AB'C'D'+ABC'D'+ABCD", expected : "AC'D'+ABCD", name : ''}, // passed
  { input : "A'B'C'+AB'C'+AB'C+ABC'+ABC", expected : "A+B'C'", name : ''}, // passed
  { input : "A'B'C'D'+A'B'C'D+A'BC'D'+A'BC'D", expected : "A'C'", name : ''}, // passed
  { input : "A'B'C+A'BC'+AB'C'+AB'C+ABC'+ABC", expected : "A+B'C+BC'", name : ''}, // passed
  { input : "A'BC'D'+AB'C'D'+AB'CD'+AB'CD+ABC'D'+ABCD", expected : "ACD+AB'D'+BC'D'", name : ''}, // passed
  { input : "A'B'C'D'+A'B'C'D+A'BC'D'+A'BC'D+A'BCD+AB'CD", expected : "AB'CD+A'BD+A'C'", name : ''}, // passed
  { input : "A'B'C'D'+A'BC'D+A'BC'D'+AB'C'D'+A'B'CD'+AB'CD'+A'B'C'D", expected : "B'D'+A'C'", name : ''}, // passed
];

describe("Quine-McCluskey", function() {

  for (var i in cases) {
    (function(i) {
      it("Case No. " + (i*1+1), function() {
        compare( cases[i].input, cases[i].expected );
      });
    })(i);
  }

});
