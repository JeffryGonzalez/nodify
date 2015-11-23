var Person = require("../models/person").Person;
var Boom = require('boom');

var all = function (request, reply) {
	reply(request.pre.people);
};


var add = function (request, reply) {
	var person = new Person();
	person.name = request.payload.name;
	person.age = request.payload.age;
	person.save(function (err) {
		if (!err) {
			reply(person).created("/people/" + person._id);
		} else {
			reply("Error");
		}
	});
};

var one = function (req, reply) {
	console.log(req.pre.person);
	if (req.pre.person) {
		return reply(req.pre.person);
	} else {
		return reply(Boom.notFound());
	}
};

module.exports = {
	all: all,
	add: add,
	one: one

}

