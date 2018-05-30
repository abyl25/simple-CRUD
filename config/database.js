if (process.env.NODE_ENV === 'production') {
	module.exports = {
		mongoURI: 'mongodb://abylay25:Ktlnu013@ds139950.mlab.com:39950/share-idea'
	}
} else {
	module.exports = {
		mongoURI: 'mongodb://localhost/vidjot'
	}
}