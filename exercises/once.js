function once(fn) {
  var c = 1;
  return function () {
  	if (c>0) {
      c--;
      return fn.apply(null,arguments);
    }else {
    	return undefined;
    }
  }
}

// Create your own tests here. These are some of the methods available:
//  Test.expect(boolean, [optional] message) 
//  Test.assertEquals(actual, expected, [optional] message)
//  Test.assertSimilar(actual, expected, [optional] message)
//  Test.assertNotEquals(actual, expected, [optional] message) 

/*
You'll implement once, a function that takes another function as an argument,
 and returns a new version of that function that can only be called once.

Subsequent calls to the resulting function should have no effect (and should return undefined).

For example:

logOnce = once(console.log)
logOnce("foo") // -> "foo"
logOnce("bar") // -> no effect

*/