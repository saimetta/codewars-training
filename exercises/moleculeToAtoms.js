function addToResult(expresion,result) {
	if (result[expresion['a']]) {
		result[expresion['a']] = result[expresion['a']] + expresion['m'];
	}else {
		result[expresion['a']] = expresion['m'];
	}
}

function addComplexToResult(expresion, result) {
	var parsed = parse(expresion.e);
	while(parsed.length) {
		var current = parsed.pop();
		current.m = current.m * expresion.m;
		if (current.e) {
			addComplexToResult(current,result);
		}else {
			addToResult(current,result);
		}
	}
	return result;
}

function parseMolecule(expresion) {
	var expresions = parse(expresion),
	current = null,
	result = {};
	while(expresions.length) {
		current = expresions.pop();
		if (current.e) {
			addComplexToResult(current,result);
		}else {
			addToResult(current,result);
		}
	}
	return result;
}



function parse(expresion) {
	var result = [],
	tokens = expresion.split(''),
	current = null,
	closers = {'(':')','[':']','{':'}'},
	processSubExpresion = function(separator,tokens,index) {
		var i = index+1,
		subExp = '',
		mult = '';		
		while (tokens[i] != closers[separator]) {
			subExp = subExp+tokens[i];
			i++;
		}
		//omit closer
		i++;
		//add to the expresion the trailing numbers
		while (!isNaN(tokens[i])) {
			mult = mult+tokens[i];
			i++;
		}
		result.push({'e':subExp,'m':mult?parseInt(mult,10):1});
		return i;
	},
	processAtom = function(atomInit,tokens,index) {
		var i = index+1,
		subExp = atomInit,
		mult = '';
		while (i < tokens.length && tokens[i].match(/[a-z]/)) {
			subExp = subExp+tokens[i];
			i++;
		}
		while (i < tokens.length && tokens[i].match(/[0-9]/)) {
			mult = mult+tokens[i];
			i++;
		}
		result.push({'a':subExp,'m':mult?parseInt(mult,10):1});
		return i;
	};
	var i = 0,n = tokens.length;
	while (i < n) {
		current = tokens[i];
		if (current.match(/[({\[]/)) {
			i = processSubExpresion(current,tokens,i);
		}else if (current.match(/[A-Z]/)){
			i = processAtom(current,tokens,i);
		}
	};
	return result;

}



///Tests
// helper function, compares objects insensitive to field order
function equalsAtomically(obj1, obj2) {
    if (Object.keys(obj1).length == Object.keys(obj2).length) {
        for (var k in obj1) {
            if (obj1[k] != obj2[k]) return false;
        }
        return true;
    }
    return false;
}
Test.expect(equalsAtomically(parseMolecule("Fe(CO)2CH3"), {C: 3,H: 3, O: 2, Fe: 1}), "Should parse that");
Test.expect(equalsAtomically(parseMolecule("(C5H5)Fe(CO)2CH3"), {C: 8,H: 8, O: 2, Fe: 1}), "Should parse that");
Test.expect(equalsAtomically(parseMolecule("As2{Be4C5[BCo3(CO2)3]2}4Cu5"), {As:2,C: 44,O:48,B:8,Co:24,Be:16,Cu:5}), "Should parse that");
Test.expect(equalsAtomically(parseMolecule("C6H12O6"), {C: 6,H: 12, O: 6}), "Should parse that");
Test.expect(equalsAtomically(parseMolecule("Mg2H2O"), {Mg: 2,H: 2, O: 1}), "Should parse that");
Test.expect(equalsAtomically(parseMolecule("OH"), {H: 1, O: 1}), "Should parse that");
Test.expect(equalsAtomically(parseMolecule("H2O"), {H: 2, O: 1}), "Should parse water");
Test.expect(equalsAtomically(parseMolecule("Mg(OH)"), {Mg: 1, O: 1, H: 1}), "Should parse magnesium hydroxide: Mg(OH)2");
Test.expect(equalsAtomically(parseMolecule("Mg(OH)2"), {Mg: 1, O: 2, H: 2}), "Should parse magnesium hydroxide: Mg(OH)2");
Test.expect(equalsAtomically(parseMolecule("K4[ON(SO3)2]2"), {K: 4, O: 14, N: 2, S: 4}), "Should parse Fremy's salt: K4[ON(SO3)2]2");

/*
For a given chemical formula represented by a string, 
count the number of atoms of each element contained in the molecule and return an object.


For example:

var water = 'H2O';
parseMolecule(water); // return {H: 2, O: 1}

var magnesiumHydroxide = 'Mg(OH)2';
parseMolecule(magnesiumHydroxide); // return {Mg: 1, O: 2, H: 2}

var fremySalt = 'K4[ON(SO3)2]2';
parseMolecule(fremySalt); // return {K: 4, O: 14, N: 2, S: 4}
As you can see, some formulas have brackets in them. The index outside the brackets 
tells you that you have to multiply count of each atom inside the bracket on this index.
For example, in Fe(NO3)2 you have one iron atom, two nitrogen atoms 
and six oxygen atoms.

Note that brackets may be round, square or curly and can also be nested. 
Index after the braces is optional.

*/