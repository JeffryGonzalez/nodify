var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;

var personSchema = new Schema({
    name: { type: String },
    age: { type: Number }
});

module.exports = {
	Person: Mongoose.model("person", personSchema)
}