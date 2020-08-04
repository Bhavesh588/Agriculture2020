const router = require('express').Router();
let User = require('../models/user.model')

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

	const newUser = new User({fname, email, mobileno, subject, message, created});

	newUser.save()
	.then(() => res.json('User added!!!'))
	.catch(err => res.status(400).json('Error: ' + err));
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