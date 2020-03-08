function runoff(votesRecords){

	var calculateScore = function (vRecords) {
  	  	var scores = {},
  	  		finalS = [];
  	  	for (var i = vRecords.length - 1; i >= 0; i--) {
  	  		if (!scores[vRecords[i][0]]) {
  	  			scores[vRecords[i][0]] = 1;
  	  		}else {
  	  			scores[vRecords[i][0]] = scores[vRecords[i][0]] + 1; 
  	  		}
  	  	}
  	  	//Complete the missing profiles voted with 0
  	  	for (var i = vRecords[0].length - 1; i >= 0; i--) {
  	  		if (!scores[vRecords[0][i]]) {
  	  			scores[vRecords[0][i]] = 0;
  	  		}
  	  	} 

  	  	for (var k in scores) {
  	  		finalS.push({'name':k,'value':scores[k]});
  	  	}
  	  	
  	  	return finalS.sort(function (a,b) {
  	  		return a.value > b.value;
  	  	});
  	  },
  	  isGlobalTie = function (scores) {
  	  	var t = scores[0].value;
  	  	return scores.every(function(e) {
  	  		return e.value === t;
  	  	});
  	  },
  	  removeLosers = function (vRecords,scores) {
  	  	var min = scores[0].value,
  	  		i = 0,
  	  		toRemove = [],
  	  		clone = [];

  	  	while (scores[i].value == min) {
  	  		toRemove.push(scores[i].name);
  	  		i++;
  	  	}
  	  	for (var j=0,n=vRecords.length;j<n;j++) {
  	  		clone[j] = [];
  	  		for (var k=0,m=vRecords[0].length;k<m;k++) {
  	  			if (toRemove.indexOf(vRecords[j][k]) == -1) {
  	  				clone[j].push(vRecords[j][k]);
  	  			}
  	  		}
  	  	}
  	  	return clone; 

  	  }
  	  score = function (vRecords) {
  	  	if (!vRecords || !vRecords[0]) return null;
  		var l = vRecords.length,
  	  	max = l/2,
  	  	scores = calculateScore(vRecords);
  	  	
  	  	if (scores[scores.length-1].value >= max) {
  	  		//winner
  	  		return scores[scores.length-1].name;
  	  	}else if (isGlobalTie(scores)) {
  	  		//global tie
  	  		return undefined;
  	  	}else {
  	  		//continue reducing the vRecords set
  	  		return score(removeLosers(vRecords,scores));
  	  	}
  	  };

  return score(votesRecords);
}






voters = [["dem", "ind", "rep"],
          ["rep", "ind", "dem"],
          ["ind", "dem", "rep"],
          ["ind", "rep", "dem"]];
Test.assertSimilar(runoff(voters), "ind");
voters = [["a", "c", "d", "e", "b"],
         ["e", "b", "d", "c", "a"],
         ["d", "e", "c", "a", "b"],
         ["c", "e", "d", "b", "a"],
         ["b", "e", "a", "c", "d"]];
Test.assertSimilar(runoff(voters), undefined);
voters = [ [ 'a', 'c', 'b', 'd', 'e' ],
[ 'd', 'c', 'a', 'b', 'e' ],
[ 'e', 'b', 'd', 'a', 'c' ],
[ 'e', 'a', 'b', 'c', 'd' ],
[ 'b', 'c', 'e', 'a', 'd' ] ];
Test.assertSimilar(runoff(voters), 'e');


/*
Your task is to implement a function that calculates an election winner from a list 
of voter selections using an Instant Runoff Voting algorithm. 
If you haven't heard of IRV, here's a basic overview (slightly altered for this kata):

Each voter selects several candidates in order of preference.
The votes are tallied from the each voter's first choice.
If the first-place candidate has more than half the total votes, they win.
Otherwise, find the candidate who got the least votes and remove them from each 
person's voting list.
In case of a tie for least, remove all of the tying candidates.
In case of a complete tie between every candidate, 
return nil(Ruby)/None(Python)/undefined(JS).
Start over.
Continue until somebody has more than half the votes; they are the winner.
Your function will be given a list of voter ballots; 
each ballot will be a list of
candidates (symbols) in descending order of preference. 
You should return the symbol corresponding to the winning candidate. 
See the default test for an example!
*/