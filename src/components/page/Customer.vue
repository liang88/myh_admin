<template>
    <div class="customer">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 客源管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!-- 选显卡 -->
        <el-tabs class="tags-left" type="border-card" v-model="activeName2" @tab-click="handleClick">
            <el-tab-pane name="1" label="所有">
<!-- 筛选 -->
                <div class="screen-one-wap" >
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor1':bgcolor1}" @click="qgShow(1)" >求购</div>
                        <span class="qgList" v-show="qgShows" >
                            <p v-for="(todo,index) in todos" @click="addClass(index)" :class="{color:index == current}">{{todo.text}}</p>
                        </span>
                    </div>
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor2':bgcolor2}" @click="qzShow(2)" >求租</div>
                        <span class="qzList" v-show="qzShows" >
                            <p v-for="(todo,index) in todosTwo" @click="addClassTwo(index)" :class="{color:index == currentTwo}">{{todo.text}}</p>
                        </span>
                    </div>
                </div>
<!-- 表单筛选 -->
                <div class="screen-two-wap">
                    <el-form :model="ruleTwoForm" :rules="rulesTwo" ref="ruleTwoForm">
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>城市:</p>
                            </el-col>
                            <el-col :span="4" id="sheng">
                                <el-form-item label="" prop="searchProvince">
                                    <el-select v-model="searchProvince.value" @focus="searchsProvince" @change="searchsCity" placeholder="选择省" >
                                        <el-option v-for="item in searchProvince" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="searchCity">
                                    <el-select v-model="searchCity.value" @change="searchsArea" placeholder="选择市">
                                        <el-option v-for="(item,index) in searchCity" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="searchArea">
                                    <el-select v-model="searchArea.value" @change="searchsQu" placeholder="选择市">
                                        <el-option v-for="(item,index) in searchArea" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="time">
                                    <el-select v-model="ruleTwoForm.time" @change="searchTime" placeholder="选择时间">
                                        <el-option v-for="item in optionstime" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >
                                面积:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="minarea">
                                    <el-input v-model="ruleTwoForm.minarea" placeholder="最小面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxarea">
                                    <el-input v-model="ruleTwoForm.maxarea" placeholder="最大面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>期望价格:</p>
                            </el-col>

                            <el-col :span="2">
                                <el-form-item label="" prop="minprice">
                                    <el-input v-model="ruleTwoForm.minprice" placeholder="最小价格"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxprice">
                                    <el-input v-model="ruleTwoForm.maxprice" placeholder="最大价格"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >户型:</el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemin">
                                    <el-input v-model="ruleTwoForm.housetypemin" placeholder="最小几室"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemax">
                                    <el-input v-model="ruleTwoForm.housetypemax" placeholder="最大几室"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >级别:</el-col>
                            <el-col :span="2">
                            <el-form-item label="" prop="level">
                                <el-select v-model="ruleTwoForm.level" @change="selectLevel" placeholder="A/B/C">
                                    <el-option v-for="item in optionslevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            </el-col>

                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >房源编号:</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="usercode">
                                    <el-input v-model.number="ruleTwoForm.usercode" placeholder="房源编号"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="1">
                                <el-button type="info" @click="viewSearch" style="display: block;margin: 0 auto;" >搜索</el-button>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="appendSHow" style="float:right;" >添加客源</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
<!-- table表格/房源展示 -->
                <div class="table-wap">
                    <template>
                        <el-table border :data="view" style="width: 100%; text-align:center; ">
                            <el-table-column type="index" :index="1" width="40" ></el-table-column>
                            <el-table-column prop="realName" label="姓名"></el-table-column>
                            <el-table-column prop="sexStr" label="性别"></el-table-column>
                            <el-table-column prop="bLevel" label="级别"></el-table-column>
                            <el-table-column prop="measure" label="面积 ㎡"></el-table-column>
                            <el-table-column prop="comeFrom" label="来源"></el-table-column>
                            <el-table-column prop="houseTypeStr" label="用途" width="300" ></el-table-column>
                            <el-table-column prop="createTime" label="创建日期" width="150"></el-table-column>
                            <el-table-column prop="" label="操作">
                            <!--     <template slot-scope="scope">
                                    <el-button size="mini" >编辑</el-button>
                                    <el-button size="mini" type="danger" >删除</el-button>
                                </template> -->
                                <template slot-scope="scope">
                                    <router-link tag="div" :to="`customercontent/${scope.row.userId}`" style="cursor: pointer;" >
                                        查看
                                    </router-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
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
            </el-tab-pane>
            <el-tab-pane name="0" label="我的">
<!-- 筛选 -->
                <div class="screen-one-wap" >
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor1':bgcolor1}" @click="qgShow(1)" >求购</div>
                        <span class="qgList" v-show="qgShows" >
                            <p v-for="(todo,index) in todos" @click="addClass(index)" :class="{color:index == current}">{{todo.text}}</p>
                        </span>
                    </div>
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor2':bgcolor2}" @click="qzShow(2)" >求租</div>
                        <span class="qzList" v-show="qzShows" >
                            <p v-for="(todo,index) in todosTwo" @click="addClassTwo(index)" :class="{color:index == currentTwo}">{{todo.text}}</p>
                        </span>
                    </div>
                </div>
<!-- 表单筛选 -->
                <div class="screen-two-wap">
                    <el-form :model="ruleTwoForm" :rules="rulesTwo" ref="ruleTwoForm">
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>城市:</p>
                            </el-col>
                            <el-col :span="4" id="sheng">
                                <el-form-item label="" prop="searchProvince">
                                    <el-select v-model="searchProvince.value" @focus="searchsProvince" @change="searchsCity" placeholder="选择省" >
                                        <el-option v-for="item in searchProvince" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="searchCity">
                                    <el-select v-model="searchCity.value" @change="searchsArea" placeholder="选择市">
                                        <el-option v-for="(item,index) in searchCity" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="searchArea">
                                    <el-select v-model="searchArea.value" @change="searchsQu" placeholder="选择市">
                                        <el-option v-for="(item,index) in searchArea" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="time">
                                    <el-select v-model="ruleTwoForm.time" @change="searchTime" placeholder="选择时间">
                                        <el-option v-for="item in optionstime" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >
                                面积:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="minarea">
                                    <el-input v-model="ruleTwoForm.minarea" placeholder="最小面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxarea">
                                    <el-input v-model="ruleTwoForm.maxarea" placeholder="最大面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>期望价格:</p>
                            </el-col>

                            <el-col :span="2">
                                <el-form-item label="" prop="minprice">
                                    <el-input v-model="ruleTwoForm.minprice" placeholder="最小价格"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxprice">
                                    <el-input v-model="ruleTwoForm.maxprice" placeholder="最大价格"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >户型:</el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemin">
                                    <el-input v-model="ruleTwoForm.housetypemin" placeholder="最小几室"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemax">
                                    <el-input v-model="ruleTwoForm.housetypemax" placeholder="最大几室"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >级别:</el-col>
                            <el-col :span="2">
                            <el-form-item label="" prop="level">
                                <el-select v-model="ruleTwoForm.level" @change="selectLevel" placeholder="A/B/C">
                                    <el-option v-for="item in optionslevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            </el-col>

                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >房源编号:</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="usercode">
                                    <el-input v-model.number="ruleTwoForm.usercode" placeholder="房源编号"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="1">
                                <el-button type="info" @click="viewSearch" style="display: block;margin: 0 auto;" >搜索</el-button>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="appendSHow" style="float:right;" >添加客源</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
<!-- table表格/房源展示 -->
                <div class="table-wap">
                    <template>
                        <el-table border :data="view" style="width: 100%; text-align:center; ">
                            <el-table-column type="index" :index="1" width="40" ></el-table-column>
                            <el-table-column prop="realName" label="姓名"></el-table-column>
                            <el-table-column prop="sexStr" label="性别"></el-table-column>
                            <el-table-column prop="bLevel" label="级别"></el-table-column>
                            <el-table-column prop="measure" label="面积 ㎡"></el-table-column>
                            <el-table-column prop="comeFrom" label="来源"></el-table-column>
                            <el-table-column prop="houseTypeStr" label="用途" width="300" ></el-table-column>
                            <el-table-column prop="createTime" label="创建日期" width="150"></el-table-column>
                            <el-table-column prop="" label="操作">
                            <!--     <template slot-scope="scope">
                                    <el-button size="mini" >编辑</el-button>
                                    <el-button size="mini" type="danger" >删除</el-button>
                                </template> -->
                                <template slot-scope="scope">
                                    <router-link tag="div" :to="`customercontent/${scope.row.userId}`" style="cursor: pointer;" >
                                        查看
                                    </router-link>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
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
            </el-tab-pane>
        </el-tabs>
        <transition name="el-zoom-in-center">
            <div class="append-house" v-show="appendHouse" >
                <div class="append-information">
                    <div class="infor-title">
                        登记客源
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
                                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>性别:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="ages">
                                    <el-select v-model="ruleForm.ages" @change="selectAge" placeholder="男/女">
                                    <!--     <el-option label="男" value="1"></el-option>
                                        <el-option label="女" value="2"></el-option>
                                        <el-option label="妖" value="3"></el-option> -->
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
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>城市:</p>
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
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>户型:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="myShi">
                                    <el-input v-model.number="ruleForm.myShi" placeholder="室 (数字)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>类型:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="types">
                                    <el-select v-model="ruleForm.types" @change="selectTypes" placeholder="求租/求购">
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
                                    <el-select v-model="ruleForm.source" @change="selectSource" placeholder="58/来电">
                                        <el-option v-for="item in optionssource" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>级别:</p>
                            </el-col>
                            <el-col :span="3">
                              <el-form-item label="" prop="level">
                                    <el-select v-model="ruleForm.level" @change="selectLevel" placeholder="A/B/C">
                                        <el-option v-for="item in optionslevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>用途:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="purpose">
                                    <el-select v-model="ruleForm.purpose" @change="selectPurpose" multiple collapse-tags placeholder="住宅/商铺(多选)">
                                        <el-option v-for="item in optionspurpose" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>期望价格:</p>
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
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>面积:</p>
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
                                <el-button type="danger" :plain="true" @click="clearSHowYes('ruleForm')" style="display: block; margin: 0 auto; padding: 10px 35px; " >发布</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="info" :plain="true" @click="clearSHowNo('ruleForm')" style="display: block; margin: 0 auto; padding: 10px 35px; " >取消</el-button>
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
    export default {
        name: 'customer',
        data() {
            return {

                appendHouse: false,
// 筛选top
                viewAll: 10,
                currentpage: 1,
                pageSize: 10,
                diyige: 1,
                activeName2: '1',
                qgShows: false,
                qzShows: false,
                qgqzData: '',
                shangData: '',
                bgcolor1: false,
                bgcolor2: false,
                current: 0,
                currentTwo: 0,
                view: [],
                searchProvince: [],
                datacity: '',
                searchCity: [],
                dataarea: '',
                searchArea: [],
                dataqu: '',
                searchId1:'',
                isHouseAll: '1',
                ruleTwoForm: {
                    time: '',
                    minarea: '',
                    maxarea: '',
                    minprice:'',
                    maxprice:'',
                    housetypemin: '',
                    housetypemax: '',
                    level: '',
                    usercode: '',
                },
                rulesTwo: {
                },
                todos: [
                    {text: '所有'},
                    {text: '住宅'},
                    {text: '商铺'},
                    {text: '写字楼'},
                    {text: '商住'},
                    {text: '网点'},
                    {text: '厂房'},
                    {text: '写厂'},
                    {text: '铺厂'},
                    {text: '仓库'},
                    {text: '地皮'},
                    {text: '车位'},
                    {text: '其他'},
                ],
                todosTwo: [
                    {text: '所有'},
                    {text: '住宅'},
                    {text: '商铺'},
                    {text: '写字楼'},
                    {text: '商住'},
                    {text: '网点'},
                    {text: '厂房'},
                    {text: '写厂'},
                    {text: '铺厂'},
                    {text: '仓库'},
                    {text: '地皮'},
                    {text: '车位'},
                    {text: '其他'},
                ],
                //全部时间
                optionstime: [{
                    value: '1',
                    label: '最近三天'
                }, {
                    value: '2',
                    label: '最近一周'
                }, {
                    value: '3',
                    label: '最近一月'
                }, {
                    value: '4',
                    label: '最近三月'
                }, {
                    value: '5',
                    label: '最近半年'
                }, {
                    value: '6',
                    label: '最近一年'
                }],
//筛选top end
//添加客源
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
                //用途
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
// 添加客源 end

            }
        },
        created () {

        },
        computed: {

        },
        mounted () {
            // this.viewTable ()
            this.viewSearch ()
            this.searchsProvince ()
        },
        methods: {
            handleCurrentChange(val) {
                this.currentpage = val
                // this.viewTable ()
                this.viewSearch ()
            },
            //所有/我的
            handleClick: function (tab, event) {
                // console.log(tab.index)
                this.isHouseAll = tab.name
                this.view = []
                this.searchProvince = []
                this.datacity = ''
                this.searchCity = []
                this.dataarea = ''
                this.searchArea = []
                this.dataqu = ''
                this.searchId1 = ''
                this.ruleTwoForm.time = ''
                this.ruleTwoForm.minarea = ''
                this.ruleTwoForm.maxarea = ''
                this.ruleTwoForm.minprice = ''
                this.ruleTwoForm.maxprice = ''
                this.ruleTwoForm.housetypemin = ''
                this.ruleTwoForm.housetypemax = ''
                this.ruleTwoForm.level = ''
                this.ruleTwoForm.usercode = ''
                // console.log(this.isHouseAll)
                this.viewSearch ()
            },
            //求购/求组切换
            qgShow (qgShow) {
                this.qgqzData = qgShow
                this.qgShows = true
                this.qzShows = false
                this.bgcolor1 = true
                this.bgcolor2 = false
            },
            qzShow (qzShow) {
                this.qgqzData = qzShow
                this.qgShows = false
                this.qzShows = true
                this.bgcolor1 = false
                this.bgcolor2 = true
            },
            addClass (index) {
                this.current=index;
                this.shangData = this.current
                console.log(this.shangData)
            },
            addClassTwo (index) {
                this.currentTwo=index;
                this.shangData = this.currentTwo
                console.log(this.shangData)
            },
            //search省
            searchsProvince (vId) {
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
                        this.searchProvince = data.object
                        // console.log(this.province)
                        console.log(myCode)
                        if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //search市
            searchsCity (vId) {
                let obj = {}
                obj = this.searchProvince.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.datacity = vId
                var shi = {
                    province: this.datacity
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
                        this.searchCity = data.object
                        console.log(this.searchCity)
                        console.log(myCode)
                          if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //search区
            searchsArea (vId,vId1) {
                let obj = {}
                obj = this.searchCity.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.dataarea = vId
                var qu = {
                    province: this.datacity,
                    city: this.dataarea
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
                        this.searchArea = data.object
                        console.log(this.searchArea)
                        console.log(myCode)
                        console.log(myCode)
                        if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //search
            searchsQu (vId) {
                let obj = {}
                obj = this.searchArea.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.dataqu = vId
            },
            //下拉框选中事件 选择时间
            searchTime(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionstime.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.searchId1 = vId
            },
            //搜索展示
            viewSearch () {
                // if (this.shangData = '0') {
                //     this.shangData = null
                // }
                console.log(this.shangData)
                var tab = {
                    page: {
                        pageNum: this.currentpage,
                        pageSize: this.pageSize,
                    },
                    bPublic: this.isHouseAll,
                    buyType: this.qgqzData,
                    houseType: this.shangData,
                    province: this.datacity,
                    city: this.dataarea,
                    area: this.dataqu,
                    period: this.searchId1,
                    fromMeasure: this.ruleTwoForm.minarea,
                    toMeasure: this.ruleTwoForm.maxarea,
                    fromPrice: this.ruleTwoForm.minprice,
                    toPrice: this.ruleTwoForm.maxprice,
                    fromBedRoom: this.ruleTwoForm.housetypemin,
                    toBedRoom: this.ruleTwoForm.housetypemax,
                    bLevel: this.objLabel1,
                    userCode: this.ruleTwoForm.usercode,
                }
                this.$http.post(myHost+'myh_management/viewBuyer',tab).then((response) => {
                    if (response.headers['code'] === '3') {
                        // console.log(response.headers['message'])
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        console.log(data)
                        data = data.resultBean
                        var code = data.code
                        if (code == '0') {
                            data = data.object
                            this.viewAll = data.total
                            this.view = data.list
                            console.log(this.view)
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.view = []
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            //客源展示
            // viewTable () {
            //     var tab = {
            //         page: {
            //             pageNum: this.currentpage,
            //             pageSize: this.pageSize,
            //         },
            //         bPublic: this.isHouseAll,
            //     }
            //     this.$http.post(myHost+'myh_management/viewBuyer',tab).then((response) => {
            //         var data = response.data
            //         // console.log(data)
            //         data = data.resultBean
            //         var code = data.code
            //         if (code == '0') {
            //             data = data.object
            //             this.viewAll = data.total
            //             console.log(this.viewAll)
            //             this.view = data.list
            //         } else {
            //             this.$message.error(data.message);
            //         }
            //     })
            // },
            //table指定格子
            // cellStyle({row, column, rowIndex, columnIndex}){
            //     if(rowIndex === 0 && columnIndex === 1){ //指定坐标
            //         return 'background-color:#ccc'
            //     }else{
            //         return ''
            //     }
            // },
            // 显示添加客源
            appendSHow () {
                this.appendHouse = true;
                // this.selectProvince()
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
            // 发布验证
            clearSHowYes (formName) {
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var vId3=this.vId3.map(Number)
                        var forms = {
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
                        that.$http.post(myHost+'myh_management/saveBuyer',forms).then((response) => {
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
                                    that.$message({
                                        message: '发布成功',
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
            // 隐藏添加客源 取消发布
            clearSHowNo (formName) {
                this.$refs[formName].resetFields()
                this.appendHouse = false;
                this.$message({
                    message: '取消发布',
                    type: 'warning'
                });
                this.ruleForm.name = ''
                this.ruleForm.ages = ''
                this.ruleForm.phone = ''
                this.ruleForm.phoneTwo = ''
                this.ruleForm.types = ''
                this.ruleForm.source = ''
                this.ruleForm.purpose = []
                this.ruleForm.level = ''
                this.ruleForm.myShi = ''
                this.ruleForm.myTing = ''
                this.ruleForm.myChu = ''
                this.ruleForm.myWei = ''
                this.ruleForm.myYang = ''
                this.ruleForm.minarea = ''
                this.ruleForm.maxarea = ''
                this.ruleForm.minprice = ''
                this.ruleForm.maxprice = ''
                this.ruleForm.remark = ''
                this.provincecity = ''
                this.provincearea = ''
                this.provincequ = ''
            },
        }
    };

</script>

<style>
/*选项卡*/
    .tags-left .el-tabs__nav{
        margin-left: 0;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        color: #9b261d;
        border-left-color: #9b261d;
        border-right-color: #9b261d;
        border-top-color: #9b261d;
        border-bottom-color: none;
        font-size: 18px;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
        color: #9b261d;
    }
    .el-tabs--border-card>.el-tabs__header{
        border-bottom: none;
    }
/*筛选*/
    .screen-one{
        width: 100%;
        padding: 10px 0;
    }
    .screen-one div{
        float: left;
        font-size: 16px;
        padding: 10px 30px;
        background: #ccc;
        color: #fff;
        cursor: pointer;
    }
    .screen-one:nth-child(2) div{
        float: left;
        font-size: 16px;
        padding: 10px 30px;
        background: #ccc;
        color: #fff;
    }
    .screen-one p{
        float: left;
        margin-left: 40px;
        cursor: pointer;
        font-size: 16px;
        color: #666;
        line-height: 42px;
    }
    .screen-one .color{
        color: #9b261d;
    }
    .screen-one .bgcolor1{
        background: #9b261d;
    }
    .screen-one:nth-child(2) .bgcolor2{
        background: #9b261d;
    }
    .screen-one-wap{
        padding-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }
    .screen-two-wap{
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
    }
    .qupd input{
        padding: 0;
        text-align: center;
    }
/*table表格*/
    .table-wap{
        width: 100%;
    }
    .cell{
        text-align: center;

    }
    .el-tabs--border-card>.el-tabs__header{
        background: #f0f0f0;
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
    .qupd .el-input__inner{
        padding: 0;
    }
    .el-upload--text{
        width: 100%;
    }
    .el-upload-dragger{
        width: 100%;
    }
</style>
