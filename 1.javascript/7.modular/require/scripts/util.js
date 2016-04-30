//方式1：amd写法
//define(["./add"],function (add){
//    return {
//        add:function(){
//            return add(1,2);
//        }
//    };
//});

//方式2：cmd写法
define( function( require, exports, module){
    var add = require('./add');
    var hello=require('./hello');

    exports.add = function(a,b){
        hello();
        return add(a,b);
    };
} );