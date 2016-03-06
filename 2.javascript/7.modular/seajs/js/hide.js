define(function(require, exports,module){	//参数不允许修改
	
	var show="show_hide";
	function hide(){
		alert("hide");
	}
	
	exports.show=show;
	exports.hide=hide;
});