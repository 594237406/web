define(function(require, exports,module){
	
	function resize(obj1,obj2){
		
		obj2.onmousedown=function(){
			var w=obj2.offsetWidth;
			var h=obj2.offsetHeight;
			var l=obj1.offsetLeft;
			var t=obj1.offsetTop;
			
			document.onmousemove=function(e){
				var scale=require("./scale.js");
				var W=e.clientX-l+w;
				var H=e.clientY-t+h;
				
				W=scale.scale(W,500,100);
				H=scale.scale(H,500,100);
				obj1.style.width=W+"px";
				obj1.style.height=H+"px";
			};
			
			document.onmouseup=function(e){
				document.onmousemove=null;
				document.onmouseup=null;
			};
		};
	}
	
	exports.resize=resize;
	
});