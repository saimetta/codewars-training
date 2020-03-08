function createArgumentMap(func) {
	var fArgs = func.toString().split('(')[1].split(')')[0].split(','),
		map = {};
	for(var i =1,n=arguments.length;i<n;i++){
    map[fArgs[i-1].trim()] = arguments[i];
	}
	return map;
}

var ft1= createArgumentMap(function(){});
Test.expect( Object.keys(ft1).length == 0, "Should return []");

var ft2 = createArgumentMap(function(a1){},'a1 argvalue');
Test.expect( Object.keys(ft2).length == 1, "Should have 1 element");
Test.expect( ft2['a1'] === 'a1 argvalue', "Should return 'a1 argvalue'");


/*
As part of a broader functionality you need to develop an argument mapper.

The function receives a function object as first parameter and 
an unknown number of arguments [zero to many]. 
You have to return an associative array that maps the name of an argument and its 
related value.

The usage is:

function func1(arg1, arg2) { ... }

var map = createArgumentMap(func1,'valueOfArg1', 'valueOfArg2');
console.log(map['arg1']);  // writes 'valueOfArg1'
console.log(map['arg2']);  // writes 'valueOfArg2'
The passed values are in the same order as they appear in the function object.

Invalid inputs, e.g. non-function objects, or wrong number of arguments, are not considered.

Hajime!
*/