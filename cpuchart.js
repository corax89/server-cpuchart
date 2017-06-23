var cpuLoadArray = [0, 0, 0];
var memoryLoadArray = [0, 0, 0];
var maxPlot = 25;
var updateTime = 3000;

function getInfo() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'ajaxinfo.php', true);
	xhr.send();
	xhr.onreadystatechange = function () {
		if(xhr.readyState != 4) return;
		if(xhr.status != 200) {
			// обработать ошибку
			document.getElementById('cpu').innerHTML = '<div id="error">Server error' + xhr.status + ': ' + xhr.statusText + '</div>';
			setTimeout(getInfo, updateTime);
		} else {
			updateAll(xhr.responseText);
			setTimeout(getInfo, updateTime);
		}
	}
}

function updateAll(jsn) {
	var info = JSON.parse(jsn);
	if(cpuLoadArray.length <= maxPlot) {
		if(!isNaN(info[0]['cpu']))
			cpuLoadArray.push(info[0]['cpu']);
	} else {
		if(!isNaN(info[0]['cpu'])) {
			for(var i = 1; i <= maxPlot; i++)
				cpuLoadArray[i - 1] = cpuLoadArray[i];
			cpuLoadArray[maxPlot] = info[0]['cpu'];
		}
	}
	easyChartsCpu.pointArray = cpuLoadArray;
	easyChartsCpu.redraw();
	var loadMem = Math.floor(info[1]['usage'] / info[1]['total'] * 1000) / 10;
	if(!isNaN(loadMem)) {
		if(memoryLoadArray.length <= maxPlot) {
			memoryLoadArray.push(loadMem);
		} else {
			for(var i = 1; i <= maxPlot; i++)
				memoryLoadArray[i - 1] = memoryLoadArray[i];
			memoryLoadArray[maxPlot] = loadMem;
		}
	}
	easyChartsMem.pointArray = memoryLoadArray;
	easyChartsMem.redraw();
	var driveUsage = '<b>All</b> ' + Math.floor(info[2]['total'] / (1024 * 1024)) / 1000 + ' <b>Gb, usage</b> ';
	driveUsage += Math.floor(info[2]['usage'] / (1024 * 1024)) / 1000 + ' <b>Gb</b>';
	driveInfo.innerHTML = driveUsage;
}
var easyChartsCpu = new EasyCharts();
var easyChartsMem = new EasyCharts();
easyChartsCpu.init(document.getElementById('cpu'));
easyChartsMem.init(document.getElementById('memory'));
var driveInfo = document.getElementById('drive');
getInfo();