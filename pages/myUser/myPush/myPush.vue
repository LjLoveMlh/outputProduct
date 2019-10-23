<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				我发布的
			</block>
		</cu-custom>
		<view class="margin-bottom-xl" v-if="TabCur==0">
			<!-- 下拉刷新 -->
			<!-- <scroll-view style="height: 800px;" scroll-y="true"> -->
			<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
				<!-- 任务ListItem -->
				<!-- <taskItem   :dataList='orderListTask' /> -->

				<taskItem scene="service" :shopSelf='curShopSelf' :dataList='orderListTask' v-if='curUserType==0' />
				<taskItem :shopSelf='curShopSelf' :dataList='orderListTask' v-else />
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
				LJlatitude: '',
				LJlongitude: '',
				curUserType: null,
				curShopSelf: false,

			};
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo', 'globalUserType'])
		},
		onLoad(option) {
			var that = this;
			that.curUserType = that.globalUserType;
			if (that.curUserType == 1) {
				that.curShopSelf = true;
			}
			that.getLocationAO();
			that.initData();
			var pageNumber = option.index;
			this.TabCur = pageNumber;
		},
		methods: {
			// 初始化数据
			initData() {
				var that = this;
				that.getListMyPush();
				// that.getOrderListService();
				
			},
			getLocationAO() {
				var that = this;
				that.LJlatitude = that.LJlocation.latitude;
				that.LJlongitude = that.LJlocation.longitude;
			},
			// 获取任务列表
			async getListMyPush() {
				var that = this;
				var apiName = '';
				var secondName = '';
				var tempData = {}
				if (that.curUserType == 0) {
					tempData.student_id = that.GlobalUserInfo.id;
					apiName = 'myputask';
					secondName = 'stutaskstu'
				} else {
					tempData.shopid = that.GlobalUserInfo.id;
					apiName = 'shoptask';
					secondName = 'taskstu'
				}
				uni.request({
					url: that.global_baseUrl + '/index.php/' + apiName,
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							var tempList = res.data.data;
							tempList.forEach((item, index) => {
								item.userGroup = [];
								if (that.globalUserType == 0) {
									item.peonum = 1;
								}
								item.shopSelf = true;
								item.distance = that.distance(item.latitude, item.longitude, that.LJlatitude, that.LJlongitude);
								uni.request({
									url: that.global_baseUrl + '/index.php/' + secondName,
									data: {
										student_ids: item.student_ids
									},
									method: "POST",
									success: (res) => {
										if (res.data.code == '200') {
											res.data.data.forEach((item, index) => {
												item.myUser=true,
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
	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.LJstick {
		position: sticky;
		top: 0px;
		z-index: 88;
	}
</style>
