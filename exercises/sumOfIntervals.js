function sumIntervals(intervals){
  var plain = [],
  	  statusMap = {},
  	  solution = 0,
  	  current = null,
  	  firstOpen = 0,
      isClosed = function(map) {
      for (key in map) {
        if (map[key] != 'closed') {
          return false;
        }	
      }
      return true;
    };


  for (var i in intervals) {
  		for(var j in intervals[i]) {
  			if (typeof intervals[i][j] !== "function") {
  				//exclude functions
  				plain.push({'value':parseInt(intervals[i][j],0),'group':i});
  			}
  		}
  }
  plain = plain.sort(function (a,b) {
  	return a.value > b.value; 
  });
  for (var i =0,n=plain.length;i<n;i++) {
  	current = plain[i];
  	if (!statusMap[current.group]) {
  		statusMap[current.group] = 'open';
  	}else if (statusMap[current.group] ){
		statusMap[current.group] = 'closed';
		if (isClosed(statusMap)) {
			solution = solution + current.value - plain[firstOpen].value;
			firstOpen = i+1;
		}
  	}	
  }
  return solution;
}

sumIntervals([[1,4],[7, 10],[3, 5]]);



describe('sumIntervals', function(){
  it('should return the correct sum for non overlapping intervals', function(){
    var test1 = [[1,5]];
    var test2 = [[1,5],[6,10]];
    Test.assertEquals(sumIntervals(test1), 4);
    Test.assertEquals(sumIntervals(test2), 8);
  });
  
  it('should return the correct sum for overlapping intervals', function(){
    var test1 = [[1,5],[1,5]];
    var test2 = [[1,4],[7, 10],[3, 5]];
    Test.assertEquals(sumIntervals(test1), 4);
    Test.assertEquals(sumIntervals(test2), 7);
  });
});

Test.assertEquals(sumIntervals([ [ 2, 9 ], [ 2, 6 ], [ 2, 4 ], [ 2, 9 ], [ 2, 5 ] ]), 7);
Test.assertEquals(sumIntervals([ [ 1, 20 ], [ 2, 19 ], [ 5, 15 ], [ 8, 12 ] ]), 19);
Test.assertEquals(sumIntervals([ [ 1, 5 ], [ 7, 10 ], [ 3, 5 ] ]), 7);
Test.assertEquals(sumIntervals([ [ 11, 15 ], [ 6, 10 ], [ 1, 2 ] ]), 9);
Test.assertEquals(sumIntervals([ [ 1, 5 ] ]), 4);
Test.assertEquals(sumIntervals([ [ 1, 5 ], [ 1, 5 ] ]), 4);
Test.assertEquals(sumIntervals([ [ 1, 20 ], [ 10, 20 ], [ 1, 6 ], [ 16, 19 ], [ 5, 11 ] ]), 19);
Test.assertEquals(sumIntervals([ [ 1, 10 ], [ 5, 10 ] ]), 9);
Test.assertEquals(sumIntervals([ [ 1, 12 ], [ 3, 6 ], [ 5, 8 ], [ 7, 10 ], [ 9, 12 ] ]), 11);
/*
Write a function called sumIntervals that accepts an array of intervals, 
and returns the sum of all the interval lengths. 
Overlapping intervals should only be counted once.

Intervals

Intervals are represented by a pair of integers in the form of an array. 
The first value of the interval will always be less than the second value. 
Interval example: [1, 5] is an interval from 1 to 5. 
The length of this interval is 4.

Overlapping Intervals

List containing overlapping intervals:

[
   [1,4],
   [7, 10],
   [3, 5]
]
The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, 
we can treat the interval as [1, 5], which has a length of 4.

Examples:

sumIntervals( [
   [1,2],
   [6, 10],
   [11, 15]
] ); //=> returns 9

sumIntervals( [
   [1,4],
   [7, 10],
   [3, 5]
] ); //=> returns 7

sumIntervals( [
   [1,5],
   [10, 20],
   [1, 6],
   [16, 19],
   [5, 11]
] ); //=> returns 19
*/