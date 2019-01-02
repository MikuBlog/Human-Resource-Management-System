<template>
    
    <div class="salary-login-table">

        <div class="table">
            <table>

                <tr>
                    <th>
                        Grant No
                    </th>
                    <th>
                        Mechanism.1
                    </th>
                    <th>
                        Mechanism.2
                    </th>
                    <th>
                        Mechanism.3
                    </th>
                    <th>
                        Amount of People
                    </th>
                    <th>
                        Total
                    </th>
                    <th>
                        Operation
                    </th>
                </tr>

                <tr v-for="items in table">

                    <td>
                        SG{{items.grantNo}}
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
                        {{items.people}}
                    </td>

                    <td>
                        {{items.sumary}}
                    </td>

                    <td>
                        <span class="button" @click="login(items.grantNo)"><i class="fa fa-check-square-o fa-lg"></i>Check</span>
                    </td>

                </tr>

            </table>
        </div>

        <div class="next">
            <span v-for="items in pageTotal" @click="changeUI(items,$event)">{{items}}</span>
        </div>

    </div>

</template>

<script>

    import $ from 'jquery'

    export default {

        data() {

            return {

                // 存放待复核列表信息
                table:[],

                // 存放页数
                pageTotal:[]

            }

        },

        methods: {

            // 初始化列表信息
            initialList(list) {

                var _this = this

                this.table.splice(0, this.table.length)

                list.forEach((value) => {

                    this.table.push(value)

                })

            },

            // 获取表格数据总数
            getPageTotal() {

                var _this = this

                $.ajax({

                    url:"http://localhost:8888/getsalaryreadytotal",

                    type:"get",

                    success(data) {

                        for(var i = 1 ; i <= Math.ceil(data.count/8) ; i ++) {

                            _this.pageTotal.push(i)

                        }

                    },error() {

                        console.log("请求页数失败")

                    }

                })

            },

            // 获取列表信息
            getList(id) {

                var _this = this

                $.ajax({

                    url:"http://localhost:8888/getsalary?id="+id,

                    type:"get",

                    success(data) {

                        _this.initialList(data.data)

                    },error() {

                        console.log("请求列表失败")

                    }

                })

            },

            changeUI(id, event) {

                $(event.currentTarget).css({'background':"rgb(255, 188, 63)",'color':"#fff","border":"1px solid rgb(255, 188, 63)"}).siblings().css({'background':"#fff",'color':"#000","border":"1px solid #fff"})

                this.getList(id)

            },

            // 前往登记页面
            login(grantNo) {

                this.$store.commit('setGrantNo', grantNo)

                this.$router.push({path:"/Home/salary_login"})

            }

        },

        mounted() {

            this.getPageTotal()

            this.getList(1)

        }

    }

</script>

<style lang="scss" scoped>

    .salary-login-table {
        position: relative;
        background:#f4f4f4;
        user-select: none;

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
                    }
                }

                tr:hover {
                    background:rgb(245, 245, 245);
                }

            }

        }

        .next {
            position: relative;
            text-align: center;
            margin-top:1rem;

            span {
                position: relative;
                display: inline-block;
                padding:.3rem .7rem;
                background:#fff;
                border:1px solid #fff;
                border-radius: 50%;
                margin:0 .3rem;
                cursor: pointer;
                transition: .3s;
            }

            span:first-of-type {
                background:rgb(255, 188, 63);
                border:1px solid rgb(255, 188, 63);
                color:#fff;
            }

            span:hover {
                border:1px solid rgb(255, 188, 63);
            }

        }

    }

</style>
