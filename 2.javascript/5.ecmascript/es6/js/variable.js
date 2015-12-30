/**
 * Created by lihongji on 2015/8/26.
 */

"use strict";

var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }

    return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
})();

var a = 1;
var b = 2;
var c = 3;
var d = 1;
var e = [2, 3];
var f = 4;

var _ref = new Set([{a:1}, "b", "c"]);

var _ref2 = _slicedToArray(_ref, 3);

var h = _ref2[0];
var i = _ref2[1];
var j = _ref2[2];


_ref;