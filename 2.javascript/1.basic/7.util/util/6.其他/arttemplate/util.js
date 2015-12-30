document.getElementById=(function(func){
    return function(){
        return func.apply(document,arguments)
    };
})(document.getElementById);

var _a={
    slice:Array.prototype.slice,
    shift:Array.prototype.shift,
    concat:Array.prototype.concat
};

var _u = {
    id:document.getElementById,
    ex: function (Parent, Expand) {
        var Child = function () {
            Parent.call(this);
        };
        Child.prototype = new Parent();

        this.mix(Child.prototype, Expand);

        Child.prototype.constructor = Child;
        return Child;
    },

    mix: function () {       
        var t=_a.shift.call(arguments);
        var s=_a.shift.call(arguments);  

        var keys=Object.keys;
        var allkeys=_a.concat.call(keys.call(null,t),keys.call(null,s));

        var r={};

        for(var i=0,item;item=allkeys[i++];){         
            r[item] = s[item]||t[item];      
        }
        return r;
    },

    isJSON : function (obj) {
        var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" 
            && !obj.length
        return isjson;
    },


    tmpl:function (str,data,regexp){
        return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
            return (data[name] === undefined) ? '' : data[name];
        });
    }   
};

