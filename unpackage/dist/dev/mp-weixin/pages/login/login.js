(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/login/login"],{

/***/ 45:
/*!*******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/任务平台项目/任务平台/main.js?{"page":"pages%2Flogin%2Flogin"} ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _login = _interopRequireDefault(__webpack_require__(/*! ./pages/login/login.vue */ 46));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_login.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 46:
/*!************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_vue_vue_type_template_id_2375cb7d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=2375cb7d& */ 47);
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ 49);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.vue?vue&type=style&index=0&lang=less& */ 51);
/* harmony import */ var _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 14);






/* normalize component */

var component = Object(_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_2375cb7d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _login_vue_vue_type_template_id_2375cb7d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 47:
/*!*******************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue?vue&type=template&id=2375cb7d& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_2375cb7d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=template&id=2375cb7d& */ 48);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_2375cb7d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_hbuilderx_packages_webpack_uni_nvue_loader_lib_templateLoader_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_template_id_2375cb7d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 48:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/webpack-uni-nvue-loader/lib/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue?vue&type=template&id=2375cb7d& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 49:
/*!*************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=script&lang=js& */ 50);
/* harmony import */ var _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 50:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 22));




























































var _vuex = __webpack_require__(/*! vuex */ 16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var bottomCopyright = function bottomCopyright() {return __webpack_require__.e(/*! import() | components/bottomCopyright */ "components/bottomCopyright").then(__webpack_require__.bind(null, /*! @/components/bottomCopyright.vue */ 205));};var _default =




{
  components: {
    bottomCopyright: bottomCopyright },

  data: function data() {
    return {
      title: 'Hello',
      account: '',
      passwd: '',
      abOc: 0,
      showTip: false };

  },
  computed: _objectSpread({},
  (0, _vuex.mapState)(['globalOpenid', 'userInfo', 'token', 'globalUserType'])),

  onLoad: function onLoad(options) {
    var that = this;
    if (options.uSerType) {
      that.abOc = options.uSerType;
    }
    that.setGlobalUserType(that.abOc);
    var isFinish = uni.getStorageSync('isDone');
    if (isFinish === 0) {
      that.showTip = true;
      that.setGlobalUserType(1);
    } else {
      that.showTip = false;
    }

  },
  onShow: function onShow() {},
  methods: _objectSpread({},
  (0, _vuex.mapMutations)(['setGlobalUserInfo', 'setGlobalOpenid', 'setglobalWXuserInfo', 'setToken', 'setGlobalUserType']), {
    // 用户协议
    navAboutUs: function navAboutUs(text) {
      uni.navigateTo({
        url: '/pages/public/aboutUs/aboutUs?title=' + text });

    },
    go_forget: function go_forget() {
      uni.navigateTo({
        url: '../../pages/forget/forget' });

    },
    go_register: function go_register() {
      uni.navigateTo({
        url: '../../pages/register/register' });

    },
    inputAccount: function inputAccount(e) {
      this.account = e.detail.value;
    },
    inputPasswd: function inputPasswd(e) {
      this.passwd = e.detail.value;
    },
    // 检查本地信息并且自动登录
    checkLocalInfo: function checkLocalInfo() {
      var that = this;
      if (uni.getStorageSync('localUserInfo')) {
        that.setGlobalUserInfo(uni.getStorageSync('localUserInfo'));
        that.setToken(uni.getStorageSync('token'));
        that.setGlobalOpenid(uni.getStorageSync('openid'));
        that.setglobalWXuserInfo(uni.getStorageSync('WXuserInfo'));
        that.userLoginCheck();
        uni.hideLoading();
      } else {
        setTimeout(function () {
          uni.showToast({
            title: '本地无信息，请登录',
            icon: 'none' });

        }, 800);
        uni.hideLoading();
      }
    },
    // 微信授权登录
    wxGetUserInfo: function wxGetUserInfo(res) {
      var that = this;
      if (!res.detail.iv) {
        return false;
      } else {
        uni.getProvider({
          service: 'oauth',
          success: function success(res) {
            if (res.provider[0] === 'weixin') {
              uni.login({
                provider: 'weixin',
                success: function success(loginRes) {
                  // 拿code
                  uni.getUserInfo({
                    provider: 'weixin',
                    success: function success(infoRes) {
                      // 拿到微信用户信息
                      that.setglobalWXuserInfo(infoRes.userInfo);
                      uni.setStorageSync('WXuserInfo', infoRes.userInfo);
                    } });

                  uni.request({
                    url: that.global_baseUrl + '/index.php/wxlogin',
                    header: {
                      'content-type': 'application/json' },

                    data: {
                      appid: 'wxf919a36c07b7caab',
                      secret: '6cd94792bdc344e02ddff814c39fa3c6',
                      code: loginRes.code },

                    method: 'POST',
                    success: function success(res) {
                      res.data = JSON.parse(res.data);
                      that.setGlobalOpenid(res.data.openid);
                      uni.setStorageSync('openid', res.data.openid);
                      //登录检验
                      that.userLoginCheck();
                    } });

                  uni.showLoading({
                    title: "登录中..." });

                  setTimeout(function () {
                    uni.hideLoading();
                  }, 700);
                } });

            }
          } });

      }
    },
    // 学生登录校验
    userLoginCheck: function () {var _userLoginCheck = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var that, tempApi, tempData;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                that = this;
                tempApi = 'login';
                if (that.globalUserType == 1) {
                  tempApi = 'shoplogin';
                }
                tempData = {
                  wei: this.globalOpenid,
                  token: that.token };

                if (uni.getStorageSync('token')) {
                  tempData.token = uni.getStorageSync('token');
                }
                uni.request({
                  url: this.global_baseUrl + '/index.php/' + tempApi,
                  data: tempData,
                  method: "POST",
                  success: function success(res) {
                    if (res.data.code == '404') {
                      uni.showModal({
                        title: '提示',
                        content: '当前您的信息为空，前往绑定',
                        success: function success(res) {
                          if (res.confirm) {
                            // 微信号为空 ，前去绑定
                            // 跳转绑定界面
                            if (that.globalUserType == 0) {
                              uni.navigateTo({
                                url: '/pages/public/infoBind/infoBind' });

                            } else {
                              uni.navigateTo({
                                url: '/pages/public/infoBindBusiness/infoBindBusiness' });

                            }

                          } else if (res.cancel) {;
                          }
                        } });

                    } else if (res.data.code == '406') {
                      uni.showToast({
                        title: "审核未通过!",
                        icon: 'none' });

                    } else if (res.data.code == '407') {
                      that.showTip = true;
                      uni.showToast({
                        title: "审核中,需1-2工作日",
                        icon: 'none' });

                    } else if (res.data.code == '200') {
                      that.showTip = false;
                      uni.setStorage({
                        key: 'localUserInfo',
                        data: res.data.data,
                        success: function success() {
                          that.setGlobalUserInfo(res.data.data);
                          that.setToken(res.data.data.token);
                          uni.clearStorageSync('isDone');
                          uni.showToast({
                            title: "登录成功!",
                            icon: 'success' });

                          setTimeout(function () {
                            uni.switchTab({
                              url: '/pages/home/home' });

                          }, 800);
                        } });

                    } else {
                      uni.showToast({
                        title: "登录失败，请检查！",
                        icon: 'none' });

                    }
                  } });case 6:case "end":return _context.stop();}}}, _callee, this);}));function userLoginCheck() {return _userLoginCheck.apply(this, arguments);}return userLoginCheck;}() }) };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 51:
/*!**********************************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./login.vue?vue&type=style&index=0&lang=less& */ 52);
/* harmony import */ var _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_custom_block_loader_index_js_ref_0_1_E_devepAbout_develpToolAbout_Hbuilderx_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_login_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 52:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-custom-block-loader??ref--0-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Administrator/Desktop/任务平台项目/任务平台/pages/login/login.vue?vue&type=style&index=0&lang=less& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[[45,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map