
//传递window:以防函数内通过作用域链查找外部window,这么做效率会很高。第二个优点是便于压缩，压缩版本可以通过修改参数名定义window
//传递undefined:undefined是window下面的属性，在IE老版本会被修改，在新版本不会被修改。为了防止内部使用undefined的值被外部修改，所以
//传递undefined参数
(function(window,undefined){
	//严格模式(很多不规范写法会报错，不推荐使用，在asp.net跟踪有bug，firefox会出现假死状态)
	//"use strict";
	var 
	rootjQuery,			//便于压缩与理解
	
	readyList,			//dom延迟加载
	
	core_strundefined = typeof undefined,		//用来判断元素是否为undefined,typeof a=='undefined'，支持IE9

	location = window.location,					//利于压缩
	document = window.document,					//利于压缩
	docElem = document.documentElement,			//利于压缩：html标签

	_jQuery = window.jQuery,					//防止冲突

	_$ = window.$,								//防止冲突

	class2type = {},							//类型判断使用

	//弃用
	core_deletedIds = [],
	
	core_version = "2.0.3",	//版本

	// 已弃用
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,
	
	jQuery=function(selector, context ){
		return new jQuery.fn.init(selector, context,rootjQuery);
	};
	
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,		//匹配数字

	core_rnotwhite = /\S+/g,										//匹配空格，用于截取单词 

	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,				//查找标签，带ID，防止xss注入

	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,						//匹配单标签

	rmsPrefix = /^-ms-/,											//IE前缀匹配
	rdashAlpha = /-([\da-z])/gi,									//转驼峰匹配-字母，如margin-top匹配-t，会把-t转成T

	fcamelCase = function( all, letter ) {							//转驼峰回调函数
		return letter.toUpperCase();
	},

	completed = function() {										//页面dom元素加载成功回调
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};
	
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,		// The current version of jQuery being used
		//selector:选择器，context：上下文，如：$("li","ul"):寻找ul下面的li
		init: function(selector, context,rootjQuery) {
			var match, elem;

			if ( !selector ) {						//如果传"",null,undefined,false
				return this;
			}
			
			// Handle HTML strings
			if ( typeof selector === "string" ) {	//如果传入string
				if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
//					$('<li>')   $('<li>1</li><li>2</li>')
//					match = [ null, '<li>', null ];
//					match = [ null, '<li>1</li><li>2</li>', null ];
					
					match = [ null, selector, null ];

				} else {
//					$('#div1') $('.box') $('div')  $('#div1 div.box')
//					$('<li>hello')
//					match = null;  //$('.box') $('div')  $('#div1 div.box')
//					match = ['#div1',null,'div1'];  //$('#div1')
//					match = ['<li>hello','<li>',null];  //$('<li>hello')
					
					match = rquickExpr.exec( selector );
				}
				
				if ( match && (match[1] || !context) ) {		//HTML标签，(非class选择器,复杂选择器,标签选择器或者父节点不为空)
					if ( match[1] ) {			//标签
						context = context instanceof jQuery ? context[0] : context;		//如果第二个参数是 $(document)

						// scripts is true for back-compat
						jQuery.merge( this, jQuery.parseHTML(							//parseHTML把<li></li><li></li>拆分成数组，merge把当前jq对象与数组合并，保证能有length属性
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)，例如：$("<li>",{title:'li',html:'aaaaa'});
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {		//如果是单标签，并且context是json或者Object对象
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {							//如果json属性是function,如html方法,则执行方法
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {															//如果是属性，把属性附在元素上
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					} else {			//ID选择符
						elem = document.getElementById( match[2] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {	//如果传入 dom元素
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {	//如果传入方法
				return rootjQuery.ready( selector );
			}

			if ( selector.selector !== undefined ) {		//如果选择器下有选择器
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		},
		
		load: function(){
			alert(1);
		}
	};
	
	//jQuery构造函数的fn等于jQuery的原型对象，原型对象的方法load，既在jQuery.fn.init构造函数的原型对象上，所以
	//jQuery()=$()=new jQuery.fn.init(selector, context,rootjQuery) 既有load方法
	jQuery.fn.init.prototype = jQuery.fn;
	
	
	if ( typeof window === "object" && typeof window.document === "object" ) {
		window.jQuery = window.$ = jQuery;
	} 
})(window,undefined);

$().load();

//alert($().a)