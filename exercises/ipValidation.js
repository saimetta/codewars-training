function isValidIP(str) {
  var validator = /^((25[0-5]|2[0-4][0-9]|[1]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return validator.test(str);
}

Test.assertEquals(isValidIP("1.2.3.4"),true)
Test.assertEquals(isValidIP("123.45.67.89"),true)
Test.assertEquals(isValidIP("1.2.3"),false)
Test.assertEquals(isValidIP("1.2.3.4.5"),false)
Test.assertEquals(isValidIP("123.456.78.90"),false)
Test.assertEquals(isValidIP("123.045.067.089"),false)
// Create your own tests here. These are some of the methods available:
//  Test.expect(boolean, [optional] message) 
//  Test.assertEquals(actual, expected, [optional] message)
//  Test.assertSimilar(actual, expected, [optional] message)
//  Test.assertNotEquals(actual, expected, [optional] message) 

/*
Write an algorithm that will identify valid IPv4 addresses in dot-decimal format. 
Input to the function is guaranteed to be a single string.

Examples of valid inputs: 1.2.3.4 123.45.67.89

Examples of invalid inputs: 1.2.3 1.2.3.4.5 123.456.78.90 123.045.067.089
*/