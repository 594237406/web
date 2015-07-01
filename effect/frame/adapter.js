Desktop.setPath("desktop/");
Desktop.defaultIcon = "";
Wade.nav.createAdapter({
	init : function(b, a) {
	},
	open : function(h, e, d, g, b) {
		var a;
		if (b && $.isString(b)) {
			a = $.redirect.buildUrl(b, e, d, g);
		} else {
			a = $.redirect.buildUrl(e, d, g);
		}
		var f, c = Desktop.windowMgr.existTitle(h);
		if (c && (f = Desktop.windowMgr.windows[c])) {
			this.switchByTitle(h);
			if (f.url != a) {
				Desktop.windowMgr.reload(h, a);
			}
		} else {
			Desktop.windowMgr.add(h, Desktop.defaultIcon, a);
		}
	},
	openLock : function(e, c, b, d, a) {
	},
	openByUrl : function(d, a, b) {
		var a;
		if (b && $.isString(b)) {
			a = $.redirect.buildSysUrl(b, a);
		} else {
			a = $.redirect.buildSysUrl(a);
		}
		var c = Desktop.windowMgr.existTitle(d);
		if (c) {
			this.switchByTitle(d);
		} else {
			Desktop.windowMgr.add(d, Desktop.defaultIcon, a);
		}
	},
	getData : function() {
	},
	getDataByTitle : function(a) {
	},
	redirect : function(f, d, c, e, a, b) {
	},
	reload : function(a) {
	},
	getTitle : function() {
	},
	getContentWindow : function() {
		return Desktop.windowMgr.getCurrentContentWindow();
	},
	getContentWindowByTitle : function(b) {
		var a = Desktop.windowMgr.existTitle(b);
		if (a) {
			this.switchByTitle(b);
		} else {
			alert('不存在标题为"' + b + '"的窗口！');
		}
	},
	switchByTitle : function(c) {
		var b, a = Desktop.windowMgr.existTitle(c);
		if (a && (b = Desktop.windowMgr.windows[a])) {
			Desktop.windowMgr.active(a);
		}
	},
	close : function() {
	},
	closeByTitle : function(a) {
	}
});
function loadShortCuts() {
	$.ajax.get("", "queryShortCuts", function(b) {
		if (b && !$.isString(b)) {
			for ( var a = 0; a < b.length; a++) {
				Desktop.shortcutMgr.add(b.get(a, "TITLE"), b.get(a, "ICON"), b
						.get(a, "URL"), b.get(a, "BID"));
			}
		}
	});
}
function loadWidgets() {
	$.ajax.get("", "queryWidgets", function(b) {
		if (b && !$.isString(b)) {
			for ( var a = 0; a < b.length; a++) {
				Desktop.widgetMgr.add(b.get(a, "TITLE"), b.get(a, "CLS"), b
						.get(a, "URL"));
			}
		}
		Desktop.widgetMgr.reSizeBar();
	});
}
function loadMenus() {
	$.ajax.get("", "queryMenus", function(a) {
		if (a) {
			Desktop.Menu.loadMenus(a);
		}
	});
}
$(document).ready(function() {
	loadShortCuts();
	loadWidgets();
	loadMenus();
});