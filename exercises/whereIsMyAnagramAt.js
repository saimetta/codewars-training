function anagrams(word, words) {
	var ws = word.split('').sort(),
		cs,
		result = [];
	for (var i = 0, n = words.length; i < n ;i ++) {
		var wc = words[i];
		cs = wc.split('').sort();
		if (ws.length == cs.length) {
			var ok = true,j=0;
			while(j < ws.length && ok) {
				ok = (ws[j] == cs[j]);
				j++;
			}
			if (ok) result.push(wc);
		}

	}
	return result;
}
anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']);

// Create your own tests here. These are some of the methods available:
//  Test.expect(boolean, [optional] message) 
//  Test.assertEquals(actual, expected, [optional] message)
//  Test.assertSimilar(actual, expected, [optional] message)
//  Test.assertNotEquals(actual, expected, [optional] message) 

/*
What is an anagram? Well, two words are anagrams of each other if they both contain
 the same letters. For example:

'abba' & 'baab' == true

'abba' & 'bbaa' == true

'abba' & 'abbba' == false
Write a function that will find all the anagrams of a word from a list.
 You will be given two inputs a word and an array with words. 
 You should return an array of all the anagrams or an empty array if there are none. 
 For example:

anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']

anagrams('laser', ['lazing', 'lazy',  'lacer']) => []
*/