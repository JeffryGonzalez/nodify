var Person = require("../models/person").Person;

var peoplePostRoute = {
    method: "POST",
    path: "/people",
    handler: function (request, reply) {
        console.log(request.payload);
        var person = new Person();
        person.name = request.payload.name;
        person.age = request.payload.age;
        person.save(function (err) {
            console.log(err);
            if (!err) {
                reply(person).created("/people/" + person._id);
            } else {
                reply("Error");
            }
        })
    }
};

var peopleGetRoute = {
    method: "GET",
    path: "/people",
    config: {
        pre: [
            { method: "getPeople()", assign: "people" }
        ],

        handler: function (request, reply) {

            return reply(request.pre.people);
        }
    }
};

module.exports = [peoplePostRoute, peopleGetRoute];