//ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
//块级作用域可以随意嵌套，内层可以声明和外层同名变量，但是同层会报错，下面会演示
{
    let a = 10;
    var b = 1;
}
console.log(typeof a,b);

//for循环的计数器，就很合适使用let命令。
let arr=[1,2,3];
for(let i = 0; i < arr.length; i++){
    console.log(i)
}


//测试一下延迟,把var换成let试试看
for(let i = 0; i < 10; i++){
    setTimeout(function(){
        console.log(i);
    },100);
}

//不存在变量提升
console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError，在不支持let的浏览器里不报错（编译成var）

var foo = 2;
let bar = 2;


//暂时性死区
var tmp = 123;
if (true) {
    console.log(tmp='abc');    // ReferenceError,在不支持let的浏览器里不报错（编译成var）
    let tmp;
}


//不允许重复声明
// 打开注释，编译报错
function a() {
    let a = 10;
//    var a = 1;
}

// 打开注释，编译报错
function b() {
    let a = 10;
//    let a = 1;
}


//const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变。
const PI = 3.1415;
console.log(PI);
//打开注释，编译报错
//console.log(PI = 3);


const array = [];
array.push("Hello"); // 可执行
array.length = 0;    // 可执行
// 打开注释，编译报错
//array = ["Dave"];