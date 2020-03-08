String.prototype.toJadenCase = function () {
  // \b word 1st boundary   word, w is the 1st boundary
  return this.replace(/'/g,'_').replace(/\b([a-z])/g,
  	function (x) {
  		return x.toUpperCase();
  	}).replace(/_/g,"'");
};



String.prototype.toJadenCase = function () {
  //(^|\s)
  // ^ string statt
  // (a|b) a or b
  // \s white space
  // basicly if it is the first char or its an space
  // folowed by a [a-z] character in lower case

  return this.replace(/(^|\s)[a-z]/g,
  	function (x) {
  		return x.toUpperCase();
  	}).replace(/_/g,"'");
};


String.prototype.toJadenCase = function () {
  return this.replace(/(\b[\s]|^)[a-z]/g,
  	function (x) {
  		return x.toUpperCase();
  	});
};



"When You Live Your Whole Life In a Prison Freedom Can Be So Dull.".replace(/\b([a-zA-z](?! ))/g,function(x){return x.toUpperCase()});

var str = "How can mirrors be real if our eyes aren't real";
Test.assertEquals(str.toJadenCase(), "How Can Mirrors Be Real If Our Eyes Aren't Real");



/*
Jaden Smith, the son of Will Smith, 
is the star of films such as The Karate Kid (2010) and After Earth (2013).
Jaden is also known for some of his philosophy that he delivers via Twitter.
When writing on Twitter, he is known for almost always capitalizing every word.

Your task is to convert strings to how they would be written by Jaden Smith.
The strings are actual quotes from Jaden Smith,
 but they are not capitalized in the same way he originally typed them.

Example:

Not Jaden-Cased: "How can mirrors be real if our eyes aren't real"
Jaden-Cased:     "How Can Mirrors Be Real If Our Eyes Aren't Real"
Note that the Java version expects a return value of null for an empty string or null.
*/