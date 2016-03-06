//1.。闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数，仍以前面的
//createComparisonFunction()函数为例，注意加粗的代码。

function createComparisonFunction(propertyName) {
	return function(object1, object2) {
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if (value1 < value2) {
			return -1;
		} else if (value1 > value2) {
			return 1;
		} else {
			return 0;
		}
	};
}

//在这个例子中，突出的那两行代码是内部函数（一个匿名函数）中的代码，这两行代码访问了外部
//函数中的变量propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可
//以访问变量propertyName。之所以还能够访问这个变量，是因为内部函数的作用域链中包含
//createComparisonFunction()的作用域
