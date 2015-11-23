var Mongoose = require('mongoose');

var db;

Mongoose.connect('mongodb://mongo:27017/stuff', function (err) {
    // ...
    if (!err) {
        console.log("connected and rocking")
        db = Mongoose.connection;
    } else {
        console.error(err);
    }
});

module.exports = db;