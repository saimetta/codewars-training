function List() {}

function EmptyList() {}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.toString = function() { /* implement this */ };
EmptyList.prototype.isEmpty = function() { /* implement this */ };
EmptyList.prototype.length = function() { /* implement this */ };
EmptyList.prototype.push = function(x) { /* implement this */ };
EmptyList.prototype.remove = function(x) { /* implement this */ };
EmptyList.prototype.append = function(xs) { /* implement this */ };

function ListNode(value, next) {
	var value = null,
		next = null;
	this.value = value;
	this.next = next;
}
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;
ListNode.prototype.isEmpty = function() {
	return this.value == null;
};

ListNode.prototype.toString = function() {
	if (isEmpty()) return "()";
	var str = "(",
		n = this.next;
	while (n) {
		str+=n.value;
		n = n.next;
	}
	return str+")";
};

ListNode.prototype.head = function() {
	if (this.isEmpty()) return false;
	return new ListNode(this.value,null);
};
ListNode.prototype.tail = function() {
	if (this.next) {
		var result = new EmptyList();
		result.push(this.next);
		result.append(this.next.tail());
	}else {
		return new EmptyList();
	}
};
ListNode.prototype.length = function() {
	var count = 0,
		n = this.next;
	while (n) {
		count++;
		n = n.next;
	}
	return n;
};
ListNode.prototype.push = function(x) {
	var head = this.head(),
		nHead = new ListNode(x.value,null);
	head.append(this.tail());
	nHead.next(head);
	return nHead;
};
ListNode.prototype.remove = function(x) {
	var head = new ListNode(null,null),
		current = this;
	while (current.value == x) {
		current = current.next;
	}
	if (current) {
		head.value = current.value;
		current = current.next;
	}


};
ListNode.prototype.append = function(xs) {
	var head = this.head(),
		nextNode = this.next,
		currentNode = head,
		tmp = null;
	while (nextNode.next) {
		tmp = new ListNode(nextNode.value,null);
		currentNode.next(tmp);
		currentNode = tmp;
		nextNode = nextNode.next;
		
	}
	if (nextNode) {
		//Got the last node
		currentNode.next(new ListNode(nextNode.value,null));
	}
	return head;
};



Test.describe("Example list tests", function () {
  var mt, l1, l2, l3, l4;
  
  Test.before( function () {
    mt = new EmptyList();
    l1 = mt.push('c').push('b').push('a');
    l2 = l1.append(l1);
    l3 = l1.remove('b');
    l4 = l2.remove('b');
  });
    
  Test.it( "Simple checks", function () {
    Test.expect(mt.isEmpty(), "Empty List is empty");
    Test.expect( !l1.isEmpty(), "Non-empty list is not empty");
    Test.expect(mt.toString() === "()", "()");
    Test.expect(l3.toString() === "(a c)", "(a c)");
    Test.expect(mt.length() === 0, "Empty list has length zero");
    Test.expect(l1.length() === 3, "(a b c) length 3");
  });
    
  Test.it( "Shared structure", function () {
    Test.expect(l2.tail().tail().tail() === l1, "(a b c a b c) shares");
    Test.expect(l2 !== l1, "(a b c a b c) doesn't share too much");
    Test.expect(l3.tail() === l1.tail().tail(), "(a b c) remove b shares c");
  });
});


/*
In this kata, you will create a simple, immutable, singly-linked list.

Most list implementations use mutable nodes. 
Mutability brings with it a whole host of problems (especially in threaded environments, 
but even just with state saved and shared in multiple places). 
When you shift to immutable nodes, you gain a new ability to reason about things. 
If you have a list, it will never contain different things than it does at the moment.

However, when dealing with immutable nodes, one has to take special steps to try 
to maintain efficiency. For example, to add a node to the beginning of a list, 
you don't want to have to duplicate the whole list. 
You want to be able to share as many nodes of the list as possible between 
the original list and the newly generated list (while still being a singly-linked list).

There are two classes involved here: EmptyList and ListNode. 
Each of these should support the following operations: 
toString(), isEmpty(), length(), push(), remove(), and append(). 
If isEmpty() returns false, then the following two methods should also be supported: 
head() and tail().

var list0 = new EmptyList();        // => "()"
var list1 = list0.push(3);          // => "(3)"
var list2 = list1.push(2);          // => "(2 3)"
var list3 = list2.push(1);          // => "(1 2 3)"
var list13 = list1.append(list3);   // => "(3 1 2 3)"

list13.head()    // => 3
list13.tail()    // => list3

list1 instanceof ListNode
list1.tail() instanceof EmptyList
Diagramatically, this is what list3 above should look like:



Or, if you prefer JSON:

{ value: 1,
  next: { value: 2,
          next: { value: 3,
                  next: {} } } }
The EmptyList constructor takes no arguments. 

The ListNode constructor takes a value and a next parameter. 
The value parameter can be anything. 
The next parameter will be either a ListNode instance or an EmptyList instance 
representing the rest of the list after this node.

The toString() method should return "()" for an EmptyList and "(1 2 3)" 
for a list containing the numbers 1, 2, and 3.

The isEmpty() method will return true for EmptyList instances and false 
for the ListNode instances.

The length() method will return the number of non-EmptyList nodes in a list.

The orig.push(x) method will create a list whose first node contains the value x and 
where the new list shares as many nodes as possible with orig 
(while still being a singly-linked list).

The orig.remove(x) method will create a list where all nodes with value x are removed 
and which shares as many nodes as possible with orig (while still being a 
singly-linked list).

The orig.append(other) method will create a list which is a concatenation of all nodes 
in orig and all nodes in other and which shares as many nodes as possible with orig and 
other (while still being a singly-linked list).

If orig.isEmpty() returns false, then orig.head() should return the value in the 
first node of the list. 

The orig.tail() should return the sublist of orig containing all of the nodes except the 
first node in orig.

*/