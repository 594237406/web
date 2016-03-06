define(function(require, exports,module){	//参数不允许修改
	
	var oInput=document.getElementById("input1");
	var oPupup=document.getElementById("popup");
	var oResize=document.getElementById("resize");
	var oMove=document.getElementById("move");
	
	var drag=require("./drag.js");
	
	drag.Drag(oMove);
	
	var resize=require("./resize.js");
	
	resize.resize(oPupup,oResize);
});