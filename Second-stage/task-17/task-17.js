/*
//数据格式示例
var aqiSourceData = {
	"北京" : {
		"2016-01-01": 10,
		"2016-01-01": 10,
		"2016-01-01": 10,
		"2016-01-01": 10
	}
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDataStr(dat) {
	var y = dat.getFullYear();
	var m = dat.getFullYear() + 1;
	m = m < 10 ? '0' + m : m;
	var d = dat.getDate();
	d = d < 10 ? '0' + d : d;
	return y + '-' + 'm' + '-' + d;
}

function randomBuildData(seed) {
	var returnData = {};
	var dat = new Date("2016-01-01");
	var datStr = '';
	// why 92 ?
	for (var i = 1; i < 92; i++) {
		dataStr = getDataStr(dat);
		returnData[dataStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	}
	return returnData;
}

var aqiSourceData = {
	"北京": randomBuildData(300),
	"上海": randomBuildData(300),
	"广州": randomBuildData(200),
	"深圳": randomBuildData(100),
	"成都": randomBuildData(300),
	"杭州": randomBuildData(400)
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
	nowSelectCity: -1,
	nowGraTime: "day"
}
// console.log(pageState.nowGraTime);
/*
渲染图表
*/
function renderChart() {

}

/*
日周月 radio事件点击时的处理函数
*/
function graTimeChange() {
	// 确定是否选项发生了变化
	var radios = document.getElementsByName("gra-time");
	// console.log(radios);
	for (var i = 0; i < radios.length; i++) {
		if(radios[i].checked)
		{
			// console.log(radios[i].value);
			// var checkedTime = radios[i].value;
			pageState.nowGraTime = radios[i].value;
			console.log(pageState.nowGraTime);
		}
	}
	// 设置对应数据
	/*if(pageState.nowGraTime == "day") {

	}else if (pageState.nowGraTime =="week") {

	}else {

	}*/

	// 调用图表渲染函数
	// renderChart();
}

/*
select 发生变化时的处理函数
*/
function citySelectChange() {
	// 确定选项是否发生了改变
	// console.log("change");
	var cityContent = document.getElementById("city-select");
	// console.log(cityContent);
	var allOption = cityContent.getElementsByTagName("option");
	console.log(allOption.length);
	for(var i = 0; i < allOption.length; i++) {
		if(allOption[i].selected = "selected") {
			console.log(allOption[i]);
			// pageState.nowSelectCity = allOption[i];

	}

	// 设置对应数据

	// 调用图表渲染函数
	renderChart();
}

/*
初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
*/
/*function initGraTimeForm() {
	document.getElementsByName("gra-time").addEventListener("click", graTimeChange);
}
*/
/*
初始化城市Select下拉选择框中的选项
*/

function initCitySelector() {
	// 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var addOption = "";
	for (var x in aqiSourceData) {
		addOption+="<option value='" +x+ "'> "+ x +" </option>";
		// console.log(addOption);
		document.getElementById("city-select").innerHTML = addOption;
		
	}
	// 给select设置事件，当选项发生变化时调用函数citySelectChange
	document.getElementById("city-select").addEventListener("change", citySelectChange);
}

/*
初始化图表需要的数据格式
*/
function initAqiChartData() {
	// 将原始的源数据处理成图表需要的数据格式

	// 处理好的数据存到chartData中
}

/*
初始化函数
*/
function init() {
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
}

init();
/*// graTimeChange();
initCitySelector();*/