requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

requirejs(['jquery', 'app/sub'],
function   ($, sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
	alert(sub.sub(1,2));
});