<template>
	<view>
		
		<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in bannerList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.image" mode="aspectFill" ></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			bannerList: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				cardCur: 0,
			};
		},
		created() {},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			testData(){
			}
		}
	}
</script>

<style lang="scss">

</style>
