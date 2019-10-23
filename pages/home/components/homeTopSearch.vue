<template>
	<view>
		<view class="item-top bg-gradual-blue">
			<view class="top-name">
				枫语里
			</view>
			<view class="cu-bar search ">
				<view class="cu-avatar  ljimgHelp">
					<open-data type="userAvatarUrl"></open-data>
					<!-- <image :src="dataList.avatarUrl" mode="aspectFill"></image> -->
				</view>
				<view class="search-form round">
					<text class="cuIcon-search margin-left"></text>
					<input @tap="navSearchPage" disabled="true" :adjust-position="false" type="text" placeholder="搜索任务关键字"
					 confirm-type="search"></input>
				</view>
				<view class="action">
						<picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker">
								{{picker[index]}}
							</view>
						</picker>
					<text class="cuIcon-triangledownfill"></text>
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
	export default {
		data() {
			return {
				index: 0,
				picker: ['武汉市'],
			};
		},
		name: "homeTopSearch",
		props: {
			dataList: {
				type: Object,
				default: () => {}
			},
		},
		computed: {
			...mapState(['globalWXuserInfo'])

		},
		
		onReady() {
		
		},
		methods: {
			navSearchPage() {
				uni.showToast({
					title:'暂未开发该模块'
				})
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style lang="less">
	.ljimgHelp {
		width: 96rpx;
		height: 96rpx;
		border: 1px solid #FFFFFF;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.item-top {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 1;
		width: 100%;
		height: 280rpx;
	}
	.top-name {
		font-size: 50rpx;
		font-weight: bolder;
		text-align: center;
		padding: 100rpx 0 0 0;
	}
</style>
