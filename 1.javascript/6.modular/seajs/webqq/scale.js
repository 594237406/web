define(function(require, exports,module){
	
	function scale(value,max,min){
		if(value>max){
			return max;
		}else if(value<min){
			return min;
		}else{
			return value;
		}
	}
	
	exports.scale=scale;
	
});