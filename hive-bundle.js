/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./hive.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./board.js":
/*!******************!*\
  !*** ./board.js ***!
  \******************/
/*! exports provided: Hex, Cube, Space, Hand */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hex\", function() { return Hex; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cube\", function() { return Cube; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Space\", function() { return Space; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hand\", function() { return Hand; });\n/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ \"./node_modules/core-js/modules/es7.symbol.async-iterator.js\");\n/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.function.name */ \"./node_modules/core-js/modules/es6.function.name.js\");\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es6_string_repeat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.string.repeat */ \"./node_modules/core-js/modules/es6.string.repeat.js\");\n/* harmony import */ var core_js_modules_es6_string_repeat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_repeat__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.regexp.to-string */ \"./node_modules/core-js/modules/es6.regexp.to-string.js\");\n/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ \"./node_modules/core-js/modules/es6.object.to-string.js\");\n/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es6.array.find */ \"./node_modules/core-js/modules/es6.array.find.js\");\n/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es6.string.iterator */ \"./node_modules/core-js/modules/es6.string.iterator.js\");\n/* harmony import */ var core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_iterator__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es6.array.from */ \"./node_modules/core-js/modules/es6.array.from.js\");\n/* harmony import */ var core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_from__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var core_js_modules_es6_math_sign__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es6.math.sign */ \"./node_modules/core-js/modules/es6.math.sign.js\");\n/* harmony import */ var core_js_modules_es6_math_sign__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_math_sign__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./common.js */ \"./common.js\");\n\n\n\n\n\n\n\n\n\n\n\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n // Axial coordinates\n\nvar Hex =\n/*#__PURE__*/\nfunction () {\n  function Hex(q, r) {\n    _classCallCheck(this, Hex);\n\n    this.q = q;\n    this.r = r;\n  }\n\n  _createClass(Hex, [{\n    key: \"toCube\",\n    value: function toCube() {\n      return new Cube(this.q, this.r, -this.q - this.r);\n    }\n  }, {\n    key: \"round\",\n    value: function round() {\n      return this.toCube().round().toHex();\n    }\n  }, {\n    key: \"add\",\n    value: function add(_ref) {\n      var q = _ref.q,\n          r = _ref.r;\n      return new Hex(this.q + q, this.r + r);\n    }\n  }, {\n    key: \"sub\",\n    value: function sub(_ref2) {\n      var q = _ref2.q,\n          r = _ref2.r;\n      return new Hex(this.q - q, this.r - r);\n    }\n  }, {\n    key: \"eq\",\n    value: function eq(_ref3) {\n      var q = _ref3.q,\n          r = _ref3.r;\n      return this.q === q && this.r === r;\n    }\n  }, {\n    key: \"scale\",\n    value: function scale(n) {\n      return new Hex(this.q * n, this.r * n);\n    }\n  }, {\n    key: \"revert\",\n    value: function revert() {\n      return this.scale(-1);\n    }\n  }, {\n    key: \"rotate\",\n    value: function rotate(n) {\n      return this.toCube().rotate(n).toHex();\n    }\n  }, {\n    key: \"distance\",\n    value: function distance(hex) {\n      return this.toCube().distance(hex.toCube());\n    }\n  }, {\n    key: \"directionTo\",\n    value: function directionTo(hex) {\n      return this.toCube().directionTo(hex.toCube()).toHex();\n    }\n  }, {\n    key: \"neighborhood\",\n    value: function neighborhood() {\n      var _this = this;\n\n      return Hex.directions.map(function (dir) {\n        return _this.add(dir);\n      });\n    }\n  }, {\n    key: \"toString\",\n    value: function toString() {\n      return \"\".concat(this.q, \";\").concat(this.r);\n    }\n  }]);\n\n  return Hex;\n}();\nHex.directions = [new Hex(+1, 0), new Hex(+1, -1), new Hex(0, -1), new Hex(-1, 0), new Hex(-1, +1), new Hex(0, +1)]; // Cubic coordinates\n\nvar Cube =\n/*#__PURE__*/\nfunction () {\n  function Cube(x, y, z) {\n    _classCallCheck(this, Cube);\n\n    this.x = x;\n    this.y = y;\n    this.z = z;\n  }\n\n  _createClass(Cube, [{\n    key: \"round\",\n    value: function round() {\n      var rx = Math.round(this.x);\n      var ry = Math.round(this.y);\n      var rz = Math.round(this.z);\n      var dx = Math.abs(rx - this.x);\n      var dy = Math.abs(ry - this.y);\n      var dz = Math.abs(rz - this.z);\n\n      if (dx > dy && dx > dz) {\n        // ensure rx + ry + rz == 0\n        rx = -ry - rz;\n      } else if (dy > dz) {\n        ry = -rx - rz;\n      } else {\n        rz = -rx - ry;\n      }\n\n      return new Cube(rx, ry, rz);\n    }\n  }, {\n    key: \"toHex\",\n    value: function toHex() {\n      return new Hex(this.x, this.y);\n    }\n  }, {\n    key: \"add\",\n    value: function add(_ref4) {\n      var x = _ref4.x,\n          y = _ref4.y,\n          z = _ref4.z;\n      return new Cube(this.x + x, this.y + y, this.z + z);\n    }\n  }, {\n    key: \"sub\",\n    value: function sub(_ref5) {\n      var x = _ref5.x,\n          y = _ref5.y,\n          z = _ref5.z;\n      return new Cube(this.x - x, this.y - y, this.z - z);\n    }\n  }, {\n    key: \"eq\",\n    value: function eq(_ref6) {\n      var x = _ref6.x,\n          y = _ref6.y,\n          z = _ref6.z;\n      return this.x === x && this.y === y && this.z === z;\n    }\n  }, {\n    key: \"scale\",\n    value: function scale(n) {\n      return new Cube(this.x * n, this.y * n, this.z * n);\n    }\n  }, {\n    key: \"revert\",\n    value: function revert() {\n      return this.scale(-1);\n    }\n  }, {\n    key: \"rotate\",\n    value: function rotate(n) {\n      n %= 6;\n      n += 6;\n      n %= 6;\n      var c = this;\n\n      while (n--) {\n        c = new Cube(-c.z, -c.x, -c.y);\n      }\n\n      return c;\n    }\n  }, {\n    key: \"distance\",\n    value: function distance(_ref7) {\n      var x = _ref7.x,\n          y = _ref7.y,\n          z = _ref7.z;\n      return (Math.abs(this.x - x) + Math.abs(this.y - y) + Math.abs(this.z - z)) / 2;\n    }\n  }, {\n    key: \"directionTo\",\n    value: function directionTo(_ref8) {\n      var x = _ref8.x,\n          y = _ref8.y,\n          z = _ref8.z;\n      return new Cube(Math.sign(x - this.x), Math.sign(y - this.y), Math.sign(z - this.z));\n    }\n  }, {\n    key: \"neighborhood\",\n    value: function neighborhood() {\n      var _this2 = this;\n\n      return Cube.directions.map(function (dir) {\n        return _this2.add(dir);\n      });\n    }\n  }]);\n\n  return Cube;\n}();\nCube.directions = [new Cube(+1, -1, 0), new Cube(+1, 0, -1), new Cube(0, +1, -1), new Cube(-1, +1, 0), new Cube(-1, 0, +1), new Cube(0, -1, +1)]; // Space represent board-less plane for stones to be placed on\n// state os space is represented by internal grid, wich is 2d array of tiles\n\nvar Space =\n/*#__PURE__*/\nfunction () {\n  function Space(radius) {\n    _classCallCheck(this, Space);\n\n    var len = radius * 2 + 1;\n    this._stones = 0;\n    this._radius = radius;\n    this._grid = Array.from(Array(len), function (_, i) {\n      return Array.from(Array(len - Math.abs(radius - i)), function (_, j) {\n        return [];\n      } // tile itself si represented by array for stacking multiple stones\n      );\n    });\n  } // return tile of grid on given position or undefined if outside of grid\n\n\n  _createClass(Space, [{\n    key: \"at\",\n    value: function at(_ref9) {\n      var q = _ref9.q,\n          r = _ref9.r;\n\n      if (Math.abs(q) <= this._radius && Math.abs(r) <= this._radius) {\n        q += this._radius; // center is 0,0\n\n        r += this._radius;\n        return this._grid[r][q - Math.max(0, this._radius - r)];\n      }\n    }\n  }, {\n    key: \"atTop\",\n    value: function atTop(pos) {\n      var tile = this.at(pos);\n\n      if (tile && tile.length > 0) {\n        return tile[tile.length - 1];\n      }\n    }\n  }, {\n    key: \"findBug\",\n    value: function findBug(check) {\n      var _this3 = this;\n\n      return this.hivePositions().map(function (hex) {\n        return _this3.atTop(hex);\n      }).find(check);\n    }\n  }, {\n    key: \"each\",\n    value: function each(callback) {\n      var _this4 = this;\n\n      this._grid.forEach(function (row, i) {\n        row.forEach(function (tile, j) {\n          var r = i;\n          var q = j + Math.max(0, _this4._radius - i);\n          q -= _this4._radius; // center is 0,0\n\n          r -= _this4._radius;\n          callback(tile, new Hex(q, r));\n        });\n      });\n    }\n  }, {\n    key: \"putAt\",\n    value: function putAt(bug, dest) {\n      var tile = this.at(dest);\n\n      if (tile) {\n        var path = bug.pathTo(this, dest);\n        tile.push(bug);\n        var oldTile = this.at(bug.pos);\n\n        if (oldTile && oldTile.length) {\n          // moving\n          var b = oldTile.pop();\n\n          if (b !== bug) {\n            oldTile.push(b);\n            throw Error(\"Tried to move bug \".concat(bug.toString(), \" from tile \").concat(oldTile, \" but it is not is not ontop\"));\n          } // movement speed\n\n\n          bug.go(path, \"move\");\n        } else {\n          // placing\n          path = [bug.pos, dest];\n          bug.go(path, \"land\");\n          this._stones++;\n        }\n\n        if (!path) {\n          throw Error(\"No path found for bug (\".concat(bug, \") to get to tile (\").concat(tile, \") at dest (\").concat(dest, \")\"));\n        }\n      }\n    } // positions of all occupied tiles\n\n  }, {\n    key: \"hivePositions\",\n    value: function hivePositions() {\n      var positions = [];\n      this.each(function (tile, hex) {\n        if (tile.length > 0) {\n          positions.push(hex);\n        }\n      });\n      return positions;\n    } // positions of all tiles which has occupied neigbor tile\n\n  }, {\n    key: \"nextToHivePositions\",\n    value: function nextToHivePositions(except) {\n      var _this5 = this;\n\n      var positions = [];\n      this.each(function (tile, hex) {\n        if (_this5.isNextToHive(hex, except)) {\n          positions.push(hex);\n        }\n      });\n      return positions;\n    } // next to hive positions which does not lay next to enemy of given color\n\n  }, {\n    key: \"safeNextPositions\",\n    value: function safeNextPositions(color) {\n      var _this6 = this;\n\n      return this.nextToHivePositions().filter(function (hex) {\n        return hex.neighborhood().every(function (x) {\n          return !_this6.isEnemyOf(x, color);\n        });\n      });\n    } // return all surrounding on board positions of hex (all 6 except outside of space)\n\n  }, {\n    key: \"posOfSurroundings\",\n    value: function posOfSurroundings(hex) {\n      var _this7 = this;\n\n      return hex.neighborhood().filter(function (pos) {\n        return Boolean(_this7.at(pos));\n      });\n    } // positions of all occupied tiles which are in neighborhood of given pos\n\n  }, {\n    key: \"posOfNeighbors\",\n    value: function posOfNeighbors(hex, except) {\n      var _this8 = this;\n\n      return hex.neighborhood().filter(function (pos) {\n        var tile = _this8.at(pos);\n\n        return tile && tile.length > 0 && !(except && pos.eq(except));\n      });\n    } // positions of all empty (ongiven level) tiles wich are in neighborhood of given pos\n    // and is accesible without detaching from hive while moving\n    // (has one common neighbor or is on higher elevation)\n\n  }, {\n    key: \"posOfWays\",\n    value: function posOfWays(hex, except) {\n      var _this9 = this;\n\n      var elevation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n      return hex.neighborhood().filter(function (pos) {\n        var dir = hex.directionTo(pos);\n        var left = hex.add(dir.rotate(-1));\n        var right = hex.add(dir.rotate(+1));\n\n        var currentTile = _this9.at(hex);\n\n        var destTile = _this9.at(pos);\n\n        if (!currentTile || !destTile) {\n          return false;\n        }\n\n        if (destTile.length === elevation) {\n          // dest is empty (on that level)\n          // count empty side tiles\n          var emptySides = [left, right].filter(function (sidePos) {\n            var sideTile = _this9.at(sidePos);\n\n            if (!sideTile) {\n              return true; // outside of space is not a way but certainly is empty\n            }\n\n            return except && sidePos.eq(except) ? sideTile.length - 1 <= elevation : sideTile.length <= elevation;\n          }).length;\n\n          if (elevation === 0) {\n            return emptySides === 1; // exactly one of the two sides must be empty on ground\n          } else {\n            return emptySides >= 1; // dont need occupied side bug when on top\n          }\n        }\n      });\n    }\n  }, {\n    key: \"isEnemyOf\",\n    value: function isEnemyOf(hex, color) {\n      var topBug = this.atTop(hex);\n      return topBug && topBug.color !== color;\n    }\n  }, {\n    key: \"isNextToHive\",\n    value: function isNextToHive(hex, except) {\n      var _this10 = this;\n\n      // is empty but has occupied neighbor tile\n      return this.at(hex).length === 0 && hex.neighborhood().some(function (pos) {\n        var tile = _this10.at(pos);\n\n        return tile && tile.length > 0 && !(except && pos.eq(except));\n      });\n    } // returns true if bug on given position will break hive on removal\n\n  }, {\n    key: \"isHiveBridge\",\n    value: function isHiveBridge(hex) {\n      return this.articulations().some(function (cut) {\n        return cut.eq(hex);\n      });\n    } // Unbreakable 'core' of the hive\n\n  }, {\n    key: \"articulations\",\n    value: function articulations() {\n      var _this11 = this;\n\n      var hive = this.hivePositions();\n      var M = [];\n      var IN = {};\n      var LOW = {};\n      var T = 0;\n      var rootChilds = 0;\n\n      var dfs = function dfs(v, p) {\n        T++;\n        IN[v] = T;\n        LOW[v] = +Infinity;\n\n        _this11.posOfNeighbors(v).forEach(function (w) {\n          if (!IN[w]) {\n            // vw stromova hrana\n            dfs(w, v);\n\n            if (p) {\n              // non root\n              if (LOW[w] >= IN[v]) {\n                // v je artikulace\n                M.push(v);\n              }\n            } else {\n              // root\n              if (++rootChilds == 2) // pokud ma vice synu, tak je artikulaci \n                M.push(v);\n            }\n\n            LOW[v] = Math.min(LOW[v], LOW[w]);\n          } else if (!w.eq(p || {}) && IN[w] < IN[v]) {\n            // zpetna hrana\n            LOW[v] = Math.min(LOW[v], IN[w]);\n          }\n        });\n      };\n\n      if (hive.length) dfs(hive[0], undefined);\n      return M;\n    }\n  }, {\n    key: \"findPath\",\n    value: function findPath(start, goal) {\n      var _this12 = this;\n\n      // variation of A* algorithm\n      var frontier = new _common_js__WEBPACK_IMPORTED_MODULE_11__[\"PriorityQueue\"]();\n      var cameFrom = {};\n      var costSoFar = {};\n      frontier.push(start, 0);\n      cameFrom[start] = null;\n      costSoFar[start] = 0;\n\n      var _loop = function _loop() {\n        var current = frontier.pop();\n\n        if (current.eq(goal)) {\n          return \"break\";\n        }\n\n        _this12.posOfWays(current, start).forEach(function (next) {\n          var newCost = costSoFar[current] + 1 + _this12.posOfWays(next).length; // add cost (same for each edge)\n\n\n          if (!(next in costSoFar) || newCost < costSoFar[next]) {\n            costSoFar[next] = newCost;\n            var priority = newCost + next.distance(goal); // heuristic - use just distance from goal\n\n            frontier.push(next, priority);\n            cameFrom[next] = current;\n          }\n        });\n      };\n\n      while (frontier.len() > 0) {\n        var _ret = _loop();\n\n        if (_ret === \"break\") break;\n      } // assemble path from cameFrom\n\n\n      var path = null;\n\n      if (goal in cameFrom) {\n        path = [];\n        var current = goal;\n\n        do {\n          path.unshift(current);\n          current = cameFrom[current];\n        } while (current !== null);\n      }\n\n      return path;\n    } // returns array of hex position where bug of given color can land\n\n  }, {\n    key: \"possibleLandings\",\n    value: function possibleLandings(_ref10) {\n      var color = _ref10.color;\n\n      if (this._stones === 0) {\n        return [new Hex(0, 0)].concat(_toConsumableArray(Hex.directions));\n      }\n\n      if (this._stones === 1) {\n        return this.nextToHivePositions();\n      }\n\n      return this.safeNextPositions(color);\n    }\n  }, {\n    key: \"__randomLandingPos\",\n    value: function __randomLandingPos(color) {\n      var positions = this.possibleLandings({\n        color: color\n      });\n      return positions[Object(_common_js__WEBPACK_IMPORTED_MODULE_11__[\"rand\"])(positions.length)] || __randomBugPos(color);\n    }\n  }, {\n    key: \"__randomBugPos\",\n    value: function __randomBugPos(color) {\n      var _this13 = this;\n\n      var positions = this.hivePositions().filter(function (pos) {\n        return color === (_this13.atTop(pos) || {}).color;\n      }).filter(function (pos) {\n        return !_this13.isHiveBridge(pos) || _this13.at(pos).length > 1;\n      });\n      return positions[Object(_common_js__WEBPACK_IMPORTED_MODULE_11__[\"rand\"])(positions.length)] || new Hex(0, 0);\n    }\n  }, {\n    key: \"toString\",\n    value: function toString() {\n      var _this14 = this;\n\n      var str = '';\n      var clr;\n\n      this._grid.forEach(function (row, i) {\n        str += '  '.repeat(Math.abs(_this14._radius - i));\n        row.forEach(function (tile) {\n          var st = ' ';\n\n          if (tile.length) {\n            st = tile[0].constructor.name[0];\n            if (!clr) clr = tile[0].color;\n\n            if (tile[0].color === clr) {\n              st = st.toLowerCase();\n            }\n          }\n\n          str += \"(\".concat(st, \") \");\n        });\n        str += '\\n';\n      });\n\n      return str;\n    }\n  }]);\n\n  return Space;\n}();\n\nSpace.fromString = function (string) {\n  return new Space();\n}; // Hand represents storage of stones which are not placed yet.\n\n\nvar Hand =\n/*#__PURE__*/\nfunction () {\n  function Hand(bugs, revert) {\n    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n    _classCallCheck(this, Hand);\n\n    this._hand = _toConsumableArray(bugs);\n    bugs.forEach(function (bug, i) {\n      bug.pos = new Hex( // -5 + i,\n      // -3 -(i-i%2)/2 - i%2,\n      +8 - i, -7 + offset);\n\n      if (revert) {\n        bug.pos = bug.pos.revert();\n      }\n    });\n  }\n\n  _createClass(Hand, [{\n    key: \"findBug\",\n    value: function findBug(check) {\n      return this._hand.filter(Boolean).find(check);\n    } // remove bug from hand (if possible)\n\n  }, {\n    key: \"takeBug\",\n    value: function takeBug(bug) {\n      var _this15 = this;\n\n      this.each(function (b, i) {\n        if (b === bug) {\n          _this15._hand[i] = null;\n        }\n      });\n    }\n  }, {\n    key: \"__getRandomBugPos\",\n    value: function __getRandomBugPos() {\n      if (this.used() === 3 && this._hand.some(function (bug) {\n        return bug && bug.name === 'Queen';\n      })) {\n        return this._hand[0].pos; // queen must be used in 4th move\n      }\n\n      var indexes = this._hand.reduce(function (idxs, v, i) {\n        return v !== null ? [].concat(_toConsumableArray(idxs), [i]) : idxs;\n      }, []);\n\n      var i = indexes[Object(_common_js__WEBPACK_IMPORTED_MODULE_11__[\"rand\"])(indexes.length)];\n      return this._hand[i].pos;\n    }\n  }, {\n    key: \"isEmpty\",\n    value: function isEmpty() {\n      return !this._hand.some(function (bug) {\n        return bug !== null;\n      });\n    }\n  }, {\n    key: \"size\",\n    value: function size() {\n      return this._hand.filter(function (bug) {\n        return bug;\n      }).length;\n    }\n  }, {\n    key: \"used\",\n    value: function used() {\n      return this._hand.filter(function (bug) {\n        return bug === null;\n      }).length;\n    }\n  }, {\n    key: \"each\",\n    value: function each(callback) {\n      var _this16 = this;\n\n      this._hand.forEach(function (bug, i) {\n        return bug && callback(bug, i, _this16);\n      });\n    }\n  }]);\n\n  return Hand;\n}();\n\n//# sourceURL=webpack:///./board.js?");

/***/ }),

/***/ "./bugs.js":
/*!*****************!*\
  !*** ./bugs.js ***!
  \*****************/
/*! exports provided: Bug, Queen, Beatle, Grasshopper, Spider, Ant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Bug\", function() { return Bug; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Queen\", function() { return Queen; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Beatle\", function() { return Beatle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Grasshopper\", function() { return Grasshopper; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Spider\", function() { return Spider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Ant\", function() { return Ant; });\n/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ \"./node_modules/core-js/modules/es7.symbol.async-iterator.js\");\n/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.object.set-prototype-of */ \"./node_modules/core-js/modules/es6.object.set-prototype-of.js\");\n/* harmony import */ var core_js_modules_es6_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.array.find */ \"./node_modules/core-js/modules/es6.array.find.js\");\n/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.function.name */ \"./node_modules/core-js/modules/es6.function.name.js\");\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./board.js */ \"./board.js\");\n\n\n\n\n\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar Bug =\n/*#__PURE__*/\nfunction () {\n  function Bug(color) {\n    _classCallCheck(this, Bug);\n\n    this.name = this.constructor.name;\n    this.symbol = this.name[0];\n    this.color = color;\n    this.pos = null;\n    this.speed = 1;\n\n    this.ease = function (t) {\n      return t;\n    }; // linear\n\n  }\n\n  _createClass(Bug, [{\n    key: \"toString\",\n    value: function toString() {\n      return \"\".concat(this.color, \" \").concat(this.name, \": \").concat(this.pos);\n    }\n  }, {\n    key: \"reachablePlaces\",\n    value: function reachablePlaces(space) {\n      var _this = this;\n\n      return space.nextToHivePositions(this.pos).filter(function (pos) {\n        return _this.canGo(pos, space);\n      });\n    }\n  }, {\n    key: \"canGo\",\n    value: function canGo(hex, space) {\n      return Boolean(this.pathTo(space, hex));\n    }\n  }, {\n    key: \"pathTo\",\n    value: function pathTo(space, dest) {\n      if (this.canGo(dest, space)) {\n        return [this.pos, dest];\n      } else {\n        return null;\n      }\n    }\n  }, {\n    key: \"go\",\n    value: function go(path, moveType) {\n      this.pos = path[path.length - 1];\n      var ms = 0;\n\n      var ease = function ease(t) {\n        return t;\n      };\n\n      if (moveType === \"land\") {\n        ms = 250;\n      }\n\n      if (moveType === \"move\") {\n        ms = 200 / this.speed;\n        ease = this.ease;\n      }\n\n      this.animation = {\n        since: Date.now(),\n        path: path,\n        ms: ms,\n        ease: ease\n      };\n    }\n  }]);\n\n  return Bug;\n}(); // only one tile per turn\n\nvar Queen =\n/*#__PURE__*/\nfunction (_Bug) {\n  _inherits(Queen, _Bug);\n\n  function Queen() {\n    var _getPrototypeOf2;\n\n    var _this2;\n\n    _classCallCheck(this, Queen);\n\n    for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {\n      props[_key] = arguments[_key];\n    }\n\n    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Queen)).call.apply(_getPrototypeOf2, [this].concat(props)));\n    _this2.speed = 0.6;\n    _this2.symbol = '🐝';\n    return _this2;\n  }\n\n  _createClass(Queen, [{\n    key: \"canGo\",\n    value: function canGo(hex, space) {\n      return space.posOfWays(this.pos).find(function (pos) {\n        return pos.eq(hex);\n      });\n    }\n  }]);\n\n  return Queen;\n}(Bug); // only one tile per turn\n// can jump on top of other\n// can fit into slit (but only when descending)\n\nvar Beatle =\n/*#__PURE__*/\nfunction (_Bug2) {\n  _inherits(Beatle, _Bug2);\n\n  function Beatle() {\n    var _getPrototypeOf3;\n\n    var _this3;\n\n    _classCallCheck(this, Beatle);\n\n    for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n      props[_key2] = arguments[_key2];\n    }\n\n    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Beatle)).call.apply(_getPrototypeOf3, [this].concat(props)));\n    _this3.speed = 0.3;\n\n    _this3.ease = function (t) {\n      return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;\n    }; // in out quad\n\n\n    _this3.symbol = '🐞';\n    return _this3;\n  }\n\n  _createClass(Beatle, [{\n    key: \"reachablePlaces\",\n    value: function reachablePlaces(space) {\n      var _this4 = this;\n\n      return space.posOfSurroundings(this.pos).filter(function (p) {\n        return _this4.canGo(p, space);\n      });\n    }\n  }, {\n    key: \"canGo\",\n    value: function canGo(hex, space) {\n      var currentTile = space.at(this.pos);\n      var destTile = space.at(hex);\n\n      if (!currentTile || !destTile) {\n        return false;\n      }\n\n      var sameElevation = currentTile.length - 1 === destTile.length;\n\n      if (!sameElevation) {\n        return true; // can go to narrow spaces when changing elevation\n      } else {\n        return space.posOfWays(this.pos, this.pos, currentTile.length - 1).find(function (pos) {\n          return pos.eq(hex);\n        });\n      }\n    }\n  }]);\n\n  return Beatle;\n}(Bug); // has to jump over 1 or more bugs in line\n// can fit into slit\n\nvar Grasshopper =\n/*#__PURE__*/\nfunction (_Bug3) {\n  _inherits(Grasshopper, _Bug3);\n\n  function Grasshopper() {\n    var _getPrototypeOf4;\n\n    var _this5;\n\n    _classCallCheck(this, Grasshopper);\n\n    for (var _len3 = arguments.length, props = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n      props[_key3] = arguments[_key3];\n    }\n\n    _this5 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(Grasshopper)).call.apply(_getPrototypeOf4, [this].concat(props)));\n\n    _this5.ease = function (t) {\n      return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;\n    }; // in out cubic\n\n\n    _this5.speed = 2;\n    _this5.symbol = '🦗';\n    return _this5;\n  }\n\n  _createClass(Grasshopper, [{\n    key: \"pathTo\",\n    value: function pathTo(space, dest) {\n      var cPos = this.pos.toCube();\n      var cDest = dest.toCube();\n      var path = [];\n\n      if (cPos.x !== cDest.x && cPos.y !== cDest.y && cPos.z !== cDest.z) {\n        return null; // not in row\n      }\n\n      if (cPos.distance(cDest) <= 1) {\n        return null; // noone to jump over\n      }\n\n      var dir = cPos.directionTo(cDest);\n\n      for (var seg = cPos; !seg.eq(cDest); seg = seg.add(dir)) {\n        var tile = space.at(seg.toHex());\n\n        if (!tile || tile.length === 0) {\n          return null; // has gap\n        }\n\n        path.push(seg.toHex());\n      }\n\n      path.push(dest);\n      return path;\n    }\n  }]);\n\n  return Grasshopper;\n}(Bug); // exactly 3 spaces per turn, no backtracks\n\nvar Spider =\n/*#__PURE__*/\nfunction (_Bug4) {\n  _inherits(Spider, _Bug4);\n\n  function Spider() {\n    var _getPrototypeOf5;\n\n    var _this6;\n\n    _classCallCheck(this, Spider);\n\n    for (var _len4 = arguments.length, props = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {\n      props[_key4] = arguments[_key4];\n    }\n\n    _this6 = _possibleConstructorReturn(this, (_getPrototypeOf5 = _getPrototypeOf(Spider)).call.apply(_getPrototypeOf5, [this].concat(props)));\n\n    _this6.ease = function (t) {\n      return t;\n    }; // linear\n\n\n    _this6.speed = 1.2;\n    _this6.symbol = '🕷️';\n    return _this6;\n  }\n\n  _createClass(Spider, [{\n    key: \"pathTo\",\n    value: function pathTo(space, dest) {\n      var path = space.findPath(this.pos, dest);\n\n      if (path && path.length - 1 === 3) {\n        return path;\n      }\n\n      return null;\n    }\n  }]);\n\n  return Spider;\n}(Bug); // anywhere\n\nvar Ant =\n/*#__PURE__*/\nfunction (_Bug5) {\n  _inherits(Ant, _Bug5);\n\n  function Ant() {\n    var _getPrototypeOf6;\n\n    var _this7;\n\n    _classCallCheck(this, Ant);\n\n    for (var _len5 = arguments.length, props = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {\n      props[_key5] = arguments[_key5];\n    }\n\n    _this7 = _possibleConstructorReturn(this, (_getPrototypeOf6 = _getPrototypeOf(Ant)).call.apply(_getPrototypeOf6, [this].concat(props)));\n\n    _this7.ease = function (t) {\n      return t;\n    }; // linear\n\n\n    _this7.speed = 1.5;\n    _this7.symbol = '🐜';\n    return _this7;\n  }\n\n  _createClass(Ant, [{\n    key: \"pathTo\",\n    value: function pathTo(space, dest) {\n      var path = space.findPath(this.pos, dest);\n\n      if (path) {\n        return path;\n      }\n\n      return null;\n    }\n  }]);\n\n  return Ant;\n}(Bug); // ease = t => t<.5 ? 2*t*t : -1+(4-2*t)*t // ease in out quad\n// ease = t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1  // ease in out cubic\n// ease = t => 1-(--t)*t*t*t // ease out quart\n\n//# sourceURL=webpack:///./bugs.js?");

/***/ }),

/***/ "./common.js":
/*!*******************!*\
  !*** ./common.js ***!
  \*******************/
/*! exports provided: rand, PriorityQueue, uncolorEmoji */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rand\", function() { return rand; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PriorityQueue\", function() { return PriorityQueue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"uncolorEmoji\", function() { return uncolorEmoji; });\n/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ \"./node_modules/core-js/modules/es7.symbol.async-iterator.js\");\n/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.regexp.split */ \"./node_modules/core-js/modules/es6.regexp.split.js\");\n/* harmony import */ var core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_split__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction rand(n) {\n  return Math.floor(Math.random() * n);\n}\nvar PriorityQueue =\n/*#__PURE__*/\nfunction () {\n  function PriorityQueue() {\n    _classCallCheck(this, PriorityQueue);\n\n    this._que = [];\n  } // lover prio to lover index\n\n\n  _createClass(PriorityQueue, [{\n    key: \"push\",\n    value: function push(item, priority) {\n      var _this = this;\n\n      if (!this._que.some(function (_ref, i) {\n        var _ref2 = _slicedToArray(_ref, 2),\n            _ = _ref2[0],\n            prio = _ref2[1];\n\n        if (prio > priority) {\n          _this._que.splice(i, 0, [item, priority]);\n\n          return true;\n        }\n      })) {\n        this._que.push([item, priority]);\n      }\n    } // lover prio first\n\n  }, {\n    key: \"pop\",\n    value: function pop() {\n      var _this$_que$shift = this._que.shift(),\n          _this$_que$shift2 = _slicedToArray(_this$_que$shift, 2),\n          item = _this$_que$shift2[0],\n          _ = _this$_que$shift2[1];\n\n      return item;\n    }\n  }, {\n    key: \"len\",\n    value: function len() {\n      return this._que.length;\n    }\n  }]);\n\n  return PriorityQueue;\n}();\nfunction uncolorEmoji(txt) {\n  return txt.split(/([\\uD800-\\uDBFF][\\uDC00-\\uDFFF])/).map(function (ch) {\n    return ch.charCodeAt() > 255 ? ch + \"\\uFE0E\" : ch;\n  }).join('');\n}\n\n//# sourceURL=webpack:///./common.js?");

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.function.name */ \"./node_modules/core-js/modules/es6.function.name.js\");\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ \"./common.js\");\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board.js */ \"./board.js\");\n/* harmony import */ var _bugs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bugs.js */ \"./bugs.js\");\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n // class carring state of the game and prviding commands for game interaction\n\nvar Game =\n/*#__PURE__*/\nfunction () {\n  function Game() {\n    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;\n\n    _classCallCheck(this, Game);\n\n    this.state = 'play';\n    this.space = new _board_js__WEBPACK_IMPORTED_MODULE_2__[\"Space\"](size);\n    this.selected = null;\n    this.landings = [];\n    this.players = ['#112', '#eed'].map(function (color, i) {\n      return {\n        name: \"Player\".concat(\"AB\"[i]),\n        color: color,\n        hand: new _board_js__WEBPACK_IMPORTED_MODULE_2__[\"Hand\"](Game.basicBugPack.map(function (Bug) {\n          return new Bug(color);\n        }), !i)\n      };\n    });\n    this._activePlayerIndex = 0; // this.message = \"Hello World\"\n  }\n\n  _createClass(Game, [{\n    key: \"disableInput\",\n    value: function disableInput() {\n      this.inputDisabled = true;\n    }\n  }, {\n    key: \"enableInput\",\n    value: function enableInput() {\n      this.inputDisabled = false;\n    } // actions\n\n  }, {\n    key: \"onClick\",\n    value: function onClick(hex) {\n      if (this.inputDisabled || this.state === 'end') {\n        return;\n      }\n\n      if (this.selected && this.landings.some(function (x) {\n        return x.eq(hex);\n      })) {\n        this.play(hex);\n      } else {\n        this.trySelect(hex);\n      } // console.clear()\n      // console.log(String(game.space))\n      // console.log('hex', String(hex))\n\n    }\n  }, {\n    key: \"isClickable\",\n    value: function isClickable(hex) {\n      if (this.inputDisabled || this.state === 'end') {\n        return false;\n      } // selectable inhand bug\n\n\n      var handBug = this.activePlayer().hand.findBug(function (bug) {\n        return bug.pos.eq(hex);\n      });\n\n      if (handBug) {\n        if (this.hasToPlaceQueenNow()) {\n          // 3 placed\n          return handBug.name === 'Queen';\n        }\n\n        return true;\n      } // selectable inspace bug\n\n\n      var tile = this.space.at(hex);\n\n      if (tile && tile.length) {\n        var bug = tile[tile.length - 1];\n\n        if (bug.color === this.activePlayer().color && this.isQueenPlaced() && !(tile.length === 1 && this.space.isHiveBridge(bug.pos))) {\n          return true;\n        }\n      } // can land bug\n\n\n      if (this.selected && this.landings.some(function (x) {\n        return x.eq(hex);\n      })) {\n        return true;\n      }\n    }\n  }, {\n    key: \"trySelect\",\n    value: function trySelect(hex) {\n      // TODO use isClickable func tokeep it DRY\n      var bug = null; // hand?\n\n      if (bug = this.activePlayer().hand.findBug(function (bug) {\n        return bug.pos.eq(hex);\n      })) {\n        if (this.hasToPlaceQueenNow() && bug.name !== 'Queen') {\n          return;\n        }\n\n        this.landings = this.space.possibleLandings(bug);\n        this.selected = bug;\n        return;\n      } // tile?\n\n\n      var tile = this.space.at(hex);\n\n      if (tile && tile.length) {\n        bug = tile[tile.length - 1];\n\n        if (bug.color !== this.activePlayer().color) {\n          // deselect\n          bug = null;\n          this.landings = [];\n        } else if (tile.length === 1 && this.space.isHiveBridge(bug.pos)) {\n          bug = null;\n          console.error('cant move this, will break hive into two');\n        } else if (!this.isQueenPlaced()) {\n          bug = null;\n          console.error('cant move - qeen not placed yet');\n        } else if (bug) {\n          // select own\n          this.landings = bug.reachablePlaces(this.space); // TODO\n        }\n      }\n\n      this.selected = bug;\n    } // place or move selected bug\n\n  }, {\n    key: \"play\",\n    value: function play(hex) {\n      var bug = this.selected;\n      this.activePlayer().hand.takeBug(bug);\n      this.space.putAt(bug, hex);\n      this.selected = null;\n      this.landings = [];\n      this.checkEnd();\n      this.switchPlayers();\n      console.log(String(this.space));\n    }\n  }, {\n    key: \"checkEnd\",\n    value: function checkEnd() {\n      var _this = this;\n\n      var dead = this.players.map(function (player) {\n        var queen = _this.space.findBug(function (_ref) {\n          var name = _ref.name,\n              color = _ref.color;\n          return name === 'Queen' && color === player.color;\n        });\n\n        return queen && _this.space.posOfNeighbors(queen.pos).length === 6;\n      });\n\n      if (dead[0] && dead[1]) {\n        this.message = \"Remíza!\";\n        this.state = 'end';\n        return true;\n      }\n\n      if (dead[this._activePlayerIndex]) {\n        this.message = \"\".concat(this.players[+!this._activePlayerIndex].name, \" vyhr\\xE1v\\xE1\");\n        this.state = 'end';\n        return true;\n      }\n\n      if (dead[+!this._activePlayerIndex]) {\n        this.message = \"\".concat(this.players[this._activePlayerIndex].name, \" vyhr\\xE1v\\xE1\");\n        this.state = 'end';\n        return true;\n      }\n    }\n  }, {\n    key: \"isQueenPlaced\",\n    value: function isQueenPlaced() {\n      return !this.activePlayer().hand.findBug(function (_ref2) {\n        var name = _ref2.name;\n        return name === 'Queen';\n      });\n    }\n  }, {\n    key: \"hasToPlaceQueenNow\",\n    value: function hasToPlaceQueenNow() {\n      return this.activePlayer().hand.used() === 3 && // exactly 3 placed\n      !this.isQueenPlaced();\n    }\n  }, {\n    key: \"switchPlayers\",\n    value: function switchPlayers() {\n      this._activePlayerIndex = +!this._activePlayerIndex;\n    }\n  }, {\n    key: \"activePlayer\",\n    value: function activePlayer() {\n      return this.players[this._activePlayerIndex];\n    }\n  }, {\n    key: \"__randomLandingPos\",\n    value: function __randomLandingPos() {\n      return this.landings[Object(_common_js__WEBPACK_IMPORTED_MODULE_1__[\"rand\"])(this.landings.length - 1)] || this.space.__randomBugPos(this.activePlayer().color);\n    }\n  }]);\n\n  return Game;\n}();\n\n\nGame.basicBugPack = [_bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Queen\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Spider\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Spider\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Beatle\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Beatle\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Ant\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Ant\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Ant\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Grasshopper\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Grasshopper\"], _bugs_js__WEBPACK_IMPORTED_MODULE_3__[\"Grasshopper\"]];\n\n//# sourceURL=webpack:///./game.js?");

/***/ }),

/***/ "./hive.js":
/*!*****************!*\
  !*** ./hive.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es7.array.includes */ \"./node_modules/core-js/modules/es7.array.includes.js\");\n/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.string.includes */ \"./node_modules/core-js/modules/es6.string.includes.js\");\n/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ \"./game.js\");\n/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.js */ \"./ui.js\");\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common.js */ \"./common.js\");\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./board.js */ \"./board.js\");\n\n\n\n\n\n\nconsole.log(\"Hive loaded\");\nvar game = new _game_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](5);\ngame.menu = [{\n  label: '👤🌐👤',\n  pos: new _board_js__WEBPACK_IMPORTED_MODULE_5__[\"Hex\"](-1, 0)\n}, {\n  label: '👤×👽',\n  // 🤖\n  pos: new _board_js__WEBPACK_IMPORTED_MODULE_5__[\"Hex\"](1, -2),\n  action: vAI\n}, {\n  label: '👤',\n  pos: new _board_js__WEBPACK_IMPORTED_MODULE_5__[\"Hex\"](1, 0),\n  action: function action() {\n    ui.hideMenu();\n  }\n}, {\n  label: '👽×👽',\n  pos: new _board_js__WEBPACK_IMPORTED_MODULE_5__[\"Hex\"](-1, 2),\n  action: AIvAI\n}];\n\nif (window.location !== window.parent.location) {\n  document.body.style.background = 'none';\n}\n\nvar canvas = document.getElementById('hiveCanvas');\nvar ui = Object(_ui_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(game).on(canvas).showMenu(); // ui.off(canvas)\n// setTimeout(()=>ui.on(canvas), 1500)\n\nvar autoMove = function autoMove(players) {\n  return function () {\n    if (!players.includes(game._activePlayerIndex)) {\n      return;\n    }\n\n    !game.selected ? game.onClick(Object(_common_js__WEBPACK_IMPORTED_MODULE_4__[\"rand\"])(game.activePlayer().hand.size() + 1) ? game.activePlayer().hand.__getRandomBugPos() : game.space.__randomBugPos(game.activePlayer().color)) : game.onClick(game.__randomLandingPos()); // console.clear()\n    // console.log(String(game.space))\n\n    ui.touch();\n  };\n};\n\nfunction AIvAI() {\n  ui.hideMenu();\n  ui.disableInputFor([0, 1]);\n  var timer = setInterval(autoMove([0, 1]), 250);\n  setTimeout(function () {\n    clearInterval(timer);\n  }, 5 * 60 * 1000);\n}\n\nfunction vAI() {\n  ui.hideMenu();\n  ui.disableInputFor([1]);\n  var timer = setInterval(autoMove([1]), 800); // setTimeout(() => {clearInterval(timer)}, 10*60*1000)\n}\n\n//# sourceURL=webpack:///./hive.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') throw TypeError(it + ' is not a function!');\n  return it;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_a-function.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_add-to-unscopables.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 22.1.3.31 Array.prototype[@@unscopables]\nvar UNSCOPABLES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('unscopables');\n\nvar ArrayProto = Array.prototype;\nif (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\")(ArrayProto, UNSCOPABLES, {});\n\nmodule.exports = function (key) {\n  ArrayProto[UNSCOPABLES][key] = true;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_add-to-unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_advance-string-index.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_advance-string-index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar at = __webpack_require__(/*! ./_string-at */ \"./node_modules/core-js/modules/_string-at.js\")(true); // `AdvanceStringIndex` abstract operation\n// https://tc39.github.io/ecma262/#sec-advancestringindex\n\n\nmodule.exports = function (S, index, unicode) {\n  return index + (unicode ? at(S, index).length : 1);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_advance-string-index.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n\nmodule.exports = function (it) {\n  if (!isObject(it)) throw TypeError(it + ' is not an object!');\n  return it;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_array-fill.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)\n\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\n\nvar toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ \"./node_modules/core-js/modules/_to-absolute-index.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\n\nmodule.exports = function fill(value\n/* , start = 0, end = @length */\n) {\n  var O = toObject(this);\n  var length = toLength(O.length);\n  var aLen = arguments.length;\n  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);\n  var end = aLen > 2 ? arguments[2] : undefined;\n  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);\n\n  while (endPos > index) O[index++] = value;\n\n  return O;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_array-fill.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// false -> Array#indexOf\n// true  -> Array#includes\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\n\nvar toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ \"./node_modules/core-js/modules/_to-absolute-index.js\");\n\nmodule.exports = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value; // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++]; // eslint-disable-next-line no-self-compare\n\n      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not\n    } else for (; length > index; index++) if (IS_INCLUDES || index in O) {\n      if (O[index] === el) return IS_INCLUDES || index || 0;\n    }\n    return !IS_INCLUDES && -1;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_array-methods.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 0 -> Array#forEach\n// 1 -> Array#map\n// 2 -> Array#filter\n// 3 -> Array#some\n// 4 -> Array#every\n// 5 -> Array#find\n// 6 -> Array#findIndex\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/modules/_ctx.js\");\n\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/modules/_iobject.js\");\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\n\nvar asc = __webpack_require__(/*! ./_array-species-create */ \"./node_modules/core-js/modules/_array-species-create.js\");\n\nmodule.exports = function (TYPE, $create) {\n  var IS_MAP = TYPE == 1;\n  var IS_FILTER = TYPE == 2;\n  var IS_SOME = TYPE == 3;\n  var IS_EVERY = TYPE == 4;\n  var IS_FIND_INDEX = TYPE == 6;\n  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;\n  var create = $create || asc;\n  return function ($this, callbackfn, that) {\n    var O = toObject($this);\n    var self = IObject(O);\n    var f = ctx(callbackfn, that, 3);\n    var length = toLength(self.length);\n    var index = 0;\n    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;\n    var val, res;\n\n    for (; length > index; index++) if (NO_HOLES || index in self) {\n      val = self[index];\n      res = f(val, index, O);\n\n      if (TYPE) {\n        if (IS_MAP) result[index] = res; // map\n        else if (res) switch (TYPE) {\n            case 3:\n              return true;\n            // some\n\n            case 5:\n              return val;\n            // find\n\n            case 6:\n              return index;\n            // findIndex\n\n            case 2:\n              result.push(val);\n            // filter\n          } else if (IS_EVERY) return false; // every\n      }\n    }\n\n    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_array-methods.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n\nvar isArray = __webpack_require__(/*! ./_is-array */ \"./node_modules/core-js/modules/_is-array.js\");\n\nvar SPECIES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('species');\n\nmodule.exports = function (original) {\n  var C;\n\n  if (isArray(original)) {\n    C = original.constructor; // cross-realm fallback\n\n    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;\n\n    if (isObject(C)) {\n      C = C[SPECIES];\n      if (C === null) C = undefined;\n    }\n  }\n\n  return C === undefined ? Array : C;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_array-species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_array-species-create.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 9.4.2.3 ArraySpeciesCreate(originalArray, length)\nvar speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ \"./node_modules/core-js/modules/_array-species-constructor.js\");\n\nmodule.exports = function (original, length) {\n  return new (speciesConstructor(original))(length);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_array-species-create.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// getting tag from 19.1.3.6 Object.prototype.toString()\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\");\n\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('toStringTag'); // ES3 wrong here\n\n\nvar ARG = cof(function () {\n  return arguments;\n}()) == 'Arguments'; // fallback for IE11 Script Access Denied error\n\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (e) {\n    /* empty */\n  }\n};\n\nmodule.exports = function (it) {\n  var O, T, B;\n  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case\n  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case\n  : ARG ? cof(O) // ES3 arguments fallback\n  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_classof.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_cof.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var core = module.exports = {\n  version: '2.6.9'\n};\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_core.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_create-property.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar $defineProperty = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\");\n\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\n\nmodule.exports = function (object, index, value) {\n  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_create-property.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// optional / simple context binding\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/modules/_a-function.js\");\n\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n\n  switch (length) {\n    case 1:\n      return function (a) {\n        return fn.call(that, a);\n      };\n\n    case 2:\n      return function (a, b) {\n        return fn.call(that, a, b);\n      };\n\n    case 3:\n      return function (a, b, c) {\n        return fn.call(that, a, b, c);\n      };\n  }\n\n  return function ()\n  /* ...args */\n  {\n    return fn.apply(that, arguments);\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_ctx.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.2.1 RequireObjectCoercible(argument)\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on  \" + it);\n  return it;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_defined.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () {\n  return Object.defineProperty({}, 'a', {\n    get: function () {\n      return 7;\n    }\n  }).a != 7;\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n\nvar document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\").document; // typeof document.createElement is 'object' in old IE\n\n\nvar is = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return is ? document.createElement(it) : {};\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_dom-create.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IE 8- don't enum bug keys\nmodule.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// all enumerable object keys, includes symbols\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\n\nvar gOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/modules/_object-gops.js\");\n\nvar pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/modules/_object-pie.js\");\n\nmodule.exports = function (it) {\n  var result = getKeys(it);\n  var getSymbols = gOPS.f;\n\n  if (getSymbols) {\n    var symbols = getSymbols(it);\n    var isEnum = pIE.f;\n    var i = 0;\n    var key;\n\n    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);\n  }\n\n  return result;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_enum-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\n\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\n\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/modules/_ctx.js\");\n\nvar PROTOTYPE = 'prototype';\n\nvar $export = function (type, name, source) {\n  var IS_FORCED = type & $export.F;\n  var IS_GLOBAL = type & $export.G;\n  var IS_STATIC = type & $export.S;\n  var IS_PROTO = type & $export.P;\n  var IS_BIND = type & $export.B;\n  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];\n  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});\n  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});\n  var key, own, out, exp;\n  if (IS_GLOBAL) source = name;\n\n  for (key in source) {\n    // contains in native\n    own = !IS_FORCED && target && target[key] !== undefined; // export native or passed\n\n    out = (own ? target : source)[key]; // bind timers to global for call from export context\n\n    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // extend global\n\n    if (target) redefine(target, key, out, type & $export.U); // export\n\n    if (exports[key] != out) hide(exports, key, exp);\n    if (IS_PROTO && expProto[key] != out) expProto[key] = out;\n  }\n};\n\nglobal.core = core; // type bitmap\n\n$export.F = 1; // forced\n\n$export.G = 2; // global\n\n$export.S = 4; // static\n\n$export.P = 8; // proto\n\n$export.B = 16; // bind\n\n$export.W = 32; // wrap\n\n$export.U = 64; // safe\n\n$export.R = 128; // real proto method for `library`\n\nmodule.exports = $export;\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_export.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_fails-is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MATCH = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('match');\n\nmodule.exports = function (KEY) {\n  var re = /./;\n\n  try {\n    '/./'[KEY](re);\n  } catch (e) {\n    try {\n      re[MATCH] = false;\n      return !'/./'[KEY](re);\n    } catch (f) {\n      /* empty */\n    }\n  }\n\n  return true;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_fails-is-regexp.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (e) {\n    return true;\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_fails.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_fix-re-wks.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./es6.regexp.exec */ \"./node_modules/core-js/modules/es6.regexp.exec.js\");\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\n\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\n\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\n\nvar regexpExec = __webpack_require__(/*! ./_regexp-exec */ \"./node_modules/core-js/modules/_regexp-exec.js\");\n\nvar SPECIES = wks('species');\nvar REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {\n  // #replace needs built-in support for named groups.\n  // #match works fine because it just return the exec results, even if it has\n  // a \"grops\" property.\n  var re = /./;\n\n  re.exec = function () {\n    var result = [];\n    result.groups = {\n      a: '7'\n    };\n    return result;\n  };\n\n  return ''.replace(re, '$<a>') !== '7';\n});\n\nvar SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {\n  // Chrome 51 has a buggy \"split\" implementation when RegExp#exec !== nativeExec\n  var re = /(?:)/;\n  var originalExec = re.exec;\n\n  re.exec = function () {\n    return originalExec.apply(this, arguments);\n  };\n\n  var result = 'ab'.split(re);\n  return result.length === 2 && result[0] === 'a' && result[1] === 'b';\n}();\n\nmodule.exports = function (KEY, length, exec) {\n  var SYMBOL = wks(KEY);\n  var DELEGATES_TO_SYMBOL = !fails(function () {\n    // String methods call symbol-named RegEp methods\n    var O = {};\n\n    O[SYMBOL] = function () {\n      return 7;\n    };\n\n    return ''[KEY](O) != 7;\n  });\n  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {\n    // Symbol-named RegExp methods call .exec\n    var execCalled = false;\n    var re = /a/;\n\n    re.exec = function () {\n      execCalled = true;\n      return null;\n    };\n\n    if (KEY === 'split') {\n      // RegExp[@@split] doesn't call the regex's exec method, but first creates\n      // a new one. We need to return the patched regex when creating the new one.\n      re.constructor = {};\n\n      re.constructor[SPECIES] = function () {\n        return re;\n      };\n    }\n\n    re[SYMBOL]('');\n    return !execCalled;\n  }) : undefined;\n\n  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {\n    var nativeRegExpMethod = /./[SYMBOL];\n    var fns = exec(defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {\n      if (regexp.exec === regexpExec) {\n        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {\n          // The native String method already delegates to @@method (this\n          // polyfilled function), leasing to infinite recursion.\n          // We avoid it by directly calling the native @@method method.\n          return {\n            done: true,\n            value: nativeRegExpMethod.call(regexp, str, arg2)\n          };\n        }\n\n        return {\n          done: true,\n          value: nativeMethod.call(str, regexp, arg2)\n        };\n      }\n\n      return {\n        done: false\n      };\n    });\n    var strfn = fns[0];\n    var rxfn = fns[1];\n    redefine(String.prototype, KEY, strfn);\n    hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)\n    // 21.2.5.11 RegExp.prototype[@@split](string, limit)\n    ? function (string, arg) {\n      return rxfn.call(string, this, arg);\n    } // 21.2.5.6 RegExp.prototype[@@match](string)\n    // 21.2.5.9 RegExp.prototype[@@search](string)\n    : function (string) {\n      return rxfn.call(string, this);\n    });\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_fix-re-wks.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_flags.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // 21.2.5.3 get RegExp.prototype.flags\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nmodule.exports = function () {\n  var that = anObject(this);\n  var result = '';\n  if (that.global) result += 'g';\n  if (that.ignoreCase) result += 'i';\n  if (that.multiline) result += 'm';\n  if (that.unicode) result += 'u';\n  if (that.sticky) result += 'y';\n  return result;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_flags.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_function-to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\")('native-function-to-string', Function.toString);\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_function-to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nvar global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func\n: Function('return this')();\nif (typeof __g == 'number') __g = global; // eslint-disable-line no-undef\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_global.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\n\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_has.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\");\n\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\n\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? function (object, key, value) {\n  return dP.f(object, key, createDesc(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_hide.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\").document;\n\nmodule.exports = document && document.documentElement;\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_html.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") && !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () {\n  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/modules/_dom-create.js\")('div'), 'a', {\n    get: function () {\n      return 7;\n    }\n  }).a != 7;\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for non-array-like ES3 and non-enumerable old V8 strings\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\"); // eslint-disable-next-line no-prototype-builtins\n\n\nmodule.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {\n  return cof(it) == 'String' ? it.split('') : Object(it);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_iobject.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_is-array-iter.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// check on default Array iterator\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\n\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('iterator');\n\nvar ArrayProto = Array.prototype;\n\nmodule.exports = function (it) {\n  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_is-array-iter.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.2.2 IsArray(argument)\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\");\n\nmodule.exports = Array.isArray || function isArray(arg) {\n  return cof(arg) == 'Array';\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_is-array.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_is-regexp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.2.8 IsRegExp(argument)\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/modules/_cof.js\");\n\nvar MATCH = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('match');\n\nmodule.exports = function (it) {\n  var isRegExp;\n  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_is-regexp.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-call.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// call something on iterator step with safe closing on error\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nmodule.exports = function (iterator, fn, value, entries) {\n  try {\n    return entries ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)\n  } catch (e) {\n    var ret = iterator['return'];\n    if (ret !== undefined) anObject(ret.call(iterator));\n    throw e;\n  }\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_iter-call.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-create.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/modules/_object-create.js\");\n\nvar descriptor = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\n\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/modules/_set-to-string-tag.js\");\n\nvar IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()\n\n__webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\")(IteratorPrototype, __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('iterator'), function () {\n  return this;\n});\n\nmodule.exports = function (Constructor, NAME, next) {\n  Constructor.prototype = create(IteratorPrototype, {\n    next: descriptor(1, next)\n  });\n  setToStringTag(Constructor, NAME + ' Iterator');\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_iter-create.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-define.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\");\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\n\nvar $iterCreate = __webpack_require__(/*! ./_iter-create */ \"./node_modules/core-js/modules/_iter-create.js\");\n\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/modules/_set-to-string-tag.js\");\n\nvar getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ \"./node_modules/core-js/modules/_object-gpo.js\");\n\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('iterator');\n\nvar BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`\n\nvar FF_ITERATOR = '@@iterator';\nvar KEYS = 'keys';\nvar VALUES = 'values';\n\nvar returnThis = function () {\n  return this;\n};\n\nmodule.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {\n  $iterCreate(Constructor, NAME, next);\n\n  var getMethod = function (kind) {\n    if (!BUGGY && kind in proto) return proto[kind];\n\n    switch (kind) {\n      case KEYS:\n        return function keys() {\n          return new Constructor(this, kind);\n        };\n\n      case VALUES:\n        return function values() {\n          return new Constructor(this, kind);\n        };\n    }\n\n    return function entries() {\n      return new Constructor(this, kind);\n    };\n  };\n\n  var TAG = NAME + ' Iterator';\n  var DEF_VALUES = DEFAULT == VALUES;\n  var VALUES_BUG = false;\n  var proto = Base.prototype;\n  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];\n  var $default = $native || getMethod(DEFAULT);\n  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;\n  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;\n  var methods, key, IteratorPrototype; // Fix native\n\n  if ($anyNative) {\n    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));\n\n    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {\n      // Set @@toStringTag to native iterators\n      setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines\n\n      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);\n    }\n  } // fix Array#{values, @@iterator}.name in V8 / FF\n\n\n  if (DEF_VALUES && $native && $native.name !== VALUES) {\n    VALUES_BUG = true;\n\n    $default = function values() {\n      return $native.call(this);\n    };\n  } // Define iterator\n\n\n  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {\n    hide(proto, ITERATOR, $default);\n  } // Plug for library\n\n\n  Iterators[NAME] = $default;\n  Iterators[TAG] = returnThis;\n\n  if (DEFAULT) {\n    methods = {\n      values: DEF_VALUES ? $default : getMethod(VALUES),\n      keys: IS_SET ? $default : getMethod(KEYS),\n      entries: $entries\n    };\n    if (FORCED) for (key in methods) {\n      if (!(key in proto)) redefine(proto, key, methods[key]);\n    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);\n  }\n\n  return methods;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_iter-define.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-detect.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('iterator');\n\nvar SAFE_CLOSING = false;\n\ntry {\n  var riter = [7][ITERATOR]();\n\n  riter['return'] = function () {\n    SAFE_CLOSING = true;\n  }; // eslint-disable-next-line no-throw-literal\n\n\n  Array.from(riter, function () {\n    throw 2;\n  });\n} catch (e) {\n  /* empty */\n}\n\nmodule.exports = function (exec, skipClosing) {\n  if (!skipClosing && !SAFE_CLOSING) return false;\n  var safe = false;\n\n  try {\n    var arr = [7];\n    var iter = arr[ITERATOR]();\n\n    iter.next = function () {\n      return {\n        done: safe = true\n      };\n    };\n\n    arr[ITERATOR] = function () {\n      return iter;\n    };\n\n    exec(arr);\n  } catch (e) {\n    /* empty */\n  }\n\n  return safe;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_iter-detect.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_iter-step.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (done, value) {\n  return {\n    value: value,\n    done: !!done\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_iter-step.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_iterators.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_iterators.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = false;\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_library.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_math-sign.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 20.2.2.28 Math.sign(x)\nmodule.exports = Math.sign || function sign(x) {\n  // eslint-disable-next-line no-self-compare\n  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_math-sign.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var META = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\")('meta');\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\n\nvar setDesc = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f;\n\nvar id = 0;\n\nvar isExtensible = Object.isExtensible || function () {\n  return true;\n};\n\nvar FREEZE = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () {\n  return isExtensible(Object.preventExtensions({}));\n});\n\nvar setMeta = function (it) {\n  setDesc(it, META, {\n    value: {\n      i: 'O' + ++id,\n      // object ID\n      w: {} // weak collections IDs\n\n    }\n  });\n};\n\nvar fastKey = function (it, create) {\n  // return primitive with prefix\n  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;\n\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return 'F'; // not necessary to add metadata\n\n    if (!create) return 'E'; // add missing metadata\n\n    setMeta(it); // return object ID\n  }\n\n  return it[META].i;\n};\n\nvar getWeak = function (it, create) {\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return true; // not necessary to add metadata\n\n    if (!create) return false; // add missing metadata\n\n    setMeta(it); // return hash weak collections IDs\n  }\n\n  return it[META].w;\n}; // add metadata on freeze-family methods calling\n\n\nvar onFreeze = function (it) {\n  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);\n  return it;\n};\n\nvar meta = module.exports = {\n  KEY: META,\n  NEED: false,\n  fastKey: fastKey,\n  getWeak: getWeak,\n  onFreeze: onFreeze\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_meta.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar dPs = __webpack_require__(/*! ./_object-dps */ \"./node_modules/core-js/modules/_object-dps.js\");\n\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/modules/_enum-bug-keys.js\");\n\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/modules/_shared-key.js\")('IE_PROTO');\n\nvar Empty = function () {\n  /* empty */\n};\n\nvar PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype\n\nvar createDict = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = __webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/modules/_dom-create.js\")('iframe');\n\n  var i = enumBugKeys.length;\n  var lt = '<';\n  var gt = '>';\n  var iframeDocument;\n  iframe.style.display = 'none';\n\n  __webpack_require__(/*! ./_html */ \"./node_modules/core-js/modules/_html.js\").appendChild(iframe);\n\n  iframe.src = 'javascript:'; // eslint-disable-line no-script-url\n  // createDict = iframe.contentWindow.Object;\n  // html.removeChild(iframe);\n\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);\n  iframeDocument.close();\n  createDict = iframeDocument.F;\n\n  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];\n\n  return createDict();\n};\n\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n\n  if (O !== null) {\n    Empty[PROTOTYPE] = anObject(O);\n    result = new Empty();\n    Empty[PROTOTYPE] = null; // add \"__proto__\" for Object.getPrototypeOf polyfill\n\n    result[IE_PROTO] = O;\n  } else result = createDict();\n\n  return Properties === undefined ? result : dPs(result, Properties);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-create.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/modules/_ie8-dom-define.js\");\n\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/modules/_to-primitive.js\");\n\nvar dP = Object.defineProperty;\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? Object.defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return dP(O, P, Attributes);\n  } catch (e) {\n    /* empty */\n  }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-dp.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\n\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var keys = getKeys(Properties);\n  var length = keys.length;\n  var i = 0;\n  var P;\n\n  while (length > i) dP.f(O, P = keys[i++], Properties[P]);\n\n  return O;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-dps.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/modules/_object-pie.js\");\n\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\n\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/modules/_to-primitive.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\n\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/modules/_ie8-dom-define.js\");\n\nvar gOPD = Object.getOwnPropertyDescriptor;\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") ? gOPD : function getOwnPropertyDescriptor(O, P) {\n  O = toIObject(O);\n  P = toPrimitive(P, true);\n  if (IE8_DOM_DEFINE) try {\n    return gOPD(O, P);\n  } catch (e) {\n    /* empty */\n  }\n  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-gopd.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\n\nvar gOPN = __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/modules/_object-gopn.js\").f;\n\nvar toString = {}.toString;\nvar windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];\n\nvar getWindowNames = function (it) {\n  try {\n    return gOPN(it);\n  } catch (e) {\n    return windowNames.slice();\n  }\n};\n\nmodule.exports.f = function getOwnPropertyNames(it) {\n  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-gopn-ext.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/modules/_object-keys-internal.js\");\n\nvar hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/modules/_enum-bug-keys.js\").concat('length', 'prototype');\n\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return $keys(O, hiddenKeys);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-gopn.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = Object.getOwnPropertySymbols;\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-gops.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\n\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/modules/_shared-key.js\")('IE_PROTO');\n\nvar ObjectProto = Object.prototype;\n\nmodule.exports = Object.getPrototypeOf || function (O) {\n  O = toObject(O);\n  if (has(O, IE_PROTO)) return O[IE_PROTO];\n\n  if (typeof O.constructor == 'function' && O instanceof O.constructor) {\n    return O.constructor.prototype;\n  }\n\n  return O instanceof Object ? ObjectProto : null;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-gpo.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\n\nvar arrayIndexOf = __webpack_require__(/*! ./_array-includes */ \"./node_modules/core-js/modules/_array-includes.js\")(false);\n\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/modules/_shared-key.js\")('IE_PROTO');\n\nmodule.exports = function (object, names) {\n  var O = toIObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n\n  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key); // Don't enum bug & hidden keys\n\n\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~arrayIndexOf(result, key) || result.push(key);\n  }\n\n  return result;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.14 / 15.2.3.14 Object.keys(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/modules/_object-keys-internal.js\");\n\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/modules/_enum-bug-keys.js\");\n\nmodule.exports = Object.keys || function keys(O) {\n  return $keys(O, enumBugKeys);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = {}.propertyIsEnumerable;\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_object-pie.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_property-desc.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\n\nvar SRC = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\")('src');\n\nvar $toString = __webpack_require__(/*! ./_function-to-string */ \"./node_modules/core-js/modules/_function-to-string.js\");\n\nvar TO_STRING = 'toString';\nvar TPL = ('' + $toString).split(TO_STRING);\n\n__webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\").inspectSource = function (it) {\n  return $toString.call(it);\n};\n\n(module.exports = function (O, key, val, safe) {\n  var isFunction = typeof val == 'function';\n  if (isFunction) has(val, 'name') || hide(val, 'name', key);\n  if (O[key] === val) return;\n  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));\n\n  if (O === global) {\n    O[key] = val;\n  } else if (!safe) {\n    delete O[key];\n    hide(O, key, val);\n  } else if (O[key]) {\n    O[key] = val;\n  } else {\n    hide(O, key, val);\n  } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative\n\n})(Function.prototype, TO_STRING, function toString() {\n  return typeof this == 'function' && this[SRC] || $toString.call(this);\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_redefine.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_regexp-exec-abstract.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec-abstract.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar classof = __webpack_require__(/*! ./_classof */ \"./node_modules/core-js/modules/_classof.js\");\n\nvar builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation\n// https://tc39.github.io/ecma262/#sec-regexpexec\n\nmodule.exports = function (R, S) {\n  var exec = R.exec;\n\n  if (typeof exec === 'function') {\n    var result = exec.call(R, S);\n\n    if (typeof result !== 'object') {\n      throw new TypeError('RegExp exec method returned something other than an Object or null');\n    }\n\n    return result;\n  }\n\n  if (classof(R) !== 'RegExp') {\n    throw new TypeError('RegExp#exec called on incompatible receiver');\n  }\n\n  return builtinExec.call(R, S);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_regexp-exec-abstract.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_regexp-exec.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_regexp-exec.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar regexpFlags = __webpack_require__(/*! ./_flags */ \"./node_modules/core-js/modules/_flags.js\");\n\nvar nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the\n// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,\n// which loads this file before patching the method.\n\nvar nativeReplace = String.prototype.replace;\nvar patchedExec = nativeExec;\nvar LAST_INDEX = 'lastIndex';\n\nvar UPDATES_LAST_INDEX_WRONG = function () {\n  var re1 = /a/,\n      re2 = /b*/g;\n  nativeExec.call(re1, 'a');\n  nativeExec.call(re2, 'a');\n  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;\n}(); // nonparticipating capturing group, copied from es5-shim's String#split patch.\n\n\nvar NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;\nvar PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;\n\nif (PATCH) {\n  patchedExec = function exec(str) {\n    var re = this;\n    var lastIndex, reCopy, match, i;\n\n    if (NPCG_INCLUDED) {\n      reCopy = new RegExp('^' + re.source + '$(?!\\\\s)', regexpFlags.call(re));\n    }\n\n    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];\n    match = nativeExec.call(re, str);\n\n    if (UPDATES_LAST_INDEX_WRONG && match) {\n      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;\n    }\n\n    if (NPCG_INCLUDED && match && match.length > 1) {\n      // Fix browsers whose `exec` methods don't consistently return `undefined`\n      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/\n      // eslint-disable-next-line no-loop-func\n      nativeReplace.call(match[0], reCopy, function () {\n        for (i = 1; i < arguments.length - 2; i++) {\n          if (arguments[i] === undefined) match[i] = undefined;\n        }\n      });\n    }\n\n    return match;\n  };\n}\n\nmodule.exports = patchedExec;\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_regexp-exec.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Works with __proto__ only. Old v8 can't work with null proto objects.\n\n/* eslint-disable no-proto */\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar check = function (O, proto) {\n  anObject(O);\n  if (!isObject(proto) && proto !== null) throw TypeError(proto + \": can't set as prototype!\");\n};\n\nmodule.exports = {\n  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line\n  function (test, buggy, set) {\n    try {\n      set = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/modules/_ctx.js\")(Function.call, __webpack_require__(/*! ./_object-gopd */ \"./node_modules/core-js/modules/_object-gopd.js\").f(Object.prototype, '__proto__').set, 2);\n      set(test, []);\n      buggy = !(test instanceof Array);\n    } catch (e) {\n      buggy = true;\n    }\n\n    return function setPrototypeOf(O, proto) {\n      check(O, proto);\n      if (buggy) O.__proto__ = proto;else set(O, proto);\n      return O;\n    };\n  }({}, false) : undefined),\n  check: check\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_set-proto.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var def = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f;\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\n\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('toStringTag');\n\nmodule.exports = function (it, tag, stat) {\n  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {\n    configurable: true,\n    value: tag\n  });\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\")('keys');\n\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\");\n\nmodule.exports = function (key) {\n  return shared[key] || (shared[key] = uid(key));\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\");\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\n\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || (global[SHARED] = {});\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: core.version,\n  mode: __webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\") ? 'pure' : 'global',\n  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_shared.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_species-constructor.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.3.20 SpeciesConstructor(O, defaultConstructor)\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/modules/_a-function.js\");\n\nvar SPECIES = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('species');\n\nmodule.exports = function (O, D) {\n  var C = anObject(O).constructor;\n  var S;\n  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_species-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_string-at.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\"); // true  -> String#at\n// false -> String#codePointAt\n\n\nmodule.exports = function (TO_STRING) {\n  return function (that, pos) {\n    var s = String(defined(that));\n    var i = toInteger(pos);\n    var l = s.length;\n    var a, b;\n    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;\n    a = s.charCodeAt(i);\n    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_string-at.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_string-context.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// helper for String#{startsWith, endsWith, includes}\nvar isRegExp = __webpack_require__(/*! ./_is-regexp */ \"./node_modules/core-js/modules/_is-regexp.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\n\nmodule.exports = function (that, searchString, NAME) {\n  if (isRegExp(searchString)) throw TypeError('String#' + NAME + \" doesn't accept regex!\");\n  return String(defined(that));\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_string-context.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_string-html.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\n\nvar quot = /\"/g; // B.2.3.2.1 CreateHTML(string, tag, attribute, value)\n\nvar createHTML = function (string, tag, attribute, value) {\n  var S = String(defined(string));\n  var p1 = '<' + tag;\n  if (attribute !== '') p1 += ' ' + attribute + '=\"' + String(value).replace(quot, '&quot;') + '\"';\n  return p1 + '>' + S + '</' + tag + '>';\n};\n\nmodule.exports = function (NAME, exec) {\n  var O = {};\n  O[NAME] = exec(createHTML);\n  $export($export.P + $export.F * fails(function () {\n    var test = ''[NAME]('\"');\n    return test !== test.toLowerCase() || test.split('\"').length > 3;\n  }), 'String', O);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_string-html.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_string-repeat.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\n\nmodule.exports = function repeat(count) {\n  var str = String(defined(this));\n  var res = '';\n  var n = toInteger(count);\n  if (n < 0 || n == Infinity) throw RangeError(\"Count can't be negative\");\n\n  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;\n\n  return res;\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_string-repeat.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\n\nvar max = Math.max;\nvar min = Math.min;\n\nmodule.exports = function (index, length) {\n  index = toInteger(index);\n  return index < 0 ? max(index + length, 0) : min(index, length);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.1.4 ToInteger\nvar ceil = Math.ceil;\nvar floor = Math.floor;\n\nmodule.exports = function (it) {\n  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_to-integer.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// to indexed object, toObject with fallback for non-array-like ES3 strings\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/modules/_iobject.js\");\n\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\n\nmodule.exports = function (it) {\n  return IObject(defined(it));\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_to-iobject.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.15 ToLength\nvar toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/modules/_to-integer.js\");\n\nvar min = Math.min;\n\nmodule.exports = function (it) {\n  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.13 ToObject(argument)\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/modules/_defined.js\");\n\nmodule.exports = function (it) {\n  return Object(defined(it));\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\"); // instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\n\n\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var id = 0;\nvar px = Math.random();\n\nmodule.exports = function (key) {\n  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_uid.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\n\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\");\n\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\");\n\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/modules/_wks-ext.js\");\n\nvar defineProperty = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f;\n\nmodule.exports = function (name) {\n  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});\n  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {\n    value: wksExt.f(name)\n  });\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_wks-define.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.f = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_wks-ext.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\")('wks');\n\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\");\n\nvar Symbol = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\").Symbol;\n\nvar USE_SYMBOL = typeof Symbol == 'function';\n\nvar $exports = module.exports = function (name) {\n  return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));\n};\n\n$exports.store = store;\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/_wks.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/core.get-iterator-method.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ./_classof */ \"./node_modules/core-js/modules/_classof.js\");\n\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('iterator');\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\n\nmodule.exports = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/modules/_core.js\").getIteratorMethod = function (it) {\n  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];\n};\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/core.get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.fill.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\n$export($export.P, 'Array', {\n  fill: __webpack_require__(/*! ./_array-fill */ \"./node_modules/core-js/modules/_array-fill.js\")\n});\n\n__webpack_require__(/*! ./_add-to-unscopables */ \"./node_modules/core-js/modules/_add-to-unscopables.js\")('fill');\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.array.fill.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.find.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\nvar $find = __webpack_require__(/*! ./_array-methods */ \"./node_modules/core-js/modules/_array-methods.js\")(5);\n\nvar KEY = 'find';\nvar forced = true; // Shouldn't skip holes\n\nif (KEY in []) Array(1)[KEY](function () {\n  forced = false;\n});\n$export($export.P + $export.F * forced, 'Array', {\n  find: function find(callbackfn\n  /* , that = undefined */\n  ) {\n    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);\n  }\n});\n\n__webpack_require__(/*! ./_add-to-unscopables */ \"./node_modules/core-js/modules/_add-to-unscopables.js\")(KEY);\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.array.find.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.from.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/modules/_ctx.js\");\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\n\nvar call = __webpack_require__(/*! ./_iter-call */ \"./node_modules/core-js/modules/_iter-call.js\");\n\nvar isArrayIter = __webpack_require__(/*! ./_is-array-iter */ \"./node_modules/core-js/modules/_is-array-iter.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\n\nvar createProperty = __webpack_require__(/*! ./_create-property */ \"./node_modules/core-js/modules/_create-property.js\");\n\nvar getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ \"./node_modules/core-js/modules/core.get-iterator-method.js\");\n\n$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ \"./node_modules/core-js/modules/_iter-detect.js\")(function (iter) {\n  Array.from(iter);\n}), 'Array', {\n  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)\n  from: function from(arrayLike\n  /* , mapfn = undefined, thisArg = undefined */\n  ) {\n    var O = toObject(arrayLike);\n    var C = typeof this == 'function' ? this : Array;\n    var aLen = arguments.length;\n    var mapfn = aLen > 1 ? arguments[1] : undefined;\n    var mapping = mapfn !== undefined;\n    var index = 0;\n    var iterFn = getIterFn(O);\n    var length, result, step, iterator;\n    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case\n\n    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {\n      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {\n        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);\n      }\n    } else {\n      length = toLength(O.length);\n\n      for (result = new C(length); length > index; index++) {\n        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);\n      }\n    }\n\n    result.length = index;\n    return result;\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.array.from.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ \"./node_modules/core-js/modules/_add-to-unscopables.js\");\n\nvar step = __webpack_require__(/*! ./_iter-step */ \"./node_modules/core-js/modules/_iter-step.js\");\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\"); // 22.1.3.4 Array.prototype.entries()\n// 22.1.3.13 Array.prototype.keys()\n// 22.1.3.29 Array.prototype.values()\n// 22.1.3.30 Array.prototype[@@iterator]()\n\n\nmodule.exports = __webpack_require__(/*! ./_iter-define */ \"./node_modules/core-js/modules/_iter-define.js\")(Array, 'Array', function (iterated, kind) {\n  this._t = toIObject(iterated); // target\n\n  this._i = 0; // next index\n\n  this._k = kind; // kind\n  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var kind = this._k;\n  var index = this._i++;\n\n  if (!O || index >= O.length) {\n    this._t = undefined;\n    return step(1);\n  }\n\n  if (kind == 'keys') return step(0, index);\n  if (kind == 'values') return step(0, O[index]);\n  return step(0, [index, O[index]]);\n}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)\n\nIterators.Arguments = Iterators.Array;\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.array.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.function.name.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f;\n\nvar FProto = Function.prototype;\nvar nameRE = /^\\s*function ([^ (]*)/;\nvar NAME = 'name'; // 19.2.4.2 name\n\nNAME in FProto || __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") && dP(FProto, NAME, {\n  configurable: true,\n  get: function () {\n    try {\n      return ('' + this).match(nameRE)[1];\n    } catch (e) {\n      return '';\n    }\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.function.name.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.math.sign.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 20.2.2.28 Math.sign(x)\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\n$export($export.S, 'Math', {\n  sign: __webpack_require__(/*! ./_math-sign */ \"./node_modules/core-js/modules/_math-sign.js\")\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.math.sign.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.set-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.3.19 Object.setPrototypeOf(O, proto)\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\n$export($export.S, 'Object', {\n  setPrototypeOf: __webpack_require__(/*! ./_set-proto */ \"./node_modules/core-js/modules/_set-proto.js\").set\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.object.set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // 19.1.3.6 Object.prototype.toString()\n\nvar classof = __webpack_require__(/*! ./_classof */ \"./node_modules/core-js/modules/_classof.js\");\n\nvar test = {};\ntest[__webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\")('toStringTag')] = 'z';\n\nif (test + '' != '[object z]') {\n  __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\")(Object.prototype, 'toString', function toString() {\n    return '[object ' + classof(this) + ']';\n  }, true);\n}\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.object.to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.exec.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.exec.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar regexpExec = __webpack_require__(/*! ./_regexp-exec */ \"./node_modules/core-js/modules/_regexp-exec.js\");\n\n__webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\")({\n  target: 'RegExp',\n  proto: true,\n  forced: regexpExec !== /./.exec\n}, {\n  exec: regexpExec\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.regexp.exec.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.flags.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 21.2.5.3 get RegExp.prototype.flags()\nif (__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\") && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\").f(RegExp.prototype, 'flags', {\n  configurable: true,\n  get: __webpack_require__(/*! ./_flags */ \"./node_modules/core-js/modules/_flags.js\")\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.regexp.flags.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.split.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isRegExp = __webpack_require__(/*! ./_is-regexp */ \"./node_modules/core-js/modules/_is-regexp.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar speciesConstructor = __webpack_require__(/*! ./_species-constructor */ \"./node_modules/core-js/modules/_species-constructor.js\");\n\nvar advanceStringIndex = __webpack_require__(/*! ./_advance-string-index */ \"./node_modules/core-js/modules/_advance-string-index.js\");\n\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/modules/_to-length.js\");\n\nvar callRegExpExec = __webpack_require__(/*! ./_regexp-exec-abstract */ \"./node_modules/core-js/modules/_regexp-exec-abstract.js\");\n\nvar regexpExec = __webpack_require__(/*! ./_regexp-exec */ \"./node_modules/core-js/modules/_regexp-exec.js\");\n\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\");\n\nvar $min = Math.min;\nvar $push = [].push;\nvar $SPLIT = 'split';\nvar LENGTH = 'length';\nvar LAST_INDEX = 'lastIndex';\nvar MAX_UINT32 = 0xffffffff; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError\n\nvar SUPPORTS_Y = !fails(function () {\n  RegExp(MAX_UINT32, 'y');\n}); // @@split logic\n\n__webpack_require__(/*! ./_fix-re-wks */ \"./node_modules/core-js/modules/_fix-re-wks.js\")('split', 2, function (defined, SPLIT, $split, maybeCallNative) {\n  var internalSplit;\n\n  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {\n    // based on es5-shim implementation, need to rework it\n    internalSplit = function (separator, limit) {\n      var string = String(this);\n      if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split\n\n      if (!isRegExp(separator)) return $split.call(string, separator, limit);\n      var output = [];\n      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');\n      var lastLastIndex = 0;\n      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy\n\n      var separatorCopy = new RegExp(separator.source, flags + 'g');\n      var match, lastIndex, lastLength;\n\n      while (match = regexpExec.call(separatorCopy, string)) {\n        lastIndex = separatorCopy[LAST_INDEX];\n\n        if (lastIndex > lastLastIndex) {\n          output.push(string.slice(lastLastIndex, match.index));\n          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));\n          lastLength = match[0][LENGTH];\n          lastLastIndex = lastIndex;\n          if (output[LENGTH] >= splitLimit) break;\n        }\n\n        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop\n      }\n\n      if (lastLastIndex === string[LENGTH]) {\n        if (lastLength || !separatorCopy.test('')) output.push('');\n      } else output.push(string.slice(lastLastIndex));\n\n      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;\n    }; // Chakra, V8\n\n  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {\n    internalSplit = function (separator, limit) {\n      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);\n    };\n  } else {\n    internalSplit = $split;\n  }\n\n  return [// `String.prototype.split` method\n  // https://tc39.github.io/ecma262/#sec-string.prototype.split\n  function split(separator, limit) {\n    var O = defined(this);\n    var splitter = separator == undefined ? undefined : separator[SPLIT];\n    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);\n  }, // `RegExp.prototype[@@split]` method\n  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split\n  //\n  // NOTE: This cannot be properly polyfilled in engines that don't support\n  // the 'y' flag.\n  function (regexp, limit) {\n    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);\n    if (res.done) return res.value;\n    var rx = anObject(regexp);\n    var S = String(this);\n    var C = speciesConstructor(rx, RegExp);\n    var unicodeMatching = rx.unicode;\n    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to\n    // simulate the 'y' flag.\n\n    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);\n    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;\n    if (lim === 0) return [];\n    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];\n    var p = 0;\n    var q = 0;\n    var A = [];\n\n    while (q < S.length) {\n      splitter.lastIndex = SUPPORTS_Y ? q : 0;\n      var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));\n      var e;\n\n      if (z === null || (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {\n        q = advanceStringIndex(S, q, unicodeMatching);\n      } else {\n        A.push(S.slice(p, q));\n        if (A.length === lim) return A;\n\n        for (var i = 1; i <= z.length - 1; i++) {\n          A.push(z[i]);\n          if (A.length === lim) return A;\n        }\n\n        q = p = e;\n      }\n    }\n\n    A.push(S.slice(p));\n    return A;\n  }];\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.regexp.split.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ./es6.regexp.flags */ \"./node_modules/core-js/modules/es6.regexp.flags.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar $flags = __webpack_require__(/*! ./_flags */ \"./node_modules/core-js/modules/_flags.js\");\n\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\");\n\nvar TO_STRING = 'toString';\nvar $toString = /./[TO_STRING];\n\nvar define = function (fn) {\n  __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\")(RegExp.prototype, TO_STRING, fn, true);\n}; // 21.2.5.14 RegExp.prototype.toString()\n\n\nif (__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\")(function () {\n  return $toString.call({\n    source: 'a',\n    flags: 'b'\n  }) != '/a/b';\n})) {\n  define(function toString() {\n    var R = anObject(this);\n    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);\n  }); // FF44- RegExp#toString has a wrong name\n} else if ($toString.name != TO_STRING) {\n  define(function toString() {\n    return $toString.call(this);\n  });\n}\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.regexp.to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.includes.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// 21.1.3.7 String.prototype.includes(searchString, position = 0)\n\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\nvar context = __webpack_require__(/*! ./_string-context */ \"./node_modules/core-js/modules/_string-context.js\");\n\nvar INCLUDES = 'includes';\n$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ \"./node_modules/core-js/modules/_fails-is-regexp.js\")(INCLUDES), 'String', {\n  includes: function includes(searchString\n  /* , position = 0 */\n  ) {\n    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);\n  }\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.string.includes.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar $at = __webpack_require__(/*! ./_string-at */ \"./node_modules/core-js/modules/_string-at.js\")(true); // 21.1.3.27 String.prototype[@@iterator]()\n\n\n__webpack_require__(/*! ./_iter-define */ \"./node_modules/core-js/modules/_iter-define.js\")(String, 'String', function (iterated) {\n  this._t = String(iterated); // target\n\n  this._i = 0; // next index\n  // 21.1.5.2.1 %StringIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var index = this._i;\n  var point;\n  if (index >= O.length) return {\n    value: undefined,\n    done: true\n  };\n  point = $at(O, index);\n  this._i += point.length;\n  return {\n    value: point,\n    done: false\n  };\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.string.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.repeat.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\n$export($export.P, 'String', {\n  // 21.1.3.13 String.prototype.repeat(count)\n  repeat: __webpack_require__(/*! ./_string-repeat */ \"./node_modules/core-js/modules/_string-repeat.js\")\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.string.repeat.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.sub.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // B.2.3.13 String.prototype.sub()\n\n__webpack_require__(/*! ./_string-html */ \"./node_modules/core-js/modules/_string-html.js\")('sub', function (createHTML) {\n  return function sub() {\n    return createHTML(this, 'sub', '', '');\n  };\n});\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.string.sub.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // ECMAScript 6 symbols shim\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\n\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/modules/_has.js\");\n\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/modules/_descriptors.js\");\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\n\nvar META = __webpack_require__(/*! ./_meta */ \"./node_modules/core-js/modules/_meta.js\").KEY;\n\nvar $fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/modules/_fails.js\");\n\nvar shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/modules/_shared.js\");\n\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/modules/_set-to-string-tag.js\");\n\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/modules/_uid.js\");\n\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\n\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/modules/_wks-ext.js\");\n\nvar wksDefine = __webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/modules/_wks-define.js\");\n\nvar enumKeys = __webpack_require__(/*! ./_enum-keys */ \"./node_modules/core-js/modules/_enum-keys.js\");\n\nvar isArray = __webpack_require__(/*! ./_is-array */ \"./node_modules/core-js/modules/_is-array.js\");\n\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/modules/_an-object.js\");\n\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/modules/_is-object.js\");\n\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/modules/_to-object.js\");\n\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/modules/_to-iobject.js\");\n\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/modules/_to-primitive.js\");\n\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/modules/_property-desc.js\");\n\nvar _create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/modules/_object-create.js\");\n\nvar gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ \"./node_modules/core-js/modules/_object-gopn-ext.js\");\n\nvar $GOPD = __webpack_require__(/*! ./_object-gopd */ \"./node_modules/core-js/modules/_object-gopd.js\");\n\nvar $GOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/modules/_object-gops.js\");\n\nvar $DP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/modules/_object-dp.js\");\n\nvar $keys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\n\nvar gOPD = $GOPD.f;\nvar dP = $DP.f;\nvar gOPN = gOPNExt.f;\nvar $Symbol = global.Symbol;\nvar $JSON = global.JSON;\n\nvar _stringify = $JSON && $JSON.stringify;\n\nvar PROTOTYPE = 'prototype';\nvar HIDDEN = wks('_hidden');\nvar TO_PRIMITIVE = wks('toPrimitive');\nvar isEnum = {}.propertyIsEnumerable;\nvar SymbolRegistry = shared('symbol-registry');\nvar AllSymbols = shared('symbols');\nvar OPSymbols = shared('op-symbols');\nvar ObjectProto = Object[PROTOTYPE];\nvar USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;\nvar QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173\n\nvar setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687\n\nvar setSymbolDesc = DESCRIPTORS && $fails(function () {\n  return _create(dP({}, 'a', {\n    get: function () {\n      return dP(this, 'a', {\n        value: 7\n      }).a;\n    }\n  })).a != 7;\n}) ? function (it, key, D) {\n  var protoDesc = gOPD(ObjectProto, key);\n  if (protoDesc) delete ObjectProto[key];\n  dP(it, key, D);\n  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);\n} : dP;\n\nvar wrap = function (tag) {\n  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);\n\n  sym._k = tag;\n  return sym;\n};\n\nvar isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  return it instanceof $Symbol;\n};\n\nvar $defineProperty = function defineProperty(it, key, D) {\n  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);\n  anObject(it);\n  key = toPrimitive(key, true);\n  anObject(D);\n\n  if (has(AllSymbols, key)) {\n    if (!D.enumerable) {\n      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));\n      it[HIDDEN][key] = true;\n    } else {\n      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;\n      D = _create(D, {\n        enumerable: createDesc(0, false)\n      });\n    }\n\n    return setSymbolDesc(it, key, D);\n  }\n\n  return dP(it, key, D);\n};\n\nvar $defineProperties = function defineProperties(it, P) {\n  anObject(it);\n  var keys = enumKeys(P = toIObject(P));\n  var i = 0;\n  var l = keys.length;\n  var key;\n\n  while (l > i) $defineProperty(it, key = keys[i++], P[key]);\n\n  return it;\n};\n\nvar $create = function create(it, P) {\n  return P === undefined ? _create(it) : $defineProperties(_create(it), P);\n};\n\nvar $propertyIsEnumerable = function propertyIsEnumerable(key) {\n  var E = isEnum.call(this, key = toPrimitive(key, true));\n  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;\n  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;\n};\n\nvar $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {\n  it = toIObject(it);\n  key = toPrimitive(key, true);\n  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;\n  var D = gOPD(it, key);\n  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;\n  return D;\n};\n\nvar $getOwnPropertyNames = function getOwnPropertyNames(it) {\n  var names = gOPN(toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n\n  while (names.length > i) {\n    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);\n  }\n\n  return result;\n};\n\nvar $getOwnPropertySymbols = function getOwnPropertySymbols(it) {\n  var IS_OP = it === ObjectProto;\n  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n\n  while (names.length > i) {\n    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);\n  }\n\n  return result;\n}; // 19.4.1.1 Symbol([description])\n\n\nif (!USE_NATIVE) {\n  $Symbol = function Symbol() {\n    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');\n    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);\n\n    var $set = function (value) {\n      if (this === ObjectProto) $set.call(OPSymbols, value);\n      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;\n      setSymbolDesc(this, tag, createDesc(1, value));\n    };\n\n    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {\n      configurable: true,\n      set: $set\n    });\n    return wrap(tag);\n  };\n\n  redefine($Symbol[PROTOTYPE], 'toString', function toString() {\n    return this._k;\n  });\n  $GOPD.f = $getOwnPropertyDescriptor;\n  $DP.f = $defineProperty;\n  __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/modules/_object-gopn.js\").f = gOPNExt.f = $getOwnPropertyNames;\n  __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/modules/_object-pie.js\").f = $propertyIsEnumerable;\n  $GOPS.f = $getOwnPropertySymbols;\n\n  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ \"./node_modules/core-js/modules/_library.js\")) {\n    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);\n  }\n\n  wksExt.f = function (name) {\n    return wrap(wks(name));\n  };\n}\n\n$export($export.G + $export.W + $export.F * !USE_NATIVE, {\n  Symbol: $Symbol\n});\n\nfor (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14\n'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) wks(es6Symbols[j++]);\n\nfor (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);\n\n$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {\n  // 19.4.2.1 Symbol.for(key)\n  'for': function (key) {\n    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);\n  },\n  // 19.4.2.5 Symbol.keyFor(sym)\n  keyFor: function keyFor(sym) {\n    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');\n\n    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;\n  },\n  useSetter: function () {\n    setter = true;\n  },\n  useSimple: function () {\n    setter = false;\n  }\n});\n$export($export.S + $export.F * !USE_NATIVE, 'Object', {\n  // 19.1.2.2 Object.create(O [, Properties])\n  create: $create,\n  // 19.1.2.4 Object.defineProperty(O, P, Attributes)\n  defineProperty: $defineProperty,\n  // 19.1.2.3 Object.defineProperties(O, Properties)\n  defineProperties: $defineProperties,\n  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)\n  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,\n  // 19.1.2.7 Object.getOwnPropertyNames(O)\n  getOwnPropertyNames: $getOwnPropertyNames,\n  // 19.1.2.8 Object.getOwnPropertySymbols(O)\n  getOwnPropertySymbols: $getOwnPropertySymbols\n}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives\n// https://bugs.chromium.org/p/v8/issues/detail?id=3443\n\nvar FAILS_ON_PRIMITIVES = $fails(function () {\n  $GOPS.f(1);\n});\n$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {\n  getOwnPropertySymbols: function getOwnPropertySymbols(it) {\n    return $GOPS.f(toObject(it));\n  }\n}); // 24.3.2 JSON.stringify(value [, replacer [, space]])\n\n$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {\n  var S = $Symbol(); // MS Edge converts symbol values to JSON as {}\n  // WebKit converts symbol values to JSON as null\n  // V8 throws on boxed symbols\n\n  return _stringify([S]) != '[null]' || _stringify({\n    a: S\n  }) != '{}' || _stringify(Object(S)) != '{}';\n})), 'JSON', {\n  stringify: function stringify(it) {\n    var args = [it];\n    var i = 1;\n    var replacer, $replacer;\n\n    while (arguments.length > i) args.push(arguments[i++]);\n\n    $replacer = replacer = args[1];\n    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined\n\n    if (!isArray(replacer)) replacer = function (key, value) {\n      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);\n      if (!isSymbol(value)) return value;\n    };\n    args[1] = replacer;\n    return _stringify.apply($JSON, args);\n  }\n}); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)\n\n$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]\n\nsetToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]\n\nsetToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]\n\nsetToStringTag(global.JSON, 'JSON', true);\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es6.symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.includes.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" // https://github.com/tc39/Array.prototype.includes\n\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/modules/_export.js\");\n\nvar $includes = __webpack_require__(/*! ./_array-includes */ \"./node_modules/core-js/modules/_array-includes.js\")(true);\n\n$export($export.P, 'Array', {\n  includes: function includes(el\n  /* , fromIndex = 0 */\n  ) {\n    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);\n  }\n});\n\n__webpack_require__(/*! ./_add-to-unscopables */ \"./node_modules/core-js/modules/_add-to-unscopables.js\")('includes');\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es7.array.includes.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.async-iterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/modules/_wks-define.js\")('asyncIterator');\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es7.symbol.async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $iterators = __webpack_require__(/*! ./es6.array.iterator */ \"./node_modules/core-js/modules/es6.array.iterator.js\");\n\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/modules/_object-keys.js\");\n\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/modules/_redefine.js\");\n\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/modules/_global.js\");\n\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/modules/_hide.js\");\n\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/modules/_iterators.js\");\n\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/modules/_wks.js\");\n\nvar ITERATOR = wks('iterator');\nvar TO_STRING_TAG = wks('toStringTag');\nvar ArrayValues = Iterators.Array;\nvar DOMIterables = {\n  CSSRuleList: true,\n  // TODO: Not spec compliant, should be false.\n  CSSStyleDeclaration: false,\n  CSSValueList: false,\n  ClientRectList: false,\n  DOMRectList: false,\n  DOMStringList: false,\n  DOMTokenList: true,\n  DataTransferItemList: false,\n  FileList: false,\n  HTMLAllCollection: false,\n  HTMLCollection: false,\n  HTMLFormElement: false,\n  HTMLSelectElement: false,\n  MediaList: true,\n  // TODO: Not spec compliant, should be false.\n  MimeTypeArray: false,\n  NamedNodeMap: false,\n  NodeList: true,\n  PaintRequestList: false,\n  Plugin: false,\n  PluginArray: false,\n  SVGLengthList: false,\n  SVGNumberList: false,\n  SVGPathSegList: false,\n  SVGPointList: false,\n  SVGStringList: false,\n  SVGTransformList: false,\n  SourceBufferList: false,\n  StyleSheetList: true,\n  // TODO: Not spec compliant, should be false.\n  TextTrackCueList: false,\n  TextTrackList: false,\n  TouchList: false\n};\n\nfor (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {\n  var NAME = collections[i];\n  var explicit = DOMIterables[NAME];\n  var Collection = global[NAME];\n  var proto = Collection && Collection.prototype;\n  var key;\n\n  if (proto) {\n    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);\n    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);\n    Iterators[NAME] = ArrayValues;\n    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/web.dom.iterable.js?");

/***/ }),

/***/ "./ui.js":
/*!***************!*\
  !*** ./ui.js ***!
  \***************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return uiOf; });\n/* harmony import */ var core_js_modules_es6_string_sub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.string.sub */ \"./node_modules/core-js/modules/es6.string.sub.js\");\n/* harmony import */ var core_js_modules_es6_string_sub__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_sub__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es6_array_fill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.array.fill */ \"./node_modules/core-js/modules/es6.array.fill.js\");\n/* harmony import */ var core_js_modules_es6_array_fill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_fill__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.function.name */ \"./node_modules/core-js/modules/es6.function.name.js\");\n/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es7.array.includes */ \"./node_modules/core-js/modules/es7.array.includes.js\");\n/* harmony import */ var core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_array_includes__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.string.includes */ \"./node_modules/core-js/modules/es6.string.includes.js\");\n/* harmony import */ var core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_string_includes__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common.js */ \"./common.js\");\n/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./board.js */ \"./board.js\");\n\n\n\n\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// Everything what has something to do with producing visual output or handling user input is in this file\n\n // returns new Ui class for given space\n\nfunction uiOf(game) {\n  var S = 64; // size of stone from point to point\n\n  var CNW = 685;\n  var CNH = 685 + 67;\n  var HUE_CLICKABLE = 150;\n  var HUE_LANDING = HUE_CLICKABLE + 35;\n  var SQRT3_2 = Math.sqrt(3) / 2;\n  var SQRT2_3 = Math.sqrt(2) / 3;\n\n  var _ctx;\n\n  var _canvas;\n\n  var _cacheCanvas;\n\n  var _cacheCtx;\n\n  var _frames = 0;\n  var _target = null;\n\n  var _drawQue = new _common_js__WEBPACK_IMPORTED_MODULE_5__[\"PriorityQueue\"]();\n\n  var _invalidated = true;\n  var _showMenu = true;\n  var _disabledPlayers = [];\n  return new (\n  /*#__PURE__*/\n  function () {\n    function Ui() {\n      _classCallCheck(this, Ui);\n    }\n\n    _createClass(Ui, [{\n      key: \"on\",\n      value: function on(canvas) {\n        _canvas = canvas;\n        _ctx = setupCanvasHDPI(_canvas, CNW, CNH, {\n          alpha: true\n        });\n        _cacheCanvas = document.createElement('canvas'); // _canvas.cloneNode()\n        // game.space.each((tile, hex) => drawTile(tile, hex))\n\n        _cacheCanvas.with = _canvas.with;\n        _cacheCanvas.height = _canvas.height;\n        _cacheCtx = setupCanvasHDPI(_cacheCanvas, CNW, CNH, {\n          _willReadFrequently: true\n        }); // prepare background\n\n        _cacheCtx.filter = \"brightness(120%) contrast(20%) blur(2px)\";\n        game.space.each(function (tile, hex) {\n          return drawTile(tile, hex, _cacheCtx);\n        });\n        canvas.addEventListener('mousemove', this.mouseMove);\n        canvas.addEventListener('mousedown', this.mouseClick);\n        document.addEventListener('keypress', this.keyPress);\n        this.startRenderLoop();\n        return this;\n      }\n    }, {\n      key: \"off\",\n      value: function off(canvas) {\n        this.stopRenderLoop();\n        canvas = canvas || _canvas;\n        canvas.removeEventListener('mousemove', this.mouseMove);\n        canvas.removeEventListener('mousedown', this.mouseClick);\n        document.removeEventListener('keypress', this.keyPress);\n        return this;\n      }\n    }, {\n      key: \"disableInputFor\",\n      value: function disableInputFor(playerIndexes) {\n        _disabledPlayers = playerIndexes;\n      }\n    }, {\n      key: \"showMenu\",\n      value: function showMenu() {\n        _showMenu = true;\n        return this;\n      }\n    }, {\n      key: \"hideMenu\",\n      value: function hideMenu() {\n        _showMenu = false;\n        return this;\n      }\n    }, {\n      key: \"touch\",\n      value: function touch() {\n        _invalidated = true;\n      }\n    }, {\n      key: \"mouseClick\",\n      value: function mouseClick(event) {\n        if (_showMenu) {\n          game.menu.forEach(function (_ref, i) {\n            var pos = _ref.pos,\n                action = _ref.action;\n            action && eventToHexExact(event).distance(pos) <= 1 && action();\n          });\n          return;\n        }\n\n        if (_disabledPlayers.includes(game._activePlayerIndex)) {\n          return;\n        }\n\n        game.onClick(eventToHex(event));\n        _invalidated = true;\n      }\n    }, {\n      key: \"mouseMove\",\n      value: function mouseMove(event) {\n        if (_showMenu) {\n          _canvas.style.cursor = 'default';\n          game.menu.forEach(function (_ref2, i) {\n            var pos = _ref2.pos,\n                action = _ref2.action;\n\n            if (game.menu[i].active = action && eventToHexExact(event).distance(pos) <= 1) {\n              _canvas.style.cursor = 'pointer';\n            }\n          });\n          return;\n        }\n\n        var target = eventToHex(event);\n\n        if (_disabledPlayers.includes(game._activePlayerIndex)) {\n          return;\n        }\n\n        if (game.isClickable(target)) {\n          _canvas.style.cursor = 'pointer'; // store last hovered tile pos\n\n          _target = target;\n        } else {\n          _canvas.style.cursor = 'default';\n          _target = null;\n        }\n\n        _invalidated = true;\n      }\n    }, {\n      key: \"keyPress\",\n      value: function keyPress(event) {\n        if (_disabledPlayers.includes(game._activePlayerIndex)) {\n          return;\n        }\n\n        var handBug = game.activePlayer().hand.findBug(function (bug) {\n          return bug.name[0].toLowerCase() === event.key;\n        });\n        _invalidated = true;\n\n        if (handBug) {\n          return game.onClick(handBug.pos);\n        }\n\n        var spaceBug = game.space.findBug(function (bug) {\n          return bug.name[0].toLowerCase() === event.key && bug.color === game.activePlayer().color && bug !== game.selected && !game.space.isHiveBridge(bug.pos);\n        });\n\n        if (spaceBug) {\n          return game.onClick(spaceBug.pos);\n        }\n      }\n    }, {\n      key: \"startRenderLoop\",\n      value: function startRenderLoop() {\n        this.stop = false;\n        this.touch();\n        requestAnimationFrame(this.onFrame.bind(this));\n      }\n    }, {\n      key: \"stopRenderLoop\",\n      value: function stopRenderLoop() {\n        this.stop = true;\n      }\n    }, {\n      key: \"onFrame\",\n      value: function onFrame(t) {\n        if (_frames++ % 2 === 0) // 30fps\n          this.redraw(t);\n        if (!this.stop) requestAnimationFrame(this.onFrame.bind(this));\n      }\n    }, {\n      key: \"redraw\",\n      value: function redraw(t) {\n        if (_showMenu) {\n          drawBackground();\n          drawMenu();\n          return;\n        }\n\n        if (_invalidated || this._oneMoreFrame) {\n          // background\n          drawBackground();\n          var someAnimating = false; // bugs\n\n          game.space.each(function (tile, hex) {\n            someAnimating = drawBugsOftile(tile, hex) || someAnimating;\n          });\n          game.players.forEach(function (_ref3) {\n            var hand = _ref3.hand;\n            return hand.each(function (b) {\n              return drawBug(b, undefined, true);\n            });\n          });\n\n          if (someAnimating) {\n            game.disableInput();\n          } else {\n            game.enableInput();\n          } // outlines (selected, path, and landings)\n\n\n          if (game.selected) {\n            drawOutline(game.selected.pos, HUE_CLICKABLE);\n            game.landings.forEach(function (pos) {\n              drawOutline(pos, HUE_LANDING);\n            });\n            _target && game.selected && (game.selected.pathTo(game.space, _target) || []).forEach(function (pos, i) {\n              i > 0 && _drawQue.push(function () {\n                return drawDot(pos, HUE_LANDING);\n              }, 3);\n            });\n          }\n\n          if (game.message) {\n            _drawQue.push(function () {\n              var _hexToScreen = hexToScreen(new _board_js__WEBPACK_IMPORTED_MODULE_6__[\"Hex\"](0, 0)),\n                  x = _hexToScreen.x,\n                  y = _hexToScreen.y;\n\n              _ctx.font = \"normal 52px monospace\";\n\n              var w = _ctx.measureText(game.message).width;\n\n              _ctx.fillStyle = '#eee';\n\n              _ctx.fillText(game.message, x - w / 2 - 1, y - 1);\n\n              _ctx.filter = \"blur(2px)\";\n\n              _ctx.fillText(game.message, x - w / 2 - 1, y - 1);\n\n              _ctx.fillStyle = '#111';\n\n              _ctx.fillText(game.message, x - w / 2 + 2, y + 2);\n\n              _ctx.filter = \"blur(4px)\";\n\n              _ctx.fillText(game.message, x - w / 2 + 2, y + 2);\n\n              _ctx.fillStyle = '#5ef';\n              _ctx.filter = \"none\";\n\n              _ctx.fillText(game.message, x - w / 2, y);\n            }, 10);\n          } // end\n\n\n          _invalidated = someAnimating || false;\n\n          if (!_invalidated && !this._oneMoreFrame) {\n            // animation just ended\n            this._oneMoreFrame = true;\n            _target = null;\n          } else {\n            this._oneMoreFrame = false;\n          }\n        } // render always:\n\n\n        var p1 = new _board_js__WEBPACK_IMPORTED_MODULE_6__[\"Hex\"](-10, 5);\n        var p2 = p1.rotate(-1);\n        drawLoader(t, p1, game.players[0]);\n        drawLoader(t, p2, game.players[1]); // call deffered drawing stuff\n\n        while (_drawQue.len() > 0) {\n          _drawQue.pop()();\n        }\n      }\n    }]);\n\n    return Ui;\n  }())(); // canvas related functions\n\n  function setupCanvasHDPI(canvas, w, h, options) {\n    var ratio = window.devicePixelRatio || 1;\n\n    if (ratio > 2) {\n      ratio /= 2; // it would be too much pixels to render for mobiles with dpr 3 or more\n    }\n\n    canvas.width = w * ratio;\n    canvas.height = h * ratio;\n    canvas.style.width = w + 'px';\n    canvas.style.height = h + 'px';\n    var ctx = canvas.getContext('2d', options);\n    ctx.scale(ratio, ratio);\n    return ctx;\n  }\n\n  function drawBackground() {\n    _ctx.clearRect(0, 0, CNW, CNH);\n\n    _ctx.drawImage(_cacheCanvas, 0, 0, CNW, CNH);\n  }\n\n  function drawMenu() {\n    var color = '#776';\n    var colorH = '#665';\n    var background = '#eb06';\n    var backgroundH = '#eb0a';\n    game.menu.forEach(function (_ref4) {\n      var pos = _ref4.pos,\n          label = _ref4.label,\n          action = _ref4.action,\n          active = _ref4.active;\n      _ctx.filter = action ? 'none' : 'brightness(130%) grayscale(90%)';\n\n      var _hexToScreen2 = hexToScreen(pos),\n          x = _hexToScreen2.x,\n          y = _hexToScreen2.y;\n\n      hexPath(_ctx, x, y, S);\n      _ctx.fillStyle = active ? backgroundH : background;\n      _ctx.strokeStyle = active ? colorH : color;\n      _ctx.lineWidth = 8;\n      _ctx.lineCap = 'round';\n      _ctx.lineJoin = 'round';\n\n      _ctx.fill();\n\n      _ctx.stroke();\n\n      var w = _ctx.measureText(label).width;\n\n      _ctx.fillStyle = active ? colorH : color;\n      _ctx.font = 'normal 36px emoji-symbols';\n\n      _ctx.fillText(Object(_common_js__WEBPACK_IMPORTED_MODULE_5__[\"uncolorEmoji\"])(label), x - w / 2, y + 12);\n\n      _ctx.filter = 'none';\n    });\n  }\n\n  function hexToScreen(_ref5) {\n    var q = _ref5.q,\n        r = _ref5.r;\n    // let x = S/2 * (    3/2 * q                   )\n    // let y = S/2 * (SQRT3_2 * q + Math.sqrt(3) * r)\n    var x = S / 2 * (Math.sqrt(3) * q + SQRT3_2 * r);\n    var y = S / 2 * (3 / 2 * r);\n    x += CNW / 2;\n    y += CNH / 2;\n    return {\n      x: x,\n      y: y\n    };\n  }\n\n  function screenToHex(_ref6) {\n    var x = _ref6.x,\n        y = _ref6.y;\n    x -= CNW / 2;\n    y -= CNH / 2; // let q = ( 2/3 * x                     ) / (S/2)\n    // let r = (-1/3 * x + Math.sqrt(3)/3 * y) / (S/2)\n\n    var q = (Math.sqrt(3) / 3 * x - 1 / 3 * y) / (S / 2);\n    var r = 2 / 3 * y / (S / 2);\n    return new _board_js__WEBPACK_IMPORTED_MODULE_6__[\"Hex\"](q, r);\n  }\n\n  function eventToHex(_ref7) {\n    var x = _ref7.offsetX,\n        y = _ref7.offsetY;\n    return screenToHex({\n      x: x,\n      y: y\n    }).round();\n  }\n\n  function eventToHexExact(_ref8) {\n    var x = _ref8.offsetX,\n        y = _ref8.offsetY;\n    return screenToHex({\n      x: x,\n      y: y\n    });\n  }\n\n  function drawTile(tile, hex, ctx) {\n    ctx = ctx || _ctx;\n\n    var _hexToScreen3 = hexToScreen(hex),\n        x = _hexToScreen3.x,\n        y = _hexToScreen3.y;\n\n    var delta = hex.distance(new _board_js__WEBPACK_IMPORTED_MODULE_6__[\"Hex\"](0, 0));\n    var cube = hex.toCube();\n    var r = cube.x * 45,\n        g = cube.z * 45,\n        b = cube.y * 45;\n    ctx.strokeStyle = ctx.fillStyle = \"rgba(\".concat(r, \",\").concat(g, \",\").concat(b, \",\").concat(0.2 + 0.1 * delta, \")\");\n    ctx.lineWidth = 2;\n    hexPath(ctx, x, y, S / 2);\n    ctx.fill();\n    ctx.stroke();\n  }\n\n  function drawBugsOftile(tile, hex) {\n    var someAnimating = false;\n    var offset = new _board_js__WEBPACK_IMPORTED_MODULE_6__[\"Hex\"](+0.0, -0.2);\n    tile.forEach(function (bug, i) {\n      var drawPos = bug.pos.add(offset.scale(i));\n      var isTop = i === tile.length - 1;\n\n      if (bug.animation) {\n        // drawing\n        var _bug$animation = bug.animation,\n            ms = _bug$animation.ms,\n            path = _bug$animation.path,\n            since = _bug$animation.since,\n            ease = _bug$animation.ease;\n        var sofar = Date.now() - since;\n        var jumps = path.length - 1;\n        var duration = ms * jumps * 1;\n\n        if (sofar > duration) {\n          // destination reached\n          bug.animation = null;\n        } else {\n          someAnimating = true; // compute drawPos position during animation\n\n          var t = ease(Math.min(sofar / duration), 1);\n\n          var _i = Math.floor(t * jumps); // path segment index\n\n\n          var diff = _i >= jumps ? console.error('index jumped outof path') || new _board_js__WEBPACK_IMPORTED_MODULE_6__[\"Hex\"](0, 0) // this should not happen?\n          : path[_i + 1].sub(path[_i]);\n          var tSeg = t * duration % ms / ms; // 0-1\n\n          drawPos = path[_i].add(diff.scale(tSeg));\n        }\n      }\n\n      var draw = function draw() {\n        return drawBug(bug, drawPos, isTop);\n      };\n\n      var isMoving = Boolean(bug.animation);\n      var prio = 0 + // most bugs are grounded\n      +(i > 0) + // higher elevation on top\n      +isMoving; // animating draw even higher\n\n      _drawQue.push(draw, prio);\n    });\n    return someAnimating;\n  }\n\n  function drawBug(bug) {\n    var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : bug.pos;\n    var isTop = arguments.length > 2 ? arguments[2] : undefined;\n\n    var _hexToScreen4 = hexToScreen(pos),\n        x = _hexToScreen4.x,\n        y = _hexToScreen4.y;\n\n    var r = S / 2;\n    var highlighted = _target && _target.eq(bug.pos) && isTop || game.selected === bug || bug.animation;\n\n    if (highlighted) {\n      r *= 1.25;\n    }\n\n    {\n      // stone\n      hexPath(_ctx, x, y, r);\n\n      var grad = _ctx.createLinearGradient(x - r, y - r, x + r, y + r);\n\n      grad.addColorStop(0, bug.color === game.players[1].color ? '#fff' : '#666');\n      grad.addColorStop(1, bug.color === game.players[1].color ? '#999' : '#000');\n      _ctx.fillStyle = grad;\n\n      _ctx.fill();\n\n      _ctx.lineWidth = 1;\n      _ctx.lineJoin = 'round';\n      _ctx.strokeStyle = '#808080';\n\n      _ctx.stroke();\n\n      _ctx.beginPath();\n\n      _ctx.moveTo(x, y + r);\n\n      _ctx.arc(x, y, r * SQRT3_2 - 2, 0, Math.PI * 2);\n\n      _ctx.closePath();\n\n      _ctx.fillStyle = bug.color;\n\n      if (highlighted) {\n        _ctx.fillStyle = '#808080';\n      }\n\n      _ctx.fill();\n    }\n    {\n      // text\n      var txt = bug.symbol;\n      _ctx.textBaseline = 'middle';\n      _ctx.font = 'normal 40px emoji-symbols';\n\n      var w = _ctx.measureText(txt).width;\n\n      if (!highlighted) {\n        _ctx.filter = 'contrast(0%)';\n      }\n\n      _ctx.fillStyle = '#808080';\n\n      _ctx.fillText(txt, x - w / 2, y);\n\n      _ctx.filter = 'none';\n    }\n\n    if (isTop && game.isClickable(bug.pos)) {\n      _drawQue.push(function () {\n        return drawOutline(pos, HUE_CLICKABLE);\n      }, 0);\n    }\n  }\n\n  function drawDot(pos, hue) {\n    var r = S / 6;\n\n    var _hexToScreen5 = hexToScreen(pos),\n        x = _hexToScreen5.x,\n        y = _hexToScreen5.y;\n\n    hexPath(_ctx, x, y, r - 2);\n    _ctx.strokeStyle = \"hsla(\".concat(hue, \", 80%, 50%, 1)\");\n    _ctx.lineWidth = 2;\n    _ctx.lineCap = 'round';\n\n    _ctx.stroke();\n  }\n\n  function drawOutline(pos, hue) {\n    if (_disabledPlayers.includes(game._activePlayerIndex)) {\n      return;\n    }\n\n    var r = S / 2;\n    var dimm = hue === HUE_CLICKABLE && game.selected && !game.selected.pos.eq(pos.round());\n\n    if (_target && pos.round().eq(_target) && game.isClickable(_target) || // hover\n    game.selected && pos.round().eq(game.selected.pos) // selected\n    ) {\n        r *= 1.25;\n      }\n\n    var _hexToScreen6 = hexToScreen(pos),\n        x = _hexToScreen6.x,\n        y = _hexToScreen6.y;\n\n    _ctx.beginPath();\n\n    hexPath(_ctx, x, y, r - 3.5);\n    _ctx.strokeStyle = \"hsla(\".concat(hue, \", 80%, 50%, \").concat(dimm ? 0.25 : 1, \")\");\n    _ctx.lineWidth = 4;\n    _ctx.lineCap = 'round';\n\n    _ctx.stroke();\n  }\n\n  function drawLoader(t, pos, player) {\n    t /= 2000;\n    var a = t % 1 * Math.PI * 4 - Math.PI / 2;\n    var b = t / 2 % 1 * Math.PI * 4 - Math.PI / 2;\n\n    var _hexToScreen7 = hexToScreen(pos),\n        x = _hexToScreen7.x,\n        y = _hexToScreen7.y;\n\n    var txtLim = 10;\n    var name = player.name.length <= txtLim ? player.name : player.name.substr(0, txtLim - 1) + '…';\n    _ctx.font = 'normal 16px monospace';\n\n    var txtW = _ctx.measureText(name).width;\n\n    var txtOfst = 6;\n    var s = S * SQRT3_2;\n    var r = s / 3;\n    x += s * 2;\n\n    _ctx.clearRect(x - r - 4, y - r - 4, r * 2 + txtW + txtOfst + 8, r * 2 + 8); // circle\n\n\n    if (player === game.activePlayer()) {\n      _ctx.beginPath();\n\n      _ctx.arc(x, y, r * SQRT2_3 + 2, a, b, a < b);\n\n      _ctx.strokeStyle = \"hsla(\".concat(t * 200 % 360, \", 25%, 50%, 1)\");\n      _ctx.lineCap = 'round';\n      _ctx.lineWidth = 10;\n\n      _ctx.stroke();\n    } // hex:\n\n\n    {\n      hexPath(_ctx, x, y, r - 0.5);\n      _ctx.strokeStyle = player.color;\n      _ctx.lineCap = 'round';\n      _ctx.lineWidth = 7;\n\n      _ctx.stroke();\n\n      hexPath(_ctx, x, y, r + 2.5);\n      _ctx.strokeStyle = '#808080';\n      _ctx.lineCap = 'round';\n      _ctx.lineWidth = 1;\n\n      _ctx.stroke();\n\n      x += txtOfst + r; // { // name label\n      //   let r = s/2 - 12\n      //   _ctx.beginPath()\n      //   _ctx.moveTo(x, y-r)\n      //   _ctx.lineTo(x+txtW, y-r)\n      //   _ctx.lineTo(x+SQRT3_2*r+txtW, y - SQRT2_3 * r)\n      //   _ctx.lineTo(x+SQRT3_2*r+txtW, y + SQRT2_3 * r)\n      //   _ctx.lineTo(x+txtW, y+r)\n      //   _ctx.lineTo(x, y+r)\n      //   _ctx.lineTo(x-SQRT3_2*r,  y + SQRT2_3 * r)\n      //   _ctx.lineTo(x-SQRT3_2*r,  y - SQRT2_3 * r)\n      //   _ctx.closePath()\n      //   _ctx.fillStyle = player.color\n      //   // _ctx.fillStyle = '#808080'\n      //   _ctx.lineCap = 'round'\n      //   _ctx.fill()\n      //   _ctx.stroke()\n      // }\n    } // name text:\n\n    {\n      _ctx.textBaseline = 'middle';\n      _ctx.font = 'bold 15px monospace';\n      _ctx.fillStyle = '#808080';\n\n      _ctx.fillText(name, x, y);\n    }\n  }\n\n  function hexPath(ctx, x, y, r) {\n    ctx.beginPath();\n    ctx.moveTo(x, y - r);\n    ctx.lineTo(x + SQRT3_2 * r, y - SQRT2_3 * r);\n    ctx.lineTo(x + SQRT3_2 * r, y + SQRT2_3 * r);\n    ctx.lineTo(x, y + r);\n    ctx.lineTo(x - SQRT3_2 * r, y + SQRT2_3 * r);\n    ctx.lineTo(x - SQRT3_2 * r, y - SQRT2_3 * r);\n    ctx.closePath();\n  }\n}\n\n//# sourceURL=webpack:///./ui.js?");

/***/ })

/******/ });