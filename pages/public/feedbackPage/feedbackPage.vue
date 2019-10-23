<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="backText">返回</block>
			<!-- <block slot="content"></block> -->
		</cu-custom>

		<view class="solids-bottom padding-xs flex align-center">
			<view class="flex-sub text-center">
				<view class=" text-xsl padding">
					<text class=" cuIcon-roundcheckfill text-green"></text>
				</view>
				<view class=" text-xl padding">
					<text class="text-black text-bold">{{content}}</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top-sm">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>接下来您可以
			</view>
		</view>
		<view class="margin-lr-xl padding-lr-lg">
			<button class="cu-btn block bg-gradual-blue margin-tb margin-lr-xl lg" data-key='home' @tap="navWhere">返回首页</button>
			<button class="cu-btn block bg-gradual-blue margin-tb margin-lr-xl lg" data-key='my' @tap="navWhere">个人中心</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: null,
				isStuSignUp: false,
			}
		},
		onLoad(options) {
			var that = this;
			if (options) {
				that.content = options.content;
			}
		},
		methods: {
			navWhere(e) {
				e.currentTarget.dataset.key
				switch (e.currentTarget.dataset.key) {
					case 'home':
						uni.switchTab({
							url: '/pages/home/home'
						})
						break;
					case 'my':
						uni.switchTab({
							url: '/pages/myBusiness/myBusiness'
						})
						break;
					default:
						break;
				}
			}

		}
	}
</script>

<style lang='scss'>

</style>
