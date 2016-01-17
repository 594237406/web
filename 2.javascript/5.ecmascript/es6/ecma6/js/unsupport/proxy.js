//目前版本浏览器无法支持
var person = {
    name: "张三"
};

var proxy = new Proxy(person, {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new ReferenceError("Property \"" + property + "\" does not exist.");
        }
    }
});

proxy.name // "张三"
proxy.age // 抛出一个错误