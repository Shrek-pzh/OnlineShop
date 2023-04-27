<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!nickName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-if="nickName">
            <img :src="headImg" alt="" class="headImg" />
            <span class="nickName">{{ nickName }}</span>
            <a @click="ReqLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/communication">额外组件通信示例</router-link>

          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home" target="_self">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="getSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapState("User", ["userInfo"]),
    nickName() {
      return this.userInfo.nickName || "";
    },
    headImg() {
      return this.userInfo.headImg || "";
    },
  },
  methods: {
    // 退出登录
    ReqLogout() {
      this.$store.dispatch("User/Logout");
    },
    getSearch() {
      // params参数路由路径需要占位 query参数不用占位，用?连接 以下分别传参 params query

      // 第一种方式路由传参 普通字符串
      //   this.$router.push(
      //     "/search/" + this.keyword + "?kk=" + this.keyword.toUpperCase()
      //   );

      // 第一种方式路由传参 普通字符串
      //   this.$router.push(
      //     `/search/${this.keyword}?kk=${this.keyword.toUpperCase()}`
      //   );

      // 第三种方式：对象形式，该方式必须给路由命名（路由文件种配置），利用路由名字跳转.开发常用
      let location = {
        name: "searchname",
        params: { keyword: this.keyword },
        query: this.$route.query, // 如果三级联动列表有已经传入的 query参数
      };
      this.$router.push(location);
    },
  },
  mounted() {
    // 全局事件总线，接收search组件搜索关键字面包屑清空操作，从而清空输入框
    this.$bus.$on("clearkey", () => (this.keyword = ""));
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
        .headImg {
          width: 25px;
          height: 25px;
          margin-right: 10px;
          border-radius: 50%;
          vertical-align: top;
        }
        .nickName {
          margin-right: 10px;
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>