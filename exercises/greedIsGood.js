function score( dice ) {
  var counter = [0,0,0,0,0,0],score = 0;
  dice.reduce(function (p,c,i,a) {
  	counter[c-1] = counter[c-1]+1;
  },counter);

  counter.reduce(function (p,c,i,a) {
  	if (i >= 1 && i <=5 && c >= 3 && i !=4) score += (i+1)*100;

  	if (i == 0 && c > 0) score += (c>=3)? (c-3)*100 + 1000 : c*100;

  	if (i == 4 && c > 0) score += (c>=3)? (c-3)*50 + 500 : c*50;
  },score);

  return score;
}


score( [4, 4, 4, 3, 3] );


describe( "Scorer Function", function() {
  it( "should value this as worthless", function() {
    Test.expect( score( [2, 3, 4, 6, 2] ) == 0,   "Should be 0 :-(" );
  });
  
  it( "should value this triplet correctly", function() {
    Test.expect( score( [4, 4, 4, 3, 3] ) == 400, "Should be 400" );
  });
  
  it( "should value this mixed set correctly", function() {
    Test.expect( score( [2, 4, 4, 5, 4] ) == 450, "Should be 450" );
  });
});

/*
Greed is a dice game played with five six-sided dice. 
Your mission, should you choose to accept it, is to score a throw according to these rules.You will always be given an array with five six-sided dice values.

 Three 1's => 1000 points
 Three 6's =>  600 points
 Three 5's =>  500 points
 Three 4's =>  400 points
 Three 3's =>  300 points
 Three 2's =>  200 points
 One   1   =>  100 points
 One   5   =>   50 point
A single die can only be counted once in each roll. 
For example, a "5" can only count as part of a triplet (contributing to the 500 points)
 or as a single 50 points, but not both in the same roll.

Example scoring

 Throw       Score
 ---------   ------------------
 5 1 3 4 1   50 + 2 * 100 = 250
 1 1 1 3 1   1000 + 100 = 1100
 2 4 4 5 4   400 + 50 = 450
*/