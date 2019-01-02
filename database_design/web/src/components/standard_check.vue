<template>

    <div class="standard-set">

        <div class="form">

            <div class="row">

                <div class="input">
                    <label for="standardno">酬薪标准编号</label>
                    <input type="number" id="standardno" v-model="detail.standardNo" disabled>
                </div>

                <div class="input">
                    <label for="standardname"><span class="necessary">*</span>酬薪标准名称</label>
                    <input type="text" id="standardname" v-model="detail.standardname">
                </div>

                <div class="input">
                    <label for="standardtotal">酬薪总额</label>
                    <input type="number" id="standardtotal" v-model="detail.standardtotal" disabled>
                </div>

            </div>

            <div class="row">

                <div class="input">
                    <label for="fileNo">制定人档案编号</label>
                    <input type="number" id="fileNo" v-model="detail.fileNo" disabled>
                </div>

                <div class="input">
                    <label for="loginname"><span class="necessary">*</span>登记人</label>
                    <input type="text" id="loginname" v-model="detail.loginname">
                </div>

                <div class="input">
                    <label for="logintime">登记时间</label>
                    <input type="text" id="logintime" v-model="oldDetail.logintime" disabled>
                </div>

            </div>

            <div class="row">

                <div class="textarea">
                    <textarea name="opinion" id="opinion" placeholder="请填写复核意见" v-model = "opinion"></textarea>
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

                // 存放旧的薪酬详情
                oldDetail:{},

                // 存放新的酬薪详情
                detail:{},

                opinion:"",

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

                this.moneyArray.splice(0, this.moneyArray.length)

                for(let i = 0 ; i < 9 ; i ++) {

                    this.moneyArray.push(0)

                }

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

                this.detail.standardtotal = parseFloat(addSum - redSum).toFixed(2)

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

                if(this.$store.state.userMessage.role > 2) {

                    this.warnContent('authority')

                    return

                }

                for(var key in this.detail) {

                    this.detail[key] = this.detail[key] || this.oldDetail[key]

                }

                this.detail[logintime] = this.oldDetail[logintime]

                this.detail['opinion'] = this.opinion

                _this.detail.basic = _this.moneyArray[0] 

                _this.detail.traffic = _this.moneyArray[1]

                _this.detail.lunch = _this.moneyArray[2]

                _this.detail.communication = _this.moneyArray[3] 

                _this.detail.pension = _this.moneyArray[4] 

                _this.detail.unemployment = _this.moneyArray[5]

                _this.detail.medical = _this.moneyArray[6] 

                _this.detail.housing = _this.moneyArray[7] 

                _this.detail.reward = _this.moneyArray[8]  

                _this.detail.reducereward =  _this.moneyArray[9]

                $.ajax({

                    url:"http://localhost:8888/updatestandard",

                    type:"post",

                    data:_this.detail,

                    success(data) {

                        if(data.msg === 'ok') {

                            _this.warnContent('success')

                        }else {

                            _this.warnContent('error')

                        }

                    },error() {

                         _this.warnContent('error')

                    }

                })

            },
            
            // 请求已有数据
            getDetail() {

                var _this = this

                var data = {

                    standardNo:this.$store.state.standardNo

                }

                $.ajax({

                    url:"http://localhost:8888/getstandarddetail",

                    type:"post",

                    data:data,

                    success(data) {

                        if(data.msg === "ok") {

                            _this.detail = data.data

                            _this.oldDetail = $.extend(true, {}, data.data)

                            _this.detail.logintime = _this.getdate()

                            _this.moneyArray[0] = _this.detail.basic 

                            _this.moneyArray[1] = _this.detail.traffic 

                            _this.moneyArray[2] = _this.detail.lunch 

                            _this.moneyArray[3] = _this.detail.communication 

                            _this.moneyArray[4] = _this.detail.pension 

                            _this.moneyArray[5] = _this.detail.unemployment 

                            _this.moneyArray[6] = _this.detail.medical 

                            _this.moneyArray[7] = _this.detail.housing 

                            _this.moneyArray[8] = _this.detail.reward 

                            _this.moneyArray[9] = _this.detail.reducereward 

                        }

                    },error() {

                        console.log("请求酬薪标准详情失败")

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
                                    firstLine:"Sorry, upload failed.",

                                    // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                                    secondLine:"Probably because of the server, programmers are trying to fix it.",

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

                    case 'authority':showWarn({

                                        // 图片的路径(可选 不填默认为蓝苹果)
                                        imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                                        // 大标题(可选 不填默认为"Error!")
                                        headLine:"Authority!",

                                        // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                                        firstLine:"Sorry, You're not a salary Manager.",

                                        // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                                        secondLine:"Please, Contact Administrator to Improve Privileges.",

                                    });break;

                }

                this.$refs.manager.style.display = 'block'

            }

        },

        mounted() {

            var input = document.querySelectorAll('.input-money')

            input.forEach((value, index) => {

                if(index >=4 && index <= 7)

                    value.disabled = true

            })

            this.loginname = this.$store.state.userMessage.name

            this.getDetail()

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
                    text-align: center;
                    margin:.5rem 0 .5rem 0;
                    white-space: nowrap;
                    color:#5f6165;
                    flex:1;
                    transition: 1s;

                    label {
                        vertical-align: top;
                    }

                    textarea {
                        margin:1rem 0;
                        width:95%;
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
