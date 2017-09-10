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
  MathJax.Hub.Typeset();
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