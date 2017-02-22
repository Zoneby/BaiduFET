// querySelector 返回文档中匹配指定CSS选择器的一个元素，仅仅返回匹配指定选择器的第一个元素
var $ = function (el) { return document.querySelector(el); };

var data = [];
/* map()方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
map()方法按照原始数组元素顺序依次处理元素
join()方法用于把数组中的所有元素转换为一个字符串
元素是通过指定的分隔符进行分割的
slice()方法可从已有的数组中返回选定的元素
slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分
slice()不会改变原始数组
call()方法在使用一个指定的this值和若干个指定的参数的前提下调用某个函数或方法
*/
// 渲染元素
function render() {
	$('#result').innerHTML =
		data.map(function(d) { return "<div>"+ d +"</div>";})
			.join('');
			console.log('1');
}

function deal(func, succ) {
	var args = [].slice.call(arguments, 2);
	return function(e) {
		try {
			var arg = args.map(function(item) {
				return typeof item === "function" ? item(e) : item;
			});
			var result = func.apply(data, arg);

			if(succ != null) {
				succ(result);
			}
		} catch (ex) {
			alert(ex.message);
		}
		render();
	};
}
//得到输入的数字值
function getInputValue() {
	var numStr = $('#number-input').value;
	console.log(numStr);
	if(!validate(numStr)) throw new Error('input error');
	return parseInt(numStr);
}
/*target事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素，文档或窗口
indexOf()方法返回某个指定的字符串值在字符串中首次出现的位置
*/

function getClickIndex(e) {
	var node = e.target;
	return [].indexOf.call(node.parentNode.children, node);
}
function validate(str) {
	return /^d+$/.test(str);
}

 //四个按钮及每个插入元素绑定事件
$('#left-in').onclick = deal([].unshift, null, getInputValue);
$('#right-in').onclick = deal([].push, null, getInputValue);
$('#left-out').onclick = deal([].shift, window.alert);
$('#right-out').onclick = deal([].pop, window.alert);
$('#result').onclick = deal([].splice, null, getClickIndex, 1);