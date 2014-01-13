define(function(){
	return {
		getCookie: function(name) {
			var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
			var result = regexp.exec(document.cookie);
			return (result === null) ? null : result[1];
		}
	}
});