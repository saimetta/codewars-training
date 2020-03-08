
function heggeleggleggo(word){
  // \s any whitespace character
  // [^aeiou] any character except aeiou
  // /g global replace
  // $& the matched content	before
  return word.replace(/[^aeiou\s]/gi,"$&egg");
}

Test.assertEquals(heggeleggleggo("hello"), "heggeleggleggo")
Test.assertEquals(heggeleggleggo("code here"), "ceggodegge heggeregge")
/*
Egg Talk.

Insert an "egg" after each consonant. If there are no consonants, there will be no eggs. Argument will consist of a string with only alphabetic characters and possibly some spaces.

eg:

hello => heggeleggleggo

eggs => egegggegg

FUN KATA => FeggUNegg KeggATeggA

////

This Kata is designed for beginners to practice the basics of regular expressions. With this in mind a little bit of commenting in your solution could be very useful.

Check Eloquent Javascript p176

https://regex101.com/#javascript
*/