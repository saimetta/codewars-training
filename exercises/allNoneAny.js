Array.prototype.all = function (p) {
  var result = true;
  for (var i = this.length - 1; i >= 0; i--) {
  	if(!p(this[i])) return false;
  };
  return result;
};

Array.prototype.none = function (p) {
	var result = true;
	for (var i = this.length - 1; i >= 0; i--) {
		if(p(this[i])) return false;
	};
  	return result;
};

Array.prototype.any = function (p) {
  var result = false;
	for (var i = this.length - 1; i >= 0; i--) {
		if(p(this[i])) return true;
	};
  	return result;
};




function isGreaterThanZero (num) {
  return num > 0;
}

function isLessThanZero (num) {
  return num < 0;
}

Test.expect([1, 2, 3].all(isGreaterThanZero), 'All are greater than zero');
Test.expect(![-1, 0, 2].all(isGreaterThanZero), 'One is less than zero');

Test.expect(![-1, 2, 3].none(isLessThanZero), 'One is less than zero');
Test.expect([-1, -2, -3].none(isGreaterThanZero), 'None are greater than zero');

Test.expect([-1, 2, 3].any(isGreaterThanZero), 'Two are greater than zero');
Test.expect(![-1, -2, -3].any(isGreaterThanZero), 'None are greater than zero');
/*
As a part of this Kata, you need to create three functions 
that one needs to be able to call upon an array:

all

This function returns true only if the predicate supplied returns true
 for all the items in the array

[1, 2, 3].all(isGreaterThanZero) => true
[-1, 0, 2].all(isGreaterThanZero) => false
none

This function returns true only if the predicate supplied 
returns false for all the items in the array

[-1, 2, 3].none(isLessThanZero) => false
[-1, -2, -3].none(isGreaterThanZero) => true
any

This function returns true if at least 
one of the items in the array returns true for the predicate supplied

[-1, 2, 3].any(isGreaterThanZero) => true
[-1, -2, -3].any(isGreaterThanZero) => false
You do not need to worry about the data supplied, it will be an array at all times.
*/