var [a, b, c] = [1, 2, 3];
console.log (a,b,c)


let [foo, [[bar], baz]] = [1, [[2], 3]];
//foo // 1
//bar // 2
//baz // 3

let [ , , third] = ["foo", "bar", "baz"];
//third // "baz"

let [x, , y] = [1, 2, 3];
//x // 1
//y // 3

let [head, ...tail] = [1, 2, 3, 4];
//head // 1
//tail // [2, 3, 4]

let [l, m, ...n] = ['a'];
//l // "a"
//m // undefined
//ns // []

console.log(foo,bar,baz,third,x,y,head,tail,l,m,n)