<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>
      注册新用户
      <span class="go"
        >我有账号，去 <router-link to="/login" target="_self">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone" />-->
      <!-- <span class="error-msg">错误提示信息</span>  -->
      <input
        placeholder="请输入你的手机号"
        v-model="phone"
        name="phone"
        v-validate="{ required: true, regex: /^1\d{10}$/ }"
        :class="{ invalid: errors.has('phone') }"
      />
      <span class="error-msg">{{ errors.first("phone") }}</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <!-- <input type="text" placeholder="请输入验证码" v-model="code" /> -->
      <!-- <span class="error-msg">错误提示信息</span> -->
      <input
        placeholder="请输入验证码"
        v-model="code"
        name="code"
        v-validate="{ required: true, regex: /^\d{6}$/ }"
        :class="{ invalid: errors.has('code') }"
      />
      <span class="error-msg">{{ errors.first("code") }}</span>
      <button @click="codeGet" style="width: 100px; height: 38px">
        点击获取验证码
      </button>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <!-- <input
        type="password"
        placeholder="请输入你的登录密码"
        v-model="pwdone"
      />
      <span class="error-msg">错误提示信息</span> -->
      <input
        placeholder="请输入你的密码"
        v-model="pwdone"
        name="password"
        v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
        :class="{ invalid: errors.has('password') }"
      />
      <span class="error-msg">{{ errors.first("password") }}</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <!-- <input type="password" placeholder="请输入确认密码" v-model="pwdtwo" /> -->
      <!-- <span class="error-msg">错误提示信息</span> -->
      <input
        placeholder="请确认你的密码"
        v-model="pwdtwo"
        name="password1"
        v-validate="{ required: true, is: pwdone }"
        :class="{ invalid: errors.has('password1') }"
      />
      <span class="error-msg">{{ errors.first("password1") }}</span>
    </div>
    <br />
    <div class="controls">
      <!-- <input name="m1" type="checkbox" checked="true" /> -->
      <input
        checked="true"
        name="agree"
        type="checkbox"
        v-validate="{ tongyi: true, required: true }"
        :class="{ invalid: errors.has('agree') }"
      />
      <span class="error-msg">{{ errors.first("agree") }}</span>

      <span>同意协议并注册《尚品汇用户协议》</span>
      <!-- <span class="error-msg">错误提示信息</span> -->
    </div>
    <div class="btn">
      <button @click="ReqRegister">完成注册</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      phone: "",
      code: "",
      // 新密码
      pwdone: "",
      // 确认密码
      pwdtwo: "",
    };
  },

  methods: {
    async codeGet() {
      if (this.phone == "") return alert("请先输入手机号");
      let Reqcode = await this.$store.dispatch("User/GetCode", this.phone);
      this.code = Reqcode;
    },
    async ReqRegister() {
      // success：全部表单验证成功返回true 否则返回false
      const success = await this.$validator.validateAll();
      if (success) {
        const { phone, code, pwdone } = this;
        // 发送注册请求并获取返回结果
        let res = await this.$store.dispatch("User/Register", {
          phone,
          password: pwdone,
          code,
        });
        // 根据返回结果对用户提示
        if (res.code == 200) {
          alert("注册成功，请登录");
          this.$router.push({ path: "/login" });
        } else return alert(`注册失败，${res.message}`);
      }
    },
  },
};
</script>

<style scoped lang="less">
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>