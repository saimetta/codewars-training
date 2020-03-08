function generateBC(url, separator) {
  var folders = [],
      previous = [],
      stopWords = ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"],
      removeProtocol = function(url) {
      	return url.replace('http://','').replace('https://');
      },
      removeIndex = function(url) {
      	return url.split('/index.')[0];
      },
      cleanTail = function(str) {
      	var s = str.replace('.html','').replace('.htm','').replace('.php','').replace('.asp','');
      	s = s.split('#')[0];
      	return s.split('?')[0];
      },
      buildUrl = function(folder,previous) {
  		return previous.join('/');
      },
      cleanLabel = function(str) {
      	if (str.length > 30) {
      		var tokens = str.split('-');
      		return tokens.map(function(el) {
      			if (stopWords.indexOf(el) == -1){
      				return el[0];
      			}else {
      				return '';
      			}
      		}).join('');
      	}else {
      		return str.replace(/-/g,' ');
      	}
      },
      tokens = removeProtocol(removeIndex(url)).split('/'),
      count = tokens.length;

  if (tokens.length == 1 || !tokens[1]) {
  	return "<span class=\"active\">HOME</span>";
  }else {
	  tokens.reduce(function (p,c,i) {
	  	if (i ==0) {
	  		folders.push("<a href=\"/\">HOME</a>");
	  	}else if(i < (count-1)){
	  		//middle folder
	  		previous.push(c);
	  		folders.push("<a href=\"/"+buildUrl(c,previous)+"/\">"+cleanLabel(c).toUpperCase()+"</a>");
	  	}else {
	  		//current path
	  		folders.push("<span class=\"active\">"+cleanLabel(cleanTail(c)).toUpperCase()+"</span>");
	  	}
	  },folders);
  }

  
  var result = folders.join(separator);
  return result;
}


 

https://www.linkedin.com/in/giacomosorbi




compareResults(generateBC("mysite.com/pictures/holidays.html", " : "), '<a href="/">HOME</a> : <a href="/pictures/">PICTURES</a> : <span class="active">HOLIDAYS</span>')
compareResults(generateBC("www.codewars.com/users/GiacomoSorbi", " / "), '<a href="/">HOME</a> / <a href="/users/">USERS</a> / <span class="active">GIACOMOSORBI</span>')
compareResults(generateBC("www.microsoft.com/important/confidential/docs/index.htm#top", " * "), '<a href="/">HOME</a> * <a href="/important/">IMPORTANT</a> * <a href="/important/confidential/">CONFIDENTIAL</a> * <span class="active">DOCS</span>')
compareResults(generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp", " > "), '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>')
compareResults(generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + "), '<a href="/">HOME</a> + <a href="/users/">USERS</a> + <span class="active">GIACOMO SORBI</span>')

/*
As breadcrumb menùs are quite popular today, I won't digress much on explaining them,
 leaving the wiki link doing the dirty work in my place.

What might not be so trivial is to get a decent breadcrumb from your current url:
for this kata your purpose is to create a function that takes a url, 
strips the first part (labeling it always HOME) and then builds it making each 
element but the last a <a> element linking to the relevant path; 
last has to be a <span> element getting the active class.

All elements need to be turned into uppercase and separated by a separator, 
given as the second parameter of the function; 
the last element can terminate in some common extension like .html, .htm, .php or .asp;
if the name of the last element is index.something, you treat it as if it wasn't there, 
sending users automatically to the upper folder.

A few examples can be more helpful than thousands of explanations, 
so here you have them:

generateBC("mysite.com/pictures/holidays.html", " : ") == 

'<a href="/">HOME</a> : 
<a href="/pictures/">PICTURES</a> : 
<span class="active">HOLIDAYS</span>'

generateBC("www.codewars.com/users/GiacomoSorbi", " / ") == 

'<a href="/">HOME</a> / 
<a href="/users/">USERS</a> / 
<span class="active">GIACOMOSORBI</span>'

generateBC("www.microsoft.com/docs/index.htm", " * ") ==

'<a href="/">HOME</a> * 
<span class="active">DOCS</span>'

Seems easy enough? Well, probably not, but we have now a last extra rule: 
if one element (other than the root/home) is longer than 30 characters, 
you have to shorten it, 
acronymizing it (i.e.: taking just the initials of every word); 
url will be always given in the format this-is-an-element-of-the-url and 
you should ignore words in this array while acronymizing: 
["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]; 
url composed of more words separated by -, but equal or less than 30 characters long, 
needs to be just uppercased with hyphens replaced by spaces.

Ignore anchors (www.url.com#lameAnchorExample) and 
parameters (www.url.com?codewars=rocks&pippi=rocksToo) when present.

Examples:

generateBC("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.htm", " > ") ==

'<a href="/">HOME</a> > 
<a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > 
<span class="active">EXAMPLE</span>'

generateBC("www.very-long-site_name-to-make-a-silly-yet-meaningful-example.com/users/giacomo-sorbi", " + ") == 

'<a href="/">HOME</a> + <a href="/users/">USERS</a> + 
<span class="active">GIACOMO SORBI</span>'

You will always be provided valid url to webpages in common formats, 
so you probably shouldn't bother validating them.

If you like to test yourself with actual work/interview related kata, 
please also consider this one about building a string filter for Angular.js

Special thanks to the colleague that, 
seeing my code and commenting that I worked on that as if it was I was on CodeWars, 
made me realize that it could be indeed a good idea for a kata :)

*/