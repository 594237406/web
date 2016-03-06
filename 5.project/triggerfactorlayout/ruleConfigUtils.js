var css_data = {
	ruleConfig_area : "ruleConfig_area",
	ruleConfig_hintSuccess:"ruleConfig_hintSuccess",
	ruleConfig_secondGroupPanel : "ruleConfig_secondGroupPanel",
	ruleConfig_groupPanel : "ruleConfig_groupPanel",
	ruleConfig_groupRelationImg : "ruleConfig_groupRelationImg",
	ruleConfig_eachGroupSingle : "ruleConfig_eachGroupSingle",
	ruleConfig_eachGroupDouble : "ruleConfig_eachGroupDouble",
	ruleConfig_groupConnectImg : "ruleConfig_groupConnectImg",
	ruleConfig_ruleGround : "ruleConfig_ruleGround",
	ruleConfig_rulesGroup : "ruleConfig_rulesGroup",
	ruleConfig_rulePanel : "ruleConfig_rulePanel",
	ruleConfig_ruleTitle : "ruleConfig_ruleTitle",
	ruleConfig_rule : "ruleConfig_rule",
	ruleConfig_controlPanel : "ruleConfig_controlPanel",
	ruleConfig_eachGroupText : "ruleConfig_eachGroupText",
	ruleConfig_rulesEdit : "ruleConfig_rulesEdit",
	ruleConfig_tip : "ruleConfig_tip",
	ruleConfig_ruleValue : "ruleConfig_ruleValue",
	ruleConfig_ruleValuePanel : "ruleConfig_ruleValuePanel",
	ruleConfig_ruleValueDelete : "ruleConfig_ruleValueDelete",
	ruleConfig_ruleGroupPopUp: "ruleConfig_ruleGroupPopUp",
	ruleConfig_ruleTitleText:"ruleConfig_ruleTitleText",
	ruleConfig_ruleValueDiv : "ruleConfig_ruleValueDiv",
	ruleConfig_ruleValueText:"ruleConfig_ruleValueText",
	ruleConfig_ruleValueSelect:"ruleConfig_ruleValueSelect",
	ruleConfig_ruleLabel:"ruleConfig_ruleLabel",
	ruleConfig_saveBtn : "ruleConfig_saveBtn",
	ruleConfig_hint:"ruleConfig_hint",
	ruleConfig_ruleRow:"ruleConfig_ruleRow",
	ruleConfig_ruleLine:"ruleConfig_ruleLine",
	ruleConfig_ruleSelect:"ruleConfig_ruleSelect",
	ruleConfig_popUpControl:"ruleConfig_popUpControl",
	ruleConfig_ruleLabel:"ruleConfig_ruleLabel",
	ruleConfig_popUpOkBtn:"ruleConfig_popUpOkBtn",
	ruleConfig_popUpCancelBtn:"ruleConfig_popUpCancelBtn",
	ruleConfig_shadePopUp:"ruleConfig_shadePopUp",
	ruleConfig_ruleValue_select:"ruleConfig_ruleValue_select",
	ruleConfig_ruleValue_text:"ruleConfig_ruleValue_text",
	ruleConfig_rulesGroupPanel:"ruleConfig_rulesGroupPanel",
	ruleConfig_eachGroupRelation:"ruleConfig_eachGroupRelation",
	ruleConfig_eachGroupLabel:"ruleConfig_eachGroupLabel",
	ruleConfig_divClear:" css_data.ruleConfig_divClear",
	ruleConfig_bg_odd_row : "#FCFCFC",
	ruleConfig_bg_even_row : "#F2F2F2",
	ruleConfig_url:"com/ailk/crm/msm/cep/RuleLayout/",
	groupPanelWidth : 400,
	groupPanelHeight : 400,
	groupLastHeight : 100,
	connectHeight : 3,
	ruleTitleHeight : 30,
	connectWidth : 20,
	ruleConfigAreaWidth : 1000,
	relationWidth :44
}

var string_data = {
	trueString:"true",
	falseString:"false",
	trueBoolean:true,
	falseBoolean:false,
	part : "part",
	hint:"hint",
	span : "span",
	div : "div",
	label:"label",
	iframe:"iframe",
	select : "select",
	checkbox:"checkbox",
	button : "button",
	input : "input",
	img : "img",
	px : "px",
	right : "right",
	and : "and",
	or : "or",
	ul : "ul",
	li : "li",
	png : "png",
	connect : "connect",
	root : "Root",
	tipsDiv : "tipsDiv",
	block : "block",
	none : "none",
	inline : "inline",
	rulePanel:"rulePanel",
	rulesGroup:"rulesGroup",
	ruleGroupPopUp:"ruleGroupPopUp",
	ruleValInput:"valInput",
	ruleValSel:"valSel",
	shadePopUp:"shadePopUp",
	ellipsis : "...",
	rtl:"rtl",
	ltr:"ltr",
	nullString:"",
	string:"string",
	part:"@~",
	spacing:"&nbsp;",
	staticStr:"static",
	relative:"relative",
	save : "save",
	ok : "ok",
	cancel : "cancel",
	relation : "relation",
	pleaseSelect: "Please Select",
	saveSuccess: "Save Success"
}

var event_type = {
	mouseover : "mouseover",
	click : "click",
	change : "change",
	keyup:"keyup",
	scroll:"scroll"
}

var rule_type = {
	text : "0",
	select : "1",
	date : "2",
	time : "3"
}

var variable ={
	current_select:null
}

//js的Map
function Map() {
	this.container = new Object();
}

Map.prototype.put = function(key, value) {
	this.container[key] = value;
}

Map.prototype.get = function(key) {
	return this.container[key];
}

Map.prototype.keySet = function() {
	var keyset = new Array();
	var count = 0;
	for ( var key in this.container) {
		if (key == 'extend') {
			continue;
		}
		keyset[count] = key;
		count++;
	}
	return keyset;
}

Map.prototype.size = function() {
	var count = 0;
	for ( var key in this.container) {
		// 跳过object的extend函数
		if (key == 'extend') {
			continue;
		}
		count++;
	}
	return count;
}

Map.prototype.remove = function(key) {
	delete this.container[key];
}

Map.prototype.toString = function() {
	var str = "";
	for ( var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
		str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
	}
	return str;
}

//把Json转成Json字符串返回
function str2RegExp(regStr){
	regStr = '//^'+regStr+'$//';
	regStr = regStr.replace(/\/\//g,"\/");
	var regex = eval(regStr);
	return regex;
}

//把Json转成Json字符串返回
function json2Str(o) {
	if (o == undefined) {
		return "";
	}
	var r = [];
	if (typeof o == "string")
		return "\""
				+ o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n")
						.replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
	if (typeof o == "object") {
		if (!o.sort) {
			for ( var i in o)
				r.push("\"" + i + "\":" + json2Str(o[i]));
			if (!!document.all
					&& !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/
							.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}"
		} else {
			for ( var i = 0; i < o.length; i++)
				r.push(json2Str(o[i]))
			r = "[" + r.join() + "]";
		}
		return r;
	}
	return o.toString().replace(/\"\:/g, '":""');
}

//把Json字符串转成Json返回
function str2Json(s) {
	return eval('(' + s + ')');
}

//鼠标悬浮提示
var g_tips = {
	
	mousePos:function (e){ 
	    var x,y; 
	    var e = e||window.event; 
	    return { 
	        x:e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft, 
	        y:e.clientY+document.body.scrollTop+document.documentElement.scrollTop 
	    }; 
	},	
	
	showTips : function(event) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		var tipsDiv = document.getElementById(string_data.tipsDiv);
		if (typeof tipsDiv == undefined || tipsDiv == null) {
			tipsDiv = document.createElement(string_data.div);
			tipsDiv.id = string_data.tipsDiv;
			document.body.appendChild(tipsDiv);
		}
		var mouse = g_tips.mousePos(event);

		tipsDiv.style.top = mouse.y;
		tipsDiv.style.left = mouse.x;
		tipsDiv.className = css_data.ruleConfig_tip;
		tipsDiv.innerHTML = target.tip;
		//target.getAttribute("tip");
		tipsDiv.style.display = "";
		target.onmouseout = function() {
			tipsDiv.style.display = string_data.none;
		}
}
}

//规则编排工具集
var g_ruleConfigUtils = {
	//创建标签
	createPanel : function(data) {
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
		//if (data.title)
		
		panel.title = data.html||data.value||"";
		return panel;
	}
}

//下拉框工具集
var g_selectUtils = {
	//添加选项
	addOption : function(selectObj, optionArray, selectValue) {
		//添加一个选项
		if(optionArray){
			for ( var i = 0; i < optionArray.length; i++) {
				var optionData = optionArray[i];
				var option=new Option(optionData.name, optionData.code+string_data.part+optionData.id);
				option.title=optionData.name;
				selectObj.options.add(option);
			}
		}
	},
	
	//添加提示语
	addTip : function(selectObj) {
		var selectedIndex=selectObj.selectedIndex;
		if(selectedIndex==-1){
			selectedIndex=0;
		}
		if( selectObj.options.length!=0){
			var selectText = selectObj.options[selectedIndex].text;
			selectObj.tip = selectText;
		}
	},
	
	//更改选项
	changeOption : function(event) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		/*级联查询*/
		var valueId = target.value;	  //触发因子值ID	 
		if(valueId.indexOf(string_data.part)>-1){	//如果含有@
			valueId=valueId.split(string_data.part)[1];
			if(valueId==0){							//如果触发因子Id 为0，即调用服务范围的触发因子值
				return;
			}
		}else{
			return;
		}
		
		//触发因子级联数据-查询条件：触发因子值ID
		var ruleData="";
	}
}

/*工具事件*/
//事件：单击规则-添加规则
event_utils = {
	eventMouseOverSelect : function(event) {
		event = event || window.event;
		var target = event.srcElement || event.target;
		//alert(target.options[target.selectedIndex].text);
		g_tips.showTips(event);
	}
}

function getElemsByClassName(className, root, tagName) {
	root = root || document; //没有传入根节点，则默认为document
	tagName = tagName || '*'; //没有传入标签，则默认获得所有标签
	var i = 0,
		classElements = [],
		elements = root.getElementsByTagName(tagName),
		elementsLen = elements.length;
		pattern = new RegExp('(^|\\s)' + className + '(\\s|$)');//className为传入的参数
	//遍历所有的元素，如果匹配到传入元素的className，则把对应的元素添加到数组中并返回
	for (; i < elementsLen; i++) {
		if (pattern.test(elements[i].className)) {
			classElements.push(elements[i]);
		}
	}
	return classElements;
};



var EventUtil={
	addEventHandler : function (oTarget, sEventType, fnHandler) {
	    if (oTarget.addEventListener) {
	        oTarget.addEventListener(sEventType, fnHandler, false);
	    }else if (oTarget.attachEvent) {
	        oTarget.attachEvent("on" + sEventType, fnHandler);
	    }else{
	        oTarget["on" + sEventType] = fnHandler;
	    };
	}
}

function getElementsByClassName(clsName, tagName) { 
    var ClassElements = []; 
    selElements = document.getElementsByTagName(tagName); 
 
    for (var i = 0; i < selElements.length; i++) { 
        if (selElements[i].className == clsName) { 
            ClassElements[ClassElements.length] = selElements[i]; 
        } 
    } 
    return ClassElements; 
} 

