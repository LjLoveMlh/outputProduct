<template>
	<view class="">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">发布服务/兼职</block>
		</cu-custom>
		<block v-if="curRole==0">
			<view class="topTt">
				<view class="topTitle">
					发布服务
				</view>
				<view class="cuIcon-creativefill topTitle-icon">
				</view>
			</view>
			<view class="topTip">
				*小提示小提示小提示
			</view>

			<!-- 服务/兼职名称 -->
			<view class="cu-form-group">
				<view class="title">服务标题</view>
				<input placeholder="(如:XXX帮忙送奶茶)" data-key='name' @blur="inputMehtod"></input>
			</view>
			<!-- 服务/兼职工作内容描述 -->
			<view class="cu-form-group align-start">
				<view class="title">工作内容</view>
				<textarea maxlength="-1" data-key='describe' @blur="inputMehtod" :disabled="modalName!=null" placeholder="负责某某"></textarea>
			</view>
			<!-- 服务截至日期时间 -->
			<view class="cu-form-group">
				<view class="title flex-sub">截止时间</view>
				<hTimePicker sTime="0" cTime="23" interval="30" @changeTime="getTimeStu">
					<view slot="pCon" class="changeTime">
						{{StuTime}}
					</view>
				</hTimePicker>
				<view class="action cuIcon-right text-grey"></view>
			</view>
			<!-- 发布人信息 -->
			<view class="cu-form-group">
				<view class="title">联系称呼</view>
				<input placeholder="发布人姓名" data-key='fabu_name' @blur="inputMehtod"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="您的联系电话" type="number" data-key='phone' @blur="inputMehtod"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">酬劳费用</view>
				<input type="number" placeholder="输入您想支付的酬劳费用" data-key='price' @blur="inputMehtod"></input>
			</view>
			<view class="margin-left margin-top-sm formImageTip">
				*重要声明：平台不会对该类型服务收取任何费用！。
			</view>

		</block>
		<block v-else>
			<!-- 兼职任务 -->
			<view class="cu-form-group">
				<view class="title">任务标题</view>
				<input placeholder="(如:光谷国际餐馆招聘试吃员)" data-key='name' @blur="inputMehtodShop"></input>
			</view>
			<!-- 关键词描述任务 -->
			<!-- 兼职工作内容描述 -->
			<view class="cu-form-group align-start">
				<view class="title">工作内容</view>
				<textarea maxlength="-1" :disabled="modalName!=null" data-key='describe' @blur="inputMehtodShop" placeholder="负责某某"></textarea>
			</view>
			<!-- 兼职标签 -->
			<view class="cu-form-group flex align-start">
				<view class="padding-top " style="width: 130px !important;">任务标签</view>
				<view class='padding-xs flex flex-wrap '>
					<view class="padding-xs" v-for="(item,index) in checkbox" :key="index" v-if="index<9">
						<view class='cu-tag' :class="item.checked?'bg-blue':'bg-gray'" @tap="ChooseCheckbox" :data-value="item.value">{{item.name}}</view>
					</view>
					<view class="padding-xs margin-left-xs text-gray" data-target="ChooseModal" @tap="showModal">更多></view>
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<view class="cu-bar bg-white">
						<view class="action text-gray" @tap="hideModal">取消</view>
						<view class="action text-blue" @tap="hideModal">确定</view>
					</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
							<button class="cu-btn orange lg block" :class="item.checked?'bg-blue':'line-blue'" @tap="ChooseCheckbox"
							 :data-value="item.value"> {{item.name}}

							</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 兼职招聘人数 -->
			<view class="cu-form-group">
				<view class="title">招聘人数</view>
				<input type="number" placeholder="如:5" data-key='peonum' @blur="inputMehtodShop"></input>
				<view class="action margin-right">人</view>
			</view>
			<!-- 时长 -->
			<view class="cu-form-group">
				<view class="title flex-sub">开始时间</view>
				<hTimePicker sTime="0" cTime="23" interval="30" @changeTime="getTimeS">
					<view slot="pCon" class="changeTime">
						{{Stime}}
					</view>
				</hTimePicker>
				<view class="action cuIcon-right text-grey"></view>
			</view>
			<view class="cu-form-group">
				<view class="title flex-sub">结束时间</view>
				<hTimePicker sTime="0" cTime="23" interval="30" @changeTime="getTimeE">
					<view slot="pCon" class="changeTiEme">
						{{Etime}}
					</view>
				</hTimePicker>
				<view class="action cuIcon-right text-grey"></view>
			</view>
			<view class="cu-form-group">
				<view class="title">工作时长</view>
				<input type="number" disabled="true" :value="spaceHours"></input>
				<view class="action margin-right">小时</view>
			</view>
			<!-- 单价 -->
			<view class="cu-form-group">
				<view class="title">任务单价</view>
				<input type="number" placeholder="输入兼职的佣金(每时每人)" data-key='price' @blur="inputMehtodShop"></input>
				<view class="action margin-right">￥/时/人</view>
			</view>

			<view class="cu-form-group" @click="chooseLocation">
				<view class="title">工作地址</view>
				<input type="text" disabled='true' class="input" :value="temp_address" placeholder="点击选择工作地址" @blur="setValue('address',temp_address)" />
				<view class="action margin-right cuIcon-locationfill text-df"></view>
			</view>

			<!-- 发布人信息 -->
			<view class="cu-form-group">
				<view class="title">联系称呼</view>
				<input placeholder="发布人姓名" data-key='fabu_name' @blur="inputMehtodShop"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="您的联系电话" type="number" data-key='phone' @blur="inputMehtodShop"></input>
			</view>

		</block>
		<button class="margin-lr margin-tb-xl cu-btn block bg-gradual-blue lg" @tap="nextStep">立即发布</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
	export default {
		components: {
			hTimePicker
		},

		data() {
			return {
				taskPushData: {
					name: null,
					describe: null,
					price: null,
					statime: null,
					endtime: null,
					address: null,
					shop_id: null,
					fabu_name: null,
					phone: null,
					peonum: null,
					label_ids: null,
					longitude: null,
					latitude: null
				},
				servicePushData: {
					name: null,
					student_id: null,
					describe: null,
					price: null,
					phone: null,
					endtime: null,
					fabu_name: null
				},
				curRole: 0, // 0:学生，1商家
				StuTime: '点击选择截至时间',
				StuStimestamp: '',
				Stime: '点击选择开始时间', //格式化时间，2019-09-05 00：00：00
				Stimestamp: '', //时间戳，
				Etime: '点击选择结束时间', //格式化时间，2019-09-05 00：00：00
				Etimestamp: '', //时间戳，
				spaceHours: '自动计算时长',
				temp_address: '',
				CustomBar: this.CustomBar,
				modalName: null,
				checkbox: []

			}
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo', 'globalUserType'])
		},
		onLoad() {
			var that = this;
			that.curRole = that.globalUserType;
			that.initData();
		},
		methods: {
			initData() {
				var that = this;
				that.servicePushData.student_id = that.GlobalUserInfo.id;
				that.taskPushData.shop_id = that.GlobalUserInfo.id;
				that.getLabelList();
			},
			getLabelList() {
				var that = this;
				uni.request({
					url: that.global_baseUrl + '/index.php/label',
					// data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							res.data.data.forEach((item, index) => {
								item.value = index;
								item.checked = false;
							})
							that.checkbox = res.data.data;
						}
					}
				});
			},
			//商户表单触发
			inputMehtodShop(e) {
				var that = this;
				switch (e.target.dataset.key) {
					case 'name':
						that.taskPushData.name = e.target.value
						break;
					case 'describe':
						that.taskPushData.describe = e.target.value
						break;
					case 'price':
						that.taskPushData.price = e.target.value
						break;
					case 'phone':
						that.taskPushData.phone = e.target.value
						break;
					case 'fabu_name':
						that.taskPushData.fabu_name = e.target.value
						break;
					case 'peonum':
						that.taskPushData.peonum = e.target.value
						break;
					default:
						break;
				}
			},
			// 学生服务表单触发
			inputMehtod(e) {
				var that = this;
				switch (e.target.dataset.key) {
					case 'name':
						that.servicePushData.name = e.target.value
						break;
					case 'describe':
						that.servicePushData.describe = e.target.value
						break;
					case 'price':
						that.servicePushData.price = e.target.value
						break;
					case 'phone':
						that.servicePushData.phone = e.target.value
						break;
					case 'fabu_name':
						that.servicePushData.fabu_name = e.target.value
						break;
					default:
						break;
				}
			},
			// 下一步
			nextStep() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认发布该任务？',
					success: function(res) {
						if (res.confirm) {
							// 学生
							if (that.curRole == 0) {
								var tempData = that.servicePushData
								uni.request({
									url: that.global_baseUrl + '/index.php/pusttask',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											var text = '恭喜，任务发布成功！'
											uni.navigateTo({
												url: '/pages/public/feedbackPage/feedbackPage?content=' + text
											})
										} else {
											// 请求失败
										}
									}
								});
							} else {
								// 商家
								var tempStringIdList = []
								that.checkbox.forEach((item, index) => {
									if (item.checked) {
										tempStringIdList.push(item.id)
									}
								})
								that.taskPushData.label_ids = JSON.stringify(tempStringIdList)
								var tempData = that.taskPushData;
								uni.request({
									url: that.global_baseUrl + '/index.php/pushoptask',
									data: tempData,
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											var text = '恭喜，任务发布成功！'
											uni.navigateTo({
												url: '/pages/public/feedbackPage/feedbackPage?content=' + text
											})
										}
									}
								});
							}
						}
					}
				});

			},
			// 时间选择
			getTimeS(time, timestamp) {
				this.Stime = time;
				this.Stimestamp = timestamp;
				this.taskPushData.statime = (new Date(time).getTime()) / 1000;
			},
			getTimeE(time, timestamp) {
				this.Etime = time;
				this.Etimestamp = timestamp;
				this.taskPushData.endtime = (new Date(time).getTime()) / 1000;
				this.computeTiem();
			},


			computeTiem() {
				var that = this;
				var s1 = that.Stime; //开始时间  
				var s2 = that.Etime; //结束时间 
				s1 = new Date(s1.replace(/-/g, '/'));
				s2 = new Date(s2.replace(/-/g, '/'));
				var ms = Math.abs(s1.getTime() - s2.getTime());
				// return ms / 1000 / 60 / 60;
				that.spaceHours = ms / 1000 / 60 / 60;
			},

			getTimeStu(time, timestamp) {
				this.StuTime = time;
				this.StuStimestamp = timestamp;
				this.servicePushData.endtime = (new Date(time).getTime()) / 1000;
			},
			//地图选择地址
			chooseLocation() {
				var _self = this;
				uni.showLoading({
					title: '加载地图模块中...'
				})
				uni.chooseLocation({
					success: (data) => {
						_self.taskPushData.latitude = data.latitude;
						_self.taskPushData.longitude = data.longitude;
						_self.taskPushData.address = data.address;
						_self.temp_address = ''
						// _self.addressData.address = data.address;
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseCheckbox(e) {
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			},
		}
	}
</script>

<style>
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

	.formItem-timePicker {
		width: 67%;
		margin-left: 10%;
		font-size: 30rpx;
		line-height: 50rpx;
	}

	.formItem-ta {
		display: flex;
		width: 100%;
		height: auto;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #EAEAEA;
	}

	.formItem-textarea {
		width: 63%;
		height: 300rpx;
		margin-left: 10%;
		font-size: 30rpx;
		line-height: 30rpx;
		padding: 10rpx;
	}

	.blankSpace {
		height: 100rpx;
	}

	.formImageTip {
		font-size: 24rpx;
		color: red;
	}
</style>
