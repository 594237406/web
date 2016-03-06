

define('aaa', 	
	function(require, exports, module) {

	var Util=function(a, b){ return a + b; };


	module.exports = Util;
	module.exports.do1=function(){
		alert("do");
	};
});