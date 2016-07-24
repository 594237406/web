#angular
MVVM
模块化
自动化双向数据绑定
语义化标签 指令
依赖注入
#MVC
model view control
模型   视图  控制器
- 代码规模越来越大，切分职责
- 为了复用
- 重构方便 
##控制器controller
- 不要试图利用controller 一个控制器只管理一个视图， 需要公用的数据用service
- 不要在controller里操作DOM 指令
- 不要在controller里做数据格式化 过滤器 实现数据过滤和格式化
- 控制器之间不会互相调用 事件机制
#视图
通过HTML标签实现
#scope模型
- $scope 是一个简单的空对象
- $scope提供了一些工具方法 $watch $apply
- $scope 就是作用域
- $scope是一个树型结构 与DOM标签 平行
- 每个 angular应用都有一个根作用域
- $scope可以传播 事件 可以向下也可以下上
- $scope是双向数据绑定的基础
##双向数据绑定
##表单验证
###ng验证样式
ng-valid 表单合法
ng-invalid 表单不合法
ng-pristine 表单未被污染过
ng-dirty 表单已经被污染了
###验证规则
require minlength maxlength email
##表单的验证属性
属性名 样式 描述
$valid ng-valid 当验证通过时为true
$invalid ng-invalid 当验证不通过时为true
$pristine  ng-pristine        未填写为true
$dirty     ng-dirty             填写后为true
###如何访问表单和元素的属性
formName.property
formName.input.property

##指令
1. 就是封装DOM，封闭一个组件
2. 为现有的DOM元素增强功能
###link
在模型和视图之间建立关联，注册监听 ，增加样式
###compile
对指令的模板进行转换
这里不能操作$scope
如果实现了compile,link就失效了


