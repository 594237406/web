/*!
 * Desktop2.0 js lib
 * http://www.wadecn.com/
 * Auth:谢冬星 xiedx@asiainfo-linkage.com
 * Copyright 2012, WADE
 */
(function() {
	Wade.Dom.extend({
		hoverDelay : function(Z) {
			var ad = {
				hoverDuring : 200,
				outDuring : 200,
				hoverEvent : function() {
					$.noop();
				},
				outEvent : function() {
					$.noop();
				}
			};
			var ab = $.extend(ad, Z || {});
			var Y, aa, ac = this;
			$(this).bind("mouseover", function() {
				clearTimeout(aa);
				Y = setTimeout(function() {
					ab.hoverEvent.apply(ac);
				}, ab.hoverDuring);
			});
			$(this).bind("mouseout", function() {
				clearTimeout(Y);
				aa = setTimeout(function() {
					ab.outEvent.apply(ac);
				}, ab.outDuring);
			});
		}
	});
	Wade.isFrameContainer = true;
	var M = "";
	var S, o;
	var U = {};
	U.setPath = function(Y) {
		if (Y) {
			M = "" + Y;
		}
	};
	var O = new $.Template(
			'<td id="task_{id}">'
					+ '<span class="right"></span>'
					+ '<span onclick="javascript:Desktop.windowMgr.switchTo({id})" class="text">'
					+ '<i style="'
					+ (($.browser.msie && parseInt($.browser.version) < 10) ? "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='{icon}',sizingMethod='scale');"
							: "background-image:url({icon});")
					+ '"></i>{title}</span>'
					+ '<span onclick="javascript:Desktop.windowMgr.remove({id})" class="close"><b></b></span>'
					+ "</td>");
	U.taskItem = function(aa, Z, Y) {
		this.id = aa;
		this.title = Z;
		this.icon = (M && ("" + Y).indexOf(M) > -1) ? Y : $.combinePath(M, Y);
	};
	U.taskItem.prototype = {
		draw : function() {
			O.append("#taskItemList", {
				"id" : this.id,
				"title" : this.title,
				"icon" : this.icon
			});
		},
		remove : function() {
			$("#task_" + this.id).remove();
		}
	};
	var W;
	U.taskItemMgr = {
		idx : [],
		items : {},
		add : function(ac, ab, Z, Y) {
			if (this.idx.length >= 8) {
				return;
			}
			if (!ac || !(/^\d+$/.test(ac))) {
				Y = Z;
				Z = ab;
				ab = ac;
				ac = $.guid++;
			}
			var aa = new U.taskItem(ac, ab, Z, Y);
			this.idx.push(ac);
			this.items[ac] = aa;
			aa.draw();
			this.active(ac);
			return ac;
		},
		remove : function(Z) {
			if (!Z || !this.items[Z]) {
				return;
			}
			for ( var Y = this.idx.length - 1; Y >= 0; Y--) {
				if (this.idx[Y] == Z) {
					this.idx.splice(Y, 1);
				}
			}
			this.items[Z].remove();
			delete this.items[Z];
			return Z;
		},
		active : function(Y) {
			if (!Y || !this.items[Y]) {
				return;
			}
			if (W) {
				if (W == Y) {
					return Y;
				}
				$("#task_" + W).removeClass("on");
			}
			$("#task_" + Y).addClass("on");
			W = Y;
			return Y;
		},
		unactive : function(Y) {
			if (!Y || !this.items[Y]) {
				return;
			}
			if (W) {
				if (W == Y) {
					W = null;
				}
			}
			$("#task_" + Y).removeClass("on");
			return Y;
		}
	};
	var K = new $.Template(
			'<div id="win_{id}" class="m_window" style="left:{left}px;top:{top}px;width:{width}px;z-index:{zindex}">'
					+ (($.browser.msie && parseInt($.browser.version) == 6) ? '<iframe class="ie6Cover"></iframe>'
							: "")
					+ '<div id="win_title_{id}" class="title" >'
					+ '<div class="position">'
					+ '<i style="'
					+ (($.browser.msie && parseInt($.browser.version) < 9) ? "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='{icon}',sizingMethod='scale');"
							: "background:url({icon});")
					+ '"></i><span id="win_title_{id}_span">{title}</span>'
					+ "</div>"
					+ "</div>"
					+ '<div class="content">'
					+ '<div class="frame">'
					+ '<iframe id="win_frame_{id}" frameborder="0" '
					+ (!$.browser.msie ? ' onload="javascript:Desktop.windowMgr.showContent({id});" '
							: " ")
					+ ' style="height:{frame_height}px;visibility:hidden;"></iframe>'
					+ '<div id="win_loading_{id}" class="loading"></div>'
					+ "</div>"
					+ '<div id="win_cover_{id}" onmousedown="javascript:Desktop.windowMgr.active({id});" class="cover" style="display:none;"></div>'
					+ "</div>"
					+ '<div class="fn">'
					+ '<span class="help"><b></b><i></i></span>'
					+ '<!--span class="shortcut"><b></b><i></i></span-->'
					+ '<span class="min" onclick="javascript:Desktop.windowMgr.hide({id});"><b></b></span>'
					+ '<span id="win_max_{id}" class="max" onclick="javascript:Desktop.windowMgr.max({id});"><b></b></span>'
					+ '<span class="close" onclick="javascript:Desktop.windowMgr.remove({id});"><b></b></span>'
					+ "</div>"
					+ '<div class="handleTop"></div>'
					+ '<div class="handleBottom"></div>'
					+ '<div class="handleLeft"></div>'
					+ '<div class="handleRight"></div>'
					+ '<div class="handleTopLeft"></div>'
					+ '<div class="handleTopRight"></div>'
					+ '<div class="handleBottomLeft"></div>'
					+ '<div class="handleBottomRight"></div>' + "</div>");
	var B = 100, V = 0;
	U.window = function(ac, ab, aa, Z, Y) {
		this.id = ac;
		this.title = ab;
		this.icon = (M && ("" + aa).indexOf(M) > -1) ? aa : $
				.combinePath(M, aa);
		this.url = $.redirect.parseUrl(Z + "&MENU_ID="
				+ ((Y == null || Y == "undefined") ? "" : Y));
		this.bid = Y;
		this.width = 0;
		this.height = 0;
		this.left = 0;
		this.top = 0;
		this.zindex = (++B);
		this.visible = true;
		this.max = false;
	};
	U.window.prototype = {
		draw : function() {
			K.insertBefore("#ddCover", {
				"id" : this.id,
				"title" : this.title,
				"icon" : this.icon,
				"zindex" : this.zindex,
				"left" : this.left,
				"top" : this.top,
				"width" : this.width,
				"frame_height" : (this.height - 36)
			});
			$("#win_title_" + this.id + "").bind("mousedown", U.DD.winDDHandle);
			$("#win_" + this.id + " [class*=handle]").bind("mousedown",
					U.DD.winResizeHandle);
			if ($.browser.msie) {
				$("#win_frame_" + this.id).bind("readystatechange ",
						U.windowMgr.onIframeReadyStateChange_IE);
			}
			$("#win_frame_" + this.id).attr("src", this.url);
		},
		remove : function() {
			if ($.browser.msie) {
				$("#win_frame_" + this.id).unbind("readystatechange ",
						U.windowMgr.onIframeReadyStateChange_IE);
			}
			$("#win_title_" + this.id).unbind("mousedown", U.DD.winDDHandle);
			$("#win_" + this.id + " [class*=handle]").unbind("mousedown",
					U.DD.winResizeHandle);
			$("#win_" + this.id).remove();
			if ($.browser.msie) {
				CollectGarbage();
			}
		},
		setWidth : function(Z, Y) {
			$("#win_" + this.id).css("width", Z + "px");
			if (!Y && Y !== false) {
				this.width = Z;
			}
		},
		setHeight : function(Y, Z) {
			$("#win_frame_" + this.id).css("height", (Y - 36) + "px");
			if (!Z && Z !== false) {
				this.height = Y;
			}
		},
		setLeft : function(Z, Y) {
			$("#win_" + this.id).css("left", Z + "px");
			if (!Y && Y !== false) {
				this.left = Z;
			}
		},
		setTop : function(Z, Y) {
			$("#win_" + this.id).css("top", Z + "px");
			if (!Y && Y !== false) {
				this.top = Z;
			}
		},
		focus : function() {
			this.zindex = B;
			$("#win_" + this.id).css("z-index", this.zindex);
			$("#win_" + this.id).addClass("m_window-active");
			$("#win_cover_" + this.id).css("display", "none");
		},
		unfocus : function() {
			if (V > 0 && this.zindex > V) {
				this.zindex = (this.zindex - 1);
				$("#win_" + this.id).css("z-index", this.zindex);
			}
			$("#win_" + this.id).removeClass("m_window-active");
			$("#win_cover_" + this.id).css("display", "block");
		},
		maxSize : function() {
			if (!this.max) {
				this.setLeft(0, false);
				this.setTop(0, false);
				this.setWidth(S, false);
				this.setHeight(o - 47, false);
				$("#win_max_" + this.id)[0].className = "default";
			} else {
				this.setLeft(this.left, false);
				this.setTop(this.top, false);
				this.setWidth(this.width, false);
				this.setHeight(this.height, false);
				$("#win_max_" + this.id)[0].className = "max";
			}
			this.max = !this.max;
		},
		hide : function() {
			if (!this.visible) {
				return;
			}
			$("#win_" + this.id).css("display", "none");
			this.visible = false;
		},
		show : function() {
			if (this.visible) {
				return;
			}
			$("#win_" + this.id).css("display", "");
			this.visible = true;
		},
		getContentWindow : function() {
			var Y = $("#win_frame_" + this.id);
			if (Y.length) {
				return Y[0].contentWindow;
			}
		},
		reload : function(aa, Y) {
			if (!aa || !Y) {
				return;
			}
			$("#win_title_" + this.id + "_span").html(aa);
			this.showLoading();
			var Z = $("#win_frame_" + this.id);
			if (Z.length && Z[0].contentWindow && Z[0].contentWindow.document) {
				Z[0].contentWindow.document.location = Y;
			}
			this.url = Y;
		},
		showLoading : function() {
			$("#win_frame_" + this.id).css("visibility", "hidden");
			$("#win_loading_" + this.id).css("display", "block");
		},
		showContent : function() {
			var Y = $("#win_frame_" + this.id).attr("src");
			if (Y) {
				$("#win_loading_" + this.id).css("display", "none");
				$("#win_frame_" + this.id).css("visibility", "visible");
			}
		}
	};
	function m() {
		var ad, aa;
		var ac = 0, Z = 0;
		if (S <= 800) {
			Z = S - 20;
			ac = 10;
			if (Z < 0) {
				Z = 100;
				ac = 5;
			}
		} else {
			Z = parseInt(S / Math.ceil(screen.width / screen.height)) * 1.4;
			ad = parseInt((S - Z) / 10);
			aa = Math.floor(((ad - 1) + 1) * Math.random() + 1);
			ac = aa * 10;
			if (Z >= S) {
				Z = S - 20;
				ac = 10;
			}
		}
		var ab = 0, Y = 0;
		if (o <= 600) {
			Y = o - 47 - 20;
			ab = 10;
			if (Y < 0) {
				Y = 300;
				ab = 5;
			}
		} else {
			Y = parseInt(o / Math.ceil(screen.width / screen.height)) * 1.4;
			ad = parseInt((o - Y - 47) / 10);
			aa = Math.floor(((ad - 1) + 1) * Math.random() + 1);
			ab = aa * 10;
			if (Y >= o - 47) {
				Y = o - 47 - 20;
				ab = 10;
			}
		}
		return {
			"left" : ac,
			"top" : ab,
			"width" : Z,
			"height" : Y
		};
	}
	var D;
	U.windowMgr = {
		idx : [],
		windows : {},
		existBid : function(Y) {
			if (!Y) {
				return;
			}
			for ( var Z in this.windows) {
				if (this.windows[Z].bid && this.windows[Z].bid == Y) {
					return Z;
				}
			}
		},
		existTitle : function(Y) {
			if (!Y) {
				return;
			}
			for ( var Z in this.windows) {
				if (this.windows[Z].title && this.windows[Z].title == Y) {
					return Z;
				}
			}
		},
		add : function(ae, ab, aa, Z) {
			if (this.idx.length >= 8) {
				return;
			}
			var Y;
			if (Z) {
				Y = this.existBid(Z);
				if (Y) {
					this.active(Y);
					return;
				}
			}
			if (ae) {
				Y = this.existTitle(ae);
				if (Y) {
					this.active(Y);
					return;
				}
			}
			var af = $.guid++;
			U.taskItemMgr.add(af, ae, ab, Z);
			var ac = new U.window(af, ae, ab, aa, Z);
			this.idx.push(af);
			var ad = m();
			ac.left = ad.left;
			ac.top = ad.top;
			ac.width = ad.width;
			ac.height = ad.height;
			ad = null;
			this.windows[af] = ac;
			ac.draw();
			this.active(af);
			return af;
		},
		remove : function(aa) {
			if (!aa || !this.windows[aa]) {
				return;
			}
			U.taskItemMgr.remove(aa);
			for ( var Y = this.idx.length - 1; Y >= 0; Y--) {
				if (this.idx[Y] == aa) {
					this.idx.splice(Y, 1);
					break;
				}
			}
			this.windows[aa].remove();
			delete this.windows[aa];
			if (this.idx.length > 0) {
				var Z;
				for ( var Y = this.idx.length - 1; Y >= 0; Y--) {
					Z = this.idx[this.idx.length - 1];
					if (this.windows[Z].visible) {
						this.active(Z);
						break;
					}
				}
			}
			return aa;
		},
		removeAll : function() {
			if (this.idx.length == 0 || !window.confirm("确定要关闭所有已经打开的窗口吗？")) {
				return;
			}
			for ( var Y in this.windows) {
				this.remove(Y);
			}
		},
		switchTo : function(Y) {
			if (!Y || !this.windows[Y]) {
				return;
			}
			if (this.windows[Y].visible) {
				if (D && D == Y) {
					this.hide(Y);
				} else {
					this.active(Y);
				}
			} else {
				this.active(Y);
			}
		},
		getCurrentContentWindow : function() {
			if (D) {
				var Y = $("#win_frame_" + D);
				if (Y.length) {
					return Y[0].contentWindow;
				}
			}
		},
		max : function(Y) {
			if (!Y || !this.windows[Y]) {
				return;
			}
			this.windows[Y].maxSize();
			if (!D || D != Y) {
				this.active(Y);
			}
		},
		active : function(Z) {
			if (!Z || !this.windows[Z]) {
				return;
			}
			if (D) {
				if (D == Z) {
					return Z;
				}
			}
			U.taskItemMgr.active(Z);
			V = this.windows[Z].zindex;
			this.windows[Z].show();
			this.windows[Z].focus();
			for ( var Y = this.idx.length - 1; Y >= 0; Y--) {
				if (this.idx[Y] != Z) {
					this.windows[this.idx[Y]].unfocus();
				}
			}
			D = Z;
			return Z;
		},
		unactive : function() {
		},
		hide : function(aa) {
			if (!aa || !this.windows[aa]) {
				return;
			}
			if (D) {
				if (D == aa) {
					U.taskItemMgr.unactive(aa);
				}
			}
			this.windows[aa].hide();
			var Z = false;
			for ( var Y = this.idx.length - 1; Y >= 0; Y--) {
				if (this.idx[Y] != aa && this.windows[this.idx[Y]].visible) {
					this.active(this.idx[Y]);
					Z = true;
					break;
				}
			}
			if (!Z) {
				D = null;
			}
		},
		show : function(Y) {
			if (!Y || !this.windows[Y]) {
				return;
			}
			this.windows[Y].show();
		},
		showContent : function(Y) {
			if (!Y || !this.windows[Y]) {
				return;
			}
			this.windows[Y].showContent();
		},
		hideAll : function() {
			if (D) {
				U.taskItemMgr.unactive(D);
			}
			for ( var Y in this.windows) {
				this.windows[Y].hide();
			}
			D = null;
		},
		reload : function(Z, Y) {
			var aa = this.existTitle(Z);
			if (!aa || !this.windows[aa]) {
				return;
			}
			this.windows[aa].reload(Z, Y);
		},
		onIframeReadyStateChange_IE : function() {
			if (this.readyState == "complete") {
				var Z = $.attr(this, "id");
				if (Z) {
					var Y = ("" + Z).split("_");
					Y = Y[Y.length - 1];
					U.windowMgr.showContent(Y);
				}
			}
		}
	};
	var b = new $.Template(
			'<li id="shortcut_{id}" ondblclick="javascript:Desktop.shortcutMgr.open({id});" style="left:{left}px; top:{top}px;">'
					+ '<div class="content">'
					+ '<span class="bg"></span>'
					+ '<i style="'
					+ (($.browser.msie && parseInt($.browser.version) == 6) ? "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='{icon}',sizingMethod='scale');"
							: "background:url({icon});")
					+ '"></i>'
					+ '<span class="title"><b></b>{title}</span>'
					+ "</div>"
					+ '<div class="bottom"></div>'
					+ '<div class="delete" onclick="javascript:Desktop.shortcutMgr.remove({id});"><b></b></div>'
					+ "</li>");
	U.shortcut = function(ac, ab, aa, Z, Y) {
		this.id = ac;
		this.title = ab;
		this.icon = (M && ("" + aa).indexOf(M) > -1) ? aa : $
				.combinePath(M, aa);
		this.url = Z;
		this.bid = Y;
		this.visible = false;
		this.left = 0;
		this.top = 0;
	};
	U.shortcut.prototype = {
		draw : function(Z, Y) {
			if (Z) {
				this.left = Z;
			}
			if (Y) {
				this.top = Y;
			}
			b.append("#shortCutList", {
				"id" : this.id,
				"title" : this.title,
				"icon" : this.icon,
				"left" : this.left,
				"top" : this.top
			});
		},
		setLeft : function(Y) {
			$("#shortcut_" + this.id).css("left", Y + "px");
			this.left = Y;
		},
		setTop : function(Y) {
			$("#shortcut_" + this.id).css("top", Y + "px");
			this.top = Y;
		},
		position : function(Z, Y) {
			this.setLeft(Z);
			this.setTop(Y);
		},
		rePosition : function() {
		},
		show : function() {
			$("#shortcut_" + this.id).css("display", "");
			this.visible = true;
		},
		hide : function() {
			$("#shortcut_" + this.id).css("display", "none");
			this.visible = false;
		},
		remove : function() {
			$("#shortcut_" + this.id).remove();
		}
	};
	var y = 20, l = 20;
	var k = 105, L = 100;
	var T = 0, z = 0;
	U.shortcutMgr = {
		idx : [],
		shortcuts : {},
		sumMaxRowNum : function() {
			T = Math.round((o - l - 47) / L);
			if (!T) {
				T = 1;
			}
			return T;
		},
		sumMaxCellNum : function() {
			z = Math.round((S - y - 52) / k);
			if (!z) {
				z = 1;
			}
			return z;
		},
		add : function(ae, aa, Z, Y) {
			if (!aa) {
				alert("快捷方式图标不能为空！");
				return;
			}
			if (!ae) {
				alert("快捷方式名称不能为空！");
				return;
			}
			if (!T) {
				this.sumMaxRowNum();
			}
			if (!z) {
				this.sumMaxCellNum();
			}
			if (this.idx.length > (T * z)) {
				return;
			}
			var af = $.guid++;
			var ad = new U.shortcut(af, ae, aa, Z, Y);
			var ac = parseInt(this.idx.length / T) * k + y;
			var ab = parseInt(this.idx.length % T) * L + l;
			this.idx.push(af);
			this.shortcuts[af] = ad;
			ad.draw(ac, ab);
			return af;
		},
		draw : function() {
		},
		rePosition : function() {
			this.sumMaxRowNum();
			this.sumMaxCellNum();
			var aa, Z;
			for ( var Y = 0; Y < this.idx.length; Y++) {
				aa = parseInt(Y / T) * k + y;
				Z = parseInt(Y % T) * L + l;
				this.shortcuts[this.idx[Y]].position(aa, Z);
			}
		},
		open : function(Z) {
			if (!Z || !this.shortcuts[Z]) {
				return;
			}
			var Y = this.shortcuts[Z];
			U.windowMgr.add(Y.title, Y.icon, Y.url, Y.bid);
		},
		remove : function(aa) {
			if (!aa || !this.shortcuts[aa]) {
				return;
			}
			var Z = true;
			for ( var Y = this.idx.length - 1; Y >= 0; Y--) {
				if (this.idx[Y] == aa) {
					this.idx.splice(Y, 1);
					if (Y == (this.idx.length - 1)) {
						Z = false;
					}
					break;
				}
			}
			this.shortcuts[aa].remove();
			delete this.shortcuts[aa];
			if (Z) {
				this.rePosition();
			}
		}
	};
	var N = new $.Template(
			'<div id="widget_{id}" class="widget" style="top:1px; right:54px;">'
					+ '<div class="bg"></div>'
					+ '<div id="widget_title_{id}" class="title">'
					+ '<div class="text"><i class="e_widget-s e_widget-s-{cls}"></i>{title}</div>'
					+ '<div class="fn">'
					+ '<span class="unfix"><b></b><i></i></span>'
					+ '<span class="fold"><b></b><i></i></span>'
					+ '<span class="delete"><b></b><i></i></span>'
					+ "</div>"
					+ "</div>"
					+ '<div class="content">'
					+ '<div id="widget_loading_{id}" class="loading"></div>'
					+ '<iframe id="widget_frame_{id}" allowTransparency="true" frameborder="0" height="105" '
					+ (!$.browser.msie ? ' onload="javascript:Desktop.widgetMgr.showContent({id});" '
							: " ") + ' style="visibility:hidden"></iframe>'
					+ "</div>" + "</div>");
	var F = new $.Template(
			'<li id="widget_icon_{id}" title="{title}"><s></s><b></b><i class="e_widget e_widget-{cls}"></i></li>');
	U.widget = function(ab, aa, Y, Z) {
		this.id = ab;
		this.title = aa;
		this.cls = Y;
		this.url = Z;
		this.width = 0;
		this.height = 0;
		this.left = 0;
		this.top = 0;
	};
	U.widget.prototype = {
		draw : function() {
			N.append("#widgetList", {
				"id" : this.id,
				"title" : this.title,
				"cls" : this.cls
			});
			F.append("#widgetIconList", {
				"id" : this.id,
				"title" : this.title,
				"cls" : this.cls
			});
			if ($.browser.msie) {
				$("#widget_frame_" + this.id).bind("readystatechange",
						U.widgetMgr.onIframeReadyStateChange_IE);
			}
			$("#widget_title_" + this.id)
					.bind("mousedown", U.DD.widgetDDHandle);
			$("#widget_frame_" + this.id).attr("src", this.url);
		},
		show : function() {
		},
		showContent : function() {
			$("#widget_loading_" + this.id).css("display", "none");
			$("#widget_frame_" + this.id).css("visibility", "visible");
		},
		hide : function() {
		},
		remove : function() {
			if ($.browser.msie) {
				$("#widget_frame_" + this.id).unbind("readystatechange",
						U.widgetMgr.onIframeReadyStateChange_IE);
			}
			$("#widget_title_" + this.id).unbind("mousedown",
					U.DD.widgetDDHandle);
			$("#widget_" + this.id).remove();
			$("#widget_icon_" + this.id).remove();
			if ($.browser.msie) {
				CollectGarbage();
			}
		},
		setWidth : function(Z, Y) {
			$("#widget_" + this.id).css("width", Z + "px");
			if (!Y && Y !== false) {
				this.width = Z;
			}
		},
		setHeight : function(Y, Z) {
			$("#widget_" + this.id).css("height", (Y - 36) + "px");
			if (!Z && Z !== false) {
				this.height = Y;
			}
		},
		setLeft : function(Z, Y) {
			$("#widget_" + this.id).css("left", Z + "px");
			if (!Y && Y !== false) {
				this.left = Z;
			}
		},
		setTop : function(Z, Y) {
			$("#widget_" + this.id).css("top", Z + "px");
			if (!Y && Y !== false) {
				this.top = Z;
			}
		}
	};
	var R;
	U.widgetMgr = {
		idx : [],
		widgets : {},
		add : function(ab, Y, aa) {
			var ac = $.guid++;
			var Z = new U.widget(ac, ab, Y, aa);
			this.idx.push(ac);
			this.widgets[ac] = Z;
			Z.draw();
			return ac;
		},
		remove : function(Y) {
		},
		show : function(Y) {
		},
		showContent : function(Y) {
			if (!Y || !this.widgets[Y]) {
				return;
			}
			this.widgets[Y].showContent();
		},
		active : function(Y) {
			if (!Y || !this.widgets[Y]) {
				return;
			}
			if (R) {
				if (R == Y) {
					return Y;
				}
				$("#widget_" + R).removeClass("widget-fix");
			}
			$("#widget_" + Y).addClass("widget-fix");
			R = Y;
			return Y;
		},
		unactive : function(Y) {
			if (!Y || !this.widgets[Y]) {
				return;
			}
			if (R) {
				if (R == Y) {
					R = null;
				}
			}
			$("#widget_" + Y).removeClass("widget-fix");
			return Y;
		},
		reSizeBar : function() {
			$("#widgetIconBg").css("height",
					(o - $("#widgetIconList").height() - 49) + "px");
		},
		onIframeReadyStateChange_IE : function() {
			if (this.readyState == "complete") {
				var Z = $.attr(this, "id");
				if (Z) {
					var Y = ("" + Z).split("_");
					Y = Y[Y.length - 1];
					U.widgetMgr.showContent(Y);
				}
			}
		}
	};
	var H;
	var s, h;
	var P, u, s;
	U.DD = {
		winDDHandle : function(aa) {
			var Z = aa.target;
			var ab = 0;
			while (Z && $.isElement(Z)
					&& ("" + Z.className).indexOf("m_window") < 0) {
				Z = Z.parentNode;
				ab++;
				if (ab > 3) {
					break;
				}
			}
			if (!Z || ("" + Z.className).indexOf("m_window") < 0) {
				return;
			}
			Z = $(Z);
			P = Z.attr("id").split("_")[1];
			U.windowMgr.active(P);
			var Y = Z.position();
			U.DD.proxy.onDragInit(1, aa.pageX, aa.pageY, Y.left, Y.top, Z
					.width(), Z.height());
			H = setTimeout(function() {
				U.DD.proxy.onDragStart();
			}, 1000);
			Y = null;
		},
		winResizeHandle : function(aa) {
			var Z = aa.target.parentNode;
			if (!Z || ("" + Z.className).indexOf("m_window") < 0) {
				return;
			}
			Z = $(Z);
			u = Z.attr("id").split("_")[1];
			U.windowMgr.active(u);
			var Y = Z.position();
			var ab = ("" + aa.target.className).replace("handle", "")
					.toLowerCase();
			U.DD.proxy.onResizeStart(ab, aa.pageX, aa.pageY, Y.left, Y.top, Z
					.width(), Z.height());
		},
		widgetDDHandle : function(aa) {
			var Z = aa.target;
			var ab = 0;
			while (Z
					&& $.isElement(Z)
					&& (("" + Z.className).indexOf("widget") < 0 || !$
							.nodeName(Z, "div"))) {
				Z = Z.parentNode;
				ab++;
				if (ab > 5) {
					break;
				}
			}
			if (!Z || ("" + Z.className).indexOf("widget") < 0
					|| !$.nodeName(Z, "div")) {
				return;
			}
			Z = $(Z);
			s = Z.attr("id").split("_")[1];
			var Y = Z.position();
			U.DD.proxy.onDragInit(2, aa.pageX, aa.pageY, Y.left, Y.top, Z
					.width(), Z.height());
			H = setTimeout(function() {
				U.DD.proxy.onDragStart();
			}, 1000);
			Y = null;
		},
		widegetResizeHandle : function(Y) {
		},
		disableTextSelect : function() {
			if ($.browser.msie || $.browser.opera) {
				document.onselectstart = function() {
					return false;
				};
			} else {
				$(document.body).addClass("user_select_none");
			}
		},
		enableTextSelect : function() {
			if ($.browser.msie || $.browser.opera) {
				document.onselectstart = function() {
					return true;
				};
			} else {
				$(document.body).removeClass("user_select_none");
			}
		}
	};
	var q = false, a = false;
	var A = false, i = false;
	var c = 1;
	var r;
	var G = -1000, e = -1000, d = 0, g = 0;
	var j = 0, Q = 0;
	var n = false, X = false;
	var C = false;
	var x = 200, w = 150;
	var p = 1;
	U.DD.proxy = {
		domid : "ddProxy",
		init : function() {
			$(document).bind("mousedown", this.onDocumentMouseDown);
			$(document).bind("mousemove", this.onDocumentMouseMove);
			$(document).bind("mouseup", this.onDocumentMouseUp);
		},
		onDocumentMouseDown : function(Y) {
			n = true;
		},
		onDocumentMouseMove : function(Y) {
			X = true;
			if (n && q) {
				if (!A) {
					U.DD.proxy.onDragStart();
				}
				U.DD.proxy.onDrag(Y.pageX, Y.pageY);
			}
			if (n && a) {
				U.DD.proxy.onResize(Y.pageX, Y.pageY);
			}
		},
		onDocumentMouseUp : function(Y) {
			if (q) {
				U.DD.proxy.onDragEnd(Y.pageX, Y.pageY);
				q = false;
			}
			if (a) {
				U.DD.proxy.onResizeEnd(Y.pageX, Y.pageY);
				a = false;
			}
			if (C) {
				U.DD.proxy.hideCover();
			}
			if (H) {
				clearTimeout(H);
			}
			U.DD.proxy.hide();
			n = false;
			X = false;
			P = null;
			u = null;
			s = null;
		},
		copySizeAndPosition : function(ac, ab, aa, Z, Y, ad) {
			j = ac - aa;
			Q = ab - Z;
			this.resize(Y, ad);
			this.position(aa, Z);
		},
		onDragInit : function(ae, ac, ab, aa, Z, Y, ad) {
			c = ae;
			q = true;
			this.copySizeAndPosition(ac, ab, aa, Z, Y, ad);
			this.showCover();
		},
		onDragStart : function() {
			if (A) {
				return;
			}
			$(document.body).css("cursor", "move");
			U.DD.disableTextSelect();
			this.show();
			if (c == 1) {
			} else {
				if (c == 2) {
					U.widgetMgr.active(s);
				}
			}
			A = true;
		},
		onDrag : function(aa, Z) {
			var ab = aa - j;
			var Y = Z - Q;
			if (c == 1) {
				this.setLeft(ab);
			} else {
				if (c == 2) {
					if ((ab + d <= S - 52 - 2) && ab % p == 0) {
						this.setLeft(ab);
					}
				}
			}
			if (Y >= 0 && Y <= (o - 47 - 30)) {
				if (c == 1) {
					this.setTop(Y);
				} else {
					if (c == 2) {
						if (Y >= 1 && Y % p == 0) {
							this.setTop(Y);
						}
					}
				}
			}
		},
		onDragEnd : function(Z, Y) {
			if (A) {
				$(document.body).css("cursor", "default");
				U.DD.enableTextSelect();
				if (c == 1) {
					if (U.windowMgr.windows[P]) {
						U.windowMgr.windows[P].setLeft(G);
						U.windowMgr.windows[P].setTop(e);
					}
				} else {
					if (c == 2) {
						if (U.widgetMgr.widgets[s]) {
							U.widgetMgr.widgets[s].setLeft(G);
							U.widgetMgr.widgets[s].setTop(e);
						}
						U.widgetMgr.unactive(s);
					}
				}
			}
			A = false;
		},
		onResizeStart : function(af, ac, ab, aa, Z, Y, ad) {
			r = af;
			a = true;
			U.DD.disableTextSelect();
			this.copySizeAndPosition(ac, ab, aa, Z, Y, ad);
			this.showCover();
			this.show();
			var ae = "";
			if (r.indexOf("top") > -1) {
				ae += "n";
			} else {
				if (r.indexOf("bottom") > -1) {
					ae += "s";
				}
			}
			if (r.indexOf("right") > -1) {
				ae += "e";
			} else {
				if (r.indexOf("left") > -1) {
					ae += "w";
				}
			}
			ae = ae + "-resize";
			$(document.body).css("cursor", ae);
		},
		onResize : function(ab, Z) {
			var Y, aa;
			if (r.indexOf("right") > -1) {
				Y = ab - G;
				if (Y >= x) {
					this.setWidth(Y);
				}
			}
			if (r.indexOf("bottom") > -1) {
				aa = Z - e;
				if (aa >= w && Z >= 0 && Z <= (o - 47)) {
					this.setHeight(aa);
				}
			}
			if (r.indexOf("left") > -1) {
				Y = d + (G - ab);
				if (Y >= x) {
					this.setWidth(Y);
					this.setLeft(ab);
				}
			}
			if (r.indexOf("top") > -1) {
				aa = g + (e - Z);
				if (aa >= w && Z >= 0 && Z <= (o - 47)) {
					this.setHeight(aa);
					this.setTop(Z);
				}
			}
		},
		onResizeEnd : function(Z, Y) {
			U.DD.enableTextSelect();
			$(document.body).css("cursor", "default");
			if (U.windowMgr.windows[u]) {
				if (r.indexOf("right") > -1) {
					U.windowMgr.windows[u].setWidth(d);
				}
				if (r.indexOf("bottom") > -1) {
					U.windowMgr.windows[u].setHeight(g);
				}
				if (r.indexOf("left") > -1) {
					U.windowMgr.windows[u].setLeft(G);
					U.windowMgr.windows[u].setWidth(d);
				}
				if (r.indexOf("top") > -1) {
					U.windowMgr.windows[u].setTop(e);
					U.windowMgr.windows[u].setHeight(g);
				}
			}
			this.hideCover();
		},
		showCover : function() {
			$("#ddCover").css("z-index", 999);
			$("#ddCover").css("display", "block");
			C = true;
		},
		hideCover : function() {
			$("#ddCover").css("z-index", 0);
			$("#ddCover").css("display", "none");
			C = false;
		},
		position : function(Z, Y) {
			this.setLeft(Z);
			this.setTop(Y);
		},
		setLeft : function(Y) {
			G = Y;
			$("#" + this.domid).css("left", Y + "px");
		},
		setTop : function(Y) {
			e = Y;
			$("#" + this.domid).css("top", Y + "px");
		},
		resize : function(Z, Y) {
			this.setWidth(Z);
			this.setHeight(Y);
		},
		setWidth : function(Y) {
			d = Y;
			$("#" + this.domid).css("width", Y + "px");
		},
		setHeight : function(Y) {
			g = Y;
			$("#" + this.domid).css("height", Y + "px");
		},
		show : function() {
			$("#" + this.domid).css("z-index", "1000");
			$("#" + this.domid).css("display", "block");
		},
		hide : function() {
			this.position(-1000, -1000);
			$("#" + this.domid).css("z-index", "-1000");
			$("#" + this.domid).css("display", "none");
		}
	};
	U.Task = {
		taskid : "taskid",
		init : function() {
			$("div[class=user]", $("#" + this.taskid)[0]).bind("click",
					function(Y) {
						U.Menu.show();
						return false;
					});
		}
	};
	var v = new $.Template(
			'<ul id="menuid_{id}" menuid="{id}" style="display:{display}"></ul>');
	var I = new $.Template(
			'<div id="leafid_{id}" style="display:none" menutype="leaf" menuid="{id}"></div>');
	var J = new $.Template(
			'<div class="title" id="titleid_{id}">{name}</div><ul id="menuid_{id}" menuid="{id}"></ul>');
	var E = new $.Template(
			'<li menutype="{type}" menuid="{id}" level="{level}"><a href="javascript:{action};" title="{title}">{name}</a></li>');
	U.Menu = {
		menuid : "menuid",
		searchid : "menu_search",
		menuitems : "menu_items",
		menucover : "menuCover",
		keepmenu : false,
		data : $.DataMap("{}"),
		init : function() {
			$("#" + this.searchid).bind("focus", function(Y) {
				U.Menu.searchFocus(Y);
			});
			$("#" + this.searchid).bind("blur", function(Y) {
				U.Menu.searchBlur(Y);
			});
			$("#" + this.menuid).bind("mouseover", function(Y) {
				U.Menu.keepmenu = true;
			});
			$("#" + this.menuid).bind("mouseleave", function(Y) {
				U.Menu.keepmenu = false;
			});
			$("#" + this.menuid).bind("click", U.Menu.mouseClick);
		},
		loadMenus : function(Y) {
			Y.each(function(ad, Z) {
				var ag = ad.get("MENU_LEVEL");
				var af = ad.get("PARENT_MENU_ID");
				var ab = ad.get("MENU_ID");
				var aa = ad.get("MENU_URL");
				var ac = (aa && aa != "") ? "link" : "fold";
				if (ag == null || ag == "" || ag == "1") {
					var ae = $("ul[id=menuid_" + af + "]", $("#menu_root")[0]);
					if (ae && ae.length) {
						E.append(ae, {
							"action" : "void(0)",
							"level" : "1",
							"type" : ac,
							"id" : ab,
							"title" : ad.get("MENU_TITLE"),
							"name" : ad.get("MENU_NAME")
						});
					} else {
						v.append("#menu_root", {
							"id" : af,
							"display" : ""
						});
						ae = $("ul[id=menuid_" + af + "]", $("#menu_root")[0]);
						E.append(ae, {
							"action" : "void(0)",
							"level" : "1",
							"type" : ac,
							"id" : ab,
							"title" : ad.get("MENU_TITLE"),
							"name" : ad.get("MENU_NAME")
						});
					}
					ae = null;
				} else {
					if (ag == "2") {
						var ae = $("div[id=leafid_" + af + "]",
								$("#menu_leaf")[0]);
						if (ae && ae.length) {
							J.append(ae, {
								"id" : ab,
								"name" : ad.get("MENU_NAME")
							});
						} else {
							I.append("#menu_leaf", {
								"id" : af
							});
							ae = $("div[id=leafid_" + af + "]",
									$("#menu_leaf")[0]);
							J.append(ae, {
								"id" : ab,
								"name" : ad.get("MENU_NAME")
							});
						}
						ae = null;
					} else {
						var ae = $("ul[id=menuid_" + af + "]",
								$("#menu_leaf")[0]);
						if (ae && ae.length) {
							E.append(ae, {
								"action" : "Desktop.Menu.open(" + ab + ")",
								"level" : "1",
								"type" : ac,
								"id" : ab,
								"title" : ad.get("MENU_TITLE"),
								"name" : ad.get("MENU_NAME")
							});
						}
						ae = null;
					}
				}
				U.Menu.data.put(ab, ad);
				ag = null;
				af = null;
				ab = null;
				aa = null;
				ac = null;
			});
			$("li", $("#menu_root")[0]).bind("click", U.Menu.rootMouseClick);
			$("li", $("#menu_root")[0]).each(function(Z, aa) {
				$(aa).hoverDelay({
					hoverEvent : function() {
						U.Menu.mouseHover(this);
					}
				});
			});
		},
		searchFocus : function(Y) {
			$("#" + U.Menu.searchid).attr("class", "");
			$("#" + U.Menu.searchid).val("");
		},
		searchBlur : function(Y) {
			$("#" + U.Menu.searchid).attr("class", "tip");
			$("#" + U.Menu.searchid).val("搜索菜单");
			if (U.Menu.keepmenu == false) {
				U.Menu.hide();
			}
		},
		show : function() {
			$("#" + this.menuid).css("display", "block");
			$("#" + this.searchid).trigger("focus");
		},
		hide : function() {
			$("#" + this.menuid).attr("class", "m_menu");
			$("#" + this.menuid).css("display", "none");
			U.Menu.keepmenu = false;
		},
		open : function(aa) {
			var Z = U.Menu.data.get(aa);
			if (Z && Z.get("MENU_URL") && Z.get("MENU_URL") != "") {
				var ab = Z.get("MENU_TITLE") && Z.get("MENU_TITLE") != "" ? Z
						.get("MENU_TITLE") : Z.get("MENU_NAME");
				var Y = Z.get("MENU_IMG") && Z.get("MENU_IMG") != "" ? Z
						.get("MENU_IMG") : "desktop/img/ico.png";
				U.windowMgr.add(ab, Y, Z.get("MENU_URL"), Z.get("MENU_ID"));
				ab = null;
				Y = null;
			} else {
				alert("菜单地址不能为空!");
			}
			U.Menu.hide();
		},
		rootMouseClick : function(aa) {
			var Z = $(aa.target.parentNode);
			if (Z && Z.length) {
				var ab = Z.attr("level");
				var Y = Z.attr("menuid");
				if (Z.attr("menutype") == "fold") {
					$("#menuid").attr("class", "m_menu m_menu-unfold");
					$("div[menutype=leaf]", $("#menu_leaf")[0]).each(
							function(ac, ad) {
								if ($(ad).attr("menuid") == Y) {
									$(ad).css("display", "block");
								} else {
									$(ad).css("display", "none");
								}
							});
				}
				$("li[menutype=fold]", $("#menu_root")[0]).each(
						function(ac, ad) {
							if ($(ad).attr("menuid") == Y) {
								$(ad).attr("class", "on");
							} else {
								$(ad).attr("class", "");
							}
						});
			}
			$("#" + U.Menu.searchid).trigger("focus");
		},
		mouseClick : function(Y) {
			$("#" + U.Menu.searchid).trigger("focus");
		},
		mouseHover : function(Z) {
			if (Z && Z.length) {
				var aa = Z.attr("level");
				var Y = Z.attr("menuid");
				if (Z.attr("menutype") == "fold") {
					$("#menuid").attr("class", "m_menu m_menu-unfold");
					$("div[menutype=leaf]", $("#menu_leaf")[0]).each(
							function(ab, ac) {
								if ($(ac).attr("menuid") == Y) {
									$(ac).css("display", "block");
								} else {
									$(ac).css("display", "none");
								}
							});
				}
				$("li[menutype=fold]", $("#menu_root")[0]).each(
						function(ab, ac) {
							if ($(ac).attr("menuid") == Y) {
								$(ac).attr("class", "on");
							} else {
								$(ac).attr("class", "");
							}
						});
			}
			$("#" + U.Menu.searchid).trigger("focus");
		}
	};
	function t() {
		S = $(document.body).width();
		o = $(document.body).height();
	}
	function f() {
		var Y = S, Z = o;
		t();
		if (Y == S && Z == o) {
			return;
		}
		U.shortcutMgr.rePosition();
		U.widgetMgr.reSizeBar();
	}
	$(window).bind("resize", f);
	$(function() {
		if ($.browser.msie && $.browser.version == "6.0") {
			$.loadCssFile($.combinePath(M + "css/css-ie6.css"), "desktop_css");
		} else {
			$.loadCssFile($.combinePath(M + "css/css.css"), "desktop_css");
		}
		$(window).bind("load", function() {
			t();
			U.DD.proxy.init();
			U.DD.proxy.hide();
			U.Task.init();
			U.Menu.init();
		});
	});
	window.Desktop = U;
	window["Wade_isStopResizeHeight"] = true;
})();