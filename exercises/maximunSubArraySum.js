var maxSequence = function(arr){
  if (!arr) return 0;
  var sum = 0, curSum = 0;
  for (var i=0,n = arr.length;i<n;i++){
    curSum += arr[i];
    if (curSum > sum) {
      sum = curSum;
    }else if (curSum < 0) {
      curSum = 0;
    }
  }
  return sum;
}

describe( "maxSequence", function(){
  it("should work on an empty array",function(){
    Test.assertEquals(maxSequence([]), 0);
  });
  it("should work on the example",function(){
    Test.assertEquals(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
  });
});

/*
The maximum sum subarray problem consists in finding the maximum sum of a 
contiguous subsequence in an array or list of integers:

maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// should be 6: [4, -1, 2, 1]
Easy case is when the list is made up of only positive numbers and the maximum
sum is the sum of the whole array. If the list is made up of only negative numbers,
return 0 instead.

Empty list is considered to have zero greatest sum. 
Note that the empty list or array is also a valid sublist/subarray.
*/