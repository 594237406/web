onmessage=function(ev){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json");
    xhr.onload = function(){
        postMessage(ev.data+xhr.responseText);
    };
    xhr.send();
};