<template>
    <div>
        <!-- 今日/本周/本月 -->
        <el-row :gutter="20">
            <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="昨天" name="1">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index1.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#f85355;" >新增房源</p>
                                        <p>{{isView.houseYest}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index2.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#8389fb;">新增客源</p>
                                        <p>{{isView.userYest}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index3.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#39c17f;">新增跟进</p>
                                        <p>{{isView.bAndhFollYest}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index4.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#fb9833;">新增带看</p>
                                        <p>{{isView.lookAt}}</p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="本周" name="2">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index1.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#f85355;" >新增房源</p>
                                        <p>{{isView.houseWeek}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index2.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#8389fb;">新增客源</p>
                                        <p>{{isView.userWeek}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index3.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#39c17f;">新增跟进</p>
                                        <p>{{isView.bAndhFollWeek}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index4.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#fb9833;">新增带看</p>
                                        <p>{{isView.lookAt}}</p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="本月" name="3">
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index1.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#f85355;" >新增房源</p>
                                        <p>{{isView.houseMonth}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index2.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#8389fb;">新增客源</p>
                                        <p>{{isView.userMonth}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index3.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#39c17f;">新增跟进</p>
                                        <p>{{isView.bAndhFollMonth}}</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="grid-content bg-purple clear">
                                    <div class="icon-index"><img src="static/img/index4.png" alt=""></div>
                                    <div class="title-index">
                                        <p style="color:#fb9833;">新增带看</p>
                                        <p>{{isView.lookAt}}</p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <!-- 待办事项 -->
        <div class="daiban">
            <p>待办事项</p>
            <p>已经等你很久了</p>
        </div>
        <el-row :gutter="20">
            <el-col class="dbsx" :span="8">
                <div class="grid-content bg-purple daiban-two">
                    <p>房源跟进</p>
                    <p>{{isViewTwo.eHouseSchedule}}</p>
                </div>
            </el-col>
            <el-col class="dbsx" :span="8">
                <div class="grid-content bg-purple daiban-two">
                    <p>客源跟进</p>
                    <p>{{isViewTwo.userSchedule}}</p>
                </div>
            </el-col>
            <el-col class="dbsx" :span="8">
                <div class="grid-content bg-purple daiban-two">
                    <p>上传照片</p>
                    <p>{{isViewTwo.imgIsNull}}</p>
                </div>
            </el-col>
        </el-row>
        <!-- 销控列表 -->
        <div class="daiban">
            <p>销控列表</p>
            <p>更多新房期待与你邂逅</p>
        </div>
        <div class="xiaokong">
            <div class="xk-title">
                <el-collapse>
                    <el-collapse-item>
                        <template slot="title">
                            御道庄园销控表
                            <p class="gengduo">更多</p>
                        </template>
                        <el-row :gutter="10">
                            <el-col :span="6"><div class="grid-content bg-purple" v-text="12" >1</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple">2</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple">3</div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple">4</div></el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="xk-table">
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dashboard',
        data() {
            return {
                activeName: '1',
                isHouseAll: '1',
                isView: '',
                isViewTwo: '',
            }
        },
        mounted () {
            this.dataAll ()
            this.dataAllTwo ()
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.isHouseAll = tab.name
                this.dataAll ()
            },
            dataAll () {
                // console.log(this.isHouseAll)
                var datas = {
                    a: this.isHouseAll
                }
                this.$http.post(myHost+'myh_management/countNewByYWM',datas).then((response) => {
                    if (response.headers['code'] === '3') {
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        // console.log('1')
                        // console.log(response)
                        var data = response.data
                        data = data.resultBean
                        var code = data.code
                        // console.log(code)
                        if (code == '0') {  
                            data = data.object
                            this.isView = data
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            dataAllTwo () {
                this.$http.post(myHost+'myh_management/countBacklog').then((response) => {
                    if (response.headers['code'] === '3') {
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        // console.log(response)
                        var data = response.data
                        data = data.resultBean
                        var code = data.code
                        // console.log(code)
                        if (code == '0') {
                            data = data.object
                            this.isViewTwo = data
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
        },
        computed: {

        }
    };

</script>


<style>
    .el-tabs__active-bar{
        background: #9b261d;
    }
    .el-tabs__item.is-active{
        color: #9b261d;
    }
    .el-tabs__item:hover{
        color: #9b261d;
    }
    .el-tabs__nav{
        margin-left: 40%;
    }
    .el-tabs__item{
        font-size: 18px;
    }
    .el-tabs__item{
        height: 50px;
        line-height: 50px;
    }
    .el-tabs__header{
        background: #fff;
    }
    .el-bgcol{
        background: #fff;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #fff;
    }
    .bg-purple {
        background: #fff;
    }
    .bg-purple-light {
        background: #fff;
    }
    .grid-content {
        padding: 20px 20px;
    }
    .daiban-two{
        border-radius: 5px;
    }
    .dbsx:nth-child(1) .daiban-two{
        box-shadow: -5px 5px 15px #ff9898;
        background: -webkit-linear-gradient(left, #ff9898 , #ff6767); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #ff9898, #ff6767); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #ff9898, #ff6767); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #ff9898 , #ff6767); /* 标准的语法 */
    }
    .dbsx:nth-child(2) .daiban-two{
        box-shadow: -5px 5px 15px #fccf6c;
        background: -webkit-linear-gradient(left, #fccf6c , #ffcc33); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #fccf6c, #ffcc33); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #fccf6c, #ffcc33); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #fccf6c , #ffcc33); /* 标准的语法 */
    }
    .dbsx:nth-child(3) .daiban-two{
        box-shadow: -5px 5px 15px #88c8f5;
        background: -webkit-linear-gradient(left, #88c8f5 , #589fed); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #88c8f5, #589fed); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #88c8f5, #589fed); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #88c8f5 , #589fed); /* 标准的语法 */
    }
    .daiban-two p{
        text-align: center;
        color: #fff;
        font-size: 26px;
    }
    .daiban-two p:nth-child(2){
        text-align: center;
        color: #fff;
        font-size: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-tabs__header{
        margin-bottom: 10px;
    }
    .icon-index{
        float: left;
        margin-left: 20px;
    }
    .title-index{
        float: left;
    }
    .title-index p{
        padding: 1px 10px;
    }
    .title-index p:nth-child(1){
        font-size: 26px;
    }
    .title-index p:nth-child(2){
        font-size: 24px;
    }
    .daiban{
        width: 100%;
        margin-bottom: 10px;
    }
    .daiban p:nth-child(1){
        font-size: 24px;
        color: #9b261d;
    }
    .daiban p:nth-child(2){
        font-size: 14px;
        color: #999;
    }
    .el-row{
        margin-bottom: 10px;
    }
    .el-collapse-item__header{
        font-size: 22px;
        color: #000;
        padding-left: 5px;
        font-weight: 600;
    }
    .gengduo{
        font-size: 16px;
        color: #999;
        float: right;
    }
    .el-collapse-item__arrow{
        font-size: 16px;
        color: #999;
    }
</style>
