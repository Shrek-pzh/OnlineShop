<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Footer from "./components/footer";
import Header from "./components/header";

export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
  methods: {},
  mounted() {
    // 获取三级联动数据列表
    this.$store.dispatch("Home/getCatelist");
  },
};
</script>

<style>
</style>
