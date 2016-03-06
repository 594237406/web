/**
 * jQuery AIUESuite V0.1
 *
 * author: lixiaopeng 
 *
 * mail:lixp3@asiainfo-linkage.com
 */


(function($) {
		  
 $.fn.extend({ 
"insert":function(value){ 
//默认参数 
value=$.extend({ 
"text":"123" 
},value); 
var dthis = $(this)[0]; //将jQuery对象转换为DOM元素 
//IE下 
if(document.selection){ 
$(dthis).focus(); //输入元素textara获取焦点 
var fus = document.selection.createRange();//获取光标位置 
fus.text = value.text; //在光标位置插入值 
$(dthis).focus(); ///输入元素textara获取焦点 
} 
//火狐下标准 
else if(dthis.selectionStart || dthis.selectionStart == '0'){ 
var start = dthis.selectionStart; 　　 //获取焦点前坐标 
var end =dthis.selectionEnd; 　　//获取焦点后坐标 
　　　　//以下这句，应该是在焦点之前，和焦点之后的位置，中间插入我们传入的值 .然后把这个得到的新值，赋给文本框 
　　　　　　dthis.value = dthis.value.substring(0, start) + value.text + dthis.value.substring(end, dthis.value.length); } 
　　　　//在输入元素textara没有定位光标的情况 
　　　　　　else{ 
　　　　　　　　　　this.value += value.text; this.focus(); 
　　　　　　}; 
　　　　　　return $(this); 
　　　　} 
　　}) 
		  
		  
var pageWidth =function(){
	if($.browser.msie){
		return document.compatMode == "CSS1Compat"? document.documentElement.clientWidth:document.body.clientWidth;
	}else{
		return self.innerWidth;
	}
}
var pageHeight =function(){
	if($.browser.msie){
		return document.compatMode == "CSS1Compat"? document.documentElement.clientHeight:document.body.clientHeight;
	}else{
		return self.innerHeight;
	}
}
$.loading = {
	show : function() {
		var h=pageHeight();
		$(document.body).height(h);
		var wrap=$(document.body);
		$("<div class=\"loading-mask\" style='z-index:9998'><iframe style='display:none'/></div>").css({display:"block",width:wrap.width(),height:wrap.height(),opacity:'0.6'}).appendTo(wrap).stop().fadeTo(650, 0.6);
		$("<div class=\"loading-mask-msg\" style='z-index:9999'><div class=\"loading-mask-icon\"></div><div class=\"loading-mask-text\"></div><div style=\"clear:both;\"></div><div class=\"loading-mask-succe\" style='display:block; color:#555; padding:30px; line-height:180%; font-size:14px;'><div class=\"wfb_ok\"></div><div class=\"loading-wfb-text\"></div><input type=\"button\" class=\"loading-wfb-but\" id=\"loading-wfb-but\" /></div><iframe style='display:none'/></div>").appendTo(wrap).css({display:"none",left:(wrap.width()-$("div.loading-mask-msg",wrap).outerWidth())/2,top:(wrap.height()-$("div.loading-mask-msg",wrap).outerHeight())/2,opacity:'0.6'}).stop().fadeTo(650, 1);
		$("div.loading-mask-text").html($.loading.defaults.defaultMsg);
		$("div.loading-wfb-text").html($.loading.defaults.wfbMsg);
		$("#loading-wfb-but").bind("click",function(){
			wrap.find("div.loading-mask-msg").remove();
			wrap.find("div.loading-mask").remove();
			$("#wfb_01_form,#wfb_01").stop().fadeTo(650,0);
			$("#wfb_02").stop().fadeTo(650, 1);
		});
	},
	openImg: function(imgName) {
		var h=pageHeight();
		$(document.body).height(h);
		var wrap=$(document.body);
		$("<div class=\"loading-mask\" style='z-index:9998'><iframe style='display:none'/></div>").css({display:"block",width:wrap.width(),height:h+100,opacity:'0.6'}).appendTo(wrap).stop().fadeTo(650, 0.6);
		$("<div class=\"loading-mask-msg\" style='z-index:9999'><div class=\"loading-mask-succe\" ><div class=\"loading-wfb-but float_rig\" id=\"loading-wfb-but\"></div><div class=\"clear\"></div></div><table border='0' cellpadding='0' cellspacing='0' align='center'><tr><td><img src='css/this/images/"+imgName+".jpg' /></td></tr></table>").appendTo(wrap).css({display:"block",left:(wrap.width()-$("div.loading-mask-msg",wrap).outerWidth())/2,top:(wrap.height()-$("div.loading-mask-msg",wrap).outerHeight())/2,opacity:'0.6'}).stop().fadeTo(650, 1);
		$("#loading-wfb-but").bind("click",function(){
			$(document.body).find("div.loading-mask-msg").remove();
			$(document.body).find("div.loading-mask").remove();
		});
	},
	showDom: function(DomId) {
		var h=pageHeight();
		$(document.body).height(h);
		var wrap=$(document.body);
		$("<div class=\"loading-mask\" style='z-index:9998'><iframe style='display:none'/></div>").css({display:"block",width:wrap.width(),height:wrap.height(),opacity:'0.6'}).appendTo(wrap).stop().fadeTo(650, 0.6);
		var DomHtml = $(DomId).html();
		$("<div class=\"loading-mask-dom-msg\" style='z-index:9999'><div class=\"loading-wfb-text\"></div></div>").appendTo(wrap).css({display:"block",left:(wrap.width()-$("div.loading-mask-dom-msg",wrap).outerWidth())/2,top:(wrap.height()-$("div.loading-mask-dom-msg",wrap).outerHeight())/2,opacity:'0.6'}).stop().fadeTo(650, 1);
		$("div.loading-wfb-text").html(DomHtml);

		$(".enterWorkBox .Ewb_img01").hover(
		  function(){
			$(this).addClass("Ewb_img01_h");
		  }, function(){
			$(this).removeClass("Ewb_img01_h");
		  }); 
		$(".enterWorkBox .Ewb_img02").hover(
		  function(){
			$(this).addClass("Ewb_img02_h");
		  },function(){
			$(this).removeClass("Ewb_img02_h");
		  }); 
			$("div.Ewb_img01,div.Ewb_img02,div.Ewb_url").bind("click",function(){
			wrap.find("div.loading-mask-dom-msg").remove();
			wrap.find("div.loading-mask").remove();
		});
	},
	changedom:function(){
		var wrap=$(document.body);
		wrap.find("div.loading-mask-msg .loading-mask-icon,div.loading-mask-msg .loading-mask-text").remove();
		wrap.find("div.loading-mask-succe").fadeIn();
	},
	remove : function() {
		var wrap=$(document.body);
		wrap.find("div.loading-mask-msg").remove();
		wrap.find("div.loading-mask").remove();
	},
	fadeOut:function(){
		var wrap=$(document.body);
		wrap.find("div.loading-mask-msg").fadeOut(1000,function(){
			$.loading.remove();
		});
		wrap.find("div.loading-mask").fadeOut(1000,function(){
			$.loading.remove();
		});
	},
	loadElemId:function(ElemId){
		var loadElem = document.getElementById(ElemId);  
		if (loadElem.attachEvent){  
			loadElem.attachEvent("onload", function(){  
				 $.loading.fadeOut();  
			 });  
		} else {  
			 loadElem.onload = function(){  
				 $.loading.fadeOut(); 
			};  
		}  
		
	}
};
$.loading.defaults = {
	defaultMsg : "系统正在加载，请稍候……",
	wfbMsg : "意见已受理，赠送您的5元好利来电子代金券将于<span style='color:red;'>下月10个工作日内</span>,通过短信形式发送至您的手机，请注意查收。<br />再次感谢您的参与。"
}
$.selectPage = {
	showpage : function() {
		var showpageNum = $("#wlanfeedbackmesbox").attr("title");
		if(showpageNum == "n"){
			$("#wfb_01").css({display:"block",opacity:"0"}).stop().fadeTo(650, 1,function(){
				$("#wfb_01_form").slideDown("slow");
			});
		}else if(showpageNum == "y"){
			$("#wfb_02").css({display:"block",opacity:"0"}).stop().fadeTo(650, 1);
		}
	},
	wfbsubmit: function() {
		$("#wfb_submit").bind("click",function(){
			$.loading.show();
			var t=setTimeout("$.loading.changedom();",2000);
			//$.loading.changedom();
		});
	}
};
$.AIUETree = {
	addTabs:function(title,href) {
		var conElem = $('#main-center');
		if (conElem.tabs('exists', title)){  
			conElem.tabs('select', title);  
		} else {  
			if (href){  
				//var w=$("#main-center").width();
				//var h=$("#main-center").height()-40;
				//alert(w+"+"+h);
				$.loading.show();
				var content = '<iframe id="tabs_frame" onload="javascript:$.loading.fadeOut()" frameborder="0" allowtransparency="true" src="'+href+'" style="width:100%; height:100%;"></iframe>';  
				
			} else {  
				var content = '请查看是否含有href属性';  
			}  
			conElem.tabs('add',{  
				title:title,  
				closable:true, 
				fit:true,
				content:content  
			});  
		}  
	},
	loadTree:function(url){
		$("#AIUETree").tree({
			url:url,
			dnd:true,
			onClick:function(node){ //onClick:鼠标点击事件
			  if(node.attributes.href){
				  $.AIUETree.addTabs(node.text,node.attributes.href); //open_testcase()为执行的方法 
			  }else{
				  return false;
			  }
			},
			onLoadSuccess:function(){
				return false;
			}
		});
	}
};
$.AIUEForm={
	layout:function(){
		$("table.form-layout_R2>tbody>tr").each(function(){
			if($(this).find("td").attr("colspan") == 2){
				$(this).find("td").css({"text-align":"center"});
			}else{
				$(this).find("td:even").css({width:"30%","text-align":"right",color:"#555555","font-weight":"bold",padding:"2px 5px"});	
				$(this).find("td:odd").css({width:"70%","text-align":"left",color:"#555555"});		
			}
				
		});		
		$("table.form-layout_R4>tbody>tr").each(function(){
			if($(this).find("td").attr("colspan") == 4){
				$(this).find("td").css({"text-align":"center"});
			}else{
				$(this).find("td:even").css({width:"15%","text-align":"right",color:"#555555","font-weight":"bold",padding:"2px 5px"});	
				$(this).find("td:odd").css({width:"35%","text-align":"left",color:"#555555"});		
			}
				
		});	
		$("table.form-layout_R6>tbody>tr").each(function(){
			if($(this).find("td").attr("colspan") == 6){
				$(this).find("td").css({"text-align":"center"});
			}else{
				$(this).find("td:even").css({width:"10%","text-align":"right",color:"#555555","font-weight":"bold",padding:"2px 5px"});	
				$(this).find("td:odd").css({width:"23%","text-align":"left",color:"#555555"});		
			}
				
		});	
		//alert(1111);
	}
};
$.AIUECombo={
	Effect:function(selectId,slideBoxId){
		$("ul.comboEffe>li:even").css({background:"#f2f2f2",height:"25px","line-height":"25px",cursor:"pointer",color:"#555555"});	
		$("ul.comboEffe>li:odd").css({background:"#f8f8f8",height:"25px","line-height":"25px",cursor:"pointer",color:"#555555"});
		$(selectId).combo({required:true,editable:false});
		$(slideBoxId).appendTo($(selectId).combo('panel'));
		$(slideBoxId).find("ul.comboEffe>li").bind("click",function(){
			var v = $(this).find("input:radio").val();
			var s = $(this).find("input:radio").next('span').text();
			$(this).find("input:radio").attr("checked","checked");
			$(selectId).combo('setValue', v).combo('setText', s).combo('hidePanel');
		});
		//alert(1111);
	},
	boxEffect:function(){
		$("div.combobox-item:even").css({background:"#f2f2f2",height:"25px","line-height":"25px",cursor:"pointer",color:"#555555"});
		$("div.combobox-item:odd").css({background:"#f8f8f8",height:"25px","line-height":"25px",cursor:"pointer",color:"#555555"});
		//alert(1111);
	}
};
$.CRMUEOnIm={
	receiveMesg:function(textAreId,checkButId,messageBoxId){
		
		function getStrActualLen(){ //根据字符数来实现气泡长度的算法
			var count=$(textAreId).val().length/1024; 
			return Math.round(count*Math.pow(10,4)); 
		} 
		$(checkButId).bind("click",function(){
			var d = new Date()
			var vYear = d.getFullYear()
			var vMon = d.getMonth() + 1
			var vDay = d.getDate()
			var h = d.getHours(); 
			var m = d.getMinutes(); 
			var se = d.getSeconds(); 
			GGG="<div class='online_data_box_tm'>"+(h<10 ? "0"+ h : h)+":<span class='newdmi'>"+(m<10 ? "0" + m : m)+"</span>:<span class='newse'>"+(se<10 ? "0" +se : se)+"</span></div>";
			var ttext=$(textAreId).val();
			if(ttext=="") return false;
			$(messageBoxId).append("<table class='messageGBox' border='0' cellpadding='0' cellspacing='0'><tr><td class='time_line' width='5%' valign='top' align='right'><div class='Gbox_left tm_Gbox_left'><div class='float_lef tm_Gbox_l_l'><div class='Gbox_icon'></div><div class='tm_data_Gbox'>"+GGG+"</div></div><div class='float_lef tm_Gbox_l_r'><div class='time_line_img'></div></div><div class='clear'></div></div></td><td align='left' valign='top' width='75%'><table class='Gbox_right tm_Gbox_right' border='0' cellpadding='0' cellspacing='0'><tr><td class='Gbox_right_t_l'></td><td class='Gbox_right_t_c'></td><td class='Gbox_right_t_r'></td></tr><tr><td class='Gbox_right_c_l'></td><td id ='Gbox_right_c_c' class='Gbox_right_c_c"+$.CRMUEOnIm.defaults.fontWeiName+$.CRMUEOnIm.defaults.fontStyNor+$.CRMUEOnIm.defaults.textdec+"'>"+ttext+"</td><td class='Gbox_right_c_r'></td></tr><tr><td class='Gbox_right_b_l'></td><td class='Gbox_right_b_c'></td><td class='Gbox_right_b_r'></td></tr></table></td></tr></table>");
			$(textAreId).val("");
			var offsetTopVal=$("table.messageGBox:last").position().top;
			var offsetTopVal=offsetTopVal-2;
			$(messageBoxId).parent().stop().animate({scrollTop:offsetTopVal},1000);//4.留言提交后，能精确定位到留言气泡1000是ms,也可以用slow代替
			
		});
	},
	sendMesg:function(textAreId,checkButId,messageBoxId){
		
		function getStrActualLen(){ //根据字符数来实现气泡长度的算法
			var count=$(textAreId).val().length/1024; 
			return Math.round(count*Math.pow(10,4)); 
		} 
		$(checkButId).bind("click",function(){
			var d = new Date()
			var vYear = d.getFullYear()
			var vMon = d.getMonth() + 1
			var vDay = d.getDate()
			var h = d.getHours(); 
			var m = d.getMinutes(); 
			var se = d.getSeconds(); 
				var d = new Date()
			var vYear = d.getFullYear()
			var vMon = d.getMonth() + 1
			var vDay = d.getDate()
			var h = d.getHours(); 
			var m = d.getMinutes(); 
			var se = d.getSeconds(); 
			SSS="<div class='online_data_box_tm'>"+(h<10 ? "0"+ h : h)+":<span class='newdmi'>"+(m<10 ? "0" + m : m)+"</span>:<span class='newse'>"+(se<10 ? "0" +se : se)+"</span></div>";
			var ttext=$(textAreId).val();
			if(ttext=="") return false;
			$(messageBoxId).append("<table class='messageSBox float_rig' border='0' cellpadding='0' cellspacing='0'><tr><td align='right' valign='top' width='95%'><table class='Sbox_left tm_Sbox_left' border='0' cellpadding='0' cellspacing='0'><tr><td class='Gbox_right_t_l'></td><td class='Gbox_right_t_c'></td><td class='Gbox_right_t_r'></td></tr><tr><td class='Gbox_right_c_l'></td><td class='Gbox_right_c_c"+$.CRMUEOnIm.defaults.fontWeiName+$.CRMUEOnIm.defaults.fontStyNor+$.CRMUEOnIm.defaults.textdec+"'>"+ttext+"</td><td class='Gbox_right_c_r'></td></tr><tr><td class='Gbox_right_b_l'></td><td class='Gbox_right_b_c'></td><td class='Gbox_right_b_r'></td></tr></table></td><td class='tm_blue_line' width='5%' valign='top' align='right'><div class='Sbox_right tm_Sbox_right'><div class='sbox_tm_icon float_lef'></div><div class='tm_sbox_icon float_lef'><div class='sbox_icon float_lef marg_lef5'></div><div class='clear'></div><div class='sbox_icon_text'>"+SSS+"</div></div><div class='clear'></div></div></td></tr></table><div class='clear'></div>");
			$(textAreId).val("");
			var offsetTopVal=$("table.messageSBox:last").position().top;
			var offsetTopVal=offsetTopVal-2;
			$(messageBoxId).parent().stop().animate({scrollTop:offsetTopVal},1000);//4.留言提交后，能精确定位到留言气泡1000是ms,也可以用slow代替
			/*$("td.Gbox_right_c_c img").filter(".showimg_s").each(function(){
			    $(this).bind("click",function(){
					var name= $(this).attr("imgname");
					$.loading.openImg(name);
				});
			}); */
			
		});
	}
};
$.CRMUEOnIm.defaults = {
	fontWeiName:" fontTypeNor",
	fontStyNor :" fontStyleNor",
	textdec:" textdecNon"
}
$.CRMUE={
	hoverEffect:function(hoverBoxId){
		$(hoverBoxId).bind("mouseover",function(){
			var hoverboxTop= $(this).offset().top+35;
			var hoverboxleft= $(this).offset().left-111;
			$("#serverTimelay").css({left:hoverboxleft,top:hoverboxTop}).fadeIn("fast");
		});
		$(".on_menu,.on_user_Bright").bind("mouseover",function(){
			$("#serverTimelay").fadeOut("fast");							   
		});
		$("#serverTimelay").bind("mouseleave",function(){
			$(this).fadeOut("fast");										 
		});

	},
	menuHover:function(menuId){
		$(menuId).find(".on_menu_list").hover(function(){
			$(this).addClass("on_menu_list_h").siblings().removeClass("on_menu_list_h");					 
		},function(){
			$(this).removeClass("on_menu_list_h");	
		});
	},
	checklayout:function(){
		$("#layout_hide_Icon").bind("click",function(){
			$(this).fadeOut("fast");
			$("#onlie_layout").layout('collapse','east');
			$("#layout_show_Icon").fadeIn("slow");
		});
		$("#layout_show_Icon").click(function(){
			$(this).hide();
			$("#onlie_layout").layout('expand','east');
			$("#layout_hide_Icon").fadeIn("fast");										   
		});	

	},
	toolBar:function(formId){
		$("li>div.online_toolbar_T_weight").toggle(function () {
			 $(this).addClass("online_toolbar_icon_001h");											 
			 $(formId).addClass("fontTypeWeig");
			 $.CRMUEOnIm.defaults.fontWeiName=" fontTypeWeig";
		  },
		  function () {
			  $(this).removeClass("online_toolbar_icon_001h");		
			  $(formId).removeClass("fontTypeWeig");
			  $.CRMUEOnIm.defaults.fontWeiName=" fontTypeNor";
		  }).hover(function(){$(this).addClass("online_toolbar_icon_001C");},function(){$(this).removeClass("online_toolbar_icon_001C");});
		$("li>div.online_toolbar_T_fontSty").toggle( function () {
			 $(this).addClass("online_toolbar_icon_002h");	
			 $(formId).addClass("fontStyleObl");
			 $.CRMUEOnIm.defaults.fontStyNor=" fontStyleObl";
		  },
		  function () {
			  $(this).removeClass("online_toolbar_icon_002h");	
			 $(formId).removeClass("fontStyleObl");
			 $.CRMUEOnIm.defaults.fontStyNor=" fontStyleNor";
		  }).hover(function(){$(this).addClass("online_toolbar_icon_002C");},function(){$(this).removeClass("online_toolbar_icon_002C");});
		$("li>div.online_toolbar_T_fontdec").toggle(
		  function () {
			 $(this).addClass("online_toolbar_icon_003h");	
			 $(formId).addClass("textdecUnder");
			 $.CRMUEOnIm.defaults.textdec=" textdecUnder";
		  },
		  function () {
			   $(this).removeClass("online_toolbar_icon_003h");	
			 $(formId).removeClass("textdecUnder");
			 $.CRMUEOnIm.defaults.textdec=" textdecNon";
		  }).hover(function(){$(this).addClass("online_toolbar_icon_003C");},function(){$(this).removeClass("online_toolbar_icon_003C");});
		$("li>div.online_toolbar_T_bq").hover(function(){$(this).addClass("online_toolbar_icon_005C");},function(){$(this).removeClass("online_toolbar_icon_005C");});
		$("li>div.online_toolbar_T_bq").bind("click",function(){
			$("#toolbar_bq").css({display:"block"});												  
			$(this).css({display:"none"}).next().css({display:"block"});												  
		});
		$("li>div.online_toolbar_T_bq_check").bind("click",function(){
			$("#toolbar_bq").css({display:"none"});												  
			$(this).css({display:"none"}).prev().css({display:"block"});												  
		});
		$("#toolbar_bq ul li").click(function(){
				$("#toolbar_bq").css({display:"none"});
				var imgUrl="<img align='absbottom' src='css/this/icons/"+$(this).attr("imgurl")+".gif' />";
				$(formId).insert({"text":imgUrl}).focus();
				$("li>div.online_toolbar_T_bq").css({display:"block"});
				$("li>div.online_toolbar_T_bq_check").css({display:"none"});
		});
		$(formId).bind("click",function(){
			$(this).focus();							   
		});
		$(formId).focus(function(){
		  $("#toolbar_bq").css({display:"none"});
		  $("li>div.online_toolbar_T_bq").css({display:"block"});
		  $("li>div.online_toolbar_T_bq_check").css({display:"none"});
		}); 

		
	},
	associative:function(formId){
		$(formId).keyup(function(){
			var formval=$(this).val();
			if(formval=="北京交通"){
				$("#associative_box").css({display:"block"});
			}
		
		}); 
		$(".ab_close").bind("click",function(){
				$(this).parent().parent().css({display:"none"});
		});
		$("#associative_box .ab_con .ab_con_line").hover(function(){
				$(this).addClass("ab_con_line_hov");													  
			},function(){
				$(this).removeClass("ab_con_line_hov");
		}).click(function(){
			var assocFormVal = $(this).contents().find(".ab_con_txt").text();
			$(formId).val(assocFormVal);
			$(this).parent().parent().css({display:"none"});
		});
	},
	openImgFun:function(){
		$("td.Gbox_right_c_c img").filter(".showimg_s").each(function(){
			$(this).bind("click",function(){
				var name= $(this).attr("imgname");
				$.loading.openImg(name);
			});
		}); 
	}
};

})(jQuery);//使用闭包
