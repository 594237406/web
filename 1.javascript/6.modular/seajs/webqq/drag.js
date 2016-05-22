define(function(require, exports,module){	//参数不允许修改

	function Drag(obj){
		var _this=this;
		this.drag=obj;
		this.disX=0;										//鼠标位置与div边距
		this.disY=0;										//鼠标位置与div边距
		this.zIndex=getStyle(this.drag,"zIndex");			//层级
		this.drag.onmousedown=function(ev){
			_this.onMouseDown(ev);
		};
		
		this.onMouseDown=function(ev){
			var _this=this;
			this.zIndex++;
			this.drag.style.zIndex=this.zIndex;
			console.log(this.drag.style.zIndex);
			
			var e=ev||event;
			this.disX=e.clientX-this.drag.offsetLeft;	
			this.disY=e.clientY-this.drag.offsetTop;
			
			//如果换成drag,则移出时不移动
			document.onmousemove=function(ev){
				_this.onMouseMove(ev);
			};
			
			document.onmouseup=function(ev){
				_this.onMouseUp(ev);
			};
			
			return false;	//阻止默认行为，解决火狐二次拖拽bug
		};
		
		this.onMouseMove=function(ev){
			var e=ev||event;
			var l=e.clientX-this.disX;
			var t=e.clientY-this.disY;
			var scale=require("./scale.js");
			
			l=scale.scale(l,document.documentElement.clientWidth-_this.drag.offsetWidth,0);
			t=scale.scale(t,document.documentElement.clientHeight-_this.drag.offsetHeight,0);
			
			_this.drag.style.left=l+"px";
			_this.drag.style.top=t+"px";
		};

		this.onMouseUp=function(ev){
			document.onmousemove=null;
			document.onmouseup=null;
		};
	}
	




	function getStyle(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr];
		} else {
			return getComputedStyle(obj, false)[attr];
		}
	}
	
	exports.Drag=Drag;
});