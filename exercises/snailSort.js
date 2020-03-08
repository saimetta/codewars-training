snail = function(array) {
  if (!array || !array.length) return [];
  
  var n = array[0].length,
  	  status = [],
  	  result = [],
  	  max = n*n,
  isValidMove = function (i,j) {
  	return i<n && j<n && i>=0 && j>=0 && status[i][j] === 0;
  },
  initStatus = function (n) {
  	for (var i = 0; i < n; i++) {
  		status[i] = [];
  		for (var j = 0; j < n; j++) {
  			status[i].push(0);
  		}
  	}
  },
  moves = [
  	{'y':0,'x':1,'l':'>'},
  	{'y':1,'x':0,'l':'v'},
  	{'y':0,'x':-1,'l':'<'},
  	{'y':-1,'x':0,'l':'^'},
  ]
  traverse = function (y,x) {
  	status[y][x] = 1;
	result.push(array[y][x]);
	if (result.length < max) {
		var m = moves[0],
			tmp = null;

	  	while(!isValidMove(y+m.y,x+m.x)) {
	  		tmp = moves.shift();
	  		moves.push(tmp);
	  		m = moves[0];
	  	}	  		
	  	return traverse(y+m.y,x+m.x); 
	  	
	}else {
		//finished!
		return;
	}
  };
  initStatus(n);
  traverse(0,0);
  return result;
}

var a = [[1,2,3],
         [4,5,6],
         [7,8,9]];

 snail(a);


 Test.assertSimilar(snail([[1,2,3],[4,5,6],[7,8,9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5])
 Test.assertSimilar(snail([[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]),[1,2,3,4,5,10,15,20,25,24,23,22,21,16,11,6,7,8,9,14,19,18,17,12,13]) 



[1,2,3,4,5]
[6,7,8,9,10]
[11,12,13,14,15]
[16,17,18,19,20]
[21,22,23,24,25]



[1,2,3,4,5,10,15,20,25,24,23,22,21,16,17,18,19,14,13,12,11,6,7,8,9]
/*
Snail Sort

Given an n x n array, return the array elements arranged from outermost 
elements to the middle element, traveling clockwise.

array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
For better understanding, please follow the numbers of the next array 
consecutively:

array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
This image will illustrate things more clearly:



NOTE: The idea is not sort the elements from the lowest value to the highest;
 the idea is to traverse the 2-d array in a clockwise snailshell pattern.

NOTE 2: The 0x0 (empty matrix) is represented as [[]]
*/