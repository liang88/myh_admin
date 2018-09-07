<template>
    <div class="login-wrap">
        <div class="ms-logo">
            <div>
                <img src="static/img/logotwo.png">
            </div>
        </div>
        <div class="ms-title">管理系统</div>
        <div class="ms-login" v-show="logIn" >
            <el-form label-width="0px" class="demo-ruleForm">
                <el-form-item>
                    <el-input v-model="myPhone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-show="isSub" placeholder="请输入密码" v-model="myPassword" @keyup.enter.native="submitForm"></el-input>
                    <el-input type="password" v-show="isCode" placeholder="请输入密码" v-model="myPassword"></el-input>
                </el-form-item>
                <el-form-item v-show="isCode" >
                    <el-input v-model="myCode" placeholder="请输入验证码(对应手机号查收)" @keyup.enter.native="codeShow"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" v-show="isSub" @click="submitForm">登录</el-button>
                    <el-button type="primary" v-show="isCode" @click="codeShow">登录</el-button>
                </div>
                <div class="option clear">
                    <p @click="isLogin(0)" >经纪人</p>
                    <p @click="isForget">忘记密码?</p>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
        <div class="ms-login" v-show="logInTwo" >
            <el-form label-width="0px" class="demo-ruleForm">
                <el-form-item>
                    <el-input v-model="myPhone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-show="isSub" placeholder="请输入密码" v-model="myPassword" @keyup.enter.native="submitFormTwo"></el-input>
                    <el-input type="password" v-show="isCode" placeholder="请输入密码" v-model="myPassword"></el-input>
                </el-form-item>
                <el-form-item v-show="isCode" >
                    <el-input v-model="myCode" placeholder="请输入验证码(对应手机号查收)" @keyup.enter.native="codeShowTwo"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" v-show="isSub" @click="submitFormTwo">登录</el-button>
                    <el-button type="primary" v-show="isCode" @click="codeShowTwo">登录</el-button>
                </div>
                <div class="option clear">
                    <p @click="isLogin(1)" >管理员</p>
                    <p @click="isForget" >忘记密码?</p>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
        <transition name="el-zoom-in-center">
            <div class="forget" v-show="forgetShow">
                <div class="forgetSbm"> 
                    <template>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="经纪人" name="1">
                                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="手机号" prop="phones">
                                        <el-input v-model.number="ruleForm2.phones"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="pass">
                                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="checkPass">
                                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="验证码" prop="codes">
                                        <el-input type="text" v-model="ruleForm2.codes" style="auto" @keyup.enter.native="submitFormS('ruleForm2')" ></el-input>
                                        <el-button @click="isCodeS" style="position: absolute;right: 10%;bottom: 0;" >获取验证码</el-button>
                                    </el-form-item>
                                    <el-form-item style="width: 300px; margin: 0 auto; " >
                                        <el-button type="primary" @click="submitFormS('ruleForm2')" style="float: left;" >提交</el-button>
                                        <el-button @click="resetForm('ruleForm2')" >取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                            <el-tab-pane label="管理员" name="0">
                                <el-form :model="ruleForm3" status-icon :rules="rules2" ref="ruleForm3" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="手机号" prop="phones">
                                        <el-input v-model.number="ruleForm3.phones"></el-input>
                                    </el-form-item>
                                    <el-form-item label="密码" prop="pass">
                                        <el-input type="password" v-model="ruleForm3.pass" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="确认密码" prop="checkPass">
                                        <el-input type="password" v-model="ruleForm3.checkPass" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="验证码" prop="codes">
                                        <el-input type="text" v-model="ruleForm3.codes" style="auto" @keyup.enter.native="submitFormS('ruleForm3')" ></el-input>
                                        <el-button @click="isCodeS" style="position: absolute;right: 10%;bottom: 0;" >获取验证码</el-button>
                                    </el-form-item>
                                    <el-form-item style="width: 300px; margin: 0 auto; " >
                                        <el-button type="primary" @click="submitFormS('ruleForm3')" style="float: left;" >提交</el-button>
                                        <el-button @click="resetForm('ruleForm3')" >取消</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </template>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import md5 from 'js-md5'
    import {setCookie,getCookie} from '../../util/cookie'
    export default {
        data () {
            var checkAge = (rule, value, callback) => {
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else if (!reg.test(this.ruleForm2.phones) && !reg.test(this.ruleForm3.phones)) {
                    return callback(new Error('手机号格式不正确'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass && value !== this.ruleForm3.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var checkAgeAS = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    phones: '',
                    codes: '',
                },
                ruleForm3: {
                    pass: '',
                    checkPass: '',
                    phones: '',
                    codes: '',
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    phones: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    codes: [
                        { validator: checkAgeAS, trigger: 'blur' }
                    ]
                },
                logIn: true,
                logInTwo: false,
                isCode: false,
                isSub: true,
                myPhone: '',
                myPassword: '',
                myCode: '',
                ifCode: '',
                isYN: '1',
                forgetShow: false,
                activeName: '1',
                forgetOne: '1',
                isCodeType: 'agentRevampPass',
                isPassword: 'myh_management/agentResetPassword',
            }
        },
        methods: {
            //tags切换
            handleClick(tab, event) {
                console.log(tab.name, event);
                this.forgetOne = tab.name
            },
            // 验证码
            isCodeS () {
                if (this.forgetOne === '1') {
                    this.isCodeType = 'agentRevampPass'
                } else if (this.forgetOne === '0') {
                    this.isCodeType = 'managerRevampPass'
                }
                var datas = {
                    mobile: this.forgetOne === '1' ? this.ruleForm2.phones : this.ruleForm3.phones,
                    type: this.isCodeType
                }
                this.$http.post(myHost+'myh_management/sendValiCode',datas).then((response) => {
                    console.log(response)
                    var data = response.data
                    data = data.resultBean
                    var code = data.code
                    console.log(code)
                    if (code == '0') {
                        this.$message({
                            message: data.message,
                            type: 'success',
                        });
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            // 忘记密码提交 经纪人
            submitFormS(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // if (this.forgetOne === '1') {
                        this.isPassword = 'myh_management/agentResetPassword'
                        // } else if (this.forgetOne === '0') {
                        //     this.isPassword = 'myh_management/managerResetPassword'
                        // }
                        var datas = {
                            mobile: this.ruleForm2.phones,
                            password: this.ruleForm2.pass,
                            confirmPassword: this.ruleForm2.checkPass,
                            valiCode: this.ruleForm2.codes,
                        }
                        this.$http.post(myHost+this.isPassword+'',datas).then((response) => {
                            var data = response.data
                            data = data.resultBean
                            var code = data.code
                            if (code == '0') {
                                this.$message({
                                    message: data.message,
                                    type: 'success',
                                });
                                this.forgetShow = !this.forgetShow
                            } else {
                                this.$message.error(data.message);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 忘记密码提交 管理员
            submitFormS(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // if (this.forgetOne === '1') {
                        this.isPassword = 'myh_management/managerResetPassword'
                        // } else if (this.forgetOne === '0') {
                        //     this.isPassword = 'myh_management/managerResetPassword'
                        // }
                        var datas = {
                            mobile: this.ruleForm3.phones,
                            password: this.ruleForm3.pass,
                            confirmPassword: this.ruleForm3.checkPass,
                            valiCode: this.ruleForm3.codes,
                        }
                        this.$http.post(myHost+this.isPassword+'',datas).then((response) => {
                            var data = response.data
                            data = data.resultBean
                            var code = data.code
                            if (code == '0') {
                                this.$message({
                                    message: data.message,
                                    type: 'success',
                                });
                                this.forgetShow = !this.forgetShow
                            } else {
                                this.$message.error(data.message);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // 忘记密码 取消
            resetForm(formName) {
                this.forgetShow = !this.forgetShow
                this.ruleForm2.pass = ''
                this.ruleForm2.checkPass = ''
                this.ruleForm2.phones = ''
                this.ruleForm2.codes = ''
            },
            // 忘记密码 show
            isForget () {
                this.forgetShow = !this.forgetShow
                this.ruleForm2.pass = ''
                this.ruleForm2.checkPass = ''
                this.ruleForm2.phones = ''
                this.ruleForm2.codes = ''
            },
            // 0 管理者    1 经纪人
            // 0 管理者    1 经纪人
            // 0 管理者    1 经纪人
            isLogin (isYN) {
                this.myPhone = ''
                this.myPassword = ''
                this.myCode = ''
                this.logIn = !this.logIn
                this.logInTwo = !this.logInTwo
                this.isYN = isYN
            },
            submitForm () {
                // 验证手机号
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (!this.myPhone) {
                    this.$message({
                        message: '请输入手机号',
                        type: 'warning'
                    });
                    return
                }
                if (!reg.test(this.myPhone)) {
                    this.$message({
                        message: '手机号码格式不正确',
                        type: 'warning'
                    });
                    return
                }
                if (!this.myPassword) {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                    return
                }
                if (6 > this.myPassword.length || 12 < this.myPassword.length) {
                    this.$message({
                        message: '密码输入不正确',
                        type: 'warning'
                    });
                    return
                }
                var infos = {
                    loginMobile: this.myPhone,
                    password: this.myPassword,
                    clientType: 2
                }
                this.$http.post(myHost+'myh_management/agentLogin',infos).then((response) => {
                    console.log(response)
                    var data = response.data
                    data = data.resultBean
                    var code = data.code
                    this.ifCode = code
                    if (code == '0') {
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        this.$router.push('/')
                        // setCookie('myPhone',this.myPhone,24)
                        // setCookie('myPassword',this.myPassword,24)
                        setCookie('JSESSIONID',data.sessionId,24)
                        setCookie('clientType ','pc',24*365)
                        setCookie('isYN ',this.isYN,24)
                        setCookie('userName ',data.object.userName,24)
                        setCookie('headImg ',data.object.headImg,24)
                    } else if (code == '1') {
                        this.$message.error(data.message);
                    } else if (code == '2') {
                        this.$message.error(data.message);
                        this.isCode = true
                        this.isSub = false
                    }
                })
            },
            codeShow () {
                // 验证手机号
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (!this.myPhone) {
                    this.$message({
                        message: '请输入手机号',
                        type: 'warning'
                    });
                    return
                }
                if (!reg.test(this.myPhone)) {
                    this.$message({
                        message: '手机号码格式不正确',
                        type: 'warning'
                    });
                    return
                }
                if (!this.myPassword) {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                    return
                }
                if (6 > this.myPassword.length || 12 < this.myPassword.length) {
                    this.$message({
                        message: '密码输入不正确',
                        type: 'warning'
                    });
                    return
                }
                if (!this.myCode) {
                    this.$message({
                        message: '请输入验证码',
                        type: 'warning'
                    });
                    return
                }
                var infos = {
                    loginMobile: this.myPhone,
                    password: this.myPassword,
                    valiCode: this.myCode,
                    clientType: 2
                }
                this.$http.post(myHost+'myh_management/agentLoginVsCode',infos).then((response) => {
                    console.log(response)
                    var data = response.data
                    data = data.resultBean
                    var code = data.code
                    if (code == '0') {
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        this.$router.push('/')
                        // setCookie('myPhone',this.myPhone,24)
                        // setCookie('myPassword',this.myPassword,24)
                        setCookie('JSESSIONID',data.sessionId,24)
                        setCookie('clientType ','pc',24*365)
                        setCookie('isYN ',this.isYN,24)
                        setCookie('userName ',data.object.userName,24)
                        setCookie('headImg ',data.object.headImg,24)
                    } else if (code == '1') {
                        this.$message.error(data.message);
                    }
                })
            },
            submitFormTwo () {
                console.log(1)
                // 验证手机号
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (!this.myPhone) {
                    this.$message({
                        message: '请输入手机号',
                        type: 'warning'
                    });
                    return
                }
                if (!reg.test(this.myPhone)) {
                    this.$message({
                        message: '手机号码格式不正确',
                        type: 'warning'
                    });
                    return
                }
                if (!this.myPassword) {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                    return
                }
                if (6 > this.myPassword.length || 12 < this.myPassword.length) {
                    this.$message({
                        message: '密码输入不正确',
                        type: 'warning'
                    });
                    return
                }
                var infos = {
                    loginMobile: this.myPhone,
                    password: this.myPassword,
                    clientType: 2
                }
                this.$http.post(myHost+'myh_management/managerLogin',infos).then((response) => {
                    console.log(response)
                    var data = response.data
                    data = data.resultBean
                    var code = data.code
                    this.ifCode = code
                    if (code == '0') {
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        this.$router.push('/')
                        // setCookie('myPhone',this.myPhone,24)
                        // setCookie('myPassword',this.myPassword,24)
                        setCookie('JSESSIONID',data.sessionId,24)
                        setCookie('clientType ','pc',24*365)
                        setCookie('isYN ',this.isYN,24)
                        setCookie('userName ',data.object.userName,24)
                        setCookie('headImg ',data.object.headImg,24)
                    } else if (code == '1') {
                        this.$message.error(data.message);
                    } else if (code == '2') {
                        this.$message.error(data.message);
                        this.isCode = true
                        this.isSub = false
                    }
                })
            },
            codeShowTwo () {
                // 验证手机号
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
                if (!this.myPhone) {
                    this.$message({
                        message: '请输入手机号',
                        type: 'warning'
                    });
                    return
                }
                if (!reg.test(this.myPhone)) {
                    this.$message({
                        message: '手机号码格式不正确',
                        type: 'warning'
                    });
                    return
                }
                if (!this.myPassword) {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                    return
                }
                if (6 > this.myPassword.length || 12 < this.myPassword.length) {
                    this.$message({
                        message: '密码输入不正确',
                        type: 'warning'
                    });
                    return
                }
                if (!this.myCode) {
                    this.$message({
                        message: '请输入验证码',
                        type: 'warning'
                    });
                    return
                }
                var infos = {
                    loginMobile: this.myPhone,
                    password: this.myPassword,
                    valiCode: this.myCode,
                    clientType: 2
                }
                this.$http.post(myHost+'myh_management/managerLoginVsCode',infos).then((response) => {
                    console.log(response)
                    var data = response.data
                    data = data.resultBean
                    var code = data.code
                    if (code == '0') {
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        });
                        this.$router.push('/')
                        // setCookie('myPhone',this.myPhone,24)
                        // setCookie('myPassword',this.myPassword,24)
                        setCookie('JSESSIONID',data.sessionId,24)
                        setCookie('clientType ','pc',24*365)
                        setCookie('isYN ',this.isYN,24)
                        setCookie('userName ',data.object.userName,24)
                        setCookie('headImg ',data.object.headImg,24)
                    } else if (code == '1') {
                        this.$message.error(data.message);
                        this.clearTsmessage()
                    }
                })
            },
        }
    };
</script>

<style scoped>
    .tishi{
        width: 80%;
        display: block;
        margin: 0 auto;
        color: red;
    }
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: url('/static/img/logbg.jpg') no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -60px;
        text-align: center;
        font-size:35px;
        color: #004892;
        font-weight: 600;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        transform: translate(-50%,-50%);
        padding:40px;
        border-radius: 5px;
        background: rgba(0,0,0,0);
        margin-top: 90px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .el-input .el-input__inner{
        height: 40px !important;
    }
    .el-input{
        display: block;
        margin: 0 auto;
        width: 80%;
    }
    .login-btn button{
        width: 80%;
        height: 40px;
        display: block;
        margin: 0 auto;
        background: #004892;
        border-color: #004892;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
        margin-bottom: 15px;
    }
    .el-form-item--small .el-form-item__error{
        left: 10%;
        color: red;
    }
    .ms-logo{
        width: 110px;
        height: 110px;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        margin-top: -120px;
    }
    .ms-logo div{
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .ms-logo div img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        margin-top: -3px;
    }
    .option{
        width: 80%;
        margin: 0 auto;
        padding-top: 5px;
    }
    .option p{
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
    }
    .option p:nth-child(1){
        float: left;
    }
    .option p:nth-child(2){
        float: right;
    }
    .forget{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        overflow: auto;
        display: block;
    }
    .forgetSbm{
        width: 30%;
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .el-form-item__error{
        left: 35px;
    }
</style>