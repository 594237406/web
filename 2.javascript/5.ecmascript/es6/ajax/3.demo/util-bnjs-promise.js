
define(function (require, exports, module) {

    var shift=[].shift,asynExecute = function(callback){
        var promise=new Promise(function(resolve, reject) {
            if(typeof callback!='function'){
                return ;
            }else{
                callback(resolve);
            }
        });
        return promise;
    };

    var UTIL_BNJS={
        init:function(callback){
            asynExecute(function(){
                var resolve=[].shift.call(arguments);
                if (window.BNJS && window.BNJS._isAllReady) {
                    resolve();
                }else{
                    document.addEventListener('BNJSReady', function () {
                        resolve();
                    }, false);
                }
            }).then(function(){
                return asynExecute(function(){
                    var resolve=shift.call(arguments);
                    BNJS.page.getData(function () {
                        resolve.call(this,shift.call(arguments));
                    });
                });
            }).then(function(){
                if(typeof callback!='function'){
                    return ;
                }else{
                    callback.call(this,shift.call(arguments));
                }
            });
        }
    };

    module.exports = {
        init:UTIL_BNJS.init
    };
});