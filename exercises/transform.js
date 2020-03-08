const transform = (s) => {
	const cMap = {};
	const sA = s.split('');
	sA.map((ch) => {
    if(cMap[ch]) {
			cMap[ch] = cMap[ch]+1; 
		}else {
			cMap[ch] = 1;
		}
	});

	let result = "";
	sA.map((ch) => {
		if(cMap[ch] > 1) {
			result+= ch+cMap[ch];
			cMap[ch] = null;
		}else if(cMap[ch]){
			result+= ch;
		}
	});
	return result;
}

Test.assertEquals(transform('elevation'), 'e2lvation');
Test.assertEquals(transform('transplantology'), 't2ra2n2spl2o2gy');
Test.assertEquals(transform('economics'), 'ec2o2nmis');
Test.assertEquals(transform('embarrassed'), 'e2mba2r2s2d');
Test.assertEquals(transform('impressive'), 'i2mpre2s2v');


/*
Description: 


In this kata you will have to transform each string so that it contains count 
for every symbol it contains, starting from 2.
The order of symbols should be preserved.

Example: abbreviation => a2b2revi2ton

*/