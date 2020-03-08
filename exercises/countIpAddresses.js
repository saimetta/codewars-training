function ipsBetween(start, end){
  var result = 0;
  start = start.split('.');
  end = end.split('.');

  for (var i = 3; i > 0; i--) {
  	result += (start[i] > end[i]) ? 255 - start[i] : end[i] - start[i];
  }
  return result;
}


Test.assertEquals(ipsBetween("10.0.0.0", "10.0.0.50"), 50);
Test.assertEquals(ipsBetween("20.0.0.10", "20.0.1.0"), 246);

/*
Write a function that accepts a starting and ending IPv4 address, 
and returns the number of IP addresses from start to end, 
excluding the end IP address. 
All input to the ipsBetween function will be valid IPv4 addresses in the form of strings. 
The ending address will be at least one address higher than the starting address. 


Examples: 
ipsBetween("10.0.0.0", "10.0.0.50") => returns 50 
ipsBetween("10.0.0.0", "10.0.1.0") => returns 256 
ipsBetween("20.0.0.10", "20.0.1.0") => returns 246
*/