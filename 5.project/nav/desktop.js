



(function(){

	var menuMask;
	function Nav(o){
		this.element=o.element;
		o.data&&this.init(o.data);
		if(o.callback){
			o.callback.apply(this);
		}
	};

	//设置原型初始化
	prototypeInit(Nav);

	Nav.extend({
		//加载菜单数据
		init:function(items){
			var navs=[];
			var nav="<li class='{icon}'><div class='label'>{text}</div>{subItems}</li>";
			for(var i in items){
				var item=items[i];
				var subItems=initSubItems(item);
				navs.push(tmpl(nav,{icon:item.icon,text:item.title,subItems:subItems}));
			}
			navs=navs.join("");
			this.element.html(navs);
			this.menuHover(items);
			
			//加载二级菜单
			function initSubItems(item){
				if(item.children&&item.children.length){
					var subItem="<div class='subItem'>{text}</div>";		
					var s=[];
					for(var j in item.children){
						var subItemData=item.children[j];						
						subItem="<div class='subItem'>"+subItemData.title+"</div>";						
						s.push(tmpl(subItem,{text:subItemData.title}));
					}
					return "<div class='subItems'>"+s.join("")+"</div>";
				}
			}
		},

		//设置鼠标悬浮
		menuHover:function(items){
			$(".header .nav li").each(
				function(i,item){
					$(item).attr("index",i);
					$(item).hoverDelay({
						hoverEvent : function() {
							Nav.event.mouseHover(item);
						},
						outEvent : function() {
							Nav.event.outEvent(item);
						}
					}).on({
						click:function(ev){
							Nav.event.clickEvent(ev);
						}
					})
				}
			);
		}
	});

	Nav.event={
		mouseHover:function(target){
			var subItems=$(target).children(".subItems");
			subItems.length&&subItems.css({width:target.offsetWidth+"px"}).show(200);
		},
		outEvent:function(target){
			var subItems=$(target).children(".subItems");
			subItems.length&&subItems.hide(200);
		},
		clickEvent:function(ev){
			var target=ev.target;
			//制作滑动蒙版
			if(!menuMask){
				menuMask=$("<div></div>").addClass('activeMenuItem').html($(target).html()).attr("index",$(target).attr("index"));
				menuMask.css({
					left:$(target).closest ("li").position().left+'px',
					top:$(target).closest ("li").position().top+'px'
				});
				menuMask.appendTo($(".navwrap"));
				menuMask.on({
					mouseover:function(ev){
						//console.log(target.next()[0].outerHTML);
						if($(target).next().length){
							$(target).next().show();
						}
					},mouseout:function(ev){
						if($(target).next().length){
							$(target).next().hide();
						}
					}
				})
			}else{
				menuMask.html($(target).html()).animate({
					left:$(target).closest ("li").position().left+'px',
					top:$(target).closest ("li").position().top+'px'
				},300);
			}

		}
	}



	window.Nav = Nav;
	
})();
