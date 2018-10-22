<template>
    <div class="contents">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 房源管理</el-breadcrumb-item>
                <el-breadcrumb-item>房源详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!-- 第一块 -->
        <div class="banner">
            <el-row :gutter="30">
                <el-col :span="11">
                    <template>
                        <el-carousel :interval="5000" indicator-position="none" arrow="always">
                            <el-carousel-item v-for="item in img1" :key="item">
                                <img :src="item" style="height: 100%;" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </template>
                </el-col>
                <el-col :span="13">
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <p class="HC-title" ><span>地址:</span> {{view.address}}</p>
                        </el-col>
                        <el-col :span="3">
                             {{view.communityCode}}
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" style="float: right;" >收藏</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <p style="font-size:20px;color: #e54648;" >小区信息</p>
                        </el-col>
                        <el-col :span="12">
                            <p style="line-height: 32px; float: right; color: #999;cursor: pointer;" @click="hosueShowY" >编辑</p>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <p class="HC-title" ><span>小&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区:</span> {{view.communityName}}</p>
                        </el-col>
                        <el-col :span="12">
                            <p class="HC-title" ><span>容&nbsp;积&nbsp;率:</span> {{view.plotRatio}}</p>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <p class="HC-title" ><span>物业公司:</span> {{view.propertyCompany}}</p>
                        </el-col>
                        <el-col :span="12">
                            <p class="HC-title" ><span>绿&nbsp;化&nbsp;率:</span> {{view.greeningRate}}</p>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <p class="HC-title" ><span>建筑年代:</span> {{view.communityYears}}</p>
                        </el-col>
                        <el-col :span="12">
                            <p class="HC-title" ><span>总&nbsp;户&nbsp;数:</span> {{view.totalHouse}} 户</p>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <p class="HC-title" ><span>建筑类型:</span> {{view.buildingStyle}}</p>
                        </el-col>
                        <el-col :span="12">
                            <p class="HC-title" ><span>开&nbsp;&nbsp;发&nbsp;商:</span> {{view.developerName}}</p>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <p class="HC-title" ><span>物业地址:</span> {{view.propertyAddress}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-collapse >
                        <el-collapse-item title="展开信息">
                            <div>{{view.communityAddr}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-row>
        </div>
<!-- 第二块 -->
        <div class="navs">
            <el-row :gutter="10">
                <el-col :span="12">
                    <p style="font-size: 20px;color: #e54648; padding: 10px 0" >客源信息</p>
                </el-col>
                <el-col :span="12">
                    <p style="line-height: 32px; float: right; color: #999;cursor: pointer;" @click="hosueShowY" >编辑</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p v-if="isYN === '0'" class="HC-title" >
                        <span style="float:left;">经&nbsp;&nbsp;纪 &nbsp;人:</span>
                        <i v-show="liuerpi" @click="clickyipi" style="cursor: pointer;">{{view.fromAgent}}</i>
                        <el-autocomplete
                            v-show="liuyipi"
                            style="width: 40%;float: left;"
                            v-model="liu"
                            :fetch-suggestions="querySearchAsyncTwo"
                            @select="handleSelectTwo"
                            placeholder="请输入经纪人姓名"
                        >
                        </el-autocomplete>
                        <el-button v-show="liuyipi" type="info" :plain="true" @click="clickerpi" style="float: left;" >确定</el-button>
                        <el-button v-show="liuyipi" type="info" :plain="true" @click="clickesanpi" style="float: left;" >取消</el-button>
                    </p>
                    <p v-else class="HC-title" ><span>经&nbsp;&nbsp;纪 &nbsp;人:</span> {{view.fromAgent}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>委托时间:</span> {{view.entrustTime}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;代:</span> {{view.constructYear}}年</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;格:</span> {{view.nowPrice}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>交房时间:</span> {{view.deliverTime}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;向:</span> {{view.direction}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>原&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;值:</span> {{view.oldPrice}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;型:</span> {{view.layout}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>钥&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;匙:</span> {{view.keyState}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>盘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;别:</span> {{view.houseType}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;售:</span> {{view.sellState}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>是否有税:</span> {{view.tax}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>建筑面积:</span> {{view.totalMeasure}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;源:</span> {{view.sourceFrom}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>装&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;修:</span> {{view.decoration}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>使用面积:</span> {{view.usefulMeasure}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>房源编号:</span> {{view.houseCode}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>产权类型:</span> {{view.houseRights}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="8">
                    <p class="HC-title" ><span>委托方式:</span> {{view.entrustType}}</p>
                </el-col>
                <el-col :span="8">
                    <p class="HC-title" ><span>现&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;状:</span> {{view.houseState}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <p class="HC-title" ><span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;注:</span> {{view.remarks}}</p>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-collapse @change="viewsellersTwo">
                        <el-collapse-item title="查看业主信息">
                            <el-row :gutter="10" >
                                <el-col :span="24">
                                    <p class="HC-title" ><span>业主信息:</span> {{viewseller.sellerName}} {{viewseller.sellerMobileOne}} {{viewseller.sellerMobileTwo}}</p>
                                </el-col>
                            </el-row>
                            <el-row :gutter="10">
                                <el-col :span="24">
                                    <p class="HC-title" ><span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:</span> {{viewseller.shAddress}}</p>
                                </el-col>
                            </el-row>
                        </el-collapse-item>
                    </el-collapse>
                </el-col>
            </el-row>
        </div>
<!-- 第三块 -->
        <div class="myMap">
            <!-- -----百度地图----- -->
            <div id="allmap"></div>
        </div>
<!-- 第四块 -->
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
                            <el-col :span="2">
                                <p style="color: #9b261d; text-align: right;" >{{view.followType}} </p>
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
                    <div id="append-informationTwo" @mousedown.self="move" @mouseover.self="isAppendInformation=false" @mouseout.self="isAppendInformation=true">
                        <p class="append-p" v-show="isAppendInformation">拖拽区域</p>
                        <div class="append-information" id="append-informationTwoTwo">
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
                                <!-- <el-row :gutter="5" style="padding: 10px 0;" >
                                    <el-col style="text-align: center; margin-top: 5px;" :span="3">
                                        选择跟进时间 : 
                                    </el-col>
                                    <el-col :span="21">
                                        <el-form-item label="" prop="timeone">
                                            <el-date-picker v-model="ruleFormS.timeone" type="datetime" placeholder="选择跟进时间" default-time="12:00:00"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row> -->
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
                                <el-col :span="10">
                                    &nbsp;
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="danger" :plain="true" @click="clearShowYesTwo('ruleFormS')" style="display: block; margin: 0 auto; padding: 10px 35px; " >发布</el-button>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="info" :plain="true" @click="clearShowNoTwo" v-show="isYesNo" style="display: block; margin: 0 auto; padding: 10px 35px; " >取消</el-button>
                                </el-col>
                                <el-col :span="10">
                                    &nbsp;
                                </el-col>
                            </el-row>
                            </el-form>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
<!-- 修改信息 -->
        <transition name="el-zoom-in-center">
            <div class="append-house" v-show="appendHouse" >
                <div class="append-information">
                    <div class="infor-title">
                        修改房源
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
                                <!-- <el-input v-model="input" placeholder="请输入姓名"></el-input> -->
                                <el-form-item label="" prop="name">
                                    <el-input :disabled="isYN  === '1' ? true : false" v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>性别:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="ages">
                                    <el-select :disabled="isYN  === '1' ? true : false" v-model="ruleForm.ages" @change="selectAge" placeholder="男/女">
                                        <el-option v-for="item in optionsage" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>手机号1:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="phone">
                                    <el-input :disabled="isYN  === '1' ? true : false" v-model="ruleForm.phone" placeholder="请输入手机号1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>手机号2:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-input :disabled="isYN  === '1' ? true : false" v-model="ruleForm.phoneTwo" placeholder="请输入手机号2"></el-input>
                            </el-col>
                        </el-row>
                    </el-form>
        <!-- 客源信息 -->
                    <el-form :model="ruleFormTwo" :rules="rulesTwo" ref="ruleFormTwo">
                        <div class="infor-title-two">
                            客源信息
                        </div>
                        <el-row :gutter="5" style="padding: 10px 0 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>城市:</p>
                            </el-col>
                            <el-col :span="4" id="sheng">
                                <el-form-item label="" prop="province">
                                    <el-select v-model="province.value" @focus="selectProvince" @change="selectCity" placeholder="选择省" >
                                        <el-option v-for="item in province" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>&nbsp;</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="city">
                                    <el-select v-model="city.value" @change="selectArea" placeholder="选择市">
                                        <el-option v-for="(item,index) in city" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>&nbsp;</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="area">
                                    <el-select v-model="area.value" @change="selectQu" placeholder="选择区">
                                        <el-option v-for="(item,index) in area" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>小区: </p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="liu">
                                    <el-autocomplete 
                                        v-model="ruleFormTwo.liu"
                                        :fetch-suggestions="querySearchAsync"
                                        @select="handleSelect"
                                        placeholder="请输入关键字"
                                    >
                                    </el-autocomplete>
                                </el-form-item>
                            </el-col>
                        </el-row>
        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>房产类型</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="purpose">
                                    <el-select v-model="ruleFormTwo.purpose" @change="selectPurpose" placeholder="请选择">
                                        <el-option v-for="item in optionspurpose" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>楼号</p>
                            </el-col>
                            <el-col :span="1" class="qupd" >
                                <el-form-item label="" prop="building">
                                    <el-input :disabled="isYN  === '1' ? true : false" v-model="ruleFormTwo.building" placeholder="栋"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" class="qupd" >
                                <el-form-item label="" prop="unit">
                                    <el-input :disabled="isYN  === '1' ? true : false" v-model="ruleFormTwo.unit" placeholder="单元"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" class="qupd" >
                                <el-form-item label="" prop="hao">
                                    <el-input :disabled="isYN  === '1' ? true : false" v-model="ruleFormTwo.hao" placeholder="号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>层数:</p>
                            </el-col>
                            <el-col :span="2" class="qupd" >
                                <el-form-item label="" prop="floor">
                                    <el-input v-model="ruleFormTwo.floor" placeholder="层数"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>/</p>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="layers">
                                    <el-input v-model="ruleFormTwo.layers" placeholder="总层数"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>年代:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="years">
                                    <el-input v-model="ruleFormTwo.years" placeholder="年代 (MMMM)"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 20px 0 10px;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>租售:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="rent">
                                    <el-select v-model="ruleFormTwo.rent" @change="selectRent" placeholder="请选择">
                                        <el-option v-for="item in optionsrent" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>价格:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="price">
                                    <el-input v-model="ruleFormTwo.price" :placeholder="this.selectRentUse == 2 ? '请输入价格 (元/月)' : '请输入价格 (万元)'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>原价:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="originalprice">
                                    <el-input v-model="ruleFormTwo.originalprice" :placeholder="this.selectRentUse == 2 ? '请输入原价 (元/月)' : '请输入原价 (万元)'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>状态:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="stateTwo">
                                    <el-select v-model="ruleFormTwo.stateTwo" @change="selectStateTwo" @bule placeholder="请选择状态">
                                        <el-option v-for="item in optionsstateTwo" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>户型:</p>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="shi">
                                    <el-input v-model="ruleFormTwo.shi" placeholder="室"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="ting">
                                    <el-input v-model="ruleFormTwo.ting" placeholder="厅"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="chu">
                                    <el-input v-model="ruleFormTwo.chu" placeholder="厨"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="wei">
                                    <el-input v-model="ruleFormTwo.wei" placeholder="卫"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="yang">
                                    <el-input v-model="ruleFormTwo.yang" placeholder="阳"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>总面积:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="acreageone">
                                    <el-input v-model="ruleFormTwo.acreageone" placeholder="总面积"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>使用面积:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="acreagetwo">
                                    <el-input v-model="ruleFormTwo.acreagetwo" placeholder="使用面积"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>是否有税:</p>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="tax">
                                    <el-select v-model="ruleFormTwo.tax" @change="selectTax" placeholder="请选择">
                                        <el-option v-for="item in optionstax" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>朝向:</p>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="orientation">
                                    <el-select v-model="ruleFormTwo.orientation" @change="selectOrientation" placeholder="请选择">
                                        <el-option v-for="item in optionsorientation" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>钥匙:</p>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="mykey">
                                    <el-select v-model="ruleFormTwo.mykey" @change="selectMykey" placeholder="请选择">
                                        <el-option v-for="item in optionsmykey" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>装修:</p>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="renovation">
                                    <el-select v-model="ruleFormTwo.renovation" @change="selectRenovation" placeholder="请选择">
                                        <el-option v-for="item in optionsrenovation" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>产权:</p>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="propertyright">
                                    <el-select v-model="ruleFormTwo.propertyright" @change="selectPropertyright" placeholder="请选择">
                                        <el-option v-for="item in optionspropertyright" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>委托方式:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="entrust">
                                    <el-select v-model="ruleFormTwo.entrust" @change="selectEntrust" placeholder="请选择">
                                        <el-option v-for="item in optionsentrust" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>委托时间:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="timeone">
                                    <el-date-picker disabled v-model="ruleFormTwo.timeone" type="date" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>交房时间:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="timetwo">
                                    <el-date-picker v-model="ruleFormTwo.timetwo" type="date" placeholder="选择日期时间" default-time="12:00:00" :picker-options="pickerOptions0"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>委托编号:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="houseCode">
                                    <el-input :disabled="true" v-model="ruleFormTwo.houseCode"placeholder="委托编号"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
        <!-- 客源信息 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>来源:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="source">
                                    <el-select v-model="ruleFormTwo.source" @change="selectSource" placeholder="请选择">
                                        <el-option v-for="item in optionssource" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>现状:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="state">
                                    <el-select v-model="ruleFormTwo.state" @change="selectState" placeholder="请选择">
                                        <el-option v-for="item in optionsstate" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>房源编号:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="houseCode">
                                    <el-input :disabled="true" v-model="ruleFormTwo.houseCode"  placeholder="点击生成编号"></el-input>
                                </el-form-item>
                            </el-col>
                     <!--        <el-col :span="6">
                                <el-button type="danger" @click="houseRepeat" style="float: right; padding: 10px 50px; " >查重</el-button>
                            </el-col> -->
                        </el-row>
        <!-- 图片信息 -->
                        <div class="infor-title-two">
                            图片信息
                        </div>
                        <el-upload
                            :disabled="disabledUpload"
                            :on-exceed="uploadMax"
                            :limit="10"
                            :action="uploadImgUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :onSuccess="uploadSuccess"
                            :beforeUpload="beforeAvatarUpload"
                            :data="{imgType:'1'}"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            style="padding: 20px 0;">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
        <!-- 委托书图片信息 -->
                        <div class="infor-title-two">
                            授权委托
                        </div>
                        <el-upload
                            :with-credentials=true
                            :disabled="disabledUpload"
                            :on-exceed="uploadMaxTwo"
                            :limit="1"
                            :action="uploadImgUrl"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :onSuccess="uploadSuccessTwo"
                            :beforeUpload="beforeAvatarUpload"
                            :data="{imgType:'2'}"
                            :on-remove="handleRemoveTwo"
                            :file-list="fileListTwo"
                            style="padding: 20px 0;">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
        <!-- 备注信息 -->
                        <div class="infor-title-two">
                            备注信息
                        </div>
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 4, maxRows: 10}"
                          placeholder="请输入内容"
                          v-model="remarks" style="padding: 20px 0;" >
                        </el-input>
        <!-- 发布/取消 -->
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="6">
                                &nbsp;
                            </el-col>
                            <el-col :span="6">
                                <el-button type="danger" :plain="true" @click="clearSHowYes('ruleFormTwo')" style="display: block; margin: 0 auto; padding: 10px 35px; " >保存修改</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="info" :plain="true" @click="clearSHowNo" style="display: block; margin: 0 auto; padding: 10px 35px; " >取消</el-button>
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
        name: 'contents',
        data() {
            return {
                liu: '',
                liuyipi: false,
                liuerpi: true,
                fromCommunityId: '',
                peopleType: '',
                isAppendInformation: true,
                //禁止选今天之前的时间
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                //跟进展示
                viewList: [],
                currentpage: '',
                pageSize: 5,
                viewAll: 5,
                diyige: 1,
                isYesNo: false,
                //添加跟进
                appendHouse: false,
                isYN: '',
                view: {},
                names: '',
                sellerId: '',
                viewseller: {},
                img: [],
                imgA: [],
                imgB: [],
                img2: [],
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
                    // timeone: '',
                    neirong: ' ',
                },
                rulesS: {
                    // timeone: [
                    //     { required: true, message: '请选择跟进时间', trigger: 'blur' },
                    // ],
                    neirong: [
                        { required: true, message: '请填写内容', trigger: 'blur' },
                    ],
                },
//添加房源
                vId: '',
                ruleForm: {
                    name: '',
                    ages: '',
                    phone:'',
                    phoneTwo:'',
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
                    phoneTwo: [
                        { required: true, message: '请输入手机号2', trigger: 'blur' },
                    ],
                },
                //男女妖
                optionsage: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
// 添加房源 end
//添加房源two
                dialogImageUrl: '',
                dialogVisible: false,
                uploadImgUrl: 'http://www.manyihefc.com:8080/myh_management/uploadImage/',
                disabledUpload: false,
                fileList: [],
                fileListTwo: [],
                img1: [],
                xiaoqu: '',
                province: [],
                provincecity: '',
                city: [],
                provincearea: '',
                area: [],
                provincequ: '',
                fromCommunity: '',
                selectRentUse:'',
                selectPurposetUse: '',
                selectMykeyUse: '',
                selectTaxUse: '',
                selectOrientationUse: '',
                selectRenovationUse: '',
                optionspropertyrightUse: '',
                selectEntrustUse: '',
                selectSourceUse: '',
                selectStateUse: '',
                isclick: true,
                remarks: '',
                selectStateTwoUse: '',
                ruleFormTwo: {
                    rent: '',
                    numberid:'',
                    price: '',
                    originalprice: '',
                    liu: '',
                    purpose: '',
                    building: '',
                    unit: '',
                    floor: '',
                    hao: '',
                    layers: '',
                    years: '',
                    shi: '',
                    ting: '',
                    chu: '',
                    wei: '',
                    yang: '',
                    acreageone: '',
                    acreagetwo: '',
                    mykey: '',
                    tax: '',
                    orientation: '',
                    stateTwo: '',
                    renovation: '',
                    propertyright: '',
                    entrust: '',
                    timeone: '',
                    timetwo: '',
                    source: '',
                    numbercode: '',
                    state: '',
                    houseCode: '',
                },
                rulesTwo: {
                    rent: [
                        { required: true, message: '请选择租售状态', trigger: 'blur' },
                    ],
                    numberid: [
                        { required: true, message: '请选择房源编号', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请填写价格', trigger: 'blur' },
                    ],
                    liu: [
                        { required: true, message: '请查找小区', trigger: 'blur' },
                    ],
                    purpose: [
                        { required: true, message: '请选择类型', trigger: 'blur' },
                    ],
                    building: [
                        { required: true, message: '请填写栋', trigger: 'blur' },
                    ],
                    unit: [
                        { required: true, message: '请填写单元', trigger: 'blur' },
                    ],
                    floor: [
                        { required: true, message: '请填写楼', trigger: 'blur' },
                    ],
                    hao: [
                        { required: true, message: '请填写号', trigger: 'blur' },
                    ],
                    layers: [
                        { required: true, message: '请填写总层数', trigger: 'blur' },
                    ],
                    years: [
                        { required: true, message: '请填写年代', trigger: 'blur' },
                    ],
                    shi: [
                        { required: true, message: '请填写卧室', trigger: 'blur' },
                    ],
                    ting: [
                        { required: true, message: '请填写客厅', trigger: 'blur' },
                    ],
                    chu: [
                        { required: true, message: '请填写厨房', trigger: 'blur' },
                    ],
                    wei: [
                        { required: true, message: '请填写卫生间', trigger: 'blur' },
                    ],
                    yang: [
                        { required: true, message: '请填写阳台', trigger: 'blur' },
                    ],
                    acreageone: [
                        { required: true, message: '请填写总面积', trigger: 'blur' },
                    ],
                    acreagetwo: [
                        { required: true, message: '请填写使用面积', trigger: 'blur' },
                    ],
                    mykey: [
                        { required: true, message: '请选择是否有钥匙', trigger: 'blur' },
                    ],
                    tax: [
                        { required: true, message: '请选择税', trigger: 'blur' },
                    ],
                    orientation: [
                        { required: true, message: '请选择朝向', trigger: 'blur' },
                    ],
                    renovation: [
                        { required: true, message: '请选择装修', trigger: 'blur' },
                    ],
                    propertyright: [
                        { required: true, message: '请选择产权', trigger: 'blur' },
                    ],
                    timeone: [
                        { required: true, message: '请选择委托时间', trigger: 'blur' },
                    ],
                    source: [
                        { required: true, message: '请选择来源', trigger: 'blur' },
                    ],
                },
                //出租出售
                optionsrent: [{
                    value: '1',
                    label: '出售'
                }, {
                    value: '2',
                    label: '出租'
                }],
                //状态
                optionsstateTwo: [{
                    value: '1',
                    label: '有效'
                }, {
                    value: '3',
                    label: '暂缓'
                }, {
                    value: '4',
                    label: '无效'
                }],
                //商圈
                optionspurpose: [{
                    value: '1',
                    label: '住宅'
                }, {
                    value: '2',
                    label: '商铺'
                }, {
                    value: '3',
                    label: '写字楼'
                }, {
                    value: '4',
                    label: '商住'
                }, {
                    value: '5',
                    label: '网点'
                }, {
                    value: '6',
                    label: '厂房'
                }, {
                    value: '7',
                    label: '写厂'
                }, {
                    value: '8',
                    label: '铺厂'
                }, {
                    value: '9',
                    label: '仓库'
                }, {
                    value: '10',
                    label: '地皮'
                }, {
                    value: '11',
                    label: '车位'
                }, {
                    value: '12',
                    label: '其他'
                }],
                //是否有税
                optionsmykey: [{
                    value: '1',
                    label: '有'
                }, {
                    value: '2',
                    label: '没有'
                }],
                //是否有税
                optionstax: [{
                    value: '1',
                    label: '未满二'
                }, {
                    value: '2',
                    label: '满二'
                }, {
                    value: '3',
                    label: '满五'
                }],
                //朝向
                optionsorientation: [{
                    value: '0',
                    label: '南北通透'
                },{
                    value: '1',
                    label: '南'
                }, {
                    value: '2',
                    label: '北'
                }, {
                    value: '3',
                    label: '西'
                }, {
                    value: '4',
                    label: '东'
                }, {
                    value: '5',
                    label: '东南'
                }, {
                    value: '6',
                    label: '西南'
                }, {
                    value: '7',
                    label: '东北'
                }, {
                    value: '8',
                    label: '西北'
                }, {
                    value: '9',
                    label: '中间'
                }, {
                    value: '10',
                    label: '独栋'
                }, {
                    value: '11',
                    label: '东西'
                }],
                //装修
                optionsrenovation: [{
                    value: '1',
                    label: '毛坯'
                }, {
                    value: '2',
                    label: '简装'
                }, {
                    value: '3',
                    label: '中装'
                }, {
                    value: '4',
                    label: '精装'
                }, {
                    value: '5',
                    label: '豪装'
                }],
                //产权
                optionspropertyright: [{
                    value: '1',
                    label: '商品房'
                }, {
                    value: '2',
                    label: '房改房'
                }, {
                    value: '3',
                    label: '集体房'
                }, {
                    value: '4',
                    label: '小产权'
                }, {
                    value: '5',
                    label: '经适房'
                }, {
                    value: '6',
                    label: '其他'
                }],
                //委托方式
                optionsentrust: [{
                    value: '1',
                    label: '独家'
                }, {
                    value: '2',
                    label: '签约'
                }, {
                    value: '3',
                    label: '未签'
                }, {
                    value: '4',
                    label: '限时'
                }, {
                    value: '5',
                    label: '托管'
                }, {
                    value: '6',
                    label: '收购'
                }, {
                    value: '7',
                    label: '非独家'
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
                //现状
                optionsstate: [{
                    value: '1',
                    label: '空房'
                }, {
                    value: '2',
                    label: '业主住'
                }, {
                    value: '3',
                    label: '租客住'
                }],
// 添加房源two end

            }
        },
        mounted () {
            // this.searchByStationName()
            this.viewHouse ()
            this.followView ()
        },
        methods: {
            // 修改经纪人
            clickyipi () {
                this.liuyipi = true
                this.liuerpi = false
            },
            // 修改经纪人 取消修改
            clickesanpi () {
                this.liuyipi = false
                this.liuerpi = true
                this.$message.error('取消修改');
            },
            // 修改经纪人 确定修改
            clickerpi () {
                if (this.liu == '') {
                    this.$message.error('经纪人不能为空');
                    return
                }
                this.liuyipi = false
                this.liuerpi = true
                var datas = {
                    peopleType: this.peopleType,
                    shId: this.$route.params.id,
                    id: this.fromCommunityId
                }
                this.$http.post(myHost+'myh_management/changeAgentOwner',datas).then((response) => {
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
                            this.$message({
                                message: data.message,
                                type: 'success',
                            });
                            console.log(data.message)
                            this.liu = ''
                            this.viewHouse ()
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message);
                            console.log(data.message)
                        }
                    }
                })
            },
            //queryString 为在框中输入的值
            //callback 回调函数,将处理好的数据推回
            querySearchAsyncTwo(queryString, callback) {
                var list = [{}];
                 //调用的后台接口
                // console.log(queryString)
                // console.log(callback)
                this.queryString = queryString
                var data = {
                    shId: this.$route.params.id,
                    keyWord: queryString,
                }
                this.$http.post(myHost+'myh_management/searchNameByString',data).then((response)=>{
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        // for(let i of response.data){
                        //     i.value = i.communityName;  //将想要展示的数据作为value
                        // }
                        // list = response.data;
                        var data = response.data
                        data = data.resultBean
                        var code = data.code
                        if (code == '0') {
                            console.log(response)
                            var obj = data.object
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].value = obj[i].name
                            }
                            list = obj;
                            console.log(list)
                            this.$message({
                                message: '搜索经纪人成功',
                                type: 'success',
                            });
                        } else if (code == '1') {
                            this.$message.error(data.message);
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message);
                        }
                    }
                    callback(list);
                }).catch((error)=>{
                    console.log(error);
                });
            },
            //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
            //循环数据
            handleSelectTwo(item) {
                this.fromCommunityId = item.id
                this.peopleType = item.peopleType
            },
            // 添加跟进 移动事件
            move(e){
              let odiv = e.target;    //获取目标元素
              //算出鼠标相对元素的位置
              let disX = e.clientX - odiv.offsetLeft;
              let disY = e.clientY - odiv.offsetTop;
              document.onmousemove = (e)=>{    //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                //绑定元素位置到positionX和positionY上面
                this.positionX = top;
                this.positionY = left;
                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
              };
              document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
              };
            },
            //修改 展示的数据
            hosueShowY () {
                this.appendHouse = true
                var datas = {
                    shId: this.$route.params.id
                }
                this.$http.post(myHost+'myh_management/selectOnesearchHouse',datas).then((response) => {
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
                            console.log(views)
                            // this.houseCode ()
                            this.ruleForm.name = views.sellerName
                            //男女
                            for (let i = 0; i < this.optionsage.length; i++) {
                                if (this.optionsage[i].value == views.sellerSex) {
                                    this.ruleForm.ages = this.optionsage[i].label
                                    console.log(this.ruleForm.ages)
                                }
                            }
                            this.ruleForm.phone = views.sellerMobileOne
                            this.ruleForm.phoneTwo = views.sellerMobileTwo
                            //类型 出售/出租
                            for (let i = 0; i < this.optionsrent.length; i++) {
                                if (this.optionsrent[i].value == views.sellType) {
                                    this.ruleFormTwo.rent = this.optionsrent[i].label
                                    console.log(this.ruleFormTwo.rent)
                                }
                            }
                            this.ruleFormTwo.houseCode = views.houseCode
                            this.ruleFormTwo.price = views.nowPrice
                            this.ruleFormTwo.originalprice = views.originalPrice
                            this.province.value = views.province
                            this.city.value = views.city
                            this.area.value = views.area
                            this.ruleFormTwo.liu = views.communityName
                            //房产类型
                            for (let i = 0; i < this.optionspurpose.length; i++) {
                                if (this.optionspurpose[i].value == views.houseType) {
                                    this.ruleFormTwo.purpose = this.optionspurpose[i].label
                                    console.log(this.ruleFormTwo.purpose)
                                }
                            }
                            this.ruleFormTwo.building = views.buildingNum
                            this.ruleFormTwo.unit = views.unitNum
                            this.ruleFormTwo.floor = views.houseFloor
                            this.ruleFormTwo.hao = views.roomNum
                            this.ruleFormTwo.layers = views.totalFloor
                            this.ruleFormTwo.years = views.constructYear
                            this.ruleFormTwo.shi = views.bedRoom
                            this.ruleFormTwo.ting = views.visitorRoom
                            this.ruleFormTwo.chu = views.cookRoom
                            this.ruleFormTwo.wei = views.toiletRoom
                            this.ruleFormTwo.yang = views.balconyRoom
                            this.ruleFormTwo.acreageone = views.totalMeasure
                            this.ruleFormTwo.acreagetwo = views.userfullMeasure
                            this.ruleFormTwo.timeone = views.entrustTimeStr
                            this.ruleFormTwo.timetwo = views.deliverTimeStr

                            // 是否有税
                            for (let i = 0; i < this.optionstax.length; i++) {
                                if (this.optionstax[i].value == views.houseTax) {
                                    this.ruleFormTwo.tax = this.optionstax[i].label
                                    console.log(this.ruleFormTwo.tax)
                                }
                            }
                            // 朝向
                            for (let i = 0; i < this.optionsorientation.length; i++) {
                                if (this.optionsorientation[i].value == views.houseDirection) {
                                    this.ruleFormTwo.orientation = this.optionsorientation[i].label
                                    console.log(this.ruleFormTwo.orientation)
                                }
                            }
                            // 钥匙
                            for (let i = 0; i < this.optionsmykey.length; i++) {
                                if (this.optionsmykey[i].value == views.houseKey) {
                                    this.ruleFormTwo.mykey = this.optionsmykey[i].label
                                    console.log(this.ruleFormTwo.mykey)
                                }
                            }
                            // 装修
                            for (let i = 0; i < this.optionsrenovation.length; i++) {
                                if (this.optionsrenovation[i].value == views.decoration) {
                                    this.ruleFormTwo.renovation = this.optionsrenovation[i].label
                                    console.log(this.ruleFormTwo.renovation)
                                }
                            }
                            // 产权
                            for (let i = 0; i < this.optionspropertyright.length; i++) {
                                if (this.optionspropertyright[i].value == views.houseRights) {
                                    this.ruleFormTwo.propertyright = this.optionspropertyright[i].label
                                    console.log(this.ruleFormTwo.propertyright)
                                }
                            }
                            // 委托方式
                            for (let i = 0; i < this.optionsentrust.length; i++) {
                                if (this.optionsentrust[i].value == views.entrustType) {
                                    this.ruleFormTwo.entrust = this.optionsentrust[i].label
                                    console.log(this.ruleFormTwo.entrust)
                                }
                            }
                            //  来源
                            for (let i = 0; i < this.optionssource.length; i++) {
                                if (this.optionssource[i].value == views.sourceFrom) {
                                    this.ruleFormTwo.source = this.optionssource[i].label
                                    console.log(this.ruleFormTwo.source)
                                }
                            }
                            //  现状
                            for (let i = 0; i < this.optionsstate.length; i++) {
                                if (this.optionsstate[i].value == views.houseState) {
                                    this.ruleFormTwo.state = this.optionsstate[i].label
                                    console.log(this.ruleFormTwo.state)
                                }
                            }
                            //  状态
                            for (let i = 0; i < this.optionsstateTwo.length; i++) {
                                if (this.optionsstateTwo[i].value == views.sellState) {
                                    this.ruleFormTwo.stateTwo = this.optionsstateTwo[i].label
                                    console.log(this.ruleFormTwo.stateTwo)
                                }
                            }
                            //获取图片展示
                            this.fileList = []
                            for (var i = 0; i < views.imgList.length; i++) {
                               this.fileList.push({url:views.imgList[i],name:views.imgList[i],response:{resultBean:{object:views.imgList[i]}}})
                            }
                            // console.log(this.fileList)
                            //获取图片展示2
                            this.fileListTwo = []
                            if (views.entrustImg =='') {
                                this.fileListTwo = []
                            } else {
                                this.fileListTwo.push({url:views.entrustImg,name:views.entrustImg,response:{resultBean:{object:views.entrustImg}}})
                            }
                            // console.log(this.fileList)
                            this.remarks = views.houseRemarks
                            //不变动传给后台的值
                            this.selectRentUse = views.sellType
                            this.vId = views.sellerSex
                            this.selectPurposetUse = views.houseType
                            this.selectMykeyUse = views.houseKey
                            this.selectOrientationUse = views.houseDirection
                            this.selectTaxUse = views.houseTax
                            this.selectRenovationUse = views.decoration
                            this.optionspropertyrightUse = views.houseRights
                            this.selectEntrustUse = views.entrustType
                            this.selectSourceUse = views.sourceFrom
                            this.selectStateUse = views.houseState
                            this.img = views.imgList
                            this.imgA = []
                            this.img2 = views.entrustImg
                            this.imgB = []
                            // console.log(this.imgB)
                            this.fromCommunity = views.fromCommunity
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
            //queryString 为在框中输入的值
            //callback 回调函数,将处理好的数据推回
            querySearchAsync(queryString, callback) {
                this.xiaoqu = queryString
                var list = [{}];
                 //调用的后台接口
                // console.log(queryString)
                // console.log(callback)
                var data = {
                    communityProvince: this.provincecity,
                    communityCity: this.provincearea,
                    communityArea: this.provincequ,
                    communityName: queryString,
                }
                this.$http.post(myHost+'myh_management/viewNameOfCommunity',data).then((response)=>{
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        //在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
                        // for(let i of response.data){
                        //     i.value = i.communityName;  //将想要展示的数据作为value
                        // }
                        // list = response.data;
                        var data = response.data
                        data = data.resultBean
                        var code = data.code
                        if (code == '0') {
                            console.log(response)
                            var obj = data.object
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].value = obj[i].communityName
                            }
                            list = obj;
                            console.log(list)
                            this.$message({
                                message: '搜索小区成功',
                                type: 'success',
                            });
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else if (code == '1') {
                            this.$message.error(data.message);
                        }
                    }
                    callback(list);
                }).catch((error)=>{
                    console.log(error);
                });
            },
            //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中段字所在的对象
            //循环数据
            handleSelect(item) {
                // console.log(item.commId);
                this.fromCommunity = item.commId
            },
            //下拉框选中事件 出售/出租
            selectRent(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsrent.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectRentUse = vId
                this.ruleFormTwo.originalprice = ''
                this.ruleFormTwo.price = ''
            },
            //编号生成
            // houseCode () {
            //     this.$http.post(myHost+'myh_management/createHouseCode').then((response) => {
            //         if (response.headers['code'] === '3') {
            //             // console.log(response.headers['message'])
            //             this.$router.push('/login');
            //             this.$message.error('登陆超时，请重新登陆');
            //         } else if (response.headers['code'] === '4') {
            //             this.$router.push('/login');
            //             this.$message.error('您的账号在其他地方登陆');
            //         } else {
            //             // console.log(response)
            //             var data = response.data
            //             data = data.resultBean
            //             var code = data.code
            //             if (code == '0') {
            //                 this.ruleFormTwo.numberid = data.object
            //                 this.ruleFormTwo.numbercode = this.ruleFormTwo.numberid
            //                 console.log(this.numberid)
            //                 this.isclick = true
            //             }
            //         }
            //     })
            // },
            //下拉框选中事件 商圈
            selectPurpose(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionspurpose.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectPurposetUse = vId
            },
            //下拉框选中事件 是否有钥匙
            selectMykey(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsmykey.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectMykeyUse = vId
            },
            //下拉框选中事件 是否有税
            selectTax(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionstax.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectTaxUse = vId
            },
            //下拉框选中事件 朝向
            selectOrientation(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsorientation.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectOrientationUse = vId
            },
            //下拉框选中事件 装修
            selectRenovation(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsrenovation.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectRenovationUse = vId
            },
            //下拉框选中事件 产权
            selectPropertyright (vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionspropertyright.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.optionspropertyrightUse = vId
            },
            //下拉框选中事件 委托方式
            selectEntrust(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsentrust.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectEntrustUse = vId
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
                this.selectSourceUse = vId
            },
            //下拉框选中事件 现状
            selectState(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsstate.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectStateUse = vId
            },
            //下拉框选中事件 状态
            selectStateTwo(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsstateTwo.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectStateTwoUse = vId
            },
            //删除成功收回调
            handleRemove(file, fileList) {
                var filelist
                var obj = []
                for (var i = 0; i < fileList.length; i++) {
                    filelist = fileList[i].response.resultBean.object
                    obj.push(filelist)
                }
                console.log(obj);
                var filelist1
                var obj1 = []
                for (var i = 0; i < this.fileList.length; i++) {
                    filelist1 = this.fileList[i].response.resultBean.object
                    obj1.push(filelist1)
                }
                console.log(obj1);
                this.delImg (obj1,obj)
                this.img = obj
                this.$message({
                    message: '删除成功',
                    type: 'success',
                });
            },
            //删除成功收回调
            handleRemoveTwo(file, fileList) {
                var filelist
                var obj = []
                for (var i = 0; i < fileList.length; i++) {
                    filelist = fileList[i].response.resultBean.object
                    obj.push(filelist)
                }
                console.log(obj);
                var filelist1
                var obj1 = []
                for (var i = 0; i < this.fileListTwo.length; i++) {
                    filelist1 = this.fileListTwo[i].response.resultBean.object
                    obj1.push(filelist1)
                }
                console.log(obj1);
                this.delImgTwo (obj1,obj)
                this.img2 = obj1[1]
                this.$message({
                    message: '删除成功',
                    type: 'success',
                });
            },
            delImg (array,array2) {
                var arr3 =[];
                for (let key in array) {
                    var stra = array[key];
                    var count = 0;
                    for(var j= 0; j < array2.length; j++){
                        var strb = array2[j];
                        if(stra == strb) {
                            count++;
                        }
                    }
                    if(count===0) {
                        //表示数组1的这个值没有重复的，放到arr3列表中
                        arr3.push(stra);
                    }
                }
                this.imgA = arr3
                console.log(this.imgA)
            },
            delImgTwo (array,array2) {
                var arr3 =[];
                for (let key in array) {
                    var stra = array[key];
                    var count = 0;
                    for(var j= 0; j < array2.length; j++){
                        var strb = array2[j];
                        if(stra == strb) {
                            count++;
                        }
                    }
                    if(count===0) {
                        //表示数组1的这个值没有重复的，放到arr3列表中
                        arr3.push(stra);
                    }
                }
                this.imgB = arr3
                console.log(this.imgB)
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.response.resultBean.object;
                this.dialogVisible = true;
            },
            // 上传成功后的回调
            uploadSuccess (response, file, fileList) {
                console.log(file)
                // console.log(getCookie('JSESSIONID'))
                var filelist
                var obj = []
                for (var i = 0; i < fileList.length; i++) {
                    filelist = fileList[i].response.resultBean.object
                    obj.push(filelist)
                }
                console.log(obj);
                this.img = obj
                this.$message({
                    message: '上传成功',
                    type: 'success',
                });
            },
            // 上传成功后的回调
            uploadSuccessTwo (response, file, fileList) {
                // if (response.headers['code'] === '3') {
                //     // console.log(response.headers['message'])
                //     this.$router.push('/login');
                //     this.$message.error('登陆超时，请重新登陆');
                // } else if (response.headers['code'] === '4') {
                //     this.$router.push('/login');
                //     this.$message.error('您的账号在其他地方登陆');
                // } else {
                    // console.log(obj);
                    this.img2 = file.response.resultBean.object
                    this.$message({
                        message: '上传成功',
                        type: 'success',
                    });
                // }
            },
            // 上传前对文件的大小的判断
            beforeAvatarUpload (file) {
                const isJPG = file.type === 'image/jpeg'
                const isJPG1 = file.type === 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG && !isJPG1) {
                    this.$message.error('上传模板只能是 jpeg、png 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传模板大小不能超过 2MB!')
                }
                return (isJPG || isJPG1) && isLt2M
            },
            // 上限设置
            uploadMax (files, fileList) {
                // this.disabledUpload = true
                this.$message.error('最多上传 10 张图片')
            },
            // 上限设置
            uploadMaxTwo (files, fileList) {
                // this.disabledUpload = true
                this.$message.error('最多上传 1 张图片')
            },
            //产房查重
            // houseRepeat () {
            //     var data = {
            //         fromCommunity: this.fromCommunity,
            //         buildingNum: this.ruleFormTwo.building,
            //         unitNum: this.ruleFormTwo.unit,
            //         houseFloor: this.ruleFormTwo.floor,
            //         roomNum: this.ruleFormTwo.hao,
            //     }
            //     this.$http.post(myHost+'myh_management/checkRepeatHouse',data).then((response) => {
            //         if (response.headers['code'] === '3') {
            //             // console.log(response.headers['message'])
            //             this.$router.push('/login');
            //             this.$message.error('登陆超时，请重新登陆');
            //         } else if (response.headers['code'] === '4') {
            //             this.$router.push('/login');
            //             this.$message.error('您的账号在其他地方登陆');
            //         } else {
            //             var data = response.data
            //             data = data.resultBean
            //             var code = data.code
            //             if (code == '0') {
            //                 this.$message({
            //                     message: '没有重复房源',
            //                     type: 'success',
            //                 });
            //             } else {
            //                 this.$message.error(data.message)
            //             }
            //         }
            //     })
            // },
            // 发布验证
            clearSHowYes (formName) {
                if ( !this.ruleForm.name) {
                    this.$message.error('请输入姓名');
                    return
                }
                if ( !this.ruleForm.ages) {
                    this.$message.error('请输入性别');
                    return
                }
                if ( !this.ruleForm.phone) {
                    this.$message.error('请输入手机号码');
                    return
                }
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // var vId3=this.vId3.map(Number)
                        console.log(this.imgD)
                        var forms = {
                            sellerName: this.ruleForm.name,
                            sellerSex: this.vId,
                            sellerMobileOne: this.ruleForm.phone,
                            sellerMobileTwo: this.ruleForm.phoneTwo,
                            shId: this.$route.params.id,
                            fromCommunity: this.fromCommunity,
                            sellType: this.selectRentUse,
                            nowPrice: this.ruleFormTwo.price,
                            originalPrice: this.ruleFormTwo.originalprice,
                            houseType: this.selectPurposetUse,
                            buildingNum: this.ruleFormTwo.building,
                            unitNum: this.ruleFormTwo.unit,
                            houseFloor: this.ruleFormTwo.floor,
                            roomNum: this.ruleFormTwo.hao,
                            totalFloor: this.ruleFormTwo.layers,
                            constructYear: this.ruleFormTwo.years,
                            bedRoom: this.ruleFormTwo.shi,
                            visitorRoom: this.ruleFormTwo.ting,
                            cookRoom: this.ruleFormTwo.chu,
                            toiletRoom: this.ruleFormTwo.wei,
                            balconyRoom: this.ruleFormTwo.yang,
                            totalMeasure: this.ruleFormTwo.acreageone,
                            userfullMeasure: this.ruleFormTwo.acreagetwo,
                            houseTax: this.selectTaxUse,
                            houseKey: this.selectMykeyUse,
                            houseDirection: this.selectOrientationUse,
                            decoration: this.selectRenovationUse,
                            houseRights: this.optionspropertyrightUse,
                            entrustType: this.selectEntrustUse,
                            deliverTimeStr: this.ruleFormTwo.timetwo,
                            houseState: this.selectStateUse,
                            sourceFrom: this.selectSourceUse,
                            addImgList: this.img,
                            deleteImgList: this.imgA,
                            entrustImg: this.img2,
                            deleteEntrustImgList: this.imgB,
                            houseRemarks: this.remarks,

                        }
                        that.$http.post(myHost+'myh_management/updateSecondHouse',forms).then((response) => {
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
                                    this.viewHouse ()
                                    that.$message({
                                        message: '修改成功',
                                        type: 'success',
                                    });
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
            clearSHowNo () {
                this.appendHouse = false;
                this.$message({
                    message: '取消修改',
                    type: 'warning'
                });
                this.isclick = false
            },
            //跟进显示
            isShow () {
                this.appendFollow = true
                this.isYesNo = true
            },
            // 添加跟进
            clearShowYesTwo (formName) {
                var input  = /^[\s]*$/;
                if (input.test(this.ruleFormS.neirong)) {
                    this.$message.error('跟进内容不能为空')
                    return
                }
                var reg = /^[\u4e00-\u9fa5]+$/
                if (!reg.test(this.ruleFormS.neirong)) {
                    if (this.ruleFormS.neirong.length < 5) {
                        this.$message.error('跟进内容不能少于5个字符')
                        return
                    }
                } else {
                    var strLen = this.ruleFormS.neirong.match(/[\u4e00-\u9fa5]/g).length
                    if (strLen < 5) {
                        this.$message.error('跟进内容不能少于5个字')
                        return
                    }
                }

                var that = this
                // console.log(this.$refs[formName])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var classes = this.current+1
                        var up = {
                            hHouseId: this.$route.params.id,
                            hFollows: this.ruleFormS.neirong,
                            hFollowMethod: classes,
                        }
                        this.$http.post(myHost+'myh_management/insertHouseFollow',up).then((response) => {
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
                                // console.log(code)
                                if (code == '0') {
                                    that.$message({
                                        message: data.message,
                                        type: 'success',
                                    });
                                    this.followView ()
                                    this.appendFollow = false
                                    this.ruleFormS.neirong = ''
                                    this.current = 0
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
                this.$http.post(myHost+'myh_management/myFollowOfHouse',datas).then((response) => {
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
            //点击展示卖家信息
            viewsellersTwo () {
                this.appendFollow = true
                this.viewsellers ()
            },
            viewsellers (activeNames) {
                this.isYesNo = false
                // console.log(activeNames)
                var datas = {
                    sellerId: this.sellerId,
                    shId: this.$route.params.id
                }
                this.$http.post(myHost+'myh_management/selectOneSeller',datas).then((response) => {
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
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
                        var viewseller = data.object
                        console.log(viewseller)
                        this.viewseller = viewseller
                        if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //展示信息
            viewHouse () {
                var datas = {
                    shId: this.$route.params.id
                }
                this.$http.post(myHost+'myh_management/secondHouseDetail',datas).then((response) => {
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
                        if (code == '0') {
                            this.sellerId = data.object.sellerId
                            this.view = data.object
                            this.names = data.object.communityName
                            this.maps = data.object.address
                            this.img1 = data.object.imgList
                            this.isYN = getCookie('isYN')
                            this.viewsellers()
                            if (this.img1.length == 0) {
                                this.img1 = ["static/img/img.jpg"]
                            }
                            this.loadmap ()
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            // 地图
            loadmap () {
                var map = new BMap.Map('allmap')
                map.centerAndZoom ('承德', 12) // 这里是初始地图所显示的城市
                // map.enableScrollWheelZoom()   //启用滚轮放大缩小，默认禁用
                map.enableContinuousZoom()  //启用地图惯性拖拽，默认禁用
                this.searchByStationName()
            },
            searchByStationName () {
                var map = new BMap.Map('allmap')
                map.centerAndZoom ('承德', 12) // 这里是初始地图所显示的城市
                // map.enableScrollWheelZoom()   //启用滚轮放大缩小，默认禁用
                map.enableContinuousZoom()  //启用地图惯性拖拽，默认禁用
                var localSearch = new BMap.LocalSearch(map)
                localSearch.enableAutoViewport() //允许自动调节窗体大小
                var keyword
                var mynames
                map.clearOverlays();//清空原来的标注
                keyword = this.maps //this.myads
                // var keyword = document.getElementById("text_").value;
                var that = this
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    // console.log(searchResult)
                    var sContent =
                      "<div>" + "<h4 style='margin:0 0 5px 0;font-weight:bold; font-size:20px;padding:0.2em 0'>"+that.names+"</h4>" +
                      "<img style='float:right;margin:4px' id='imgDemo' src='"+that.img1[0]+"' width='139' height='104'/>" +
                      "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>地址："+searchResult.keyword+"</p>" +
                      "</div>"
                    var poi = searchResult.getPoi(0)
                    map.centerAndZoom(poi.point, 16)
                    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat)) // 创建标注，为要查询的地方对应的经纬度
                    map.addOverlay(marker)
                    var infoWindow = new BMap.InfoWindow("<p style='font-size:14px;'>" + sContent + "</p>")
                    //marker.addEventListener("click", function () { this.openInfoWindow(infoWindow) })
                    marker.openInfoWindow(infoWindow); //开启信息窗口
                    marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                })
                localSearch.search(keyword)
            },
        },
        watch:{
            $route(to,from){
            // console.log(to.path);
                if (to.path) {
                    this.viewHouse ()
                }
            }
        },
    };

</script>

<style>
    .crumbs{
        padding: 0;
    }
    .contents .banner{
        padding: 20px 10px;
        background: #fff;
        margin-bottom: 10px;
    }
    .contents .banner .el-row{
        padding: 5px 0;
    }
    .contents .banner .el-collapse-item__header{
        font-size: 15px;
        color: #000;
        text-align: center;
    }
    .contents .banner .el-collapse-item__header i{
        margin:0 auto;
        display: block;
    }
    .contents .navs{
        padding: 20px 10px;
        background: #fff;
        margin-bottom: 10px;
    }
    .contents .navs .el-row{
        padding: 5px 0;
    }
    .contents .navs .el-collapse-item__header{
        font-size: 18px;
        color: #e54648;
    }
    .contents .myMap{
        width: 100%;
        height: 300px;
        padding: 0 0;
        background: #fff;
        margin-bottom: 10px;
    }
    .contents .myMap #allmap{
        height: 300px;
    }
    .contents .comment{
        padding: 0 10px;
        background: #fff;
    }
    .contents .comment .comment-text{
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    .contents .comment .comment-text .comment-head{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #eee;
        overflow: hidden;
        margin: 0 auto;
    }
    .contents .comment .comment-text .comment-head img{
        width: 100%;
    }
    .contents .comment .comment-text .el-button{
        padding: 18px 25px;
    }
    .contents .comment .comment-text-show{
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    .contents .comment .comment-text-show .comment-head{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #eee;
        overflow: hidden;
        margin: 0 auto;
    }
    .contents .comment .comment-text-show .comment-head img{
        width: 100%;
    }
    .contents .comment .comment-text-show .comment-name{
        font-size: 20px;
        color: #000;
        padding-bottom: 5px;
    }
    .contents .comment .comment-text-show .comment-name span{
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
        margin: 70px auto;
        padding: 20px;
        background: #fff;
    }
    .append-house .append-information .classes{
        padding: 2px 10px;
        background: #e4e4e4;
        color: #fff;
        font-size: 14px;
        margin-right: 5px;
        cursor: pointer;
    }
    .append-house .append-information .infor-title{
        padding-bottom: 5px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-size: 16px;
    }
    .append-house .append-information .color{
        background: #f9eded;
        color: #a00000;
        font-size: 14px;
        margin-right: 5px;
        cursor: pointer;
        transition: all 1s ease;
    }
    .append-house #append-informationTwo{
        position: relative;
        width: 55%;
        height: auto;
        padding: 20px;
        background: #fff;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
        padding-top: 50px;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .append-house #append-informationTwo .infor-title{
        line-height: 50px;
        border-top: 1px solid #ccc;
    }
    .append-house #append-informationTwo #append-informationTwoTwo{
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0;
        background: #fff;
    }
    .append-house #append-informationTwo .append-p{
        cursor: default;
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99;
        color: #ccc;
        cursor: move;
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
        margin: 70px auto;
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
    .qupd .el-input__inner{
        padding: 0;
    }
    .el-upload--text{
        width: 100%;
    }
    .el-upload-dragger{
        width: 100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: auto;
    }
    .el-input--prefix .el-input__inner{
        padding-right: 0;
    }
    .v-modal{
        display: none;
    }
    .el-dialog__wrapper{
        background: rgba(0,0,0,0.6)
    }
    .setFont{
        font-size: 14px;
        color: #ccc;
    }
    .comment-con-list{
        font-size: 18px;
        color: #666;
        width: 100%;
        white-space: normal;
        word-break: break-all;
    }
    .el-select{
        width: 100%;
    }
    .el-autocomplete{
        width: 100%;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
    }
</style>
