function restaurant(a,b,t){
  const buildTables = (a,b) => { 	
  	return {
  		oneSeat : a,
  		twoSeat : b,
  		shared: 0,
  		available : a + b*2
  	};
  };

  const seatOne = (tables) => {
	tables.available -= 1;
	if (tables.oneSeat) {
		tables.oneSeat -= 1;
	}else if(tables.twoSeat){
		tables.shared += 1;
		tables.twoSeat -= 1;
	}else if(tables.shared) {
		tables.shared -= 1;
	}
	return 0;
  };

  const seatTwo = (tables) => {
	if (tables.twoSeat) {
		tables.available -= 2;
		tables.twoSeat -= 1;
		return 0;
	}else {
		return 2;
	}
  }

  const seat = (client,tables) => {
    if (tables.available >= client) {
  		return client == 1?seatOne(tables):seatTwo(tables);
  	}else {
  		return client;
  	}
  };

  let tables = buildTables(a,b);
  let result = 0;
  t.map(group => {
  	result += seat(group,tables);
  });
  return result;
}


Test.describe("restaurant tests", function() {
  Test.it("basic tests", function() {
    [
      {a:1, b:2, t:[1,2,1,1], ans:0},
      {a:1, b:1, t:[1,1,2,1], ans:2}
    ].forEach(t=>
      Test.assertEquals(restaurant(t.a,t.b,t.t), t.ans, `wrong answer in test a=${t.a}, b=${t.b}, t=[${t.t}]`)
    );
  });
});


/*
In a small restaurant there are A tables for one person and B tables for two persons.
 It it known that N groups of people come today, each consisting of one or two people.

	If a group consist of one person, it is seated at a vacant one-seater table. 
	If there are none of them, it is seated at a vacant two-seater table. 
	If there are none of them, it is seated at a two-seater table occupied by single person. 
	If there are still none of them, the restaurant denies service to this group.
 
	If a group consist of two people, it is seated at a vacant two-seater table. 
	If there are none of them, the restaurant denies service to this group.

 You are given a chronological order of groups coming. You are to determine the total number of people the restaurant denies service to.

Input:
 Input contains two integers A and B — the number of one-seater and the number of two-seater tables, and a array of integers t1, t2, ..., tN (1 ≤ ti ≤ 2) — the description of clients in chronological order. If ti is equal to one, then the i-th group consists of one person, otherwise the i-th group consists of two people.

Output:
 Return the total number of people the restaurant denies service to.

Examples:

(1, 2, [1, 2, 1, 1])  =>  0
(1, 1, [1, 1, 2, 1])  =>  2
Note:
 In the first example the first group consists of one person, it is seated at a vacant one-seater table. The next group occupies a whole two-seater table. The third group consists of one person, it occupies one place at the remaining two-seater table. The fourth group consists of one person, he is seated at the remaining seat at the two-seater table. Thus, all clients are served.
 In the second example the first group consists of one person, 
it is seated at the vacant one-seater table. 
The next group consists of one person, it occupies one place at the two-seater table. 
It's impossible to seat the next group of two people, 
so the restaurant denies service to them. 
The fourth group consists of one person, he is seated at the remaining seat at 
the two-seater table. Thus, the restaurant denies service to 2 clients.


*/