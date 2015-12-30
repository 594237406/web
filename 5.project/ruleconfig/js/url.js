

function PopUp(){
	this.popUpWindow=null;
	this.data=[];
	this.text=[];
}

PopUp.prototype.open=function(ev,returnValue,selectValue,fn){
	var _this=this;
	//清空焦点
	var target=ev.target||ev.srcElement;
	$(target).blur();
	
	var attributeValues=returnValue.attributeValues;
	this.popUpWindow=$("<div class='popUpWindow' >");
	
	$(this.popUpWindow).css("height",document.documentElement.clientHeight/2); 
	$(this.popUpWindow).css("width",document.documentElement.clientWidth/2); 
	$(document.body).append(this.popUpWindow);
	$(this.popUpWindow).css("top",document.documentElement.clientHeight/4-1); 
	$(this.popUpWindow).css("left",(document.documentElement.clientWidth-$(this.popUpWindow).outerWidth())/2-1); 
	
	/*窗体改变大小时重新布局*/
	window.onresize=function(){
		$(_this.popUpWindow).css("top",document.documentElement.clientHeight/4-1); 
		$(_this.popUpWindow).css("left",(document.documentElement.clientWidth-$(_this.popUpWindow).outerWidth())/2-1); 
	};
	
	var shadow=$("<div class='shadow'></div>");
	$(document.body).append(shadow);
	
	var nav="<div id='list-nav'></div>";
	this.popUpWindow.append(nav);
	var ul=$("<ul id='list' style='clear:both;'>");
	
	ul.css("max-height",$(this.popUpWindow).outerHeight()-90);
	
	this.popUpWindow.append(ul);
	
	
	for ( var i = 0; i < attributeValues.length; i++) {
		var attributeValue=attributeValues[i];
		var checked="";
		if(selectValue){
			var selectValues=selectValue.split(",");
			for(var j=0;j<selectValues.length;j++){
				if(selectValues[j]==attributeValue.value){
					checked="checked='checked'";
				}
			}
		}
		var li="<li><input type='checkbox' "+checked+" value='"+attributeValue.value+"'>"+attributeValue.text+"</input></li>";
		ul.append(li);
	}

	$('#list').listnav({
		includeOther : true,
		noMatchText : StringCon.NOCONTENT,
		prefixes : [ 'the', 'a' ]
	});
	
	var buttonbar=$("<div class='buttonbar'></div>");
	$(this.popUpWindow).append(buttonbar);
	
	var ok=$("<input class='btn_ok' type='button' value='"+StringCon.OK+"'></input>");
	$(buttonbar).append(ok);
	
	$(ok).bind("click",function(ev){
		$("#list input:checkbox:checked").each(function(){
			_this.data.push($(this).val());
			_this.text.push($(this).parent().text());
		});
		
		shadow.remove();
		$(_this.popUpWindow).remove();
		
		if(fn){
			fn(_this.data,_this.text);
		}
		
		$(".express").html(new RuleLayout().saveRule("view"));
	});
	
	var cancel=$("<input class='btn_cancel' type='button' value='"+StringCon.CANCEL+"'></input>");
	$(buttonbar).append(cancel);
	
	$(cancel).bind("click",function(ev){
		shadow.remove();
		$(_this.popUpWindow).remove();
	});
}; 