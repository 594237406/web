
//选择器
function vQuery(vAttr){
	//用来保存选中的元素
	this.elements=[];
	
	switch(typeof vAttr){
		case "function":
			addEvent(window,'load',vAttr);
			break;
		case 'string':
			switch(vAttr.charAt(0)){
				case '#':	//ID
					var obj=document.getElementById(vAttr.substring(1));
					this.elements.push(obj);
					break;
				case '.':	//class
					this.elements=getByClass(document, vAttr.substring(1));
					break;
				default:	//tagName
					this.elements=document.getElementsByTagName(vAttr);
			}
			break;
		case 'object':
			this.elements.push(vAttr);
		default:
			break;
	}
	
}

function addEvent(obj,sEv,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+sEv, function (){
			fn.call(obj);
		});
	}else{
		obj.addEventListener(sEv,fn,false);
	}
}

function getByClass(oParent, sClass){
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	
	for(i=0;i<aEle.length;i++){
		if(aEle[i].className==sClass){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj, false)[attr];
	}
}

vQuery.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		addEvent(element, 'click', fn);
	}
}

vQuery.prototype.show=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		element.style.display="block";
	}
}

vQuery.prototype.hide=function(fn){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		element.style.display="none";
	}
}

vQuery.prototype.hover=function(fnOver,fnOut){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		addEvent(element, 'mouseover', fnOver);
		addEvent(element, 'mouseout', fnOut);
	}
}

vQuery.prototype.css=function(attr,value){
	if(arguments.length==2){
		for(var i=0;i<this.elements.length;i++){
			var element=this.elements[i];
			element.style[attr]=value;
		}
	}else{
		return getStyle(this.elements[0], attr);
	}
}

function $(vAttr){
	return new vQuery(vAttr);
}