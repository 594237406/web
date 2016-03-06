function getStyle(obj, attr){
	if(obj.currentStyle){
		//IE、Opera
		return obj.currentStyle[attr];
	}
	else{
		//FF、chrome、safari
		//第二个参数“伪类”,如:after
		return getComputedStyle(obj, false)[attr];
	}
}