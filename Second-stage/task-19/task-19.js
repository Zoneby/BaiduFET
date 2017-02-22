$ = function(el) {return document.querySelector(el);};

//事件绑定函数 兼容浏览器差异
function addEvent(element, event, listener) {
	if(element.addEventListener) {
		element.addEventListener(event, listener, false);
	}
	else if(element.attachEvent) {
		element.attachEvent("on"+event, listener);
	}
	else {
		element["on"+event] = listener;
	}
}
// 模仿jquery.each()
function each(arr, fn) {
	for(var cur = 0; cur < arr.length; cur++) {
		fn(arr[cur], cur);
	}
}

window.onload = function() {
	var container = $("#container");
	var buttonList = document.getElementsByTagName("button");
	var queue = {
		str: [],

		Length: function() {
			return  this.str.length;
		},
		leftPush: function(num) {
			if(this.Length() <= 60){
				this.str.unshift(num);
				this.paint();
			}else {
				alert("The queue is already full! (队列元素长度不能超过60)");
			}
		},
		rightPush: function(num) {
			if(this.Length() <= 60) {
				this.str.push(num);
				this.paint();
			}else {
				alert("The queue is already full! (队列元素长度不能超过60)");
			}
		},
		leftPop: function() {
			if(this.Length() > 0) {
				alert(this.str.shift());
				this.paint();
			}else {
				alert("The queue is already empty!");
			}
		},
		rightPop: function() {
			if(this.Length() > 0) {
				alert(this.str.pop());
				this.paint();
			} else {
				alert("The queue is already empty!");
			}
		},
		paint: function() {
			var str = "";
			each(this.str, function(item) {
				// str += ('<div style= "height:'+parseInt(item)+'"> '+ parseInt(item) +' </div>')
				str +='<div style="height: '+parseInt(item)+'"> '+ parseInt(item) +'</div>';
			});
			container.innerHTML = str;
			addDivDelEvent();
		},
		deleteID: function(id) {
			console.log(id);
			this.str.splice(id, 1);
			this.paint();
		},
		// 排序算法
		BubbleSort1: function(arr) {
			for(var i = 0; i < arr.length; i++)
				for(var j = 1; j < arr.length -i; j++)
					if(a[j-1] > a[j]) {
						var temp = a[j-1];
						a[j-1] = a[j];
						a[j] = temp;
					}
			return arr;
		},
		BubbleSort2: function(arr) {
			var flag = true;
			while(flag) {
				flag = false;
				for(var j = 0; j < arr.length; j++) 
					if(a[j-1] > a[j]) {
						var temp = a[j-1];
						a[j-1] = a[j];
						a[j] = temp;
					}
			}
			return arr;
		},
		BubbleSort3: function(arr) {
			var flag = arr.length;
			while(flag){
				var k = flag;
				flag = 0;
				for(var j = 1; j < k; j++) 
					if(a[j-1] > a[j]) {
						var temp = a[j-1];
						a[j-1] = a[j];
						a[j] = temp;
						flag = j;
					}
			}
			return arr;
		},
		BubbleSort4: function(arr) {
			var n = arr.length;
			var temp = null;
			for(var i = 0; i < n-1; i++) {
				for(var j = 0; j< n-1-i; j++) {
					if(arr[j] > arr[j+1]) {
						temp = arr[j];
						arr[j] = arr[j+1];
						arr[j+1] = temp;
					}
				}
			}
			return arr;
		},
		BubbleSort5: function(arr) {
			var n = arr.length;
			var temp = null;
			var flag = false;
			for(var i = 0; i < n-1; i++) {
				for(var j = 0; j < n-i-1; j++) {
					if(arr[j] > arr[j+1]) {
						temp = arr[j];
						arr[j] = arr[j+1];
						arr[j+1] = temp;
						flag = true;
					}
				}
				if(flag) {
					flag = false;
				}else {
					break;
				}
			}
			return arr;
		},
		quickSort: function(arr) {
			var len = arr.length;
			if(len <= 1) {
				return arr;
			}
			var pIndex = Math.floor(len/2);
			var pivot = arr.splice(pIndex,1);
			var left = [];
			var right = [];
			for(var i = 0; i < len; i++) {
				// 小于基准数就放在L数组中
				if(arr[i] < pivot[0]) {
					left.push(arr[i]);
				}else {
					right.push(arr[i]);
				}
			}
			return this.quickSort(left).concat(pivot, quickSort(right));
		},
		insertSort: function(arr) {
			var temp = null;
			for(var i = 1; i < arr.length; i++){
				if(arr[i] < arr[i-1]) {
					temp = arr[i];
					var p = i-1;
					while(temp < arr[p] && p >=0) {
						arr[p+1] = arr[p];
						p--;
					}
					arr[p+1] = temp;
				}
			}
			return arr;
		}
	}
	function addDivDelEvent() {
		for(var cur = 0; cur < container.childNodes.length; cur++) {
			addEvent(container.childNodes[cur], "click",function(cur) {
				return function() {return queue.deleteID(cur)};
			}(cur));
		}
	}
	addEvent(buttonList[0],"click",function() {
		var input = $("#num-input").value;
		if((/^[0-9]+$/).test(input)) {
			queue.leftPush(input);
		}else {
			alert("Please enter an interger between 10 and 100!");
		}
	});
	addEvent(buttonList[2],"click", function() {
		var input = $("#num-input").value;
		if((/^[0-9]+$/).test(input)) {
			queue.rightPush(input);
		} else {
			alert("Please enter an interger between 10 and 100!");
		}
	});
	addEvent(buttonList[1], "click", function() {queue.leftPop()});
	addEvent(buttonList[3], "click", function() {queue.rightPop()});
	addEvent(buttonList[4], "click", function() {queue.quickSort()});
}