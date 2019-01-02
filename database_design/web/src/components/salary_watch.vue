<template>
    
    <div class="salary-login">

        <div class="table">
            <table>

                <tr>
                    <th>
                        File No
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Basic
                    </th>
                    <th>
                        Traffic
                    </th>
                    <th>
                        Lunch
                    </th>
                    <th>
                        Communication
                    </th>
                    <th>
                        Pension
                    </th>
                    <th>
                        Unemployment
                    </th>
                    <th>
                        Medical
                    </th>
                    <th>
                        Housing
                    </th>
                    <th>
                        Reward
                    </th>
                    <th>
                        Deduction of bonus
                    </th>
                </tr>

                <tr v-for="items in table">

                    <td>
                        {{items.fileNo}}
                    </td>
                    <td>
                        {{items.name}}
                    </td>
                    <td>
                        {{items.basic}}
                    </td>
                    <td>
                        {{items.traffic}}
                    </td>
                    <td>
                        {{items.lunch}}
                    </td>
                    <td>
                        {{items.communication}}
                    </td>
                    <td>
                        {{items.pension}}
                    </td>
                    <td>
                        {{items.unemployment}}
                    </td>
                    <td>
                        {{items.medical}}
                    </td>
                    <td>
                        {{items.housing}}
                    </td>
                    <td>
                        {{items.reward}}
                    </td>
                    <td>
                        {{items.reducereward}}
                    </td>

                </tr>

            </table>
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

                // 列表数据
                table:[],

                sum:0,

            }

        },

        methods: {

            // 获取金额总数
            getTotal() {

                var _this = this

                var list = this.table

                _this.sum = 0

                list.forEach((value) => {

                    value.pension = value.basic * 0.08

                    value.medical = value.basic * 0.02 + 3

                    value.unemployment = value.basic * 0.005

                    value.housing = value.basic * 0.08

                    _this.sum += parseFloat(value.basic)

                    _this.sum += parseFloat(value.traffic)

                    _this.sum += parseFloat(value.lunch)

                    _this.sum += parseFloat(value.communication)

                    _this.sum -= parseFloat(value.pension)

                    _this.sum -= parseFloat(value.medical)

                    _this.sum -= parseFloat(value.housing)

                    _this.sum += parseFloat(value.reward)

                    _this.sum -= parseFloat(value.reducereward)

                    value.standardtotal = parseFloat(value.basic) + parseFloat(value.traffic) + parseFloat(value.lunch) + parseFloat(value.communication) - parseFloat(value.pension) - parseFloat(value.medical) - parseFloat(value.housing) - parseFloat(value.unemployment) + parseFloat(value.reward) - parseFloat(value.reducereward)

                })

                console.log(list)

                console.log(_this.sum)

            },

            // 初始化数组列表
            initialList(list) {

                var _this = this

                this.table.splice(0, this.table.length)

                list.forEach((value) => {

                    _this.table.push(value)

                })

            },
            
            // 获取所有职工信息及对应酬薪详情
            getDetail() {

                var _this = this

                var data = {

                    grantNo:this.$store.state.grantNo

                }

                console.log(data.grantNo)

                $.ajax({

                    url:"http://localhost:8888/getsalaryworker",

                    type:"post",

                    data:data,

                    success(data) {

                        _this.initialList(data.data)

                        console.log(data.data)

                    },error() {

                        console.log("请求职工信息失败")

                    }

                })

            },

            // 发送信息
            sendMessage() {

                var _this = this

                this.table.forEach((value, index) => {

                    $.ajax({

                        url:"http://localhost:8888/loginsalary",

                        type:"post",

                        data:_this.table[index],

                        success(data) {

                            console.log(data)

                        },error() {

                            console.log("发送请求失败")

                        }

                    })

                    $.ajax({

                        url:"http://localhost:8888/updatestandardtotal",

                        type:"post",

                        data: {

                            standardtotal:_this.table[index].standardtotal,

                            standardNo:_this.table[index].standardNo

                        },

                        success(data) {

                            console.log(data)

                        },error() {

                            console.log("更新失败")

                        }

                    })

                })

                $.ajax({

                    url:"http://localhost:8888/updatesumary",

                    type:"post",

                    data:{

                        grantNo:this.table[0].grantNo,

                        sumary:_this.sum

                    },

                    success(data) {

                        console.log(data)

                    },error() {

                        console.log("请求失败")

                    }

                })

            }

        },

        mounted() {

            this.getDetail()

        }

    }

</script>

<style lang="scss" scoped>

    .salary-login {
        position: relative;

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
                            background:#65c13e;
                            border:2px solid #65c13e;
                            border-radius: .3rem;
                            padding:.5rem 1rem;
                            color:rgb(255, 255, 255);
                            transition: .5s;
                            cursor: pointer;

                            i {
                                margin-right:.3rem;
                            }
                        }

                        .button:hover {
                            background:#fff;
                            color:#65c13e;
                        }

                        input {
                            height:2.5rem;
                            width:50%;
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
