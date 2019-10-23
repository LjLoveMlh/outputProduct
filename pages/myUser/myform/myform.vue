<template>
	<view class="">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">个人信息</block>
		</cu-custom>
		<view class="itemTop">
			<view class="topTitle">
				个人信息
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
				<input type="text" class="formItem-input" value="" />
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					性别
				</view>
				<picker class="formPicker" @change="sexChange" :value="sx" :range="sex">
					<view class="formItem-radio">
						{{sx>-1?sex[sx]:''}}
					</view>
				</picker>
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					学校
				</view>
				<picker class="formPicker" @change="schoolChange" :value="sch" :range="school">
					<view class="formItem-radio">
						{{sch>-1?school[sch]:''}}
					</view>
				</picker>
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					年级
				</view>
				<picker class="formPicker" @change="gradeChange" :value="grd" :range="grade">
					<view class="formItem-radio">
						{{grd>-1?grade[grd]:''}}
					</view>
				</picker>
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					手机号码
				</view>
				<input type="number" class="formItem-input" value="" />
			</view>
			<view class="formItem">
				<view class="formItem-name textJustify">
					学号
				</view>
				<input type="number" class="formItem-input" value="" />
			</view>
			<!-- <view class="formItemUp">
					<view class="formItem-name textJustify">
						图片上传
					</view>
				</view> -->
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
			<view class="formImageUp">
				<view class="cu-form-group" style="padding: 0;">
					<view class="formImage-name textJustify">
						收款码
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
					*上传收款码，用于任务完成后平台为您打款
				</view>
			</view>

		</view>
		<view class="blankSpace">

		</view>
		<view class="formSubmit">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sch: 0,
				sx: 0,
				grd: 0,
				sex: ['男', '女'],
				school: ['文华学院'],
				grade: ['大一', '大二', '大三', '大四'],
				imgList: []
			}
		},
		onLoad() {

		},
		methods: {
			schoolChange(e) {
				this.sch = e.detail.value
			},
			sexChange(e) {
				this.sx = e.detail.value
			},
			gradeChange(e) {
				this.grd = e.detail.value
			},

			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
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

<style>
	/* .itemTop {
		position: sticky;
		top: 0;
	} */
	.topTitle {
		font-size: 55rpx;
		padding: 20rpx 30rpx;
		color: black;
		font-weight: bold;
		background-color: white;
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
		background-color: white;
	}
</style>
