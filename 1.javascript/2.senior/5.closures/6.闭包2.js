//闭包:是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数


//匿名函数会将A函数的活动对象添加到它的作用域链中。因此，在A函数内部定义的匿名函数的作用域链中，包含A函数的活动对象。
//compare初始化时，它的作用域链被初始化为包含A函数的活动对象和全局变量对象（关系图见闭包作用域关系图.png）。这样，
//匿名函数就可以访问在A中定义的所有变量。
//更为重要的是，A函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。换句话说，当A函数返回后，其执行环境的作用域链会被销毁，
//但它的活动对象仍然会留在内存中；直到匿名函数被销毁后，A的活动对象才会被销毁

function A(key) {
	return function(o1, o2) {
		var val1 = o1[key];
		var val2 = o2[key];
		if (val1 < val2) {
			return -1;
		} else if (val1 > val2) {
			return 1;
		} else {
			return 0;
		}
	};
}

//所以，匿名函数可以访问key=name的json属性
var compare = A("name");
var result = compare({ name: "Nicholas" }, { name: "Greg" });



//正确使用闭包的方法
//创建函数
var compareNames = A("name");
//调用函数
var result2 = compareNames({ name: "Nicholas" }, { name: "Greg" });
//解除对匿名函数的引用（以便释放内存）
compareNames = null;
