<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(item, index) in cartInfoList"
          :key="index"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              @change="oneCheck($event, index)"
              ref="checklist"
              :checked="item.isChecked == 1"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum($event, 'decrease', -1, item, index)"
              >-</a
            >
            <!-- ffffff -->
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeSkuNum(
                  $event,
                  'change',
                  $event.target.value * 1,
                  item,
                  index
                )
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum($event, 'add', 1, item, index)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deletecate(item.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          @change="checkAll"
          ref="chooseAll"
          :checked="isCheckedAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="delChecked()">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/Trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addShopcart } from "@/api";

export default {
  name: "ShopCart",
  data() {
    return {
      sumPrice: 0,
    };
  },
  computed: {
    // 利用计算属性监测全选框随各个商品勾选框的变化
    isCheckedAll() {
      // every方法：返回一个判断条件，所以遍历元素都满足则整个方法返回true，否则为false
      if (this.cartInfoList.length == 0) return false; // 没有商品勾选框未false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    checkedList() {
      return this.cartInfoList.filter((item) => item.isChecked == 1);
    },
    // 真正意义上模板需要遍历的数据
    cartInfoList() {
      return this.cartInfoArrZero.cartInfoList || [];
    },
    // cartInfoList的中转结构，避免报错
    ...mapGetters("ShopCart", ["cartInfoArrZero"]),
  },

  watch: {
    // 监测被勾选的商品列表计算总价
    checkedList: {
      handler(newval) {
        let sum = 0;
        newval.forEach((item) => {
          sum = item.skuNum * item.skuPrice + sum;
        });
        this.sumPrice = sum;
      },
    },
  },
  methods: {
    // 删除勾选的商品 删除点击结构不在遍历模板之内，所以无法获取对应商品的id和勾选状态，但是可以到store中获取和操作
    async delChecked() {
      try {
        // 需要获取结果重新获取数据或者给用户相应的提示
        // 必须用await接收，否则失败后无法执行到catch步骤
        let kk = await this.$store.dispatch("ShopCart/delChecked");
        console.log("kk:", kk);
        this.getData();
        this.$router.push({ name: "shopCart" }); // 删除成功要添加这行，不然路由会跳到 /none，不要所以?
      } catch (error) {
        alert("商品删除失败");
        this.$router.push({ name: "shopCart" });
      }
    },
    // 点击删除对应商品
    async deletecate(id) {
      let resCode = await this.$store.dispatch("ShopCart/delOne", id);
      console.log("@", resCode);

      if (resCode == 200) {
        this.getData(); // 删除成功重新获取数据渲染结构
        this.$router.push({ name: "shopCart" }); // 删除成功要添加这行，不然路由会跳到 /none，不要所以?
      } else {
        alert("删除商品失败，请稍后重试"); // 失败给用户提示
        this.$router.push({ name: "shopCart" });
      }
    },
    // 每次改购物车里商品的数量都需要上传修改的数据到服务器，watch只能监测一个属性，而有多少个商品是不确定的，不能用watch
    async changeSkuNum(e, flag, num, target, index) {
      let changeNum = 0;
      switch (flag) {
        case "decrease":
          if (target.skuNum > 1) {
            changeNum = num;
            this.cartInfoList[index].skuNum--;
          }
          break;
        case "add":
          changeNum = num;
          this.cartInfoList[index].skuNum++;
          break;
        case "change":
          // 商品数量最少为1，小于1则上传数字为0，意为不做修改，否则利用顾客输入数字减原商品数目得到修改量上传
          if (num < 1 || isNaN(num)) {
            changeNum = 0;
            e.target.value = target.skuNum;
          } else {
            changeNum = Number.parseInt(num) - target.skuNum;
            target.skuNum = num;
          }
          break;
      }
      // 上传修改的数据
      let {
        data: { code },
      } = await addShopcart(target.skuId, changeNum); // changeNum:1加一个 ;changeNum：-5减五个
      // 失败
      if (code !== 200) return alert("商品数目修改失败，请稍后重试");
      this.CalTotalPrice();
    },

    // 计算总价，商品数量变化调用计算，勾选框变更依靠监视 checkedList来完成
    CalTotalPrice() {
      let checkedList = this.cartInfoList.filter((item) => item.isChecked == 1);
      console.log(checkedList);
      let sum = 0;
      checkedList.forEach((item) => {
        sum = item.skuNum * item.skuPrice + sum;
      });
      this.sumPrice = sum;
    },

    // 点击全选框
    checkAll(e) {
      if (e.target.checked) {
        this.cartInfoList.forEach((i, index) => {
          this.$store.dispatch("ShopCart/changeChecked", {
            skuid: this.cartInfoList[index].skuId,
            ischecked: 1,
          });
        });
      } else {
        this.cartInfoList.forEach((i, index) => {
          this.$store.dispatch("ShopCart/changeChecked", {
            skuid: this.cartInfoList[index].skuId,
            ischecked: 0,
          });
        });
      }
    },

    // 单独点击某个商品勾选框，勾选框状态绑定给请求回来的数据，无需额外手动操作
    oneCheck(e, index) {
      console.log(this.cartInfoList[index].skuId);
      if (e.target.checked) {
        // dispatch只能传一个参数
        this.$store.dispatch("ShopCart/changeChecked", {
          skuid: this.cartInfoList[index].skuId,
          ischecked: 1,
        });
      } else {
        this.$store.dispatch("ShopCart/changeChecked", {
          skuid: this.cartInfoList[index].skuId,
          ischecked: 0,
        });
      }
    },

    // 拉取购物车数据
    getData() {
      this.$store.dispatch("ShopCart/pullCartData");
    },
  },

  beforeCreate() {
    // this.getData(); 方法未创建，不能调用
  },
  mounted() {
    // 购物车路由挂载后也要向服务器请求购物车数据
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>