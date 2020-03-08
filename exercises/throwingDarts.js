function score(radio) {
	if (radio  > 10) {
		return 0;
	}else if (radio >= 5 && radio <= 10) {
		return 5;
	}else {
		return 10;
	}
}

function scoreThrows(radiuses){
  var total = radiuses.reduce(function (previous,current) {
  	return previous + score(current);
  },0);
  if (radiuses.length && total == (radiuses.length * 10)) {
  	//bonus applied
  	total += 100;
  }
  return total;
}



Test.assertEquals(scoreThrows([1, 5, 11]), 15);

/*
You've just recently been hired to calculate scores for a Dart Board game! 

Scoring specifications:
0 points - radius above 10
5 points - radius between 5 and 10 inclusive
10 points - radius less than 5

If all radiuses are less than 5, award 100 BONUS POINTS!

Write a function that accepts an array of radiuses (can be integers and/or floats), 
and returns a total score using the above specification.
An empty array should return 0.

Examples:
scoreThrows( [1, 5, 11] ) => returns 15 
scoreThrows( [15, 20, 30] ) => returns 0 
scoreThrows( [1, 2, 3, 4] ) => returns 140
*/