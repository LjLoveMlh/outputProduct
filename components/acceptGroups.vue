<template>
	<view class="cu-list menu-avatar">
		<view class="padding-tb-sm padding-lr flex" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in dataList"
		 :key="index" @tap.stop="navUserInfo(item)">
			<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ item.shouimage +')'}]">
				<view class="cu-tag badge" :class="item.sex==0?'cuIcon-female bg-blue':'cuIcon-male  bg-pink'"></view>
			</view>
			<view class="ljcontent margin-left">
				<view class="text-black">{{item.name}}</view>
				<view class="text-gray text-sm ">
					<text class="cuIcon-phone text-blue "></text> {{item.phone}}
				</view>
			</view>
			<!-- 	<view class="action align-start">
					<view class="text-grey text-xs">22:20</view>
					<view class="cu-tag round bg-grey sm">5</view>
				</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'acceptGroups',
		data() {
			return {
				modalName: null,
			};
		},
		props: {
			dataList: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			// 跳转用户详情
			navUserInfo(data) {
				var that = this;
				if (data.myUser) {
					uni.navigateTo({
						url: '/pages/public/userInfo/userInfo?data=' + JSON.stringify(data)
					})
				} else {
					uni.showToast({
						title: '您无权查看！',
						icon:'none'
					})
				}
			},
		}
	}
</script>

<style lang="less">
	.ljcontent {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
