define([
		'backbone',
		'underscore',
		'hbs!tmpl/login',
		'../models/AppDomainModel'
	],
	function(Backbone, _, LoginTmpl, AppDomainModel) {
		'use strict';

		var LoginView = Backbone.Marionette.ItemView.extend({

			className: 'login-view',

			ui: {
				emailInput: 'input[id=email]',
				passwordInput: 'input[id=password]'
			},

			events: {
				'click button[data-action=submit]': 'onSubmit'
			},

			template: function() {
				return LoginTmpl();
			},

			onSubmit: function() {
				this.model.set({
					username: this.ui.emailInput[0].value,
					password: this.ui.passwordInput[0].value
				});

				if (this.model.isValid()) {
					this.model.loginUser()
						.done(_.bind(function() {
							this.onLoginSuccess()
						}, this))
						.fail(this.onLoginFailure);
				} else {
					console.log(this.model.validationError);
				}

			},

			onLoginSuccess: function() {
				this.model.setLoggedIn(true);
				Backbone.Router.prototype.navigate('/', {
					trigger: true
				});
			},

			onLoginFailure: function() {
				console.log('LOGIN FAIL', arguments);
			}

		});

		return LoginView;
	}
);