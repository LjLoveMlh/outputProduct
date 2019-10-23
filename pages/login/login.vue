<template>
	<view class="content">
		<view class="login-bg bg-gradual-blue">
			<view class="flex justify-center margin-top-xl padding-top-xl">
				<view class="logoPosition margin-left-xs">
					<image class="solid   shadow shadow-blur" src="/static/img/logo.jpg" mode="aspectFill"></image>
					<view class='cu-tag badge bg-blue'>官方</view>
				</view>
				<view class="padding text-white margin-top-xs">
					<view class="padding-xs text-xl text-bold">
						欢迎加入枫语里！
					</view>
					<view class="padding-xs ">
						Welcome to Us !
					</view>
				</view>
			</view>
			<block v-if="!showTip">
				<view class="login-card margin-lr-sm">
					<view class="login-head  text-sm  ">
						<view class="padding-bottom-sm solids-bottom text-black line-blue">您将同意 校园枫语里 获得以下权限</view>
					</view>
					<view class="flex text-grey login-input  login-margin-b padding-lr">
						1.获得您的公开信息（昵称，头像，性别等）
					</view>
					<view class=" flex text-grey login-input  padding-lr">
						2.确认授权即表示同意 <text class="text-blue" @tap="navAboutUs('用户协议')">《用户授权协议》</text>
					</view>
					<view class="login-head text-black"></view>
				</view>
				<view class="login-btn margin-lr-sm  margin-top-lg">
					<button open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true" class="landing bg-gradual-blue solid shadow shadow-blur"
					 type="primary" @tap="wxGetUserInfo">微信授权登陆</button>
				</view>
			</block>

		</view>
		<!-- 提交文本提示 -->
		<block v-if="showTip">
			<view class="margin-top-xl margin-lr  solids-bottom padding-xs flex align-center">
				<view class="flex-sub text-center bg-white shadow shadow-lg">
					<view class="solid-bottom text-xl padding">
						<text class="text-black text-bold">您的申请已提交成功！</text>
					</view>
					<view class="padding">请等待1-2日,工作人员将会为您做审核，期间如有疑问请联系：15327378160</view>
				</view>
			</view>
			<view class=" margin-lr margin-top">
				<button open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true" class="landing bg-gradual-blue solid shadow shadow-blur"
				 type="primary" @tap="wxGetUserInfo">尝试登录</button>
			</view>
		</block>

		<!-- 底部版权 -->
		<view class="ljPosition">
			<bottomCopyright bgColour='bg-gray' />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import bottomCopyright from '@/components/bottomCopyright.vue'
	export default {
		components: {
			bottomCopyright
		},
		data() {
			return {
				title: 'Hello',
				account: '',
				passwd: '',
				abOc: 0,
				showTip: false,
			}
		},
		computed: {
			...mapState(['globalOpenid', 'userInfo', 'token', 'globalUserType'])
		},
		onLoad(options) {
			var that = this;
			if (options.uSerType) {
				that.abOc = options.uSerType;
			}
			that.setGlobalUserType(that.abOc);
			let isFinish = uni.getStorageSync('isDone');
			if (isFinish === 0) {
				that.showTip = true;
				that.setGlobalUserType(1);
			} else {
				that.showTip = false;
			}

		},
		onShow() {},
		methods: {
			...mapMutations(['setGlobalUserInfo', 'setGlobalOpenid', 'setglobalWXuserInfo', 'setToken', 'setGlobalUserType']),
			// 用户协议
			navAboutUs(text) {
				uni.navigateTo({
					url: '/pages/public/aboutUs/aboutUs?title=' + text
				})
			},
			go_forget() {
				uni.navigateTo({
					url: '../../pages/forget/forget'
				})
			},
			go_register() {
				uni.navigateTo({
					url: '../../pages/register/register'
				})
			},
			inputAccount(e) {
				this.account = e.detail.value;
			},
			inputPasswd(e) {
				this.passwd = e.detail.value;
			},
			// 检查本地信息并且自动登录
			checkLocalInfo() {
				var that = this;
				if (uni.getStorageSync('localUserInfo')) {
					that.setGlobalUserInfo(uni.getStorageSync('localUserInfo'));
					that.setToken(uni.getStorageSync('token'));
					that.setGlobalOpenid(uni.getStorageSync('openid'));
					that.setglobalWXuserInfo(uni.getStorageSync('WXuserInfo'));
					that.userLoginCheck();
					uni.hideLoading();
				} else {
					setTimeout(() => {
						uni.showToast({
							title: '本地无信息，请登录',
							icon: 'none'
						});
					}, 800)
					uni.hideLoading();
				}
			},
			// 微信授权登录
			wxGetUserInfo: function(res) {
				var that = this;
				if (!res.detail.iv) {
					return false;
				} else {
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							if (res.provider[0] === 'weixin') {
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										// 拿code
										uni.getUserInfo({
											provider: 'weixin',
											success: function(infoRes) {
												// 拿到微信用户信息
												that.setglobalWXuserInfo(infoRes.userInfo)
												uni.setStorageSync('WXuserInfo', infoRes.userInfo)
											}
										});
										uni.request({
											url: that.global_baseUrl + '/index.php/wxlogin',
											header: {
												'content-type': 'application/json'
											},
											data: {
												appid: 'wxf919a36c07b7caab',
												secret: '6cd94792bdc344e02ddff814c39fa3c6',
												code: loginRes.code
											},
											method: 'POST',
											success(res) {
												res.data = JSON.parse(res.data);
												that.setGlobalOpenid(res.data.openid);
												uni.setStorageSync('openid', res.data.openid)
												//登录检验
												that.userLoginCheck();
											}
										})
										uni.showLoading({
											title: "登录中..."
										})
										setTimeout(() => {
											uni.hideLoading();
										}, 700)
									}
								});
							}
						}
					});
				}
			},
			// 学生登录校验
			async userLoginCheck() {
				var that = this;
				var tempApi = 'login';
				if (that.globalUserType == 1) {
					tempApi = 'shoplogin'
				}
				var tempData = {
					wei: this.globalOpenid,
					token: that.token
				}
				if (uni.getStorageSync('token')) {
					tempData.token = uni.getStorageSync('token')
				}
				uni.request({
					url: this.global_baseUrl + '/index.php/' + tempApi,
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == '404') {
							uni.showModal({
								title: '提示',
								content: '当前您的信息为空，前往绑定',
								success: function(res) {
									if (res.confirm) {
										// 微信号为空 ，前去绑定
										// 跳转绑定界面
										if (that.globalUserType == 0) {
											uni.navigateTo({
												url: '/pages/public/infoBind/infoBind'
											})
										} else {
											uni.navigateTo({
												url: '/pages/public/infoBindBusiness/infoBindBusiness'
											})
										}

									} else if (res.cancel) {;
									}
								}
							});
						} else if (res.data.code == '406') {
							uni.showToast({
								title: "审核未通过!",
								icon: 'none'
							})
						} else if (res.data.code == '407') {
							that.showTip = true;
							uni.showToast({
								title: "审核中,需1-2工作日",
								icon: 'none'
							})
						} else if (res.data.code == '200') {
							that.showTip = false;
							uni.setStorage({
								key: 'localUserInfo',
								data: res.data.data,
								success: function() {
									that.setGlobalUserInfo(res.data.data)
									that.setToken(res.data.data.token);
									uni.clearStorageSync('isDone')
									uni.showToast({
										title: "登录成功!",
										icon: 'success'
									})
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/home/home'
										})
									}, 800)
								}
							});
						} else {
							uni.showToast({
								title: "登录失败，请检查！",
								icon: 'none'
							})
						}
					}
				});
			},

		}
	}
</script>

<style lang="less">
	.logoPosition {
		position: relative;
		width: 200rpx;
		height: 200rpx;
		z-index: 9999;

		image {
			width: 100%;
			height: 100%;
			border-radius: 10%;
		}
	}

	.ljPosition {
		position: absolute;
		bottom: 10px;
		left: 15px;
		right: 15px;
		margin: auto;
	}

	.landing {
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
	}

	.login-btn {
		padding: 10upx 40upx;

	}

	.login-input input {
		background: #F2F5F6;
		font-size: 28upx;
		width: 80%;
		padding: 10upx 25upx;
		height: 62upx;
		margin-left: 30upx;
		line-height: 62upx;
		border-radius: 8upx;
		color: #333333;
	}

	.login-input {
		padding: 10upx 20upx;
	}

	.login-head {
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}

	.login-card {
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
		position: relative;
		margin-top: 50upx;
	}

	.login-bg {
		height: 560upx;
		padding: 25upx;
	}
</style>
