/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//使用export命令定义了模块的对外接口以后，
	// 其他JS文件就可以通过import命令加载这个模块（文件）。

	'use strict';

	var _export = __webpack_require__(2);

	console.log(_export.firstName, _export.lastName, _export.year);

/***/ },
/* 2 */
/***/ function(module, exports) {

	//一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，
	//就必须使用export关键字输出该变量。下面是一个JS文件，里面使用export命令输出变量。
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var firstName = 'Michael';
	exports.firstName = firstName;
	var lastName = 'Jackson';
	exports.lastName = lastName;
	var year = 1958;
	exports.year = year;

/***/ }
/******/ ]);