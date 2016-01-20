
define(function (require, exports, module) {

    var shift=[].shift,
        handler={
            ready:function(){
                if (window.BNJS && window.BNJS._isAllReady) {
                    this.resolve();
                }else{
                    document.addEventListener('BNJSReady', function () {
                        this.resolve();
                    }.bind(this), false);
                }
                return this.promise();
            },
            params:function(){
                BNJS.page.getData(function () {
                    this.resolve(shift.call(arguments));
                }.bind(this));
                return this.promise();
            }
        };

    var UTIL_BNJS={
        init:function(callback){
            if(typeof callback!='function'){
                return;
            }
            $.when(handler.ready.call($.Deferred())).
              then(function(){
                return $.when(handler.params.call($.Deferred()))
              }).
              then(function(){
                callback.call(this,shift.call(arguments));
            })
        }
    };

    module.exports = {
        init:UTIL_BNJS.init
    };
});