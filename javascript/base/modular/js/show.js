define(function(require, exports,module){	//参数不允许修改
	//module.id 路径
	//module.dependencies 依赖数组
	//module.exports exports引用module.exports，exports只能添加属性，不能修改属性
//	console.log(module.id);
//	console.log(module.dependencies);
	
	//返回依赖模块对象的exports属性
	var hide=require("./hide.js");
	var show2=require("./hide.js").show;
	require("./module.js");
	//异步加载
	//require.async("./module.js",function(){alert("加载完毕");});
	//module.load('b', function(b) {alert("加载完毕");});
	
	function show(){
		alert(show1);
		alert(show2);
		hide.hide();
	}
	
	//exports:对外提供接口对象
	exports.show=show;
	
	//可以修改属性
	//module.exports={show:show}
});