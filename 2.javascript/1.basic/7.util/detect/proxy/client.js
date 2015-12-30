var client = (function() {
	//引擎
	var engine = {
		// 呈现引擎
		ie : 0,
		gecko : 0,
		webkit : 0,
		khtml : 0,
		opera : 0,
		// 版本号
		ver : null
	};
	
	//浏览器
	var browser = {
		// 主要浏览器
		ie : 0,
		firefox : 0,
		safari : 0,
		konq : 0,
		opera : 0,
		chrome : 0,
		// 具体版本号
		ver : null
	};
	
	//系统
	var system = {
		// 平台、设备和移动平台
		win : false,
		mac : false,
		xll : false,

		iphone : false,
		ipad : false,
		ipod : false,
		ios : false,
		android : false,
		nokiaN : false,
		winMobile : false,

		wii : false,
		ps : false
	};

	var ua = navigator.userAgent;
	console.log(ua);
	if ( window.opera ){
	    engine.ver = window.opera.version();
	    engine.opera = parseFloat( engine.ver );
	} else if ( /AppleWebKit\/(\S+)/.test(ua)){
	    engine.ver = RegExp["$1"];
	    engine.webkit = parseFloat(engine.ver);

	    //确定是Chrome 还是 Safari
	    if ( /Chrome\/(\S+)/.test(ua)){
	        browser.ver = RegExp["$1"];
	        browser.chrome = parseFloat(browser.ver);
	    } else if ( /Version\/(S+)/.test(ua)){
	        browser.ver = RegExp["$1"];
	        borwser.safari = parseFloat(browser.ver);
	    } else {
	        //近似的确定版本号
	        var safariVersion = 1;

	        if (engine.webkit < 100 ){
	            safariVersion = 1;
	        } else if (engine.webkit < 312){
	            safariVersoin = 1.2;
	        } else if (engine.webkit < 412){
	            safariVersion = 1.3;
	        } else {
	            safariVersion = 2;
	        }

	        browser.safari = browser.ver = safariVersion;
	    }

	} else if ( /KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
	    engine.ver = RegExp["$1"];
	    engine.khtml = parseFloat(engine.ver);
	} else if ( /rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
	    engine.ver = RegExp["$1"];
	    engine.gecko = parseFloat(engine.ver);

	    //确定不是Firefox
	    if( /Firefox\/(\S+)/.test(ua)){
	        browser.ver = RegExp["$1"];
	        browser.firefox = parseFloat(browser.ver);
	    }

	} else if (/MSIE ([^;]+)/.test(ua)){
	    engine.ver = browser.ver = RegExp["$1"];
	    engine.ie = browser.ie = parseFloat(engine.ver);
	}
	
	// 检测浏览器
	browser.ie = engine.ie;
	browser.opera = engine.opera;

	// 检测平台
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.xll = (p == "xll" || (p.indexOf("Linux") == 0));

	// 检测windows操作系统
	if (system.win) {
		if (/Win(?:dows)?\s?([^do]{2})\s?(\d+\.\d+)?/.exec(ua)) {
			if (RegExp["$1"] == "NT") {
				switch (RegExp["$2"]) {
				case "5.0":
					system.win = "Win2000";
					break;
				case "5.1":
					system.win = "WinXP";
					break;
				case "6.0":
					system.win = "WinVista";
					break;
				case "6.1":
					system.win = "Win7";
					break;
				default:
					system.win = "WinNT";
					break;
				}
			} else if (RegExp["$1"]=='9x') {
				system.win = "WinME";
			} else {
				system.win = RegExp["$1"];
			}
		}
	}
	// 移动设备
	system.iphone = ua.indexOf("iPhone") > -1;
	system.ipod = ua.indexOf("iPod") > -1;
	system.ipad = ua.indexOf("iPad") > -1;
	system.nokiaN = ua.indexOf("NokiaN") > -1;

	// windows mobile
	if (system.win == "CE") {
		system.winMobile = system.win;
	} else if (system.win == "Ph") {
		if (/Window Phone OS (\d+.\d+)/.test(ua)) {
			system.win = "Phone";
			system.winMobile = parseFloat(RegExp["$1"]);
		}
	}
	// 检测IOS版本
	if (system.mac && ua.indexOf("Mobile") > -1) {
		if (/CPU (?:iPhone)?OS (\d+_\d+)/.test(ua)) {
			system.ios = parseFloat(RegExp.$1.replace("_", "."));
		} else {
			system.ios = 2;
		}
	}

	// 检测Android版本
	if (/Android (\d+\.\d+)/.test(ua)) {
		system.android = parsefloat(RegExp["$1"]);
	}

	// 游戏系统
	system.wii = ua.indexOf("Wii") > -1;
	system.ps = /playstation/i.test(ua);
	// 返回这些对象
	return {
		engine : engine,
		browser : browser,
		system : system
	};
})();

