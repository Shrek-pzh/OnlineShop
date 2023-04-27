<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 展示各种相关品牌logo trademarkList-->
        <!-- 事件委托 addTrademark 点击品牌更新发送参数 -->
        <ul class="logo-list" @click="addTrademark">
          <li
            v-for="item in trademarkList"
            :key="item.tmId"
            :data-tmid="item.tmId"
          >
            {{ item.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <!-- 展示商品的相关属性 -->
    <div class="type-wrap" v-for="item in attrsList" :key="item.attrId">
      <div class="fl key">{{ item.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(attrValue, index) in item.attrValueList" :key="index">
            <a @click="sendProps(item, attrValue)">{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "SearchSelector",
  computed: {
    ...mapState("Search", ["Searchdata"]),
    ...mapGetters("Search", ["attrsList", "trademarkList"]),
  },
  methods: {
    // 将点击的商品属性传给父组件，用以重新获取商品数据。方式：自定义事件
    sendProps(item, attrvalue) {
      const propstr = `${item.attrId}:${attrvalue}:${item.attrName}`;
      this.$emit("addAttr", propstr);
    },

    // 点击品牌将对应属性传给父组件
    addTrademark(e) {
      const datastr = `${e.target.dataset.tmid}:${e.target.innerText}`;
      this.$emit("addtra", datastr);
    },
  },
};
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>