function tickets(peopleInLine){
  var wallet = { 25: 0,50: 0,100:0};
  for (var i =0,n= peopleInLine.length;i<n;i++) {
  	if (peopleInLine[i] == 25) {
  		wallet[25] =  wallet[25]+1;
  	}
  	if (peopleInLine[i] == 50) {
  		if (wallet[25]) {
  			wallet[50] = wallet[50]+1;
  			wallet[25] = wallet[25] -1;
  		}else {
  			return 'NO';
  		}
  	}
  	if (peopleInLine[i] == 100) {
  		if (wallet[25] && wallet[50]) {
  			wallet[25] = wallet[25]-1;
  			wallet[50] = wallet[50]-1;
  			wallet[100] = wallet[100]+1;
  		}else if(wallet[25] >= 3) {
  			wallet[25] = wallet[25]-3;
  			wallet[100] = wallet[100]+1;
  		}else {
  			return 'NO';
  		}
  	}

  }
  return 'YES';
}


Test.assertEquals(tickets([25, 25, 50, 50]), "YES");
Test.assertEquals(tickets([25, 100]), "NO");

/*
The new "Avengers" movie has just been released! 
There are a lot of people at the cinema box office standing in a huge line.
Each of them has a single 100, 50 or 25 dollars bill.
A "Avengers" ticket costs 25 dollars.

Vasya is currently working as a clerk.
He wants to sell a ticket to every single person in this line.

Can Vasya sell a ticket to each person and give the change 
if he initially has no money and sells the tickets strictly in the order people follow
 in the line?

Return YES, if Vasya can sell a ticket to each person and give the change. 
Otherwise return NO.

Examples:

// === JavaScript ==

tickets([25, 25, 50]) // => YES 
tickets([25, 100])    
        // => NO. Vasya will not have enough money to give change to 100 dollars
*/