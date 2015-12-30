{%* 
* 整站需要的初始化脚本，可以放到这里，在页面顶部	
* 2014-11-10
*%}

<script type="text/javascript">
    F.context({
    	"channel" : "{%$data.channel%}",
    	"channel_content" : "{%$data.channel_content%}",
    	"da_page" : "{%$data.page%}",
    	"nuomi_base" : "{%"nuomi_base"|genUrl%}",
    	"logout_nuomi" : "{%"logout"|genUrl%}",
    	"baid_uss_url" : "{%"get_baiduss"|genUrl%}",
    	"logout_baidu" : "{%"logout_baidu"|genUrl%}",
    	"xll" : "{%$data.testFlag%}",
        "xll_meishi" : "{%$data.smallflow.fl0001%}",
    	"loginTest" : "{%$data.login_test%}",
        "passport_base" : "{%"passport_base"|genUrl%}",
        "nuomi_old_base" : "{%"nuomi_old_base"|genUrl%}",
        "passport_reg" : "{%"passport_reg"|genUrl%}"
    });

</script>