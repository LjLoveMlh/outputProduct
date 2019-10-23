<template>
	<view>
		<view class="space"></view>
		<view class="stars ">
			<view class="star "></view>
			<view class="star pink "></view>
			<view class="star blue "></view>
			<view class="star yellow "></view>
		</view>
		<view class="allHead margin-bottom-xl">
			<view class="ljWrapShap bg-img   flex align-center" style="background: url(https://cdn.nlark.com/yuque/0/2019/jpeg/285274/1552962631985-assets/web-upload/bdd4700f-cd0f-4665-a27e-494b08c9b336.jpeg); height: 414upx;width: 100%;">
			</view>
			<view class="header">
				<view class="bg">
					<view class="box">
						<view class="box-hd" @tap="seeMyInfo">
							<view class="avator">
								<image :src="curWXInfo.avatarUrl" mode="aspectFill"></image>
								<view class="ljRtag">
									<image src="/static/img/V.png" mode="aspectFill"></image>
								</view>
							</view>
							<view class="phone-number">
								<view class="ljNickName">{{curWXInfo==null?'登录/注册':curWXInfo.nickName}}</view>
							</view>
						</view>
						<block v-if="curUserType==1">
							<view class="box-bd">
								<view class="item">
									<view class="icon text-red text-lg">{{curData.donecount}}<text class="margin-left-xs cuIcon-copy text-gray text-sm"></text></view>
									<view class="text text-grey">已完成的</view>
								</view>
								<view class="item">
									<view class="icon text-green text-lg">{{curData.peo}}<text class="margin-left-xs cuIcon-group text-gray text-sm"></text></view>
									<view class="text text-grey">招聘人数</view>
								</view>
								<view class="item">
									<view class="icon text-blue text-lg">{{curData.fabucount}}<text class="margin-left-xs cuIcon-like text-gray text-sm"></text></view>
									<view class="text text-grey">我发布的</view>
								</view>
							</view>
						</block>
						<block v-else>
							<view class="box-bd">
								<view class="item">
									<view class="icon text-red text-lg">{{curData.peo}}<text class="margin-left-xs cuIcon-copy text-gray text-sm"></text></view>
									<view class="text text-grey">我报名的</view>
								</view>
								<view class="item">
									<view class="icon text-green text-lg">{{curData.donecount}}<text class="margin-left-xs cuIcon-group text-gray text-sm"></text></view>
									<view class="text text-grey">我完成的</view>
								</view>
								<view class="item">
									<view class="icon text-blue text-lg">{{curData.fabucount}}<text class="margin-left-xs cuIcon-like text-gray text-sm"></text></view>
									<view class="text text-grey">我发布的</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card margin-top-xl padding-top-xl bg-white">
			<view class="margin-top">
				<view class="cu-list grid col-4 no-border margin-top-xl ">
					<view class="cu-item" v-for="(item,index) in iconList" :key="index" @tap="navWhere(item)" v-if="curUserType==1&&item.badge!=0">
						<view :class="['cuIcon-' + item.icon,'text-' + item.color]">
						</view>
						<text>{{item.name}}</text>
					</view>
					<view class="cu-item" v-for="(item,index) in iconList" :key="index" @tap="navWhere(item)" v-if="curUserType==0&&item.badge!=1">
						<view :class="['cuIcon-' + item.icon,'text-' + item.color]">
						</view>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 悬浮按钮 -->
		<view class="circle-float bg-gradual-blue" @tap="pushNew" v-if="curUserType==1">
			<view class="cuIcon-add"></view>
		</view>
		<view class="ljpadding-top-xl bg-gray ">
			<bottomCopyright />
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import bottomCopyright from '@/components/bottomCopyright/bottomCopyright.vue'
	export default {
		components: {
			bottomCopyright
		},
		data() {
			return {
				iconList: [{
						icon: 'formfill',
						color: 'red',
						badge: 0,
						name: '我报名的',
						nav: 'list'
					}, {
						icon: 'peoplelist',
						color: 'yellow',
						badge: 1,
						name: '招聘人员',
						nav: 'acceptPeo'
					}, {
						icon: 'formfill',
						color: 'green',
						badge: 3,
						name: '我发布的',
						nav: 'mypush'
					},
					{
						icon: 'peoplefill',
						color: 'mauve',
						badge: 3,
						name: '个人中心',
						nav: 'userInfo'
					}, {
						icon: 'copy',
						color: 'cyan',
						badge: 3,
						name: '用户协议',
						nav: 'agreement'

					}, {
						icon: 'questionfill',
						color: 'blue',
						badge: 3,
						name: '常见问题',
						nav: 'freQuestion'
					}, {
						icon: 'communityfill',
						color: 'purple',
						badge: 3,
						name: '意见反馈',
						nav: 'feed'
					}, {
						icon: 'servicefill',
						color: 'purple',
						badge: 3,
						name: '联系客服',
						nav: 'contactService'
					}, {
						icon: 'friendfill',
						color: 'mauve',
						badge: 3,
						name: '关于我们',
						nav: 'aboutUs'
					}
				],
				curUserInfo: {},
				curWXInfo: null,
				curUserType: null,
				curData: {
					peo: 0,
					donecount: 0,
					fabucount: 0
				},
				msgContents: ['15327378160', '16671064940']
			};
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo', 'globalUserType'])
		},
		onLoad() {
			console.log(this.curWXInfo)
			var that = this;
			that.curUserType = that.globalUserType;
		},
		onShow() {
			var that = this;
			if (that.GlobalUserInfo.id) {
				that.getPerData();
				that.initData();
			}
		},
		methods: {
			// 跳转到哪里
			navWhere(e) {
				var that = this;
				if (that.GlobalUserInfo.id) {
					switch (e.nav) {
						case 'feed':
							uni.navigateTo({
								url: '/pages/public/uploadFeed/uploadFeed'
							})
							break;
						case 'userInfo':
							that.seeMyInfo();
							break;
						case 'mypush':
							that.navMyPublic();
							break;
						case 'aboutUs':
							that.navAboutUs('关于我们');
							break;
						case 'freQuestion':
							that.navAboutUs('常见问题');
							break;
						case 'agreement':
							that.navAboutUs('用户协议');
							break;
						case 'acceptPeo':
							that.navAcceptPeople();
							break;
						case 'contactService':
							that.chooseMsg();
							break;
						case 'list':
							that.navStuOrderList();
							break;
						default:
							break;
					}
				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录，请登录查看',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								});
							} else if (res.cancel) {}
						}
					});
				}
			},
			// 客服电话
			chooseMsg() { //快速输入
				uni.showActionSheet({
					itemList: this.msgContents,
					success: (res) => {
						uni.makePhoneCall({
							phoneNumber: this.msgContents[res.tapIndex]
						});
					}
				})
			},
			// 以招聘人员
			navAcceptPeople() {
				var that = this;
				var tempData = {
					id: that.GlobalUserInfo.id
				}
				var tempList = [];
				uni.request({
					url: that.global_baseUrl + '/index.php/seltaskstu',
					data: tempData,
					method: "POST",
					success: (res) => {
						console.log(res)
						if (res.data.code == '200') {
							res.data.data.forEach((item, index) => {
								item.forEach((item2, index2) => {
									tempList.push(item2);
								})
							})
							if (tempList.length > 0) {
								uni.navigateTo({
									url: '/pages/public/acceptPeople/acceptPeople?data=' + JSON.stringify(tempList),
								})
							}
						}
					},
				});
			},
			// 关于我们用户协议常见问题  三个富文本
			navAboutUs(text) {
				uni.navigateTo({
					url: '/pages/public/aboutUs/aboutUs?title=' + text
				})
			},

			// 我发布的
			navMyPublic() {
				uni.navigateTo({
					url: '/pages/myUser/myPush/myPush'
				})
			},
			initData() {
				uni.showLoading({
					title: '数据初始化中'
				})
				var that = this;
				that.curUserInfo = that.GlobalUserInfo;
				that.curWXInfo = that.globalWXuserInfo;
				setTimeout(() => {
					uni.hideLoading();
				}, 700)
			},
			async getPerData() {
				var that = this;
				var apiName = 'selidshop'
				if (that.globalUserType == 0) {
					apiName = 'selidstudent'
				}
				var tempData = {
					id: that.GlobalUserInfo.id
				}
				uni.request({
					url: that.global_baseUrl + '/index.php/' + apiName,
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							that.curData = res.data.data;
						} else {

						}
					}
				});
			},
			seeMyInfo(e) {
				var that = this;
				if (that.GlobalUserInfo.id) {
					uni.navigateTo({
						url: '/pages/public/userInfo/userInfo'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录，请登录查看',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/login/login'
								});
							} else if (res.cancel) {}
						}
					});
				}
			},
			navStuOrderList() {
				uni.navigateTo({
					url: '/pages/myUser/myOrderList/myOrderList'
				})
			},
			pushNew() {
				uni.navigateTo({
					url: '/pages/public/pushTask/pushTask'
				})
			},
		}
	}
</script>

<style lang="scss">
	.ljpadding-top-xl {
		padding-top: 50px;
		margin-bottom: 80px;
	}

	// 流星效果
	.space {
		position: absolute;
		top: 0;
		left: 0;
	}

	.planet {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		background: #333;
		position: absolute;
		left: 50%;
		top: 50%;
		margin: -75rpx 0 0 -75rpx;
		overflow: hidden;
		z-index: 2;
	}

	.planet_shadow {
		position: absolute;
		border-radius: 50%;
		height: 100%;
		width: 100%;
		top: -40%;
		right: -10%;
		border: 35rpx solid rgba(0, 0, 0, .15);
	}

	.stars {
		position: absolute;

	}

	.star {
		display: block;
		width: 5rpx;
		height: 5rpx;
		border-radius: 50%;
		background: #FFF;
		top: 100rpx;
		left: 400rpx;
		position: relative;
		transform-origin: 100% 0;
		animation: star-ani 6s infinite ease-out;
		box-shadow: 0 0 5rpx 5rpx rgba(255, 255, 255, .3);
		opacity: 0;
		z-index: 2;
	}

	.star:after {
		content: '';
		display: block;
		top: 0rpx;
		left: 4rpx;
		border: 0rpx solid #fff;
		border-width: 0rpx 90rpx 2rpx 90rpx;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		transform: rotate(-45deg) translate3d(1rpx, 3rpx, 0);
		box-shadow: 0 0 1rpx 0 rgba(255, 255, 255, .1);
		transform-origin: 0% 100%;
		animation: shooting-ani 3s infinite ease-out;
	}

	.pink {
		top: 30rpx;
		left: 395rpx;
		background: #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.pink:after {
		border-color: transparent transparent transparent #ff5a99;
		animation-delay: 5s;
		-webkit-animation-delay: 5s;
		-moz-animation-delay: 5s;
	}

	.blue {
		top: 35rpx;
		left: 432rpx;
		background: cyan;
		animation-delay: 7s;
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
	}

	.blue:after {
		/* border-color: transpareanimation-delay: 12s; */
		-webkit-animation-delay: 7s;
		-moz-animation-delay: 7s;
		animation-delay: 7s;
	}

	.yellow {
		top: 50rpx;
		left: 600rpx;
		background: #ffcd5c;
		animation-delay: 5.8s;
	}

	.yellow:after {
		border-color: transparent transparent transparent #ffcd5c;
		animation-delay: 5.8s;
	}

	@keyframes star-ani {
		0% {
			opacity: 0;
			transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
			-moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		}

		50% {
			opacity: 1;
			transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		}

		100% {
			opacity: 0;
			transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
			-webkit-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
			-moz-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		}
	}

	// 流星效果end




	.ljavatar {
		position: relative;
		margin-left: 8px;
		width: 150upx;
		height: 150upx;
		clip-path: circle(60rpx at center);
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.allHead {
		position: relative;

		.header {
			position: absolute;
			left: 0px;
			right: 0px;
			top: 120px;

			height: 290upx;
			padding-bottom: 110upx;

			.bg {
				width: 100%;
				height: 200upx;
				padding-top: 100upx;

			}
		}
	}

	.ljWrapShap {
		border-bottom-left-radius: 10%;
		border-bottom-right-radius: 10%;
	}



	.box {
		width: 650upx;
		height: 240upx;
		border-radius: 20upx;
		margin: 0 auto;
		background: #fff;
		box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

		.box-hd {

			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;

			.avator {
				position: relative;
				width: 140upx;
				height: 140upx;
				background: #fff;
				border: 5upx solid #fff;
				border-radius: 50%;
				margin-top: -80upx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}

				.ljRtag {
					z-index: 2999;
					position: absolute;
					bottom: -2px;
					right: 0px;
					width: 32upx;
					height: 32upx;

					image {
						width: 100%;
						height: 100%;
					}

				}
			}

			.phone-number {
				width: 100%;
				text-align: center;
			}
		}

		.box-bd {
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			justify-content: center;
			margin-top: 6px;

			.item {
				flex: 1 1 auto;
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				border-right: 1px solid #f1f1f1;
				margin: 15upx 0;

				&:last-child {
					border: none;
				}

				.icon {
					// font-size: 20px;
				}

				.text {
					width: 100%;
					text-align: center;
					margin-top: 10upx;
				}
			}
		}
	}

	// 悬浮按钮
	.circle-float {
		color: #ffffff;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 30rpx;
		right: 30rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		font-size: 65rpx;
		// background: #f43f3b;
		box-shadow: 0px 5px 10px #bbb;
	}
</style>
