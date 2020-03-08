var calc = function (expression) {
  if (expression == '') return 0;
  var solve = function (operator, operand1, operand2) {
  	if (operand1 == null) {
  		if (operator == '+') return operand2;
  		if (operator == '-') return operand2*(-1);
  	}
  	if (operator == '+') return operand1+operand2;
  	if (operator == '-') return operand1-operand2;
  	if (operator == '*') return operand1*operand2;
  	if (operator == '/') return operand1/operand2;
  	throw 'Invalid operator';
  },
  operatorsMap = {
  	'+' : {'precedence':2,'associativity':'left'},
  	'-' : {'precedence':2,'associativity':'left'},
  	'*' : {'precedence':3,'associativity':'left'},
  	'/' : {'precedence':3,'associativity':'left'},
  	'^' : {'precedence':4,'associativity':'right'},
  },
  isOperator = function (term) {
  	return operatorsMap[term] != null; 
  },
  isOpenParentheses = function (term) {
  	return term == '(';
  },
  isClosedParentheses = function (term) {
  	return term == ')';
  },
  isNumber = function (n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
  },
  /**
  * Shunting Yard implementation
  **/
  toRPN = function (exp) {
  	// Simplify the expression, convert ++, --, *-, /- and (-
    var simpleExp = exp.replace(/ /g,'').replace(/\+\+/g,'+').replace(/\-\-/g,'+').replace(/\+\-/g,'-').replace(/\-\+/g,'-').replace(/\*\-/g,'*(1-2)*').replace(/\/\-/g,'*(1-2)/').replace(/\(\-/g,'((1-2)*');
  	//tokenize expression
  	var tokens = simpleExp.replace(/[\(\)\+\-\*\/]/g,' $& ').replace(/  /g,' ').split(' '),
		i = 0,
		n = tokens.length,
		stack = [],
		output = [],
		t = null;
	//Read the tokens
	while(i < n) {
		// Read a token.
		t = tokens[i];
		i++;
		// If the token is a number, then add it to the output queue.
		if (isNumber(t)) {
			output.push(t);
			continue;
		}
		// If the token is an operator, o1, then:
		if (isOperator(t)) {
			// while there is an operator token o2, at the top of the operator stack and either
			// o1 is left-associative and its precedence is less than or equal to that of o2, or
			// o1 is right associative, and has precedence less than that of o2,
			if (stack.length && isOperator(stack[stack.length-1]) &&
				((operatorsMap[t].associativity == 'left' && operatorsMap[t].precedence <= operatorsMap[stack[stack.length-1]].precedence) 
				|| (operatorsMap[t].associativity == 'right' && operatorsMap[t].precedence < operatorsMap[stack[stack.length-1]].precedence))) {
				// pop o2 off the operator stack, onto the output queue;
				var o2 = stack.pop();
				output.push(o2);	
			}
			// at the end of iteration push o1 onto the operator stack.
			stack.push(t);
			continue;
		}
		// If the token is a left parenthesis (i.e. "("), then push it onto the stack.
		if (isOpenParentheses(t)) {
			stack.push(t);
			continue;
		}
		// If the token is a right parenthesis (i.e. ")"):
		if (isClosedParentheses(t)) {
			// Until the token at the top of the stack is a left parenthesis, 
			// pop operators off the stack onto the output queue.
			var last = stack.length-1;
			while (last > 0 && !isOpenParentheses(stack[last]) ) {
				output.push(stack.pop());
				last--;
			}
			// Pop the left parenthesis from the stack,
			// but not onto the output queue.
			if (isOpenParentheses(stack[last])) {
				// Discard the closing parentheses
				stack.pop();
			}
			
		}
	}
	// When there are no more tokens to read:
	// While there are still operator tokens in the stack:
	while (stack.length) {
		// Pop the operator onto the output queue.
		output.push(stack.pop());
	}
	// Return the output
	return output;
  },
  processRPN = function (rpnArray) {
	  var stack = [],
		  token = null,
		  op1 = null,
		  op2 = null,
		  result = null,
	  	  tokens = rpnArray;

	  for (var i = 0,n =tokens.length; i < n; i++) {
	  	token = tokens[i];
	  	if (isOperator(token)) {
	  		op2 = stack.length ? stack.pop() : null;
	  		op1 = stack.length ? stack.pop() : null;
	  		result = solve(token,op1,op2);
        stack.push(result);
	  	}else {
	  		stack.push(parseFloat(token));
	  	}
	  }
	  if (result == null) {
	  	return stack.pop();
	  }else {
	  	return result;
	  }
  };
  //Convert to RPN and solve it
  return processRPN(toRPN(expression));;
};




var calc = function (expression) {
  if (expression == '') return 0;
  var solve = function (operator, operand1, operand2) {
  	console.log('Solve: ',operator,'(',operand1,',',operand2,')');
  	if (operand1 == null) {
  		if (operator == '+') return operand2;
  		if (operator == '-') return operand2*(-1);
  	}
  	if (operator == '+') return operand1+operand2;
  	if (operator == '-') return operand1-operand2;
  	if (operator == '*') return operand1*operand2;
  	if (operator == '/') return operand1/operand2;
  	throw 'Invalid operator';
  },
  operatorsMap = {
  	'+' : {'precedence':2,'associativity':'left'},
  	'-' : {'precedence':2,'associativity':'left'},
  	'*' : {'precedence':3,'associativity':'left'},
  	'/' : {'precedence':3,'associativity':'left'},
  	'^' : {'precedence':4,'associativity':'right'},
  },
  isOperator = function (term) {
  	return operatorsMap[term] != null; 
  },
  isOpenParentheses = function (term) {
  	return term == '(';
  },
  isClosedParentheses = function (term) {
  	return term == ')';
  },
  isNumber = function (n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
  },
  /**
  * Shunting Yard implementation
  **/
  toRPN = function (exp) {
  	// Simplify the expression, convert ++, --, *-, /- and (-
    var simpleExp = exp.replace(/ /g,'').replace('++','+').replace('--','+').replace('+-','-').replace('-+','-').replace('*-','*(1-2)*').replace('/-','*(1-2)/').replace('(-','((1-2)*');
    console.log('simplified exp: ',simpleExp);
  	//tokenize expression
  	var tokens = simpleExp.replace(/[\(\)\+\-\*\/]/g,' $& ').replace(/  /g,' ').split(' '),
		i = 0,
		n = tokens.length,
		stack = [],
		output = [],
		t = null;
	//Read the tokens
	while(i < n) {
		// Read a token.
		t = tokens[i];
		i++;
		// If the token is a number, then add it to the output queue.
		if (isNumber(t)) {
			output.push(t);
			continue;
		}
		// If the token is an operator, o1, then:
		if (isOperator(t)) {
			// while there is an operator token o2, at the top of the operator stack and either
			// o1 is left-associative and its precedence is less than or equal to that of o2, or
			// o1 is right associative, and has precedence less than that of o2,
			if (stack.length && isOperator(stack[stack.length-1]) &&
				((operatorsMap[t].associativity == 'left' && operatorsMap[t].precedence <= operatorsMap[stack[stack.length-1]].precedence) 
				|| (operatorsMap[t].associativity == 'right' && operatorsMap[t].precedence < operatorsMap[stack[stack.length-1]].precedence))) {
				// pop o2 off the operator stack, onto the output queue;
				var o2 = stack.pop();
				output.push(o2);	
			}
			// at the end of iteration push o1 onto the operator stack.
			stack.push(t);
			continue;
		}
		// If the token is a left parenthesis (i.e. "("), then push it onto the stack.
		if (isOpenParentheses(t)) {
			stack.push(t);
			continue;
		}
		// If the token is a right parenthesis (i.e. ")"):
		if (isClosedParentheses(t)) {
			// Until the token at the top of the stack is a left parenthesis, 
			// pop operators off the stack onto the output queue.
			var last = stack.length-1;
			while (last > 0 && !isOpenParentheses(stack[last]) ) {
				output.push(stack.pop());
				last--;
			}
			// Pop the left parenthesis from the stack,
			// but not onto the output queue.
			if (isOpenParentheses(stack[last])) {
				// Discard the closing parentheses
				stack.pop();
			}
			
		}
	}
	// When there are no more tokens to read:
	// While there are still operator tokens in the stack:
	while (stack.length) {
		// Pop the operator onto the output queue.
		output.push(stack.pop());
	}
	// Return the output
	return output;
  },
  processRPN = function (rpnArray) {
	  var stack = [],
		  token = null,
		  op1 = null,
		  op2 = null,
		  result = null,
	  	  tokens = rpnArray;

	  for (var i = 0,n =tokens.length; i < n; i++) {
	  	token = tokens[i];
	  	if (isOperator(token)) {
	  		op2 = stack.length ? stack.pop() : null;
	  		op1 = stack.length ? stack.pop() : null;
	  		result = solve(token,op1,op2);
        stack.push(result);
	  	}else {
	  		stack.push(parseFloat(token));
	  	}
	  }
	  if (result == null) {
	  	return stack.pop();
	  }else {
	  	return result;
	  }
  };
  var rpn = toRPN(expression),
  	  result = processRPN(rpn);
  console.log('Expression : ',expression);
  console.log('RPN: ',rpn);
  console.log('Result: ',result);
  return result;
};



//Tests

var tests = [
  ['1+1', 2],
  ['1 - 1', 0],
  ['1* 1', 1],
  ['1 /1', 1],
  ['-123', -123],
  ['123', 123],
  ['2 /2+3 * 4.75- -6', 21.25],
  ['12* 123', 1476],
  ['2 / (2 + 3) * 4.33 - -6', 7.732],
];

tests.forEach(function (m) {
  Test.assertEquals(calc(m[0]), m[1]);
});


/*
Instructions

Given a mathematical expression as a string you must return the result as a number.

Numbers

Number may be both whole numbers and/or decimal numbers. 
The same goes for the returned result.

Operators

You need to support the following mathematical operators:

Multiplication *
Division /
Addition +
Subtraction -
Operators are always evaluated from left-to-right, and * and / must be evaluated 
before + and -.

Parentheses

You need to support multiple levels of nested parentheses, ex. 
(2 / (2 + 3.33) * 4) - -6

Whitespace

There may or may not be whitespace between numbers and operators.

An addition to this rule is that the minus sign (-) used for negating numbers 
and parentheses will never be separated by whitespace. I.e., 
all of the following are valid expressions.

1-1    // 0
1 -1   // 0
1- 1   // 0
1 - 1  // 0
1- -1  // 2
1 - -1 // 2

6 + -(4)   // 2
6 + -( -4) // 10
And the following are invalid expressions

1 - - 1    // Invalid
1- - 1     // Invalid
6 + - (4)  // Invalid
6 + -(- 4) // Invalid
Validation

You do not need to worry about validation - you will only receive valid mathematical 
expressions following the above rules.

Eval

For JavaScript, both eval and Function are disabled.
*/