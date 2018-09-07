<template>
    <div class="wordbook">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 楼盘字典</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="wordB">
            <p class="word-shi" >城市: 
                <template>
                  <el-select v-model="value" placeholder="请选择城市">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
            </p>
            <p class="word-qu" >区域: <span>北京</span><span>北京</span><span>北京</span><span>北京</span><span>北京</span></p>
            <el-row :gutter="10" class="word-search" >
                <el-col :span="6">
                    <el-input placeholder="请输入关键词"></el-input>
                </el-col>
                <el-col :span="14">
                    <el-button type="info">搜索</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" style="float:right;" @click="appendSHow" >新增小区</el-button>
                </el-col>
            </el-row>
            <template>
                <el-table
                border
                :data="tableData"
                :stripe="true"
                style="width: 100%; text-align:center; ">
                    <el-table-column type="index" :index="1"></el-table-column>
                    <el-table-column prop="date" label="小区名称" width="300"></el-table-column>
                    <el-table-column prop="name" label="所属区域" width="300"></el-table-column>
                    <el-table-column prop="address" label="物业公司" width="300"></el-table-column>
                    <el-table-column prop="address" label="建筑年代"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <router-link tag="div" to="wordbookcontent" style="cursor: pointer;" >
                                查看
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <div class="block" style="margin-top: 20px;" >
                <el-pagination
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
            </div>
            <div class="append-house" v-show="appendHouse" >
                <div class="append-information">
                    <div class="infor-title">
                        新增小区
                    </div>
    <!-- 客户信息 -->
                    <div class="infor-title-one">
                        小区资料
                    </div>
                    <el-row :gutter="5" style="padding: 20px 0;" >
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>小区名称:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input placeholder="小区名称"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>首字母:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="input" placeholder="小区拼音首字母"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" style="padding: 20px 0;" >
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>所属区域:</p>
                        </el-col>
                        <el-col :span="3">
                            <template>
                              <el-select v-model="value" placeholder="选择省">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </template>
                        </el-col>
                        <el-col :span="3">
                            <template>
                              <el-select v-model="value" placeholder="选择市">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </template>
                        </el-col>
                        <el-col :span="4">
                            <template>
                              <el-select v-model="value" placeholder="选择区">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </template>
                        </el-col>
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>物业地址:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input placeholder="物业地址"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" style="padding: 20px 0;" >
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>选择类型:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input placeholder="选择类型"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>建造年代:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="input" placeholder="建造年代"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" style="padding: 20px 0;" >
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>总户数:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input placeholder="总户数"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>物业公司:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="input" placeholder="物业公司"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" style="padding: 20px 0;" >
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>容积率:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input placeholder="容积率"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>绿化率:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="input" placeholder="绿化率"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" style="padding: 20px 0;" >
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>总层数:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input placeholder="总层数"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>开发商:</p>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="input" placeholder="开发商"></el-input>
                        </el-col>
                    </el-row>
    <!-- 小区描述 -->
                    <div class="infor-title-two">
                        小区描述
                    </div>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 10}"
                      placeholder="请输入内容"
                      v-model="textarea3" style="padding: 20px 0;" >
                    </el-input>
    <!-- 发布/取消 -->
                    <el-row :gutter="5" style="padding: 10px 0;" >
                        <el-col :span="6">
                            &nbsp;
                        </el-col>
                        <el-col :span="6">
                            <el-button type="danger" :plain="true" @click="clearSHowYes" style="display: block; margin: 0 auto; padding: 10px 35px; " >发布</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="info" :plain="true" @click="clearSHowNo" style="display: block; margin: 0 auto; padding: 10px 35px; " >取消</el-button>
                        </el-col>
                        <el-col :span="6">
                            &nbsp;
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'wordbook',
        data() {
            return {
                appendHouse: false,
                textarea3: '',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海'
                }],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        created() {

        },
        computed: {

        },
        methods: {
            appendSHow () {
                this.appendHouse = true;
            },
            clearSHowYes () {
                this.appendHouse = false;
                this.$message({
                    message: '发布成功',
                    type: 'success',
                });
            },
            clearSHowNo () {
                this.appendHouse = false;
                this.$message({
                    message: '取消发布',
                    type: 'warning'
                });
            },
        }
    };

</script>

<style>
    .wordB{
        padding: 20px 10px;
        background: #fff;
        font-size: 14px;
    }
    .wordB .word-shi{
        margin-bottom: 30px;
        color: #666;
    }
    .wordB .word-shi .el-input__inner{
        border: none;
        padding: 0;
    }
    .wordB .word-shi .el-input__inner::-webkit-input-placeholder{
        color: #666;
    }
    .wordB .word-shi .el-input__suffix{
        left: 0;
    }
    .wordB .word-qu{
        margin-bottom: 30px;
        color: #666;
    }
    .wordB .word-search{
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #eee;
    }
    .wordB .word-qu span{
        margin-right: 10px;
    }
    .cell{
        text-align: center;

    }
/*append-house 添加房源 */
    .append-house{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        z-index: 99;
        overflow: auto;
    }
    .append-house .append-information{
        position: relative;
        width: 80%;
        margin: 70px auto 0;
        padding: 20px;
        background: #fff;
    }
    .append-house .append-information .infor-title{
        padding-bottom: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-size: 16px;
    }
    .append-house .append-information .infor-title-one{
        color: #e24445;
        font-size: 14px;
        padding: 5px 10px;
        background: #f3f1f2;
    }
    .append-house .append-information .infor-title-two{
        color: #e24445;
        font-size: 14px;
        padding: 5px 10px;
        background: #f3f1f2;
    }
</style>
