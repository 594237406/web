/**
 * Created by lihongji on 2016/1/11.
 */

var _=require("./lodash.min");


console.log(_.assign({ 'a': 1 }, { 'b': 2 }, { 'c': 3 }));
console.log(_.map([1, 2, 3], function(n) { return n * 3; }));