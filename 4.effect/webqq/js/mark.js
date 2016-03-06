// JavaScript Document
window.onload=function()
{

	var oImg_m=document.getElementsByTagName('img');
	for(var i=0;i<oImg_m.length;i++){
		bindEvent(oImg_m[i],'mousedown',function(ev){
			var ev=ev||event;
			ev.preventDefault();
		})
	}
	/*----------- 桌面图标互换位置--------------*/
	var oCon=document.getElementById('web_content_cn');
	var oCon_ul=oCon.getElementsByTagName('ul');
	var aee=true;
	var rdd=false;
	var iNum1=140;
	var iNum2=117;
	var a=1;
	for(var i=0;i<oCon_ul.length;i++)
	{
		show(oCon_ul[i],a);
	}

	
	function show(oParent,a)
	{
		var arr = [];
		var num=0;
		var aLi=oParent.getElementsByTagName('li');
		function clientXt(a)
		{
			if(a)
			{
				var iCellCount = Math.floor(document.documentElement.clientHeight / iNum1);
				for(var i=0;i<aLi.length;i++)
				{
					var veiwW=document.documentElement.clientHeight;
					startMove(aLi[i],{top:iNum2 * (i%iCellCount),left:iNum2 * Math.floor(i/iCellCount)})
					arr.push( [ iNum2*(i%iCellCount),iNum2 * Math.floor(i/iCellCount) ] );
				}
			}
			else
			{
				var iCellCount = Math.floor(document.documentElement.clientWidth / 140);
				for(var i=0;i<aLi.length;i++)
				{
					var veiwW=document.documentElement.clientWidth;
					startMove(aLi[i],{top:iNum2 * Math.floor(i/iCellCount),left:iNum2* (i%iCellCount)})
					//alert(aLi[0].offsetWidth+28)
					arr.push( [iNum2 * Math.floor(i/iCellCount),iNum2 * (i%iCellCount) ] );	
				}
			}
		}
		clientXt(a);
		
		var iZindex = 2;
		for(var i=0;i<aLi.length;i++){
			aLi[i].attr = i;													
			drag( aLi[i] );
		}
		function drag(obj){
			var disX = 0;
			var disY = 0;

			obj.onmousedown = function(ev){
				var ev = ev || window.event;
				obj.style.zIndex = iZindex++;
				aee=true;
				disX = ev.clientX - obj.offsetLeft;
				disY = ev.clientY - obj.offsetTop;
				var iX=ev.clientX;
				var iY=ev.clientY;
				if(obj.setCapture)
				{
					obj.setCapture();
				}
				document.onmousemove = function(ev){
					var ev = ev || window.event;
					if(Math.abs(ev.clientX-iX)>5||Math.abs(ev.clientY-iY)>5)
					{
						aee=false;
					}
					obj.style.left = ev.clientX - disX + 'px';
					obj.style.top = ev.clientY - disY + 'px';					
				};
				document.onmouseup = function(){
					
					document.onmousemove = null;
					document.onmouseup = null;
					var nL = nearLi(obj);
					var tmp = '';
					if(nL){
						
						startMove(nL,{left : arr[obj.attr][1] , top : arr[obj.attr][0]});
						startMove(obj,{left : arr[nL.attr][1] , top : arr[nL.attr][0]});
						
						tmp = obj.attr;
						obj.attr = nL.attr;
						nL.attr = tmp;
						
					}
					else{
						
						startMove(obj,{left : arr[obj.attr][1] , top : arr[obj.attr][0]});
					}
					
					if(obj.releaseCapture)
					{
						obj.releaseCapture();
					}
				};
				return false;
			};
		}
		
		function nearLi(obj){
			
			var value = 9999;
			var index = -1;
			
			for(var i=0;i<aLi.length;i++){
				if( pz(obj,aLi[i]) && obj!=aLi[i] ){
					var c = jl(obj,aLi[i]);
					if(c<value){
						value = c;
						index = i;
					}
				}
			}
			
			if(index==-1){
				return false;
			}
			else{
				return aLi[index];
			}
			
		}
		
		function jl(obj1,obj2){
			var a = obj1.offsetLeft - obj2.offsetLeft;
			var b = obj1.offsetTop - obj2.offsetTop;
			return Math.sqrt(a*a + b*b);
		}
		
		function pz(obj1,obj2){
			var L1 = obj1.offsetLeft;
			var R1 = obj1.offsetLeft + obj1.offsetWidth;
			var T1 = obj1.offsetTop;
			var B1 = obj1.offsetTop + obj1.offsetHeight;
			
			var L2 = obj2.offsetLeft;
			var R2 = obj2.offsetLeft + obj2.offsetWidth;
			var T2 = obj2.offsetTop;
			var B2 = obj2.offsetTop + obj2.offsetHeight;
			
			if( L1 > R2 || R1<L2 || T1 > B2 || B1<T2 ){
				return false;
			}
			else{
				return true;
			}
			
		}//桌面菜单互换位置*/
	}

	bindEvent(window,'resize',function(){
	
		if(!rdd)
		{
			for(var i=0;i<oCon_ul.length;i++)
			{
				show(oCon_ul[i],a);
			}
		}
		else
		{
			for(var i=0;i<oCon_ul.length;i++)
			{
				show(oCon_ul[i]);
			}
		}
		
	});


	/*----------- 左侧菜单--------------*/
	
	var oMenu=document.getElementById('web_menu'); 
	var aImg=oMenu.getElementsByTagName('img');
	oMenu.onmouseover=function()
	{
		document.onmousemove = function(ev){
			
			var ev = ev || window.event;
			
			for(var i=0;i<aImg.length;i++){
				var x = aImg[i].offsetLeft + aImg[i].offsetWidth/2;
				var y = aImg[i].offsetTop + aImg[i].offsetHeight/2 + oMenu.offsetTop;
				
				var a = x - ev.clientX;
				var b = y - ev.clientY;
				
				var c = Math.sqrt(a*a + b*b);
				var scale = 0.8 - c/300;
				
				if(scale < 0.5){
					scale = 0.5;
				}
				
				aImg[i].style.width = scale * 68 + 'px';
				aImg[i].style.height = scale * 68 + 'px';
			}
			return false;
		};
	}
	var oFocus=document.getElementById('foucs1');
	var oFocus_li=oFocus.getElementsByTagName('li');
	var iWidth = oCon_ul[0].offsetWidth;
	var iOld = 0;
	var iOld1 = 0;
	for(var i=1;i<oCon_ul.length;i++){
		oCon_ul[i].style.left = -iWidth + 'px';
	}
	for(var i=0;i<oFocus_li.length;i++){
		oFocus_li[i].index = i;
		oFocus_li[i].onclick = function(){
			for(var i=0;i<oFocus_li.length;i++){
				oFocus_li[i].className = '';
			}
			this.className = 'active';
			if(this.index>iOld)
			{
				oCon_ul[this.index].style.left=-iWidth+'px';
				startMove(oCon_ul[iOld],{left:iWidth,opacity:0});
			}
			else if(this.index<iOld)
			{
				oCon_ul[this.index].style.left=iWidth+'px';
				startMove(oCon_ul[iOld],{left:-iWidth,opacity:0});
			}
			startMove(oCon_ul[this.index],{left:0,opacity:100});
			iOld = this.index;
		}
	}

	var bBtn = true;
	if(document.addEventListener)
	{
		document.addEventListener('DOMMouseScroll',show,false)
	}
	document.onmousewheel=showMove;
	function showMove(ev)
	{
		var ev = ev || window.event;
		
		if(ev.detail)
		{
			bBtn=ev.detail>0? true:false;
		}
		else
		{
			bBtn=ev.wheelDelta<0? true:false;
		}
		if(bBtn){ //下
			iOld--;
			if(iOld < 0)
			{
				iOld = oFocus_li.length-1;
			}

		}
		else{  //上
			iOld++;

			if(iOld >= oFocus_li.length)
			{
				iOld = 0;
			}
		}
	
		for(var i=0;i<oFocus_li.length;i++){
			oFocus_li[i].className = '';
			if(i<iOld){
				startMove(oCon_ul[i],{left:iWidth,opacity:0});	
			}
			else{
				startMove(oCon_ul[i],{left:-iWidth,opacity:0});	
			}
		}
		oFocus_li[iOld].className = 'active';
		startMove(oCon_ul[iOld],{left:0,opacity:100});
	}


	var oBox=document.getElementById('box1');
	var oBox1=document.getElementById('box2');
	var oP=oBox.getElementsByTagName('p')[0];
	var menu_f1=document.getElementById('menu_focus4');
	var menu_wiw=document.getElementById('web_box_wiw');
	var menu_wiw1=document.getElementById('web_box_wiw1');
	var oContent=document.getElementById('box_content');
	var menu_a=menu_wiw.getElementsByTagName('a');
	var menu_a1=menu_wiw1.getElementsByTagName('a')[0];
	var oSkin=document.getElementById('skin');
	var oIframe=oContent.getElementsByTagName('iframe')[0];
	var oCon_li=oCon.getElementsByTagName('li');
	var oMenu_li=oMenu.getElementsByTagName('li');
	var oWeb_topc=document.getElementById('web_top_c');
	var oTask=document.getElementById('task_main');
	var cdd=true;
	var iHttp=[
				'http://web.3366.com/ddz/','http://mgp.qq.com/webqqindex.html','http://qqbaby.qq.com/baby.html','tmll/index.html',
				'feixin/index.html','Well.html','http://www.4399.com/','http://www.mangocity.com/webqq/bookFlight.html',
				'http://kuaidi100.com/frame/app/index.html','http://kuaidi100.com/frame/app/index.html','http://www.bjbqdz.com/',
				'http://pan.baidu.com/','http://www.kuaipan.cn/','http://www.163.com','','','','','http://www.qidian.com/',
				'http://qqreader.qq.com/','http://play.baidu.com/?from=mp3','http://v.qq.com/','http://www.letv.com/',
				'http://www.pengyou.com','http://qqreader.qq.com/','http://id.qq.com/index.html',
				'http://k.ai/','http://webqq.kxjy.com'
			  ]
	var iHttp1=[
				 'http://web.qq.com/module/appmarket/appmarket.html','http://www.weiyun.com/index.html',
				 'http://mail.qq.com/cgi-bin/login','http://www.qq.com/','https://mail.qq.com/cgi-bin/loginpage',
				 'http://dev.t.qq.com/'			
			   ]
	for(var i=0;i<oCon_li.length;i++)
	{
		oCon_li[i].index=i;
		oCon_li[i].onclick=function()
		{
			oTask_x.style.display='none';
			oTask_x.style.width=0;
			if(aee)
			{
				openWin(this.title,iHttp[this.index]);
			}
		}
	}
	for(var i=0;i<oMenu_li.length;i++)
	{
		oMenu_li[i].index=i;
		oMenu_li[i].onclick=function()
		{
			openWin(this.title,iHttp1[this.index]);
		}
	}
	
		dows(oBox);
	
	oWeb_topc.onmouseup=function()
	{
		oWeb_topc.onmousedown=null;
		oWeb_topc.onmouseup=null;
	}
	function openWin(otitle,oSrc)  //弹出窗封装
	{
		clearInterval(oBox.timer);
		oBox.style.display='block';
		oBox.style.height=400+'px';
		oBox.style.width=800+'px';;
		oBox.style.opacity=1;
		oBox.style.filter = 'alpha(opacity=100)';
		oBox.style.left=(vieW()-oBox.offsetWidth)/2+'px';
		oBox.style.top=(vieH()-oBox.offsetHeight)/2+'px';
		oP.innerHTML=otitle;
		oIframe.src=oSrc;
	}

	bindEvent(window,'resize',function()  //弹出窗浏览器居中
	{
		if(oBox.style.display=='block')
		{
			oBox.style.left=(vieW()-oBox.offsetWidth)/2+'px';
			oBox.style.top=(vieH()-oBox.offsetHeight)/2+'px';
		}
	})
	menu_f1.onclick=function()
	{
		oBox1.style.display='block';
		oBox1.style.left=(vieW()-oBox1.offsetWidth)/2+'px';
		oBox1.style.top=(vieH()-oBox1.offsetHeight)/2+'px';
	}
	
	menu_a1.onclick=function()  //换肤关闭
	{
		oBox1.style.display='none';  
	}
	var iX1=0;
	var iY1=0;
	var iH1=0;
	menu_a[0].onclick=function()  
	{
		iX1=oBox.offsetTop;
		iH1=oBox.offsetHeight;
		iY1=oBox.offsetTop;
		var oTitle=document.getElementById('task_title1');
		oTitle.innerHTML=oP.innerHTML;
		oTask_x.style.display='block';
			startMove(oTask_x,{width:100})
		startMove(oBox,{height:0,opacity:0,top:oBox.offsetTop+oBox.offsetHeight})
	}
	menu_a[1].onclick=function()
	{
		startMove(oTask,{width:0},function(){
			oTask.style.display='none';
		})
	}
	var oTask_x=document.getElementById('task_x');
	menu_a[2].onclick=function()  // 弹出窗关闭
	{
		startMove(oBox,{height:0,opacity:0},function(){
			oBox.style.display='none';
		})
	}
	menu_a[1].onclick=function()  // 弹出窗放大缩小
	{
		if(cdd)
		{
			addClass(menu_a[1],'active');
			startMove(oBox,{left:0,top:0,width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});
			cdd=false;
			oBox.aaa = 2;
		}
		else
		{
			menu_a[1].className='';
			addClass(menu_a[1],'magnify');
			var T=parseInt(oBox.offsetTop+(oBox.offsetHeight-400)/2);
			if(T<0)
			{
				T=0;
			}
			startMove(oBox,{width:800,height:400,left:parseInt(oBox.offsetLeft+(oBox.offsetWidth-800)/2),top:T});
			cdd=true;
			oBox.aaa = 1;
		}
	}
	
	function Task_menu()
	{
		var oMenu=document.getElementById('task_main');
		var task_menu=document.getElementById('task_menu');
		var aA=oMenu.getElementsByTagName('a');
		aA[0].onclick=function()
		{
			startMove(oTask_x,{width:0},function(){oTask_x.style.display='none'})
			startMove(oBox,{top:iX1,height:iH1,top:iY1,opacity:100})
		}
		aA[1].onclick=function()
		{
			startMove(oTask_x,{width:0},function(){
				oTask_x.style.display='none';
			})
		}
		oMenu.onmouseover=function()
		{
			startMove(task_menu,{top:-30})
		}

		oMenu.onmouseout=function()
		{
			startMove(task_menu,{top:0})
		}
	}

	Task_menu();
	/*----------- 换肤--------------*/

	var oBg=document.getElementById('web_bg');
	if(getCookie('bg'))
	{
		oBg.src=getCookie('bg');
	}
	setInterval(function()
	{		
		var oSkin_cn=document.getElementById('skin_img');
		var aImg_cn=oSkin_cn.getElementsByTagName('img');
		for(var i=0;i<aImg_cn.length;i++)
		{
			aImg_cn[i].onclick=function()
			{
				oBg.src=this.src;
				setCookie('bg',this.src,5)
			}	
		}
	},1000)
	

	/*-----------css3自制时钟---------*/

	var oDial=document.getElementById("dial");
	var oHour=document.getElementById("hour");
	var oMin=document.getElementById("min");
	var oSec=document.getElementById("sec");
	toDial(oDial);
	toTime(oHour,oMin,oSec);
	setInterval(function(){
		toTime(oHour,oMin,oSec);
	},1000)

function toTime(oHour,oMin,oSec)
{
	var oDate=new Date();
	var iHour=oDate.getHours();		
	var iMin=oDate.getMinutes();		
	var iSec=oDate.getSeconds();
	oSec.style.WebkitTransform="rotate("+(iSec*360/60)+"deg)";
	oMin.style.WebkitTransform="rotate("+(iMin*360/60)+"deg)";
	oHour.style.WebkitTransform="rotate("+(iHour*360/12)+"deg)";
}
	function toDial(obj)
	{
		var sHtml="";
		var iDeg=30;
		for(var i=0;i<12;i++)
		{
			sHtml+="<span style='-webkit-transform:rotate("+iDeg*i+"deg)'></span>"
		}
		obj.innerHTML=sHtml;
	}


	var oTitles=document.getElementById('web_titles');
	var oTitle_box=document.getElementById('title_box');
	dows(oTitles);
	// 时钟拖拽

	var str = window.navigator.userAgent.toLowerCase();
	if(str.indexOf('msie')!=-1||str.indexOf('firefox')!=-1||str.indexOf('opera')!=-1)
	{
		function timesa()
		{
			var oDate=new Date();			
			var iYear=oDate.getFullYear();		
			var iMonth=oDate.getMonth()+1;	
			var iDay=oDate.getDate();			
			var iWeek=oDate.getDay();		
			var iHour=oDate.getHours();		
			var iMin=oDate.getMinutes();		
			var iSec=oDate.getSeconds();
			var arr=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
			var Title_box=document.getElementById('title_box');
			Title_box.innerHTML=getD(iHour)+':'+getD(iMin)+':'+getD(iSec)+'<br/>'+arr[iWeek]+'<br/>'+iYear+'/'+iMonth+'/'+iDay;
		}
		timesa();
		oTitle_box.style.paddingTop="43px";
		oTitle_box.style.paddingLeft=0;
		oTitles.style.lineHeight='20px'
		setInterval(function(){timesa()},1000)
	}
	// IE版时钟

	/*-----------右键菜单---------*/

	var oTMenu=document.getElementById('text_menu');
	var oTMenu_ul=document.getElementById('text_menu_ul');
	var oTMenu_cn=oTMenu_ul.getElementsByTagName('ul');
	var oTMenu_li=oTMenu_ul.getElementsByTagName('li');
	var timesr=null;
	var iNum=0;
	document.oncontextmenu=function(ev)    
	{
		var ev=ev||event;
		oTMenu.style.left=ev.clientX+'px';
		oTMenu.style.top=ev.clientY+'px';
		oTMenu.style.display='block';
		startMove(oTMenu,{opacity:100});
		return false;
	}
	for(var i=0;i<oTMenu_li.length;i++)
	{
		oTMenu_li[i].index=i;
		oTMenu_li[i].onmouseover=function()
		{
			clearTimeout(this.timesr);
			var childUl=this.getElementsByTagName('ul')[0];
			if(childUl)
			{
				childUl.style.display='block';
							
				iNum=this.index;
			}
		}
		oTMenu_li[i].onmouseout=function()
		{
			var childUl=this.getElementsByTagName('ul')[0];
			if(childUl)
			{		
				
				this.timesr=setTimeout(function()
				{
					childUl.style.display='none';
				},300)
				
			}

		}		
	}

	for(var i=0;i<oTMenu_cn.length;i++)
	{
		oTMenu_cn[i].index = i;
		oTMenu_cn[i].onmouseover=function()
		{
			var Menuc=oTMenu_li[iNum].getElementsByTagName('ul')[0];
			clearTimeout(oTMenu_li[this.index].timesr);
		}
	}
	document.onclick=function()
	{
		startMove(oTMenu,{opacity:0})
	}
	
	/*-----------显示换肤---------*/

	var oTheme=document.getElementById('Theme');  
	oTheme.onclick=function()
	{
		oBox1.style.display='block';
		oBox1.style.left=(vieW()-oBox1.offsetWidth)/2+'px';
		oBox1.style.top=(vieH()-oBox1.offsetHeight)/2+'px';
	}


	var oMenu_bottom=document.getElementById('menu_bottom');
	var oCon_li=oCon.getElementsByTagName('li');
	oMenu_bottom.onclick=function()
	{
		for(var i=0;i<oCon_li.length;i++)
		{
			oCon_li[i].style.opacity=0;
			startMove(oCon_li[i],{opacity:100})
		}
	}

	/*-----------改变图片 纵向，横向坐标---------*/

	var cBut=document.getElementById('client_but');  
	var oBut_li=cBut.getElementsByTagName('li');
	var iNoc=0;
	var iNoc1=0;
	oBut_li[1].onclick=function()
	{
		rdd=false;
		for(var i=0;i<oCon_ul.length;i++)
		{
			show(oCon_ul[i],a);
		}
		oBut_li[0].className='';
		this.className='active';
		iNoc=this;
	}
	oBut_li[0].onclick=function()
	{
		rdd=true;
		for(var i=0;i<oCon_ul.length;i++)
		{
			show(oCon_ul[i],0);
		}
		oBut_li[1].className='';
		this.className='active';
		iNoc1=this;
	}
	
	/*-----------改变超大图标---------*/

	var iCon_but=document.getElementById('icon_but')
	var iCon_but_li=iCon_but.getElementsByTagName('li');
	var iCon_a=iCon_but.getElementsByTagName('a');
	iCon_but_li[2].onclick=function()   
	{
		for(var i=0;i<oCon_li.length;i++)
		{
			oCon_li[i].style.height='126px';
			oCon_li[i].style.width='128px';
			oCon_li[i].className='hover';
		}

		iNum1=171;
	    iNum2=147;
		if(this.className=='active')return;
		clientMove();

		for(var i=0;i<iCon_but_li.length;i++)
		{
			iCon_but_li[i].className='';
		}
		this.className='active';
	}
	
	/*-----------改变大图标---------*/

	iCon_but_li[1].onclick=function() 
	{
		for(var i=0;i<oCon_li.length;i++)
		{
			oCon_li[i].style.height='89px';
			oCon_li[i].style.width='89px';
			oCon_li[i].className='hover';
		}

		iNum1=140;
	    iNum2=117;
		if(this.className=='active')return;
		clientMove();

		for(var i=0;i<iCon_but_li.length;i++)
		{
			iCon_but_li[i].className='';
		}
		this.className='active';
	}

	/*-----------改变小图标---------*/

	iCon_but_li[0].onclick=function()   
	{
		for(var i=0;i<oCon_li.length;i++)
		{
			oCon_li[i].style.height='70px';
			oCon_li[i].style.width='70px';
			oCon_li[i].className='hover';
		}

		iNum1=111;
	    iNum2=78;
		if(this.className=='active')return;
		clientMove();

		for(var i=0;i<iCon_but_li.length;i++)
		{
			iCon_but_li[i].className='';
		}
		this.className='active';
	}

	/*-----------判断坐标函数---------*/

	function clientMove()    
	{
		if(oBut_li[0].className=='active')
		{
			for(var i=0;i<oCon_ul.length;i++)
			{
				show(oCon_ul[i],0);
			}
		}
		else if(oBut_li[1].className=='active')
		{
			for(var i=0;i<oCon_ul.length;i++)
			{
				show(oCon_ul[i],a);
			}
		}
	}

		
	var oShadw=document.getElementById('shadow_bg1');
	var oShadw_child=oShadw.getElementsByTagName('div');
	var oSpan=oShadw.getElementsByTagName('span')[0];
	var oFast_bg=document.getElementById('fast_bg');
	var acc=true;
	var zIndexc=0;
	var n=0;
	oShadw.onclick=function()
	{	

		for(var i=0;i<oShadw_child.length;i++)
		{
			oShadw_child[i].style.display='block'
		}
		if(acc)
		{
			zIndexc++;
			oShadw_child[0].style.height=0;
			oShadw_child[1].style.width=0;
			oShadw_child[2].style.height=0;
			oShadw_child[3].style.width=0;
			oFast_bg.style.display='block';
			oFast_bg.style.zIndex=1000;
			startMove1(oShadw,{right:parseInt(vieW()/2),top:300},function()
			{
					startMove1(oShadw_child[0],{height:187,opacity:100},function()
					{
						startMove1(oShadw_child[1],{width:305,opacity:100},function(){
							startMove1(oShadw_child[2],{height:190,opacity:100},function(){
								startMove1(oShadw_child[3],{width:301,opacity:100},function()
								{
									oSpan.style.display='block';
									acc=false;
								})
							})
						})	
					})	
			})
		}
	}

	oSpan.onclick=function(ev)
	{
		var ev=ev||event;
		oSpan.style.display='none';
		if(!acc)
		{
			ev.cancelBubble=true;
			startMove1(oShadw_child[3],{width:0,opacity:0},function()
			{
				startMove1(oShadw_child[2],{height:0,opacity:0},function(){
					startMove1(oShadw_child[1],{width:0,opacity:0},function(){
						startMove1(oShadw_child[0],{height:0,opacity:0},function(){
							startMove1(oShadw,{right:63,top:33})
							oFast_bg.style.display='none';
							acc=true;
							oFast_bg.style.zIndex=100;
						})
					})
				})	
			})
		}
	}

	var Weather=function()
	{
		
		var oWeather=document.getElementById('weather');
		var oWeather_s=document.getElementById('weather_s');
		var oWeather_t=document.getElementById('weather_t');
		var oTime=document.getElementById('weather_time');
		var oBut=document.getElementById('region_but');
		var aBut=oWeather.getElementsByTagName('input');
		var menu_but=document.getElementById('region_but');
		var oCity1=document.getElementById('city1');
		var oCity2=document.getElementById('city2');
		var oColse=document.getElementById('weatherc_close');
		dows(oWeather);  
		oCity1.onmousedown=oCity2.onmousedown=function(ev)
		{
			var ev=ev||event;
			ev.cancelBubble=true;
		}
		getTime();
		function showWeather()
		{
		
			oBut.innerHTML = city.name;

			
			var str='<strong>今天 : </strong>';
			if(city.tianqi[0] == city.tianqi[1])
			{
				str+=city.tianqi[0];
			}
			else
			{
				str+=city.tianqi[0]+'转'+city.tianqi[1];
			}
			str += ' ' + city.wendu[0] + '℃~' + city.wendu[1] + '℃';
			oWeather_s.innerHTML=str;

			var str1='<strong>明天 : </strong>';
			if(city.tianqim[0] == city.tianqim[1])
			{
				str1+=city.tianqim[0];
			}
			else
			{
				str1+=city.tianqim[0]+city.tianqim[1];
			}
			str1 +=' '+city.wendum[0] + '℃~' + city.wendum[1] + '℃';
			oWeather_t.innerHTML=str1;
		}
		
		function getTime()
		{
			var oDate=new Date();			
			var iYear=oDate.getFullYear();		
			var iMonth=oDate.getMonth()+1;	
			var iDay=oDate.getDate();			
			var iWeek=oDate.getDay();		
			var iHour=oDate.getHours();		
			var iMin=oDate.getMinutes();		
			var iSec=oDate.getSeconds();
			oTime.innerHTML='当前时间为'+getD(iHour)+':'+getD(iMin);
			
		}
		setInterval(function(){getTime()},1000)

		oBut.onclick=function()
		{
			oWeather.className = oWeather.className == 'weather' ? 'weather_bg' : 'weather';
		}

		aBut[1].onclick=function()
		{
			oWeather.className = 'weather';
		}
		aBut[0].onclick=function()
		{
			oWeather.className = 'weather';
			getWeather(oCity2.value);
		}
		for(var j in citymap)
		{
			var Ooption=document.createElement('option');
			Ooption.innerHTML=j;
			Ooption.value=j;
			oCity1.appendChild(Ooption);
		}
		oCity1.onchange=function()
		{
			oCity2.innerHTML='';
			var citymap2=citymap[this.value];
			var Ooption=document.createElement('option');
			Ooption.innerHTML='请选择城市';
			oCity2.appendChild(Ooption);
			for(var j in citymap2)
			{
				Ooption=document.createElement('option');
				Ooption.innerHTML=j;
				Ooption.value=citymap2[j];
				oCity2.appendChild(Ooption);
			}
		}

		function getWeather(code) {
			var url = 'http://mimg.127.net/weather/';
			url+=getDat()+'/';
			url += code.substring(0,2) + '/' + code.substring(2,4) + '/' + code.substring(4) + '.js?t='+Math.random(); 
			var oScript=document.createElement('script');
			oScript.src=url;
			oScript.charset='gbk';
			document.body.appendChild(oScript);
			oScript.onload = showWeather;
		}
		
		oColse.onclick=function()
		{
			oWeather.style.display='none';
			
		}
		oWeather.onmouseover=function()
		{
			oColse.style.display='block';
		}

		oWeather.onmouseout=function()
		{
			oColse.style.display='none';
		}

		function getDat()
		{
			var oDate=new Date();
			var iYear=oDate.getFullYear();
			var iMonth=oDate.getMonth()+1;
			var iDate=oDate.getDate();
			iMonth = iMonth<10? '0'+iMonth : ''+iMonth;
			iDate = iDate<10? '0'+iDate : ''+iDate;
			return iYear+iMonth+iDate;
		}

		getWeather('100005');
	}
	

	Weather();
}
