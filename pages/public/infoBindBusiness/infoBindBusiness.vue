<template>
	<view>
		<view class="">
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">信息绑定</block>
			</cu-custom>
			<view class="topTt">
				<view class="topTitle">
					商户信息
				</view>
				<view class="cuIcon-taoxiaopu topTitle-icon">

				</view>
			</view>
			<view class="topTip">
				*请用使用贵商户真实信息填写
			</view>
		</view>
		<view class="formGroup">
			<view class="formItem">
				<view class="formItem-name textJustify">
					商户名
				</view>
				<input type="text" class="formItem-input" data-key='name' @blur="inputMehtod" />
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					手机号码
				</view>
				<input type="number" class="formItem-input" data-key='phone' @blur="inputMehtod" />
			</view>
			<view class="formItem-ads">
				<view class="formItem-adsName textJustify">
					商户地址
				</view>
				<view class="formItem-adsRight" @click="chooseLocation">
					<input type="text" disabled='true' class="input" :value="temp_address" placeholder="收货人地址" @blur="setValue('address',temp_address)" />
					<view class="action margin-right cuIcon-locationfill text-lg"></view>
				</view>
			</view>
			<view class="formImageUp">
				<view class="cu-form-group" style="padding: 0;">
					<view class="formImage-name textJustify">
						门面照片
					</view>
					<view class="grid col-4 grid-square flex-sub formImage-margin">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="formImageTip">
					*上传一张真实清晰的商户门面图，以证实您的商家身份
				</view>
			</view>
		</view>
		<view class="blankSpace">
		</view>
		<button class="margin-lr margin-tb-xl cu-btn block bg-gradual-blue lg" @tap="signUpNow">提交</button>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				address: '',
				imgList: [],
				temp_address: '',
				storeInfo: {
					wei: null,
					name: null,
					address: null,
					phone: null,
					image: null,
					latitude: null,
					longitude: null
				},
			}
		},
		computed: {
			...mapState(['globalOpenid', 'globalWXuserInfo'])
		},
		onLoad() {
			var that = this;
			that.initData();
		},
		methods: {
			...mapMutations(['setGlobalUserInfo', 'setGlobalOpenid', 'setglobalWXuserInfo', 'setToken']),
			// 数据提交
			signUpNow() {
				var that = this;
				that.userBindInfo();
			},
			// 商户绑定信息
			userBindInfo() {
				var that = this;
				var tempData = that.storeInfo;
				if (tempData.image == null) {
					uni.showToast({
						title: '图片未上传！',
						icon: 'none'
					})
				} else if (tempData.address == null) {
					uni.showToast({
						title: '地址为空！',
						icon: 'none'
					})
				} else if (tempData.name == null) {
					uni.showToast({
						title: '商户名为空！',
						icon: 'none'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '确定信息正确？',
						success: function(res) {
							if (res.confirm) {
								uni.showLoading({
									title: '提交中'
								})
								uni.request({
									url: that.global_baseUrl + '/index.php/shopSigin',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											uni.setStorageSync('localUserInfo', res.data.data);
											that.setToken(res.data.data.token);
											uni.setStorageSync('token', res.data.data.token)
											that.setGlobalUserInfo(res.data.data)
											uni.setStorageSync('isDone', 0)
											uni.hideLoading();
											uni.showToast({
												title: '等待审核'
											})
											setTimeout(() => {
												uni.hideLoading();
												uni.redirectTo({
													url: '/pages/login/login?isDone=0'
												})
											}, 800)
										} else if (res.data.code == 501) {
											uni.showToast({
												title: "名字长度不能超过4个字",
												icon: 'none'
											});
											uni.hideLoading();
										} else if (res.data.code == 401) {
											uni.showToast({
												title: "号码格式不正确!",
												icon: 'none'
											});
											uni.hideLoading();
										} else if (res.data.code == 504) {
											uni.showModal({
												title: '提示',
												content: '商户已绑定',
												success: function(res) {
													if (res.confirm) {
														console.log('用户点击确定');
													} else if (res.cancel) {
														console.log('用户点击取消');
													}
												}
											});
											uni.hideLoading();
										}
									}
								});
							}
						}
					});
				}
			},
			initData() {
				var that = this;
				that.storeInfo.wei = that.globalOpenid;
			},
			// 商户信息表单
			inputMehtod(e) {
				var that = this;
				switch (e.target.dataset.key) {
					case 'name':
						that.storeInfo.name = e.target.value
						break;
					case 'phone':
						that.storeInfo.phone = e.target.value
						break;
					default:
						break;
				}
			},
			//地图选择地址
			chooseLocation() {
				var _self = this;
				uni.showLoading({
					title: '加载地图模块中...'
				})
				uni.chooseLocation({
					success: (data) => {
						_self.storeInfo.latitude = data.latitude;
						_self.storeInfo.longitude = data.longitude;
						_self.storeInfo.address = data.address;
						_self.temp_address = ''
						_self.temp_address = data.address

					}
				})
				setTimeout(() => {
					uni.hideLoading();
				}, 500)
			},
			setValue(do_what, value) {
				switch (do_what) {
					case 'name':
						this.addressData.name = value;
						break;
					case 'mobile':
						this.addressData.mobile = value;
						break;
					case 'area':
						this.addressData.area = value;
						break;
					case 'address':
						this.addressData.address = value;
				}
			},
			// 图片上传测试
			userUploadFile(picPath, belongUser, picType) {
				var that = this;
				var tempData = {
					belongUser: belongUser,
					picType: picType
				}
				uni.uploadFile({
					url: that.global_baseUrl + '/index.php/upPic',
					filePath: picPath,
					name: 'file',
					header: {
						'content-type': 'application/json'
					},
					formData: tempData,
					success: (uploadFileRes) => {
						console.log(uploadFileRes)
						const tempPath = JSON.parse(uploadFileRes.data).data.src;
						that.storeInfo.image = tempPath.replace(/\\/g, "/");
					}
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.userUploadFile(res.tempFilePaths[0], 1, 1)
						if (this.imgList.length != 0) {

							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},

			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '你真的忍心删掉我吗',
					cancelText: '不',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
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
		width: 100%;
		height: 50px;

		.ljButtHelp {
			width: 100%;
			height: 100%;
		}
	}

	.topTitle {
		font-size: 55rpx;
		line-height: 60rpx;
		color: black;
		font-weight: bold;
	}

	.topTt {
		display: flex;
		background-color: white;
		padding: 20rpx 30rpx;
	}

	.topTitle-icon {
		font-size: 50rpx;
		line-height: 60rpx;
		color: #0081FF;
		margin-left: 30rpx;
	}

	.topTip {
		font-size: 30rpx;
		color: #999999;
		padding: 20rpx 30rpx;
		letter-spacing: 3rpx;
		background-color: white;
	}

	.formGroup {
		height: auto;
		margin: 40rpx;
		background-color: white;
		padding: 0 30rpx;
		border-radius: 20rpx;
		box-shadow: 0rpx 20rpx 20rpx #d3d3d3;
	}

	.formItem {
		display: flex;
		width: 100%;
		height: 110rpx;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #EAEAEA;
	}

	.formItem-name {
		width: 23%;
		font-size: 30rpx;
		line-height: 50rpx;
		/* border: 1rpx solid red; */
	}

	.textJustify {
		text-align: justify;
	}

	.textJustify::after {
		width: 100%;
		display: inline-block;
		content: '';
	}

	.formItem-input {
		margin-left: 10%;
		width: 67%;
		height: 50rpx;
		font-size: 30rpx;
		line-height: 50rpx;
		/* border: 1rpx solid blue; */
	}

	.formItem-ads {
		display: flex;
		width: 100%;
		height: auto;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #EAEAEA;
	}

	.formItem-adsName {
		width: 23%;
		height: 50rpx;
		font-size: 30rpx;
	}

	.formItem-adsRight {
		width: 67%;
		margin-left: 10%;
		display: flex;
	}

	.formItem-adsIcon {
		line-height: 50rpx;
		color: #0081ff;
		text-align: center;
		font-size: 30rpx;
		margin-right: 10rpx;
	}

	.formItem-address {
		font-size: 30rpx;
		line-height: 50rpx;
	}

	.formImage-name {
		width: 23%;
		font-size: 30rpx;
	}

	.formImageUp {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #EAEAEA;
	}

	.formImage-margin {
		margin-left: 10%;
	}

	.formImageTip {
		font-size: 17rpx;
		color: red;
	}

	.blankSpace {
		height: 100rpx;
	}
</style>
