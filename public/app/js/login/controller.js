(function () {
    "use strict";
	
    var onLoad = function () {
        model.onLoad();
        view.onLoad();
    };
	
	document.addEventListener("onLoginSubmit", function(e) {
		model.login(e.detail);
	});
	
	document.addEventListener("onLoginFail", function(e) {
		view.setError(e.detail);
	});
	
	document.addEventListener("onLoginSuccess", function(e) {
		view.redirect(e.detail);
	});
	

    window.onload = onLoad;
}());