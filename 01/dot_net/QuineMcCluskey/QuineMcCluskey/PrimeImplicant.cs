using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuineMcCluskey
{
    public class PrimeImplicant
    {
        public int Value { get; set; }
        public int DontCares { get; set; }
        public Boolean IsMarked { get; set; }
        public Boolean IsFinal { get; set; }
        public IList<int> Minterms { get; set; }

        public override string ToString()
        {
            return this.Value.ToString() + "&" + this.DontCares.ToString();
        }

        public static IList<PrimeImplicant> Reduce(IList<PrimeImplicant> implicants)
        {
            var array = new List<string>();
            var reduced = new List<PrimeImplicant>();
            foreach (var item in implicants)
            {
                if (!array.Contains(item.ToString()))
                {
                    array.Add(item.ToString());
                    reduced.Add(item);
                }
            }
            return reduced;
        }
    }
}
