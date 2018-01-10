var textarea = document.getElementById("textArea");
var chatLog = "";

angular.module('Controllers')
.directive('scrollBottom', function () {		// custom directive for scrolling bottom on new message load
  return {
    scope: {
      scrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollBottom', function (newValue) {
        if (newValue)
        {
          setTimeout(function() {
			  $(element).scrollTop($(element)[0].scrollHeight);
		  }, 100);
        }
      });
    }
  }
})
.directive('ngEnter', function () {			// custom directive for sending message on enter click
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})
.directive('focusMe', function($timeout) {		// custom directive for focusing on message sending input box
    return {
        link: function(scope, element, attrs) {
          scope.$watch(attrs.focusMe, function(value) {
            if(value === true) { 
              $timeout(function() {
                element[0].focus();
                scope[attrs.focusMe] = false;
              });
            }
          });
        }
    };
})
.controller('chatRoomCtrl', function ($scope, $rootScope, $socket, $location, $http, Upload, $timeout, $routeParams, $window){		// Chat Page Controller
	// Varialbles Initialization.
	$scope.isMsgBoxEmpty = false;
	$scope.isFileSelected = false;
	$scope.isMsg = false;
	$scope.isAdmin = false;
	$scope.setFocus = true;
	$scope.chatMsg = "";
	$scope.users = [];
	$scope.messages = [];
	$scope.allMsg = [];

	$scope.settingTimeout = null;
	$scope.isLoading = true;
	$scope.disconnected = false;
	$scope.enableVerbose = false;

	$scope.showMenuMessage = null;


	$scope.onClickDetails = function () {
		$scope.enableVerbose = !$scope.enableVerbose;
		//console.log($scope.enableVerbose);
    };

	$scope.onMenuClick = function () {
		$scope.isMenuOpened = !$scope.isMenuOpened;
			if(angular.element(document.querySelector("#slidememberlist")).hasClass("slideout_inner_trans")){
				angular.element(document.querySelector("#slidememberlist")).removeClass("slideout_inner_trans");	
			}
    };

	$(document).bind("mouseup", function (e) {
		var setting = $(".chat-settings")[0];
		if (!setting) return;
		if (e.target !== setting && !setting.contains(e.target)) {
			$scope.hideSettings = true;
			$scope.$apply();
		}
    });

	$socket.on("connect", function () {
		//console.log("connect");
		if ($scope.disconnected) {
			$scope.messages.push({type: "system", msg: "Reconnected to chat."});
			$scope.disconnected = false;
            $socket.emit('join-room', {roomId: $routeParams.roomId}, function(data) {
                if (!data.success) {

                    $rootScope.loggedIn = false;

                    $rootScope.error = data.message;
                    return $location.path('/v1/');
                }
                //$scope.messages.push(data);
                $scope.isLoading = false;
                $scope.hideLoadingScreen();
            });
		}
    });

	$scope.$on("$destroy", function () {
		$socket.disconnect();

    });

	// redirection if user is not logged in.
    if(!$rootScope.loggedIn){

        $socket.emit('check-session', {roomName: $scope.roomId}, function (data) {
            if (data.username) {

                $rootScope.loggedIn = true;
                $rootScope.username = data.username;
                $rootScope.initials = data.username.substring(0, 2);
                $rootScope.userAvatar = data.avatar;

                $socket.emit('join-room', {roomId: $routeParams.roomId}, function(data) {
                    if (!data.success) {

                        $rootScope.loggedIn = false;
                        $rootScope.error = data.message;
                        return $location.path('/v1/');
                    }
                    //$scope.messages.push(data);
                    chatLog += "Chatroom "+$routeParams.roomId+" created -- " + Date()+"\n";
                });
            } else {
                $location.path('/v1/'+$routeParams.roomId);
            }
            $scope.isLoading = false;
            $scope.hideLoadingScreen();
            $scope.isAdmin = data.isAdmin;
        });
    } else {

        $socket.emit('join-room', {roomId: $routeParams.roomId}, function(data) {
            if (!data.success) {

                $rootScope.loggedIn = false;
                $rootScope.error = data.message;
                console.log(data);
                return $location.path('/v1/');
            }
            //$scope.messages.push(data);
            $scope.isLoading = false;
            $scope.hideLoadingScreen();
            chatLog += "Chatroom "+$routeParams.roomId+" created -- " + Date()+"\n";
        });

    }

// ================================== Online Members List ===============================

	$socket.on("online-members", function(data){
		console.log(data);
		$scope.users = data;
	});

// ================================== Common Functions ==================================    
	// device/desktop detection
	var isMobile = false;
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
		isMobile = true;        

        // if(isMobile){
        // 	var height = $( window ).height() * 0.7;
			// 	$scope.setFocus = false;
			// 	setTimeout(function(){ $('.direct-chat-messages').height(height); }, 1000);
        // 	$(window).on("resize", function () {
			// 	var height = $( window ).height() * 0.7;
			// 	$scope.setFocus = false;
			// 	setTimeout(function(){ $('.direct-chat-messages').height(height); }, 1000);
			// });
        // }else{
        // 	var height = $( document ).height() * 0.8;
			// $('.direct-chat-messages').height(height);
        // }
    // message time formatting into string    
	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
	// toggle online member list mobile
 	$scope.custom = true;
    $scope.toggleCustom = function() {

        $socket.emit('get-online-members', {roomName: $routeParams.roomId});
        $scope.custom = $scope.custom === false ? true: false;	
        if(!$scope.custom){
        	if(!angular.element(document.querySelector("#slidememberlist")).hasClass("slideout_inner_trans")){
        		angular.element(document.querySelector("#slidememberlist")).addClass("slideout_inner_trans");
        	}
        }else{
        	if (angular.element(document.querySelector("#slidememberlist")).hasClass("slideout_inner_trans")) {
        		angular.element(document.querySelector("#slidememberlist")).removeClass("slideout_inner_trans");        		
        	}
        }        
    };

    $scope.hambugerOpen = function() {
	    	if(!angular.element(document.querySelector("#chat-wrapper")).hasClass("menu-open")){
	    		angular.element(document.querySelector("#chat-wrapper")).addClass("menu-open");
	    	}

    	  if (angular.element(document.querySelector("#chat-wrapper")).hasClass("menu-open")) {
    		  angular.element(document.querySelector("#chat-wrapper")).removeClass("menu-open");        		
    	  }

    };

    $scope.logout = function () {
        $rootScope.loggedIn = false;
        $rootScope.username = null;
		$socket.emit("logout", function () {
			$window.open("/", "_self");
        })
    };


    $socket.on("disconnect", function () {
    	$scope.disconnected = true;
    	$scope.messages.push({msg: "Disconnected from chat room.", error: true, type: "system"});
    });

// ====================================== message Sending Code ============================
	// sending text message function

    /**
	 * Automatically detect current message, and send it to the chat room.
     */
	$scope.sendMsg = function(){
        var textarea = document.getElementById("textArea");
		if ($scope.chatMsg || textarea.value) {
			var message = "";
			if(!$scope.chatMsg){
				message = textarea.value;
				textarea.value="";
			}
			else{
				message = $scope.chatMsg;
			}
			$scope.isFileSelected = false;
			$scope.isMsg = true;
            $scope.sendMsgManual(message, $scope.isMsg, $scope.isFileSelected, function(data){
                //delivery report code goes here
                if (data.success) {
                    $scope.chatMsg = "";
                    $scope.setFocus = true;
                }
			});
            $("#chat-body-div").animate({
                scrollTop: $("#chat-body-div")[0].scrollHeight + 100
            });
            latexEditor.setValue("");
		} else {
			// Alert user that they cannot send empty message
			Alert.Notification.spawn("You cannot send empty messages", "error", 5);
			$scope.isMsgBoxEmpty = true;
		}
	};

	$scope.showEquationSource = function(source){
		Alert.Alert.spawn("LaTeX Source", "<pre><code>" + source + "</code></pre>");
	};

    /**
	 * Manually send a message to the chat room
     * @param msg
     * @param hasMsg
     * @param hasFile
     * @param callback
     */
	$scope.sendMsgManual = function(msg, hasMsg, hasFile, callback){
		$socket.emit("send-message", {
			msg: msg,
			hasMsg: hasMsg,
			hasFile: hasFile
		}, callback);
	};

	$scope.deleteMsg = function(msg){
			$socket.emit("delete-message", msg, function(data){});
	};

	$scope.openBase64ImageInNewTab = function(img){
        var image = new Image();
        image.src = img;

        var w = window.open("");
        w.document.write(image.outerHTML);
	};

	$scope.toggleLatexEditor = function(){
		var panel = document.getElementById("panel");
		if(panel.style.display == "block"){
			panel.style.display = "none";
			panel.style.maxHeight = null;
		}
		$("#latex-editor-area").toggleClass("shown");
		$("#text-message-input-area").toggleClass("latex-editor-shown");
		$("#direct-chat-container").toggleClass("latex-editor-shown");
		setTimeout(function(){
            $("#chat-body-div").scrollTop($("#dcs").height());
		}, 100);

		if($("#direct-chat-container").hasClass("latex-editor-shown")){
            $(".alertify-notifier").addClass("latex-editor-shown");
		} else {
            $(".alertify-notifier").removeClass("latex-editor-shown");
		}
	};

	$scope.showEquationEditor = function(){
		swapFrame();
	};

    /**
	 * Get a list of messages wrapped with Message class.
     * @returns {Array}
     */
	$scope.getAllMsg = function(){
		return $scope.allMsg;
	};

    /**
	 * Show submenu for a message
     * @param message
     */
	$scope.showMessageMenu = function($event, message){
		$event.stopPropagation();
		$scope.showMenuMessage = message;
	};

	$scope.showMessageDetails = function(message){
		var text = "Message sent by " + message.getUsername() + "<br>";
		text += "Time: " + message.getTime() + "<br>";
		if(message.getText().isImage()){
			text += "Message is a base64 image.";
		} else {
			text += "<b>Message Text Body:</b>";
			text += "<pre>";
            text +=  message.getText().getRaw();
            text += "</pre>";
		}
		text += "<br><b>Message ID: </b><code>" + message.getId() + "</code>";
        text += "<br><a style='cursor:pointer;' onclick='showMessageRawNewWindow(\"" + btoa(message.raw_data.msg) + "\")'>Show Raw Body</a>";

        text += "<hr>";

        text += "<b>Text Size: </b>" + message.getText().getTextSize() + " bytes<br>";
        text += "<b>Attachments Size: </b>" + message.getText().getAttachmentsSize() + " bytes";

        Alert.Alert.spawn(text);
	};

	$scope.editSvgSource = function(source){
		Alert.Confirm.spawn("Are you sure?", "This will discard your current drawings.", function(){
			var layer = $("#editor-frame").contents().find("#svgcontent .active-layer");
			layer.html(source);
			if($(window).width() < 732){
                swapFrame();
			}
		});
	};

	$scope.hideLoadingScreen = function(){
		setTimeout(function(){
            $("#loading-screen").removeClass("shown");
		}, 2000);
	};

	$scope.showLoadingScreen = function(){
		$("#loading-screen").addClass("shown");
	};

	$scope.resetMessageMenu = function(){
		$scope.showMenuMessage = null;
	};

	$socket.on("new message multi", function (data) {
		data.forEach(function (message) {

			message.ownMsg = (message.username === $rootScope.username);

            $scope.messages.push(message);

            var msg = new Chat.Message(message);

            // Set all old message read state to true
            msg.read = true;

            $scope.allMsg.push(msg);
            // Updates chatlog with relevant message history
            chatLog += "\r";

            chatLog += "ID - " + msg.getId() + "\n";
            chatLog += "[" + msg.getTime() + "] " + msg.getUsername() + ": ";
            if(msg.getText().isImage()){
            	chatLog += "[image]"
			} else {
            	chatLog += msg.getText().getRaw();
			}
            chatLog += "\n";
        });
        $("#chat-body-div").animate({
            scrollTop: $("#chat-body-div")[0].scrollHeight + 100
        });
    });

	// recieving new text message
	$socket.on("new message", function(data){
        data.ownMsg = (data.username === $rootScope.username);
		data.timeFormatted = moment(data.timestamp).format("LTS");
		$scope.messages.push(data);

        var msg = new Chat.Message(data);

		$scope.allMsg.push(msg);
		// Updates chatlog with relevant message history
        chatLog += "\r";

        chatLog += "ID - " + msg.getId() + "\n";
        chatLog += "[" + msg.getTime() + "] " + msg.getUsername() + ": ";
        if(msg.getText().isImage()){
            chatLog += "[image]"
        } else {
            chatLog += msg.getText().getRaw();
        }
        chatLog += "\n";
        $("#chat-body-div").dequeue();
        $("#chat-body-div").animate({
            scrollTop: $("#chat-body-div")[0].scrollHeight + 100
        });
	});

	// recieving new text message delete request
	$socket.on("delete message", function(data){
		data.ownMsg = (data.username === $rootScope.username);
		data.timeFormatted = moment(data.timestamp).format("LTS");
		var messageIndex = $scope.messages.findIndex(function(item, i) {
			return (item.msgTime === data.msgTime && item.username === data.username && item.msg === data.msg);
		});
		if (messageIndex > -1) {
			// Splice both raw and wrapped version
			$scope.messages.splice(messageIndex, 1);
            $scope.allMsg.splice(messageIndex, 1);
		}
		// Updates chatlog with relevant message history
		chatLog += "\r";
		chatLog += "[" + data.msgTime + "] " + data.username + ": " + data.msg + "###DELETED###";
		chatLog += "\n";
	});

// ====================================== Image Sending Code ==============================
    $scope.$watch('imageFiles', function () {
        $scope.sendImage($scope.imageFiles);
    });

    //  opens the sent image on gallery_icon click
    $scope.openClickImage = function(msg){
		//if(!msg.ownMsg){
		$http.post("/v1/getfile",msg).success(function (response){
	    	if(!response.isExpired){
	    		msg.showme = false;
				msg.serverfilename = response.serverfilename;
	    	}else{
	    		var html = '<p id="alert">'+ response.expmsg +'</p>';
	    		if ($( ".chat-box" ).has( "p" ).length < 1) {
					$(html).hide().prependTo(".chat-box").fadeIn(1500);
					$('#alert').delay(1000).fadeOut('slow', function(){
						$('#alert').remove();
					});
				}
	    	}
	    });	
		//}
    };
    
    // recieving new image message
    $socket.on("new message image", function(data){
		$scope.showme = true;
		if (data.serverfilename) {
            var paths = data.serverfilename.split("\\");
            data.serverfilename = paths[paths.length - 1];
        }
		if(data.username == $rootScope.username){
			data.ownMsg = true;	
			data.dwimgsrc = "app/images/spin.gif";	
		}else{
			data.ownMsg = false;
		}
		if(data.ownMsg && data.repeatMsg){
			checkmessagesImage(data);
		}else{
			$scope.messages.push(data);
			$scope.allMsg.push(new Chat.Message(data));
		}
	});

	// replacing spinning wheel in sender message after image message delivered to everyone.
	function checkmessagesImage(msg){
		for (var i = ($scope.messages.length-1); i >= 0 ; i--) {
			if($scope.messages[i].hasFile){
				if ($scope.messages[i].istype === "image") {
					if($scope.messages[i].dwid === msg.dwid){
						$scope.messages[i].showme = false;
						$scope.messages[i].filename = msg.filename;
						$scope.messages[i].size = msg.size;
						$scope.messages[i].imgsrc = msg.serverfilename;
						$scope.messages[i].serverfilename = msg.serverfilename;
						break;	
					}
				}						
			}
		}
	}

	// validate file type to image function
	$scope.validateImage = function(file){
		var filetype = file.type.substring(0,file.type.indexOf('/'));
		if (filetype == "image") {
			return true;
		}else{
			var html = '<p id="alert">Select Images.</p>';
			if ($( ".chat-box" ).has( "p" ).length < 1) {
				$(html).hide().prependTo(".chat-box").fadeIn(1500);
				$('#alert').delay(1000).fadeOut('slow', function(){
					$('#alert').remove();
				});
			}	
			return false;
		}
	}

	// download image if it exists on server else return error message
	$scope.downloadImage = function(ev, elem){		
		var search_id = elem.id;
    	for (var i = ($scope.messages.length-1); i >= 0 ; i--) {
			if($scope.messages[i].hasFile){
				if ($scope.messages[i].istype === "image") {
					if($scope.messages[i].dwid === search_id){
						$http.post("/v1/getfile",$scope.messages[i]).success(function (response){
					    	if(!response.isExpired){
					    		var linkID = "#" + search_id + "A";
					    		$(linkID).find('i').click();
					    		return true;
					    	}else{
					    		var html = '<p id="alert">'+ response.expmsg +'</p>';
								if ($( ".chat-box" ).has( "p" ).length < 1) {
									$(html).hide().prependTo(".chat-box").fadeIn(1500);
									$('#alert').delay(1000).fadeOut('slow', function(){
										$('#alert').remove();
									});
								}	
								return false;
					    	}
					    });
						break;	
					}
				}						
			}
		};
    }

    $scope.referenceMessage = function(msg){
		chatInput.addBlock("Reply to " + msg.getUsername() + msg.getText().getRaw())
		chatInput._dom.append("Message: ")
	}

    // sending new images function
    $scope.sendImage = function (files) {
		if (files && files.length) {
        	$scope.isFileSelected = true;
            for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var fileSize = file.size;
				if (fileSize > 25000000) {
					alert("Image size too big, please use an image under 25MB");
					continue;
				}
                var dateString = formatAMPM(new Date());            
                var DWid = $rootScope.username + "dwid" + Date.now();
                var image = {
						//file: file,
			      		username : $rootScope.username, 
			      		userAvatar : $rootScope.userAvatar, 
			      		hasFile : $scope.isFileSelected ,
			      		isImageFile : true, 
			      		istype : "image", 
			      		showme : true , 
			      		dwimgsrc : "app/images/gallery_icon5.png", 
			      		dwid : DWid, 
						msgTime : dateString,
						filename : file.name       		
			    };
                $socket.emit('send-message',image,function (data){       // sending new image message via socket    
                });
                var fd = new FormData();
    			fd.append('file', file);
        		fd.append('username', $rootScope.username);
        		fd.append('userAvatar', $rootScope.userAvatar);
        		fd.append('hasFile', $scope.isFileSelected);
        		fd.append('isImageFile', true);
				fd.append('istype', "image");        		
				fd.append('showme', true);
				fd.append('dwimgsrc', "app/images/gallery_icon5.png");
				fd.append('dwid', DWid);
				fd.append('msgTime', dateString);
				fd.append('filename', file.name);
				$http.post("/v1/uploadImage", fd, {
		            transformRequest: angular.identity,
		            headers: { 'Content-Type': undefined }
		        }).then(function (response) {
		        });

            }
        }
    };

// =========================================== Audio Sending Code =====================
    $scope.$watch('musicFiles', function () {
        $scope.sendAudio($scope.musicFiles);
    });

    //  opens the sent music file on music_icon click on new window
    $scope.openClickMusic = function(msg){
    	$http.post("/v1/getfile",msg).success(function (response){
	    	if(!response.isExpired){
	    		window.open($rootScope.baseUrl +'/'+response.serverfilename, "_blank");
	    	}else{	    		
		    		var html = '<p id="alert">'+ response.expmsg +'</p>';
				if ($( ".chat-box" ).has( "p" ).length < 1) {
					$(html).hide().prependTo(".chat-box").fadeIn(1500);
					$('#alert').delay(1000).fadeOut('slow', function(){
						$('#alert').remove();
					});
				}
	    	}
	    });	
	}

	// recieving new music message
    $socket.on("new message music", function(data){
		if(data.username == $rootScope.username){
			data.ownMsg = true;
			data.dwimgsrc = "app/images/spin.gif";
		}else{
			data.ownMsg = false;
		}
		if((data.username == $rootScope.username) && data.repeatMsg){	
			checkmessagesMusic(data);
		}else{
			$scope.messages.push(data);
		}
	});

	// replacing spinning wheel in sender message after music message delivered to everyone.
	function checkmessagesMusic(msg){
		for (var i = ($scope.messages.length-1); i >= 0 ; i--) {
			if($scope.messages[i].hasFile){
				if ($scope.messages[i].istype === "music") {					
					if($scope.messages[i].dwid === msg.dwid){
						$scope.messages[i].showme = true;
						$scope.messages[i].serverfilename = msg.serverfilename;
						$scope.messages[i].filename = msg.filename;
						$scope.messages[i].size = msg.size;
						$scope.messages[i].dwimgsrc = "app/images/musicplay_icon.png";
						break;	
					}
				}						
			}
		};
	}

	// download music file if it exists on server else return error message
	$scope.downloadMusic = function(ev, elem){
		var search_id = elem.id;
    	for (var i = ($scope.messages.length-1); i >= 0 ; i--) {
			if($scope.messages[i].hasFile){
				if ($scope.messages[i].istype === "music") {
					if($scope.messages[i].dwid === search_id){
						$http.post("/v1/getfile",$scope.messages[i]).success(function (response){
					    	if(!response.isExpired){
					    		var linkID = "#" + search_id + "A";
					    		$(linkID).find('i').click();
					    		return true;
					    	}else{
					    		var html = '<p id="alert">'+ response.expmsg +'</p>';
								if ($( ".chat-box" ).has( "p" ).length < 1) {
									$(html).hide().prependTo(".chat-box").fadeIn(1500);
									$('#alert').delay(1000).fadeOut('slow', function(){
										$('#alert').remove();
									});
								}
								return false;
					    	}
					    });				
						break;	
					}
				}						
			}
		};
    }

    // validate file type to 'music file' function
	$scope.validateMP3 = function(file){
		if (file.type == "audio/mp3" || file.type == "audio/mpeg") {
			return true;
		}else{
			var html = '<p id="alert">Select MP3.</p>';
			if ($( ".chat-box" ).has( "p" ).length < 1) {
				$(html).hide().prependTo(".chat-box").fadeIn(1500);
				$('#alert').delay(1000).fadeOut('slow', function(){
					$('#alert').remove();
				});
			}
			return false;
		}
	}    

	// sending new 'music file' function
    $scope.sendAudio = function (files) {
        if (files && files.length) {
        	$scope.isFileSelected = true;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var dateString = formatAMPM(new Date());
                var DWid = $rootScope.username + "dwid" + Date.now();
                var audio = {
                		username : $rootScope.username, 
			      		userAvatar : $rootScope.userAvatar, 
			      		hasFile : $scope.isFileSelected ,
			      		isMusicFile : true,
                		istype : "music",
                		showme : false,
                		dwimgsrc : "app/images/musicplay_icon.png", 
			      		dwid : DWid, 
                		msgTime : dateString
                }		

                $socket.emit('send-message',audio,function (data){		// sending new image message via socket
                });
                var fd = new FormData();
    			fd.append('file', file);
        		fd.append('username', $rootScope.username);
        		fd.append('userAvatar', $rootScope.userAvatar);
        		fd.append('hasFile', $scope.isFileSelected);
        		fd.append('isMusicFile', true);
				fd.append('istype', "music");        		
				fd.append('showme', false);
				fd.append('dwimgsrc', "app/images/musicplay_icon.png");
				fd.append('dwid', DWid);
				fd.append('msgTime', dateString);
				fd.append('filename', file.name);
				$http.post('/v1/uploadAudio', fd, {
		            transformRequest: angular.identity,
		            headers: { 'Content-Type': undefined }
		        }).then(function (response) {
		        });    
            }
        }
    };

//==================================== Doc Sending Code ==============================
    $scope.$watch('PDFFiles', function () {
    	var file = $scope.PDFFiles;
        $scope.sendPDF($scope.PDFFiles);
    });

    //  download the document file on doc_icon click 
    $scope.openClickPDF = function(msg){
    	$http.post("/v1/getfile",msg).success(function (response){
	    	if(!response.isExpired){
	    		window.open($rootScope.baseUrl+'/'+response.serverfilename, "_blank");
	    	}else{
	    		var html = '<p id="alert">'+ response.expmsg +'</p>';
	    		if ($( ".chat-box" ).has( "p" ).length < 1) {
					$(html).hide().prependTo(".chat-box").fadeIn(1500);
					$('#alert').delay(1000).fadeOut('slow', function(){
						$('#alert').remove();
					});
				}
	    	}
	    });
	}

	// recieving new document message
	$socket.on("new message PDF", function(data){
		if(data.username == $rootScope.username){
			data.ownMsg = true;
			data.dwimgsrc = "app/images/spin.gif";
		}else{
			data.ownMsg = false;
		}
		if((data.username == $rootScope.username) && data.repeatMsg){	
			checkmessagesPDF(data);
		}else{
			$scope.messages.push(data);
		}
	});

	// replacing spinning wheel in sender message after document message delivered to everyone.
	function checkmessagesPDF(msg){
		for (var i = ($scope.messages.length-1); i >= 0 ; i--) {
			if($scope.messages[i].hasFile){
				if ($scope.messages[i].istype === "PDF") {
					if($scope.messages[i].dwid === msg.dwid){
						$scope.messages[i].showme = true;
						$scope.messages[i].serverfilename = msg.serverfilename;
						$scope.messages[i].filename = msg.filename;
						$scope.messages[i].size = msg.size;
						$scope.messages[i].dwimgsrc = "app/images/doc_icon.png";
						break;	
					}
				}						
			}
		};
	}
	
	// validate file type to 'document file' function
	$scope.validatePDF = function(file){
		if (file.type == "application/pdf" || file.type == "application/msword" || file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type == "text/plain" || file.type == "application/vnd.ms-excel") {
			return true;
		}else{
			var html = '<p id="alert">Select pdf/excel/doc.</p>';
			if ($( ".chat-box" ).has( "p" ).length < 1) {
				$(html).hide().prependTo(".chat-box").fadeIn(1500);
				$('#alert').delay(1000).fadeOut('slow', function(){
					$('#alert').remove();
				});
			}
			return false;
		}
	};

	// download document file if it exists on server else return error message
	$scope.downloadPDF = function(ev, elem){
		var search_id = elem.id;
    	for (var i = ($scope.messages.length-1); i >= 0 ; i--) {
			if($scope.messages[i].hasFile){
				if ($scope.messages[i].istype === "PDF") {
					if($scope.messages[i].dwid === search_id){
						$http.post("/v1/getfile",$scope.messages[i]).success(function (response){
					    	if(!response.isExpired){
					    		var linkID = "#" + search_id + "A";
					    		$(linkID).find('i').click();
					    		return true;
					    	}else{
					    		var html = '<p id="alert">'+ response.expmsg +'</p>';
								if ($( ".chat-box" ).has( "p" ).length < 1) {
									$(html).hide().prependTo(".chat-box").fadeIn(1500);
									$('#alert').delay(1000).fadeOut('slow', function(){
										$('#alert').remove();
									});
								}
								return false;
					    	}
					    });				
						break;	
					}
				}						
			}
		};
    }

    // sending new 'document file' function
    $scope.sendPDF = function (files) {
        if (files && files.length) {
        	$scope.isFileSelected = true;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var dateString = formatAMPM(new Date());
                var DWid = $rootScope.username + "dwid" + Date.now();
                var PDF = {
                		username : $rootScope.username, 
			      		userAvatar : $rootScope.userAvatar, 
			      		hasFile : $scope.isFileSelected ,
			      		isPDFFile : true,
                		istype : "PDF",
                		showme : false,
                		dwimgsrc : "app/images/doc_icon.png", 
			      		dwid : DWid, 
                		msgTime : dateString
                }
                $socket.emit('send-message',PDF,function (data){
                });
                var fd = new FormData();
    			fd.append('file', file);
        		fd.append('username', $rootScope.username);
        		fd.append('userAvatar', $rootScope.userAvatar);
        		fd.append('hasFile', $scope.isFileSelected);
        		fd.append('isPDFFile', true);
				fd.append('istype', "PDF");        		
				fd.append('showme', false);
				fd.append('dwimgsrc', "app/images/doc_icon.png");
				fd.append('dwid', DWid);
				fd.append('msgTime', dateString);
				fd.append('filename', file.name);
				$http.post("/v1/uploadPDF", fd, {
		            transformRequest: angular.identity,
		            headers: { 'Content-Type': undefined }
		        }).then(function (response) {
		            //console.log(response);
		        });
            }
        }
    };

//==================================== Any File Upload ============================
    $scope.$watch('Files', function () {
        var filetype = $scope.catchFile($scope.Files);
        if(filetype == "document"){
        	$scope.sendPDF($scope.Files);
        }else if(filetype == "music"){
        	$scope.sendAudio($scope.Files);
        }else if(filetype == "image"){
        	$scope.sendImage($scope.Files);
        }else if(filetype == "invalid format"){
        	var html = '<p id="alert">Invalid file format.</p>';
        	if ($( ".chat-box" ).has( "p" ).length < 1) {
				$(html).hide().prependTo(".chat-box").fadeIn(1500);
				$('#alert').delay(1000).fadeOut('slow', function(){
					$('#alert').remove();
				});
			}
        }    
    });

    // function for checking file type
    $scope.catchFile = function (files){
    	if (files && files.length) {
        	$scope.isFileSelected = true;
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file.type == "application/pdf" || file.type == "application/msword" || file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type == "text/plain" || file.type == "application/vnd.ms-excel") {
					return "document";
				}else if(file.type == "audio/mp3" || file.type == "audio/mpeg"){
					return "music";
				}else{
					var filetype = file.type.substring(0,file.type.indexOf('/'));
					if (filetype == "image") {
						return "image";
					}else{
						return "invalid format";
					}
				}

            }
        }
    }

});

