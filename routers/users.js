const router = require('express').Router();
let User = require('../models/user.model')
var nodemailer = require('nodemailer');
require('dotenv').config();

router.route('/').get((req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const fname = req.body.fname;
	const email = req.body.email;
	const mobileno = req.body.mobileno;
	const subject = req.body.subject;
	const message = req.body.message;
	let d = new Date()
	const created = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear()

	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS
		}
	});
	
	var mailOptions = {
		from: 'sbhavesh588@gmail.com',
		to: email,
		subject: 'Confirming Email',
		html: 'Dear, <strong>'+fname+'</strong><p>'+message+'</p><br><br><p>Your Inquiry is being Registed. We will send you a mail or call you for further information.</p><h4>THANK YOU!!</h4>'
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			res.json('Error')
		} else {
			console.log('Email sent: ' + info.response);
			const newUser = new User({fname, email, mobileno, subject, message, created});
			newUser.save()
			.then(() => res.json('User added!!!'))
			.catch(err => res.status(400).json('Error: ' + err));
		}
	});
	

});

router.route('/:id').get((req,res) => {
	User.findById(req.params.id)
	.then(users => res.json(users))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
	User.findByIdAndDelete(req.params.id)
	.then(() => res.json('User deleted'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
	User.findById(req.params.id)
	.then(user => { 
		user.username = req.body.username;
		user.email = req.body.email;

		user.save()
		.then(() => res.json('User Updated'))
		.catch(err => res.status(400).json('Error: ' + err));
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;