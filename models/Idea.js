const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdeaSchema =  new Schema({
	title: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('ideas', IdeaSchema);


/* MongoDB guide

 run mongoDB      -- mongo
 show databases   -- show dbs
 use database     -- use <ideas>
 show collections -- show collections
 show info        -- db.<ideas>.find()



*/