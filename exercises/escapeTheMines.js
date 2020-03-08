function solve(map, miner, exit) {
  //Clone the map to keep the current traverse status
  var xMax = map.length,
      yMax = map.length,
      //Junction points
      junctionPoints = [],
      //Valid moves here
      result = [],
      //Validates boundaries and status
      isValid = function (x,y) {
        return  x>=0 && y >=0 && x < xMax && y < yMax && status[x][y];
      },
      //Marks the position as traversed and adds the move to the move list
      mark = function (label,x,y) {
        if (label) {
          result.push(label);
        }
        status[x][y]=false;
      },
      moves = [[]],
      //Clones the original map
      clone = function (aMap) {
        var leClone = [];
        for(var i = 0,n = aMap.length;i<n;i++) {
          var row = [],
              current = aMap[i];
          for(var j = 0,m = current.length;j<m;j++) {
            row.push(current[j]);
          }
          leClone.push(row);
        }
        return leClone;
      },
      //Cloned version of map
      status =clone(map),
      //Returns a list of  valid moves from the given position or empty array
      getMoves = function (x,y) {
        var moves = [];
        if (isValid(x-1,y)) {
          //up left
          moves.push({'label':'left','x':x-1,'y':y});
        }
        if (isValid(x+1,y)) {
          //down right
          moves.push({'label':'right','x':x+1,'y':y});
        }
        if (isValid(x,y-1)) {
          //up start
          moves.push({'label':'up','x':x,'y':y-1});
        }
        if (isValid(x,y+1)) {
          //down start
          moves.push({'label':'down','x':x,'y':y+1});
        }
        return moves;
      },
      //Returns a valid next move. Considers JP
      move = function (x,y) {
        var moves = getMoves(x,y);
        if (moves.length > 1) {
          //is a JP
          //create a reference to go back in case of death end
          createJunction(moves,x,y);
          return moves[0];
        }else if (moves.length == 1) {
          //common move
          return moves[0];
        }else {
          //no valid moves
          return false;
        }
      }
      //Marks the position as traversed and verifies if the exist has been reached.
      //if not makes a recursive call
      traverse = function (label,x,y) {
        mark(label,x,y);
        if (x == exit.x && y ==exit.y) {
          return;
        }else {
          var m= move(x,y);
          if (m) {
            return traverse(m.label,m.x,m.y);
          }else {
            //no valid moves, go back to the last JP
            var jp = getLastJunctionPoint();
            if (jp) {
              status = jp.map;
              result = jp.validMoves;
              //traverse to the next valid move from the JP
              var nextValid = jp['availableMoves'].pop();
              return traverse(nextValid.label,nextValid.x,nextValid.y);

            }else {
              //Something wrong, out of JP and solutions
              console.log('Something wrong, out of JPs and solutions');
              return false;
            }
          }
        }
      },
      //Creates an junction poin, with the last valid moves and the junction point cordinates
      createJunction = function (moves,x,y) {
        var mCopy = [],
        mAvailable = [];
        
        moves.map(function (move) {
          mAvailable.push(move);
        });
        
        result.map(function (move) {
          mCopy.push(move);
        });

        var jp = {
          'returnPoint': {'x':x,'y':y},
          'validMoves': mCopy,
          'map': clone(status),
          'availableMoves': mAvailable
        };
        junctionPoints.push(jp);
        return jp;
      },
      //Returns  from the list the last jp added
      getLastJunctionPoint = function () {
        if (junctionPoints.length) {
          var jp = junctionPoints[junctionPoints.length-1];
          if (jp['availableMoves'].length == 0) {
            //discard the JP
            discardJP();
            //recursive call;
            getLastJunctionPoint();
          }else {
            return jp;
          }
        }else {
          return null;
        }
      },
      //Returns and removes from the list the last jp added
      discardJP = function () {
        return junctionPoints.pop();
      },
      //Generates the first move, and starts traversing the map
      start = function () {
        var firstMove = move(miner.x,miner.y);
        mark(null,miner.x,miner.y);
        traverse(firstMove.label,firstMove.x,firstMove.y);
      };
     
  console.log('miner:',miner);
  console.log('exit:',exit);
  console.log('status:',status);
  
  //Already solved
  if (miner.x == exit.x && miner.y == exit.y) return result;
  start();
  return result;
}



//Tests

describe('A trivial map (1x1)', function() {
  var map = [[true]];
  
  it('Should return an empty array, since we\'re already at the goal', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:0,y:0}), []);
  });
});

describe('A pretty simple map (2x2)', function() {
  var map = [[true, false],
    [true, true]];
   
  it('Should return the only correct move', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:0}), ['right']);
  });
  
  it('Should return the only moves necessary', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:1,y:1}), ['right', 'down']);
  });
});

describe('A linear map(1x4)', function() {
  var map = [[true], [true], [true], [true]];
  
  it('Should return a chain of moves to the right', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:3,y:0}), ['right', 'right', 'right']);
  });
  
  it('Should return a chain of moves to the left', function() {
     Test.assertSimilar(solve(map, {x:3,y:0}, {x:0,y:0}), ['left', 'left', 'left']);
  });
});

describe('Should walk around an obstacle (3x3 map)', function() {
  var map = [[true, true, true],
  [false, false, true],
  [true, true, true]];
  
  it('Should return the right sequence of moves', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:2,y:0}), ['down', 'down', 'right', 'right', 'up', 'up']);
  });
});

describe('Should be able to change directions multiple times (5x5 map)', function() {
  var map = [[true, true, false, false, false],
    [false, true, true, false, false],
    [false, false, true, true, false],
    [false, false, false, true, true],
    [false, false, false, false, true]];
    
    it('Should return a step sequence of moves', function() {
      Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}),
        ['down', 'right', 'down', 'right', 'down', 'right', 'down', 'right']);
    });
});

describe('Should avoid dead-ends (5x5 map)', function() {
  var map = [[true, true, true, false, true],
    [false, false, true, false, true],
    [true, true, true, true, true],
    [true, false, true, false, false],
    [false, true, true, true, true]];
  
  it('Should return the right moves', function() {
    Test.assertSimilar(solve(map, {x:0,y:0}, {x:4,y:4}), ['down', 'down', 'right', 'right', 'right', 'right', 'down', 'down'])
  });
});

/*
A poor miner is trapped in a mine and you have to help him to get out !

Only, the mine is all dark so you have to tell him where to go.

In this kata, you will have to implement a method solve(map, miner, exit) that has 
to return the path the miner must take to reach the exit as an array of moves, 
such as : ['up', 'down', 'right', 'left']. There are 4 possible moves, up, down, 
left and right, no diagonal.

map is a 2-dimensional array of boolean values, representing squares. 
false for walls, true for open squares (where the miner can walk). 
It will never be larger than 5 x 5. It is laid out as an array of columns. 
All columns will always be the same size, though not necessarily the same size as 
rows (in other words, maps can be rectangular). The map will never contain any loop, 
so there will always be only one possible path. The map may contain dead-ends though.

miner is the position of the miner at the start, as an object made of two zero-based 
integer properties, x and y. For example {x:0, y:0} would be the top-left corner.

exit is the position of the exit, in the same format as miner.

Note that the miner can't go outside the map, as it is a tunnel.

Let's take a pretty basic example :

var map = [[true, false],
    [true, true]];

solve(map, {x:0,y:0}, {x:1,y:1});
// Should return ['right', 'down']
*/