<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#9b261d"
            text-color="#fff" active-text-color="#9b261d" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'icon-guanli',
                        index: 'myindex',
                        title: '工作台'
                    },
                    {
                        icon: 'icon-building_',
                        index: 'mytable',
                        title: '房源管理'
                    },
                    {
                        icon: 'icon-renqun',
                        index: 'customer',
                        title: '客源管理'
                    },
                    {
                        icon: 'icon-guanlizhongxin',
                        index: '404',
                        title: '管理中心',
                        // subs: [
                        //     {
                        //         index: 'form',
                        //         title: '基本表单'
                        //     },
                        //     {
                        //         index: 'editor',
                        //         title: '富文本编辑器'
                        //     },
                        //     {
                        //         index: 'markdown',
                        //         title: 'markdown编辑器'
                        //     },
                        //     {
                        //         index: 'upload',
                        //         title: '文件上传'
                        //     }
                        // ]
                    },
                    {
                        icon: 'icon-zidian',
                        index: 'wordbook',
                        title: '楼盘字典'
                    },
                    // draglist
                    // {
                    //     icon: 'el-icon-rank',
                    //     index: 'drag',
                    //     title: '拖拽列表'
                    // },
                    // {
                    //     icon: 'el-icon-warning',
                    //     index: 'permission',
                    //     title: '权限测试'
                    // },
                    // {
                    //     icon: 'el-icon-error',
                    //     index: '404',
                    //     title: '404页面'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    };
</script>

<style scoped>
    .el-menu-item [class^=el-icon-],.el-submenu [class^=el-icon-]{
        margin-right: 20px;
    }
    .el-submenu .el-menu-item{
        min-width: 180px;
    }
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 180px;
    }
    .sidebar > ul {
        height:100%;
    }
    element.style{
        padding-left: 20px;
        color: rgb(90, 87, 87);
        background-color: rgb(228, 229, 230);
    }
    .el-menu-item.is-active {
       background-color: #fff !important;
    }
    .iconfont{
        font-size: 20px;
        margin-right: 5px;
    }
</style>
