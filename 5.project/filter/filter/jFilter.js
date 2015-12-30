function JFilter(id,data){
	this.filter=$(Strs.id+id).elements[0];
	this.filter.cellpadding=0;
	this.filter.cellspacing=0;
	this.connects={};
	
	this.data=data;				//加载数据源
	this.drawFilter();			//绘制漏斗
	
}

//读取数据
JFilter.prototype.drawFilter=function(ruleId){
	for(var i=0,j=this.data.length;i<j;i++){ 	//绘制行
		var rowDatas=this.data[i];
		this.createTableRow(rowDatas);
	}
	this.drawConnect();
}

//创建规则行
JFilter.prototype.createTableRow=function(rowDatas){
	var dataSourceRow = this.filter.insertRow(-1);
	dataSourceRow.className="dataSourceRow";
	
	for(var i=0,j=rowDatas.length;i<j;i++){
		var rowData = rowDatas[i];
		var dataSourceCell = dataSourceRow.insertCell(-1);
		dataSourceCell.className="dataSourceCell";
		$(dataSourceCell).css(Styles.width,rowData.length* parseInt($(dataSourceCell).css(Styles.width).replace("px","")));
		dataSourceCell.colSpan=rowData.length;
		this.createTableCell(rowData, dataSourceCell);
	}
}

//创建规则单元格
JFilter.prototype.createTableCell=function(rowData,dataSourceCell){
	//路由
	var routeParam={tagName:Tags.div,id:"route",className:"route"};
	var route=createPanel(routeParam);	
	dataSourceCell.appendChild(route);
	
	//连线
	var lineParam={tagName:Tags.span,id:"line",className:"line"};
	var line=createPanel(lineParam);	
	route.appendChild(line);
	
	
	if(rowData.parentNode!="P0"){
		if(this.connects[rowData.parentNode]){
			this.connects[rowData.parentNode].push(line);
		}else{
			this.connects[rowData.parentNode]=[];
			this.connects[rowData.parentNode].push(line);
		}
	}
	
	//箭头
	var arrowParam={tagName:Tags.span,id:"arrow",className:"arrow"};
	var arrow=createPanel(arrowParam);	
	route.appendChild(arrow);
	
	//节点
	var nodeParam={tagName:Tags.img,id:"node",className:"node",msg:rowData};
	var node=createPanel(nodeParam);				//客户仓库
	dataSourceCell.appendChild(node);
	
	//设置背景图片
	var src;
	switch(rowData.type){			//显示不同图片
		case NodeType.start: 
			src="filter/imgs/store.png";
			$(Strs.cls+"route").css("visibility","hidden");
			break;
		case NodeType.filter: 
			src="filter/imgs/filter.png";
			break;
		case NodeType.end: 
			src="filter/imgs/result.png";
			break;
		default:
			src="filter/imgs/filter.png";
			break;
	}
	$(node).attr("src",src);
	
	$(node).hover(function(){
		this.src=this.src.replace(".png","")+"_select"+".png";
	}, function(){
		this.src=this.src.replace("_select","");
	})
	
	$(node).dblclick(this.dblclick);
	
	var nodeLabelParam={tagName:Tags.div,id:"nodeLabel",className:"nodeLabel"};
	var nodeLabel=createPanel(nodeLabelParam);			//客户仓库信息
	nodeLabel.innerHTML=rowData.express+"<br/>"+rowData.left; 
	nodeLabel.title="Rule Expression : "+rowData.express+
		"\nCustomer Number : "+rowData.left; 
	dataSourceCell.appendChild(nodeLabel);
}

JFilter.prototype.dblclick=function(ev){
	var e=event||ev;
	var src= e.srcElement || e.target;
	if (!src || !src.className) return;
	var name = src.className.split(" ")[0];
	alert(name);
}

//绘制连接线
JFilter.prototype.drawConnect=function(){
	//循环连接集
	for(var parentNode in this.connects){
		var connect= this.connects[parentNode];	//获得连接
		
		var startLine=connect[0];
		var endLine=connect[connect.length-1];
		
		var connectLine=document.createElement(Tags.div);	//连接线
		connectLine.className="connectLine";
		connectLine.style.left=$(startLine).getPoint().left+"px";							//位置
		connectLine.style.top=$(startLine).getPoint().top+"px";								//位置
		connectLine.style.width=Math.abs($(endLine).getPoint().left-$(startLine).getPoint().left)+"px";		//长度
		document.body.appendChild(connectLine);
	}
	
	var dataSourceRows=getByClass(this.filter,"dataSourceRow");
	for(var i=0,j=dataSourceRows.length;i<j;i++){
		var dataSourceRow=dataSourceRows[i];
		if(i==j-1){
			$(dataSourceRow).css("borderTop", "2px solid #D4D4D4");
		}
	}
	      
}
//计算节点在单元格中的位置
JFilter.prototype.getNodePosition=function(node){
	var parent=node.parentNode;
	var left=(parent.offsetWidth-node.offsetWidth)/2;
	var top=(parent.offsetHeight-node.offsetHeight)/2;
	return {left:left,top:top};
}

