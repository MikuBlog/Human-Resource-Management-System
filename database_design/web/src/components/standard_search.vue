<template>
    
    <div class="search">
        
        <div class="select-box">
            <div class="select">
                <el-input v-model="keyword_1" placeholder="Please enter the STD No."></el-input>
            </div>
            <div class="select">
                <el-input v-model="keyword_2" placeholder="Please enter the keywords."></el-input>
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
                        STD No
                    </th>
                    <th>
                        STD Name
                    </th>
                    <th>
                        STD Salary
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Login Name
                    </th>
                    <th>
                        Login Time
                    </th>
                    <th>
                        Operation
                    </th>
                </tr>

                <tr v-for="items in table">
                    <td>
                        {{items.standardNo}}
                    </td>
                    <td>
                        {{items.standardname}}
                    </td>
                    <td>
                        {{items.standardtotal}}
                    </td>
                    <td>
                        {{items.name}}
                    </td>
                    <td>
                        {{items.loginname}}
                    </td>
                    <td>
                        {{items.logintime}}
                    </td>
                    <td>
                        <span class="button" @click="correct(items.standardNo)"><i class="fa fa-check-square-o fa-lg"></i>Check Detail</span>
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

                keyword_1:"",

                keyword_2:"",

                // 表格数据
                table:[],

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

                date:""

            }

        },

        methods: {

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

            // 初始化列表
            initialList(list) {

                var _this = this

                this.table.splice(0, this.table.length)

                list.forEach((value) => {

                    _this.table.push(value)

                })

            },

            // 获取待复核酬薪数据
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

                    standardNo:this.keyword_1 || "%",

                    keywords:this.keyword_2 || "%",

                    start:dateArray[0],

                    end: dateArray[1]

                }

                $.ajax({

                    url:"http://localhost:8888/searchstandard",

                    type:"post",

                    data:data,

                    success(data) {

                        _this.initialList(data.data)

                    },error() {

                        console.log("请求待复核酬薪数据失败")

                    }

                })

            },
            
            // 前往修改页面
            correct(standardNo) {

                this.$store.commit('setStandardNo', standardNo)

                this.$router.push('/Home/standard_correct')

            }

        },

        mounted() {
            

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

                        .button:last-of-type:hover {
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

