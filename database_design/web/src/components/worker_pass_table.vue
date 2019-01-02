<template>
    
    <div class="pass-table">
        
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
                        Check
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
                        <span class="button" @click="checkDetail(items.fileNo)"><i class="fa fa-check-square-o fa-lg"></i>Check</span>
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

                // 表格数据
                tableList:[],

                // 存放页数
                pageTotal:[]

            }

        },

        methods: {

            // 初始化数组
            initialTableList(list) {

                var _this = this

                this.tableList.splice(0, this.tableList.length)

                list.forEach((value) => {

                    _this.tableList.push(value)

                })

            },

            // 获取表格数据总数
            getPageTotal() {

                var _this = this

                $.ajax({

                    url:"http://localhost:8888/getreadytotal",

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

            // 获取表格数据
            getData(id) {

                var _this = this

                $.ajax({

                    url:"http://localhost:8888/getready/?id="+id,

                    type:"get",

                    success(data) {

                        _this.initialTableList(data.data)

                    },error() {

                        console.log("请求审核列表失败")

                    }

                })

            },

            changeUI(id, event) {

                $(event.currentTarget).css({'background':"rgb(255, 188, 63)",'color':"#fff","border":"1px solid rgb(255, 188, 63)"}).siblings().css({'background':"#fff",'color':"#000","border":"1px solid #fff"})

                this.getList(id)

            },

            // 前往复核页面
            checkDetail(fileNo) {

                this.$store.commit('setFileNo',fileNo)

                this.$router.push({path:"/Home/worker_check"})

            },

        },

        mounted() {

            this.getPageTotal()
            
            this.getData(1)

        }

    }

</script>

<style lang="scss" scoped>

    .pass-table {
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
                            background:#6dd4fd;
                            border:2px solid #6dd4fd;
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
                            color:#6dd4fd;
                            background:#fff;
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

