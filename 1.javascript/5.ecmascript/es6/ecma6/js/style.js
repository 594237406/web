//立即执行函数
(() => {
    console.log('Welcome to the Internet.');
})();

//(x)代表函数声明，()可以省略，{}代表函数体
var map=[1, 2, 3].map(x => {
    return x * x;
});

console.log(map);
//{}可以省略，直接使用以下写法
console.log([1, 2, 3].map((x,y) => x * y));

//函数定义
var method = function(a,b,c) {
    console.log(this,a,b,c);
};

//箭头函数取代Function.prototype.bind，不应再用self/_this/that绑定 this。
var testMethod = (...params) =>method.apply({}, params);
testMethod(1,2,3);


