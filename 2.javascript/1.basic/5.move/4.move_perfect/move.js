function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function move(obj, json,fnSuc){
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iStop=true;		//检测定时器是否应该停止
		
		for(var attr in json){
			var iTarget=json[attr];
			
			//取当前属性值
			var iCur=0;
			if(attr=='opacity')
			{
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}
			
			//计算速度
			var iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			//运动
			if(iCur!=iTarget){
				iStop=false;
			}
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		//停止
		if(iStop){
			clearInterval(obj.timer);
			if(fnSuc){
				fnSuc(obj);
			}
		}
	}, 30)
}
