// 事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
	if(element.addEventListener){
		element.addEventListener(event, listener, false);
	}
	else if(element.attachEvent) {
		element.attachEvent("on"+event, listener);
	}
	else {
		element["on"+event] = listener;
	}
}

//遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递 
function each(arr, fn) {
	for(var cur = 0; cur < arr.length; cur++) {
		fn(arr[cur], cur);
	}
}
window.onload = function() {
	var container = document.getElementById("container");
	var buttonList = document.getElementsByTagName("button");
	// define object queue
	var queue = {
		str: [],

		leftPush: function(num) {
			this.str.unshift(num);
			this.paint();
		},
		rightPush: function(num) {
			this.str.push(num);
			this.paint();
		},
		isEmpty: function() {
			return (this.str.length == 0);
		},
		leftPop: function() {
			if(!this.isEmpty()) {
				alert(this.str.shift());
				this.paint();
			} else {
				alert("The queue is already empty!");
			}
		},
		rightPop: function() {
			if(!this.isEmpty()) {
				alert(this.str.pop());
				this.paint();
			} else {
				alert("The queue is already empty！");
			}
		},
		paint: function() {
			var str = "";
			each(this.str, function(item) {
				str += ("<div>" + parseInt(item) + "</div>")
			});
			container.innerHTML = str;
			addDivDelEvent();
		},
		deleteID: function(id) {
			console.log(id);
			this.str.splice(id, 1);
			this.paint();
		}

	}
	function addDivDelEvent() {
		for(var cur = 0; cur < container.childNodes.length; cur++) {
			// 闭包
			addEvent(container.childNodes[cur], "click", function(cur) {
				return function() { return queue.deleteID(cur)};
			}(cur));
		}
	}
	addEvent(buttonList[0], "click", function() {
		var input = document.getElementById("num-input").value;
		if((/^[0-9]+$/).test(input)) {
			queue.leftPush(input);
		} else {
			alert("Please enter an interger!");
		}
	});
	addEvent(buttonList[2], "click", function() {
		var input = document.getElementById("num-input").value;
		if((/^[0-9]+$/).test(input)) {
			queue.rightPush(input);
		} else {
			alert("Please enter an interger!");
		}
	});
	addEvent(buttonList[1], "click", function() {queue.leftPop()});
	addEvent(buttonList[3], "click", function() {queue.rightPop()});
}