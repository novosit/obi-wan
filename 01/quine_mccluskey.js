tools = {
    /*
     * Receive an array of integers and return it's representation
     * in formula notation.
    */
    integersToFormula: function(input) {
      var binaryToFormula = function(data) {
        var valueChart = {0: "A", 1: "B", 2: "C", 3: "D"};
        var binaryRepr = ""

        for (i=0; i < data.length; i++) {
            var not = "";
            if (data[i] == 0) {not = "'"};
            binaryRepr += valueChart[i] + not;
        }

        return binaryRepr
      }

      var result = ""
      var sortedInput = input.sort(function(a, b){return a - b})

      for (index in sortedInput) {
         var binary = "0000" + sortedInput[index].toString(2)
         binary = binary.substr(binary.length - 4)
         var formula = binaryToFormula(binary)
         result += formula + "+"
      }

      return result.slice(0, - 1)
    },
    /*
     * Receive a formula in the format "ABCD+ABCD"
     * Split the formula by + sign
     * Convert each element into it's integer representation
     * Order asc
    */
   translateFormula: function(input) {
      var formulaToMinterm = function(data) {
          var result = data.replace(/[A-Z]\'/g, "0").replace(/[A-Z]/g, "1");
          return [parseInt(result, 2), result]
      }

      return input.split("+").map(formulaToMinterm).sort(function(a, b){return a[0] - b[0]})
    },
    /*
     * Reveive an array of integers/minterms
     * Turn each number into it's binary string representation
     * Count the amount of 1s
     * Assign the value to the result object using the amount of 1s value
    */
    groupOfOnes: function(minterms) {
      var result = {}

      for (index in minterms) {
          var number = minterms[index][0]
          var binary =  minterms[index][1]
          var amountOfOnes = (binary.match(/1/g) || []).length
          if (!result[amountOfOnes]) {
              result[amountOfOnes] = []
          }
          result[amountOfOnes].push([number, binary])
      }

      return result
    },
    /*
     * Recieve an object with groups of 1s
     * Calculate prime implicants chart by defining which binary
     * from one group if different from a binary of another group (just by 1)
    */
    getPrimeImplicantsChart: function(groupOfOnes, stop) {
        var result = {}
        var diffOfOne = function(first, second) {
            var dash_result = "";
            var diffCount = 0;

            for (z = 0; z < first.length; z++) { 
                if (first[z] != second[z]) {
                    diffCount += 1;
                    dash_result += "-";
                }
                else {
                    dash_result += first[z].toString();
                }
            }

            if (diffCount != 1) {
                dash_result = "";
            }

            return dash_result
        }

        for (i = 0; i <= Object.keys(groupOfOnes).length; i++) { 
            var currentGroup = groupOfOnes[i];
            if (!currentGroup) {
                currentGroup = []
            }
            var nextGroup = groupOfOnes[i + 1];
            if (!nextGroup) {
                nextGroup = []
            }

            for (j = 0; j < currentGroup.length; j++) { 
                for (k = 0; k < nextGroup.length; k++) { 
                    var currentMinterm = currentGroup[j]
                    var nextMinterm = nextGroup[k]
                    if (nextMinterm) {
                        var newMinterm = diffOfOne(currentMinterm[1], nextMinterm[1])
                        if (newMinterm) {
                            var primeImplicant = [
                                [].concat(currentMinterm[0], nextMinterm[0]), newMinterm
                                ];

                            if (!result[i]) {
                                result[i] = []
                            }
                            result[i].push(primeImplicant)
                        }
                    }
                }
            }
        }

        return result
    }
}

module.exports.tools = tools;
