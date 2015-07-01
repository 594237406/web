// JavaScript Document

function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var bBtn = true;
		
		for(var attr in json){
			
			var iCur = 0;
			if( attr == 'opacity'){
				iCur = Math.round(getStyle(obj,attr)*100);
			}
			else{
				iCur = parseInt(getStyle(obj,attr));
			}
			
			var iSpeed = (json[attr] - iCur)/7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if(iCur != json[attr]){
				bBtn = false;
			}
			
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity='+ (iCur+iSpeed) +')';
				obj.style.opacity = (iCur+iSpeed)/100;
			}
			else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			
			
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			if(fn){
				fn.call(obj);
			}
		}
		
	},30);
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}


function startMove1(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var bBtn = true;
		
		for(var attr in json){
			
			var iCur = 0;
			if( attr == 'opacity'){
				iCur = Math.round(getStyle(obj,attr)*100);
			}
			else{
				iCur = parseInt(getStyle(obj,attr));
			}
			
			var iSpeed = (json[attr] - iCur)/3;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			
			if(iCur != json[attr]){
				bBtn = false;
			}
			
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity='+ (iCur+iSpeed) +')';
				obj.style.opacity = (iCur+iSpeed)/100;
			}
			else{
				obj.style[attr] = iCur + iSpeed + 'px';
			}
			
			
		}
		
		if(bBtn){
			clearInterval(obj.timer);
			if(fn){
				fn.call(obj);
			}
		}
		
	},30);
}


function addClass(obj,sClass)
{
	var aClass=obj.className.split('');
	if(!aClass[0])
	{
		obj.className=sClass;
		return
	}
	for(var i=0;i<aClass.length;i++)
	{
		if(aClass[i]==sClass)
		{
			return;
		}
	}
	obj.className+=' '+sClass;
}

function getClass(obj,sClass)
{
	var aClass=obj.className.split(" ");
	for(var i=0;i<aClass.length;i++)
	{
		if(aClass[i]==sClass)
		{
			return true;
		}
	}
	return false;
}
function removeClass(obj,sClass){
	
	var aClass = obj.className.split(' ');
	if(!aClass[0])return;
	
	for(var i=0; i<aClass.length; i++){
		if(aClass[i]==sClass){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			return;
		}	
	}		
}


function getByClass(sClass,oParent){
		
		var parent = oParent || document;
		var aEles = parent.getElementsByTagName('*');
		var arr = [];
		
		for(var i=0; i<aEles.length; i++){
			
			var aClass = aEles[i].className.split(' ');
			
			for(var j=0; j<aClass.length; j++){
				if(aClass[j] == sClass){
				
					arr.push(aEles[i]);
					
				}	
			}
			
		}
		
		return arr;
		
	}

function vieH()
{
	return document.documentElement.clientHeight;
}

function vieW()
{
	return document.documentElement.clientWidth;
}


function scrollY()
{
	return document.body.scrollTop||document.documentElement.scrollTop;
}

function bindEvent(obj,events,fn)
{
	if(obj.addEventListener){
	   obj.addEventListener(events,fn,false);
	}
	else{
	   bj.attachEvent('on'+events,fn);
	}
}

function dows(obj)
{
	obj.onmousedown=function(ev)
	{
		if (obj.aaa == 2)
		{
			return;
		}
		
		var ev=ev||event;
		var iLeft=ev.clientX-obj.offsetLeft;
		var iTop=ev.clientY-obj.offsetTop;
			
		if(obj.setCapture)
		{
			obj.setCapture();
		}
		document.onmousemove=function(ev)
		{
			var ev=ev||event;
			var L=ev.clientX-iLeft;
			var T=ev.clientY-iTop;
			if(T<0)
			{
				T=0;
			}
			if(T>document.documentElement.clientHeight-obj.offsetHeight-28)
			{
				T=document.documentElement.clientHeight-obj.offsetHeight-28;
			}
			if(L<0)
			{
				L=0;
			}
			if(L>document.documentElement.clientWidth-obj.offsetWidth)
			{
				L=document.documentElement.clientWidth-obj.offsetWidth;
			}
			obj.style.left=L+'px';
			obj.style.top=T+'px';
		}
		document.onmouseup=function()
		{
			document.onmousemove=null;
			document.onmouseup=null;
			if(obj.releaseCapture)
			{
				obj.releaseCapture();
			}
		}

		return false;
	}
}

function setCookie(key,value,times)
	{
		var oDate=new Date();
		var iDate=oDate.getDate();
		document.cookie=key+'='+value+';expires'+iDate+times;
	}

	function getCookie(key)
	{
		var a=document.cookie.split('; ');
		for(var i=0;i<a.length;i++)
		{
			var t=a[i].split('=');
			if(key==t[0])
			{
				return t[1];
			}
		}
	}

	function removeCookie(key)
	{
		setCookie(key,'',-1);
	}
	


	function bindEvent(obj,events,fn){
	  if(obj.addEventListener){
			obj.addEventListener(events,fn,false);
		}
		else{
			obj.attachEvent('on'+events,function(){
				fn.call(obj);
			});
		}
	}
	function getD(itime)
	{
		if(itime<10)
		{
			return '0'+itime;
		}
		return ''+itime;
	}