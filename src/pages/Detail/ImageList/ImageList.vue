<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="index"
        @click="clickIndex(index)"
      >
        <img :src="item.imgUrl" :class="{ active: currentIndex == index }" />
      </div>
    </div>
    <div class="swiper-button-next" @click="goRight"></div>
    <div class="swiper-button-prev" @click="goLeft"></div>
  </div>
  <!-- <Carousel :list="skuImageList" :isPagination="false" /> -->
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },

  props: ["skuImageList"],
  watch: {
    skuImageList: {
      handler() {
        this.$nextTick(() => {
          //初始化Swiper类的实例
          new Swiper(this.$refs.cur, {
            //设置轮播图防线
            direction: "horizontal",
            // loop: true,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            //展示区域同时展示三张图片
            slidesPerView: 3,
          });
        });
      },
    },
  },
  methods: {
    clickIndex(index) {
      this.currentIndex = index;
      this.$bus.$emit("choiceIndex", this.currentIndex);
    },
    goRight() {
      this.currentIndex++;
      if (this.currentIndex > this.skuImageList.length)
        this.currentIndex = this.skuImageList.length;
      this.$bus.$emit("choiceIndex", this.currentIndex);
    },
    goLeft() {
      this.currentIndex--;
      if (this.currentIndex < 0) this.currentIndex = 0;
      this.$bus.$emit("choiceIndex", this.currentIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;
  .swiper-wrapper {
    padding-left: 10px;
  }

  .swiper-slide {
    width: 56px;
    height: 56px;
    margin-right: 5px;

    img {
      //   float: left;
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      //   &:hover {
      //     border: 2px solid #f60;
      //     padding: 1px;
      //   }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>