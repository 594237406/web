var ftitAppModule = angular.module('app', [ 'infinite-scroll' ]);

ftitAppModule.controller('PostListController', function($scope, Demo) {
	$scope.demo = new Demo();
});

// 创建后台数据交互工厂
ftitAppModule.factory('Demo', function($http) {
	var Demo = function() {
		this.items = [{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},
		              {name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},
		              {name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},
		              {name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},
		              {name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},
		              {name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"},{name:"a"}];
		this.busy = false;
		this.page = 0;
	};

	Demo.prototype.nextPage = function() {
		console.log(this.page)
		if (this.busy)
			return;
		this.busy = true;
		var items = [{name:'zhangsan'},{name:'lisi'},{name:'wangwu'}];
		for ( var i = 0; i < items.length; i++) {
			this.items.push(items[i]);
		}
		this.busy = false;
		this.page += 1;
	};

	return Demo;
});