const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
	orderaccept: [{
		_id: {type: String, required: true, minlength: 3},
		fname: {type: String, required: true, minlength: 3},
		email: {type: String, required: true, minlength: 3},
		mobileno: {type: String, required: true, minlength: 9},
		subject: {type: String, required: true, minlength: 3},
		message: {type: String, required: true, minlength: 3},
		created: {type: String, required: true}
	}],
	ordercancel: [{
		_id: {type: String, required: true, minlength: 3},
		fname: {type: String, required: true, minlength: 3},
		email: {type: String, required: true, minlength: 3},
		mobileno: {type: String, required: true, minlength: 9},
		subject: {type: String, required: true, minlength: 3},
		message: {type: String, required: true, minlength: 3},
		created: {type: String, required: true}
	}],
	orderdone: [{
		_id: {type: String, required: true, minlength: 3},
		fname: {type: String, required: true, minlength: 3},
		email: {type: String, required: true, minlength: 3},
		mobileno: {type: String, required: true, minlength: 9},
		subject: {type: String, required: true, minlength: 3},
		message: {type: String, required: true, minlength: 3},
		created: {type: String, required: true}
	}],
	Dates: {
		year: [{type: Number, required: true}],
		month: [[{type: Number, required: true}]],
		date: [[[{type: Number, required: true}]]]
	},
	accepted: [[[{type: Number, required: true}]]],
	cancelled: [[[{type: Number, required: true}]]],
	doned: [[[{type: Number, required: true}]]],
	users: [[[{type: Number, required: true}]]],
	arrange: [{
		id: {type: Number, required: true},
		name: {type: String, required: true}
	}],
	admindark: {type:Boolean, required: true},
	home: {
		h_logo: {type:String},
		h_title: {type:String},
		h_moto: {type:String}
	},
	product: {
		p_filename: [{type:String}],
		p_title: [{type:String}],
		p_des: [{type:String}]
	},
	services: {
		s_filename: [{type:String}],
		s_des: [{type:String}]
	},
	aboutus: {
		a_filename: {type:String},
		a_des: {type:String}
	},
	certificate: [{type:String}],
	team: {
		t_filename: [{type:String}],
		t_title: [{type:String}],
		t_job: [{type:String}]
	}
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;