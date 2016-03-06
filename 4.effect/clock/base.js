function $(obj){
	if(typeof obj=="function"){
		window.onload=obj;
	}else if(typeof obj=="string"){
		return document.getElementById(obj);
	}else if( typeof obj=="object" ){
		return obj;
	}
	
}

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle( obj )[attr];
}

function doMove(obj,attr,dir,target,endFn){   //endFn   回调函数
    clearInterval( obj.timer );
    dir=parseInt( getStyle( obj,attr ) )<target?dir:-dir;
    obj.timer=setInterval( function (){
        var speed=parseInt(getStyle(obj,attr))+dir;
        if( speed>target&&dir>0||speed<target&&dir<0 ){
            speed=target;
        } 
        obj.style[attr]=speed+"px";
        if( speed==target ){
            clearInterval( obj.timer );
            if( endFn ){
                endFn();
            }
        }
    },200 );
}


function opacity(obj,step,target,endFn){
	clearInterval(obj.timer1);
	step=parseFloat( getStyle( obj,"opacity" ) )*100<target?step:-step;
	//alert(step);
	obj.timer1=setInterval( function (){
		var speed=parseFloat(getStyle(obj,"opacity"))*100+step;
		if(speed>target&&step>0||speed<target&&step<0){
			speed=target;
		}
		obj.style.opacity=speed/100;
		if( speed==target ){
            clearInterval( obj.timer1 );
            if( endFn ){
                endFn();
            }
        }
	},60 )
}
function shake( obj,dir,endFn ){
	if( obj.onOff ){return;}
	obj.onOff=true;
    var _this=obj;
    var arr=[];
    var num=0;
    var len=20;
    for( var i=20;i>0;i-=2 ){
        arr.push( i,-i );
    }
    arr.push(0);
    var pos =parseInt( getStyle( _this,dir ));
    clearInterval( _this.shake );
    _this.shake=setInterval(function (){
        _this.style[dir]=pos+arr[num]+"px";
        num++;
        if( num==len ){
            clearInterval( _this.shake );
            endFn&&endFn();
            obj.onOff=false;
        }
    },100);
}