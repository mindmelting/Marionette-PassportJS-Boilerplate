define([
		'./models/AppDomainModel',
		'./views/HomeView',
		'./views/RegistrationView',
		'./views/LoginView'
	],
	function(AppDomainModel,
		HomeView,
		RegistrationView,
		LoginView
	) {


		return {
			showHomeView: function() {
				AppDomainModel.get('App').mainContentRegion.show(new HomeView());
			},
			showLoginView: function() {
				AppDomainModel.get('App').mainContentRegion.show(new LoginView({
					model: AppDomainModel.getUser()
				}));
			},
			showRegistrationView: function() {
				AppDomainModel.get('App').mainContentRegion.show(new RegistrationView({
					model: AppDomainModel.getUser()
				}));
			}
		};

	}
);