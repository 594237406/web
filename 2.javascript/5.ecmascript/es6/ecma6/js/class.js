//function Point(x,y){
//    this.x = x;
//    this.y = y;
//}
//
//Point.prototype.toString = function () {
//    return '(' + this.x + ', ' + this.y + ')';
//}
//

import mix from "./maxin.js";

console.log(mix)

//定义类
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
    //构造方法
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: '+value);
    }
    //静态方法
    static classMethod() {
        return 'hello';
    }
}

Object.assign(Point.prototype, {       //子类获取不到
    a(){
        return "x";
    },
    b(){
        return "y";
    }
})

Point.prototype.c=function(){}

var point=new Point(1,2);

console.log(point.toString());
console.log(point.a());
console.log(point.b());

console.log(Point.prototype.constructor === Point );

//另外，类的内部所有定义的方法，都是不可枚举的（enumerable）。

console.log(Object.keys(Point.prototype));    //只能获取到可枚举的属性
// ["a","b"]
console.log(Object.getOwnPropertyNames(Point.prototype));      //可以获取到自身所有属性
// ["constructor","toString"]


//与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
point.prop=123;
console.log(point.prop);


//Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多
class ColorPoint extends Point {

    constructor(x,y,color) {
        super(arguments); // 调用父类的constructor(x, y) ,如果子类没有定义constructor方法，这个方法会被默认添加
        this.color = color;
    }

    toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }

}

let cp = new ColorPoint(25, 8, 'green');

console.log(cp instanceof ColorPoint); // true
console.log(cp instanceof Point); // true

console.log(ColorPoint.__proto__ === Point); // true
console.log(ColorPoint.prototype.__proto__ === Point.prototype); // true


class Point1{
    test(){
      return "point1";
    }
}

class NewPoint extends mix(Point, Point1) {
    // ...
}
var newPoint=new NewPoint();
console.log(newPoint.test());