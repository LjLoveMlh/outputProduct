<template>
	<view>
		<view class="topSticky">
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">任务详情</block>
			</cu-custom>
			<!-- 任务简要标题 -->
			<view class="workItem-top">
				<view class="workItem-topTitle padding-left-sm">
					{{dataAll.name}}
				</view>
				<view class="workItem-topCenter">
					<view class="topCenter-price">
						{{dataAll.price}}
					</view>
					<view class="topCenter-unit">
						元/时
					</view>
				</view>
				<view class="workItem-topBottom">
					<view class="topBottom-tag">
						兼职
					</view>
					<view class="topBottom-tagPoint">
						·
					</view>
					<view class="topBottom-tag">
						现结
					</view>
					<view class="topBottom-tagPoint">
						·
					</view>
					<view class="topBottom-tag" v-if="curScene!='service'">
						{{dataAll.peonum}}人
					</view>
				</view>
			</view>
		</view>
		<view class="workItem-detail" @tap="navAcceptPeople(dataAll.userGroup)">
			<view class="detailTitle flex justify-between">
				<view>已报名</view>
				<view class="text-df text-gray">剩余名额 <text class="margin-lr-sm text-blue text-lg text-bold">{{dataAll.peonum-dataAll.userGroup.length}}</text></view>
			</view>
			<view class="padding-tb padding-left-sm">
				<view class="cu-avatar-group" style="padding: 0px;">
					<view class="cu-avatar round lg" v-if="avatar.length>9"><text class="cuIcon-more text-xs"></text></view>
					<view class="cu-avatar round lg" v-for="(item,index) in dataAll.userGroup" :key="index" :style="[{ backgroundImage:'url(' + item.shouimage + ')' }]"
					 v-if="index<9"></view>
				</view>
			</view>
		</view>
		<!-- 地理位置 -->
		<view class="detailMap" v-if="curScene!='service'">
			<view class="padding  flex bg-white" @tap="goMap">
				<view class="detailMap-text">
					<view class="text-lg">{{dataAll.address}}</view>
					<view class="margin-top-xs">{{dataAll.distance}}km</view>
				</view>
				<view class="cuIcon-right detailMap-icon">
				</view>
			</view>
		</view>
		<view class="workItem-detail">
			<view class="detailTitle">
				职位描述
			</view>
			<view class="detailTitle-bb">
			</view>
			<view class="detailTags" v-for="(item,index) in dataAll.label" :key="index">
				<view class="detail-tag">
					{{item.name}}
				</view>
			</view>
			<view class="detailText">
				{{dataAll.describe}}
			</view>
		</view>
		<view class="workItem-detail">
			<view class="detailTitle">
				雇主信息
			</view>
			<view class="detailTitle-bb">
			</view>
			<view class="flex justify-between">
				<view class="detail-company">
					<view class="detail-companyName">
						{{dataAll.fabu_name}}
					</view>
					<view class="cuIcon-peoplefill detail-companyIcon text-blue" v-if="curScene!='service'">
					</view>
				</view>
				<view class="flex padding-top" @tap="makePhone(dataAll.phone)" v-if="dataAll.showShopInfo">
					<view class="text-lg">{{dataAll.phone}}</view>
					<view class="cuIcon-phone detail-companyIcon text-blue"></view>
				</view>
			</view>
			<view class="flex text-red text-sm margin-top-sm">接单后请主动联系商家</view>
		</view>
		<view class="detailTip">
			防坑警示:商家无权利私自收取任何缴纳费用或押金,请提高警惕并第一时间向我们举报!
		</view>
		<block v-if="dataAll.shopSelf&&dataAll.isdone!=1">
			<view class="padding flex flex-direction">
				<button form-type="submit" class="cu-btn bg-blue lg shadow shadow-blur" @tap="taskFinish" v-if="dataAll.isdone!=1&&dataAll.iscancel!=1">任务完结</button>
				<button form-type="submit" class="cu-btn bg-red margin-tb-sm lg shadow shadow-blur" data-target="menuModal" @tap="noComeFeed"
				 v-if="curUserType==1">未到反馈</button>
				<button form-type="submit" class="cu-btn  bg-grey margin-tb-sm lg shadow shadow-blur" @tap="cancelTask" v-if="dataAll.isdone!=1&&dataAll.iscancel!=1">取消任务</button>
			</view>
		</block>

		<view class="ljBottomButton " v-if="!dataAll.shopSelf">
			<form @submit="signUpNow" report-submit='true' style="width:100%;">
				<view class="cu-bar bg-white tabbar flex">
					<view class="flex-sub">
						<button class="action" open-type="share">
							<view class="cuIcon-share text-blue">
							</view> 分享
						</button>
					</view>
					<view class="flex-treble margin-right-lg">
						<button form-type="submit" v-if="!dataAll.showShopInfo" :class="btnEnable?'bg-gradual-blue':'bg-gradual-gray'"
						 class="cu-btn block  shadow-blur lg">{{btnText}}</button>
					</view>
				</view>
			</form>
		</view>
		<view class="cu-modal" :class="modalName=='menuModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-list menu text-left solid-top padding-tb-xl">
					<block v-for="(item,index) in dataAll.userGroup" :key='index'>
						<view class="cu-item">
							<view class="cu-avatar round lg" :key="index" :style="[{ backgroundImage:'url(' + item.shouimage + ')' }]" v-if="index<9"></view>
							<view class="content margin-left-xs">
								<view class="text-grey">{{item.name}}</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										<text class="margin-right-xs"></text>
										{{item.phone}}
									</view>
								</view>
							</view>
							<view class="action">
								<switch @change="MenuBorder(item)" :class="item.checked?'checked':''" :checked="item.checked"></switch>
							</view>
						</view>
					</block>
					<view class="flex align-center margin-top padding" style="width: 100%;">
						<view class="flex-sub margin cu-btn round bg-blue shadow shadow-lg" @tap="confirUser">确定人员</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottomBlank">
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	var QQMapWX = require('@/components/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	import utils from '@/components/utils.filter.js';
	export default {
		data() {
			return {
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg'
				],
				btnText: '立即报名',
				btnEnable: true,
				dataAll: {},
				curScene: null,
				isShopSelf: false,
				menuBorder: false,
				userList: [],
				curUserGroup: [],
				curUserType: 0,
				formId: null
			}
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo', 'globalUserType'])
		},
		onLoad(options) {
			var that = this;
			that.curUserType = that.globalUserType;
			if (options) {
				that.curScene = options.scene;
				that.isShopSelf = options.shopSelf;
			}
			that.dataAll = uni.getStorageSync('taskDetail');
			that.curUserGroup = that.dataAll.userGroup;
			qqmapsdk = new QQMapWX({
				key: 'MJMBZ-5XNKF-YQIJY-JBJ5T-HWOZ5-MSBVR' // 必填
			});
		},


		methods: {
			// 致电商家
			makePhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone.toString()
				})
			},
			MenuBorder(e) {
				var that = this;
				that.dataAll.userGroup.forEach((item, index) => {
					if (item.id == e.id) {
						item.checked = !item.checked;
						if (item.checked) {
							that.userList.push(item.id)
						}

					}
				})
			},
			navAcceptPeople(data) {
				uni.navigateTo({
					url: '/pages/public/acceptPeople/acceptPeople?data=' + JSON.stringify(data),
				})
			},
			backPage(e) {
				uni.navigateBack({
					delta: 1
				});
			},
			openMyform(e) {
				uni.navigateTo({
					url: '/pages/myUser/myform/myform',
				})
			},
			// 确定人员反馈
			confirUser() {
				var that = this;

				if (that.userList.length > 0) {
					uni.showModal({
						title: '提示',
						content: '确定反馈？',
						success: function(res) {
							if (res.confirm) {
								var tempData = {
									id: that.dataAll.id,
									ids: that.userList
								}
								uni.request({
									url: that.global_baseUrl + '/index.php/nonstudent',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											var text = '已提交该人员反馈，系统将会进行处理！'
											that.navFeedBackPage(text);
										} else if (res.data.code == '701') {
											uni.showToast({
												title: '您已反馈该用户！',
												icon: 'none'
											})
										}
									}
								});
							} else if (res.cancel) {}
						}
					});
				} else {
					uni.showToast({
						title: "未选择用户！",
						icon: 'none'
					})
				}
			},
			// 立即报名
			signUpNow(e) {
				var that = this;
				that.formId = e.detail.formId;
				var formdata = e.detail.value
				if (that.globalUserType == 0) {
					uni.showModal({
						title: '提示',
						content: '确定报名该任务吗？',
						success: function(res) {
							if (res.confirm) {
								that.userSignUpTask();
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				} else {
					uni.showToast({
						title: '您是商家，无法报名！',
						icon: 'none'
					})
				}

			},
			// 报名请求接口
			userSignUpTask() {
				var that = this;
				// type0兼职，1服务
				var tempType = 0;
				if (that.curScene == 'service') {
					tempType = 1;
				}
				var tempData = {
					task_id: that.dataAll.id,
					stu_id: that.GlobalUserInfo.id,
					type: tempType
				}
				uni.request({
					url: this.global_baseUrl + '/index.php/jietask',
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == 200) {
							// 接单成功
							that.btnText = '已接单';
							that.btnEnable = false;
							var text = '恭喜，成功报名该任务！'
							that.navFeedBackPage(text);
							that.sendModelMessage();
						} else if (res.data.code == '201') {
							uni.showToast({
								title: '接单失败',
								icon: 'none'
							})
						}
					}
				});
			},
			sendModelMessage() {
				var that = this;
				var tempData = {
					openid: that.globalOpenid,
					templateid: '1yHiiXqOfXEJ-n8J7eltPqJqq-regzfigvq5pvjkqD8',
					formid: that.formId,
					orderID: '',
					keyword1: that.dataAll.name,
					keyword2: utils.timeTodate('Y-m-d H:i:s index', that.dataAll.endtime),
					keyword3: that.dataAll.fabu_name,
					keyword4: that.dataAll.phone
				}
				uni.request({
					url: that.global_baseUrl + '/index.php/sendMsg',
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == 200) {

						} else if (res.data.code == '201') {

						}
					}
				});
			},
			goMap(e) {
				var that = this;
				uni.openLocation({
					latitude:parseInt(that.dataAll.latitude),
					longitude:parseInt(that.dataAll.longitude),
					name: that.dataAll.address,
					success: function() {
				
					}
				});
				// qqmapsdk.reverseGeocoder({
				// 	location: {
				// 		latitude: that.dataAll.latitude,
				// 		longitude: that.dataAll.longitude,
				// 	},
				// 	success: function(res) { //成功后的回调
				// 		uni.openLocation({
				// 			latitude:parseInt(that.dataAll.latitude),
				// 			longitude:parseInt(that.dataAll.longitude),
				// 			name: that.dataAll.address,
				// 			success: function() {

				// 			}
				// 		});
				// 	}
				// })
			},
			// 任务完成
			taskFinish(e) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认完成该任务？',
					success: function(res) {
						if (res.confirm) {
							var tempData = {
								id: that.dataAll.id
							}
							if (that.curUserType == 0) {
								uni.request({
									url: that.global_baseUrl + '/index.php/staskok',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											var text = '该任务已完成！'
											that.navFeedBackPage(text);
										}
									}
								});
							} else {
								uni.request({
									url: that.global_baseUrl + '/index.php/taskok',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											var text = '该任务已完成！'
											that.navFeedBackPage(text);
										}
									}
								});
							}

						} else if (res.cancel) {}
					}
				});

			},
			// 未到反馈
			noComeFeed(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			//取消任务
			cancelTask() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认取消该任务',
					success: function(res) {
						if (res.confirm) {
							var tempData = {
								id: that.dataAll.id
							}
							if (that.curUserType == 0) {
								uni.request({
									url: that.global_baseUrl + '/index.php/sdeltask',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											var text = '该任务已取消，首页将不在显示！'
											that.navFeedBackPage(text);
										} else if (res.data.code == '700') {}
									}
								});
							} else {
								uni.request({
									url: that.global_baseUrl + '/index.php/deltask',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											var text = '该任务已取消，首页将不在显示！'
											that.navFeedBackPage(text);
										} else if (res.data.code == '700') {}
									}
								});
							}
						} else if (res.cancel) {}
					}
				});


			},
			navFeedBackPage(text) {
				uni.navigateTo({
					url: '/pages/public/feedbackPage/feedbackPage?content=' + text
				})
			}
		}
	}
</script>

<style lang="less">
	.ljBottomButton {
		left: 0;
		right: 0;
		font-size: 28upx;
		position: fixed;
		bottom: 0;
		display: flex;
		// width: 100%;
		height: 50px;

		.ljButtHelp {
			width: 100%;
			height: 100%;
		}
	}

	.topSticky {
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.item-top {
		width: 100%;
		/* height: 170rpx; */
		background-color: white;
		/* position: fixed; */
		/* top: 0; */
	}

	.top-backIcon {
		font-size: 35rpx;
		/* padding: 70rpx 0 0 30rpx; */
		position: absolute;
		top: 10rpx;
	}

	.top-text {
		font-size: 35rpx;
		text-align: center;
		padding: 70rpx 0 0 0;
	}

	.workItem-top {
		/* margin-top: 170rpx; */
		padding: 30rpx 0;
		background-color: white;
	}

	.workItem-topTitle {
		font-size: 40rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
	}

	.workItem-topCenter {
		display: flex;
		margin: 20rpx 30rpx;
	}

	.topCenter-price {
		font-size: 60rpx;
		font-weight: bold;
		color: #ff6000;
	}

	.topCenter-unit {
		font-size: 30rpx;
		color: #ff6000;
		margin: 18rpx 0 0 20rpx;
	}

	.workItem-topBottom {
		display: flex;
		margin: 0 30rpx;
	}

	.topBottom-tag {
		font-size: 30rpx;
	}

	.topBottom-tagPoint {
		font-size: 30rpx;
		margin: 0 10rpx;
	}

	.workItem-detail {
		margin-top: 30rpx;
		background-color: white;
		padding: 30rpx;
	}

	.detailTitle {
		font-size: 40rpx;
		font-weight: bold;
	}

	.detailTitle-bb {
		width: 80rpx;
		height: 10rpx;
		background-color: #F0F0F0;
		border-radius: 20rpx;
		margin-top: 40rpx;
	}

	.detailTags {
		margin-top: 30rpx;
		display: inline-flex;
	}

	.detail-tag {
		width: fit-content;
		height: 50rpx;
		padding: 0rpx 10rpx;
		font-size: 25rpx;
		line-height: 50rpx;
		border-radius: 5rpx;
		margin-right: 15rpx;
		background-color: #F0F0F0;
	}

	.detailText {
		margin-top: 30rpx;
		width: 100%;
		height: 500rpx;
		/* 500 */
		/* border: 1rpx solid #000000; */
		font-size: 30rpx;
		line-height: 50rpx;
		letter-spacing: 3rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.detail-company {
		margin-top: 30rpx;
		display: flex;
	}

	.detail-companyName {
		font-size: 35rpx;
		color: black;
		letter-spacing: 3rpx;
	}

	.detail-companyIcon {
		margin-left: 40rpx;
		font-size: 45rpx;
		line-height: 55rpx;
		color: #0081ff;
	}

	.detailTip {
		margin-top: 30rpx;
		font-size: 25rpx;
		padding: 30rpx 40rpx;
		background-color: white;
		letter-spacing: 5rpx;
	}

	.detail-button {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		display: flex;
		border: 1rpx solid #F0F0F0;
	}

	.detail-buttonShare {
		width: 30%;
		background-color: white;
		display: flex;
		justify-content: center;
	}

	.detail-buttonSign {
		width: 70%;
		font-size: 30rpx;
		text-align: center;
		line-height: 100rpx;

	}

	.buttonShare-icon {
		font-size: 35rpx;
		line-height: 100rpx;
		color: #0081ff;
	}

	.buttonShare-name {
		font-size: 30rpx;
		line-height: 100rpx;
		color: #0081ff;
		margin-left: 20rpx;
	}

	.bottomBlank {
		width: 100%;
		height: 100rpx;
		background-color: white;
		margin-top: 30rpx;
	}

	.modalButton {
		height: 100rpx;
		display: flex;
		border-top: 1rpx solid #E0E0E0;
	}

	.modalButton-left {
		color: black;
		font-size: 30rpx;
		line-height: 100rpx;
		text-align: center;
		flex: 1;
		border-right: 1rpx solid #E0E0E0;
	}

	.modalButton-right {
		color: #0081ff;
		font-size: 30rpx;
		line-height: 100rpx;
		text-align: center;
		flex: 1;
	}

	.modalTitle {
		font-size: 30rpx;
		color: black;
		font-weight: bold;
		padding: 50rpx;
	}

	.modalTip {
		padding: 0 40rpx 50rpx;
		font-size: 30rpx;
		color: #BABABA;
	}

	.detailMap {
		width: 100%;
		height: auto;
		background: url(../../../static/mapbg.jpg);
		background-size: 100% 200rpx;
		/* filter: blur(2rpx); */
		margin-top: 20rpx;
		padding: 20rpx 30rpx;
	}



	.detailMap-text {
		display: flex;
		flex-direction: column;

		width: 90%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.detailMap-icon {
		width: 10%;
		font-size: 40rpx;
		line-height: 100rpx;
		text-align: center;
	}
</style>
