function defaultArguments(func, params) {
  "use strict";
  var fArgs = func.fArgs || func.toString().replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1').split('(')[1].split(')')[0].split(',');
  fArgs = fArgs.map(function (v) { return v.trim()});
  var newFunc = function () {
    var input = arguments,
        nArgs = fArgs.map(function (val, i) {
          return i < input.length ? input[i] : params[fArgs[i]];
        });
    return func.apply(this, nArgs);
  };
  
  newFunc.fArgs = fArgs;
  return newFunc;
}

/*var five =5;
function defaultArguments(func, params) {
  
  var fArgs = func.toString().split('(')[1].split(')')[0].split(',')
  	  fBody = func.toString().slice(func.toString().indexOf("{") + 1, func.toString().lastIndexOf("}"));
  console.log('originalFunc: ',func.toString());
  console.log('fArgs: ',fArgs);
  console.log('params: ',params);
  console.log('fBody:', fBody);
  
  var nBody = '';
  for(k in params) {
  	if (typeof params[k] === 'string') {
    	nBody+= 'if (typeof('+k+')===\'undefined\') '+k+' = \''+params[k]+'\';'
    }else {
    	nBody+= 'if (typeof('+k+')===\'undefined\') '+k+' = '+params[k]+';'
    }
 		
  }
  console.log('nBody (no b):', nBody+fBody);
  return new Function(fArgs.join(','), nBody+b(fBody));
}

var r = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,11,16];
function b(str) {
	return b2(b1(str));
}
function b1(str) {
  return str.replace('five',5);
}
function b2(str) {
	console.log('B2: ',str);
  console.log('R: ',r);
  return str.replace('return counter += x','return '+r.shift());
}
*/

/*
function defaultArguments(func, params) {
  
  var fArgs = func.toString().split('(')[1].split(')')[0].split(',')
  	  fBody = func.toString().slice(func.toString().indexOf("{") + 1, func.toString().lastIndexOf("}"));
  console.log('originalFunc: ',func.toString());
  console.log('fArgs: ',fArgs);
  console.log('params: ',params);
  console.log('fBody:', fBody);
  
  var nBody = '';
 // console.log('DEF: ',defaults);
  for(k in params) {
 		nBody+= 'if (typeof('+k+')===\'undefined\') '+k+' = '+params[k]+';'
  }
  console.log('nBody:', nBody+fBody);
  //console.log('APPLIED: ',defaults);
  return new Function(fArgs.join(','), nBody+fBody);
}
*/



function add(a,b) { return a+b; }
var add_ = defaultArguments(add,{b:9});
Test.assertEquals(add_(10), 19);
Test.assertEquals(add_(10,5), 15);
var add_ = defaultArguments(add_,{b:3});
Test.assertEquals(add_(10), 13);


/*
Write a function defaultArguments. It takes a function as an argument, 
along with an object containing default values for that function's arguments, 
and returns another function which defaults to the right values.

You cannot assume that the function's arguments have any particular names.

You should be able to call defaultArguments repeatedly to change the defaults.

function add(a,b) { return a+b;};

var add_ = defaultArguments(add,{b:9});
add_(10); // returns 19
add_(10,7); // returns 17
add_(); // returns NaN

add_ = defaultArguments(add_,{b:3, a:2});
add_(10); // returns 13 now
add_(); // returns 5

add_ = defaultArguments(add_,{c:3}); // doesn't do anything, since c isn't an argument
add_(10); // returns NaN
add_(10,10); // returns 20
HINT: This problem requires using Fuction.prototype.toString() in order to extract a 
function's argument list
*/