/**
 * Created by lihongji on 2015/8/1.
 */

$(function(){

    $("div")[0].addEventListener("click",function(){alert(1);},false);
    console.log(getEventListeners($("div")[0]));
})


