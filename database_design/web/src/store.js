import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    // 存放用户信息
    userMessage:{

      name:""

    },

    // 存放当前需要复核的用户档案编号
    fileNo:"",

    // 存放当前需要复核的酬薪标准编号
    standardNo:"",

    // 存放当前登记编号
    grantNo:""

  },
  mutations: {

    // 设置使用者登录名
    setUserMessage(state, obj) {

      state.userMessage = obj

    },

    // 设置复核对象编号
    setFileNo(state, fileNo) {

      state.fileNo = fileNo

    },

    // 设置复核酬薪标准编号
    setStandardNo(state, standardNo) {

      state.standardNo = standardNo

    },

    // 设置酬薪登记编号
    setGrantNo(state, grantNo) {

      state.grantNo = grantNo

    }

  },
  actions: {

  }
})
