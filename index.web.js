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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _signature = __webpack_require__(4);

var _signature2 = _interopRequireDefault(_signature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultSuccess = function defaultSuccess(json) {
  console.log(json);
  return json;
};


var defaultError = function defaultError(errorCode) {
  console.log(errorCode);
  return errorCode;
};

exports.default = function (ncmb, options) {
  var method = options.method,
      endpoint = options.endpoint,
      sessionToken = options.sessionToken,
      query = options.query,
      beforeFetch = options.beforeFetch,
      beforeSuccess = options.beforeSuccess,
      success = options.success,
      beforeError = options.beforeError,
      error = options.error;


  var nowTime = new Date().toISOString();
  var signature = (0, _signature2.default)(ncmb, { method: method,
    endpoint: endpoint,
    nowTime: nowTime,
    query: query
  });

  var fetchUrl = ncmb.url + '/' + endpoint;

  if (method === 'GET') {
    if (query instanceof Object) {
      fetchUrl += '?' + ncmb.sortObjectConvertToParameter(query);
    }
  }

  var headers = {
    'X-NCMB-Application-Key': ncmb.applicationkey,
    'X-NCMB-Timestamp': nowTime,
    'X-NCMB-Signature': signature,
    'Content-Type': 'application/json'
  };

  if (sessionToken) {
    if (!ncmb.currentUser) throw new Error('currentUser is undefind');
    headers['X-NCMB-Apps-Session-Token'] = ncmb.currentUser.sessionToken;
  }

  if (typeof beforeFetch === 'function') beforeFetch();

  fetch(fetchUrl, {
    method: method,
    headers: headers,
    body: method === 'POST' ? JSON.stringify(query) : null
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (typeof beforeSuccess === 'function') beforeSuccess(json);
    return success ? success(json) : defaultSuccess(json);
  }).catch(function (errorCode) {
    if (typeof beforeError === 'function') beforeError(errorCode);
    return error ? error(errorCode) : defaultError(errorCode);
  });
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login = __webpack_require__(2);

var _login2 = _interopRequireDefault(_login);

var _users = __webpack_require__(7);

var _users2 = _interopRequireDefault(_users);

var _requestPasswordReset = __webpack_require__(3);

var _requestPasswordReset2 = _interopRequireDefault(_requestPasswordReset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NCMB = function NCMB(keys) {
  var _this = this;

  _classCallCheck(this, NCMB);

  this.applicationkey = keys.applicationkey;
  this.clientKey = keys.clientKey;
  this.version = '2013-09-01';
  this.scriptVersion = '2015-09-01';
  this.fqdn = 'mb.api.cloud.nifty.com';
  this.scriptFqdn = 'script.mb.api.cloud.nifty.com';
  this.port = 443;
  this.protocol = 'https:';
  this.signatureMethod = 'HmacSHA256';
  this.signatureVersion = 2;
  this.stub = false;
  this.currentUser = false;
  this.url = this.protocol + '//' + this.fqdn + '/' + this.version;

  this.setCurrentUser = function (json) {
    _this.currentUser = json;
  };

  this.sortObjectConvertToParameter = function (queryObject) {
    return Object.keys(queryObject).sort().map(function (key) {
      return [key, queryObject[key]].join('=');
    }).join('&');
  };

  this.login = function (options) {
    (0, _login2.default)(_this, options);
  };

  this.users = {};

  this.users.create = function (options) {
    _users2.default.create(_this, options);
  };

  this.users.get = function (options) {
    _users2.default.get(_this, options);
  };

  this.requestPasswordReset = function (options) {
    (0, _requestPasswordReset2.default)(_this, options);
  };
};

exports.default = NCMB;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetch = __webpack_require__(0);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ncmb, options) {
  var query = options.query,
      success = options.success,
      error = options.error;


  (0, _fetch2.default)(ncmb, {
    method: 'GET',
    endpoint: 'login',
    sessionToken: false,
    query: query,
    success: success,
    error: error,
    beforeFetch: null,
    beforeSuccess: function beforeSuccess(json) {
      ncmb.setCurrentUser(json);
    },
    beforeError: null
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetch = __webpack_require__(0);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ncmb, options) {
  var query = options.query,
      success = options.success,
      error = options.error;


  (0, _fetch2.default)(ncmb, {
    method: 'POST',
    endpoint: 'requestPasswordReset',
    sessionToken: false,
    query: query,
    success: success,
    error: error,
    beforeFetch: null,
    beforeSuccess: null,
    beforeError: null
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jssha = __webpack_require__(9);

var _jssha2 = _interopRequireDefault(_jssha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ncmb, options) {
  var method = options.method,
      endpoint = options.endpoint,
      nowTime = options.nowTime,
      query = options.query;


  var sha256 = new _jssha2.default('SHA-256', 'TEXT');

  var signatureObject = {
    SignatureMethod: ncmb.signatureMethod,
    SignatureVersion: ncmb.signatureVersion,
    'X-NCMB-Application-Key': ncmb.applicationkey,
    'X-NCMB-Timestamp': nowTime
  };

  if (method === 'GET') {
    if (query instanceof Object) {
      Object.keys(query).forEach(function (key) {
        var q = query[key];
        if ((typeof q === 'undefined' ? 'undefined' : _typeof(q)) === 'object') q = JSON.stringify(q);
        signatureObject[key] = encodeURIComponent(q);
      });
    }
  }

  sha256.setHMACKey(ncmb.clientKey, 'TEXT');

  sha256.update([method, ncmb.fqdn, '/' + ncmb.version + '/' + endpoint, ncmb.sortObjectConvertToParameter(signatureObject)].join('\n'));
  return sha256.getHMAC('B64');
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetch = __webpack_require__(0);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ncmb, options) {
  var query = options.query,
      success = options.success,
      error = options.error;


  (0, _fetch2.default)(ncmb, {
    method: 'POST',
    endpoint: 'users',
    sessionToken: false,
    query: query,
    success: success,
    error: error,
    beforeFetch: null,
    beforeSuccess: function beforeSuccess(json) {
      ncmb.setCurrentUser(json);
    },
    beforeError: null
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetch = __webpack_require__(0);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ncmb, options) {
  var success = options.success,
      error = options.error;


  if (!ncmb.currentUser) throw new Error('currentUser is undefind');

  var sessionToken = ncmb.currentUser.sessionToken;
  if (!sessionToken) throw new Error('sessionToken is undefind');

  (0, _fetch2.default)(ncmb, {
    method: 'GET',
    endpoint: 'users/' + ncmb.currentUser.objectId,
    sessionToken: true,
    query: null,
    success: success,
    error: error,
    beforeFetch: null,
    beforeSuccess: null,
    beforeError: null
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = __webpack_require__(5);

var _create2 = _interopRequireDefault(_create);

var _get = __webpack_require__(6);

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  create: _create2.default,
  get: _get2.default
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ncmb = __webpack_require__(1);

var _ncmb2 = _interopRequireDefault(_ncmb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.NCMB = _ncmb2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;/*
 A JavaScript implementation of the SHA family of hashes, as
 defined in FIPS PUB 180-4 and FIPS PUB 202, as well as the corresponding
 HMAC implementation as defined in FIPS PUB 198a

 Copyright Brian Turek 2008-2016
 Distributed under the BSD License
 See http://caligatio.github.com/jsSHA/ for more information

 Several functions taken from Paul Johnston
*/
(function(X){function C(f,b,c){var d=0,a=[],k=0,g,e,n,h,m,r,t,q,v=!1,u=[],w=[],x,y=!1,z=!1;c=c||{};g=c.encoding||"UTF8";x=c.numRounds||1;n=J(b,g);if(x!==parseInt(x,10)||1>x)throw Error("numRounds must a integer >= 1");if("SHA-1"===f)m=512,r=K,t=Y,h=160,q=function(b){return b.slice()};else if(0===f.lastIndexOf("SHA-",0))if(r=function(b,d){return L(b,d,f)},t=function(b,d,c,a){var l,k;if("SHA-224"===f||"SHA-256"===f)l=(d+65>>>9<<4)+15,k=16;else if("SHA-384"===f||"SHA-512"===f)l=(d+129>>>
10<<5)+31,k=32;else throw Error("Unexpected error in SHA-2 implementation");for(;b.length<=l;)b.push(0);b[d>>>5]|=128<<24-d%32;d=d+c;b[l]=d&4294967295;b[l-1]=d/4294967296|0;c=b.length;for(d=0;d<c;d+=k)a=L(b.slice(d,d+k),a,f);if("SHA-224"===f)b=[a[0],a[1],a[2],a[3],a[4],a[5],a[6]];else if("SHA-256"===f)b=a;else if("SHA-384"===f)b=[a[0].a,a[0].b,a[1].a,a[1].b,a[2].a,a[2].b,a[3].a,a[3].b,a[4].a,a[4].b,a[5].a,a[5].b];else if("SHA-512"===f)b=[a[0].a,a[0].b,a[1].a,a[1].b,a[2].a,a[2].b,a[3].a,a[3].b,a[4].a,
a[4].b,a[5].a,a[5].b,a[6].a,a[6].b,a[7].a,a[7].b];else throw Error("Unexpected error in SHA-2 implementation");return b},q=function(b){return b.slice()},"SHA-224"===f)m=512,h=224;else if("SHA-256"===f)m=512,h=256;else if("SHA-384"===f)m=1024,h=384;else if("SHA-512"===f)m=1024,h=512;else throw Error("Chosen SHA variant is not supported");else if(0===f.lastIndexOf("SHA3-",0)||0===f.lastIndexOf("SHAKE",0)){var F=6;r=D;q=function(b){var f=[],a;for(a=0;5>a;a+=1)f[a]=b[a].slice();return f};if("SHA3-224"===
f)m=1152,h=224;else if("SHA3-256"===f)m=1088,h=256;else if("SHA3-384"===f)m=832,h=384;else if("SHA3-512"===f)m=576,h=512;else if("SHAKE128"===f)m=1344,h=-1,F=31,z=!0;else if("SHAKE256"===f)m=1088,h=-1,F=31,z=!0;else throw Error("Chosen SHA variant is not supported");t=function(b,f,a,d,c){a=m;var l=F,k,g=[],e=a>>>5,h=0,p=f>>>5;for(k=0;k<p&&f>=a;k+=e)d=D(b.slice(k,k+e),d),f-=a;b=b.slice(k);for(f%=a;b.length<e;)b.push(0);k=f>>>3;b[k>>2]^=l<<24-k%4*8;b[e-1]^=128;for(d=D(b,d);32*g.length<c;){b=d[h%5][h/
5|0];g.push((b.b&255)<<24|(b.b&65280)<<8|(b.b&16711680)>>8|b.b>>>24);if(32*g.length>=c)break;g.push((b.a&255)<<24|(b.a&65280)<<8|(b.a&16711680)>>8|b.a>>>24);h+=1;0===64*h%a&&D(null,d)}return g}}else throw Error("Chosen SHA variant is not supported");e=B(f);this.setHMACKey=function(b,a,c){var l;if(!0===v)throw Error("HMAC key already set");if(!0===y)throw Error("Cannot set HMAC key after calling update");if(!0===z)throw Error("SHAKE is not supported for HMAC");g=(c||{}).encoding||"UTF8";a=J(a,g)(b);
b=a.binLen;a=a.value;l=m>>>3;c=l/4-1;if(l<b/8){for(a=t(a,b,0,B(f),h);a.length<=c;)a.push(0);a[c]&=4294967040}else if(l>b/8){for(;a.length<=c;)a.push(0);a[c]&=4294967040}for(b=0;b<=c;b+=1)u[b]=a[b]^909522486,w[b]=a[b]^1549556828;e=r(u,e);d=m;v=!0};this.update=function(b){var f,c,g,h=0,q=m>>>5;f=n(b,a,k);b=f.binLen;c=f.value;f=b>>>5;for(g=0;g<f;g+=q)h+m<=b&&(e=r(c.slice(g,g+q),e),h+=m);d+=h;a=c.slice(h>>>5);k=b%m;y=!0};this.getHash=function(b,c){var g,m,n,r;if(!0===v)throw Error("Cannot call getHash after setting HMAC key");
n=M(c);if(!0===z){if(-1===n.shakeLen)throw Error("shakeLen must be specified in options");h=n.shakeLen}switch(b){case "HEX":g=function(b){return N(b,h,n)};break;case "B64":g=function(b){return O(b,h,n)};break;case "BYTES":g=function(b){return P(b,h)};break;case "ARRAYBUFFER":try{m=new ArrayBuffer(0)}catch(sa){throw Error("ARRAYBUFFER not supported by this environment");}g=function(b){return Q(b,h)};break;default:throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");}r=t(a.slice(),k,d,q(e),
h);for(m=1;m<x;m+=1)!0===z&&0!==h%32&&(r[r.length-1]&=4294967040<<24-h%32),r=t(r,h,0,B(f),h);return g(r)};this.getHMAC=function(b,c){var g,n,u,x;if(!1===v)throw Error("Cannot call getHMAC without first setting HMAC key");u=M(c);switch(b){case "HEX":g=function(b){return N(b,h,u)};break;case "B64":g=function(b){return O(b,h,u)};break;case "BYTES":g=function(b){return P(b,h)};break;case "ARRAYBUFFER":try{g=new ArrayBuffer(0)}catch(z){throw Error("ARRAYBUFFER not supported by this environment");}g=function(b){return Q(b,
h)};break;default:throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");}n=t(a.slice(),k,d,q(e),h);x=r(w,B(f));x=t(n,h,m,x,h);return g(x)}}function a(f,b){this.a=f;this.b=b}function Z(f,b,a){var d=f.length,l,k,g,e,n;b=b||[0];a=a||0;n=a>>>3;if(0!==d%2)throw Error("String of HEX type must be in byte increments");for(l=0;l<d;l+=2){k=parseInt(f.substr(l,2),16);if(isNaN(k))throw Error("String of HEX type contains invalid characters");e=(l>>>1)+n;for(g=e>>>2;b.length<=g;)b.push(0);b[g]|=k<<
8*(3-e%4)}return{value:b,binLen:4*d+a}}function aa(f,b,a){var d=[],l,k,g,e,d=b||[0];a=a||0;k=a>>>3;for(l=0;l<f.length;l+=1)b=f.charCodeAt(l),e=l+k,g=e>>>2,d.length<=g&&d.push(0),d[g]|=b<<8*(3-e%4);return{value:d,binLen:8*f.length+a}}function ba(f,b,a){var d=[],l=0,k,g,e,n,h,m,d=b||[0];a=a||0;b=a>>>3;if(-1===f.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");g=f.indexOf("=");f=f.replace(/\=/g,"");if(-1!==g&&g<f.length)throw Error("Invalid '=' found in base-64 string");
for(g=0;g<f.length;g+=4){h=f.substr(g,4);for(e=n=0;e<h.length;e+=1)k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(h[e]),n|=k<<18-6*e;for(e=0;e<h.length-1;e+=1){m=l+b;for(k=m>>>2;d.length<=k;)d.push(0);d[k]|=(n>>>16-8*e&255)<<8*(3-m%4);l+=1}}return{value:d,binLen:8*l+a}}function ca(a,b,c){var d=[],l,k,g,d=b||[0];c=c||0;l=c>>>3;for(b=0;b<a.byteLength;b+=1)g=b+l,k=g>>>2,d.length<=k&&d.push(0),d[k]|=a[b]<<8*(3-g%4);return{value:d,binLen:8*a.byteLength+c}}function N(a,b,c){var d=
"";b/=8;var l,k;for(l=0;l<b;l+=1)k=a[l>>>2]>>>8*(3-l%4),d+="0123456789abcdef".charAt(k>>>4&15)+"0123456789abcdef".charAt(k&15);return c.outputUpper?d.toUpperCase():d}function O(a,b,c){var d="",l=b/8,k,g,e;for(k=0;k<l;k+=3)for(g=k+1<l?a[k+1>>>2]:0,e=k+2<l?a[k+2>>>2]:0,e=(a[k>>>2]>>>8*(3-k%4)&255)<<16|(g>>>8*(3-(k+1)%4)&255)<<8|e>>>8*(3-(k+2)%4)&255,g=0;4>g;g+=1)8*k+6*g<=b?d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e>>>6*(3-g)&63):d+=c.b64Pad;return d}function P(a,
b){var c="",d=b/8,l,k;for(l=0;l<d;l+=1)k=a[l>>>2]>>>8*(3-l%4)&255,c+=String.fromCharCode(k);return c}function Q(a,b){var c=b/8,d,l=new ArrayBuffer(c);for(d=0;d<c;d+=1)l[d]=a[d>>>2]>>>8*(3-d%4)&255;return l}function M(a){var b={outputUpper:!1,b64Pad:"=",shakeLen:-1};a=a||{};b.outputUpper=a.outputUpper||!1;!0===a.hasOwnProperty("b64Pad")&&(b.b64Pad=a.b64Pad);if(!0===a.hasOwnProperty("shakeLen")){if(0!==a.shakeLen%8)throw Error("shakeLen must be a multiple of 8");b.shakeLen=a.shakeLen}if("boolean"!==
typeof b.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!==typeof b.b64Pad)throw Error("Invalid b64Pad formatting option");return b}function J(a,b){var c;switch(b){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(a){case "HEX":c=Z;break;case "TEXT":c=function(a,f,c){var e=[],p=[],n=0,h,m,r,t,q,e=f||[0];f=c||0;r=f>>>3;if("UTF8"===b)for(h=0;h<a.length;h+=1)for(c=a.charCodeAt(h),p=[],128>c?p.push(c):
2048>c?(p.push(192|c>>>6),p.push(128|c&63)):55296>c||57344<=c?p.push(224|c>>>12,128|c>>>6&63,128|c&63):(h+=1,c=65536+((c&1023)<<10|a.charCodeAt(h)&1023),p.push(240|c>>>18,128|c>>>12&63,128|c>>>6&63,128|c&63)),m=0;m<p.length;m+=1){q=n+r;for(t=q>>>2;e.length<=t;)e.push(0);e[t]|=p[m]<<8*(3-q%4);n+=1}else if("UTF16BE"===b||"UTF16LE"===b)for(h=0;h<a.length;h+=1){c=a.charCodeAt(h);"UTF16LE"===b&&(m=c&255,c=m<<8|c>>>8);q=n+r;for(t=q>>>2;e.length<=t;)e.push(0);e[t]|=c<<8*(2-q%4);n+=2}return{value:e,binLen:8*
n+f}};break;case "B64":c=ba;break;case "BYTES":c=aa;break;case "ARRAYBUFFER":try{c=new ArrayBuffer(0)}catch(d){throw Error("ARRAYBUFFER not supported by this environment");}c=ca;break;default:throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");}return c}function y(a,b){return a<<b|a>>>32-b}function R(f,b){return 32<b?(b=b-32,new a(f.b<<b|f.a>>>32-b,f.a<<b|f.b>>>32-b)):0!==b?new a(f.a<<b|f.b>>>32-b,f.b<<b|f.a>>>32-b):f}function v(a,b){return a>>>b|a<<32-b}function w(f,b){var c=null,
c=new a(f.a,f.b);return c=32>=b?new a(c.a>>>b|c.b<<32-b&4294967295,c.b>>>b|c.a<<32-b&4294967295):new a(c.b>>>b-32|c.a<<64-b&4294967295,c.a>>>b-32|c.b<<64-b&4294967295)}function S(f,b){var c=null;return c=32>=b?new a(f.a>>>b,f.b>>>b|f.a<<32-b&4294967295):new a(0,f.a>>>b-32)}function da(a,b,c){return a&b^~a&c}function ea(f,b,c){return new a(f.a&b.a^~f.a&c.a,f.b&b.b^~f.b&c.b)}function T(a,b,c){return a&b^a&c^b&c}function fa(f,b,c){return new a(f.a&b.a^f.a&c.a^b.a&c.a,f.b&b.b^f.b&c.b^b.b&c.b)}function ga(a){return v(a,
2)^v(a,13)^v(a,22)}function ha(f){var b=w(f,28),c=w(f,34);f=w(f,39);return new a(b.a^c.a^f.a,b.b^c.b^f.b)}function ia(a){return v(a,6)^v(a,11)^v(a,25)}function ja(f){var b=w(f,14),c=w(f,18);f=w(f,41);return new a(b.a^c.a^f.a,b.b^c.b^f.b)}function ka(a){return v(a,7)^v(a,18)^a>>>3}function la(f){var b=w(f,1),c=w(f,8);f=S(f,7);return new a(b.a^c.a^f.a,b.b^c.b^f.b)}function ma(a){return v(a,17)^v(a,19)^a>>>10}function na(f){var b=w(f,19),c=w(f,61);f=S(f,6);return new a(b.a^c.a^f.a,b.b^c.b^f.b)}function G(a,
b){var c=(a&65535)+(b&65535);return((a>>>16)+(b>>>16)+(c>>>16)&65535)<<16|c&65535}function oa(a,b,c,d){var l=(a&65535)+(b&65535)+(c&65535)+(d&65535);return((a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(l>>>16)&65535)<<16|l&65535}function H(a,b,c,d,l){var e=(a&65535)+(b&65535)+(c&65535)+(d&65535)+(l&65535);return((a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(l>>>16)+(e>>>16)&65535)<<16|e&65535}function pa(f,b){var c,d,l;c=(f.b&65535)+(b.b&65535);d=(f.b>>>16)+(b.b>>>16)+(c>>>16);l=(d&65535)<<16|c&65535;c=(f.a&65535)+
(b.a&65535)+(d>>>16);d=(f.a>>>16)+(b.a>>>16)+(c>>>16);return new a((d&65535)<<16|c&65535,l)}function qa(f,b,c,d){var l,e,g;l=(f.b&65535)+(b.b&65535)+(c.b&65535)+(d.b&65535);e=(f.b>>>16)+(b.b>>>16)+(c.b>>>16)+(d.b>>>16)+(l>>>16);g=(e&65535)<<16|l&65535;l=(f.a&65535)+(b.a&65535)+(c.a&65535)+(d.a&65535)+(e>>>16);e=(f.a>>>16)+(b.a>>>16)+(c.a>>>16)+(d.a>>>16)+(l>>>16);return new a((e&65535)<<16|l&65535,g)}function ra(f,b,c,d,l){var e,g,p;e=(f.b&65535)+(b.b&65535)+(c.b&65535)+(d.b&65535)+(l.b&65535);g=
(f.b>>>16)+(b.b>>>16)+(c.b>>>16)+(d.b>>>16)+(l.b>>>16)+(e>>>16);p=(g&65535)<<16|e&65535;e=(f.a&65535)+(b.a&65535)+(c.a&65535)+(d.a&65535)+(l.a&65535)+(g>>>16);g=(f.a>>>16)+(b.a>>>16)+(c.a>>>16)+(d.a>>>16)+(l.a>>>16)+(e>>>16);return new a((g&65535)<<16|e&65535,p)}function A(f){var b=0,c=0,d;for(d=0;d<arguments.length;d+=1)b^=arguments[d].b,c^=arguments[d].a;return new a(c,b)}function B(f){var b=[],c;if("SHA-1"===f)b=[1732584193,4023233417,2562383102,271733878,3285377520];else if(0===f.lastIndexOf("SHA-",
0))switch(b=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],c=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],f){case "SHA-224":break;case "SHA-256":b=c;break;case "SHA-384":b=[new a(3418070365,b[0]),new a(1654270250,b[1]),new a(2438529370,b[2]),new a(355462360,b[3]),new a(1731405415,b[4]),new a(41048885895,b[5]),new a(3675008525,b[6]),new a(1203062813,b[7])];break;case "SHA-512":b=[new a(c[0],4089235720),new a(c[1],
2227873595),new a(c[2],4271175723),new a(c[3],1595750129),new a(c[4],2917565137),new a(c[5],725511199),new a(c[6],4215389547),new a(c[7],327033209)];break;default:throw Error("Unknown SHA variant");}else if(0===f.lastIndexOf("SHA3-",0)||0===f.lastIndexOf("SHAKE",0))for(f=0;5>f;f+=1)b[f]=[new a(0,0),new a(0,0),new a(0,0),new a(0,0),new a(0,0)];else throw Error("No SHA variants supported");return b}function K(a,b){var c=[],d,e,k,g,p,n,h;d=b[0];e=b[1];k=b[2];g=b[3];p=b[4];for(h=0;80>h;h+=1)c[h]=16>h?
a[h]:y(c[h-3]^c[h-8]^c[h-14]^c[h-16],1),n=20>h?H(y(d,5),e&k^~e&g,p,1518500249,c[h]):40>h?H(y(d,5),e^k^g,p,1859775393,c[h]):60>h?H(y(d,5),T(e,k,g),p,2400959708,c[h]):H(y(d,5),e^k^g,p,3395469782,c[h]),p=g,g=k,k=y(e,30),e=d,d=n;b[0]=G(d,b[0]);b[1]=G(e,b[1]);b[2]=G(k,b[2]);b[3]=G(g,b[3]);b[4]=G(p,b[4]);return b}function Y(a,b,c,d){var e;for(e=(b+65>>>9<<4)+15;a.length<=e;)a.push(0);a[b>>>5]|=128<<24-b%32;b+=c;a[e]=b&4294967295;a[e-1]=b/4294967296|0;b=a.length;for(e=0;e<b;e+=16)d=K(a.slice(e,e+16),d);
return d}function L(f,b,c){var d,l,k,g,p,n,h,m,r,t,q,v,u,w,x,y,z,F,A,B,C,D,E=[],I;if("SHA-224"===c||"SHA-256"===c)t=64,v=1,D=Number,u=G,w=oa,x=H,y=ka,z=ma,F=ga,A=ia,C=T,B=da,I=e;else if("SHA-384"===c||"SHA-512"===c)t=80,v=2,D=a,u=pa,w=qa,x=ra,y=la,z=na,F=ha,A=ja,C=fa,B=ea,I=U;else throw Error("Unexpected error in SHA-2 implementation");c=b[0];d=b[1];l=b[2];k=b[3];g=b[4];p=b[5];n=b[6];h=b[7];for(q=0;q<t;q+=1)16>q?(r=q*v,m=f.length<=r?0:f[r],r=f.length<=r+1?0:f[r+1],E[q]=new D(m,r)):E[q]=w(z(E[q-2]),
E[q-7],y(E[q-15]),E[q-16]),m=x(h,A(g),B(g,p,n),I[q],E[q]),r=u(F(c),C(c,d,l)),h=n,n=p,p=g,g=u(k,m),k=l,l=d,d=c,c=u(m,r);b[0]=u(c,b[0]);b[1]=u(d,b[1]);b[2]=u(l,b[2]);b[3]=u(k,b[3]);b[4]=u(g,b[4]);b[5]=u(p,b[5]);b[6]=u(n,b[6]);b[7]=u(h,b[7]);return b}function D(f,b){var c,d,e,k,g=[],p=[];if(null!==f)for(d=0;d<f.length;d+=2)b[(d>>>1)%5][(d>>>1)/5|0]=A(b[(d>>>1)%5][(d>>>1)/5|0],new a((f[d+1]&255)<<24|(f[d+1]&65280)<<8|(f[d+1]&16711680)>>>8|f[d+1]>>>24,(f[d]&255)<<24|(f[d]&65280)<<8|(f[d]&16711680)>>>8|
f[d]>>>24));for(c=0;24>c;c+=1){k=B("SHA3-");for(d=0;5>d;d+=1)g[d]=A(b[d][0],b[d][1],b[d][2],b[d][3],b[d][4]);for(d=0;5>d;d+=1)p[d]=A(g[(d+4)%5],R(g[(d+1)%5],1));for(d=0;5>d;d+=1)for(e=0;5>e;e+=1)b[d][e]=A(b[d][e],p[d]);for(d=0;5>d;d+=1)for(e=0;5>e;e+=1)k[e][(2*d+3*e)%5]=R(b[d][e],V[d][e]);for(d=0;5>d;d+=1)for(e=0;5>e;e+=1)b[d][e]=A(k[d][e],new a(~k[(d+1)%5][e].a&k[(d+2)%5][e].a,~k[(d+1)%5][e].b&k[(d+2)%5][e].b));b[0][0]=A(b[0][0],W[c])}return b}var e,U,V,W;e=[1116352408,1899447441,3049323471,3921009573,
961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,
883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];U=[new a(e[0],3609767458),new a(e[1],602891725),new a(e[2],3964484399),new a(e[3],2173295548),new a(e[4],4081628472),new a(e[5],3053834265),new a(e[6],2937671579),new a(e[7],3664609560),new a(e[8],2734883394),new a(e[9],1164996542),new a(e[10],1323610764),new a(e[11],3590304994),new a(e[12],4068182383),new a(e[13],991336113),new a(e[14],633803317),new a(e[15],
3479774868),new a(e[16],2666613458),new a(e[17],944711139),new a(e[18],2341262773),new a(e[19],2007800933),new a(e[20],1495990901),new a(e[21],1856431235),new a(e[22],3175218132),new a(e[23],2198950837),new a(e[24],3999719339),new a(e[25],766784016),new a(e[26],2566594879),new a(e[27],3203337956),new a(e[28],1034457026),new a(e[29],2466948901),new a(e[30],3758326383),new a(e[31],168717936),new a(e[32],1188179964),new a(e[33],1546045734),new a(e[34],1522805485),new a(e[35],2643833823),new a(e[36],
2343527390),new a(e[37],1014477480),new a(e[38],1206759142),new a(e[39],344077627),new a(e[40],1290863460),new a(e[41],3158454273),new a(e[42],3505952657),new a(e[43],106217008),new a(e[44],3606008344),new a(e[45],1432725776),new a(e[46],1467031594),new a(e[47],851169720),new a(e[48],3100823752),new a(e[49],1363258195),new a(e[50],3750685593),new a(e[51],3785050280),new a(e[52],3318307427),new a(e[53],3812723403),new a(e[54],2003034995),new a(e[55],3602036899),new a(e[56],1575990012),new a(e[57],
1125592928),new a(e[58],2716904306),new a(e[59],442776044),new a(e[60],593698344),new a(e[61],3733110249),new a(e[62],2999351573),new a(e[63],3815920427),new a(3391569614,3928383900),new a(3515267271,566280711),new a(3940187606,3454069534),new a(4118630271,4000239992),new a(116418474,1914138554),new a(174292421,2731055270),new a(289380356,3203993006),new a(460393269,320620315),new a(685471733,587496836),new a(852142971,1086792851),new a(1017036298,365543100),new a(1126000580,2618297676),new a(1288033470,
3409855158),new a(1501505948,4234509866),new a(1607167915,987167468),new a(1816402316,1246189591)];W=[new a(0,1),new a(0,32898),new a(2147483648,32906),new a(2147483648,2147516416),new a(0,32907),new a(0,2147483649),new a(2147483648,2147516545),new a(2147483648,32777),new a(0,138),new a(0,136),new a(0,2147516425),new a(0,2147483658),new a(0,2147516555),new a(2147483648,139),new a(2147483648,32905),new a(2147483648,32771),new a(2147483648,32770),new a(2147483648,128),new a(0,32778),new a(2147483648,
2147483658),new a(2147483648,2147516545),new a(2147483648,32896),new a(0,2147483649),new a(2147483648,2147516424)];V=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]]; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return C}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(module.exports=C),exports=C):X.jsSHA=C})(this);


/***/ })
/******/ ]);