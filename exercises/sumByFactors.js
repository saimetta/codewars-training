function sumOfDivided(lst) {
  var pm = {},
  	  result = [],
  	  rpm = {};
  lst.reduce(function (p,c,i,a) {
  	pm[c] = new Set(primeFactor(c,[]));
  	pm[c].forEach(function (val) {
  		if (rpm[val]) {
  			rpm[val].push(c);
  		}else {
  			rpm[val] = [c];
  		}
  	});
  },pm);
  for (var key in rpm) {
  	result.push([parseInt(key,10),rpm[key].reduce(function (p,c,i,a){
  		return p+c;
  	},0)]);
  }
  return result
}
 
function primeFactor(num,result) {
	var divisor = 2,
		isNegative = num < 0,
		numP = !isNegative?num:Math.abs(num),
		root = Math.sqrt(numP);

	
	if (numP % divisor != 0) {
		divisor = 3;
		while (numP % divisor != 0 && divisor < root) {
			divisor = divisor +2
		}
	}
	if (divisor <= root) {
		result.push(divisor);
		return primeFactor(num/divisor,result);
	}else {
		//the number is prime
		result.push(numP);
		return result;
	} 
	
}


Test.assertSimilar(sumOfDivided([ 15, 21, 24, 30 ]), [[2,54],[3,45],[5,0],[7,21]]);
Test.assertSimilar(sumOfDivided([ 15, 21, 24, 30, -45 ]), [[2,54],[3,45],[5,0],[7,21]]);
Test.assertSimilar(sumOfDivided([12, 15]), [ [2, 12], [3, 27], [5, 15] ]);
Test.assertSimilar(sumOfDivided([15,21,24,30,45]), [ [2, 54], [3, 135], [5, 90], [7, 21] ]);

/*
Given an array of positive or negative integers

I= [i1,..,in]

you have to produce a sorted array P of the form

[ [p, sum of all ij of I for which p is a prime factor (p positive) of ij] ...]

P will be sorted by increasing order of the prime numbers. 
The final result has to be given as a string in Java or C# and as an array of arrays 
in other languages.

Example:

I = [12, 15] 
result = [[2, 12], [3, 27], [5, 15]]
[2, 3, 5] is the list of all prime factors of the elements of I, 
hence the result.

Note: It can happen that a sum is 0 if some numbers are negative!

Example: I = [15, 30, -45] 5 divides 15, 30 and (-45) so 5 appears in the result, 
the sum of the numbers for which 5 is a factor is 0 so we have [5, 0] in the result 
amongst others.
*/