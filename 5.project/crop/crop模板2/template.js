var thisPage = {
	picArray : [],											//图片数组
	
	//初始化外层包装方法
	initWrap:function(){
		this.ow=config.width-2*config.wrapBW;		//外层宽度
		this.oh=config.height-2*config.wrapBW;		//外层高度
		this.conCount=config.conCount;						//兴趣点个数
		this.tabDatas={allDatas:[]};						//tab数据源
		this.minWidth=22+122+74+106+2;						//兴趣点最小宽度，等于4列之和+边框
		if((this.ow/this.conCount)<this.minWidth){			
			this.conCount=Math.floor(w/minWidth);			//重置兴趣点个数
		}
		this.w =this.ow/this.conCount;						//广告content高
		
		var wrap="<div id='wrap' style='overflow:hidden;width:"+this.ow+"px;height:"+this.oh+"px;border-radius:0px;border:"+
		config.wrapBW+"px "+config.wrapBS+" "+config.wrapBC+";left:"+config.left+"px;top:"+
			config.top+"px;position:"+config.position+";border-radius:"+config.wrapBR+"px'>";
		document.body.innerHTML=wrap;
		
		for(var i=0;i<this.conCount;i++){
			thisPage.initContainer(i);
		}
	},
	
	//初始化方法
	initContainer : function(i) {
		this.ad = ads;													//广告数据源
		this.fs={l:12,b:14}
		this.fontSize=this.fs.b;										//全局字体
		this.h = config.height-2*config.wrapBW;					//广告content宽
		this.ds= config.display_style;									//展示样式
		this.index=i;													//当前序列
		
		this.titleText=ads[i].topic_name;								//标题
		
		this.cs={bw:config.conBW,op:config.conOP,left:config.left,top:config.top,pos:config.position,bc:config.conBC,
				bs:config.conBS,br:config.conBR,bg:config.conBG};		//容器配置
		
		this.layout=["title","image","tab_title","tab_item"];			//定义布局内容，需与布局元素对应，否则无法获得宽高
		//布局元素
		this.title={w:config.title_width,h: config.title_height,brw:config.title_BRW,kc:config.keyword_color,
				tip:config.tip,color:config.title_color,tp:config.title_padding,fs:config.title_fs,bg:config.title_bg};
		this.image={w:config.image_width,h: config.image_height,brw:config.image_BRW,imgtexth:config.image_text_height,imgtextbg:config.imgtextbg,imgtextopa:config.img_text_op,
				imgbg:config.imgbg,alw:config.img_al_w,alh:config.img_al_h,albr:config.img_al_br,imgmar:config.image_margin};
		
		this.tab_title={w:config.tab_title_width,h: config.tab_title_height,tpl:config.tab_title_pl,fs:config.tab_title_fs,
				tpt:config.tab_title_pt,tibw:config.tab_title_border,brw:config.tt_brw};
		
		this.tab_item={w:config.tab_item_width,h: config.tab_item_height,tiw:config.tab_item_width,ticc:config.tab_item_col_count,
				tipl:config.tab_item_pl,tipt:config.tab_item_pt,fs:config.tab_item_fs};
		
		this.container=this.renderContainer();							//加载容器
		
		var tabads=new Array();
		var tabadsl=new Array();
		var tabItems=new Array();
		for(var k in ads[i].rec_its){
			var resit=ads[i].rec_its[k];
			if(resit.it_key.length>5){
				resit.it_key=resit.it_key.substr(0,5);
			}
			
			tabads.push(resit.it_key);
			tabadsl.push(resit.it_key.length);
			tabItems.push(resit.it_value);
		}
		
		this.maxTabLength=Math.max.apply(Math, tabadsl);				//Tab-title最大文字长度
		this.tabads=tabads;												//Tab-title数据源
		this.tabItems=tabItems;											//Tab-item数据源
		
		this.tabDatas.allDatas.push(tabItems);							//Tab-item总数据源，会叠加之前的container的tab-item
		
		if (this.ds == 1) {												//如果为1展示款广告
			var columns=this.getColumns();								//获取列
			this.renderLayout(columns);
			this.renderHorAd();
		}
		
	},
	
	//设置容器
	renderContainer:function(){
		var con = document.createElement("div");
		con.setAttribute("name","container");
		var cs= this.cs;													//获取样式
		var cw=this.w-2*cs.bw + 'px';
		var ch=this.h-2*cs.bw + 'px';
		
		var styleObj={width:cw,height:ch,border:cs.bw+"px "+cs.bs+" "+cs.bc,opacity:cs.op,float:"left","border-radius":cs.br+"px","background":cs.bg};
		con.style.cssText=thisPage.getStyle(styleObj);
		con.className+="clear";
		document.getElementById("wrap").appendChild(con);
		return con;
	},
	
	//获取列各个列
	getColumns:function(){
		var a=[];
		for(var i in this.layout){
			var item=this.layout[i];
			a.push?a.push({k:item,v:this[item].w}):a[i]={k:item,v:this[item].w};
		}
		return a; 
	},
	
	//获得列宽
	getColmunWidth:function(k,v){
		var width=0;
		switch(k){
			case "title":
				width=this.title.w-2*this.title.tp-this.title.brw;
				break;
			case "image":
				width=v+2*this.image.imgmar-this.title.brw;
				this.image.osw=width;
				break;
			case "tab_title":
				if(this.maxTabLength>5){
					this.maxTabLength=5;					
				}			
				width=this.maxTabLength*this.tab_title.fs+2*2-this.tab_title.brw;
				this.tab_title.w=width;
				break;
			case "tab_item":
				width=this.container.clientWidth-this.title.w-this.image.osw-this.tab_title.w-2-15;	//IE6处理
				this.tab_item.w=width;
				break;
		
		}
		return width;
	},
	
	//获得列高
	getColumnHeight:function(k,v){
		
		var height=document.getElementsByName('container')[this.index].clientHeight;		//IE6处理
		switch(k){
			case "title":
				height=height;
				this.title.h=height;
				break;
			case "image":
				this.image.osh=height;
				break;
			case "tab_title":
				this.tab_title.h=height;
			case "tab_item":
				this.tab_item.h=height;
				break;
		}
		return height;
	},
	
	//设置布局样式
	renderLayout:function(cols){
		var items=[];
		var item="";
		for(var i=0,len=cols.length;i<len;i++){
			var col=cols[i];
			var width=this.getColmunWidth(col.k,col.v);
			var height=this.getColumnHeight(col.k);
			item="<div name='"+col.k+"' id='"+col.k+"'style='position:relative;word-break:break-all;float:left;height:"+height+"px;width:"+width+"px;'></div>";
			items[i]=item;
		}
		this.container.innerHTML=items.join("");
	},
	
	
	//绘制横向广告
	renderHorAd : function() {
		this.dynamicClass();							//创建样式表
		this.renderTitle();
		this.renderImage();
		this.renderTabTitle();							//Tab标题
		
		this.renderTabItem(this.tabItems[0]);							//Tab选项
	},
	
	//绘制标题
	renderTitle:function(){
		var title=document.getElementsByName(this.layout[0])[this.index];
		var data=ads[this.index]; 
		
		var l=this.titleText.length;
		if(l>7){
			l=7;
			this.titleText=this.titleText.substr(0,7);
		}
		
		var fs=this.fontSize;
		
		if(fs*l>this.h){			
			fs=this.fs.l;		
		}
		
		var mt=(this.h-fs*this.titleText.length)/2;
		var titleHtml="<span style='width:100%;margin-top:"+mt+"px;font-size:"+fs+"px;height:"+2*this.title.fs
			+"px;display:inline-block;line-height:"+fs+"px;'>"+this.titleText+"</span>";
		title.innerHTML=titleHtml;
	},
	
	//绘制Tab选项
	renderTabItem:function(datas,i){
		var index=i||this.index;
		var title_item=document.getElementsByName(this.layout[3])[index];
		title_item.style.padding="0 0 0 15px";
		
		var tih=this.tab_item.h;							//外高
		title_item.style.background="#fff";
		title_item.style.overflow="hidden";
		title_item.style.textAlign="center";
		var width=this.tab_item.w;
		var height=this.tab_item.h;
		
		var wrap="<div class='wrap' name='tab_item_wrap' id='tab_item_wrap' style='position:relative;height:"+(tih-6)+"px;margin:3px auto;display:inline-block;'>{0}</div>";
		title_item.innerHTML=wrap;
		
		var oWrap=document.getElementsByName("tab_item_wrap")[index];
		
		
		
		
		var itemW=7*this.fontSize+8;
		
		
		var itemH=(tih-6)/(Math.floor((tih-6)/20));										//单元高度
		var itemRC=Math.floor(oWrap.clientHeight/itemH);								//单元行数
		var itemCC=0;
		
		var w_f3=document.getElementsByName(this.layout[0])[index].offsetWidth+
		document.getElementsByName(this.layout[1])[index].offsetWidth+
		document.getElementsByName(this.layout[2])[index].offsetWidth;
		
		var itemCC=Math.floor((this.w-w_f3)/itemW);
		//alert(itemW)
		itemW=title_item.clientWidth/itemCC;
		var dl=Math.ceil(datas.length/itemRC);
		
		if(dl<itemCC){
			itemCC=dl;
		}
		
		var tipl=this.tab_item.tipl;
		var tipt=this.tab_item.tipt;
		
		var width=itemW*itemCC;
		
		if(width>=this.tab_item.w){
			width=this.tab_item.w;
		}
		oWrap.style.width=width+"px";
		
		var z=0;
		var data=new Array();
		for(var i=0,l=itemCC;i<l;i++){					//循环列
			for(var m=0,n=itemRC;m<n;m++){				//循环行
				var left=i*itemW;
				var top=m*itemH;
				var text=datas[z]?datas[z].title:"";
				var href=datas[z]?datas[z].curl:"";
				
				if(text.length>7){
					text=text.substr(0,7);
				}
				
				var div="<a href='"+href+"' target='_blank' style='color:#585858;font-size:"+this.fontSize+"px;text-align:center;overflow:hidden;width:"+itemW+"px;height:"+
					itemH+"px;left:"+left+"px;top:"+top+"px;line-height:"+itemH+"px;position:absolute;'>"+text+"</a>";
					
				z++;
				data.push?data.push(div):data[i]=div;
			}
		}
		
		oWrap.innerHTML=data.join("");		
	},
	
	//图片列
	renderImage:function(){
		var imageAd=document.getElementsByName(this.layout[1])[this.index];
		imageAd.style.borderRight=this.image.brw+"px solid #9a9a9a";
		var image_width=this.image.w;
		var image_height=this.image.h;
		
		var imgSrc=ads[this.index].main_it[0].image_url;							
		var imgText=ads[this.index].main_it[0].title;							
		var aLink=ads[this.index].main_it[0].curl;
		
		var sd1Pic="";
		if (this.h>=120) {
			var marginTop=(image_height+this.image.imgtexth)/2;
			sd1Pic="<div style='position:absolute;top:50%;left:50%;margin-top:-"+marginTop+"px;margin-left:-50px;height:"+image_height+"px;"+this.image.imgmar+"px;'>{0}{1}</div>";
		} else if(this.h>=(90-2)){
			var marginTop=(imageAd.clientHeight-image_height)/2;
			sd1Pic="<div style='position:relative;height:"+image_height+"px;"+"margin:"+marginTop+"px "+this.image.imgmar+"px;'>{0}{1}</div>";
		}
		
		var opa="opacity:"+this.image.imgtextopa+";";
		var isIE=thisPage.isIE();
		if(isIE){opa+="filter:alpha(opacity="+this.image.imgtextopa*100+");";}
		
		var img="<a target='_blank' href='"+aLink+"'><img style='width:"+image_width+"px;height:"+100+"%;"+"border:0;vertical-align: top;' src='"+imgSrc+"' /></a>";
		
		var picText="";
		if (this.h>=120) {
			picText="<a target='_blank' href='"+aLink+"' style='font:"+this.fontSize+"px;color:#222;position:absolute;bottom:-17px;left:0;"+opa+"background:"+
			this.image.imgtextbg+";width:100%;text-align:center;display:block;height:"+this.image.imgtexth+"px;line-height:"+this.image.imgtexth+"px'>"+imgText+"</a>";
		} else if(this.h>=(90-2)){
			picText="<a target='_blank' href='"+aLink+"' style='font:"+this.fontSize+"px;color:#222;position:absolute;bottom:0;left:0;"+opa+"background:"+
			this.image.imgtextbg+";width:100%;text-align:center;display:block;height:"+this.image.imgtexth+"px;line-height:"+this.image.imgtexth+"px'>"+imgText+"</a>";
		}
		
		sd1Pic=sd1Pic.replace(/\{0\}/,img);
		sd1Pic=sd1Pic.replace(/\{1\}/,picText);
		imageAd.innerHTML=sd1Pic;
	},
	
	//Tab-title列
	renderTabTitle:function(){
		var tabTitle=document.getElementsByName(this.layout[2])[this.index];
		tabTitle.style.borderRight=this.tab_title.brw+"px solid #9a9a9a";
		var tab_title_item_w=this.tab_title.w-1;
		
		
		//alert(tab_title_item_w)
		
		var tab_title_item_num=this.tabads.length;
		var tab_title_item_h=this.tab_title.h/tab_title_item_num;
		
		var ts=new Array();
		for(var i=0,k=tab_title_item_num;i<k;i++){
			var borderBottom="";
			if(i==k-1){
				borderBottom="border-bottom:none;";
			}
			var className="";
			if(i){
				className="tab_title";
			}else{
				className="tab_title_click";
			}
			
			var tab_title_item="<a href='#'  name='tab_title_item' order='"+this.index+"' index='"+i+"'  class='"+
				className+"' style='width:100%;height:"+tab_title_item_h+"px;display:inline-block;"+
			"text-align:center;width:"+tab_title_item_w+"px;line-height:"+tab_title_item_h+"px;"+borderBottom+"'>"+this.tabads[i]+"</a>";
			ts[i]=tab_title_item;
		}
		tabTitle.innerHTML=ts.join("");
		
		var tabTitItems=document.getElementsByName("tab_title_item");
		
		for(var i=0;i<tabTitItems.length;i++){
			(function(data){
				tabTitItems[i].onmouseover=function(ev){
					thisPage.refreshTab(ev,data);
				}
			})(this.tabItems[i])			
		}		
	},
	
	//绘制样式表
	dynamicClass : function() {
		var cssText = [
				'#title{background:'+this.title.bg+';padding:'+this.title.tp+
						'px;text-align:center;color:'+this.title.color+';border-right:'+this.title.brw+'px solid #9a9a9a;}',
				'.keyword{color:'+this.title.kc+';}',
				'#image{font-size:'+this.fontSize+'px;line-height:'+this.fontSize+'px;}',
				'.tab_title{color:#585858;border-bottom:'+'1px solid #9a9a9a;font-size:'+this.tab_title.fs +'px;line-height:'+this.tab_title.fs+'px;border-right:'+
					this.tab_title.tibw+'px solid #9a9a9a;background:#E9E9E9;}',
				'.tab_title_click{border-bottom:1px solid #9a9a9a;font-size:'+this.tab_title.fs +'px;line-height:'
					+this.tab_title.fs+'px;border-right:0;background:#fff;color:#358aff;}',
				'.img_btn:hover{background:#0066FF;color:#fff;text-decoration:underline;}'].join('');
		thisPage.addClass(cssText);
	},	
	
	//刷新Tab
	refreshTab:function(e,data){
		var e=e||event;
		var target=e.srcElement||e.target;
		var tabTitle=document.getElementsByName(this.layout[2])[target.getAttribute("order")];
		
		var tabBtns=tabTitle.children;
		tabBtns.className="tab_title";		
		for(var i=0;i<tabBtns.length;i++){
			tabBtns[i].className="tab_title";			
		}
		
		target.className="tab_title_click";
		var item=this.tabItems[target.getAttribute("index")];
		this.renderTabItem(this.tabDatas.allDatas[target.getAttribute("order")][target.getAttribute("index")],target.getAttribute("order"));							//Tab选项
	},
	
	
	//设置鼠标悬浮
	setHover : function(node) {
		var className = node.className || '';
		if (className.indexOf('picItem') !== -1) {
			node.className = 'picItem hoverPic';
			node.lastChild.style.fontWeight = "bold";
		} else {
			node.className = node.className + ' hover_link';
			try {
				if (node.firstChild.getAttribute('data-index') <= 3) {
					node.firstChild.style.color = '#fff';
				}
			} catch (e) {

			}
		}
	},
	
	//添加样式
	addClass : function(cssString) {
		var doc = document;
		var style = doc.createElement("style");
		style.setAttribute("type", "text/css");

		if (style.styleSheet) {
			style.styleSheet.cssText = cssString;		//设置样式文字
		} else {
			var cssText = doc.createTextNode(cssString);
			style.appendChild(cssText);
		}

		var heads = doc.getElementsByTagName("head");
		if (heads.length)
			heads[0].appendChild(style);
		else
			doc.documentElement.appendChild(style);
	},
	
	//获取样式
	getStyle : function (styleObj){
		var style_content="";
		for(var i in styleObj) {
			style_content += i + ":" + styleObj[i] + ";";
		}
		
		if(thisPage.isIE()){style_content+="filter:alpha(opacity="+styleObj["opacity"]*100+");";}
		return style_content;
	},
	
	//判断是否IE浏览器
	isIE:function(){
		var ua = navigator.userAgent.toLowerCase(); 
		return ua.match(/msie ([\d.]+)/)?true:false;
	}
};

thisPage.initWrap();

