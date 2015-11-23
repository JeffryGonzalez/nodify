var Person = require("../../../models/person").Person;

exports.register = function (server, options, next) {
  
  
  server.method("getPeople", function (next) {
		Person.find({}, function (err, people) {
			if (!err) {
				next(null, people);
			} else {
				next(err);
			}
		});
	});
  
  
  server.route({
    path: '/people',
    method: 'GET',
    config: {
		pre: [
			{ method: "getPeople()", assign: "people"}
		],
		handler: require('./getpeople')	
	} 
  });

  server.route({
	  path: "/people",
	  method: "POST",
	  handler: function(request, reply) {
		  var person = new Person();
		  person.name = request.payload.name;
		  person.age = request.payload.age;
		  person.save(function(err) {
			 if(!err) {
				 reply(person).created("/people/" + person._id);
			 } else {
				 reply("Error");
			 }
		  });
	  }
  })

  next();

};

exports.register.attributes = {
  pkg: require('./package.json')
};