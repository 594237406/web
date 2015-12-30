$(function(){
	$(".navbar-content").on("mouseenter",function(ev){
		$("dd").show();
	}).on("mouseleave",function(ev){
		$("dd").hide();
	});	
});   