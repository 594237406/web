var count=0,timer=setInterval(function() {
    if(count>=3){
        clearInterval(timer);
        timer=null;
    }else{
        count++;
        postMessage(new Date());
    }
}, 1000);