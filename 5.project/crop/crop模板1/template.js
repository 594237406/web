var Util={
	//计算广告字体
	adjustFontSize : function(rowWidth) {
		var fontsize = 14;
		if (rowWidth < 115) {		//如果行宽小于115，字体设成12
			fontsize = 12;
		}
		return fontsize;
	},
	
	//设置鼠标悬浮
	setHover : function(node) {
		var className = node.className || '';
		if (className.indexOf('picItem') !== -1) {
			node.className = 'picItem hoverPic';
			node.lastChild.style.fontWeight = "bold";
		} else {
			node.className = node.className + ' hover_link';
			try {
				if (node.firstChild.getAttribute('data-index') <= 3) {
					node.firstChild.style.color = '#fff';
				}
			} catch (e) {

			}
		}
	},
	
	//添加样式
	addClass : function(cssString) {
		var doc = document;
		var style = doc.createElement("style");
		style.setAttribute("type", "text/css");

		if (style.styleSheet) {
			style.styleSheet.cssText = cssString;		//设置样式文字
		} else {
			var cssText = doc.createTextNode(cssString);
			style.appendChild(cssText);
		}

		var heads = doc.getElementsByTagName("head");
		if (heads.length)
			heads[0].appendChild(style);
		else
			doc.documentElement.appendChild(style);
	}
}


var thisPage = {
	picArray : [],													//图片数组
	
	//初始化方法
	init : function() {
		this.ad = ads;												//广告数据源
		this.wordnum = config.txt_row * config.txt_column;			//文字广告个数
		this.picnum = config.image_column * config.image_row;		//图片广告个数
		this.h = config.rsi1 - 4;									//广告content高
		this.w = config.rsi0 - 2;									//广告content宽
		this.lunboRankOpen = false;									//是否自动播放广告
		this.lunboIndex = 0;										//播放广告索引
		this.lunboTime = 2000;										//轮播间隔
		//文字广告宽度=(总宽-图片宽度*图片列)/文字列
		this.wordWidth = (this.w - config.image_width * config.image_column) / config.txt_column;
				
		this.setAds();												//设置广告数据源
		
		//设置容器宽高、定位
		var container = document.getElementById('container');
		container.style.width = config.rsi0 + 'px';
		container.style.height = config.rsi1 + 'px';
		container.style.position = 'relative';
		
		
		if (config.type == 2) {										//如果为1展示款广告
			this.renderWidthAd();	// 展示窄广告
		}

	},
	
	//设置广告数据源
	setAds : function() {
		var totalAds = this.wordnum + this.picnum;
		if (ads.length < totalAds) {			//如果广告个数少于要显示的个数，则循环拼接广告
			var len = Math.ceil(totalAds / ads.length);
			for ( var i = 0; i < len; i++) {
				ads = ads.concat(ads);
			}
		}
	},
	
	renderWidthAd : function() {
		//获得图片广告宽高
		var picHeight = config.image_height, 			//图片广告高度
			picWidth = config.image_width, 				//图片广告宽度
			
			marginVertical = Math.max(5, (this.h - picHeight * config.image_row)/ (config.image_row + 3));
			wordWidth = (this.w - picWidth* config.image_column)/ config.txt_column, 	//文字广告宽度
			container = document.getElementById('container'), 							//容器
			wrapper = document.createElement('div'), 									//wrap部分，位于container之内
			len = Math.max(config.image_column,config.txt_column), 
			wordTimer = 1;
		
			//图片广告高度=总高度-间隙*(广告个数+（广告上下间隙+广告中间间隙）=3)/图片广告个数
			picHeight = (this.h - marginVertical * (config.image_row + 3))/ config.image_row;
			
		var picDivHeight = picHeight;

		//如果是短木板，则一列展示。
		if (config.ad_block_height <= 100) {
			picDivHeight = picHeight = this.h;
			marginVertical = 0;
		}

		//计算文字广告高度
		var wordHeight = (this.h - marginVertical * 4) / config.txt_row;
		
		
		//重新计算图片高度、文字高度，间隙
		if (config.image_row == 1 || config.image_row == 2) {
			var picWordH = Math.max(20, Math.min(wordHeight, 24));
			if (marginVertical * 4 > picWordH * config.image_row) {
				picDivHeight = picHeight + picWordH;
				marginVertical = Math.max(0, (this.h - picDivHeight
						* config.image_row)
						/ (config.image_row + 3));
			}
		}
		
		
		wrapper.className = 'wrapper';
		
		
		//创建图片元素
		for ( var i = 0; i < len; i++) {
			if (config.image_column > i) {
				var fl = document.createElement('div');
				fl.className = 'fl';
				fl.style.width = picWidth + 'px';
				for ( var m = i * config.image_row; m < (i + 1)* config.image_row; m++) {
					var picItem = document.createElement('div');
					picItem.className = 'picItem';
					picItem.style.height = (picDivHeight - 2) + 'px';
					if (m == i * config.image_row) {
						picItem.style.marginTop = marginVertical * 2 + 'px';
					}
					var str = [
							'<div class="mask"></div>',			//这招
							'<a href="' + ads[i].curl+ '" target="_blank" id="image_item_' + i+ '_' + m + '"><img src="',ads[m].image_url,
							'" width="',picWidth - 4,'" height="',picHeight - 4,'" style="margin:1px;" /></a>','<a id="image_txt_' + i+ 
							'"  class="title" target="_blank" href="'+ ads[m].curl + '">', ads[m].title, '</a>' ].join('');
					picItem.innerHTML = str;
					if (this.picArray.length < 3) {
						this.picArray.push(picItem);
					}
					fl.appendChild(picItem);
				}
				wrapper.appendChild(fl);
			}

			//创建文字广告
			if (config.txt_column > i) {
				var fla = document.createElement('div');
				fla.className = 'fl';
				fla.style.width = wordWidth + 'px';
				for ( var n = this.picnum + i * config.txt_row; n < (this.picnum + (i + 1)
						* config.txt_row); n++) {

					var wordItem = document.createElement('a');
					var title = ads[n].title;
					wordItem.className = 'linkItem';
					wordItem.id = 'word_link_' + i + '_' + n;
					if (n == this.picnum + i * config.txt_row) {
						wordItem.style.marginTop = marginVertical * 2 + 'px';
					}
					if ((n - i * config.txt_row - this.picnum) % 2 == 0) {
						wordItem.className = 'linkItem odd';
					}
					wordItem.target = '_blank';
					wordItem.href = ads[n].curl;

					if (wordWidth >= 140) {
						var color = wordTimer <= 3 ? 'style="color:red;"' : '';
						title = '<span class="w-index" '
								+ color
								+ ' data-index="'
								+ wordTimer
								+ '">'
								+ (wordTimer < 10 ? ('0' + wordTimer)
										: wordTimer) + '</span>' + title
								+ '<i class="hover_arrow">></i>';
					}

					wordItem.innerHTML = title;
					wordTimer++;
					fla.appendChild(wordItem);
					wrapper.appendChild(fla);

				}
			}
		}
		container.appendChild(wrapper);
		this.dynamicClassB();		//创建样式表
		this.initEvents();
		this.autoPlay();
	},
	
	
	
	dynamicClassB : function() {
		var picHeight = config.image_height, picWidth = config.image_width, marginVertical = Math
				.max(5, (this.h - picHeight * config.image_row)
						/ (config.image_row + 3));
		picHeight = (this.h - marginVertical * (config.image_row + 3))
				/ config.image_row;
		var picDivHeight = picHeight;

		if (config.ad_block_height <= 100) {
			picDivHeight = picHeight = this.h;
			marginVertical = 0;
		}

		var wordHeight = (this.h - marginVertical * 4) / config.txt_row, wordWidth = (this.w - picWidth	* config.image_column)
				/ config.txt_column, font = Util.adjustFontSize(wordWidth), picWordH = Math
				.max(20, Math.min(wordHeight, 24)), padding = (wordWidth - font * 7) / 2;
		if (wordWidth >= 140) {
			padding = (wordWidth - font * 9 - 5) / 2;
		}

		if (config.image_row == 1 || config.image_row == 2) {
			if (marginVertical * 4 > picWordH * config.image_row) {
				picDivHeight = picHeight + picWordH;
				marginVertical = Math.max(0, (this.h - picDivHeight
						* config.image_row)
						/ (config.image_row + 3));
				wordHeight = (this.h - marginVertical * 4) / config.txt_row;
			}

		}

		var cssText = [
				'.wrapper { background:#f4f4f4; width:'
						+ this.w
						+ 'px;border:1px solid #999;border-top:3px solid #FFFEDE;height:'
						+ this.h + 'px;}',
				'.wrapper .linkItem { position:relative; color: #000; text-decoration: none; display: block; height: '
						+ wordHeight
						+ 'px; line-height: '
						+ wordHeight
						+ 'px; font-size: '
						+ font
						+ 'px; text-align: left; padding-left: '
						+ padding
						+ 'px; background: #f4f4f4; }',
				// '.wrapper .linkItem i { display: none; }',
				'.wrapper .hover_link .hover_arrow { display:inline-block; zoom:1; color:#fff;}',
				'.wrapper .hoverPic img{ transform: scale(1.1);transition: transform 0.5s ease-in 0s;}',
				// '.wrapper .hover_link {background:#FC4449;color:#fff;}',
				'.wrapper .hover_link .w-index{color:#fff}',
				'.wrapper .linkItem:hover { background:#CF493B;color:#fff;}',
				'.wrapper .picItem {border:1px solid #999;overflow:hidden; text-align: center; display: block; position: relative;width:',
				(picWidth - 2),
				'px;height:',
				(picHeight - 2),
				'px;margin:',
				marginVertical,
				'px 0; }',
				'.wrapper .hoverPic{border:1px solid #E4C8AA;}',
				'.wrapper .odd { background: #fff; }',
				'.wrapper .fl { float: left; }',
				'.wrapper .hover_arrow {display:none;margin-left:3px;font-weight:b?old;width:'
						+ font + 'px;height:' + wordHeight + 'px;}',
				'.wrapper .picItem .mask { height: '
						+ picWordH
						+ 'px; background: #fff; bottom: 0; position: absolute; z-index: 4; width: 100%; }',
				'.wrapper .picItem .mask:hover {}',
				'.wrapper .w-index{font-style:italic;color:#aaa;display:inline-block;zoom:1;width:'
						+ (font + 3)
						+ 'px;text-align:center;margin-right:4px;}',
				'.wrapper .picItem .title { text-decoration:none;left:0;height: '
						+ picWordH
						+ 'px; line-height: '
						+ picWordH
						+ 'px; color: #000; bottom: 0; position: absolute; z-index: 10; width: 100%; text-align: center;font-size:'
						+ font + 'px }' ].join('');

		Util.addClass(cssText);
	},
	
	//下一动画
	nextLuwords : function() {
		var sortIndex = this.lunboIndex;
		var item = this.picArray[sortIndex];

		this.setNormal(item);
		if (this.lunboIndex >= this.picArray.length
				|| this.lunboIndex == this.picArray.length - 1) {
			this.lunboIndex = 0;
		} else {
			this.lunboIndex = this.lunboIndex + 1;
		}
		sortIndex = this.lunboIndex;
		item = this.picArray[sortIndex];

		if (this.picArray.length == 1) {
			this.lunboTimer = setTimeout(function() {
				thisPage.autoPlay();
			}, thisPage.lunboTime);
		} else {
			Util.setHover(item);
			this.autoPlay();
		}
	},


	setNormal : function(node) {
		var className = node.className || '';
		if (className.indexOf('picItem') !== -1) {		//如果是图片广告
			node.className = node.className = 'picItem';
			node.lastChild.style.fontWeight = "normal";
			node.firstChild.style.backgroundColor = '#fff';
		} else {
			node.className = node.className.replace(' hover_link', '');
			try {
				if (node.firstChild.getAttribute('data-index') <= 3) {
					node.firstChild.style.color = 'red';
				}
			} catch (e) {

			}
		}
	},
	
	//设置自动播放
	autoPlay : function() {
		if (!this.lunboRankOpen) {
			return;
		}
		if (this.picArray.length == 0) {
			return;
		}
		This = this;
		var sortIndex = this.lunboIndex;
		var item = this.picArray[sortIndex];
		Util.setHover(item);
		this.lunboTimer = setTimeout(function() {
			This.nextLuwords();
		}, This.lunboTime);
	},

	//初始化事件
	initEvents : function() {
		var container = document.getElementById("container");
		container.onmouseover = function(e) {
			clearInterval(thisPage.lunboTimer);
			if (thisPage.picArray.length > 0) {
				var sortIndex = thisPage.lunboIndex;
				var item = thisPage.picArray[sortIndex];
				thisPage.setNormal(item);
			}

			e = e || window.event;
			var target = e.target || e.srcElement;
			var crt = target;
			while (crt && crt.parentNode) {
				var className = crt.className || '';
				if (className.indexOf('linkItem') !== -1
						|| className.indexOf('picItem') !== -1) {
					break;
				}
				crt = crt.parentNode;
			}
			if (!crt
					|| !crt.className
					|| (crt.className.indexOf('link') === -1 && crt.className
							.indexOf('picItem') === -1)) {

				return;
			}
			Util.setHover(crt);
		};
		container.onmouseout = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			var crt = target;
			while (crt && crt.parentNode) {
				var className = crt.className || '';
				if (className.indexOf('linkItem') !== -1
						|| className.indexOf('picItem') !== -1) {
					break;
				}
				crt = crt.parentNode;
			}
			if (!crt
					|| !crt.className
					|| (crt.className.indexOf('linkItem') === -1 && crt.className
							.indexOf('picItem') === -1)) {
				thisPage.autoPlay();
				return;
			}
			thisPage.setNormal(crt);
			thisPage.autoPlay();
		}
	}
};

thisPage.init();


