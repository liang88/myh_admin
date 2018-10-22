<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 房源管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!-- 选显卡 -->
        <el-tabs class="tags-left" type="border-card" v-model="activeName2" @tab-click="handleClick">
            <el-tab-pane name="1" label="所有">
<!-- 筛选 -->
                <div class="screen-one-wap" >
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor1':bgcolor1}" @click="qgShow(1)" >出售</div>
                        <span class="qgList" v-show="qgShows" >
                            <p v-for="(todo,index) in todos" @click="addClass(index)" :class="{color:index == current}">{{todo.text}}</p>
                        </span>
                    </div>
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor2':bgcolor2}" @click="qzShow(2)" >出租</div>
                        <span class="qzList" v-show="qzShows" >
                            <p v-for="(todo,index) in todosTwo" @click="addClassTwo(index)" :class="{color:index == currentTwo}">{{todo.text}}</p>
                        </span>
                    </div>
                </div>
<!-- 表单筛选 -->
                <div class="screen-two-wap">
                    <el-form :model="ruleFormThree" :rules="rulesThree" ref="ruleFormThree">
                        <el-row :gutter="5" style="border-bottom: 1px solid #ededed;">
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="seachAll">
                                    <el-select v-model="ruleFormThree.seachAll" @change="selectSeachAll" >
                                        <el-option v-for="item in optionsseachAll" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="" prop="seachneirong">
                                    <el-input v-model="ruleFormThree.seachneirong" placeholder="请输入小区名，小区简称，房源编号，经纪人名字"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="viewSeachAll" style="float:left;" >搜索</el-button>
                            </el-col>
                            <el-col :span="4">&nbsp;</el-col>
                            <el-col v-if="isYN  === '0'" :span="3">
                                <el-form-item label="" prop="searchTime">
                                    <el-select v-model="searchTime" @change="selectSearchTime" placeholder="请选择导出时间">
                                        <el-option v-for="item in optionssearchTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col v-else :span="3" style="line-height: 32px; text-align: center; color: #999;" >
                                &nbsp;
                            </el-col>
                            <el-col v-if="isYN  === '0'" :span="2" style="line-height: 32px; text-align: center; color: #999;" >
                                <el-button type="info" @click="export_Excel" style="display: block;margin: 0 auto;" >导出</el-button>
                            </el-col>
                            <el-col v-else :span="2" style="line-height: 32px; text-align: center; color: #999;" >
                                &nbsp;
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999; " >城市:</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="provinceTwo">
                                    <el-select v-model="provinceTwo.value"  @focus="selectProvinceTwo" @change="selectCityTwo" placeholder="选择省" >
                                        <el-option v-for="item in provinceTwo" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="cityTwo">
                                    <el-select v-model="cityTwo.value" @change="selectAreaTwo" placeholder="选择市">
                                        <el-option v-for="(item,index) in cityTwo" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="areaTwo">
                                    <el-select v-model="areaTwo.value" @change="selectQuTwo" placeholder="选择区">
                                        <el-option v-for="(item,index) in areaTwo" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="purpose">
                                    <el-select v-model="ruleFormThree.purpose" @change="selectPurpose" placeholder="请选择房产类型">
                                        <el-option v-for="item in optionspurpose" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="liu">
                                    <el-autocomplete 
                                        v-model="ruleFormThree.liu"
                                        :fetch-suggestions="querySearchAsyncTwo"
                                        @select="handleSelectTwo"
                                        placeholder="请输入关键字"
                                    >
                                    </el-autocomplete>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="building">
                                    <el-input v-model="ruleFormThree.building" placeholder="楼栋号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="states">
                                    <el-select v-model="ruleFormThree.states" @change="selectStates" placeholder="请选择状态">
                                        <el-option v-for="item in optionsstates" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="times">
                                    <el-select v-model="ruleFormThree.times" @change="selectTimes" placeholder="请选择时间">
                                        <el-option v-for="item in optionstimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                          <!--   <el-col :span="3">
                                <el-form-item label="" prop="housesize">
                                    <el-select v-model="ruleFormThree.housesize" @change="selectHousesize" placeholder="请选择面积">
                                        <el-option v-for="item in optionshousesize" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >
                                面积:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housesizemin">
                                    <el-input v-model="ruleFormThree.housesizemin" placeholder="最小面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housesizemax">
                                    <el-input v-model="ruleFormThree.housesizemax" placeholder="最大面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >
                                选择户型:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemin">
                                    <el-input v-model="ruleFormThree.housetypemin" placeholder="最小居室 (室)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemac">
                                    <el-input v-model="ruleFormThree.housetypemac" placeholder="最大居室(室)"></el-input>
                                </el-form-item>
                            </el-col>
                      <!--       <el-col :span="2">
                                <el-form-item label="" prop="unit">
                                    <el-input v-model="ruleFormThree.unit" placeholder="单元"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="floor">
                                    <el-input v-model="ruleFormThree.floor" placeholder="楼"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="hao">
                                    <el-input v-model="ruleFormThree.hao" placeholder="号"></el-input>
                                </el-form-item>
                            </el-col> -->
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >
                                价格:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="minprice">
                                    <el-input v-model="ruleFormThree.minprice" placeholder="万元"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxprice">
                                    <el-input v-model="ruleFormThree.maxprice" placeholder="万元"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >选择楼层:</el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="minfloor">
                                    <el-input v-model="ruleFormThree.minfloor" placeholder="层"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxfloor">
                                    <el-input v-model="ruleFormThree.maxfloor" placeholder="层"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >房源编号:</el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="housecode">
                                    <el-input v-model="ruleFormThree.housecode" placeholder="房源编号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="info" @click="viewSearch" style="display: block;margin: 0 auto;" >搜索</el-button>
                            </el-col>

                            <el-col :span="5" style="line-height: 32px; text-align: center; color: #999;" >&nbsp;</el-col>
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >
                                &nbsp;
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="appendSHow" style="float:right;" >添加房源</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
<!-- table表格/房源展示 -->
                <div class="table-wap">
                    <template>
                        <el-table border :data="view" style="width: 100%; text-align:center; ">
                            <el-table-column type="index" :index="1" width="40" ></el-table-column>
                            <el-table-column prop="houseKey" label="钥匙" width="60">
                            　　<template slot-scope="scope">
                                    <img v-if="scope.row.houseKey===1" src="static/img/ys1.png" width="25" height="25" class="head_pic"/>
                                    <img v-else src="static/img/ys2.png" width="25" height="25" class="head_pic"/>
                            　　</template>
                            </el-table-column>
                            <el-table-column prop="hasImg" label="图片" width="60">
                            　　<template slot-scope="scope">
                                    <img v-if="scope.row.hasImg===1" src="static/img/pic1.png" width="25" height="20" class="head_pic"/>
                                    <img v-else src="static/img/pic2.png" width="25" height="20" class="head_pic"/>
                            　　</template>
                            </el-table-column>
                            <el-table-column prop="hasImg" label="跟进" width="60">
                            　　<template slot-scope="scope">
                                    <img v-if="scope.row.hasFollow===2" src="static/img/gj1.png" width="25" height="25" class="head_pic"/>
                                    <img v-else src="static/img/gj2.png" width="25" height="25" class="head_pic"/>
                            　　</template>
                            </el-table-column>
                            <el-table-column prop="communityName" label="小区" width="150"></el-table-column>
                            <el-table-column prop="roomNum" label="门牌号"></el-table-column>
                            <el-table-column prop="totalMeasure" label="面积 ㎡"></el-table-column>
                            <el-table-column prop="nowPrice" label="价格 (万元)"></el-table-column>
                            <el-table-column prop="layout" label="户型 (室*厅)"></el-table-column>
                            <el-table-column prop="houseDirection" label="朝向"></el-table-column>
                            <el-table-column prop="decoration" label="装修"></el-table-column>
                            <el-table-column prop="timeStr" label="创建日期" width="150"></el-table-column>
                            <el-table-column prop="fromPeople" label="经纪人"></el-table-column>
                            <el-table-column prop="" label="操作">
                             <!--    <template slot-scope="scope">
                                    <el-button size="mini" >编辑</el-button>
                                    <el-button size="mini" type="danger" >删除</el-button>
                                </template> -->
                                <template slot-scope="scope">
                                    <router-link tag="div" :to="`contents/${scope.row.shId}`" style="cursor: pointer;" >
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
            <el-tab-pane name="2" label="我的">
<!-- 筛选 -->
                <div class="screen-one-wap" >
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor1':bgcolor1}" @click="qgShow(1)" >出售</div>
                        <span class="qgList" v-show="qgShows" >
                            <p v-for="(todo,index) in todos" @click="addClass(index)" :class="{color:index == current}">{{todo.text}}</p>
                        </span>
                    </div>
                    <div class="screen-one clear" >
                        <div :class="{'bgcolor2':bgcolor2}" @click="qzShow(2)" >出租</div>
                        <span class="qzList" v-show="qzShows" >
                            <p v-for="(todo,index) in todosTwo" @click="addClassTwo(index)" :class="{color:index == currentTwo}">{{todo.text}}</p>
                        </span>
                    </div>
                </div>
<!-- 表单筛选 -->
                <div class="screen-two-wap">
                    <el-form :model="ruleFormThree" :rules="rulesThree" ref="ruleFormThree">
                        <el-row :gutter="5" style="border-bottom: 1px solid #ededed;">
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="seachAll">
                                    <el-select v-model="ruleFormThree.seachAll" @change="selectSeachAll" >
                                        <el-option v-for="item in optionsseachAll" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="" prop="seachneirong">
                                    <el-input v-model="ruleFormThree.seachneirong" placeholder="请输入小区名，小区简称，房源编号，经纪人名字"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="viewSeachAll" style="float:left;" >搜索</el-button>
                            </el-col>
                            <el-col :span="4">&nbsp;</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="searchTime">
                                    <el-select v-model="searchTime" @change="selectSearchTime" placeholder="请选择导出时间">
                                        <el-option v-for="item in optionssearchTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col v-if="isYN  === '0'" :span="2" style="line-height: 32px; text-align: center; color: #999;" >
                                <el-button type="info" @click="export_Excel" style="display: block;margin: 0 auto;" >导出</el-button>
                            </el-col>
                            <el-col v-else :span="2" style="line-height: 32px; text-align: center; color: #999;" >
                                &nbsp;
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999; " >城市:</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="provinceTwo">
                                    <el-select v-model="provinceTwo.value"  @focus="selectProvinceTwo" @change="selectCityTwo" placeholder="选择省" >
                                        <el-option v-for="item in provinceTwo" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="cityTwo">
                                    <el-select v-model="cityTwo.value" @change="selectAreaTwo" placeholder="选择市">
                                        <el-option v-for="(item,index) in cityTwo" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="areaTwo">
                                    <el-select v-model="areaTwo.value" @change="selectQuTwo" placeholder="选择区">
                                        <el-option v-for="(item,index) in areaTwo" :key="item.index" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="purpose">
                                    <el-select v-model="ruleFormThree.purpose" @change="selectPurpose" placeholder="请选择房产类型">
                                        <el-option v-for="item in optionspurpose" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="liu">
                                    <el-autocomplete 
                                        v-model="ruleFormThree.liu"
                                        :fetch-suggestions="querySearchAsyncTwo"
                                        @select="handleSelectTwo"
                                        placeholder="请输入关键字"
                                    >
                                    </el-autocomplete>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="building">
                                    <el-input v-model="ruleFormThree.building" placeholder="楼栋号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="states">
                                    <el-select v-model="ruleFormThree.states" @change="selectStates" placeholder="请选择状态">
                                        <el-option v-for="item in optionsstates" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2">&nbsp;</el-col>
                            <el-col :span="3">
                                <el-form-item label="" prop="times">
                                    <el-select v-model="ruleFormThree.times" @change="selectTimes" placeholder="请选择时间">
                                        <el-option v-for="item in optionstimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                      <!--       <el-col :span="3">
                                <el-form-item label="" prop="housesize">
                                    <el-select v-model="ruleFormThree.housesize" @change="selectHousesize" placeholder="请选择面积">
                                        <el-option v-for="item in optionshousesize" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >
                                面积:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housesizemin">
                                    <el-input v-model="ruleFormThree.housesizemin" placeholder="最小面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housesizemax">
                                    <el-input v-model="ruleFormThree.housesizemax" placeholder="最大面积 (㎡)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >
                                选择户型:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemin">
                                    <el-input v-model="ruleFormThree.housetypemin" placeholder="最小居室 (室)"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="housetypemac">
                                    <el-input v-model="ruleFormThree.housetypemac" placeholder="最大居室(室)"></el-input>
                                </el-form-item>
                            </el-col>
                           <!--  <el-col :span="2">
                                <el-form-item label="" prop="unit">
                                    <el-input v-model="ruleFormThree.unit" placeholder="单元"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="floor">
                                    <el-input v-model="ruleFormThree.floor" placeholder="楼"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="hao">
                                    <el-input v-model="ruleFormThree.hao" placeholder="号"></el-input>
                                </el-form-item> -->
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center; color: #999;" >
                                价格:
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="minprice">
                                    <el-input v-model="ruleFormThree.minprice" placeholder="万元"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxprice">
                                    <el-input v-model="ruleFormThree.maxprice" placeholder="万元"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" style="padding: 10px 0;" >
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >选择楼层:</el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="minfloor">
                                    <el-input v-model="ruleFormThree.minfloor" placeholder="层"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" style="line-height: 32px; text-align: center;" >
                                - -
                            </el-col>
                            <el-col :span="2">
                                <el-form-item label="" prop="maxfloor">
                                    <el-input v-model="ruleFormThree.maxfloor" placeholder="层"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >房源编号:</el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="housecode">
                                    <el-input v-model="ruleFormThree.housecode" placeholder="房源编号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="info" @click="viewSearch" style="display: block;margin: 0 auto;" >搜索</el-button>
                            </el-col>

                            <el-col :span="5" style="line-height: 32px; text-align: center; color: #999;" >&nbsp;</el-col>
                            <el-col :span="2" style="line-height: 32px; text-align: center; color: #999;" >&nbsp;</el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="appendSHow" style="float:right;" >添加房源</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
<!-- table表格/房源展示 -->
                <div class="table-wap">
                    <template>
                        <el-table border :data="view" style="width: 100%; text-align:center; ">
                            <el-table-column type="index" :index="1" width="40" ></el-table-column>
                            <el-table-column prop="houseKey" label="钥匙" width="60">
                            　　<template slot-scope="scope">
                                    <img v-if="scope.row.houseKey===1" src="static/img/ys1.png" width="20" height="20" class="head_pic"/>
                                    <img v-else src="static/img/ys2.png" width="20" height="20" class="head_pic"/>
                            　　</template>
                            </el-table-column>
                            <el-table-column prop="hasImg" label="图片" width="60">
                            　　<template slot-scope="scope">
                                    <img v-if="scope.row.hasImg===1" src="static/img/pic1.png" width="25" height="20" class="head_pic"/>
                                    <img v-else src="static/img/pic2.png" width="25" height="20" class="head_pic"/>
                            　　</template>
                            </el-table-column>
                            <el-table-column prop="hasImg" label="跟进" width="60">
                            　　<template slot-scope="scope">
                                    <img v-if="scope.row.hasFollow===1" src="static/img/gj1.png" width="25" height="25" class="head_pic"/>
                                    <img v-else src="static/img/gj2.png" width="25" height="25" class="head_pic"/>
                            　　</template>
                            </el-table-column>
                            <el-table-column prop="communityName" label="小区" width="150"></el-table-column>
                            <el-table-column prop="roomNum" label="门牌号"></el-table-column>
                            <el-table-column prop="totalMeasure" label="面积 ㎡"></el-table-column>
                            <el-table-column prop="nowPrice" label="价格 (万元)"></el-table-column>
                            <el-table-column prop="layout" label="户型 (室*厅)"></el-table-column>
                            <el-table-column prop="houseDirection" label="朝向"></el-table-column>
                            <el-table-column prop="decoration" label="装修"></el-table-column>
                            <el-table-column prop="timeStr" label="创建日期" width="150"></el-table-column>
                            <el-table-column prop="fromPeople" label="经纪人" width="150"></el-table-column>
                            <el-table-column prop="" label="操作">
                             <!--    <template slot-scope="scope">
                                    <el-button size="mini" >编辑</el-button>
                                    <el-button size="mini" type="danger" >删除</el-button>
                                </template> -->
                                <template slot-scope="scope">
                                    <router-link tag="div" :to="`contents/${scope.row.shId}`" style="cursor: pointer;" >
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
                        登记房源
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
                                        <el-option v-for="item in optionsage" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>手机号1:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="" prop="phone">
                                    <el-input @blur="sellerData('ruleForm')" v-model="ruleForm.phone" placeholder="请输入手机号1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>手机号2:</p>
                            </el-col>
                            <el-col :span="4">
                                <el-input @blur="sellerData('ruleForm')" v-model="ruleForm.phoneTwo" placeholder="请输入手机号2"></el-input>
                            </el-col>
                        <!--     <el-col :span="2">
                                <el-button style="float:right;" @click="sellerData('ruleForm')" type="primary" plain>查重</el-button>
                            </el-col> -->
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
                                    <el-input v-model="ruleFormTwo.building" placeholder="栋"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" class="qupd" >
                                <el-form-item label="" prop="unit">
                                    <el-input v-model="ruleFormTwo.unit" placeholder="单元"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1" class="qupd" >
                                <el-form-item label="" prop="hao">
                                    <el-input v-model="ruleFormTwo.hao" placeholder="号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" >* </span>层数:</p>
                            </el-col>
                            <el-col :span="2" class="qupd" >
                                <el-form-item label="" prop="floor">
                                    <el-input v-model="ruleFormTwo.floor" placeholder="楼层"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <p style="text-align: center;line-height: 32px; font-size: 14px; color: #999;" ><span style="color: red;" ></span>/</p>
                            </el-col>
                            <el-col :span="2" class="qupd">
                                <el-form-item label="" prop="layers">
                                    <el-input v-model="ruleFormTwo.layers" placeholder="层数"></el-input>
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
                                    <el-select v-model="ruleFormTwo.rent" @change="selectRent" @bule placeholder="请选择">
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
                                    <el-date-picker v-model="ruleFormTwo.timeone" type="date" placeholder="选择日期时间" default-time="12:00:00" :picker-options="pickerOptions0"></el-date-picker>
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
                                <el-form-item label="" prop="numbercode">
                                    <el-input :disabled='isclick' v-model="ruleFormTwo.numbercode"placeholder="委托编号" @focus="houseCode" ></el-input>
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
                                <el-form-item label="" prop="numberid">
                                    <el-input :disabled='isclick' v-model="ruleFormTwo.numberid" @focus="houseCode" placeholder="点击生成编号"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="danger" @click="houseRepeat" style="float: right; padding: 10px 50px; " >查重</el-button>
                            </el-col>
                        </el-row>
        <!-- 图片信息 -->
                        <div class="infor-title-two">
                            图片信息
                        </div>
                        <el-upload
                            :with-credentials=true
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
                            :on-remove="handleRemove"
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
                                <el-button type="danger" :plain="true" @click="clearSHowYes('ruleFormTwo')" style="display: block; margin: 0 auto; padding: 10px 35px; " >发布</el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="info" :plain="true" @click="clearSHowNo('ruleFormTwo')" style="display: block; margin: 0 auto; padding: 10px 35px; " >取消</el-button>
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
        name: 'mytable',
        data() {
            return {
                isYN: '',
                searchTime: '',
                selectSearchTimeUse: '',
                qiehuan: '',
                optionssearchTime: [{
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
                    label: '全部'
                }],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pageSize: 10,
                viewAll: 10,
                diyige: 1,
                currentpage: 1,

                appendHouse: false,
//添加房源
                vId: '',
                sellerId: '',
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
                uploadImgUrl: 'http://www.manyihefc.com:8080/myh_management/uploadImage',
                disabledUpload: false,
                img: [],
                img1: '',
                province: [],
                provincecity: '',
                city: [],
                provincearea: '',
                area: [],
                provincequ: '',
                fromCommunity: '',
                selectRentUse:'',
                selectPurposetUse: '',
                selectMykeyUse: '2',
                selectTaxUse: '',
                selectOrientationUse: '',
                selectRenovationUse: '',
                optionspropertyrightUse: '',
                selectEntrustUse: '',
                selectSourceUse: '',
                selectStateUse: '',
                isclick: false,
                remarks: '',
                selectStateTwoUse: '1',
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
                    mykey: '2',
                    tax: '',
                    orientation: '',
                    stateTwo: '1',
                    renovation: '',
                    propertyright: '',
                    entrust: '',
                    timeone: '',
                    timetwo: '',
                    source: '',
                    numbercode: '',
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
                        { required: true, message: '请填写楼层', trigger: 'blur' },
                    ],
                    hao: [
                        { required: true, message: '请填写房间号', trigger: 'blur' },
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
                    stateTwo: [
                        { required: true, message: '请选择状态', trigger: 'blur' },
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
                //是否有钥匙
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
                }, {
                    value: '12',
                    label: '复式'
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
//筛选
                activeName2: '1',
                isHouseAll: '1',
                view: [],
                qgShows: false,
                qzShows: false,
                qgqzData: '',
                shangData: '',
                bgcolor1: false,
                bgcolor2: false,
                current: 0,
                currentTwo: 0,
                provinceTwo: [],
                provincecityUse: '',
                cityTwo: [],
                provinceareaUse: '',
                areaTwo: [],
                provincequUse: '',
                fromCommunityTwo: '',
                selectTimesUse: '',
                selectSeachAllUse: '1',
                // selectHousesizeUse: '',
                ruleFormThree: {
                    liu: '',
                    purpose: '',
                    building: '',
                    unit: '',
                    floor: '',
                    hao: '',
                    times: '',
                    states: '',
                    housesizemin: '',
                    housesizemax: '',
                    minprice: '',
                    maxprice: '',
                    minfloor: '',
                    maxfloor: '',
                    housetypemin: '',
                    housetypemax: '',
                    housecode: '',
                    seachAll: '1',
                    seachneirong: '',
                },
                rulesThree: {

                },
                //时间
                optionstimes: [{
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
                //房屋现状
                optionsstates: [{
                    value: '1',
                    label: '有效'
                },{
                    value: '7',
                    label: '无效'
                }],
                //房屋大小
                optionsseachAll: [{
                    value: '1',
                    label: '出售'
                }, {
                    value: '2',
                    label: '出租'
                }, {
                    value: '3',
                    label: '无效'
                }],
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
//筛选end

            }
        },
        created() {

        },
        computed: {

        },
        mounted () {
            this.viewSearch ()
            // this.selectProvince()
            // this.selectProvinceTwo()
        },
        methods: {
            handleCurrentChange(val) {
                this.currentpage = val
                // this.viewTable ()
                if (this.qiehuan == '0') {
                    this.viewSeachAll ()
                } else {
                    this.viewSearch ()
                }
            },
            //所有/我的
            handleClick: function (tab, event) {
                // console.log(tab.index)
                this.isHouseAll = tab.name
                this.provinceTwo = []
                this.provincecityUse = ''
                this.cityTwo = []
                this.provinceareaUse = ''
                this.areaTwo = []
                this.provincequUse = ''
                this.fromCommunityTwo = ''
                this.selectTimesUse = ''
                this.ruleFormThree.liu = ''
                this.ruleFormThree.purpose = ''
                this.ruleFormThree.building = ''
                this.ruleFormThree.unit = ''
                this.ruleFormThree.floor = ''
                this.ruleFormThree.hao = ''
                this.ruleFormThree.times = ''
                this.ruleFormThree.states = ''
                this.ruleFormThree.housesizemin = ''
                this.ruleFormThree.housesizemax = ''
                this.ruleFormThree.minprice = ''
                this.ruleFormThree.maxprice = ''
                this.ruleFormThree.minfloor = ''
                this.ruleFormThree.maxfloor = ''
                this.ruleFormThree.housetypemin = ''
                this.ruleFormThree.housetypemax = ''
                this.ruleFormThree.housecode = ''
                this.viewSearch ()
            },
            //出租/出售切换
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
            selectProvinceTwo (vId) {
                this.$http.post(myHost+'myh_management/getAllProvince').then((response) => {
                    if (response.headers['code'] === '3') {
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        data = data.resultBean
                        var myCode = data.code
                        this.provinceTwo = data.object
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
            selectCityTwo (vId) {
                let obj = {}
                obj = this.provinceTwo.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.provincecityUse = vId
                var shi = {
                    province: this.provincecityUse
                }
                this.$http.post(myHost+'myh_management/getAllCitiesByProvince',shi).then((response) => {
                    if (response.headers['code'] === '3') {
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        data = data.resultBean
                        var myCode = data.code
                        this.cityTwo = data.object
                        console.log(this.cityTwo)
                        console.log(myCode)
                        if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }

                    }
                })
            },
            //search区
            selectAreaTwo (vId,vId1) {
                let obj = {}
                obj = this.cityTwo.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.provinceareaUse = vId
                var qu = {
                    province: this.provincecityUse,
                    city: this.provinceareaUse
                }
                this.$http.post(myHost+'myh_management/getAllAreasByCity',qu).then((response) => {
                    if (response.headers['code'] === '3') {
                        this.$router.push('/login');
                        this.$message.error('登陆超时，请重新登陆');
                    } else if (response.headers['code'] === '4') {
                        this.$router.push('/login');
                        this.$message.error('您的账号在其他地方登陆');
                    } else {
                        var data = response.data
                        data = data.resultBean
                        var myCode = data.code
                        this.areaTwo = data.object
                        console.log(this.areaTwo)
                        console.log(myCode)
                        if (myCode == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
            selectQuTwo (vId) {
                let obj = {}
                obj = this.areaTwo.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                //console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.provincequUse = vId
            },
            //queryString 为在框中输入的值
            //callback 回调函数,将处理好的数据推回
            querySearchAsyncTwo(queryString, callback) {
                var list = [{}];
                 //调用的后台接口
                // console.log(queryString)
                // console.log(callback)
                var data = {
                    communityProvince: this.provincecityUse,
                    communityCity: this.provinceareaUse,
                    communityArea: this.provincequUse,
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
                        } else if (code == '1') {
                            this.$message.error(data.message);
                        } else if (code == '3') {
                            this.$router.push('/login');
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
                // console.log(item.commId);
                this.fromCommunityTwo = item.commId
            },
            //下拉框选中事件 时间
            selectTimes(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionstimes.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectTimesUse = vId
            },
            //下拉框选中事件 房屋状态
            selectStates(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsstates.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectStatesUse = vId
            },
            //下拉框选中事件 房屋大小
            // selectHousesize(vId){//这个vId也就是value值
            //     // console.log(ha)
            //     let obj = {}
            //     obj = this.optionshousesize.find((item)=>{//这里的userList就是上面遍历的数据源
            //         return item.value === vId;//筛选出匹配数据
            //     })
            //     console.log(obj.label)//我这边的name就是对应label的
            //     console.log(vId)
            //     this.selectHousesizeUse = vId
            // },
            //下拉框选中事件 seachAll 搜索
            selectSeachAll(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionsseachAll.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectSeachAllUse = vId
            },
            //搜索展示
            viewSeachAll () {
                this.qiehuan = 0
                this.view = []
                var datas = {
                    preKey: this.selectSeachAllUse,
                    keyWord: this.ruleFormThree.seachneirong,
                    page: {
                        pageNum: this.currentpage,
                        pageSize: this.pageSize,
                    },
                }
                this.$http.post(myHost+'myh_management/searchHouseByString',datas).then((response) => {
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
            //筛选展示
            viewSearch () {
                this.qiehuan = 1
                this.view = []
                // if (this.shangData = '0') {
                //     this.shangData = null
                // }
                console.log(this.isHouseAll)
                var tab = {
                    page: {
                        pageNum: this.currentpage,
                        pageSize: this.pageSize,
                    },
                    houseScope: this.isHouseAll,
                    sellType: this.qgqzData,
                    houseType: this.shangData,
                    province: this.provincecityUse,
                    city: this.provinceareaUse,
                    area: this.provincequUse,
                    sQuan: this.selectPurposetUse,
                    communityId: this.fromCommunityTwo,
                    inDays: this.selectTimesUse,
                    houseState: this.selectStatesUse,
                    // measure: this.selectHousesizeUse,
                    fromMeasure: this.ruleFormThree.housesizemin,
                    toMeasure: this.ruleFormThree.toMeasure,
                    buildingNum: this.ruleFormThree.building,
                    unitNum: this.ruleFormThree.unit,
                    floor: this.ruleFormThree.floor,
                    roomNum: this.ruleFormThree.hao,
                    fromPrice: this.ruleFormThree.minprice,
                    toPrice: this.ruleFormThree.maxprice,
                    fromFloor: this.ruleFormThree.minfloor,
                    toFloor: this.ruleFormThree.maxfloor,
                    // bedRoom: this.ruleFormThree.housetype,
                    fromBedRoom: this.ruleFormThree.housetypemin,
                    toBedRoom: this.ruleFormThree.housetypemax,
                    houseCode: this.ruleFormThree.housecode,
                }
                this.$http.post(myHost+'myh_management/searchSecondHouse',tab).then((response) => {
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
                            this.isYN = getCookie('isYN')
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
            appendSHow () {
                this.appendHouse = true;
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
            // 客户信息提交
            sellerData (formName) {
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
                console.log(this.$refs[formName])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var seller = {
                            sellerName: this.ruleForm.name,
                            sellerSex: this.vId,
                            sellerMobileOne: this.ruleForm.phone,
                            sellerMobileTwo: this.ruleForm.phoneTwo,
                        }
                        this.$http.post(myHost+'myh_management/insertSeller',seller).then((response) => {
                            if (response.headers['code'] === '3') {
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
                                    // console.log(data.object.sellerId)
                                    this.sellerId = data.object.sellerId
                                    that.$message({
                                        message: data.message,
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
                        } else if (code == '1') {
                            this.$message.error(data.message);
                        } else if (code == '3') {
                            this.$router.push('/login');
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
            //下拉框选中事件 出租出售
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
            //编号生成
            houseCode () {
                this.$http.post(myHost+'myh_management/createHouseCode').then((response) => {
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
                        if (code == '0') {
                            this.ruleFormTwo.numberid = data.object
                            this.ruleFormTwo.numbercode = this.ruleFormTwo.numberid
                            console.log(this.numberid)
                            this.isclick = true
                            this.$message({
                                message: '生成编码成功',
                                type: 'success',
                            });
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        }
                    }
                })
            },
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
            handleRemove(file, fileList) {
                console.log(fileList);
                var datas = {
                    imgUrl: file.response.resultBean.object
                }
                this.$http.post(myHost+'myh_management/deleteImg',datas).then((response) => {
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
                        if (code = '0') {
                            var filelist
                            var obj = []
                            for (var i = 0; i < fileList.length; i++) {
                                filelist = fileList[i].response.resultBean.object
                                obj.splice(filelist,1)
                            }
                            this.img = obj
                            this.img1 = ''
                            this.$message({
                                message: '删除成功',
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
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 上传成功后的回调
            uploadSuccess (response, file, fileList) {
                // if (response.headers['code'] === '3') {
                //     // console.log(response.headers['message'])
                //     this.$router.push('/login');
                //     this.$message.error('登陆超时，请重新登陆');
                // } else if (response.headers['code'] === '4') {
                //     this.$router.push('/login');
                //     this.$message.error('您的账号在其他地方登陆');
                // } else {
                    var filelist
                    var obj = []
                    for (var i = 0; i < fileList.length; i++) {
                        filelist = fileList[i].response.resultBean.object
                        obj.push(filelist)
                    }
                    // console.log(obj);
                    this.img = obj
                    this.$message({
                        message: '上传成功',
                        type: 'success',
                    });
                // }
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
                    this.img1 = file.response.resultBean.object
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
            houseRepeat () {
                var data = {
                    fromCommunity: this.fromCommunity,
                    buildingNum: this.ruleFormTwo.building,
                    unitNum: this.ruleFormTwo.unit,
                    houseFloor: this.ruleFormTwo.floor,
                    roomNum: this.ruleFormTwo.hao,
                    sellType: this.selectRentUse,
                }
                this.$http.post(myHost+'myh_management/checkRepeatHouse',data).then((response) => {
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
                                message: '没有重复房源',
                                type: 'success',
                            });
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message)
                        }
                    }
                })
            },
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
                console.log(this.ruleFormTwo.timeone)
                var that = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // var vId3=this.vId3.map(Number)
                        var forms = {
                            fromSeller: this.sellerId,
                            fromCommunity: this.fromCommunity,
                            sellType: this.selectRentUse,
                            houseCode: this.ruleFormTwo.numberid,
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
                            sellState: this.selectStateTwoUse,
                            decoration: this.selectRenovationUse,
                            houseRights: this.optionspropertyrightUse,
                            entrustType: this.selectEntrustUse,
                            entrustTimeStr: this.ruleFormTwo.timeone,
                            deliverTimeStr: this.ruleFormTwo.timetwo,
                            entrustCode: this.ruleFormTwo.numbercode,
                            houseState: this.selectStateUse,
                            sourceFrom: this.selectSourceUse,
                            shImgA: this.img[0],
                            shImgB: this.img[1],
                            shImgC: this.img[2],
                            shImgD: this.img[3],
                            shImgE: this.img[4],
                            shImgF: this.img[5],
                            shImgG: this.img[6],
                            shImgH: this.img[7],
                            shImgI: this.img[8],
                            shImgJ: this.img[9],
                            houseRemarks: this.remarks,
                            entrustImg: this.img1,

                        }
                        that.$http.post(myHost+'myh_management/insertSecondHouse',forms).then((response) => {
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
            clearSHowNo (formName) {
                this.$refs[formName].resetFields()
                this.appendHouse = false;
                this.$message({
                    message: '取消发布',
                    type: 'warning'
                });
                this.isclick = false
            },
            //下拉框选中事件 导出表格数据
            selectSearchTime(vId){//这个vId也就是value值
                // console.log(ha)
                let obj = {}
                obj = this.optionssearchTime.find((item)=>{//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                })
                console.log(obj.label)//我这边的name就是对应label的
                console.log(vId)
                this.selectSearchTimeUse = vId
            },
            //导出接口
            export_Excel_data () {
                var datas = {
                    periodType: this.selectSearchTimeUse
                }
                this.$http.post(myHost+'myh_management/outPutSecondHouseDetail',datas).then((response) => {
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
                            this.reportForm = data.object
                            // console.log(this.reportForm)
                        } else if (code == '3') {
                            this.$router.push('/login');
                            this.$message.error(data.message);
                        } else {
                            this.$message.error(data.message);
                        }

                    }
                })
            },
            // 导出表格数据
            formatJson (filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => v[j]))
            },
            export_Excel () {
                if (this.searchTime == '') {
                    this.$message.error('请选择导出时间');
                    return
                }
                this.export_Excel_data ()
                this.$confirm('确定要导出表格数据么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    require.ensure([], () => {
                        const { export_json_to_excel } = require('../../vendor/Export2Excel.js')
                        const tHeader = ['编号', '门店', '所属人', '小区','状态','租售','现价','户型','总面积','朝向','装修','钥匙','产权','税','房产类型','商圈','建筑年代','楼栋号','单元号','房间号','楼层','业主','业主电话1','业主电话2','委托类型','委托时间','交房时间','备注']
                        const filterVal = ['houseCode', 'storeName', 'agentOwner', 'community', 'validateState', 'sellType', 'nowPrice', 'layout', 'totalSquare', 'direction', 'decoration', 'hasKey', 'houseRight', 'tax', 'houseType', 'shangQuan', 'buildingYear', 'buildingNum', 'unitNum', 'roomNum', 'floor', 'houseOwner', 'houseOwnerPhone', 'houseOwnerPhone2', 'entrustType', 'entrustTime', 'deliverTime', 'remarks']
                        const list = this.reportForm
                        const data = this.formatJson(filterVal, list)
                        export_json_to_excel(tHeader, data, '报表 时间：'+(new Date()).toLocaleDateString().replace(/\//g, "·") + " " + (new Date()).toTimeString().substr(0, 8))
                })
              }).catch(() => {
                this.$message.error('取消报表 ：-）');
              })
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
    .screen-one .color{
        color: #9b261d;
    }
    .screen-one .bgcolor1{
        background: #9b261d;
    }
    .screen-one:nth-child(2) .bgcolor2{
        background: #9b261d;
    }
    .screen-one p{
        float: left;
        margin-left: 40px;
        cursor: pointer;
        font-size: 16px;
        color: #666;
        line-height: 42px;
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
