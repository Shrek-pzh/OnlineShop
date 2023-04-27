<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品名称的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索关键字面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 商品品牌面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 商品属性面包屑 -->
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="index"
            >
              {{ item.split(":")[1] }}<i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @addAttr="updateProps" @addtra="Addtra" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 商品展示排序选项 -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: orderNum == 1 }" @click="changeNum(1)">
                  <a href="#"
                    >综合<span
                      class="iconfont"
                      :class="
                        orderSort == 'asc'
                          ? ['icon-jiantou_xiangshang']
                          : ['icon-jiantou_xiangxia']
                      "
                      v-show="orderNum == 1"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: orderNum == 2 }" @click="changeNum(2)">
                  <a href="#"
                    >销量<span
                      class="iconfont"
                      :class="
                        orderSort == 'asc'
                          ? ['icon-jiantou_xiangshang']
                          : ['icon-jiantou_xiangxia']
                      "
                      v-show="orderNum == 2"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 展示产品图 goods -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="good in goodsList"
                :key="good.id"
                @click="goDetail($event, good.id)"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a target="_blank"><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            @jump="jumpPage"
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="continues"
          />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      //将来Search模块搜索的条件
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】

        pageNo: 1, // 分页器四要素之一：当前页
        pageSize: 5, // 分页器四要素之二：每页展示数目
      },
      continues: 7, // 分页器四要素之三：连续的页数 一般为 5、7、9
    };
  },
  computed: {
    // 分页器四要素之四：条目总数
    total() {
      return this.Searchdata.total;
    },
    // 商品排序相关属性
    orderSort() {
      return this.searchParams.order.split(":")[1];
    },
    orderNum() {
      return this.searchParams.order.split(":")[0];
    },
    ...mapState("Search", ["Searchdata"]),
    ...mapGetters("Search", ["goodsList"]),
  },
  watch: {
    // 监听路由信息（监听query和params参数），变化即向服务器请求新商品数据
    $route: {
      handler() {
        this.updateParams();
        this.getData();
      },
    },
  },
  methods: {
    // 查看商品详情路由跳转
    goDetail(e, id) {
      e.preventDefault(); // 防止a链接跳转事件
      this.$router.push({ name: "detail", params: { skuid: id } });
    },
    // 分页器点击跳转页面
    jumpPage(num) {
      this.searchParams.pageNo = num;
      this.getData();
    },
    // 获取排序的高亮
    changeNum(num) {
      let originNum = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];

      // 点击同一个
      if (num == originNum) {
        let tem = originSort == "desc" ? "asc" : "desc"; // 因为默认是降序所以和desc判断
        this.searchParams.order = `${num}:${tem}`;
      } else {
        this.searchParams.order = `${num}:desc`;
      }
      // 修改排序后重新发送请求
      this.getData();
    },
    // 接收子组件的品牌参数
    Addtra(datastr) {
      // 接收子组件的品牌参数，更新参数，重新获取数据
      this.searchParams.trademark = datastr;
      this.getData();
    },
    // 清空商品名称,置空后利用v-show隐藏对应面包屑
    removeCategoryName() {
      this.searchParams.categoryName = "";

      // 理论上需要清空query参数，即商品名称和id
      // 结果上压根不用清空路由query参数,只需跳转时不带 query，跳转后的路径就不会出现query，$route中query也会被清空。为什么？
      // 重新跳转路由，跳转自己，带上参数
      this.$router.push({
        name: "searchname",
        params: this.$route.params,
      });
      //   this.getData();
    },
    // 清空搜索关键字,置空后利用v-show隐藏对应面包屑
    removeKeyword() {
      // 通知兄弟组件header.vue清空搜索输入框。方式：全局事件总线
      this.$bus.$emit("clearkey");
      this.searchParams.keyword = "";

      // 理论上需要同时清空路由params参数的keyword
      // 结果上压根不用清空路由,只需跳转时不带 params，跳转后的路径就不会出现params，$route中params也会被清空。为什么？
      // 重新跳转路由，跳转自己，带上参数
      this.$router.push({
        name: "searchname",
        query: this.$route.query,
        // params: this.$route.params,
      });
    },
    // 点击删除商品品牌
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getData();
    },
    // 点击删除对应的商品属性
    removeProps(index) {
      this.searchParams.props.splice(index, 1); // 移除位置起始位置，移除个数
      this.getData();
    },
    // 向服务器请求数据
    getData() {
      this.$store.dispatch("Search/getSearchData", this.searchParams);
    },

    // 从别的路由跳至本路由会请求数据，所以需要提前整理路由中携带的query和params参数
    // 利用ES新的对象合并方法
    updateParams() {
      // 向服务器请求完数据将 3个Id属性置空，如果置 undefined就不会作为参数发送给服务器
      // categoryName、keyword两个属性不需要，会随着路由路径自动更新
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;

      this.searchParams = Object.assign(
        this.searchParams,
        this.$route.query,
        this.$route.params
      );
      this.searchParams.pageNo = 1;
    },

    // 接收来自子组件的商品属性，然后更新重新获取数据
    updateProps(propStr) {
      if (this.searchParams.props.indexOf(propStr) == -1) {
        // 避免重复添加
        this.searchParams.props.push(propStr); // 将传入的商品属性更新到发送参数
        this.getData(); // 更新后重新请求数据
      }
    },
  },
  beforeMount() {
    this.updateParams();
  },
  mounted() {
    this.$store.dispatch("Search/getSearchData", this.searchParams);
  },
};
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>