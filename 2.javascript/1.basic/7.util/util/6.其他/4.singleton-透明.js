
/**
 * Created by lihongji on 2015/9/24.
 */

var Singleton = (function () {
    var instance;

    function Singleton(html) {
        this.html=html;
        if (instance){
           return instance;
        }
        this.init();
        return instance=this;
    }

    Singleton.prototype.init=function(){
        var div=document.createElement("div");
        div.innerHTML=this.html;
        document.body.appendChild(div);
    };
    return Singleton;
})();

var a=new Singleton("a");
var b=new Singleton("b");

console.log(a==b);