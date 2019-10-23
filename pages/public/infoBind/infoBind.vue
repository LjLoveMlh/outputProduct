<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">信息绑定</block>
		</cu-custom>
		<view class="itemTop">
			<view class="topTt">
				<view class="topTitle">
					个人信息
				</view>
				<view class="cuIcon-myfill topTitle-icon">

				</view>
			</view>
			<view class="topTip">
				*请用使用本人真实信息填写
			</view>
		</view>
		<view class="formGroup">
			<view class="formItem">
				<view class="formItem-name textJustify">
					个人姓名
				</view>
				<input type="text" class="formItem-input" data-key='name' @blur="inputMehtod" />
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					性别
				</view>
				<picker class="formPicker" @change="sexChange" :range="sex">
					<view class="formItem-radio">
						{{sx>-1?sex[sx]:''}}
					</view>
				</picker>
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					学校
				</view>
				<picker class="formPicker" @change="schoolChange" :range="school">
					<view class="formItem-radio">
						{{sch>-1?school[sch]:''}}
					</view>
				</picker>
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					年级
				</view>
				<picker class="formPicker" @change="gradeChange" :range="grade">
					<view class="formItem-radio">
						{{grd>-1?grade[grd]:''}}
					</view>
				</picker>
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					手机号码
				</view>
				<input type="number" class="formItem-input" data-key='phone' @blur="inputMehtod" />
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					学号
				</view>
				<input type="number" class="formItem-input" data-key='stuId' @blur="inputMehtod" />
			</view>
			<view class="formImageUp">
				<view class="cu-form-group" style="padding: 0;">
					<view class="formImage-name textJustify">
						学生证
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
					*若无法上传学生证，请上传学信网截图或学校教务网截图以认证身份。
				</view>
			</view>
		</view>
		<view class="blankSpace">

		</view>
		<button class="margin-lr margin-tb-xl cu-btn block bg-gradual-blue lg" @tap="postInfo">提交</button>
		<!-- <view class="formSubmit" @tap="postInfo">
			提交
		</view> -->
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
				sch: 0,
				sx: 0,
				grd: 0,
				sex: ['男', '女'],
				school: [],
				grade: ['大一', '大二', '大三', '大四'],
				imgList: [],
				imgList1: [],
				stuInfo: {
					openid: null,
					name: null,
					sex: null,
					school: null,
					grade: null,
					phone: null,
					stuId: null,
					image: null, //学生证
					shouimage: null //微信头像
				},
			};
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
			postInfo() {
				var that = this;
				that.userBindInfo();
			},
			initData() {
				var that = this;
				that.getSchooList();
				// openid 初始化
				that.stuInfo.openid = that.globalOpenid;
				// 微信头像初始化
				that.stuInfo.shouimage = that.globalWXuserInfo.avatarUrl;
				// 表单部分数据初始化
				that.stuInfo.sex = that.sx;

				that.stuInfo.grade = that.grade[that.grd];
				console.log(that.school);
			},
			// 获取学校列表
			async getSchooList() {
				var that = this;
				uni.request({
					url: that.global_baseUrl + '/index.php/school',
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							res.data.data.forEach((item, index) => {
								that.school.push(item.name)
							})

						}
					}
				});
				console.log(that.school);
			},
			// 学生信息表单
			inputMehtod(e) {
				var that = this;
				switch (e.target.dataset.key) {
					case 'name':
						that.stuInfo.name = e.target.value
						break;
					case 'stuId':
						that.stuInfo.stuId = e.target.value
						break;
					case 'phone':
						that.stuInfo.phone = e.target.value
						break;
					default:
						break;
				}
			},
			// 学生绑定信息
			userBindInfo() {
				var that = this;
				that.stuInfo.school = that.school[that.sch];
				var tempData = that.stuInfo;
				if (tempData.image == null) {
					uni.showToast({
						title: '图片未上传！',
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
									url: that.global_baseUrl + '/index.php/sigin',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											uni.setStorageSync('localUserInfo');
											that.setToken(res.data.data.token);
											uni.setStorageSync('token', res.data.data.token)
											uni.setStorageSync('localUserInfo', res.data.data);
											that.setGlobalUserInfo(res.data.data)
											uni.hideLoading();
											uni.switchTab({
												url: '/pages/home/home'
											})
										} else if (res.data.code == 501) {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											})
										} else {

										}
									}
								});
							}
						}
					});
				}

			},
			//学校选择
			schoolChange(e) {
				this.sch = e.detail.value;
				this.stuInfo.school = this.school[this.sch];
			},
			// 性别选择
			sexChange(e) {
				this.sx = e.detail.value;
				this.stuInfo.sex = this.sx;
			},
			// 年级选择
			gradeChange(e) {
				this.grd = e.detail.value
				this.stuInfo.grade = this.grade[this.grd];
			},
			// 图片上传测试
			userUploadFile(picPath, belongUser, picType) {
				var that = this;
				// belongUser 学生0，商户1
				// picType    头像0，学生证1  
				// 				头像0， 门头照1
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
						const tempPath = JSON.parse(uploadFileRes.data).data.src;
						that.stuInfo.image = tempPath.replace(/\\/g, "/");
					}
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.userUploadFile(res.tempFilePaths[0], 0, 1)
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
					content: '删除该照片',
					cancelText: '手滑',
					confirmText: '确定',
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
	.topTitle {
		font-size: 55rpx;
		line-height: 60rpx;
		color: black;
		font-weight: bold;
		background-color: white;
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

	.formImage-name {
		width: 23%;
		font-size: 30rpx;
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

	.formPicker {
		width: 67%;
		margin-left: 10%;
	}

	.formItem-radio {
		font-size: 30rpx;
		line-height: 50rpx;
	}

	.formImageUp {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #EAEAEA;
	}

	.formImage-margin {
		margin-left: 10%;
	}

	.formSubmit {
		height: 100rpx;
		width: 100%;
		background: -webkit-linear-gradient(left, #0081ff, #1cbbb4);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #0081ff, #1cbbb4);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #0081ff, #1cbbb4);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #0081ff, #1cbbb4);
		position: fixed;
		bottom: 0;
		font-size: 30rpx;
		line-height: 100rpx;
		text-align: center;
	}

	.formImageTip {
		font-size: 17rpx;
		color: red;
	}

	.blankSpace {
		height: 100rpx;
	}
</style>
