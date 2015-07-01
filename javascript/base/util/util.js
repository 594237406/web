function ArrayList(){
	this.arr=new Array();
	this.size=0;
	
	this.add=function(obj){
		this.arr[this.size]=obj;
		++this.size;
	}
	
	this.get=function(idx){
		if(idx<0||idx>=this.size)
		{
			alert("ArrayList: ADD > index out of bounds");
			return null;
		}
		return this.arr[idx];
	}
	
	this.set=function(idx,node){
		if(idx<0||idx>=this.size)
		{
			alert("ArrayList: SET > index out of bounds");
			return null;
		}
		this.arr[idx]=node;
	}
	
	this.rmId=function(idx){
		if(idx<0||idx>=this.size)
		{
			alert("ArrayList: RMID > index out of bounds");
			return null;
		}
		var num=parseInt(idx);
		if(num!=idx)
		{
			alert("ArrayList: RM > index not a number");
			return null;
		}
		var res=this.arr[idx];
		for(var i=idx;i<this.size-1;++i)
		{
			this.arr[i]=this.arr[i+1];
		}
		this.arr[this.size-1]=null;
		return res;
	}
	
	this.rm=function(obj){
		
		for(var i=0;i<this.size;++i)
		{
			
			if(this.arr[i]==obj)
			{
				 return this.rmId(i);
			}
		}
		return null;
	}
	
	this.show=function(){
		var str="";
		for(var i=0;i<this.size;++i)
		{
			str+=this.arr[i]+"\r\n";
		}
		alert(str+"size="+this.size);
	}
}

function LinkList(){  
    this.x=[]; 
    this.y=[]; 
} 
LinkList.prototype={ 
    removeLast:function(){  
        var x=this.x.pop(); 
        var y=this.y.pop(); 
        return [x,y]; 
    }, 
    addFirst:function(ret){ 
        var x=[ret[0]]; 
        var y=[ret[1]]; 
        this.x=x.concat(this.x); 
        this.y=y.concat(this.y); 
    }, 
    getFirst:function(){ 
        return [this.x[0],this.y[0]]; 
    }, 
    addLast:function(ret){ 
        this.x.push(ret[0]); 
        this.y.push(ret[1]); 
    }, 
    getLen:function(){ 
        return this.x.length; 
    } 
} 

function toJSON(string) {
	return JSON?JSON.parse(string):eval('('+jsonStr+')');
}	



function getInnerText(element) {
	return (typeof element.textContent == "string") ? element.textContent: element.innerText;
}

function setInnerText(element, text) {
	if (typeof element.textContent == "string") {
		element.textContent = text;
	} else {
		element.innerText = text;
	}
}



function contains(refNode, otherNode) {
    if (typeof refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)) {
        return refNode.contains(otherNode);
    } else if (typeof refNode.compareDocumentPosition == "function") {
        return !! (refNode.compareDocumentPosition(otherNode) & 16);
    } else {
        var node = otherNode.parentNode;
        do {
            if (node === refNode) {
                return true;
            } else {
                node = node.parentNode;
            }
        } while ( node !== null );
        return false;
    }
}

function removeClass(element, removeClassName) {
	var classNames = element.className.split(/\s+/);
	// 找到要删的类名
	var pos = -1, i, len;
	for (i = 0, len = classNames.length; i < len; i++) {
		if (classNames[i] == removeClassName) {
			pos = i;
			break;
		}
	}
	// 删除类名
	classNames.splice(i, 1);
	// 把剩下的类名拼成字符串并重新设置
	element.className = classNames.join(" ");
}


function outputAttributes(element) {
    var pairs = new Array(),
    attrName,
    attrValue,
    i,
    len;
    for (i = 0, len = element.attributes.length; i < len; i++) {
        attrName = element.attributes[i].nodeName;
        attrValue = element.attributes[i].nodeValue;
        if (element.attributes[i].specified) {
            pairs.push(attrName + "=\"" + attrValue + "\"");
        }
    }
    return pairs.join(" ");
}

function htmlEscape(text){
	return text.replace(/[<>"&]/g, function(match, pos, originalText){
		switch(match){
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "\"":
				return "&quot;";
		}
	});
}

function hasPrototypeProperty(object, name){
	return !object.hasOwnProperty(name) && (name in object);
}

String.prototype.startsWith = function (text) {
	return this.indexOf(text) == 0;
}



function inheritPrototype(subType, superType){
	function object(o){
		function F(){}
		F.prototype = o;
		return new F();
	}
	var prototype = object(superType.prototype); // 创建对象
	prototype.constructor = subType; // 增强对象
	subType.prototype = prototype;
}

// 检测插件（在IE 中无效）
function hasPlugin(name){
	name = name.toLowerCase();
	for (var i=0; i < navigator.plugins.length; i++){
		if (navigator. plugins [i].name.toLowerCase().indexOf(name) > -1){
			return true;
		}
	}
	return false;
}

function convertToArray(nodes) {
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes, 0); //针对非IE 浏览器
    } catch(ex) {
        array = new Array();
        for (var i = 0,
        len = nodes.length; i < len; i++) {
            array.push(nodes[i]);
        }
    }
    return array;
}





/**
 * 解析url获得参数对象
 */
function getParams(){
	var url = location.search,
		Params = {},
		params = [];

	if (url.indexOf('?') != -1) {
		params = url.substr(1).split('&');
		for (var i = params.length; i--;) {
			var kv = params[i].split('='),
				k = kv[0],
				v = kv[1];

			Params[k] = unescape(v);
		}
	}

	return Params;
}

/**
 * string模板方法
 */
function stringTemplate(str,data,regexp){
	return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
		return (data[name] === undefined) ? '' : data[name];
	});
}

/**
 * 继承方法
 */
function deepmix(target,source){
	var args=[].slice.call(arguments),i=1,key,
	ride=typeof args[args.length-1]=="boolean"?args.pop():true;
	if(args.length===1){
		target=!this.window?this:{};
		i=0;
	}

	while((source=args[i++])){
		for(key in source)
			if(ride||(key in target)){
				target[key]=source[key];
			}
	}
}

Date.prototype.format = function(fmt) {
	var o = {
			'M+': this.getMonth() + 1, //月份
			'd+': this.getDate(), //日
			'h+': this.getHours(), //小时
			'm+': this.getMinutes(), //分
			's+': this.getSeconds(), //秒
			'q+': Math.floor((this.getMonth() + 3) / 3), //季度
			'S': this.getMilliseconds() //毫秒
		},
		k;
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
		}
	}
	return fmt;
};

function initDataPicker(selector){
	var $starttime = $(selector); //基准时间左边界控件
	var options = {
		language: 'zh-CN',
		format: 'yyyy-mm-dd',
		weekStart: 1,
	    autoclose: 1,
	    todayHighlight: 1,
	    startView: 2,
	    minView: 2,
	    forceParse: 0,
	    showMeridian: 1
	};
    $starttime.datetimepicker(options).on('changeDate', function(ev) {
        var ed = new Date(ev.date.getTime() - 8 * 60 * 60 * 1000);
    });
}

/**
 * 解析url获得参数对象
 */
function getParams() {
    var url = location.search,
        Params = {},
        params = [];

    if (url.indexOf('?') != -1) {
        params = url.substr(1).split('&');
        for (var i = params.length; i--;) {
            var kv = params[i].split('='),
                k = kv[0],
                v = kv[1];

            Params[k] = unescape(v);
        }
    }

    return Params;
}

function initUrl(o){
    var url=[];
    for(var i in o){
        var val=o[i];
        url.push(i+"="+val);
    }
    return url.join("&")
}

function extend(Parent,Expand){
    var Child=function(){
        Parent.call(this);
    }
    Child.prototype=new Parent();

    this.mix(Child.prototype,Expand);

    Child.prototype.constructor = Child;
    return Child;
}

function mix(r, s) {
    if(!r)r={};
    for ( var k in s) {
        if (s.hasOwnProperty(k)) {
            r[k] = s[k];
        }
    }
}

function isJson(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
    return isjson;
}