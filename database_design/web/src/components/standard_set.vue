<template>

    <div class="standard-set">

        <div class="form">

            <div class="row">

                <div class="input">
                    <label for="standardno">酬薪标准编号</label>
                    <input type="number" id="standardno" v-model="standardNo" disabled>
                </div>

                <div class="input">
                    <label for="standardname"><span class="necessary">*</span>酬薪标准名称</label>
                    <input type="text" id="standardname" v-model="standardname">
                </div>

                <div class="input">
                    <label for="standardtotal">酬薪总额</label>
                    <input type="number" id="standardtotal" v-model="standardtotal" disabled>
                </div>

            </div>

            <div class="row">

                <div class="input">
                    <label for="fileNo"><span class="necessary">*</span>制定人档案编号</label>
                    <input type="number" id="fileNo" v-model="fileNo">
                </div>

                <div class="input">
                    <label for="loginname"><span class="necessary">*</span>登记人</label>
                    <input type="text" id="loginname" v-model="loginname">
                </div>

                <div class="input">
                    <label for="logintime">登记时间</label>
                    <input type="text" id="logintime" v-model="logintime" disabled>
                </div>

            </div>

        </div>

        <div class="table">

                <table>

                    <tr>
                        <th>
                            No
                        </th>
                        <th>
                            STD Name
                        </th>
                        <th>
                            Money
                        </th>
                    </tr>

                    <tr v-for="(item,index) in items">

                        <td>{{item.no}}</td>

                        <td>{{item.name}}</td>

                        <td>
                            <input type="number" class="input-money" v-model="moneyArray[index]">
                        </td>

                    </tr>


                </table>

        </div>

        <div class="button">
            <span @click="sendMessage()">Submit</span><span @click="getTotal()">Settlement</span><span @click="clean()">Delete</span>
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

                standardNo:"",

                standardname:"",

                standardtotal:0,

                fileNo:"",

                loginname:"",

                logintime:"",

                moneyArray:[0,0,0,0,0,0,0,0,0,0],

                items:[{
                    no:1,
                    name:"基本工资",
                    basic:""
                },{
                    no:2,
                    name:"交通补助",
                    traffic:""
                },{
                    no:3,
                    name:"午餐补助"
                },{
                    no:4,
                    name:"通信补助"
                },{
                    no:5,
                    name:"养老保险"
                },{
                    no:6,
                    name:"失业保险"
                },{
                    no:7,
                    name:"医疗保险"
                },{
                    no:8,
                    name:"住房公积金"
                },{
                    no:9,
                    name:"奖金"
                },{
                    no:10,
                    name:"扣除奖金"
                }]

            }

        },

        methods: {

            // 清除表单信息
            clean() {

                var input = document.querySelectorAll('.input-money')

                var inputHead = document.querySelectorAll('input')

                input.forEach((value) => {

                    value.value = ""

                })

                inputHead.forEach((value) => {

                    value.value = ""

                })

            },

            // 计算酬薪总额
            getTotal() {

                var addSum = 0, redSum = 0

                this.moneyArray[4] = parseFloat(this.moneyArray[0] * 0.08).toFixed(2)

                this.moneyArray[5] = parseFloat(this.moneyArray[0] * 0.02 + 3).toFixed(2)

                this.moneyArray[6] = parseFloat(this.moneyArray[0] * 0.005).toFixed(2)

                this.moneyArray[7] = parseFloat(this.moneyArray[0] * 0.08).toFixed(2)

                this.moneyArray.forEach((value, index) => {

                    if(index < 4 || index >=7) {

                        addSum += parseFloat(value)

                    }else {

                        redSum += parseFloat(value)

                    }
                    
                })

                this.standardtotal = parseFloat(addSum - redSum).toFixed(2)

            },

            // 获取时间
            getdate() {
                var now = new Date(),
                    y = now.getFullYear(),
                    m = ("0" + (now.getMonth() + 1)).slice(-2),
                    d = ("0" + now.getDate()).slice(-2);
                return y + "-" + m + "-" + d
            },

            // 发送数据
            sendMessage() {

                var _this = this

                if(this.standardNo == "" || this.standardtotal == "" || this.fileNo == "" || this.loginname == "" || this.logintime == "") {

                    this.warnContent('complete')

                    return

                }

                var data = {

                    standardNo:this.standardNo,

                    standardname:this.standardname,

                    standardtotal:this.standardtotal || 0,

                    fileNo:this.fileNo,

                    loginname:this.loginname,

                    logintime:this.logintime, 

                    basic:this.moneyArray[0] || 0,

                    traffic:this.moneyArray[1] || 0,

                    lunch:this.moneyArray[2] || 0,

                    communication:this.moneyArray[3] || 0,

                    pension:this.moneyArray[4] || 0,

                    unemployment:this.moneyArray[5] || 0,

                    medical:this.moneyArray[6] || 0,

                    housing:this.moneyArray[7] || 0,

                    reward:this.moneyArray[8] || 0,

                    reducereward:this.moneyArray[9] || 0,

                }

                $.ajax({

                    url:"http://localhost:8888/uploadstandard",

                    type:"post",

                    data:data,

                    success(data) {

                        if(data.msg === 'ok') {

                            _this.warnContent('success')
                            
                            _this.clean()

                            _this.getStandardNo()

                        }else {

                            _this.warnContent('error')

                        }

                    },error() {

                        _this.warnContent('error')

                    }

                })

            },

            // 配置提示框信息
            warnContent(command) {

                switch(command) {

                    case "success":showWarn({

                                    // 图片的路径(可选 不填默认为蓝苹果)
                                    imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                                    // 大标题(可选 不填默认为"Error!")
                                    headLine:"Success!",

                                    // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                                    firstLine:"You have successfully entered the archives.",

                                    // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                                    secondLine:"Welcome to the next use.",

                                });break;

                    case 'error':showWarn({

                                    // 图片的路径(可选 不填默认为蓝苹果)
                                    imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                                    // 大标题(可选 不填默认为"Error!")
                                    headLine:"Error!",

                                    // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                                    firstLine:"The file has not been audited or deleted.",

                                    // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                                    secondLine:"Please review or restore files.",

                                });break;

                    case 'complete':showWarn({

                                        // 图片的路径(可选 不填默认为蓝苹果)
                                        imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                                        // 大标题(可选 不填默认为"Error!")
                                        headLine:"Error!",

                                        // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                                        firstLine:"Please complete the information.",

                                        // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                                        secondLine:"Then submit the information.",

                                    });break;

                    case 'upload':showWarn({

                                        // 图片的路径(可选 不填默认为蓝苹果)
                                        imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                                        // 大标题(可选 不填默认为"Error!")
                                        headLine:"Error!",

                                        // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                                        firstLine:"Please upload your Avatar.",

                                        // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                                        secondLine:"Then submit the information.",

                                    });break;

                }

                this.$refs.manager.style.display = 'block'

            },

            // 获取当前酬薪编号
            getStandardNo() {

                var _this = this

                $.ajax({

                    url:"http://localhost:8888/getstandardno",

                    type:"get",

                    success(data) {

                        _this.standardNo = data.standardNo

                        console.log(data)

                    },error() {

                        console.log("获取酬薪编号失败")

                    }

                })

            }

        },

        mounted() {

            var input = document.querySelectorAll('.input-money')

            input.forEach((value, index) => {

                if(index >=4 && index <= 7)

                    value.disabled = true

            })

            this.logintime = this.getdate()

            this.loginname = this.$store.state.userMessage.name

            this.getStandardNo()

        }
    }

</script>

<style lang="scss" scoped>

    .standard-set {
        position: relative;
        background:#f4f4f4;
        user-select: none;

        .form {
            position: relative;
            background:#fefefe;
            overflow: hidden;
            box-shadow: 3px 3px 8px rgb(223, 223, 223);

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
                        width:65%;
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

        }

        .table {
            position: relative;
            background:#fefefe;
            overflow: hidden;
            margin-top:1rem;
            box-shadow: 3px 3px 8px rgb(223, 223, 223);

            table {
                position: relative;
                border-collapse:collapse;
                text-align: center;
                width:100%;

                tr:first-of-type {
                    background:#6dd5fe;
                }

                tr:first-of-type:hover {
                    background:#6dd5fe;
                }

                tr {
                    position: relative;
                    transition: .5s;

                    th {
                        position: relative;
                        padding:1rem 0;
                        color:#fff;
                    }

                    td {
                        position: relative;
                        padding:1rem 0;
                        border:1px solid rgb(231, 231, 231);

                        .button {
                            position: relative;
                            display: inline-block;
                            background:#6dd4fd;
                            border:2px solid #6dd4fd;
                            padding:.5rem 1rem;
                            margin: 0 .5rem;
                            color:rgb(255, 255, 255);
                            border-radius: .3rem;
                            transition: .5s;
                            cursor: pointer;

                            i {
                                position: relative;
                                margin-right:.4rem;
                                top:-.1rem;
                            }
                        }

                        .button:nth-of-type(2) {
                            background:#f46c6c;
                            border:2px solid #f46c6c;

                            i {
                                top:0;
                            }
                        }

                        .button:last-of-type {
                            background:#65c13e;
                            border:2px solid #65c13e;
                            
                            i {
                                top:0;
                            }
                        }

                        .button:hover {
                            color:#6dd4fd;
                            background:#fff;
                        }

                        .button:nth-of-type(2):hover {
                            background:#fff;
                            color:#f46c6c;
                        }

                        .button:nth-of-type(3):hover {
                            background:#fff;
                            color:#65c13e;
                        }

                        .input-money {
                            margin: 0 .5rem;
                            height:2.5rem;
                            width:30%;
                            outline: none;
                            border:1px solid silver;
                            border-radius: .3rem;
                            text-indent: 1rem;
                            color:#5f6165;
                            transition: 1s;
                        }

                        .input-money:focus {
                            border:1px solid #5bb5ff;
                        }
                    }
                }

                tr:hover {
                    background:rgb(245, 245, 245);
                }

            }
        }

        .button {
                position: relative;
                text-align: right;

                span {
                        position: relative;
                        display: inline-block;
                        margin:2rem .5rem 0 .5rem;
                        padding: .5rem .8rem;
                        color:#fff;
                        background:#6dd5fe;
                        border:1px solid #6dd5fe;
                        border-radius: .3rem;
                        cursor: pointer;
                        transition: .5s;
                    }

                    span:last-of-type {
                        background:#fff;
                        color:silver;
                        border:1px solid rgb(238, 238, 238);
                    }

                    span:nth-of-type(2) {
                        background:#65c13e;
                        border:1px solid #65c13e;
                    }

                    span:first-of-type {
                        margin-left:2rem;
                    }

                    span:first-of-type:hover {
                        background:#fff;
                        color:#6dd5fe;
                    }

                    span:nth-of-type(2):hover {
                        background:#fff;
                        color:#65c13e;
                    }
            }
    }

</style>
