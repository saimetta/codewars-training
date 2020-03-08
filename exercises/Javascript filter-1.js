function troubledLoginFilter(element) {
	return element[0].match(/[_]$/);
}


function searchNames( logins ){
	return logins.filter(troubledLoginFilter);
}



describe( "Testing some lists", function(){
  it( "Basic list", function(){
    var a = [ [ "foo", "foo@foo.com" ], [ "bar_", "bar@bar.com" ] ],
    b = [ [ "bar_", "bar@bar.com" ] ];    
    Test.assertSimilar( searchNames( a ).join(":"), b.join(":"),
      "not correct" );
  } );
} );

/*
While developing a website, you detect that some of the members have troubles logging in.
Searching through the code you find that all logins ending with a "_" make problems.
So you want to write a function that takes an array of pairs of login-names and e-mails,
 and outputs an array of all login-name, e-mails-pairs from the login-names that end with "_".

If you have the input-array:

[ [ "foo", "foo@foo.com" ], [ "bar_", "bar@bar.com" ] ]
it should output

[ [ "bar_", "bar@bar.com" ] ]
You have to use the filter-method of Python, 
which returns each element of the array for which the filter-method returns true.
*/