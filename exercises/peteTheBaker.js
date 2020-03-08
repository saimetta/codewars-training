function cakes(recipe, available) {
  var cakes = 0,
  	  enough = true,
  	  inTheTable= {};
  for (var key in recipe) {
	  	inTheTable[key] = available[key];
  }
  while (enough) {
	  for (var key in recipe) {
	  	if (inTheTable[key] && inTheTable[key] >= recipe[key]) {
	  		inTheTable[key] = inTheTable[key] - recipe[key];
	  	}else if( recipe[key] != 0){
	  		enough = false;
	  		break;
	  	}
	  }
	  if (enough) cakes++;
  }
  return cakes;
}

describe('description example', function() {
  var recipe, available;

  it('pass example tests', function() {
    recipe = {flour: 500, sugar: 200, eggs: 1};
    available = {flour: 1200, sugar: 1200, eggs: 5, milk: 200};
    Test.assertEquals(cakes(recipe, available), 2, 'Wrong result for example #1');
    
    recipe = {apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100};
    available = {sugar: 500, flour: 2000, milk: 2000};
    Test.assertEquals(cakes(recipe, available), 0, 'Wrong result for example #2');

    recipe = {"eggs":88,"apples":93,"butter":54};
    available = {"apples":6600,"butter":4500,"crumbles":1500,"sugar":8100,"eggs":2200,"cream":5700,"oil":1500,"milk":8300,"cocoa":8900,"chocolate":7500,"nuts":6900,"flour":8200,"pears":900};
    Test.assertEquals(cakes(recipe, available), 0, 'Wrong result for example #3');
  });
});



/*
Pete likes to bake some cakes. 
He has some recipes and ingredients. 
Unfortunately he is not good in maths. 
Can you help him to find out, how many cakes he could bake considering his recipes?

Write a function cakes(), which takes the recipe (object) and the available 
ingredients (also an object) and returns the maximum number of cakes Pete can bake
 (integer). 
 For simplicity there are no units for the amounts 
 (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). 
 Ingredients that are not present in the objects, can be considered as 0.

Examples:

// must return 2
cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}); 
// must return 0
cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000});
*/