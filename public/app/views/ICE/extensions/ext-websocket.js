
var socket = io.connect(':8000/');

//// Socket pour l'envoi d'évènement,
//// la réception est prise en charge par chat.io.js
//		socket.on('anEvent', function(svgelement) {
//			// Parameters:
//			// data - Object with the following keys/values:
//			// * element - tag name of the SVG element to create
//			// * attr - Object with attributes key-values to assign to the new element
//			// * curStyles - Boolean indicating that current style attributes should be applied first
//				methodDraw.canvas.addSvgElementFromJson(element);
//		});

function getSVG()	{
	return methodDraw.canvas.svgToString(svgcontent, 0);
}

function setSVG(xml)	{
	methodDraw.canvas.setSvgString(xml);
}

methodDraw.addExtension("Web Socket", function() {
	var enabled = false;
	return {
		name: "Web Socket",
		svgicons: "extensions/websocket-icon.xml",
		buttons: [{
			id: "web_socket",
			type: "context",
			title: "Share with websockets",
			panel: "editor_panel",
			events: {
				'click': function() {
					enabled = $('#web_socket').hasClass('push_button_pressed');
//					console.log(getSVG());
					if (enabled) {
						$('#web_socket').removeClass('push_button_pressed').addClass('tool_button');
						enabled = false;
					}
					else {
						$('#web_socket').addClass('push_button_pressed').removeClass('tool_button');
						enabled = true;
					}
				}
			}
		}],

		elementChanged: function(opts) {
			var changedElements = opts.elems;
			changedElements.forEach(function(element2, index, array) {

				var shapeToSend = new Object();
				shapeToSend.element=element2.nodeName;
				switch(shapeToSend.element) {
					case 'rect':
						shapeToSend.attr = {
							id : element2.getAttribute("id"),
							filter : element2.getAttribute("filter"),
							height: element2.getAttribute("height"),
							width: element2.getAttribute("width"),
							y: element2.getAttribute("y"),
							x: element2.getAttribute("x"),
							'stroke-width': element2.getAttribute("stroke-width"),
							stroke: element2.getAttribute("stroke"),
							'stroke-linecap': element2.getAttribute("stroke-linecap"),
							'stroke-linejoin': element2.getAttribute("stroke-linejoin"),
							'stroke-dasharray': element2.getAttribute("stroke-dasharray"),
							transform: element2.getAttribute("transform"),
							fill: element2.getAttribute("fill"),
							'opacity': element2.getAttribute("opacity"),
							'fill-opacity': element2.getAttribute("fill-opacity")
						};
						shapeToSend.curStyles = true;
						break;

					case 'line':
						shapeToSend.attr = {
							id : element2.getAttribute("id"),
							height: element2.getAttribute("height"),
							width: element2.getAttribute("width"),
							y1: element2.getAttribute("y1"),
							x1: element2.getAttribute("x1"),
							y2: element2.getAttribute("y2"),
							x2: element2.getAttribute("x2"),
							strokeWidth: element2.getAttribute("stroke-width"),
							strokeDasharray: element2.getAttribute("stroke-dasharray"),
							strokeLinejoin: element2.getAttribute("stroke-linejoin"),
							strokeLinecap: element2.getAttribute("stroke-linecap"),
							strokeOpacity: element2.getAttribute("stroke-opacity"),
							transform: element2.getAttribute("transform"),
							stroke: element2.getAttribute("stroke"),
							fill: element2.getAttribute("fill"),
							style: element2.getAttribute("style"),
							opacity: element2.getAttribute("opacity")
						};
						shapeToSend.curStyles = true;
						break;

					case 'ellipse' :
						shapeToSend.attr = {
								id : element2.getAttribute("id"),
								cx: element2.getAttribute("cx"),
								cy: element2.getAttribute("cy"),
								rx: element2.getAttribute("rx"),
								ry: element2.getAttribute("ry"),
								stroke: element2.getAttribute("stroke"),
								strokeWidth: element2.getAttribute("stroke-width"),
								fill: element2.getAttribute("fill"),
								style: element2.getAttribute("style"),
								transform: element2.getAttribute("transform"),
								opacity: element2.getAttribute("opacity")
							};
							shapeToSend.curStyles = true;
							break;

					case 'circle' :
						shapeToSend.attr = {
							id : element2.getAttribute("id"),
							cx: element2.getAttribute("cx"),
							cy: element2.getAttribute("cy"),
							r: element2.getAttribute("r"),
							stroke: element2.getAttribute("stroke"),
							'stroke-width': element2.getAttribute("stroke-width"),
							fill: element2.getAttribute("fill"),
							style: element2.getAttribute("style"),
							transform: element2.getAttribute("transform"),
							opacity: element2.getAttribute("opacity")
						};
						shapeToSend.curStyles = true;
						break;

					case 'path' :
						shapeToSend.attr = {
							id : element2.getAttribute("id"),
							d: element2.getAttribute("d"),
							stroke: element2.getAttribute("stroke"),
							strokeWidth: element2.getAttribute("stroke-width"),
							fill: element2.getAttribute("fill"),
							transform: element2.getAttribute("transform"),
							style: element2.getAttribute("style"),
							opacity: element2.getAttribute("opacity")
						};
						shapeToSend.curStyles = true;
						break;

					// Fixed :D
					case 'image' :
						shapeToSend.attr = {
							id : element2.getAttribute("id"),
							x: element2.getAttribute("x"),
							y: element2.getAttribute("y"),
							width: element2.getAttribute("width"),
							height: element2.getAttribute("height"),
							stroke: element2.getAttribute("stroke"),
							strokeWidth: element2.getAttribute("stroke-width"),
							fill: element2.getAttribute("fill"),
							style: element2.getAttribute("style"),
							transform: element2.getAttribute("transform"),
							opacity: element2.getAttribute("opacity"),
							href: element2.getAttribute("xlink:href")
						};
						shapeToSend.curStyles = true;
						shapeToSend.attr["xlink:href"] = shapeToSend.attr["href"];
						delete shapeToSend.attr["href"];
						break;

					case 'text' :
						shapeToSend.attr = {
							id : element2.getAttribute("id"),
							x: element2.getAttribute("x"),
							y: element2.getAttribute("y"),
							width: element2.getAttribute("width"),
							height: element2.getAttribute("height"),
							stroke: element2.getAttribute("stroke"),
							'stroke-width': element2.getAttribute("stroke-width"),
							fill: element2.getAttribute("fill"),
							style: element2.getAttribute("style"),
							opacity: element2.getAttribute("opacity"),
							'font-size': element2.getAttribute("font-size"),
							'font-family': element2.getAttribute("font-family"),
							transform: element2.getAttribute("transform"),
							'text-anchor': element2.getAttribute("text-anchor")
						};
						//alert();
						//shapeToSend.curStyles = true;
						shapeToSend.textContent = element2.textContent;
						//shapeToSend.textContent = element2.getAttribute("textContent");
						//shapeToSend.textContent = "Hello";
						//alert(element2.textContent);
						break;

				}

//				socket.emit('update', {svg:shapeToSend});

				socket.emit('update', {room:parent.frames[1].currentRoom, svg:shapeToSend});
			});
		},

		elementRemoved: function(opts)	{
			var removedElements = opts.elems;
			removedElements.forEach(function(elementToRemove) {
				socket.emit('removed', {room:parent.frames[1].currentRoom, id:elementToRemove.getAttribute("id")});
			});
		}

	};
});
