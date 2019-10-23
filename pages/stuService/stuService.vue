<template>
	<view>
		<!-- // 顶部搜索地址组件 -->
		<view class="homeTopSticky">
			<topHeader />
		</view>
		<!-- 首页轮播组件 -->
		<topBanner :dataList='bannerList' />
		<!-- 下拉刷新 -->
		<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
			<view>
				<taskItem scene='service' :dataList='homeTaskList' />
			</view>
		</you-scroll>
		<uni-load-more :status="more"></uni-load-more>
		<!-- 悬浮按钮 -->
		<view class="circle-float bg-gradual-blue" @tap="pushNew">
			<view class="cuIcon-add"></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	// 顶部搜索地址组件
	import topHeader from './components/topHeader.vue'
	// 首页轮播组件
	import topBanner from './components/topBanner.vue'
	// 上拉下拉
	import youScroll from '@/components/you-scroll'
	// 任务ListItem
	import taskItem from '@/components/taskItem.vue'
	export default {
		components: {
			topHeader,
			topBanner,
			taskItem,
			youScroll,
			uniLoadMore
		},
		data() {
			return {
				more: 'loading',
				bannerList: [],
				homeTaskList: []
			};
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo', 'globalUserType'])
		},
		onLoad() {},
		onShow() {
			var that = this;
			if (that.globalUserType == 1) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '您是商家，无法查看该模块！',
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: '/pages/home/home'
							})
						} else if (res.cancel) {

						}
					}
				});
			}
			that.initData();
		},
		methods: {
			initData() {
				uni.showLoading({
					title: '数据初始化中'
				})
				var that = this;
				that.userGetBanner();
				that.userGetTaskList();
				setTimeout(() => {
					uni.hideLoading();
				}, 700);
			},
			pushNew() {
				var that = this;
				if (that.GlobalUserInfo.id) {
					uni.navigateTo({
						url: '/pages/public/pushTask/pushTask'
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
			onPullDown(done) { // 下拉刷新
				var that = this;
				that.homeTaskList = [];
				setTimeout(() => {
					that.userGetTaskList();
					done();
				}, 700)
			},
			onReachBottom() {
				var that = this;
				that.userGetTaskList('more');
			},
			// userGetBanner获取轮播图
			userGetBanner() {
				var that = this;
				var tempData = {
					type: 1 //0首页  1学生服务
				}
				uni.request({
					url: that.global_baseUrl + '/index.php/bind',
					data: tempData,
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							res.data.data.forEach((item, index) => {
								item.image = 'http://admin.wf1125.cn' + item.image;
							})
							that.bannerList = res.data.data;
						}
					}
				});
			},
			// userGetTaskList获取任务列表
			userGetTaskList(type) {
				var that = this;
				that.more = 'loading';
				var tempData = {
					type: 1, //0首页  1学生服务
					id: 0,
					list: that.homeTaskList.length
				}
				if (that.GlobalUserInfo.id) {
					tempData.id = that.GlobalUserInfo.id;
				}
				uni.request({
					url: this.global_baseUrl + '/index.php/task',
					data: tempData,
					header: {
						'content-type': 'application/json'
					},
					method: "POST",
					success: (res) => {
						if (res.data.data.length != 0) {
							if (res.data.code == '200') {
								if (type == 'more') {
									var tempList = res.data.data;
									tempList.forEach((item, index) => {
										item.peonum = 1;
										item.userGroup = [];
										item.shopSelf = false;
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
										that.homeTaskList.push(item);

									})
									that.more = 'noMore';
								} else {
									var tempList = res.data.data;
									tempList.forEach((item, index) => {
										item.peonum = 1;
										item.userGroup = [];
										item.shopSelf = false;
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
										that.homeTaskList.push(item);
									})
									that.more = 'noMore';
								}

							} else {
								that.more = 'noMore';
							}
						} else {
							that.more = 'noMore';
						}
					}
				});
			},
			onScroll(e) { // 监听滚动
			},
			scrollTo() {
				this.$refs.scroll.goTop();
			}
		}
	}
</script>
<style lang="less">
	.homeTopSticky {
		position: sticky;
		top: 0;
		z-index: 1;
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
		box-shadow: 0px 5px 10px #bbb;
	}
</style>
