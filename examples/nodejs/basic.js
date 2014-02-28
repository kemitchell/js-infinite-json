/**
 * Basic usage of infinite-json.js on a node application, make sure to have installed InfiniteJSON through npm
 *
 *    npm install js-infinite-json
 *
 * You may also run this file as is. Check out the code, then on your bash/cmd go to this file's location and run
 *
 *    node basic.js
 * 
 */
var InfiniteJSON = require('../../infinite-json.js');

// Create an object
var obj = {
	a: 2
	, b: "Hello World"
}

// Make it circular
obj.c = obj;

// Attempt to do it with native JSON object
try
{
	JSON.stringify( obj );
}
catch(err)
{
	console.error('Attempted native stringification and failed');
}

// Stringify using InfiniteJSON
console.log('Stringify the object');
var json = InfiniteJSON.stringify( obj );
console.log( json );

// Parse using InfiniteJSON
console.log('Parsing the json structure');
var newObj = InfiniteJSON.parse( json );
console.log( newObj );

// Notify about the completion
console.log('See, it works... right?')