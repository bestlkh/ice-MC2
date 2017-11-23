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

function toggleTabs(){
  var tab = document.getElementById("kbselects");
  var button = document.getElementById("tabulator");
  if(tab.style.display != "none"){
    tab.style.display = "none";
    button.value = "+";
  }
  else {
    tab.style.display = "inline";
    button.value = "-";
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

function openPanel() {
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
}

function typeset(e){
  document.getElementById("previewArea").innerHTML = e.placeholder + "<br>" + e.value;
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
