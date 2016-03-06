###线程中需要注意的事
1. Web Worker无法访问DOM节点
1. Web Worker无法访问全局变量或是全局函数
1. Web Worker无法调用alert()或者confirm之类的函数
1. Web Worker无法访问window、document之类的浏览器全局变量

###常用事件

message:接受到消息
error:捕捉错误信息

###worker对象常用方法
terminate:终止worker工作
postMessage:发送数据