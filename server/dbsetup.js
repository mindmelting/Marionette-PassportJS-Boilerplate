'use strict';
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://localhost/project');
var db = mongoose.connection;

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		match: /[^\s@]+@[^\s@]+\.[^\s@]+/,
		required: true,
		index: {
			unique: true,
			sparse: true
		}
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next) {
	var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

var UserModel = mongoose.model('user', UserSchema);

module.exports = {
	db: db,
	UserModel: UserModel
};