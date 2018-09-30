<template>
    <div class="customercontent">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 客源管理</el-breadcrumb-item>
                <el-breadcrumb-item>客源详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!-- 第一s块 -->
        <div class="titleMall">
            <el-row :gutter="0" style="padding-bottom: 10px;border-bottom: 1px solid #eee;" >
                <el-col :span="22">
                    <p style="line-height: 32px;" >{{viewData.buyTypeStr}} {{viewData.houseTypeStr}}  {{viewData.fromMeasure}}-{{viewData.toMeasure}}平米</p>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" style="float:right;" >收藏</el-button>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="12">
                    <p style="line-height: 32px;" >客户信息</p>
                </el-col>
                <el-col :span="12">
                    <p v-if="isYN=='0'" style="line-height: 32px; float: right; color: #999;cursor: pointer;" @click="hosueShowY" >编辑</p>
                    <p v-else style="line-height: 32px; float: right; color: #999;cursor: pointer;" @click="hosueShowY" ></p>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="24">
                    <i class="el-icon-phone-outline"  style="color: #cc3333;float: left; margin-top: 8px;margin-right: 5px;" ></i>
                    <p style="float: left;" >{{viewData.realName}}: <span style="line-height: 32px;color: #cc3333;">{{viewData.mobile}}</span></p>
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
                    <p class="HC-title" ><span>经&nbsp;&nbsp;纪&nbsp;人:</span> {{viewData.fromAgent}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>客源编号:</span> {{viewData.userCode}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置:</span> {{viewData.pca}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源:</span> {{viewData.comeFrom}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>面&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;积:</span> {{viewData.fromMeasure}}-{{viewData.toMeasure}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;途:</span> {{viewData.useTypeStr}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>级&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span> {{viewData.bLevel}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:</span> {{viewData.bedRoom}}</p>
                </el-col>
            </el-row>
        </div>
<!-- 第三块 -->
        <div class="comment">
            <div style="font-size: 20px;color: #e54648; padding: 10px 0" >
                客户跟进
                <el-button style="float: right;" @click="isShow" type="primary">添加跟进</el-button>
            </div>
            <div class="comment-text-show" v-for="view in viewList" >
                <el-row :gutter="20">
                    <el-col :span="2">
                        <div class="comment-head">
                            <img :src="view.imgUrl" alt="">
                        </div>
                    </el-col>
                    <el-col :span="22">
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <p class="comment-name" >{{view.name}}<span></span></p>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="22">
                                <p class="comment-con comment-con-list" >{{view.followText}} </p>
                            </el-col>
                            <el-col v-if="isYN=='0'" :span="1" style="padding: 0;cursor: pointer;text-align: center;" >
                                <p class="setFont">更改</p>
                            </el-col>
                            <el-col v-if="isYN=='0'" :span="1" style="padding: 0;cursor: pointer;text-align: center;" >
                                <p class="setFont">删除</p>
                            </el-col>
                            <el-col v-else :span="1" style="padding: 0;cursor: pointer;text-align: center;" >
                                <p class="setFont"></p>
                            </el-col>
                            <el-col v-else :span="1" style="padding: 0;cursor: pointer;text-align: center;" >
                                <p class="setFont"></p>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-top: 10px">
                            <el-col :span="2">
                                <p style="color: #9b261d;" >{{view.followType}} </p>
                            </el-col>
                            <el-col :span="20">
                                <p class="setFont">下次跟进时间: <span>{{view.remindTime}}</span></p>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div class="fenye" >
                <div class="block">
                    <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageSize"
                    :current-page.sync="diyige"
                    layout="prev, pager, next"
                    :total="viewAll">
                    </el-pagination>
                </div>
            </div>
            <transition name="el-zoom-in-center">
                <div class="append-house" v-show="appendFollow" >
                    <div class="append-information">
                        <div class="infor-title">
                            添加跟进
                        </div>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col style="text-align: center;" :span="3">
                                选择跟进方式 : 
                            </el-col>
                            <el-col :span="21">
                                <span class="classes" :class="{color:index == current}" @click="addClass(index)" v-for="(todo,index) in todos" >{{todo.text}}</span>
                            </el-col>
                        </el-row>
                        <el-form :model="ruleFormS" :rules="rulesS" ref="ruleFormS">
                            <el-row :gutter="5" style="padding: 10px 0;" >
                                <el-col style="text-align: center; margin-top: 5px;" :span="3">
                                    选择跟进时间 : 
                                </el-col>
                                <el-col :span="21">
                                    <el-form-item label="" prop="timeone">
                                        <el-date-picker v-model="ruleFormS.timeone" type="datetime" placeholder="选择跟进时间" default-time="12:00:00"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" style="padding: 10px 0;" >
                                <el-col style="text-align: center; margin-top: 5px;" :span="24">
                                    <el-form-item label="" prop="neirong">
                                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入跟进内容" v-model="ruleFormS.neirong">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="6">
                                &nbsp;
                            </el-col>
                            <el-col :span="6">
                                <el-button type="danger" :plain="true" @click="clearShowYesTwo('ruleFormS')" style="display: block; margin: 0 auto; padding: 10px 35px; " >发布</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="info" :plain="true" @click="clearShowNoTwo" style="display: block; margin: 0 auto; padding: 10px 35px; " >取消</el-button>
                            </el-col>
                            <el-col :span="6">
                                &nbsp;
                            </el-col>
                        </el-row>
                        </el-form>
                    </div>
                </div>
            </transition>
        </div>
<!-- 第三块 -->
        <transition name="el-zoom-in-center">
            <div class="append-house" v-show="appendHouse" >
                <div class="append-information">
                    <div class="infor-title">
                        客源修改
                    </div>
    <!-- 客户信息 -->
                    <div class="infor-title-one">
                        客户信息
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-row :gutter="5" style="padding: 20px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>姓名:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="name">
                                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>性别:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="ages">
                                    <el-select v-model="ruleForm.ages" @focus="selectAgeTwo" @change="selectAge" placeholder="男/女">
                                        <el-option v-for="item in optionsage" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>手机号1:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="phone">
                                    <el-input v-model="ruleForm.phone" placeholder="请输入手机号1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>手机号2:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-input v-model="ruleForm.phoneTwo" placeholder="请输入手机号2"></el-input>
                            </el-col>
                        </el-row>
        <!-- 客源信息 -->
                        <div class="infor-title-two">
                            客源信息
                        </div>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>城市:</p>
                            </el-col>
                            <el-col :span="3" id="sheng">
                                <el-form-item label="" prop="province">
                                    <el-select v-model="province.value" @focus="selectProvince" @change="selectCity" placeholder="选择省" >
                                        <el-option v-for="item in province":value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="city">
                                    <el-select v-model="city.value" @change="selectArea" placeholder="选择市">
                                        <el-option v-for="(item,index) in city" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="area">
                                    <el-select v-model="area.value" @change="selectQu" placeholder="选择区">
                                        <el-option v-for="(item,index) in area" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>户型:</p>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="myShi">
                                    <el-input v-model.number="ruleForm.myShi" placeholder="室 (数字)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>类型:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="types">
                                    <el-select v-model="ruleForm.types" @focus="selectTypesTwo" @change="selectTypes" placeholder="求租/求购">
                                        <el-option v-for="item in optionstypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="2">
                                <el-form-item label="" prop="myTing">
                                    <el-input v-model.number="ruleForm.myTing" placeholder="厅 (数字)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="myChu">
                                    <el-input v-model.number="ruleForm.myChu" placeholder="厨 (数字)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="myWei">
                                    <el-input v-model.number="ruleForm.myWei" placeholder="卫 (数字)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="myYang">
                                    <el-input v-model.number="ruleForm.myYang" placeholder="阳 (数字)"></el-input>
                                </el-form-item>
                            </el-col> -->
                        </el-row>
        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 20px 0 10px;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>来源:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="source">
                                    <el-select v-model="ruleForm.source" @focus="selectSourceTwo" @change="selectSource" placeholder="58/来电">
                                        <el-option v-for="item in optionssource" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>级别:</p>
                            </el-col>
                            <el-col :span="3">
                              <el-form-item label="" prop="level">
                                    <el-select v-model="ruleForm.level" @focus="selectLevelTwo" @change="selectLevel" placeholder="A/B/C">
                                        <el-option v-for="item in optionslevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>用途:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="purpose">
                                    <el-select v-model="ruleForm.purpose" @focus="selectPurposeTwo" @change="selectPurpose" multiple collapse-tags placeholder="住宅/商铺(多选)">
                                        <el-option v-for="item in optionspurpose" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>期望价格:</p>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="minprice">
                                    <el-input v-model.number="ruleForm.minprice" :placeholder="this.vId1 == 2 ? '元/月 (数字/小数)' : '万元 (数字/小数)'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxprice">
                                    <el-input v-model.number="ruleForm.maxprice" :placeholder="this.vId1 == 2 ? '元/月 (数字/小数)' : '万元 (数字/小数)'"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>

        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>面积:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="minarea">
                                    <el-input v-model.number="ruleForm.minarea" placeholder="㎡ (数字/小数)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="maxarea">
                                    <el-input v-model.number="ruleForm.maxarea" placeholder="㎡ (数字/小数)"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>

        <!-- 备注信息 -->
                        <div class="infor-title-two">
                            备注信息
                        </div>
                        <el-form-item label="" prop="remark">
                            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" placeholder="请输入内容" v-model="ruleForm.remark" style="padding: 20px 0;" >
                            </el-input>
                        </el-form-item>
        <!-- 发布/取消 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="6">
                                &nbsp;
                            </el-col>
                            <el-col :span="6">
                                <el-button type="danger" :plain="true" @click="clearSHowYes('ruleForm')" style="display: block; margin: 0 auto; padding: 10px 35px; " >保存修改</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="info" :plain="true" @click="hosueShowN" style="display: block; margin: 0 auto; padding: 10px 35px; " >取消</el-button>
                            </el-col>
                            <el-col :span="6">
                                &nbsp;
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {setCookie,getCookie} from '../../util/cookie'
    export default {
        name: 'customercontent',
        data() {
            return {
                viewData: '',
                appendHouse: false,
                isYN: '',
                //跟进展示
                viewList: [],
                currentpage: '',
                pageSize: 5,
                viewAll: 5,
                diyige: 1,
                //添加跟进
                appendHouse: false,
                isYN: '',
                view: {},
                names: '',
                sellerId: '',
                viewseller: {},
                img: [],
                appendFollow: false,
                current: 0,
                todos: [
                    {text: '去电'},
                    {text: '来电'},
                    {text: '派单'},
                    {text: '短信'},
                    {text: '邮件'},
                    {text: '信函'},
                    {text: '申请'},
                    {text: '修改'},
                    {text: '保留'},
                    {text: '看房'},
                    {text: '勘察'},
                    {text: '来访'},
                    {text: '拜访'},
                    {text: '其他'},
                ],
                ruleFormS: {
                    timeone: '',
                    neirong: '',
                },
                rulesS: {
                    timeone: [
                        { required: true, message: '请选择跟进时间', trigger: 'blur' },
                    ],
                    neirong: [
                        { required: true, message: '请填写内容', trigger: 'blur' },
                    ],
                },
// 添加修改客源
                vId: '',
                vId1: '',
                vId2: '',
                vId3: '',
                objLabel1: '',
                province: [],
                provincecity: '',
                city: [],
                provincearea: '',
                area: [],
                provincequ: '',
                ruleForm: {
                    name: '',
                    ages: '',
                    phone:'',
                    phoneTwo:'',
                    types:'',
                    source: '',
                    purpose: [],
                    level: '',
                    myShi: '',
                    myTing: '',
                    myChu: '',
                    myWei: '',
                    myYang: '',
                    minarea: '',
                    maxarea: '',
                    minprice: '',
                    maxprice: '',
                    remark: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    ages: [
                        { required: true, message: '请选择性别', trigger: 'change' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号1', trigger: 'blur' },
                    ],
                    types: [
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    source: [
                        { required: true, message: '请选择来源', trigger: 'change' },
                    ],
                    purpose: [
                        { type: 'array', required: true, message: '请选择用途', trigger: 'change' },
                    ],
                    level: [
                        { required: true, message: '请输入手机号1', trigger: 'blur' },
                    ],
                    myShi: [
                        { required: true, message: '请输入卧室数', trigger: 'blur' },
                    ],
                    myTing: [
                        { required: true, message: '请输入客厅数', trigger: 'blur' },
                    ],
                    myChu: [
                        { required: true, message: '请输入厨房数', trigger: 'blur' },
                    ],
                    myWei: [
                        { required: true, message: '请输入卫生间数', trigger: 'blur' },
                    ],
                    myYang: [
                        { required: true, message: '请输入阳台数', trigger: 'blur' },
                    ],
                    minarea: [
                        { required: true, message: '请输入最小面积', trigger: 'blur' },
                    ],
                    maxarea: [
                        { required: true, message: '请输入最大面积', trigger: 'blur' },
                    ],
                    minprice: [
                        { required: true, message: '请输入最小价格', trigger: 'blur' },
                    ],
                    maxprice: [
                        { required: true, message: '请输入最大价格', trigger: 'blur' },
                    ]
                },
                //男女妖
                optionsage: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                //求购/求组
                optionstypes: [{
                    value: '1',
                    label: '求购'
                }, {
                    value: '2',
                    label: '求租'
                }],
                // 来源
                optionssource: [{
                    value: '1',
                    label: '来电'
                }, {
                    value: '2',
                    label: '来访'
                }, {
                    value: '3',
                    label: '中介'
                }, {
                    value: '4',
                    label: '朋友'
                }, {
                    value: '5',
                    label: '广告'
                }, {
                    value: '6',
                    label: '扫街'
                }, {
                    value: '7',
                    label: '网络'
                }, {
                    value: '8',
                    label: '搜房'
                }, {
                    value: '9',
                    label: '口碑'
                }],
                //来源
                optionssource: [{
                    value: '1',
                    label: '来电'
                }, {
                    value: '2',
                    label: '来访'
                }, {
                    value: '3',
                    label: '安居客'
                }, {
                    value: '4',
                    label: '朋友'
                }, {
                    value: '5',
                    label: '广告'
                }, {
                    value: '6',
                    label: '扫街'
                }, {
                    value: '7',
                    label: '赶集'
                }, {
                    value: '8',
                    label: '搜房'
                }, {
                    value: '9',
                    label: '口碑'
                }, {
                    value: '10',
                    label: '58网'
                }, {
                    value: '11',
                    label: '新浪'
                }],
                //级别
                optionslevel: [{
                    value: '1',
                    label: 'A'
                }, {
                    value: '2',
                    label: 'B'
                }, {
                    value: '3',
                    label: 'C'
                },],
// 添加修改客源 end
            }
        },
        mounted () {
            this.showData ()
        },
        created() {

        },
        computed: {

        },
        methods: {
            showData () {
                var datas = {
                    id: this.$route.params.id
                }
                this.$http.post(myHost+'myh_management/buyerDetail',datas).then((response) => {
                    if (response.headers['code'] === '3') {
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        console.log(response)
                        var data = response.data
                        data = data.resultBean
                        var code = data.code
                        if (code == '0') {
                            data = data.object
                            this.viewData = data
                            this.isYN = getCookie('isYN')
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //下拉框选中事件 男女
            selectAge(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsage.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.vId = vId
            },
            selectAgeTwo () {
                this.ruleForm.ages = ''
            },
            //下拉框选中事件 类型
            selectTypes(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionstypes.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.vId1 = vId
                this.ruleForm.minprice = ''
                this.ruleForm.maxprice = ''
            },
            selectTypesTwo () {
                this.ruleForm.types = ''
            },
            //下拉框选中事件 来源
            selectSource(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionssource.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.vId2 = vId
            },
            selectSourceTwo () {
                this.ruleForm.source = ''
            },
            //下拉框选中事件 用途
            selectPurpose(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionspurpose.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.vId3 = vId
            },
            selectPurposeTwo () {
                this.ruleForm.purpose = []
            },
            //下拉框选中事件 级别
            selectLevel(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionslevel.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                // this.vId3 = vId
                this.objLabel1 = obj.label
            },
            selectLevelTwo () {
                this.ruleForm.level = ''
            },
            //省
            selectProvince (vId) {
                this.$http.post(myHost+'myh_management/getAllProvince').then((response) => {
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        data = data.resultBean
                        var myCode = data.code
                        this.province = data.object
                        // console.log(this.province)
                        console.log(myCode)
                        if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //市
            selectCity (vId) {
                let obj = {}
                obj = this.province.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.provincecity = vId
                var shi = {
                    province: this.provincecity
                }
                this.$http.post(myHost+'myh_management/getAllCitiesByProvince',shi).then((response) => {
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        data = data.resultBean
                        var myCode = data.code
                        this.city = data.object
                        console.log(this.city)
                        console.log(myCode)
                        if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //区
            selectArea (vId,vId1) {
                let obj = {}
                obj = this.city.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.provincearea = vId
                var qu = {
                    province: this.provincecity,
                    city: this.provincearea
                }
                this.$http.post(myHost+'myh_management/getAllAreasByCity',qu).then((response) => {
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        data = data.resultBean
                        var myCode = data.code
                        this.area = data.object
                        console.log(this.area)
                        console.log(myCode)
                        if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            selectQu (vId) {
                let obj = {}
                obj = this.area.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.provincequ = vId
            },
            // 显示修改
            hosueShowY () {
                this.appendHouse = true
                var datas = {
                    buyerId: this.$route.params.id
                }
                this.$http.post(myHost+'myh_management/selectOnesearchBuyer',datas).then((response) => {
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        data = data.resultBean
                        var code = data.code
                        if (code == '0') {
                            var views = data.object
                            this.view = views
                            this.vId = views.bSex
                            this.vId1 = views.bBuyType
                            this.vId2 = views.bComeFrom
                            this.vId3 = views.useTypeList
                            this.objLabel1 = views.bLevel
                            console.log(this.view)
                            this.ruleForm.name = views.bRealName
                            //男女
                            for (let i = 0; i < this.optionsage.length; i++) {
                                if (this.optionsage[i].value == views.bSex) {
                                    this.ruleForm.ages = this.optionsage[i].label
                                    console.log(this.ruleForm.ages)
                                }
                            }
                            this.ruleForm.phone = views.mobile
                            this.ruleForm.phoneTwo = views.bMobileTwo
                            this.ruleForm.name = views.bRealName
                            //类型 求租/求购
                            for (let i = 0; i < this.optionstypes.length; i++) {
                                if (this.optionstypes[i].value == views.bBuyType) {
                                    this.ruleForm.types = this.optionstypes[i].label
                                    console.log(this.ruleForm.types)
                                }
                            }
                            //来源
                            for (let i = 0; i < this.optionssource.length; i++) {
                                if (this.optionssource[i].value == views.bComeFrom) {
                                    this.ruleForm.source = this.optionssource[i].label
                                    console.log(this.ruleForm.source)
                                }
                            }
                            //级别
                            for (let i = 0; i < this.optionslevel.length; i++) {
                                if (this.optionslevel[i].label === views.bLevel) {
                                    this.ruleForm.level = this.optionslevel[i].label
                                    console.log(this.ruleForm.level)
                                }
                            }
                            //用途
                            var a = []
                            for (let i = 0; i < this.optionspurpose.length; i++) {
                                for (var j = 0; j < views.useTypeList.length; j++) {
                                    if (this.optionspurpose[i].value == views.useTypeList[j]) {
                                        a.push(this.optionspurpose[j].label)
                                        this.ruleForm.purpose = a
                                    }
                                }
                            }
                            //省
                            this.province.value = views.bProvince
                            this.city.value = views.bCity
                            this.area.value = views.bArea
                            this.ruleForm.myShi = views.bBedroom
                            this.ruleForm.myTing = views.bVisitorRoom
                            this.ruleForm.myChu = views.bCookRoom
                            this.ruleForm.myWei = views.bToiletRoom
                            this.ruleForm.myYang = views.bBalconyRoom
                            this.ruleForm.minarea = views.bFromMeature
                            this.ruleForm.maxarea = views.bToMeature
                            this.ruleForm.minprice = views.bFromPrice
                            this.ruleForm.maxprice = views.bToPrice
                            this.ruleForm.remark = views.bComment

                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            // 发布验证
            clearSHowYes (formName) {
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var vId3=this.vId3.map(Number)
                        var forms = {
                            id: this.$route.params.id,
                            bRealName: this.ruleForm.name,
                            mobile: this.ruleForm.phone,
                            bSex: this.vId,
                            bComeFrom: this.vId2,
                            useTypeList: vId3,
                            bBuyType: this.vId1,
                            bMobileTwo: this.ruleForm.phoneTwo,
                            bLevel: this.objLabel1,
                            bBedroom: this.ruleForm.myShi,
                            bVisitorRoom: this.ruleForm.myTing,
                            bCookRoom: this.ruleForm.myChu,
                            bToiletRoom: this.ruleForm.myWei,
                            bBalconyRoom: this.ruleForm.myYang,
                            bFromMeature: this.ruleForm.minarea,
                            bToMeature: this.ruleForm.maxarea,
                            bFromPrice: this.ruleForm.minprice,
                            bToPrice: this.ruleForm.maxprice,
                            bComment: this.ruleForm.remark,
                            bProvince: this.provincecity,
                            bCity: this.provincearea,
                            bArea: this.provincequ,

                        }
                        that.$http.post(myHost+'myh_management/updateUser',forms).then((response) => {
                            if (response.headers['code'] === '3') {
                                // console.log(response.headers['message'])
                                this.$router.push('/login');
                                this.$message.error('登陆超时，请重新登陆');
                            } else if (response.headers['code'] === '4') {
                                this.$router.push('/login');
                                this.$message.error('您的账号在其他地方登陆');
                            } else {
                                var data = response.data
                                data = data.resultBean
                                var code = data.code
                                console.log(code)
                                if (code == '0') {
                                    // 隐藏添加客源 发布成功
                                    that.appendHouse = false;
                                    this.showData ()
                                    that.$message({
                                        message: '修改成功',
                                        type: 'success',
                                    });
                                } else if (code == '3') {
                                    this.$router.push('/login');
                                    this.$message.error(data.message);
                                } else {
                                    that.$message.error(data.message);
                                }
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //跟进显示
            isShow () {
                this.appendFollow = true
            },
            // 添加跟进
            clearShowYesTwo (formName) {
                var that = this
                console.log(this.$refs[formName])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var classes = this.current+1
                        console.log(this.$route.params.id,this.ruleFormS.neirong,this.ruleFormS.timeone,classes)
                        var up = {
                            bUserId: this.$route.params.id,
                            bFollows: this.ruleFormS.neirong,
                            bRemindTime: this.ruleFormS.timeone,
                            FollowMethod: classes,
                        }
                        this.$http.post(myHost+'myh_management/insertBuyerFollow',up).then((response) => {
                            if (response.headers['code'] === '3') {
                                // console.log(response.headers['message'])
                                this.$router.push('/login');
                                this.$message.error('登陆超时，请重新登陆');
                            } else if (response.headers['code'] === '4') {
                                this.$router.push('/login');
                                this.$message.error('您的账号在其他地方登陆');
                            } else {
                                console.log(response)
                                var data = response.data
                                data = data.resultBean
                                var code = data.code
                                // console.log(code)
                                if (code == '0') {
                                    that.$message({
                                        message: data.message,
                                        type: 'success',
                                    });
                                    this.followView ()
                                    this.appendFollow = false
                                } else if (code == '3') {
                                    this.$router.push('/login');
                                    this.$message.error(data.message);
                                } else {
                                    this.$message.error(data.message);
                                }
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 展示跟进
            followView () {
                var datas = {
                    hHouseId: this.$route.params.id,
                    page: {
                        pageNum: this.currentpage,
                        pageSize: this.pageSize
                    }
                }
                this.$http.post(myHost+'myh_management/myFollowOfUser',datas).then((response) => {
                    var data = response.data
                    data = data.resultBean
                    var code = data.code
                    if (code == '0') {
                        data = data.object
                        this.viewAll = data.total
                        this.viewList = data.list
                    } else if (code == '3') {
                        this.$router.push('/login');
                        this.$message.error(data.message);
                    }
                })
            },
            // 取消 发布跟进
            clearShowNoTwo () {
                this.$message({
                    message: '取消发布',
                    type: 'warning'
                });
                this.appendFollow = false
            },
            // 分页
            handleCurrentChange(val) {
                this.currentpage = val
                // this.viewTable ()
                this.followView ()
            },
            addClass (index) {
                this.current=index;
                console.log(this.current)
            },
            // 隐藏修改
            hosueShowN () {
                this.appendHouse = false
                this.$message({
                    message: '取消修改',
                    type: 'warning'
                });
            },
        },
        watch:{
            $route(to,from){
            // console.log(to.path);
                if (to.path) {
                    this.showData ()
                }
            }
        },
    };

</script>

<style>
    .crumbs{
        padding: 0;
    }
    .customercontent .titleMall{
        padding: 10px 10px;
        background: #fff;
        margin-bottom: 10px;
    }
    .customercontent .navs{
        padding: 20px 10px;
        background: #fff;
        margin-bottom: 10px;
    }
    .customercontent .navs .el-row{
        padding: 5px 0;
    }
    .customercontent .navs .el-collapse-item__header{
        font-size: 18px;
        color: #e54648;
    }
    .customercontent .myMap{
        width: 100%;
        height: 300px;
        padding: 0 0;
        background: #fff;
        margin-bottom: 10px;
    }
    .customercontent .myMap #allmap{
        height: 300px;
    }
    .customercontent .comment{
        padding: 0 10px;
        background: #fff;
    }
    .customercontent .comment .comment-text{
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    .customercontent .comment .comment-text .comment-head{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #eee;
        overflow: hidden;
        margin: 0 auto;
    }
    .customercontent .comment .comment-text .comment-head img{
        width: 100%;
    }
    .customercontent .comment .comment-text .el-button{
        padding: 18px 25px;
    }
    .customercontent .comment .comment-text-show{
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    .customercontent .comment .comment-text-show .comment-head{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #eee;
        overflow: hidden;
        margin: 0 auto;
    }
    .customercontent .comment .comment-text-show .comment-head img{
        width: 100%;
    }
    .customercontent .comment .comment-text-show .comment-name{
        font-size: 14px;
        color: #999;
        padding-bottom: 5px;
    }
    .customercontent .comment .comment-text-show .comment-name span{
        float: right;
    }
    .HC-title{
        font-size: 18px;
        color: #000;
    }
    .HC-title span{
        color: #666;
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
