/*
 *  @布局
 * createRule 创建规则编排区
 * init 初始化控件
 * createRule 创建控件
 * createRulelayout 创建编排区
 * createHeader 创建头部
 * createSidebar 创建左侧菜单
 * createContent 创建编排区
 * reCountSizeOfLayout 重置布局
 * 
 *	@头部按钮
 * clickMoreButtons 单击预览更多按钮
 * clearRuleLayout 清空编排区
 * dragStartBracket 拖拽括号开始事件
 * dragEndBracket 拖拽括号鼠标松开事件
 * dropBracket 拖拽括号鼠标松开事件
 * relationAll 设置所有属性关系为and
 * relationSingle 设置所有属性关系为or
 * viewExpress 预览表达式
 * 
 *  @树控件
 * createTree 创建触发因子分组树形菜单
 * dragMouseDownContext 拖拽到编排区鼠标按下事件
 * dragStartContext 拖拽到编排区开始拖拽事件
 * dropContext 拖拽到编排区鼠标松开事件
 * dblClickAttribute 双击属性事件
 * 
 *  @属性面板
 * createAttributePanel 创建属性面板
 * createAttributeParts 左提示区，左括号区，右括号区，关系区，右提示区，删除按钮
 * 
 * dragOverAttribute 拖拽到属性面板鼠标滑过事件
 * dragLeaveAttribute 拖拽到属性面板鼠标离开事件
 * dropAttribute 拖拽到属性面板鼠标松开事件
 * removeAttribute 删除属性面板 
 * dragStartAttribute 拖拽属性面板开始事件
 * 
 * @属性
 * createAttributeMark 创建属性、蒙版区
 * createAttributeContent 创建属性内容
 * createAttributeValue 创建属性值
 * createIntervalAttributeValue 设置区间属性值
 * changeOperator 改变下拉框选项
 * 
 * @保存、读取
 * saveRule 保存规则
 * loadRule 读取规则
 * 
 * @工具
 * resetDragElement
 * setMarkTopClass 设置蒙版层级
 * selectAttribute 选中属性事件
 * setIntervalData 设置区间数据
 * openUrl 弹出窗口
 * 
 */

/*规则编排组件*/
function RuleLayout() {
	this.rulelayout = null;										//规则编排区
	this.header = null;											//头部菜单区
	this.sidebar = null;										//左侧菜单区
	this.content = null;										//右侧内容区
	this.objectId = null;										//所属ID
	this.dragSrcElement = {dragSrc:null,dragSrcId:0};			//拖拽对象

	this.settings = {											//配置信息
		data :{},												//数据：树节点、多选下拉框
		system : "system",										//头部菜单文字
		editable : true,										//是否可编排
		buttons : {												//默认按钮
			visible : [ "single", "all","clear","view","save",  "bracket" ],			
			invisible : []
		},
		express_visible : false,
		width : "100%",
		height : "500px"
	};
}

/*初始化控件 */
RuleLayout.prototype.init = function(config) {
	$.extend(this.settings, config);
	this.createRule();
	this.loadRule();
};

/*创建控件 */
RuleLayout.prototype.createRule = function() {
	var _this = this;
	createRulelayout();

	/*创建规则编排区 */
	function createRulelayout() {
		var rulelayoutSettings = {tagName : "div",className : "rulelayout"};
		_this.rulelayout = JsUtils.createPanel(rulelayoutSettings);
		$(_this.rulelayout).css({width:_this.settings.width,height:_this.settings.height});
		$(_this.rulelayout).appendTo($(document.body));
		
		if(_this.settings.editable){
			createHeader();
			createSidebar();
		}else{
			createMark();
		}
		
		createContent();
	}
	
	/*预览遮罩模板*/
	function createMark(){
		var maskSettings = {tagName : "div",className : "mask"};
		var mask = JsUtils.createPanel(maskSettings);
		$(mask).appendTo($(document.body)); 
	}

	/*创建头部 */
	function createHeader() {
		var headerSettings = {
			tagName : "div",
			id : "header",
			className : "header"
		};
		_this.header = JsUtils.createPanel(headerSettings);
		$(_this.header).css({width:NumCon.WIDTH,height:"27px"});
		$(_this.header).appendTo($(_this.rulelayout));

		//头部文字
		var headerTextSettings = {tagName : "div",className : "headerText",innerHTML : _this.settings.system};
		var headerText = JsUtils.createPanel(headerTextSettings);
		JsUtils.setStyle(_this.header, [ {
			lineHeight : "27px"
		} ]);
		$(headerText).appendTo($(_this.header));

		//作废、预留
//		//更多按钮
//		var moreButtonsSettings = {tagName : "a",id : "moreButtons",className : "moreButtons",innerHTML : "more",href : "#"};
//		var moreButtons = JsUtils.createPanel(moreButtonsSettings);
//		$(moreButtons).appendTo($(_this.header));
//		$(moreButtons).bind("click", function(ev) {
//			_this.clickMoreButtons(ev);
//		});

		// 创建按钮区
		var headerButtonsSettings = {tagName : "div",id : "headerButtons",className : "headerButtons"};
		var headerButtons = JsUtils.createPanel(headerButtonsSettings);
		$(headerButtons).appendTo($(_this.header));
			
//		// 创建隐藏按钮
//		for ( var i = 0; i < _this.settings.buttons.invisible.length; i++) {
//			var controlbuttonSettings = {tagName : "img",name :_this.settings.buttons.invisible[i],	id :"btn_hidden",
//					className : "controlbutton_hidden"};
//			var controlbutton = JsUtils.createPanel(controlbuttonSettings);
//			$(controlbutton).attr("draggable", false);
//			$(controlbutton).appendTo($(headerButtons));
//		}

		// 创建可视按钮
		for ( var i = 0; i < _this.settings.buttons.visible.length; i++) {
			var controlbuttonSettings = {tagName : "img",name : _this.settings.buttons.visible[i],id :"btn_visible",
					className : "controlbutton_visiable"};
			var controlbutton = JsUtils.createPanel(controlbuttonSettings);
			$(controlbutton).attr("draggable", false);
			$(controlbutton).appendTo($(headerButtons));
		}
		
		$(".header img").each(function(i) {
			var src="";
			switch($(this).attr("name")){
				case  "save":
					src="img/save";
					$(this).attr("title",StringCon.SAVE);
					$(this).bind("click",function(ev){
						_this.saveRule("save");
					});
					break;
				case  "clear":
					src="img/clear";
					$(this).attr("title",StringCon.CLEAR);
					$(this).bind("click",function(ev){
						_this.clearRuleLayout();
					});
					break;
				case  "bracket":
					src="img/bracket";
					$(this).attr("title",StringCon.BRACKET);
					$(this).attr("draggable", true);
					$(this).bind("dragstart",function(ev){
						_this.dragStartBracket(ev);
					});
					
					$(this).bind("dragend",function(ev){
						_this.dragEndBracket(ev);
					});
					break;
				case  "single":
					src="img/single";
					$(this).attr("title",StringCon.SINGLE);
					$(this).bind("click",function(ev){
						_this.relationSingle();
					});
					break;
				case  "all":
					src="img/all";
					$(this).attr("title",StringCon.ALL);
					$(this).bind("click",function(ev){
						_this.relationAll();
					});
					break;
				case  "view":
					src="img/view";
					$(this).attr("title",StringCon.VIEW);
					$(this).attr("title",$(this).attr("title")+StringCon.REFRESH);
					$(this).bind("click",function(ev){
						_this.viewExpress();
					});
					break;
				case  "settings":
					break;
				case  "help":
					break;
			};
			
			$(this).attr("src",src+".png");
			$(this).bind("mouseover",function(ev){
				$(this).attr("src",src+"over.png");
			}).bind("mouseout",function(ev){
				$(this).attr("src",src+".png");
			});
		});
	}

	/*创建左侧菜单 */
	function createSidebar() {
		var sidebarSettings = {tagName : "div",id : "sidebar",className : "sidebar"};
		_this.sidebar = JsUtils.createPanel(sidebarSettings);
		var height = _this.rulelayout.offsetHeight - _this.header.offsetHeight + "px";
		$(_this.sidebar).css({width:"219px",height:height});
		$(_this.sidebar).appendTo($(_this.rulelayout));
		_this.createTree();
	}

	/*创建编排区 */
	function createContent() {
		var contentSettings = {tagName : "div",id : "content",className : "content"};
		_this.content = JsUtils.createPanel(contentSettings);
		reCountSizeOfLayout();
		$(_this.content).appendTo($(_this.rulelayout));

		//改变拖拽属性划入拖拽区的鼠标样式
		$(_this.content).bind("dragover", function(ev) {
			ev.preventDefault(); 
		});
		
		$(_this.content).bind("drop", function(ev) {
			_this.dropContext(ev);
		});

		
		var expressSettings = {tagName : "div",id : "express",className : "express"};
		var express = JsUtils.createPanel(expressSettings);
		$(express).appendTo($(_this.content));
		$(express).bind("click",function(){	//单击刷新
			$(this).html(_this.saveRule("view"));
			$(this).attr("title",_this.saveRule("view"));
		});
		
		$(express).css("top",_this.content.scrollHeight-express.scrollHeight);
		var expressTop=_this.content.scrollHeight-express.scrollHeight;
		
		$(_this.content).bind("scroll",function(ev){
			$(express).css({"top":expressTop+_this.content.scrollTop+"px"});
		});
	}
	
	//每当窗体改变大小时候，重新计算编排区大小
	function reCountSizeOfLayout(){
		var headerHeight=0;
		var sidebarWidth=0;
		
		if(_this.header){
			headerHeight=$(_this.header).height()+parseInt($(_this.header).css("border-bottom-width").replace("px",""))+
				parseInt($(_this.header).css("border-top-width").replace("px",""));
		}
		
		if(_this.sidebar){
			sidebarWidth=$(_this.sidebar).width()+parseInt($(_this.sidebar).css("border-right-width").replace("px",""));
		}
		
		$(_this.content).css("height",$(_this.rulelayout).height()-headerHeight+"px");
		$(_this.content).css("width",$(_this.rulelayout).width()-2-sidebarWidth+"px");
	}
	
	/*窗体改变大小时重新布局*/
	window.onresize=function(){
		reCountSizeOfLayout();
	};
};


/*单击预览更多按钮 */
RuleLayout.prototype.clickMoreButtons = function(ev) {
	$("[id=btn_hidden]").toggleClass("controlbutton_hidden");
	$("[id=btn_hidden]").toggleClass("controlbutton_visiable");
	if ($("#moreButtons").html() == "more") {
		$("#moreButtons").html("hidden");
	} else {
		$("#moreButtons").html("more");
	}
};

/*创建触发因子分组树形菜单 */
RuleLayout.prototype.createTree = function() {
	var _this=this;
	var groupTree = $("<ul id='groupTree' class='ztree'></ul>");
	groupTree.appendTo($(this.sidebar));
	
	var groupTreeSetting={
		data : {
			simpleData : {enable : true}
		},
		callback:{
			beforeMouseDown : function(treeId,treeNode){
				_this.dragMouseDownContext(treeId,treeNode);
			},
			beforeMouseUp : function(treeId,treeNode){
				_this.setMarkTopClass("down");
			},
			onDblClick : function(event, treeId, treeNode){
				var icon=treeNode.icon;
				if(icon&&icon.indexOf("candrag")>-1){
					_this.dblClickAttribute(treeNode.id);
				}
			}
		}
	};
	
	//初始化树控件
	$.fn.zTree.init($("#groupTree"), groupTreeSetting, this.settings.data.treeData);

	if(JsUtils.getExplorer()=="IE"){
		//设置A标签默认点击事件
		$("#groupTree a").attr("href", "javascript:;");
		$("#groupTree a").bind("click", function(ev) {return false;});
	};

	//添加拖拽事件
	$("#groupTree a").each(function() {
		var background=$(this).find("span").eq(0).css("background-image");
		if (background.indexOf("candrag") > -1) {
			$(this).attr("draggable", true);
			$(this).bind("dragstart", function(ev) {
				_this.dragStartContext(ev,this);
			});
			
			$(this).bind("dragend", function(ev) {
				_this.setMarkTopClass("down");
				$(_this.dragSrcElement.dragSrc).removeClass("dragAttributeTemplate");
				_this.resetDragElement();
			});
		} else {
			$(this).attr("draggable", false);
		}
	});
};

/*拖拽到编排区鼠标按下事件*/
RuleLayout.prototype.dragMouseDownContext=function(treeId,treeNode){
	if(treeNode){
		this.setMarkTopClass("up");
		this.dragSrcElement.dragSrcId=treeNode.id;
	}
};

/*双击属性事件*/
RuleLayout.prototype.dblClickAttribute=function(nodeId){
	if(nodeId){
		var attributePanel=this.createAttributePanel(nodeId);
		this.content.appendChild(attributePanel);
		this.setRelation();
		this.selectAttribute(attributePanel);
		this.resetDragElement();
	}
};

/*拖拽到编排区开始拖拽事件*/
RuleLayout.prototype.dragStartContext=function(ev,dragSrcElement){
	this.dragSrcElement.dragSrc=dragSrcElement;
	$(dragSrcElement).addClass("dragAttributeTemplate");
};

/*拖拽到编排区鼠标松开事件*/
RuleLayout.prototype.dropContext=function(ev){
	var attributePanel=null;
	if(this.dragSrcElement.dragSrc.tagName=="IMG"){
		return false;
	}else if(this.dragSrcElement.dragSrc.tagName=="A"){
		var attributeId=this.dragSrcElement.dragSrcId;
		attributePanel=this.createAttributePanel(attributeId);
	}else if(this.dragSrcElement.dragSrc.tagName=="DIV"){
		attributePanel=this.dragSrcElement.dragSrc;
		this.content.appendChild(attributePanel);
	}
	this.setRelation();
	this.selectAttribute(attributePanel);
};

/*设置关系是否展示*/
RuleLayout.prototype.setRelation=function(){
	for(var i=0;i<$(".relationPanel").length;i++){
		var relationPanel=$(".relationPanel").get(i);
		if(i==$(".relationPanel").length-1){
			$(relationPanel).css(CssCon.VISIABLE,CssCon.HIDE);
		}else{
			$(relationPanel).css(CssCon.VISIABLE,CssCon.SHOW);
		}
	}
};

/*创建属性面板，属性面板由9部分组成：左提示区，左括号区，右括号区，关系区，右提示区，删除按钮，属性区，左右蒙版区*/
RuleLayout.prototype.createAttributePanel=function(attributeId,beforeElement){
	var _this=this;
	
	//属性面板
	var attributePanelSettings = {tagName : "div",name : "attributePanel",className : "attributePanel",attributeId:attributeId};
	var attributePanel = JsUtils.createPanel(attributePanelSettings);
	if(beforeElement){
		$(attributePanel).insertBefore($(beforeElement));
	}else{
		
		$(attributePanel).appendTo($(_this.content));
	}
	
	
	$(attributePanel).attr("draggable",true);
	$(attributePanel).bind("dragstart",function(ev){
		_this.dragStartAttribute(ev);
	});
	
	$(attributePanel).bind("dragend",function(ev){
		_this.dragEndAttribute(ev);
	});
	
	//创建属性面板部件
	this.createAttributeParts(attributePanel);
	//创建属性和蒙版区
	this.createAttributeMark(attributePanel);
	
	return attributePanel;
};

/*左提示区，左括号区，右括号区，关系区，右提示区，删除按钮*/
RuleLayout.prototype.createAttributeParts=function(attributePanel){
	var _this=this;
	//左提示区
	var leftHintPanelSettings = {tagName : "div",name : "leftHintPanel",className : "leftHintPanel"};
	var leftHintPanel = JsUtils.createPanel(leftHintPanelSettings);
	$(attributePanel).append($(leftHintPanel));
	
	//右提示区
	var rightHintPanelSettings = {tagName : "div",name : "rightHintPanel",className : "rightHintPanel"};
	var rightHintPanel = JsUtils.createPanel(rightHintPanelSettings);
	$(attributePanel).append($(rightHintPanel));
	
	//左括号区
	var leftBracketPanelSettings = {tagName : "div",name : "leftBracketPanel",className : "leftBracketPanel"};
	var leftBracketPanel = JsUtils.createPanel(leftBracketPanelSettings);
	$(attributePanel).append($(leftBracketPanel));
	
	//关系区
	var relationSettings = {tagName : "div",name : "relationPanel",className : "relationPanel",innerHTML:StringCon.AND,title:StringCon.CHANGERELATION};
	var relationPanel = JsUtils.createPanel(relationSettings);
	$(attributePanel).append($(relationPanel));
	
	//切换and\or关系
	$(relationPanel).bind("click",function(ev){
		if($(this).html()==StringCon.AND){
			$(this).html(StringCon.OR);
		}else{
			$(this).html(StringCon.AND);
		}
	});
	
	//右括号区
	var rightBracketPanelSettings = {tagName : "div",name : "rightBracketPanel",className : "rightBracketPanel"};
	var rightBracketPanel = JsUtils.createPanel(rightBracketPanelSettings);
	$(attributePanel).append($(rightBracketPanel));
	
	//括号区删除按钮
	var deleteBracketPanelSettings= {tagName : "div",name : "deleteBracketPanel",className : "deleteBracketPanel",title:StringCon.DELBRA};
	var leftDeleteBracketPanel = JsUtils.createPanel(deleteBracketPanelSettings);
	var rightDeleteBracketPanel = $(leftDeleteBracketPanel).clone(true)[0];
	
	$(leftBracketPanel).append($(leftDeleteBracketPanel));
	$(rightBracketPanel).append($(rightDeleteBracketPanel));
	
	
	//括号区文字
	var bracketTextSettings= {tagName : "div",name : "bracketText",className : "bracketText"};
	var leftBracketText = JsUtils.createPanel(bracketTextSettings);
	var rightBracketText = $(leftBracketText).clone(true)[0];
	
	$(leftBracketPanel).append($(leftBracketText));
	$(rightBracketPanel).append($(rightBracketText));
	
	
	//文字区拖拽括号添加括号
	$(leftBracketText).bind("drop",function(ev){
		_this.dropBracket(ev,"(");
	});
	
	$(rightBracketText).bind("drop",function(ev){
		_this.dropBracket(ev,")");
	});
	
	//单击删除按钮删除括号
	$(leftDeleteBracketPanel).bind("click",function(ev){
		var html=$(this).parent().find(".bracketText").html();
		$(this).parent().find(".bracketText").html(html.substring(0,html.length-1));
	});
	
	$(rightDeleteBracketPanel).bind("click",function(ev){
		var html=$(this).parent().find(".bracketText").html();
		$(this).parent().find(".bracketText").html(html.substring(0,html.length-1));
	});
	
	//鼠标滑过隐藏括号
	$(leftBracketPanel).bind("mouseover",function(ev){
		if($(this).find(".bracketText").html()!=StringCon.NULL){
			$(this).find(".deleteBracketPanel").css(CssCon.VISIABLE,CssCon.SHOW);
		}
	}).bind("mouseout",function(ev){
		$(this).find(".deleteBracketPanel").css(CssCon.VISIABLE,CssCon.HIDE);
	});
	
	$(rightBracketPanel).bind("mouseover",function(ev){
		if($(this).find(".bracketText").html()!=StringCon.NULL){
			$(this).find(".deleteBracketPanel").css(CssCon.VISIABLE,CssCon.SHOW);
		}
	}).bind("mouseout",function(ev){
		$(this).find(".deleteBracketPanel").css(CssCon.VISIABLE,CssCon.HIDE);
	});
	
	//提示区
	var hintPanelSettings = {tagName : "div",name : "hintPanel",className : "hintPanel"};
	var hintPanel = JsUtils.createPanel(hintPanelSettings);
	$(attributePanel).append($(hintPanel));
};

/*创建属性、蒙版区*/
RuleLayout.prototype.createAttributeMark=function(attributePanel){
	var _this=this;
	//属性区
	var attributeSettings = {tagName : "div",name : "attribute",className : "attribute",attributeId:attributePanel.attributeId};
	var attribute = JsUtils.createPanel(attributeSettings);
	$(attributePanel).append($(attribute));
	
	this.createAttributeContent(attribute);
	
	$(attribute).bind("mouseover",function(ev){
		ev.stopPropagation();   
		$(this).find(".deleteButton").css(CssCon.VISIABLE,CssCon.SHOW);
	}).bind("mouseout",function(ev){
		ev.stopPropagation();   
		$(this).find(".deleteButton").css(CssCon.VISIABLE,CssCon.HIDE);
	}).bind("click",function(ev){
		_this.clickAttribute(ev);
		ev.stopPropagation();   
	});
	
	//删除按钮
	var deleteButtonSettings = {tagName : "div",name : "deleteButton",className : "deleteButton",title:StringCon.DELATTR};
	var deleteButton = JsUtils.createPanel(deleteButtonSettings);
	$(attribute).append($(deleteButton));
	
	$(deleteButton).bind("click",function(ev){
		ev.stopPropagation();   
		_this.removeAttribute(ev,this);
	});
	
	//蒙版区
	var leftMaskingSettings = {tagName : "div",name : "leftMasking",className : "masking"};
	var leftMasking = JsUtils.createPanel(leftMaskingSettings);
	$(attributePanel).append($(leftMasking));
	var maskWidth=$(attributePanel).width()/2-$(".relationPanel").width()/2+"px";
	$(leftMasking).css({width:maskWidth});
	
	var rightMaskingSettings = {tagName : "div",name : "rightMasking",className : "masking"};
	var rightMasking = JsUtils.createPanel(rightMaskingSettings);
	$(attributePanel).append($(rightMasking));
	$(rightMasking).css({width:maskWidth,left:maskWidth});
	
	$(leftMasking).bind("dragenter", function(ev) {
		ev.stopPropagation();   
		_this.dragOverAttribute("left",this);
	}).bind("dragleave", function(ev) {
		ev.stopPropagation();   
		_this.dragLeaveAttribute("left",this);
	}).bind("drop", function(ev) {
		ev.stopPropagation();   
		_this.dropAttribute("left",this);
	});
	
	$(rightMasking).bind("dragenter", function(ev) {
		ev.stopPropagation();   
		_this.dragOverAttribute("right",this);
	}).bind("dragleave", function(ev) {
		ev.stopPropagation();   
		_this.dragLeaveAttribute("right",this);
	}).bind("drop", function(ev) {
		ev.stopPropagation();   
		_this.dropAttribute("right",this);
	});
};

/*创建属性内容*/
RuleLayout.prototype.createAttributeContent=function(attribute){
	var _this=this;
	
	//触发查询属性事件
	var returnValue=$(this).triggerHandler('queryAttribute',[attribute.attributeId]);
	
	$(attribute).attr("attributeType",returnValue.attributeType);
	
	//属性名称
	var attributeNameSettings = {tagName : "div",name : "attributeName",className : "attributeName"};
	var attributeName = JsUtils.createPanel(attributeNameSettings);
	$(attributeName).attr("title",returnValue.attributeName);
	$(attributeName).attr("innerHTML",returnValue.attributeName);
	$(attribute).append($(attributeName));
	
	//运算符
	var operatorSettings = {tagName : "select",name : "operator",className : "operator"};
	var operator = JsUtils.createPanel(operatorSettings);
	$(attribute).append($(operator));
	
	//运算符数据
	var operDatas=returnValue.operators;
	for ( var i = 0; i < operDatas.length; i++) {
		var operData=operDatas[i];
		$(operator).append("<option value='"+operData+"'>"+operData+"</option>");
	}
	$(operator).attr("title",$(operator).val());
	
	this.createAttributeValue(attribute, returnValue);
	
	$(operator).bind("change",function(ev){
		var attributeType=returnValue.attributeType;
		_this.changeOperator(attribute,this,attributeType,returnValue);
	});
};

/*改变下拉框选项*/
RuleLayout.prototype.changeOperator=function(attribute,operator,attributeType,returnValue){
	$(operator).attr("title",$(operator).val());
	if(attributeType==AttrType.number||attributeType==AttrType.date){
		var dataSettings=this.setIntervalData(attributeType);
		this.createIntervalAttributeValue(attribute,dataSettings,$(attribute).find(".operator").val(),attributeType,returnValue);
	}
};

/*创建属性值*/
RuleLayout.prototype.createAttributeValue=function(attribute,returnValue){
//	1>文本
//	2>下拉框（搜索）
//	3>日期
//	4>数字
//	5>复选框
//	6>（如果因子值很多，可以 A-C D-F … 这种方式分类）
//	7>多选下拉框
	var _this=this;
	var attributeValue =null;
	
	switch(returnValue.attributeType){
		case AttrType.text: 
			var textSettings = {tagName : "input",name : "attributeValue",className : "text"};
			attributeValue = JsUtils.createPanel(textSettings);
			$(attributeValue).attr("reg",returnValue.reg);
			$(attributeValue).attr("regMsg",returnValue.regMsg);
			$(attribute).append($(attributeValue));
			$(attribute).find(".operator").hide();
			break;
		case AttrType.select: 
			var selectSettings = {tagName : "select",name : "attributeValue",className : "select" };
			attributeValue = JsUtils.createPanel(selectSettings);
			$(attribute).append($(attributeValue));
			$(attribute).find(".operator").hide();
			
			var attributeValues=returnValue.attributeValues;
			for ( var i = 0; i < attributeValues.length; i++) {
				var attributeValueData=attributeValues[i];
				$(attributeValue).append("<option value='"+attributeValueData.value+"'>"+attributeValueData.text+"</option>");
			}
			break;
		case AttrType.date: 
			var dataSettings=this.setIntervalData("date");
			this.createIntervalAttributeValue(attribute,dataSettings,$(attribute).find(".operator").val(),"date",returnValue);
			break;
		case AttrType.number: 
			var dataSettings=this.setIntervalData("number");
			this.createIntervalAttributeValue(attribute,dataSettings,$(attribute).find(".operator").val(),"number",returnValue);
			break;
		case AttrType.multiple: 
			var time="m"+new Date().getTime();
			var multipleSelectSettings = {tagName : "select",multiple : true ,size:2,name:"attributeValue",id:time};
			attributeValue = JsUtils.createPanel(multipleSelectSettings);
			var attributeValues=returnValue.attributeValues;
			
			
			var multipleSelectData=this.settings.data.multipleSelectData;//用户选择数据
			for ( var i = 0; i < attributeValues.length; i++) {
				var attrValue=attributeValues[i];
				
				var selected="";			//设置用户选择数据
				if(multipleSelectData){	
					for(var j=0;j<multipleSelectData.length;j++){
						if(multipleSelectData[j]==attrValue.value){
							selected="selected";
						}
					}
				}
				
				$(attributeValue).append("<option value='"+attrValue.value+"' "+selected+">"+attrValue.text+"</option>");
			}
			this.settings.data.multipleSelectData=null;
			$(attribute).append($(attributeValue));
			$(attribute).find(".operator").hide();
			
			//初始化控件和默认显示文字
			$(attributeValue).multiSelect({
				noneSelected: StringCon.NONE,
				selectAllText: StringCon.ALL,
                oneOrMoreSelected:StringCon.SELECT
            });
			
			//解决多选下拉被其他attribute层遮盖问题
			$("#"+time).bind("click", function(ev){
				var attribute=$(this).parents(".attribute");
				if(attribute.css(CssCon.Z)==2){
					attribute.css(CssCon.Z,99);
				}else{
					attribute.css(CssCon.Z,2);
				}
				
				//因为阻止冒泡，所以手动调用选中属性
				_this.selectAttribute(attribute.parent()[0]);
				ev.stopPropagation();  
			});
			
			//单击下拉选项时阻止冒泡：防止层级降低
			$("#"+time).next().bind("click", function(ev){
				ev.stopPropagation();  
				//设置选中文本
				$("#"+time).text($("#"+time).selectedTextString());
			});
			
			//单击其他区域降低层级
			$(this.content).bind("click",function(ev){
				$(".attribute").css(CssCon.Z,"2");
			});
			
			//设置选中文本
			$("#"+time).text($("#"+time).selectedTextString()); 
			break;
		case AttrType.url: 
			var selectSettings = {tagName : "input",name : "attributeValue",className : "url",readOnly:"true" };
			attributeValue = JsUtils.createPanel(selectSettings);
			
			$(attributeValue).bind("click",function(ev){
				var target=ev.target||ev.srcElement;
				_this.openUrl(ev,returnValue,$(target).attr("data"));
			});
			$(attribute).append($(attributeValue));
			$(attribute).find(".operator").hide();
			break;
	}
	
	if(JsUtils.getExplorer()=="IE"){					//防止鼠标单击input失效问题，由外层拖拽事件引起
		$("input").bind("mousedown",function(ev){
			$(this).focus();
		});
	}
	
	$("[name=attributeValue]").bind("blur",function(ev){
		$(".express").html(_this.saveRule("view"));
	});
};

/*设置区间属性值*/
RuleLayout.prototype.createIntervalAttributeValue=function(attribute,dataSettings,operator,type,returnValue){
	var nowDate=new Date().format("yyyy-MM-dd");
	if(Operator.between==operator){
		var beforeAttributeValue = JsUtils.createPanel(dataSettings);		//第一个input标签
		var nextAttributeValue = JsUtils.createPanel(dataSettings);			//第二个input标签
		$(beforeAttributeValue).attr("reg",returnValue.reg);
		$(beforeAttributeValue).attr("regMsg",returnValue.regMsg);
		$(nextAttributeValue).attr("reg",returnValue.reg);
		$(nextAttributeValue).attr("regMsg",returnValue.regMsg);
		nextAttributeValue.style.marginLeft="83px";
		var oldElements=$(attribute).find("."+type);
		
		//移除元素
		if(oldElements.eq(0)[0]) oldElements.eq(0).remove();
		if(oldElements.eq(1)[0]) oldElements.eq(1).remove();
		
		$(attribute).append($(beforeAttributeValue));
		$(attribute).append($(nextAttributeValue));
		
		if(type==AttrType.date){
			$(beforeAttributeValue).val(nowDate); 
			$(nextAttributeValue).val(nowDate); 
		}
	}else{
		var attributeValue = JsUtils.createPanel(dataSettings);
		$(attributeValue).attr("reg",returnValue.reg);
		$(attributeValue).attr("regMsg",returnValue.regMsg);
		
		var oldElements=$(attribute).find("."+type);
		
		//移除元素
		if(oldElements.eq(0)[0]){
			oldElements.eq(0).remove();
		} 
		if(oldElements.eq(1)[0]) oldElements.eq(1).remove();
		
		attribute.appendChild(attributeValue);
		
		if(type==AttrType.date){
			$(attributeValue).val(nowDate); 
		}
	}
};

/*拖拽到属性面板鼠标滑过事件*/
RuleLayout.prototype.dragOverAttribute=function(direction,mark){
	//如果拖拽对象是括号按钮
	if(this.dragSrcElement.dragSrc.tagName=="IMG"){
		return false;
	}else{
		var attributePaenl=$(mark).parent();
		//如果拖拽对象与当前对象相同
		if(attributePaenl==$(this.dragSrcElement.dragSrc)){
			return false;
		}
		
		if(direction=="left"){
			attributePaenl.find(".leftHintPanel").css(CssCon.VISIABLE,CssCon.SHOW);
		}else{
			attributePaenl.find(".rightHintPanel").css(CssCon.VISIABLE,CssCon.SHOW);
		}
	}
};

/*拖拽到属性面板鼠标离开事件*/
RuleLayout.prototype.dragLeaveAttribute=function(direction,mark){
	var attributePaenl=$(mark).parent();
	if(direction=="left"){
		attributePaenl.find(".leftHintPanel").css(CssCon.VISIABLE,CssCon.HIDE);
	}else{
		attributePaenl.find(".rightHintPanel").css(CssCon.VISIABLE,CssCon.HIDE);
	}
};

/*拖拽到属性面板鼠标松开事件*/
RuleLayout.prototype.dropAttribute=function(direction,mark){
	this.setMarkTopClass("down");
	var attributePanel=$(mark).parent()[0];
	var nextAttributePanel=$(attributePanel).next()[0];
	
	if(direction=="left"){
		$(attributePanel).find(".leftHintPanel").css(CssCon.VISIABLE,CssCon.HIDE);
	}else{
		$(attributePanel).find(".rightHintPanel").css(CssCon.VISIABLE,CssCon.HIDE);
	}
	
	if(this.dragSrcElement.dragSrc.tagName=="IMG"){
		return false;
	}
	
	if(this.dragSrcElement.dragSrc.tagName=="A"){
		var attributeId=this.dragSrcElement.dragSrcId;
		var newAttributePanel=null;
		if(direction=="left"){
			newAttributePanel=this.createAttributePanel(attributeId,attributePanel);
		}else if(direction=="right"){
			newAttributePanel=this.createAttributePanel(attributeId,nextAttributePanel);
		}
		
		this.selectAttribute(newAttributePanel);
	}else if(this.dragSrcElement.dragSrc.tagName=="DIV"){
		//如果拖拽对象与当前对象相同
		if(attributePanel==this.dragSrcElement.dragSrc){
			return false;
		}
		var target=this.dragSrcElement.dragSrc;
		
		if(direction=="left"){
			$(target).insertBefore($(attributePanel));
		}else if(direction=="right"){
			$(target).insertAfter($(attributePanel));
		}
		this.resetDragElement();
	}	
	//重新设置关系、清空拖拽对象
	this.setRelation();
};

/*删除属性面板*/
RuleLayout.prototype.removeAttribute=function(ev,attribute){
	this.setMarkTopClass("down");
	var attributePanel=$(attribute).parents(".attributePanel");
	attributePanel.remove();
	this.setRelation();
};

/*清空编排区*/
RuleLayout.prototype.clearRuleLayout=function(){
	$(".attributePanel").each(function(){
		$(this).remove();
	});
};

/*设置所有属性关系为and*/
RuleLayout.prototype.relationAll=function(){
	$(".relationPanel").each(function(){
		$(this).html(StringCon.AND);
	});
};

/*设置所有属性关系为or*/
RuleLayout.prototype.relationSingle=function(){
	$(".relationPanel").each(function(){
		$(this).html(StringCon.OR);
	});
};

/*预览表达式*/
RuleLayout.prototype.viewExpress=function(){
	if($(".express").css(CssCon.VISIABLE)==CssCon.HIDE){
		$(".express").css(CssCon.VISIABLE,CssCon.SHOW);
		$(".express").html(this.saveRule("view"));
		$(".express").attr("title",this.saveRule("view"));
	}else{
		$(".express").css(CssCon.VISIABLE,CssCon.HIDE);
	}
};

/*拖拽括号开始事件*/
RuleLayout.prototype.dragStartBracket=function(ev){
	var target=ev.target||ev.srcElement;
	this.dragSrcElement.dragSrc=target;
	$(".leftBracketPanel").find(".bracketText").css({"background":"#F0F0F0"});
	$(".rightBracketPanel").find(".bracketText").css({"background":"#F0F0F0"});
};

/*拖拽括号结束事件*/
RuleLayout.prototype.dragEndBracket=function(ev){
	$(".leftBracketPanel").find(".bracketText").css({"background":"#FFFFFF"});
	$(".rightBracketPanel").find(".bracketText").css({"background":"#FFFFFF"});
	this.resetDragElement();
};

/*拖拽括号鼠标松开事件*/
RuleLayout.prototype.dropBracket=function(ev,bracket){
	var target=ev.target||ev.srcElement;
	if(this.dragSrcElement.dragSrc.tagName=="IMG"){
		$(target).html($(target).html()+bracket);
	}
	ev.stopPropagation();   
};

/*拖拽属性面板开始事件*/
RuleLayout.prototype.dragStartAttribute=function(ev){
	var target=ev.target||ev.srcElement;
	this.setMarkTopClass("up");
	this.dragSrcElement.dragSrc=target;
	this.selectAttribute(target);
};

/*单击属性*/
RuleLayout.prototype.clickAttribute=function(ev){
	var target=ev.target||ev.srcElement;
	//寻找样式.attributePanel父级元素，防止target不同造成错误
	this.selectAttribute($(target).parents(".attributePanel")[0]);
};

/*拖拽属性面板结束事件*/
RuleLayout.prototype.dragEndAttribute=function(ev){
	this.setMarkTopClass("down");
};

/*设置蒙版层级关系*/
RuleLayout.prototype.setMarkTopClass=function(upDown){
	if(upDown=="down"){
		$(".masking").css(CssCon.Z,"1");
	}else if(upDown=="up"){
		$(".masking").css(CssCon.Z,"3");
	}
};

/*选中属性事件*/
RuleLayout.prototype.selectAttribute=function(attributePanel){
	$(".attribute").css({"background":""});
	$(attributePanel).find(".attribute").css({"background":"url('img/border.png')"});
};

/*重置拖拽对象*/
RuleLayout.prototype.resetDragElement=function(){
	this.dragSrcElement.dragSrcId=0;
	this.dragSrcElement.dragSrc=null;
};

/*设置区间数据*/
RuleLayout.prototype.setIntervalData=function(attributeType){
	if(JsUtils.getExplorer()=="IE"){
		dataSettings = {tagName : "input",name : "attributeValue",className : attributeType};
	}else{
		dataSettings = {tagName : "input",name : "attributeValue",className : attributeType,type : attributeType};
	}
	return dataSettings;
};
var hintTimer=null;					//弹出框timer
/*保存规则*/
RuleLayout.prototype.saveRule=function(method){
	var _this=this;
	var attributesPanels=$(".attributePanel");
	
	var rules=[];
	var express="";
	var expressView="";
	
	var length=attributesPanels.length;
	
	
	var valid=true;						//是否验证通过
	var isValid=false;					//是否需要验证(原预览不需要验证，现在预览加验证)
	if("save"==method){
		isValid=true;
	}
	var leftBraCount=0;					//左括号数量
	var rightBraCount=0;				//右括号数量
	
	//校验方法
	var validFailed=function(attributePanel,value){
		_this.selectAttribute(attributePanel);
		clearTimeout(hintTimer);
		$(".hintPanel").hide();
		$(attributePanel).find(".hintPanel").html(value);
		$(attributePanel).find(".hintPanel").show();
		hintTimer=setTimeout(function(){
			$(attributePanel).find(".hintPanel").hide();
		},5000);
	};
	
	attributesPanels.each(function(index){
		
		clearTimeout(hintTimer);
		$(".hintPanel").hide();
		
		//设置保存对象
		var rule=new Object();
		var leftBracket=$(this).find(".leftBracketPanel .bracketText").html();
		var rightBracket=$(this).find(".rightBracketPanel .bracketText").html();
		leftBraCount+=leftBracket.length;
		rightBraCount+=rightBracket.length;
		
		//校验右括号是否出现在左括号之前
		if(isValid&&rightBraCount>leftBraCount){
			alert(StringCon.BRAHINT);
			valid=false;				//验证不通过
			return false;
		}
		
		//获得属性信息
		var relation=$(this).find(".relationPanel").html();
		var attribute=$(this).find(".attribute");
		var attributeName=attribute.find(".attributeName").html();
		var attributeId=attribute.attr("attributeId");
		var attributeType=attribute.attr("attributeType");
		var operator=attribute.find(".operator").val();
		
		//拼接表达式
		express+=leftBracket;
		expressView+=leftBracket;
		
		//如果是多选，且用户选择多个值，则拼接左括号
		if(attributeType==AttrType.multiple){
			var results=attribute.find(".multiSelect").selectedValuesString().split("@~");
			if(results.length>1){
				express+="(";
				expressView+="(";
			}
		}else if(attributeType==AttrType.url){
			var datas=attribute.find("[name=attributeValue]").attr("data");
			if(datas){
				datas=datas.split(",");	
				if(datas.length>1){
					express+="(";
					expressView+="(";
				}
			}
		};
		
		express+=attributeId;
		expressView+=attributeName;

		//封装对象
		rule.leftBracket=leftBracket;
		rule.id=attributeId;
		
		//设置运算符
		if(operator==Operator.between){
			express+=">=";
			expressView+=">=";
		}else{
			express+=operator;
			expressView+=operator;
		}
		rule.operator=operator;

		//设置属性值
		var attributeValue=new Array();
		var attributeText=new Array();
		if(attributeType==AttrType.multiple){
			var results=attribute.find(".multiSelect").selectedValuesString().split("@~");
			var texts=attribute.find(".multiSelect").selectedTextString().split(",");
			
			//非空校验
			if(isValid&&!results[0]){
				valid=false;
				validFailed(this,StringCon.NULLVALUESELECT);
				return false;
			}
			
			for(var i=0;i<results.length;i++){
				var result=results[i];
				var text=texts[i];
				
				//如果用户选择多个值，在第二个属性后重新拼接属性与运算符
				if(i!=0){
					express+=attributeId;
					express+=operator;
					expressView+=attributeName;
					expressView+=operator;
					
				}
				
				express+=result;
				expressView+=text;
				
				//多个值之间的关系是or关系
				if(i!=results.length-1){
					express+=" | ";
					expressView+=" "+StringCon.OR+" ";
				}
				attributeValue.push(result);
			}
			
			//如果用户选择多个值，则在最后一个值拼接右括号
			if(results.length>1){
				express+=")";
				expressView+=")";
			}
		}else if(attributeType==AttrType.url){	//同多选下拉
			var attributeValueJq=attribute.find("[name=attributeValue]");
			var datas=attributeValueJq.attr("data");
			var texts=attributeValueJq.attr("text");
			
			//非空校验
			if(isValid&&!datas){
				valid=false;
				validFailed(this,StringCon.NULLVALUESELECT);
				return false;
			}else if(datas){
				datas=datas.split(",");	
				texts=texts.split(",");
				for(var i=0;i<datas.length;i++){
					var data=datas[i];
					var text=texts[i];
					if(i!=0){
						express+=attributeId;
						express+=operator;
						expressView+=attributeName;
						expressView+=operator;
					}
					
					express+=data;
					expressView+=text;
					
					if(i!=datas.length-1){
						express+=" | ";
						expressView+=" "+StringCon.OR+" ";
					}
					attributeValue.push(data);
					attributeText.push(text);
				}
				if(datas.length>1){
					express+=")";
					expressView+=")";
				}
			}
		}else if(attributeType==AttrType.select){
			var attributeValueJq=attribute.find("[name=attributeValue]");
			//非空校验
			if(isValid&&!attributeValueJq.val()){
				_this.selectAttribute(this);
				valid=false;
				validFailed(this,StringCon.NULLVALUEINPUT);
				return false;
			}
			attributeValue.push(attributeValueJq.val());
			express+=attributeValueJq.val();
			expressView+=attributeValueJq.find("option:selected").text();
		}else{
			var attributeValueJq=attribute.find("[name=attributeValue]");
			//非空校验
			if(isValid&&!attributeValueJq.val()){
				_this.selectAttribute(this);
				valid=false;
				validFailed(this,StringCon.NULLVALUEINPUT);
				return false;
			}
			
			//正则校验
			var reg=attributeValueJq.attr("reg");
			if(isValid&&reg){
				reg=eval("/^"+reg+"$/");
				if(!reg.test(attributeValueJq.val())){
					valid=false;
					validFailed(this,attributeValueJq.attr("regMsg"));
					return false;
				}
			}
			
			attributeValue.push(attributeValueJq.val());
			express+=attributeValue[0];
			expressView+=attributeValue[0];
		}
		
		//如果运算符是between，补充上第二个用户选中值
		if(operator==Operator.between){
			var oldElements=$(attribute).find("."+attributeType);
			var endAttributeValue=oldElements.eq(1);
			
			//非空校验
			if(isValid&&!endAttributeValue.val()){
				valid=false;
				validFailed(this,StringCon.NULLVALUEINPUT);
				return false;
			}
			
			//正则校验
			var reg=endAttributeValue.attr("reg");
			if(isValid&&reg){
				reg=eval("/^"+reg+"$/");
				if(!reg.test(endAttributeValue.val())){
					valid=false;
					validFailed(this,endAttributeValue.attr("regMsg"));
					return false;
				}
			}
			attributeValue.push(endAttributeValue.val());
			express+=" & ";
			express+=attributeId;
			express+="<";
			express+=endAttributeValue.val();
		
			expressView+=" "+StringCon.AND+" ";
			expressView+=attributeName;
			expressView+="<";
			expressView+=endAttributeValue.val();
		}
		
		rule.attributeValue=attributeValue;
		rule.attributeText=attributeText;
		express+=rightBracket;
		rule.rightBracket=rightBracket;
		expressView+=rightBracket;
		
		//设置关系符
		if(relation==StringCon.AND){
			if(index!=length-1){
				express+=" & ";
				expressView+=" "+StringCon.AND+" ";
				rule.relation="&"; 
			}else{
				rule.relation=""; 
			}
		}else{
			if(index!=length-1){
				express+=" | ";
				expressView+=" "+StringCon.OR+" ";
				rule.relation="|"; 
			}
			else{
				rule.relation=""; 
			}
		}
		rules.push(rule);
	});
	
	if(isValid&&!valid){		//如果校验不通过，退出
		return;
	}
	
	console.log(JSON.stringify(rules));
	console.log(express);
	console.log(expressView);
	
	if(method=="save"){
		if(leftBraCount!=rightBraCount){			//校验括号个数匹配度
			alert(StringCon.BRAHINT);
			return;
		}
		var returnValue=$(this).triggerHandler('saveRule',[this.objectId,express,JSON.stringify(rules)]);
		alert(returnValue.msg);
	}
	
	return expressView;
};

/*读取规则*/
RuleLayout.prototype.loadRule=function(){
	var _this=this;
	var attributeDatas=$(this).triggerHandler('loadRule',[this.objectId]);
	
	for(var i=0;i<attributeDatas.length;i++){
		var attributeData=attributeDatas[i];
		
		var leftBracket=attributeData.leftBracket;
		var rightBracket=attributeData.rightBracket;
		var relation=attributeData.relation;
		var attributeValues=attributeData.attributeValue;
		var attributeText=attributeData.attributeText;
		var attributeType=attributeData.attributeType;
		var attributeId=attributeData.id;
		var operator=attributeData.operator;
		var returnValue={reg:attributeData.reg,regMsg:attributeData.regMsg};
		
		//多选处理
		this.settings.data.multipleSelectData=attributeValues;
		var attributePanel=this.createAttributePanel(attributeId);
		
		var attribute=$(attributePanel).find(".attribute")[0];
		$(attributePanel).find(".leftBracketPanel .bracketText").html(leftBracket);
		$(attributePanel).find(".rightBracketPanel .bracketText").html(rightBracket);
		$(attributePanel).find(".relationPanel").html(relation);
		$(attribute).find(".operator").val(operator);
		$(attribute).find(".operator").attr("title",$(attribute).find(".operator").val());
		
		
		if(attributeType==AttrType.url){			//如果是URL类型
			$(attribute).find("[name=attributeValue]").val(attributeText.join(","));		//设置属性值
			$(attribute).find("[name=attributeValue]").attr("data",attributeValues);
			$(attribute).find("[name=attributeValue]").attr("text",attributeText);
		}else if(attributeType!=AttrType.multiple){	//如果不是多选
			$(attribute).find("[name=attributeValue]").val(attributeValues[0]);		//设置属性值
			if(attributeType==AttrType.date||attributeType==AttrType.number){	
				var dataSettings=this.setIntervalData(attributeType);
				this.createIntervalAttributeValue(attribute,dataSettings,$(attribute).find(".operator").val(),attributeType,returnValue);
				$(attribute).find("[name=attributeValue]").eq(0).val(attributeValues[0]);
				$(attribute).find("[name=attributeValue]").eq(1).val(attributeValues[1]);
			};
		} 
	}
		
	this.setRelation();
	$(".express").html(this.saveRule("view"));
	$(".express").css(CssCon.VISIABLE,CssCon.SHOW);
	
	$("[name=attributeValue]").bind("blur",function(ev){
		$(".express").html(_this.saveRule("view"));
	});
};

RuleLayout.prototype.openUrl=function(ev,returnValue,selectValue){
	var target=ev.target||ev.srcElement;
	var popUp=new PopUp();
	popUp.open(ev,returnValue,selectValue,function(data,text){
		$(target).val(text.join(","));
		$(target).attr("title",text.join(","));
		$(target).attr("data",data);
		$(target).attr("text",text);
	});
};

RuleLayout.prototype.refreshView=function(ev){
	$(".express").html(this.saveRule("view"));
};

