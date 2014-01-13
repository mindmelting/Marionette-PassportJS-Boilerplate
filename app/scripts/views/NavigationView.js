define([
		'backbone',
		'underscore',
		'hbs!tmpl/navigation'
	],
	function(Backbone, _, NavigationTmpl) {
		'use strict';

		var NavigationView = Backbone.Marionette.ItemView.extend({

			className: 'navigation-view',

			modelEvents: {
				"change:loggedin": "render"
			},

			template: function(model) {
				return NavigationTmpl({
					userLoggedIn: model.loggedin
				});
			}

		});

		return NavigationView;
	}
);