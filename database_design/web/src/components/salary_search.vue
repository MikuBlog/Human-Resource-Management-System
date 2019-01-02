<template>
    
    <div class="salary-search">

        <div class="select-box">
            <div class="select">
                <el-input v-model="keyword_1" placeholder="Please enter the Grant No."></el-input>
            </div>
            <div class="select">
                <el-input v-model="keyword_2" placeholder="Please enter the keywords."></el-input>
            </div>
            <div class="button">
                <span @click="search()"><i class="fa fa-search fa-lg"></i>Search</span>
            </div>
        </div>

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
                        <span class="button" @click="go(items.grantNo)"><i class="fa fa-eye fa-lg"></i>Detail</span>
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

                // 存放待复核列表信息
                table:[]

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

            search() {

                var _this = this

                var data = {

                    grantNo:this.keyword_1 || "%",

                    keywords:this.keyword_2 || "%"

                }

                $.ajax({

                    url:"http://localhost:8888/searchsalary",

                    type:"post",

                    data:data,

                    success(data) {

                        _this.initialList(data.data)

                    },error() {

                        console.log("搜索酬薪复核表失败")

                    }

                })

            },

            // 前往详情页面
            go(grantNo) {

                this.$store.commit('setGrantNo', grantNo)

                this.$router.push({path:"/Home/salary_watch"})

            }

        },

        mounted() {



        }

    }

</script>

<style lang="scss" scoped>

    .salary-search {
        position: relative;
        background:#fefefe;
        user-select: none;

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
