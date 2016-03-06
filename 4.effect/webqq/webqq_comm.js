//---------------------登录开始------------------
//app域名
var gAppFcgDomainName = "http://appfcg.3366.com";

function chId(id)
{
	return document.getElementById(id);
}

function chName(name)
{
	return document.getElementsByTagName(name);
}
function chGetCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
	{
		return unescape(arr[2]);
	}
	return "";
}
function chSetCookie(name, value)
{
	document.cookie = name + "=" + escape(value) + "; path=/; domain=3366.com";
}
function chDeleteCookie(name)
{
	chSetCookie(name, "");
}
function chGetNick()
{
	var nickname = chGetCookie("mgp_nick");
	if (nickname.length > 0)
	{
		return nickname.substring(1);
	}
	return nickname;
}
// 从cookie获取QQ号
function chGetUin()
{
	var aRet = chGetCookie('uin').match(/\d+/);
	return aRet ? parseInt(aRet[0], 10) : -1;
}
// 根据cookie简单判断是否登录
function chIsLogin()
{
	var uin = chGetUin();
	var skey = chGetCookie('skey');
	if (uin <= 10000 || skey.length != 10)
	{
		return false;
	}
	return true;
}
// 退出登录
function chLogout(jumpurl, topjump)
{
	chDeleteCookie("uin");
	chDeleteCookie("skey");	
	chDeleteCookie("zzpaneluin");
	chDeleteCookie("zzpanelkey");
    chDeleteCookie("dna_result_key");
    chDeleteCookie("PcacheTime");
    chDeleteCookie("mgp_nick");

	if (jumpurl)
	{
		if (topjump)
		{
			top.location = jumpurl;
		}
		else
		{
			location = jumpurl;
		}
	}
}

var g_Quick__Ba_ck_Url__="";
function chNeedLogin(strAlignH, iOffsetH, strAlignV, iOffsetV)
{
	var o = G('flashframe');
	if (o)
	{
		o.style.visibility = "hidden";
	}
	
	var strURL = top.location;
	if (g_Quick__Ba_ck_Url__ == "")
	{
	    g_Quick__Ba_ck_Url__ = top.location;
	}
	g_Quick__Ba_ck_Url__=top.location;
	var str = '<iframe id="login_iframe" allowTransparency="true" marginwidth="0" marginheight="0" hspace="0"' +
	          ' vspace="0" frameborder="0" scrolling="no" style="border:none;width:373px;height:284px" ' +
	  		  'src="http://ui.ptlogin2.3366.com/cgi-bin/login?appid=21001601&f_url=loginerroralert&s_url='+escape(strURL)+
	  		  '&qlogin_param=' + escape("u1="+escape(g_Quick__Ba_ck_Url__))
	  		  + '"></iframe>';
	chShowDialog("login_div", str, 373, 284, strAlignH, iOffsetH, strAlignV, iOffsetV);
	chShowDialogDiv("login_div");
}

function chNeedLogin2(strAlignH, iOffsetH, strAlignV, iOffsetV)
{
	var o = G('flashframe');
	if (o)
	{
		o.style.visibility = "hidden";
	}
	
	var strURL = "http://www.3366.com/other/logindir.html";
	g_Quick__Ba_ck_Url__=strURL;
	var str = '<iframe id="login_iframe" allowTransparency="true" marginwidth="0" marginheight="0" hspace="0"' +
	          ' vspace="0" frameborder="0" scrolling="no" style="border:none;width:373px;height:284px" ' +
	  		  'src="http://ui.ptlogin2.3366.com/cgi-bin/login?appid=21001601&f_url=loginerroralert&s_url='+escape(strURL)+
	  		  '&target=self&link_target=blank&qlogin_param=' + escape("u1="+escape(g_Quick__Ba_ck_Url__))
	  		  + '"></iframe>';
	chShowDialog("login_div", str, 373, 284, strAlignH, iOffsetH, strAlignV, iOffsetV);
	chShowDialogDiv("login_div");
}

// 登录框要求页面实现这个函数
function ptlogin2_onResize(iWidth, iHeight)
{
	// 获得浮动Div对象
	var objDiv = chId("login_div");
	var objFrame = chId("login_iframe");
	if (objDiv && objFrame)
	{
		//重新设置大小注意，一定要加px，否则firefox下有问题
		objDiv.style.width = iWidth + "px";
		objDiv.style.height = iHeight + "px";

		objFrame.style.width = iWidth + "px";
		objFrame.style.height = iHeight + "px";	
	}
	chShowDialogDiv("login_div");
}

// 登录框要求页面实现这个函数
function ptlogin2_onLogin()
{
//	chHideDialog("login_div");
	return true;
}

// 登录框要求页面实现这个函数
function ptlogin2_onClose()
{
	chHideDialog("login_div");
	var o = G('flashframe');
	if (o)
	{
		o.style.visibility = "visible";
	}
}

// 显示对话框层
function chShowDialogDiv(strID)
{
	var objDialog = chId(strID);
	if (objDialog)
	{
		objDialog.style.display = "block";
		objDialog.style.visibility = "visible";
	}
}

// 隐藏对话框层
function chHideDialogDiv(strID)
{
	var objDialog = chId(strID);
	if (objDialog)
	{
		objDialog.style.display = "none";
	}
}

// 显示对话框
function chShowDialog(strID, strHtmlData, iWidth, iHeight, strAlignH, iOffsetH, strAlignV, iOffsetV)
{
	strAlignH = strAlignH || "center";
	strAlignV = strAlignV || "center";
	iWidth = iWidth || 0;
	iHeight = iHeight || 0;
	iOffsetH = iOffsetH || 0;
	iOffsetV = iOffsetV || 0;
	
	// 计算偏移量
	var objSizeInfo = new chWindowSizeInfo();
	var iOffsetTop = 0;
	var iOffsetLeft = 0;
	if (strAlignH == "center")
	{
		iOffsetLeft = objSizeInfo.scrollLeft + (objSizeInfo.clientWidth - iWidth) / 2 + iOffsetH;
	}
	else if (alignH == "right")
	{
		iOffsetLeft = objSizeInfo.scrollLeft + (objSizeInfo.clientWidth - iWidth) + iOffsetH - 23;
	}
	else
	{
		iOffsetLeft = objSizeInfo.scrollLeft + iOffsetH;
	}
	
	if (strAlignV == "center")
	{
		iOffsetTop = objSizeInfo.scrollTop + (objSizeInfo.clientHeight - iHeight) / 2 + iOffsetV;
	}
	else if (strAlignV == "bottom")
	{
		iOffsetTop = objSizeInfo.scrollTop + (objSizeInfo.clientHeight - iHeight) + iOffsetV - 33;
	}
	else
	{
		iOffsetTop = objSizeInfo.scrollTop + iOffsetV;
	}
	
	// 显示覆盖层
	chShowCoverDiv(objSizeInfo.scrollWidth, objSizeInfo.scrollHeight);
	
	// 显示对话框层
	chCreateDialogDiv(strID, strHtmlData, iOffsetTop, iOffsetLeft, iWidth, iHeight);
}

// 关闭对话框
function chHideDialog(strID)
{
	chHideDialogDiv(strID);
	chHideCoverDiv();
}

// 获取浏览器的窗口尺寸信息
function chWindowSizeInfo(aobjDoc)
{
    var objDoc = aobjDoc || document;
    var obj = (objDoc.compatMode == "CSS1Compat" ? objDoc.documentElement : objDoc.body);
    this.clientWidth = obj.clientWidth;
    this.clientHeight = obj.clientHeight;
    this.scrollLeft = obj.scrollLeft;
    this.scrollTop = obj.scrollTop;
    this.scrollWidth = obj.scrollWidth;
    this.scrollHeight = obj.scrollHeight;
}

// 显示覆盖层
function chShowCoverDiv(iOffsetLeft, iHeight)
{
	var objCover = chId("chCoverDiv");
	if (!objCover)
	{
		objCover = document.createElement("div");
    	objCover.id = "chCoverDiv";
		document.body.appendChild(objCover);
	}

	var objStyle = objCover.style;
	objStyle.display = "block";
	objStyle.margin = "0px";
	objStyle.padding = "0px";
	objStyle.top = "0px";
	objStyle.left = "0px";
	objStyle.width = iOffsetLeft + "px";
	objStyle.height = iHeight + "px";
	objStyle.position = "absolute";
	objStyle.zIndex = "2000";
	objStyle.background = "#000000";
	objStyle.filter = "alpha(opacity=40)";
	objStyle.opacity = 40/100;
	objStyle.MozOpacity = 40/100;
	
	var allselect = chName("select");
	for (var i=0; i<allselect.length; ++i)
	{
		allselect[i].style.visibility = "hidden";
	}
}

// 隐藏覆盖层
function chHideCoverDiv()
{
	var objCover = chId("chCoverDiv");
	if (objCover)
	{
		objCover.style.display = "none";
	}
	var allselect = chName("select");
	for (var i=0; i<allselect.length; ++i)
	{
		allselect[i].style.visibility = "visible";
	}
}
// 创建对话框层
// 因为可能需要调整兑换框的大小，所以先设为不可见
function chCreateDialogDiv(strID, strHtmlData, iOffsetTop, iOffsetLeft, iWidth, iHeight)
{
	var objDialog = chId(strID);
	if (!objDialog)
	{
		objDialog = document.createElement("div");
    	objDialog.id = strID;
		document.body.appendChild(objDialog);
	}

	var objStyle = objDialog.style;
	objStyle.display = "block";
	objStyle.margin = "0px";
	objStyle.padding = "0px";
	objStyle.top = iOffsetTop + "px";
	objStyle.left = iOffsetLeft + "px";
	objStyle.width = iWidth + "px";
	objStyle.height = iHeight + "px";
	objStyle.position = "absolute";
	objStyle.zIndex = "2001";
	objStyle.background = "#FFFFFF";
	objStyle.border = "solid #00D2FF 1px";
	objStyle.visibility = "hidden";	// 因为可能需要调整兑换框的大小，所以先设为不可见
	objDialog.innerHTML = strHtmlData;
}

function getGamePic(gameid, size, isRound)
{
	if(typeof isRound === 'undefined'){
		isRound = true;
	}
	var serverId = gameid % 5 === 0 ? '' : gameid % 5;
	return 'http://img' + serverId + '.3366img.com/fileupload/img/' + gameid % 100 + '/' + gameid + '_' + size + (isRound ? '_round' : '') + '.jpg';
}

/////////////////////////////////////////////////

function getFlashObj(objId)
{
	var strId = objId || "connFlash";
    var flashObj;
	if(window.navigator.userAgent.toLowerCase().indexOf('msie') != -1)
	{
		flashObj = window[strId];
	}
	else
	{
		flashObj = document[strId];
	}
	return flashObj;
}

var FlashCmdConst = {};
FlashCmdConst.PlayGame = 1;
FlashCmdConst.SetFrameHeight = 2;
FlashCmdConst.CloseGameDiv = 3;
FlashCmdConst.ShowLoginDiv = 4;
var gMyPkFeedReqRandom = Math.random();

//参数：{"gameId":103,"gameMode":1,"feedId":0,"friendUin":6017481}
function playGame(gid)
{
	//getFlashObj().jsCallOpenGame(gid);
	/*
	alert("beign playGame, gid: " + gid);
	var paraJson = {};
	paraJson.gameId = gid;
	paraJson.gameMode = 1;
	paraJson.feedId = 0;
	paraJson.friendUin = 0;
	getFlashObj().jsCallFlash(FlashCmdConst.PlayGame, paraJson);
	*/
	G('hidden_frame_proxy').src=["http://mgp.qq.com/webqqcontainer/mgpproxy.html?cmd=1&gameId=", 
		gid, 
		"&gameMode=1&feedId=0&friendUin=0&r=",
		Math.random()].join('');
}

function setQzFrameHeight()
{
	/*	
	var paraJson = {};
	paraJson.h = h;
	getFlashObj().jsCallFlash(FlashCmdConst.SetFrameHeight, paraJson);	
	*/
	var frameHeight = Math.min(document.documentElement.scrollHeight, document.body.scrollHeight);
	if (frameHeight <= 800)
	{
		frameHeight = 800;
	}
	G('hidden_frame_proxy').src=["http://mgp.qq.com/webqqcontainer/mgpproxy.html?cmd=2&h=", 
		frameHeight, 
		"&r=",
		Math.random()].join('');		
}

function showLogin()
{
	G('hidden_frame_proxy').src = "http://mgp.qq.com/webqqcontainer/mgpproxy.html?cmd=4&r=" + Math.random();	
}

function pkGame(gid, pkMode, feedId, friUin, btnObj)
{
	
	gMyPkFeedReqRandom = Math.random();
	//getFlashObj().jsCallOpenGame(gid);
	/*
	alert("begin pkGame, gid: " + gid + ', pkMode: ' + pkMode + ', feedId: ' + feedId + ', friUin: ' + friUin);
	var paraJson = {};
	paraJson.gameId = gid;
	paraJson.gameMode = pkMode;
	paraJson.feedId = feedId;
	paraJson.friendUin = friUin;
	getFlashObj().jsCallFlash(FlashCmdConst.PlayGame, paraJson);
	*/
	G('hidden_frame_proxy').src=["http://mgp.qq.com/webqqcontainer/mgpproxy.html?cmd=1&gameId=", 
		gid, 
		"&gameMode=", pkMode, "&feedId=", feedId, "&friendUin=", friUin, "&r=",
		Math.random()].join('');
	
	if (btnObj)
	{
		btnObj.disabled = "true";
	}
}

function G(id){return document.getElementById(id);}
var browser =
{
	ie:/msie/.test(window.navigator.userAgent.toLowerCase()),
	ie6:((/msie/.test(window.navigator.userAgent.toLowerCase()))&&!window.XMLHttpRequest&&window.ActiveXObject),
	ie7:((/msie/.test(window.navigator.userAgent.toLowerCase()))&&window.XMLHttpRequest),
	moz:/gecko/.test(window.navigator.userAgent.toLowerCase()),
	opera:/opera/.test(window.navigator.userAgent.toLowerCase()),
	safari:/safari/.test(window.navigator.userAgent.toLowerCase())	
};

function mgpJsLoad(sUrl, succFn, failFn)
{
	if(sUrl.indexOf('?') >= 0)
	{
		sUrl += "&sCSRFToken=" + getCSRFToken();
	}
	else
	{
		sUrl += "?sCSRFToken=" + getCSRFToken();
	}
	var h=document.getElementsByTagName('HEAD').item(0);
	var jsObj=document.createElement('script');
	jsObj.setAttribute('type','text/javascript');
	jsObj.onerror=function()
	{
		if(failFn && (typeof(failFn) == "function"))
       		failFn();
    }
    if (browser.ie)
    {
    	jsObj.onreadystatechange=function()
        {
           	if(this.readyState.toLowerCase()!="complete"&&this.readyState.toLowerCase()!="loaded")
           		return;
           	if(this.$funExeced!=true&&'function'==typeof(succFn))
           	{
               	this.$funExeced=true;
               	h.removeChild(jsObj);
               	succFn();
           	}
        }
    }
    else if(browser.opera)
    {
      	//if('function'==typeof(succFn))   succFn();
    }
    else
    {    	jsObj.onload=function()
        {
           	if('function'==typeof(succFn))
           	{
           		succFn();
           		h.removeChild(jsObj);
           	}
        }
    }
    jsObj.setAttribute('src',sUrl);
    h.appendChild(jsObj);
    if(browser.opera && 'function'==typeof(succFn))
    {
    	succFn();
    	h.removeChild(jsObj);
    }	
}

function getShowTime(t)
{
	var d = new Date();
	var nSec = d.getTime() / 1000;
	var temp = nSec - t;
	var str = '';
	if (temp < 60)
	{
		str = '1分钟前';
	}
	else if (temp < 3600)
	{
		str = Math.floor(temp / 60) + '分钟前'; 
	}
	else if (temp < 86400)
	{
		str = Math.floor(temp / 3600) + '小时前'; 
	}
	else
	{
		str = Math.floor(temp / 86400) + '天前'; 
	}
	
	return str;
}

function reqFriendRecent(iPage, relation, isIndexPage)
{
	var isIndex = isIndexPage || 0;
	mgpJsLoad([gAppFcgDomainName + '/fcg-bin/webqq/webqq_cgi_get_friend_recent?pageid=',iPage,'&uin=', chGetUin(), '&pagecnt=30&relationship=',relation].join(''),
		function()	
		{
			if (typeof(gFriendRecent) == "undefined" || gFriendRecent['result'] != 0)
			{
				if (isIndex == 1)
				{
					$('#loadingFriFeed').hide();
					$('#noFriFeedDiv').text('对不起，拉取好友战况失败！');
					$('#noFriFeedDiv').show();
				}
				else
				{
					$('#noFriFeedDiv').text('对不起，拉取好友战况失败！');
					$('#noFriFeedDiv').show();
				}
				
				if (gFriendRecent['result'] == 1000005 || gFriendRecent['result'] == 10002)
				{
					showLogin();
				}
				
				return;
			}
			if (isIndex == 1)
			{
				initIndexFriendRecent(gFriendRecent);
			}
			else
			{
				initFriendRecent(gFriendRecent, iPage, relation);
			}
			setQzFrameHeight();
		});
}



function initIndexFriendRecent(aryFriRecent)
{
	$('#loadingFriFeed').hide();
	if (aryFriRecent.length < 1)
	{
		$('#noFriFeedDiv').show();
		return;
	}
	var tempCount = 0;
	for (var i = 0; i < aryFriRecent['challengeList'].length && tempCount < 3; ++i)
	{
		var tempObj = aryFriRecent['challengeList'][i];
		if (typeof(qzScoreGameList[tempObj['gameId']]) == 'undefined')
		{
			continue;
		}
		tempCount++;
		
		var imgSrc = getGamePic(tempObj['gameId'], 80, false);
		//var imgSrc = 'http://img.3366img.com/fileupload/img/' + (tempObj['gameId']%100) + '/' + tempObj['gameId'] + '_80.jpg';
		var domObj = $('#friendsChallengeList li:first').clone();
		domObj.find('.c_img').attr('alt', qzScoreGameList[tempObj['gameId']]['name']).end()
			.find('.c_img').attr('src', imgSrc).end()
			.find('.c_play').attr('rel', tempObj['gameId']).end()
			.find('.c_game').text(qzScoreGameList[tempObj['gameId']]['name']).end()
			.find('.c_game').attr('rel', tempObj['gameId']).end()
			.find('.c_nick').text(tempObj['nick']).end()
			.find('.c_score').html('<span class="date">' + getShowTime(tempObj['time']) + '</span>' + tempObj['maxHistoryScore'] + '分').end()
			.find('.c_pk').html('<button onclick="pkGame(' + tempObj['gameId'] + ', 2, 0, ' + tempObj['uin'] + ');" class="bt_tx4">挑 战</button>');
		/*if (tempObj['yellowVIP'] > 0)
		{
			domObj.find('.c_nick').after('<a href="http://user.qzone.qq.com/' + tempObj['uin'] + '/yellowgrade/" target="_blank"><img class="icon_vip_yl' + tempObj['yellowVIP'] + '" alt="黄钻贵族" src="http://img.3366img.com/fileupload/qzone/b.gif" /></a>');
		}*/
		
		//注册事件
		domObj.find('.c_play').click(function(){playGame($(this).attr('rel'));});
		domObj.find('.c_game').click(function(){playGame($(this).attr('rel'));});
		
		domObj.appendTo('#friendsChallengeList ul');
		domObj.show();
	}
	
	if (tempCount == 0)
	{
		$('#noFriFeedDiv').show();
	}
}

function initFriendRecent(aryFriRecent, currentPage, relation)
{
	$('#friendsChallengeList li:gt(0)').remove();
	if (aryFriRecent.length < 1)
	{
		$('#noFriFeedDiv').show();
		return;
	}
	
	var tempCount = 0;
	var filterObj = {};
	for (var i = 0; i < aryFriRecent['challengeList'].length && tempCount < 15; ++i)
	{
		var tempObj = aryFriRecent['challengeList'][i];
		if (typeof(qzScoreGameList[tempObj['gameId']]) == 'undefined')
		{
			continue;
		}
		if (filterObj[''+tempObj['uin']])
		{
			filterObj[''+tempObj['uin']] += 1;
		}
		else
		{
			filterObj[''+tempObj['uin']] = 1;
		}
		
		if (filterObj[''+tempObj['uin']] > 3)
		{
			continue;
		}
		++tempCount;
		
		var imgSrc = getGamePic(tempObj['gameId'], 80, false);
		//var imgSrc = 'http://img.3366img.com/fileupload/img/' + (tempObj['gameId']%100) + '/' + tempObj['gameId'] + '_80.jpg';
		var domObj = $('#friendsChallengeList li:first').clone();
		domObj.find('.c_img').attr('alt', qzScoreGameList[tempObj['gameId']]['name']).end()
			.find('.c_img').attr('src', imgSrc).end()
			.find('.c_play').attr('rel', tempObj['gameId']).end()
			.find('.c_game').text(qzScoreGameList[tempObj['gameId']]['name']).end()
			.find('.c_game').attr('rel', tempObj['gameId']).end()
			.find('.c_nick').text(tempObj['nick']).end()
			.find('.c_score').html('<span class="date">' + getShowTime(tempObj['time']) + '</span>' + tempObj['maxHistoryScore'] + '分').end()
			.find('.c_pk').html('<button onclick="pkGame(' + tempObj['gameId'] + ', 2, 0, ' + tempObj['uin'] + ');" class="bt_tx4">挑 战</button>');
		/*if (tempObj['yellowVIP'] > 0)
		{
			domObj.find('.c_nick').after('<a href="http://user.qzone.qq.com/' + tempObj['uin'] + '/yellowgrade/" target="_blank"><img class="icon_vip_yl' + tempObj['yellowVIP'] + '" alt="黄钻贵族" src="http://img.3366img.com/fileupload/qzone/b.gif" /></a>');
		}*/
		
		//注册事件
		domObj.find('.c_play').click(function(){playGame($(this).attr('rel'));});
		domObj.find('.c_game').click(function(){playGame($(this).attr('rel'));});
		
		domObj.appendTo('#friendsChallengeList');
		domObj.show();
	}
	//initPageList(aryFriRecent['totalNum'], 16, currentPage, relation);
	if (tempCount == 0)
	{
		$('#noFriFeedDiv').show();
	}
	setQzFrameHeight();
}

function initPageList(totalNum, pageCnt, currentPage, relation)
{
	if (totalNum <= pageCnt)
	{
		return;
	}
	var totalPage = Math.ceil(totalNum / pageCnt);
	var aryHtml = new Array();
	if (currentPage <= 1)
	{
		aryHtml.push('<span class="disabled">上一页</span>');
	}
	else
	{
		aryHtml.push('<a class="c_tx" href="javascript:;" onclick="reqFriendRecent(' + (currentPage-1) + ', ' + relation + ');">上一页</a>');
	}
	
	for (var i = 1; i <= totalPage; ++i)
	{
		if (i == currentPage)
		{
			aryHtml.push('<strong class="hit">' + i + '</strong>');
		}
		else
		{
			aryHtml.push('<a class="c_tx" href="javascript:;" onclick="reqFriendRecent(' + i + ', ' + relation + ');">' + i + '</a>');
		}
	}
	
	if (currentPage >= totalPage)
	{
		aryHtml.push('<span class="disabled">下一页</span>');
	}
	else
	{
		aryHtml.push('<a class="c_tx" href="javascript:;" onclick="reqFriendRecent(' + (currentPage+1) + ', ' + relation + ');">下一页</a>');
	}
	G('bottomPage').innerHTML = aryHtml.join('');
}


function reqMyPkFeed(iPage, isIndexPage)
{
	var isIndex = isIndexPage || 0;
	mgpJsLoad([gAppFcgDomainName + '/fcg-bin/webqq/webqq_cgi_get_feeds?pageid=',iPage,'&uin=', chGetUin(), '&pagecnt=16','&r=',gMyPkFeedReqRandom].join(''),
		function()
		{
			if (typeof(gMyFeeds) == "undefined" || gMyFeeds['result'] != 0)
			{
				if (isIndex == 1)
				{
					$('#loadingMyFeed').hide();
					$('#noFeedDiv').text('对不起，拉取我的战况失败！');
					$('#noFeedDiv').show();
					showSafariTips();
				}
				else
				{
					$('#noFeedDiv').text('对不起，拉取我的战况失败！');
					$('#noFeedDiv').show();
				}
				
				if (typeof(gMyFeeds) != "undefined" && (gMyFeeds['result'] == 1000005 || gMyFeeds['result'] == 10002))
				{
					showLogin();
				}
				
				return;
			}
			if (isIndex == 1)
			{
				initIndexMyFeeds(gMyFeeds);
			}
			else
			{
				initMyFeeds(gMyFeeds, iPage);
			}
			setQzFrameHeight();			
		});
}

function relDelFeed(iRowId, page)
{
	$('.delSureSpan').hide();
	$('#delSureSpan'+iRowId).show();
	$('#delSureBtn'+iRowId).click(function()
	{
		gMyPkFeedReqRandom = Math.random();
		G('rowId').value = iRowId;
		G('pageId').value = page || 1;
		G('delForm').submit();
	});
	$('#delCancelBtn'+iRowId).click(function()
	{
		$('#delSureSpan'+iRowId).hide();
	});
}

function feedDelCallback(jsonObj)
{
	//alert(jsonObj['result']);
	gMyPkFeedReqRandom = Math.random();
	if (jsonObj['result'] == 0)
	{
		reqMyPkFeed(jsonObj['pageid']);
	}
}

function initIndexMyFeeds(aryMyFeeds)
{
	$('#myNick').text(aryMyFeeds['userInfo']['nick']);
	$('#headImgId').attr('src', aryMyFeeds['userInfo']['headurl']);
	/*if (parseInt(aryMyFeeds['userInfo']['yvipLevel']) > 0)
	{
		$('#isYellow .vip_link').attr('href', 'http://user.qzone.qq.com/' + aryMyFeeds['uin'] + '/yellowgrade/');
		$('#isYellow img').addClass('icon_vip_yl' + aryMyFeeds['userInfo']['yvipLevel']);
		$('#isYellow').show();
	}*/
		
	$('#challengeNum').text(aryMyFeeds['userInfo']['challengeNum']);
	$('#winNum').text(aryMyFeeds['userInfo']['winNum']);
	$('#fallNum').text(aryMyFeeds['userInfo']['fallNum']);
	$('#loadingMyFeed').hide();
	//G('loadingMyFeed').style.display = 'none';
	
	if (aryMyFeeds['challenge_list'].length < 1)
	{
		//G('noFeedDiv').style.display = 'block';
		$('#noFeedDiv').show();
		return;
	}
	var tempCount = 0;
	for (var i = 0; i < aryMyFeeds['challenge_list'].length && tempCount < 6; ++i)
	{
		var tempObj = aryMyFeeds['challenge_list'][i];
		if (typeof(qzScoreGameList[tempObj['gameId']]) == 'undefined')
		{
			continue;
		}
		
		if (tempObj['type'] < 1 || (tempObj['type'] > 4))
		{
			continue;
		}
		tempCount++;
		
		
		var domObj = $('#myChallengeList li:first').clone();
		domObj.find('.c_fri').attr('href', 'http://user.qzone.qq.com/' + tempObj['friendUin']).end()
			.find('.c_frinick').text(tempObj['friendNick']).end()
			.find('.c_gamename').text(qzScoreGameList[tempObj['gameId']]['name']).end()
			.find('.c_game').attr('rel', tempObj['gameId']).end();


		if (tempObj["platType"] == 3) 
		{
			domObj.find('.c_as').text("校友");
			domObj.find('.c_fri').attr('href', 'http://pengyou.qq.com/index.php?mod=profile&u=' + tempObj['friendUinKey']);
		}

		//<a href="javascript:void(0)" onclick="FG.list.play(${c.gameId},0)" class="unline c_tx">再创新高</a>
		if (tempObj['type'] == 1)
		{
			domObj.find('.act').html(['<button type="button" class="btn2" onclick="pkGame(',
				tempObj['gameId'], ', 3, ', tempObj['rowId'], ', ', tempObj['friendUin'], ', this)">接受挑战</button>'].join(''));			
			domObj.find('.c_imgstatus').addClass('battle_ing');			
			domObj.find('.c_game').after(' 中打了<strong>' + tempObj['friendScore'] + '</strong>分，得意的向我发起了挑战！');
		}
		else if (tempObj['type'] == 2)
		{
			domObj.find('.act').html('<button type="button" class="btn2" onclick="playGame(' + tempObj['gameId'] + ')">再创新高</button>');		
			domObj.find('.c_imgstatus').addClass('battle_win');			
			domObj.find('.c_game').after(' 中以<strong>' + tempObj['friendScore'] + '</strong>分输给了我的<strong>' + tempObj['myScore'] + '</strong>分，迎战失败，哈哈！');
		}
		else if (tempObj['type'] == 3)
		{
			domObj.find('.act').html(['<button type="button" class="btn2" onclick="pkGame(',
				tempObj['gameId'], ', 4, ', tempObj['rowId'], ', ', tempObj['friendUin'], ', this)">回击</button>'].join(''));			
			domObj.find('.c_imgstatus').addClass('battle_fail');
			domObj.find('.c_game').after(' 中以<strong>' + tempObj['friendScore'] + '</strong>分打败了我的<strong>' + tempObj['myScore'] + '</strong>分，迎战成功，正得意的笑！');
		}
		else if (tempObj['type'] == 4)
		{
			domObj.find('.act').html(['<button type="button" class="btn2" onclick="pkGame(',
				tempObj['gameId'], ', 3, ', tempObj['rowId'], ', ', tempObj['friendUin'], ', this)">接受挑战</button>'].join(''));
			domObj.find('.c_imgstatus').addClass('battle_ing');	
			domObj.find('.c_game').after(' 中以<strong>' + tempObj['friendScore'] + '</strong>分打败了我的<strong>' + tempObj['myScore'] + '</strong>分，还来了个回马枪，向我发起了挑战！');
		}
		
		if (i == 0)
		{
			domObj.addClass('bgc');
			domObj.prepend(['<a class="q_namecard" target="_blank" href="http://user.qzone.qq.com/',
				tempObj['friendUin'],
				'"><img src="',
				tempObj['headurl'],
				'" class="avatar" /></a>'].join(''));
		}
		
		//注册事件
		domObj.find('.c_game').click(function(){playGame($(this).attr('rel'));});
		
		domObj.appendTo('#myChallengeList ul');
		domObj.show();
	}
	
	if (tempCount == 0)
	{
		$('#noFeedDiv').show();
	}
}

function initMyFeeds(aryMyFeeds, currentPage)
{
	$('#myChallengeList li:gt(0)').remove();
	$('#challengeNum').text(aryMyFeeds['userInfo']['challengeNum']);
	$('#winNum').text(aryMyFeeds['userInfo']['winNum']);
	$('#fallNum').text(aryMyFeeds['userInfo']['fallNum']);
	
	if (aryMyFeeds['challenge_list'].length < 1)
	{
		$('#noFeedDiv').show();
		return;
	}
	
	var tempCount = 0;
	for (var i = 0; i < aryMyFeeds['challenge_list'].length; ++i)
	{
		var tempObj = aryMyFeeds['challenge_list'][i];
		if (typeof(qzScoreGameList[tempObj['gameId']]) == 'undefined')
		{
			continue;
		}
		if (tempObj['type'] < 1 || (tempObj['type'] > 4))
		{
			continue;
		}
		tempCount++;
		
		var domObj = $('#myChallengeList li:first').clone();
		if((i%2) == 0){domObj.addClass("bgc")};
		
		domObj.find('.c_frihead').attr('src', tempObj['headurl']).end()
			.find('.c_fri').attr('href', 'http://user.qzone.qq.com/' + tempObj['friendUin']).end()
			.find('.c_frinick').text(tempObj['friendNick']).end()
			.find('.c_gamename').text(qzScoreGameList[tempObj['gameId']]['name']).end()
			.find('.c_game').attr('rel', tempObj['gameId']).end()
			.find('.sureDelBtn').attr('id', 'delSureBtn'+tempObj['rowId']).end()
			.find('.cancelDelBtn').attr('id', 'delCancelBtn'+tempObj['rowId']).end()
			.find('.delSureSpan').attr('id', 'delSureSpan'+tempObj['rowId']).end();


		if (tempObj["platType"] == 3) 
		{
			domObj.find('.c_as').text("校友");
			domObj.find('.c_fri').attr('href', 'http://pengyou.qq.com/index.php?mod=profile&u=' + tempObj['friendUinKey']);
		}

			
		//<button class="bt_tx4">接受挑战</button><a href="javascript:void(0)" class="unline c_tx2">删除</a>
		if (tempObj['type'] == 1)
		{
			domObj.find('.c_imgstatus').addClass('battle_ing');
			domObj.find('.operate').html(['<button class="btn2" onclick="pkGame(',
				tempObj['gameId'], ', 3, ', tempObj['rowId'], ', ', tempObj['friendUin'], ', this)">接受挑战</button><a href="javascript:;" class="unline c_tx" onclick="relDelFeed(', tempObj['rowId'], ', ', currentPage, ')">删除</a>'].join(''));
			domObj.find('.c_game').after(' 中打了<strong>' + tempObj['friendScore'] + '</strong>分，得意的向我发起了挑战！');
		}
		else if (tempObj['type'] == 2)
		{
			domObj.find('.c_imgstatus').addClass('battle_win');
			domObj.find('.operate').html('<button class="btn2" onclick="playGame(' + tempObj['gameId'] + ')">再创新高</button><a href="javascript:;" class="unline c_tx" onclick="relDelFeed(' + tempObj['rowId'] + ', ' + currentPage + ')">删除</a>');
			domObj.find('.c_game').after(' 中以<strong>' + tempObj['friendScore'] + '</strong>分输给了我的<strong>' + tempObj['myScore'] + '</strong>分，迎战失败，哈哈！');
		}
		else if (tempObj['type'] == 3)
		{
			domObj.find('.c_imgstatus').addClass('battle_fail');
			domObj.find('.operate').html(['<button class="btn2" onclick="pkGame(',
				tempObj['gameId'], ', 4, ', tempObj['rowId'], ', ', tempObj['friendUin'], ', this)">回击</button><a href="javascript:;" class="unline c_tx" onclick="relDelFeed(', tempObj['rowId'], ', ', currentPage, ')">删除</a>'].join(''));
			domObj.find('.c_game').after(' 中以<strong>' + tempObj['friendScore'] + '</strong>分打败了我的<strong>' + tempObj['myScore'] + '</strong>分，迎战成功，正得意的笑！');
		}
		else if (tempObj['type'] == 4)
		{
			domObj.find('.c_imgstatus').addClass('battle_ing');
			domObj.find('.operate').html(['<button class="btn2" onclick="pkGame(',
				tempObj['gameId'], ', 3, ', tempObj['rowId'], ', ', tempObj['friendUin'], ', this)">接受挑战</button><a href="javascript:;" class="unline c_tx" onclick="relDelFeed(', tempObj['rowId'], ', ', currentPage, ')">删除</a>'].join(''));
			domObj.find('.c_game').after(' 中以<strong>' + tempObj['friendScore'] + '</strong>分打败了我的<strong>' + tempObj['myScore'] + '</strong>分，还来了个回马枪，向我发起了挑战！');
		}
		
		//注册事件
		//domObj.find('.c_play').click(function(){alert('xxx gameid: ' + $(this).attr('rel'));});
		//domObj.find('.unline').click(function(){alert('xxxrrrrrr, gameid: ' + $(this).attr('rel'));});
		domObj.find('.c_game').click(function(){playGame($(this).attr('rel'));});
		
		domObj.appendTo('#myChallengeList');
		domObj.show();
	}
	setQzFrameHeight();
	
	if (tempCount == 0 && currentPage == 1)
	{
		$('#noFeedDiv').show();
	}

	initFeedPageList(aryMyFeeds['totalNum'], 16, currentPage);
}


function initFeedPageList(totalNum, pageCnt, currentPage)
{
	if (totalNum <= pageCnt)
	{
		return;
	}
	var totalPage = Math.ceil(totalNum / pageCnt);
	var aryHtml = new Array();
	if (currentPage <= 1)
	{
		aryHtml.push('<span class="disabled">上一页</span>');
	}
	else
	{
		aryHtml.push('<a href="javascript:;" onclick="reqMyPkFeed(' + (currentPage-1) + ');">上一页</a>');
	}
	
	for (var i = 1; i <= totalPage; ++i)
	{
		if (i == currentPage)
		{
			aryHtml.push('<strong class="hit">' + i + '</strong>');
		}
		else
		{
			aryHtml.push('<a href="javascript:;" onclick="reqMyPkFeed(' + i + ');">' + i + '</a>');
		}
	}
	
	if (currentPage >= totalPage)
	{
		aryHtml.push('<span class="disabled">下一页</span>');
	}
	else
	{
		aryHtml.push('<a href="javascript:;" onclick="reqMyPkFeed(' + (currentPage+1) + ');">下一页</a>');
	}
	G('bottomPage').innerHTML = aryHtml.join('');
}

function getQueryString(name) 
{
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href)) return (RegExp.$2.replace(/\+/g, " ")); 
	return ""; 
}

function htmlEscape(str)
{
	var sTemp = str.replace(/&/g,"&amp;");
	sTemp = sTemp.replace(/</g,"&lt;");	
	sTemp = sTemp.replace(/>/g,"&gt;");	
	sTemp = sTemp.replace(/"/g,"&quot;");	
	sTemp = sTemp.replace(/'/g,"&apos;");
	return sTemp;
}

function showSafariTips(){
	if(browser.safari){
		$('<div class="safari_tips"></div>').html("您使用的浏览器可能会影响本页面的相关功能！<br/>如果您使用的是safari浏览器,您可以在&ldquo;偏好设置&rdquo;&rarr;&ldquo;安全&rdquo;&rarr;&ldquo;接受cookie&rdquo;一项中选择&ldquo;总是&rdquo;,然后重新打开本应用，<br/>或者您也可以更换其他浏览器。").insertBefore("#userInfo");
	}
}

//for stat
function statDayLiveUser()
{
	mgpJsLoad('http://fcg.3366.com/fcg-bin/mgp_check_login?from=26&r=' + Math.random(),
		function(){}
	);
}

var getCSRFToken = function()
{
	var hash = 5381;
    var skey = chGetCookie('skey') || '';
    if(skey == '')
    {
		return '';
    }
    var len = skey.length;
    for(var i = 0; i < len; i++)
    {
		hash += (hash << 5) + skey.charAt(i).charCodeAt();
    }
    return hash & 0x7fffffff;
}

function chGetCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null)
	{
		return unescape(arr[2]);
	}
	return "";
}

$(document).ready(function(){
    $('form').submit(function(){
        if($(this).find('.csrf-token').size() == 0){
            $(this).append('<input type="hidden" name="sCSRFToken" value="' + getCSRFToken() + '" class="csrf-token" />');
        }
        return true;
    });
});

/*
function reqHeadNick()
{
	mgpJsLoad('http://fcg.3366.com/fcg-bin/qqinfo/mgp_qqinfo_get_myhead?uin=' + chGetUin(),
	function()
	{
		if (typeof(gUserHeadInfo) == "undefined" || gUserHeadInfo['result'] != 0)
		{
			return;
		}
		$('#myNick').text(gUserHeadInfo['nick']);
		$('#headImgId').attr('src', gUserHeadInfo['headurl']);
	});
}
*/
