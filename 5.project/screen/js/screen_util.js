//字符串
var screen_str={
	search:"Search",													//查询按钮
	attributeTemplatePart_null:"Please select catagory.",				//属性为空提示：请选择分组
	order_upDown:"Aready at up/down.",									//已经到最上、最下
	click_bracket:"Please select at least rows.",						//单击括号按钮提示：请选择两行或者两行以上
	operHint:"Please select operator.",									//操作符提示
	save_success:"Save success.",										//保存成功
	select_operator:"Please select operator.",							//请选择运算符
	select_rule_value:"Please select attribute value.",					//请选择属性值
	down_btn_tip:"Aready at the bottom",								//当前属性已经位于所有属性底端
	menuMark:"Drag Area",												//拖拽区
	bracket:"Bracket",													//括号
	allAccord:"All",													//全符合
	singleAccord:"Single",												//单个符合
	saveUserData:"Save",												//保存用户数据
	custom:"Custom",													//自定义
	relaAnd:"And",														//关系: and	
	relaOr:"Or",														//关系：or
	nullStr:"",															//空字符串	
	importUserData:"Import",											//导入
	bracketHint:"Please use right bracket",								//括号提示	
	saveVerify:"Please config at once attribute",						//保存验证
	dragVerify:"Only the attributes in the same attribute category can be dragged",	//拖拽验证
	dbAttribute:"There is an attribute on the last line of layout area, please delete it or drag attribute"	//双击验证
}

//拖拽工具
var drag_util={
	drawAble:false,			//可拖拽标记
	dragObject:null,		//当前拖拽对象
	canDock:false			//拖拽对象是否可以停靠
}

//常量定义
var screen_constant={
	relationState:0,		//关系状态：默认全符合
	relationState_all:0,	//全符合
	relationState_single:1,	//单个符合
	relationState_custom:2, //自定义
	orderState_upBtn:0,		//向上
	orderState_downBtn:1,	//向下
	mainPartRowLength:17,	//主编辑区行数
	editCatId:0,			//编辑的属性分组
	currentCatId:0,			//当前分组Id
	trueCon:"true",		 					//正确
	falseCon:"false",		 				//错误
	displayType_text:"text",		 		//文本
	displayType_select:"select",	 		//下拉框
	displayType_checkbox:"checkbox", 		//复选框
	displayType_radio:"radio",		 		//单选框
	displayType_date:"date",		 		//日期
	displayType_datetime:"datetime", 		//时间
	attributeTemplate:"attributeTemplate",	//拖拽模板
	attributeRowPart:"attributeRowPart"		//属性行区
}

//全局数据
var screen_data={
	//树控件初始化设定
	groupTreeSetting : {
		data: {
			key: {
				title:"groupTree"
			},
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: event_control_action.clickGroup
		}
	},
	saveUserData:[],
	loadUserData:[],
	parentId:0
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

//ajax封装类
function ajaxSend_util(url,params){
	var returnValue=PostInfo(url+params);
	var error= returnValue.getValueByName("error");
	if(error=="error"){
		var errorMsg= returnValue.getValueByName("errorMsg");
		alert(errorMsg);
		return "error";
	}else{
		return returnValue;
	}
}