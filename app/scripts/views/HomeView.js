define([
		'backbone',
		'underscore',
		'hbs!tmpl/home'
	],
	function(Backbone, _, HomeTmpl) {
		'use strict';

		var HomeView = Backbone.Marionette.ItemView.extend({

			className: 'home-view',

			template: function() {
				return HomeTmpl();
			}

		});

		return HomeView;
	}
);