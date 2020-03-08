function calc(expr) {
	if (expr == '') return 0;
  var solve = function (operator, operand1, operand2) {
  	if (operator == '+') return operand1+operand2;
  	if (operator == '-') return operand1-operand2;
  	if (operator == '*') return operand1*operand2;
  	if (operator == '/') return operand1/operand2;
  	throw 'Invalid operator';
  },
  isOperator = function (term) {
  	return term == '+' || term == '-' || term == '*' || term == '/'; 
  },
  stack = [],
  token = null,
  op1 = null,
  op2 = null,
  result = null,
  tokens = expr.split(' ');
  for (var i = 0,n =tokens.length; i < n; i++) {
  	token = tokens[i];
  	if (isOperator(token)) {
  		op2 = stack.pop();
  		op1 = stack.pop();
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
  
}
Test.assertEquals(calc(""), 0, "Should work with empty string");
Test.assertEquals(calc("1 2 3"), 3, "Should parse numbers");
Test.assertEquals(calc("1 2 3.5"), 3.5, "Should parse float numbers");
Test.assertEquals(calc("1 3 +"), 4, "Should support addition");
Test.assertEquals(calc("1 3 *"), 3, "Should support multiplication");
Test.assertEquals(calc("1 3 -"), -2, "Should support subtraction");
Test.assertEquals(calc("4 2 /"), 2, "Should support division");

/*
Your job is to create a calculator which evaluates expressions in Reverse Polish notation.


For example expression 5 1 2 + 4 * + 3 - (which is equivalent to 5 + ((1 + 2) * 4) - 3 
in normal notation) should evaluate to 14.

Note that for simplicity you may assume that there are always spaces between numbers 
and operations, e.g. 1 3 + expression is valid, but 1 3+ isn't.

Empty expression should evaluate to 0.

Valid operations are +, -, *, /.

You may assume that there won't be exceptional situations 
(like stack underflow or division by zero).
*/