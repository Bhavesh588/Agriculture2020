const router = require('express').Router();
let Admin = require('../models/admin.model');

router.route('/').get((req, res) => {
	Admin.find()
	.then(admin => res.json(admin))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:status').post((req, res) => {
	if(req.params.status === 'accept') {
		const orderaccept = req.body
		const admin = new Admin({orderaccept});
		admin.save()
		.then(() => res.json('Admin added!!!'))
		.catch(err => res.status(400).json('Error: ' + err));
	} else if (req.params.status === 'cancel') {
		const ordercancel = req.body
		const admin = new Admin({ordercancel});
		admin.save()
		.then(() => res.json('Admin added!!!'))
		.catch(err => res.status(400).json('Error: ' + err));
	} else if (req.params.status === 'done') {
		const orderdone = req.body
		const admin = new Admin({orderdone});
		admin.save()
		.then(() => res.json('Admin added!!!'))
		.catch(err => res.status(400).json('Error: ' + err));
	} else if (req.params.status === 'date') {
		const Dates = {
			year: req.body.year,
			month: req.body.month,
			date: req.body.date,
		}
		const accepted = req.body.accepted
		const cancelled = req.body.cancelled
		const doned = req.body.doned
		const users = req.body.users
		const arrange = req.body.arrange
		const admindark = req.body.admindark
		const aboutus = req.body.aboutus
		const certificate = req.body.certificate
		const team = req.body.team
		const home = req.body.home
		const admin = new Admin({Dates, accepted, cancelled, doned, users, arrange, admindark, aboutus, certificate, team, home});
		admin.save()
		.then(() => res.json('Admin added!!!'))
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'arrange'){
		const arrange = req.body
		const admin = new Admin({arrange});
		admin.save()
		.then(() => res.json('Admin added!!!'))
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'dark'){
		console.log(req.body.admindark)
		const admindark = req.body.admindark
		const admin = new Admin({admindark});
		admin.save()
		.then(() => res.json('Admin added!!!'))
		.catch(err => res.status(400).json('Error: ' + err));
	} else {
		console.log('There is no Status')
	}


});

router.route('/update/:id/:status').post((req,res) => {

	if(req.params.status === 'accept') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.updateOne(
				{
					$push: {
						orderaccept: {
							$each: req.body
						}
					}
				}
			)
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'cancel') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.updateOne(
				{
					$push: {
						ordercancel: {
							$each: req.body
						}
					}
				}
			)
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'done') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.updateOne(
				{
					$push: {
						orderdone: {
							$each: req.body
						}
					}
				}
			)
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'date') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.Dates = req.body;

			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'count') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.accepted = req.body.accepted
			admin.cancelled = req.body.cancelled
			admin.doned = req.body.doned
			admin.users = req.body.users
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'arrange') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.arrange = req.body
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'dark') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.admindark = req.body.admindark
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'Product') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.product.p_filename = req.body.p_filename
			admin.product.p_title = req.body.p_title
			admin.product.p_des = req.body.p_des
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'Service') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.services.s_filename = req.body.s_filename
			admin.services.s_des = req.body.s_des
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'Aboutus') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.aboutus.a_filename = req.body.a_filename
			admin.aboutus.a_des = req.body.a_des
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'Certificate') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.certificate = req.body.certificate
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'Team') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.team = req.body.team
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	} else if(req.params.status === 'Home') {
		Admin.findById(req.params.id)
		.then(admin => { 
			admin.home = req.body.home
			
			admin.save()
			.then(() => res.json('Admin Updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		})
		.catch(err => res.status(400).json('Error: ' + err));
	}
});

router.route('/:id').get((req,res) => {
	Admin.findById(req.params.id)
	.then(admin => res.json(admin[0].orderaccept))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
	Admin.findByIdAndDelete(req.params.id)
	.then(() => res.json('User deleted'))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/pop/:id/:id2/:status').post((req,res) => {

	if(req.params.status === 'acceptorder') {
		Admin.findById(req.params.id)
			.then(admin => { 
				admin.updateOne(
					{
						$pull: {
							"orderaccept": { _id: req.params.id2 }
						}
					}
				)
				.then(() => res.json('Admin Updated'))
				.catch(err => res.status(400).json('Error: ' + err));
			})
			.catch(err => res.status(400).json('Error: ' + err));
	} else {
		Admin.findById(req.params.id)
			.then(admin => { 
				admin.updateOne(
					{
						$pull: {
							"ordercancel": { _id: req.params.id2 }
						}
					}
				)
				.then(() => res.json('Admin Updated'))
				.catch(err => res.status(400).json('Error: ' + err));
			})
			.catch(err => res.status(400).json('Error: ' + err));
	}
});

module.exports = router;