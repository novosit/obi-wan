var assert = require("assert");
var quine_mccluskey = require("./quine_mccluskey");


describe("Array of integers to formula translator function", function(){
  it("should return formula array, given ordered array", function(){
    // Given
    var input = [ 0, 1, 2 ]
    var expected = "A'B'C'D'+A'B'C'D+A'B'CD'";

    // When
    var result = quine_mccluskey.tools.integersToFormula(input);

    // Then
    assert.equal(result, expected);
  });

  it("should return formula array, given unordered array", function(){
    // Given
    var input = [ 0, 2, 1 ]
    var expected = "A'B'C'D'+A'B'C'D+A'B'CD'";

    // When
    var result = quine_mccluskey.tools.integersToFormula(input);

    // Then
    assert.equal(result, expected);
  });
});


describe("String formula translator function", function(){
  it("should return translated number array, with standard order", function(){
    // Given
    var input = "A'BC'D'+AB'C'D'+AB'CD'+AB'CD+ABC'D'+ABCD";
    var expected = [
        [4, "0100"],
        [8, "1000"],
        [10, "1010"],
        [11, "1011"],
        [12, "1100"],
        [15, "1111"]
        ]

    // When
    var result = quine_mccluskey.tools.translateFormula(input);

    // Then
    assert.deepEqual(result, expected);
  });

  it("should return translated number array, with non standard order", function(){
    // Given
    var input = "A'BC'D'+AB'CD'+AB'C'D'+AB'CD+ABC'D'+ABCD";
    var expected = [
        [4, "0100"],
        [8, "1000"],
        [10, "1010"],
        [11, "1011"],
        [12, "1100"],
        [15, "1111"]
        ]

    // When
    var result = quine_mccluskey.tools.translateFormula(input);

    // Then
    assert.deepEqual(result, expected);
  });
});


describe("groupOfOnes function", function(){
  it("should return proper structure", function(){
    // Given
    var minterms = [
        [4, "0100"],
        [8, "1000"],
        [10, "1010"],
        [11, "1011"],
        [12, "1100"],
        [15, "1111"]
        ]
    var expected = {
        1: [[4, "0100"], [8, "1000"]],
        2: [[10, "1010"], [12, "1100"]],
        3: [[11, "1011"]],
        4: [[15, "1111"]]
    }

    // When
    var result = quine_mccluskey.tools.groupOfOnes(minterms);

    // Then
    assert.deepEqual(result, expected);
  });
});


describe("getPrimeImplicantsChart function", function(){
  it("should return proper structure", function(){
    // Given
    var groupOfOnes = {
        1: [[4, "0100"], [8, "1000"]],
        2: [[10, "1010"], [12, "1100"]],
        3: [[11, "1011"]],
        4: [[15, "1111"]]
    }
    var expected = {
        1: [ [[4, 12], "-100"], [[8, 10], "10-0"], [[8, 12], "1-00"] ],
        2: [ [[10, 11], "101-"] ],
        3: [ [[11, 15], "1-11"] ]
    }

    // When
    var result = quine_mccluskey.tools.getPrimeImplicantsChart(groupOfOnes);

    // Then
    assert.deepEqual(result, expected);
  });
});


describe("getPrimeImplicantsChart function", function(){
  it("should return proper structure", function(){
    // Given
    var groupOfOnes = {
        1: [[4, "0100"], [8, "1000"]],
        2: [[10, "1010"], [12, "1100"]],
        3: [[11, "1011"]],
        4: [[15, "1111"]]
    }
    var expected = {
        1: [ [[4, 12], "-100"], [[8, 10], "10-0"], [[8, 12], "1-00"] ],
        2: [ [[10, 11], "101-"] ],
        3: [ [[11, 15], "1-11"] ]
    }

    // When
    var result = quine_mccluskey.tools.getPrimeImplicantsChart(groupOfOnes);

    // Then
    assert.deepEqual(result, expected);
  });
});
