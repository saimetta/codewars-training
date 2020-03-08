function sortList (sortBy, list) {
  var tmp;
  for (var i = list.length - 1; i >= 0; i--) {
  	for (var j = 0; j < i; j++) {
  		if (list[j][sortBy] < list[j+1][sortBy]) {
  			tmp = list[j+1];
  			list[j+1] = list[j];
  			list[j] = tmp;
  		}
  	};
  };
  return list;
}


// Create your own tests here. These are some of the methods available:
//  Test.expect(boolean, [optional] message) 
Test.assertSimilar(
	sortList('a',[{a: 1, b: 3},{a: 3, b: 2},{a: 2, b: 40},{a: 4, b: 12}]),
	 [{a: 4, b: 12},{a: 3, b: 2},{a: 2, b: 40},{a: 1, b: 3}],
	 "Sort by key a"
 )

Test.assertSimilar(
	sortList('b',[{a: 1, b: 3},{a: 3, b: 2},{a: 2, b: 40},{a: 4, b: 12}]),
	 [{a: 2, b: 40},{a: 4, b: 12},{a: 1, b: 3},{a: 3, b: 2}],
	 "Sort by key b"
 )



/*
You'll be passed an array of objects -
you must sort them in descending order based on the value of an arbitrarily
specified property. 
For example, when sorted by a, this:

[
  {a: 1, b: 3},
  {a: 3, b: 2},
  {a: 2, b: 40},
  {a: 4, b: 12}
]
should return:

[
  {a: 4, b: 12},
  {a: 3, b: 2},
  {a: 2, b: 40},
  {a: 1, b: 3}
]
your function must take the form function sortList (sortBy, list)

The values will always be numbers, and the properties will always exist.
*/