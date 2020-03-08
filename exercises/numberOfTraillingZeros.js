function zeros (n) {
  var c = 0,
  d = 5,
  division = n/d;

  while (division > 1) {
  	c += Math.floor(division);
  	d *= 5;
  	division = n/d; 
  }
  
  return c;
}

function factorial(n) {
	if (n <=1){
		return 1;
	}else {
		return factorial(n-1)*n;
	}
}


Test.assertEquals(zeros(12), 2,'zeros of 12');
Test.assertEquals(zeros(100), 2,'zeros of 100');

// Create your own tests here. These are some of the methods available:
//  Test.expect(boolean, [optional] message) 
//  Test.assertEquals(actual, expected, [optional] message)
//  Test.assertSimilar(actual, expected, [optional] message)
//  Test.assertNotEquals(actual, expected, [optional] message) 

/*
Write a program that will calculate the number of trailing zeros in a
 factorial of a given number.

N! = 1 * 2 * 3 * 4 ... N

zeros(12) = 2 # 1 * 2 * 3 .. 12 = 479001600 
that has 2 trailing zeros 4790016(00)
Be careful 1000! has length of 2568 digital numbers.

*/