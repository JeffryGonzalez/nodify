var Person = require("./models/person").Person;
var handlers = require('./handlers');

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

	server.method("getPerson", function(id, next) {
		Person.findOne({"_id": id}, function(err, person) {
			if(!err) {
				next(null, person);
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
				{ method: "getPeople()", assign: "people" }
			],
			handler: handlers.all
		}
	});

	server.route({
		path: "/people",
		method: "POST",
		handler: handlers.add
	});
	
	server.route({
		path: "/people/{id}",
		method: "GET",
		config: {
			pre: [
				{method: "getPerson(params.id)", assign: "person", failAction: "ignore"}
			]
		},
		handler: handlers.one
	})

	next();

};

exports.register.attributes = {
	pkg: require('./package.json')
};