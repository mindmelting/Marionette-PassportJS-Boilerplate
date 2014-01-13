define([
		'backbone',
		'underscore',
		'./UserModel'
	],
	function(Backbone, _, UserModel) {
		'use strict';

		var AppDomainModel = Backbone.Model.extend({

			initialize: function() {
				this.set('user', new UserModel());
			},
			getUser: function() {
				return this.get('user');
			}

		});

		return new AppDomainModel();
	}
);