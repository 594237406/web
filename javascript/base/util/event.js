var EventUtil = {
	bind : function(element, eventType, handler) {
		if (window.addEventListener) {
			element.addEventListener(eventType, handler, false)
		} else {
			element.attachEvent("on" + eventType, handler)
		}
	},
	formatEventObj : function(e) {
		e = e || window.event;
		e.target = e.target || e.srcElement;
		return e;
	},
	mouseInHandler : function(e) {
		if (this.mouseInClientX === -1) {
			this.mouseInClientX = e.clientX;
		}
		if (this.mouseInClientY === -1) {
			this.mouseInClientY = e.clientY;
		}
	},
	mouseInTimeHandler : function(e) {
		if (this.mouseInTime === -1) {
			this.mouseInTime = (new Date()).getTime();
		}
		this.mouseInTimeSpan = (new Date()).getTime() - this.mouseInTime;
	}
}

function stopPropagation(e) {
    e = e || window.event;
    if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}