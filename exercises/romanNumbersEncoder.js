function solution(number){
  // convert the number to a roman numeral
  var tMap = {
  	0:{'value':'','prev':null,'next':1},
  	1:{'value':'I','prev':0,'next':2},
  	2:{'value':'II','prev':1,'next':3},
  	3:{'value':'III','prev':2,'next':4},
  	4:{'value':'IV','prev':3,'next':5},
  	5:{'value':'V','prev':4,'next':6},
  	6:{'value':'VI','prev':5,'next':7},
  	7:{'value':'VII','prev':6,'next':8},
  	8:{'value':'VIII','prev':7,'next':9},
  	9:{'value':'IX','prev':8,'next':10},
  	10:{'value':'X','prev':9,'next':50},
  	50:{'value':'L','prev':10,'next':100},
  	100:{'value':'C','prev':100,'next':500},
  	500:{'value':'D','prev':100,'next':1000},
  	1000:{'value':'M','prev':500,'next':null},
  },
  t1 = function (n) {
	if (!n) return '';
	return tMap[n].value;
  },
  t2 = function (n) {
  	if (!n) return '';
	if (n == 5) return tMap[50].value;
	if (n == 1) return tMap[10].value;
	if (n <=3) {
		return repeatDigit(n,tMap[10].value);
	}else {
		return tMap[n].value+tMap[10].value;
	}
  },
  t3 = function (n) {
  	if (!n) return '';
	if (n == 5) {
		return tMap[500].value;
	}else if (n == 1) {
		return tMap[100].value;
	}else if (n <=3) {
		return repeatDigit(n,tMap[100].value);
	}else {
    	return tMap[n].value+tMap[100].value;
	}
  },
  t4 = function (n) {
  	if (!n) return '';
	if(n == 1) {
		return tMap[1000].value;
	}else if (n <=3) {
		return repeatDigit(n,tMap[1000].value);
	}else {
		return tMap[n].value+tMap[1000].value;
	}
  },
  repeatDigit = function (n,val) {
  	var r ='';
  	for (var i=0;i<n;i++) {
  		r = r+val;
  	}
  	return r;
  }
  translate = function(n,p) {
  	switch(p) {
	    case 4:
	    	// =>1K
	        return t4(n);
	        break;
	    case 3:
	    	// =>100
	        return t3(n);
	        break;
	    case 2:
	        //>9
	        return t2(n);
	        break;
	    case 1:
	    	//>=1
	        return t1(n);
	        break;
	    default:
	        console.log('Unknown: n:',n,' p: ',p);
	        return '';
	} 
  },
  tokens = (number+'').split(''),
  l = tokens.length,
  result = '';
  tokens.reduce(function (p,c,i) {
  	result += translate(parseInt(c,10),l-i);
  },result);

  return result;
}

// Create your own tests here. These are some of the methods available:
Test.assertEquals(solution(1), 'I');
Test.assertEquals(solution(2), 'II');
Test.assertEquals(solution(3), 'III');
Test.assertEquals(solution(4), 'IV');
Test.assertEquals(solution(5), 'V');
Test.assertEquals(solution(6), 'VI');
Test.assertEquals(solution(7), 'VII');
Test.assertEquals(solution(8), 'VIII');
Test.assertEquals(solution(9), 'IX');
Test.assertEquals(solution(10), 'X');
Test.assertEquals(solution(50), 'L');
Test.assertEquals(solution(53), 'LIII');
Test.assertEquals(solution(100), 'C');
Test.assertEquals(solution(135), 'CXXXV');
Test.assertEquals(solution(500), 'D');
Test.assertEquals(solution(1000), 'M');
Test.assertEquals(solution(1666), 'MDCLXVI');
Test.assertEquals(solution(1990), 'MCMXC');
Test.assertEquals(solution(2008), 'MMVIII');





/*
Description:

Create a function taking a positive integer as its parameter and 
returning a string containing the Roman Numeral representation of that integer.

Modern Roman numerals are written by expressing each digit separately 
starting with the left most digit and skipping any digit with a value of zero. I

n Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in descending order: MDCLXVI.

Example:

solution(1000); // should return 'M'
Help:

Symbol    Value
I          1
V          5
X          10
L          50
C          100
D          500
M          1,000
Remember that there can't be more than 3 identical symbols in a row.

More about roman numerals - http://en.wikipedia.org/wiki/Roman_numerals
*/