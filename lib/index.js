var Glue = require('glue');
var db = require("../data/db");
var manifest = {
  connections: [
    {
      port: 8000,
      routes: {
        cors: true
      }
    }
  ],
  plugins: {
    "./people": null
  }
};

var options = {
  relativeTo: process.cwd() + '/lib/modules'
};

Glue.compose(manifest, options, function (err, server) {
  if (err) throw err;

  server.start(function (err) {

    console.log('Server running on port 9000');

  });
});