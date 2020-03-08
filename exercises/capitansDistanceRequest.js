// complete the function to calculate the distance between two coordinates.
// Input: the two coordinates
// Output: return the distance in kilometers
function distance(coord1, coord2) {

	var c1 = toDecimal(coord1),
		c2 = toDecimal(coord2),
		//decimal lat and lon for the coordinates
		lat1 = c1.lat,
		lon1 = c1.lon,
		lat2 = c2.lat,
		lon2 = c2.lon,
		//earth radius in km
		R = 6371, 
		latitude1 = toRadians(lat1),
		latitude2 = toRadians(lat2),
		difLat = toRadians((lat2-lat1)),
		difLong = toRadians((lon2-lon1)),
		//haversine
		a = Math.sin(difLat/2) * Math.sin(difLat/2) +
	        Math.cos(latitude1) * Math.cos(latitude2) *
	        Math.sin(difLong/2) * Math.sin(difLong/2),
	    //formula
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
		//distance
		distance = R * c;
	//round the distance
	return precise10K(distance);
}

function precise10K(distance) {
	var result = parseInt(distance,10).toString().split('');
	result[result.length-1] = 0;
	return parseInt(result.join(''),10);
}

function toRadians(degrees) {
  	return degrees * Math.PI / 180;
}

function toDecimal(coordinate) {
    var parts = coordinate.split(/[^\d\w]+/);
    return {'lat':dmsToDd(parts[0], parts[1], parts[2], parts[3]),
    		'lon':dmsToDd(parts[4], parts[5], parts[6], parts[7])};
}

function dmsToDd(degrees, minutes, seconds, direction) {
    var dd = parseInt(degrees,10) + parseInt(minutes,10)/60 + parseInt(seconds,10)/(60*60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } 
    return dd;
}



Test.assertEquals(distance("48° 12′ 30″ N, 16° 22′ 23″ E", "23° 33′ 0″ S, 46° 38′ 0″ W"), 10130)
Test.assertEquals(distance("48° 12′ 30″ N, 16° 22′ 23″ E", "58° 18′ 0″ N, 134° 25′ 0″ W"), 7870)
Test.assertEquals(distance("48° 12′ 30″ N, 16° 22′ 23″ E", "48° 12′ 30″ N, 16° 22′ 23″ E"), 0)

/*
Ahoi!
We are on a big sailing boat off the coast of Croatia.
The captain, by the name of Haversine, wants you to help him out: 
"Arrr, we need to know the distance between these two points on the map, 
so I know how long we need to wait before we get to our beloved treasure!". 
As this is the fourth of such requests by your captain, 
you decide to write a function to calculate the distance between two coordinates.

Complete the function so it returns the distance between two given coordinates. 
Examples of given coordinates are:

48° 12′ 30″ N, 16° 22′ 23″ E
23° 33′ 0″ S, 46° 38′ 0″ W
58° 18′ 0″ N, 134° 25′ 0″ W
33° 51′ 35″ S, 151° 12′ 40″ E

The returned distance should be in kilometers.
We think about the earth as a sphere with radius 6371 km.
As our captain has a good binocular and the fact, that we are lazy, 
we don't take precision too serious. 
So it is sufficient for the result to be precise to 10 km. 
Round to the lower 10 km. 
So 6387 becomes 6380, 643 becomes 640 and 18299 becomes 18290.
You can expect the delivered coordinates to be valid.
The characters for minutes (′) and seconds (″) are not standard quotation marks. 
If you experience any encoding/escaping issues, you can get them as follows:

unescape("%B0"); // °
unescape("%u2032"); // ′
unescape("%u2033"); // ″


Examples of inputs and the expected outputs:

distance("48° 12′ 30″ N, 16° 22′ 23″ E", "23° 33′ 0″ S, 46° 38′ 0″ W");
// Returns 10130
distance("48° 12′ 30″ N, 16° 22′ 23″ E", "58° 18′ 0″ N, 134° 25′ 0″ W");
// Returns 7870
distance("48° 12′ 30″ N, 16° 22′ 23″ E", "48° 12′ 30″ N, 16° 22′ 23″ E");
// Returns 0

As you try and try and just don't seem to be able to find the solution, 
the ship's first mate, an old white bearded man gives you a small hint: 
"There are many ways to tackle the problem. 
Guess which one's the captain's favourite! 
His name was not given to him by accident!"

Good luck, navigator!
*/