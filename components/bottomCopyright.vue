<template>
	<view class="margin-lr-sm  margin-bottom-sm" :class="curBgCoulour">
		<view class="padding-tb-xl text-center text-sm "><text>Copyright ©2019 武汉量玄网络科技</text></view>
	</view>
</template>

<script>
	export default {
		name: 'bottomCopyright',
		data() {
			return {
				curBgCoulour: this.bgColour
			};
		},
		props: {
			bgColour: {
				type: String,
				default: 'text-gray'
			}
		},
	}
</script>

<style lang="less">

</style>
