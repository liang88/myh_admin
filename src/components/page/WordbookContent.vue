<template>
    <div class="wordbookcontent">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 楼盘字典</el-breadcrumb-item>
                <el-breadcrumb-item>小区详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!-- 第一s块 -->
        <div class="titleMall">
            <el-row :gutter="0">
                <el-col :span="22">
                    <p style="line-height: 32px;" ><span style="color: #999;" >地址：</span>承德市围场满族蒙古族自治县御道口 </p>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" style="float:right;" >收藏</el-button>
                </el-col>
            </el-row>
        </div>
<!-- 第二块 -->
        <div class="navs">
            <div style="font-size: 20px;color: #e54648; padding: 10px 0" >
                房源信息
            </div>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>小&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span> 新通致</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>容&nbsp;积&nbsp;率:</span> 2017.8.8</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>物业地址:</span> 2012</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>物业公司:</span> 410万</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>绿&nbsp;化&nbsp;率:</span> 2017.9.8</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>开&nbsp;&nbsp;发&nbsp;商:</span> 朝南</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>建筑年代:</span> 300万</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>总&nbsp;楼&nbsp;层:</span> 3室1厅1卫1厨1阳</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>建筑类型:</span> 300万</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>总&nbsp;户&nbsp;数:</span> 3室1厅1卫1厨1阳</p>
                </el-col>
            </el-row>
        </div>
<!-- 第三块 -->
        <div class="comment">
            <div style="font-size: 20px;color: #e54648; padding: 10px 0" >
                小区描述
            </div>
            <div class="comment-text">
      小区内部环境典雅幽静，绿化多，通过小区道路的合理休闲设施的精心安排，提供自然、舒适的居住环境。周边配套齐全，设施完备，物业管理完善，保安24小时值班，住户素质高。社区主流健康向上，社区风气良好，邻里关系和谐。基础设施健全，周围商圈多，购物，就医，娱乐等方便快捷。为一个集生态环境、人文环境、信息化和管理控制自动化等优质服务为一体的高档个性化住宅小区。环境优美，丽水成天的风景给予了回归家庭、回归私域的生活体验。房屋楼层分布均匀，室内装修豪华气派，视眼非常宽广，采光较好。坐北朝南，整体体现现代简..
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wordbookcontent',
        data() {
            return {

            }
        },
        mounted () {
            
        },
        created() {

        },
        computed: {

        },
        methods: {
 
        }
    };

</script>

<style>
    .crumbs{
        padding: 0;
    }
    .wordbookcontent .titleMall{
        padding: 10px 10px;
        background: #fff;
        margin-bottom: 10px;
    }
    .wordbookcontent .navs{
        padding: 20px 10px;
        background: #fff;
        margin-bottom: 10px;
    }
    .wordbookcontent .navs .el-row{
        padding: 5px 0;
    }
    .wordbookcontent .navs .el-collapse-item__header{
        font-size: 18px;
        color: #e54648;
    }
    .wordbookcontent .myMap{
        width: 100%;
        height: 300px;
        padding: 0 0;
        background: #fff;
        margin-bottom: 10px;
    }
    .wordbookcontent .myMap #allmap{
        height: 300px;
    }
    .wordbookcontent .comment{
        padding: 0 10px;
        background: #fff;
    }
    .wordbookcontent .comment .comment-text{
        text-align: justify;
        text-indent: 2em;
        padding-bottom: 20px;
    }
    .wordbookcontent .comment .comment-text .comment-head{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #eee;
        overflow: hidden;
        margin: 0 auto;
    }
    .wordbookcontent .comment .comment-text .comment-head img{
        width: 100%;
    }
    .wordbookcontent .comment .comment-text .el-button{
        padding: 18px 25px;
    }
    .wordbookcontent .comment .comment-text-show{
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    .wordbookcontent .comment .comment-text-show .comment-head{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #eee;
        overflow: hidden;
        margin: 0 auto;
    }
    .wordbookcontent .comment .comment-text-show .comment-head img{
        width: 100%;
    }
    .wordbookcontent .comment .comment-text-show .comment-name{
        font-size: 14px;
        color: #999;
        padding-bottom: 5px;
    }
    .wordbookcontent .comment .comment-text-show .comment-name span{
        float: right;
    }
    .HC-title{
        font-size: 18px;
        color: #000;
    }
    .HC-title span{
        color: #666;
    }
</style>
