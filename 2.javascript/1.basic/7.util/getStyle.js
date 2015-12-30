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


Object.prototype.getStyle=function(attr){
    if(this.nodeType==1){
        if(this.currentStyle){
            return obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(this, false)[attr];
        }
    }else{
        console.log("不是节点");
        return "";
    }
};