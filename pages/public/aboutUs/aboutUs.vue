<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="padding-sm margin-bottom">
			<u-parse :content="content" :imageProp='imageProp' @preview="preview" @navigate="navigate"></u-parse>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/uParse/src/wxParse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				imageProp: {
					mode: 'aspectFit',
					padding: 0,
					lazyLoad: true,
					domain: "liangxuan.natapp1.cc"
				},
				title: null,
				content: null,
				allData: null,
			};
		},
		onLoad(options) {
			var that = this;
			uni.request({
				url: that.global_baseUrl + '/index.php/article',
				method: "POST",
				success: (res) => {
					if (res.data.code == '200') {
						that.allData = res.data.data;
						if (options) {
							that.title = options.title;
							switch (that.title) {
								case '用户协议':
									that.content = that.allData[0].content;
									break;
								case '常见问题':
									that.content = that.allData[1].content;
									break;
								case '关于我们':
									that.content = that.allData[2].content;
									break;
								default:
									break;
							}
						}
					} else {
						// 请求失败
					}
				}
			});



		},

	}
</script>

<style lang="less">

</style>
