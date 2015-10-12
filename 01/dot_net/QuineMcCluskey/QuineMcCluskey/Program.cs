using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuineMcCluskey
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Type your boolean expression:");

            var expression = Console.ReadLine();

            Console.WriteLine(BooleanExpression.SolveQuineMcCluskey(expression));

            Console.Read();
        }
    }
}
