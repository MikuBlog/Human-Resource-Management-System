<template>
    
    <div class="message">

        <div class="message-head">
            File Check
        </div>
        
        <div class="message-form">

            <div class="button">

                <div class="button-area">
                    <span @click="sendMessage()">submit</span>
                    <span @click="clean()">delete</span>
                </div>

                <div class="picture">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="picture-content">上传用户头像</span>
                </div>

            </div>

            <div>

                <div class="row">

                <div class="input">
                    <label for="first">一级机构</label>
                    <input type="text" id="first" :value="detail.first" disabled>
                </div>

                <div class="input">
                    <label for="second">二级机构</label>
                    <input type="text" id="second" :value="detail.second" disabled>
                </div>

                <div class="input">
                    <label for="third">三级机构</label>
                    <input type="text" id="third" :value="detail.third" disabled>
                </div>

            </div>

            <div class="row">

                <div class="input">
                    <label for="jobtype">职业分类</label>
                    <input type="text" id="jobtype" :value="detail.jobtype" disabled>
                </div>

                <div class="input">
                    <label for="jobname">职位名称</label>
                    <input type="text" id="jobname" :value="detail.jobname" disabled>
                </div>

                <div class="input">
                    <label for="jobsay">职称</label>
                    <input type="text" id="jobsay" :value="detail.jobsay" disabled>
                </div>

            </div>

            </div>

            <div class="row">

                <div class="input">
                    <label for="name">姓名</label>
                    <input type="text" id="name" v-model="detail.name">
                </div>

                <div class="input">
                    <label for="sex">性别</label>
                    <select name="sex" id="sex" @change = "getChange('sex',$event)">
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </div>

                <div class="input">
                    <label for="email">邮箱</label>
                    <input type="email" id="email" v-model="detail.email">
                </div>

            </div>

            <div class="row">

                <div class="input">
                    <label for="phone">电话</label>
                    <input type="phone" id="phone" v-model="detail.phone">
                </div>

                <div class="input">
                    <label for="QQ">QQ</label>
                    <input type="text" id="QQ" v-model="detail.QQ">
                </div>

                <div class="input">
                    <label for="mobile">手机</label>
                    <input type="text" id="mobile" v-model="detail.mobile">
                </div>

            </div>

            <div class="row">

                <div class="input">
                    <label for="time">建档时间</label>
                    <input type="text" id="time" v-model="detail.time" disabled>
                </div>

                <div class="input">
                    <label for="speciality">特长</label>
                    <input type="text" id="speciality" v-model="detail.speciality">
                </div>

                <div class="input">
                    <label for="favor">爱好</label>
                    <input type="text" id="favor" v-model="detail.favor">
                </div>

            </div>

            <div class="row long">

                <div class="input">
                    <label for="country">国籍</label>
                    <select id="country" @change = "getChange('country',$event)">
                        <option value="中国">中国</option>
                        <option value="美国">美国</option>
                        <option value="日本">日本</option>
                        <option value="加拿大">加拿大</option>
                        <option value="俄罗斯">俄罗斯</option>
                        <option value="英国">英国</option>
                        <option value="其他">其他</option>
                    </select>
                </div>

                <div class="input">
                    <label for="birthplace">出生地</label>
                    <input type="text" id="birthplace" v-model="detail.birthplace">
                </div>

                <div class="input">
                    <label for="birthday">生日</label>
                    <input type="text" id="birthday" v-model="detail.birthday">
                </div>

                <div class="input">
                    <label for="nation">民族</label>
                    <input type="text" id="nation" v-model="detail.nation">
                </div>

            </div>

            <div class="row long">

                <div class="input">
                    <label for="religion">宗教信仰</label>
                    <select name="religion" id="religion" @change = "getChange('religion',$event)">
                        <option value="无">无</option>
                        <option value="佛教">佛教</option>
                        <option value="伊斯兰教">伊斯兰教</option>
                        <option value="基督教">基督教</option>
                    </select>
                </div>

                <div class="input">
                    <label for="political">政治面貌</label>
                    <select name="political" id="political" @change = "getChange('political',$event)">
                        <option value="无">无</option>
                        <option value="群众">群众</option>
                        <option value="党员">党员</option>
                        <option value="团员">团员</option>
                        <option value="少先队员">少先队员</option>
                    </select>
                </div>

                <div class="input">
                    <label for="idcard">身份证号码</label>
                    <input type="text" id="idcard" v-model="detail.idcard">
                </div>

                <div class="input">
                    <label for="socialcode">社会保障号码</label>
                    <input type="text" id="socialcode" v-model="detail.socialcode">
                </div>

            </div>

            <div class="row long">

                <div class="input">
                    <label for="age">年龄</label>
                    <input type="number" id="age" v-model="detail.age">
                </div>

                <div class="input">
                    <label for="education">学历</label>
                    <select name="education" id="education" @change = "getChange('education',$event)">
                        <option value="小学">小学</option>
                        <option value="初中">初中</option>
                        <option value="高中">高中</option>
                        <option value="大专">大专</option>
                        <option value="本科">本科</option>
                        <option value="研究生">研究生</option>
                        <option value="硕士">硕士</option>
                        <option value="博士">博士</option>
                    </select>
                </div>

                <div class="input">
                    <label for="educationlimit">教育年限</label>
                    <select name="educationlimit" id="educationlimit" @change = "getChange('educationlimit',$event)">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div class="input">
                    <label for="profession">学历专业</label>
                    <input type="text" id="profession" v-model="detail.profession">
                </div>

            </div>

            <div class="row long">

                <div class="input">
                    <label for="standard">酬薪标准</label>
                    <input type="text" id="standard" v-model="detail.standard">
                </div>

                <div class="input">
                    <label for="openingbank">开户行</label>
                    <input type="text" id="openingbank" v-model="detail.openingbank">
                </div>

                <div class="input">
                    <label for="account">账号</label>
                    <input type="text" id="account" v-model="detail.account">
                </div>

                <div class="input">
                    <label for="loginman">登记人</label>
                    <input type="text" id="loginman" v-model="detail.loginman">
                </div>

            </div>

            <div class="row short">

                <div class="input">
                    <label for="address">地址</label>
                    <input type="text" id="address" v-model="detail.address">
                </div>

                <div class="input">
                    <label for="code">邮编</label>
                    <input type="text" id="code" v-model="detail.code">
                </div>

            </div>

            <div class="row area">

                <div class="textarea">
                    <label for="resume">个人履历</label>
                    <textarea name="resume" id="resume" v-model="detail.resume"></textarea>
                </div>

                <div class="textarea">
                    <label for="homemessage">家庭关系信息</label>
                    <textarea name="resume" id="homemessage" v-model="detail.homemessage"></textarea>
                </div>

                <div class="textarea">
                    <label for="remark">备注</label>
                    <textarea name="resume" id="remark" v-model="detail.remark"></textarea>
                </div>

            </div>

        </div>

        <div class="manager" ref="manager">
            <div class="manager-box">
                <div class="manager-color">
                <img class="manage-image">
                </div>
                <div class="manager-content">
                <span class="manage-content-head"></span>
                <div class="manage-content-first"></div>
                <div class="manage-content-second"></div>
                </div>
                <div class="manager-cancel">
                <i class="fa fa-location-arrow fa-2x"></i>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    import $ from 'jquery'

    import showWarn from '../js/warning.main.min.js'

    export default {
       
        data() {

            return {

                // 存放员工初始详情
                oldDetail:{},

                // 存放员工详情
                detail:{},

                imageUrl: ''

            }

        },

        methods: {

            // 获取下拉框的值
            getChange(str, event) {

                this[str] = event.target.value

            },

            // 提交表单信息
            sendMessage() {

                var _this = this

                for(var key in this.detail) {

                    this.detail[key] = this.detail[key] || this.oldDetail[key]

                }

                this.detail['fileNo'] = this.detail['fileNo'][0]

                console.log(this.detail)

                $.ajax({

                    url:"http://localhost:8888/correct",

                    type:"post",

                    data:_this.detail,

                    success(data) {

                        if(data.msg === "ok") {

                            _this.warnContent('success')

                        }else {

                            _this.warnContent('error')

                        }

                    },error() {

                        console.log("发送档案失败")

                        _this.warnContent('error')

                    }

                })

            },

            // 清除表单信息
            clean() {

                var input = document.querySelectorAll('input')

                var textarea = document.querySelectorAll('textarea')

                input.forEach((value, index) => {

                    if(index > 5)

                        value.value = ""

                })

                textarea.forEach((value) => {

                    value.value = ""

                })

            },

            // 配置提示框信息
            warnContent(command) {

                if(command === "success") {

                    showWarn({

                        // 图片的路径(可选 不填默认为蓝苹果)
                        imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                        // 大标题(可选 不填默认为"Error!")
                        headLine:"Success!",

                        // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                        firstLine:"You have successfully entered the archives.",

                        // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                        secondLine:"Welcome to the next use.",

                    })

                }else {

                    showWarn({

                        // 图片的路径(可选 不填默认为蓝苹果)
                        imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                        // 大标题(可选 不填默认为"Error!")
                        headLine:"Error!",

                        // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                        firstLine:"Sorry, upload failed.",

                        // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                        secondLine:"Probably because of the server, programmers are trying to fix it.",

                    })
                    
                }

                this.$refs.manager.style.display = 'block'

            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },

            // 保存图片信息
            beforeAvatarUpload(file) {

                this.file = file

            },

            // 查询该员工的所有信息
            getWorkerDetail() {

                var _this = this

                var data = {

                    fileNo:this.$store.state.fileNo

                }

                $.ajax({

                    url:"http://localhost:8888/getdetail",

                    type:"post",

                    data: data,

                    success(data) {

                        console.log(data)

                        _this.detail = _this.oldDetail = data.data

                        console.log( _this.detail)

                    },error() {

                        console.log("查找该用户失败")

                    }

                })

            },

        },

        mounted() {
            
            this.getWorkerDetail()

        }

    }

</script>

<style lang="scss" scoped>

    .message {
        position: relative;
        background:#f4f4f4;
        user-select: none;

        .message-head {
            position: relative;
            display: inline-block;
            padding:1rem 2rem;
            background:#6dd5fe;
            border:2px solid #6dd5fe;
            color:#fff;
            font-size: 1.1rem;
            transition: .5s;
            cursor: pointer;
        }

        .message-head:hover {
            color:#6dd5fe;
            background:#fff;
        }

        .message-form {
            position: relative;
            background:#fefefe;
            overflow: hidden;
            box-shadow: 3px 3px 8px rgb(223, 223, 223);

            .button {
                position: relative;
                display: flex;

                .picture {
                    position: relative;
                    text-align: right;
                    flex:1;

                    .avatar-uploader .el-upload {
                        border-radius: 6px;
                        border: 1px dashed #d9d9d9!important;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }
                    .avatar-uploader .el-upload:hover {
                        border-color: #409EFF;
                    }
                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        border: 1px dashed #d9d9d9!important;
                        margin:2rem 4rem .5rem 0;
                        width: 178px;
                        height: 178px;
                        line-height: 178px;
                        text-align: center;
                    }
                    .avatar {
                        position: relative;
                        margin:0 6.3rem 2.3rem 0;
                        width: 178px;
                        height: 178px;
                        display: block;
                    }

                    .picture-content {
                        position: relative;
                        display: inline-block;
                        margin-right: 6.5rem;
                    }
                }

                .button-area {
                    position: relative;
                    flex:1;
                    text-align: left;

                    span {
                        position: relative;
                        display: inline-block;
                        margin:2rem .5rem 0 .5rem;
                        padding: .5rem .8rem;
                        color:#fff;
                        background:#6dd5fe;
                        border:1px solid #6dd5fe;
                        cursor: pointer;
                        transition: .5s;
                    }

                    span:last-of-type {
                        background:#fff;
                        color:silver;
                        border:1px solid rgb(238, 238, 238);
                    }

                    span:first-of-type {
                        margin-left:2rem;
                    }

                    span:first-of-type:hover {
                        background:#fff;
                        color:#6dd5fe;
                    }
                }
            }

            .row:last-of-type {
                position: relative;
                margin-bottom: 1rem;
            }
            
            .row {
                position: relative;
                display: flex;
                text-align: right;
                border-bottom:1px solid silver;
                color:#5f6165;

                .necessary {
                    position: relative;
                    display: inline-block;
                    color:red;
                    right:.3rem;
                }

                .input {
                    position: relative;
                    margin:3rem 2rem 3rem 0;
                    white-space: nowrap;
                    flex:1;

                    input {
                        margin: 0 .5rem;
                        height:2.5rem;
                        width:78%;
                        outline: none;
                        border:1px solid silver;
                        border-radius: .3rem;
                        text-indent: 1rem;
                        color:#5f6165;
                        transition: 1s;
                    }

                    input:focus {
                        border:1px solid #5bb5ff;
                    }

                    select {
                        margin: 0 .5rem;
                        height:2.8rem;
                        width:78%;
                        border:1px solid silver;
                        border-radius: .3rem;
                        outline: none;
                        text-indent: 1rem;
                        color:#5f6165;
                        transition: 1s;
                    }

                    select:focus {
                        border:1px solid #5bb5ff;
                    }
                }

                .textarea {
                    position: relative;
                    margin:.5rem 2rem .5rem 0;
                                        white-space: nowrap;

                    color:#5f6165;
                    flex:1;
                    transition: 1s;

                    label {
                        vertical-align: top;
                    }

                    textarea {
                        margin: 0 .5rem;
                        width:77%;
                        height:5rem;
                        resize: none;
                        outline: none;
                        border:1px solid silver;
                        border-radius: .3rem;
                        transition: 1s;
                    }

                    textarea:focus {
                        border:1px solid #5bb5ff;
                    }

                }
            }

            .area {
                position: relative;
                margin-top:2rem;
                border:none;
            }

            .short {

                .input {

                    input {
                        width:85%;
                    }

                    select {
                        width:85%;
                    }
                }
            }

            .long {
                .input {

                    input {
                        width:70%;
                    }

                    select {
                        width:70%;
                    }
                }
            }
        }
    }
    
    
</style>

