define([
		'backbone',
		'underscore',
		'hbs!tmpl/registration'
	],
	function(Backbone, _, RegistrationTmpl) {
		'use strict';

		var RegistrationView = Backbone.Marionette.ItemView.extend({

			className: 'registration-view',

			ui: {
				emailInput: 'input[id=email]',
				passwordInput: 'input[id=password]'
			},

			events: {
				'click button[data-action=submit]': 'onSubmit'
			},

			template: function() {
				return RegistrationTmpl();
			},

			onSubmit: function() {
				this.model.set({
					username: this.ui.emailInput[0].value,
					password: this.ui.passwordInput[0].value
				});

				if (this.model.isValid()) {
					this.model.registerUser()
						.done(_.bind(function() {
							this.onRegistrationSuccess()
						}, this))
						.fail(this.onRegistrationFailure);
				} else {
					console.log(this.model.validationError);
				}

			},

			onRegistrationSuccess: function() {
				this.model.setLoggedIn(true);
			},

			onRegistrationFailure: function() {
				console.log('FAIL', arguments);
			}

		});

		return RegistrationView;
	}
);