var timer;
function move(object,target,speed,period){	
	if(!timer){
		timer=setInterval(function(){
			if(Math.abs(object.offsetLeft-target)<Math.abs(speed)){
				clearInterval(timer);
				object.style.left=target+"px";
			}else{
				object.style.left=object.offsetLeft+speed+"px";
			}
			document.title=object.offsetLeft;
		},period);
	}
}


function buffer(object,target,period){
	clearInterval(timer);
	var speed=0;
	if(!timer){
		timer=setInterval(function(){
			speed=(target-object.offsetLeft)/20;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(object.offsetLeft>=target){
				clearInterval(timer);
				object.style.left=target+"px";
			}else{
				object.style.left=object.offsetLeft+speed+"px";
			}
			document.title=object.offsetLeft;
		},period);
	}
}