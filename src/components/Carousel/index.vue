<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in list" :key="index">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination" v-if="isPagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper5插件
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ["list", "isPagination"],
  watch: {
    // 必须保证轮播数据已经到位，以及页面结构已经通过vfor循环生成，才能new swiper实例从而完成轮播图动画
    // 最佳方法 watch + nextTick 很多插件都依赖完整的页面结构，这个方案很适合平常工作的需要
    list: {
      immediate: true, // 注册成全局组件，数据也许不会通过ajax请求获取，不会触发watch，需要上来就watch
      handler() {
        // 进来就代表数据已经到位
        this.$nextTick(() => {
          // 初始化Swiper类的实例
          new Swiper(this.$refs.mySwiper, {
            //设置轮播图防线
            direction: "horizontal",
            //开启循环模式
            loop: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //分页器类型
              type: "bullets",
              //点击分页器，切换轮播
              clickable: true,
            },
            //自动轮播
            autoplay: {
              delay: 2000,
              //新版本的写法：目前是5版本
              // pauseOnMouseEnter: true,
              //如果设置为true，当切换到最后一个slide时停止自动切换
              stopOnLastSlide: true,
              //用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //切换效果
            // effect: "cube",
          });
        });
      },
    },
  },
};
</script>

<style>
</style>