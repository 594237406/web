/**
 * Created by lihongji on 2015/9/25.
 */

function ClickHandler(){
   console.log(1);
   return {};
}

var Singleton=(function(){
    var login;
    return function(fn){
        return login||(login=fn.apply(this,arguments));
    }
})();


function Click(){
    Singleton(ClickHandler);        //模拟jq:once事件
    //ClickHandler();
}


