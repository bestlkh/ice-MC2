function changeInitials(){
        var inits = document.getElementById("username").value.substring(0,2);
        document.getElementById("nickname").value = inits;
      }

function limit(element){
  var max_chars = 2;

  if(element.value.length > max_chars) {
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
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = document.getElementById("panel");
    if (panel.style.maxHeight){
      panel.style.display = "none";
      panel.style.maxHeight = null;
    } else {
      panel.style.display = "block";
      panel.style.maxHeight = panel.scrollHeight + "px";
      openTab(event, 'Emoj');
    } 
  }
}

function openkeyboard(){
  //var kb = document.getElementById("VirtualKey");
  //kb.visilibty=visible;
  var tbInput = document.getElementById("textArea");
  tbInput.value = "5";
}
 
function del() {
  var tbInput = document.getElementById("textArea");
  tbInput.value = tbInput.value.substr(0, tbInput.value.length - 1);
}

function input(e){
  var tbInput = document.getElementById("textArea");
  tbInput.value = tbInput.value + e.value;
  var panel = document.getElementById("panel");
  panel.style.display = "none";
  panel.style.maxHeight = null;
}

function typeset(e){
  document.getElementById("previewArea").innerHTML = e.placeholder + "<br>" + e.value;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

var iFrequency = 3000; // expressed in miliseconds
var myInterval = 0;


function startLoop() {
    if(myInterval > 0) clearInterval(myInterval);  // stop
    myInterval = setInterval( "doSomething()", iFrequency );  // run
}

function doSomething()
{
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

startLoop();

var dragging = false;
   $('#dragbar').mousedown(function(e){
       e.preventDefault();
       
       dragging = true;
       var main = $('#chatframe');
       var ghostbar = $('<div>',
                        {id:'ghostbar',
                         css: {
                                height: main.outerHeight(),
                                top: main.offset().top,
                                left: main.offset().left
                               }
                        }).appendTo('body');
       
        $(document).mousemove(function(e){
          if (((e.pageX - 50) / window.innerWidth) > 0.7) {
            ghostbar.css("left", window.innerWidth * 0.7);
          } else {
            $('#editor-frame').css("width", e.pageX - 50 + "px");
            ghostbar.css("left",e.pageX - 50);
          }
       });

       
    });

   $(document).mouseup(function(e){
       if (dragging) 
       {
           var percentage = ((e.pageX - 50) / window.innerWidth) * 100;
           if (percentage > 70) {
             percentage = 70;
           }
           var mainPercentage = 100-percentage;
           
           $('#editor-frame').css("width", e.pageX - 50 + "px");
           $('#editorframe').css("width",percentage + "%");
           $('#chatframe').css("width","calc(" + mainPercentage + "%" + " - " + "10px)");
           $('#ghostbar').remove();
           $(document).unbind('mousemove');
           dragging = false;
       }
    });