var Util={
		format:function(fmt) {
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
		
		//string模板方法
		tmpl:function (str,data,regexp){
			return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
				return (data[name] === undefined) ? '' : data[name];
			});
		}		
		
}