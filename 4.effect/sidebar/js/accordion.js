function init(){
	$("#accordion .menu_head").click(function(){
		$(this).next(".menu_body").slideToggle(500).siblings("div.menu_body").slideUp(500);
	});

	var currentItem=null;

	$(".accordion a").on({
		click:function(ev){
			if(!currentItem){					
				currentItem=$(this).clone().addClass('active').html($(this).html());
				currentItem.css({width:$(this).width(),height:$(this).height()+'px',left:$(this).offset().left+'px',top:$(this).offset().top+'px'});
				currentItem.appendTo($("#accordion"));
			}else{
				currentItem.html($(this).html()).animate({left:$(this).offset().left+'px',top:$(this).offset().top+'px'},500);
			}				
		}
	});

	$(".menu_head").on({
		click:function(ev){
			if(currentItem){
				currentItem.remove();
				currentItem=null;
			}				
		}
	});
}

