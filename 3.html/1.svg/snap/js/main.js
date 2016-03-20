//SVG宽高
var svg = Snap("100%","100%");
$("body").append(svg.node);

//固定圆
var c1=svg.paper.circle(150,150,60);

//事件圆
var c2=svg.paper.el("circle", {
    cx: 250,
    cy: 150,
    r: 40,
    color:'red'
}).attr({
    fill: "#fc0",
    stroke: "#000",
    strokeWidth: 2,     // 驼峰命名...
    "fill-opacity": 0.5 // 或者短横符连接名称
}).click(function() {
    this.animate({
        fill: "#00f"    // 蓝色
    }, 1000);	
});

var t1 = svg.paper.text(150, 155, "拖拽我").attr({fill: "#fff", fontSize:20,textAnchor:'middle'});

var g = svg.paper.g(c1,t1).drag();


//var set = svg.selectAll("*");
////遍历填色
//set.forEach(function(element, index) {
//		 
//});