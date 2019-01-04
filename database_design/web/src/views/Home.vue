<template>
  <div class="home">
    <div class="home-box">
      <div class="box-head">
        <div class="box-user">
          <span>
            <i class="fa fa-user-circle fa-lg"></i>
            {{user.name}}
            <div class="arrow"></div>
            <div class="slide" @click="refresh()">注销</div>
          </span>
          
          <span @click="back()" title="返回上一页">
            <i class="fa fa-angle-double-right fa-lg"></i>
          </span>
        </div>
      </div>

      <div class="box-left">
        <div class="box-menu">Menu</div>

        <div
          class="box-menu-items top"
          @click="changeUrl('/Home/worker_message',$event)"
          v-show="power"
        >
          <div>
            <i class="fa fa-address-card fa-lg"></i>
          </div>
          <span>File Entry</span>
        </div>

        <div
          class="box-menu-items"
          @click="changeUrl('/Home/worker_pass_table',$event)"
          v-show="power"
        >
          <div>
            <i class="fa fa-save fa-lg"></i>
          </div>
          <span>Review List</span>
        </div>

        <div class="box-menu-items second" @click="changeUrl('/Home/worker_search',$event)">
          <div>
            <i class="fa fa-search fa-lg"></i>
          </div>
          <span>File Query</span>
        </div>

        <div class="box-menu-items" @click="changeUrl('/Home/standard_set',$event)" v-show="!power">
          <div>
            <i class="fa fa-cny fa-lg"></i>
          </div>
          <span>Salary STD</span>
        </div>

        <div
          class="box-menu-items"
          @click="changeUrl('/Home/standard_login_table',$event)"
          v-show="!power"
        >
          <div>
            <i class="fa fa-pie-chart fa-lg"></i>
          </div>
          <span>Review STD</span>
        </div>

        <div
          class="box-menu-items"
          @click="changeUrl('/Home/standard_search',$event)"
          v-show="!power"
        >
          <div>
            <i class="fa fa-search fa-lg"></i>
          </div>
          <span>STD Query</span>
        </div>

        <div
          class="box-menu-items"
          @click="changeUrl('/Home/salary_login_table',$event)"
          v-show="!power"
        >
          <div>
            <i class="fa fa-bar-chart fa-lg"></i>
          </div>
          <span>Salary Login</span>
        </div>

        <div
          class="box-menu-items"
          @click="changeUrl('/Home/salary_search',$event)"
          v-show="!power"
        >
          <div>
            <i class="fa fa-search fa-lg"></i>
          </div>
          <span>Salary Query</span>
        </div>
      </div>

      <div class="box-right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      // 存放管理员信息
      user: {},
      // 权限限制
      power: true
    };
  },

  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1);
    },

    // 跳转路由
    changeUrl(url, event) {
      $(event.currentTarget)
        .css({ background: "rgb(109, 214, 255)" })
        .siblings()
        .css({ background: "none" });

      $(".box-menu").css({ background: "rgb(109, 214, 255)" });

      this.$router.push({ path: url });
    },

    // 刷新浏览器
    refresh() {
      window.location.reload();
    }
  },

  mounted() {
    if (this.$store.state.userMessage.name == "") {
      this.$router.push({ path: "/Sign" });
    } else {
      this.user = this.$store.state.userMessage;
    }
    if (this.user.roleName == "人事专员" || this.user.roleName == "人事经理") {
      this.power = true;
    } else {
      this.power = false;
    }

    if (this.power) {
      $(".top").css({ background: "rgb(109, 214, 255)" });
    } else {
      $(".second").css({ background: "rgb(109, 214, 255)","margin-top":"1rem" });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;

  .box-head {
    position: relative;

    .box-user {
      position: relative;
      text-align: right;
      background: #fff;
      border-bottom: 2px solid rgb(109, 214, 255);

      span {
        position: relative;
        display: inline-block;
        padding: 1rem 1.3rem;
        color: rgb(163, 163, 163);
        cursor: pointer;
        transition: 0.5s;

        .fa-user-circle {
          margin-right: 0.4rem;
        }

        .slide {
          position: absolute;
          z-index: 1;
          text-align: center;
          width: 8rem;
          height: 0;
          line-height: 2.5rem;
          border-radius: 0.3rem;
          top: 3.5rem;
          right: -1.6rem;
          background: #fff;
          transition: 0.5s;
          overflow: hidden;
        }

        .slide:hover {
          color: #fff;
          background: rgb(255, 187, 0);
        }
        
        .arrow {
          opacity: 0;
          display: inline-block;
          position: absolute;
          z-index: 2;
          right: 0;
          left: 58px;
          margin-top: 17px;
          width: 0;
          height: 0;
          border-bottom: 10px solid #fff;
          border-right: 10px solid transparent;
          border-left: 10px solid transparent;
          transition: 0.5s;
        }
      }

      span:first-of-type {
        margin-right: 1rem;
      }

      span:first-of-type:hover {
        .slide {
          height: 2.5rem;
        }
        .arrow {
          opacity: 1;
        }
      }

      span:last-of-type {
        background-color: rgb(109, 214, 255);
        color: #fff;
      }
    }
  }

  .box-left {
    position: fixed;
    text-align: center;
    top: 0;
    bottom: 0;
    color: #fff;
    background: #4c4e4d;

    .box-menu {
      position: relative;
      display: inline-block;
      padding: 1rem 0;
      width: 6.5rem;
      background-color: rgb(109, 214, 255);
      font-weight: bold;
    }

    .box-menu-items {
      position: relative;
      padding: 1.2rem 0;
      width: 6.5rem;
      cursor: pointer;

      i {
        font-size: 2rem;
        margin: 1rem 0;
      }
    }

    .top {
      background-color: rgb(109, 214, 255);
      margin-top: 1rem;
    }
  }

  .box-right {
    position: relative;
    margin: 2rem 4rem 2rem 10rem;
  }
}
</style>

