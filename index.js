// Require the Hapi node module
var Hapi = require('hapi');
 
// Create a server instance
var server = new Hapi.Server();
 
// Create a connection which will listen on port 8000
server.connection({
   
    port: 8000
});
 
// Add a GET endpoint /hello
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        reply({
            name: 'Jeff',
            age: 46,
            colors: ['red', 'green', 'blue']
        });
    }
 });
 
 server.route( {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply("Try the /hello route you nut");
    } 
 });

 
// Start the server
server.start(function(err, ok) {
	if(err) {
		console.error(err);
		return;
	}
	console.log("ok hello. running");
});
