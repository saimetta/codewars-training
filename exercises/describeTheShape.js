function describeTheShape( sides ){
	if(sides <= 2) {
		return "this will be a line segment or a dot";
	}else {
		return "This shape has "+sides+" sides and each angle measures "+parseInt((sides-2)*180/sides,0);
	}
}

Test.describe("describe the shape", _=>{
  [
    [6, "This shape has 6 sides and each angle measures 120"],
    [3, "This shape has 3 sides and each angle measures 60"],
    [8, "This shape has 8 sides and each angle measures 135"],
    [90, "This shape has 90 sides and each angle measures 176"],
    [2, "this will be a line segment or a dot"],
    [1, "this will be a line segment or a dot"]
  ].forEach( ([a, exp]) => Test.assertEquals(describeTheShape(a), exp) );
});


/*
Description 

You will be given the number of angles of a shape, so make a function that returns 
the number of its sides, and the measure of each angle.

Should the number be equal or less than 2, 
return "this will be a line segment or a dot"

Else return the result in the following format:

"This shape has s sides and each angle measures d degrees"
(replace s with number of sides and d with measure of each angle). 
Angle measure should be rounded to floor.

Number of sides will be tested from 0 to 180.

*/