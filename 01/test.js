var assert = require("assert");
var quine_mccluskey = require("./quine_mccluskey");


function testQuineMcCluskey () {
    function binaryToFormulaTest() {
        console.log("-------------")
        console.log("Test 1")
        console.log("binaryToFormula should return proper value")

        // Given
        var input = "1010";
        var expected = "AB'CD'";

        // When
        var result = quine_mccluskey.utils.binaryToFormula(input);

        // Then
        assert.equal(result, expected);
        console.log('*PASS*');
    };

    function diffOfOneTest() {
        console.log("-------------");
        console.log("Test 2");
        console.log("diffOfOne should return proper value");
        // Given
        var firsrInput = "0010";
        var secondInput = "1010";
        var expected = "-010";

        // When
        var result = quine_mccluskey.utils.diffOfOne(firsrInput, secondInput);

        // Then
        assert.equal(result, expected);
        console.log('*PASS*');
    };

    function integersToFormulaOrderedTest() {
        console.log("-------------");
        console.log("Test 3");
        console.log("integersToFormula should return proper value on ordered input");
        // Given
        var input = [ 0, 1, 2 ];
        var expected = "A'B'C'D'+A'B'C'D+A'B'CD'";

        // When
        var result = quine_mccluskey.tools.integersToFormula(input);

        // Then
        assert.equal(result, expected);
        console.log('*PASS*');
    };

    function integersToFormulaUnorderedTest() {
        console.log("-------------");
        console.log("Test 4");
        console.log("integersToFormula should return proper value on unordered input");
        // Given
        var input = [ 0, 2, 1 ];
        var expected = "A'B'C'D'+A'B'C'D+A'B'CD'";

        // When
        var result = quine_mccluskey.tools.integersToFormula(input);

        // Then
        assert.equal(result, expected);
        console.log('*PASS*');
    };

    function translateFormulaOrderedTest() {
        console.log("-------------");
        console.log("Test 5");
        console.log("translateFormula should return proper value given ordered inpunt");

        // Given
        var input = "A'BC'D'+AB'C'D'+AB'CD'+AB'CD+ABC'D'+ABCD";
        var expected = [
            [4, "0100"],
            [8, "1000"],
            [10, "1010"],
            [11, "1011"],
            [12, "1100"],
            [15, "1111"]
            ];

        // When
        var result = quine_mccluskey.tools.translateFormula(input);

        // Then
        assert.deepEqual(result, expected);
        console.log('*PASS*');
    };

    function translateFormulaUnorderedTest() {
        console.log("-------------");
        console.log("Test 6");
        console.log("translateFormula should return proper value given unordered input");

        // Given
        var input = "A'BC'D'+AB'CD'+AB'C'D'+AB'CD+ABC'D'+ABCD";
        var expected = [
            [4, "0100"],
            [8, "1000"],
            [10, "1010"],
            [11, "1011"],
            [12, "1100"],
            [15, "1111"]
            ];

        // When
        var result = quine_mccluskey.tools.translateFormula(input);

        // Then
        assert.deepEqual(result, expected);
        console.log('*PASS*');
    };

    function groupOfOnesTest() {
        console.log("-------------");
        console.log("Test 7");
        console.log("groupOfOnes should return proper value");

        // Given
        var minterms = [
            [4, "0100"],
            [8, "1000"],
            [10, "1010"],
            [11, "1011"],
            [12, "1100"],
            [15, "1111"]
            ];
        var expected = {
            1: [[4, "0100"], [8, "1000"]],
            2: [[10, "1010"], [12, "1100"]],
            3: [[11, "1011"]],
            4: [[15, "1111"]]
        };

        // When
        var result = quine_mccluskey.tools.groupOfOnes(minterms);

        // Then
        assert.deepEqual(result, expected);
        console.log('*PASS*');
    };

    function getPrimeImplicantsChartTest() {
        console.log("-------------");
        console.log("Test 8");
        console.log("getPrimeImplicantsChart should return proper value");

        // Given
        var groupOfOnes = {
            1: [[4, "0100"], [8, "1000"]],
            2: [[10, "1010"], [12, "1100"]],
            3: [[11, "1011"]],
            4: [[15, "1111"]]
        };
        var expected = {
            1: [ [[4, 12], "-100"], [[8, 10], "10-0"], [[8, 12], "1-00"] ],
            2: [ [[10, 11], "101-"] ],
            3: [ [[11, 15], "1-11"] ]
        };

        // When
        var result = quine_mccluskey.tools.getPrimeImplicantsChart(groupOfOnes);

        // Then
        assert.deepEqual(result, expected);
        console.log('*PASS*');
    };

    binaryToFormulaTest();
    diffOfOneTest();
    integersToFormulaOrderedTest();
    integersToFormulaUnorderedTest();
    translateFormulaOrderedTest();
    translateFormulaUnorderedTest();
    groupOfOnesTest();
    getPrimeImplicantsChartTest();
};

testQuineMcCluskey();
