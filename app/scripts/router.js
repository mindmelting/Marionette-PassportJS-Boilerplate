define([
		'backbone'
	],
	function(Backbone) {
		'use strict';

		var Router = Backbone.Marionette.AppRouter.extend({

			appRoutes: {
				"/*": "showHomeView",
				"login": "showLoginView",
				"register": "showRegistrationView"
			}

		});

		return Router;
	}
);