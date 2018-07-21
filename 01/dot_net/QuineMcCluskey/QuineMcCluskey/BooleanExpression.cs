using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace QuineMcCluskey
{
    public class BooleanExpression
    {
        private readonly string NEGATIVES_PATTERN = "[A-z]'";
        private readonly string NEGATIVES_PLAIN_PATTERN = "([A-z])(?=['])";

        public string Expression { get; set; }
        public char[] Variables { get; set; }
        public IList<int> Minterms { get; set; }
        public IList<PrimeImplicant> PrimeImplicants { get; set; }

        // TODO Improvement: Maybe define a `PrimeImplicantChart` class with an indexer,
        // instead of having this convoluted difficult-to-type Dictionary.
        public IDictionary<int, IList<PrimeImplicant>> Chart { get; set; }

        public IList<PrimeImplicant> SimplifiedPrimeImplicants { get; set; }
        public string ReducedExpression { get; set; }

        public static string SolveQuineMcCluskey(string expression)
        {
            return new BooleanExpression(expression).ToString();
        }

        public static bool AreEquivalent(string expr1, string expr2)
        {
            var terms1 = expr1.ToString().Split('+');
            var terms2 = expr2.ToString().Split('+');

            if (terms1.Length != terms2.Length) return false;

            Array.Sort(terms1);
            Array.Sort(terms2);

            for (int i = 0; i < terms1.Length; i++)
            {
                var chars = terms1[i].ToCharArray();
                Array.Sort(chars);
                terms1[i] = String.Join("", chars);
            }

            for (int i = 0; i < terms2.Length; i++)
            {
                var chars = terms2[i].ToCharArray();
                Array.Sort(chars);
                terms2[i] = String.Join("", chars);
            }

            return String.Join("", terms1) == String.Join("", terms2);
        }
        
        public BooleanExpression(string expression)
        {
            this.Expression = expression;

            this.Variables = this.GetVariables();

            // Finding minterms
            this.Minterms = this.GetMinterms();

            // Finding the prime implicants
            this.PrimeImplicants = this.GetPrimeImplicants();

            // Building the prime implicant chart
            this.Chart = this.GetPrimeImplicantChart();

            // Getting a simplified list of necessasry Prime Implicants from the chart
            this.SimplifiedPrimeImplicants = this.SimplifyPrimeImplicants();

            // Gettin the reduced expression string from the combined implicants
            this.ReducedExpression = this.ReduceExpression();
        }

        public override string ToString()
        {
            return this.ReducedExpression;
        }

        private char[] GetVariables()
        {
            return String.Join("", Regex.Matches(this.Expression, @"[A-z]").OfType<Match>().Select(m => m.Value).Distinct().ToList()).ToCharArray();
        }

        private char[] GetNegatives(string term)
        {
            return String.Join("", Regex.Matches(term, NEGATIVES_PLAIN_PATTERN).OfType<Match>().Select(m => m.Value).Distinct().ToList()).ToCharArray();
        }

        private char[] GetPositives(string term)
        {
            return Regex.Replace(term, NEGATIVES_PATTERN, "").ToCharArray();
        }

        private char[] GetDontCares(string term)
        {
            return Regex.Replace(String.Join("", this.Variables), "[" + term + "]", "").ToCharArray();
        }

        private int GetTermNumerical(char[] positives)
        {
            var number = 0;
            foreach (var variable in positives)
            {
                number |= 1 << (this.Variables.Length - 1 - Array.IndexOf(this.Variables, variable));
            }
            return number;
        }

        private IList<int> GetMinterms()
        {
            var terms = this.Expression.Split('+');

            var minterms = new List<int>();
            foreach (var term in terms)
            {
                var positives = GetPositives(term); 
                var negatives = GetNegatives(term); 
                var dontCares = GetDontCares(term);
                var minterm = GetTermNumerical(positives);

                if (minterms.IndexOf(minterm) == -1)
                    minterms.Add(minterm);

                // If the term:string we are evaluating in the current 
                // loop is missing some variables, we have to fill
                // the `don't care` bits with all possibilities.
                // e.g. A+ABC
                // A 	=> [ 100, 101, 110, 111 ] (this is the case we're fixing here)
                // ABC 	=> [ 111 ]
                // TODO maybe optimize this with a Set that gets smaller in each iteration?
                var dC = GetTermNumerical(dontCares);
                if ( positives.Length + negatives.Length != this.Variables.Length )
                    for (int i = minterm + 1; i < Math.Pow(2, this.Variables.Length); i++)
                    {
                        if ((((dC ^ i) & ~dC) == minterm) && minterms.IndexOf(i) == -1)
                            minterms.Add(i);
                    }

            }
            return minterms;
        }

        private int CountOnes(int minterm)
        {
            int count = 0;
            for (; minterm != 0; count++)
            {
                minterm &= minterm - 1;
            }
            return count;
        }

        private int DifferAt(int a, int b)
        {
            // If `a` and `b` differ only by one bit, return a binary number
            // with a 1 in that position, return -1 otherwise.
            // e.g. ( 0b100, 0b110 ) => 0b010
            // e.g. ( 0b100, 0b010 ) => -1
            return (a & b) == a || (a & b) == b ? a ^ b : -1;
        } 

        private IList<PrimeImplicant> GetPrimeImplicants()
        {
            var table = new Dictionary<int, List<PrimeImplicant>>();

            foreach (var minterm in this.Minterms)
            {
                var ones = CountOnes(minterm);

                if (!table.ContainsKey(ones))
                    table[ones] = new List<PrimeImplicant>();

                table[ones].Add(new PrimeImplicant
                {
                    Value = minterm,
                    DontCares = 0,
                    IsMarked = false,
                    IsFinal = false,
                    Minterms = new List<int>() { minterm }
                });
            }

            var primeImplicants = new List<PrimeImplicant>();
            var nextTable = new Dictionary<int, List<PrimeImplicant>>();
            var isCompleted = true;
            do
            {
                isCompleted = true;
                for (var i = 0; i <= this.Variables.Length; i++)
                {
                    if (!table.ContainsKey(i)) continue;

                    for (var j = 0; j < table[i].Count; j++)
                    {
                        if (!table.ContainsKey(i + 1))
                        {
                            if (!table[i][j].IsMarked)
                            {
                                table[i][j].IsFinal = true;
                                primeImplicants.Add(table[i][j]);
                            }
                            continue;
                        }

                        // Comparing with next level of the table
                        var isFinal = true;
                        for (var k = 0; k < table[i + 1].Count; k++)
                        {
                            // Only match those with equal `don't care`'s numbers
                            if (table[i][j].DontCares != table[i + 1][k].DontCares) continue;

                            var dontCares = DifferAt(table[i][j].Value, table[i + 1][k].Value);
                            if (dontCares != -1)
                            {
                                // Is not final if we found a `matching` prime implicant
                                // in the lower level of the table
                                isFinal = isCompleted = false;

                                table[i][j].IsMarked = table[i + 1][k].IsMarked = true;

                                if (!nextTable.ContainsKey(i))
                                    nextTable[i] = new List<PrimeImplicant>();

                                nextTable[i].Add(new PrimeImplicant
                                {
                                    Value = table[i][j].Value,
                                    DontCares = table[i][j].DontCares | dontCares,
                                    IsMarked = false,
                                    IsFinal = false,
                                    Minterms = table[i][j].Minterms.Concat(table[i + 1][k].Minterms).ToList()
                                });
                            }
                        }
                        if (isFinal && !table[i][j].IsMarked)
                            primeImplicants.Add(table[i][j]);
                    }
                }
                // Resetting for next iteration
                table = nextTable;
                nextTable = new Dictionary<int, List<PrimeImplicant>>();
            } while (!isCompleted);

            return PrimeImplicant.Reduce(primeImplicants);
        }

        private IDictionary<int, IList<PrimeImplicant>> GetPrimeImplicantChart()
        {
            var chart = new Dictionary<int, IList<PrimeImplicant>>();

            foreach (var implicant in this.PrimeImplicants)
            {
                foreach (var minterm in implicant.Minterms)
                {
                    if ( !chart.ContainsKey( minterm ) )
                    {
                        chart[minterm] = new List<PrimeImplicant>();
                    }
                    chart[minterm].Add(implicant);
                }
            }
            return chart;
        }

        private IList<PrimeImplicant> SimplifyPrimeImplicants()
        {
            // TODO: Implement here Petrick's method
            var hasTakenNonEssential = false;
            var implicants = new List<PrimeImplicant>();
            var takenImplicants = new List<string>();

            var keys = this.Chart.Keys.ToList();
            keys.Sort();

            //foreach (KeyValuePair<int, IList<PrimeImplicant>> minterms in this.Chart)
            foreach (var key in keys)
            {
                var minterms = this.Chart[key];
                foreach (var implicant in minterms)
                {
                    if (takenImplicants.Contains(implicant.ToString())) continue;

                    // Take it if it's an essential implicant.
                    // If it's a non-essential implicant, only take it
                    // if we haven't picked one before.
                    if (!hasTakenNonEssential || minterms.Count == 1)
                    {
                        implicants.Add(implicant);
                        takenImplicants.Add(implicant.ToString());
                    }

                    if (!hasTakenNonEssential && minterms.Count > 1) hasTakenNonEssential = true;
                    
                }
            }
            return implicants;
        }

        private string ReduceExpression()
        {
            // This function takes an array of Prime Implicants,
            // and converts it to a boolean expression in 
            // string form, 
            // e.g. PrimeImplicant[] => `AB'C+B'C'`
            var terms = new List<string>();
            var i = 0;
            foreach (var implicant in this.SimplifiedPrimeImplicants) 
            {
                var term = new List<string>();
                for (int n = 0; n < this.Variables.Length; n++)
                {
                    if ( (implicant.Value & implicant.DontCares & 1) != 0 || (implicant.DontCares & 1) == 0)
                    {
                        var quote = (implicant.Value & 1) != 0 ? "" : "'";
                        term.Add(this.Variables[this.Variables.Length - 1 - n] + quote);
                    }
                    this.SimplifiedPrimeImplicants[i].Value >>= 1;
                    this.SimplifiedPrimeImplicants[i].DontCares >>= 1;
                }
                terms.Add( String.Join("", term.Reverse<string>()) );
                i++;
            }
            Array.Sort(terms.Distinct<string>().ToArray());
            return String.Join("+", terms);
        }

    }
}
