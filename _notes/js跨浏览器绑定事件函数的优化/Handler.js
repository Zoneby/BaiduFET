/*
 *跨浏览器添加/移除DOM事件一种经典的方法
*/
function addHandler(target, eventType, handler) {
	if(target.addEventListener) {
		target.addEventListener(eventType, handler, false);
	} else {
		target.attachEvent("on"+eventType, handler);
	}
}
function removeHandler(target, eventType, handler) {
	if(target,removeEventListener) {
		target.removeEventListener(eventType, handler, false);
	} else {
		target.detachEvent("on"+eventType, handler);
	}
}


/*
* 优化方法一
在第一次调用事件函数的时候，检测并决定用哪种方法来绑定或者移除事件，然后重写函数，用一个包含正确操作的新的函数覆盖旧的函数，
并在旧的函数最后调用这个新的函数
*/
function addHandler(target, eventType, handler) {
	if(target.addEventListener) {
		addHandler = function(target, eventType, handler) {
			target.addEventListener(eventType, handler, false);
		};
	} else {
		addHandler = function(target, eventType, handler) {
			target.attachEvent("on"+eventType, handler);
		};
	}
	addHandler(target, eventType, handler);
}
function removeHandler(target, eventType, handler) {
	if(target.removeEventListener) {
		removeHandler = function(target, eventType, hander) {
			target.removeEventListener(eventType, handler, false);
		};
	} else {
		removeHandler = function(target,eventType, handler) {
			target.detachEvent("on"+eventType, handler);
		};
	}
	removeHandler(target, eventType, handler);
}

/*
*第二种优化方法，提前检测浏览器类型，并把正确的操作函数赋值给一个变量，使用一个伞目条件运算符实现
这种方法比前一种优化更加“积极”，因为他是在函数调用之前就已经去检查浏览器类型了，调用的时候马上就可以正确的去绑定事件
*/
var addHandler = document.body.addEventListener ?
					function(target, eventType, handler) {
						target.addEventListener(eventType, handler, false);
					} :
					function(target, eventType, handler) {
						target.attachEvent("on"+eventType, handler);
					};
var removeHandler = document.body.removeEventListener ?
					function(target, eventType, handler) {
						target.removeEventListener(eventType, handler, false);
					} :
					function(target, eventType, handler) {
						target.detachEvent("on"+eventType, handler);
					}