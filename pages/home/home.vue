<template name='home'>
	<view>
		<view class="homeTopSticky">
			<!-- 顶部搜索地址组件 -->
			<homeTopSearch  :dataList='curWxUserInfo' />
		</view>
		<!-- 首页轮播组件 -->
		<view class="lj_margin-top" style="z-index: 999;">
			<homeBanner :bannerList='homeBannerList' />
		</view>
		<!-- // 筛选框 -->
		<view class="boxShadow">
			<sl-filter :themeColor="themeColor" :menuList="menuList" @result="result"></sl-filter>
		</view>
		<!-- 下拉刷新 -->
		<!-- <scroll-view style="height: 800px;" scroll-y="true"> -->
		<you-scroll ref="scroll" @onPullDown="onPullDown" @onScroll="onScroll" @onLoadMore="onLoadMore">
			<!-- 任务ListItem -->
			<taskItem :dataList='homeTaskList' />
			<view class="margin-tb-xl">
				<view class="padding-tb-xl"></view>
			</view>
		</you-scroll>
		<!-- </scroll-view> -->
		<uni-load-more :status="more"></uni-load-more>
		<!-- 悬浮按钮 -->
		<view class="circle-float bg-gradual-blue" @tap="pushNew" v-if="curUserType==1">
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
	var QQMapWX = require('@/components/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	// 筛选框
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	// 上拉下拉
	import youScroll from '@/components/you-scroll'
	// 顶部搜索地址组件
	import homeTopSearch from './components/homeTopSearch.vue'
	// 首页轮播组件
	import homeBanner from './components/homeBanner.vue'
	// 任务ListItem
	import taskItem from '@/components/taskItem.vue'
	export default {
		components: {
			homeTopSearch,
			homeBanner,
			taskItem,
			youScroll,
			slFilter,
			uniLoadMore
		},
		data() {
			return {
				more: 'loading',
				themeColor: '#0081ff',
				menuList: [{
						'title': '标签',
						'detailTitle': '请选择标签类型（可多选）',
						'isMutiple': true,
						'key': 'jobType',
						'detailList': []
					},
					{
						'title': '时薪',
						'key': 'salary',
						'isMutiple': false,
						'detailTitle': '请选择时薪范围（单选）',
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '1~10',
								'value': 10
							},
							{
								'title': '10~20',
								'value': 20
							},
							{
								'title': '20~30',
								'value': 30
							},
							{
								'title': '30以上',
								'value': 31
							}
						]

					},
					{
						'title': '排序',
						'key': 'sort',
						'isSort': true,
						'detailList': [{
								'title': '默认排序',
								'value': ''
							},
							{
								'title': '发布时间',
								'value': 'add_time'
							},
							{
								'title': '时薪最高',
								'value': 'wages_up'
							},
							{
								'title': '离我最近',
								'value': 'location'
							}
						]
					}
				],
				list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				homeBannerList: [],
				homeTaskList: [],
				times: 0,
				LJlatitude: '',
				LJlongitude: '',
				curUserInfo: {},
				curWxUserInfo:{},
				filterResult: null,
				originData: null,
				curUserType: 0

			};
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo', 'globalUserType'])
		},
		onLoad(options) {
			var that = this;
			that.curUserType = that.globalUserType;
			if (that.curUserType == 0) {
				that.checkLocalInfo();
			}
		},
		onShow() {
			var that = this;
			that.homeTaskList = [];

			that.initData();
		},
		methods: {
			...mapMutations(['setGlobalUserInfo', 'setGlobalOpenid', 'setglobalWXuserInfo', 'setToken', 'setGlobalUserType']),
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
						uni.showModal({
							title: '提示',
							content: '您还未登录，登录体验更多功能',
							cancelText: '先逛逛',
							confirmText: '去登录',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/login/login?uSerType=' + that.globalUserType
									});
								} else if (res.cancel) {}
							}
						});
					}, 800)
					uni.hideLoading();
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
							try {
								uni.setStorageSync('localUserInfo');
								uni.setStorageSync('localUserInfo', res.data.data);
								uni.setStorageSync('token', res.data.data.token)
							} catch (e) {}
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

						} else {
							uni.showToast({
								title: "登录失败，请检查！",
								icon: 'none'
							})
						}
					}
				});
			},
			// 清空搜索栏
			result(val) {
				var that = this;
				const a = val.jobType;
				const b = val.salary;
				const c = val.sort;
				uni.showLoading({
					title: '筛选中,请稍等'
				})
				if (val.sort == '') {
					that.sortList2(b, that.homeTaskList)
				}
				if (val.jobType.length) {

				}
				setTimeout(() => {
					that.sortList(a, b, c);
					uni.hideLoading();
				}, 700)
			},
			sortList2(con2) {
				var that = this;
				var tempSortList = []
				switch (con2) {
					case 10:
						that.originData.forEach((item, index) => {
							if (parseInt(item.price) > 0 && parseInt(item.price) <= 10) {
								tempSortList.push(item);
							}
						})
						that.homeTaskList = tempSortList;
						break;
					case 20:
						that.originData.forEach((item, index) => {
							if (parseInt(item.price) > 10 && parseInt(item.price) <= 20) {
								tempSortList.push(item);
							}
						})
						that.homeTaskList = tempSortList;
						break;
					case 30:
						that.originData.forEach((item, index) => {
							if (parseInt(item.price) > 20 && parseInt(item.price) <= 30) {
								tempSortList.push(item);
							}
						})
						that.homeTaskList = tempSortList;
						break;
					case 31:
						that.originData.forEach((item, index) => {
							if (parseInt(item.price) > 30) {
								tempSortList.push(item);
							}
						})
						that.homeTaskList = tempSortList;
						break;
					case '':
						that.homeTaskList = that.originData;
						break;
					default:
						break;
				}
			},
			sortList(con1, con2, con3) {
				var that = this;
				switch (con3) {
					case 'location':
						var tempSortList = []
						that.originData.forEach((item, index) => {
							tempSortList.push(item);
						})
						for (var i = 0; i < that.homeTaskList.length; i++) {
							var t = null;
							for (var k = 0; k < that.homeTaskList.length - i - 1; k++) {
								if (tempSortList[k].distance > tempSortList[k + 1].distance) {
									t = tempSortList[k + 1];
									tempSortList[k + 1] = tempSortList[k];
									tempSortList[k] = t;
								}
							}
						}
						if (con2) {
							that.sortList2(con2);
						} else {
							that.homeTaskList = tempSortList;
						}
						break;
					case 'wages_up':
						var tempSortList = []
						that.originData.forEach((item, index) => {
							tempSortList.push(item);
						})
						for (var i = 0; i < that.homeTaskList.length; i++) {
							var t = null;
							for (var k = 0; k < that.homeTaskList.length - i - 1; k++) {
								if (tempSortList[k].price > tempSortList[k + 1].price) {
									t = tempSortList[k + 1];
									tempSortList[k + 1] = tempSortList[k];
									tempSortList[k] = t;
								}
							}
						}
						if (con2) {
							that.sortList2(con2);
						} else {
							that.homeTaskList = tempSortList;
						}
						break;
					case 'add_time':
						var tempSortList = []
						that.originData.forEach((item, index) => {
							tempSortList.push(item);
						})
						for (var i = 0; i < that.homeTaskList.length; i++) {
							var t = null;
							for (var k = 0; k < that.homeTaskList.length - i - 1; k++) {
								if (tempSortList[k].createtime > tempSortList[k + 1].createtime) {
									t = tempSortList[k + 1];
									tempSortList[k + 1] = tempSortList[k];
									tempSortList[k] = t;
								}
							}
						}
						if (con2) {
							that.sortList2(con2);
						} else {
							that.homeTaskList = tempSortList;
						}
						break;
					default:
						break;
				}
			},
			// 获取标签列表
			getLabelList() {
				var that = this;
				uni.request({
					url: that.global_baseUrl + '/index.php/label',
					method: "POST",
					success: (res) => {
						if (res.data.code == '200') {
							var tempList = [];
							res.data.data.forEach((item, index) => {
								var tempObj = {}
								tempObj.title = item.name;
								tempObj.value = item.name
								tempList.push(tempObj)
							})
							// that.menuList[0].detailList.contact(tempList);
							var tempObj2 = {
								'title': '不限',
								'value': ''
							}
							that.menuList[0].detailList = tempList;
							that.menuList[0].detailList.splice(0, 0, tempObj2);
						}
					}
				});
			},
			// 发布任务
			pushNew() {
				uni.navigateTo({
					url: '/pages/public/pushTask/pushTask'
				})
			},
			initData() {
				uni.showLoading({
					title: '数据初始化中'
				})
				var that = this;
				that.curUserInfo = that.GlobalUserInfo;
				that.curWxUserInfo=that.setglobalWXuserInfo;
				that.userGetBanner();
				that.getLabelList();
				setTimeout(() => {
					that.getLocationAO();
					that.userGetTaskList();
				}, 500)
				qqmapsdk = new QQMapWX({
					key: 'MJMBZ-5XNKF-YQIJY-JBJ5T-HWOZ5-MSBVR'
				});
				setTimeout(() => {
					uni.hideLoading();
				}, 700)
			},
			// userGetBanner获取轮播图
			userGetBanner() {
				var that = this;
				var tempData = {
					type: 0 //0首页  1学生服务
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
							that.homeBannerList = res.data.data;
						}
					}
				});
			},
			// 获取经纬度
			getLocationAO() {
				var that = this;
				that.LJlatitude = that.LJlocation.latitude;
				that.LJlongitude = that.LJlocation.longitude;
			},
			// userGetTaskList获取任务列表 
			userGetTaskList(type) {
				var that = this;
				that.more = 'loading';
				var tempData = {
					type: 0, //0首页  1学生服务
					id: that.curUserInfo.id,
					list: that.homeTaskList.length
				}
				if (that.globalUserType == 1) {
					tempData.id = null;
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
										item.userGroup = [];
										item.distance = that.distance(item.latitude, item.longitude, that.LJlatitude, that.LJlongitude);
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
										item.userGroup = [];
										item.distance = that.distance(item.latitude, item.longitude, that.LJlatitude, that.LJlongitude);
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
						that.originData = that.homeTaskList;
					}
				});
			},
			onPullDown(done) { // 下拉刷新
				var that = this;
				that.homeTaskList = [];
				setTimeout(() => {
					that.userGetTaskList();
					done();
				}, 700)

			},
			onScroll(e) { // 监听滚动
			},
			onReachBottom() {
				var that = this;
				that.userGetTaskList('more');
			},
			onLoadMore(e) { // 加载更多
				var that = this;
				that.times++;
			},
			scrollTo() {
				this.$refs.scroll.goTop();
			},
			//地理信息计算
			// 两点间距离
			// lo经度
			// la纬度
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
		}
	}
</script>

<style lang="less">
	.lj_margin-top{
		margin-top: -30upx;
	}
	.boxShadow {
		z-index: 999;
		position: sticky;
		top: 314rpx;
		box-shadow: 0 8rpx 6rpx rgba(0, 0, 0, 0.1);
		// margin-top: -24px;
	}

	.homeTopSticky {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.content {
		text-align: center;
		height: 100%;
	}

	.content .block {
		height: 200px;
		line-height: 200px;
		text-align: center;
		margin: 10px;
		background-color: aquamarine;
	}

	.content .loadingText {
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		color: #999;
	}

	#preloader_1 {
		height: 40px;
		line-height: 40px;
		position: relative;
		text-align: center;
	}

	#preloader_1 span {
		width: 5px;
		height: 5px;
		margin: 0 1px;
		display: inline-block;
		vertical-align: middle;
		background: #9b59b6;
		animation: preloader_1 1.5s infinite ease-in-out;
	}

	#preloader_1 span:nth-child(2) {
		animation-delay: .2s;
	}

	#preloader_1 span:nth-child(3) {
		animation-delay: .4s;
	}

	#preloader_1 span:nth-child(4) {
		animation-delay: .6s;
	}

	#preloader_1 span:nth-child(5) {
		animation-delay: .8s;
	}

	@keyframes preloader_1 {
		0% {
			height: 5px;
			background: #9b59b6;
		}

		25% {
			height: 30px;
			background: #3498db;
		}

		50% {
			height: 5px;
			background: #9b59b6;
		}

		100% {
			height: 5px;
			background: #9b59b6;
		}
	}
</style>
