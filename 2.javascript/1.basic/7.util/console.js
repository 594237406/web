 /**
  *所有浏览器支持的浏览器控制台输出信息的方法
  */
if (!console) {
	var console = {}, func    = function () { return false; };
	console.log     = func;
	console.info    = func;
	console.warn    = func;
	console.error   = func;
}