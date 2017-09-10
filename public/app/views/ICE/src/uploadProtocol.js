var sendToChat = function(){
var canvas = document.getElementById('testcanvas');
document.getElementById("ts").style.display="inline";
var ctx = canvas.getContext('2d');

var DOMURL = window.URL || window.webkitURL || window;

var img = new Image();
var svg = svgCanvas.getSVGBlob();
var url = DOMURL.createObjectURL(svg);

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  DOMURL.revokeObjectURL(url);
}

img.src = url;
uploadToChat(img);
}
// by default, svgCanvas.open() is a no-op.
// it is up to an extension mechanism (opera widget, etc)
// to call setCustomHandlers() which will make it do something
var clickOpen = function(){
svgCanvas.open();
};
var clickImport = function(){
};

var flash = function($menu){
var menu_title = $menu.prev();
menu_title.css({
  "background": "white",
  "color": "black"
});
setTimeout(function(){menu_title.removeAttr("style")}, 200);
}

function swapFrame(){
  var chat = document.getElementById("chatframe");
  var editor = document.getElementById("editorframe");
  var ts = document.getElementById('editor-frame').contentWindow.document.getElementById('tool_swap');
  ts.style.display = "block";
  editor.style.display = "inline";
  chat.style.display = "none";
}

function swapParentFrame(){
  var chat = parent.document.getElementById("chatframe");
  var editor = parent.document.getElementById("editorframe");
  editor.style.display = "none";
  chat.style.display = "inline";
}

function uploadToChat(img){
  
}

var updateWireFrame = function() {
  // Test support
  if(supportsNonSS) return;

  var rule = "#workarea.wireframe #svgcontent * { stroke-width: " + 1/svgCanvas.getZoom() + "px; }";
  $('#wireframe_rules').text(workarea.hasClass('wireframe') ? rule : "");
}

var showSourceEditor = function(e, forSaving){
  if (editingsource) return;
  flash($('#view_menu'));
  editingsource = true;

  $('#save_output_btns').toggle(!!forSaving);
  $('#tool_source_back').toggle(!forSaving);

  var str = orig_source = svgCanvas.getSvgString();
  $('#svg_source_textarea').val(str);
  $('#svg_source_editor').fadeIn();
  $('#svg_source_textarea').focus().select();
};

var clickSave = function(){
  flash($('#file_menu'));
  // In the future, more options can be provided here
  var saveOpts = {
    'images': curPrefs.img_save,
    'round_digits': 6
  }
  svgCanvas.save(saveOpts);
};