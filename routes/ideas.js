const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// ideas page
router.get('/', ensureAuthenticated, (req, res) => {
	Idea.find({user: req.user.id})
	  .then((ideas) => {
	    res.render('ideas/index', {
	    	ideas: ideas
	    });
	  });
});

// add idea form
router.get('/add', ensureAuthenticated, (req, res) => {
	res.render('ideas/add');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
	Idea.findOne({
		_id: req.params.id
	})
	  .then((idea) => {
	  	if (idea.user != req.user.id) {
	  		req.flash('error_msg', 'You are not authorized');
	  		res.redirect('/ideas');
	  	} else {
	  		res.render('ideas/edit', {
		  		idea: idea
		  	});
	  	}
	  });
});

// process form
router.post('/', ensureAuthenticated, (req, res) => {
	let errors = [];
	if (!req.body.title) {
		errors.push({text: 'Please, add a title'});
	}
	if (!req.body.details) {
		errors.push({text: 'Please, add a details'});
	}

	if (errors.length > 0) {
		res.render('ideas/add', {
			errors: errors,
			title: req.body.title,
			details: req.body.details
		});
	} else {
		const newUser = {
			title: req.body.title,
			details: req.body.details,
			user: req.user.id
		};

		new Idea(newUser)
		  .save()
		  .then((idea) => {
		  	req.flash('success_msg', 'New idea added');
		  	res.redirect('/ideas');
		  })
	}	
});

// update ideas
router.put('/:id', ensureAuthenticated, (req, res) => {
	Idea.findOne({
		_id: req.params.id
	})
	  .then(idea => {
	  	// new values
	  	idea.title = req.body.title;
	  	idea.details = req.body.details;

	  	idea.save() 
	  	  .then((idea) => {
	  	  	req.flash('success_msg', 'Idea updated');
	  	  	res.redirect('/ideas');
	  	  }) 
	  });
});

// delete ideas
router.delete('/:id', ensureAuthenticated, (req, res) => {
	Idea.remove({_id: req.params.id})
	  .then(() => {
	  	req.flash('success_msg', 'Idea deleted');
	    res.redirect('/ideas');	
	  });
});


module.exports = router;