define([
		'backbone',
		'underscore',
		'utils'
	],
	function(Backbone, _, Utils) {
		'use strict';

		var UserModel = Backbone.Model.extend({

			defaults: {
				loggedin: false
			},

			initialize: function() {
				var loginCookieValue = Utils.getCookie('loginStatus');
				if (loginCookieValue === 'true') {
					this.set('loggedin', true);
				}
			},

			registerUser: function() {
				return this.sync('create', this, {
					url: 'api/v1/users'
				});
			},

			loginUser: function() {
				return this.sync('create', this, {
					url: 'api/login'
				});
			},

			setLoggedIn: function(status) {
				this.set('loggedin', status);
			},

			validate: function(attrs) {
				var errors = [];
				if (!attrs.username.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
					errors.push("Please enter a valid email");
				}
				if (attrs.password.length < 6) {
					errors.push("Please enter a password longer than 6 characters");
				}

				if (errors.length) return errors;
			}

		});

		return UserModel;
	}
);