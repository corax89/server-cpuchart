function EasyCharts() {
	this.pointArray = [];
	this.lineColor;
	this.stringColor;
	this.el;

	function init(el) {
		this.el = el;
		this.lineColor = '#3498db';
		this.stringColor = '#3498db';
	}

	function redraw() {
		var a = this.pointArray;
		var l = this.el.offsetWidth / (a.length - 1);
		var p = this.el.offsetHeight / 120;
		var s = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + this.el.offsetWidth + ' ' + this.el.offsetHeight + '">';
		s += '<text x="' + (this.el.offsetWidth - 5) + '" y="' + this.el.offsetHeight / 2 + '" text-anchor="end" style="stroke:' + this.stringColor + ';">' + a[a.length - 1] + ' %</text>';
		for(var i = 1; i < a.length; i++)
			s += '<line x1="' + i * l + '" y1="' + (110 - a[i]) * p + '" x2="' + (i - 1) * l + '" y2="' + (110 - a[i - 1]) * p + '" style="stroke:' + this.lineColor + ';stroke-width:2" />';
		s += '</svg>';
		this.el.innerHTML = s;
	}
	return {
		init: init,
		redraw: redraw
	};
}
//var easyCharts = new EasyCharts();