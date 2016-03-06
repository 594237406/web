;(function(w,undefined){
	
	
	var Base=Class.extend({
		events:{},
		init : function(config) {
		
			if(_U.isNullArray(arguments)){
				alert("请传入组件配置信息");
				return;
			}
			customConfig=arguments[0];
		
			try{
				this.container=document.querySelector(customConfig.container);
			}catch(e){
				alert("选择器传入语法错误");
				return;
			}finally{
				var c=this.container;
				if(!c||c===document.body||c===document.head){
					alert("未能找到正确的容器");
					return;
				}
			}
			
			//自动保存配置项
			var config={
				width:"",
				height:"",
				container:"",
				mountEvent:_E.EV.MOUNTTYPE.PROXY,
				data:{title:"标题",content:"内容"}
			};
			
			_U.extend(config,customConfig);
			this.config = config;				//加载配置信息
			
			this.data = config.data;			//加载数据信息
			
			this.layout();
			this.dispatchEvent();				//事件派发方法
			this.render();						//绘制方法
		},
		//可以使用get来获取配置项
		get : function(key) {
			return this.config[key];
		},
		//可以使用set来设置配置项
		set : function(key, value) {
			this.config[key] = value;
		},
		dispatchEvent : function() {},
		layout : function(){},
		render : function() {},
		//定义销毁的方法，一些收尾工作都应该在这里
		destroy : function() {}
	})
	
//	function Base(){
//		//container			//控制器：最外层父元素
//		//config			//配置信息：需继承init参数
//		
//		//dom,get,set方法		//获取dom元素方法
//		//init方法			//初始化配置、绘制等
//		
//		
//		
//		//stylus			//样式控制器
//		//layout			//布局控制器
//		
//		/*
//		 * 子类实现
//		 * */
//		//eventHandler		//事件集合：代理到父元素
//		//eventProxy		//事件代理
//		//dispatchEvent		//事件派发方法
//		
//		//data				//数据集合，获取数据集合后调用绘制方法，更改数据集合调用绘制方法，m层
//		//controller		//控制器：c层
//		//render			//绘制方法：v层
//		//destroy方法			//销毁方法，反绑定事件
//	}
	window.Base=Base;
})(window,undefined)