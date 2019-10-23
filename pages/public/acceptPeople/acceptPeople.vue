<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">人员列表</block>
		</cu-custom>
		<acceptGroups :dataList='userGroups'> </acceptGroups>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import acceptGroups from "@/components/acceptGroups.vue"
	export default {
		components: {
			acceptGroups,
		},
		data() {
			return {
				userGroups: []
			};
		},
		onLoad(options) {
			var that = this;
			if (options) {
				that.userGroups = JSON.parse(options.data);
			}
		},
		methods: {
			initData() {
				var that = this;
			},
			
		}
	}
</script>

<style lang="less">

</style>
