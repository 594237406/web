//ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
var s = new Set();

[2,3,5,4,5,2,2].map(x => s.add(x))

for (let i of s) {console.log(i)}