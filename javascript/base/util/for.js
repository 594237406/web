//要跨浏览器遍历某元素的所有子元素，需要像下面这样写代码。
var i, len, child = element.firstChild;
while (child != element.lastChild) {
	if (child.nodeType == 1) { // 检查是不是元素
		processChild(child);
	}
	child = child.nextSibling;
}
// 而使用 Element Traversal 新增的元素，代码会更简洁。
var i, len, child = element.firstElementChild;
while (child != element.lastElementChild) {
	processChild(child); // 已知其是元素
	child = child.nextElementSibling;
}