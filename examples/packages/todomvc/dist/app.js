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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Cannot find module 'babel-preset-react' from '/mnt/c/Users/gaper/GitHub/React-Type-R/examples/packages/todomvc'\n- If you want to resolve \"react\", use \"module:react\"\n- Did you mean \"@babel/react\"?\n    at Function.module.exports [as sync] (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/resolve/lib/sync.js:58:15)\n    at resolveStandardizedName (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/files/plugins.js:101:31)\n    at resolvePreset (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/files/plugins.js:58:10)\n    at loadPreset (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/files/plugins.js:77:20)\n    at createDescriptor (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-descriptors.js:154:9)\n    at items.map (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-descriptors.js:109:50)\n    at Array.map (<anonymous>)\n    at createDescriptors (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-descriptors.js:109:29)\n    at createPresetDescriptors (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-descriptors.js:101:10)\n    at presets (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-descriptors.js:47:19)\n    at mergeChainOpts (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-chain.js:320:26)\n    at /mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-chain.js:283:7\n    at buildRootChain (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/config-chain.js:120:22)\n    at loadPrivatePartialConfig (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/partial.js:85:55)\n    at Object.loadPartialConfig (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/@babel/core/lib/config/partial.js:110:18)\n    at Object.<anonymous> (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:140:26)\n    at Generator.next (<anonymous>)\n    at asyncGeneratorStep (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:3:103)\n    at _next (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:5:194)\n    at /mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:5:364\n    at new Promise (<anonymous>)\n    at Object.<anonymous> (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:5:97)\n    at Object._loader (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:220:18)\n    at Object.loader (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:56:18)\n    at Object.<anonymous> (/mnt/c/Users/gaper/GitHub/React-Type-R/examples/node_modules/babel-loader/lib/index.js:51:12)");

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map