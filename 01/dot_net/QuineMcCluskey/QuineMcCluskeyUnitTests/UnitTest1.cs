using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using QuineMcCluskey;

namespace QuineMcCluskeyUnitTests
{
    [TestClass]
    public class UnitTest1
    {
        private void Compare(string input, string expected)
        {
            var reduced = BooleanExpression.SolveQuineMcCluskey(input);
            Assert.AreEqual(BooleanExpression.AreEquivalent(expected, reduced), true);
        }

        [TestMethod]
        public void TestMethod1()
        {
            Compare("A+AB", "A");
        }

        [TestMethod]
        public void TestMethod2()
        {
            Compare("A+ABC", "A");
        }

        [TestMethod]
        public void TestMethod3()
        {
            Compare("BC'+BC", "B");
        }
        
        [TestMethod]
        public void TestMethod4()
        {
            Compare("A'B'+AB'", "B'");
        }


        [TestMethod]
        public void TestMethod5()
        {
            Compare("ABC+AB'C", "AC");
        }


        [TestMethod]
        public void TestMethod6()
        {
            Compare("A'BC+A'BC'", "A'B");
        }


        [TestMethod]
        public void TestMethod7()
        {
            Compare("A'BCD+ABCD", "BCD");
        }


        [TestMethod]
        public void TestMethod8()
        {
            Compare("AA+AC+AB+BC", "A+BC");
        }

        [TestMethod]
        public void TestMethod9()
        {
            Compare("A'BC+ABCD", "A'BC+BCD");
        }

        [TestMethod]
        public void TestMethod10()
        {
            Compare("ABC+AB'C+ABC'", "AC+AB");
        }

        [TestMethod]
        public void TestMethod11()
        {
            Compare("ABC+ABD'+AB+AD", "AD+AB");
        }

        [TestMethod]
        public void TestMethod12()
        {
            Compare("A'BC'+AB'C'+ABC'", "AC'+BC'");
        }

        [TestMethod]
        public void TestMethod13()
        {
            Compare("AB'C'D'+ABC'D'+ABCD", "AC'D'+ABCD");
        }

        [TestMethod]
        public void TestMethod14()
        {
            Compare("A'B'C'+AB'C'+AB'C+ABC'+ABC", "A+B'C'");
        }

        [TestMethod]
        public void TestMethod15()
        {
            Compare("A'B'C'D'+A'B'C'D+A'BC'D'+A'BC'D", "A'C'");
        }

        [TestMethod]
        public void TestMethod16()
        {
            Compare("A'B'C+A'BC'+AB'C'+AB'C+ABC'+ABC", "A+B'C+BC'");
        }

        [TestMethod]
        public void TestMethod17()
        {
            Compare("A'BC'D'+AB'C'D'+AB'CD'+AB'CD+ABC'D'+ABCD", "ACD+AB'D'+BC'D'");
        }

        [TestMethod]
        public void TestMethod18()
        {
            Compare("A'B'C'D'+A'B'C'D+A'BC'D'+A'BC'D+A'BCD+AB'CD", "AB'CD+A'BD+A'C'");
        }

        [TestMethod]
        public void TestMethod19()
        {
            Compare("A'B'C'D'+A'BC'D+A'BC'D'+AB'C'D'+A'B'CD'+AB'CD'+A'B'C'D", "B'D'+A'C'");
        }

        [TestMethod]
        public void TestMethod20()
        {
            Compare("AB+BC", "AB+BC");
        }
    }
}
