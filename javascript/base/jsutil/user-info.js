/**
 * @file 负责显示登陆相关功能
 * @author zhengyongjian@baidu.com
 * @version 1.0.0
 * @date 2014-06-09
 */

(function(self) {
    var util = require('taskschedule-ui:static/js/util.js'),
        host = location.host,
        userInfoUrl = 'http://' + host + '/scheduler/getUserInfo',
        options = {
            url: userInfoUrl,
            type: "GET",
            dataType: "json",
            doSuccess: getUserInfoSuccess
        },
        $adminop = $("#navs #adminop");

    util.ajax(options);

    function getUserInfoSuccess(result) {
        var $userName = $(".header .user-info .user-name");
        var name = result.data && result.data.username || "";
        $userName.html(name);

        if (result.data.isadmin) {
            $adminop.show();
        }
    }
})(this);