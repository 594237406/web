/**
 * @require common:static/mod.js
 */
/**
 * @file 工具类
 * @author wangjianou@baidu.com
 * @editBy fangsimin@baidu.com
 * @version 1.0.1
 * @date 2014-2-15
 */
define('common:static/js/util.js', function(require, exports, module) {

	/**
	 * 对Date的扩展，将 Date 转化为指定格式的String
	 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * @param {string} fmt 格式化字符串
	 * @memberof Date.prototype
	 * @returns {string}
	 * @example
	 * (new Date()).format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
	 * (new Date()).format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
	 */
	Date.prototype.format = function(fmt) {
		var o = {
				'M+': this.getMonth() + 1, //月份
				'd+': this.getDate(), //日
				'h+': this.getHours(), //小时
				'm+': this.getMinutes(), //分
				's+': this.getSeconds(), //秒
				'q+': Math.floor((this.getMonth() + 3) / 3), //季度
				'S': this.getMilliseconds() //毫秒
			},
			k;
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
			}
		}
		return fmt;
	};
	
	//JQ对象鼠标滑过延迟处理
	$.fn.extend({hoverDelay:function(args,obj){
		var o={
			hoverDuring:300,
			outDuring:50,
			hoverEvent : function() {
				$.noop();
			},
			outEvent : function() {
				$.noop();
			}
		}
		o = $.extend(o, args || {});

		var tov, tou, t = this;
		$(this).bind("mouseover", function(ev) {
			clearTimeout(tou);
			tov = setTimeout(function() {
				o.hoverEvent.apply(t,[ev]);
			}, o.hoverDuring);
		});
		$(this).bind("mouseout", function(ev) {
			clearTimeout(tov);
			tou = setTimeout(function() {
				o.outEvent.apply(t,[ev]);
			}, o.outDuring);
		});
		return this;
	}});

	var Util = {

		/**
		 * 创建提示框
		 * @param {Object} [options] 提示框配置
		 */
		toast: function(options) {
			var def = {
					content: 'Hi, plz say sth!',
					css: 'success',
					autoHide: true,
					timeout: 2000,
					fade: {
						show: 500,
						hide: 500
					},
					callback: function() {}
				},
				msg = $.extend({}, def, options);

			return function() {
				var context = '<div class="global-toast toast-' + msg.css + '">';
				(!msg.autoHide) && (
					context += '<button type="button" class="toast-close">×</button>'
				);

				context += '<strong>' + msg.content + '</strong>' +
					'</div>';
				$('body').append(context);

				$('.global-toast').show(msg.fade.show);
				if (msg.autoHide) {
					setTimeout(function() {
						$('.global-toast').hide(msg.fade.hide);
						$('.global-toast').remove();
						$.isFunction(msg.callback) ? msg.callback() : null;
					}, msg.timeout);
				}

				$('.toast-close').click(function(event) {
					$target = $(event.target).closest('div');
					$target.hide(msg.fade.hide);
					$target.remove();
				});
			}();
		},

		/**
		 * ajax请求
		 * @param {Object} [msg] ajax配置
		 */
		ajax: function(msg) {
			$.support.cors = true; //解决<IE9的ajax的bug
			$.ajax({
				url: msg.url || "", //请求地址
				type: msg.type || "POST", //请求方式
				cache: msg.cache || false,
				dataType: msg.dataType || "text", //请求数据类型
				crossDomain: msg.crossDomain || false, //是否跨域
				data: msg.data || "",
				contentType: msg.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
				async: true, //是否异步请求，默认为异步
				beforeSend: function(jqXHR, settings) {
					(msg.doBeforeSend) &&
					(typeof(eval(msg.doBeforeSend)) == "function") &&
					(msg.doBeforeSend());
				},
				success: function(data, textStatus, jqXHR) {
					(msg.doSuccess) &&
					(typeof(eval(msg.doSuccess)) == "function") &&
					(msg.doSuccess(data));

				},
				error: function(jqXHR, textStatus, errorThrown) {

				}
			});

		},

		/**
		 * 初始化tab
		 * @param {Object} [options] tab配置
		 */
		tab: function(options) {
			var def = {
					choseIndex: 0,
					container: null,
						css: 'chosed',
						speed: 500,
						callback: {
							item0: function() {},
							item1: function() {},
							item2: function() {},
							item3: function() {},
							item4: function() {}
						}
				},
				msg = $.extend({}, def, options),
				$container, $items, $mask, $targets;

			if (msg.container && msg.container.length != 0) {
				$container = msg.container;
				$items = $container.find('li');
				$mask = $container.prev('.tabwrap');
				$targets = $('body').find('div[tab]');
			}

			$items.each(function(i, item) {
				var left, cb = $.isFunction(msg.callback['item' + i]) ? msg.callback['item' + i] : function() {};

				left = 10 + i * 20;
				for (var _i = 0; _i < i; _i++) {
					left += $items.eq(_i).width();
				}
				if (i == msg.choseIndex) {
					var tg = $(item).attr('for'),
						$tg = $targets.filter('.' + tg + ''),
						me = $(item),
						width = $(me).width() + 20;

					$targets.hide();
					$tg.show(msg.speed);

					$mask.css({
						width: width + 'px',
						left: left + 'px'
					}, function() {
						$items.removeClass(msg.css);
						$(me).addClass(msg.css);

						cb();
					});
				}

				$(item).click(function() {
					var tg = $(this).attr('for'),
						$tg = $targets.filter('.' + tg + ''),
						me = this,
						width = $(me).width() + 20;

					$targets.hide();
					$tg.show(msg.speed);

					$mask.animate({
						width: width + 'px',
						left: left + 'px'
					}, msg.speed, function() {
						$items.removeClass(msg.css);
						$(me).addClass(msg.css);

						cb();
					});
				});
			});
		},

		/**
		 * 解析url获得参数对象
		 */
		getParams: function() {
			var url = location.search,
				Params = {},
				params = [];

			if (url.indexOf('?') != -1) {
				params = url.substr(1).split('&');
				for (var i = params.length; i--;) {
					var kv = params[i].split('='),
						k = kv[0],
						v = kv[1];

					Params[k] = unescape(v);
				}
			}

			return Params;
		},
		


		//原型初始化方法：设置原型对象、扩展函数
		prototypeInit:function(constructor){
			constructor.fn=constructor.prototype;
			constructor.extend=function(){
				var arg=arguments[0];
				if(arg){
					for(var i in arg){
						constructor.fn[i]=arg[i];
					}
				}
			}
		},

		//string模板方法
		tmpl:function (str,data,regexp){
			return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
				return (data[name] === undefined) ? '' : data[name];
			});
		},

		//刷新表格
		refreshTable:function (table,operate,datas){
			var tbColnum=table.find("th");
			var tbody=table.children("tbody");
			var results=[];
			//循环数据行
			for(var i=0;i<datas.length;i++){
				results.push("<tr>");
				tbColnum.each(function(index,item){
					var columnName=$(item).attr("column");
					var data=datas[i];
					for(var d in data){
						if(columnName==="index"){
							results.push("<td>");
							results.push((i+1));
							results.push("</td>");
                            return true;
						}else if(d===columnName){
							results.push("<td>");
							results.push(data[d]);
							results.push("</td>");
                            return true;
						}else if("errpercent"===columnName){
                            results.push("<td>");
                            results.push(operate);
                            results.push("</td>");
                            return true;
                        }else if("operator"===columnName){
                            results.push("<td>");
                            results.push(operate);
                            results.push("</td>");
                            return true;
                        }
					}
                        results.push("<td>");
                        results.push("</td>");

				});
				results.push("</tr>");
			}
			tbody.html(results.join(""));
		},

		//ajax提交
		ajaxSubmit:function(o){
			//请求等待图标
			var $loading=$("<span class='loading'></span>");			
			$loading.appendTo(document.body);
			
			
			var params={
				url:"",
				isRefreshTable:false,
				isMutiPage:false,
				data:{},
				submitStatus:"fail"
			}
			
			$.extend(params,o||{});
			
			if(!params.url){
				alert("请求地址为空！");
				return;
			}
						
			//发送请求
			$.ajax({ url:params.url, data: params.data,	
				success: function(data){
                if(typeof data ==="string"){
                   data = JSON.parse(data);
                }
                
				params.submitStatus=data.status;				//返回状态
				
				
				if(params.submitStatus==="success"){
					$loading.remove();
					var totalPage=data.totalPage,
						datas=data.data;
                    
					params.isRefreshTable&&Util.refreshTable(params.table,params.operate,datas);
					params.fn&&params.fn();
					params.pagination&&params.pagination(totalPage);
					return true;
				}else if(params.submitStatus=="fail"){
					$loading.remove();
                    
					opts = {
						content: data.msg,
						css: 'warning'
					};
                    Util.toast(opts);
					return false;
				}

			},error:function(req,msg){
				opts = {
					content: msg,
					css: 'warning'
				};
				Util.toast(opts);
				$(".loading").remove();
				return false;
			}});
		}

	};

	/**
	 * @module common:static/js/Util
	 */
	module.exports = Util;
});