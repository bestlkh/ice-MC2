var model = (function(){
    "use strict";
    var model = {};
	
	var doAjax = function (method, url, body, json, callback){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(e){
            switch(this.readyState){
                 case (XMLHttpRequest.DONE):
                    if (this.status === 200) {
						console.log(this.responseText);
                        if(json) return callback(null, JSON.parse(this.responseText));
                        return callback(null, this.responseText);
                    }else{
                        return callback(this.responseText, null);
                    }
            }
        };
        xhttp.open(method, url, true);
        if (json && body){
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(JSON.stringify(body));  
        }else{
            xhttp.send(body);  
        }        
    };
	
    model.onLoad = function() {
        
    };

    model.login = function(detail) {
		doAjax("POST", "/v1/api/login", detail, true, function(err, res) {

			if (err) {
				document.dispatchEvent(new CustomEvent("onLoginFail", {detail: err}));
				return;
			}
			document.dispatchEvent(new CustomEvent("onLoginSuccess", {detail: res}));
		});
	};

    return model;

}());
