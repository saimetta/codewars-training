Cons.fromArray = function(array){
	return toAlgebraicList(array,null);
};

function toAlgebraicList(array,list) {
	if (array.length == 0) {
		return list;
	}else {
		var lIndex = array.length-1,
			head = array[lIndex],
			cons = new Cons(head,list);
		return toAlgebraicList(array.slice(0,lIndex),cons);
	}
}

function filter(list, predicate){
  var result = [],
  	  tmp = list.toArray();
  for (var i=0,n=tmp.length;i<n;i++) {
  	if (predicate.call(this,tmp[i])) result.push(tmp[i]);
  }
  return Cons.fromArray(result);
}

function map(list, mapper){
  var result = [],
  	  tmp = list.toArray();
  for (var i=0,n=tmp.length;i<n;i++) {
  	result.push(mapper.call(this,tmp[i]));
  }
  return Cons.fromArray(result);
}

Cons.prototype.filter = function(predicate){ return filter(this,predicate); };
Cons.prototype.map = function(mapper){ return map(this, mapper); };


/*
Description:

Context and Definitions

You are in charge of developing a new cool JavaScript library that provides functionality
 similar to that of Underscore.js.

You have started by adding a new list data type to your library. 
You came up with a design of a data structure that represents an algebraic 
data type as a pair of elements:

function Cons(head,tail){
    this.head = head;
    this.tail = tail;
}
You are pretty smart, because using this new data type, 
we can easily build a list of elements. For instance, a list of numbers:

var numbers  = new Cons(1, new Cons(2, new Cons(3, new Cons(4, new Cons(5, null)))));
In a code review with your boss, you explained him how every cons 
cell contains a "value" in its head, and in its tail it contains either 
another cons cell or null. We know we have reached the end of the data structure 
when the tail is null.

So, your boss is pretty excited about this new data structure and wants to know if
 you will be able to build some more functionality around it. 
 In a demo you did this week for the rest of your team, in order to illustrate how 
 this works, you showed them a method to transform a list of items of your list data 
 type into a JavaScript array:

function toArray(list) {
    if(list){
        var more = list.tail;
        return [list.head].concat(more? toArray(more) : []);
    }
    return [];
}

Cons.prototype.toArray = function(){ return toArray(this); };
And they were amazed when you simply did this:

console.log(numbers.toArray()); //yields [1,2,3,4,5]
The New Requirements

Now, the team is convinced that this is the way to go and they would like to build the 
library around this cool new data type, but they want you to provide a few more features 
for them so that they can start using this type in solving some real world problems.

You have been reading about a technique called applicative programming which basically 
consists in applying a function to every element in a list. So, you gave it some thought 
and you have decided to start adding features like filter, map and reduce. 
Basically you want to provide equivalent functionality to that of JavaScript arrays 
and in the future even more.

So, you will now add:

filter: create a new algebraic list containing only the elements that satisfy a predicate 
function.
map : create a new list in which every element is the result of applying a function 
provided as argument.
fromArray: a convenient complementary method that creates a list out of a JavaScript array.

For this Kata, the definition of Cons and the prototypal method toArray are already 
loaded in your environment.

Examples of Usage

var numbers  = Cons.fromArray([1,2,3,4,5]);
numbers.filter(function(n){ return n % 2 === 0; }).toArray();  //yields [2,4]
numbers.map( function(n){ return n * n; }).toArray(); //yields [1,4,9,16,25]

var digits = Cons.fromArray(["1","2","3","4","5"]);
var integers = digits.map(function(s){return parseInt(s);})
                     .filter(function(n){ return n > 3;})
                     .toArray(); //yields [4,5]
In other words:

The static method Cons.fromArray produces Cons(1, Cons(2, Cons(3, Cons 4, Cons 5, null))))).
Above filter creates a new list: Cons(2, Cons(4, null)).
So does above map: Cons(1, Cos(4, Cons(9, Cons(16, Cons(25, null))))).

*/