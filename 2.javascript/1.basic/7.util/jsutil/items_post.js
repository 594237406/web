
/*
* author: zhaoran04
* date: 2014-07-22
	
	require.async([
		'common:widget/ui/items_post/items_post.js'
	], function(itemsPost){
		itemsPost.init();
	});
*/
var usePost = false;

function post($tar, params){
	var href = $tar.attr('href');

	var isOpenNew = $tar.attr('target') == '_blank';

	var target = isOpenNew ? 'target="_blank"' : '';

	var $form = $('<form action="' + href + '" method="post" ' + target + '></form>');

	/*var $hidden = $('<input type="hidden">')
		.attr('name', 's')
		.attr('value', s)
		.appendTo($form);*/
    var htmls = [],
        items={},
        input = '<input type="hidden" name="{name}" value="{value}" />';
    for(var i= 0,len =params.length;i<len;i++ ){
        //$('<input type="hidden">').attr('name', params[i].split('=')[0] ).attr('value', params[i].split('=')[1]);
        items={
            "name":params[i].split('=')[0],
            "value":params[i].split('=')[1] || ''
        };
        htmls.push(input.replace(/\{(\w+)\}/g, function (s, k) {
            return k in items ? items[k] : s;
        }) );
    }
		
	$form.html(htmls.join('') ).appendTo(document.body)
		.submit()
		.remove();
} 

function get($tar, params){
	var isOpenNew = $tar.attr('target') == '_blank';

	// 对s要做编码，以兼容s值不正常的情况
	var url = $tar.attr('href');// + '?s=' + encodeURIComponent(s);

    url += (url.indexOf('?')<0 ? '?' : '&');
    url += params.join('&');

	if(isOpenNew){
		window.open(url);
	}else{ 
		window.location = url;
	}
		
}

function init(){
	bindEvent();
}

function bindEvent(){
	$(document.body).on('click', 'a[data-item-st]', function(e){
		var $tar = $(this);

		var params = getParams($tar);

		if(params && params.length>0){

			e.preventDefault();

			if(usePost){

				post($tar, params);

			}else{ 

				get($tar, params);

			}
		}
	});
}

function getParams($tar){
	var param = $tar.data('item-st'),
        paramList=[];
	if(param){
		if(typeof param == 'string'){
			//s = param;
            paramList.push("s="+(usePost ? param : encodeURIComponent(param)) );

		}else if($.isPlainObject(param)){
            for(var item in param){
				if(param[item]!=''){
					paramList.push([
						item,
						usePost ? param[item] : encodeURIComponent(param[item])
					].join('=') );
				}
            }
			//s = param.s;
		}
	}
	return paramList;
}

module.exports = {
	init : init
};