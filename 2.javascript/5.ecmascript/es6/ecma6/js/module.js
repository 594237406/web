//使用export命令定义了模块的对外接口以后，
// 其他JS文件就可以通过import命令加载这个模块（文件）。

import {firstName, lastName, year} from './export';

console.log(firstName, lastName, year);