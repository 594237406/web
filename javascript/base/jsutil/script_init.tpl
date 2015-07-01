
{%* 
* 整站需要的初始化脚本，可以放到这里	
* 2014-04-10
*%}
{%script%}
	$.ajaxSetup({
		cache : false
	});

	$(function(){
		require.async(['topshop:widget/ui/items_post/items_post.js'],function(itemsPost){
			itemsPost.init();
		});
	});

//2014_10_11 zhangyijun02: 因增加广告轮播曝光日志逻辑，调整showtrack初始化方式
	require.async([
		'topshop:widget/ui/usertrack/usertrack.js',
		'topshop:widget/ui/lazyload/lazyload.js',
		'topshop:widget/ui/cookie/cookie.js',
		'topshop:widget/ui/showtrack/showtrack.js'
	], function(usertrack, LazyLoad, Cookie, ShowTrack){
		// 初始化点击监听
		usertrack.init();
		new LazyLoad({
			lazy : $('img[data-original]'),
			expect: 250
		});


		handleBaiduid();

		function handleBaiduid(){
			var getBaiduidUrl = "{%"get_baiduid"|genUrl%}";
			var retryCount = 1;	
			getBaiduid();

			function getBaiduid(){

				$.ajax(getBaiduidUrl, {
					dataType : 'jsonp',
					success : function(json){
						if(json.errno == 0){
							var baiduid = json.data.baiduid;
							if(baiduid){
								Cookie.setRaw('BAIDUID', baiduid, 365);
							}
							// 不管有没有baiduid，都发送pv
							sendPv();
						}else{
							if(retryCount--){
								getBaiduid();
							}else{
								// 最后一次也获取失败
								sendPv();
							}							
						}					
						
					}
				});
			}
		

		}

		function sendPv(){
			usertrack.send({
				da_src : encodeURIComponent($.stringify({
					page : "{%$data.page%}"
				})),				
				element_type : "pv"
			});
		}

		//2014_10_11 zhangyijun02: 因增加广告轮播曝光日志逻辑，调整ShowTrack初始化方式
		//曝光日志统计
		ShowTrack.startShowTrack();			
	});

{%/script%}