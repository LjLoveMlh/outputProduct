<script>
	import Vue from 'vue'
	export default {
		onLaunch: function(res) {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
			// 获取经纬度
			uni.getLocation({
				type: 'wgs84', //返回可以用于uni.openLocation的经纬度
				success: function(res) {
					Vue.prototype.LJlocation = res;
				}
			})
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
