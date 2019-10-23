<template>
	<view>
		<view class="LJstick">
			<cu-custom bgColor="bg-white" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">
					<picker @change="PickerChange" :value="topIndex" :range="picker">
						<view class="picker">
							{{picker[topIndex]}}
						</view>
					</picker>
				</block>
			</cu-custom>

			<!-- 订单导航 -->
			<scroll-view scroll-x class="bg-white text-center nav  shadow shadow-lg">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in TabName" :key="index"
				 @tap="tabSelect" :data-id="index">{{item}}
				</view>
			</scroll-view>
		</view>

		<!-- <swiper class="swiper-box" @change="pageChange" :indicator-dots="false" :current="TabCur" :autoplay="false" :duration="300"> -->
		<!-- <swiper-item class="list-scroll-content"> -->
		<!-- <scroll-view class="list-scroll-content" scroll-y="true"> -->
		<view class="margin-bottom-xl" v-if="TabCur==0">
			<!-- 下拉刷新 -->
			<!-- <scroll-view style="height: 800px;" scroll-y="true"> -->
			<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
				<!-- 任务ListItem -->
				<taskItem :dataList='orderListTask' />
			</you-scroll>
			<!-- </scroll-view> -->
			<uni-load-more :status="more"></uni-load-more>
		</view>
		<!-- </scroll-view> -->
		<!-- </swiper-item> -->
		<!-- <swiper-item class="list-scroll-content"> -->
		<!-- <scroll-view class="list-scroll-content" scroll-y="true"> -->
		<view class="margin-bottom-xl" v-if="TabCur==1">
			<!-- 下拉刷新 -->
			<!-- <scroll-view style="height: 800px;" scroll-y="true"> -->
			<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
				<!-- 任务ListItem -->
				<taskItem scene='service' :dataList='orderListService' />
			</you-scroll>
			<!-- </scroll-view> -->
			<uni-load-more :status="more"></uni-load-more>
		</view>

		<view class="margin-tb-xl">

		</view>


	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	// 上拉下拉
	import youScroll from '@/components/you-scroll'
	// 任务ListItem
	import taskItem from '@/components/taskItem.vue'
	export default {
		components: {
			taskItem,
			youScroll,
			uniLoadMore
			// uniNoticeBar
		},
		data() {
			return {
				topIndex: 0,
				picker: ['我的任务', '我的服务'],
				TabCur: 0,
				scrollLeft: 0,
				TabName: ['我的任务', '我的服务'],
				orderListTask: [],
				orderListService: [],
				LJlatitude: '',
				LJlongitude: '',
			};
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo'])
		},
		onLoad(option) {
			var that = this;
			that.initData();
			var pageNumber = option.index;
			this.TabCur = pageNumber;
		},
		methods: {
			// 初始化数据
			initData() {
				var that = this;
				that.getOrderListTask();
				that.getOrderListService();
				that.getLocationAO();
			},

			// 获取经纬度
			getLocationAO() {
				var that = this;
				that.LJlatitude = that.LJlocation.latitude;
				that.LJlongitude = that.LJlocation.longitude;
			},
			// 获取任务列表
			getOrderListTask() {
				var that = this;
				var tempData = {
					type: 0, //0首页  1学生服务
					stu_id: that.GlobalUserInfo.id
				}
				uni.request({
					url: that.global_baseUrl + '/index.php/stutask',
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							var tempList = res.data.data;
							tempList.forEach((item, index) => {
								item.showShopInfo = true;
								item.userGroup = [];
								item.distance = that.distance(item.latitude, item.longitude, that.LJlatitude, that.LJlongitude);
								uni.request({
									url: that.global_baseUrl + '/index.php/stutaskstu',
									data: {
										student_ids: item.student_ids
									},
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											res.data.data.forEach((item, index) => {
												item.checked = false
											})
											item.userGroup = res.data.data;
										}
									}
								});
								that.orderListTask.push(item);
							});
						} else {
							// 请求失败
						}
					}
				});
			},
			distance(la1, lo1, la2, lo2) {
				var La1 = la1 * Math.PI / 180.0;
				var La2 = la2 * Math.PI / 180.0;
				var La3 = La1 - La2;
				var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
					Lb3 / 2), 2)));
				s = s * 6378.137; //地球半径
				s = Math.round(s * 10000) / 10000;
				s = s.toFixed(1);
				return s
			},
			getOrderListService() {
				var that = this;
				var tempData = {
					type: 1, //0首页  1学生服务
					stu_id: that.GlobalUserInfo.id
				}
				uni.request({
					url: that.global_baseUrl + '/index.php/stutask',
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							var tempList = res.data.data;
							tempList.forEach((item, index) => {
								item.userGroup = [];
								item.showShopInfo = true;
								item.peonum = 1;
								item.distance = 0;
								uni.request({
									url: that.global_baseUrl + '/index.php/stutaskstu',
									data: {
										student_ids: that.GlobalUserInfo.id
									},
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											item.userGroup.push(res.data.data[0]);
										}
									}
								});
								that.orderListService.push(item);
							});
						}
					}
				});
			},
			PickerChange(e) {
				this.topIndex = e.detail.value
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			pageChange(e) {
				this.TabCur = e.detail.current;
			},
			goDetailWrok(e) {
				uni.navigateTo({
					url: '../detail/detailWork'
				})
			},
			onPullDown(done) { // 下拉刷新
				var that = this;
				that.homeTaskList = [];
				setTimeout(() => {
					// that.userGetTaskList();
					done();
				}, 700)

			},
			onScroll(e) { // 监听滚动
				// console.log(e.detail.scrollTop)
			},
			onReachBottom() {
				var that = this;
				that.userGetTaskList('more');

			},
		}
	}
</script>

<style lang="less">

</style>
