<template>
    
    <div class="search">
        
        <div class="select-box">
            <div class="select">
                <el-select v-model="value_1" placeholder="mechanism.1">
                    <el-option
                    v-for="item in options_1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select">
                <el-select v-model="value_2" placeholder="mechanism.2">
                    <el-option
                    v-for="item in options_2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select">
                <el-select v-model="value_3" placeholder="mechanism.3">
                    <el-option
                    v-for="item in options_3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select">
                <el-select v-model="value_4" placeholder="JobType">
                    <el-option
                    v-for="item in options_4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select">
                <el-select v-model="value_5" placeholder="JobName">
                    <el-option
                    v-for="item in options_5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="select">
                <el-date-picker
                v-model="date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
            <div class="button">
                <span @click="search()"><i class="fa fa-search fa-lg"></i>Search</span>
            </div>
        </div>

        <div class="table">

            <table>

                <tr>
                    <th>
                        fileNo
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Sex
                    </th>
                    <th>
                        mechanism.1
                    </th>
                    <th>
                        mechanism.2
                    </th>
                    <th>
                        mechanism.3
                    </th>
                    <th>
                        JobName
                    </th>
                    <th>
                        status
                    </th>
                    <th>
                        isCheck
                    </th>
                    <th v-show="isButton">
                        operation
                    </th>
                </tr>

                <tr v-for="items in tableList">
                    <td>
                        {{items.fileNo}}
                    </td>
                    <td>
                        {{items.name}}
                    </td>
                    <td>
                        {{items.sex}}
                    </td>
                    <td>
                        {{items.first}}
                    </td>
                    <td>
                        {{items.second}}
                    </td>
                    <td>
                        {{items.third}}
                    </td>
                    <td>
                        {{items.jobname}}
                    </td>
                    <td>
                        {{items.exist}}
                    </td>
                    <td>
                        {{items.workerstatus}}
                    </td>
                    <td v-show="isButton">
                        <span class="button" @click="correctDetail(items.fileNo)"><i class="fa fa-eye fa-lg"></i>Check Details</span>
                        <span class="button" @click="del(items.fileNo)"><i class="fa fa-trash fa-lg"></i>throw</span>
                        <span class="button" @click="recover(items.fileNo)"><i class="fa fa-refresh fa-lg"></i>recover</span>
                    </td>
                </tr>

            </table>

        </div>

    </div>

</template>

<script>

    import $ from 'jquery'

    export default {
       
        data() {

            return {

                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

                // 设置按钮状态
                isButton:true,

                date: '',

                options_1:[{
                    value:"01",
                    label:"集团"
                },{
                    value:"02",
                    label:"司法厅"
                }],

                options_2:[{
                    value:"01",
                    label:"互联网公司"
                },{
                    value:"02",
                    label:"娱乐公司"
                },{
                    value:"03",
                    label:"电子公司"
                }],

                options_3:[{
                    value:"01",
                    label:"运维组"
                },{
                    value:"02",
                    label:"UI组"
                },{
                    value:"03",
                    label:"前端组"
                },{
                    value:"04",
                    label:"后台组"
                },{
                    value:"05",
                    label:"数据分析组"
                },{
                    value:"06",
                    label:"人工智能组"
                },{
                    value:"07",
                    label:"嵌入式系统组"
                },{
                    value:"08",
                    label:"游戏开发组"
                }],

                options_4:[{
                    value:"软件开发",
                    label:"软件开发"
                },{
                    value:"网页开发",
                    label:"网页开发"
                },{
                    value:"游戏开发",
                    label:"游戏开发"
                },{
                    value:"硬件开发",
                    label:"硬件开发"
                }],

                options_5:[{
                    value:"软件开发工程师",
                    label:"软件开发工程师"
                },{
                    value:"前端开发工程师",
                    label:"前端开发工程师"
                },{
                    value:"后台开发工程师",
                    label:"后台开发工程师"
                },{
                    value:"UI开发工程师",
                    label:"UI开发工程师"
                },{
                    value:"人工智能开发工程师",
                    label:"人工智能开发工程师"
                },{
                    value:"游戏引擎开发工程师",
                    label:"游戏引擎开发工程师"
                }],

                value_1:"",

                value_2:"",

                value_3:"",

                value_4:"",

                value_5:"",

                // 表格数据
                tableList:[]

            }

        },

        methods: {

            // 初始化数组
            initialTableList(list) {

                var _this = this

                this.tableList.splice(0,this.tableList.length)

                list.forEach((value) => {

                    _this.tableList.push(value)

                })

            },

            // 格式化时间
            formateDate() {

                var date_1 = new Date(this.date[0])

                var date_2 = new Date(this.date[1])

                var time_1 = {

                    year:date_1.getFullYear(),

                    month:date_1.getMonth() + 1,

                    date:date_1.getDate()

                }

                var time_2 = {

                    year:date_2.getFullYear(),

                    month:date_2.getMonth() + 1,

                    date:date_2.getDate()

                }

                return [time_1.year+"-"+time_1.month+"-"+time_1.date, time_2.year+"-"+time_2.month+"-"+time_2.date]

            },

            // 查询搜索结果
            search() {

                var _this = this

                var dateArray = []

                if(this.date == "") {

                    var time_1 = new Date().getFullYear()+"-"+(new Date().getMonth() + 1) + "-" + 1

                    var time_2 = new Date().getFullYear()+"-"+(new Date().getMonth() + 1) + "-" + new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()

                    dateArray.push(time_1)

                    dateArray.push(time_2)

                }else {

                    dateArray = this.formateDate()                    

                }

                var data = {

                    first:this.value_1,

                    second:this.value_2,

                    third:this.value_3,

                    jobtype:this.value_4,

                    jobname:this.value_5,

                    start:dateArray[0],

                    end:dateArray[1]

                }

                $.ajax({

                    url:"http://localhost:8888/search",

                    type:"post",

                    data:data,

                    success(data) {

                        _this.initialTableList(data.data)

                    },error() {

                        console.log("查询失败")

                    }

                })

            },

            // 获取员工详情
            correctDetail(fileNo) {

                this.$store.commit('setFileNo',fileNo)

                this.$router.push({path:"/Home/worker_correct"})

            },

            // 删除该职工信息
            del(fileNo) {

                var _this = this

                var data = {

                    fileNo:fileNo

                }

                $.ajax({

                    url:"http://localhost:8888/delete",

                    type:"post",

                    data:data,

                    success(data) {

                        _this.search()

                    },error() {

                        console.log("删除失败")

                    }

                })

            },

            // 恢复该职工信息
            recover(fileNo) {

                var _this = this

                var data = {

                    fileNo:fileNo

                }

                $.ajax({

                    url:"http://localhost:8888/recover",

                    type:"post",

                    data:data,

                    success(data) {

                        _this.search()

                    },error() {

                        console.log("删除失败")

                    }

                })

            }

        },

        mounted() {

            var user = this.$store.state.userMessage
            
            if(user.roleName != '人事经理' || user.roleName != "人事专员") {

                this.isButton = false

            }

        }

    }

</script>

<style lang="scss" scoped>

    .search {
        position: relative;
        background:#fefefe;

        .select-box {
            position: relative;
            display: flex;
            justify-content: space-around;
            overflow: hidden;
            box-shadow: 3px 3px 8px rgb(223, 223, 223);

            .select {
                position: relative;
                margin:1rem 3rem;
                flex:1;
            }

            .button {
                position: relative;
                margin:1.5rem 3rem;

                span {
                    padding:.5rem 1rem;
                    background:#6dd5fe;
                    border:2px solid #6dd5fe;
                    border-radius: .3rem;
                    color:#fff;
                    transition: .5s;
                    cursor: pointer;

                    i {
                        margin-right:.3rem;
                    }
                }

                span:hover {
                    color:#6dd5fe;
                    background:#fff;
                }
            }
        }

        .table {
            position: relative;
            background:#fefefe;
            overflow: hidden;
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
                    }
                }

                tr:hover {
                    background:rgb(245, 245, 245);
                }

            }

        }
    }
    
</style>

