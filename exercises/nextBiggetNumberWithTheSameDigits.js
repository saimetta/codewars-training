
function nextBigger(n){
  var tokens = n.toString().split(''),
  	  permutation = false,
  	  breakPoint = null;

  for (var i = tokens.length-1;i >  0; i--) {
  	if (parseInt(tokens[i]) > parseInt(tokens[i-1])) {
  		breakPoint = i-1;
  		break;
  	}
  }
  if (breakPoint == null) return -1;
  var key = tokens[breakPoint],
  lastPart = tokens.slice(breakPoint+1,tokens.length).sort(),
  firstPart = tokens.slice(0,breakPoint);
  key = lastPart.find(function (e,i,a) { if (e>key) { a[i] = key; return e;}else {return false}});
  return parseInt(firstPart.join('')+key+lastPart.join(''));
}

nextBigger(59884848459853);





function nextBigger(n){
  console.log(n);
  var tokens = n.toString().split(''),
  	  num = n.toString().split(''),
  	  permutation = false,
  	  tmp;
  
  for (var i = tokens.length-1;i >  0; i--) {
  	if (parseInt(tokens[i]) > parseInt(tokens[i-1])) {
  		num[i] = tokens[i-1];
  		num[i-1] = tokens[i];
  		permutation = true;
  		if (i < tokens.length-1 && num[i] > num[i+1]) {
  			tmp = num[i];
  			num[i] = num[i+1];
  			num[i+1] = tmp;
  		}
  		break;
  	}
  }
  return permutation?parseInt(num.join('')):-1;
}






Test.assertEquals(nextBigger(12),21)
Test.assertEquals(nextBigger(513),531)
Test.assertEquals(nextBigger(2017),2071)
Test.assertEquals(nextBigger(414),441)
Test.assertEquals(nextBigger(144),414)
Test.assertEquals(nextBigger(1234567890),1234567908)
Test.assertEquals(nextBigger(59884848459853),59884848483559)


/*
You have to create a function that takes a positive integer number 
and returns the next bigger number formed by the same digits:

nextBigger(12)==21
nextBigger(513)==531
nextBigger(2017)==2071
If no bigger number can be composed using those digits, return -1:

nextBigger(9)==-1
nextBigger(111)==-1
nextBigger(531)==-1
*/