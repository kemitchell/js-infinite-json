InfiniteJSON
=====

Circular JSON handler. Parse and stringify objects containing circular references


What is this for?
=====

When using JSON.parse, have you ever gotten this before?

	TypeError: Converting circular structure to JSON

Not friendly huh? This is caused because you have an object following the next circular pattern:

	// Create an object
	var obj = {
		a: 2
		, b: "Hello World"
	}

	// Make it circular
	obj.c = obj;

If you use console.log to output the object, you will see that it is an infinite structure as you
keep on drilling down into it.

This module is inteded to solve this issue by exposing to you a 'parse' and 'stringify' method,
analogous to the methods from the native JSON object in modern browsers. In other words, you will 
be able to parse and rebuild circular objects.


How do I use it?
=====

Normally you would do something similar to:

	// To create a JSON
	InfiniteJSON.stringify( obj );

	// To read a JSON
	InfiniteJSON.parse( json );


Is it better than JSON.parse and JSON.stringify?
=====

No. Use native JSON object when possible (when you are not dealing with circular objects).


What implementation can I do with this?
=====

Well, I'll let that up to you. A simple example could be.

Say you have a backend endpoint. The endpoint that deals with three resources/models like the following:

	Category           : Just cause... the user wants categories for his sandwiches
		id
		user_id

	Sandwich           : A type of sandwich the user likes and is part of a category
		id
		category_id
		name
		description

	SandwichIngredient : An ingredient for a sandwich
		id
		sandwich_id
		name
		description

And say you have a Single Page Application, and you want to do all sorts of views on this data.

One way of handling such data provided by an endpoint, is to obtain the data in JSON, and assign it
to three different values during javascript runtime. Now you have two options:

1: Match IDs! "Yay"... Now you can match IDs every time you want to perform some sort of relation creation,
to perform a CRUD action on data, and use a library like lodash to ease finding based on ids.

-OR-

2: You could also based on the three values create a circular object, and then utilize the circular
object to to access the data.

Say you went for option 2, because iterating on your data over and over is not a nice thing to do.

You can now decide to improve initial response time on you application by allowing the application 
to utilize the native Local Storage API, by just storing the circular JSON into an item. This way when
loading occurs again, you may avoid the initial wait time to retreive the data from your endpoint, by
just loading the structure from Local Storage for sandwich ingredients that are associated to sandwiches, 
which are associated to categories, and were previously stringified and stored in a nice little JSON array.
You will have loaded a circular object that is now easy to manipulate, and from which it is easier to access
data.

This will allow you to run your backen query to update the JavaScript object, without the user feeling
any initial response dealy. Your user will probably be happier if he has a terrible weather condition, and he 
is on his mobile device trying to figure out which is his favorite sandwich so he may ask for it at the airport.

I guess that is an implementation of this module, I used it differently though. With a 3MB strucutre extensive
structure, which should have probably been implemented differently, if I would have realized it on time.

Hope you find some use for this module :)



Can I provide some callback during the deserialization?
=====

Yup. Do something like this:

	// Parse the structure
	var teachers = [];
	var subjects = [];
	InfiniteJSON.parse.findAndSolvePointers( someJSONString, null, function( key,value ) {

		// Is this a teacher?
		if( key === 'teacher' && typeof value === 'object'  )
		{ 	
			// Just cause its fun to overload the global scope
			teachers.push( value );
		}
		// Is this a subject?
		else if( typeof value === 'object' && value && value.hasOwnProperty('topics') && value.hasOwnProperty('teacher') )
		{
			subjects.push( value );
		}

		// Give the value back
		return value;

	});