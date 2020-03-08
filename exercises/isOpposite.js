function isOpposite(s1,s2){
  if (!s1 || !s2 || s1.lenght != s2.length) return false;
  
  for (var i=0,n=s1.length;i<n;i++) {
    if (s1[i].toLowerCase() == s2[i].toLowerCase() && (s1[i] == s2[i].toLowerCase() || s1[i].toLowerCase() == s2[i])) {
    	continue;
    }
    return false;
  }
  return true;
  
}




//Tests

Test.assertSimilar(isOpposite("ab","AB") , true);
Test.assertSimilar(isOpposite("aB","Ab") , true);
Test.assertSimilar(isOpposite("aBcd","AbCD") , true);
Test.assertSimilar(isOpposite("AB","Ab") , false);
Test.assertSimilar(isOpposite("","") , false);
  

/*
True if the string are opposites or false
*/