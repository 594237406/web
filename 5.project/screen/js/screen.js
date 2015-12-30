	
/*
 * createLeftPart:创建左侧区
 * createSearchPart:创建搜索区
 * createRightPart:创建右侧区
 * createMainControlPart：创建主操作区
 * createMainMenu:创建主操作区菜单
 * createAttributeRowPart:创建属性行区
 * 
 * loadGroupTree:根据分组名称加载分组树
 * attribute.draggable:属性添加可拖拽事件
 * setAttributeTemplateDraggable：设置模板可拖拽属性
 * setAttributeInstanceDraggable：设置实例可拖拽属性
 * attributeInstancePartDroppable:实例部分可松开属性
 * 
 * clickSingleAccord:单击单个符合
 * clickSearch:单击查询
 * clickAllAccord:单击全部符合
 * clickCustomBtn:单击自定义
 * clickSaveUserDataBtn:单击保存用户数据
 * clickRelation:单击关系
 * clickGroup:单击分组
 * clickUpBtn:单击向上
 * clickDownBtn:单击向下
 * clickBracketBtn:单击括号
 * clickDeleteBtn:单击删除
 * 
 * setVisible:设置显示隐藏
 * displayCustomControl:展示运算符、属性值、关系
 * refreshAttributeTemplatePart:刷新属性模板
 * exchangeAttributeRows:交换属性行，上下按钮使用
 * exchangeAttributeRowsData:交换属性行数据
 * 
 * saveUserData:保存用户数据
 * loadUserData:读取用户数据
 * 
 * mouseoverAttributeTemplate:鼠标滑过模板
 * mouseoutAttributeTemplate：鼠标划出模板
 * dblClickAttributeTemplate：双击属性模板
 * validateDragable:验证是否可拖拽
 * */

		
		
		
		var rule_part_create={
			//创建左侧区
			createLeftPart:function(){
				//左侧菜单区
				var leftMenu=$("<div id='leftMenu' class='leftMenu' />");
				leftMenu.appendTo($("#entity"));
	
				//左侧搜索区
				createSearchPart();
				
				var treePart=$("<div id='treePart' class='treePart' />");
				treePart.appendTo($("#leftMenu"));
				
				//左侧树形分组
				var groupTree=$("<ul id='groupTree' class='ztree'></ul>");
				groupTree.appendTo($("#treePart"));
				event_control_action.loadGroupTree(screen_str.nullStr);
	
				//属性区
				var attributeTemplatePart= $("<div id='attributeTemplatePart' class='attributeTemplatePart' name='attributeTemplatePart'></div>");
				attributeTemplatePart.html(screen_str.attributeTemplatePart_null);
				attributeTemplatePart.appendTo($("#leftMenu"));
				
				//创建搜索区
				function createSearchPart(){
					var searchPart=$("<div id='searchPart' class='searchPart' />");
					searchPart.appendTo($("#leftMenu"));
		
					//搜索框
					var searchTxt=$("<input id='searchTxt' class='searchTxt' />");
					searchTxt.appendTo($("#searchPart"));
		
					//查询按钮
					var searchBtn=$("<button id='searchBtn' class='searchBtn'>"+screen_str.search+"</button>");
					searchBtn.bind("click", event_control_action.clickSearch);
					searchBtn.appendTo($("#searchPart"));
				}
			},
			
			//创建右侧区
		    createRightPart:function(){
				//主操作区
				var mainControlPart=createMainControlPart();
				
				
				//主操作区菜单
				var mainMenuPart=createMainMenu(mainControlPart);
				mainMenuPart.appendTo(mainControlPart);
				
				//属性编排区
				var mainAttributeRowPartArea=$("<div id='mainAttributeRowPartArea' class='mainAttributeRowPartArea' name='mainAttributeRowPartArea'/>");
				mainAttributeRowPartArea.appendTo(mainControlPart);
				
				//属性行区
				createAttributeRowPart(mainAttributeRowPartArea);
				
				//创建主操作区
				function createMainControlPart(){
					var mainControlPart=$("<div id='mainControlPart' class='mainControlPart' name='mainControlPart'/>");
					mainControlPart.appendTo($("#entity"));
					return mainControlPart;
				}
				
				//创建主操作区菜单
				function createMainMenu(){
					var mainMenuPart=$("<div id='mainMenuPart' class='mainMenuPart' />");
					
					
					var btnControl=$("<div id='btnControl' class='btnControl' />");
					btnControl.appendTo(mainMenuPart);
					
					//保存
					var saveUserDataBtn=$("<button id='saveUserDataBtn' class='saveUserDataBtn'>"+screen_str.saveUserData+"</button>");
					saveUserDataBtn.appendTo(btnControl);
					saveUserDataBtn.bind("click", event_control_action.clickSaveUserDataBtn);
					
					//导入
					var importUserDataBtn=$("<button id='importUserDataBtn' class='importUserDataBtn'>"+screen_str.importUserData+"</button>");
					importUserDataBtn.appendTo(btnControl);
					importUserDataBtn.bind("click", event_control_action.clickImportUserDataBtn);
					
					//全符合
					var allAccordBtn=$("<button id='allAccordBtn' class='allAccordBtn'>"+screen_str.allAccord+"</button>");
					allAccordBtn.appendTo(btnControl);
					allAccordBtn.bind("click", event_control_action.clickAllAccord);
					
					//单个符合
					var singleAccordBtn=$("<button id='singleAccordBtn' class='singleAccordBtn'>"+screen_str.singleAccord+"</button>");
					singleAccordBtn.appendTo(btnControl);
					singleAccordBtn.bind("click", event_control_action.clickSingleAccord);
					
					//自定义
					var customBtn=$("<button id='customBtn' name='customBtn' class='customBtn'>"+screen_str.custom+"</button>");
					customBtn.appendTo(btnControl);
					customBtn.bind("click", event_control_action.clickCustomBtn);
					
					//括号
					var bracketBtn=$("<button id='bracketBtn' name='bracketBtn' class='bracketBtn'>"+screen_str.bracket+"</button>");
					bracketBtn.appendTo(btnControl);
					bracketBtn.bind("click", event_control_action.clickBracketBtn);
					
					return mainMenuPart;
				}
				
				//创建属性区
				function createAttributeRowPart(mainPart){
					//主编辑区行数
					var row=screen_constant.mainPartRowLength;
					for(var i=1;i<=row;i++){
						//属性部分
						var attributeRowPart=$("<div id='attributeRowPart"+i+"' class='attributeRowPart' name='attributeRowPart'/>");
						attributeRowPart.appendTo(mainPart);
						//颜色
						if(i%2){
							attributeRowPart.addClass("singleAttributeRowPart");
						}else{
							attributeRowPart.addClass("doubleAttributeRowPart");
						}
						
						//属性选择框
						var select=$("<input  type='checkbox' id='checkAttribute"+i+"' name='checkAttribute' class='checkAttribute'/>");
						select.appendTo(attributeRowPart);
						
						//关系
						var relationBtn=$("<button class='relationBtn' name='relationBtn' data='"+screen_str.relaAnd+"'>"+screen_str.relaAnd+"</button>");
						relationBtn.appendTo(attributeRowPart);
						relationBtn.bind("click", event_control_action.clickRelation);
						relationBtn.css("background-color",attributeRowPart.css("background-color"));
						
						//左括号
						var leftBracket=$("<span class='leftBracket' name='leftBracket'/>");
						leftBracket.appendTo(attributeRowPart);
										
						//属性区
						var attributeInstancePart=$("<span class='attributeInstancePart' name='attributeInstancePart' id='attributeInstancePart"+i+"' />");
						attributeInstancePart.appendTo(attributeRowPart);
						
						//属性区添加可拖拽事件：允许属性元素拖拽到属性区
						drag_action_effect.attributeInstancePartDroppable(attributeInstancePart);
						
						//运算符区
						var operatorSelSpan=$("<span class='operatorSelSpan' name='operatorSelSpan' />");
						operatorSelSpan.appendTo(attributeRowPart);
						
						//运算符区
						var operatorSel=$("<select class='operatorSel' name='operatorSel' />");
						operatorSel.appendTo(operatorSelSpan);
						
						//属性值区
						var attributeValueSpan=$("<span class='attributeValueSpan' name='attributeValueSpan' />");
						attributeValueSpan.appendTo(attributeRowPart);
						
						//右括号
						var rightBracket=$("<span class='rightBracket' name='rightBracket'/>");
						rightBracket.appendTo(attributeRowPart);
						
						//箭头上
						var upBtn=$("<span class='upBtn' name='upBtn' />");
						upBtn.appendTo(attributeRowPart);
						upBtn.bind("click",{clickBtn:upBtn} ,event_control_action.clickUpBtn);
						
						//箭头下
						var downBtn=$("<span class='downBtn' name='downBtn' />");
						downBtn.appendTo(attributeRowPart);
						downBtn.bind("click",{clickBtn:downBtn} ,event_control_action.clickDownBtn);
						
						//删除按钮
						var deleteBtn=$("<span class='deleteBtn' name='deleteBtn' />");
						deleteBtn.appendTo(attributeRowPart);
						deleteBtn.bind("click" ,{clickBtn:deleteBtn} ,event_control_action.clickDeleteBtn);
					}
				}
			}
			
		}
		
		var rule_public_util={
			//设置显示隐藏
			setVisible:function(state){
				var attributeRowParts=$("[name='attributeRowPart']");
				for(var i=0;i<screen_constant.mainPartRowLength;i++){
					var attributeRowPart=attributeRowParts[i];
					var attribute=$(attributeRowPart).find("[name='attributeInstancePart']").find("div");
					if(attribute.length>0){
						$(attributeRowPart).find("[name='checkAttribute']").css("visibility",state);
						$(attributeRowPart).find("[name='arrowsUp']").css("visibility",state);
						$(attributeRowPart).find("[name='arrowsDown']").css("visibility",state);
						$(attributeRowPart).find("[name='upBtn']").css("visibility",state);
						$(attributeRowPart).find("[name='downBtn']").css("visibility",state);
						$(attributeRowPart).find("[name='leftBracket']").css("visibility",state);
						$(attributeRowPart).find("[name='rightBracket']").css("visibility",state);
						$(attributeRowPart).find("[name='deleteBtn']").css("visibility",state);
					}else{
						$(attributeRowPart).find("[name='checkAttribute']").css("visibility","hidden");
						$(attributeRowPart).find("[name='checkAttribute']").attr("checked",false);
						$(attributeRowPart).find("[name='leftBracket']").css("visibility","hidden");
						$(attributeRowPart).find("[name='rightBracket']").css("visibility","hidden");
						$(attributeRowPart).find("[name='arrowsUp']").css("visibility","hidden");
						$(attributeRowPart).find("[name='arrowsDown']").css("visibility","hidden");
						$(attributeRowPart).find("[name='relationBtn']").css("visibility","hidden");
						$(attributeRowPart).find("[name='operatorSel']").css("visibility","hidden");
						$(attributeRowPart).find("[name='upBtn']").css("visibility","hidden");
						$(attributeRowPart).find("[name='downBtn']").css("visibility","hidden");
						$(attributeRowPart).find("[name='deleteBtn']").css("visibility","hidden");
						$(attributeRowPart).find("[name='attributeValueSpan']").empty(); 
					}
				}
			},
			
			//展示属性值
			displayCustomControl:function(attributeId,attributeInstancePart){				
				var attrOperValueData = {"operTypes":[{"id":"4","name":"=","code":"="},{"id":"5","name":">","code":">"},{"id":"6","name":"<","code":"<"},{"id":"7","name":"<=","code":"<="},{"id":"8","name":">=","code":">="}],"displayType":"text","attrValues":[]};
				
				//属性区
				var attributeRowPart=attributeInstancePart.parent();
				
				//属性实例区序列
				var attributeInstancePartIndex=$(attributeInstancePart).attr("id").replace("attributeInstancePart",screen_str.nullStr);
				
				//左括号
				var leftBracket=attributeRowPart.find("[name='leftBracket']");
				
				//右括号
				var rightBracket=attributeRowPart.find("[name='rightBracket']");
				
				//清空
				leftBracket.html(screen_str.nullStr);
				rightBracket.html(screen_str.nullStr);
				
				//关系按钮
				var relationBtn=attributeRowPart.find("[name='relationBtn']");
				relationBtn.css("visibility","visible");
				relationBtn.html(screen_str.relaAnd);
				
				//运算符下拉框
				var operatorSelSpan=attributeRowPart.find("[name='operatorSelSpan']");
				operatorSelSpan.css("visibility","visible");
				
				//重置
				var operatorSel=operatorSelSpan.find("[name='operatorSel']");
				if(operatorSel){
					operatorSel.remove();
				}
				operatorSel=$("<select class='operatorSel' name='operatorSel' />");
				operatorSel.appendTo(operatorSelSpan);
				 
				//运算符列表
				var operTypes=attrOperValueData.operTypes;			
				//运算符区添加运算符
				for(var i=0;i<operTypes.length;i++){
					var operType=operTypes[i];
					operatorSel.append("<option value='"+operType.id+"' code='"+operType.code+"'>"+operType.name+"</option>");   
				}
				
				//属性值区
				var attributeValueSpan=attributeRowPart.find("[name='attributeValueSpan']");
				
				//展示类型
				var displayType=attrOperValueData.displayType;
				attributeInstancePart.attr("displayType",displayType);
				
	//			displayType_text:"text",		//文本
	//			displayType_select:"select",	//下拉框
	//			displayType_checkbox:"checkbox",//复选框
	//			displayType_radio:"radio",		//单选框
	//			displayType_date:"date",		//日期
	//			displayType_datetime："datetime" //时间
				//添加属性值
				if(displayType==screen_constant.displayType_text){
					//文本框
					var input=$("<input  type='text' id='attrValue"+i+"' name='attrValue' class='attributeValueText'/>");
					input.appendTo(attributeValueSpan);
				}else if(displayType==screen_constant.displayType_date){
					//日期
					var date=$("<input id='date' name='date' class='attributeValueText'></input>");
					date.appendTo(attributeValueSpan);
				}else if(displayType==screen_constant.displayType_datetime){
					//时间
					var datetime=$("<input id='datetime' name='datetime' class='attributeValueText'></input>");
					datetime.appendTo(attributeValueSpan);
				}else if(displayType==screen_constant.displayType_radio||displayType==screen_constant.displayType_checkbox||displayType==screen_constant.displayType_select){
					var attrValues=attrOperValueData.attrValues;
					var select;
					if(displayType==screen_constant.displayType_select){
						select=$("<select class='attributeValueSelect'></select>");
						select.appendTo(attributeValueSpan);
					}
					
					for(var i=0;i<attrValues.length;i++){
						var attrValue=attrValues[i];
						if(displayType==screen_constant.displayType_radio){
							var radio=$("<input  type='radio' name='radio"+attributeInstancePartIndex+"' value='"+attrValue.code+"'></input>");
							var label=$("<span>"+attrValue.name+"</span> ");
							radio.appendTo(attributeValueSpan);
							label.appendTo(attributeValueSpan);
						}else if(displayType==screen_constant.displayType_checkbox){
							var checkbox=$("<input type='checkbox' name='checkbox"+attributeInstancePartIndex+"' value='"+attrValue.code+"'></input>");
							var label=$("<span>"+attrValue.name+"</span> ");
							checkbox.appendTo(attributeValueSpan);
							label.appendTo(attributeValueSpan);
						}else if(displayType==screen_constant.displayType_select){
							select.append("<option value='"+attrValue.code+"'>"+attrValue.name+"</option>");   
						}
					}
				}
			},
			
			//刷新属性模板区
			refreshAttributeTemplatePart:function(id,name){
				$("#attributeTemplatePart").empty();
				var attributesData = [{"id":1,"name":"Phone Number","code":"MSISDN_NUM"},{"id":2,"name":"Customer ID","code":"CUST_ID"},{"id":3,"name":"Customer Name","code":"CUST_NAME"},{"id":4,"name":"Age","code":"AGE"},{"id":5,"name":"Gender","code":"GENDER"},{"id":6,"name":"ARPU Level","code":"ARPU_LEVEL_ID"},{"id":7,"name":"Data Volumn Level","code":"DATA_VOL_LEVEL_ID"},{"id":8,"name":"WIMP Use Count","code":"USE_CNT"},{"id":9,"name":"Metallica Visit Count","code":"VISIT_CNT"},{"id":10,"name":"Metallica Search Count","code":"SEARCH_CNT"},{"id":11,"name":"Device Type","code":"DEV_NUM"},{"id":12,"name":"Is VIP","code":"IS_VIP"},{"id":13,"name":"Credit Level","code":"CREDIT_LEVEL"},{"id":14,"name":"Credit Value","code":"CREDIT_VALUE"},{"id":15,"name":"Region","code":"REGION_ID"}];
				for(var i in attributesData){
					var attributeData=attributesData[i];
					var attributeTemplate=$("<div id='attributeTemplate"+i+"' name='attributeTemplate' code='"+attributeData.code+"' title='"+attributeData.name+"' attrId='"+attributeData.id+"'>"+attributeData.name+"</div>");
					attributeTemplate.attr("isTemplate",true);			//是拖拽模板
					
					//属性添加可拖拽属性
					attributeTemplate.bind("click", event_control_action.dblClickAttributeTemplate);
					drag_action_effect.setAttributeTemplateDraggable(attributeTemplate);
	
					if(i%2){
						attributeTemplate.addClass('singleAttributeTemplate');
					}else{
						attributeTemplate.addClass('doubleAttributeTemplate');
					}
	
					attributeTemplate.appendTo($("#attributeTemplatePart"));
					
					attributeTemplate.bind("mouseover", event_control_action.mouseoverAttributeTemplate);
					attributeTemplate.bind("mouseout", event_control_action.mouseoutAttributeTemplate);
					
				}
			},
			
			//交换属性行，上下按钮使用,object：属性行
			exchangeAttributeRows:function(object,orderState){
				var clickAttrRowId=object.attr("id");			//属性行Id
				var sourceIndex=parseInt(clickAttrRowId.replace(screen_constant.attributeRowPart,screen_str.nullStr));		//属性行顺序
				
				var sourceAttrRow=object;
				var targetAttrRow;
				if(screen_constant.orderState_upBtn==orderState){	//向上
					var targetIndex=sourceIndex-1;
					exchangeAttributeRowsData(sourceAttrRow,sourceIndex,targetIndex);
				}else{												//向下
					var targetIndex=sourceIndex+1;
					
					var attributeRowParts=$("[name='attributeRowPart']");
					var maxAttrRowId=attributeRowParts.length;
					for(var i=0;i<attributeRowParts.length;i++){
						var attributeRowPart=$(attributeRowParts[i]);
						
						var attributeInstance=attributeRowPart.find("[name='attributeInstancePart']").find("div");
						if(attributeInstance.length){
							var rowId=attributeRowPart.attr("id").replace("attributeRowPart",screen_str.nullStr);
							maxAttrRowId=parseInt(rowId);
						}
					}
					
					if(sourceIndex>=maxAttrRowId){
						alert(screen_str.down_btn_tip);
						return;
					}
					
					exchangeAttributeRowsData(sourceAttrRow,sourceIndex,targetIndex)
				}
				
				//交换属性行数据
				function exchangeAttributeRowsData(sourceAttrRow,sourceIndex,targetIndex){
					
					var targetId="#"+screen_constant.attributeRowPart+targetIndex;
					
					targetAttrRow=$(targetId);  //获得下一行
					
					if(!targetAttrRow.attr("id")){
						alert(screen_str.order_upDown);
						return;
					}
					
					//交换Id
					sourceAttrRow.attr("id",screen_constant.attributeRowPart+targetIndex);
					targetAttrRow.attr("id",screen_constant.attributeRowPart+sourceIndex);
					
					//交换颜色
					var srcBakGndCol=sourceAttrRow.css("background-color");
					var trgBakGndCol=targetAttrRow.css("background-color");
					
					//属性行换色
					sourceAttrRow.css("background-color",trgBakGndCol);
					targetAttrRow.css("background-color",srcBakGndCol);
					
					//属性实例换色
					sourceAttrRow.find("[name='attributeInstance']").css("background-color",trgBakGndCol);
					targetAttrRow.find("[name='attributeInstance']").css("background-color",srcBakGndCol);
					
					//关系按钮换色
					sourceAttrRow.find("[name='relationBtn']").css("background-color",trgBakGndCol);
					targetAttrRow.find("[name='relationBtn']").css("background-color",srcBakGndCol);
					
					//交换位置
					if(screen_constant.orderState_upBtn==orderState){	//向上
						sourceAttrRow.insertBefore(targetAttrRow);
					}else{												//向下
						sourceAttrRow.insertAfter(targetAttrRow);
					}
				}
			}
		}
		
		var event_control_action={
			//根据分组名称加载分组树
			loadGroupTree:function(groupName){					
				var treeData = [{"id":1,"open":"true","pId":0,"name":"CRM"},{"id":2,"open":"true","pId":1,"name":"Campaign"},{"id":4,"open":"true","pId":0,"name":"Billing"},{"id":3,"open":"true","pId":1,"name":"Sales"}];
				$.fn.zTree.init($("#groupTree"), screen_data.groupTreeSetting, treeData);
			},	
			
			//鼠标滑过属性模板
			mouseoverAttributeTemplate:function(){
				$(this).parent().children().css("filter","alpha(opacity:40)");
				$(this).parent().children().css("opacity","0.4");
				
				this.style.filter="alpha(opacity:100)";
				this.style.opacity=1;
			},
			
			//鼠标划出属性模板
			mouseoutAttributeTemplate:function(){
				$(this).parent().children().css("filter","alpha(opacity:100)");
				$(this).parent().children().css("opacity","1");
			},
			
			//双击属性模板
			dblClickAttributeTemplate:function(){
				var template=$(this);
				var isTemplate=template.attr("isTemplate");
				if(isTemplate==screen_constant.trueCon){
					
					var nextAttrRowId=0;
					var attributeRowParts=$("[name='attributeRowPart']");
					
					for(var i=0;i<attributeRowParts.length;i++){
						var attributeRowPart=$(attributeRowParts[i]);
						
						var attributeInstance=attributeRowPart.find("[name='attributeInstancePart']").find("div");
						if(attributeInstance.length){
							nextAttrRowId=(i+1);
						}
					}
					var instance=$(attributeRowParts[nextAttrRowId]).find("[name='attributeInstancePart']");
					
					if(nextAttrRowId==attributeRowParts.length-1){
						alert(screen_str.dbAttribute);
						return ;
					}
					
					var validateResult=drag_action_effect.validateDragable(instance);
					if(!validateResult){			//如果验证失败，退出
						return;
					}
					
					//把模板添加到实例
					drag_action_effect.addTemplate2Instance(template,instance);
				}else if(isTemplate==screen_constant.falseCon){			//如果不是模板
					$(this).parent().empty();
					if(screen_constant.relationState==screen_constant.relationState_custom){
						rule_public_util.setVisible("visible");
					}else{
						rule_public_util.setVisible("hidden");
					}
				}else{
					return ;
				}
			},
			
			//单击查询
			clickSearch:function(){
				event_control_action.loadGroupTree($("#searchTxt").val());
				rule_public_util.refreshAttributeTemplatePart(screen_str.nullStr,$("#searchTxt").val());
			},
		
			//单击分组
			clickGroup:function(event, treeId, treeNode, clickFlag){
				$("#attributeTemplatePart").empty();
				if(!treeNode.children){
					rule_public_util.refreshAttributeTemplatePart(treeNode.id,screen_str.nullStr);
					screen_constant.currentCatId=treeNode.id;
				}
			},
			
			//单击括号
			clickBracketBtn:function(e){
				var hasCheckAttributeRowParts=new Array();	//选中行数组
				var attributeRowParts=$("[name='attributeRowPart']");
				var flag=false;								//选中行是否有括号标识
				for(var i=0;i<attributeRowParts.length;i++){
					var attributeRowPart=attributeRowParts[i];
					var checkAttribute=$(attributeRowPart).find("[name='checkAttribute']");
					if(checkAttribute.attr("checked")=="checked"){
						
						//如果选中行已经有括号，则取消括号
						var leftBracket=$(attributeRowPart).find("[name='leftBracket']");
						var rightBracket=$(attributeRowPart).find("[name='rightBracket']");
						if(leftBracket.html()=="("||rightBracket.html()==")"){
							leftBracket.html(screen_str.nullStr);
							rightBracket.html(screen_str.nullStr);
							flag=true;
						}
						
						hasCheckAttributeRowParts.push(attributeRowPart);
					}
				}
				
				if(flag){		//如果选中行有括号，返回							
					return;
				}
				
				if(hasCheckAttributeRowParts.length<2){
					alert(screen_str.click_bracket);
					return;
				}
				
				//为选中行打括号
				var startRow=hasCheckAttributeRowParts[0];	//选中行的首行
				var endRow=hasCheckAttributeRowParts[hasCheckAttributeRowParts.length-1];//选中行的末行
				//获得首位行括号区
				var startRowLeftBracket=$(startRow).find("[name='leftBracket']");
				var endRowRightBracket=$(endRow).find("[name='rightBracket']");
				
				$(startRowLeftBracket).html("(");
				$(endRowRightBracket).html(")");
			},
			
			//单击自定义
			clickCustomBtn:function(e){
				screen_constant.relationState=screen_constant.relationState_custom;
				$("[name='bracketBtn']").css("visibility","visible");
				rule_public_util.setVisible("visible");
			},
			
			//单击全部符合
			clickAllAccord:function(e){
				screen_constant.relationState=screen_constant.relationState_all;
				$("[name='bracketBtn']").css("visibility","hidden");
				rule_public_util.setVisible("hidden");
				$("[name='relationBtn']").html(screen_str.relaAnd);
				$("[name='relationBtn']").attr("data",screen_str.relaAnd);
			},
			
			//单击单个符合
			clickSingleAccord:function(e){
				screen_constant.relationState=screen_constant.relationState_single;
				$("[name='bracketBtn']").css("visibility","hidden");
				$("[name='relationBtn']").html(screen_str.relaOr);
				$("[name='relationBtn']").attr("data",screen_str.relaOr);
				rule_public_util.setVisible("hidden");
			},
			
			//单击导入用户数据
			clickImportUserDataBtn:function(e){
				user_data_util.importUserData();
			},
			
			//单击保存用户数据
			clickSaveUserDataBtn:function(e){
				user_data_util.saveUserData();
			},
			
			//单击关系
			clickRelation:function(){
				var data=$(this).attr("data");
				if(screen_str.relaAnd==data){
					$(this).html(screen_str.relaOr);
					$(this).attr("data",screen_str.relaOr);
				}else{
					$(this).html(screen_str.relaAnd);
					$(this).attr("data",screen_str.relaAnd);
				}
			},
			
			//单击向上
			clickUpBtn:function(event){
				var clickAttributeRow=$(event.data.clickBtn).parent();
				rule_public_util.exchangeAttributeRows(clickAttributeRow,screen_constant.orderState_upBtn);
			},
			
			//单击向下
			clickDownBtn:function(event){
				var clickAttributeRow=$(event.data.clickBtn).parent();
				rule_public_util.exchangeAttributeRows(clickAttributeRow,screen_constant.orderState_downBtn);
			},
			
			//单击删除
			clickDeleteBtn:function(event){
				var clickAttributeRow=$(event.data.clickBtn).parent();		
					
				var attributeInstancePart=$(clickAttributeRow).find("[name='attributeInstancePart']");	//属性实例区
				var attribute=$(attributeInstancePart).find("div");
				$(attribute).remove();
				
				//刷新属性区
				if(screen_constant.relationState==screen_constant.relationState_custom){
					rule_public_util.setVisible("visible");
				}else{
					rule_public_util.setVisible("hidden");
				}	
			}
		}
		
		var drag_action_effect={
			//设置模板可拖拽属性
			setAttributeTemplateDraggable:function(object){
				object.draggable({
					proxy:'clone',
					revert:true,
					cursor:'hand',
					containment: '#containment-wrapper',
					scroll: false, 
					onStartDrag:function(){
						$(this).draggable('options').cursor='not-allowed';
					},
					onStopDrag:function(){
						$(this).draggable('options').cursor='auto';
					}
				});
			},
			//设置实例可拖拽属性
			setAttributeInstanceDraggable:function(object){
				object.draggable("disable");
				object.css('cursor',"auto");
			},
			
			//实例部分可松开属性
			attributeInstancePartDroppable:function(object){
				object.droppable({
					accept:"[name='attributeTemplate']",
					onDragEnter:function(e,source){
						$(source).draggable('options').cursor='auto';
						$(source).draggable('proxy').css('border','1px solid #FFFF00');
					},
					onDragLeave:function(e,source){
						$(source).draggable('options').cursor='not-allowed';
						$(source).draggable('proxy').css('border','1px solid #CD7F32');
					},
					onDrop:function(e,source){
						var validateResult=drag_action_effect.validateDragable($(this));
						if(!validateResult){			//如果验证失败，退出
							return;
						}
						
						//把模板添加到实例
						drag_action_effect.addTemplate2Instance($(source),$(this));
					}
				});
			},
			
			//验证是否可以拖拽
			validateDragable:function(instancePart){
				var insPartChildLength=instancePart.children().length;
				if(insPartChildLength>0){		//如果实例区已经有该属性，返回
					return false;
				}
				//如果拖拽其他分组的属性，给出提示
				var hasEditRow=false;																		//是否有已编排行
				
				//如果已编排
				var attributeRowParts=$("[name='attributeRowPart']");										//属性行区
				for(var i=0;i<screen_constant.mainPartRowLength;i++){
					var attributeRowPart=attributeRowParts[i];												//属性行
					var attributeInstancePart=$(attributeRowPart).find("[name='attributeInstancePart']");	//属性实例区
					var attribute=attributeInstancePart.find("div");
					if(attribute.length){
						hasEditRow=true;
					}
				}
				if(!hasEditRow){									//如果没有编排
					screen_constant.editCatId=0;
				}
				if(screen_constant.editCatId						//如果已编排，并且已经编排属性分组与拖拽属性属性分组Id不相等，则给出提示
						&&screen_constant.editCatId!=screen_constant.currentCatId){		
					alert(screen_str.dragVerify);
					return false;
				}else{
					screen_constant.editCatId=screen_constant.currentCatId;
				}
				return true;
			},
			
			//实例部分添加模板
			addTemplate2Instance:function(template,instancePart){
				
				//设置被拖拽对象背景颜色与拖拽行相同
				var rowColor=instancePart.parent().css("background-color");
				template.css("background-color",rowColor);
				template.attr("isTemplate",false);
				
				//添加拖拽对象
				template.css("background","none");
				instancePart.append(template);
				
				//重新设置属性实例可拖拽属性
				drag_action_effect.setAttributeInstanceDraggable(template);
				
				//如果是是自定义显示整行所有内容
				if(screen_constant.relationState==screen_constant.relationState_custom){
					rule_public_util.setVisible("visible");
				}
				
				//如果被拖拽的对象是模板对象，展示运算符、关系、属性值
				if(template.attr("name")==screen_constant.attributeTemplate){
					var attributeId=template.attr("attrId");
					rule_public_util.displayCustomControl(attributeId,instancePart);
				}
				
				//重置名称，不允许拖拽
				template.attr("name","attributeInstance");	

				//左侧模板区刷新
				rule_public_util.refreshAttributeTemplatePart(screen_constant.currentCatId,screen_str.nullStr);
			}
		}
		
		var user_data_util={
			//保存用户数据
			saveUserData:function(){
				//保存
				screen_data.saveUserData=[];																//清空用户数据
				var bracketFlag=true;																		//括号标识
				var attributeRowParts=$("[name='attributeRowPart']");										//属性行区
				for(var i=0;i<screen_constant.mainPartRowLength;i++){
					var attributeRowPart=attributeRowParts[i];												//属性行
					var attributeInstancePart=$(attributeRowPart).find("[name='attributeInstancePart']");	//属性实例区
					var attribute=attributeInstancePart.find("div");
					
					if(attribute.length){
						var userAttrRowData={};																//用户行数据
						
						var leftBracket=$(attributeRowPart).find("[name='leftBracket']");					//左括号
						userAttrRowData.leftBracket=leftBracket.html();
						
						if(bracketFlag==false&&"("==leftBracket.html()){
							alert(screen_str.bracketHint);
							return ;
						}else if("("==leftBracket.html()){
							bracketFlag=false;
						}
						
						var attrId=attribute.attr("attrId");												//属性ID
						userAttrRowData.attrId=attrId;
						
						var attrCode=attribute.attr("code");												//属性ID
						userAttrRowData.attrCode=attrCode;
						
						var operatorSel=$(attributeRowPart).find("[name='operatorSel']");					//运算符
						if(!operatorSel.val()||operatorSel.val()=="0"){
							alert(screen_str.select_operator);
							operatorSel.focus();
							return ;
						}
						userAttrRowData.operatorSel=operatorSel.val();
						userAttrRowData.operatorSelCode=operatorSel.find("option:selected").attr("code");	//运算符编码
						
						var attributeValueSpan=$(attributeRowPart).find("[name='attributeValueSpan']");		//属性值
						var attributeValues=attributeValueSpan.children();
						
						var attributeValuesData=[];
						userAttrRowData.attributeValues=attributeValuesData;
						for(var j=0;j<attributeValues.length;j++){
							var attributeValueData={};
							var attributeValue=attributeValues[j];
							if((($(attributeValue).is('input:radio')
									||$(attributeValue).is('input:checkbox'))&&$(attributeValue).attr("checked")=='checked')||$(attributeValue).is('select')||$(attributeValue).is('input:text')){
								if($(attributeValue).val()!=screen_str.nullStr){
									attributeValueData.value=$(attributeValue).val();
									attributeValuesData.push(attributeValueData);
								}
							}
						}
						if(!attributeValuesData.length){
							alert(screen_str.select_rule_value);
							return ;
						}
						
						var rightBracket=$(attributeRowPart).find("[name='rightBracket']");					//右括号
						userAttrRowData.rightBracket=rightBracket.html();
						if(bracketFlag&&")"==rightBracket.html()){
							alert(screen_str.bracketHint);
							return;
						}else if(")"==rightBracket.html()){
							bracketFlag=true;
						}
						
						var relationBtn=$(attributeRowPart).find("[name='relationBtn']");					//关系
						userAttrRowData.relationBtn=relationBtn.html();
						
						screen_data.saveUserData.push(userAttrRowData);										//行数据添加到数组
					}
				}
				
				if(!bracketFlag){																			//括号验证
					alert(screen_str.bracketHint);
					return;
				}
				
				if(screen_data.saveUserData.length==0){
					alert(screen_str.saveVerify);
					return;
				}

				alert(screen_str.save_success);																//保存成功提示
			},
			
			//导入用户数据
			importUserData:function(){
				//验证配置条数
				var flag=true;
				var attributeRowParts=$("[name='attributeRowPart']");										//属性行区
				for(var i=0;i<screen_constant.mainPartRowLength;i++){
					var attributeRowPart=attributeRowParts[i];												//属性行
					var attributeInstancePart=$(attributeRowPart).find("[name='attributeInstancePart']");	//属性实例区
					var attribute=attributeInstancePart.find("div");
					
					if(attribute.length){
						flag=false;
					}
				}
				
				if(flag){
					alert(screen_str.saveVerify);
					return;
				}				

				alert("Target customers begins to import");	
			},

			//读取用户数据
			loadUserData:function(){
				screen_data.saveUserData=[{"attrId":4,"relationBtn":"And","attributeValues":[{"value":"24"}],"operatorSel":4,"operatorSelCode":"=","attrName":"Age","attrCode":"AGE"}];
				var userDataLength=screen_data.saveUserData.length;		//用户数据行数
				if(userDataLength>0){
					event_control_action.clickCustomBtn();
				}
				
				var attrInsParts=$("[name='attributeInstancePart']");	//属性实例区
				
				for(var i=0;i<userDataLength;i++){
					var attrRowData=screen_data.saveUserData[i];
					var addRowInsPart=$(attrInsParts[i]);	
					var attributeRowPart=addRowInsPart.parent();
					var relationBtn=attributeRowPart.find("[name='relationBtn']");
					//创建拖拽实例
					var attributeInstance=$("<div id='attributeInstance"+i+"' name='attributeInstance' code='"+attrRowData.attrCode+"'"+
							" class='attributeInstance' title='"+attrRowData.attrName+"' attrId='"+attrRowData.attrId+"'>"+attrRowData.attrName+"</div>");
					
					//修改颜色
					var rowColor= attributeRowPart.css("background-color");
					attributeInstance.css("background-color",rowColor);
					relationBtn.css("background-color",rowColor);
					addRowInsPart.append(attributeInstance);
					
					rule_public_util.displayCustomControl(attrRowData.attrId,addRowInsPart);		//展示运算符、属性值
					
					user_data_util.setUserDataCustomControl(attrRowData,attributeRowPart);			//设置用户数据：左括号、运算符、属性值、关系、右括号
					
					attributeInstance.attr("isTemplate",false);			//是拖拽模板
					attributeInstance.bind("dblclick", event_control_action.dblClickAttributeTemplate);
				}
				
				//当用户已保存数据，则展示为自定义
				if(userDataLength>0){
					event_control_action.clickCustomBtn();
				}
				
				screen_constant.editCatId=0;
			},
			
			//设置用户数据：左括号、运算符、属性值、关系、右括号
			setUserDataCustomControl:function(attrRowData,attributeRowPart){
				
				var leftBracket=attributeRowPart.find("[name='leftBracket']");					//左括号区
				leftBracket.html(attrRowData.leftBracket);
				
				var operatorSel=attributeRowPart.find("[name='operatorSel']");					//运算符区
				operatorSel.val(attrRowData.operatorSel);
				
				var attributeValueSpan=attributeRowPart.find("[name='attributeValueSpan']");	//属性值区
				var attributeValues=attributeValueSpan.children();
				
				for(var j=0;j<attributeValues.length;j++){
					var attributeValue=attributeValues[j];
					if($(attributeValue).is('input')||$(attributeValue).is('select')){	//循环元素
						var attributeValuesData=attrRowData.attributeValues;
						for(var i=0;i<attributeValuesData.length;i++){					//循环数据
							var attributeValueData=attributeValuesData[i];
							if(($(attributeValue).is('input:radio')||$(attributeValue).is('input:checkbox'))&&attributeValueData.value==$(attributeValue).val()){
								$(attributeValue).attr("checked","checked");
							}
							if($(attributeValue).is('select')||$(attributeValue).is('input:text')){
								$(attributeValue).val(attributeValueData.value);
							}
						}
					}
				}
				
				var rightBracket=attributeRowPart.find("[name='rightBracket']");			//右括号区
				rightBracket.html(attrRowData.rightBracket);
				
				var relationBtn=attributeRowPart.find("[name='relationBtn']");				//关系
				if(attrRowData.relationBtn!=screen_str.nullStr){
					relationBtn.html(attrRowData.relationBtn);
				}else{
					relationBtn.css("visibility","hidden");
				}
			}
		}
		