function validate(password) {
return /^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?!.*[\.; ]).*$/.test(password);
}




Test.expect(validate('djI38D55'), 'djI38D55 - Expected true');
Test.expect(!validate('a2.d412'), 'a2.d412 - Expected false');
Test.expect(!validate('JHD5FJ53'), 'JHD5FJ53 - Expected false');
Test.expect(!validate('!fdjn345'), '!fdjn345 - Expected false');
Test.expect(!validate('jfkdfj3j'), 'jfkdfj3j - Expected false');
Test.expect(!validate('123'), '123 - Expected false');
Test.expect(!validate('abc'), 'abc - Expected false');
Test.expect(validate('Password123'), 'Password123 - Expected true');
/*
You need to write regex that will validate a password to make sure 
it meets the follwing criteria:

At least six characters long
contains a lowercase letter
contains an uppercase letter
contains a number
Valid passwords will only be alphanumeric characters.

*/