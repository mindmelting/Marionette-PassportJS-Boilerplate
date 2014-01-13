define([
		'backbone',
		'./models/AppDomainModel',
		'./views/NavigationView',
		'./router',
		'./controller'
	],

	function(Backbone, AppDomainModel, NavigationView, Router, controller) {
		'use strict';

		var App = new Backbone.Marionette.Application();

		AppDomainModel.set('App', App);

		/* Add application regions here */
		App.addRegions({
			mainContentRegion: '#main-content'
		});

		App.addRegions({
			navigationRegion: '#navigation'
		});

		App.navigationRegion.show(new NavigationView({
			model: AppDomainModel.getUser()
		}));

		new Router({
			controller: controller
		});
		AppDomainModel.set('Router', Router);

		Backbone.history.start()

		/* Add initializers here */
		App.addInitializer(function() {

		});

		return App;
	}
);