function changeInitials() {
    var inits = document.getElementById("username").value.substring(0, 2);
    document.getElementById("nickname").value = inits;
}

function limit(element) {
    var max_chars = 2;

    if (element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}

function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

var acc = document.getElementsByClassName("accordion");
var panel = document.getElementById("panel");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
        this.classList.toggle("active");
        if (panel.style.maxHeight) {
            panel.style.display = "none";
            panel.style.maxHeight = null;
        } else {
            if ($("#latex-editor-area").hasClass("tex2jax_ignore shown")) {
                toggleLatex();
            }
            panel.style.display = "block";
            panel.style.maxHeight = panel.scrollHeight + "px";
            openTab(event, 'Emoj');
        }
    }
}

function toggleLatex() {
    $("#latex-editor-area").toggleClass("shown");
    $("#text-message-input-area").toggleClass("latex-editor-shown");
    $("#direct-chat-container").toggleClass("latex-editor-shown");
    setTimeout(function () {
        $("#chat-body-div").scrollTop($("#dcs").height());
    }, 100);

    if ($("#direct-chat-container").hasClass("latex-editor-shown")) {
        $(".alertify-notifier").addClass("latex-editor-shown");
    } else {
        $(".alertify-notifier").removeClass("latex-editor-shown");
    }
}

function toggleChatRoom(e) {

    $('#chat-menu').toggleClass("shown");
    var percentage = (e.pageX / window.innerWidth) * 100;
    if(percentage < 70){
        $('#editor-frame').css("width", "98%");
        $('#math-editor').css("width", "100%");
        $('#chatframe').css("width", "0%");
        $('.arrow-left').css("left",  "97%");
        $('#dragbar').css('display', "none");
    }
    else{
        $('#editor-frame').css("width", e.pageX + "px");
        $('#math-editor').css("width", "70%");
        $('#chatframe').css("width", "calc("+ "30%" + " - " + "5px)");
        $('.arrow-left').css("left", "68%");
        $('#dragbar').css('display', "initial");
    }

}

function openkeyboard() {
    //var kb = document.getElementById("VirtualKey");
    //kb.visilibty=visible;
    var tbInput = document.getElementById("textArea");
    tbInput.value = "5";
}

function del() {
    var tbInput = document.getElementById("textArea");
    tbInput.value = tbInput.value.substr(0, tbInput.value.length - 1);
}

function input(e) {
    var tbInput = document.getElementById("textArea");
    tbInput.value = tbInput.value + e.value;
    var panel = document.getElementById("panel");
    panel.style.display = "none";
    panel.style.maxHeight = null;
}

function typeset(e) {
    document.getElementById("previewArea").innerHTML = e.placeholder + "<br>" + e.value;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

var iFrequency = 3000; // expressed in miliseconds
var myInterval = 0;


function startLoop() {
    if (myInterval > 0) clearInterval(myInterval);  // stop
    myInterval = setInterval("doSomething()", iFrequency);  // run
}

function doSomething() {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

startLoop();

//toggle chatbar implementation
$(".arrow-left").click(function (e) {
    $(this).toggleClass("shown");
    $(this).toggleClass("arrow-right");
    toggleChatRoom(e);
});

// #dragbar Implementation
var dragging = false;

$('#dragbar').mousedown(function (e) {
    // Block all default events
    e.preventDefault();

    dragging = true;
    var main = $('#chatframe');
    var dragbar = this;
    $("#dragbar").addClass("active");

    // Create a ghostbar to show current resize position
    var ghostbar = $('<div>',
        {
            id: 'ghostbar',
            css: {
                height: main.outerHeight(),
                top:    main.offset().top,
                left:   main.offset().left
            }
        }).appendTo('body');

    $("#editor-resize-cover").addClass("shown");

    $(document).mousemove(function (e) {
        // If we exceed 70% width on the left, we don't respond to changes anymore
        if ((e.pageX / window.innerWidth) > 0.7) {
            ghostbar.css("left", window.innerWidth * 0.7);
        } else {
            $('#editor-frame').css("width", e.pageX + "px");
            ghostbar.css("left", e.pageX);
        }
        var percentage = (e.pageX / window.innerWidth) * 100;
        if (percentage > 70) {
            percentage = 70;
        }
        var mainPercentage = 100 - percentage;
        $('#editor-frame').css("width", e.pageX + "px");
        $('#math-editor').css("width", percentage + "%");
        $('#chatframe').css("width", "calc(" + mainPercentage + "%" + " - " + "5px)");
        $('.arrow-left').css("left", percentage - 2 + "%");
    });


});

$(document).mouseup(function (e) {
    if (dragging) {
        $('#ghostbar').remove();
        $(document).unbind('mousemove');
        dragging = false;
        $("#dragbar").removeClass("active");
        $("#editor-resize-cover").removeClass("shown");
    }
});
