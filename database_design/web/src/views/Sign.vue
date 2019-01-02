<template>
    
    <div class="sign">
        
        <div class="sign-box">

            <div class="sign-head">

                Administration

            </div>

            <div class="box-content">

                <input type="text" name="hidden1" style="position:absolute;opacity:0;top:10000rem">
                <input type="password" name="hidden2"  style="position:absolute;opacity:0;top:10000rem">


                <div class="input">

                    <label for="username" id='first' ref="first">Username</label>
                    <input type="text" id='username' v-model="username" @focus="up('first')" autocomplete="off">

                </div>

                <div class="input">

                    <label for="password" id='second' ref="second">Password</label>
                    <input type="password" id='password' v-model="password" @focus="up('second')" autocomplete="off">

                </div>

                <div class="button">

                    <span @click="login()">Sign In</span>

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

    import Vue from 'vue'

    export default {
       
       data() {

           return {

               // 存放用户名
               username:"",
               // 存放用户密码
               password:""

           }

       },

       methods: {

            // label动态效果
            up(str) {

                this.$refs[str].style.bottom = '3rem'

                this.$refs[str].style.left = '5rem'

                this.$refs[str].style.fontSize = '1rem'

            },

            // 登录
            login() {

                var _this = this

                $.ajax({

                    url:"http://localhost:8888/login",

                    type:"post",

                    data:{

                        username:_this.username,

                        password:_this.password

                    },

                    success(data) {

                        if(data.msg === 'ok') {

                            if(data.data.roleName == '人事经理' || data.data.roleName == '人事专员') {

                                _this.go('人事',data.data)

                            }else {

                                _this.go('薪酬',data.data)

                            }

                        }else {

                            _this.$refs.manager.style.display = 'block'

                        }

                    },error() {

                        console.log("登录失败")

                    }

                })

            },

            go(command,data) {

                this.$store.commit('setUserMessage',data)

                if(command == "人事") {

                    this.$router.push({path:'/Home/worker_message'})

                }else {

                    this.$router.push({path:'/Home/worker_search'})

                }

            }

       },

       mounted() {
           
           showWarn({

                // 图片的路径(可选 不填默认为蓝苹果)
                imgSrc:"https://mikuimg.oss-cn-shenzhen.aliyuncs.com/Plugin/warning/%E6%B0%B4%E6%9E%9C.png",

                // 大标题(可选 不填默认为"Error!")
                headLine:"FAILED!",

                // 第一行文字(可选 不填默认为"You do not have administrator privileges.")
                firstLine:"You failed to log in.",

                // 第二行文字(可选 不填默认为"Please get administrator privileges.")
                secondLine:"Please try again.",

            })

       }

    }

</script>

<style lang="scss" scoped>

    .sign {
        position: relative;
        height:100%;

        .sign-box {
            position: relative;
            overflow: hidden;
            height:100%;
            background:url(http://demo.cssmoban.com/cssthemes3/mbts_30_Wopop/Wopop_files/login_bgx.gif) repeat;
            text-align: center;

            .sign-head {
                position: relative;
                font-style: italic;
                font-size: 4rem;
                font-weight: bold;
                margin: 10rem 0 3rem 0;
                color:#a1c4fd;
            }

            .sign-head:first-letter {
                font-size: 5rem;
                color:rgb(0, 0, 255);
            }

            .box-content {
                position: relative;
                height:20rem;
                width:30rem;
                background:#fff;
                display: inline-block;
                box-shadow: 5px 5px 5px rgb(218, 218, 218);
                border-radius: .5rem;

                .input {
                    position: relative;
                    margin:3rem 0;

                    label {
                        position: absolute;
                        bottom:.7rem;
                        left:6rem;
                        color:silver;
                        font-size: 1.1rem;
                        transition: .5s;
                    }

                    input {
                        outline: none;
                        width:20rem;
                        height:2.5rem;
                        border:1px solid silver;
                        border-radius: .3rem;
                        text-indent: 1rem;
                        font-size: 1.1rem;
                    }

                }

                .input:first-of-type {
                    margin-top:5rem;
                }

                .button {
                    position: relative;
                    text-align: right;

                    span {
                        background-image:linear-gradient(to right bottom,#c2e9fb,#a1c4fd);
                        display: inline-block;
                        width:5rem;
                        line-height: 2rem;
                        text-align: center;
                        margin-right:5rem;
                        border-radius: .3rem;
                        color:white;
                        cursor: pointer;
                        transition: .5s;
                    }

                    span:active {
                        background-image:linear-gradient(to right bottom,#130ffd,#130ffd);
                    }

                }

            }

        }

    }
    
</style>

