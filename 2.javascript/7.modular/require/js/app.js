//定义模块基础路径以及自定义路径
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

requirejs(['jquery', 'app/sub'],
function   ($, sub) {
	alert(sub.sub(1,2));
});