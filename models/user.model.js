const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	fname: {type: String, required: true, minlength: 3},
	email: {type: String, required: true, minlength: 3},
	mobileno: {type: String, required: true, minlength: 9},
	subject: {type: String, required: true, minlength: 3},
	message: {type: String, required: true, minlength: 3},
	created: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;