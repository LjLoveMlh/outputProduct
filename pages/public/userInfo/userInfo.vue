<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">信息详情</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top-sm">
			<view class="action">
				<text class="cuIcon-titles text-blue"></text>个人信息
			</view>
			<view class="action" v-if="curUserType!=1">
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ user_info.shouimage +')'}]">
					<view class="cu-tag badge" :class="user_info.sex==0?'cuIcon-female bg-blue':'cuIcon-male  bg-pink'"></view>
				</view>
			</view>
			<view class="action" v-else>
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ wxUserInfo.avatarUrl +')'}]">
					<view class="cu-tag badge" :class="user_info.sex==0?'cuIcon-female bg-blue':'cuIcon-male  bg-pink'"></view>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<view class="cu-item flex">
				<view class="text">姓名</view>
				<view>{{user_info.name}}</view>
			</view>
			<view class="cu-item flex" v-if="curUserType!=1">
				<view class="text">性别</view>
				<view>{{user_info.sex==0?'男':'女'}}</view>
			</view>
			<view class="cu-item flex">
				<view class="text">手机号</view>
				<view>{{user_info.phone}}</view>
			</view>
			<view class="cu-item flex" v-if="curUserType==1">
				<view class="text">地址</view>
				<view>{{user_info.address}}</view>
			</view>
			<view class="cu-item flex" v-if="curUserType!=1">
				<view class="text">学校</view>
				<view>{{user_info.school}}</view>
			</view>
			<view class="cu-item flex" v-if="curUserType!=1">
				<view class="text">年级</view>
				<view>{{user_info.grade}}</view>
			</view>
			<view class="cu-item flex" v-if="curUserType!=1">
				<view class="text">学号</view>
				<view>{{user_info.stuId}}</view>
			</view>
		</view>
		<button class="margin-lr margin-tb-xl cu-btn block line-red lg" @tap="logOut" v-if="user_info.id==globalInfo.id">退出登录</button>
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
				user_info: {},
				globalInfo: {},
				curUserType: 0,
				wxUserInfo:null
			};
		},
		computed: {
			...mapState(['GlobalUserInfo', 'globalWXuserInfo', 'globalUserType'])
		},
		methods: {
			logOut() {
				uni.showModal({
				    title: '提示',
				    content: '确定要退出登录吗',
				    success: function (res) {
				        if (res.confirm) {
							uni.redirectTo({
								url:'/pages/login/login'
							})
				        } 
				    }
				});
			}
		},
		onLoad(options) {
			if (options.data) {
				this.user_info = JSON.parse(options.data);
			} else {
				this.curUserType = this.globalUserType;
				this.user_info = this.GlobalUserInfo;
			}
			this.globalInfo = this.GlobalUserInfo;
			this.wxUserInfo=this.globalWXuserInfo;
		}
	}
</script>
<style lang="scss">
</style>
