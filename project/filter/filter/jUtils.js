//选择器
function JUtils(vArg)
{
	//用来保存选中的元素
	this.elements=[];
	
	switch(typeof vArg)
	{
		case 'function':
			addEventAction(window, 'load', vArg);
			break;
		case 'string':
			switch(vArg.charAt(0))
			{
				case '#':	//ID
					var obj=document.getElementById(vArg.substring(1));
					
					this.elements.push(obj);
					break;
				case '.':	//class
					this.elements=getByClass(document, vArg.substring(1));
					break;
				default:	//tagName
					this.elements=document.getElementsByTagName(vArg);
			}
			break;
		case 'object':
			this.elements.push(vArg);
	}
}

//添加方法
JUtils.prototype.extend=function (name, fn)
{
	JUtils.prototype[name]=fn;
};

//实例化对象
function $(vArg){
	return new JUtils(vArg);
}

JUtils.prototype.click=function (fn)
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		addEventAction(this.elements[i], 'click', fn);
	}
	
	return this;
};

JUtils.prototype.dblclick=function (fn)
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		addEventAction(this.elements[i], 'dblclick', fn);
	}
	
	return this;
};


JUtils.prototype.show=function ()
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='block';
	}
	
	return this;
};

JUtils.prototype.hide=function ()
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		this.elements[i].style.display='none';
	}
	
	return this;
};

JUtils.prototype.hover=function (fnOver, fnOut)
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		addEventAction(this.elements[i], 'mouseover', fnOver);
		addEventAction(this.elements[i], 'mouseout', fnOut);
	}
	
	return this;
};

JUtils.prototype.css=function (attr, value)
{
	if(arguments.length==2)	//设置样式
	{
		var i=0;
		
		for(i=0;i<this.elements.length;i++)
		{
			this.elements[i].style[attr]=value;
		}
	}
	else	//获取样式
	{
		if(typeof attr=='string')
		{
		//return this.elements[0].style[attr];
			return getStyle(this.elements[0], attr);
		}
		else
		{
			for(i=0;i<this.elements.length;i++)
			{
				var k='';
				
				for(k in attr)
				{
					this.elements[i].style[k]=attr[k];
				}
			}
		}
	}
	
	return this;
};

JUtils.prototype.attr=function (attr, value)
{
	if(arguments.length==2)
	{
		var i=0;
		
		for(i=0;i<this.elements.length;i++)
		{
			this.elements[i][attr]=value;
		}
	}
	else
	{
		return this.elements[0][attr];
	}
	
	return this;
};

JUtils.prototype.toggle=function ()
{
	var i=0;
	var _arguments=arguments;
	
	for(i=0;i<this.elements.length;i++)
	{
		addToggle(this.elements[i]);
	}
	
	function addToggle(obj)
	{
		var count=0;
		addEventAction(obj, 'click', function (){
			_arguments[count++%_arguments.length].call(obj);
		});
	}
	
	return this;
};

JUtils.prototype.eq=function (n)
{
	return $(this.elements[n]);
};

function appendArr(arr1, arr2)
{
	var i=0;
	
	for(i=0;i<arr2.length;i++)
	{
		arr1.push(arr2[i]);
	}
}

JUtils.prototype.find=function (str)
{
	var i=0;
	var aResult=[];
	
	for(i=0;i<this.elements.length;i++)
	{
		switch(str.charAt(0))
		{
			case '.':	//class
				var aEle=getByClass(this.elements[i], str.substring(1));
				aResult=aResult.concat(aEle);
				break;
			default:	//标签
				var aEle=this.elements[i].getElementsByTagName(str);
				appendArr(aResult, aEle);
		}
	}
	
	var newVquery=$();
	
	newVquery.elements=aResult;
	
	return newVquery;
};

function getIndex(obj)
{
	var aBrother=obj.parentNode.children;
	var i=0;
	
	for(i=0;i<aBrother.length;i++)
	{
		if(aBrother[i]==obj)
		{
			return i;
		}
	}
}

JUtils.prototype.index=function ()
{
	return getIndex(this.elements[0]);
};

JUtils.prototype.bind=function (sEv, fn)
{
	var i=0;
	
	for(i=0;i<this.elements.length;i++)
	{
		addEventAction(this.elements[i], sEv, fn);
	}
};

//计算元素左边距
JUtils.prototype.extend('getPoint',function() { 
	//获取某元素浏览器左上角原点坐标    
	var t =0;	
	var l =0;
	
	var element=this.elements[0];
	if(element){
		t = element.offsetTop; //获取该元素对应父容器上边距    
		l = element.offsetLeft; //对应父容器上边距  
		//判断否有父容器存则累加其边距    
		while (element = element.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined) 
			t += element.offsetTop; //叠加父容器上边距       
			l += element.offsetLeft; //叠加父容器左边距    
		}
	}
	return {top:t,left:l};
})

function addEventAction(obj, sEv, fn)
{
	if(obj&&obj.attachEvent)
	{
		obj.attachEvent('on'+sEv, function (){
			if(false==fn.call(obj))
			{
				event.cancelBubble=true;
				return false;
			}
		});
	}
	else
	{
		obj.addEventListener(sEv, function (ev){
			if(false==fn.call(obj))
			{
				ev.cancelBubble=true;
				ev.preventDefault();
			}
		}, false);
	}

}

function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var i=0;
	
	for(i=0;i<aEle.length;i++)
	{
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);
		}
	}
	
	return aResult;
}

function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

//创建标签
function createPanel(data) {
	var panel = document.createElement(data.tagName);
	if (data.className)
		panel.className = data.className;
	if (data.id)
		panel.id = data.id;
	if (data.name)
		panel.name = data.name;
	if (data.html)
		panel.innerHTML = data.html;
	if (data.src)
		panel.src = data.src;
	if (data.src)
		panel.type = data.type;
	if (data.data)
		panel.data = data.data;
	if (data.value)
		panel.value = data.value;
	if (data.regex)
		panel.regex = data.regex;
	if (data.msg)
		panel.msg = data.msg;
	if (data.title)
		panel.title = data.title;
	return panel;
}

var Tags={
	div:"div",
	span:"span",
	img:"img"
}

var Styles={
	marginLeft:"marginLeft",
	paddingLeft:"paddingLeft",
	marginTop:"marginTop",
	background:"background",
	width:"width"
}

var Strs={
	id:"#",
	cls:"."
}

var NodeType={
	start:"start",
	end:"end",
	filter:"filter",
	filter1:"filter1"
}