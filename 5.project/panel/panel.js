;(function(w,undefined){
	with(_E.STYLE.DISPLAY){
		var dom={
			header:{
				display:BLOCK,
				buttons:{
					display:block,
					max:{display:block}
		
//		MAX:"max",MIN:"min",CLOSE:"close"}
			},
			content:{
				display:BLOCK
			}
		};
	}
	alert(dom)
	var Panel=Base.extend({
		events:{
			//"."
		},
		layout:function(){
			
//			with(_E.LAYOUT){
//				var display=STYLE.DISPLAY;
//				with(HEADER){
//					
//					var buttons={};
//					for(key in BUTTONS){
//						buttons[key]=
//					}
//					
//					var header={
//						display:"block",
//						buttons:{
//							BUTTONS["MAX"]:{display:display.BLOCK},
//							BUTTONS["MIN"]:{display:display.BLOCK}
//						}
//						
//					}
//				}
//				
//				with(CONTENT){
//					var content={
//						content:CONTENT
//					}
//				}
//				
//				
//				var dom={
//					header:header,
//					content:content
//				};
//				
//				alert(JSON.stringify(dom))
//			};
			
		},
		dispatchEvent : function() {
		},
		render : function() {},
		//定义销毁的方法，一些收尾工作都应该在这里
		destroy : function() {}
	});
	
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
	window.Panel=Panel;
})(window,undefined)

