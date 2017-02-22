/*
three parameters;
*/
function addEvent(ele, event, listener) {
	if(ele.addEventListener) {
		ele.addEventListener(event, listener, false);
	} else if (ele.attachEvent) {
		ele.attachEvent("on"+event, listener);
	} else { 
		event["on"+event] = listener;
	}
}


function each(arr, fn) {
	for(var cur = 0; cur < arr.length; cur++) {
		fn(arr[cur], cur);
	}
}

window.onload = function  {
	var btns = document.getElementsByTagName("button");
	var container = document.getElementById("container");

	var queue = {

		isEmpty: function() {

		},
		splitString: function(string) {

		},
		leftPush: function(element) {

		},
		leftPop: function() {

		},
		rightPush: function(element) {

		},
		rightPop: function() {

		},
		deleteId: function() {

		}
	}
}