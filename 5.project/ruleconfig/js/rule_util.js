/*字符串常量*/
var StringCon = {
	TITLE:"触发因子编排",
    ALL:"全选",
    NONE:"==请选择==",
    SELECT:"% "+"选择",
    DELBRA:"单击删除括号",
    DELATTR:"单击删除属性面板",
    CHANGERELATION:"单击改变关系",
    REFRESH:"(点击表达式刷新表达式)",
    VIEW:"预览",
    SAVE:"保存",
    CLEAR:"清空",
    SINGLE:"单个",
    ALL:"全部",
    BRACKET:"括号",
    BRAHINT:"左右括号不匹配",
    NOCONTENT:"没有结果",
    OK:"确定",
    CANCEL:"取消",
    NULLVALUESELECT:"没有选择属性值",
    NULLVALUEINPUT:"没有填写属性值或者数据格式错误",
    AND:"and",
    OR:"or",
    NULL:""
};          
                
/*数字常量*/
var NumCon = {
	WIDTH:"100%",
	HEIGHT:"100%"
};

/*样式常量*/
var CssCon = {
	VISIABLE:"visibility",
	SHOW:"visible",
	HIDE:"hidden",
	Z:"z-index"
};

/*属性类型常量*/
var AttrType = {
	text:"text",
	select:"select",
	date:"date",
	number:"number",
	multiple:"multiple",
	url:"url"
};

/*运算符常量*/
var Operator = {
	between:"between"
};



/*JS工具类*/
var JsUtils = {
	// 创建标签
	createPanel : function(data) {
		var panel = document.createElement(data.tagName);
		$.extend(panel, data);

		if (data.list) {
			panel.setAttribute("list", data.list);
		}
		return panel;
	},

	// 设置样式
	setStyle : function(obj, attrs) {
		for ( var i = 0; i < attrs.length; i++) {
			var attr = attrs[i];
			for ( var a in attr) {
				obj.style[a] = attr[a];
			}
		}
	},

	// 获取样式
	getStyle : function(obj, attr) {
		if (obj.currentStyle) {
			return obj.currentStyle[attr].replace("px", "");
		} else {
			return getComputedStyle(obj, false)[attr].replace("px", "");
		}
	},

	// 判断是否是IE浏览器
	getExplorer:function () {
		var explorer = window.navigator.userAgent ;
		//ie 
		if (explorer.indexOf("Trident") >= 0) {
			return "IE";
		}
		//firefox 
		else if (explorer.indexOf("Firefox") >= 0) {
			return "Firefox";
		}
		//Chrome
		else if(explorer.indexOf("Chrome") >= 0){
			return "Chrome";
		}
		//Opera
		else if(explorer.indexOf("Opera") >= 0){
			return "Opera";
		}
		//Safari
		else if(explorer.indexOf("Safari") >= 0){
			return "Safari";
		}
	},

	// 阻止默认事件
	presentDefault : function(ev) {
		if (ev.preventDefault)
			ev.preventDefault();
		ev.returnValue = false;
	},

	// 阻止冒泡
	stopPropagation : function(ev) {
		if (ev.stopPropagation) { // W3C阻止冒泡方法
			ev.stopPropagation();
		} else {
			ev.cancelBubble = true; // IE阻止冒泡方法
		}
	}

};

/* 对Date的扩展，将 Date 转化为指定格式的String */
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
