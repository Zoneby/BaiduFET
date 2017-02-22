var queue={};
var numberList = document.getElementById("number-list");

// 获得input输入框的值

function leftIn () {
	var inputValue = document.getElementById("number-input").value;
	console.log(inputValue);
	var li = document.createElement("li");
	var textnode = document.createTextNode(inputValue);
	li.appendChild(textnode);
	numberList.insertBefore(li, numberList.childNodes[0]);
	console.log(li);
}
function leftOut() {
	window.alert(numberList.childNodes[0].innerText);
	numberList.removeChild(numberList.childNodes[0]);
}
function rightIn() {
	var inputValue = document.getElementById("number-input").value;
	console.log(inputValue);
	var li = document.createElement("li");
	var textnode = document.createTextNode(inputValue);
	li.appendChild(textnode);
	numberList.appendChild(li);
}
function rightOut() {
	var lastLi = numberList.lastChild;
	window.alert(lastLi.innerText);
	numberList.removeChild(lastLi);
}

function deleteLi() {
	numberList.removeChild(this);
}
function init() {

	document.getElementById("left-in").addEventListener("click", leftIn);
	/*var leftIn = document.getElementById("left-in");
	leftIn.onclick = leftIn;*/
	document.getElementById("left-out").addEventListener("click", leftOut);
	document.getElementById("right-in").addEventListener("click", rightIn);
	document.getElementById("right-out").addEventListener("click", rightOut);
	document.getElementsByTagName("li").addEventListener("click",deleteLi);
}
init();