// Require the Hapi node module
var Hapi = require('hapi');
var Mongoose = require('mongoose');

var Person = require("./models/person").Person;
var db;
Mongoose.connect('mongodb://mongo:27017/stuff', function (err) {
    // ...
    if (!err) {
        console.log("connected to blog and rocking")
        db = Mongoose.connection;
       // console.log(db);
    } else {
        console.error(err);
    }
});

// Create a server instance
var server = new Hapi.Server();

// Create Server Methods
const pre1 = function (request, reply) {
    return reply(new Date().getUTCMilliseconds() + "Hello");
}
const pre2 = function (request, reply) {
    return reply("Jeff");
}
const pre3 = function (request, reply) {
    return reply(request.pre.m1 + " " + request.pre.m2);
}

server.method("dog", function (method, next) {
    next(null, "Woof! " + method);
})

server.method("getPeople", function (next) {
    Person.find({}, function (err, people) {
        if (!err) {
            next(null, people.map(function (p) {
                return {
                    "name": p.name,
                    "age": p.age
                }
            }));
        } else {
            next(err);
        }
    });
});

 
// Create a connection which will listen on port 8000
server.connection({
    // Do not put the host: localhost here if running in docker
    host: "0.0.0.0",
    port: 8000
});
 



server.route({
    method: "POST",
    path: "/people",
    handler: function (request, reply) {
        console.log(request.payload);
        var person = new Person();
        console.log(request.payload);
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
})

server.route({
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
})

server.route({
    method: "GET",
    path: "/doit",
    config: {
        pre: [
            [
                { method: pre1, assign: 'm1' },
                { method: pre2, assign: 'm2' },
            ],
            { method: pre3, assign: 'm3' },
            { method: "dog(query.id)", assign: 'm4' }
        ],
        handler: function (request, reply) {
            console.log(request);
            return reply(request.pre.m3 + "  " + request.pre.m4 + "\n");
        }
    }
})
 
// Start the server
server.start(function (err, ok) {
    if (err) {
        console.error(err);
        return;
    }
    console.log("ok hello. running");
});