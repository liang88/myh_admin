<template>
    <div class="login-wrap">
        <div class="ms-logo">
            <div>
                <img src="static/img/logotwo.png">
            </div>
        </div>
        <div class="ms-title">管理系统</div>
        <div class="ms-login" v-show="logIn" >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="code" v-show="isCode" >
                    <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <div class="option clear">
                    <p @click="isLogin" >经纪人</p>
                    <p>忘记密码?</p>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
            <div class="tishi" >123</div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                logIn: true,
                logInTwo: false,
                isCode: false,
                ruleForm: {
                    username: '',
                    password: '',
                    code: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.push('/');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            isLogin () {
                this.logIn = !this.logIn
                this.logInTwo = !this.logInTwo
            }
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
        background: url('../../assets/images/logbg.jpg') no-repeat;
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
</style>