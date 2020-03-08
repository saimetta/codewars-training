function findNb(m) {
    var vol = 0,n = 0;
    
    while (vol <= m) {
	  n = n+1;      
      vol += Math.pow(n,3);
      
    }
    return (vol == m)?n:-1;
}


Test.describe("Basic tests",function() {

Test.assertEquals(findNb(4183059834009), 2022)
Test.assertEquals(findNb(24723578342962), -1)
Test.assertEquals(findNb(135440716410000), 4824)
Test.assertEquals(findNb(40539911473216), 3568)
})





/*
Your task is to construct a building which will be a pile of n cubes.
 The cube at the bottom will have a volume of n^3, the cube above
  will have volume of (n-1)^3 and so on until the top which will have a volume of 1^3.

You are given the total volume m of the building. Being given m can
 you find the number n of cubes you will have to build?

The parameter of the function findNb (find_nb, find-nb) will be an integer m and 
you have to return the integer n such as n^3 + (n-1)^3 + ... + 1^3 = m 
if such a n exists or -1 if there is no such n.

Examples:

findNb(1071225) --> 45
findNb(91716553919377) --> -1
Suggestion:

Try to optimize your function.
*/