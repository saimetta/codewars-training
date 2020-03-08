function LCS(x, y) {
  var xPrime = x.toString().split(''),
      yPrime = y.toString().split(''),
      result = [];

  result = getLCS(xPrime,yPrime);

  return result.join('');
      
}

function getLCS(x,y) {
  var lX = x.length,
      lY = y.length,
      result = [];
  if (lX == 0 || lY == 0 ) return [];
  
  if (x[lX-1] == y[lY-1]) {
    var match = x.pop();
    y.pop();
    var tmp = getLCS(x,y);
    tmp.push(match);
    return tmp
  }else {
    var v1 = getLCS(x.slice(0,lX-1),y);
    var v2 = getLCS(x,y.slice(0,lY-1));
    if (v1.length > v2.length) return v1;
    return v2;
  }
}

LCS("anothertest","notatest");
LCS("abcdef", "abc");
LCS("b", "c");
LCS("a", "a");

Test.assertEquals(LCS("a", "b"), "");
Test.assertEquals(LCS("abcdef", "abc"), "abc");


/*
Write a function called LCS that accepts two sequences, 
and returns the longest subsequence common to the passed in sequences.

Subsequence

A subsequence is different from a substring. 
The terms of a subsequence need not be consecutive terms of the original sequence.

Example subsequence

Subsequences of "abc" = "a", "b", "c", "ab", "ac", "bc"

LCS examples

LCS( "abcdef" , "abc" ) => returns "abc"
LCS( "abcdef" , "acf" ) => returns "acf"
LCS( "132535365" , "123456789" ) => returns "12356"
Notes

Both arguments will be strings
Return value must be a string
Return an empty string if there exists no common subsequence
Both arguments will have one or more characters (in JavaScript)
All tests will only have a single longest common subsequence. 
Don't worry about cases such as LCS( "1234", "3412" ), 
which would have two possible longest common subsequences: "12" and "34".
Note that the Haskell variant will use randomized testing, 
but any longest common subsequence will be valid.

Tips

Wikipedia has an explanation of the two properties that 
can be used to solve the problem:

First property
Second property

//Primer intento
function LCS(x, y) {
  var xPrime = x.toString().split('').sort(),
      yPrime = y.toString().split('').sort(),
      lX = xPrime.length,
      lY = yPrime.length,
      lcs = [],
      candidate = null,
      comparable = null;
  
  if (lX >= lY) {
  	candidate = xPrime;
  	comparable = yPrime;
  }else {
  	candidate = yPrime;
  	comparable = xPrime;
  }
  var j = comparable.length-1;
  for (var i = candidate.length-1; i >= 0 && j >= 0; i--) {
  		if (candidate[i] == comparable[j]) {
  			//match
  			lcs.push(candidate[i]);
  			//move comparable iterator
  			j--;
  		}
  };
  if (!lcs) return "";
  var base = null,
  	  response = [];
  if (lX >= lY) {
  	base = y.toString().split('');
  }else {
  	base = x.toString().split('');
  }


  console.log('LCS: ',lcs,' base: ',base);
  for (var i = 0,n = base.length; i < n ; i++) {
  	console.log(base[i],' is in lcs? ',lcs.indexOf(base[i]));
  	if (lcs.indexOf(base[i]) != -1) {
  		response.push(base[i]);
  	}
  };
  return response.join('');

}

//Segundo intento, esta vez comparando strings ordenados, funciona bien ,pero no puedo reconstruir la secuencia
function LCS(x, y) {
  var xPrime = x.toString().split(''),
      yPrime = y.toString().split(''),
      lX = xPrime.length,
      lY = yPrime.length,
      lcs = [],
      candidate = null,
      comparable = null;
  
  if (lX >= lY) {
    candidate = xPrime;
    comparable = yPrime;
  }else {
    candidate = yPrime;
    comparable = xPrime;
  }
  var j = comparable.length-1;
  for (var i = candidate.length-1; i >= 0 && j >= 0; i--) {
      if (candidate[i] == comparable[j]) {
        //match
        lcs.push(candidate[i]);
        //move comparable iterator
        j--;
      }
  };
  return lcs.reverse().join('');
}




*/