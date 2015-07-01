/*
* usertrack.js
* 2014-05-19
* 
	require('path-to-usertrack.js', function(UserTrack){
		// 在页面底部初始化，绑定事件
		UserTrack.init();

		// 手动发送请求，参数需要编码
		UserTrack.send('name=value&name2=value%26value2');
	})
*/

var Cookie = require('topshop:widget/ui/cookie/cookie.js');

function objToQuery(obj){
	var query = '';
	for(var key in obj){
		if(obj.hasOwnProperty(key)){
			query += '&' + key + '=' + obj[key];
		}
	}
 
	if(query.indexOf('&') == 0){
		query = query.slice(1);
	}
	return query;
}

var baseParamObj = {
	channel : '',
	channel_content : ''
};
//var baseUrl = "http://www.nuomi.com" + '/s.gif';
var baseUrl = "/s.gif";

var send = function(paramStr){
	var finalParamStr = $.param(baseParamObj, true);
	if(paramStr){
		// finalParamStr += '&' + paramStr;
		finalParamStr += '&' + objToQuery(paramStr);
	}

	new Image().src = baseUrl + '?' + finalParamStr + '&_=' + (new Date()).valueOf();
};
var bind = function(selector){
	$('body').on('mousedown', selector, clickHandler);
};

var initParams = function(){
	$.extend(baseParamObj, {
        channel: Cookie.get('channel'),
        channel_content: Cookie.get('channel_content'),
        target_city: Cookie.get('areaCode'),
        client_type : 'PC_WEB',
        real_refer : document.referrer,
        xll : F.context('xll'),
        xll_meishi :  F.context("xll_meishi")
	});
};

var init = function(){
	initParams();
	bind('a[mon], input[mon], span[mon]');
};

function clickHandler(e){
	var $tar = $(e.target);

	var paramArr = [];

	//2014_10_13 @zhangyijun02 : 用于存储链接中的redirect_url属性
	var redirect_url ="";

	do{
		var monStr = $tar.attr('mon');
		if(monStr){
			paramArr.push(monStr);
		}
		if($tar.is('a')){
			// 如果是 a 标签，添加上 href 属性
			paramArr.push('href=' + encodeURIComponent($tar.attr('href')));
			//@zhangyijun02 : 如果是 a 标签，添加上 redirect_url属性
			redirect_url = (typeof($tar.attr("redirect-url")) !== "undefined") ? $tar.attr("redirect-url") : "";
		}
		$tar = $tar.parent();
	}while(!$tar.is('html'));

	paramArr = paramArr.join('&').split('&');

	// 做处理，将page area element position 组成json
	var paramObj = {};
	
	for(var i = 0, len = paramArr.length; i < len; i++){
		var paramItem = paramArr[i].split('=');
		paramObj[paramItem[0]] = paramItem[1];
	}

	//2014_10_13 @zhangyijun02 : 因专题团单点击日志需要额外字段统计，如果a标签中包含redirect_url属性，且符合"...activity/common/short_url..."，则点击日志需传page=topic_专题id
	var pageData = paramObj.page;
	if(redirect_url != ""){
		var paramTmp = redirect_url.split("activity/common/short_url/");
		if(paramTmp.length > 1){//符合专题团单特征，取出专题id
			pageData = "topic_" + paramTmp[1].split(/[?|&|#]/)[0];//过滤链接后面的参数和锚点
		}
	}
	paramObj.da_src = encodeURIComponent($.stringify({
		page : pageData,
		area : paramObj.area,
		element : paramObj.element,
		position : paramObj.position
	}));

	
	delete paramObj.page;
	delete paramObj.area;
	delete paramObj.element;
	delete paramObj.position;
	delete paramObj.redirect_url;//@zhangyijun02

	send(paramObj);
}

module.exports = {
	init : init,
	send : send
};