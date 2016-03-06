;(function() {
	var Util = {
		extend : function(r, s) {
			for ( var k in s) {
				if (s.hasOwnProperty(k)) {
					if(this.isJson(s[k])){
						for(var i in s[k]){
							if(!r[k])r[k]={};
							r[k][i]=s[k][i];
						}
						
					}else{
						r[k] = s[k];
					}
					
				}
			}
		},
		
		isJson:function(obj){
            var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length
            return isjson;
        },
		
		isNullArray : function (a){
			if(!(a instanceof Array))
			try{
				a=Array.prototype.slice.call(a);
			}catch(e){
				alert("传入参数不能转化成数组");
				return ;
			}
			
			return !a||!a.length;
		},
		
		contains:function (refNode, otherNode) {
		    if (typeof refNode.contains === "function" ) {
		        return refNode.contains(otherNode);
		    } else if (typeof refNode.compareDocumentPosition == "function") {
		        return !! (refNode.compareDocumentPosition(otherNode) & 16);
		    } else {
		        var node = otherNode.parentNode;
		        do {
		            if (node === refNode) {
		                return true;
		            } else {
		                node = node.parentNode;
		            }
		        } while ( node !== null );
		        return false;
		    }
		}
	};

	window._U = Util;
})();





