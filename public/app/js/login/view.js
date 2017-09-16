var view = (function () {
	"use strict";

	var view = {};

	view.onLoad = function () {

	};

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

	document.getElementById("uname_input").oninvalid = function () {
		this.parentElement.classList.add("error");
	};

	document.getElementById("uname_input").onchange = function () {
		this.parentElement.classList.remove("error");
	};

	document.getElementById("pwd_input").oninvalid = function () {
		this.parentElement.classList.add("error");
	};

	document.getElementById("pwd_input").onchange = function () {
		this.parentElement.classList.remove("error");
	};

	document.getElementById("signup_form").addEventListener("submit", function (e) {
		e.preventDefault();
		var pwd = document.getElementById("pwd_input");
		var uname = document.getElementById("uname_input");

		document.dispatchEvent(new CustomEvent("onLoginSubmit", {
			detail: {
				username: uname.value,
				password: pwd.value,
				token: getParameterByName("token")
			}
		}));

	});

	view.setError = function (err) {
        err = JSON.parse(err);
		document.getElementById("login_err").innerHTML = err.message;
		document.getElementById("uname_input").dispatchEvent(new CustomEvent("invalid"));
		document.getElementById("pwd_input").dispatchEvent(new CustomEvent("invalid"));
	};

	view.redirect = function (path) {
		window.location.href = path.redirect ? path.redirect : "/admin/dashboard";
	};

	return view;

}());
