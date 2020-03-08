function defaults(obj, defs) {
  var clone = JSON.parse(JSON.stringify(obj));
  for (var k in defs) {
  	if (!obj.hasOwnProperty(k)) {
      if (typeof defs[k] == 'function' && defs[k].toString().indexOf('errExp') != -1) {
        //Execute the mandatory
        defs[k]();
      }else {
      	//Asign the default
        clone[k] = defs[k];
      }
    }
  }
  return clone;
}


function mandatory(err) {
	return function errExp() {
  	throw err
  };
}

a = defaults({
  x: 1
}, {
  y: 2,
  z: 3
});

Test.assertEquals(a.x, 1);
Test.assertEquals(a.y, 2);
Test.assertEquals(a.z, 3);

/*
A common pattern is for a function to take a configuration object as a parameter,
implementing defaults or throwing errors for any properties 
missing from the configuration.

One way to do this is like:

function send(config) {
  if(!config.url) throw "No URL!";
  config.method = config.method || "POST";
  config.data = config.data || {}
  Network.send(config.url, config.data, config.method);
}
But this can get cumbersome for a large number of arguments, and the "||" 
operator doesn't work correctly for parameters that are allowed to be falsey.

Your task is to create a defaults(obj, def) function which creates a new 
object with obj's properties, falling back on the properties of def when they aren't in obj.


You must also implement the mandatory(err) function. 
This will return an object that tells defaults to throw err if the property doesn't exist.
In other words, if mandatory("foo") is given as the default value for the key bar, 
and the user tries pass a config option that does not define bar, 
then defaults should throw "foo" when called.

This function would be used like so:

function send(config) {
  config = defaults(config, {
    url: mandatory("No URL!"),
    method: "POST",
    data: {}
  });
  Network.send(config.url, config.data, config.method);
}
Your function should not modify the original object, since the user may want to reuse the same config object multiple times.
Fundamentals
*/