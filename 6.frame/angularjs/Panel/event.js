var _EU = {
	on : function(element, eventType, handler) {
		if (window.addEventListener) {
			element.addEventListener(eventType, handler, false)
		} else {
			element.attachEvent("on" + eventType, handler)
		}
	},
	proxy : function(target, eventType, eventHandler, parent) {
		if (parent && parent.nodeType != 1) {
			alert("代理元素传入有误");
			return;
		} else if (parent && !_U.contains(parent, target)) {
			alert("代理元素不包含目标元素");
			return;
		} else if (!parent) {
			parent = target;
		}
		
		var _this=this;
		this.on(parent, eventType, function(ev) {
			ev = _this.ev(ev);
			var cur_target_dom = ev.target;
			if (target === cur_target_dom) {
				eventHandler(ev);
			}
		});
	},

	ev : function(ev) {
		return ev || window.event;
	},
	target : function(ev) {
		ev = this.ev(ev);
		ev.target = ev.target || ev.srcElement;
		return ev.target;
	},
	stopPropagation : function(ev) {
		ev = this.ev(ev);
		if (ev.stopPropagation) { // W3C阻止冒泡方法
			ev.stopPropagation();
		} else {
			ev.cancelBubble = true; // IE阻止冒泡方法
		}
	}
}
