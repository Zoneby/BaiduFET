var $ = function (id) {
	return document.getElementById(id);
}
var CancelQueue = function (obj) {
	obj = obj || {};
	this.input = obj.input || $("new-number");
	this.container = obj.container ||$("arr-area");
	this.arr = [];
	this.update = function () {
		var childs = this.container.childNodes;
		for(var i = 0, len = this.arr.length; i < len; i++) {
			childs[i].setAttribute("data-index",i);
		}
	};
	this.inQueue = function (type) {
		var num = this.check();
		if(num !== undefined) {
			CancelQueue.publicInQueue[type].inArr.call(this, num);
			CancelQueue.publicInQueue[type].inDom.call(this, num);

		}
	};
	this.outQueue = function(type) {
		if(this.arr.length !== 0) {
			CancelQueue.publicOutQueue[type].outArr.call(this);
			CancelQueue.publicOutQueue[type].outDom.call(this);
		} else {
			alert("该队列为空");
		}
	};
	this.childClick = function () {
		var self = this;
		this.container.onclick = function (event) {
			if(event.target.tagName.toLowerCase() === "span") {
				var index = event.target.getAttribute("data-index");
				this.removeChild(this.childNodes[index]);
				self.arr.splice(index, 1);
				self.update();
			}
		};
	};
};
CancelQueue.fn = CancelQueue.prototype;

CancelQueue.fn.burnDom = function (number) {
	var span = document.createElement("span"),
		text = document.createTextNode(number);
		span.appendChild(text);
		return span;
}

CancelQueue.fn.check = function() {
	var pattern = /^\d{1,3}$/;
		strNum = this.input.value;
		flag = pattern.test(strNum);
		if (flag) {
			this.input.value = "";
			return strNum;
		} else {
			alert("您输入数字有误");
			return void 0;
		}
};

CancelQueue.throwError = function () {
	if(!(this instanceof CancelQueue)) {
		throw new Error("该函数不能直接调用");
	}
};

CancelQueue.publicInQueue = {
	left: {
		inArr: function (num) {
			CancelQueue.throwError.call(this);
			this.arr.unshift(+num);
		},
		inDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.insertBefore(this.burnDom(num), this.container.childNodes[0]);
		}
	},
	right: {
		inArr: function (num) {
			CancelQueue.throwError.call(this);
			this.arr.push(+num);
		},
		inDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.appendChild(this.burnDom(num));
		}
	}
};

CancelQueue.publicOutQueue = {
	left: {
		outArr: function (num) {
			CancelQueue.throwError.call(this);
			alert(this.arr.shift());
		},
		outDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.removeChild(this.container.firstElementChild);
		}
	},
	right: {
		outArr: function(num) {
			CancelQueue.throwError.call(this);
			alert(this.arr.pop());
		},
		outDom: function (num) {
			CancelQueue.throwError.call(this);
			this.container.removeChild(this.container.lastElementChild);
		}
	}
};

// test
(function () {
	var test = new CancelQueue(),
		buttons = $("button-area");
		test.childClick();
		$("left-in").onclick = function () {
			test.inQueue("left");
		};
		$("left-out").onclick = function () {
			test.outQueue("left");
		};
		$("right-in").onclick = function () {
			test.inQueue("right");
		};
		$("right-out").onclick = function () {
			test.outQueue("right");
		};
})();