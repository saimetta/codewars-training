function Node(data) {
  this.data = data;
  this.next = null;
}

function Context(source, dest) {
  this.source = source;
  this.dest = dest;
}

function moveNode(source, dest) {
  //empty source throw exception
  if (!source) {
  	throw "empty"
  }
  //empty destiny
  if (!dest) {
  	//move source head to destiny
  	return new Context(source.next,new Node(source.data));
  }else {
  	//both non empty,
  	//move source head to destiny top
  	var newSource = source.next;
  	//hook source head to destiny head
  	source.next = dest;
  	return new Context(newSource,source);
  }
}


/**
* Tests
*
**/
Test.describe("tests for moving a node from the head of one list to another.", function() {
  Test.it("should be able to handle two empty lists.", function() {
    Test.expectError("error should be thrown when source list is empty", function() {moveNode(null, null)});
  });
  Test.it("should be able to handle one empty list.", function() {
    Test.expectError("error should be thrown when source list is empty", function() {moveNode(null, new Node(23))});
    assertContextEquals(moveNode(buildOneTwoThree(), null), new Context(buildList([2, 3]), new Node(1)));
  });
  Test.it("should be able to handle two non-empty lists.", function() {
    assertContextEquals(moveNode(buildOneTwoThree(), buildOneTwoThree()), new Context(buildList([2, 3]), buildList([1, 1, 2, 3])));
    assertContextEquals(moveNode(buildOneTwoThreeFourFiveSix(), buildOneTwoThreeFourFiveSix()), new Context(buildList([2, 3, 4, 5, 6]), buildList([1, 1, 2, 3, 4, 5, 6])));
    assertContextEquals(moveNode(buildList([1, 2, 3, 4, 5, 6, 7]), buildList([4, 5, 6, 7])), new Context(buildList([2, 3, 4, 5, 6, 7]), buildList([1, 4, 5, 6, 7])));
  });
});


/*
Linked Lists - Move Node

Write a MoveNode() function which takes the node from the front of the source list and moves it to the front of the destintation list. You should throw an error when the source list is empty. For simplicity, we use a Context object to store and return the state of the two linked lists. A Context object containing the two mutated lists should be returned by moveNode.

MoveNode() is a handy utility function to have for later problems.

JavaScript

var source = 1 -> 2 -> 3 -> null
var dest = 4 -> 5 -> 6 -> null
moveNode(source, dest).source === 2 -> 3 -> null
moveNode(source, dest).dest === 1 -> 4 -> 5 -> 6 -> null
Python

source = 1 -> 2 -> 3 -> None
dest = 4 -> 5 -> 6 -> None
move_node(source, dest).source == 2 -> 3 -> None
move_node(source, dest).dest == 1 -> 4 -> 5 -> 6 -> None
Ruby

source = 1 -> 2 -> 3 -> nil
dest = 4 -> 5 -> 6 -> nil
move_node(source, dest).source == 2 -> 3 -> nil
move_node(source, dest).dest == 1 -> 4 -> 5 -> 6 -> nil
The push() and buildOneTwoThree() functions need not be redefined.

There is another kata called Linked Lists - Move Node In-place that is related but more difficult.

Related Kata in order of expected completion (increasing difficulty):
Linked Lists - Push & BuildOneTwoThree
Linked Lists - Length & Count
Linked Lists - Get Nth Node
Linked Lists - Insert Nth Node
Linked Lists - Sorted Insert
Linked Lists - Insert Sort
Linked Lists - Append
Linked Lists - Remove Duplicates
Linked Lists - Move Node
Linked Lists - Move Node In-place
Linked Lists - Alternating Split
Linked Lists - Front Back Split
Linked Lists - Shuffle Merge
Linked Lists - Sorted Merge
Linked Lists - Merge Sort
Linked Lists - Sorted Intersect
Linked Lists - Iterative Reverse
Linked Lists - Recursive Reverse

Inspired by Stanford Professor Nick Parlante's excellent Linked List teachings.
FundamentalsLinked ListsListsData Structures
JavaScript runs on Node v0.10.21. All code is ran through BabelJS (ES 2015 supported)
*/