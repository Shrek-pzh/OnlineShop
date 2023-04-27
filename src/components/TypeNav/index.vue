<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- 事件委托 lostCurIndex失去鼠标解除当前索引  getCurIndex鼠标进入直接展示第一条-->
    <div
      class="container"
      @mouseleave="lostCurIndex"
      @mouseenter="getCurIndex(-1)"
    >
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="showlist">
        <div class="sort" v-show="isShow">
          <!-- goSearch 子元素事件委托给父元素，点击跳转search路由并携带相应参数 -->
          <div class="all-sort-list2" @click="goSearch" v-show="isShow">
            <div
              class="item bo"
              v-for="(c1, index) in catelist"
              :key="c1.categoryId"
              :class="{ active: index == currentIndex }"
              @mouseenter="getCurIndex(index)"
            >
              <!--一级分类-->
              <h3
                :data-category1Id="c1.categoryId"
                :data-categoryName="c1.categoryName"
              >
                <a
                  href=""
                  :data-category1Id="c1.categoryId"
                  :data-categoryName="c1.categoryName"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
                :style="{ display: index == currentIndex ? 'block' : 'none' }"
              >
                <!-- :style 利用js实现二三级列表显示和隐藏 -->
                <div class="subitem">
                  <dl class="fore">
                    <!--二级分类-->
                    <dt>
                      <a
                        href=""
                        :data-category2Id="c2.categoryId"
                        :data-categoryName="c2.categoryName"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!--三级分类-->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href=""
                          :data-category3Id="c3.categoryId"
                          :data-categoryName="c3.categoryName"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// lodash在vue脚手架中已经下载，无需额外安装，里面封装了节流和防抖方法，以及其他数组过滤等方法等等
// 全部引入是将lodash全部API引入,将来项目打包的时候，体积会大一些
// import _ from "lodash";
//引入手段:按需引入
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },

  computed: {
    // 对象形式，函数形式，这种不需要配置 namespaced: true
    // ...mapState({
    //   //对象写法,对象的K,给VC新增的属性
    //   //新增的属性,右侧属性值为箭头函数返回的结果。作为新增属性的属性值
    //   //箭头函数执行，注入一个参数state->大仓库【包含小仓库】
    //   catelist: (state) => state.Home.catelist, //对象简写形式
    // }),

    ...mapState("Home", ["catelist"]), // 要使用这个必须在各自的小仓库暴露对象配置 namespaced: true
  },
  mounted() {
    // 获取三级联动数据列表
    // this.$store.dispatch()  本子组件多组件用，路由切换就会发送不必要，直接App组件挂载发一次即可
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
    //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
    //函数的防抖与节流技术
    getCurIndex: throttle(function (index) {
      this.currentIndex = index;
      if (this.$route.path !== "/home") {
        this.isShow = true; // 如果不是home组件，鼠标进入后就显示列表
      }
    }, 10),
    lostCurIndex() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false; // 如果不是home组件，鼠标离开后就隐藏列表
      }
    },

    // 精益求精
    // 将全部的子节点的事件委派给父节点->事件回调就一个
    // 第一个问题:div父节点子元素太多【h3、h2、em、dt、dd、dl...a】？你怎么知道你点击的一定是a
    // 第二个问题:要区分一级分类、二级分类、三级分类的a标签【category1Id|category2Id|category2Id】
    // 列表个类商品跳转search路由并携带参数
    goSearch(e) {
      e.preventDefault(); // 阻止a连接默认的跳转事件
      const { categoryname, category1id, category2id, category3id } =
        e.target.dataset; // 注意 dataset中所有属性字母都会自动转小写
      if (categoryname) {
        let location = {
          name: "searchname",
          query: { categoryName: categoryname },
        };
        if (category1id) {
          location.query.category1Id = category1id;
        } else if (category2id) {
          location.query.category2Id = category2id;
        } else {
          location.query.category3Id = category3id;
        }
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      } else return;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      //   overflow: scroll;

      .all-sort-list2 {
        .active {
          background-color: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
      }
    }

    .showlist-enter,
    .showlist-leave-to {
      height: 0px;
    }
    .showlist-enter-to,
    .showlist-leave {
      height: 461px;
    }
    .showlist-enter-active,
    .showlist-leave-active {
      transition: all 0.4s; // 时间必须带单位！
    }

    /*过渡动画:商品分类 进入阶段*/
    // .sort-enter {
    //   height: 0px;
    // }

    // .sort-enter-active {
    //   transition: all 0.8s;
    // }
    // .sort-enter-to {
    //   height: 461px;
    // }
  }
}
</style>

