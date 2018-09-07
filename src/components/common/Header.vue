<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <img src="static/img/logo.png" alt="">
        </div>
        <div class="logo">满易何</div>
        <div class="logotwo">北京满易何网络科技有限公司 | {{username}}</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="`签到`" placement="bottom">
                        <router-link to="/">
                            <i style="color: #fff;" class="el-icon-location-outline"></i>
                        </router-link>
                    </el-tooltip>
                    <!-- <span class="btn-bell-badge" v-if="message"></span> -->
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img :src="headimg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <a href="http://www.manyihefc.com" target="_blank">
                            <el-dropdown-item>公司官网</el-dropdown-item>
                        </a>
                      <!--   <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import {getCookie,delCookie} from '../../util/cookie'
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: '暂无姓名',
                head: 'static/img/logotwo.png',
                // message: 2
            }
        },
        computed:{
            username(){
                let username = unescape(getCookie('userName'))
                return username ? username : this.name;
            },
            headimg(){
                let headimg = unescape(getCookie('headImg'))
                return headimg ? headimg : this.head;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    this.$http.post(myHost+'myh_management/exitLogin').then((response) => {
                        var data = response.data
                        data = data.resultBean
                        var code = data.code
                        console.log(code)
                        if (code == '0') {
                            delCookie('JSESSIONID')
                            delCookie('clientType')
                            delCookie('isYN')
                            delCookie('userName')
                            delCookie('headImg')
                            this.$router.push('/login');
                            this.$message({
                                message: data.message,
                                type: 'success',
                            });
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message);
                        }
                    })

                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    };
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:116px;
        line-height: 70px;
    }
    .header .logotwo{
        float: left;
        width: 250px;
        line-height: 70px;
        font-size: 12px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .collapse-btn img{
        margin-top: 23px;
    }
</style>
