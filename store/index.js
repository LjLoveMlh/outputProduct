import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		GlobalUserInfo: {},
		globalOpenid: '',
		globalWXuserInfo: {},
		token: '',
		globalUserType: 0

	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		setGlobalUserInfo(state, provider) {
			state.GlobalUserInfo = provider;
		},
		setGlobalOpenid(state, provider) {
			state.globalOpenid = provider;
		},
		setglobalWXuserInfo(state, provider) {
			state.globalWXuserInfo = provider;
		},
		setToken(state, provider) {
			state.token = provider;
		},
		setGlobalUserType(state, provider) {
			state.globalUserType = provider;
		}
	}
})

export default store
