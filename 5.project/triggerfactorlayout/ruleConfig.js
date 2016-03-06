var g_RuleConfig = {
	groupData : {}, /* 分组数据信息 */
	ruleData : {}, /* 因子用户数据 */
	saveData : [], /* 因子保存数据 */
	userData : [], /* 用户数据 */
	settings : {}, /* 配置信息 */
	tips : {}, /* 提示信息 */
	area : {}, /* 控件信息 */
	lastGroupNum : 0, /* 每个分组拥有最后节点分组数 */
	lastGroupTotal : 0, /* 总共拥有最后节点分组数 */
	groupsData : new Map(), /* 分组信息数据 */
	editGroupId : 0, /* 正在编辑的分组ID */
	groupsUserData:new Array(),	/*当前编辑的分组的用户数据*/
	// 创建规则编排界面
	createRules : function() {
		// 重置数据
		g_RuleConfig.lastGroupTotal = 0;
		g_RuleConfig.groupsData = new Map();

		// 获取数据
		var groupData = g_RuleConfig.groupData;
		var groupDataLength = g_RuleConfig.groupData.groups.length;
		var rulesSettings = g_RuleConfig.settings;
		var groups = groupData.groups;

		// 绘制框架
		var area = document.getElementById(rulesSettings.detailArea);
		area.className = css_data.ruleConfig_area;
		g_RuleConfig.area = area;
		// 加载分组数据
		for ( var i = 0; i < groupDataLength; i++) {
			var group = groups[i];
			g_RuleConfig.getGroupsData(group);
		}
		// 绘制规则标题
		g_RuleConfig.drawRuleTitle();

		// 绘制分组区域
		g_RuleConfig.drawRuleGroups();

		// 绘制规则区域
		g_RuleConfig.drawRuleGround();

		// 设置用户数据
		g_RuleConfig.setUserData();

		// 设置视图样式
		g_RuleConfig.setting();
		
		// 隐藏下拉框
		g_RuleConfig.clickDocument();
	},
	
	// 单击文档
	clickDocument : function(){
		EventUtil.addEventHandler(document, event_type.click, g_RuleConfig.eventClickDocument);
	},
	
	// 单击文档事件
	eventClickDocument : function(){
		g_RuleConfig.hiddenAllSelect();
	},
	
	// 隐藏下拉框
	hiddenAllSelect : function(){
		var selects=getElementsByClassName(css_data.ruleConfig_ruleValueSelect,string_data.select);
		for(var i=0;i<selects.length;i++){
			selects[i].style.display="none";
		}
	},

	// 重置
	resetRuleConfig : function() {
		var resetArea = document.getElementById(g_RuleConfig.settings.detailArea);
		if (resetArea) {
			document.getElementById(g_RuleConfig.settings.detailArea).innerHTML = string_data.nullString;
		}
	},

	// 设置用户数据
	setUserData : function() {
		var rulePanels = g_RuleConfig.area.getElementsByTagName(string_data.span);

		// 循环规则
		if (g_RuleConfig.userData) {
			for ( var i = 0; i < g_RuleConfig.userData.length; i++) {
				var userRuleData = g_RuleConfig.userData[i];
				var flag = true;	
				for ( var j = 0; j < rulePanels.length; j++) {
					var rulePanel = rulePanels[j];
					if (rulePanel.id.replace(string_data.rulePanel, string_data.nullString) == userRuleData.id) {
						flag = false;
						g_RuleConfig.replaceRulePanel(userRuleData);
					}
				}
				
				if (flag) {		//当用户设置触发因子为不显示，展示用户已经保存的不显示的触发因子
					var drawRulePanel = g_RuleConfig.drawRulePanel(userRuleData);
					var rulesGroup = document.getElementById(string_data.rulesGroup + userRuleData.groupId);
					if (rulesGroup)
						rulesGroup.appendChild(drawRulePanel);
				}
			}
		}
	},

	// 设置视图样式
	setting : function() {
		if (g_RuleConfig.settings.isView) {
			var buttons = g_RuleConfig.area.getElementsByTagName(string_data.button);
			var selects = g_RuleConfig.area.getElementsByTagName(string_data.select);
			var inputs = g_RuleConfig.area.getElementsByTagName(string_data.input);
			// className, root, tagName
			var deletes = getElemsByClassName(css_data.ruleConfig_ruleValueDelete, document, string_data.div);
			var rules = getElemsByClassName(css_data.ruleConfig_rule, document, string_data.div);
			if (buttons) {
				for ( var i = 0; i < buttons.length; i++) {
					var button = buttons[i];
					button.style.display = string_data.none;
				}
			}

			if (selects) {
				for ( var i = 0; i < selects.length; i++) {
					var select = selects[i];
					select.disabled = true;
				}
			}

			if (inputs) {
				for ( var i = 0; i < inputs.length; i++) {
					var input = inputs[i];
					input.disabled = true;
				}
			}

			if (deletes) {
				for ( var i = 0; i < deletes.length; i++) {
					var del = deletes[i];
					del.style.display = string_data.none;
				}
			}

			if (rules) {
				for ( var i = 0; i < rules.length; i++) {
					var rule = rules[i];
					rule.disabled = true;
				}
			}
		}
	},

	// 绘制规则标题
	drawRuleTitle : function() {
		var ruleTitle = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_ruleTitle
		});
		g_RuleConfig.area.appendChild(ruleTitle);

		var ruleTitleText = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_ruleTitleText
		});
		var ruleTitleContent = string_data.spacing + string_data.spacing + string_data.spacing + string_data.spacing + 
		g_RuleConfig.settings.source + " (" + string_data.relation	+ " : " + g_RuleConfig.groupData.relation + " ) ";

		if (ruleTitleContent.length > 46) {
			ruleTitleText.tip = ruleTitleContent;
			EventUtil.addEventHandler(ruleTitleText, event_type.mouseover, g_RuleConfig.eventMouseOverRule);
			ruleTitleText.innerHTML = ruleTitleContent.substring(0, 46) + string_data.ellipsis;
		} else {
			ruleTitleText.innerHTML = ruleTitleContent;
		}
		ruleTitle.appendChild(ruleTitleText);

		// 标题提示区域
		var hint = g_ruleConfigUtils.createPanel({
			id : string_data.hint,
			tagName : string_data.div,
			className : css_data.ruleConfig_hint
		});
		ruleTitle.appendChild(hint);

		// 标题按钮区
		var controlPanel = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_controlPanel
		});
		ruleTitle.appendChild(controlPanel);
		// 保存按钮
		var saveBtn = g_ruleConfigUtils.createPanel({
			tagName : string_data.button,
			className : css_data.ruleConfig_saveBtn,
			html:string_data.save
		});
		EventUtil.addEventHandler(saveBtn, event_type.click, g_RuleConfig.eventClickSave);
		controlPanel.appendChild(saveBtn);
	},

	// 绘制规则区域
	drawRuleGround : function() {
		// 规则面板（右侧区）
		var ruleGround = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_ruleGround,
			id : string_data.rulesGroup
		});
		g_RuleConfig.area.appendChild(ruleGround);
		ruleGround.style.height = g_RuleConfig.lastGroupTotal * css_data.groupLastHeight + string_data.px;
		g_RuleConfig.area.style.height = g_RuleConfig.lastGroupTotal * css_data.groupLastHeight + css_data.ruleTitleHeight + string_data.px;
		var ruleData = g_RuleConfig.ruleData;
		var rulesGroupsData = ruleData.groups;
		if (rulesGroupsData) {
			for ( var i = 0; i < rulesGroupsData.length; i++) {
				var rulesGroupData = rulesGroupsData[i];
				var groupData = rulesGroupData.groups;
				// 规则分组区
				var rulesGroup = g_ruleConfigUtils.createPanel({
					id : string_data.rulesGroup + rulesGroupData.id,
					tagName : string_data.div,
					className : css_data.ruleConfig_rulesGroup
				});
				rulesGroup.dir = string_data.rtl;
				if (i % 2 == 0) {
					rulesGroup.style.backgroundColor = css_data.ruleConfig_bg_even_row;
				} else {
					rulesGroup.style.backgroundColor = css_data.ruleConfig_bg_odd_row;
				}
				rulesGroup.style.height = (css_data.groupLastHeight-1) + string_data.px;
				ruleGround.appendChild(rulesGroup);
				EventUtil.addEventHandler(ruleGround, event_type.scroll, g_RuleConfig.eventScrollGroup);
				g_RuleConfig.drawRuleGroup(groupData, rulesGroup);
			}
		}
	},

	// 绘制规则区域分组
	drawRuleGroup : function(groupData, rulesGroup) {
		// 编辑按钮
		var rulesEdit = g_ruleConfigUtils.createPanel({
			tagName : string_data.button,
			className : css_data.ruleConfig_rulesEdit
		});
		EventUtil.addEventHandler(rulesEdit, event_type.click, g_RuleConfig.eventClickRulesEdit);
		rulesGroup.appendChild(rulesEdit);
		if (groupData) {
			for ( var j = 0; j < groupData.length; j++) {
				var ruleData = groupData[j];
				// 绘制规则div
				var drawRulePanel = g_RuleConfig.drawRulePanel(ruleData);
				rulesGroup.appendChild(drawRulePanel);
			}
		}
	},

	// 绘制规则Panel
	drawRulePanel : function(ruleData) {
		// 规则以及规则值panel
		var rulePanel = g_ruleConfigUtils.createPanel({
			id : string_data.rulePanel + ruleData.id,
			regex : ruleData.regex,
			msg : ruleData.msg,
			name : css_data.ruleConfig_rulePanel,
			tagName : string_data.span,
			className : css_data.ruleConfig_rulePanel,
			data : ruleData
		});
		// 规则区
		var rule = g_RuleConfig.drawRule(ruleData, rulePanel);
		
		var userRuleDatas=ruleData.userData;
		
		// 添加规则区
		rulePanel.appendChild(rule);
		
		// 添加规则值区
		if(userRuleDatas&&userRuleDatas.length>0){
			if(typeof userRuleDatas == string_data.string){
				g_RuleConfig.drawRuleValuePanel(ruleData, rulePanel,userRuleDatas);
			}else{
				for(var i=0;i<userRuleDatas.length;i++){
					var userRuleData=userRuleDatas[i];
					g_RuleConfig.drawRuleValuePanel(ruleData, rulePanel,userRuleData);
				}
			}
		}else{
			g_RuleConfig.drawRuleValuePanel(ruleData, rulePanel,string_data.nullString);
		}
		return rulePanel;
	},

	// 绘制规则
	drawRule : function(ruleData, rulePanel) {
		var ruleName = ruleData.name;
		var regex = ruleData.regex;
		var msg = ruleData.msg;

		var rule = g_ruleConfigUtils.createPanel({
			regex : regex,
			msg : msg,
			tagName : string_data.div,
			className : css_data.ruleConfig_rule,
			html : ruleName
		});
		// 添加单击事件
		EventUtil.addEventHandler(rule, event_type.click, g_RuleConfig.eventClickRule);

		// 规则鼠标悬浮
		if (ruleName.length > 10) {
			rule.tip = ruleName;
			EventUtil.addEventHandler(rule, event_type.mouseover, g_RuleConfig.eventMouseOverRule);
			rule.innerHTML =string_data.ellipsis+ ruleName.substring(0, 10);
		} else {
			rule.innerHTML = ruleName;
		}
		return rule;
	},

	// 绘制规则值panel
	drawRuleValuePanel : function(ruleData, rulePanel, userRuleData) {
		// 规则值panel
		var ruleValuePanel = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_ruleValuePanel
		});
		// 添加规则值区
		rulePanel.appendChild(ruleValuePanel);
		var ruleValue = g_RuleConfig.drawRuleValue(ruleData, userRuleData);
		var ruleValueDelete = g_RuleConfig.drawDeleteRuleValue();

		if (ruleValue) {
			ruleValuePanel.appendChild(ruleValue);
			ruleValuePanel.appendChild(ruleValueDelete);
		}
	},

	// 绘制规则值区
	drawRuleValue : function(ruleData, userRuleData) {
		var ruleType = ruleData.type;
		var ruleValueData = ruleData.groups;
		var ruleValue;
		// 绘制规则值
		switch (ruleType) {
		case rule_type.text:
			ruleValue = g_RuleConfig.drawRuleValueText(ruleValueData, userRuleData);
			break;
		case rule_type.select:
			ruleValue = g_RuleConfig.drawRuleValueSelete(ruleValueData, userRuleData);
			break;
		case rule_type.date:
			ruleValue = g_RuleConfig.drawRuleValueDate(ruleValueData, userRuleData);
			break;
		case rule_type.time:
			ruleValue = g_RuleConfig.drawRuleValueTime(ruleValueData, userRuleData);
			break;
		default:
			break;
		}
		return ruleValue;
	},

	// 绘制规则值：文本
	drawRuleValueText : function(ruleValueData, userRuleData) {
		var ruleValueText = g_ruleConfigUtils.createPanel({
			tagName : string_data.input,
			className : css_data.ruleConfig_ruleValue_text,
			value : userRuleData
		});
		return ruleValueText;
	},

	// 绘制规则值：下拉框
	drawRuleValueSelete : function(ruleValueData, userRuleData) {
		// 创建外面div
		var ruleValueDiv = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_ruleValueDiv
		});
		
		//创建文本框
		var ruleValueText = g_ruleConfigUtils.createPanel({
			tagName : string_data.input,
			className : css_data.ruleConfig_ruleValueText
		});
		ruleValueText.name = string_data.ruleValInput;
		ruleValueText.isDisplay = true;

		EventUtil.addEventHandler(ruleValueText, event_type.click, g_RuleConfig.showDivStation);
		EventUtil.addEventHandler(ruleValueText, event_type.keyup, g_RuleConfig.valInputClick);

		ruleValueDiv.appendChild(ruleValueText);
		var ruleValueSelect = g_ruleConfigUtils.createPanel({
			tagName : string_data.select,
			className : css_data.ruleConfig_ruleValueSelect,
			name:css_data.ruleConfig_ruleValueSelect
		});
		// 级联
		EventUtil.addEventHandler(ruleValueSelect, event_type.change, g_selectUtils.changeOption);
		EventUtil.addEventHandler(ruleValueSelect, event_type.click, g_RuleConfig.selectStation);
		ruleValueSelect.dir = string_data.ltr;
		
		if(ruleValueData){
			g_selectUtils.addOption(ruleValueSelect, ruleValueData);
			if (ruleValueData.length >= 10) {
				ruleValueSelect.size = 10;
			} else if (ruleValueData.length == 1) {
				ruleValueSelect.size = 2;
			} else {
				ruleValueSelect.size = 5;
			}
		}
		
		ruleValueDiv.appendChild(ruleValueSelect);

		if (userRuleData) {
			for ( var i = 0; i < ruleValueSelect.options.length; i++) {
				var optionValue = ruleValueSelect.options[i].value;
				if (optionValue.split("@~")[0] == userRuleData) {
					ruleValueSelect.options[i].selected = true;
				}
			}
		}
		
		if(ruleValueSelect.options.length>0){
			ruleValueText.value = ruleValueSelect.options[ruleValueSelect.selectedIndex].text;
		}else{
			ruleValueText.value =userRuleData;
		}
		return ruleValueDiv;
	},

	// 绘制规则值：日期
	drawRuleValueDate : function(ruleValueData, userRuleData) {
		var ruleValueDate = g_ruleConfigUtils.createPanel({
			tagName : string_data.input,
			className : css_data.ruleConfig_ruleValue_text,
			value : userRuleData
		});
		return ruleValueDate;
	},

	// 绘制规则值：时间
	drawRuleValueTime : function(ruleValueData, userRuleData) {
		var ruleValueTime = g_ruleConfigUtils.createPanel({
			tagName : string_data.input,
			className : css_data.ruleConfig_ruleValue_text,
			value : userRuleData
		});
		return ruleValueTime;
	},

	// 绘制删除规则值
	drawDeleteRuleValue : function() {
		var ruleValueDelete = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_ruleValueDelete
		});
		EventUtil.addEventHandler(ruleValueDelete, event_type.click, g_RuleConfig.eventClickRuleValueDelete);
		return ruleValueDelete;
	},

	// 绘制分组区
	drawRuleGroups : function() {
		// 获得水平最高层级
		var groupsLength = g_RuleConfig.groupsData.size();
		var groupsWidth = css_data.groupPanelWidth;
		var secondGroupWidth = groupsWidth / groupsLength;

		// 创建分组panel
		var groupPanel = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_groupPanel
		});
		g_RuleConfig.area.appendChild(groupPanel);

		if (g_RuleConfig.groupsData.keySet()) {
			for ( var index = 0; index < g_RuleConfig.groupsData.keySet().length; index++) {
				
				var key = g_RuleConfig.groupsData.keySet()[index];
				// 获得每个横向分组的内容
				var visGroup = g_RuleConfig.groupsData.get(key);
				// 创建横向分组框
				var secondGroupPanel = g_ruleConfigUtils.createPanel({
					tagName : string_data.div,
					className : css_data.ruleConfig_secondGroupPanel
				});
				
				secondGroupPanel.style.width = secondGroupWidth + string_data.px;
				groupPanel.appendChild(secondGroupPanel);
				for ( var i = 0; i < visGroup.length; i++) {
					var childVisGroupData = visGroup[i];
					var eachGroup = g_ruleConfigUtils.createPanel({
						tagName : string_data.div
					});
					
					if(i%2){
						eachGroup.className=css_data.ruleConfig_eachGroupDouble;
					}else{
						eachGroup.className=css_data.ruleConfig_eachGroupSingle;
					}
					
					var height;
					// 如果是叶子分组
					if (childVisGroupData.length == 0) {
						height = css_data.groupLastHeight;
						g_RuleConfig.lastGroupTotal++;
					} else {
						height = childVisGroupData.lastGroupNum * css_data.groupLastHeight;
					}
					eachGroup.style.width = secondGroupWidth + string_data.px;
					eachGroup.style.height = height + string_data.px;

					var eachGroupText = g_ruleConfigUtils.createPanel({
						tagName : string_data.div,
						className : css_data.ruleConfig_eachGroupText
					});
					eachGroupText.style.width = secondGroupWidth - css_data.relationWidth + string_data.px;
					eachGroupText.style.height = height + string_data.px;
					
					var eachGroupLabel = g_ruleConfigUtils.createPanel({
						tagName : string_data.div,
						className : css_data.ruleConfig_eachGroupLabel
					});
					
					eachGroupLabel.style.marginLeft=(parseInt(eachGroupText.style.width.replace(string_data.px,string_data.nullString))-100)/2+string_data.px; 
					
					if (childVisGroupData.name.length > 10) {
						eachGroupLabel.tip = childVisGroupData.name;
						EventUtil.addEventHandler(eachGroupLabel, event_type.mouseover, g_RuleConfig.eventMouseOverEachGroupText);
						eachGroupLabel.innerHTML = childVisGroupData.name.substring(0, 10) + string_data.ellipsis;
					} else {
						eachGroupLabel.innerHTML = childVisGroupData.name;
					}
					eachGroupText.appendChild(eachGroupLabel);
					
					var img = g_ruleConfigUtils.createPanel({
						tagName : string_data.img,
						className : css_data.ruleConfig_groupRelationImg
					});
					img.src =  childVisGroupData.relation + "." + string_data.png;
					
					eachGroup.appendChild(eachGroupText);
					eachGroup.appendChild(img);
					
					var divClear = g_ruleConfigUtils.createPanel({
						tagName : string_data.div,
						className : css_data.ruleConfig_divClear
					});
					
					eachGroup.appendChild(divClear)
					secondGroupPanel.appendChild(eachGroup);
					
				}
			}
		}
	},

	// 加载分组数据
	getGroupsData : function(group) {
		// 顶级分组信息
		var groups = group.groups;
		var index = group.layer;
		var name = group.name;
		var relation = group.relation;
		if (!relation) {
			relation = string_data.and;
		}
		var length;
		if (group.groupsLength == "0" || !group.groups) {
			length = "0";
		} else {
			length = group.groups.length;
		}
		var hasLastGroupNumber;
		g_RuleConfig.lastGroupNum = 0;
		g_RuleConfig.getHasLastGroupNumber(g_RuleConfig.lastGroupNum, group);

		if (!g_RuleConfig.groupsData.get(index)) {
			var arr = new Array({
				name : name,
				length : length,
				lastGroupNum : g_RuleConfig.lastGroupNum,
				relation : relation
			});
			g_RuleConfig.groupsData.put(index, arr);
		} else {
			var arr = g_RuleConfig.groupsData.get(index);
			arr.push({
				name : name,
				length : length,
				lastGroupNum : g_RuleConfig.lastGroupNum,
				relation : relation
			});
		}

		if (groups) {
			// 循环每级的子分组
			for ( var i = 0; i < groups.length; i++) {
				var secondGroup = group.groups[i];
				var secondIndex = secondGroup.layer;
				var secondName = secondGroup.name;
				g_RuleConfig.lastGroupNum = 0;
				g_RuleConfig.getHasLastGroupNumber(g_RuleConfig.lastGroupNum, secondGroup);
				if (!g_RuleConfig.groupsData.secondIndex) {
					var arr = new Array({
						name : secondName,
						length : length,
						lastGroupNum : g_RuleConfig.lastGroupNum,
						relation : relation
					});
					g_RuleConfig.groupsData.secondIndex = arr;
				} else {
					var arr = g_RuleConfig.groupsData.secondIndex;
					arr.push({
						name : secondName,
						length : length,
						lastGroupNum : g_RuleConfig.lastGroupNum,
						relation : relation
					});
				}
				g_RuleConfig.getGroupsData(secondGroup);
			}
		}
	},

	// 含有叶子分子个数
	getHasLastGroupNumber : function(num, group) {
		if (group.groups) {
			var length = group.groups.length;
			for ( var i = 0; i < length; i++) {
				var secondGroup = group.groups[i];
				if (secondGroup.groupsLength == "0") {
					g_RuleConfig.lastGroupNum++;
				}
				g_RuleConfig.getHasLastGroupNumber(g_RuleConfig.lastGroupNum, secondGroup);
			}
		}
	},

	// 验证规则
	checkRules : function(rulePanelValue, ruleValue, regex, msg) {
		var hint = document.getElementById(string_data.hint);
		if (regex) {
			var regexp = str2RegExp(regex);
			if (!regexp.test(ruleValue)) {
				hint.innerHTML = msg;
				rulePanelValue.focus();
				return false;
			}
		}
		return true;
	},

	// 保存规则
	saveRules : function() {
		g_RuleConfig.saveData = [];
		var rulePanels = g_RuleConfig.area.getElementsByTagName(string_data.span);
		// 级联状态区：如果父因子下面有子因子值，父因子不能有多个值，否则状态为false;
		var flag = true;
		// 循环规则
		if (rulePanels) {
			for ( var i = 0; i < rulePanels.length; i++) {
				var rulePanel = rulePanels[i];
				var regex = rulePanel.regex;
				var msg = rulePanel.msg;
				var ruleId = rulePanel.data.id;
				rulePanelValues = rulePanel.getElementsByTagName(string_data.select);
				if (rulePanelValues && !rulePanelValues.length) {
					var rulePanelValues = rulePanel.getElementsByTagName(string_data.input);
				}
				// 验证父子触发因子值个数：如果父触发因子有子触发因子，则值不能多于1个
				var attr = "ruleId=" + ruleId;
				// 循环规则值
				if (rulePanelValues.length) {
					for ( var j = 0; j < rulePanelValues.length; j++) {
						var rulePanelValue = rulePanelValues[j];
						var ruleValue = rulePanelValue.value;
						if (ruleValue == string_data.nullString || ruleValue == (string_data.part + "0")) {
							continue;
						} else if (ruleValue.indexOf(string_data.part) > -1) {
							ruleValue = ruleValue.split(string_data.part)[0];
						}
						
						var checkResult = g_RuleConfig.checkRules(rulePanelValue, ruleValue, regex, msg);
						if (!checkResult) {
							return;
						}
						var ruleData = {
							ruleId : ruleId,
							ruleValue : ruleValue
						};
						g_RuleConfig.saveData.push(ruleData);
					}
				}
			}
		}
		// 清空提示区
		hint.innerHTML = string_data.nullString;

		if (flag) {
			var attr = {
				atomEventId : g_RuleConfig.settings.atomEventId,
				rules : g_RuleConfig.saveData
			};
			
			alert("Save Success")
		}
	},

	// 替换规则Panel
	replaceRulePanel : function(ruleData) {
		var ruleId = ruleData.id;
		var ruleName = ruleData.name;
		var userData = ruleData.userData;

		var rulePanel = document.getElementById(string_data.rulePanel + ruleId);
		if (rulePanel) {
			while (rulePanel.hasChildNodes()) { // 当div下还存在子节点时 循环继续
				g_RuleConfig.removeElement(rulePanel, rulePanel.firstChild);
			}

			// 规则区
			var rule = g_RuleConfig.drawRule(ruleData, rulePanel);
			// 添加规则区
			rulePanel.appendChild(rule);
			if (!userData) {
				// 添加规则值区
				g_RuleConfig.drawRuleValuePanel(ruleData, rulePanel);
			} else if (typeof (userData) == string_data.string) {
				g_RuleConfig.drawRuleValuePanel(ruleData, rulePanel, userData);
			} else {
				for ( var i = 0; i < userData.length; i++) {
					var userRuleData = userData[i];
					g_RuleConfig.drawRuleValuePanel(ruleData, rulePanel, userRuleData);
				}
			}
		}
	},

	// 移除元素
	removeElement : function(parentNode, element) {
		parentNode.removeChild(element);
	},

	// 事件：鼠标滑过规则-展示规则全称
	eventMouseOverRule : function(event) {
		g_tips.showTips(event);
	},

	// 事件：鼠标滑过规则分组-展示规则分组全称
	eventMouseOverEachGroupText : function(event) {
		g_tips.showTips(event);
	},

	// 事件：单击弹出框的cancel按钮
	eventClickCancel : function(event) {
		g_RuleConfig.removeElement(g_RuleConfig.area, document.getElementById(string_data.ruleGroupPopUp));
		g_RuleConfig.removeElement(g_RuleConfig.area, document.getElementById(string_data.shadePopUp));
	},

	/* 规则事件 */
	// 事件：单击规则-添加规则
	eventClickRule : function(event) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		var rulePanel = target.parentNode;
		var ruleData = rulePanel.data;
		g_RuleConfig.drawRuleValuePanel(ruleData, rulePanel);
	},

	// 事件：单击删除-删除规则值
	eventClickRuleValueDelete : function(event) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		target.parentNode.parentNode.removeChild(target.parentNode);
	},

	// 事件：单击保存-保存规则以及规则值信息
	eventClickSave : function(event) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		g_RuleConfig.saveRules();
	},

	// 事件：单击弹出框的ok按钮
	eventClickOk : function(event) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		var ruleGroupPopUp = target.parentNode.parentNode;

		var checkboxs = ruleGroupPopUp.getElementsByTagName(string_data.input);

		var selectedRule = new Array();
		if (checkboxs) {
			var length = checkboxs.length;
			for ( var i = 0; i < length; i++) {
				var checkbox = checkboxs[i];
				if (checkbox.checked) {
					selectedRule.push(checkbox.id);
				}
			}
		}
		
		// 查询条件selectedRule返回数据
		var rulesGroupData={"id":"5","groups":[{"id":"30","regex":"","name":"DeviceBrand","mark":"0","code":"DEVICE_BRAND","userData":"1","type":"1","msg":"","groups":[{"id":"0","name":"--Please Choose--","mark":"1","code":""},{"id":"701318","name":"Samsung","mark":"1","code":"1"},{"id":"701519","name":"WWW","mark":"1","code":"3"},{"id":"701515","name":"TCT","mark":"1","code":"7"}]},{"id":"29","regex":"","name":"DeviceType","mark":"0","code":"DEVICE_TYPE","userData":"1","type":"1","msg":"","groups":[{"id":"0","name":"--Please Choose--","mark":"1","code":""},{"id":"701326","name":"Feature Phone","mark":"1","code":"2"},{"id":"701321","name":"Smart Phone","mark":"1","code":"1"},{"id":"701331","name":"Tablet","mark":"1","code":"3"},{"id":"701316","name":"USB Dongle","mark":"1","code":"4"}]},{"id":"31","regex":"","name":"DeviceModel","mark":"0","code":"DEVICE_MODEL","type":"1","msg":"","groups":[{"id":"0","name":"--Please Choose--","mark":"1","code":""},{"id":"701337","name":"Galaxy S3","mark":"1","code":"1"},{"id":"701380","name":"Galaxy 18250","mark":"1","code":"2"},{"id":"701327","name":"S7568","mark":"1","code":"3"},{"id":"701357","name":"I9008L","mark":"1","code":"4"},{"id":"701520","name":"WWW520","mark":"1","code":"9"}]}]};

		var rulesGroup = document.getElementById(string_data.rulesGroup + g_RuleConfig.editGroupId);
		while (rulesGroup.hasChildNodes()) { // 当div下还存在子节点时 循环继续
			g_RuleConfig.removeElement(rulesGroup, rulesGroup.firstChild);
		}
		if (rulesGroupData) {
			g_RuleConfig.drawRuleGroup(rulesGroupData.groups, rulesGroup);
		} else {
			g_RuleConfig.drawRuleGroup([], rulesGroup);
		}
		g_RuleConfig.removeElement(g_RuleConfig.area, document.getElementById(string_data.ruleGroupPopUp));
		g_RuleConfig.removeElement(g_RuleConfig.area, document.getElementById(string_data.shadePopUp));
	},
	
	// 事件：滚动分组面板
	eventScrollGroup : function(event){
		//设置下拉框定位方式
		if(variable.current_select){
			variable.current_select.style.position=string_data.staticStr;
			variable.current_select.children[0].style.position=string_data.staticStr;
			variable.current_select.children[1].style.position=string_data.staticStr;
			variable.current_select.children[1].style.display=string_data.none;
		}
	},

	// 事件：单击编辑-编辑规则分组内的规则信息,弹出窗口
	eventClickRulesEdit : function(event) {
		//设置下拉框定位方式
		if(variable.current_select){
			variable.current_select.style.position=string_data.staticStr;
			variable.current_select.children[0].style.position=string_data.staticStr;
			variable.current_select.children[1].style.position=string_data.staticStr;
		}
		
		event = event || window.event;
		var target = event.srcElement || event.target;
		var ruleGroup = target.parentNode;
		var rulePanels = ruleGroup.getElementsByTagName(string_data.span);
		var ruleGroupId = ruleGroup.id.replace(string_data.rulesGroup, string_data.nullString);
		var ruleIds = new Array();
		
		if (rulePanels) {
			g_ruleConfigUtils.groupsUserData=new Array();
			for ( var i = 0; i < rulePanels.length; i++) {
				var rulePanel= rulePanels[i];
				rulePanelValues = rulePanel.getElementsByTagName(string_data.select);
				if (rulePanelValues && !rulePanelValues.length) {
					var rulePanelValues = rulePanel.getElementsByTagName(string_data.input);
				}
				
				//增加ruleId,带入弹出框
				var ruleId = rulePanel.id.replace(string_data.rulePanel, string_data.nullString);
				ruleIds.push(ruleId);
				
				//增加用户数据
				if (rulePanelValues.length) {
					var rulePanelData=new Object();
					var rulePanelValuesData= new Array();
					//触发因子值
					for ( var j = 0; j < rulePanelValues.length; j++) {
						var rulePanelValue = rulePanelValues[j];
						var ruleValue = rulePanelValue.value;
						if (ruleValue == string_data.nullString || ruleValue == (string_data.part + "0")) {
							continue;
						} else if (ruleValue.indexOf(string_data.part) > -1) {
							ruleValue = ruleValue.split(string_data.part)[0];
						}
						rulePanelValuesData.push(ruleValue);
					}
					rulePanelData.id=ruleId;
					rulePanelData.ruleValues=rulePanelValuesData;
					
					g_ruleConfigUtils.groupsUserData.push(rulePanelData);
				}
			}
		}
		
		// 返回数据
		var ruleGroupsData=[{"id":"30","name":"DeviceBrand","isCheck":"true"},{"id":"29","name":"DeviceType","isCheck":"true"},{"id":"31","name":"DeviceModel","isCheck":"false"}]
		g_RuleConfig.editGroupId = ruleGroupId;

		// 制作阴影区
		var shadePopUp = g_ruleConfigUtils.createPanel({
			id : string_data.shadePopUp,
			tagName : string_data.div,
			className : css_data.ruleConfig_shadePopUp
		});
		
		shadePopUp.style.width=document.getElementById(g_RuleConfig.settings.detailArea).offsetWidth+15+string_data.px;
		shadePopUp.style.height=document.getElementById(g_RuleConfig.settings.detailArea).offsetHeight+20+string_data.px;
		g_RuleConfig.area.appendChild(shadePopUp);

		// 弹出窗口
		var ruleGroupPopUp = g_ruleConfigUtils.createPanel({
			id : string_data.ruleGroupPopUp,
			tagName : string_data.div,
			ruleIds:ruleIds,
			className : css_data.ruleConfig_ruleGroupPopUp
		});
		var globleHeight = document.getElementById(string_data.rulesGroup).style.height.replace(string_data.px, string_data.nullString);
		ruleGroupPopUp.style.top = -globleHeight * 3 / 4 + string_data.px;
		ruleGroupPopUp.style.left = 250 + string_data.px;
		g_RuleConfig.area.appendChild(ruleGroupPopUp);


		// UL
		var ruleRow = g_ruleConfigUtils.createPanel({
			tagName : string_data.ul,
			className : css_data.ruleConfig_ruleRow
		});
		ruleGroupPopUp.appendChild(ruleRow);

		if (ruleGroupsData) {
			for ( var i = 0; i < ruleGroupsData.length; i++) {
				var ruleGroupData = ruleGroupsData[i];
				// LI
				var ruleLine = g_ruleConfigUtils.createPanel({
					tagName : string_data.li,
					className : css_data.ruleConfig_ruleLine,
					id : ruleGroupData.id
				});
				ruleRow.appendChild(ruleLine);

				// 复选框
				var ruleSelect = g_ruleConfigUtils.createPanel({
					tagName : string_data.input,
					className : css_data.ruleConfig_ruleSelect,
					id : ruleGroupData.id
				});
				ruleSelect.type = string_data.checkbox;
				ruleLine.appendChild(ruleSelect);
				if (ruleGroupData.isCheck == string_data.trueString) {
					ruleSelect.checked = true;
				}
				// 文字
				var ruleLabel = g_ruleConfigUtils.createPanel({
					tagName : string_data.div,
					className : css_data.ruleConfig_ruleLabel
				});

				var ruleName = ruleGroupData.name;

				if (ruleName.length > 10) {
					ruleLabel.tip = ruleName;
					EventUtil.addEventHandler(ruleLabel, event_type.mouseover, g_RuleConfig.eventMouseOverRule);
					ruleLabel.innerHTML = ruleName.substring(0, 10) + string_data.ellipsis;
				} else {
					ruleLabel.innerHTML = ruleName;
				}
				ruleLine.appendChild(ruleLabel);
			}
		}
		
		// 弹出框按钮区
		var popUpControl = g_ruleConfigUtils.createPanel({
			tagName : string_data.div,
			className : css_data.ruleConfig_popUpControl
		});

		ruleGroupPopUp.appendChild(popUpControl);
		
		// 确定按钮
		var popUpOkBtn = g_ruleConfigUtils.createPanel({
			tagName : string_data.button,
			className : css_data.ruleConfig_popUpOkBtn,
			html : string_data.ok
		});
		EventUtil.addEventHandler(popUpOkBtn, event_type.click, g_RuleConfig.eventClickOk);
		popUpControl.appendChild(popUpOkBtn);

		// 取消按钮
		var popUpCancelBtn = g_ruleConfigUtils.createPanel({
			tagName : string_data.button,
			className : css_data.ruleConfig_popUpCancelBtn,
			html : string_data.cancel
		});

		EventUtil.addEventHandler(popUpCancelBtn, event_type.click, g_RuleConfig.eventClickCancel);
		popUpControl.appendChild(popUpCancelBtn);
	},

	// 事件-清除下拉框值
	removeAll : function(event) {
		if(event){
			var target = event.srcElement || event.target;
			if (target.value == '-Please Choose-'||target.value == '--Please Choose--') {
				target.value = '';
			}
		}
	},

	// 下拉框显示位置
	showDivStation : function(ev, obj) {
		var e=ev||event;
		
		g_RuleConfig.removeAll(e);
		if (obj) {
			target = obj;
		} else {
			target = e.srcElement || e.target;
		}
		
		if(!obj){
			target.parentNode.style.position=string_data.relative;
			target.parentNode.children[0].style.position=string_data.relative;
			target.parentNode.children[1].style.position=string_data.relative;
			variable.current_select=target.parentNode;
		}
		
		// 隐藏下拉框
		g_RuleConfig.hiddenAllSelect();

		var isDisplay = target.isDisplay;
		var divStation = target.parentNode.childNodes[1];

		var rulesGroup = target.parentNode.parentNode;

		if (isDisplay) {
			divStation.style.display = string_data.inline;
			g_RuleConfig.valInputClick(null, target);
		} else {
			divStation.style.display = string_data.none;
		}
		
		e.cancelBubble=true;
	},

	// 响应text的事件
	valInputClick : function(event, obj) {
		// 获得对象
		var target;
		if (obj) {
			target = obj;
		} else {
			target = event.srcElement || event.target;
		}

		var pageD = 0, pageU;
		var curStationName = target.value;

		var objSelStation = target.parentNode.childNodes[1];
		var stationLength = objSelStation.options.length;
		var flag = true;
		pageU = pageD;
		// 从起始的文字匹配 用text中的数据跟下拉框中的数据
		for ( var i = 0; i < stationLength; i++) {
			var stationName = objSelStation.options[i].text;
			var re = new RegExp("^" + curStationName,"i");
			if (stationName.match(re)) {
				objSelStation.selectedIndex = i;
				pageD = i;
				pageU = i;
				flag = false;
				break;
			}
		}
		//从文字中匹配 用text中的数据跟下拉框中的数据
		if (flag) {
			for ( var i = 0; i < stationLength; i++) {
				var stationName = objSelStation.options[i].text;
				var re2 = new RegExp("^.*" + curStationName + '.*$',"i");
				if (stationName.match(re2)) {
					objSelStation.selectedIndex = i;
					pageD = i;
					pageU = i;
					break;
				}
			}
		}

		if (event) {
			// 响应下移键
			if (event.keyCode == 40) {
				pageD++;
				if (pageD == objSelStation.options.length)
					pageD = 0;
				target.value = objSelStation.options[pageD].text;
				objSelStation.selectedIndex = pageD;
			}

			// 响应上移键
			if (event.keyCode == 38) {
				--pageU;
				if (pageU < 0)
					pageU = objSelStation.options.length - 1;
				target.value = objSelStation.options[pageU].text;
				objSelStation.selectedIndex = pageU;
			}
		}
	},

	// 选择下拉框
	selectStation : function(event, obj) {
		// 获得对象
		var target;
		if (obj) {
			target = obj;
		} else {
			target = event.srcElement || event.target;
		}
		if(target.tagName!="SELECT"){
			target=target.parentNode;
		}
		
		target.parentNode.style.position=string_data.staticStr;
		target.parentNode.children[0].style.position=string_data.staticStr;
		target.parentNode.children[1].style.position=string_data.staticStr;
		target.isDisplay = false;
		// 设置文本框值
		//alert(target.tagName)
		if (target.selectedIndex != -1) {
			var stationName = target.parentNode.children[1].options[target.parentNode.children[1].selectedIndex].text;
			target.parentNode.firstChild.value = stationName;
		}
		// 鼠标单击某一选项选定后关闭下拉框
		g_RuleConfig.showDivStation(null, target);
		variable.current_select=null;
	}
}
