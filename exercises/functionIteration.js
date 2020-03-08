
var createIterator = function (func, n) {
  return function (number) {
	  var i = 0,
	  	  result = number;
	  while (i < n) {
	  	result = func(result);
	  	i++;
	  }
	  return result;
  };
}


Test.describe("Iterator for 'getDouble' function", function() {
  var getDouble = function (n) {
      return n + n;
    };
    
  Test.it("Running the iterator for once", function() {
    var doubleIterator = createIterator(getDouble, 1);
    
    Test.assertEquals(doubleIterator(3), 6, "Returns double of 3 as 6");
    Test.assertEquals(doubleIterator(5), 10, "Returns double of 5 as 10");
  });
  
  Test.it("Running the iterator twice", function() {
    var getQuadruple = createIterator(getDouble, 2);
    
    Test.assertEquals(getQuadruple(2), 8, "Returns quadruple of 2 as 8");
    Test.assertEquals(getQuadruple(5), 20, "Returns quadruple of 5 as 20");
  });
});

/*
The purpose of this kata is to write a higher-order function which 
is capable of creating a function that iterates on a specified function a given number
 of times. 
 This new functions takes in an argument as a seed to start the computation from.

For instance, consider the function getDouble. When run twice on value 3, 
yields 12 as shown below.

getDouble(3) => 6
getDouble(6) => 12
Let us name the new function createIterator and we should be able to obtain 
the same result using createIterator as shown below:

var doubleIterator = createIterator(getDouble, 2); // This means, it runs *getDouble* twice
doubleIterator(3) => 12
For the sake of simplicity, all function inputs to createIterator would be functions 
returning a small number and number of iterations would always be integers.
*/