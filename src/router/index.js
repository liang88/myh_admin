import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/myindex'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/myindex',
                    component: resolve => require(['../components/page/Myindex.vue'], resolve),
                    meta: { title: '工作台' }
                },
                {
                    path: '/mytable',
                    component: resolve => require(['../components/page/Mytable.vue'], resolve),
                    meta: { title: '房源管理' }
                },
                {
                    path: '/contents/:id',
                    component: resolve => require(['../components/page/HouseContent.vue'], resolve),
                    meta: { title: '房源详情' }
                },
                {
                    path: '/customer',
                    component: resolve => require(['../components/page/Customer.vue'], resolve),
                    meta: { title: '客源管理' }
                },
                {
                    path: '/customercontent/:id',
                    component: resolve => require(['../components/page/CustomerContent.vue'], resolve),
                    meta: { title: '客源详情' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '管理中心' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/wordbook',
                    component: resolve => require(['../components/page/Wordbook.vue'], resolve),
                    meta: { title: '楼盘字典' }
                },
                {
                    // vue-schart组件
                    path: '/wordbookcontent',
                    component: resolve => require(['../components/page/WordbookContent.vue'], resolve),
                    meta: { title: '小区详情' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
