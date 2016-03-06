var Util={

}

//扩展Object的keys属性，防止IE bug
Object.keys = Object.keys || function(obj){
	var a=[];
	for(a[a.length] in obj);
	return a;	
}