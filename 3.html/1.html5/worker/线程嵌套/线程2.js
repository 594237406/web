onmessage=function(ev){
    postMessage(ev.data+",子线程2数据");
};