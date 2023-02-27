/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _normal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normal */ \"./src/normal.js\");\n// import {\n//     isNormalPortal\n// } from \"./constant\";\n// import {\n//     square,\n//     cube\n// } from \"./math\";\n\n\n\n// let arr = []\n\n// arr.customFun()\n\n// const func = () => {\n//     let a = 1\n//     console.log('asdf')\n// }\n\n// let bFunc = func.bind(arr)\n\n// bFunc()\n\nfunction test(){\n    if (true) {\n        // console.log(cube(2))\n        // console.log(square(2))\n        // document.write('is normal portal')\n        // console.log('this is normal portal', ENV_IS_NORMAL_PORTAL)\n        (0,_normal__WEBPACK_IMPORTED_MODULE_0__.normalFn)()\n        // sellerFn()\n        return\n        \n    } else {}\n}\n\ntest()\n\n// const fn = ()=>{\n//     switch (isNormalPortal){\n//         case true: {\n//             if (isNormalPortal) {\n//                 console.log(cube(2))\n//                 console.log(square(2))\n//                 return\n//             }\n//                 console.log('could be tree shaked')\n//                 // unusedFunction()\n//             break\n//         }\n//         case false:{\n//             console.log('false static logic ,could be shaked');\n//             break;\n//         }\n//         default:console.log(3)\n//     }\n// }\n\n// fn()\n\n//# sourceURL=webpack://demo/./src/index.js?");

/***/ }),

/***/ "./src/normal.js":
/*!***********************!*\
  !*** ./src/normal.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"normalFn\": () => (/* binding */ normalFn)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\n\n// if (ENV_IS_NORMAL_PORTAL){\n(0,_util__WEBPACK_IMPORTED_MODULE_0__.checkRuntimeEnv)('Normal','normal module')\n// }\n\nfunction normalFn(){\n    console.log(\"normalFn function running\")\n}\n\n//# sourceURL=webpack://demo/./src/normal.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkRuntimeEnv\": () => (/* binding */ checkRuntimeEnv)\n/* harmony export */ });\nfunction checkRuntimeEnv(portal, moduleName) {\n    console.log(`[checkRuntimeEnv] running in ${\"Normal\"} , received ${portal}, moduleName:${moduleName}`)\n    if (\"Normal\" !== portal) {\n        console.warn(`[checkRuntimeEnv] running in the wrong portal, expect ${portal} , received ${\"Normal\"}; moduleName:${moduleName}`)\n    }\n    let a = 1\n    let b = a + 1\n}\n\n//# sourceURL=webpack://demo/./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;