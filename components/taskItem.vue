<template>
	<view>
		<view class="workItem bg-white   margin-sm shadow shadow-lg" v-for="(i,index) in dataList" :key='index' @tap="opendetailWork(i)">
			<view class="workItem-top">
				<view class="workItem-topLeft">
					<view class="workItem-topName">
						{{i.name}}
					</view>
					<view class="workItem-center">
						<view class="cuIcon-locationfill workItem-icon" v-if="curScene!='service'">
						</view>
						<view class="workItem-place text-cut" style="width:60%;" v-if="curScene!='service'">
							{{i.address}}
						</view>
						<view class="workItem-distance" v-if="curScene!='service'">
							{{i.distance}}km
						</view>
						<view class="cuIcon-friendfill workItem-icon">
						</view>
						<view class="workItem-company">
							{{i.fabu_name}}
						</view>

					</view>
				</view>
				<view class="workItem-topRight">
					<view class="workItem-price">
						{{i.price}}
					</view>
					<view class="workItem-unit">
						元/时
					</view>
				</view>
			</view>
			<view class="workItem-bottom">
				<view class="workItem-bottomLeft">
					<block v-for="(item,index) in i.label" :key='index' v-if="curScene!='service'">
						<view class="workItem-tags1">
							{{item.name}}
						</view>
					</block>
				</view>
				<view class="workItem-timeAgo">
					{{utils.friendlyDate(i.createtime)}}
				</view>
			</view>

			<view class="padding-bottom-xs padding-lr-sm flex align-center justify-between">
				<view class="text-grey text-sm ">{{ curScene!='service'?'工作时间：':'截止时间'}}</view>
				<view class="flex  justify-between">
					<view class="text-sm text-grey margin-right"  v-if="curScene!='service'">
						{{ utils.timeTodate('Y-m-d H:i:s index', i.statime) }}
					</view>
					<view class=" text-sm text-grey">
						{{ utils.timeTodate('Y-m-d H:i:s index', i.endtime) }}
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import utils from '@/components/utils.filter.js';
	export default {
		name: "taskItem",
		props: {
			dataList: {
				type: Array,
				default: () => []
			},
			scene: {
				type: String,
				default: 'task'
			},
			shopSelf: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				utils: utils,
				curScene: this.scene,
				curShopSelf: this.shopSelf
			};
		},
		computed: {
			...mapState(['globalOpenid', 'GlobalUserInfo', 'token', 'globalWXuserInfo', 'globalUserType'])
		},
		methods: {
			opendetailWork(e) {
				var that=this;
				if(that.GlobalUserInfo.id){
					uni.setStorageSync('taskDetail', e);
					uni.navigateTo({
						url: '/pages/home/taksDetail/taksDetail?scene=' + this.curScene
					});
				}else{
					uni.showModal({
					    title: '提示',
					    content: '您还未登录，请登录查看',
					    success: function (res) {
					        if (res.confirm) {
					          uni.navigateTo({
					          	url: '/pages/login/login'
					          });
					        } else if (res.cancel) {
					        }
					    }
					});
				}
				
			}
		}
	}
</script>

<style lang="less">
	.workItem {
		/* width: 100%; */
		// height: 210rpx;
		border-bottom: 1px solid #dcdcdc;
		border-radius: 8rpx;
	}

	.workItem-topName {
		font-size: 30rpx;
		font-weight: bold;
		color: black;
		width: 95%;
		height: 40rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.workItem-top {
		/* width: 60%; */
		margin: 0rpx 25rpx 0 25rpx;
		padding: 20rpx 0 0 0;
		display: flex;
	}

	.workItem-topLeft {
		width: 70%;
		flex: 1;
	}

	.workItem-center {
		display: flex;
		margin-top: 15rpx;
		height: 25rpx;
		white-space: nowrap;
		overflow: hidden;
	}

	.workItem-icon {
		font-size: 20rpx;
		line-height: 25rpx;
		color: #999999;
		margin-right: 5rpx;
	}

	.workItem-place {
		font-size: 25rpx;
		line-height: 25rpx;
		color: #808080;
	}

	.workItem-distance {
		font-size: 25rpx;
		line-height: 25rpx;
		margin-left: 10rpx;
		margin-right: 30rpx;
		color: #808080;
	}

	.workItem-company {
		font-size: 25rpx;
		line-height: 25rpx;
		margin-left: 5rpx;
		color: #808080;
	}

	.workItem-topRight {
		display: flex;
		height: 50rpx;
		margin-top: 10rpx;
	}

	.workItem-price {
		color: #ff6000;
		font-weight: bold;
		font-size: 40rpx;
		line-height: 45rpx;
		margin-right: 10rpx;
	}

	.workItem-unit {
		color: #ff6000;
		font-size: 35rpx;
		line-height: 50rpx;
	}

	.workItem-bottom {
		margin: 30rpx 25rpx 10rpx 25rpx;
		display: flex;
		justify-content: space-between;
	}

	.workItem-bottomLeft {
		width: 80%;
		height: 35rpx;
		white-space: nowrap;
		overflow: hidden;
		display: flex;
	}

	.workItem-tags1 {
		width: fit-content;
		height: 26rpx;
		padding: 0rpx 6rpx;
		font-size: 15rpx;
		border: 1px solid orangered;
		border-radius: 5rpx;
		margin-right: 15rpx;
		color: orangered;
	}

	.workItem-tags {
		width: fit-content;
		height: 26rpx;
		padding: 0rpx 6rpx;
		font-size: 15rpx;
		border: 1px solid #C0C0C0;
		border-radius: 5rpx;
		margin-right: 15rpx;
	}

	.workItem-timeAgo {
		font-size: 25rpx;
		line-height: 20rpx;
	}
</style>
