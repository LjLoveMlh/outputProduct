<template>
	<view>
		<swiper class="card-swiper" :indicator-dots="false" :circular="true" :autoplay="true" interval="5000" duration="500"
		 indicator-color="#8799a3" indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in dataList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				picker: ['洪山区'],
			};
		},
		name: "homeTopSearch",
		props: {
			dataList: {
				type: Array,
				default: () => []
			}
		},
		created() {

		},

	}
</script>

<style lang="less">
	.item-top {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 1;
		width: 100%;
		height: 280rpx;
		background: -webkit-linear-gradient(left, #0081ff, #1cbbb4);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #0081ff, #1cbbb4);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #0081ff, #1cbbb4);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #0081ff, #1cbbb4);
	}

	.top-name {
		font-size: 50rpx;
		font-weight: bolder;
		text-align: center;
		padding: 100rpx 0 0 0;
	}

	.top-search {
		margin: 10rpx 0;
	}
</style>
